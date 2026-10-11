// All page copy lives here (LANDING_PAGE_SPEC.md §6, §8). Components only read from this file.
// Text is copied from the spec exactly; items still to confirm are listed in OPEN-QUESTIONS.md.

export type Image = { src: string; alt: string };
export type Slide = Image & { caption: string };

export const site = {
  name: "Skyven Residences",
  rera: "P02400009501",
  address: {
    street: "SY no. 153, Gandipet Main Road",
    locality: "Kokapet",
    city: "Hyderabad",
    region: "Telangana",
    postalCode: "500075",
    country: "IN",
    full: "SY no. 153, Gandipet Main Road, Kokapet, Hyderabad, Telangana, 500075",
  },
  phone: { display: "+91 83400 06304", href: "tel:+918340006304" },
  whatsapp: { display: "+91 83400 06304", href: "https://wa.me/918340006304" },
  // Q15: target to confirm with the client
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=SY+no.+153%2C+Gandipet+Main+Road%2C+Kokapet%2C+Hyderabad",
};

export const seo = {
  // Spec title trimmed to ~55 characters (§11.2)
  title: "Skyven Residences Kokapet | Luxury 4BHK from ₹6.5 Cr",
  description:
    "Skyven Residences: Kokapet's tallest single tower with 63 floors, only 210 4BHK homes, rooftop clubhouse on floors 62 & 63. Book a site visit today.",
  ogImage: { src: "/og-image.jpg", width: 1200, height: 630, alt: "Skyven Residences tower in Kokapet, Hyderabad, at dusk" },
  priceFrom: 65000000,
  developers: ["E-Infra", "PVR Pingle"],
};

export const logo = {
  // A3: swap to "/assets/brand/logo.svg" when the SVG arrives
  header: { src: "/assets/brand/logo-header.png", width: 102, height: 54 },
  footer: { src: "/assets/brand/logo-footer.png", width: 215, height: 113 },
  alt: "Skyven Residences",
};

export const header = {
  cta: { label: "ENQUIRE NOW", href: "#enquire" },
};

export const hero = {
  rera: "RERA: P02400009501",
  title: "SKYVEN",
  subtitle: "KOKAPET'S TALLEST SINGLE TOWER",
  stats: [
    { label: "Starting from", value: "₹ 6.5 CR*" },
    { label: "Residences", value: "4BHK" },
    { label: "Location", value: "KOKAPET" },
  ],
  cta: { label: "EXPLORE SKYVEN", href: "#usps" }, // Q14
  labels: {
    rooftop: ["ROOFTOP CLUBHOUSE", "62 & 63 FLOORS"],
    homes: ["210", "HOMES"],
    floors: ["63", "FLOORS"],
  },
  images: {
    elevation: {
      desktop: "/assets/hero/hero-elevation.webp",
      mobile: "/assets/hero/hero-elevation-mobile.webp",
      alt: "Skyven Residences, Kokapet's tallest single tower, rising above Hyderabad at dusk",
    },
    cloudBand: "/assets/hero/hero-cloud-band.webp",
    cloudLeft: "/assets/hero/hero-cloud-left.webp",
    cloudRight: "/assets/hero/hero-cloud-right.webp",
  },
};

export const enquiry = {
  title: "ENQUIRE NOW",
  submitLabel: "BOOK A SITE VISIT",
  fields: {
    name: "Full Name",
    email: "Email",
    phone: "Phone",
    budget: "Budget",
  },
  budgetOptions: ["₹6–7 Cr", "₹7–8 Cr", "₹8 Cr+"], // Q6
  consent:
    "I authorize Skyven and its representatives to Call, SMS, Email or WhatsApp me about its updates and notifications. This consent overrides any registration for DND / NDNC as per TRAI regulations.",
  sending: "SENDING…",
  success: "Thank you. Our team will contact you shortly.",
  errors: {
    required: "This field is required.",
    email: "Please enter a valid email address.",
    phone: "Please enter a valid 10-digit mobile number.",
    consent: "Please accept to continue.",
    submit: "Something went wrong. Please try again.",
  },
};

