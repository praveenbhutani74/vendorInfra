import { motion } from "framer-motion";
import { Link } from "wouter";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  CheckCircle2,
  ClipboardCheck,
  FileSearch,
  Gauge,
  GitBranch,
  Globe2,
  Layers3,
  LineChart,
  PackageCheck,
  Search,
  ShieldCheck,
  Truck,
  Zap,
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CtaArrow } from "@/components/CtaArrow";

const heroImages = [
  "/contract-manufacturing-ai.jpg",
  "/cm-production-line.jpg",
  "/cm-quality-inspection.jpg",
];

const chips = ["Verified Manufacturers", "Real-Time Tracking", "Competitive RFQ", "End-to-End Execution", "Quality Assurance"];

const problemPoints = [
  ["Relationship-driven discovery", "Finding capable manufacturers still depends on personal networks and cold outreach, making sourcing slow, inconsistent, and geographically limited."],
  ["Unclear capability evaluation", "Quality, capacity, compliance, and process fit are hard to compare without a standardized verification framework."],
  ["Inconsistent pricing", "Ad hoc RFQ processes create incomparable quotes, hidden variables, vague scope, and limited benchmarking."],
  ["Opaque production tracking", "Once an order is placed, visibility drops and delays are often discovered after they happen."],
  ["Manual quality assurance", "Inspections depend on individual judgment with limited digital logs, protocols, or audit trails."],
  ["Siloed logistics", "Transport, documentation, and compliance are handled through separate vendors without unified coordination."],
];

const approach = [
  [FileSearch, "Demand Orchestration", "Convert specs, timelines, materials, and volumes into procurement-ready briefs manufacturers can act on immediately."],
  [Search, "Supply Intelligence", "Match demand to manufacturers using capability data, certifications, performance history, and available capacity."],
  [Gauge, "Execution Control", "Structure production with milestones, escalation paths, and exception alerts across every order."],
  [BarChart3, "Visibility Layer", "Give buyers and manufacturers shared visibility into production status, quality checks, and delivery progress."],
];

const capabilities = [
  [Layers3, "Product Development to Production", "Validate feasibility, prototype, run pilot batches, and scale into full production with confidence."],
  [BadgeCheck, "Intelligent Supplier Discovery", "Filter manufacturers by process type, capacity, location, specialization, availability, and performance."],
  [ClipboardCheck, "RFQ & Commercial Engine", "Receive standardized quotes, benchmark pricing, and negotiate on volume, lead time, and payment terms."],
  [GitBranch, "Production Execution & Control", "Monitor milestones, identify deviations early, and resolve exceptions at the source."],
  [ShieldCheck, "Quality Assurance & Compliance", "Manage validation, in-process checks, final sign-offs, certifications, and digital inspection records."],
  [Truck, "Logistics & Fulfillment", "Coordinate dispatch, freight booking, documentation, shipment tracking, and delivery confirmation."],
];

const process = [
  ["Define Requirement", "Upload specifications, drawings, material requirements, volumes, and delivery timelines."],
  ["Smart Matching", "Match your brief with verified manufacturers by capability, location, certification, capacity, and performance."],
  ["Commercial Evaluation", "Compare standardized quotes with scope, pricing, lead times, terms, benchmarks, and negotiation support."],
  ["Supplier Finalization", "Evaluate capability fit, cost, reliability, and compliance before issuing POs and locking schedules."],
  ["Production Kickoff", "Configure milestones, inspection points, and escalation triggers before manufacturing begins."],
  ["Real-Time Monitoring", "Track progress and act on alerts for schedule, input, or capacity risks."],
  ["Quality Validation", "Record multi-stage inspections with timestamped reports and documented resolution paths."],
  ["Logistics & Delivery", "Coordinate dispatch, freight, documentation, tracking, verification, and delivery acknowledgement."],
  ["Closure & Feedback", "Generate ratings, quality scores, delivery accuracy, and benchmarks for future sourcing intelligence."],
];

