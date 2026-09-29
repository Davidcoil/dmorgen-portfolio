/* ============================================================================
 * תוכן הגלריות — מקור יחיד לתמונות.
 *
 * - כל תמונה נושאת alt עשיר בעברית ובאנגלית: תשתית ה־SEO למנועי חיפוש
 *   ומנועי AI (שלב 3) — גוגל ו־Perplexity קוראים את התיאורים האלה.
 * - כותרות הקטגוריות והטקסטים השיווקיים חיים במילונים (lib/i18n)
 *   כדי לשמור על דו־לשוניות מלאה.
 * - כל התמונות הן עבודות אמיתיות של דוד מורגנשטרן.
 *   מבנה הנתונים לא ישתנה: רק מחליפים קבצים ו־alt.
 * ========================================================================== */

export type GalleryCategorySlug = "events" | "family" | "portraits" | "business";

export interface GalleryImage {
  src: string;
  alt: { he: string; en: string };
  orientation: "landscape" | "portrait";
}

export const gallerySlugs: GalleryCategorySlug[] = [
  "events",
  "family",
  "portraits",
  "business",
];

const img = (
  src: string,
  orientation: GalleryImage["orientation"],
  he: string,
  en: string
): GalleryImage => ({ src, orientation, alt: { he, en } });

