# FromDeven.com – Phase 0 PRD

**Version:** 1.0
 **Owner:** Deven
 **Domain:** `https://fromdeven.com`
 **Tech:** Next.js (Vercel), TypeScript, React

------

## 1. Product Overview

FromDeven.com is a **mysterious, high-touch front door** to a single, bespoke thank-you experience.

**Phase 0** is a proof-of-concept that:

- Implements the **full visual, motion, and interaction design** for:
  - A minimal landing page that *only* accepts an invite code.
  - A fully designed “card” page with text + photos + animations.
- Uses **one hard-coded invite code** and **one set of content** (text + images), supplied manually in the project folder.
- Does **not** include any admin UI, database, or multi-card management yet.

Phase 1 will extend this into a multi-card system with an admin dashboard. Phase 0 must be coded so that Phase 1 is a natural evolution, not a rewrite.

------

## 2. Goals & Non-Goals

### 2.1 Goals (Phase 0)

1. Deliver a **production-quality, visually polished** experience at `fromdeven.com` with:
   - A landing page that requires an invite code.
   - A dedicated card page with animations and photos.
2. Implement the **card-opening animation** and elegant typography/color system.
3. Allow **one valid invite code** to reveal the card; all other codes are handled gracefully.
4. Make it **easy for Deven to change the content** (text, images, invite code) by editing a config file + dropping new assets into a folder—no admin UI.
5. Ensure the architecture is **future-proof** for Phase 1 (DB + admin) without committing to it yet.

### 2.2 Non-Goals (Phase 0)

- No admin dashboard or content management UI.
- No multi-recipient support (only one card).
- No analytics, reactions, replies, or PDF export.
- No direct public URLs or subdomains for individual cards (viewing is always initiated via the invite code on the homepage).

------

## 3. User Personas

### 3.1 Recipient

- Receives a message from Deven telling them to visit `fromdeven.com`.
- Has been given an **invite code** privately (e.g., “DEVEN-2025-11-16”).
- Expectation: an elegant, personal, “secret” note.

### 3.2 Deven (Admin – for Phase 0)

- Developer + author.
- Updates content **by editing files in the repo**:
  - Text content.
  - Photo file paths.
  - Invite code.
- Deploys to Vercel manually.

------

## 4. High-Level Flows

### 4.1 Primary Flow – Correct Code

1. User navigates to `fromdeven.com`.
2. Sees minimal landing page with:
   - “Invite code” input.
   - “View” button.
3. Enters the **correct invite code**.
4. On submit:
   - Code is validated.
   - On success, user is transitioned to the **card experience** (either:
     - Client-side route change to `/card`, or
     - In-place reveal of card).
5. Card page loads with:
   - Opening animation (envelope/card open).
   - Then card content (text + photos) reveals.
6. User reads, scrolls, views photos (zoom modal), closes page when finished.

### 4.2 Secondary Flow – Incorrect Code

1. User enters an **incorrect invite code**.
2. On submit:
   - Validation fails.
   - An inline error appears under input (“That code doesn’t ring a bell.”).
3. Input remains editable; user can try again.

### 4.3 Direct URL Guarding

- If `/card` is implemented as a separate route:
  - Direct navigation to `/card` **without a validated session** must redirect to `/` (landing page).
  - Only a successful invite code submission should flag the user as “allowed” to view the card (even in Phase 0).

Implementation detail is flexible (cookie, local storage, query param), but the behavior is required.

------

## 5. Detailed Requirements

### 5.1 Landing Page – FromDeven.com

**Route:** `/`

**Purpose:** Mysterious, elegant door. Only action is entering invite code.

**UI Elements:**

1. **Background**
   - Soft, “quiet luxury” aesthetic:
     - Paper-like texture or subtle gradient.
     - Very subtle vignette or radial light to draw focus to center.
   - No obvious branding or navigation links.
2. **Center Panel**
   - A simple, refined panel (could resemble:
     - A nameplate, or
     - A monogrammed card front).
   - Elements inside:
     - Small line of copy at top (e.g. “A private note awaits you.”).
     - Label: “Invite code”.
     - Text input.
     - Primary button labeled **“View”**.
   - Everything is vertically and horizontally centered in viewport.
3. **States:**
   - **Default:**
     - Empty input, View button enabled but no effect until non-empty.
   - **Input focused:**
     - Subtle glow or underline animation.
   - **Loading:**
     - After pressing View, show a small spinner/“checking…” feedback.
   - **Error:**
     - For invalid code:
       - Shake animation (very subtle).
       - Error text: “That code doesn’t ring a bell. Please try again.”
   - **Keyboard:**
     - Pressing Enter in input should trigger the same as clicking “View”.
4. **Accessibility:**
   - Proper `<label>` associated with input.
   - Sufficient color contrast for text vs background.
   - Form usable by keyboard only.