export const comparison = {
  eyebrow: "ASK FOR IT",
  title: ["EVERY RUPEE EXTRA SHOULD COME", "WITH A REASON"],
  subtitle: "Ask what each number actually buys you, not just what it says.",
  headers: { value: "VALUE", skyven: "SKYVEN", others: "OTHERS" },
  rows: [
    {
      label: "Price per sq. ft.",
      sub: "More home for every crore invested",
      skyven: "₹10,999",
      others: "₹13,500–₹17,000",
    },
    {
      label: "Outdoor living space",
      sub: "A true open-air extension of your home",
      skyven: "Up to 913 sq. ft.",
      others: "Up to 641 sq. ft.",
    },
    {
      label: "Total residences",
      sub: "A more private residential community",
      skyven: "Only 210",
      others: "594–1,398",
    },
    // Q7: fourth row ("…per floor") to be supplied
  ],
  cta: { label: "GET DETAILED COMPARISON", href: "#enquire" },
};

export const videos = {
  closerLook: {
    id: "wDzI8VEbt5s",
    uploadDate: "2026-06-09T05:09:57-07:00",
    title: "Skyven Residences: Every great view deserves a closer look",
    poster: "/assets/posters/closer-look-poster.webp",
  },
  usps: {
    id: "60lmxpAgAzE",
    uploadDate: "2026-08-28T22:00:25-07:00",
    title: "Skyven Residences USPs: interview with E-Infra leadership",
    poster: "/assets/posters/usps-poster.webp",
  },
  construction: {
    id: "LBiZ_50sdOM",
    uploadDate: "2026-08-17T00:03:21-07:00",
    title: "Skyven construction update, August 2026",
    poster: undefined, // A6: YouTube thumbnail
  },
};

export const closerLook = {
  title: "EVERY GREAT VIEW DESERVES A CLOSER LOOK",
};

export const usps = {
  title: "USP'S",
  cta: { label: "EXPLORE SKYVEN", href: "#enquire" },
};

export const rooftop = {
  title: "ROOFTOP CLUBHOUSE FLOORS 62 & 63",
  subtitle: "RISE. UNWIND. LOOK BEYOND.",
  // A1, A2: captions after the first three come from file names
  slides: [
    {
      src: "/assets/rooftop-clubhouse/01-infinity-rooftop-swimming-pool.jpg",
      caption: "Infinity Rooftop Swimming Pool",
      alt: "Infinity rooftop swimming pool above the clouds at Skyven, Kokapet",
    },
    {
      src: "/assets/rooftop-clubhouse/02-stargazing-deck.jpg",
      caption: "Stargazing Deck",
      alt: "Stargazing deck with telescopes on the rooftop clubhouse at Skyven, Kokapet",
    },
    {
      src: "/assets/rooftop-clubhouse/03-bar-and-lounge.jpg",
      caption: "Bar & Lounge",
      alt: "Bar and lounge in the rooftop clubhouse on floors 62 and 63 at Skyven, Kokapet",
    },
    {
      src: "/assets/rooftop-clubhouse/04-boxing.jpg",
      caption: "Boxing",
      alt: "Boxing studio in the rooftop clubhouse at Skyven, Kokapet",
    },
    {
      src: "/assets/rooftop-clubhouse/05-cigar-room.jpg",
      caption: "Cigar Room",
      alt: "Cigar room in the rooftop clubhouse at Skyven, Kokapet",
    },
  ] satisfies Slide[],
  cta: { label: "EXPLORE SKYVEN", href: "#enquire" },
};

export const construction = {
  eyebrow: "CONSTRUCTION UPDATE - AUGUST 2026",
  title: "ONE FLOOR CLOSER TO THE SKY",
  subtitle:
    "What began as a vision is steadily taking shape in the sky. Take a look at Skyven's latest construction update.",
  cta: { label: "EXPLORE SKYVEN", href: "#enquire" },
};

