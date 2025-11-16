# FromDeven.com - Phase 1 Architecture Plan

**Version:** 1.0
**Date:** November 16, 2025
**Status:** Planning

---

## Executive Summary

Phase 1 transforms FromDeven.com from a single-card proof-of-concept into a **multi-card platform** with:
- **Admin dashboard** for creating and managing unlimited cards
- **Web analytics** for tracking engagement and usage
- **Database-driven** content management
- **Authentication** for admin access
- Future-ready architecture for advanced features

---

## 1. System Architecture Overview

### 1.1 High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      Frontend (Next.js)                      │
├──────────────────┬──────────────────────┬───────────────────┤
│  Public Routes   │   Admin Dashboard    │   API Routes      │
│  - Landing       │   - Login            │   - Auth          │
│  - /[code]       │   - Card Manager     │   - Cards CRUD    │
│                  │   - Analytics View   │   - Analytics     │
└──────────────────┴──────────────────────┴───────────────────┘
                              ↓
                    ┌─────────────────────┐
                    │   Database (Prisma)  │
                    │   - PostgreSQL/MySQL │
                    │   - Cards            │
                    │   - Analytics Events │
                    │   - Admin Users      │
                    └─────────────────────┘
```

### 1.2 Technology Stack

**Existing (Phase 0):**
- Next.js 15 (App Router)
- TypeScript
- TailwindCSS
- Framer Motion

**New (Phase 1):**
- **Database**: PostgreSQL (via Supabase or Railway)
- **ORM**: Prisma
- **Authentication**: NextAuth.js (Auth.js v5)
- **Analytics Storage**: Database tables
- **Admin UI**: Shadcn/ui components
- **Forms**: React Hook Form + Zod validation
- **Rich Text Editor**: Lexical or Tiptap
- **Image Upload**: UploadThing or Cloudinary

---

## 2. Database Schema Design

### 2.1 Core Tables

#### `User` (Admin)
```prisma
model User {
  id            String    @id @default(cuid())
  email         String    @unique
  name          String?
  passwordHash  String
  role          Role      @default(ADMIN)
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  cards         Card[]

  @@map("users")
}

enum Role {
  ADMIN
  VIEWER
}
```

#### `Card`
```prisma
model Card {
  id              String    @id @default(cuid())
  inviteCode      String    @unique
  slug            String    @unique  // URL-friendly version of code

  // Recipient info
  recipientName   String
  recipientEmail  String?

  // Card metadata
  label           String?
  title           String
  subtitle        String?
  greeting        String?
  closing         String

  // Content
  stanzas         Json      // Array of stanza strings
  photos          Json      // Array of photo objects

  // Theme
  theme           String    @default("ivory-gold")

  // Status
  status          CardStatus @default(DRAFT)
  publishedAt     DateTime?
  expiresAt       DateTime?

  // Relationships
  createdBy       User      @relation(fields: [createdById], references: [id])
  createdById     String
  analytics       AnalyticsEvent[]

  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt

  @@index([inviteCode])
  @@index([slug])
  @@index([status])
  @@map("cards")
}

enum CardStatus {
  DRAFT
  PUBLISHED
  ARCHIVED
}
```

#### `AnalyticsEvent`
```prisma
model AnalyticsEvent {
  id            String    @id @default(cuid())

  // Event data
  eventType     EventType
  cardId        String?
  card          Card?     @relation(fields: [cardId], references: [id])

  // Visitor data
  sessionId     String
  ipAddress     String?
  userAgent     String?

  // Device/Browser info (parsed from userAgent)
  deviceType    String?   // mobile, tablet, desktop
  browser       String?   // Chrome, Safari, Firefox, etc.
  os            String?   // iOS, Android, Windows, macOS, etc.

  // Geo data (optional, future)
  country       String?
  city          String?

  // Referrer
  referrer      String?

  // Metadata
  metadata      Json?     // Flexible field for additional data

  timestamp     DateTime  @default(now())

  @@index([cardId])
  @@index([eventType])
  @@index([sessionId])
  @@index([timestamp])
  @@map("analytics_events")
}

enum EventType {
  CARD_VIEW
  CARD_OPENED
  ENVELOPE_OPENED
  PHOTO_VIEWED
  INVALID_CODE_ATTEMPT
  PAGE_VIEW
}
```

### 2.2 Relationships

- One `User` can create many `Cards`
- One `Card` has many `AnalyticsEvents`
- `AnalyticsEvents` can exist without a `Card` (e.g., invalid code attempts)

---

## 3. Admin Dashboard Architecture

### 3.1 Authentication Flow

```
┌──────────────┐
│   /admin     │  → Not authenticated → Redirect to /admin/login
└──────────────┘

