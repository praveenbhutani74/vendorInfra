import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import {
  Search, Calculator, Tractor, Package,
  ShieldCheck, Briefcase, BarChart3, Factory,
  CheckCircle2, ChevronDown, ArrowRight,
  Star, Layers, BarChart, Shield, Zap, Globe, Play
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SiteButton } from "@/components/SiteButton";

const PORTAL_LOGIN_URL = "http://3.110.208.157/customer/";

const services = [
  {
    title: "AI-Powered Vendor Discovery",
    icon: Search,
    image: "/images/services/ai-vendor-discovery.jpg",
    imageAlt: "AI vendor discovery platform",
    flip: false,
    href: PORTAL_LOGIN_URL,
    points: [
      {
        label: "Multiple Vendors",
        desc: "Search and compare multiple verified vendors for every single item in your Bill of Quantities to ensure the right selection."
      },
      {
        label: "Vendor by rating",
        desc: "Find and choose vendors based on their past performance, reliability, and verified ratings."
      },
      {
        label: "Vendor by Size and Capability",
        desc: "Select the most suitable vendor by evaluating their company profile, size, and operational capability to match your project needs."
      }
    ]
  },
  {
    title: "Smart Price Discovery",
    icon: Calculator,
    image: "/images/services/smart-price-discovery.jpg",
    imageAlt: "Smart price discovery and quotation",
    flip: true,
    href: PORTAL_LOGIN_URL,
    points: [
      {
        label: "Hassle Free Management",
        desc: "Easily track all vendor responses, manage communications, and access your account anytime, anywhere."
      },
      {
        label: "Multiple Quotes",
        desc: "Send instant proposals or receive multiple quotes to identify the best service or supplier at the right price."
      },
      {
        label: "Easy View Dashboard",
        desc: "Get an intuitive dashboard to view vendor and supplier profiles along with detailed comparison reports for smarter decisions."
      }
    ]
  },
  {
    title: "AI-Powered Plants & Equipment",
    icon: Tractor,
    image: "/images/services/plants-equipment-marketplace.png",
    imageAlt: "Plants and heavy equipment marketplace",
    flip: false,
    href: PORTAL_LOGIN_URL,
    points: [
      {
        label: "Search",
        desc: "Quickly find plants and equipment by brand, category, or location from our extensive database."
      },
      {
        label: "List Your Idle Plants & Equipment",
        desc: "List your idle or unused plants and equipment for short-term or long-term use to maximize asset utilization."
      },
      {
        label: "Buy, Sell, or Hire Plants & Equipment",
        desc: "Easily buy, sell, or hire verified plants and equipment through a secure and transparent process."
      }
    ]
  },
  {
    title: "Smart Material Procurement",
    icon: Package,
    image: "/images/services/smart-material-procurement.jpg",
    imageAlt: "Smart material procurement for construction",
    flip: true,
     href: "/materials",
    points: [
      {
        label: "One-Stop Solution for All Raw Material Needs",
        desc: "Fulfill all your raw material requirements through our comprehensive B2B platform designed for the Infrastructure, Construction & Manufacturing industry."
      },
      {
        label: "Value Chain Integration",
        desc: "Our value chain integration connects you with reliable suppliers to meet every material requirement efficiently."
      },
      {
        label: "Right Material & Wide Range",
        desc: "Choose from a wide range of raw material categories — get the right size, finish, and quantity tailored to your project needs."
      }
    ]
  },
  {
    title: "Contract Manufacturing",
    icon: Factory,
    image: "/contract-manufacturing-ai.jpg",
    imageAlt: "Contract manufacturing production facility",
    href: "/contract-manufacturing",
    flip: false,
    points: [
      {
        label: "End-to-End Manufacturing",
        desc: "Manage the complete manufacturing lifecycle—from sourcing and production to quality control and final delivery."
      },
      {
        label: "Production Tracking & Control",
        desc: "Monitor production in real time with milestone-based tracking, proactive alerts, and complete operational visibility."
      },
      {
        label: "Quality & Logistics Management",
        desc: "Maintain consistent product quality while ensuring seamless logistics coordination and on-time fulfillment."
      }
    ]
  },
  {
    title: "Smart Project Insurance",
    icon: ShieldCheck,
    image: "/images/services/insurance.png",
    imageAlt: "Smart project insurance and protection",
    flip: false,
      href: "/contact",
    points: [
      {
        label: "Project Insurance",
        desc: "Get attractive rates and customized quotes for Project Insurance such as CAR, EAR, and Workmen Compensation from reputed insurers."
      },
      {
        label: "Plants & Equipment Insurance",
        desc: "Access specialized insurance plans for plants and equipment from trusted insurance partners at competitive rates."
      },
      {
        label: "Raw Material Insurance",
        desc: "Protect your materials with comprehensive insurance coverage from leading and reliable insurance companies."
      }
    ]
  },
  {
    title: "AI Powered Enterprise Services",
    icon: Briefcase,
    image: "/images/services/ai-enterprise-services.jpg",
    imageAlt: "Enterprise services and business growth",
    flip: true,
     href: "/contact",
    points: [
      {
        label: "Subcontracting",
        desc: "We help companies subcontract their projects effectively by connecting them with technically and financially sound contractors suited to their scale and capability."
      },
      {
        label: "Growth",
        desc: "We assist small and mid-sized companies in organizational restructuring, team development, and creating growth strategies for scaling and diversification."
      },
      {
        label: "Market Entry",
        desc: "We support global companies in setting up and expanding their business in India through deep market knowledge, optimal sourcing, and value chain integration."
      }
    ]
  },
  {
    title: "Other Services",
    icon: BarChart3,
    image: "/images/services/otherServices.png",
    imageAlt: "Sector intelligence and SOR data analytics",
    flip: false,
    points: [
      {
        label: "Projects & Tender Updates",
        desc: "Stay updated with the latest projects and tender announcements across major infrastructure and construction sectors."
      },
      {
        label: "Sector Intelligence",
        desc: "Access insights such as sector overviews, client and ministry data, sample PQs, tender information, and contractor/project listings to support diversification."
      },
      {
        label: "Schedule of Rates ( SOR)",
        desc: "Subscribers gain access to over 75+ Schedules of Rates (SOR) and current market rates to assist in accurate estimation, budgeting, and cost benchmarking."
      }
    ]
  }
];

