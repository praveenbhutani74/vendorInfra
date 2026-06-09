import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { PageHero } from "@/components/layout/PageHero";
import { motion } from "framer-motion";
import {
  Building2,
  Database,
  LockKeyhole,
  Network,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";

const securityPillars = [
  {
    title: "Physical Security",
    icon: Building2,
    number: "01",
    summary: "Hardened data centers with zero-trust physical access controls.",
    points: [
      "Biometric ID, metal detection, cameras, vehicle barriers & laser intrusion detection",
      "Security personnel on-site 24 / 7 / 365",
      "Regular human audits to verify site inviolability",
      "Multi-factor authentication for all remote server access",
      "No sensitive server directly reachable from the public internet",
    ],
  },
  {
    title: "Network Security",
    icon: Network,
    number: "02",
    summary: "Custom-hardened OS with real-time traffic inspection.",
    points: [
      "Custom hardware running a hardened OS and proprietary file system",
      "Strict firewall rules governing all ingress and egress traffic",
      "IDS / IPS with automated alerts for anomalous behavior",
      "All actions logged to an isolated external server with alarm triggers",
    ],
  },
  {
    title: "Data Security",
    icon: Database,
    number: "03",
    summary: "End-to-end encryption for data in transit and at rest.",
    points: [
      "All browser-to-server communication secured via SSL / TLS",
      "Internal server traffic re-encrypted to prevent interception",
      "Persistent disks encrypted with AES-256; keys protected by master keys",
      "Daily encrypted backups stored across distributed sites",
      "All passwords hashed — never stored in plaintext",
    ],
  },
  {
    title: "Operational Security",
    icon: LockKeyhole,
    number: "04",
    summary: "Strict developer controls and continuous system observability.",
    points: [
      "Zero sensitive data exposed in the customer support portal",
      "Strong MFA required for all code pushes to the central repository",
      "Every commit automatically scanned for bugs and vulnerabilities",
      "Systems monitored 24 / 7 with leading third-party observability tooling",
    ],
  },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1], delay },
});

