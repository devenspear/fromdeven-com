export const CARD_CONTENT = {
  // Single invite code for Phase 0
  inviteCode: "Stacy251116",

  // Recipient information
  recipientName: "Stacey",

  // Card metadata
  label: "A note from Deven & Nancy Jo",
  title: "Thank You",
  subtitle: "A Week at Crafted · November 2025",

  // Greeting
  greeting: "Hi Stacy,",

  // Poem stanzas - will be interspersed with photos
  stanzas: [
    "A week at Crafted, wrapped in light,\nYou made Alys feel just *so* right.\nFrom first warm welcome, smile so true,\nThe magic of the week was *you*.",

    "You opened doors and hearts with grace,\nGave us a front-row seat to place.\nEach sip and story, every show,\nMeant more than you could ever know.",

    "Firkin Fête and soiree glow,\nThe Makers Market's gentle flow,\nBehind it all, your steady hand,\nCrafting moments, shaping brand.",

    "Your marketer's mind, your host's warm art,\nSomehow speak right to the heart.\nYou made the schedule, crowds, and pace\nStill feel like time in sacred space.",

    "You welcomed us with such sweet grace,\nA VIP embrace in every space.\nThe stay, the care, the thoughtful touch—\nYou made us feel like we mattered *so* much.",

    "We leave inspired, and grateful too,\nFor Crafted, Alys, and for you.\nIf ever we can help or share,\nJust say the word — we'll *be* there."
  ],

  // Closing signature
  closing: "With deep appreciation,\n\nDeven & Nancy Jo",

  // Photos to be interspersed with text
  // Position indicates where in the flow (0 = before first stanza, 1 = after first stanza, etc.)
  photos: [
    {
      src: "/card-photos/Crafted1.jpg",
      alt: "Crafted memories",
      position: "left", // left or right alignment
      caption: undefined as string | undefined
    },
    {
      src: "/card-photos/Crafted3.jpg",
      alt: "Moments at Crafted",
      position: "right",
      caption: undefined as string | undefined
    },
    {
      src: "/card-photos/Crafted4.jpg",
      alt: "Crafted experiences",
      position: "left",
      caption: undefined as string | undefined
    },
    {
      src: "/card-photos/Crafted5.jpg",
      alt: "Crafted atmosphere",
      position: "right",
      caption: undefined as string | undefined
    }
  ],

  // Theme configuration (for future expansion)
  theme: {
    variant: "ivory-gold" as const
  }
} as const;

// Type exports for use throughout the app
export type CardContent = typeof CARD_CONTENT;
export type Photo = typeof CARD_CONTENT.photos[number];
export type Stanza = typeof CARD_CONTENT.stanzas[number];
