/* ============================================================================
 * English dictionary. Mirrors the Hebrew key structure exactly.
 * Brand voice (V3, November 2026): written, not translated. Plain English,
 * warm, a little cheeky. The joke is always on David, never on the client.
 * We never crown ourselves: the sentences talk about the reader.
 * No long dashes. No photography cliches. No unconfirmed facts.
 * ========================================================================== */

import type { Dictionary } from "./he";

export const en: Dictionary = {
  meta: {
    siteName: "David Morgenstern | Photography for People and Business",
    title: "David Morgenstern | Events, Portraits and Business Photography",
    description:
      "Bar and Bat Mitzvah, family sessions, portraits and company events in Israel. A good photo starts with feeling good. What do you want people to see?",
  },
  nav: {
    galleries: "Work",
    events: "Events",
    family: "Family & Kids",
    portraits: "Portraits",
    business: "Business Photography",
    about: "About David",
    clientArea: "Client Area",
    contact: "Talk to me",
    bookNow: "Let's talk",
    openMenu: "Open menu",
    closeMenu: "Close menu",
  },
  hero: {
    eyebrow: "Photography for people and businesses",
    title: "There are no unphotogenic people.",
    subtitle:
      "Only people who haven't felt good in front of a camera yet. So first you feel good, then we shoot. And before anything else, one question: what do you want people to see?",
    ctaPrimary: "Let's talk",
    ctaSecondary: "See the work",
    trustLine: "A good photo starts with feeling good.",
    imageAlt: "Woman's portrait in soft studio light, photographed by David Morgenstern",
    scrollHint: "Scroll down",
  },
  home: {
    galleriesEyebrow: "Selected work",
    galleriesTitle: "See what I mean.",
    galleriesSubtitle:
      "Families, people and businesses. Each came with a different request, and with at least one person who was sure they weren't photogenic.",
    midCtaText: "Have something like this in mind?",
    trustStrip: {
      eyebrow: "Settled before we start",
      items: [
        {
          icon: "shield",
          title: "The shoot",
          text: "We agree on the scope before booking: what you're celebrating, who has to be in the photos, what can't be missed.",
        },
        {
          icon: "contract",
          title: "The photos",
          text: "It's written in the proposal. You book a defined job, and that's what you get.",
        },
        {
          icon: "clock",
          title: "Who shows up",
          text: "You know in advance. Today that's me, early, with a plan, which I then change to fit who actually came.",
        },
        {
          icon: "backup",
          title: "When you get them",
          text: "The delivery date is set before booking, not after.",
        },
      ],
    },
    howItWorks: {
      eyebrow: "How it works",
      title: "From first call to final photos",
      steps: [
        {
          title: "A short conversation",
          text: "Tell me what you need, when, where, and who the photos are for.",
        },
        {
          title: "A written proposal",
          text: "The scope, what you'll receive and the price. All in writing, no surprises later.",
        },
        {
          title: "Agree on the details",
          text: "We confirm the job and go over what matters ahead of time: the people, the moments, the sensitivities.",
        },
        {
          title: "The shoot",
          text: "We work to the plan and adjust to what happens on the day. Feeling good makes good photos.",
        },
        {
          title: "Your photos",
          text: "Selected, edited and delivered on the date we agreed.",
        },
      ],
    },
    valueProps: [
      {
        title: "First, I ask.",
        text: "Who has to be in the photos? What can't be missed? Who are they for? Your answers decide what I shoot and what stays out. The neighbors' kid, for example, however cute.",
      },
      {
        title: "The camera doesn't decide.",
        text: "When to guide and when to let things happen, when to keep going and when to stop. Nobody has to stand there like a log. Feel good first, the photo follows.",
      },
      {
        title: "Know what you're getting.",
        text: "We start with a short conversation: what we're shooting, who will be there and what you'll receive. Then it goes into a written proposal. You book a defined job, and that's what you get.",
      },
    ],
    corporate: {
      eyebrow: "For businesses",
      title: "People see you before they read about you.",
      subtitle:
        "Team portraits, a company event or photos for your website. First I want to know who will see the images and what they should understand. Then we shoot.",
      services: [
        {
          title: "Company events and conferences",
          text: "Who has to be seen, what happens during the event and where the photos will be used. We settle that before the shoot.",
        },
        {
          title: "Business portraits",
          text: "The faces people are about to meet on your website, in a presentation or on a professional profile. Looking good, and looking like you.",
        },
        {
          title: "Photo content for business",
          text: "Images for websites and marketing materials, shot with their final place in mind.",
        },
      ],
      trustTitle: "We work like a business",
      trustItems: [
        "Short briefing call",
        "Written scope",
        "Deliverables and dates agreed in advance",
        "Proper tax invoice",
      ],
      cta: "Let's talk about your business",
      waMessage: "Hi David, we have a business and we want people to see it right. Can we talk?",
    },
    wall: {
      eyebrow: "The wall",
      title: "What people wrote afterwards.",
      subtitle:
        "Real messages I received after events and albums, in their own words. First names only; the rest stays between them and me. Hebrew messages are translated.",
      note: "Notice what repeats? Nobody wrote \"sharp photos\". They write about patience, about how they were treated, and about the album. That's not a coincidence, and it's what I sell.",
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
      title: "I'm David. The camera is the small part.",
      text: "I'm curious about what people want to show, what they worry others might see, and what will make them smile at their own photo. It's the same with businesses: who are you, and what should the photo say about you? The camera already knows the rest.",
      cta: "A little more about me",
      imageAlt: "David Morgenstern with a camera in warm sunlight",
    },
    cta: {
      title: "So, what do you want people to see?",
      subtitle:
        "Tell me what you're planning, where and when. We'll see if it's a good fit, and if we go ahead you'll get a written proposal. I promise not to sell you anything you don't want. I'm bad at that.",
      primary: "Let's talk",
      secondary: "Message on WhatsApp",
    },
  },
  galleries: {
    title: "See the work",
    subtitle:
      "Different people, different requests. Look at the photos, and at what I chose to show in them.",
    viewFullGallery: "View gallery",
    backToGalleries: "Back to all work",
    closePreview: "Close preview",
    prevImage: "Previous image",
    nextImage: "Next image",
    categories: {
      events: {
        title: "Events",
        tagline: "Bar and Bat Mitzvahs · Brit Ceremonies · Birthdays · Company Events",
        description:
          "One event, many people, and they don't all matter equally to you. I find out ahead of time who and what you want in the photos, and I make sure they're there. Including the one who said they don't do photos.",
      },
      family: {
        title: "Family & Kids",
        tagline: "Family photos outdoors or at a place you love",
        description:
          "There's the photo where everyone looks at the camera. And there's what happens between you when you stop thinking about it. I make room for both.",
      },
      portraits: {
        title: "Portraits",
        tagline: "Portraits · Maternity · Personal Branding",
        description:
          "You don't need to know how to pose. Where to stand, where to look and what to do is my job. Your only job is to feel comfortable, and I help with that too.",
      },
      business: {
        title: "Business Photography",
        tagline: "Business Portraits · Company Events · Photo Content",
        description:
          "Who you are, what you do and how you want to come across to someone meeting you for the first time. I start there, and only then do I shoot.",
      },
    },
  },
  about: {
    eyebrow: "The person behind the name",
    title: "Hi, I'm David Morgenstern.",
    imageAlt: "David Morgenstern",
    paragraphs: [
      "The technical side never interested me. What interests me is the person in front of the camera: what matters to them, how they see themselves, and what will make them love what they see. A good photo starts with feeling good. The rest is pixels.",
      "At an event, I want to know which people matter to you and what can't be missed. In a portrait, I look at the person long before the light. With a business, I ask what the photos need to do. Different jobs, same way of thinking.",
      "There's one moment I work for: someone looks at a photo of themselves and thinks, wow, that's me. And I love what I see. To me, that means we made the right choices.",
      "I also write, make content and build AI tools for everything around the shoot, from the first question to the day the photos land with you. Not to replace the feeling. To leave more room for it.",
      "I'm a single dad to a teenager who is smarter and more talented than me. Every day she amazes me and drives me a little crazy, the good kind. It's also why I want more kids.",
      "I arrive early and with a plan, then I change it to fit who shows up. A stroller means fewer stairs. A grandmother means less walking. And there's a base I deliver even when the day doesn't go to plan. Nothing less.",
    ],
    values: [
      {
        title: "There's no such thing as unphotogenic.",
        text: "Only people who haven't felt good in front of a camera yet. My job is to find, with you, how you like to see yourself.",
      },
      {
        title: "Every photo has a job.",
        text: "A portrait, a family photo and a photo for a business have different purposes. First I understand the purpose, then I decide how to shoot.",
      },
      {
        title: "The work doesn't end with a click.",
        text: "Selecting, editing and delivering are part of the result. And I'm building tools that shorten the way from the shoot to your photos.",
      },
    ],
    cta: "Let's see if we're a good fit",
  },
  contact: {
    title: "Tell me what you need",
    subtitle:
      "What are we shooting, where and when? Let's start there and see if it fits. No pressure, no trick questions.",
    form: {
      name: "Full name",
      namePlaceholder: "What should I call you?",
      phone: "Phone",
      phonePlaceholder: "050-0000000",
      eventType: "What are we shooting",
      eventDate: "Estimated date",
      message: "Tell me more",
      messagePlaceholder: "Where? How many people? Who's sure they're not photogenic? Anything helps.",
      submit: "Continue to WhatsApp",
      note: "Your details will open in a WhatsApp message, so it's easy to start. I read everything myself, even at 2am. Mostly at 2am.",
      missingNumber:
        "WhatsApp number not configured. Add NEXT_PUBLIC_WHATSAPP_NUMBER to the environment file.",
      eventTypes: [
        "Bar/Bat Mitzvah",
        "Brit Ceremony",
        "Birthday",
        "Company Event",
        "Family Session",
        "Portrait",
        "Business Photography",
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
    title: "Your photos",
    subtitle:
      "Look through your photos and choose your favorites here. I know it's hard. Everyone came out good, that's the problem.",
    openInNewTab: "Open in new tab",
  },
  footer: {
    tagline: "A good photo starts with feeling good.",
    navTitle: "Navigate",
    contactTitle: "Talk to me",
    rights: "All rights reserved",
  },
  chat: {
    fabLabel: "Open chat with David's assistant",
    closeLabel: "Close chat",
    title: "David's Assistant",
    online: "Awake. Even when David isn't.",
    inputPlaceholder: "Type a message",
    sendLabel: "Send",
    welcome:
      "Hi, I'm David's assistant. He wrote me, so if I'm cheeky, blame him. What are we talking about: events, family, business, a date or a price?",
    quickReplies: [
      { label: "Event photography", intent: "events" },
      { label: "Family sessions", intent: "family" },
      { label: "How much does it cost?", intent: "pricing" },
      { label: "Book a date", intent: "booking" },
    ],
  },
  faq: {
    title: "Questions people ask me",
    items: [
      {
        q: "How do you set the price?",
        a: "It depends on the type of shoot, its scope, the location and what you want to receive. After a short call you get a written proposal with everything that's included. No \"call us and we'll talk\" game, and no surprises afterwards.",
      },
      {
        q: "When will we get the photos?",
        a: "Usually within a week of the event, after selection and editing. We set the exact date before booking, so nobody has to guess.",
      },
      {
        q: "Where do you work?",
        a: "I'm based in Jerusalem and I shoot all over Israel. Any travel cost is written in the proposal in advance.",
      },
      {
        q: "We're not photogenic. Is that a problem?",
        a: "There's no such thing. Only people who haven't felt good in front of a camera yet. You don't need to know what to do: I guide you and keep changing things until we find what works for you. Whoever is sure they don't photograph well, send them first. I like a challenge.",
      },
      {
        q: "Why hire a photographer if our phone is good?",
        a: "Phones take great photos. But you want to be in the picture, not behind it. And someone has to decide what to shoot, guide people and know when to press the button. In low light, the gear makes a difference too.",
      },
      {
        q: "What kinds of shoots can I book?",
        a: "Family events, Bar and Bat Mitzvahs, brit ceremonies, birthdays, family sessions, portraits, company events and business photography. Planning something else? Tell me and we'll see.",
      },
      {
        q: "Can we order an album too?",
        a: "Yes, and it's the thing clients get most excited about in the end. Tell me you'd like one, and we'll agree in advance on what's included, how you choose, and when it reaches you.",
      },
      {
        q: "Will you be the photographer?",
        a: "Yes. When you book me, I'm the one who comes. And on the day I have a team, you'll know in advance who is coming and to what standard, before we agree.",
      },
    ],
  },
  common: {
    loading: "One sec, fixing the light.",
  },
};
