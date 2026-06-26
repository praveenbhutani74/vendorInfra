import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Bot,
  Boxes,
  BrainCircuit,
  Building2,
  CheckCircle2,
  CircleDollarSign,
  ClipboardList,
  Factory,
  FilePenLine,
  FileSpreadsheet,
  Gavel,
  Globe2,
  Handshake,
  HardHat,
  Landmark,
  Layers3,
  Mail,
  Monitor,
  Network,
  Package,
  Search,
  ShieldCheck,
  Target,
  TrendingUp,
  Upload,
  Users,
  Workflow,
  Wrench,
  X,
} from "lucide-react";
import { Link } from "wouter";
import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { usePageSeo } from "@/lib/seo";
import { siteButtonClasses } from "@/components/SiteButton";

// ... (all your existing data arrays remain exactly the same)

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
const aiPlatformModules = [
  {
    title: "AI-Powered Vendor Discovery",
    status: "Completed",
    intro:
      "AI-powered vendor discovery engine with intelligent search based on capability, location, performance, type of work and more.",
    bullets: [
      "AI-powered vendor discovery engine with intelligent search based on capability, location, performance, type of work and more.",
      "Predicts vendor fit, improves sourcing speed, and reduces procurement effort.",
    ],
    icon: Search,
    accent: "bg-[#2E97D4]",
  },
  {
    title: "AI-Powered Plants & Equipment Search",
    status: "Completed",
    intro:
      "AI-driven plant & equipment intelligent search based on location, machine type, category and more.",
    bullets: [
      "AI-driven plant & equipment intelligent search based on location, machine type, category and more.",
      "Enhances equipment sourcing efficiency, reduces idling and improves asset utilization.",
    ],
    icon: Wrench,
    accent: "bg-[#F4B400]",
  },
  {
    title: "AI-Powered Sector Intelligence",
    status: "Completed",
    intro:
      "AI-based sector intelligence platform delivering market trends, demand insights, and industry analytics.",
    bullets: [
      "AI-based sector intelligence platform delivering market trends, demand insights, and industry analytics.",
      "Enables smarter decisions through real-time data and predictive insights.",
    ],
    icon: BarChart3,
    accent: "bg-[#00B8A9]",
  },
  {
    title: "AI-Assisted Plants & Equipment Upload",
    status: "Under Development",
    intro:
      "Implementing image recognition and object detection AI for equipment uploads.",
    bullets: [
      "Implementing an image recognition and object detection AI model (e.g., using a vendor-uploaded photo of equipment).",
      "Integrating the AI output to automatically fill out relevant fields to simplify the upload process.",
    ],
    icon: Upload,
    accent: "bg-[#9BC75B]",
  },
  {
    title: "Plants & Equipment Spare Parts Marketplace",
    status: "Under Development",
    intro:
      "AI-powered marketplace for spare parts and servicing with smart onboarding and inventory.",
    bullets: [
      "AI-powered marketplace for spare parts & servicing with smart onboarding & inventory.",
      "Predicts demand, recommends parts, and reduces downtime.",
    ],
    icon: Package,
    accent: "bg-[#A9A9A9]",
  },
];

