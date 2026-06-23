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
  { value: "260+ Cr", label: "ARR" },
  { value: "75%", label: "YoY growth" },
  { value: "106", label: "enterprise clients" },
  { value: "Profitable", label: "unit economics" },
];

const problems = [
  {
    title: "Fragmented industry",
    text: "The infrastructure, construction and manufacturing industry remains heavily dependent on offline references, limiting efficiency and scale.",
  },
  {
    title: "Low contractor visibility",
    text: "Contractors lack market visibility beyond existing networks, restricting growth and access to high-value opportunities.",
  },
  {
    title: "Limited hand-holding",
    text: "Large project contractors lack structured support and unified digital tools for growth, execution and opportunity access.",
  },
  {
    title: "Disconnected stakeholders",
    text: "Stakeholders operate in silos, creating inefficiencies, missed opportunities and slower decision-making.",
  },
];

const solutions = [
  {
    title: "Unified AI-based ecosystem",
    text: "A single operating system connecting discovery, supply chain, plants and equipment, insurance and manufacturing workflows.",
    icon: Network,
  },
  {
    title: "Integrated value-chain collaboration",
    text: "Seamless coordination across planning, design, execution, quality assurance, delivery and operations.",
    icon: Workflow,
  },
  {
    title: "Smart visibility and discovery",
    text: "Verified profiles and smart matching surface the right vendors, contractors and partners at the right time.",
    icon: Target,
  },
  {
    title: "Scalable ecosystem monetisation",
    text: "Multiple AI-led solutions across the value chain unlock recurring usage, wallet expansion and transaction scale.",
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
    creates: "Creates network effect",
    items: ["Contractors", "Suppliers", "Consultants", "OEMs", "Equipment owners"],
    icon: Users,
  },
  {
    layer: "Layer 2",
    title: "Intelligence",
    subtitle: "Data advantage",
    creates: "Creates data moat",
    items: ["Vendor reliability score", "Price intelligence", "Credit behaviour", "Demand forecasting", "Sector trends"],
    icon: Bot,
  },
  {
    layer: "Layer 3",
    title: "Transactions",
    subtitle: "Monetisation",
    creates: "Creates revenue scale",
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
    intro: "Seamless design, sourcing, manufacturing, quality check and delivery.",
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
    intro: "AI-powered discovery and collaboration with ecosystem stakeholders.",
    bullets: [
      "AI-powered vendor discovery",
      "Smart price discovery",
      "AI-based sector intelligence",
      "SOR and industry updates",
      "AI-powered plants and equipment intelligence",
    ],
    icon: Building2,
    accent: "bg-[#edad1a]",
  },
  {
    title: "Plants and Equipment Marketplace",
    revenue: "Revenue Stream 4",
    intro: "AI-powered platform to reduce idling and maximize utilization.",
    bullets: [
      "Intelligent listing",
      "Smart buying decisions",
      "Efficient hiring",
      "Faster selling",
      "Smart spare parts sourcing",
      "Predictive recommendations",
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
      "Integrated risk coverage",
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
      "Build an AI-native manufacturing ecosystem",
      "Predictive sourcing and smart capacity allocation",
      "Automated production planning",
      "Digital-first manufacturing execution with real-time visibility",
      "Predictive intelligence and proactive execution control",
    ],
  },
  {
    title: "SaaS Platform",
    icon: Building2,
    accent: "bg-[#00274d]",
    points: [
      "Tender intelligence and profiling",
      "Tender-to-BOQ conversion with AI-based tender filling",
      "AI bidding engine",
      "AI growth engine and AI agent for vendor updation and verification",
      "ML-based vendor matching using inputs and past project data",
    ],
  },
  {
    title: "Plants & Equipment Marketplace",
    icon: Landmark,
    accent: "bg-[#edad1a]",
    points: [
      "Project-equipment matching",
      "Equipment recommendations",
      "Predictive maintenance",
      "Utilization optimization and dynamic pricing",
      "Risk and failure prediction",
      "Spare parts marketplace with AI visual recognition",
    ],
  },
  {
    title: "Insurance",
    icon: ShieldCheck,
    accent: "bg-[#edad1a]",
    points: [
      "Acquire universal brokerage license",
      "Partner with non-life insurance companies",
      "Offer multi-quote comparisons",
      "Construction industry specific policies",
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
    title: "Strong founder-market fit",
    text: "Leadership brings deep domain expertise and strong industry relationships, accelerating growth and strengthening market penetration.",
  },
  {
    title: "Proven unit economics",
    text: "Positive unit economics have been achieved using debt, proving the business is a need of the industry.",
  },
  {
    title: "Deep infrastructure focus",
    text: "Infrastructure-specific services across supply chain, insurance, plants and equipment, and SaaS solve problems multi-industry platforms miss.",
  },
  {
    title: "Direct client model",
    text: "Vendor Infra buys 100% from manufacturers, distributors and stockists, and sells 100% directly to end clients.",
  },
  {
    title: "Industry-aligned debtor days",
    text: "Vendor Infra operates around 45 debtor days, aligned with real project cycles and end-client payment structures.",
  },
  {
    title: "Structural margin advantage",
    text: "Vendor Infra delivered 3.5% and 5.3% gross margin in FY24 and FY25, with an average gap of about 3% against new-age companies.",
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
  ["Oct 2019", "Testing"],
  ["Apr 2021", "Company formation"],
  ["Aug 2021", "Angel round funding"],
  ["Dec 2021", "Live material procurement"],
  ["Apr 2022", "Plants and equipment listing"],
  ["Jul 2025", "SaaS platform free"],
  ["May 2026", "Contract manufacturing"],
  ["Dec 2026", "AI-powered insurance service and tender intelligence"],
  ["Apr 2027", "Paid SaaS, AI vendor discovery, AI plants and equipment, AI sector intelligence"],
  ["Dec 2027", "AI bidding engine, AI growth engine, AI agents"],
  ["Jun 2028", "Cross border supply chain and backend integration"],
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
  ["Vendor Infra", "2021", "~$265K", "No", "B2B unified ecosystem"],
  ["OFBusiness", "2015", "~$890M+", "Yes", "Construction materials platform + financing"],
  ["Zetwerk", "2018", "~$860M+", "Yes", "B2B manufacturing marketplace"],
  ["Moglix", "2015", "~$470M+", "Yes", "B2B/B2C industrial commerce"],
  ["Infra.Market", "2016", "~$763M+", "Yes", "Construction materials platform"],
];

function SectionEyebrow({ children }: { children: string }) {
  return (
    <span className="inline-flex items-center gap-3 text-[#edad1a] text-[12px] font-bold uppercase tracking-[0.3em] mb-4">
      <span className="w-8 h-px bg-[#edad1a]/60" />
      {children}
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
            <div className="grid lg:grid-cols-[0.95fr_1.05fr] gap-10 lg:gap-16 items-center">
              <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}>
                <span className="inline-flex items-center gap-2 rounded-full border border-[#edad1a]/45 bg-[#edad1a]/10 px-4 py-2 text-sm font-bold text-[#edad1a] mb-6">
                  Investor
                </span>
                <h1 className="text-4xl md:text-6xl font-black leading-[0.98] tracking-tight mb-6">
                  Digitising India's infrastructure execution economy.
                </h1>
                {/* <p className="text-white/76 text-base md:text-lg leading-relaxed max-w-2xl mb-8">
                  Vendor Infra is an AI-powered operating system for infrastructure, construction and manufacturing, connecting supply chain, SaaS, plants and equipment, insurance and contract manufacturing into one execution layer.
                </p> */}

                <div className="grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4 mb-8">
                  {heroStats.map((stat) => (
                    <div key={stat.label} className="border-l-2 border-[#edad1a] bg-white/7 px-4 py-3">
                      <p className="text-xl md:text-2xl font-black text-white">{stat.value}</p>
                      <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white/55">{stat.label}</p>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <a href="mailto:enquiry@vendorinfra.com" className={siteButtonClasses("primary", "px-6 py-3")}>
                    Contact Investor Relations <Mail className="w-4 h-4" />
                  </a>
                  <Link href="/contact" className={siteButtonClasses("navy", "border border-white/15 px-6 py-3")}>
                    Connect with team <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="relative"
              >
                <div className="rounded-[28px] border border-white/12 bg-white/6 p-5 md:p-6 backdrop-blur shadow-2xl shadow-black/20">
                <div className="rounded-2xl bg-[#edad1a] p-5 text-[#00274d] shadow-xl shadow-black/20">
                  <p className="text-xs font-black uppercase tracking-[0.24em]">Core opportunity</p>
                  <p className="mt-2 text-4xl font-black leading-none">12+ Lac Cr</p>
                  <p className="mt-2 text-sm font-bold">Infrastructure economy moving toward digital execution</p>
                </div>

                <div className="mt-5 space-y-4">
                  {[
                    ["Network", "Contractors, suppliers, OEMs, consultants", "Creates repeat usage"],
                    ["Intelligence", "Reliability, pricing, credit and sector data", "Builds data moat"],
                    ["Transactions", "Supply, financing, equipment and insurance", "Scales revenue"],
                  ].map(([title, text, outcome], index) => (
                    <div key={title} className="rounded-2xl border border-white/12 bg-[#00274d] p-4 text-white shadow-lg shadow-black/10">
                      <div className="flex items-start gap-4">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-[#00274d] font-black">
                          {index + 1}
                        </span>
                        <div>
                          <h3 className="text-lg font-black">{title}</h3>
                          <p className="mt-1 text-sm leading-relaxed text-white/65">{text}</p>
                          <p className="mt-2 text-xs font-black uppercase tracking-[0.18em] text-[#edad1a]">{outcome}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                  {["Industry veteran angel backed", "Profitable", "106 enterprise clients"].map((item) => (
                    <div key={item} className="rounded-xl border border-white/10 bg-white p-3 text-center text-xs font-black leading-snug text-[#00274d]">
                      {item}
                    </div>
                  ))}
                </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-[#00274d] py-16 md:py-24 text-white">
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage: "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)",
              backgroundSize: "44px 44px",
            }}
          />
          <div className="container relative mx-auto px-4 max-w-7xl">
            <div className="mx-auto mb-14 max-w-4xl text-center">
              <SectionEyebrow>Problem</SectionEyebrow>
              <h2 className="text-3xl md:text-5xl font-black leading-tight text-white">
                A massive industry still trapped in offline execution loops.
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-white/70">
                Four structural gaps keep infrastructure execution slow, opaque and relationship-dependent.
              </p>
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
                      className="rounded-2xl border border-white/10 bg-white p-6 text-[#00274d] shadow-xl shadow-black/10"
                    >
                      <div className="flex items-start gap-5">
                        <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#edad1a]/15 text-[#edad1a]">
                          <Icon className="h-7 w-7" />
                        </span>
                        <div>
                          <p className="mb-2 text-xs font-black uppercase tracking-[0.22em] text-[#edad1a]">Problem {index + 1}</p>
                          <h3 className="text-xl font-black leading-tight">{item.title}</h3>
                          <p className="mt-3 text-sm leading-relaxed text-gray-600">{item.text}</p>
                        </div>
                      </div>
                    </motion.article>
                  );
                })}
              </div>

              <div className="relative mx-auto flex h-56 w-56 items-center justify-center rounded-full border border-[#edad1a]/30 bg-white/8 p-5 shadow-2xl shadow-black/20 lg:h-72 lg:w-72">
                <div className="absolute inset-6 rounded-full border border-dashed border-[#edad1a]/40" />
                <div className="absolute h-full w-px bg-[#edad1a]/30" />
                <div className="absolute h-px w-full bg-[#edad1a]/30" />
                <div className="relative z-10 rounded-2xl bg-[#edad1a] px-5 py-4 text-center text-[#00274d]">
                  <p className="text-xs font-black uppercase tracking-[0.22em]">Offline</p>
                  <p className="mt-1 text-2xl font-black">Friction</p>
                </div>
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
                      className="rounded-2xl border border-white/10 bg-white p-6 text-[#00274d] shadow-xl shadow-black/10"
                    >
                      <div className="flex items-start gap-5">
                        <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#edad1a]/15 text-[#edad1a]">
                          <Icon className="h-7 w-7" />
                        </span>
                        <div>
                          <p className="mb-2 text-xs font-black uppercase tracking-[0.22em] text-[#edad1a]">Problem {index + 3}</p>
                          <h3 className="text-xl font-black leading-tight">{item.title}</h3>
                          <p className="mt-3 text-sm leading-relaxed text-gray-600">{item.text}</p>
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
          <div className="absolute left-0 top-12 h-32 w-32 rounded-full border-[10px] border-r-0 border-b-0 border-[#edad1a]" />
          <div className="absolute bottom-10 right-0 h-32 w-32 rounded-full border-[10px] border-l-0 border-t-0 border-[#00274d]" />
          <div className="container relative mx-auto px-4 max-w-7xl">
            <div className="mb-12 text-center">
              <SectionEyebrow>Our thesis</SectionEyebrow>
              <h2 className="text-3xl md:text-4xl font-black text-[#00274d] leading-tight">
                Infrastructure execution is becoming data-driven, scalable and AI-native.
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
            <div className="text-center max-w-3xl mx-auto mb-12">
              <SectionEyebrow>Solutions</SectionEyebrow>
              <h2 className="text-3xl md:text-4xl font-bold text-[#00274d] leading-tight">
                One connected platform across the infrastructure value chain.
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

        <section className="py-16 md:py-20 bg-[#f6f8fb]">
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
        </section>

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
                SaaS, supply chain or ecosystem? Vendor Infra compounds as all three.
              </h2>
              <p className="mx-auto max-w-3xl text-white/72 leading-relaxed">
                Each layer reinforces the next: network creates usage, usage creates intelligence, and intelligence converts into higher-quality transactions at scale.
              </p>
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
                          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#edad1a]">Outcome</p>
                          <p className="mt-1 font-black text-[#00274d]">{item.creates}</p>
                        </div>
                      </div>
                    </motion.article>
                  );
                })}
              </div>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
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
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20 bg-white">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="mx-auto mb-12 max-w-4xl text-center">
              <SectionEyebrow>Offerings</SectionEyebrow>
              <h2 className="text-3xl md:text-5xl font-black text-[#00274d] leading-tight">
                Five revenue engines, one operating system.
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-gray-600">
                Each offering is designed to open a different wallet, while feeding the same ecosystem intelligence layer.
              </p>
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
                      <p className="rounded-xl bg-[#edad1a]/12 px-4 py-3 text-center text-sm font-black text-[#00274d]">
                        {item.revenue}
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
                The roadmap is a set of compounding build tracks.
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-white/70">
                Every product line moves from workflow capture to intelligence, automation and transaction depth.
              </p>
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

        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-10 items-start">
              <div>
                <SectionEyebrow>AI platform modules</SectionEyebrow>
                <h2 className="text-3xl md:text-4xl font-bold text-[#00274d] leading-tight mb-5">
                  AI roadmap from completed modules to agentic execution.
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  Vendor Infra is building high-growth SaaS modules across tender intelligence, tender-to-BOQ conversion, AI bidding, AI growth engine, vendor updation and verification, spare parts and insurance intelligence.
                </p>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                {aiModules.map((module) => (
                  <div key={module.name} className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
                    <p className="text-sm font-bold text-[#00274d] leading-snug">{module.name}</p>
                    <span className={`mt-3 inline-flex rounded-full px-3 py-1 text-xs font-bold ${
                      module.status === "Completed"
                        ? "bg-[#edad1a]/12 text-[#00274d]"
                        : module.status === "Under development"
                          ? "bg-[#edad1a]/12 text-[#00274d]"
                          : "bg-[#00274d]/7 text-[#00274d]"
                    }`}>
                      {module.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20 bg-[#f6f8fb]">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <SectionEyebrow>Right to win</SectionEyebrow>
              <h2 className="text-3xl md:text-4xl font-bold text-[#00274d] leading-tight">
                Structural advantages built for this industry.
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

        <section className="py-16 md:py-20 bg-white">
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

            <div className="space-y-8">
              {supplyChainFlow.map((flow) => (
                <motion.div
                  key={flow.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="rounded-2xl border border-gray-100 bg-[#f8fafc] p-5 md:p-6"
                >
                  <div className={`mb-5 inline-flex rounded-full px-5 py-2 text-sm font-black text-white ${flow.badge}`}>
                    {flow.label}
                  </div>
                  <div className="grid gap-5 lg:grid-cols-[1fr_260px]">
                    {flow.lanes.map((lane) => (
                      <div key={lane.title} className={`rounded-2xl border-2 border-dashed ${flow.tone} bg-white p-5`}>
                        <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
                          <h3 className="text-lg font-black text-[#00274d]">{lane.title}</h3>
                          <span className="text-sm font-bold text-[#edad1a]">{lane.share}</span>
                        </div>
                        <div className="flex flex-wrap items-center gap-3">
                          {lane.nodes.map((node, index) => (
                            <div key={node} className="flex items-center gap-3">
                              <span className="rounded-xl border-2 border-[#00274d] bg-white px-4 py-2 text-sm font-bold text-[#00274d]">
                                {node}
                              </span>
                              {index < lane.nodes.length - 1 && <ArrowRight className="h-4 w-4 text-[#edad1a]" />}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-10 items-start">
              <div>
                <SectionEyebrow>Market size</SectionEyebrow>
                <h2 className="text-3xl md:text-4xl font-bold text-[#00274d] leading-tight mb-5">
                  TAM expanding across infrastructure, insurance, equipment and manufacturing.
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  The opportunity sits across NIP-backed infrastructure activity, general insurance, construction equipment and contract manufacturing. Vendor Infra is positioned across all four pools.
                </p>
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
              <p className="mt-4 text-gray-600">
                Since inception till April 2026, revenue has scaled across supply chain and contract manufacturing pilots.
              </p>
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
              <div>
                <SectionEyebrow>Competitive landscape</SectionEyebrow>
                <h2 className="text-3xl md:text-4xl font-bold text-[#00274d] leading-tight mb-5">
                  Significant untapped market with a differentiated unified ecosystem.
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  Despite multiple players, only 5-7% of the overall market has been tapped so far, indicating significant untapped potential.
                </p>
              </div>
              <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
                <div className="overflow-hidden">
                  <table className="w-full table-fixed text-xs sm:text-sm">
                    <thead className="bg-[#00274d] text-white">
                      <tr>
                        {["Company", "Founded", "Funding", "Unicorn", "Business type"].map((head) => (
                          <th key={head} className="px-3 py-4 text-left font-bold first:w-[22%] last:w-[32%] sm:px-4">{head}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {competitors.map((row) => (
                        <tr key={row[0]} className="border-t border-gray-100">
                          {row.map((cell, index) => (
                            <td key={cell + index} className={`break-words px-3 py-4 align-top leading-snug sm:px-4 ${row[0] === "Vendor Infra" ? "font-bold text-[#00274d] bg-[#edad1a]/8" : "text-gray-600"}`}>
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20 bg-[#f6f8fb]">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <SectionEyebrow>Growth timeline</SectionEyebrow>
              <h2 className="text-3xl md:text-4xl font-bold text-[#00274d] leading-tight">
                From formation to AI-native infrastructure ecosystem.
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {timeline.map(([date, label]) => (
                <div key={date + label} className="rounded-2xl bg-white border border-gray-100 p-5">
                  <p className="text-[#edad1a] text-sm font-black mb-2">{date}</p>
                  <p className="text-[#00274d] font-semibold leading-snug">{label}</p>
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
                  Raising $12M to accelerate expansion and build a defensible technology platform.
                </h2>
                <p className="text-gray-600 leading-relaxed mb-6">
                  The round is intended to unlock 3-4x growth, scale to $70M+ revenue, and combine market expansion, technology, and capital-efficient credit structures with strong unit economics.
                </p>
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
