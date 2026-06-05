import { useEffect, useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import {
  Search, Zap, Building2, ShieldCheck, TrendingUp, Handshake,
  ArrowRight, Star, ChevronLeft, ChevronRight, CheckCircle2,
  Package, FileText, BarChart3, Play, ArrowUpRight, Sparkles, Users, Activity,
  Calculator, Tractor, Briefcase, Factory
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ContactSalesModal } from "@/components/ContactSalesModal";
import { CtaArrow } from "@/components/CtaArrow";
import { categories } from "@/lib/materialsData";
import { sectors as allSectors } from "@/lib/sectorsData";
import heroImage from "@/assets/hero-construction.png";

const PORTAL_REGISTER_URL = "https://portal.vendorinfra.com/register";

/* -- animated counter ------------------------------- */
function Counter({ target, suffix = "", prefix = "" }: { target: number; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = target / 60;
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);
  return <span ref={ref}>{prefix}{count.toLocaleString("en-IN")}{suffix}</span>;
}

/* -- fade-up wrapper -------------------------------- */
function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* -- stagger grid ----------------------------------- */
const gridVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
};
const gridItem = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const } },
};

/* -- data ------------------------------------------- */
const PORTAL_LOGIN_URL = "https://customer.vendorinfra.com/#/login-2";

type ServiceItem = {
  icon: typeof Search;
  title: string;
  image: string;
  desc: string;
  href?: string;
  external?: boolean;
};

const services: ServiceItem[] = [
  { icon: Search,      title: "AI-Powered Vendor Discovery",     href: PORTAL_LOGIN_URL, external: true, image: "/images/services/ai-vendor-discovery.jpg",                                                            desc: "Search and connect with verified vendors and suppliers in real time. Compare multiple options to identify the best partners for your projects quickly and confidently." },
  { icon: Calculator,  title: "Smart Price Discovery",           href: PORTAL_LOGIN_URL, external: true, image: "/images/services/smart-price-discovery.jpg",           desc: "Streamline vendor selection and proposal management. Request quotes or send instant proposals to secure the best prices for services and materials." },
  { icon: Tractor,     title: "AI-Powered Plants & Equipment",   href: PORTAL_LOGIN_URL, external: true, image: "/images/services/plants-equipment-marketplace.png",    desc: "A dedicated marketplace to buy, sell, or hire plants and equipment. Maximize asset utilization and reduce idle machinery across projects." },
  { icon: Package,     title: "Smart Material Procurement",      href: "/materials", image: "/images/services/smart-material-procurement.jpg", desc: "Access a one-stop marketplace for all construction and raw material requirements. Simplify sourcing and ensure timely availability for every project." },
  { icon: Factory,     title: "Contract Manufacturing",          href: "/contract-manufacturing", image: "/contract-manufacturing-ai.jpg", desc: "Design, source, manufacture, and deliver products through verified manufacturers, structured workflows, and real-time execution visibility." },
  { icon: ShieldCheck, title: "Smart Project Insurance",         href: "/contact", image: "/images/services/project-insurance.jpg",             desc: "Get competitive rates and customized quotes for project, material, and equipment insurance from reputed insurers and trusted partners." },
  { icon: Briefcase,   title: "AI Powered Enterprise Services",  href: "/contact", image: "/images/services/ai-enterprise-services.jpg",                                                          desc: "Leverage enterprise solutions for subcontracting, organisational growth, market entry, and diversification into new businesses." },
  { icon: BarChart3,   title: "Other Services",                  href: "/services", image: "/images/services/sector-intelligence.jpg",           desc: "Stay ahead with tender updates, sector intelligence, and access to 75+ Schedules of Rates (SOR) for accurate estimation and benchmarking." },
];

const stats = [
  { value: 31637, suffix: "",    label: "Contractors & Vendors", sub: "Certified across 20+ infrastructure sectors." },
  { value: 263,   suffix: "",    label: "Live Users",             sub: "Actively using our platform today." },
  { value: 6052,  suffix: " Cr", label: "Project Value",         sub: "Total value of projects posted." },
  { value: 159,   suffix: "",    label: "Plants & Equipment",    sub: "Listed for hire, sale, or purchase." },
];

const blogs = [
  { img: "/images/blog/construction-digital-blueprint.jpg", date: "March 31, 2026", cat: "Marketplace", title: "Vendor Infra Marketplace for Plants & Equipment: Unlocking the Power of a Marketplace", excerpt: "In the ever-evolving landscape of industries, effective management of plants and equipment is crucial for businesses seeking to optimize their ROI." },
  { img: "/images/blog/equipment-marketplace-phone.jpg", date: "March 30, 2026", cat: "Technology",  title: "SaaS Revolution in Construction and Infrastructure Industry",                                  excerpt: "The Indian economy stands on the shoulders of the Construction and Infrastructure industry, encompassing vital sectors like roads, railways, and urban infrastructure." },
  { img: "/images/blog/construction-site-digital.jpg", date: "March 30, 2026", cat: "AI",          title: "Promote Digitalisation in Construction Industry: The Catalysts of Change",                       excerpt: "The construction industry is undergoing a digital revolution. It's time to embrace the catalysts of change and the power of innovation." },

];

const testimonials = [
  { name: "Andleeb Jain",         role: "Group President: People | Culture | Digital, JK Cement",          image: "/testimonials/andleeb-jain.jpg",         text: "I have witnessed this platform taking shape and the great efforts, thoughts analysis and data going into it. It's surely the first and one of a kind in the infrastructure space — a one stop shop, very useful, very comprehensive, very handy." },
  { name: "Nitin Jain",           role: "Head: Corporate Centre (Tech | Strategy | Digital), Larsen & Toubro", image: "/testimonials/nitin-jain.jpg",         text: "Vendor Infra platform provides me with sector intelligence, detailed vendor database by sector, ability to provide me with costing information of projects in 20+ infrastructure & EPC sectors. Kudos to the Vendor Infra team for providing such a great platform for the EPC sector." },
  { name: "Pankaj Tandon",        role: "Entrepreneur, Former Finance Professional of large Infrastructure Groups, CA", image: "/testimonials/pankaj-tandon.jpg",  text: "I am delighted to see this concept in construction and infrastructure industry because it is one of its kind. I've never seen this type of Collaboration platform before. My wishes are with Rahul & Vendor Infra Team." },
  { name: "Sanjeev Kumar Gupta",  role: "CEO, Karnataka Digital Economy Mission (A GOK initiative)",        image: "/testimonials/sanjeev-gupta.jpg",          text: "Vendor Infra is much needed for the infra ecosystem. The bundle of IT, Knowledge and experience of infrastructure makes this platform unique. I am very impressed with their solution which is ready to digitally transform the Infrastructure, Construction & Manufacturing industry. All the best team!" },
  { name: "OP Pandey",            role: "Dy. President, JMC Projects Limited (Kalpataru Group)",           image: "/testimonials/op-pandey.jpg",              text: "When you have a project, you need a construction company committed to doing construction — someone who knows and understands the flow of companies and vendors. Vendor Infra fits us perfectly. I highly recommend it to eliminate your business risks, achieve your goals and improve your ROI." },
  { name: "Prabhat Shrivastava",  role: "Entrepreneur",                                                    image: "/testimonials/prabhat-shrivastava.jpg",    text: "Vendor Infra is the most unique platform in the infrastructure space. The founder Rahul has conceptualized this technology enabled platform which I am sure would be a boon in the infrastructure space. I am sure Vendor Infra will enhance the potentials of businesses and help them increase their growth, margins and reach!" },
];

const trustedBy = [
  { name: "Adani Group",    logo: "/logos/adani-group.svg" },
  { name: "NCC",            logo: "/logos/ncc.svg" },
  { name: "Tata Projects",  logo: "/logos/tata-projects.svg" },
  { name: "JWIL",           logo: "/logos/jwil.svg" },
  { name: "Gawar",          logo: "/logos/gawar.svg" },
  { name: "JMC Projects",   logo: "/logos/jmc-projects.svg" },
  { name: "Dilip Buildcon", logo: "/logos/dilip-buildcon.svg" },
  { name: "INOX Wind",      logo: "/logos/inox-wind.svg" },
  { name: "IndInfravit",    logo: "/logos/indinfravit.svg" },
  { name: "KEC",            logo: "/logos/kec.svg" },
  { name: "Kalpataru",      logo: "/logos/kalpataru.svg" },
  { name: "IRB Infra",      logo: "/logos/irb-infra.svg" },
];