export const galleryImages: Record<GalleryCategorySlug, GalleryImage[]> = {
  events: [
    img(
      "/images/galleries/events/real-1.jpg",
      "landscape",
      "צילום בר מצווה בירושלים — ילד קופץ משמחה מול חומות העיר העתיקה, צלם אירועים שמביא אנרגיה אמיתית",
      "Bar mitzvah photography in Jerusalem — boy jumping with joy before the Old City walls, event photographer capturing real energy"
    ),
    img(
      "/images/galleries/events/real-2.jpg",
      "landscape",
      "צילום בר מצווה — משפחה צוחקת בכנות עם חתן בר המצווה, רגע לא מבוים שצולם באהבה",
      "Bar mitzvah photography — family laughing genuinely with the bar mitzvah boy, an unposed moment captured with love"
    ),
    img(
      "/images/galleries/events/barmitzva-party-5.jpg",
      "landscape",
      "צילום אירוע — ריקודים סוערים, גברים רוקדים עם הילדים על הכתפיים, שמחה מדבקת",
      "Event photography — wild dancing, men dancing with kids on their shoulders, contagious joy"
    ),
    img(
      "/images/galleries/events/barmitzva-party-1.jpg",
      "portrait",
      "צילום בר מצווה — אבא מניף את בתו גבוה באוויר ושניהם צוחקים, רגע שמחה לא מבוים באירוע",
      "Bar mitzvah photography — father lifting his daughter high in the air, both laughing, an unposed moment of joy at the event"
    ),
    img(
      "/images/galleries/events/barmitzva-party-2.jpg",
      "landscape",
      "צילום אירוע — חתן בר מצווה על הכתפיים בריקודים, האנרגיה של אירוע שמח באמת",
      "Event photography — bar mitzvah boy on shoulders dancing, the energy of a truly joyful event"
    ),
    img(
      "/images/galleries/events/barmitzva-party-3.jpg",
      "landscape",
      "צילום אירוע — חתן בר מצווה מטפס על המחיצה והקהל מריע, רגע שיא של אנרגיה ברחבת הריקודים",
      "Event photography — bar mitzvah boy climbing the partition as the crowd cheers, a peak-energy moment on the dance floor"
    ),
    img(
      "/images/galleries/events/barmitzva-party-4.jpg",
      "landscape",
      "צילום אירוע — נשים רוקדות במעגל שמח, רחבת הריקודים באירוע של דוד",
      "Event photography — women dancing in a joyful circle, the dance floor at David's event"
    ),
  ],
  family: [
    img(
      "/images/galleries/family/barmitzva-boy-jerusalem.jpg",
      "landscape",
      "צילום בר מצווה בירושלים — חתן בר המצווה בחליפה כחולה מחייך מול חומות העיר העתיקה, פורטרט פרימיום",
      "Bar mitzvah photography in Jerusalem — the bar mitzvah boy in a blue suit smiling before the Old City walls, premium portrait"
    ),
    img(
      "/images/galleries/family/brothers-pyramid-studio.jpg",
      "portrait",
      "צילום משפחה בסטודיו — האחים בפירמידה אנושית מתפקעים מצחוק, ככה נראה כיף אמיתי מול המצלמה",
      "Studio family photography — brothers in a human pyramid bursting with laughter, this is what real fun looks like in front of the camera"
    ),
    img(
      "/images/galleries/family/mother-daughters-barmitzva.jpg",
      "landscape",
      "צילום משפחה בירושלים — אמא והבנות צוחקות עם חתן בר המצווה, רגע משפחתי חם ולא מבוים",
      "Family photography in Jerusalem — mother and daughters laughing with the bar mitzvah boy, a warm unposed family moment"
    ),
    img(
      "/images/galleries/family/kids-bougainvillea-walk.jpg",
      "portrait",
      "צילום משפחה — הילדים צועדים וצוחקים מתחת לבוגונביליה פורחת, שמחת חיים מול המצלמה",
      "Family photography — kids walking and laughing under blooming bougainvillea, joy of life in front of the camera"
    ),
    img(
      "/images/galleries/family/family-stone-house.jpg",
      "landscape",
      "צילומי משפחה בירושלים — משפחה גדולה ואלגנטית ליד מבנה אבן עתיק, כולם נראים מיליון דולר",
      "Family photography in Jerusalem — large elegant family by an ancient stone building, everyone looks like a million dollars"
    ),
    img(
      "/images/galleries/family/family-studio-embrace.jpg",
      "portrait",
      "צילום משפחה בסטודיו — משפחה מחובקת ומחייכת, צילום משפחה פרימיום",
      "Studio family photography — family embracing and smiling, premium family photography"
    ),
    img(
      "/images/galleries/family/family-whites-lineup.jpg",
      "landscape",
      "צילום משפחה בירושלים — המשפחה בשורה אלגנטית בלבן מול הנוף, צילומי משפחה יוקרתיים",
      "Family photography in Jerusalem — the family in an elegant white lineup against the view, luxury family photography"
    ),
    img(
      "/images/galleries/family/tower-of-david-hug.jpg",
      "portrait",
      "צילום בר מצווה — ההורים מחבקים את חתן בר המצווה ליד מגדל דוד, רגע של גאווה ואהבה",
      "Bar mitzvah photography — parents hugging the bar mitzvah boy by the Tower of David, a moment of pride and love"
    ),
    img(
      "/images/galleries/family/family-running-grass.jpg",
      "landscape",
      "צילום משפחה — אבא, אמא והבן רצים יד ביד אל המצלמה וצוחקים, שיא של שמחה אמיתית",
      "Family photography — father, mother and son running hand in hand toward the camera, laughing, a peak of real joy"
    ),
    img(
      "/images/galleries/family/family-walls-sunset.jpg",
      "landscape",
      "צילומי משפחה בירושלים — משפחה גדולה מול חומות העיר העתיקה בשקיעה, סיום פרימיום",
      "Family photography in Jerusalem — large family against the Old City walls at sunset, a premium finale"
    ),
  ],
  portraits: [
    img(
      "/images/galleries/portraits/boy-studio-vest.jpg",
      "portrait",
      "פורטרט נער — חיוך כובש בווסט ועניבה בסטודיו, פורטרט פרימיום מלא ביטחון",
      "Teen portrait — captivating smile in vest and tie in the studio, a premium portrait full of confidence"
    ),
    img(
      "/images/galleries/portraits/boy-studio-bw.jpg",
      "portrait",
      "פורטרט נער בשחור לבן — מבט עוצמתי בסטודיו, צילום פורטרטים עם נוכחות",
      "Teen portrait in black and white — a powerful studio gaze, portrait photography with presence"
    ),
    img(
      "/images/galleries/portraits/boy-vest-garden.jpg",
      "portrait",
      "פורטרט נער — אלגנטיות טבעית בגינה, צילום שמוציא את הגרסה הכי טובה שלך",
      "Teen portrait — natural elegance in the garden, photography that brings out your best version"
    ),
    img(
      "/images/galleries/portraits/real-1.jpg",
      "portrait",
      "פורטרט נער — חיוך כובש בחליפה כחולה באור טבעי, צילום תדמית אישי פרימיום",
      "Teen portrait — captivating smile in a blue suit in natural light, premium personal portrait photography"
    ),
    img(
      "/images/galleries/portraits/real-3.jpg",
      "portrait",
      "פורטרט טבעי — חיוך אמיתי ולא מבוים, צילום שמוציא את הגרסה הכי טובה שלך",
      "Natural portrait — genuine unposed smile, photography that brings out your best version"
    ),
    img(
      "/images/galleries/portraits/real-5.jpg",
      "portrait",
      "פורטרט ילדה — ילדה קטנה בשמלה שחורה, מתיקות שובת לב בעדשת פרימיום",
      "Little girl portrait — small girl in a black dress, heart-melting sweetness through a premium lens"
    ),
  ],
  business: [
    img(
      "/images/galleries/business/headshot-turtleneck-dark.jpg",
      "portrait",
      "צילום תדמית עסקי — פורטרט עוצמתי על רקע כהה, נוכחות שמדברת לפני המילים",
      "Business headshot — powerful portrait on a dark background, presence that speaks before words"
    ),
    img(
      "/images/galleries/business/headshot-suit-maroon-tie.jpg",
      "portrait",
      "צילום תדמית עסקי — פורטרט עסקי של גבר בחליפה, ביטחון ומקצועיות בפריים אחד",
      "Business headshot — professional portrait of a man in a suit, confidence and professionalism in one frame"
    ),
    img(
      "/images/galleries/business/headshot-doctor-woman.jpg",
      "portrait",
      "צילום תדמית מקצועי — רופאה בחלוק לבן, אמינות וחום במבט אחד",
      "Professional headshot — woman doctor in a white coat, trust and warmth in a single look"
    ),
    img(
      "/images/galleries/business/headshot-blue-shirt.jpg",
      "portrait",
      "צילום תדמית עסקי — פורטרט צעיר ומודרני, צילום מיתוג אישי פרימיום",
      "Business headshot — young modern portrait, premium personal branding photography"
    ),
    img(
      "/images/galleries/business/headshot-dentist-woman.jpg",
      "portrait",
      "צילום תדמית מקצועי — חיוך חם ובטוח, ככה לקוחות רוצים לראות אתכם",
      "Professional headshot — warm confident smile, this is how clients want to see you"
    ),
    img(
      "/images/galleries/business/headshot-laptop-tech.jpg",
      "portrait",
      "צילום תדמית עסקי — אווירת הייטק נינוחה, מקצועיות בלי עניבה",
      "Business headshot — relaxed tech vibe, professionalism without the tie"
    ),
  ],
};

export function getCategoryImages(slug: GalleryCategorySlug): GalleryImage[] {
  return galleryImages[slug] ?? [];
}