**Behavior:**

- Code is trimmed (ignore leading/trailing spaces).
- Case-insensitive match is acceptable (configurable), but PRD will assume case-insensitive.
- Only a **single valid code** is needed in Phase 0.

------

### 5.2 Card Experience – The “Note”

You can implement this as:

- `/card` route, OR
- A component that mounts/reveals on `/` after validation.

For Phase 0, choose the simpler approach for you, but:

- Direct navigation must still be “guarded” if it’s a separate route.

#### 5.2.1 Card Entry & Animation

**Entry sequence after successful code validation:**

1. **Transition from landing:**
   - Either:
     - Fade out landing elements and fade in the envelope/card, or
     - Page route change with a beautiful initial state (e.g., centered envelope).
2. **Envelope animation (preferred):**
   - Closed envelope with the recipient’s name (or “For You”) on it.
   - On first load (no extra user action required):
     - Envelope lifts slightly.
     - Flap opens smoothly.
     - Card slides out or the inner panel is revealed.
3. **Reduced motion mode:**
   - If user’s OS prefers reduced motion:
     - Skip the animation, go directly to open card with a simple fade-in.

#### 5.2.2 Card Layout & Content

**Card visual:**

- A vertical “sheet of paper” centered on screen.
- Soft drop shadow, slight texture, rounded or very slightly beveled edges.
- Margin around card so background remains visible.

**Content sections (all content comes from Phase 0 config file):**

1. **Label (optional)**
   - Small uppercase or small-caps label at the top (e.g. “A note from Deven”).
2. **Title**
   - Large, serif display font.
   - One line, short and emotional.
3. **Subtitle (optional)**
   - Medium-weight line under the title.
   - Could be a date / short phrase.
4. **Body text**
   - Multi-paragraph, supports line breaks and poetic formatting.
   - Typesetting:
     - Comfortable line height.
     - Line length ~60–75 characters.
   - Animations:
     - First paragraph fades in with a slight delay after card opens.
     - Remaining paragraphs fade in as user scrolls, or in a timed stagger.
5. **Closing / Signature**
   - Slightly separated with an em dash or rule.
   - Styled like a handwritten signature (different font) or simply italic.
6. **Photo Section**
   - Appears after the text content.
   - Layout (Phase 0):
     - Configurable to support:
       - Single large hero image.
       - 2-up layout.
       - 3-image mosaic.
   - Each photo:
     - Small caption (optional).
     - Hover: tiny scale-up/shadow (on desktop).
   - Click/tap opens a **lightbox modal**:
     - Darkened background.
     - Image centered, fits viewport.
     - Click outside / “X” closes it.
   - Photos loaded responsively (`<img>` or Next `Image` component with appropriate sizes).

#### 5.2.3 Card Behavior & States

- **Initial load:**
  - Card enters with animation only once per session (if you re-enter, you can show a simplified version to keep it snappy; optional for Phase 0).
- **Scroll behavior:**
  - Smooth scrolling; card content extends as needed.
  - On mobile, card can be full-width, but still visually separated from background.
- **Error handling:**
  - If for any reason the card config fails to load, show a friendly message instead of crashing.

------

### 5.3 Incorrect Code Handling

Requirements already noted in flows, but explicitly:

- If submitted code ≠ configured code:
  - Show inline error under input.
  - Do **not** refresh page.
  - Do **not** navigate to card.
  - Allow immediate retry.

Optional (nice-to-have for Phase 0):

- After N failed attempts (e.g., 5), show a softer hint:
  - “If you believe you’ve received an invite, please double-check the code Deven sent you.”

------

### 5.4 Content & Configuration (Phase 0 Manual Setup)

**Goal:** Deven can change code, text, and photos by editing one file and one folder.

#### 5.4.1 Content File

Create a single TypeScript config file, e.g.:

```
src/config/cardContent.ts
```

Example shape:

```
export const CARD_CONTENT = {
  inviteCode: "DEVEN-2025-11-16",
  recipientName: "Recipient Name",
  label: "A note from Deven",
  title: "Thank You For An Unforgettable Evening",
  subtitle: "November 16, 2025",
  body: [
    "Paragraph one of the note...",
    "Paragraph two, which may be poetic or rhymed...",
    "Paragraph three, etc."
  ],
  closing: "With gratitude,\nDeven",
  photos: [
    {
      src: "/card-photos/photo1.jpg",
      caption: "The moment we all laughed at the table.",
      alt: "Friends gathered around a dinner table"
    },
    {
      src: "/card-photos/photo2.jpg",
      caption: "You and I outside the restaurant.",
      alt: "Two people smiling outside a restaurant"
    }
  ],
  theme: {
    variant: "ivory-gold" // enum string for future extension
  }
} as const;
```

Notes:

