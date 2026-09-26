export const site = {
  name: "Ubaid Hussain",
  role: "Senior Frontend Engineer",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://ubaidhussain.me").replace(/\/$/, ""),
  tagline: "I build the part of your product people remember.",
  description:
    "Ubaid Hussain is a senior frontend engineer with 6+ years of building dashboards, commerce apps and web platforms in React and Next.js. Stories about work, travel and the craft of making software feel effortless.",
  email: "ubaid7625@gmail.com",
  location: "Karachi, Pakistan",
  timeZone: "Asia/Karachi",
  currently: { role: "Senior Frontend Developer", company: "InsuranceMarket.ae", city: "Dubai" },
  resume: "/files/Ubaid Hussain - Senior Web Developer.pdf",
  photo: "/images/ubaid-hussain.png",
  twitter: "@ubaidnext",
  social: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/ubaid-hussain/" },
    { label: "GitHub", href: "https://github.com/ubaidi5" },
    { label: "X", href: "https://x.com/ubaidnext" },
  ],
} as const;

export const nav = [
  { label: "Story", href: "/#story" },
  { label: "Work", href: "/work" },
  { label: "Stories", href: "/stories" },
  { label: "Contact", href: "/#contact" },
] as const;

export const facts = [
  { value: "6+", label: "years shipping for the web" },
  { value: "4", label: "continents my clients call home" },
  { value: "1", label: "startup built and sold" },
  { value: "∞", label: "instant noodles, strictly for deadlines" },
] as const;

export const crafts = [
  {
    index: "01",
    title: "Dashboards that make sense of messy data",
    body: "Analytics, CRM and receipt data turned into screens people actually open every morning. I built the ZeroSlip dashboard end to end.",
    tags: ["React", "Next.js", "Charts", "Data tables"],
  },
  {
    index: "02",
    title: "Commerce apps for Shopify and Wix",
    body: "Custom product fields, loyalty programs and upload flows that live inside other people's stores and have to just work.",
    tags: ["Shopify", "Wix", "Payments"],
  },
  {
    index: "03",
    title: "Platforms rebuilt to be fast",
    body: "Moved InsuranceMarket.ae from WordPress to Next.js and tuned it until pages felt instant, without losing what already ranked.",
    tags: ["Next.js", "Performance", "SEO"],
  },
  {
    index: "04",
    title: "Engineering with a team of AI agents",
    body: "An orchestrator and a library of skills I wrote myself, so ideas become shipped features in days instead of weeks.",
    tags: ["AI agents", "Automation", "DX"],
  },
] as const;

export type Testimonial = {
  quote: string;
  name: string;
  title: string;
  company: string;
  href?: string;
  /** Placeholder entries render in development only. Replace with the real reviews. */
  placeholder?: boolean;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "Replace this with the first genuine review. Keep it to two or three sentences and let it describe a result, not just a trait.",
    name: "Reviewer name",
    title: "Role",
    company: "Company",
    placeholder: true,
  },
  {
    quote:
      "Replace this with the second review. The strongest ones mention what changed after Ubaid got involved.",
    name: "Reviewer name",
    title: "Role",
    company: "Company",
    placeholder: true,
  },
  {
    quote:
      "Replace this with the third review. Link it to the LinkedIn recommendation so anyone can verify it.",
    name: "Reviewer name",
    title: "Role",
    company: "Company",
    placeholder: true,
  },
];

export const experience = [
  {
    role: "Senior Frontend Developer",
    company: "InsuranceMarket.ae",
    logo: "/images/insurance_market_logo.jpeg",
    period: "Feb 2025 — Present",
    place: "Dubai · Remote",
    points: [
      "Migrated the marketing site from WordPress to Next.js for speed, scale and SEO.",
      "Cut page load times and automated workflows across the customer journey.",
      "Built quote comparison and policy flows used by insurance shoppers across the UAE.",
    ],
  },
  {
    role: "Frontend Engineer · Long-term contract",
    company: "ZeroSlip",
    logo: undefined,
    period: "Nov 2021 — Present",
    place: "Part-time · Remote",
    points: [
      "Built the ZeroSlip merchant dashboard end to end, alongside full-time roles.",
      "Their go-to frontend engineer since 2021 for smart receipts, analytics and RewardBee.",
    ],
  },
  {
    role: "Team Lead & Senior Software Developer",
    company: "SparkoSol",
    logo: "/images/sparko_sol_logo.jpg",
    period: "2024 — Feb 2025",
    place: "Pakistan",
    points: [
      "Led development of multimedia marketing apps and surgery-related platforms.",
      "Built frontends in Next.js and React, backends in Node.js and MongoDB.",
      "Managed timelines and mentored junior developers.",
    ],
  },
  {
    role: "Software Developer",
    company: "Inspon Technologies",
    logo: "/images/inspon_logo.jpg",
    period: "2022 — 2024",
    place: "Pakistan",
    points: [
      "Built Shopify and Wix apps: custom product fields, loyalty programs, uploads.",
      "Developed a recruitment management system for clients in Germany.",
    ],
  },
  {
    role: "Associate Software Developer",
    company: "Eforte Solutions",
    logo: "/images/eforte_solutions_logo.jpg",
    period: "2020 — 2022",
    place: "Pakistan",
    points: ["Built dashboards, forecasting tools and landing pages in React and Next.js."],
  },
  {
    role: "Volunteer Frontend Developer",
    company: "Noble Missions",
    logo: "/images/noble_missions_logo.jpg",
    period: "2019 — 2022",
    place: "Remote",
    points: ["Built a fundraising website in React for education initiatives in Nigeria."],
  },
] as const;

export const projects = [
  {
    name: "ZeroSlip",
    kind: "Smart receipts platform",
    body: "Digital, tax-compliant receipts with warranty, product info and marketing built in. I built the merchant dashboard from the ground up.",
    stack: ["Next.js", "React", "TypeScript", "Charts"],
  },
  {
    name: "InsuranceMarket.ae",
    kind: "Insurance marketplace",
    body: "WordPress to Next.js migration and performance work for one of the UAE's insurance comparison platforms.",
    stack: ["Next.js", "Performance", "SEO"],
  },
  {
    name: "Checkeden",
    kind: "Gym & clinic management · Sold",
    body: "A management system for hospitals and gyms I built in 2021 and later sold. I sold 100% of it too early, and I still laugh about it.",
    stack: ["React", "Node.js", "MongoDB"],
  },
  {
    name: "Shopify & Wix apps",
    kind: "Commerce plugins",
    body: "Custom product fields, loyalty programs, discounts and drag-and-drop uploads used inside merchants' live stores.",
    stack: ["Shopify", "Wix", "React"],
  },
  {
    name: "RewardBee",
    kind: "AI rewards platform",
    body: "Personalised loyalty and merchant analytics, integrated with ZeroSlip smart receipts.",
    stack: ["Next.js", "AI", "Analytics"],
  },
  {
    name: "AI orchestrator",
    kind: "Personal tooling",
    body: "A system of agents and skills that plans, builds, reviews and fixes code with me in the loop.",
    stack: ["AI agents", "TypeScript", "Automation"],
  },
] as const;

export const skills = [
  { group: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Redux Toolkit", "React Query", "Motion"] },
  { group: "Backend", items: ["Node.js", "NestJS", "Express", "GraphQL", "MongoDB", "PostgreSQL", "Drizzle"] },
  { group: "Commerce", items: ["Shopify apps", "Wix apps", "Stripe", "Fabric.js"] },
  { group: "Craft", items: ["Performance", "Technical SEO", "Design systems", "AI-assisted engineering"] },
] as const;
