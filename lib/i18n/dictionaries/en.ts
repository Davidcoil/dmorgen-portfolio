/* ============================================================================
 * English dictionary — mirrors the Hebrew key structure exactly.
 * Brand tone ("editorial premium"): the client is the hero. Invites,
 * never demands. Same influence techniques, adapted — not transliterated.
 * ========================================================================== */

import type { Dictionary } from "./he";

export const en: Dictionary = {
  meta: {
    siteName: "David Morgenstern · Events & Family Photography",
    title: "David Morgenstern · Events & Family Photographer — there's no such thing as unphotogenic people.",
    description:
      "Events and family photographer in Israel: Bar/Bat Mitzvah, brit ceremonies, birthdays and corporate events. My mission: that you'll look at your photo and think — wow, that's me.",
  },
  nav: {
    galleries: "Client Stories",
    events: "Events",
    family: "Family & Kids",
    portraits: "Personal Portraits",
    business: "Business Image",
    about: "The Man Behind the Camera",
    clientArea: "Client Area",
    contact: "Contact",
    bookNow: "Let's Meet",
    openMenu: "Open menu",
    closeMenu: "Close menu",
  },
  hero: {
    eyebrow: "Events & Family Photography",
    title: "There's no such thing as unphotogenic people.",
    subtitle:
      "There are only people who haven't been photographed well yet. I'm David — and I don't stop until you see in the picture what the people who love you already see. I photograph Bar/Bat Mitzvah, brit ceremonies, birthdays, corporate events and family shoots.",
    ctaPrimary: "Let's Meet",
    ctaSecondary: "Browse client stories",
    trustLine:
      "Everyone deserves to feel good looking at their own photo",
    imageAlt:
      "Woman's portrait in soft studio light — photography by David Morgenstern",
    scrollHint: "Scroll to explore",
  },
  home: {
    galleriesEyebrow: "Client Stories",
    galleriesTitle: "Their stories. Soon — yours.",
    galleriesSubtitle:
      "Every family here came with one day that mattered to them. Scroll slowly, and notice which moments feel like yours.",
    midCtaText: "Want a story like this of your own?",
    trustStrip: {
      eyebrow: "Peace of mind, built in",
      items: [
        {
          icon: "shield",
          title: "Backup gear, always",
          text: "Spare cameras and lenses. A technical glitch will never stop your day.",
        },
        {
          icon: "contract",
          title: "A clear contract up front",
          text: "Hours, deliverables, price — written and signed. Zero surprises.",
        },
        {
          icon: "clock",
          title: "There before everyone",
          text: "I arrive early, learn the venue, ready when the guests walk in.",
        },
        {
          icon: "backup",
          title: "No moment gets lost",
          text: "Every frame backed up from the very first shot.",
        },
      ],
    },
    howItWorks: {
      eyebrow: "How it works",
      title: "Simple. Organized. No surprises.",
      steps: [
        {
          title: "A short call",
          text: "Tell me what you're celebrating, when and where. We check the fit — no pressure, no commitment.",
        },
        {
          title: "A written proposal",
          text: "You get it in writing: hours, deliverables, final price. You know exactly what you're paying for.",
        },
        {
          title: "Locking your date",
          text: "A small deposit and the date is yours. It's not going anywhere.",
        },
        {
          title: "The big day",
          text: "I'm there before everyone. You celebrate — I take care of everything.",
        },
        {
          title: "Gallery & retouch",
          text: "Within days you get an organized gallery to choose from, and your picks get full retouching.",
        },
      ],
    },
    valueProps: [
      {
        title: "I look. Really look.",
        text: "To invest. To look. To listen. To guide. To try again. To change the light, the angle, the pose, the mood — until you see what I see.",
      },
      {
        title: "Photography that changes how you feel",
        text: "Not just how you look. Advanced AI technology, and the eye of someone who cares — so the photo feels like the best, truest, most confident version of you.",
      },
      {
        title: "Patience that doesn't run out",
        text: "One more minute. One more try. One more thought. Because the moment you see yourself and suddenly smile — it's worth it.",
      },
    ],
    corporate: {
      eyebrow: "For businesses too",
      title: "Your company event, in safe hands",
      subtitle:
        "Corporate events, conferences, employee headshots and marketing content — everything an office manager needs to sleep well at night.",
      services: [
        {
          title: "Corporate events & conferences",
          text: "Holiday parties, company retreats, launches — full, discreet, precise coverage.",
        },
        {
          title: "Employee headshots",
          text: "Professional portraits for your website and LinkedIn, in a relaxed atmosphere.",
        },
        {
          title: "Marketing content",
          text: "Photos for your website, social and campaigns — ready to work from day one.",
        },
      ],
      trustTitle: "Working with businesses — like a business",
      trustItems: [
        "Proper tax invoices",
        "Recognized Israel Ministry of Defense supplier",
        "On-time delivery",
        "Full discretion",
      ],
      cta: "Tell me about your company event",
      waMessage:
        "Hi David! We're looking for a photographer for our company event. I'd love details.",
    },
    aboutTeaser: {
      eyebrow: "Nice to meet you",
      title: "It's not a bonus. It's my mission.",
      text: "I'm David — photographer, dad, a people person. Everyone who stands in front of my camera — I want them to look at themselves and think: wow, that's me. And I love what I see.",
      cta: "Meet David",
      imageAlt: "David Morgenstern with a camera in warm sunlight",
    },
    cta: {
      title: "You deserve to love what you'll see.",
      subtitle:
        "Tell me what you're celebrating. If we click — you'll gain someone who doesn't give up until you're smiling for real.",
      primary: "Let's meet",
      secondary: "WhatsApp me directly",
    },
  },
  galleries: {
    title: "Client Stories",
    subtitle:
      "Every story here began with one day that mattered to someone. Go through the stories — which one feels like yours?",
    viewFullGallery: "See the full story",
    backToGalleries: "Back to all stories",
    closePreview: "Close preview",
    prevImage: "Previous image",
    nextImage: "Next image",
    categories: {
      events: {
        title: "Events",
        tagline: "Bar/Bat Mitzvah · Brit Ceremonies · Birthdays · Corporate Events",
        description:
          "Event photography in Israel — Bar and Bat Mitzvah, brit ceremonies, birthdays and corporate events. The day everyone came for you, and you didn't get to see any of it. Lucky I was there for you.",
      },
      family: {
        title: "Family & Kids",
        tagline: "Family shoots outdoors or at a location you love",
        description:
          "Family shoots outdoors or at a location you love. No poses and no 'say cheese' — just you as you are: laughing, hugging, sometimes messy. That's the most beautiful.",
      },
      portraits: {
        title: "Personal Portraits",
        tagline: "Empowerment · Maternity · Profile Portraits",
        description:
          "Personal portrait photography — empowerment, maternity and profile. See yourself like you haven't in a long time. In a calm, pleasant atmosphere — no pressure, no forced poses.",
      },
      business: {
        title: "Business Image",
        tagline: "Business Portraits · Corporate Events · Marketing Content",
        description:
          "Business image photography — business portraits and corporate events. Because in the end, clients buy from people. Images full of confidence and presence — making everyone who sees you feel they already know you.",
      },
    },
  },
  about: {
    eyebrow: "Nice to meet you",
    title: "Hi, I'm David. Here's what that means for you.",
    imageAlt: "David Morgenstern — events and family photographer",
    paragraphs: [
      "Everyone deserves to look at a photo of themselves and feel good. Not just 'I came out okay' — to look and think: wow. That's me. And I love what I see.",
      "I don't believe there are 'unphotogenic' people. I believe there are people who haven't been photographed well yet. Most people don't bother making someone look beautiful — because they don't care the way I do. And that's the whole difference.",
      "I love to invest. To look. To listen. To guide. To try again. To change light, angle, pose or mood — until you see in yourselves what the people who love you already see.",
      "I live and breathe technology and AI — tools that work quietly behind the scenes. And I'm a dad — thanks to my daughter I know exactly what a single moment is worth, and how important it is to have a good photo of it.",
    ],
    values: [
      {
        title: "No 'unphotogenic'",
        text: "There are only people who haven't been photographed well yet. I don't give up until you see what I see.",
      },
      {
        title: "Your best version — not someone else's",
        text: "I won't promise you'll look like someone else. On the contrary. I'll do everything to make you look like the best, truest, most confident version of yourself.",
      },
      {
        title: "Technology in service of emotion",
        text: "AI and advanced tools are the means. Your smile is the goal. The technology works quietly — you just celebrate.",
      },
    ],
    cta: "See if we're a good fit",
  },
  contact: {
    title: "Let's see if we're a good fit",
    subtitle:
      "Tell me in a few words what you're celebrating. If it feels right for both of us — we'll take it from there. No pressure.",
    form: {
      name: "Full name",
      namePlaceholder: "What should I call you?",
      phone: "Phone",
      phonePlaceholder: "050-0000000",
      eventType: "Event type",
      eventDate: "Estimated date",
      message: "Tell me more",
      messagePlaceholder: "Where's the event? How many guests? Anything helps…",
      submit: "Send via WhatsApp",
      note: "The form opens WhatsApp with your details. No commitment, no spam — just a good conversation.",
      missingNumber:
        "WhatsApp number not configured — add NEXT_PUBLIC_WHATSAPP_NUMBER to the environment file.",
      eventTypes: [
        "Bar/Bat Mitzvah",
        "Brit Ceremony",
        "Birthday",
        "Corporate Event",
        "Family Shoot",
        "Personal Portrait",
        "Other",
      ],
    },
    direct: {
      title: "Prefer direct?",
      phoneLabel: "Phone",
      emailLabel: "Email",
      whatsappLabel: "WhatsApp",
      whatsappValue: "Message me",
    },
  },
  clientGallery: {
    eyebrow: "Client Area",
    title: "Your story, ready to choose from",
    subtitle:
      "Every photo from your day is waiting here. Go through them at ease, mark your favorites — and years from now you'll be glad you stopped to choose.",
    openInNewTab: "Open in new tab",
  },
  footer: {
    tagline: "Everyone deserves to feel good looking at their own photo.",
    navTitle: "Navigate",
    contactTitle: "Contact",
    rights: "All rights reserved",
  },
  chat: {
    fabLabel: "Open chat with David's assistant",
    closeLabel: "Close chat",
    title: "David's Assistant",
    online: "Online now",
    inputPlaceholder: "Type a message…",
    sendLabel: "Send",
    welcome:
      "Hi! So glad you're here. I'm David's assistant — ask me about shoots, pricing or dates, or just pick a topic:",
    quickReplies: [
      { label: "Event photography", intent: "events" },
      { label: "Family shoots", intent: "family" },
      { label: "How much does it cost?", intent: "pricing" },
      { label: "Booking a date", intent: "booking" },
    ],
  },
  faq: {
    title: "Frequently asked questions",
    items: [
      {
        q: "How is an event priced?",
        a: "Every event is priced individually — based on shooting hours, location and the add-ons you choose. Tell me what you're celebrating and I'll build you a clear proposal, no commitment.",
      },
      {
        q: "How long until we get the photos?",
        a: "A few days to a week, depending on the size of the event. You get an organized gallery to choose from, and the selected photos go through full retouching.",
      },
      {
        q: "How do we reserve a date?",
        a: "Send me a WhatsApp message or use the form here — if the date is free, it's yours.",
      },
    ],
  },
  common: {
    loading: "Loading…",
  },
};
