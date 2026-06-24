import { motion } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  Bot,
  Boxes,
  Building2,
  CheckCircle2,
  CircleDollarSign,
  Factory,
  Globe2,
  Handshake,
  Landmark,
  Layers3,
  Mail,
  Network,
  ShieldCheck,
  Target,
  TrendingUp,
  Users,
  Workflow,
} from "lucide-react";
import { Link } from "wouter";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { usePageSeo } from "@/lib/seo";
import { siteButtonClasses } from "@/components/SiteButton";

const heroStats = [
  { value: "260+ Cr ARR", label: "ARR" },
  { value: "75% YOY Growth", label: "YoY growth" },

  { value: "Industry Veteran Angel backed", label: "unit economics" },
  { value: "Profitable", label: "unit economics" },
    { value: "106 Enterprise Clients", label: "enterprise clients" },
];



const problems = [
  {
    title: "Fragmented industry",
    text: "The infrastructure, construction & manufacturing industry is highly fragmented and heavily dependent on offline references, limiting efficiency and scale, with minimal use of intelligent systems.",
  },
  {
    title: "No hand holding for contractors",
    text: "Contractors working on large infrastructure projects lack structured support and unified digital tools for growth, resulting in low visibility and missed opportunities.",
  },
  {
    title: "Low visibility",
    text: "Contractors lack market visibility, restricting growth beyond existing networks & limiting access to high-value opportunities, with limited data-driven support.",
  },
  {
    title: "Disconnected stakeholders",
    text: "Stakeholders across the value chain operate in silos, leading to inefficiencies and lost opportunities, with lack of smart, connected systems limiting seamless coordination and decision-making.",
  },
];

const solutions = [
  {
    title: "Unified AI-based ecosystem",
    text: "A single platform connecting all infrastructure, construction & manufacturing stakeholders, unifying discovery, supply chain, plants & equipment, and insurance into one data-driven operating system.",
    icon: Network,
  },
  {
    title: "Integrated value-chain collaboration",
    text: "One platform enabling seamless coordination    across all infrastructure, construction & Manufacturing stakeholders. Ensuring aligned execution across planning, design, execution,  quality assurance, delivery, and operations.",
    icon: Workflow,
  },
  {
    title: "Smart visibility and discovery",
    text: "Verified profiles and smart matching unlock high-intent opportunities by surfacing the right vendors, contractors, and partners at the right time through data-driven insights.",
    icon: Target,
  },
  {
    title: "Scalable ecosystem monetisation",
    text: "AI tools and ecosystem supports the contractors execute better and scale faster Multiple solutions built across the entire value chain to unlock opportunities.",
    icon: Layers3,
  },
];

const ecosystemWheel = [
  {
    title: "Tender Intelligence",
    text: "Live tender details, support and analysis",
    icon: BarChart3,
    area: "lg:col-start-2 lg:row-start-1",
  },
  {
    title: "Vendor Discovery",
    text: "32K verified vendors and faster sourcing",
    icon: Building2,
    area: "lg:col-start-3 lg:row-start-1",
  },
  {
    title: "Price Discovery/SOR",
    text: "Transparent pricing and 75+ updated SOR available",
    icon: CircleDollarSign,
    area: "lg:col-start-3 lg:row-start-2",
  },
  {
    title: "Project Insurance",
    text: "Integrated risk coverage",
    icon: ShieldCheck,
    area: "lg:col-start-3 lg:row-start-3",
  },
  {
    title: "Material Procurement & Credit",
    text: "Materials procurement with working-capital solutions",
    icon: Boxes,
    area: "lg:col-start-2 lg:row-start-3",
  },
  {
    title: "Plants & Equipment",
    text: "Optimized utilization of heavy assets",
    icon: Landmark,
    area: "lg:col-start-1 lg:row-start-3",
  },
  {
    title: "Maintenance",
    text: "Choose from our integrated services",
    icon: Workflow,
    area: "lg:col-start-1 lg:row-start-2",
  },
  {
    title: "Growth & Diversification",
    text: "From one sector and geography to another",
    icon: TrendingUp,
    area: "lg:col-start-1 lg:row-start-1",
  },
];

const ecosystem = [
  {
    layer: "Layer 1",
    title: "Network",
    subtitle: "SaaS",
    creates: "Network Effect",
    items: ["Contractors", "Suppliers", "Consultants", "OEMs", "Equipment owners"],
    icon: Users,
  },
  {
    layer: "Layer 2",
    title: "Intelligence",
    subtitle: "Data advantage",
    creates: "Data Moat",
    items: ["Vendor reliability score", "Price intelligence", "Credit behaviour", "Demand forecasting", "Sector trends"],
    icon: Bot,
  },
  {
    layer: "Layer 3",
    title: "Transactions",
    subtitle: "Monetisation",
    creates: "Revenue Scale",
    items: ["Material supply", "Financing", "Equipment", "Insurance", "Enterprise solutions"],
    icon: CircleDollarSign,
  },
];

const offerings = [
  {
    title: "Supply Chain",
    revenue: "Revenue Stream 1",
    intro: "One-stop solution for all raw material needs.",
    bullets: [
      "Material procurement",
      "Embedded finance",
      "Bill to ship to model",
      "Steel, solar and pipes",
      "Cable, roof insulation board",
      "Bitumen, cement, admixture",
      "Electrical, instrumentation and DG",
      "Fly-ash, ingot and billets",
    ],
    icon: Boxes,
    accent: "bg-[#edad1a]",
  },
  {
    title: "Contract Manufacturing",
    revenue: "Revenue Stream 2",
    intro: "Vendor Infra enables seamless design, sourcing, manufacturing, quality check & delivery through a connected ecosystem of verified manufacturers and real-time execution visibility.",
    bullets: [
      "Verified manufacturer network",
      "AI-powered supplier matching",
      "Manufacturing project OS",
      "Integrated QA",
      "End-to-end execution",
    ],
    icon: Factory,
    accent: "bg-[#00274d]",
  },
  {
    title: "SaaS Platform",
    revenue: "Revenue Stream 3",
    intro: "AI-powered Discovery & Collaboration with Vendors, Suppliers, Contractors, Manufacturers, Consultants.",
    bullets: [
      "AI-powered vendor discovery",
      "Smart price discovery",
      "AI-based Sector Intelligence & SOR & Industry Updates.",
      "AI-Powered Plants & Equipment Intelligence Platform.",
    ],
    icon: Building2,
    accent: "bg-[#edad1a]",
  },
  {
    title: "Plants and Equipment Marketplace",
    revenue: "Revenue Stream 4",
    intro: "AI-Powered platform for Plants & Equipment to Reduce Idling and Maximize Utilization.",
    bullets: [
      "Intelligent listing",
      "Smart buying decisions",
      "Efficient hiring",
      "Faster selling",
      "Smart spare parts sourcing with predictive recommendations",
    ],
    icon: Landmark,
    accent: "bg-[#00274d]",
  },
  {
    title: "Insurance",
    revenue: "Revenue Stream 5",
    intro: "One-stop shop for all non-life insurance.",
    bullets: [
      "Project insurance",
      "Plants and equipment insurance",
      "Raw material insurance",
    ],
    icon: ShieldCheck,
    accent: "bg-[#edad1a]",
  },
];