const industries = ["Infrastructure & Construction", "Industrial Equipment & Machinery", "Automotive & EV", "Electronics & Electricals", "Energy & Renewables"];
const manufacturing = ["CNC Machining", "Fabrication & Welding", "Casting", "Forging & Heat Treatment", "Injection Molding", "Sheet Metal Processing", "Precision Engineering", "Modular Assemblies", "Turnkey Manufacturing", "Custom Industrial Solutions"];
const buyerValue = ["Access manufacturing capacity without factory capex.", "Use specialized capabilities that scale with demand.", "Optimize costs through structured RFQs and benchmarking.", "Monitor orders, milestones, and shipments from one dashboard.", "Reduce risk with vendor scoring, compliance tracking, and risk profiling."];
const vendorValue = ["Access high-quality, structured demand.", "Improve plant utilization by filling capacity gaps.", "Digitize production workflows and operational discipline.", "Build a performance-based reputation using real delivery data.", "Expand beyond local markets with matched buyer demand."];

const technology = [
  [Zap, "AI-Driven Vendor Matchmaking", "Capability data and performance history surface the right manufacturer faster than manual sourcing."],
  [PackageCheck, "Real-Time Production Tracking", "Live status feeds, milestone triggers, and exception alerts provide continuous awareness."],
  [BarChart3, "Vendor Performance Analytics", "Every order builds a record across quality, delivery accuracy, responsiveness, and trends."],
  [LineChart, "Predictive Insights", "Roadmap capabilities include demand forecasting, capacity conflict prediction, price trends, and risk scoring."],
  [Globe2, "ERP & API Integrations", "Open APIs connect Vendor Infra with ERP, procurement, logistics, and financial systems."],
];

const comparison = [
  ["Vendor Discovery", "Manual, network-dependent, slow", "Intelligent, capability-driven, instant"],
  ["Execution", "Unstructured, relationship-managed", "Structured, milestone-tracked, auditable"],
  ["Visibility", "Periodic updates, reactive", "End-to-end real-time, proactive alerts"],
  ["Flexibility", "Single vendor dependency", "Multi-vendor ecosystem, scalable"],
  ["Quality Control", "Informal, end-of-line", "Multi-stage, digital, traceable"],
  ["Scalability", "Limited by existing relationships", "Built for large-scale, multi-order demand"],
];

