import { Link } from "wouter";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  Brain,
  CheckCircle2,
  Clock,
  Database,
  Layers,
  Play,
  ShieldCheck,
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/layout/PageHero";
import { SiteButton } from "@/components/SiteButton";

const uspItems = [
  {
    number: "01",
    title: "Integrated Services at One Platform",
    desc: "Vendor Infra brings together vendor discovery, comparison, communication, and project management on a single digital platform - eliminating the hassle of switching between multiple systems or service providers",
    icon: Layers,
  },
  {
    number: "02",
    title: "Smart Decision Making Through Market Intelligence",
    desc: "With real-time data, AI-driven analytics, and verified market insights, we empower clients to make informed procurement and project decisions - backed by transparency and measurable intelligence.",
    icon: BarChart3,
  },
  {
    number: "03",
    title: "Reduced Cost & Save Time",
    desc: "By digitizing the vendor search and management process, Vendor Infra minimizes manual effort, accelerates timelines, and helps businesses save significant time and operational costs.",
    icon: Clock,
  },
  {
    number: "04",
    title: "Risks Mitigation",
    desc: "We onboard only verified and certified vendors, reducing the risks associated with unreliable suppliers. Our transparent rating and feedback system ensures consistent quality and accountability.",
    icon: CheckCircle2,
  },
  {
    number: "05",
    title: "Cloud-Based Secure Platform",
    desc: "Vendor Infra ensures data security, accessibility, and scalability with a robust cloud infrastructure - enabling businesses to manage information safely from anywhere, anytime.",
    icon: ShieldCheck,
  },
  {
    number: "06",
    title: "AI & ML-Driven Recommendations",
    desc: "Our intelligent system uses AI and Machine Learning to suggest the most relevant vendors and opportunities, helping clients and suppliers connect faster and more effectively.",
    icon: Brain,
  },
];

const stats = [
  { label: "AI-based Ecosystem", value: "VI", icon: Database },
  { label: "Certified Vendors", value: "31K+", icon: CheckCircle2 },
  { label: "Live users", value: "143+", icon: BarChart3 },
];