const aiVisionModules = [
  {
    title: "Vendor Verification using AI Agents",
    description:
      "Designing, training, and deploying AI agents to automate the human verification process. Development of a verification workflow tool and flagging system for manual review.",
    icon: BadgeCheck,
    accent: "bg-[#2E97D4]",
  },
  {
    title: "Tender to BOQ Conversion",
    description:
      "Development and training of a specialized NLP/ML model. Automatically convert structured and unstructured tender documents into a standardized BOQ format.",
    icon: FileSpreadsheet,
    accent: "bg-[#F4B400]",
  },
  {
    title: "Tender Intelligence & Profiling",
    description:
      "Matching the tender's requirements with specific contractor profiles with AI and ML. Developing a logic engine to identify and flag potential issues or missing information in the tender submission.",
    icon: BrainCircuit,
    accent: "bg-[#2E97D4]",
  },
  {
    title: "Fill Tender Module",
    description:
      "Development module capable of drafting and completing tender forms on behalf of the contractor with AI, including a critique function to suggest improvements and competitive bid adjustments.",
    icon: FilePenLine,
    accent: "bg-[#F4B400]",
  },
  {
    title: "Machine Maintenance Module",
    description:
      "Dedicated feature set for scheduling, tracking, and managing equipment maintenance services between vendors and contractors.",
    icon: Wrench,
    accent: "bg-[#2E97D4]",
  },
  {
    title: "Auction Feature Development",
    description:
      "Development of a dynamic auction module where contractors can upload a BOQ and multiple vendors can submit competitive bids; includes bidding logic and notification systems.",
    icon: Gavel,
    accent: "bg-[#2E97D4]",
  },
  {
    title: "AI-Powered Insurance Engine",
    description:
      "AI-powered insurance engine that simplifies risk assessment, recommends the right coverage, and automates claims, pricing, and policy management for faster, smarter insurance operations.",
    icon: ShieldCheck,
    accent: "bg-[#F4B400]",
  },
  {
    title: "New EPC Acquisition",
    description:
      "Agentic AI identifies newly published tenders and automatically reaches out to eligible EPC companies with a personalised tender summary and eligibility report.",
    icon: Building2,
    accent: "bg-[#2E97D4]",
  },
  {
    title: "Pre-Bid Engagement",
    description:
      "For live tenders, the agent proactively contacts eligible, unregistered EPC companies with a preview analysis and eligibility score—converting cold leads into active platform users before the bid deadline.",
    icon: ClipboardList,
    accent: "bg-[#F4B400]",
  },
  {
    title: "Post-Award Conversion",
    description:
      "When an EPC company wins a bid, a vendor landscape summary of eligible suppliers is shared without contact details, creating a strong pull to subscribe and unlock full access.",
    icon: Monitor,
    accent: "bg-[#2E97D4]",
  },
];

