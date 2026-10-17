// Every fact on the site comes from the CV in /public/Adedoyin-Favour-Adebayo-CV.pdf.
// Edit here, not in the components.

export const profile = {
  name: "Adedoyin Favour Adebayo",
  shortName: "Adedoyin Adebayo",
  location: "Lagos, Nigeria",
  phone: "+234 903 935 2791",
  phoneHref: "tel:+2349039352791",
  email: "oluwatosinfavour17@gmail.com",
  cv: "/Adedoyin-Favour-Adebayo-CV.pdf",
  roles: [
    "Content Writer",
    "Marketing & Advertising",
    "Public Relations",
    "Story Writer",
    "Mass Communication",
  ],
  summary:
    "Graduate of Communications and Media Studies (Mass Communication) with over three years of experience in content writing, marketing, advertising, public relations and social media management.",
  socials: [
    {
      label: "Instagram",
      handle: "eniobanke_adebayo",
      href: "https://www.instagram.com/eniobanke_adebayo",
    },
    {
      label: "Facebook",
      handle: "Tolulope Adedoyin",
      href: "https://www.facebook.com/search/top?q=Tolulope%20Adedoyin",
    },
    {
      label: "TikTok",
      handle: "@tolu-banke",
      href: "https://www.tiktok.com/@tolu-banke",
    },
  ],
} as const

// Shown one after another on the loading splash.
export const splashLines = [
  "Content Writing",
  "Marketing & Advertising",
  "Public Relations",
  "News Writing & Reporting",
  "Radio & TV Presenting",
  "Digital Storytelling",
] as const

export const highlights = [
  { value: "3+", label: "Years in content, PR & media" },
  { value: "1,000+", label: "Monthly readers of editorial work" },
  { value: "500+", label: "Attendees drawn to organised events" },
  { value: "8", label: "Roles across media & communications" },
] as const

export type ExperienceCategory = "media" | "content" | "marketing"

export type Experience = {
  role: string
  organisation: string
  location?: string
  period: string
  current?: boolean
  category: ExperienceCategory
  points: string[]
}

export const experienceCategories: { value: ExperienceCategory | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "media", label: "Broadcast & Media" },
  { value: "content", label: "Content & Editorial" },
  { value: "marketing", label: "Marketing & PR" },
]

export const experience: Experience[] = [
  {
    role: "News Writing & Reporting",
    organisation: "Dove TV",
    location: "Nigeria",
    period: "Mar 2026 – Present",
    current: true,
    category: "media",
    points: [
      "Presented and hosted Corpers Chronicles on Dove Television.",
      "Researched, wrote and reported news stories for television and digital audiences.",
      "Applied accurate, ethical reporting standards to deliver timely, audience-focused coverage.",
    ],
  },
  {
    role: "Vox-Pop Producer & Video Editor",
    organisation: "Freelance",
    period: "Mar 2025 – Present",
    current: true,
    category: "media",
    points: [
      "Conducted vox-pop interviews at an event where vendors placed their ads within content videos.",
      "Edited the event footage and other video for social media and digital platforms, shaping raw footage into clear, engaging stories.",
    ],
  },
  {
    role: "Customer Relationship Management Specialist",
    organisation: "Powress Picture Limited",
    location: "Nigeria",
    period: "Feb 2025 – May 2025",
    category: "marketing",
    points: [
      "Managed client relationships through CRM strategies, improving customer satisfaction and retention.",
      "Analysed customer data to tailor marketing campaigns, achieving a 15% increase in engagement.",
      "Worked with marketing teams to develop targeted content for social media and email campaigns.",
    ],
  },
  {
    role: "Content Writer & Content Creator",
    organisation: "Christ the Redeemer's Ministry (CRM)",
    location: "Nigeria",
    period: "Nov 2022 – Nov 2024",
    category: "content",
    points: [
      "Created written and visual content for ministry publications and social media, enhancing audience engagement.",
      "Developed content strategies to promote ministry events, increasing attendance by 20% through targeted campaigns.",
      "Edited and curated content to keep it consistent with organisational values.",
    ],
  },
  {
    role: "Content Writer & Editorial Writer",
    organisation: "RCF, Ekiti Zone",
    location: "Nigeria",
    period: "Nov 2022 – 2024",
    category: "content",
    points: [
      "Wrote editorial content for organisational publications, reaching over 1,000 readers monthly.",
      "Built content calendars and managed publication schedules, ensuring timely delivery of quality materials.",
      "Refined messaging with the team, boosting engagement by 30% across digital platforms.",
    ],
  },
  {
    role: "Radio Presenter & Content Writer",
    organisation: "Hebron FM",
    location: "Canaan Land, Ota, Nigeria",
    period: "Dec 2022 – Jan 2023",
    category: "media",
    points: [
      "Hosted radio segments reaching thousands of listeners weekly.",
      "Wrote promotional content for radio campaigns, raising listener engagement by 10%.",
      "Worked with production teams on creative scripts and advertisements.",
    ],
  },
  {
    role: "Content Writing & Marketing Head",
    organisation: "AMCOMS",
    location: "Ikere Ekiti, Nigeria",
    period: "Jul 2022",
    category: "marketing",
    points: [
      "Led content creation and marketing campaigns, increasing brand visibility by 25% within one month.",
      "Planned and ran social media strategies, growing the follower base by 500+ across platforms.",
      "Managed a team of content creators, keeping messaging and campaigns aligned.",
    ],
  },
  {
    role: "Public Relations Officer",
    organisation: "Federation of Ikole Local Government Students Union",
    location: "Ekiti State, Nigeria",
    period: "2021 – 2022",
    category: "marketing",
    points: [
      "Managed communications and public engagement, organising events that drew 500+ attendees.",
      "Developed PR strategies that strengthened the organisation's reputation and community trust.",
      "Coordinated media outreach, securing coverage in local publications.",
    ],
  },
]