const advantages = [
  { icon: Layers,        title: "All-in-One Platform for entire Value Chain", desc: "Manage vendor discovery, price comparison, procurement, insurance, and enterprise services — all in one place." },
  { icon: CheckCircle2,  title: "Verified Vendors and transparent selection", desc: "Connect only with verified and rated vendors to ensure reliability, quality, and trust in every transaction." },
  { icon: Star,          title: "Best quote every time for your project", desc: "Get multiple quotes instantly and choose the most cost-effective option for your project needs." },
  { icon: Zap,           title: "Simplified Procurement process", desc: "Save time and effort with a streamlined, hassle-free process for material sourcing and vendor management." },
  { icon: BarChart,      title: "End-to-End Material Management", desc: "Access a wide range of raw materials and fulfill all requirements through integrated value chain services." },
  { icon: Tractor,       title: "Smart Equipment utilization", desc: "Buy, sell, hire, or rent plants and equipment easily — or list idle assets to generate extra income" },
  { icon: Shield,        title: "Complete Project protection", desc: "Secure your projects, materials, and machinery with the best insurance rates from top-rated companies." },
  { icon: Globe,         title: "AI-ML driven Platform", desc: "AI-ML powered platform that transforms how infrastructure stakeholders discover, evaluate, and collaborate." },
];

const faqs = [
  {
    q: "Is Vendor Infra powered by technology like AI and ML?",
    a: "Yes. Vendor Infra is an AI and ML-driven platform, providing intelligent recommendations, data analytics, and performance insights to help you make smarter, faster, and more profitable business decisions."
  },
  {
    q: "How can Vendor Infra support my company's growth and expansion?",
    a: "Through our Enterprise Services, we assist in subcontracting, business restructuring, diversification, and market entry strategies. Whether you're a mid-size company looking to grow or a global firm entering India, we help you scale confidently."
  },
  {
    q: "How does the Plants & Equipment service work?",
    a: "You can list your idle plants and equipment on the portal for buy, sell, or hire. Companies and contractors can search by brand, category, or location and choose equipment as per their requirements."
  },
  {
    q: "Is Vendor Infra suitable for both small and large companies?",
    a: "Yes. Vendor Infra supports small, mid-size, and large companies through vendor discovery, procurement, plants and equipment, insurance, financing, enterprise services, and sector intelligence across infrastructure and construction."
  },
];

const VIDEO_ID = "tn81mJqaeEM";

