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

/** Ubaid's product studio. Products, case studies and technical write-ups live there. */
export const studio = {
  name: "KarachiSol",
  url: "https://karachisol.com",
  work: "https://karachisol.com/work",
  summary:
    "A product studio where I design, build and ship my own Wix and Shopify apps, and build software for a small number of clients.",
  description:
    "KarachiSol is a product studio founded by Ubaid Hussain that builds and ships Wix and Shopify apps, and software for clients.",
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
  },
  {
    index: "02",
    title: "Commerce apps for Shopify and Wix",
    body: "Custom product fields, loyalty programs and upload flows that live inside other people's stores and have to just work.",
  },
  {
    index: "03",
    title: "Helping platforms get faster",
    body: "At InsuranceMarket.ae I'm part of the team moving the site from WordPress to Next.js, with a focus on speed and keeping what already ranks.",
  },
  {
    index: "04",
    title: "Engineering with a team of AI agents",
    body: "An orchestrator and a library of skills I wrote myself, so ideas become shipped features in days instead of weeks.",
  },
] as const;

export type Testimonial = {
  name: string;
  /** Their headline at the time they wrote it. */
  title: string;
  /** How they know Ubaid, in plain words. */
  relation: string;
  photo: string;
  date: string;
  /** Paragraphs, copied from LinkedIn as written. */
  quote: string[];
  /** Their own LinkedIn profile, when known. */
  profile?: string;
};

/** Where every recommendation below can be checked. */
export const recommendationsUrl = "https://www.linkedin.com/in/ubaid-hussain/details/recommendations/";

export const testimonials: Testimonial[] = [
  {
    name: "Khurram Bashir",
    title: "Founder & CEO, Retainly and ZeroSlip",
    relation: "Client",
    photo: "/images/recommendations/khurram-bashir.webp",
    date: "2026-09-28",
    quote: [
      "I\u2019ve worked with Ubaid Hussain for the past seven years and have seen him grow from a frontend developer into a strong full-stack engineer. He\u2019s a thoughtful problem solver who takes ownership of his work and follows through when challenges arise. I\u2019d gladly recommend him to any team.",
    ],
  },
  {
    name: "Rachel Johnson",
    title: "Product Designer",
    relation: "Teammate at InsuranceMarket.ae",
    photo: "/images/recommendations/rachel-johnson.webp",
    date: "2026-09-27",
    quote: [
      "I\u2019ve had the opportunity to work closely with Ubaid on several projects at InsuranceMarket.ae, and he\u2019s genuinely a very skilled and dependable front-end developer.",
      "He has worked across different InsuranceMarket product lines, including Car, Travel, Health and so on, and I\u2019ve particularly enjoyed seeing how well he understands both the technical and product sides of the work.",
      "Ubaid is also very good with AI and has a strong ability to use it to explore solutions, work faster and turn ideas into functional experiences. I\u2019ve worked with him through some challenging technical issues, including API and journey debugging, and he\u2019s always willing to dig in and figure things out.",
      "Beyond his technical skills, he\u2019s easy to work with, collaborative and takes ownership of his work. I\u2019d happily recommend Ubaid to any team looking for a strong front-end developer who combines technical expertise, product thinking, AI proficiency, and a genuine commitment to getting the work done well.",
    ],
  },
  {
    name: "Shaheryar Ali",
    title: "Frontend Engineer, Cloud Primero",
    relation: "Worked together early in his career",
    photo: "/images/recommendations/shaheryar-ali.webp",
    date: "2026-09-28",
    quote: [
      "I had the opportunity to work with UBAID HUSSAIN at the beginning of my professional journey, and I can confidently say that he has played a very important role in my growth as a developer.",
      "He is an exceptionally skilled and knowledgeable software developer who has a strong ability to understand complex problems and find effective solutions. During our time working together, we worked on several projects, many of which presented challenging technical problems. Whenever I faced a challenge, he was always there to guide me, explain things clearly, and help me approach problems with a better mindset.",
      "What I appreciate most about him is that he never simply gave me the answers. He encouraged me to understand the problem, think critically, and improve my own skills. A significant part of my foundation as a developer comes from the guidance and mentorship I received from him.",
      "Beyond his technical expertise, he is also a genuinely supportive, humble, and great person to work with. His professionalism, problem-solving skills, and willingness to help others make him someone I truly respect.",
      "I\u2019m genuinely grateful that he was one of the first people to guide me in my professional career, and I highly recommend him to anyone looking for a highly skilled developer, mentor, and an excellent person to work with.",
    ],
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
      "Part of the team moving the website from WordPress to Next.js, with a focus on speed and the customer journey.",
    ],
  },
  {
    role: "Frontend Engineer · Long-term contract",
    company: "ZeroSlip",
    logo: undefined,
    period: "Nov 2021 — Present",
    place: "Part-time · Remote",
    points: [
      "Built the merchant dashboard end to end, part-time alongside full-time roles.",
    ],
  },
  {
    role: "Team Lead & Senior Software Developer",
    company: "SparkoSol",
    logo: "/images/sparko_sol_logo.jpg",
    period: "2024 — Feb 2025",
    place: "Pakistan",
    points: [
      "Led a small team building marketing and healthcare platforms, and mentored junior developers.",
    ],
  },
  {
    role: "Software Developer",
    company: "Inspon Technologies",
    logo: "/images/inspon_logo.jpg",
    period: "2022 — 2024",
    place: "Pakistan",
    points: [
      "Built Shopify and Wix apps, and a recruitment system for clients in Germany.",
    ],
  },
  {
    role: "Associate Software Developer",
    company: "Eforte Solutions",
    logo: "/images/eforte_solutions_logo.jpg",
    period: "2020 — 2022",
    place: "Pakistan",
    points: ["Built dashboards, forecasting tools and landing pages."],
  },
  {
    role: "Volunteer Frontend Developer",
    company: "Noble Missions",
    logo: "/images/noble_missions_logo.jpg",
    period: "2019 — 2022",
    place: "Remote",
    points: ["Built a fundraising website for education initiatives in Nigeria."],
  },
] as const;
