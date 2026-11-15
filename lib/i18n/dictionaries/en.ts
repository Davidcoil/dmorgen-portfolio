/* ============================================================================
 * English dictionary. Mirrors the Hebrew key structure exactly.
 * Copy V2 (15 Nov 2026), from 04_COPY_EN_APPROVAL.md. The Hebrew is
 * authoritative for intent; this is written English, not a translation.
 * No long dashes. No wedding content. No unconfirmed facts.
 * ========================================================================== */

import type { Dictionary } from "./he";

export const en: Dictionary = {
  meta: {
    siteName: "David Morgenstern",
    title: "David Morgenstern | Events, Families, Portraits & Business Photography",
    description:
      "Photography for events, families, portraits and businesses. Thoughtful planning, attention to people and a clear approach to the final images.",
  },
  seo: {
    galleriesTitle: "Photography Portfolio | David Morgenstern",
    galleriesDescription:
      "Selected events, families, portraits and business photography by David Morgenstern.",
    aboutTitle: "About David Morgenstern | People, Photography and Creative Thinking",
    aboutDescription:
      "David Morgenstern photographs events, families, portraits and businesses. He comes prepared, adapts to the day, and gets the important photos first.",
    contactTitle: "Contact David Morgenstern | Photography Inquiries",
    contactDescription:
      "Tell David Morgenstern what you'd like photographed, where and when. An event, family photos, a portrait or business photography. Your details go straight to David.",
    clientAreaTitle: "Client Area | David Morgenstern",
  },
  nav: {
    galleries: "Work",
    about: "About",
    clientArea: "Client Area",
    contact: "Contact",
    bookNow: "Get in touch",
    openMenu: "Open menu",
    closeMenu: "Close menu",
  },
  hero: {
    eyebrow: "David Morgenstern | Events, family, portrait and business photography",
    title: "There are no unphotogenic people.",
    subtitle:
      "You don't need to know how to pose. That's my job: understand the people, help when needed, and make space for real moments. The same thinking guides how I photograph events, families, portraits and businesses.",
    ctaPrimary: "See my work",
    ctaSecondary: "Tell me what you're planning",
    imageAlt: "Woman's portrait in soft studio light, photographed by David Morgenstern",
  },
  home: {
    shootTypes: {
      title: "What are you planning?",
      cta: "See photos",
      items: [
        {
          slug: "events",
          title: "Events",
          text: "Bar and Bat Mitzvahs, brit ceremonies, birthdays and company events. I start by finding out which people and moments matter most.",
        },
        {
          slug: "family",
          title: "Family and children",
          text: "I want you to have a good photo of everyone together. And if everyone starts laughing for real along the way, I'm not going to stop them.",
        },
        {
          slug: "portraits",
          title: "Portraits",
          text: "You don't need to know how to pose. I guide you, look for the best light and adjust as we go, even if you've never liked photos of yourself.",
        },
        {
          slug: "business",
          title: "Business photography",
          text: "A team photo, professional portrait and company event do different jobs. I start with how you'll use the images, then plan around that.",
        },
      ],
    },
    galleriesEyebrow: "Selected work",
    galleriesTitle: "Some of my work",
    galleriesSubtitle:
      "Families, events, portraits and business photography. Take a look and see if this is the kind of photography you are looking for.",
    galleriesCta: "See all work",
    approach: {
      eyebrow: "Behind the photos",
      title: "I come with a plan. Then I work with what's actually there.",
      intro:
        "For outdoor sessions, I like to arrive early, check the location and light, and prepare. Then I meet the people, and the plan meets real life. I adjust to them and the time we have. First, we get the important shots. Then there's room for everything else.",
      items: [
        {
          title: "Know what matters",
          text: "Who must be in the photos? What do you most want to see afterwards? I'd rather know before the event begins.",
        },
        {
          title: "Guide without pressure",
          text: "If people need help posing, I guide them. If they're tense, I help them loosen up. And if something great happens naturally, I don't get in its way.",
        },
        {
          title: "Focus on the result",
          text: "First, the photos that really matter to you. Then we can explore, try other ideas and have some fun. When time gets tight, priorities matter.",
        },
      ],
    },
    howItWorks: {
      eyebrow: "Know what comes next",
      title: "From your message to your photos",
      steps: [
        {
          title: "Your message",
          text: "Tell me what you're planning, where and when, and what matters to you.",
        },
        {
          title: "Define the job",
          text: "We agree on the scope, price and deliverables in writing before booking.",
        },
        {
          title: "The shoot",
          text: "We arrive prepared and adapt to the day as it unfolds.",
        },
        {
          title: "Delivery",
          text: "Selected, edited digital files, delivered as agreed.",
        },
      ],
    },
    corporate: {
      eyebrow: "For businesses",
      title: "A good business image needs to know where it's going to work.",
      subtitle:
        "A team portrait, a website image and company event photography can all look great, but they have different jobs. Once I know who will see the images and where they'll be used, I can plan a shoot that fits.",
      services: [
        {
          title: "Company events and conferences",
          text: "We identify the people, activities and moments to cover, and how the pictures will be used.",
        },
        {
          title: "Business portraits",
          text: "Photos of the people behind your business, for your website, professional profiles and marketing.",
        },
        {
          title: "Marketing images",
          text: "Photography planned for where the finished images need to work.",
        },
      ],
      ctaGallery: "See business photography",
      ctaTalk: "Ask about a business shoot",
      waMessage: "Hi David, I'd like to talk about business photography.",
    },
    wall: {
      eyebrow: "Messages I've received",
      title: "This part isn't written by me.",
      subtitle:
        "A few notes from people I've photographed. Messages written in Hebrew are translated.",
      items: [
        {
          quote:
            "You managed to bridge a sensitivity we had with the girls, and with real skill you led us to the photo of the family hug. You didn't pounce, and you didn't panic, and you got it.",
          who: "A father",
          context: "after a family session",
        },
        {
          quote:
            "Four Bar Mitzvahs in our family. Besides a photographer of the highest level, we got to know an amazing person. Everyone who sees the albums is moved by their beauty and asks who the photographer is.",
          who: "The S. family",
          context: "Netanya",
        },
        {
          quote:
            "We've done several events and never met a photographer like you. The album is perfect, everything stylish and at a high level. We can't stop leafing through it.",
          who: "Tzipi",
          context: "after a Bar Mitzvah",
        },
        {
          quote:
            "Your gentleness and consideration in the craft of photography cannot be priced in money.",
          who: "Azriel",
          context: "",
        },
        {
          quote:
            "The album is amazing. You are very talented. You'll be the photographer for all our family events.",
          who: "Ofra",
          context: "",
        },
        {
          quote:
            "A lovely, thoughtful album, beautiful photos taken with a master's hand and the utmost attention. I appreciate the personal attitude and the patience with the delays on our side.",
          who: "Yehudit",
          context: "",
        },
        {
          quote:
            "Thank you for the special investment and the patience with a smile. For the professionalism and thoroughness down to the last detail.",
          who: "Shani",
          context: "",
        },
        {
          quote: "The pictures are stunning! I don't know how I will be able to choose photos for an album, they are all so good.",
          who: "Shani",
          context: "in the original English",
        },
        {
          quote: "The album is insane. Service and reliability above and beyond.",
          who: "P.",
          context: "2023",
        },
      ],
    },
    aboutTeaser: {
      eyebrow: "Nice to meet you",
      title: "I'm David. I like people, and I like things to work.",
      text: "That's what I enjoy about photography: noticing what works for the person in front of me, knowing when to step in and when to step back, and making the small choices that shape the whole picture. I also love ideas, content and technology. But I always come back to a simple question: what works here, for these people?",
      cta: "A little more about me",
      imageAlt: "David Morgenstern, no camera in hand",
    },
    cta: {
      title: "What are you planning?",
      subtitle:
        "An event, family pictures, a portrait or photos for your business. Tell me a little about what you need, where and when, and we'll see if it's a fit.",
      primary: "Share the details",
      secondary: "Message me on WhatsApp",
    },
  },
  galleries: {
    title: "See it in the pictures",
    subtitle:
      "Pick the type of photography you are interested in. There is plenty I could explain, but this is a better place to look at pictures.",
    viewFullGallery: "Open gallery",
    backToGalleries: "Back to all work",
    closePreview: "Close preview",
    prevImage: "Previous image",
    nextImage: "Next image",
    cta: {
      title: "Need photography like this?",
      subtitle: "Tell me the date, location and what matters to you. We'll see if it fits.",
      primary: "Share the details",
    },
    categories: {
      events: {
        title: "Events",
        metaTitle: "Event and Bar Mitzvah Photography | David Morgenstern",
        tagline: "Bar and Bat Mitzvahs | Brit ceremonies | Birthdays | Company events",
        description:
          "Bar and Bat Mitzvahs, brit ceremonies, birthdays and company events. Lots of people, lots happening at once. Knowing what to watch for matters.",
        intro:
          "At an event, people move, talk, celebrate and catch up. I can't be everywhere at once, so I find out in advance who matters and what you'd like to see in the pictures afterwards. Then I can focus on the work.",
        cta: "Ask about event photography",
      },
      family: {
        title: "Family & children",
        metaTitle: "Family and Children's Photography | David Morgenstern",
        tagline: "Family and children",
        description:
          "The photo where everyone looks at the camera, and the moments after they stop trying.",
        intro:
          "We all know how hard it can be to get everyone into one picture. I make sure we get that important family photo first, then we can move around, try different arrangements and let everyone loosen up. Nobody has to stand like a statue to look good.",
        cta: "Ask about family photos",
      },
      portraits: {
        title: "Portraits",
        metaTitle: "Portrait Photography | David Morgenstern",
        tagline: "Portraits and personal branding",
        description:
          "Being in front of a camera is not a test. I'll take care of direction, lighting and the photograph. You don't have to arrive knowing how to pose.",
        intro:
          "There are no unphotogenic people. Sometimes people simply haven't found a way they like seeing themselves in photos. That's where I come in: guiding, trying different light and angles, and making small changes until the pictures feel right.",
        cta: "Ask about a portrait",
      },
      business: {
        title: "Business photography",
        metaTitle: "Business Portraits and Event Photography | David Morgenstern",
        tagline: "Business portraits | Company events | Marketing images",
        description:
          "Professional portraits, company events and marketing images, made with their audience in mind.",
        intro:
          "I start with how the images will be used. Who will see them? Where will they appear? What should people understand? Once we know that, we can plan how to photograph the people, the space and the work happening there.",
        cta: "Ask about business photography",
      },
    },
  },
  about: {
    eyebrow: "Nice to meet you",
    title: "I'm David Morgenstern.",
    imageAlt: "David Morgenstern",
    paragraphs: [
      "I've been photographing people for years, and I still think carefully before every job about how to make the best photos I can. I like coming prepared: knowing who's involved, what matters to them, what the place is like and how to work with the light.",
      "Then I meet the actual people. Some are relaxed. Others are halfway through a stressful day and not exactly ready for pictures. I try to notice that quickly, adjust the pace and help. Sometimes a little direction is enough. Sometimes you have to help a happy moment happen before you can photograph it.",
      "I especially enjoy family photos and portraits, where you can see how much people's comfort changes the picture. I often say that feeling good leads to better photos. At events, there's also the responsibility to pay attention to what's happening and make room for the people and moments that matter.",
      "You can't know everything about the day in advance. I make plans, but I don't get attached to them. If we need to change location, shorten the walk or focus on the essential shots first, that's what I'll do. The point isn't to impress you with photography talk. It's to give you pictures you'll love.",
      "I also work with ideas, content and technology, and I enjoy finding better, simpler ways to get things done. Photography is one of the places those interests come together. It's also what you can book me for here.",
    ],
    values: [
      {
        title: "People, not poses",
        text: "I adapt my guidance to who's in front of me instead of expecting everyone to feel the same way about being photographed.",
      },
      {
        title: "A plan that leaves room for real life",
        text: "Prepare in advance, decide in the moment, and adjust when time, place or people surprise us.",
      },
      {
        title: "The important photos come first",
        text: "I focus on what you've booked the shoot to achieve. Once that's covered, we can try the extra ideas.",
      },
    ],
    ctaPrimary: "See the work",
    ctaSecondary: "Talk about a shoot",
  },
  contact: {
    title: "What would you like photographed?",
    subtitle:
      "Tell me a little about the job: what kind of photography, the approximate date, location and anything especially important. The details come straight to me, and I'll get back to you.",
    form: {
      name: "Name",
      namePlaceholder: "What should I call you?",
      phone: "Phone",
      phonePlaceholder: "Best number to reach you",
      eventType: "What do you need?",
      eventDate: "Approximate date",
      message: "Tell me what's important (optional)",
      messagePlaceholder: "Location, who's involved, what you'd like to receive...",
      submit: "Send the details",
      sending: "Sending...",
      note: "Your details come straight to me. After sending, you can continue on WhatsApp too.",
      phoneInvalid: "Looks like the phone number is missing a digit.",
      sentTitle: "Got it, thank you.",
      sentText: "Your details are with me and I'll get back to you soon. Want to add something? You can continue on WhatsApp.",
      continueWhatsapp: "Continue on WhatsApp",
      fallbackTitle: "One more small step",
      fallbackText: "Tap the button to send me your details on WhatsApp, or just call.",
      sendWhatsapp: "Send on WhatsApp",
      callLabel: "Call:",
      eventTypes: ["Event", "Family & children", "Portrait", "Business photography", "Something else"],
    },
    direct: {
      title: "Prefer to message me directly?",
      phoneLabel: "Phone",
      emailLabel: "Email",
      whatsappLabel: "WhatsApp",
      whatsappValue: "Open WhatsApp chat",
    },
  },
  clientGallery: {
    eyebrow: "Client area",
    title: "Your photos",
    subtitle: "Open your private gallery here and follow the instructions there.",
    openInNewTab: "Open client area",
    newSiteNote: "This opens a separate website.",
  },
  footer: {
    services: "Events | Families | Portraits | Business photography",
    navTitle: "Navigation",
    contactTitle: "Contact",
    rights: "All rights reserved",
  },
  chat: {
    fabLabel: "Open chat with David's assistant",
    closeLabel: "Close chat",
    title: "David's Assistant",
    online: "Answers here, David gets back to you",
    inputPlaceholder: "Type a message",
    sendLabel: "Send",
    welcome:
      "Hi, I'm David's assistant on the site. Ask me about the kinds of shoots, pricing, or how it works. And if you type a phone number here, I'll pass it on to David.",
    quickReplies: [
      { label: "Event photography", intent: "events" },
      { label: "Family sessions", intent: "family" },
      { label: "How much does it cost?", intent: "pricing" },
      { label: "How does it work?", intent: "booking" },
    ],
    sendNumber: "Send my number to David",
    numberSent: "David has your number. He'll get back to you soon.",
    numberFailed: "I couldn't pass on the number. You can message David on WhatsApp or call him.",
  },
  faq: {
    title: "Questions people ask me",
    items: [
      {
        q: "How is the price determined?",
        a: "It depends on the type of shoot, scope, location and deliverables. Once I understand what you need, I'll send a written proposal explaining what's included.",
      },
      {
        q: "When will we receive the photos?",
        a: "We agree on the delivery date before booking, and it appears in the proposal. The photos are delivered after selection and editing, as agreed.",
      },
      {
        q: "What will we receive?",
        a: "Digital photo files, selected and edited according to the scope and terms of the proposal. You'll know exactly what's included.",
      },
      {
        q: "Where do you work?",
        a: "I travel from Jerusalem to shoots across Israel. Any travel costs will be shown in the proposal.",
      },
      {
        q: "We're not comfortable in front of a camera. Is that a problem?",
        a: "Not at all. I'll help with posing, lighting and pacing until we find a way that feels comfortable and fits the result you're after.",
      },
      {
        q: "Will you photograph the shoot yourself?",
        a: "Yes, today I photograph every shoot myself. You'll know who is photographing the job before you book.",
      },
      {
        q: "Why hire a photographer when my phone is great?",
        a: "Phones can take wonderful photos. My work also includes guiding people, building the frame, adapting to changing conditions and capturing the images while you enjoy what's happening.",
      },
      {
        q: "What kinds of photography can I book?",
        a: "Bar and Bat Mitzvahs, brit ceremonies, birthdays, family photos, portraits, company events and business photography. Something else in mind? Tell me about it and we'll see.",
      },
    ],
  },
  common: {
    loading: "Loading",
  },
};
