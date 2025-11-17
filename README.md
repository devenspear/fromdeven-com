# FromDeven.com - Phase 0 ✨

A mysterious, high-touch digital experience for delivering personalized thank-you cards.

## Overview

FromDeven.com is an elegant, minimal website that creates a special moment for recipients of personalized notes. Phase 0 is a production-ready proof-of-concept featuring:

- **Landing page** with invite code authentication
- **Invalid code handling** - Elegant error page with auto-redirect
- **Beautiful envelope opening animation** with 1-second hold time (respects reduced-motion preferences)
- **Dynamic route system** - URLs use the invite code (e.g., `/Stacy251116`)
- **Card experience** with poetry stanzas, floating photos, and smooth dissolve transitions
- **Dynamic font sizing** - Auto-scales from 18px (mobile) to 32px (large desktop)
- **Smart typography** - Text-align-last prevents orphan line issues
- **Responsive photo layout** - Polaroid-style images that float with text
- **Fully responsive** and accessible design

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS with custom design system
- **Animation**: Framer Motion
- **Deployment**: Vercel-ready

## Getting Started

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## Configuration

### Updating Content

All content is managed through a single configuration file:

**`config/cardContent.ts`**

```typescript
export const CARD_CONTENT = {
  inviteCode: "YOUR-CODE-HERE",
  recipientName: "Recipient Name",
  label: "A note from Deven",
  title: "Your Card Title",
  subtitle: "Date or subtitle",
  greeting: "Hi [Name],",
  stanzas: [
    "First stanza with *italic* support...",
    "Second stanza...",
  ],
  closing: "Signature",
  photos: [
    {
      src: "/card-photos/photo.jpg",
      alt: "Description",
      position: "left" // or "right"
    }
  ],
  theme: { variant: "ivory-gold" }
}
```

### Adding Photos

1. Place your images in `public/card-photos/`
2. Update the `photos` array in `cardContent.ts`:

```typescript
photos: [
  {
    src: "/card-photos/your-image.jpg",
    alt: "Descriptive alt text for accessibility",
    position: "left", // or "right" - controls float direction
    caption: undefined // Optional caption (not currently displayed)
  }
]
```

Supported formats: JPG, PNG, SVG, WebP

### Changing the Invite Code

Simply update the `inviteCode` field in `config/cardContent.ts`:

```typescript
inviteCode: "NEW-CODE-2025"
```

Codes are **case-insensitive** and automatically trimmed.

## Project Structure

```
fromdeven.com/
├── app/
│   ├── page.tsx              # Landing page with InviteGate
│   ├── [code]/
│   │   └── page.tsx          # Dynamic card route (validates code)
│   ├── layout.tsx            # Root layout
│   └── globals.css           # Global styles with responsive system
├── components/
│   ├── landing/
│   │   └── InviteGate.tsx    # Invite code input with fade transition
│   ├── card/
│   │   ├── CardContent.tsx   # Main card with dynamic font sizing
│   │   ├── EnvelopeAnimation.tsx  # Envelope opening sequence
│   │   ├── PolaroidPhoto.tsx      # Floating photo component
│   │   └── PhotoGallery.tsx       # Gallery with lightbox (unused in current layout)
│   └── shared/                    # (Future shared components)
├── config/
│   └── cardContent.ts        # Content configuration (single source of truth)
├── lib/
│   └── validation.ts         # Code validation logic
└── public/
    ├── card-photos/          # Photo assets
    └── text-copy/            # Markdown versions of content
```

## Features

### Landing Page
- Minimal, mysterious design with paper texture
- Invite code validation (case-insensitive)
- Elegant error handling with shake animation
- Loading states with spinner
- Keyboard accessible (Enter to submit)
- Fade-out transition when code is accepted (800ms)

### Invalid Code Handling
- **Error page** displays when code is not found
- Shows the invalid code attempted
- Auto-redirects to home after 3 seconds
- Manual "Go to Home" button for immediate return
- Smooth animations with Framer Motion

### Card Experience
- **Dynamic routes**: URL reflects invite code (`/[code]`)
- **Route protection**: Direct URL access validates code from URL
- **Envelope animation**:
  - Appears with fade-in
  - Displays "For [Name]" on outside (visible for 1 second)
  - Flap opens smoothly (800ms)
  - Holds for 1 second before dissolving
- **Dissolve transition**: Smooth 1-second crossfade from envelope to card
- **Reduced motion support**: Respects OS preferences
- **Dynamic typography**:
  - Font size auto-adjusts based on viewport (18-32px)
  - Line height adapts to font size (1.85-1.95)
  - Optimal reading measure maintained
  - Mobile: 18px fixed
  - Tablet: 20-25px responsive
  - Desktop: 24-28px responsive
  - Large desktop: 26-32px responsive
- **Smart text alignment**:
  - Justified text on desktop (>1024px)
  - Last lines left-aligned (prevents orphan line issues)
  - Left-aligned on tablets and mobile (<1024px)
  - Widow/orphan control for better line breaks
- **Responsive photo layout**:
  - Polaroid-style frames with subtle rotation (-2deg/+2deg)
  - Float left/right with text wrapping on desktop
  - Stack vertically centered on mobile (<480px)
  - Scale proportionally: 28-32% of container width
  - Hover effect: scale + lift animation
- **Semantic HTML**: Proper heading hierarchy and ARIA labels

## Design System

### Colors

- **Background**: Warm off-white (`#F8F6F3`)
- **Card**: Ivory (`#FDFCFA`)
- **Accent Gold**: `#C9A961`
- **Accent Indigo**: `#3E4C6D`
- **Text Primary**: `#2A2621`
- **Text Secondary**: `#6B6560`

### Typography

- **Headings**: Playfair Display (serif)
- **Body**: DM Sans (sans-serif)
- **Accent**: Space Grotesk (sans-serif)
- **Scale**: Dynamic fluid typography
  - Title: `clamp(2rem, 5vw + 1rem, 4.5rem)`
  - Subtitle: `clamp(0.875rem, 0.5vw + 0.75rem, 1.125rem)`
  - Body: Dynamically calculated (18-32px) based on viewport and container
  - Greeting: `clamp(1.125rem, 0.75vw + 0.875rem, 1.5rem)`
  - Line-height: 1.85-1.95 (adapts to font size)

### Animation Timing

- **Landing to envelope**: 800ms fade
- **Envelope appears**: 500ms
- **Envelope holds**: 1000ms (text visible)
- **Flap opens**: 800ms
- **Post-open hold**: 1000ms
- **Envelope to card**: 1000ms dissolve
- **Card content reveal**: 800ms fade-in
- **Font size transitions**: 300ms ease
- **Easing**: `ease-out` / `ease-in-out`

## Accessibility

✅ WCAG AA compliant contrast ratios
✅ Semantic HTML structure
✅ Keyboard navigation support
✅ Screen reader friendly
✅ Reduced motion support
✅ Focus indicators
✅ Alt text for all images

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel
3. Deploy (zero configuration needed)

### Environment Variables

No environment variables required for Phase 0.

## Future Enhancements (Phase 1)

- Multi-card support with database
- Admin dashboard for content management
- Custom subdomains per card
- Analytics and read receipts
- Reactions and replies
- PDF export

## License

Private project - All rights reserved.

---

**Created with care** 🤍