const associations = [
  { name: "ISO 14001",     logo: "/logos/iso-14001.svg" },
  { name: "ISO 27001",     logo: "/logos/iso-27001.svg" },
  { name: "ISO Certified", logo: "/logos/iso-certified.svg" },
  { name: "GEM",           logo: "/logos/gem.svg" },
  { name: "FICCI",         logo: "/logos/ficci.svg" },
  { name: "Startup India", logo: "/logos/startup-india.svg" },
  { name: "CII",           logo: "/logos/cii.svg" },
  { name: "DPIIT",         logo: "/logos/dpiit.svg" },
  { name: "InvoiceMart",   logo: "/logos/invoicemart.svg" },
  { name: "MSME",          logo: "/logos/msme.svg" },
];

const financingPartners = [
  { name: "HDFC Bank",             logo: "/logos/hdfc-bank.svg" },
  { name: "Aditya Birla Capital",  logo: "/logos/aditya-birla-capital.svg" },
  { name: "Tata Capital",          logo: "/logos/tata-capital.svg" },
  { name: "Shriram Finance",       logo: "/logos/shriram-finance.svg" },
  { name: "L&T Finance",           logo: "/logos/l-t-finance.svg" },
  { name: "IDFC FIRST Bank",       logo: "/logos/idfc-first-bank.svg" },
];

const awards = [
  {
    name: "HDFC Tech Innovators",
    label: "Tech Innovators",
    image: "https://www.hdfccapital.com/techinnovators/images/HDFC_Capital.png",
  },
  {
    name: "IIT Delhi",
    label: "Entrepreneurship Ecosystem",
    image: "https://upload.wikimedia.org/wikipedia/commons/9/9d/IIT_Delhi_header.svg",
  },
  {
    name: "VCCIRCLE",
    label: "Startup Recognition",
    image: "https://www.vccircle.com/VCC-logo.svg",
  },
  {
    name: "HICOOL",
    label: "Global Entrepreneur Summit",
    image: "/awards/hicool.png",
    dark: true,
  },
];

const homePricingPlans = [
  {
    name: "Basic",
    tag: "Starter",
    price: "₹7,999",
    priceSuffix: "/month",
    description: "For companies ready to digitize, optimize, and grow",
    features: [
      "AI-Powered Vendor Discovery (Upto 3 Sectors)",
      "Price Discovery (Upto 3 Sectors)",
      "Smart Material Procurement",
      "User Login (Single)",
      "Basic Support",
    ],
    excluded: ["Dedicated Account Manager"],
    highlight: false,
    ctaType: "register",
  },
  {
    name: "Plus",
    tag: "Most Popular",
    price: "₹9,999",
    priceSuffix: "/month",
    description: "For growing teams who need wider sector coverage",
    features: [
      "AI-Powered Vendor Discovery (Upto 10 Sectors)",
      "Price Discovery (Upto 10 Sectors)",
      "Smart Material Procurement",
      "Unified Analytics Dashboard",
      "User Login (1+3)",
      "Dedicated Account Manager",
    ],
    excluded: [],
    highlight: true,
    ctaType: "register",
  },
  {
    name: "Premium",
    tag: "Enterprise",
    price: "Contact Us",
    description: "Enterprise-grade access for large EPC organisations",
    features: [
      "AI-Powered Vendor Discovery (20+ Sectors)",
      "Price Discovery (20+ Sectors)",
      "Smart Material Procurement",
      "Unified Analytics Dashboard",
      "User Login (Unlimited)",
      "Dedicated Account Manager",
    ],
    excluded: [],
    highlight: false,
    ctaType: "contact",
  },
];

const whyPoints = [
  { title: "End-to-End Value Chain Integration",           desc: "From vendor discovery and material procurement to financing, insurance and equipment hire — one unified platform." },
  { title: "Single Unified Data Lake",                     desc: "All project, procurement, vendor, and site data — fully unified and instantly accessible. Eliminate silos." },
  { title: "Smart Decision Support via Market Intelligence", desc: "Sector insights, schedules of rates, competitive intelligence, and tender & PQ samples." },
  { title: "AI & ML-Driven Insights",                     desc: "Match with the best-suited vendors and generate real-time analytics for smarter, data-backed decisions." },
  { title: "Safety, Security & Trust Built In",           desc: "Every vendor is vetted. ISO 27001-certified data security ensures your information is always protected." },
  { title: "Dedicated Support & Accountability",          desc: "Round-the-clock team with dedicated account managers to guide you at every stage." },
];

