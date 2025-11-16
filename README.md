# FromDeven.com - Phase 0

A mysterious, high-touch digital experience for delivering personalized thank-you cards.

## Overview

FromDeven.com is an elegant, minimal website that creates a special moment for recipients of personalized notes. Phase 0 is a proof-of-concept featuring:

- **Landing page** with invite code authentication
- **Beautiful envelope opening animation** (respects reduced-motion preferences)
- **Card experience** with typography, photos, and smooth scrolling reveals
- **Photo gallery** with lightbox zoom functionality
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
  body: [
    "First paragraph...",
    "Second paragraph...",
  ],
  closing: "Signature",
  photos: [...],
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
    caption: "Optional caption",
    alt: "Descriptive alt text for accessibility"
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
│   ├── page.tsx              # Landing page
│   ├── card/
│   │   └── page.tsx          # Card experience (route-protected)
│   ├── layout.tsx            # Root layout
│   └── globals.css           # Global styles
├── components/
│   ├── landing/
│   │   └── InviteGate.tsx    # Invite code input
│   ├── card/
│   │   ├── CardContent.tsx   # Main card display
│   │   ├── EnvelopeAnimation.tsx
│   │   └── PhotoGallery.tsx  # Gallery with lightbox
│   └── shared/               # (Future shared components)
├── config/
│   └── cardContent.ts        # Content configuration
├── lib/
│   └── validation.ts         # Code validation logic
└── public/
    └── card-photos/          # Photo assets
```

## Features

### Landing Page
- Minimal, mysterious design
- Invite code validation
- Elegant error handling
- Loading states
- Keyboard accessible (Enter to submit)

### Card Experience
- **Route protection**: Direct URL access is guarded
- **Envelope animation**: Smooth opening sequence
- **Reduced motion support**: Respects OS preferences
- **Responsive typography**: Scales beautifully across devices
- **Scroll-triggered reveals**: Paragraphs fade in as you read
- **Photo gallery**: Click to zoom, swipe to close
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
- **Body**: Inter (sans-serif)
- **Scale**: Responsive fluid typography

### Animation Timing

- Page transitions: 400-600ms
- Element reveals: 250-400ms
- Easing: `ease-out` / `ease-in-out`

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
