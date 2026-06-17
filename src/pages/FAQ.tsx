import { usePageSeo } from "@/lib/seo";
import { useState } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  BriefcaseBusiness,
  ChevronDown,
  HelpCircle,
  Mail,
  MessageSquare,
  Phone,
  Users,
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/layout/PageHero";
import { CtaArrow } from "@/components/CtaArrow";
import { siteButtonClasses } from "@/components/SiteButton";

const faqGroups = [
  {
    group: "For Vendors, Contractors, Suppliers, Manufacturers, Consultants",
    short: "Platform Users",
    icon: Users,
    faqs: [
      {
        q: "What are the benefits for vendors/suppliers joining Vendor Infra?",
        a: "Vendors gain visibility among infrastructure & construction project owners, access to multiple sectors, market exposure, opportunities for business growth, and integration into project supply-chains.",
      },
      {
        q: "How do I get support if I face issues or need help onboarding?",
        a: "Vendor Infra provides dedicated support and guidance to users to help them achieve goals and meet deadlines.",
      },
      {
        q: "How does the Plants & Equipment \u201chire or sale\u201d functionality work?",
        a: "List equipment for hire or sale and connect with project owners and contractors actively looking for plants & equipment. Optimize asset utilization and reduce idle machinery across sites.",
      },
      {
        q: "How is vendor reliability and data security handled?",
        a: "The platform emphasises verified vendors and high standards of data security \u2014 every vendor is vetted and ISO 27001-certified data security keeps your information protected.",
      },
      {
        q: "Is use of Vendor Infra free or paid?",
        a: "Registration is free, but full access to premium services typically requires a paid subscription. See our pricing page for the latest plans.",
      },
      {
        q: "What sectors does Vendor Infra cover?",
        a: "Vendor Infra covers 20+ infrastructure & construction sectors including Roads, Railways, Metros, Airports, Power, Oil & Gas, Water, Buildings, Mining, Smart Cities and more.",
      },
    ],
  },
  {
    group: "For Investors",
    short: "Investors",
    icon: BriefcaseBusiness,
    faqs: [
      {
        q: "What is the business model of Vendor Infra?",
        a: "Vendor Infra is an AI-powered operating system for the infrastructure, construction, and manufacturing industry. We connect all industry stakeholders on a single integrated platform, enabling contractors and businesses to discover verified vendors through AI-powered vendor discovery, access smart procurement, buy, hire, and sell plants & equipment through our AI-powered marketplace, secure project insurance, leverage AI-powered market intelligence, find subcontracting opportunities, and drive business growth—all while reducing costs, improving efficiency, and accelerating growth.",
      },
      {
        q: "What problem is Vendor Infra solving in the infrastructure industry?",
        a: "It addresses inefficiencies such as fragmented vendor discovery, limited access to competitive quotes, under-utilised equipment assets, slow procurement, vendor unavailability risk, and the need for integrated project intelligence.",
      },
      {
        q: "What is the market opportunity and target audience?",
        a: "The platform targets vendors, suppliers, contractors, developers and project owners in the infrastructure and construction sectors across many sub-sectors. The infrastructure market in India and globally presents significant growth potential for digital tools.",
      },
      {
        q: "How can interested investors engage with Vendor Infra?",
        a: "Investors can reach out through our Contact Us page. Our Investor Relations team will get in touch with you to discuss potential investment opportunities and the next steps.",
      },
    ],
  },
];

