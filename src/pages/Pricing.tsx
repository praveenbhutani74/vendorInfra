import { useState } from "react";
import { usePageSeo } from "@/lib/seo";
import { motion } from "framer-motion";
import { Check, X } from "lucide-react";

function FeatureLabel({ text }: { text: string }) {
  // Highlight any "(...)" parenthetical in yellow
  const parts = text.split(/(\([^)]*\))/g);
  return (
    <>
      {parts.map((p, i) =>
        p.startsWith("(") && p.endsWith(")") ? (
          <span key={i} className="text-[#edad1a] font-semibold">{p}</span>
        ) : (
          <span key={i}>{p}</span>
        )
      )}
    </>
  );
}
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ContactSalesModal } from "@/components/ContactSalesModal";
import { Link } from "wouter";
import { SiteButton } from "@/components/SiteButton";

const PORTAL_REGISTER_URL = "http://3.110.208.157/customer/";

type Plan = {
  name: string;
  tag: string;
  badge: string | null;
  price: string;
  priceSuffix?: string;
  description: string;
  highlight: boolean;
  features: string[];
  excluded?: string[];
  ctaType: "register" | "contact";
};

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

function PlanCard({
  plan,
  index,
  onContact,
}: {
  plan: Plan;
  index: number;
  onContact: (planName: string) => void;
}) {
  const isContact = plan.ctaType === "contact";
  const ctaLabel = isContact ? "Contact Us" : "Get Started";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className={`relative flex flex-col rounded-2xl overflow-hidden h-full bg-white border border-[#00274d] shadow-md ${
        plan.highlight
          ? "shadow-2xl shadow-yellow-400/20 ring-2 ring-[#edad1a]"
          : "shadow-md ring-1 ring-gray-200"
      }`}
    >
      <div className={`px-8 pt-8 pb-6 ${plan.highlight ? "bg-[#00274d]" : "bg-white"}`}>
        {plan.badge ? (
          <span className="inline-block mb-3 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#edad1a] text-white">
            {plan.badge}
          </span>
        ) : (
          <span
            className={`inline-block mb-3 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${
              plan.highlight ? "bg-white/10 text-white/70" : "bg-gray-100 text-gray-500"
            }`}
          >
            {plan.tag}
          </span>
        )}
       <div className="flex items-center gap-8 mb-4">
  <h3
    className={`text-2xl font-bold ${
      plan.highlight ? "text-white" : "text-[#00274d]"
    }`}
  >
    {plan.name}
  </h3>

  {isContact ? (
    <button
      type="button"
      onClick={() => onContact(plan.name)}
      className={`inline-flex items-center justify-center rounded-xl px-5 py-3 text-lg font-bold transition-all ${
        plan.highlight
          ? "bg-[#edad1a] text-white hover:bg-[#d4941a]"
          : "bg-[#00274d] text-white hover:bg-[#003a73]"
      }`}
    >
      {plan.price}
    </button>
  ) : (
    <div className="flex items-baseline gap-1">
      <span
        className={`text-4xl font-extrabold tracking-tight ${
          plan.highlight ? "text-white" : "text-[#00274d]"
        }`}
      >
        {plan.price}
      </span>

      {plan.priceSuffix && (
        <span
          className={`text-sm font-medium ${
            plan.highlight ? "text-white/60" : "text-gray-500"
          }`}
        >
          {plan.priceSuffix}
        </span>
      )}
    </div>
  )}
</div>

        <p className={`text-sm leading-snug ${plan.highlight ? "text-white/65" : "text-gray-500"}`}>
          {plan.description}
        </p>
      </div>

      {/* <div className={`h-px ${plan.highlight ? "bg-white/10" : "bg-gray-100"}`} />
       */}
<div className={`h-px ${plan.highlight ? "bg-white/10" : "bg-[#00274d]"}`} />
       {/* plan.highlight ? "bg-[#00274d]" : "bg-gray-100" */}

      <div className={`px-8 py-6 flex-1 flex flex-col ${plan.highlight ? "bg-[#00274d]" : "bg-white"}`}>
        <ul className="space-y-3 flex-1 mb-8">
          {plan.features.map((f) => (
            <li key={f} className="flex items-start gap-3">
              <span
                className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${
                  plan.highlight ? "bg-[#edad1a]/20" : "bg-[#edad1a]/10"
                }`}
              >
                <Check className="w-3 h-3 text-[#edad1a]" />
              </span>
              <span className={`text-sm ${plan.highlight ? "text-white/85" : "text-gray-700"}`}>
                <FeatureLabel text={f} />
              </span>
            </li>
          ))}
          {plan.excluded?.map((f) => (
            <li key={f} className="flex items-start gap-3">
              <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center bg-red-500/10">
                <X className="w-3 h-3 text-red-500" />
              </span>
              <span className={`text-sm ${plan.highlight ? "text-white/50" : "text-gray-500"}`}>
                <FeatureLabel text={f} />
              </span>
            </li>
          ))}
        </ul>

        <button
          onClick={() => {
            if (isContact) {
              onContact(plan.name);
            } else {
              window.open(PORTAL_REGISTER_URL, "_blank", "noopener,noreferrer");
            }
          }}
          className={`block w-full text-center font-semibold py-3.5 px-6 rounded-xl transition-all duration-200 text-sm ${
            plan.highlight
              ? "bg-[#edad1a] text-white hover:bg-[#d4941a] shadow-lg shadow-yellow-500/20"
              : "bg-[#00274d] text-white hover:bg-[#003a73]"
          }`}
        >
          {ctaLabel}
        </button>
      </div>
    </motion.div>
  );
}

function PricingSection({
  id,
  label,
  heading,
  plans,
  onContact,
  variant = "light",
}: {
  id?: string;
  label: string;
  heading: string;
  plans: Plan[];
  onContact: (planName: string) => void;
  variant?: "light" | "dark";
}) {
  const isDark = variant === "dark";
  return (
    <section
      id={id}
      className={`scroll-mt-24 py-20 border-t ${
        isDark ? "bg-[#00274d] border-[#00274d]" : "bg-white border-gray-200"
      }`}
    >
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-4"
        >
          <span className="inline-flex items-center gap-2 text-[#edad1a] text-[12px] font-bold uppercase tracking-[0.3em]">
            <span className="w-6 h-px bg-[#edad1a]/60" />
            {label}
            <span className="w-6 h-px bg-[#edad1a]/60" />
          </span>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.05 }}
          className={`text-3xl md:text-4xl font-bold text-center mb-4 ${
            isDark ? "text-white" : "text-[#00274d]"
          }`}
        >
          {heading}
        </motion.h2>
        <p className={`text-center text-sm mb-12 ${isDark ? "text-white/60" : "text-gray-500"}`}>
          All pricing plans are monthly pricing plans, billed annually.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {plans.map((plan, i) => (
            <PlanCard key={plan.name} plan={plan} index={i} onContact={onContact} />
          ))}
        </div>
      </div>
    </section>
  );
}

const contractorPlans: Plan[] = [
  {
    name: "Basic",
    tag: "Starter",
    badge: null,
    price: "₹7,999",
    priceSuffix: "/month",
    description: "For companies ready to digitize, optimize, and grow",
    highlight: false,
    features: [
      "AI-Powered Vendor Discovery (Upto 3 Sectors)",
      "Price Discovery (Upto 3 Sectors)",
      "Smart Material Procurement",
      "AI-Powered Plants & Equipment Marketplace",
      "Smart Project Financing & Insurance",
      "Unified Analytics Dashboard",
      "AI-Enabled Sector Intelligence & SOR",
      "Intelligent Industry Updates",
      "Tender Services",
      "User Login (Single)",
      "Basic Support",
    ],
    excluded: ["Dedicated Account Manager"],
    ctaType: "register",
  },
  {
    name: "Plus",
    tag: "Most Popular",
    badge: "Most Popular",
    price: "₹9,999",
    priceSuffix: "/month",
    description: "For growing contractors who need wider sector coverage",
    highlight: true,
    features: [
      "AI-Powered Vendor Discovery (Upto 10 Sectors)",
      "Price Discovery (Upto 10 Sectors)",
      "Smart Material Procurement",
      "AI-Powered Plants & Equipment Marketplace",
      "Smart Project Financing & Insurance",
      "Unified Analytics Dashboard",
      "AI-Enabled Sector Intelligence & SOR",
      "Intelligent Industry Updates",
      "Tender Services",
      "User Login (1+3)",
      "Priority Support",
      "Dedicated Account Manager",
    ],
    ctaType: "register",
  },
  {
    name: "Premium",
    tag: "Enterprise",
    badge: null,
    price: "Contact Us",
    description: "Enterprise-grade access for large EPC organisations",
    highlight: false,
    features: [
      "AI-Powered Vendor Discovery (20+ Sectors)",
      "Price Discovery (20+ Sectors)",
      "Smart Material Procurement",
      "AI-Powered Plants & Equipment Marketplace",
      "Smart Project Financing & Insurance",
      "Unified Analytics Dashboard",
      "AI-Enabled Sector Intelligence & SOR",
      "Intelligent Industry Updates",
      "Tender Services",
      "User Login (Unlimited)",
      "Priority Support",
      "Dedicated Account Manager",
    ],
    ctaType: "contact",
  },
];

const vendorPlans: Plan[] = [
  {
    name: "Basic",
    tag: "Starter",
    badge: null,
    price: "₹7,999",
    priceSuffix: "/month",
    description: "Unlock new opportunities and accelerate business growth",
    highlight: false,
    features: [
      "Smart Profile",
      "Search Multiple Projects (Upto 3 Sectors)",
      "Quote Projects & RFPs",
      "Smart Material Procurement",
      "Smart Project Insurance",
      "AI-Powered Plants & Equipment Marketplace",
      "AI-Enabled Sector Intelligence & SOR",
      "Intelligent Industry Updates",
      "User Login (Single)",
      "Basic Support",
    ],
    excluded: ["Dedicated Account Manager"],
    ctaType: "register",
  },
  {
    name: "Plus",
    tag: "Most Popular",
    badge: "Most Popular",
    price: "₹9,999",
    priceSuffix: "/month",
    description: "Expand reach across more sectors and projects",
    highlight: true,
    features: [
      "Smart Profile",
      "Search Multiple Projects (Upto 10 Sectors)",
      "Quote Projects & RFPs",
      "Smart Material Procurement",
      "Smart Project Insurance",
      "AI-Powered Plants & Equipment Marketplace",
      "AI-Enabled Sector Intelligence & SOR",
      "Intelligent Industry Updates",
      "User Login (1+3)",
      "Priority Support",
      "Dedicated Account Manager",
    ],
    ctaType: "register",
  },
  {
    name: "Premium",
    tag: "Enterprise",
    badge: null,
    price: "Contact Us",
    description: "Full platform access for established vendors",
    highlight: false,
    features: [
      "Smart Profile",
      "Search Multiple Projects (20+ Sectors)",
      "Quote Projects & RFPs",
      "Smart Material Procurement",
      "Smart Project Insurance",
      "AI-Powered Plants & Equipment Marketplace",
      "AI-Enabled Sector Intelligence & SOR",
      "Intelligent Industry Updates",
      "User Login (Unlimited)",
      "Priority Support",
      "Dedicated Account Manager",
    ],
    ctaType: "contact",
  },
];

const bothPlans: Plan[] = [
  {
    name: "Basic",
    tag: "Starter",
    badge: null,
    price: "₹11,999",
    priceSuffix: "/month",
    description: "For companies operating as both contractor and vendor",
    highlight: false,
    features: [
      "AI-Powered Vendor Discovery (Upto 3 Sectors)",
      "Price Discovery (Upto 3 Sectors)",
      "Smart Material Procurement",
      "AI-Powered Plants & Equipment Marketplace",
      "Smart Project Financing & Insurance",
      "Unified Analytics Dashboard",
      "AI-Enabled Sector Intelligence & SOR",
      "Intelligent Industry Updates",
      "Tender Services",
      "User Login (Single)",
      "Basic Support",
    ],
    excluded: ["Dedicated Account Manager"],
    ctaType: "register",
  },
  {
    name: "Plus",
    tag: "Best Value",
    badge: "Best Value",
    price: "₹14,999",
    priceSuffix: "/month",
    description: "Best for mid-size firms active on both sides of the market",
    highlight: true,
    features: [
      "AI-Powered Vendor Discovery (Upto 10 Sectors)",
      "Price Discovery (Upto 10 Sectors)",
      "Smart Material Procurement",
      "Buy, Sell & Hire Plants & Equipment (AI-Powered)",
      "Smart Project Financing & Insurance",
      "Unified Analytics Dashboard",
      "AI-Enabled Sector Intelligence & SOR",
      "Intelligent Industry Updates",
      "Tender Services",
      "User Login (1+3)",
      "Priority Support",
      "Dedicated Account Manager",
    ],
    ctaType: "register",
  },
  {
    name: "Premium",
    tag: "Enterprise",
    badge: null,
    price: "Contact Us",
    description: "Unlimited enterprise access across all platform features",
    highlight: false,
    features: [
      "AI-Powered Vendor Discovery (20+ Sectors)",
      "Price Discovery (20+ Sectors)",
      "Smart Material Procurement",
      "Buy, Sell & Hire Plants & Equipment (AI-Powered)",
      "Smart Project Financing & Insurance",
      "Unified Analytics Dashboard",
      "AI-Enabled Sector Intelligence & SOR",
      "Intelligent Industry Updates",
      "Tender Services",
      "User Login (Unlimited)",
      "Priority Support",
      "Dedicated Account Manager",
    ],
    ctaType: "contact",
  },
];

export default function Pricing() {
  usePageSeo(
    "Pricing Plans | Vendor Infra",
    "Clear and transparent pricing for contractors and vendors. Monthly plans billed annually."
  );

  const [contactOpen, setContactOpen] = useState(false);
  const [contactPlan, setContactPlan] = useState<string | undefined>(undefined);

  const openContact = (planName: string) => {
    setContactPlan(planName);
    setContactOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero */}
      <section data-preserve-hero-typography className="relative bg-[#00274d] text-white py-24 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="container mx-auto px-4 text-center relative z-10 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 rounded-full border border-[#edad1a]/40 bg-[#edad1a]/10 px-4 py-2 text-sm font-semibold text-[#edad1a] mb-6"
          >
            Pricing Plans
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-semibold leading-tight tracking-tight mb-4"
          >
            Clear and transparent pricing
          </motion.h1>
        </div>
      </section>

      <PricingSection
        id="contractors"
        label="For Contractors"
        heading="Pricing for Contractors"
        plans={contractorPlans}
        onContact={openContact}
      />
      <PricingSection
        id="vendors"
        label="For Vendors"
        heading="Pricing for Vendors"
        plans={vendorPlans}
        onContact={openContact}
        variant="dark"
      />
      <PricingSection
        id="contractors-vendors"
        label="For Both"
        heading="Pricing for Contractors & Vendors"
        plans={bothPlans}
        onContact={openContact}
      />

      {/* FAQ */}
   <section className="py-24 bg-[#00274d] relative overflow-hidden">
  <div className="absolute inset-0 opacity-[0.06] bg-[radial-gradient(circle_at_1px_1px,#ffffff_1px,transparent_0)] bg-[size:28px_28px]" />

  <div className="container mx-auto px-4 max-w-4xl relative z-10">
    <FadeUp className="text-center mb-14">
      <span className="inline-flex items-center gap-2 text-[#edad1a] text-[12px] font-bold uppercase tracking-[0.3em] mb-4">
        <span className="w-6 h-px bg-[#edad1a]/60" />
        FAQ
        <span className="w-6 h-px bg-[#edad1a]/60" />
      </span>

      <h2 className="text-3xl md:text-4xl font-bold leading-tight text-white max-w-3xl mx-auto">
        Explore Answers To Frequently Asked Questions
      </h2>

      {/* <p className="mt-5 text-white/70 max-w-2xl mx-auto">
        Everything you need to know about Vendor Infra, pricing,
        onboarding, and platform features.
      </p> */}
    </FadeUp>

    <div className="space-y-5">
      {[
        {
          q: "How is billing handled?",
          a: "All listed plans are monthly pricing plans billed annually. You pay once for the year and receive the discounted monthly rate.",
        },
        {
          q: "Can I switch plans later?",
          a: "Yes. You can upgrade or downgrade your subscription at any time. Our support team will help you transition smoothly.",
        },
        {
          q: "How do I get started?",
          a: "Click Get Started on your preferred plan to register. For Premium plans, our team will contact you with a customized proposal.",
        },
        {
          q: "Do you offer volume or enterprise discounts?",
          a: "Yes. Organizations with large procurement requirements or multiple business entities can request a custom enterprise quotation.",
        },
      ].map(({ q, a }) => (
        <details
          key={q}
          className="group rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:border-[#edad1a]/40"
        >
          <summary className="flex items-center justify-between cursor-pointer px-7 py-6 text-white font-semibold text-base list-none">
            <span>{q}</span>

            <span className="ml-4 flex h-8 w-8 items-center justify-center rounded-full bg-[#edad1a]/15 text-[#edad1a] group-open:rotate-180 transition-transform duration-300">
              ▾
            </span>
          </summary>

          <div className="px-7 pb-6 pt-2 border-t border-white/10 text-white/75 leading-7">
            {a}
          </div>
        </details>
      ))}
    </div>
  </div>
</section>

      {/* CTA */}
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
              {/* <span className="h-px w-10 bg-[#00274d]/40" /> */}
              {/* <span className="text-xs md:text-sm font-bold tracking-[0.3em] text-[#00274d]">
                GET STARTED TODAY
              </span> */}
              {/* <span className="h-px w-10 bg-[#00274d]/40" /> */}
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#00274d] mb-3">
            Not sure which plan is right for you?
            </h2>
            <p className="text-[#00274d]/85 mb-6 text-sm md:text-base">
               Our experts will help you choose the right plan for your business and walk you through everything.
            </p>
            <div className="flex flex-wrap gap-3 justify-center items-center">
              <Link href="/contact">
                <SiteButton variant="onGold" className="normal-case tracking-normal">
                  Contact Us
                </SiteButton>
              </Link>
              {/* <Link href="/services">
                <button className="group inline-flex items-center gap-2 border border-[#00274d] text-[#00274d] font-medium px-5 py-2.5 text-sm rounded-md hover:bg-[#00274d] hover:text-white transition-colors">
                  Explore Services
                  <CtaArrow variant="blue" />
                </button>
              </Link> */}
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