function FadeUp({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.22, 1, 0.36, 1] as const
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-gray-50 transition-colors"
      >
        <span className="font-semibold text-[#00274d] pr-4">{q}</span>
        <ChevronDown className={`w-5 h-5 text-[#edad1a] shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <p className="px-6 pb-5 text-gray-500 leading-relaxed text-sm">{a}</p>
      </motion.div>
    </div>
  );
}

function VideoPlayer() {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 aspect-video bg-black">
      {playing ? (
        <iframe
          src={`https://www.youtube.com/embed/${VIDEO_ID}?rel=0&modestbranding=1&autoplay=1`}
          title="Vendor Infra Services Overview"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
        />
      ) : (
        <button
          onClick={() => setPlaying(true)}
          className="relative w-full h-full group block"
          aria-label="Play video: Vendor Infra Services Overview"
        >
          <img
            src={`https://img.youtube.com/vi/${VIDEO_ID}/maxresdefault.jpg`}
            alt="Vendor Infra Services Overview"
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/25 transition-colors duration-300 flex items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-white/95 flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300">
              <Play className="w-8 h-8 text-red-600 ml-1" fill="currentColor" />
            </div>
          </div>
          <div className="absolute bottom-4 left-4 right-4 text-center">
            <span className="text-white/90 text-sm font-medium drop-shadow-lg">
              Watch: How Vendor Infra Transforms Infrastructure Procurement
            </span>
          </div>
        </button>
      )}
    </div>
  );
}