export const clubhouse = {
  title: ["THE CLUBHOUSE", "FLOORS 4, 5 & 6"],
  subtitle: "LIVE. WORK. PLAY. CONNECT.",
  background: {
    src: "/assets/clubhouse-456-bg.jpg",
    alt: "Clubhouse podium levels 4, 5 and 6 of Skyven lit up at night",
  },
  slides: [
    {
      src: "/assets/clubhouse-4-5-6/01-salon-and-spa.jpg",
      caption: "Salon & Spa",
      alt: "Salon and spa in the clubhouse on floors 4 to 6 at Skyven, Kokapet",
    },
    {
      src: "/assets/clubhouse-4-5-6/02-kids-play-area.jpg",
      caption: "Kids Play Area",
      alt: "Kids play area in the clubhouse at Skyven, Kokapet",
    },
    {
      src: "/assets/clubhouse-4-5-6/03-banquet-hall.jpg",
      caption: "Banquet Hall",
      alt: "Banquet hall in the clubhouse at Skyven, Kokapet",
    },
    {
      src: "/assets/clubhouse-4-5-6/04-cafe-and-library.jpg",
      caption: "Cafe & Library",
      alt: "Cafe and library in the clubhouse at Skyven, Kokapet",
    },
    {
      src: "/assets/clubhouse-4-5-6/05-indoor-swimming-pool.jpg",
      caption: "Indoor Swimming Pool",
      alt: "Indoor swimming pool in the clubhouse at Skyven, Kokapet",
    },
    {
      src: "/assets/clubhouse-4-5-6/06-play-area.jpg",
      caption: "Play Area",
      alt: "Podium play area and courts at Skyven, Kokapet",
    },
    {
      src: "/assets/clubhouse-4-5-6/07-squash-court.jpg",
      caption: "Squash Court",
      alt: "Squash court in the clubhouse at Skyven, Kokapet",
    },
    {
      src: "/assets/clubhouse-4-5-6/08-yoga-and-dance.jpg",
      caption: "Yoga & Dance",
      alt: "Yoga and dance studio in the clubhouse at Skyven, Kokapet",
    },
  ] satisfies Slide[],
  cta: { label: "EXPLORE SKYVEN", href: "#enquire" },
};

export type LocationEntry = { place: string; time: string; note?: string; emphasis?: boolean };

export const location = {
  eyebrow: "CLOSE TO EVERYTHING",
  title: "FAR ABOVE THE ORDINARY",
  subtitle:
    "Set along Gandipet Main Road in Kokapet, Skyven keeps Hyderabad's key business, education, healthcare and lifestyle destinations within easy reach.",
  categories: [
    {
      title: "BUSINESS",
      open: true,
      entries: [
        {
          place: "Financial District",
          time: "11 Mins",
          note: "Minutes from Hyderabad's major corporate hub.",
          emphasis: true,
        },
        { place: "One DownTown", time: "1 Mins" },
      ],
    },
    {
      title: "EDUCATION",
      open: true,
      entries: [
        { place: "Phoenix Greens", time: "4 Mins" },
        { place: "Rockwell International School", time: "9 Mins" },
        { place: "Oakridge International School", time: "15 Mins" },
        { place: "Delhi Public School", time: "17 Mins" },
      ],
    },
    { title: "HEALTHCARE", open: false, entries: [] }, // Q8
    { title: "LIFESTYLE", open: false, entries: [] }, // Q8
  ] satisfies { title: string; open: boolean; entries: LocationEntry[] }[],
  map: {
    src: "/assets/location-map.png",
    alt: "Location map of Skyven on Gandipet Main Road, Kokapet, with the Financial District, Outer Ring Road and nearby schools",
  },
  cta: { label: "EXPLORE THE LOCATION", href: site.mapsUrl },
};