const productVision = [
  {
    title: "Supply Chain",
    icon: Boxes,
    accent: "bg-[#00274d]",
    points: [
      "Backend integration model: acquiring manufacturing setup",
      "Frontend integration model: white labeling of materials",
      "Build our own NBFC and enable direct lending",
      "Contractor bid comparison engines and reverse auction",
    ],
  },
  {
    title: "Contract Manufacturing",
    icon: Factory,
    accent: "bg-[#edad1a]",
    points: [
      "We will build  an AI-native manufacturing ecosystem with predictive sourcing, smart capacity allocation, and automated production planning",
      "Enable digital-first manufacturing execution with real-time visibility, intelligent workflows, and connected factory operations. ",
      "Transform manufacturing with predictive intelligence and proactive execution control.",
    ],
  },
  {
    title: "SaaS Platform",
    icon: Building2,
    accent: "bg-[#00274d]",
    points: [
      "We will build these high-growth SaaS modules: Tender Intelligence & Profiling, Tender-to-BOQ Conversion with AI-Based Tender Filling, AI Bidding Engine, and AI Growth Engine & AI Agent for Vendor Updation & Verification.",
      "Matched vendors based on inputs and past project data with Machine Learning technology.",
  
    ],
  },
  {
    title: "Plants & Equipment Marketplace",
    icon: Landmark,
    accent: "bg-[#edad1a]",
    points: [
      "AI-Powered Plants & Equipment Ecosystem: Project–Equipment Matching, Equipment Recommendations, Predictive Maintenance, Utilization Optimization, Dynamic Pricing, and Risk & Failure Prediction.",
      "Develop a Spare Parts Marketplace to allow P&E owners to search for compatible parts using AI visual recognition system.",
    ],
  },
  {
    title: "Insurance",
    icon: ShieldCheck,
    accent: "bg-[#edad1a]",
    points: [
      "Acquire a universal brokerage license & Partner with non-life insurance companies .",
      "Offer multi-quote comparisons similar to a Marsh for construction Industry specific policies.",
    ],
  },
];

const aiModules = [
  { name: "AI-powered vendor discovery", status: "Completed" },
  { name: "AI-powered sector intelligence", status: "Completed" },
  { name: "AI-powered plants and equipment search", status: "Completed" },
  { name: "AI assisted plants and equipment upload", status: "Under development" },
  { name: "Plants and equipment spare parts marketplace", status: "Under development" },
  { name: "Vendor verification using AI agents", status: "Vision" },
  { name: "Tender to BOQ conversion", status: "Vision" },
  { name: "Tender intelligence and profiling", status: "Vision" },
  { name: "Fill tender module", status: "Vision" },
  { name: "AI-powered insurance engine", status: "Vision" },
  { name: "Machine maintenance module", status: "Vision" },
  { name: "New EPC acquisition and pre-bid engagement", status: "Vision" },
];

const rightToWin = [
  {
    title: "Buying-selling Market",
    text: "New-age companies operate 80% within manufacturer-distributor-trader networks and only 20% with end clients. Vendor Infra operates differently. We buy 100% from manufacturers, distributors and stockists and sell 100% directly to end clients, eliminating multi-layer trading complexity.",
  },
  {
    title: "Debtor Days",
    text: "Buying-selling structure directly impacts debtor days. New-age companies have lower debtor days (~12 days) due to inter-trader transactions. Vendor Infra operates on industry demand debtor days (~45 days), aligned with real project cycles and end-client payment structures.",
  },
  {
    title: "Gross Margins",
    text: "Debtors structure drives margin performance. New-age companies recorded 1.2% (FY24) and 1.7% (FY25) gross margins, while Vendor Infra achieved 3.5% (FY24) and 5.3% (FY25), creating an approximately 3% structural margin advantage.",
  },
  {
    title: "Strong founder-market fit",
    text: "Our leadership team brings deep domain expertise and strong industry relationships. Their experience has accelerated our growth and strengthened market penetration. This strategic advantage enables faster execution and sustained competitive positioning.",
  },
  {
    title: "Proven Unit Economics",
    text: "Most businesses chase growth through equity and operate on limited runway. We have achieved positive unit economics using debt, proving the business is a need of the industry.",
  },
  {
    title: "Deep Infrastructure Focus",
    text: "We build infrastructure-specific services across the value chain, including supply chain, insurance, P&E, and SaaS. This exclusive focus on infrastructure allows us to solve problems that multi-industry platforms do not address.",
  },
];

const marketCards = [
  {
    title: "Infrastructure pipeline",
    values: ["12.2+ Lac Cr NIP", "13.15 Lac Cr target pipeline 2025-28", "13000+ projects", "30+ sectors", "36 states and UTs"],
  },
  {
    title: "Insurance",
    values: ["25 general insurance companies", "93,000 Cr premium in 2024", "1,40,000 Cr in 2026", "2,80,000 Cr projected by 2030", "30.77% growth"],
  },
  {
    title: "Construction equipment",
    values: ["71,925 Cr market in 2024", "84,014 Cr in 2026", "1,58,223 Cr projected by 2030", "8% CAGR"],
  },
  {
    title: "Contract manufacturing",
    values: ["2,20,000 Cr in 2024", "2,95,000 Cr in 2026", "4,90,000+ Cr projected by 2030", "About 15% growth"],
  },
];

const tractionStats = [
  { value: "32,930", label: "verified vendors" },
  { value: "18,473", label: "outbound leads" },
  { value: "2,404", label: "demos done" },
  { value: "625", label: "quotations" },
  { value: "293", label: "live users" },
  { value: "263", label: "paid clients" },
  { value: "6,052 Cr", label: "posted projects value" },
  { value: "159", label: "live plants and equipment" },
];

const achievements = [
  "470+ Cr consolidated revenue since inception",
  "220+ projects delivered across 20+ sectors",
  "25+ states operating footprint in India",
  "340+ material types supplied",
  "106 trusted clients across infrastructure, construction and manufacturing",
];

const revenueStreams = [
  {
    title: "Supply Chain Infrastructure & Construction",
    value: "420 Cr",
    clients: ["JWIL", "KMV", "Shivalaya", "JITF", "KPTL", "MPRDC"],
    accent: "bg-[#00274d]",
  },
  {
    title: "Supply Chain Manufacturing",
    value: "46 Cr",
    clients: ["Leighton", "JMM", "Pinax Steel", "Avighna Steel", "CBM", "STV"],
    accent: "bg-[#00274d]",
  },
  {
    title: "Contract Manufacturing Pilot",
    value: "1.4 Cr",
    clients: ["NRL", "Larsen & Toubro", "IndianOil", "Numaligarh Refinery"],
    accent: "bg-[#00274d]",
  },
  {
    title: "Total Revenue",
    value: "467 Cr",
    clients: ["Since inception till April 2026"],
    accent: "bg-[#edad1a]",
  },
];

const supplyChainFlow = [
  {
    label: "New Age Companies",
    tone: "border-[#edad1a]",
    badge: "bg-[#edad1a]",
    lanes: [
      { title: "Buying & Selling", share: "80%", nodes: ["Manufacturer", "Distributors", "Stockiest", "Traders"] },
      { title: "NAC Selling", share: "20%", nodes: ["End Client"] },
    ],
  },
  {
    label: "Vendor Infra",
    tone: "border-[#00274d]",
    badge: "bg-[#00274d]",
    lanes: [
      { title: "VI Buying", share: "100%", nodes: ["Manufacturer", "Distributors", "Stockiest", "Traders"] },
      { title: "VI Selling", share: "100%", nodes: ["End Client"] },
    ],
  },
];