/* -- Logo marquee ----------------------------------- */
function LogoMarquee({ logos, bg = "white" }: { logos: { name: string; logo: string }[]; bg?: string }) {
  const doubled = [...logos, ...logos];
  return (
    <div className="relative overflow-hidden">
      {/* edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 z-10 bg-gradient-to-r from-[#eef3fb] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 z-10 bg-gradient-to-l from-[#eef3fb] to-transparent" />
      <div
        className="flex gap-4 items-center py-1"
        style={{ animation: "marquee 30s linear infinite", width: "max-content" }}
      >
        {doubled.map((l, i) => (
          <div
            key={i}
            className={`group flex-shrink-0 flex items-center justify-center h-14 px-5 rounded-xl border transition-all duration-300 hover:-translate-y-0.5 ${
              bg === "dark"
                ? "bg-white/8 border-white/10 hover:border-[#edad1a]/40"
                : "bg-white border-[#00274d]/10 shadow-[0_2px_10px_-6px_rgba(0,39,77,0.18)] hover:shadow-[0_6px_18px_-8px_rgba(0,39,77,0.3)] hover:border-[#00274d]/25"
            }`}
            style={{ minWidth: 130 }}
          >
            <img
              src={l.logo}
              alt={l.name}
              className={`max-h-8 max-w-[100px] object-contain transition duration-300 ${bg === "dark" ? "brightness-0 invert opacity-80" : "opacity-90 group-hover:opacity-100"}`}
              loading="eager"
            />
          </div>
        ))}
      </div>
      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}


/* -- Hero Demo Form --------------------------------- */
const SECTORS = ["Roads & Highways","Railways","Metros","Airports","Ports & Shipping","Water & Sanitation","Power & Energy","Oil & Gas","Buildings & Real Estate","Mining","Tunnels","Bridges","Smart Cities","Irrigation","Other"];

function HeroDemoForm() {
  const [form, setForm] = useState({ name: "", company: "", phone: "", sector: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/demo-bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="w-14 h-14 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-7 h-7 text-green-500" />
        </div>
        <h3 className="text-lg font-semibold text-[#00274d] mb-2">Demo Booked Successfully</h3>
        <p className="text-gray-500 text-sm mb-1">Thank you, <strong className="font-medium">{form.name}</strong>.</p>
        <p className="text-gray-400 text-sm">Our team will reach out on <strong className="font-medium">{form.phone}</strong> within 24 hours.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
      <div className="bg-[#00274d] px-6 py-4">
        <p className="text-[#edad1a] text-xs font-medium uppercase tracking-widest mb-1">Free Demo</p>
        <p className="text-white text-base font-semibold leading-snug">Book a Personalised Walkthrough</p>
        <p className="text-white/50 text-xs mt-0.5">No commitment required — 30-minute session</p>
      </div>

      <form onSubmit={submit} className="p-6 space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-[10px] font-medium text-gray-400 uppercase tracking-wider block mb-1.5">Full Name *</label>
            <input value={form.name} onChange={set("name")} required placeholder="Rahul Sharma"
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:border-[#00274d] focus:ring-1 focus:ring-[#00274d]/20 transition font-normal" />
          </div>
          <div>
            <label className="text-[10px] font-medium text-gray-400 uppercase tracking-wider block mb-1.5">Company</label>
            <input value={form.company} onChange={set("company")} placeholder="Your Company"
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:border-[#00274d] focus:ring-1 focus:ring-[#00274d]/20 transition font-normal" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-[10px] font-medium text-gray-400 uppercase tracking-wider block mb-1.5">Phone *</label>
            <input value={form.phone} onChange={set("phone")} required placeholder="+91 98765 43210"
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:border-[#00274d] focus:ring-1 focus:ring-[#00274d]/20 transition font-normal" />
          </div>
          <div>
            <label className="text-[10px] font-medium text-gray-400 uppercase tracking-wider block mb-1.5">Sector</label>
            <select value={form.sector} onChange={set("sector")}
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:border-[#00274d] focus:ring-1 focus:ring-[#00274d]/20 transition bg-white font-normal">
              <option value="">Select sector</option>
              {SECTORS.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>

        <div>
          <label className="text-[10px] font-medium text-gray-400 uppercase tracking-wider block mb-1.5">Message (optional)</label>
          <textarea value={form.message} onChange={set("message")} placeholder="Briefly describe your requirement..." rows={2}
            className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:border-[#00274d] focus:ring-1 focus:ring-[#00274d]/20 transition resize-none font-normal" />
        </div>

        {status === "error" && (
          <p className="text-red-500 text-xs">Something went wrong. Please try again or WhatsApp us.</p>
        )}

        <button type="submit" disabled={status === "loading"}
          className="w-full bg-[#edad1a] hover:bg-[#d49a10] text-white font-semibold py-3 rounded-xl text-sm transition-colors flex items-center justify-center gap-2 shadow-md shadow-[#edad1a]/25">
          {status === "loading" ? (
            <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
          ) : (
            <>Request Free Demo <CtaArrow variant="dark" /></>
          )}
        </button>

        <p className="text-center text-gray-400 text-[11px]">Our team responds within 24 hours</p>
      </form>
    </div>
  );
}

/* --------------------------------------------------- */
export default function Home() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [contactOpen, setContactOpen] = useState(false);
  const [contactPlan, setContactPlan] = useState<string | undefined>(undefined);

  const openContact = (planName: string) => {
    setContactPlan(planName);
    setContactOpen(true);
  };

  useEffect(() => {
    const t = setInterval(() => setActiveTestimonial(p => (p + 1) % testimonials.length), 5500);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      <Navbar />

      {/* ── HERO ─────────────────────────────────────── */}
      <section data-preserve-hero-typography className="relative overflow-hidden bg-[#0d2c52] min-h-[88vh] flex items-center">
        {/* Background image with cinematic treatment */}
        <div className="absolute inset-0">
          <motion.img
            initial={{ scale: 1.08 }}
            animate={{ scale: 1 }}
            transition={{ duration: 2.4, ease: [0.22, 1, 0.36, 1] }}
            src={heroImage}
            alt="Infrastructure construction site"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a2548]/95 via-[#0a2548]/85 to-[#0a2548]/65" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a1f3d]/60 via-[#0a2548]/40 to-[#0a2548]/80" />
          <div className="absolute inset-0 bg-black/25" />
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(10,37,72,0.35) 0%, rgba(10,37,72,0.7) 100%)" }} />
          <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
          <div className="absolute -top-32 -left-32 w-[480px] h-[480px] rounded-full bg-[#edad1a]/10 blur-[120px]" />
          <div className="absolute bottom-0 right-0 w-[520px] h-[520px] rounded-full bg-[#1e6bb8]/20 blur-[140px]" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-20 lg:py-28 w-full">
          <div className="max-w-4xl w-full">

            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="text-3xl sm:text-4xl lg:text-5xl xl:text-[3.4rem] font-semibold text-white leading-[1.08] tracking-[-0.02em] mb-5"
            >
              AI - Powered Operating System for{" "}
              <span className="relative inline-block text-[#edad1a]">
                Infrastructure
                <svg className="absolute left-0 -bottom-2 w-full" height="6" viewBox="0 0 300 6" preserveAspectRatio="none" fill="none">
                  <path d="M2 3 Q150 0 298 3" stroke="#edad1a" strokeWidth="3" strokeLinecap="round" />
                </svg>
              </span>, Construction & Manufacturing Industry
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.28 }}
              className="text-white/75 text-sm lg:text-base leading-relaxed mb-8 max-w-xl font-light"
            >
              Unleashing the potential through Ecosystem.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.38 }}
              className="flex flex-wrap items-center gap-3 mb-10"
            >
              <Link href="/services">
                <button className="group inline-flex items-center gap-2 bg-[#edad1a] hover:bg-[#f5bb2e] text-[#00274d] font-semibold px-5 py-2.5 rounded-lg text-sm transition-all duration-300 shadow-[0_8px_20px_-10px_rgba(237,173,26,0.7)] hover:shadow-[0_10px_24px_-10px_rgba(237,173,26,0.85)] hover:-translate-y-0.5">
                  Explore Services
                  <CtaArrow variant="blue" />
                </button>
              </Link>
              <Link href="/materials">
                <button className="inline-flex items-center gap-2 bg-[#00274d] hover:bg-[#003a73] text-white font-medium px-5 py-2.5 rounded-lg text-sm transition-colors shadow-md shadow-[#00274d]/30">
                  <Play className="w-3 h-3 fill-current" />
                  Explore Materials
                </button>
              </Link>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── HERO STATS (overlapping hero bottom) ───────── */}
      <div className="relative z-30 -mt-16 md:-mt-24 mb-10 md:mb-16">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-px bg-gray-100 rounded-2xl border border-gray-100 shadow-2xl overflow-hidden"
            variants={gridVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
          >
            {stats.map((s, i) => (
              <motion.div key={i} variants={gridItem}
                className="bg-white py-10 md:py-12 px-6 hover:bg-gray-50 transition-colors duration-300 text-center">
                <div
                  className="text-4xl md:text-5xl font-extrabold text-[#edad1a] leading-none mb-3 tabular-nums whitespace-nowrap"
                  style={{ WebkitTextStroke: "0.75px rgba(0,39,77,0.45)" }}
                >
                  <Counter target={s.value} suffix={s.suffix} />
                </div>
                <h3 className="text-sm font-medium text-[#00274d] mb-1">{s.label}</h3>
                <p className="text-gray-400 text-xs leading-relaxed font-normal">{s.sub}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ── ABOUT VENDOR INFRA — animated, medium UI ───── */}
      <section className="relative overflow-hidden bg-[#00274d] py-16 md:py-24 text-white">
        {/* Soft background washes */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(237,173,26,0.08),transparent_50%),radial-gradient(ellipse_at_bottom_right,rgba(2,26,54,0.9),transparent_65%)]" />
        <div
          className="absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.06) 1px,transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />
        {/* Slow rotating orbit */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -right-28 top-1/2 -translate-y-1/2 h-[420px] w-[420px] rounded-full border border-[#edad1a]/15"
          animate={{ rotate: 360 }}
          transition={{ duration: 70, repeat: Infinity, ease: "linear" }}
        >
          <div className="absolute inset-8 rounded-full border border-dashed border-[#edad1a]/20" />
          <div className="absolute inset-16 rounded-full border border-white/5" />
        </motion.div>
        {/* Floating orbs */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute left-10 top-16 h-2 w-2 rounded-full bg-[#edad1a]/70 shadow-[0_0_18px_4px_rgba(237,173,26,0.45)]"
          animate={{ y: [0, -18, 0], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          aria-hidden
          className="pointer-events-none absolute left-1/3 bottom-12 h-1.5 w-1.5 rounded-full bg-white/70"
          animate={{ y: [0, 12, 0], opacity: [0.3, 0.9, 0.3] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#edad1a]/60 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#edad1a]/40 to-transparent" />

        <div className="relative max-w-6xl mx-auto px-6 sm:px-8 lg:px-10">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            {/* LEFT — copy (medium) */}
            <FadeUp className="lg:col-span-7">
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45 }}
                className="inline-flex items-center gap-2 text-[#edad1a] text-[12px] font-bold uppercase tracking-[0.3em]"
              >
                <span className="w-6 h-px bg-[#edad1a]/60" />
                About
                <span className="w-6 h-px bg-[#edad1a]/60" />
              </motion.span>


              <h2 className="mt-4 text-3xl md:text-4xl leading-tight font-semibold tracking-tight text-white">
                Discover contractors, unlock opportunities and execute projects with an all-in-one{" "}
                <span className="relative inline-block text-[#edad1a]">
                  AI-Powered Ecosystem.
                  <motion.span
                    aria-hidden
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.25 }}
                    className="absolute left-0 -bottom-1.5 h-[2px] w-full origin-left bg-[#edad1a]/70"
                  />
                </span>
              </h2>

              <p className="mt-5 max-w-2xl text-sm md:text-[15px] leading-7 text-white/75">
                Vendor Infra is more than just a platform; it's a community for the Infrastructure, Construction &amp;
                Manufacturing industry. Designed exclusively for vendors, suppliers, contractors,
                consultants, and developers, we combine collaboration, marketplace, and supply chain
                management into one powerful AI-Powered Ecosystem. Based in Delhi NCR and founded by
                seasoned leaders with decades of experience, Vendor Infra helps stakeholders eliminate
                bottlenecks, discover the right partners, and execute projects with unmatched speed,
                transparency, and efficiency.
              </p>
              <p className="hidden">
                Empowering contractors &amp; vendors with an AI-driven SaaS platform to discover partners,
                access opportunities, source efficiently, and scale execution — all in one place.
              </p>

              {/* Feature tiles */}
              <motion.ul
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={{
                  hidden: {},
                  show: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
                }}
                className="mt-7 grid max-w-2xl grid-cols-1 gap-3 sm:grid-cols-3"
              >
                {[
                  "AI-Powered Platform",
                  "Unified Ecosystem",
                  "Data Intelligence",
                ].map((chip) => (
                  <motion.li
                    key={chip}
                    variants={{
                      hidden: { opacity: 0, y: 10 },
                      show: { opacity: 1, y: 0 },
                    }}
                    whileHover={{ y: -3 }}
                    className="group flex min-h-[74px] items-center gap-3 rounded-xl border border-white/15 bg-white/[0.06] px-4 py-4 text-sm font-semibold text-white shadow-[0_18px_38px_-28px_rgba(0,0,0,0.9)] backdrop-blur transition-colors hover:border-[#edad1a]/50 hover:bg-[#edad1a]/10"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#edad1a]/15 text-[#edad1a] ring-1 ring-[#edad1a]/25">
                      <Sparkles className="h-4 w-4" />
                    </span>
                    {chip}
                  </motion.li>
                ))}
              </motion.ul>

              <div className="mt-7 flex flex-wrap items-center gap-4">
                <Link href="/about">
                  <button className="group inline-flex items-center gap-3 bg-[#edad1a] hover:bg-[#f5bb2e] text-[#00274d] font-bold tracking-wide px-5 py-2.5 rounded-lg text-sm uppercase transition-all duration-300 shadow-[0_10px_28px_-10px_rgba(237,173,26,0.7)] hover:shadow-[0_14px_36px_-10px_rgba(237,173,26,0.85)] hover:-translate-y-0.5">
                    KNOW MORE
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#00274d] text-white transition-transform duration-300 group-hover:translate-x-1">
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </button>
                </Link>
              </div>

            </FadeUp>

            {/* RIGHT — MNC-level premium image composition */}
            <FadeUp delay={0.2} className="lg:col-span-5 hidden lg:block">
              <div className="relative pl-6 pr-2 pb-10">

                {/* Gold accent bar — left edge */}
                <div className="absolute left-0 top-4 bottom-12 w-[3px] rounded-full bg-gradient-to-b from-[#edad1a] via-[#edad1a]/40 to-transparent" />
                <motion.div
                  animate={{ scale: [1, 1.3, 1], opacity: [0.8, 1, 0.8] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute left-[-5px] top-4 h-[13px] w-[13px] rounded-full bg-[#edad1a] shadow-[0_0_16px_4px_rgba(237,173,26,0.55)]"
                />

                {/* Main image card */}
                <div className="relative rounded-2xl overflow-hidden shadow-[0_32px_72px_-18px_rgba(0,0,0,0.85)] border border-white/[0.08]">
                  {/* Gold top line */}
                  <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#edad1a] via-[#f7c44a]/70 to-transparent z-10" />

                  <img
                    src="/about/team-photo.jpg"
                    alt="Vendor Infra Team"
                    className="w-full object-cover"
                    style={{ height: 340, objectPosition: "center 20%" }}
                  />

                  {/* Gradient overlay bottom */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#00274d]/40 via-transparent to-transparent" />
                </div>



                {/* Floating "Since 2020" badge */}
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-3 right-1 bg-[#edad1a] text-[#00274d] text-[9px] font-black uppercase tracking-[0.18em] px-3.5 py-1.5 rounded-full shadow-[0_8px_24px_-4px_rgba(237,173,26,0.55)]"
                >
                  Since 2020
                </motion.div>

                {/* Subtle corner glow */}
                <div className="pointer-events-none absolute -bottom-6 -right-6 h-40 w-40 rounded-full bg-[#edad1a]/10 blur-3xl" />
              </div>
            </FadeUp>

          </div>
        </div>

      </section>

      <section className="relative overflow-hidden bg-[#f7f8fc] py-10 md:py-14" aria-label="AI SaaS platform marquee">
        <div className="relative h-36 md:h-48">
          <div className="absolute left-1/2 top-3 w-[125vw] -translate-x-1/2 -rotate-[2.4deg] overflow-hidden rounded-sm bg-[#00274d] py-5 md:py-7 shadow-xl shadow-[#00274d]/15">
            <div className="ai-marquee-track">
              {Array.from({ length: 6 }).map((_, index) => (
                <span key={`blue-${index}`} className="ai-marquee-item">
                  SaaS Platform with Artificial Intelligence &amp; Machine Learning
                </span>
              ))}
            </div>
          </div>

          <div className="absolute left-1/2 top-20 md:top-28 w-[125vw] -translate-x-1/2 rotate-[2.1deg] overflow-hidden rounded-sm bg-[#edad1a] py-5 md:py-7 shadow-xl shadow-[#edad1a]/20">
            <div className="ai-marquee-track ai-marquee-track-reverse">
              {Array.from({ length: 6 }).map((_, index) => (
                <span key={`gold-${index}`} className="ai-marquee-item">
                  SaaS Platform with Artificial Intelligence &amp; Machine Learning
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* ── SERVICES ──────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-white relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px,#00274d 1px,transparent 0)", backgroundSize: "32px 32px" }} />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00274d]/12 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00274d]/8 to-transparent" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          {/* Header */}
          <FadeUp className="text-center mb-14">
            <span className="inline-flex items-center gap-2 text-[#edad1a] text-[12px] font-bold uppercase tracking-[0.3em] mb-4">
              <span className="w-6 h-px bg-[#edad1a]/60" />
              Services
              <span className="w-6 h-px bg-[#edad1a]/60" />
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#00274d] mb-3">Our Comprehensive Services</h2>
            <p className="text-[#00274d]/60 text-base md:text-lg max-w-2xl mx-auto">AI-powered solutions that enhance efficiency, fuel growth, and create measurable business impact.</p>

          </FadeUp>

          {/* Cards — 3-col symmetric grid, 7th card centered in last row */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
            variants={gridVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
          >
            {services.map((s, i) => {
              const card = (
                <div className="group relative rounded-2xl bg-[#00274d] border border-[#00274d] overflow-hidden h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_52px_-16px_rgba(0,39,77,0.45)]">
                  {/* Subtle inner grid */}
                  <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.4) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.4) 1px,transparent 1px)", backgroundSize: "28px 28px" }} />

                  {/* Image */}
                  {s.image && (
                    <div className="relative aspect-[16/9] overflow-hidden bg-gradient-to-b from-white via-[#e6eef7] to-[#cdd9e8]">
                      <img
                        src={s.image}
                        alt={s.title}
                        className="w-full h-full object-cover opacity-95 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                        loading="eager"
                      />
                      {/* Soft white wash on top for brightness */}
                      <div className="absolute inset-0 bg-gradient-to-b from-white/55 via-white/10 to-transparent" />
                      {/* Subtle blue highlight tint (glassmorphism) */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-[#3b6fa0]/10 via-transparent to-[#cfe0f2]/25" />
                      {/* Smooth blend into navy lower section */}
                      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-b from-transparent via-[#00274d]/55 to-[#00274d]" />
                    </div>
                  )}

                  {/* Content */}
                  <div className="relative p-5">
                    <div className="flex items-center gap-2.5 mb-3">
                      <div className="w-9 h-9 rounded-xl bg-[#edad1a]/20 border border-[#edad1a]/40 flex items-center justify-center flex-shrink-0 group-hover:bg-[#edad1a]/30 transition-colors">
                        <s.icon className="w-4 h-4 text-[#edad1a]" />
                      </div>
                    </div>
                    <h3 className="text-white font-semibold text-sm leading-snug mb-2">{s.title}</h3>
                    <p className="text-white/70 text-xs leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              );

              return (
                <motion.div
                  key={i}
                  variants={gridItem}
                >
                  {s.href ? (
                    s.external ? (
                      <a href={s.href} target="_blank" rel="noopener noreferrer" className="block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#edad1a] focus-visible:ring-offset-4 rounded-2xl">
                        {card}
                      </a>
                    ) : (
                      <Link href={s.href} className="block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#edad1a] focus-visible:ring-offset-4 rounded-2xl">
                        {card}
                      </Link>
                    )
                  ) : card}
                </motion.div>
              );
            })}
          </motion.div>

          {/* CTA */}
          <FadeUp delay={0.1} className="mt-12 text-left">
            <Link href="/services">
              <button className="group inline-flex items-center gap-3 bg-[#edad1a] hover:bg-[#f7c44a] text-white font-semibold px-6 py-3 rounded-lg text-sm transition-all duration-300 shadow-[0_8px_28px_-8px_rgba(237,173,26,0.5)] hover:shadow-[0_14px_36px_-8px_rgba(237,173,26,0.6)] hover:-translate-y-0.5">
                View All Services <CtaArrow variant="dark" />
              </button>
            </Link>
          </FadeUp>

        </div>
      </section>

      {/* ── MATERIALS ─────────────────────────────────── */}
      <section className="py-14 md:py-20 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <FadeUp>
              <span className="inline-flex items-center gap-2 text-[#edad1a] text-[12px] font-bold uppercase tracking-[0.3em] mb-4">
                <span className="w-6 h-px bg-[#edad1a]/60" />
                Materials
                <span className="w-6 h-px bg-[#edad1a]/60" />
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#00274d] mb-5 max-w-lg">
                One Destination for All Project Materials Needs
              </h2>
              <p className="type-body-lg text-gray-600 max-w-lg mb-8">
                Market Place to provide end-to-end requirement for all Raw Material needs for your projects.
              </p>

              <div className="space-y-4 max-w-lg">
                {[
                  { num: "01", title: "Categories", desc: "These include core inputs such as steel, cement, sand and aggregates, chemicals, and petroleum products, along with specialized categories covering civil and infrastructure materials, electrical and electronic components, fire protection systems, security solutions, solar and renewable energy equipment, and interior and architectural materials." },
                  { num: "02", title: "Quality & Price",     desc: "Buy all construction Raw Materials at the lowest price with quality assurance for your projects on a Single Platform." },
                ].map(p => (
                  <div key={p.num} className="flex gap-4 p-4 rounded-xl border border-gray-100 bg-gray-50 hover:bg-white hover:shadow-sm transition-all duration-200">
                    <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-[#00274d] text-[#edad1a] flex items-center justify-center text-xs font-semibold">{p.num}</div>
                    <div>
                      <h3 className="type-card-title text-[#00274d] mb-1">{p.title}</h3>
                      <p className="text-[0.95rem] text-gray-600 leading-relaxed font-normal">{p.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Link href="/materials">
                <button className="group mt-8 inline-flex items-center gap-3 bg-[#edad1a] hover:bg-[#d49a10] text-white font-medium px-6 py-3 rounded-lg text-sm transition-colors shadow-md shadow-[#edad1a]/20">
                  Explore Materials <CtaArrow variant="dark" />
                </button>
              </Link>
            </FadeUp>

            <FadeUp delay={0.12}>
              <div className="relative">
                <div className="absolute -inset-6 bg-[#edad1a]/6 blur-3xl" />
                <div className="relative overflow-hidden rounded-2xl bg-[#082b4f] p-5 sm:p-6 shadow-2xl">
                  <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px,#ffffff 1px,transparent 0)", backgroundSize: "24px 24px" }} />
                  <div className="relative flex items-center justify-between mb-5">
                    <div>
                      <h3 className="text-white text-xl font-semibold leading-tight mt-1">Material Categories</h3>
                    </div>
                    <Link href="/materials" className="inline-flex items-center gap-1.5 rounded-full bg-[#edad1a]/15 hover:bg-[#edad1a]/25 border border-[#edad1a]/25 px-3 py-1.5 text-xs font-semibold text-[#edad1a] transition-colors">
                      View All <ArrowUpRight className="w-3 h-3" />
                    </Link>

                  </div>
                  <div className="relative grid grid-cols-3 sm:grid-cols-4 gap-2.5">
                    {categories.slice(0, 12).map((cat) => (
                      <Link key={cat.slug} href={`/materials/${cat.slug}`} className="group">
                        <div className="h-full flex flex-col overflow-hidden rounded-lg border border-white/10 bg-white/8 p-1.5 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/14 hover:border-[#edad1a]/50">
                          <div className="aspect-[4/3] rounded-md overflow-hidden bg-white">
                            <img src={cat.image} alt={cat.name}
                              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" loading="eager" />
                          </div>
                          <p className="mt-2 text-white/80 text-[11px] leading-tight font-normal px-0.5 line-clamp-2 break-words min-h-[2.1rem]" title={cat.name}>{cat.name}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── SECTORS ───────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-white overflow-hidden relative">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00274d]/15 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00274d]/10 to-transparent" />
        </div>
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* LEFT — sector tile grid */}
            <FadeUp delay={0.12} className="lg:order-2">
              <div className="relative">
                <div className="absolute -inset-4 bg-[#00274d]/6 blur-3xl rounded-3xl" />
                <div className="relative overflow-hidden rounded-3xl bg-[#00274d] p-5 sm:p-6 shadow-[0_32px_72px_-20px_rgba(0,39,77,0.45)]">
                  <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.1) 1px,transparent 1px)", backgroundSize: "28px 28px" }} />
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#edad1a] via-[#f7c44a]/60 to-transparent" />
                  <div className="relative flex items-center justify-between mb-5">
                    <div>
                      <p className="text-[#edad1a] text-[10px] font-bold uppercase tracking-[0.25em] mb-0.5">Coverage</p>
                      <h3 className="text-white text-lg font-bold">20+ Infrastructure Sectors</h3>
                    </div>
                    <Link href="/sectors" className="inline-flex items-center gap-1.5 rounded-full bg-[#edad1a]/15 hover:bg-[#edad1a]/25 border border-[#edad1a]/25 px-3 py-1.5 text-xs font-semibold text-[#edad1a] transition-colors">
                      View All <ArrowUpRight className="w-3 h-3" />
                    </Link>
                  </div>
                  <div className="relative grid grid-cols-3 sm:grid-cols-4 gap-2">
                    {allSectors.slice(0, 12).map((sector) => (
                      <Link key={sector.slug} href={`/sectors/${sector.slug}`} className="group">
                        <div className="h-full flex flex-col overflow-hidden rounded-xl border border-white/10 bg-white/[0.06] p-1.5 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/[0.12] hover:border-[#edad1a]/40 hover:shadow-[0_8px_20px_-8px_rgba(237,173,26,0.3)]">
                          <div className="aspect-[4/3] rounded-md overflow-hidden">
                            <img src={sector.image} alt={sector.name}
                              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" loading="eager" />
                          </div>
                          <p className="mt-1.5 text-white/75 group-hover:text-white text-[10.5px] leading-tight font-medium px-0.5 line-clamp-2 break-words min-h-[2rem] transition-colors" title={sector.name}>{sector.name}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </FadeUp>

            {/* RIGHT — copy */}
            <FadeUp className="lg:order-1">
              <span className="inline-flex items-center gap-2 text-[#edad1a] text-[12px] font-bold uppercase tracking-[0.3em] mb-4">
                <span className="w-6 h-px bg-[#edad1a]/60" />
                Sectors
                <span className="w-6 h-px bg-[#edad1a]/60" />
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#00274d] leading-tight mb-4 max-w-lg">
                One Platform for <span className="text-[#edad1a]">20+</span> Infrastructure Sectors
              </h2>
              <p className="text-gray-500 text-[15px] leading-relaxed max-w-md mb-8">
                We cover all major Sectors of the Infrastructure, Construction &amp; Manufacturing Industry.
              </p>

              <div className="space-y-6 max-w-xl mb-8">
                {[
                  { num: "01", title: "Sectors", desc: "Vendor Infra serves a wide range of infrastructure sectors including roads & bridges, urban transport, railways, transmission lines and substations, airports, industrial corridors, smart cities, ports, water & wastewater, renewable energy, power, buildings & industrial projects, oil & gas, irrigation & tunneling, and solid waste management." },
                  { num: "02", title: "Seamless Collaboration for all Stakeholders across sectors", desc: "This broad sector coverage enables companies and vendors to discover opportunities, collaborate, and execute projects across diverse domains through a single platform." },
                ].map(p => (
                  <div key={p.num} className="flex gap-4 p-4 rounded-xl border border-gray-100 bg-gray-50 hover:bg-white hover:shadow-sm transition-all duration-200">
                    <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-[#00274d] text-[#edad1a] flex items-center justify-center text-xs font-semibold">{p.num}</div>
                    <div>
                      <h3 className="type-card-title text-[#00274d] mb-1">{p.title}</h3>
                      <p className="text-[0.95rem] text-gray-600 leading-relaxed font-normal">{p.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Link href="/sectors">
                <button className="group inline-flex items-center gap-3 bg-[#edad1a] hover:bg-[#f7c44a] text-white font-semibold px-6 py-3 rounded-lg text-sm transition-all duration-300 shadow-[0_8px_28px_-8px_rgba(237,173,26,0.5)] hover:shadow-[0_14px_36px_-8px_rgba(237,173,26,0.6)] hover:-translate-y-0.5">
                  Explore Sectors <CtaArrow variant="dark" />
                </button>
              </Link>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── WHY VENDOR INFRA ──────────────────────────── */}
      <section className="py-14 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <FadeUp>
              <span className="inline-flex items-center gap-2 text-[#edad1a] text-[12px] font-bold uppercase tracking-[0.3em] mb-4">
                <span className="w-6 h-px bg-[#edad1a]/60" />
                Why Us
                <span className="w-6 h-px bg-[#edad1a]/60" />
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#00274d] leading-tight mb-5 max-w-lg">
                Everything You Need to Know About Our Platform
              </h2>

              <p className="text-gray-500 text-base leading-relaxed font-normal max-w-lg mb-8">
                From discovery to delivery, we digitize every step — giving vendors the exposure they deserve and contractors the reliability they demand.
              </p>

              <div className="grid grid-cols-3 divide-x divide-gray-200 border-y border-gray-200 max-w-md mb-8">
                {[
                  { value: "20+",  label: "Sectors" },
                  { value: "31K+", label: "Vendors" },
                  { value: "24×7", label: "Support" },
                ].map((item) => (
                  <div key={item.label} className="py-5 px-3 text-center">
                    <p className="text-2xl font-bold text-[#00274d] leading-none tabular-nums">{item.value}</p>
                    <p className="text-[11px] font-medium uppercase tracking-wider text-gray-400 mt-2">{item.label}</p>
                  </div>
                ))}
              </div>

              <Link href="/why-us">
                <button className="group inline-flex items-center gap-3 bg-[#edad1a] hover:bg-[#d49a10] text-white font-medium px-6 py-3 rounded-lg text-sm transition-colors shadow-md shadow-[#edad1a]/20">
                  Learn More <CtaArrow variant="dark" />
                </button>
              </Link>
            </FadeUp>

            <FadeUp delay={0.12}>
              <div className="relative">
                <div className="absolute -inset-6 bg-[#edad1a]/6 blur-3xl" />
                <div className="relative overflow-hidden rounded-2xl bg-white border border-gray-100 p-5 sm:p-6 shadow-xl">
                  <div className="relative flex items-center justify-between mb-5">
                    <div>
                      <h3 className="text-[#00274d] text-xl font-semibold leading-tight mt-1">Why Vendor Infra</h3>
                    </div>
                    <Link href="/why-us" className="inline-flex items-center gap-1.5 rounded-full bg-[#00274d] hover:bg-[#003a73] border border-[#00274d] px-3 py-1.5 text-xs font-semibold text-white transition-colors">
                      View All <ArrowUpRight className="w-3 h-3" />
                    </Link>

                  </div>
                  <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {whyPoints.map((p, i) => (
                      <div key={p.title}
                        className="rounded-lg border border-gray-100 bg-gray-50 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-sm hover:border-[#edad1a]/40"
                      >

                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-[#00274d] text-[#edad1a] flex items-center justify-center text-xs font-semibold">
                            {String(i + 1).padStart(2, "0")}
                          </div>
                          <div>
                            <h4 className="text-sm font-medium leading-snug mb-1 text-[#00274d]">{p.title}</h4>
                            <p className="text-xs leading-relaxed font-normal text-gray-400">{p.desc}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ──────────────────────────────── */}
      <section className="py-16 md:py-24 bg-[#00274d] relative overflow-hidden">
        {/* Background layers */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full bg-[#021a36]/70 blur-[90px]" />
          <div className="absolute -bottom-24 -left-24 w-[320px] h-[320px] rounded-full bg-[#edad1a]/[0.04] blur-[70px]" />
          <div className="absolute -bottom-24 -right-24 w-[320px] h-[320px] rounded-full bg-[#021a36]/50 blur-[70px]" />
          <div className="absolute inset-0 opacity-[0.035]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.12) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.12) 1px,transparent 1px)", backgroundSize: "44px 44px" }} />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#edad1a]/40 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#edad1a]/20 to-transparent" />
        </div>

        <div className="relative max-w-5xl mx-auto px-6 sm:px-8 lg:px-12">
          {/* Header */}
          <FadeUp className="text-center mb-14">
            <span className="inline-flex items-center gap-2 text-[#edad1a] text-[12px] font-bold uppercase tracking-[0.3em] mb-4">
              <span className="w-6 h-px bg-[#edad1a]/60" />
              Testimonials
              <span className="w-6 h-px bg-[#edad1a]/60" />
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white">What Our Clients Say</h2>
            <p className="mt-3 text-white/45 text-sm max-w-md mx-auto">Trusted by industry leaders across Infrastructure, Construction &amp; Manufacturing Industry</p>
          </FadeUp>

          {/* Main carousel card */}
          <div className="relative">
            <AnimatePresence mode="wait">
              {testimonials.map((t, i) =>
                i === activeTestimonial ? (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="relative rounded-3xl bg-[#021a36]/70 backdrop-blur-md border border-white/[0.09] shadow-[0_32px_80px_-24px_rgba(0,0,0,0.65)] overflow-hidden"
                  >
                    {/* Gold top accent */}
                    <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#edad1a] via-[#f7c44a]/60 to-transparent" />

                    <div className="flex flex-col md:flex-row gap-0">
                      {/* LEFT — avatar panel */}
                      <div className="md:w-56 flex-shrink-0 flex flex-col items-center justify-center gap-4 p-8 md:p-10 md:border-r border-white/[0.08]">
                        {/* Avatar with gold ring */}
                        <div className="relative">
                          <div className="w-24 h-24 rounded-full overflow-hidden ring-[3px] ring-[#edad1a]/60 shadow-[0_0_28px_rgba(237,173,26,0.35)]">
                            <img src={t.image} alt={t.name} className="w-full h-full object-cover" />
                          </div>
                          <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-[#edad1a] flex items-center justify-center shadow-lg border-2 border-[#00274d]">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#00274d]" />
                          </div>
                        </div>
                        {/* Name + role */}
                        <div className="text-center">
                          <p className="text-white font-semibold text-sm leading-snug">{t.name}</p>
                          <p className="text-white/45 text-[10.5px] mt-1.5 leading-relaxed">{t.role}</p>
                        </div>
                        {/* Stars */}
                        <div className="flex gap-0.5">
                          {Array.from({ length: 5 }).map((_, j) => (
                            <Star key={j} className="w-3.5 h-3.5 text-[#edad1a] fill-[#edad1a]" />
                          ))}
                        </div>
                      </div>

                      {/* RIGHT — quote panel */}
                      <div className="flex-1 p-8 md:p-10 flex flex-col justify-center relative">
                        {/* Decorative large quote mark */}
                        <div aria-hidden className="absolute top-6 right-8 text-[#edad1a]/10 text-[100px] font-serif leading-none select-none pointer-events-none">"</div>
                        <blockquote className="relative text-white/80 text-base md:text-[16.5px] leading-[1.85] font-light">
                          "{t.text}"
                        </blockquote>
                        <div className="mt-6 w-10 h-[2px] bg-gradient-to-r from-[#edad1a] to-[#edad1a]/30 rounded-full" />
                      </div>
                    </div>
                  </motion.div>
                ) : null
              )}
            </AnimatePresence>

            {/* Prev / Next arrow buttons */}
            <button
              onClick={() => setActiveTestimonial(p => (p - 1 + testimonials.length) % testimonials.length)}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-5 w-10 h-10 rounded-full bg-[#00274d] border border-white/15 flex items-center justify-center text-white/60 hover:bg-[#edad1a] hover:border-[#edad1a] hover:text-[#00274d] transition-all duration-250 shadow-lg hidden md:flex"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setActiveTestimonial(p => (p + 1) % testimonials.length)}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-5 w-10 h-10 rounded-full bg-[#00274d] border border-white/15 flex items-center justify-center text-white/60 hover:bg-[#edad1a] hover:border-[#edad1a] hover:text-[#00274d] transition-all duration-250 shadow-lg hidden md:flex"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Avatar strip + mobile nav */}
          <div className="mt-10 flex flex-col items-center gap-5">
            {/* Avatar thumbnails */}
            <div className="flex items-center justify-center gap-2.5">
              {testimonials.map((t, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTestimonial(i)}
                  title={t.name}
                  className={`rounded-full overflow-hidden border-2 transition-all duration-300 ${
                    i === activeTestimonial
                      ? "border-[#edad1a] w-11 h-11 shadow-[0_0_14px_rgba(237,173,26,0.45)] opacity-100"
                      : "border-white/15 w-8 h-8 opacity-40 hover:opacity-70 hover:border-white/40"
                  }`}
                >
                  <img src={t.image} alt={t.name} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Mobile nav arrows */}
            <div className="flex items-center gap-3 md:hidden">
              <button onClick={() => setActiveTestimonial(p => (p - 1 + testimonials.length) % testimonials.length)}
                className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-white/50 hover:text-white transition-all">
                <ChevronLeft className="w-4 h-4" />
              </button>
              {testimonials.map((_, i) => (
                <button key={i} onClick={() => setActiveTestimonial(i)}
                  className={`rounded-full transition-all duration-300 ${i === activeTestimonial ? "bg-[#edad1a] w-5 h-1.5" : "bg-white/25 w-1.5 h-1.5 hover:bg-white/50"}`}
                />
              ))}
              <button onClick={() => setActiveTestimonial(p => (p + 1) % testimonials.length)}
                className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-white/50 hover:text-white transition-all">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── BLOG ──────────────────────────────────────── */}
      <section className="py-14 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex flex-col items-center text-center mb-14">
            <FadeUp>
              <span className="inline-flex items-center gap-2 text-[#edad1a] text-[12px] font-bold uppercase tracking-[0.3em] mb-4">
                <span className="w-6 h-px bg-[#edad1a]/60" />
                Blog
                <span className="w-6 h-px bg-[#edad1a]/60" />
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#00274d] max-w-2xl mx-auto leading-tight">
                Trends, Technologies & Developments in the Infrastructure, Construction & Manufacturing Industry
              </h2>
              <p className="text-[#00274d]/60 text-base md:text-lg max-w-2xl mx-auto mt-4">Empowering growth through knowledge, innovation, and insights</p>

            </FadeUp>

          </div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-7"
            variants={gridVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
          >
            {blogs.map((b, i) => (
              <motion.div key={i} variants={gridItem}>
                <Link href="/blog">
                  <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group h-full flex flex-col cursor-pointer">
                    <div className="overflow-hidden h-48 bg-gray-100">
                      <img src={b.img} alt={b.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="eager" />
                    </div>
                    <div className="p-5 flex flex-col flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-[10px] font-medium text-[#edad1a] bg-[#edad1a]/8 border border-[#edad1a]/15 px-2.5 py-1 rounded-full">{b.cat}</span>
                        <span className="text-gray-300 text-xs font-normal">{b.date}</span>
                      </div>
                      <h3 className="font-medium text-[#00274d] text-sm leading-snug mb-2 flex-1 line-clamp-2">{b.title}</h3>
                      <p className="text-gray-400 text-xs leading-relaxed font-normal line-clamp-2">{b.excerpt}</p>
                      <div className="flex items-center gap-1 mt-4 text-[#edad1a] text-xs font-medium">
                        Read More <ArrowRight className="w-3 h-3" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          <FadeUp delay={0.1} className="mt-12 text-left">
            <Link href="/blog">
              <button className="group inline-flex items-center gap-3 bg-[#edad1a] hover:bg-[#f7c44a] text-white font-semibold px-6 py-3 rounded-lg text-sm transition-all duration-300 shadow-[0_8px_28px_-8px_rgba(237,173,26,0.5)] hover:shadow-[0_14px_36px_-8px_rgba(237,173,26,0.6)] hover:-translate-y-0.5">
                All Articles <CtaArrow variant="dark" />
              </button>
            </Link>
          </FadeUp>
        </div>
      </section>


      {/* ── LOGO SHOWCASE (redesigned) ─────────────────── */}
    <section className="relative overflow-hidden bg-[#00274d] py-20">
        {/* subtle grid background */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.5]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.06) 1px,transparent 1px)", backgroundSize: "44px 44px" }} />
        <div className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-[60%] h-72 rounded-full bg-[#edad1a]/[0.08] blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-16">
          {[
            { title: "Trusted By", subtitle: "Chosen by the companies building India's National Infrastructure pipeline.", logos: trustedBy },
            { title: "Associations", subtitle: "We are Proud to be a part of", logos: associations },
            { title: "Our Financing Partners", subtitle: "Who help us drive innovation in the Supply Chain Financing", logos: financingPartners },
          ].map((block) => (
            <FadeUp key={block.title}>
              <div className="grid lg:grid-cols-12 gap-6 lg:gap-10 items-center">
                {/* Left title block */}
                <div className="lg:col-span-3 text-left">
                  <span className="inline-flex items-center gap-2 text-[#edad1a] text-[12px] font-bold uppercase tracking-[0.3em] mb-4">
                    <span className="w-6 h-px bg-[#edad1a]/60" />
                    {block.title}
                    <span className="w-6 h-px bg-[#edad1a]/60" />
                  </span>
                  <p className="text-white/75 text-base leading-relaxed max-w-xs">{block.subtitle}</p>
                </div>

                {/* Right logo marquee */}
                <div className="lg:col-span-9">
                  <div className="relative rounded-3xl bg-white border border-white/15 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.6)] p-4 md:p-5 overflow-hidden">
                    <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-[#edad1a] via-[#f7bc2e] to-transparent" />
                    <LogoMarquee logos={block.logos} />
                  </div>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>




      {/* ── PRICING PREVIEW ───────────────────────────── */}
      {/* Awards & Recognitions */}
      <section className="py-14 md:py-20 bg-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.5]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, rgba(0,39,77,0.12) 1px, transparent 0)", backgroundSize: "28px 28px" }} />
        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <FadeUp className="text-center mb-12">
            <span className="inline-flex items-center gap-2 text-[#edad1a] text-[12px] font-bold uppercase tracking-[0.3em] mb-4">
              <span className="w-6 h-px bg-[#edad1a]/60" />
              Awards & Recognitions
              <span className="w-6 h-px bg-[#edad1a]/60" />
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#00274d] mb-4">
              Recognized for Innovation, Impact, and Excellence
            </h2>

            <p className="text-gray-600 text-base font-normal max-w-2xl mx-auto">
              Vendor Infra has earned recognition from leading industry, technology, and entrepreneurship platforms for driving innovation and transforming the infrastructure ecosystem.
            </p>
          </FadeUp>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
            variants={gridVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
          >
            {awards.map((award) => (
              <motion.div key={award.name} variants={gridItem}>
                <div className="h-full rounded-2xl border border-[#00274d]/10 bg-[#00274d] p-5 hover:border-[#edad1a]/60 hover:bg-[#0a3463] hover:-translate-y-1 transition-all duration-300 shadow-lg shadow-[#00274d]/20">
                  <div className={`h-28 rounded-xl px-5 py-4 flex items-center justify-center overflow-hidden ${
                    award.dark ? "bg-black" : "bg-white"
                  }`}>
                    <img
                      src={award.image}
                      alt={award.name}
                      className="max-h-16 max-w-full object-contain"
                      loading="lazy"
                    />
                  </div>
                  <p className="text-[11px] font-semibold uppercase tracking-widest text-[#edad1a] mt-5 mb-2">
                    {award.label}
                  </p>
                  <h3 className="text-lg font-semibold text-white leading-snug">
                    {award.name}
                  </h3>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>


      <section className="py-14 md:py-20 bg-gray-50 border-y border-gray-100 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.45]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, rgba(0,39,77,0.12) 1px, transparent 0)", backgroundSize: "28px 28px" }} />
        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <FadeUp className="text-center mb-14">
            <span className="inline-flex items-center gap-2 text-[#edad1a] text-[12px] font-bold uppercase tracking-[0.3em] mb-4">
              <span className="w-6 h-px bg-[#edad1a]/60" />
              Pricing
              <span className="w-6 h-px bg-[#edad1a]/60" />
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#00274d] mb-4">
              Simple and <span className="text-[#edad1a]">flexible.</span>
            </h2>

            <p className="text-gray-500 text-base font-normal">Monthly pricing plans, billed annually.</p>
          </FadeUp>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            variants={gridVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
          >
            {homePricingPlans.map((plan) => (
              <motion.div key={plan.name} variants={gridItem}>
                <div className={`h-full rounded-2xl overflow-hidden flex flex-col border transition-all duration-300 hover:-translate-y-1 ${
                  plan.highlight
                    ? "bg-[#00274d] border-[#edad1a] shadow-2xl shadow-yellow-400/20"
                    : "bg-white border-gray-200 shadow-sm hover:shadow-md"
                }`}>
                  <div className={`p-7 ${plan.highlight ? "bg-[#00274d]" : "bg-white"}`}>
                    <span className={`inline-flex rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider mb-4 ${
                      plan.highlight ? "bg-[#edad1a] text-white" : "bg-gray-100 text-gray-500"
                    }`}>
                      {plan.tag}
                    </span>
                    <h3 className={`text-2xl font-bold mb-3 ${plan.highlight ? "text-white" : "text-[#00274d]"}`}>{plan.name}</h3>
                    <div className="flex items-baseline gap-2 mb-4">
                      {plan.ctaType === "contact" ? (
                        <button
                          type="button"
                          onClick={() => openContact(plan.name)}
                          className="inline-flex items-center justify-center rounded-xl bg-[#00274d] px-5 py-3 text-lg font-bold text-white shadow-md transition-colors hover:bg-[#003a73]"
                        >
                          {plan.price}
                        </button>
                      ) : (
                        <span className={`text-4xl font-extrabold tracking-tight ${plan.highlight ? "text-white" : "text-[#00274d]"}`}>{plan.price}</span>
                      )}
                      {plan.priceSuffix && <span className={`text-sm font-medium ${plan.highlight ? "text-white/60" : "text-gray-500"}`}>{plan.priceSuffix}</span>}
                    </div>
                    <p className={`text-sm leading-relaxed font-normal ${plan.highlight ? "text-white/65" : "text-gray-500"}`}>{plan.description}</p>
                  </div>
                  <div className={`h-px ${plan.highlight ? "bg-white/10" : "bg-gray-100"}`} />
                  <div className={`p-7 flex-1 flex flex-col ${plan.highlight ? "bg-[#00274d]" : "bg-white"}`}>
                  <ul className="space-y-3 mb-8 flex-1">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-3">
                        <span className={`mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full ${plan.highlight ? "bg-[#edad1a]/20" : "bg-[#edad1a]/10"}`}>
                          <CheckCircle2 className="h-3 w-3 text-[#edad1a]" />
                        </span>
                        <span className={`text-sm font-normal ${plan.highlight ? "text-white/85" : "text-gray-700"}`}>{f}</span>
                      </li>
                    ))}
                    {plan.excluded.map((f) => (
                      <li key={f} className="flex items-start gap-3">
                        <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-red-500/10">
                          <span className="text-xs font-bold text-red-500">×</span>
                        </span>
                        <span className={`text-sm font-normal ${plan.highlight ? "text-white/50" : "text-gray-500"}`}>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => {
                      if (plan.ctaType === "contact") openContact(plan.name);
                      else window.open(PORTAL_REGISTER_URL, "_blank", "noopener,noreferrer");
                    }}
                    className={`w-full py-3.5 rounded-xl text-sm font-semibold transition-all ${
                      plan.highlight
                        ? "bg-[#edad1a] text-white hover:bg-[#d4941a] shadow-lg shadow-yellow-500/30"
                        : "bg-[#00274d] text-white hover:bg-[#003a73] shadow-md shadow-[#00274d]/20"
                    }`}>
                    {plan.ctaType === "contact" ? "Contact Us" : "Get Started"}
                    </button>

                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
          <FadeUp className="mt-10 text-center flex justify-center">
            <Link href="/pricing">
              <button className="group inline-flex items-center justify-center gap-3 rounded-xl bg-[#edad1a] px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-yellow-500/20 transition-all hover:bg-[#d4941a]">
                View all pricing plans <CtaArrow variant="dark" />
              </button>
            </Link>
          </FadeUp>
        </div>
      </section>

      {/* ── CTA BANNER ────────────────────────────────── */}
      <section
        className="bg-[#edad1a] py-16 relative"
        style={{
          backgroundImage:
            "radial-gradient(rgba(0,39,77,0.18) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            {/* Get Started Today badge — PRICING-style, blue theme */}
            <div className="flex items-center justify-center gap-3 mb-5">
              <span className="h-px w-10 bg-[#00274d]/40" />
              <span className="text-xs md:text-sm font-bold tracking-[0.3em] text-[#00274d]">
                GET STARTED TODAY
              </span>
              <span className="h-px w-10 bg-[#00274d]/40" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#00274d] mb-3">
              Ready to Grow and Transform Your Business?
            </h2>
            <p className="text-[#00274d]/85 mb-6 text-sm md:text-base">
              Join <span className="font-semibold">32,000+</span> contractors, vendors, manufacturers, suppliers, and consultants already using Vendor Infra to discover new opportunities, streamline procurement, access plant and equipment solutions, and secure project financing and insurance—all through a single integrated platform.
            </p>
            <div className="flex flex-wrap gap-3 justify-center items-center">
              <Link href="/contact">
                <button className="group inline-flex items-center gap-2 bg-[#00274d] text-white font-semibold px-5 py-2.5 text-sm rounded-md hover:bg-[#003a73] transition-colors">
                  Get in Touch
                  <CtaArrow variant="blue" />
                </button>
              </Link>
              <Link href="/services">
                <button className="group inline-flex items-center gap-2 border border-[#00274d] text-[#00274d] font-medium px-5 py-2.5 text-sm rounded-md hover:bg-[#00274d] hover:text-white transition-colors">
                  Explore Services
                  <CtaArrow variant="blue" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>


      <Footer />
      <ContactSalesModal
        open={contactOpen}
        onClose={() => setContactOpen(false)}
        planName={contactPlan}
      />
    </div>
  );
}