const marketOpportunities = [
  {
    title: "Infrastructure Pipeline",
    subtitle: "NIP Coverage across Projects, States",
    icon: HardHat,
    accent: "bg-[#d32f2f]",
    metrics: [
      { label: "NIP", value: "12.2+ Lac Cr" },
      { label: "Target (Pipeline)", value: "13.15 lakh Cr (2025–28)" },
      { label: "Projects", value: "13000+ projects" },
      { label: "Sectors", value: "30+ sectors" },
      { label: "States & UTs", value: "36 states & UTs" },
      { label: "Key Sectors", value: "Roads, Railways, Water etc." },
    ],
    highlight: {
      label: "",
      value: "",
    },
  },
  {
    title: "Contract Manufacturing",
    subtitle: "Contract manufacturing across industries",
    icon: Factory,
    accent: "bg-[#edad1a]",
    metrics: [
      { label: "2024", value: "2,20,000 Cr" },
      { label: "2026", value: "2,95,000 Cr" },
      { label: "2030 (P)", value: "4,90,000+ Cr" },
    ],
    highlight: {
      label: "Growth",
      value: "~15%",
    },
  },
  {
    title: "Construction Equipment",
    subtitle: "Indian Construction Equipment Market",
    icon: Building2,
    accent: "bg-[#edad1a]",
    metrics: [
      { label: "2024", value: "71,925 Cr" },
      { label: "2026", value: "84,014 Cr" },
      { label: "2030 (P)", value: "1,58,223 Cr" },
    ],
    highlight: {
      label: "CAGR",
      value: "8%",
    },
  },
  {
    title: "Insurance",
    subtitle: "25 general insurance companies Premium",
    icon: ShieldCheck,
    accent: "bg-[#edad1a]",
    metrics: [
      { label: "2024", value: "93,000 Cr" },
      { label: "2026", value: "1,40,000 Cr" },
      { label: "2030 (P)", value: "2,80,000 Cr" },
    ],
    highlight: {
      label: "Growth",
      value: "30.77%",
    },
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
    icon: "🔄",
    text: "New-age companies operate 80% within manufacturer-distributor-trader networks and only 20% with end clients. Vendor Infra operates differently. We buy 100% from manufacturers, distributors and stockists and sell 100% directly to end clients, eliminating multi-layer trading complexity.",
  },
  {
    title: "Debtor Days",
    icon: "📅",
    text: "Buying-selling structure directly impacts debtor days. New-age companies have lower debtor days (~12 days) due to inter-trader transactions. Vendor Infra operates on industry demand debtor days (~45 days), aligned with real project cycles and end-client payment structures.",
  },
  {
    title: "Gross Margins",
    icon: "📈",
    text: "Debtors structure drives margin performance. New-age companies recorded 1.2% (FY24) and 1.7% (FY25) gross margins, while Vendor Infra achieved 3.5% (FY24) and 5.3% (FY25), creating an approximately 3% structural margin advantage.",
  },
  {
    title: "Strong Founder-Market Fit",
    icon: "🤝",
    text: "Our leadership team brings deep domain expertise and strong industry relationships. Their experience has accelerated our growth and strengthened market penetration. This strategic advantage enables faster execution and sustained competitive positioning.",
  },
  {
    title: "Proven Unit Economics",
    icon: "✅",
    text: "Most businesses chase growth through equity and operate on limited runway. We have achieved positive unit economics using debt, proving the business is a need of the industry.",
  },
  {
    title: "Deep Infrastructure Focus",
    icon: "🏗️",
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
  "Achieved ₹470+ Cr in consolidated revenue, demonstrating strong financial performance and consistent growth momentum.",
  "Successfully delivered 220+ projects across 20+ sectors, showcasing diverse execution capabilities.",
  "Established a strong footprint with operations across 25+ states in India.",
  "Supplied 340+ types of materials, covering a wide spectrum of project requirements.",
  "Trusted by 106 clients, building long-term partnerships across the infrastructure, Construction and manufacturing ecosystem.",
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

// ── NEW: Investor Inquiry Modal ──────────────────────────────
function InvestorModal({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    company: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: wire up your actual submission logic here
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 16 }}
        className="relative z-10 w-full max-w-lg rounded-2xl bg-white shadow-2xl overflow-hidden"
      >
        {/* Top accent bar */}
        <div className="h-1.5 bg-[#edad1a]" />

        <div className="p-7 md:p-8">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[#edad1a] mb-1">
                Investor Relations
              </p>
              <h2 className="text-2xl font-black text-[#00274d] leading-tight">
                Request an Investor Meeting
              </h2>
            </div>
            <button
              onClick={onClose}
              className="ml-4 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {submitted ? (
            <div className="flex flex-col items-center py-10 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#edad1a]/15 mb-4">
                <CheckCircle2 className="h-8 w-8 text-[#edad1a]" />
              </div>
              <h3 className="text-xl font-black text-[#00274d] mb-2">Inquiry Submitted!</h3>
              <p className="text-gray-500 text-sm max-w-xs leading-relaxed">
                Thank you for your interest. Our investor relations team will reach out to you shortly.
              </p>
              <button
                onClick={onClose}
                className="mt-6 rounded-xl bg-[#00274d] px-6 py-2.5 text-sm font-bold text-white hover:bg-[#003a70] transition-colors"
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-black uppercase tracking-[0.15em] text-[#00274d] mb-1.5">
                  Full Name <span className="text-[#edad1a]">*</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  required
                  value={form.fullName}
                  onChange={handleChange}
                  placeholder="John Smith"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-[#00274d] placeholder-gray-400 outline-none focus:border-[#00274d] focus:bg-white focus:ring-2 focus:ring-[#00274d]/10 transition-all"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-black uppercase tracking-[0.15em] text-[#00274d] mb-1.5">
                  Email Address <span className="text-[#edad1a]">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-[#00274d] placeholder-gray-400 outline-none focus:border-[#00274d] focus:bg-white focus:ring-2 focus:ring-[#00274d]/10 transition-all"
                />
              </div>

              {/* Company */}
              <div>
                <label className="block text-xs font-black uppercase tracking-[0.15em] text-[#00274d] mb-1.5">
                  Company / Organization <span className="text-[#edad1a]">*</span>
                </label>
                <input
                  type="text"
                  name="company"
                  required
                  value={form.company}
                  onChange={handleChange}
                  placeholder="Acme Capital"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-[#00274d] placeholder-gray-400 outline-none focus:border-[#00274d] focus:bg-white focus:ring-2 focus:ring-[#00274d]/10 transition-all"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-black uppercase tracking-[0.15em] text-[#00274d] mb-1.5">
                  Investment Interest / Message
                </label>
                <textarea
                  name="message"
                  rows={4}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell us about your investment interest or any questions you have..."
                  className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-[#00274d] placeholder-gray-400 outline-none focus:border-[#00274d] focus:bg-white focus:ring-2 focus:ring-[#00274d]/10 transition-all"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full rounded-xl bg-[#edad1a] px-6 py-3.5 text-sm font-black text-[#00274d] hover:bg-[#f0b800] active:scale-[0.98] transition-all shadow-lg shadow-[#edad1a]/30 flex items-center justify-center gap-2"
              >
                Submit Inquiry
                <Mail className="h-4 w-4" />
              </button>

              <p className="text-center text-[11px] text-gray-400">
                Highly confidential · For private circulation only
              </p>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
}

export default function Investor() {
  usePageSeo(
    "Investor Relations | Vendor Infra",
    "Vendor Infra investor-relations overview: AI-powered operating system for infrastructure, construction and manufacturing with strong traction, market opportunity and growth roadmap."
  );

  // ── NEW: modal state ──
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      {/* ── NEW: render modal ── */}
      {showModal && <InvestorModal onClose={() => setShowModal(false)} />}

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

                {/* Stats grid */}
                <div className="max-w-2xl mb-8">
                  <div className="grid grid-cols-3 gap-3 mb-3">
                    {heroStats.slice(0, 3).map((stat) => (
                      <div key={stat.label} className="border-l-2 border-[#edad1a] bg-white/7 px-4 py-3">
                        <p className="text-xl md:text-2xl font-black text-white">{stat.value}</p>
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    {heroStats.slice(3, 5).map((stat) => (
                      <div key={stat.label} className="border-l-2 border-[#edad1a] bg-white/7 px-4 py-3">
                        <p className="text-xl md:text-2xl font-black text-white">{stat.value}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ── CHANGED: button now opens modal instead of mailto ── */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => setShowModal(true)}
                    className={siteButtonClasses("primary", "px-6 py-3")}
                  >
                    Request an Investor Meeting <Mail className="w-4 h-4" />
                  </button>
                </div>
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

  

       <section className="pb-16 md:pb-20 mt-20">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="rounded-2xl bg-[#00274d] px-6 py-8 md:px-10 md:py-10 text-white">
              <div className="grid lg:grid-cols-[1fr_auto] gap-6 items-center">
                <div>
                  <p className="text-[#edad1a] text-sm font-bold uppercase tracking-[0.22em] mb-3">Investor relations</p>
                  <h2 className="text-2xl md:text-3xl font-bold mb-3">Interested in Vendor Infra's growth story?</h2>
                  <p className="text-white/72 max-w-3xl">
                    Connect with our team for investor-relations discussions, deck access and strategic partnership conversations.
                  </p>
                </div>
                <button
  onClick={() => setShowModal(true)}
  className={siteButtonClasses("primary", "px-6 py-3")}
>
  Request an Investor Meeting <Mail className="w-4 h-4" />
</button> 
              </div>
              <p className="text-white/35 text-xs mt-6">
                Highly confidential and for private circulation only.
              </p>
            </div>
          </div>
        </section>


        {/* ── ALL REMAINING SECTIONS ARE IDENTICAL TO YOUR ORIGINAL ── */}
        {/* ... paste the rest of your sections here unchanged ... */}

      </main>
      <Footer />
    </div>
  );
}