function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.58, delay, ease: [0.22, 1, 0.36, 1] as const }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionLabel({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-3 text-[#edad1a] text-[12px] font-bold uppercase tracking-[0.28em] mb-4">
      <span className="h-px w-8 bg-[#edad1a]/60" />
      <span>{label}</span>
      <span className="h-px w-8 bg-[#edad1a]/60" />
    </span>
  );
}

export default function ContractManufacturing() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Navbar />

      <section data-preserve-hero-typography className="relative overflow-hidden bg-[#00274d] text-white">
        <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px,#ffffff 1px,transparent 0)", backgroundSize: "34px 34px" }} />
        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-24 md:py-28">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-7">
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center rounded-full border border-[#edad1a]/45 bg-[#edad1a]/10 px-5 py-3 text-sm font-semibold text-[#edad1a] mb-8 shadow-sm">
                Contract Manufacturing
              </motion.div>
              <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl md:text-6xl font-semibold leading-tight tracking-tight">
                Build Products at Scale, Without Building Factories.
              </motion.h1>
              <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mt-6 text-base md:text-xl leading-relaxed text-white/78 max-w-2xl">
                Vendor Infra enables businesses to design, source, manufacture, and deliver products through a connected ecosystem of verified manufacturers, intelligent workflows, and real-time execution visibility.
              </motion.p>
              <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link href="/contact" className="group inline-flex items-center justify-center gap-3 rounded-2xl bg-[#edad1a] px-7 py-4 text-sm font-semibold text-white transition-all hover:bg-[#d4941a]">
                  Start Your Project <CtaArrow variant="dark" />
                </Link>
                <a href="#capabilities" className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/35 bg-white/10 px-7 py-4 text-sm font-semibold text-white transition-all hover:bg-white/15">
                  Explore Capabilities
                </a>
              </motion.div>
            </div>

            <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.18 }} className="lg:col-span-5">
              <div className="relative min-h-[390px]">
                <div className="absolute right-0 top-0 w-[82%] overflow-hidden rounded-3xl border border-white/15 bg-white/10 shadow-2xl">
                  <img src={heroImages[0]} alt="Pre-engineered manufacturing structure" className="h-[245px] w-full object-cover" />
                </div>
                <div className="absolute left-0 bottom-12 w-[58%] overflow-hidden rounded-3xl border border-white/15 bg-white/10 shadow-2xl">
                  <img src={heroImages[1]} alt="Automated production line for contract manufacturing" className="h-[190px] w-full object-cover" />
                </div>
                <div className="absolute right-8 bottom-0 w-[46%] overflow-hidden rounded-3xl border border-white/15 bg-white/10 shadow-2xl">
                  <img src={heroImages[2]} alt="Quality inspection of manufactured components" className="h-[160px] w-full object-cover" />
                </div>
              </div>
            </motion.div>
          </div>

          <div className="mt-12 flex flex-wrap gap-3">
            {chips.map((chip) => (
              <span key={chip} className="rounded-full border border-white/20 bg-white/10 px-5 py-2.5 text-sm text-white/86">
                {chip}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#00182f] py-24 md:py-32 text-white">
        {/* Ambient grid + glow */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            maskImage: "radial-gradient(ellipse at center, black 40%, transparent 80%)",
          }}
        />
        <div
          aria-hidden
          className="absolute -top-40 -right-40 h-[480px] w-[480px] rounded-full bg-[#edad1a]/20 blur-[120px]"
        />
        <div
          aria-hidden
          className="absolute -bottom-40 -left-40 h-[420px] w-[420px] rounded-full bg-[#0a4a8f]/40 blur-[120px]"
        />

        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-14 lg:gap-20">
            {/* Left editorial column */}
            <FadeUp className="lg:col-span-5 lg:sticky lg:top-28 lg:self-start">
              <div className="flex items-center gap-3">
                <span className="h-px w-10 bg-[#edad1a]" />
                <span className="text-xs font-semibold uppercase tracking-[0.32em] text-[#edad1a]">
                  The Problem
                </span>
              </div>
              <h2 className="mt-6 text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight">
                Manufacturing is{" "}
                <span className="relative inline-block">
                  <span className="relative z-10">fractured</span>
                  <span
                    aria-hidden
                    className="absolute inset-x-0 bottom-1 h-3 bg-[#edad1a]/40 -skew-x-6"
                  />
                </span>{" "}
                by design.
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-white/70">
                Six structural fault lines run through every contract
                manufacturing engagement — from sourcing to shipment. Each one
                quietly compounds cost, time, and risk.
              </p>

              <div className="mt-10 grid grid-cols-3 gap-3">
                {[
                  ["06", "Fault lines"],
                  ["100%", "Operational"],
                  ["0", "Unified view"],
                ].map(([num, label]) => (
                  <div
                    key={label}
                    className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur"
                  >
                    <div className="font-bold text-2xl text-[#edad1a]">{num}</div>
                    <div className="mt-1 text-[11px] uppercase tracking-wider text-white/55">
                      {label}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10 relative rounded-3xl border border-[#edad1a]/30 bg-gradient-to-br from-[#edad1a]/10 to-transparent p-7">
                <div className="absolute -top-3 left-7 px-3 py-1 rounded-full bg-[#edad1a] text-[#00182f] text-[10px] font-bold uppercase tracking-[0.2em]">
                  The Result
                </div>
                <p className="mt-2 text-lg leading-relaxed text-white/85">
                  Delays, cost overruns, quality surprises, and unpredictable
                  outcomes at <span className="text-[#edad1a] font-semibold">every stage</span> of
                  the manufacturing lifecycle.
                </p>
              </div>
            </FadeUp>

            {/* Right fault-line list */}
            <div className="lg:col-span-7">
              <div className="relative space-y-4">
                {/* Vertical spine */}
                <div
                  aria-hidden
                  className="absolute left-[28px] top-4 bottom-4 w-px bg-gradient-to-b from-transparent via-[#edad1a]/40 to-transparent hidden md:block"
                />
                {problemPoints.map(([title, desc], index) => (
                  <FadeUp key={title} delay={index * 0.05}>
                    <div className="group relative rounded-2xl border border-white/10 bg-white/[0.04] p-5 md:p-6 transition-all duration-300 hover:border-[#edad1a]/50 hover:bg-white/[0.06] hover:-translate-y-0.5">
                      {/* Accent edge */}
                      <span
                        aria-hidden
                        className="absolute left-0 top-6 bottom-6 w-[3px] rounded-r bg-[#edad1a] origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-300"
                      />
                      <div className="flex items-start gap-5 md:gap-6">
                        <div className="relative shrink-0">
                          <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-white/15 bg-[#00182f] font-mono text-base font-bold text-[#edad1a] group-hover:border-[#edad1a]/60 transition-colors">
                            {String(index + 1).padStart(2, "0")}
                          </div>
                        </div>
                        <div className="flex-1 pt-1">
                          <div className="flex items-center justify-between gap-4">
                            <h3 className="text-lg md:text-xl font-semibold leading-snug text-white group-hover:text-[#edad1a] transition-colors">
                              {title}
                            </h3>
                            <ArrowRight className="h-4 w-4 text-white/30 group-hover:text-[#edad1a] group-hover:translate-x-1 transition-all shrink-0" />
                          </div>
                          <p className="mt-2 text-sm md:text-[15px] leading-relaxed text-white/65">
                            {desc}
                          </p>
                        </div>
                      </div>
                    </div>
                  </FadeUp>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-24 bg-[#f7f9fc]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <FadeUp className="text-center max-w-3xl mx-auto">
            <SectionLabel label="Our Approach" />
            <h2 className="text-3xl md:text-4xl font-bold text-[#00274d] leading-tight">A connected manufacturing ecosystem, not just a marketplace.</h2>
            <p className="mt-5 text-slate-600 leading-relaxed">Vendor Infra integrates every layer of the production lifecycle into a single operating environment, from initial specification to final delivery.</p>
          </FadeUp>
          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {approach.map(([Icon, title, desc], index) => (
              <FadeUp key={title as string} delay={index * 0.04}>
                <div className="h-full rounded-2xl bg-white border border-slate-200 p-6 shadow-sm">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#edad1a]/15 text-[#edad1a]"><Icon className="h-5 w-5" /></div>
                  <h3 className="font-semibold text-[#00274d]">{title as string}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">{desc as string}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <section id="capabilities" className="py-20 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <FadeUp className="max-w-3xl">
            <SectionLabel label="Capabilities" />
            <h2 className="text-3xl md:text-4xl font-bold text-[#00274d] leading-tight">End-to-end manufacturing, every capability on one platform.</h2>
          </FadeUp>
          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {capabilities.map(([Icon, title, desc], index) => (
              <FadeUp key={title as string} delay={index * 0.03}>
                <div className="h-full rounded-2xl border border-slate-200 p-6 transition-all hover:-translate-y-1 hover:shadow-xl">
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-[#00274d] text-white"><Icon className="h-5 w-5" /></div>
                  <h3 className="font-semibold text-[#00274d]">{title as string}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">{desc as string}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-24 bg-[#0a1d36] text-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <FadeUp className="max-w-3xl">
            <SectionLabel label="Process" />
            <h2 className="text-3xl md:text-4xl font-bold leading-tight">How it works, from requirement to delivery.</h2>
            <p className="mt-5 text-white/68 leading-relaxed">A structured nine-stage process removes ambiguity, eliminates coordination gaps, and gives every stakeholder the right information at each step.</p>
          </FadeUp>
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {process.map(([title, desc], index) => (
              <FadeUp key={title} delay={index * 0.025}>
                <div className="flex h-full gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#edad1a] text-white"><CheckCircle2 className="h-5 w-5" /></span>
                  <div>
                    <h3 className="font-semibold">{title}</h3>
                    <p className="mt-2 text-sm text-white/60 leading-relaxed">{desc}</p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 grid lg:grid-cols-2 gap-12">
          <FadeUp>
            <SectionLabel label="Industries" />
            <h2 className="text-3xl md:text-4xl font-bold text-[#00274d] leading-tight">Built for sectors that cannot afford manufacturing risk.</h2>
            <div className="mt-8 space-y-3">
              {industries.map((industry) => (
                <div key={industry} className="flex items-center gap-3 rounded-xl border border-slate-200 p-4"><CheckCircle2 className="h-5 w-5 text-[#edad1a]" /><span className="font-medium text-[#00274d]">{industry}</span></div>
              ))}
            </div>
          </FadeUp>
          <FadeUp delay={0.08}>
            <SectionLabel label="Manufacturing" />
            <h2 className="text-3xl md:text-4xl font-bold text-[#00274d] leading-tight">Core and advanced manufacturing capabilities.</h2>
            <div className="mt-8 flex flex-wrap gap-3">
              {manufacturing.map((item) => <span key={item} className="rounded-full border border-[#00274d]/10 bg-[#f7f9fc] px-4 py-2 text-sm font-medium text-slate-700">{item}</span>)}
            </div>
          </FadeUp>
        </div>
      </section>

      <section className="py-20 md:py-24 bg-[#f7f9fc]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <FadeUp className="text-center max-w-3xl mx-auto">
            <SectionLabel label="Value Proposition" />
            <h2 className="text-3xl md:text-4xl font-bold text-[#00274d] leading-tight">Built for both sides of the manufacturing equation.</h2>
          </FadeUp>
          <div className="mt-12 grid lg:grid-cols-2 gap-6">
            {[["For Businesses", buyerValue], ["For Manufacturers", vendorValue]].map(([title, values]) => (
              <FadeUp key={title as string}>
                <div className="h-full rounded-2xl bg-white border border-slate-200 p-7 shadow-sm">
                  <h3 className="text-xl font-semibold text-[#00274d]">{title as string}</h3>
                  <div className="mt-6 space-y-4">
                    {(values as string[]).map((value) => <div key={value} className="flex gap-3"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#edad1a]" /><p className="text-sm leading-relaxed text-slate-600">{value}</p></div>)}
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-24 bg-[#00274d] text-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <FadeUp className="max-w-3xl">
            <SectionLabel label="Technology" />
            <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">The intelligence layer behind every decision.</h2>
          </FadeUp>
          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-5 gap-5">
            {technology.map(([Icon, title, desc], index) => (
              <FadeUp key={title as string} delay={index * 0.03}>
                <div className="h-full rounded-2xl border border-white/15 bg-white/[0.06] p-5">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-[#edad1a]/20 text-[#edad1a]"><Icon className="h-5 w-5" /></div>
                  <h3 className="font-semibold text-white leading-snug">{title as string}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/70">{desc as string}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-24 bg-[#f7f9fc]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <FadeUp className="max-w-3xl">
            <SectionLabel label="Competitive Advantage" />
            <h2 className="text-3xl md:text-4xl font-bold text-[#00274d] leading-tight">Why Vendor Infra outperforms every alternative.</h2>
          </FadeUp>
          <FadeUp className="mt-10 overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead className="bg-[#00274d] text-white"><tr><th className="px-5 py-4 font-semibold">Dimension</th><th className="px-5 py-4 font-semibold">Traditional Approach</th><th className="px-5 py-4 font-semibold">Vendor Infra</th></tr></thead>
              <tbody>
                {comparison.map(([dimension, traditional, vendor], index) => (
                  <tr key={dimension} className={index % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                    <td className="px-5 py-4 font-semibold text-[#00274d]">{dimension}</td>
                    <td className="px-5 py-4 text-slate-600">{traditional}</td>
                    <td className="px-5 py-4 text-slate-700 font-medium">{vendor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </FadeUp>
        </div>
      </section>

      <section className="py-20 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <FadeUp>
            <div className="overflow-hidden rounded-3xl bg-[#f7f9fc] border border-slate-200">
              <div className="grid lg:grid-cols-12">
                <div className="lg:col-span-7 p-8 md:p-12">
                  <SectionLabel label="Vision" />
                  <h2 className="text-3xl md:text-5xl font-bold leading-tight text-[#00274d]">Building the operating system for manufacturing.</h2>
                  <p className="mt-6 text-slate-600 text-base md:text-lg leading-relaxed">Vendor Infra's long-term mission is to become the foundational infrastructure layer for the manufacturing economy, unifying every function that today exists in fragmented systems.</p>
                  <h3 className="mt-8 text-2xl md:text-3xl font-semibold text-[#edad1a]">Build Smarter. Scale Faster. Deliver Better.</h3>
                  <p className="mt-4 text-slate-600">Join businesses and manufacturers operating on a connected platform where every stage of production is structured, visible, and optimized.</p>
                  <div className="mt-8 flex flex-col sm:flex-row gap-3">
                    <Link href="/contact" className="group inline-flex items-center justify-center gap-3 rounded-xl bg-[#edad1a] px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-[#d4941a]">Start Your Manufacturing Project <CtaArrow variant="dark" /></Link>
                    <Link href="/services" className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#00274d]/15 bg-white px-6 py-3 text-sm font-semibold text-[#00274d] transition-all hover:bg-[#00274d] hover:text-white">Discover Verified Partners</Link>
                  </div>
                </div>
                <div className="relative min-h-[320px] lg:col-span-5 bg-[#00274d]">
                  <img src="/vision-manufacturing.jpg" alt="Smart manufacturing facility" className="h-full w-full object-cover opacity-55" />
                  <div className="absolute inset-0 bg-gradient-to-br from-[#00274d]/80 to-[#edad1a]/20" />
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      <Footer />
    </div>
  );
}
