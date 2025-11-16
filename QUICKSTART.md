# Quick Start Guide

## Test the Application

The server is running at **http://localhost:3001**

### Test Flow 1: Correct Invite Code

1. Visit http://localhost:3001
2. Enter invite code: `DEVEN-2025-11-16` (case-insensitive)
3. Click "View" or press Enter
4. Watch the envelope animation
5. Read the card content
6. Click on any photo to open the lightbox
7. Click outside or press the X to close

### Test Flow 2: Incorrect Code

1. Visit http://localhost:3001
2. Enter any incorrect code (e.g., "WRONG-CODE")
3. See the error message and shake animation
4. Try the correct code to proceed

### Test Flow 3: Direct URL Protection

1. Open a new tab
2. Navigate directly to http://localhost:3001/card
3. You should be redirected back to the landing page
4. Enter the correct invite code on the landing page first
5. Then you can access /card

## Customizing Your Content

### 1. Change the Invite Code

Edit `config/cardContent.ts`:

```typescript
inviteCode: "YOUR-CUSTOM-CODE-2025"
```

### 2. Update Card Text

Edit any of these fields in `config/cardContent.ts`:

```typescript
label: "Your label"
title: "Your Title"
subtitle: "Your subtitle"
body: [
  "First paragraph...",
  "Second paragraph..."
]
closing: "Your signature"
```

### 3. Replace Photos

**Option A - Use existing photos:**
1. Place your photos in `public/card-photos/`
2. Name them: `photo1.jpg`, `photo2.jpg`, `photo3.jpg`

**Option B - Update paths:**
1. Place photos anywhere in `public/`
2. Update paths in `config/cardContent.ts`:

```typescript
photos: [
  {
    src: "/card-photos/my-image.jpg",
    caption: "Your caption",
    alt: "Accessibility description"
  }
]
```

### 4. See Your Changes

The dev server auto-reloads! Just save your files and refresh the browser.

## Deployment to Vercel

1. Initialize git (if not already):
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. Push to GitHub:
   ```bash
   gh repo create fromdeven-com --private --source=. --push
   ```

3. Deploy to Vercel:
   - Visit https://vercel.com
   - Click "New Project"
   - Import your GitHub repository
   - Click "Deploy"
   - Your site will be live at `your-project.vercel.app`

4. Add custom domain:
   - In Vercel dashboard, go to Settings → Domains
   - Add `fromdeven.com`
   - Update DNS records as instructed

## Testing Checklist

- [ ] Landing page loads with invite code input
- [ ] Correct code (`DEVEN-2025-11-16`) proceeds to card
- [ ] Incorrect code shows error message
- [ ] Envelope animation plays smoothly
- [ ] Card content displays all paragraphs
- [ ] Photos display in gallery
- [ ] Clicking photo opens lightbox
- [ ] Lightbox closes on outside click or X button
- [ ] Direct URL to /card redirects when not validated
- [ ] Responsive on mobile (try resizing browser)
- [ ] Works with keyboard navigation
- [ ] Smooth scrolling and animations

## Troubleshooting

**Images not loading?**
- Check file paths in `config/cardContent.ts`
- Ensure images are in `public/` directory
- File names are case-sensitive

**Port already in use?**
- Next.js will automatically use next available port
- Check terminal output for actual port number

**Animation not smooth?**
- Check browser DevTools console for errors
- Try hard refresh (Cmd/Ctrl + Shift + R)

**Changes not appearing?**
- Make sure you saved the file
- Hard refresh browser
- Check terminal for build errors

## Support

For issues or questions, check:
- README.md for detailed documentation
- PRD.md for original requirements
- Next.js docs: https://nextjs.org/docs

---

Enjoy your beautiful card experience! ✨