export const impact = [
  { value: "30%", label: "Engagement lift across digital platforms", source: "RCF, Ekiti Zone" },
  { value: "25%", label: "Brand visibility growth within one month", source: "AMCOMS" },
  { value: "20%", label: "Increase in event attendance", source: "Christ the Redeemer's Ministry" },
  { value: "15%", label: "Increase in campaign engagement", source: "Powress Picture Limited" },
  { value: "10%", label: "Rise in listener engagement", source: "Hebron FM" },
  { value: "500+", label: "New followers across platforms", source: "AMCOMS" },
] as const

export const skills = [
  {
    area: "Content & Storytelling",
    icon: "pen",
    items: ["Content writing", "Editorial writing", "Short stories and quotes", "Copywriting", "Digital storytelling"],
  },
  {
    area: "Marketing & Advertising",
    icon: "megaphone",
    items: ["Social media marketing", "Content strategy", "SEO and analytics", "Campaign performance tracking"],
  },
  {
    area: "Public Relations",
    icon: "newspaper",
    items: ["Media relations", "Event management", "Strategic communications", "News reporting"],
  },
  {
    area: "Creative Production",
    icon: "mic",
    items: ["Radio presenting", "Scriptwriting"],
  },
  {
    area: "Tools & Platforms",
    icon: "layers",
    items: ["Meta Business", "Instagram", "TikTok", "YouTube", "CapCut"],
  },
  {
    area: "Analytical",
    icon: "chart",
    items: ["Data analysis", "CRM", "Customer insight"],
  },
] as const

export const education = {
  degree: "BSc, Communications and Media Studies (Mass Communication)",
  year: "2024",
  school: "Bamidele Olumilua University of Education, Science and Technology",
  place: "Ikere-Ekiti, Ekiti State",
}

export const research = {
  title:
    "The Impact of Effective Public Relations in Marketing Expansion of Banking System: A Study of First Bank of Nigeria, Ikere-Ekiti, Ekiti State",
  year: "2024",
  points: [
    "Researched the role of PR in banking sector growth, analysing First Bank's strategies.",
    "Presented findings on how effective PR builds customer trust and drives market expansion.",
  ],
}

export const languages = [
  { name: "English", level: "Fluent" },
  { name: "Yoruba", level: "Fluent" },
  { name: "French", level: "Proficient" },
  { name: "Ghana", level: "Proficient" },
] as const

export const interests = [
  "Intellectual pursuits",
  "Gaming",
  "Volunteering",
  "Creative pursuits",
  "DIY projects",
  "Research",
  "Social media engagement",
  "Meeting like-minded people",
  "Meditation",
] as const