export default function Services() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      {/* ── HERO ─────────────────────────────────── */}
      <section data-preserve-hero-typography className="relative bg-[#00274d] text-white py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.08]"
          style={{ backgroundImage: "radial-gradient(circle at 1px 1px,#ffffff 1px,transparent 0)", backgroundSize: "40px 40px" }} />

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 rounded-full border border-[#edad1a]/40 bg-[#edad1a]/10 px-4 py-2 text-sm font-semibold text-[#edad1a] mb-6">
            Services
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-semibold leading-tight tracking-tight mb-6">
            Redefining Collaboration with 10+ Integrated Services
          </motion.h1>
        </div>
      </section>

      {/* ── SERVICE SECTIONS (alternating splits) ─ */}
      <section id="services-list" className="py-24 md:py-32 bg-gradient-to-b from-white via-[#f7f9fc] to-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          
          <div className="space-y-28 md:space-y-36">
            {services.map((service, idx) => {
              const reverse = idx % 2 === 1;
              const section = (
                <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
                    {/* IMAGE */}
                    <div className={`lg:col-span-6 ${reverse ? "lg:order-2" : ""}`}>
                      <div className="relative group">
                        <div className="absolute -inset-3 bg-gradient-to-br from-[#edad1a]/30 to-[#00274d]/20 rounded-3xl blur-2xl opacity-60 group-hover:opacity-90 transition-opacity duration-500" />
                        <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-gray-100 ring-1 ring-black/5 shadow-2xl">
                          <img
                            src={service.image}
                            alt={service.imageAlt}
                            loading="lazy"
                            className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-tr from-[#00274d]/30 via-transparent to-transparent" />
                          {/* floating glass icon */}
                          <div className="absolute top-5 left-5 w-14 h-14 rounded-2xl bg-white/90 backdrop-blur-md flex items-center justify-center shadow-xl ring-1 ring-white/60">
                            <service.icon className="w-6 h-6 text-[#edad1a]" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* CONTENT */}
                    <div className={`lg:col-span-6 ${reverse ? "lg:order-1" : ""}`}>
                      <div className="flex items-baseline gap-4 mb-5">
                        <span className="text-5xl md:text-6xl font-bold text-[#edad1a] tracking-tight tabular-nums">
                          {String(idx + 1).padStart(2, "0")}
                        </span>
                        <span className="h-px flex-1 bg-gradient-to-r from-[#edad1a]/40 to-transparent" />
                      </div>

                      <h3 className="text-2xl md:text-3xl font-semibold text-[#00274d] tracking-normal leading-tight mb-7">
                        {service.title}
                      </h3>

                      <div className="space-y-5">
                        {service.points.map((point, i) => (
                          <div key={i} className="group/p flex gap-4 p-4 -mx-4 rounded-2xl hover:bg-white hover:shadow-md transition-all duration-300">
                            <div className="w-9 h-9 rounded-xl bg-[#edad1a]/10 text-[#edad1a] flex items-center justify-center shrink-0 mt-0.5 group-hover/p:bg-[#edad1a] group-hover/p:text-white transition-colors">
                              <CheckCircle2 className="w-4.5 h-4.5" strokeWidth={2.5} />
                            </div>
                            <div>
                              <h4 className="type-card-title text-[#00274d] mb-1">{point.label}</h4>
                              <p className="text-gray-500 text-sm leading-relaxed">{point.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
              );

              return (
                <FadeUp key={idx}>
                  {"href" in service && service.href ? (
                                  <a
                    href={service.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block rounded-3xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[#edad1a] focus-visible:ring-offset-4"
                  >
                    {section}
                  </a>
                  ) : section}
                </FadeUp>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── ADVANTAGES ───────────────────────────── */}
      <section className="py-24 md:py-28 bg-[#0a1d36] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.05]"
          style={{ backgroundImage: "radial-gradient(circle at 1px 1px,#ffffff 1px,transparent 0)", backgroundSize: "32px 32px" }} />
        <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-[#edad1a]/10 blur-[140px]" />

        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
          <FadeUp className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-flex items-center gap-2 text-[#edad1a] text-[12px] font-bold uppercase tracking-[0.3em] mb-4">
              <span className="w-6 h-px bg-[#edad1a]/60" />
              Advantages
              <span className="w-6 h-px bg-[#edad1a]/60" />
            </span>
            <h2 className="text-3xl md:text-4xl font-bold leading-tight text-white">
              Our Service advantages that deliver results
            </h2>
          </FadeUp>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
          >
            {advantages.map((adv, i) => (
              <motion.div key={i} variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}>
                <div className="group relative h-full rounded-2xl p-6 bg-white/[0.04] border border-white/10 hover:bg-white/[0.07] hover:border-[#edad1a]/40 transition-all duration-300 overflow-hidden">
                  <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-[#edad1a]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#edad1a] to-[#d99c14] flex items-center justify-center mb-5 shadow-lg shadow-[#edad1a]/20">
                    <adv.icon className="w-5 h-5 text-[#00274d]" />
                  </div>
                  <h3 className="type-card-title text-white mb-2">{adv.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed">{adv.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────── */}
      <section className="py-24 md:py-28 bg-white">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12">
          <FadeUp className="text-center mb-14">
            <span className="inline-flex items-center gap-2 text-[#edad1a] text-[12px] font-bold uppercase tracking-[0.3em] mb-4">
              <span className="w-6 h-px bg-[#edad1a]/60" />
              FAQ
              <span className="w-6 h-px bg-[#edad1a]/60" />
            </span>
            <h2 className="text-3xl md:text-4xl font-bold leading-tight text-[#00274d]">
             Explore answers to frequently asked questions.
            </h2>
          </FadeUp>

          <FadeUp delay={0.1} className="space-y-3">
            {faqs.map((faq, i) => (
              <FAQItem key={i} q={faq.q} a={faq.a} />
            ))}
          </FadeUp>
        </div>
      </section>

      {/* ── VIDEO / CTA ──────────────────────────── */}
      <section className="py-24 md:py-28 bg-[#00274d] relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.07]"
          style={{ backgroundImage: "radial-gradient(circle at 1px 1px,#ffffff 1px,transparent 0)", backgroundSize: "36px 36px" }} />
        <div className="pointer-events-none absolute -bottom-32 -right-20 w-[520px] h-[520px] rounded-full bg-[#edad1a]/15 blur-[140px]" />

        <div className="container mx-auto px-4 relative z-10 max-w-5xl">
          <FadeUp className="text-center mb-12">
            <span className="inline-flex items-center gap-2 text-[#edad1a] text-[12px] font-bold uppercase tracking-[0.3em] mb-4">
              <span className="w-6 h-px bg-[#edad1a]/60" />
              Explore more
              <span className="w-6 h-px bg-[#edad1a]/60" />
            </span>
            <h2 className="text-3xl md:text-4xl font-bold leading-tight text-white">
              Get to know more about our Services
            </h2>
            <p className="type-body-lg text-white/70 mt-4 max-w-xl mx-auto">
              Explore how our ecosystem supports your business from opportunity to execution.
            </p>
          </FadeUp>

          <FadeUp delay={0.15}>
            <VideoPlayer />
          </FadeUp>

          <FadeUp delay={0.2} className="text-center mt-12">
            <Link href="/contact">
              <SiteButton className="normal-case tracking-normal">
                Get Started with Us
              </SiteButton>
            </Link>
          </FadeUp>
        </div>
      </section>
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
              Ready to Grow and Transform your Business?
            </h2>
            <p className="text-[#00274d]/85 mb-6 text-sm md:text-base">
              Join <span className="font-semibold">32,000+</span> contractors, vendors, manufacturers, suppliers, and consultants already using Vendor Infra to discover new opportunities, streamline procurement, acesss plants and equipment solutions, and secure project financing and insurance—all through a single integrated platform.
            </p>
            <div className="flex flex-wrap gap-3 justify-center items-center">
              <Link href="/contact">
                <SiteButton variant="onGold" className="normal-case tracking-normal">
                  Get in Touch
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
    </div>
  );
}