function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.04 }}
      className={`group rounded-2xl overflow-hidden bg-white border border-l-4 border-l-[#00274d] transition-all duration-300 ${
  open
    ? "border-[#edad1a]/60 shadow-[0_18px_40px_-22px_rgba(237,173,26,0.45)]"
    : "border-gray-200 hover:border-[#00274d]/30 hover:shadow-md"
}`}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-5 p-5 md:p-6 text-left"
      >
        <span
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm font-bold transition-colors ${
            open
              ? "bg-[#edad1a] text-white"
              : "bg-[#00274d]/5 text-[#00274d] group-hover:bg-[#00274d] group-hover:text-white"
          }`}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="flex-1 font-semibold text-[#00274d] text-[15px] md:text-base leading-snug">
          {q}
        </span>
        <span
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all ${
            open
              ? "bg-[#00274d] border-[#00274d] text-white rotate-180"
              : "bg-white border-gray-200 text-[#00274d]"
          }`}
        >
          <ChevronDown className="w-4 h-4" />
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="px-5 md:px-6 pb-6 pl-[76px] md:pl-[80px]">
              <div className="border-l-2 border-[#edad1a]/60 pl-4">
                <p className="text-gray-600 text-sm md:text-[15px] leading-relaxed">{a}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  usePageSeo(
    "FAQ | Vendor Infra",
    "Answers to frequently asked questions about the Vendor Infra platform, pricing, vendor discovery, and material procurement."
  );

  const [activeTab, setActiveTab] = useState(0);
  const [query, setQuery] = useState("");

  const activeGroup = faqGroups[activeTab];
  const filteredFaqs = activeGroup.faqs.filter(
    (f) =>
      query.trim() === "" ||
      f.q.toLowerCase().includes(query.toLowerCase()) ||
      f.a.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col">
          {/* <div className="fixed right-0 top-0 h-full w-[18px] bg-[#00274d] z-50 pointer-events-none" /> */}
    <div className="fixed right-0 top-0 h-full w-[18px] bg-[#00274d] z-50 pointer-events-none" />

      <Navbar />
      <PageHero eyebrow="FAQ" title="Answers to your most common questions" />


      <section className="py-16 md:py-20 bg-gradient-to-b from-[#f6f8fb] to-white flex-1">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
            {faqGroups.map((g, i) => {
              const Icon = g.icon;
              const active = activeTab === i;
              return (
                <button
                  key={g.group}
                  onClick={() => setActiveTab(i)}
                  className={`group inline-flex items-center gap-3 rounded-full px-5 py-3 text-sm font-semibold transition-all border ${
                    active
                      ? "bg-[#00274d] text-white border-[#00274d] shadow-lg shadow-[#00274d]/25"
                      : "bg-white text-[#00274d] border-gray-200 hover:border-[#edad1a]/60"
                  }`}
                >
                  <span
                    className={`flex h-7 w-7 items-center justify-center rounded-full ${
                      active ? "bg-[#edad1a] text-white" : "bg-[#edad1a]/10 text-[#edad1a]"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </span>
                  {g.short}
                  {/* <span
                    className={`text-[11px] font-bold rounded-full px-2 py-0.5 ${
                      active ? "bg-white/15 text-white" : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {g.faqs.length}
                  </span> */}
                </button>
              );
            })}
          </div>

          <div className="grid lg:grid-cols-[1fr_320px] gap-8 items-start">
            {/* List */}
            <div>
              <motion.div
                key={activeTab + query}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="mb-6"
              >
                <span className="inline-flex items-center gap-3 text-[#edad1a] text-[12px] font-bold uppercase tracking-[0.3em] mb-2">
                  <span className="w-6 h-px bg-[#edad1a]/60" />
                  {activeGroup.short}
                  <span className="w-6 h-px bg-[#edad1a]/60" />
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-[#00274d] leading-tight">
                  {activeGroup.group}
                </h2>
              </motion.div>

              <div className="space-y-3">
                {filteredFaqs.length === 0 ? (
                  <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-10 text-center">
                    <HelpCircle className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                    <p className="text-[#00274d] font-semibold">No matches found</p>
                    <p className="text-sm text-gray-500 mt-1">Try a different keyword or clear your search.</p>
                  </div>
                ) : (
                  filteredFaqs.map((faq, i) => (
                    <FAQItem key={faq.q} q={faq.q} a={faq.a} index={i} />
                  ))
                )}
              </div>
            </div>

            {/* Help card */}
            <aside className="lg:sticky lg:top-28 space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative rounded-2xl overflow-hidden text-white p-6 shadow-xl shadow-[#00274d]/15"
                style={{
                  background:
                    "linear-gradient(140deg, #00274d 0%, #0a3b73 55%, #edad1a 130%)",
                }}
              >
                <div className="absolute inset-0 opacity-[0.1]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)", backgroundSize: "22px 22px" }} />
                <div className="relative">
                  <div className="w-12 h-12 rounded-xl bg-white/15 backdrop-blur flex items-center justify-center mb-5">
                    <MessageSquare className="w-6 h-6 text-[#edad1a]" />
                  </div>
                  <h3 className="text-xl font-bold leading-snug mb-2">Still have questions?</h3>
                  <p className="text-white/80 text-sm leading-relaxed mb-5">
                    Our team is ready to help with onboarding, pricing, vendor discovery, procurement, and investor enquiries.
                  </p>
                  <Link
                    href="/contact"
                    className={siteButtonClasses("primary", "w-full px-4 py-2.5 normal-case tracking-normal")}
                  >
                    Contact Us <CtaArrow variant="dark" />
                  </Link>
                </div>
              </motion.div>

              <div className="rounded-2xl bg-white border border-gray-100 p-5 shadow-sm">
                <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#edad1a] mb-4">Reach us directly</p>
                <a href="tel:+918800119885" className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                  <span className="w-9 h-9 rounded-lg bg-[#00274d]/5 flex items-center justify-center text-[#00274d]"><Phone className="w-4 h-4" /></span>
                  <span>
                    <span className="block text-xs text-gray-500">Call</span>
                    <span className="block text-sm font-semibold text-[#00274d]">+91-8800119885</span>
                  </span>
                </a>
                <a href="mailto:enquiry@vendorinfra.com" className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                  <span className="w-9 h-9 rounded-lg bg-[#00274d]/5 flex items-center justify-center text-[#00274d]"><Mail className="w-4 h-4" /></span>
                  <span>
                    <span className="block text-xs text-gray-500">Email</span>
                    <span className="block text-sm font-semibold text-[#00274d]">enquiry@vendorinfra.com</span>
                  </span>
                </a>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