export default function Security() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#f4f6fa" }}>
      <Navbar />
      <PageHero eyebrow="Policy" title="Security Policy" />

      {/* ── Intro ────────────────────────────────────────────────────── */}
      <section className="py-24" style={{ background: "#f4f6fa" }}>
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">

            {/* Top label row */}
            <motion.div {...fadeUp(0)} className="flex items-center gap-3 mb-10">
              <div
                className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest"
                style={{ background: "#00274d", color: "#edad1a" }}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                Enterprise Grade Security
              </div>
              <div
                className="h-px flex-1"
                style={{ background: "linear-gradient(to right, #00274d 0%, transparent 100%)", maxWidth: 120, opacity: 0.15 }}
              />
            </motion.div>

            {/* Main intro grid */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-stretch">

              {/* Left dark hero card — spans 2 cols */}
              <motion.div
                {...fadeUp(0.05)}
                className="lg:col-span-2 relative rounded-3xl overflow-hidden flex flex-col justify-between"
                style={{ background: "#00274d", minHeight: 360, padding: "2.5rem" }}
              >
                {/* Geometric accent — top right circle */}
                <div
                  className="absolute"
                  style={{
                    top: -60, right: -60,
                    width: 220, height: 220,
                    borderRadius: "50%",
                    border: "40px solid #edad1a",
                    opacity: 0.12,
                  }}
                />
                {/* Small solid dot */}
                <div
                  className="absolute"
                  style={{
                    bottom: 40, right: 40,
                    width: 64, height: 64,
                    borderRadius: "50%",
                    background: "#edad1a",
                    opacity: 0.1,
                  }}
                />

                <div className="relative">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-8"
                    style={{ background: "#edad1a" }}
                  >
                    <ShieldCheck className="w-7 h-7" style={{ color: "#00274d" }} />
                  </div>
                  <h2
                    className="font-extrabold leading-tight tracking-tight"
                    style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", color: "#ffffff" }}
                  >
                    Built for
                    <br />
                    <span style={{ color: "#edad1a" }}>confidential</span>
                    <br />
                    procurement data.
                  </h2>
                </div>

                <p className="relative mt-6 leading-relaxed text-sm" style={{ color: "rgba(255,255,255,0.55)" }}>
                  Vendor Infra protects project, vendor, pricing, and procurement
                  information with layered controls across every security dimension.
                </p>
              </motion.div>

              {/* Right column — stacked cards, spans 3 cols */}
              <div className="lg:col-span-3 flex flex-col gap-6">

                {/* Prose card */}
                <motion.div
                  {...fadeUp(0.1)}
                  className="rounded-3xl flex-1"
                  style={{ background: "#ffffff", padding: "2rem 2.25rem", border: "1px solid rgba(7,24,39,0.08)" }}
                >
                  <h3
                    className="font-bold mb-4 leading-snug"
                    style={{ fontSize: "1.2rem", color: "#00274d" }}
                  >
                    Cloud & Data Security is critical to everything we do
                  </h3>
                  <p className="leading-relaxed text-sm" style={{ color: "#64748b" }}>
                    We know how important and confidential your pricing information is to your
                    business and competitive edge. Vendor Infra was built from the ground up
                    and operated daily to keep your data secure and confidential at all times.
                  </p>
                  <p className="leading-relaxed text-sm mt-4" style={{ color: "#64748b" }}>
                    This page describes key security measures we maintain. We are extremely
                    active in security and constantly working to raise the bar — updated
                    regularly as new controls are added.
                  </p>
                </motion.div>

                {/* Mini highlight row */}
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { label: "Encryption", value: "AES-256" },
                    { label: "Uptime SLA", value: "99.99%" },
                    { label: "Monitoring", value: "24 / 7" },
                  ].map(({ label, value }, i) => (
                    <motion.div
                      key={label}
                      {...fadeUp(0.15 + i * 0.05)}
                      className="rounded-2xl flex flex-col items-center justify-center py-5 px-3 text-center"
                      style={{ background: "#00274d" }}
                    >
                      <span
                        className="font-extrabold tracking-tight leading-none"
                        style={{ fontSize: "1.35rem", color: "#edad1a" }}
                      >
                        {value}
                      </span>
                      <span
                        className="mt-1.5 text-xs font-semibold uppercase tracking-widest"
                        style={{ color: "rgba(255,255,255,0.4)" }}
                      >
                        {label}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Security pillars ───────────────────────────────────────── */}
      <section className="pb-28" style={{ background: "#f4f6fa" }}>
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">

            {/* Section heading */}
            <motion.div {...fadeUp(0)} className="mb-12">
              <p
                className="text-xs font-bold uppercase tracking-widest mb-2"
                style={{ color: "#edad1a" }}
              >
                Security Framework
              </p>
              <h2
                className="font-extrabold tracking-tight"
                style={{ fontSize: "clamp(1.6rem, 3vw, 2.25rem)", color: "#071827" }}
              >
                Four layers of protection
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {securityPillars.map((pillar, index) => {
                const Icon = pillar.icon;
                return (
                  <motion.article
                    key={pillar.title}
                    {...fadeUp(index * 0.08)}
                    className="group relative rounded-3xl overflow-hidden"
                    style={{
                      background: "#ffffff",
                      border: "1px solid rgba(7,24,39,0.07)",
                      transition: "box-shadow 0.25s ease, transform 0.25s ease",
                    }}
                    whileHover={{ y: -4, boxShadow: "0 20px 48px rgba(7,24,39,0.10)" }}
                  >
                    {/* Amber left-border accent */}
                    <div
                      className="absolute left-0 top-0 bottom-0 w-1 rounded-l-3xl"
                      style={{ background: "#edad1a" }}
                    />

                    <div style={{ padding: "2rem 2rem 2rem 2.25rem" }}>
                      {/* Header row */}
                      <div className="flex items-start justify-between mb-6">
                        <div className="flex items-center gap-4">
                          <div
                            className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
                            style={{ background: "#071827" }}
                          >
                            <Icon className="w-5 h-5" style={{ color: "#edad1a" }} />
                          </div>
                          <div>
                            <h3
                              className="font-bold leading-tight"
                              style={{ fontSize: "1.05rem", color: "#071827" }}
                            >
                              {pillar.title}
                            </h3>
                            <p className="text-xs mt-0.5 leading-snug" style={{ color: "#94a3b8" }}>
                              {pillar.summary}
                            </p>
                          </div>
                        </div>
                        {/* Number badge */}
                        {/* <span
                          className="text-xs font-bold tabular-nums rounded-full px-2.5 py-1 shrink-0"
                          style={{ background: "rgba(237,173,26,0.12)", color: "#edad1a" }}
                        >
                          {pillar.number}
                        </span> */}
                      </div>

                      {/* Thin divider */}
                      <div
                        className="mb-5"
                        style={{ height: 1, background: "rgba(7,24,39,0.06)" }}
                      />

                      {/* Points */}
                      <ul className="space-y-3">
                        {pillar.points.map((point) => (
                          <li key={point} className="flex gap-3 items-start">
                            <ArrowRight
                              className="w-3.5 h-3.5 shrink-0 mt-1"
                              style={{ color: "#edad1a" }}
                            />
                            <span className="text-sm leading-relaxed" style={{ color: "#475569" }}>
                              {point}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}