- `body` as an array of paragraphs gives you explicit control over breaks.
- `closing` can contain `\n` which is rendered as line breaks.
- `inviteCode` is the **single source of truth** for validation.

#### 5.4.2 Assets Folder

- Place all Phase 0 images under:
  - `public/card-photos/`
- Refer to them by path (e.g. `/card-photos/photo1.jpg`) in `CARD_CONTENT.photos`.

------

### 5.5 Validation & Access Control (Phase 0)

To keep Phase 0 simple but future-ready:

- Implement a small validation module using `CARD_CONTENT.inviteCode`.

**Option A – Client-side only (simpler, acceptable in Phase 0):**

- On submit:
  - Compare entered code (normalized) to `CARD_CONTENT.inviteCode`.
  - If match → locally mark “validated” state (React state / context) and show card.
  - If no match → show error.
- Direct navigation to `/card` (if such a route exists) without validated state:
  - Redirect to `/`.

**Option B – API + cookie (closer to Phase 1):**

- `/api/validate-code`:
  - Accepts `code`.
  - Compares to `CARD_CONTENT.inviteCode`.
  - On success, sets a signed cookie `fromdeven_access=true`.
- `/card` route:
  - On server, checks for cookie; no cookie → redirect `/`.
- For Phase 0, Option A is perfectly fine unless you want to harden early.

The PRD does **not** enforce Option B but acknowledges it as a Phase 1-friendly pattern.

------

### 5.6 Visual Design Guidelines

**Typography:**

- Heading font: refined serif (e.g. “display serif” style).
- Body font: humanist sans.
- Use consistent scale:
  - Title ~2–2.5rem.
  - Body ~1–1.1rem.
  - Caption ~0.9rem.

**Colors:**

- One primary theme for Phase 0, e.g.:
  - Background: warm off-white or soft charcoal.
  - Card: ivory or light cream.
  - Accent: muted gold or deep indigo.
- No loud or saturated colors; everything should feel calm and expensive.

**Motion:**

- Use Framer Motion or CSS transitions.
- Durations: 250–600ms (never “snappy” in a jarring way).
- Easing: gentle (ease-in-out, cubic-bezier with soft curves).

------

### 5.7 Accessibility & Performance

**Accessibility:**

- Semantic HTML for form, headings, and body.
- Text alternatives for every image via `alt`.
- Respect `prefers-reduced-motion`.
- Ensure color contrast meets WCAG AA.

**Performance:**

- Optimize images (reasonable dimensions, compressed).
- Use Next Image if convenient.
- Keep JavaScript bundle minimal (avoid heavy libraries beyond what’s necessary for animation).

------

## 6. Technical Stack & Structure

**Stack:**

- Next.js (App Router or Pages Router – your preference).
- TypeScript.
- Styling:
  - TailwindCSS or CSS Modules (your call; PRD doesn’t mandate).
- Animation:
  - Framer Motion (preferred) or well-organized CSS animations.

**Suggested Structure:**

- `src/app/page.tsx` – Landing page + gate logic.
- `src/app/card/page.tsx` – Card page (if using separate route).
- `src/components/card/Card.tsx` – Reusable Card component.
- `src/components/layout/*` – Layout primitives.
- `src/config/cardContent.ts` – Phase 0 content config.
- `public/card-photos/*` – Images.

------

## 7. Acceptance Criteria (Phase 0)

1. **Landing page is minimal and mysterious:**
   - No nav or extra links.
   - Only obvious action is entering an invite code and pressing View.
2. **Correct invite code shows the card:**
   - Entering `CARD_CONTENT.inviteCode` (case-insensitive) leads to card experience with animation.
   - No page reload required unless route-based by design.
3. **Invalid invite codes are gracefully handled:**
   - Error message appears inline.
   - User can correct and resubmit without refreshing.
   - Card is not displayed.
4. **Card renders exactly one set of content:**
   - All text from `cardContent.ts` is displayed correctly, with preserved paragraphs and line breaks.
   - All photos listed in config appear; clicking any photo opens a zoom modal.
5. **Animation works and respects reduced-motion:**
   - On normal settings: envelope/card opening animation plays once on first view.
   - With OS reduced motion: card appears via simple fade-in, no elaborate animation.
6. **Direct URL guarding (if using `/card` route):**
   - Visiting `/card` directly without validating code first redirects the user to `/`.
7. **Content is editable by file only:**
   - Changing `CARD_CONTENT` text or invite code and redeploying updates the live experience.
   - Replacing images in `public/card-photos/` updates visuals without changing code (as long as paths match).

------

## 8. Phase 1 Preview (For Future PRD)

*Not to be implemented now, but Phase 0 should not block:*

- Multiple cards stored in a DB.
- Admin dashboard for card creation/editing.
- Per-card invite codes.
- Analytics and reactions.
- PDF export.