export const engineering = {
  eyebrow: "BEAUTY, BY DESIGN",
  title: "STRENGTH, BY ENGINEERING",
  subtitle:
    "Behind Skyven's striking architecture is a carefully engineered foundation designed for comfort, resilience and long-term performance.",
  features: [
    {
      title: "HIGH-SPEED ELEVATORS",
      body: "6 passenger elevators + 3 service elevators designed for efficient vertical movement.",
      image: {
        src: "/assets/engineering/01-lift-lobby.jpg",
        alt: "Lift lobby with high-speed elevators at Skyven, Kokapet",
      },
    },
    {
      title: "AI-ENABLED RESIDENCES",
      body: "Technology that works intelligently in the background, so life feels effortless.",
      image: {
        src: "/assets/engineering/02-corner-balconies.jpg",
        alt: "Corner residences with wraparound balconies at Skyven, Kokapet",
      },
    },
    {
      title: "ENGINEERED FOR EVERYDAY LIVING",
      body: "Smooth, seamless experiences designed around the way you live",
      image: {
        src: "/assets/engineering/03-tower-at-night.jpg",
        alt: "Skyven tower facade and balconies at night overlooking Hyderabad",
      },
    },
  ],
};

export const gallery = {
  eyebrow: "SEE SKYVEN",
  title: "A HIGHER VIEW OF LIFE",
  // Desktop mosaic slots, in order: row 1 left, row 1 right, row 2 left, row 2 middle, row 2 right
  mosaic: [
    { src: "/assets/gallery/01-aerial-tower.jpg", alt: "Aerial view of the Skyven tower in Kokapet at sunrise" },
    { src: "/assets/gallery/02-rooftop-infinity-pool.jpg", alt: "Rooftop infinity pool above the clouds at Skyven" },
    { src: "/assets/gallery/03-podium-at-dusk.jpg", alt: "Skyven podium and clubhouse levels at dusk" },
    { src: "/assets/gallery/04-balconies-at-night.jpg", alt: "Skyven balconies at night overlooking the city lights" },
    { src: "/assets/gallery/05-terrace-at-sunset.jpg", alt: "Resident on a Skyven terrace at sunset" },
  ] satisfies Image[],
  mobile: [
    { src: "/assets/gallery/mobile/01-aerial-tower.jpg", alt: "Aerial view of the Skyven tower in Kokapet at sunrise" },
    { src: "/assets/gallery/mobile/02-rooftop-infinity-pool.jpg", alt: "Rooftop infinity pool above the clouds at Skyven" },
    { src: "/assets/gallery/mobile/03-podium-at-dusk.jpg", alt: "Skyven podium and clubhouse levels at dusk" },
    { src: "/assets/gallery/mobile/04-balconies-at-night.jpg", alt: "Skyven balconies at night overlooking the city lights" },
    { src: "/assets/gallery/mobile/05-terrace-at-sunset.jpg", alt: "Resident on a Skyven terrace at sunset" },
  ] satisfies Image[],
  cta: { label: "EXPLORE SKYVEN", href: "#enquire" },
};

export const faq = {
  title: "FAQ",
  items: [
    {
      question: "What makes Skyven stand out?",
      answer:
        "Skyven is a monotower surrounded by an already-developed neighbourhood, with no surrounding building as tall. Every residence is a corner home with L-shaped balconies, giving you greater privacy and open views.",
    },
    {
      question: "How does Skyven compare on livable space?",
      answer:
        "Skyven offers 10% more livable space than nearby homes, giving you more space to live, at a lesser cost.",
    },
    {
      question: "What are the views from Skyven?",
      answer:
        "With homes oriented across four aspects, every residence at Skyven comes with its own distinct view. Explore the four-aspect floor plate to discover the view from each home.",
    },
  ],
};

export const landmarks = {
  eyebrow: "SOME ADDRESSES EXIST",
  title: "SOME BECOME LANDMARKS",
  subtitle:
    "Skyven is being created for those who believe an address should do more than locate you. It should reflect the way you see life, and the way you choose to live it.",
};

export const mapEmbed = {
  title: "Map showing Skyven Residences, SY no. 153, Gandipet Main Road, Kokapet, Hyderabad",
  // Pins Google's "Skyven" place (sy no:153, Gandipet Main Rd, Kokapet) with its info card
  src: "https://www.google.com/maps?q=Skyven+Residences%2C+Kokapet%2C+Hyderabad&z=15&output=embed",
};