const timeline = [
  ["Oct 2019", "Company formation"],
  ["Apr 2021", "Testing"],
  ["Aug 2021", "Live"],
  ["Dec 2021", "Angel Round Funding"],
  ["Apr 2022", "Material Procurement"],
   ["Apr 2024", "Plants & Equipment Listing"],
  ["Jul 2025", "SaaS Platform (Free) Contract Manufacturing"],
  ["May 2026", "SaaS Platform (Paid) and AI-Powered Vendor Discovery AI-Powered Plants & Equipment AI Powered Sector Intelligence."],
  ["Dec 2026", "AI-Powered Insurance Service. Tender Intelligence. AI Bidding Engine AI Growth Engine AI Agents (Vendor Update & Verification)"],
  ["Dec 2027", "Backend Integration of Supply Chain "],
  ["Apr 2027", "NBFC/IRDA License"],
  ["Jun 2028", "Cross Border Supply Chain"],
];

const fundUse = [
  { label: "Growth and revenue expansion", value: "30%" },
  { label: "Technology and platform", value: "20%" },
  { label: "Capital efficiency lever", value: "25%" },
  { label: "Operations and team", value: "15%" },
  { label: "Marketing and brand", value: "6%" },
  { label: "Compliance and miscellaneous", value: "4%" },
];

const competitors = [
  {
    company: "Vendor Infra",
    foundedYear: 2021,
    totalFundingRaised: "~$265K",
    unicornStatus: "No",
    unicornYear: "NY",
    currentValuation: "TBD",
    revenueFY2425: "₹116 Cr",
    businessType: "B2B unified ecosystem",
  },
  {
    company: "OFBusiness",
    foundedYear: 2015,
    totalFundingRaised: "~$890M+",
    unicornStatus: "Yes",
    unicornYear: 2021,
    currentValuation: "~$5B (Target $6–9B IPO)",
    revenueFY2425: "~₹22,241 Cr",
    businessType: "Construction materials platform + financing",
  },
  {
    company: "Zetwerk",
    foundedYear: 2018,
    totalFundingRaised: "~$860M+",
    unicornStatus: "Yes",
    unicornYear: 2021,
    currentValuation: "~$3.1B",
    revenueFY2425: "~₹12,798 Cr",
    businessType: "B2B manufacturing marketplace",
  },
  {
    company: "Moglix",
    foundedYear: 2015,
    totalFundingRaised: "~$470M+",
    unicornStatus: "Yes",
    unicornYear: 2021,
    currentValuation: "~$2.6B",
    revenueFY2425: "₹6,197 Cr",
    businessType: "B2B/B2C industrial commerce",
  },
  {
    company: "Infra.Market",
    foundedYear: 2016,
    totalFundingRaised: "~$763M+",
    unicornStatus: "Yes",
    unicornYear: 2021,
    currentValuation: "~$2.8B",
    revenueFY2425: "~₹18,472 Cr",
    businessType: "Construction materials platform",
  },
];

const TABLE_HEADERS = [
  "Company",
  "Founded",
  "Funding",
  "Unicorn Status",
  "Unicorn Year",
  "Valuation",
  "Revenue (FY24-25)",
  "Business Type",
];

function SectionEyebrow({ children }: { children: string }) {
  return (
    <span className="inline-flex items-center gap-3 text-[#edad1a] text-[12px] font-bold uppercase tracking-[0.3em] mb-4">
      <span className="w-8 h-px bg-[#edad1a]/60" />
      {children}
      <span className="w-8 h-px bg-[#edad1a]/60" />
    </span>
  );
}