┌──────────────┐
│ /admin/login │  → Enter credentials → NextAuth validates
└──────────────┘
                ↓
            ┌────────────────┐
            │ Set JWT session │
            └────────────────┘
                ↓
┌─────────────────┐
│ /admin/dashboard│  → Authenticated → Show dashboard
└─────────────────┘
```

**Implementation:**
- Use NextAuth.js (Auth.js v5) with Credentials provider
- Store session in JWT (httpOnly cookie)
- Middleware protects `/admin/*` routes
- Password hashing with bcrypt

### 3.2 Admin Dashboard Pages

#### `/admin/login`
- Email + password form
- Error handling
- Redirect to dashboard on success

#### `/admin/dashboard`
- Overview metrics:
  - Total cards created
  - Total views (all time)
  - Views this week
  - Active cards
- Recent card activity list
- Quick actions:
  - Create new card
  - View analytics

#### `/admin/cards`
- Table view of all cards
  - Columns: Code, Recipient, Status, Views, Created, Actions
  - Filters: Status (All, Draft, Published, Archived)
  - Search: By code or recipient name
- Actions per card:
  - Edit
  - View analytics
  - Duplicate
  - Archive/Delete
  - View live link

#### `/admin/cards/new`
- Card creation form:
  - **Basic Info**
    - Invite code (auto-suggest or manual)
    - Recipient name
    - Recipient email (optional)
  - **Content**
    - Label (optional)
    - Title
    - Subtitle (optional)
    - Greeting (optional)
    - Stanzas (dynamic list, add/remove)
    - Closing
  - **Photos**
    - Upload images (drag-and-drop)
    - Set position (left/right)
    - Add captions
    - Reorder photos
  - **Settings**
    - Theme (select from options)
    - Status (Draft/Published)
    - Expiration date (optional)
- Preview button (live preview in modal)
- Save as draft / Publish

#### `/admin/cards/[id]/edit`
- Same form as create, pre-filled with card data
- Additional actions:
  - View live
  - Duplicate
  - Archive
  - Delete

#### `/admin/analytics`
- Overview dashboard:
  - **Metrics cards**
    - Total views (all cards)
    - Unique visitors
    - Average time on site
    - Most popular card
  - **Charts**
    - Views over time (line chart)
    - Device breakdown (pie chart)
    - Browser breakdown (bar chart)
  - **Recent activity**
    - Live feed of events (last 100)
- **Filters**
  - Date range selector
  - Card selector
  - Event type filter

#### `/admin/analytics/[cardId]`
- Card-specific analytics:
  - **Overview**
    - Total views
    - Unique visitors
    - First viewed date
    - Last viewed date
  - **Timeline**
    - View events over time
  - **Visitor details**
    - Session list with:
      - Timestamp
      - Device
      - Browser
      - Location (if available)
      - Events (view, opened envelope, etc.)
  - **Engagement metrics**
    - Envelope open rate
    - Photo view rate
    - Average session duration

### 3.3 UI Component Library

Use **Shadcn/ui** for consistent, accessible components:
- Button
- Input, Textarea
- Select, Combobox
- Table, DataTable
- Dialog, Sheet (modals)
- Toast (notifications)
- Form (with React Hook Form integration)
- Tabs
- Card
- Badge
- Skeleton (loading states)

---

## 4. Analytics System Architecture

### 4.1 Event Tracking Flow

```
User visits card → Client-side tracking script → API endpoint → Database

1. Page loads → Generate/retrieve sessionId (localStorage)
2. Capture event (VIEW, ENVELOPE_OPEN, etc.)
3. Parse userAgent → Extract device/browser/OS
4. POST /api/analytics/track with event data
5. Server validates, enriches, stores in DB
```

### 4.2 Client-Side Tracking

**Implementation location:** `components/analytics/Analytics.tsx`

```typescript
// Track page view
useEffect(() => {
  trackEvent({
    type: 'CARD_VIEW',
    cardId: card.id,
  });
}, []);

// Track envelope opened
const handleEnvelopeComplete = () => {
  trackEvent({
    type: 'ENVELOPE_OPENED',
    cardId: card.id,
  });
  onComplete();
};

// Track photo viewed
const handlePhotoClick = (photoIndex: number) => {
  trackEvent({
    type: 'PHOTO_VIEWED',
    cardId: card.id,
    metadata: { photoIndex },
  });
  setSelectedPhoto(photo);
};
```

### 4.3 Server-Side Processing

**API Route:** `/api/analytics/track`

```typescript
// Validate request
// Parse userAgent (use ua-parser-js)
// Get IP address (for geo-lookup, optional)
// Create analytics event in database
// Return 200 OK
```

**Libraries:**
- `ua-parser-js` - Parse user agent strings
- `next/headers` - Access IP address
- (Optional) `geoip-lite` - IP to location

### 4.4 Privacy Considerations

- **No PII stored** by default (IP addresses optional, can be hashed)
- **Session IDs** are random UUIDs, not tied to user identity
- **GDPR compliance**: Add cookie consent banner if storing IPs
- **Data retention**: Auto-delete analytics older than 1 year (configurable)

### 4.5 Analytics Metrics

**Page-level:**
- Total views (all cards)
- Unique visitors (distinct sessionIds)
- Views by device type
- Views by browser
- Views over time (daily, weekly, monthly)

**Card-level:**
- Total views
- Unique visitors
- First/last viewed timestamp
- Envelope open rate: (ENVELOPE_OPENED / CARD_VIEW) * 100
- Photo engagement: (PHOTO_VIEWED events / CARD_VIEW) * 100
- Geographic distribution (if IP tracking enabled)

**Visitor-level:**
- Session ID
- Device, browser, OS
- Timestamp of visit
- Events during session
- Referrer (how they arrived)

---

## 5. API Architecture

### 5.1 API Routes Structure

```
/api/
├── auth/
│   └── [...nextauth]/
│       └── route.ts          # NextAuth.js handler
├── cards/
│   ├── route.ts              # GET (list), POST (create)
│   ├── [id]/
│   │   └── route.ts          # GET, PATCH, DELETE
│   └── [id]/duplicate/
│       └── route.ts          # POST (duplicate card)
├── analytics/
│   ├── track/
│   │   └── route.ts          # POST (track event)
│   ├── overview/
│   │   └── route.ts          # GET (global stats)
│   └── cards/
│       └── [cardId]/
│           └── route.ts      # GET (card-specific stats)
└── public/
    └── [code]/
        └── route.ts          # GET (fetch card by code for public view)
```

### 5.2 API Endpoints Detail

#### `POST /api/cards`
Create a new card
- **Auth**: Required (admin)
- **Body**: Card data (validated with Zod)
- **Returns**: Created card object

#### `GET /api/cards`
List all cards
- **Auth**: Required (admin)
- **Query params**: `status`, `search`, `page`, `limit`
- **Returns**: Paginated list of cards

#### `GET /api/cards/[id]`
Get card by ID
- **Auth**: Required (admin)
- **Returns**: Full card object

#### `PATCH /api/cards/[id]`
Update card
- **Auth**: Required (admin)
- **Body**: Partial card data
- **Returns**: Updated card object

#### `DELETE /api/cards/[id]`
Delete card (soft delete to ARCHIVED)
- **Auth**: Required (admin)
- **Returns**: Success message

#### `POST /api/analytics/track`
Track analytics event
- **Auth**: Not required (public)
- **Body**: Event type, cardId, sessionId, metadata
- **Returns**: Success message

#### `GET /api/analytics/overview`
Get global analytics
- **Auth**: Required (admin)
- **Query params**: `startDate`, `endDate`
- **Returns**: Aggregated metrics

#### `GET /api/analytics/cards/[cardId]`
Get card-specific analytics
- **Auth**: Required (admin)
- **Query params**: `startDate`, `endDate`
- **Returns**: Card metrics and event list

#### `GET /api/public/[code]`
Get card by invite code (for public viewing)
- **Auth**: Not required
- **Returns**: Card content (if valid code)

---

## 6. Migration Strategy

### 6.1 Phase 0 to Phase 1 Migration

**Step 1: Database Setup**
1. Install Prisma: `npm install @prisma/client prisma`
2. Initialize Prisma: `npx prisma init`
3. Define schema (as above)
4. Run migrations: `npx prisma migrate dev`

**Step 2: Migrate Existing Card**
1. Create migration script: `scripts/migrate-phase0-card.ts`
2. Read `config/cardContent.ts`
3. Create admin user (with default password)
4. Create card record in database
5. Copy photos to uploadable storage (if using cloud)

**Step 3: Update Public Routes**
1. Modify `app/[code]/page.tsx`:
   - Fetch card from API instead of config
   - Keep same UI/UX
   - Add analytics tracking
2. Keep backward compatibility (check DB first, fall back to config if not found)

**Step 4: Add Admin Routes**
1. Create `/app/admin` directory
2. Add authentication middleware
3. Build dashboard pages
4. Add API routes

**Step 5: Testing & Deployment**
1. Test migration locally
2. Test all admin features
3. Verify analytics tracking
4. Deploy to Vercel
5. Run migration script on production DB

### 6.2 Backward Compatibility

During transition:
- Keep `config/cardContent.ts` as fallback
- If DB query fails, use config
- Add feature flag: `USE_DATABASE=true` in env

---

## 7. Implementation Phases

### Phase 1.1: Database & Core Infrastructure (Week 1-2)
- [ ] Set up Prisma with PostgreSQL
- [ ] Define and migrate schema
- [ ] Create seed script for admin user
- [ ] Migrate Phase 0 card to database
- [ ] Set up NextAuth.js

### Phase 1.2: Admin Dashboard Foundation (Week 2-3)
- [ ] Build login page
- [ ] Create dashboard layout
- [ ] Implement cards list view
- [ ] Add card creation form
- [ ] Build card editor

### Phase 1.3: Analytics System (Week 3-4)
- [ ] Create analytics tracking client
- [ ] Build analytics API endpoints
- [ ] Implement analytics dashboard
- [ ] Add card-specific analytics view
- [ ] Create data visualization components

### Phase 1.4: Public Routes Migration (Week 4)
- [ ] Update `[code]` route to use database
- [ ] Add analytics tracking to card views
- [ ] Test all public flows
- [ ] Ensure backward compatibility

### Phase 1.5: Testing & Polish (Week 5)
- [ ] End-to-end testing
- [ ] Performance optimization
- [ ] UI/UX polish
- [ ] Documentation
- [ ] Deployment

---

## 8. Security Considerations

### 8.1 Authentication
- Use strong password hashing (bcrypt with salt)
- Implement rate limiting on login endpoint
- Add CSRF protection
- Use httpOnly cookies for sessions

### 8.2 Authorization
- Protect all `/admin/*` routes with middleware
- Validate user role on API endpoints
- Ensure users can only access their own cards (future multi-user)

### 8.3 Input Validation
- Use Zod schemas for all API inputs
- Sanitize user-generated content
- Validate file uploads (size, type)
- Prevent XSS in card content

### 8.4 Data Protection
- Use environment variables for secrets
- Never expose database credentials
- Implement CORS correctly
- Add rate limiting on public APIs

---

## 9. Performance Optimization

### 9.1 Database
- Add indexes on frequently queried fields
- Use pagination for large result sets
- Implement database connection pooling
- Consider caching for analytics queries (Redis, optional)

### 9.2 Frontend
- Code split admin bundle from public bundle
- Lazy load admin components
- Optimize images (next/image)
- Use React.memo for analytics charts

### 9.3 API
- Implement response caching (Next.js cache)
- Add database query optimization
- Consider CDN for static assets

---

## 10. Monitoring & Logging

### 10.1 Application Monitoring
- **Vercel Analytics** (built-in)
- **Sentry** for error tracking (optional)
- Custom logging for admin actions

### 10.2 Database Monitoring
- Query performance tracking
- Connection pool monitoring
- Prisma query logging in development

### 10.3 Analytics Monitoring
- Track analytics API performance
- Monitor event ingestion rate
- Alert on failed tracking attempts

---

## 11. Future Enhancements (Phase 2+)

### Phase 2: Advanced Features
- Email notifications when card is viewed
- Reaction system (recipient can leave emoji/message)
- PDF export of cards
- Custom themes and templates
- Multiple admin users with roles

### Phase 3: Scalability
- Multi-tenant architecture
- Custom subdomains per card
- White-label solution
- API for third-party integrations

---

## 12. Success Metrics

### Technical Metrics
- [ ] Database schema supports unlimited cards
- [ ] Admin can create card in <2 minutes
- [ ] Analytics events tracked with <100ms latency
- [ ] Page load time <2s (LCP)
- [ ] Zero downtime deployment

### User Metrics
- [ ] 100% of card views tracked
- [ ] Analytics dashboard load time <1s
- [ ] Admin dashboard is fully responsive
- [ ] All admin features have error handling
- [ ] WCAG AA compliance maintained

---

## 13. Open Questions & Decisions Needed

1. **Database choice**: PostgreSQL (Supabase) vs MySQL (PlanetScale)?
   - Recommendation: PostgreSQL via Supabase (better free tier, built-in auth option)

2. **Image storage**: Self-hosted vs cloud (Cloudinary/UploadThing)?
   - Recommendation: UploadThing (simpler integration, generous free tier)

3. **Analytics privacy**: Store IP addresses or not?
   - Recommendation: Hash IPs for privacy, or skip entirely for Phase 1

4. **Multi-user admin**: Support multiple admin users in Phase 1?
   - Recommendation: Single admin for Phase 1, add in Phase 2

5. **Email notifications**: Include in Phase 1 or defer to Phase 2?
   - Recommendation: Defer to Phase 2 (use Resend when ready)

---

## 14. Next Steps

### Before Coding
- [ ] Review and approve this plan
- [ ] Decide on open questions above
- [ ] Set up database (Supabase account)
- [ ] Create admin user credentials
- [ ] Set up image storage (UploadThing account)

### Ready to Begin
Once approved, implementation will follow the phase breakdown in Section 7, starting with database setup and infrastructure.

---

**Plan prepared by:** Claude Code
**Review status:** Awaiting approval
**Estimated timeline:** 5 weeks for full Phase 1
