export type YearMonth = { year: number; month: number };

export const ym = (year: number, month: number) => year + (month - 1) / 12;

// Whole years since Google Summer of Code in May 2018.
export const yearsOfExperience = (date: Date) =>
  Math.floor(ym(date.getFullYear(), date.getMonth() + 1) - ym(2018, 5));

export type Segment = { from: number; to?: number };

export type CareerSpan = {
  slug: string;
  name: string;
  role: string;
  period: string;
  segments: Segment[];
  milestones?: { at: number; label: string }[];
  attrs: [string, string][];
  highlights: string[];
};

const BROWSERSTACK_END = ym(2021, 9);

export const career: CareerSpan[] = [
  {
    slug: "amazon",
    name: "Amazon",
    role: "UPI Platform",
    period: "2021 to now",
    segments: [{ from: BROWSERSTACK_END }],
    attrs: [
      ["domain", "UPI payments"],
      ["product", "Amazon Pay"],
      ["focus", "cost, observability, reliability"],
    ],
    highlights: [
      "Built real-time dispute resolution for UPI payments on Amazon Pay, cutting pending-transaction inquiries by 70%.",
      "Moved workloads to offline services that reduced infrastructure cost by 80%.",
      "Improved end-to-end monitoring, lowering high-severity tickets by 60%.",
    ],
  },
  {
    slug: "browserstack",
    name: "BrowserStack",
    role: "Senior Software Engineer, Software Engineer",
    period: "2019 to 2021",
    segments: [{ from: ym(2019, 5), to: BROWSERSTACK_END }],
    attrs: [
      ["runtime", "Node.js"],
      ["traffic", "50M+ requests/day"],
      ["protocols", "WebSocket, WebRTC"],
    ],
    highlights: [
      "Shipped the industry-first Puppeteer and Playwright integration on a cloud browser grid.",
      "Built a highly available WebSocket reverse proxy in Node.js that carries live customer sessions.",
      "Enabled real-time device interaction over WebRTC.",
      "Built an internal docs framework that cut ship time from 2 days to 15 minutes.",
    ],
  },
  {
    slug: "shipsy",
    name: "Shipsy",
    role: "Software Engineer Intern",
    period: "2019",
    segments: [{ from: ym(2019, 1), to: ym(2019, 5) }],
    attrs: [
      ["stack", "TypeScript, NestJS"],
      ["cloud", "AWS serverless"],
    ],
    highlights: [
      "Built a serverless Excel report builder on AWS.",
      "Built unified container tracking that won a pilot with Reliance.",
      "Worked across the backend in TypeScript and NestJS.",
    ],
  },
  {
    slug: "gsoc",
    name: "Google Summer of Code",
    role: "Fellow, FOSSASIA",
    period: "2018",
    segments: [{ from: ym(2018, 5), to: ym(2018, 9) }],
    attrs: [
      ["org", "FOSSASIA"],
      ["project", "BadgeYay"],
    ],
    highlights: [
      "Selected as a GSoC 2018 fellow and worked on BadgeYay with FOSSASIA.",
    ],
  },
  {
    slug: "code-in",
    name: "Google Code-in",
    role: "Mentor",
    period: "2017, 2018",
    segments: [
      { from: ym(2017, 12), to: ym(2018, 2) },
      { from: ym(2018, 12), to: ym(2019, 2) },
    ],
    attrs: [["editions", "2017, 2018"]],
    highlights: [
      "Mentored pre-university students through their first open source contributions, two years running.",
    ],
  },
  {
    slug: "competitive-programming",
    name: "Competitive programming",
    role: "ICPC, CodeChef, HackerEarth",
    period: "2018",
    segments: [],
    milestones: [
      { at: ym(2018, 1), label: "CodeChef #218" },
      { at: ym(2018, 11), label: "HackerEarth #48" },
      { at: ym(2018, 12), label: "ACM ICPC" },
    ],
    attrs: [
      ["codechef", "global rank 218, Jan Long 2018"],
      ["hackerearth", "global rank 48, Nov Easy '18"],
    ],
    highlights: ["Competed at the ACM ICPC India Regionals 2018."],
  },
];