export const footer = {
  tagline: ["A LIVING THAT'S", "ABOVE ALL"],
  copyright: "Copyright © 2026. Skyven by E-Infra & PVR Pingle | Designed by 8Views",
  rera: "RERA No: P02400009501",
};

export const thankYou = {
  path: "/thank-you",
  metaTitle: "Thank You | Skyven Residences Kokapet",
  eyebrow: "ENQUIRY RECEIVED",
  title: "THANK YOU",
  message: "Thank you. Our team will contact you shortly.",
  contactLead: "Prefer to talk now? Reach us directly:",
  cta: { label: "BACK TO SKYVEN", href: "/" },
};

// Draft written from what this site actually collects and where it is sent.
// Needs review by the client's legal team before launch (Q28).
export const privacyPolicy = {
  path: "/privacy-policy",
  metaTitle: "Privacy Policy | Skyven Residences Kokapet",
  metaDescription: "How Skyven Residences collects, uses and protects the details you share through this website.",
  title: "PRIVACY POLICY",
  lastUpdated: "Last updated: 11 October 2026",
  intro:
    "This policy explains how Skyven Residences, a project by E-Infra & PVR Pingle (\"we\", \"us\"), collects and uses the personal information you share through this website, and the choices you have.",
  sections: [
    {
      heading: "INFORMATION WE COLLECT",
      paragraphs: ["When you submit an enquiry or book a site visit, we collect:"],
      list: [
        "Your full name, email address and phone number",
        "The budget range you select",
        "Your consent to be contacted",
        "Which form you used, the page address, and campaign details in the link you followed (such as UTM source, medium and campaign)",
        "The date and time of your enquiry",
      ],
    },
    {
      heading: "HOW WE USE YOUR INFORMATION",
      paragraphs: ["We use these details only to:"],
      list: [
        "Respond to your enquiry and arrange site visits",
        "Share information, updates and offers about Skyven Residences by call, SMS, email or WhatsApp, as you consented to on the form",
        "Understand which campaigns bring enquiries, so we can improve how we reach interested buyers",
      ],
    },
    {
      heading: "CONSENT AND DND",
      paragraphs: [
        "By ticking the consent box on our forms, you authorise Skyven and its representatives to contact you by call, SMS, email or WhatsApp about its updates and notifications. This consent overrides any registration for DND / NDNC as per TRAI regulations. You can withdraw your consent at any time by contacting us using the details below.",
      ],
    },
    {
      heading: "WHERE YOUR INFORMATION IS STORED AND SHARED",
      paragraphs: [
        "Your enquiry is stored in our lead management tools: a secure spreadsheet, our customer relationship management (CRM) system and our sales team's email. Access is limited to people who handle sales and customer service for Skyven Residences.",
        "We do not sell your personal information. We may share it with service providers who help us run these tools, only for the purposes above, or where required by law.",
      ],
    },
    {
      heading: "THIRD-PARTY CONTENT",
      paragraphs: [
        "Videos on this website are hosted on YouTube and shown using YouTube's privacy-enhanced mode, and the location map is provided by Google Maps. When you play a video or view the map, those services may collect information under their own privacy policies.",
      ],
    },
    {
      heading: "HOW LONG WE KEEP YOUR INFORMATION",
      paragraphs: [
        "We keep your details for as long as needed to respond to your enquiry and stay in touch about the project, or for longer where the law requires it. When they are no longer needed, we delete them.",
      ],
    },
    {
      heading: "YOUR RIGHTS",
      paragraphs: [
        "You can ask us to access, correct or delete the personal information we hold about you, or to stop contacting you. To make a request, contact us using the details below.",
      ],
    },
    {
      heading: "CHANGES TO THIS POLICY",
      paragraphs: ["We may update this policy from time to time. The date at the top of this page shows when it was last changed."],
    },
  ],
  contactHeading: "CONTACT US",
  contactIntro: "For any questions about this policy or your information:",
  cta: { label: "BACK TO SKYVEN", href: "/" },
};