export default function WhyUs() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <PageHero
        eyebrow="Why Us"
        title="We turn ambition into measurable success"
        subtitle=""
      />

      <section className="py-24 bg-[#f6f8fb] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 xl:px-12">
          <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-[#edad1a]/10 blur-3xl" />
              <div className="relative overflow-hidden rounded-2xl bg-[#082b4f] shadow-2xl shadow-[#00274d]/20">
                <div className="absolute inset-0 opacity-[0.08] bg-[radial-gradient(circle_at_1px_1px,#ffffff_1px,transparent_0)] bg-[size:24px_24px]" />
                <div className="relative min-h-[390px] bg-[#00274d] p-7 md:p-10">
                  <div className="absolute inset-0 opacity-[0.1] bg-[radial-gradient(circle_at_1px_1px,#ffffff_1px,transparent_0)] bg-[size:28px_28px]" />
                  <div className="relative h-full min-h-[320px]">
                    <div className="absolute left-1/2 top-1/2 z-10 flex h-32 w-32 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-[#edad1a]/40 bg-white text-center shadow-2xl">
                      <Brain className="mb-2 h-7 w-7 text-[#edad1a]" />
                      <span className="text-sm font-bold leading-tight text-[#00274d]">AI Driven</span>
                      <span className="text-xs font-semibold text-gray-500">Ecosystem</span>
                    </div>
                    <div className="absolute left-1/2 top-1/2 h-px w-[62%] -translate-x-1/2 bg-white/15" />
                    <div className="absolute left-1/2 top-1/2 h-[62%] w-px -translate-y-1/2 bg-white/15" />
                    <div className="absolute left-[19%] top-[18%] h-px w-[62%] rotate-45 bg-white/10" />
                    <div className="absolute left-[19%] top-[78%] h-px w-[62%] -rotate-45 bg-white/10" />

                    {[
                      { label: "Verified Vendors", icon: CheckCircle2, className: "left-0 top-0" },
                      { label: "Market Intelligence", icon: BarChart3, className: "right-0 top-0" },
                      { label: "Secure Data", icon: ShieldCheck, className: "left-0 bottom-0" },
                      { label: "Single Platform", icon: Layers, className: "right-0 bottom-0" },
                    ].map((node) => (
                      <div
                        key={node.label}
                        className={`absolute ${node.className} w-[42%] rounded-2xl border border-white/10 bg-white/8 p-4 backdrop-blur-sm`}
                      >
                        <node.icon className="mb-3 h-5 w-5 text-[#edad1a]" />
                        <p className="text-sm font-bold leading-snug text-white">{node.label}</p>
                      </div>
                    ))}
                  </div>
                  {/* <a
                    href="https://youtu.be/tn81mJqaeEM"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute bottom-6 right-6 inline-flex items-center gap-3 rounded-lg bg-white/95 px-5 py-3 text-sm font-bold text-[#00274d] shadow-lg hover:bg-white transition-colors"
                  >
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#edad1a] text-white">
                      <Play className="h-4 w-4" fill="currentColor" />
                    </span>
                  </a> */}
                </div>

                <div className="relative grid sm:grid-cols-3 gap-3 p-5">
                  {stats.map((stat) => (
                    <div key={stat.label} className="rounded-xl border border-white/10 bg-white/8 p-4">
                      <stat.icon className="h-5 w-5 text-[#edad1a] mb-4" />
                      <p className="text-2xl font-semibold text-white leading-none">{stat.value}</p>
                      <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-white/65">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 }}
            >
              <span className="inline-flex items-center gap-2 text-[#edad1a] text-[12px] font-bold uppercase tracking-[0.3em] mb-4">
                <span className="w-6 h-px bg-[#edad1a]/60" />
                Why Us
                <span className="w-6 h-px bg-[#edad1a]/60" />
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#00274d] leading-tight max-w-xl">
                How we are different from our competetiors
              </h2>
              <p className="mt-7 text-gray-600 text-base leading-8 max-w-xl">
                Every vendor needs exposure to grow in a digitally expanding world, where clients can compare, connect, and collaborate with multiple real-time vendors for their projects. <strong>Vendor Infra</strong> empowers this growth by providing a <strong>cloud-based, AI-driven marketplace</strong> that connects <strong>certified suppliers, contractors, consultants, and developers</strong> across the infrastructure and construction ecosystem. We ensure reliability, transparency, and speed by bringing the entire vendor discovery, management, and collaboration process under one secure digital roof - helping businesses make smarter, faster, and data-backed decisions.
              </p>
              <Link href="/services">
                <SiteButton className="mt-9">Explore Services</SiteButton>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-[#00274d] relative overflow-hidden">
  <div className="absolute inset-0 opacity-[0.05] bg-[radial-gradient(circle_at_1px_1px,#ffffff_1px,transparent_0)] bg-[size:28px_28px]" />
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 xl:px-12">
          <div className="mb-12 max-w-4xl">
            <span className="inline-flex items-center gap-2 text-[#edad1a] text-[12px] font-bold uppercase tracking-[0.3em] mb-4">
              <span className="w-6 h-px bg-[#edad1a]/60" />
              USP
              <span className="w-6 h-px bg-[#edad1a]/60" />
            </span>
           <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
              Empowering Smarter, Faster, and Safer Business Decisions in the Infrastructure Industry
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {uspItems.map((item, i) => (
              <motion.div
                key={item.number}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
className="group rounded-3xl border border-white/10 bg-white p-7 shadow-xl hover:-translate-y-2 hover:shadow-2xl hover:border-[#edad1a]/40 transition-all duration-300"              >
                <div className="mb-5 flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#00274d] text-[#edad1a] font-semibold">
                    {item.number}
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-[#edad1a] shadow-sm">
                    <item.icon className="h-6 w-6" />
                  </div>
                </div>
                <h3 className="text-lg font-bold text-[#00274d] leading-snug">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-gray-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute right-0 top-1/2 -translate-y-1/2 h-[450px] w-[450px] rounded-full bg-[#edad1a]/10 blur-3xl" />
        {/* <div className="absolute inset-0 opacity-[0.07] bg-[radial-gradient(circle_at_1px_1px,#ffffff_1px,transparent_0)] bg-[size:28px_28px]" /> */}
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 xl:px-12 relative z-10">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <span className="inline-flex items-center gap-2 text-[#edad1a] text-[12px] font-bold uppercase tracking-[0.3em] mb-4">
                <span className="w-6 h-px bg-[#edad1a]/60" />
                Video
                <span className="w-6 h-px bg-[#edad1a]/60" />
              </span>
              <h2 className="text-3xl md:text-4xl font-bold leading-tight text-[#00274d]">
                Get to know more about us and our Services
              </h2>
            </div>
           <div className="overflow-hidden rounded-[28px] border border-gray-200 bg-white shadow-[0_25px_70px_rgba(0,39,77,0.15)] aspect-video">
              <iframe
                src="https://www.youtube.com/embed/tn81mJqaeEM?rel=0&modestbranding=1"
                title="Vendor Infra overview"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="h-full w-full"
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