export default function Investor() {
  usePageSeo(
    "Investor Relations | Vendor Infra",
    "Vendor Infra investor overview: AI-powered operating system for infrastructure, construction and manufacturing with strong traction, market opportunity and growth roadmap."
  );

  return (
    <div className="min-h-screen flex flex-col">
      <div className="fixed right-0 top-0 h-full w-[18px] bg-[#00274d] z-50 pointer-events-none" />
      <Navbar />

      <main className="flex-1 bg-white">
     <section className="relative overflow-hidden bg-[#00274d] text-white">
  <div
    className="absolute inset-0 opacity-[0.08]"
    style={{
      backgroundImage:
        "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)",
      backgroundSize: "42px 42px",
    }}
  />
  <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#001d3a] to-transparent" />
  <div className="relative z-10 container mx-auto px-4 py-16 md:py-24 max-w-7xl">
    <div>
      <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}>
        <span className="inline-flex items-center gap-2 rounded-full border border-[#edad1a]/45 bg-[#edad1a]/10 px-4 py-2 text-sm font-bold text-[#edad1a] mb-6">
          Investor Relations
        </span>
        <h1 className="text-4xl md:text-6xl font-black leading-[0.98] mb-6">
          AI-Powered Operating System for Infrastructure, Construction & Manufacturing Industry
        </h1>
        <p className="text-white/76 text-base md:text-lg leading-relaxed max-w-2xl mb-8">
          Digitizing execution across India's 12+ lakh crore infrastructure economy.
        </p>

        {/* Stats grid: 3 on first row, 2 on second row */}
        <div className="max-w-2xl mb-8">
          {/* Row 1: 3 stats */}
          <div className="grid grid-cols-3 gap-3 mb-3">
            {heroStats.slice(0, 3).map((stat) => (
              <div key={stat.label} className="border-l-2 border-[#edad1a] bg-white/7 px-4 py-3">
                <p className="text-xl md:text-2xl font-black text-white">{stat.value}</p>
                {/* <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white/55">{stat.label}</p> */}
              </div>
            ))}
          </div>
          {/* Row 2: 2 stats */}
          <div className="grid grid-cols-3 gap-3">
            {heroStats.slice(3, 5).map((stat) => (
              <div key={stat.label} className="border-l-2 border-[#edad1a] bg-white/7 px-4 py-3">
                <p className="text-xl md:text-2xl font-black text-white">{stat.value}</p>
                {/* <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white/55">{stat.label}</p> */}
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <a href="mailto:enquiry@vendorinfra.com" className={siteButtonClasses("primary", "px-6 py-3")}>
            Contact Investor Relations <Mail className="w-4 h-4" />
          </a>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="relative"
      >
      </motion.div>
    </div>
  </div>
</section>

     <section className="relative overflow-hidden bg-white py-16 md:py-24 text-[#00274d]">
  <div
    className="absolute inset-0 opacity-[0.04]"
    style={{
      backgroundImage: "linear-gradient(#00274d 1px, transparent 1px), linear-gradient(90deg, #00274d 1px, transparent 1px)",
      backgroundSize: "44px 44px",
    }}
  />
  <div className="container relative mx-auto px-4 max-w-7xl">
    <div className="mx-auto mb-14 max-w-4xl text-center">
      <SectionEyebrow>Problem</SectionEyebrow>
      <h2 className="text-3xl md:text-5xl font-black leading-tight text-[#00274d]">
        A massive industry still trapped in offline execution loops.
      </h2>
      {/* <p className="mx-auto mt-5 max-w-2xl text-[#00274d]/70">
        Four structural gaps keep infrastructure execution slow, opaque and relationship-dependent.
      </p> */}
    </div>

    <div className="relative grid gap-5 lg:grid-cols-[1fr_220px_1fr] lg:items-center">
      <div className="space-y-5">
        {problems.slice(0, 2).map((item, index) => {
          const Icon = [Network, Workflow][index];
          return (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, x: -18 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="rounded-2xl border border-[#00274d]/12 bg-[#00274d] p-6 text-white shadow-xl shadow-black/10"
            >
              <div className="flex items-start gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#edad1a]/15 text-[#edad1a]">
                  <Icon className="h-6 w-6" />
                </span>
                <div>
                  <p className="mb-1.5 text-[10px] font-black uppercase tracking-[0.22em] text-[#edad1a]">Problem {index + 1}</p>
                  <h3 className="text-lg font-black leading-tight text-white">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/60">{item.text}</p>
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>

      {/* ── Center Orb ── */}
      <div className="relative mx-auto flex h-52 w-52 items-center justify-center rounded-full border border-[#edad1a]/35 bg-[#f0f2f5] lg:h-[220px] lg:w-[220px]">
        {/* crosshair lines bleeding outside */}
        <div className="absolute top-1/2 -left-8 -right-8 h-px -translate-y-1/2 bg-[#edad1a]/40" />
        <div className="absolute left-1/2 -top-8 -bottom-8 w-px -translate-x-1/2 bg-[#edad1a]/40" />
        {/* inner dashed ring */}
        <div className="absolute inset-5 rounded-full border border-dashed border-[#edad1a]/50" />
        {/* badge */}
        {/* <div className="relative z-10 rounded-xl bg-[#edad1a] px-5 py-3 text-center text-[#00274d] shadow-lg shadow-[#edad1a]/25">
          <p className="text-[9px] font-black uppercase tracking-[0.22em]"></p>
          <p className="mt-0.5 text-2xl font-black"></p>
        </div> */}
      </div>

      <div className="space-y-5">
        {problems.slice(2, 4).map((item, index) => {
          const Icon = [Target, Layers3][index];
          return (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, x: 18 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="rounded-2xl border border-[#00274d]/12 bg-[#00274d] p-6 text-white shadow-xl shadow-black/10"
            >
              <div className="flex items-start gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#edad1a]/15 text-[#edad1a]">
                  <Icon className="h-6 w-6" />
                </span>
                <div>
                  <p className="mb-1.5 text-[10px] font-black uppercase tracking-[0.22em] text-[#edad1a]">Problem {index + 3}</p>
                  <h3 className="text-lg font-black leading-tight text-white">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/60">{item.text}</p>
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>
    </div>
  </div>
</section>

        <section className="relative overflow-hidden bg-white py-16 md:py-24">
          {/* <div className="absolute left-0 top-12 h-32 w-32 rounded-full border-[10px] border-r-0 border-b-0 border-[#edad1a]" /> */}
          {/* <div className="absolute bottom-10 right-0 h-32 w-32 rounded-full border-[10px] border-l-0 border-t-0 border-[#00274d]" /> */}
          <div className="container relative mx-auto px-4 max-w-7xl">
            <div className="mb-12 text-center">
              <SectionEyebrow>Our thesis</SectionEyebrow>
              <h2 className="text-3xl md:text-4xl font-black text-[#00274d] leading-tight">
                Vendor Infra Ecosystem
              </h2>
            </div>

            <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <motion.div
                initial={{ opacity: 0, x: -18 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="rounded-2xl border border-gray-100 bg-[#f8fafc] p-6 md:p-8 shadow-sm"
              >
                <p className="text-lg leading-relaxed text-gray-650">
                  Vendor Infra is building <span className="font-black text-[#00274d]">the horizontal operating system</span> for <span className="font-black text-[#00274d]">infrastructure, construction and manufacturing</span> in India.
                </p>
                <p className="mt-5 text-lg leading-relaxed text-gray-650">
                  Despite unprecedented public and private capex, infrastructure delivery remains <span className="font-black text-[#edad1a]">fragmented, opaque and inefficient.</span>
                </p>
                <p className="mt-5 text-lg leading-relaxed text-gray-650">
                  By embedding deeply into EPC workflows, Vendor Infra becomes mission-critical infrastructure driving:
                </p>
                <ul className="mt-5 grid gap-3 sm:grid-cols-3">
                  {["High switching costs", "Strong repeat usage", "Expanding wallet share"].map((point) => (
                    <li key={point} className="rounded-xl bg-white p-4 text-sm font-bold text-[#00274d] shadow-sm">
                      <CheckCircle2 className="mb-2 h-5 w-5 text-[#edad1a]" />
                      {point}
                    </li>
                  ))}
                </ul>
                <p className="mt-6 text-lg leading-relaxed text-gray-650">
                  The platform converts infrastructure execution from relationship-driven chaos into <span className="font-black text-[#00274d]">data-driven, scalable operations.</span>
                </p>
              </motion.div>

              <motion.aside
                initial={{ opacity: 0, x: 18 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="rounded-2xl bg-[#00274d] p-7 md:p-8 text-white shadow-xl shadow-[#00274d]/20"
              >
                <div className="mb-7 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#edad1a]/15 text-[#edad1a]">
                  <Users className="h-7 w-7" />
                </div>
                <div className="space-y-7">
                  <div>
                    <p className="text-[#edad1a] text-sm font-black uppercase tracking-[0.22em] mb-3">Vision</p>
                    <p className="text-white/85 leading-relaxed">
                      To build an AI-powered operating system for the infrastructure, construction and manufacturing industry.
                    </p>
                  </div>
                  <div className="border-t border-white/15 pt-7">
                    <p className="text-[#edad1a] text-sm font-black uppercase tracking-[0.22em] mb-3">Mission</p>
                    <p className="text-white/85 leading-relaxed">
                      Use AI, data intelligence and smart collaboration to connect all infrastructure stakeholders and enable smarter project execution.
                    </p>
                  </div>
                </div>
              </motion.aside>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4 max-w-7xl">
  <div className="text-center max-w-5xl mx-auto mb-12">
    <SectionEyebrow>Solutions</SectionEyebrow>
    <h2 className="text-3xl md:text-5xl font-bold text-[#00274d] leading-tight">
      One connected platform for every stage of the infrastructure value chain.
    </h2>
  </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {solutions.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.article
                    key={item.title}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.04 }}
                    className="group rounded-2xl border border-gray-100 bg-[#f8fafc] p-6 hover:bg-white hover:shadow-lg hover:shadow-[#00274d]/10 transition-all"
                  >
                    <div className="w-12 h-12 rounded-xl bg-[#00274d] text-white flex items-center justify-center mb-5 group-hover:bg-[#edad1a] transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-[#00274d] mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{item.text}</p>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </section>

        {/* <section className="py-16 md:py-20 bg-[#f6f8fb]">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="grid lg:grid-cols-[360px_1fr] gap-8 items-stretch">
              <motion.aside
                initial={{ opacity: 0, x: -18 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative overflow-hidden rounded-2xl bg-[#00274d] p-7 md:p-8 text-white"
              >
                <div
                  className="absolute inset-0 opacity-[0.08]"
                  style={{
                    backgroundImage: "radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)",
                    backgroundSize: "26px 26px",
                  }}
                />
                <div className="relative">
                  <div className="mb-8 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-[#edad1a]/15 text-[#edad1a]">
                    <Handshake className="h-8 w-8" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-black leading-tight mb-5">
                    Integrated Products & Services Ecosystem
                  </h2>
                  <p className="text-white/78 leading-relaxed mb-8">
                    Building one single platform for the infrastructure, construction and manufacturing industry.
                  </p>
                  <div className="space-y-4">
                    {["Procurement", "Discovery", "Reduce Idling", "Cost Optimization & Scalable Growth", "Contract Manufacturing"].map((point) => (
                      <div key={point} className="flex items-center gap-3">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/10 text-[#edad1a]">
                          <CheckCircle2 className="h-4 w-4" />
                        </span>
                        <span className="font-semibold leading-snug">{point}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.aside>

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="rounded-2xl border border-gray-100 bg-white p-4 md:p-6 shadow-xl shadow-[#00274d]/8"
              >
                <div className="mb-6 text-center">
                  <SectionEyebrow>Ecosystem map</SectionEyebrow>
                  <h3 className="text-2xl md:text-3xl font-bold text-[#00274d]">Connected growth engines</h3>
                </div>

                <div className="grid gap-4 lg:grid-cols-3 lg:grid-rows-3 lg:items-stretch">
                  {ecosystemWheel.map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <motion.article
                        key={item.title}
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.035 }}
                        className={`group rounded-2xl border border-gray-100 bg-[#f8fafc] p-4 text-left transition-all hover:-translate-y-1 hover:border-[#edad1a]/45 hover:bg-white hover:shadow-lg hover:shadow-[#00274d]/8 ${item.area}`}
                      >
                        <div className="flex items-start gap-4">
                          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#edad1a]/12 text-[#edad1a] ring-1 ring-[#edad1a]/25 group-hover:bg-[#00274d] group-hover:text-[#edad1a] transition-colors">
                            <Icon className="h-6 w-6" />
                          </span>
                          <div>
                            <h3 className="font-black text-[#00274d] leading-snug">{item.title}</h3>
                            <p className="mt-1 text-sm text-gray-600 leading-relaxed">{item.text}</p>
                          </div>
                        </div>
                      </motion.article>
                    );
                  })}

                  <div className="order-first flex min-h-[260px] items-center justify-center rounded-2xl bg-[#00274d] p-6 text-white shadow-xl shadow-[#00274d]/18 lg:order-none lg:col-start-2 lg:row-start-2">
                    <div className="relative h-52 w-52">
                      <div
                        className="absolute inset-0 rounded-full p-2"
                        style={{
                          background: "conic-gradient(from -35deg, #edad1a 0 35%, #ffffff 35% 52%, #00274d 52% 76%, #edad1a 76% 100%)",
                        }}
                      >
                        <div className="flex h-full w-full items-center justify-center rounded-full bg-[#00274d]">
                          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white text-[#00274d] shadow-2xl shadow-black/20">
                            <Network className="h-10 w-10" />
                          </div>
                        </div>
                      </div>
                      <span className="absolute left-1/2 top-5 h-0 w-0 -translate-x-1/2 border-x-[19px] border-t-[34px] border-x-transparent border-t-[#edad1a]" />
                      <span className="absolute bottom-5 left-1/2 h-0 w-0 -translate-x-1/2 rotate-180 border-x-[19px] border-t-[34px] border-x-transparent border-t-[#edad1a]" />
                      <span className="absolute left-5 top-1/2 h-0 w-0 -translate-y-1/2 -rotate-90 border-x-[19px] border-t-[34px] border-x-transparent border-t-white" />
                      <span className="absolute right-5 top-1/2 h-0 w-0 -translate-y-1/2 rotate-90 border-x-[19px] border-t-[34px] border-x-transparent border-t-[#00274d]" />
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section> */}

        <section className="relative overflow-hidden bg-[#00274d] py-16 md:py-24 text-white">
          <div
            className="absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage: "radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)",
              backgroundSize: "32px 32px",
            }}
          />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#edad1a]/70 to-transparent" />
          <div className="relative container mx-auto px-4 max-w-7xl">
            <div className="mx-auto mb-12 max-w-4xl text-center">
              <SectionEyebrow>Business model</SectionEyebrow>
              <h2 className="text-3xl md:text-5xl font-black leading-tight mb-5">
                Are we SaaS, Supply Chain, or an Ecosystem?
              </h2>
              {/* <p className="mx-auto max-w-3xl text-white/72 leading-relaxed">
                Each layer reinforces the next: network creates usage, usage creates intelligence, and intelligence converts into higher-quality transactions at scale.
              </p> */}
            </div>

            <div className="relative">
              <div className="absolute left-[16%] right-[16%] top-16 hidden h-px bg-gradient-to-r from-[#edad1a]/20 via-[#edad1a]/70 to-[#edad1a]/20 lg:block" />
              <div className="grid gap-5 lg:grid-cols-3">
                {ecosystem.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <motion.article
                      key={item.title}
                      initial={{ opacity: 0, y: 22 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.06 }}
                      className="relative overflow-hidden rounded-2xl bg-white text-[#00274d] shadow-2xl shadow-black/20"
                    >
                      <div className="h-2 bg-[#edad1a]" />
                      <div className="p-6 md:p-7">
                        <div className="mb-6 flex items-start justify-between gap-4">
                          <div>
                            <span className="inline-flex rounded-full bg-[#edad1a]/12 px-3 py-1 text-xs font-black uppercase tracking-[0.22em] text-[#a16d00]">
                              {item.layer}
                            </span>
                            <h3 className="mt-5 text-2xl font-black leading-none">{item.title}</h3>
                            <p className="mt-2 font-bold text-gray-500">{item.subtitle}</p>
                          </div>
                          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#00274d] text-[#edad1a]">
                            <Icon className="h-6 w-6" />
                          </span>
                        </div>

                        <ul className="space-y-3">
                          {item.items.map((point) => (
                            <li key={point} className="flex gap-3 text-[15px] text-gray-650">
                              <CheckCircle2 className="mt-0.5 h-4.5 w-4.5 shrink-0 text-[#edad1a]" />
                              <span className="leading-snug">{point}</span>
                            </li>
                          ))}
                        </ul>

                        <div className="mt-7 rounded-xl border border-[#00274d]/8 bg-[#00274d]/5 p-4">
                          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#edad1a]">Creates:</p>
                          <p className="mt-1 font-black text-[#00274d]">{item.creates}</p>
                        </div>
                      </div>
                    </motion.article>
                  );
                })}
              </div>
            </div>

            {/* <div className="mt-8 grid gap-4 md:grid-cols-3">
              {[
                ["Network effect", "More stakeholders create richer demand signals."],
                ["Data moat", "Transactions improve reliability, pricing and risk intelligence."],
                ["Revenue scale", "The ecosystem expands wallet share across repeat workflows."],
              ].map(([title, text]) => (
                <div key={title} className="rounded-2xl border border-white/10 bg-white/8 p-5 backdrop-blur">
                  <p className="text-lg font-black text-[#edad1a]">{title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-white/70">{text}</p>
                </div>
              ))}
            </div> */}
          </div>
        </section>

        <section className="py-16 md:py-20 bg-white">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="mx-auto mb-12 max-w-4xl text-center">
              <SectionEyebrow>Offerings</SectionEyebrow>
              <h2 className="text-3xl md:text-5xl font-black text-[#00274d] leading-tight">
                Key Offerings & Value Proposition
              </h2>
              {/* <p className="mx-auto mt-4 max-w-2xl text-gray-600">
                Each offering is designed to open a different wallet, while feeding the same ecosystem intelligence layer.
              </p> */}
            </div>

            <div className="grid gap-4 lg:grid-cols-5">
              {offerings.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.article
                    key={item.title}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.04 }}
                    className="group flex min-h-[560px] flex-col overflow-hidden rounded-2xl border border-gray-100 bg-[#f8fafc] shadow-lg shadow-[#00274d]/6 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-[#00274d]/12"
                  >
                    <div className="bg-[#00274d] p-5 text-white">
                      <div className="flex items-center justify-between gap-4">
                        <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#edad1a] text-[#00274d]">
                          <Icon className="h-6 w-6" />
                        </span>
                        <span className="text-4xl font-black text-white/15">{String(index + 1).padStart(2, "0")}</span>
                      </div>
                      <h3 className="mt-5 text-xl font-black leading-tight">{item.title}</h3>
                      <p className="mt-3 text-sm leading-relaxed text-white/72">{item.intro}</p>
                    </div>

                    <div className="flex flex-1 flex-col p-5">
                      <ul className="flex-1 space-y-2.5">
                        {item.bullets.map((point) => (
                          <li key={point} className="flex gap-2.5 text-sm leading-snug text-gray-650">
                            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#edad1a]" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="border-t border-gray-100 bg-white px-5 py-4">
                      <p
                        className={`rounded-xl px-4 py-3 text-center text-sm font-black ${
                          index < 3
                            ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200"
                            : "bg-gray-100 text-gray-500 ring-1 ring-gray-200"
                        }`}
                      >
                        {item.revenue}
                        {/* <span className="mt-1 block text-[10px] uppercase tracking-[0.18em]">
                          {index < 3 ? "Completed" : "In progress"}
                        </span> */}
                      </p>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-[#00274d] py-16 md:py-24 text-white">
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage: "radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)",
              backgroundSize: "28px 28px",
            }}
          />
          <div className="container relative mx-auto px-4 max-w-7xl">
            <div className="mx-auto mb-12 max-w-4xl text-center">
              <SectionEyebrow>Product vision</SectionEyebrow>
              <h2 className="text-3xl md:text-5xl font-black leading-tight">
                A strategic roadmap driving continuous innovation and customer value.
              </h2>
              {/* <p className="mx-auto mt-4 max-w-2xl text-white/70">
                Every product line moves from workflow capture to intelligence, automation and transaction depth.
              </p> */}
            </div>

            <div className="space-y-4">
              {productVision.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.article
                    key={item.title}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -16 : 16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.04 }}
                    className="grid gap-5 rounded-2xl border border-white/10 bg-white/7 p-5 backdrop-blur md:grid-cols-[260px_1fr]"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#edad1a] text-[#00274d]">
                        <Icon className="h-8 w-8" />
                      </div>
                      <div>
                        <p className="text-xs font-black uppercase tracking-[0.22em] text-[#edad1a]">Track {index + 1}</p>
                        <h3 className="mt-2 text-xl font-black leading-tight">{item.title}</h3>
                      </div>
                    </div>
                    <ul className="grid gap-3 md:grid-cols-2">
                      {item.points.map((point) => (
                        <li key={point} className="flex gap-2.5 rounded-xl bg-white p-3 text-sm font-medium leading-snug text-[#00274d]">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#edad1a]" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20 bg-white">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
              <div className="lg:sticky lg:top-28">
                <SectionEyebrow>AI platform</SectionEyebrow>
                <h2 className="text-3xl md:text-5xl font-black text-[#00274d] leading-tight mb-5">
                  AI-Driven Platform Modules
                </h2>
                {/* <p className="text-gray-600 leading-relaxed">
                  Vendor Infra is building high-growth SaaS modules across tender intelligence, tender-to-BOQ conversion, AI bidding, growth automation, vendor intelligence, spare parts and insurance intelligence.
                </p> */}
                <div className="mt-7 rounded-2xl bg-[#00274d] p-6 text-white">
                  <p className="text-xs font-black uppercase tracking-[0.22em] text-[#edad1a]">Platform logic</p>
                  <div className="mt-5 grid gap-3">
                    {["Discover", "Analyse", "Automate", "Convert"].map((step, index) => (
                      <div key={step} className="flex items-center gap-3 rounded-xl bg-white/8 px-4 py-3">
                        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#edad1a] text-sm font-black text-[#00274d]">
                          {index + 1}
                        </span>
                        <span className="font-bold">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {aiModules.map((module, index) => (
                  <motion.article
                    key={module.name}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.025 }}
                    className="group relative min-h-[150px] overflow-hidden rounded-2xl border border-gray-100 bg-[#f8fafc] p-5 shadow-sm transition-all hover:-translate-y-1 hover:bg-white hover:shadow-lg hover:shadow-[#00274d]/10"
                  >
                    <div className="absolute right-4 top-4 text-5xl font-black text-[#00274d]/5">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                    <div className="relative">
                      <span className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl bg-[#edad1a]/15 text-[#edad1a] group-hover:bg-[#00274d] group-hover:text-[#edad1a] transition-colors">
                        <Bot className="h-5 w-5" />
                      </span>
                      <h3 className="text-base font-black leading-snug text-[#00274d]">
                        {module.name}
                      </h3>
                    </div>
                  </motion.article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20 bg-[#f6f8fb]">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <SectionEyebrow> Our Right to win</SectionEyebrow>
              <h2 className="text-3xl md:text-4xl font-bold text-[#00274d] leading-tight">
               Technology, network effects, and industry expertise create our competitive edge.
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {rightToWin.map((item) => (
                <article key={item.title} className="rounded-2xl border border-gray-100 bg-white p-6">
                  <h3 className="text-lg font-bold text-[#00274d] mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* <section className="py-16 md:py-20 bg-white">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="text-center max-w-4xl mx-auto mb-12">
              <SectionEyebrow>Supply chain revenue</SectionEyebrow>
              <h2 className="text-3xl md:text-4xl font-bold text-[#00274d] leading-tight">
                Differentiated buying and selling structure.
              </h2>
              <p className="mt-4 text-gray-600">
                Vendor Infra builds stronger direct client relationships and creates cross-selling opportunities by operating directly with end clients.
              </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              {supplyChainFlow.map((flow, flowIndex) => {
                const isVendorInfra = flow.label === "Vendor Infra";
                const buyingLane = flow.lanes[0];
                const sellingLane = flow.lanes[1];
                return (
                  <motion.article
                    key={flow.label}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: flowIndex * 0.08 }}
                    className={`relative overflow-hidden rounded-3xl border p-6 md:p-7 shadow-xl ${
                      isVendorInfra
                        ? "border-[#00274d] bg-[#00274d] text-white shadow-[#00274d]/20"
                        : "border-gray-100 bg-[#f8fafc] text-[#00274d] shadow-[#00274d]/6"
                    }`}
                  >
                    <div
                      className="absolute inset-0 opacity-[0.08]"
                      style={{
                        backgroundImage: "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)",
                        backgroundSize: "22px 22px",
                      }}
                    />
                    <div className="relative">
                      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                        <div>
                          <span className={`inline-flex rounded-full px-4 py-2 text-xs font-black uppercase tracking-[0.18em] ${
                            isVendorInfra ? "bg-[#edad1a] text-[#00274d]" : "bg-[#00274d] text-white"
                          }`}>
                            {flow.label}
                          </span>
                          <h3 className={`mt-4 text-2xl font-black leading-tight ${isVendorInfra ? "text-white" : "text-[#00274d]"}`}>
                            {isVendorInfra ? "Direct client motion" : "Multi-layer trading motion"}
                          </h3>
                        </div>
                        <div className={`rounded-2xl px-4 py-3 text-center ${isVendorInfra ? "bg-white/10" : "bg-white"}`}>
                          <p className="text-3xl font-black text-[#edad1a]">{isVendorInfra ? "100%" : "80/20"}</p>
                          <p className={`text-[10px] font-black uppercase tracking-[0.18em] ${isVendorInfra ? "text-white/60" : "text-gray-500"}`}>
                            {isVendorInfra ? "buy and sell" : "split model"}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-5">
                        <div className={`rounded-2xl border p-5 ${isVendorInfra ? "border-white/15 bg-white/8" : "border-gray-100 bg-white"}`}>
                          <div className="mb-4 flex items-center justify-between gap-3">
                            <p className={`font-black ${isVendorInfra ? "text-white" : "text-[#00274d]"}`}>{buyingLane.title}</p>
                            <span className="rounded-full bg-[#edad1a]/15 px-3 py-1 text-xs font-black text-[#edad1a]">{buyingLane.share}</span>
                          </div>
                          <div className="grid gap-3 sm:grid-cols-2">
                            {buyingLane.nodes.map((node, index) => (
                              <div key={node} className={`relative rounded-xl border px-4 py-3 text-sm font-bold ${
                                isVendorInfra ? "border-white/15 bg-[#00274d] text-white" : "border-[#00274d]/15 bg-[#f8fafc] text-[#00274d]"
                              }`}>
                                {node}
                                {index < buyingLane.nodes.length - 1 && (
                                  <ArrowRight className="absolute -right-5 top-1/2 hidden h-4 w-4 -translate-y-1/2 text-[#edad1a] sm:block" />
                                )}
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="flex justify-center">
                          <div className={`flex items-center gap-3 rounded-full px-5 py-2 text-sm font-black ${
                            isVendorInfra ? "bg-[#edad1a] text-[#00274d]" : "bg-[#00274d] text-white"
                          }`}>
                            <ArrowRight className="h-4 w-4 rotate-90" />
                            {isVendorInfra ? "direct conversion to end client" : "handoff through another layer"}
                          </div>
                        </div>

                        <div className={`rounded-2xl border p-5 ${isVendorInfra ? "border-[#edad1a]/45 bg-[#edad1a]/12" : "border-gray-100 bg-white"}`}>
                          <div className="mb-4 flex items-center justify-between gap-3">
                            <p className={`font-black ${isVendorInfra ? "text-white" : "text-[#00274d]"}`}>{sellingLane.title}</p>
                            <span className="rounded-full bg-[#edad1a]/15 px-3 py-1 text-xs font-black text-[#edad1a]">{sellingLane.share}</span>
                          </div>
                          <div className="rounded-xl border-2 border-[#edad1a] bg-white px-5 py-4 text-center text-base font-black text-[#00274d]">
                            {sellingLane.nodes[0]}
                          </div>
                        </div>
                      </div>

                      <p className={`mt-6 text-sm leading-relaxed ${isVendorInfra ? "text-white/70" : "text-gray-600"}`}>
                        {isVendorInfra
                          ? "Vendor Infra buys across the supply base and sells directly to end clients, strengthening account ownership and cross-selling potential."
                          : "New-age companies primarily operate inside manufacturer-distributor-trader networks, leaving a smaller direct end-client motion."}
                      </p>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </section> */}

        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-10 items-start">
              <div>
                <SectionEyebrow>Market size</SectionEyebrow>
                <h2 className="text-3xl md:text-4xl font-bold text-[#00274d] leading-tight mb-5">
                  Driving growth, innovation, and scale across the trillion-dollar Infrastructure, Construction, and Manufacturing Industry.
                </h2>
                {/* <p className="text-gray-600 leading-relaxed">
                  The opportunity sits across NIP-backed infrastructure activity, general insurance, construction equipment and contract manufacturing. Vendor Infra is positioned across all four pools.
                </p> */}
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {marketCards.map((card) => (
                  <article key={card.title} className="rounded-2xl bg-[#00274d] p-5 text-white">
                    <h3 className="text-lg font-bold mb-4">{card.title}</h3>
                    <ul className="space-y-2">
                      {card.values.map((value) => (
                        <li key={value} className="flex gap-2 text-sm text-white/75">
                          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#edad1a] shrink-0" />
                          {value}
                        </li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20 bg-[#f6f8fb]">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="text-center max-w-4xl mx-auto mb-12">
              <SectionEyebrow>Revenue streams</SectionEyebrow>
              <h2 className="text-3xl md:text-4xl font-bold text-[#00274d] leading-tight">
                Revenue streams share <span className="text-gray-400 text-2xl">(Value in Cr)</span>
              </h2>
              {/* <p className="mt-4 text-gray-600">
                Since inception till April 2026, revenue has scaled across supply chain and contract manufacturing pilots.
              </p> */}
            </div>

            <div className="grid gap-5 lg:grid-cols-4">
              {revenueStreams.map((item, index) => (
                <motion.article
                  key={item.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.04 }}
                  className="rounded-2xl border border-gray-100 bg-white p-5 shadow-lg shadow-[#00274d]/6"
                >
                  <div className={`mx-auto mb-5 flex h-36 w-40 items-center justify-center rounded-[45%_45%_38%_38%] ${item.accent} text-white shadow-xl shadow-[#00274d]/10`}>
                    <span className="text-3xl font-black text-center leading-none">{item.value}</span>
                  </div>
                  <h3 className="min-h-[48px] text-center text-base font-black leading-tight text-[#00274d]">{item.title}</h3>
                  <div className="mt-5 grid grid-cols-2 gap-2">
                    {item.clients.map((client) => (
                      <span key={client} className="rounded-lg border border-gray-100 bg-[#f8fafc] px-2 py-2 text-center text-xs font-bold text-gray-600">
                        {client}
                      </span>
                    ))}
                  </div>
                </motion.article>
              ))}
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {tractionStats.slice(0, 8).map((stat) => (
                <div key={stat.label} className="rounded-xl bg-[#00274d] p-4 text-white">
                  <p className="text-xl font-black text-[#edad1a]">{stat.value}</p>
                  <p className="mt-2 text-xs uppercase tracking-[0.16em] text-white/65">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20 bg-[#f6f8fb]">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="grid lg:grid-cols-[1fr_380px] gap-8 items-start">
              <div>
                <SectionEyebrow>Achievements</SectionEyebrow>
                <h2 className="text-3xl md:text-4xl font-bold text-[#00274d] leading-tight mb-8">
                  Measurable impact through disciplined execution.
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {achievements.map((achievement) => (
                    <div key={achievement} className="rounded-2xl bg-white border border-gray-100 p-5 flex gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#edad1a] shrink-0 mt-1" />
                      <p className="font-semibold text-[#00274d] leading-snug">{achievement}</p>
                    </div>
                  ))}
                </div>
              </div>
              <aside className="rounded-2xl bg-white border border-gray-100 p-6 shadow-sm">
                <TrendingUp className="w-10 h-10 text-[#edad1a] mb-5" />
                <h3 className="text-2xl font-black text-[#00274d] mb-3">Clear visibility to hit 1200 Cr+ ARR in 18 months</h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-5">
                  Active 106 clients represent 1200 Cr+ annual revenue opportunity. Advance pipeline of 150 new clients represents 6000 Cr+ annual revenue opportunity.
                </p>
                <p className="rounded-xl bg-[#00274d]/5 p-4 text-sm font-semibold text-[#00274d]">
                  Client base expanded from 18 in FY24 to 106 in FY26, reflecting substantial market traction and adoption.
                </p>
              </aside>
            </div>
          </div>
        </section>

      <section className="py-16 md:py-20">
  <div className="container mx-auto px-4 max-w-7xl">
    <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-10 items-start">

      {/* Left heading */}
      <div>
        <SectionEyebrow>Competitive Advantage</SectionEyebrow>
        <h2 className="text-3xl md:text-4xl font-bold text-[#00274d] leading-tight mb-5">
          A unified platform with multiple competitive moats.
        </h2>
      </div>

      {/* Right table — no overflow-x-auto, fits naturally */}
      <div className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
        <table className="w-full text-[11px] sm:text-xs table-fixed">

          <thead className="bg-[#00274d] text-white">
            <tr>
              {[
                { label: "Company",           width: "w-[13%]" },
                { label: "Founded",           width: "w-[9%]"  },
                { label: "Funding",           width: "w-[10%]" },
                { label: "Unicorn Status",    width: "w-[10%]" },
                { label: "Unicorn Year",      width: "w-[10%]" },
                { label: "Valuation",         width: "w-[14%]" },
                { label: "Revenue (FY24-25)", width: "w-[14%]" },
                { label: "Business Type",     width: "w-[20%]" },
              ].map(({ label, width }) => (
                <th
                  key={label}
                  className={`${width} px-2 py-3 text-left font-bold leading-snug`}
                >
                  {label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {competitors.map((row) => {
              const isVendorInfra = row.company === "Vendor Infra";
              return (
                <tr
                  key={row.company}
                  className={`border-t border-gray-100 ${
                    isVendorInfra ? "bg-[#edad1a]/10" : ""
                  }`}
                >
                  {[
                    row.company,
                    row.foundedYear,
                    row.totalFundingRaised,
                    row.unicornStatus,
                    row.unicornYear,
                    row.currentValuation,
                    row.revenueFY2425,
                    row.businessType,
                  ].map((cell, index) => (
                    <td
                      key={index}
                      className={`px-2 py-3 align-top leading-snug ${
                        isVendorInfra
                          ? "font-bold text-[#00274d]"
                          : index === 7
                          ? "text-blue-600"
                          : index === 4 && row.unicornYear !== "NY"
                          ? "text-blue-600"
                          : "text-gray-600"
                      }`}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>

        </table>
      </div>

    </div>
  </div>
</section>
{/* 
        <section className="py-16 md:py-20 bg-[#f6f8fb]">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <SectionEyebrow>Growth timeline</SectionEyebrow>
              <h2 className="text-3xl md:text-4xl font-bold text-[#00274d] leading-tight">
                From formation to AI-native infrastructure ecosystem.
              </h2>
            </div>

            <div className="space-y-12">
              {[timeline.slice(0, 6), timeline.slice(6)].map((row, rowIndex) => (
                <div key={rowIndex} className="relative">
                  <div className="absolute left-0 right-0 top-5 hidden h-1 rounded-full bg-gradient-to-r from-[#edad1a] via-[#00274d] to-[#edad1a] opacity-35 md:block" />
                  <div
                    className={`grid gap-4 ${
                      row.length === 6
                        ? "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6"
                        : "sm:grid-cols-2 lg:grid-cols-5"
                    }`}
                  >
                    {row.map(([date, label], itemIndex) => {
                      const index = rowIndex === 0 ? itemIndex : itemIndex + 6;
                      return (
                        <motion.div
                          key={date + label}
                          initial={{ opacity: 0, y: 16 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.025 }}
                          className="relative"
                        >
                          <div className="relative z-10 mx-auto mb-5 flex h-11 w-11 items-center justify-center rounded-full border-4 border-[#f6f8fb] bg-[#00274d] text-xs font-black text-[#edad1a] shadow-lg shadow-[#00274d]/15">
                            {String(index + 1).padStart(2, "0")}
                          </div>
                          <div className="h-full min-h-[150px] rounded-2xl border border-gray-100 bg-white p-4 text-center shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-[#00274d]/8">
                            <p className="text-[#edad1a] text-sm font-black mb-2">{date}</p>
                            <p className="text-[#00274d] text-sm font-bold leading-snug">{label}</p>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section> */}
<section className="py-16 md:py-20 bg-[#f6f8fb]">
  <div className="container mx-auto px-4 max-w-7xl">
   <div className="text-center max-w-5xl mx-auto mb-12 px-4">
  <SectionEyebrow>Growth timeline</SectionEyebrow>
  <h2 className="text-3xl md:text-5xl font-bold text-[#00274d] leading-tight">
    Building the future of the infrastructure, construction, and manufacturing industries—one milestone at a time.
  </h2>
</div>

    <div className="space-y-10">
      {[timeline.slice(0, 6), timeline.slice(6)].map((row, rowIndex) => (
        <div key={rowIndex} className="relative">
          {/* Connector line — sits behind the numbered dots */}
          <div className="absolute left-[3.5%] right-[3.5%] top-[22px] hidden h-[2px] bg-gradient-to-r from-[#edad1a] via-[#00274d] to-[#edad1a] opacity-35 md:block rounded-full" />

          <div
            className={`grid gap-3 ${
              row.length === 6
                ? "grid-cols-2 sm:grid-cols-3 xl:grid-cols-6"
                : "grid-cols-2 sm:grid-cols-3 xl:grid-cols-5"
            }`}
          >
            {row.map(([date, label], itemIndex) => {
              const index = rowIndex === 0 ? itemIndex : itemIndex + 6;
              return (
                <motion.div
                  key={date + label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.025 }}
                  className="flex flex-col items-center"
                >
                  {/* Numbered circle */}
                  <div className="relative z-10 mb-2.5 flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full border-[3px] border-[#f6f8fb] bg-[#00274d] text-xs font-black text-[#edad1a] ring-2 ring-[#00274d]/20">
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  {/* Card */}
                  <div className="w-full flex-1 min-h-[110px] rounded-2xl border border-gray-100 bg-white p-3 text-center shadow-sm transition-all duration-150 hover:-translate-y-1 hover:shadow-md hover:shadow-[#00274d]/10">
                    <p className="mb-1.5 text-xs font-black text-[#edad1a]">{date}</p>
                    <p className="text-xs font-bold leading-snug text-[#00274d]">{label}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  </div>
</section>


        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-10 items-start">
              <div>
                <SectionEyebrow>Fund requirement</SectionEyebrow>
                <h2 className="text-3xl md:text-4xl font-bold text-[#00274d] leading-tight mb-5">
                 Fueling the next phase of growth and innovation.
                </h2>
                {/* <p className="text-gray-600 leading-relaxed mb-6">
                  The round is intended to unlock 3-4x growth, scale to $70M+ revenue, and combine market expansion, technology, and capital-efficient credit structures with strong unit economics.
                </p> */}
                <div className="rounded-2xl bg-[#00274d] p-6 text-white">
                  <p className="text-[#edad1a] text-4xl font-black mb-2">$12M</p>
                  <p className="text-white/75">1$ equity is expected to create 3-5$ GMV impact through blended revenue, technology and working-capital leverage.</p>
                </div>
              </div>
              <div className="space-y-3">
                {fundUse.map((item) => (
                  <div key={item.label} className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
                    <div className="flex items-center justify-between gap-4 mb-3">
                      <p className="font-bold text-[#00274d]">{item.label}</p>
                      <p className="font-black text-[#edad1a]">{item.value}</p>
                    </div>
                    <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                      <div className="h-full rounded-full bg-[#edad1a]" style={{ width: item.value }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="pb-16 md:pb-20">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="rounded-2xl bg-[#00274d] px-6 py-8 md:px-10 md:py-10 text-white">
              <div className="grid lg:grid-cols-[1fr_auto] gap-6 items-center">
                <div>
                  <p className="text-[#edad1a] text-sm font-bold uppercase tracking-[0.22em] mb-3">Investor relations</p>
                  <h2 className="text-2xl md:text-3xl font-bold mb-3">Interested in Vendor Infra's growth story?</h2>
                  <p className="text-white/72 max-w-3xl">
                    Connect with our team for investor discussions, deck access and strategic partnership conversations.
                  </p>
                </div>
                <a href="mailto:enquiry@vendorinfra.com" className={siteButtonClasses("primary", "px-6 py-3")}>
                  enquiry@vendorinfra.com <Mail className="w-4 h-4" />
                </a>
              </div>
              <p className="text-white/35 text-xs mt-6">
                Highly confidential and for private circulation only. Figures are based on the supplied investor deck.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
