import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { PageHero } from "@/components/layout/PageHero";
import { motion } from "framer-motion";
import { BadgeCheck, Leaf, Lock, ShieldCheck } from "lucide-react";

const certifications = [
  {
    title: "ISO 9001",
    image: "/images/wp/ISO-9001-img.png",
    icon: ShieldCheck,
    accent: "#0057b8",
    accentLight: "#e8f1fb",
    accentMid: "#b5d4f4",
    label: "Quality Management",
    content:
      "Vendor Infra is ISO 9001 certified. This is one of the most popular ISO standards for creating, implementing, and maintaining a Quality Management System (QMS) for any given company, regardless of its industry, capital, or size",
  },
  {
    title: "ISO 14001",
    image: "/images/wp/ISO-14001.png",
    icon: Leaf,
    accent: "#166534",
    accentLight: "#dcfce7",
    accentMid: "#86efac",
    label: "Environmental Management",
    content:
      "Vendor Infra is ISO 14001 certified. This ISO standard provides guidelines on what has to be done to implement an environmental management system (EMS). It includes policies, processes, plans, records, and best practices that define rules regarding how your company interacts with the environment. ISO 14001 requirements give you a framework, along with guidelines. for creating EMS for any organization",
  },
  {
    title: "ISO 27001",
    image: "/images/wp/iso-27000.png",
    icon: Lock,
    accent: "#6d28d9",
    accentLight: "#ede9fe",
    accentMid: "#c4b5fd",
    label: "Information Security",
    content:
      "Vendor Infra is ISO 27001 certified. This ISO Standard is for information security. It specifies the requirements for establishing, implementing, maintaining and continually improving an information security management and continually improving an information security management system within the context of the organization. It also includes requirements for the assessment and treatment of information security risks tailored to the needs of the organization.",
  },
];

export default function ISO() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <PageHero eyebrow="ISO" title="ISO Certifications" />

      <section className="py-16 flex-1">
        <div className="container mx-auto px-4 max-w-5xl">

          {/* Header badge row */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {certifications.map((cert) => {
              const Icon = cert.icon;
              return (
                <div
                  key={cert.title}
                  className="flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-semibold"
                  style={{
                    borderColor: cert.accent,
                    color: cert.accent,
                    backgroundColor: cert.accentLight,
                  }}
                >
                  <Icon className="w-4 h-4" />
                  {cert.title}
                </div>
              );
            })}
          </div>

          <div className="space-y-8">
            {certifications.map((cert, index) => {
              const Icon = cert.icon;
              const flip = index % 2 === 1;

              return (
                <motion.article
                  key={cert.title}
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="relative bg-white rounded-3xl overflow-hidden shadow-sm"
                  style={{ border: `1.5px solid ${cert.accentMid}` }}
                >
                  {/* Top accent stripe */}
                  <div
                    className="h-1 w-full"
                    style={{ backgroundColor: cert.accent }}
                  />

                  <div
                    className={`flex flex-col lg:flex-row ${flip ? "lg:flex-row-reverse" : ""}`}
                  >
                    {/* Image panel with diagonal clip */}
                    <div
                      className="relative lg:w-[42%] flex-shrink-0 flex items-center justify-center p-10 min-h-[260px]"
                      style={{ backgroundColor: cert.accentLight }}
                    >
                      {/* Diagonal slice on desktop */}
                      <div
                        className="absolute inset-0 hidden lg:block"
                        style={{
                          backgroundColor: cert.accentLight,
                          clipPath: flip
                            ? "polygon(0 0, 100% 0, 85% 100%, 0 100%)"
                            : "polygon(0 0, 100% 0, 100% 100%, 15% 100%)",
                        }}
                      />

                      {/* Large watermark number */}
                      <span
                        className="absolute font-black select-none pointer-events-none"
                        style={{
                          fontSize: "clamp(80px, 14vw, 140px)",
                          color: cert.accentMid,
                          opacity: 0.5,
                          bottom: "-10px",
                          right: flip ? "auto" : "8px",
                          left: flip ? "8px" : "auto",
                          lineHeight: 1,
                          letterSpacing: "-4px",
                        }}
                      >
                        {cert.title.replace("ISO ", "")}
                      </span>

                      {/* Image card */}
                      <div className="relative z-10 bg-white rounded-2xl p-5 shadow-md w-full max-w-[220px]">
                        <img
                          src={cert.image}
                          alt={cert.title}
                          className="w-full h-auto object-contain"
                          loading="eager"
                        />
                      </div>
                    </div>

                    {/* Content panel */}
                    <div className="flex-1 p-8 md:p-10 flex flex-col justify-center">
                      {/* Label pill */}
                      <div className="flex items-center gap-2 mb-5">
                        <div
                          className="flex items-center justify-center w-9 h-9 rounded-xl"
                          style={{ backgroundColor: cert.accentLight }}
                        >
                          <Icon
                            className="w-5 h-5"
                            style={{ color: cert.accent }}
                          />
                        </div>
                        <span
                          className="text-xs font-bold uppercase tracking-widest"
                          style={{ color: cert.accent }}
                        >
                          {cert.label}
                        </span>
                        <BadgeCheck
                          className="w-4 h-4 ml-1"
                          style={{ color: cert.accent }}
                        />
                      </div>

                      {/* Title */}
                      <h2
                        className="text-4xl md:text-5xl font-black leading-none mb-1"
                        style={{ color: "#00274d" }}
                      >
                        ISO
                      </h2>
                      <h2
                        className="text-4xl md:text-5xl font-black leading-none mb-6"
                        style={{ color: cert.accent }}
                      >
                        {cert.title.replace("ISO ", "")}
                      </h2>

                      {/* Divider */}
                      <div
                        className="h-[2px] w-12 rounded-full mb-5"
                        style={{ backgroundColor: cert.accent }}
                      />

                      <p className="text-slate-600 leading-relaxed text-sm md:text-base text-justify">
                        {cert.content}
                      </p>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>

          {/* Bottom trust bar */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 rounded-2xl bg-[#00274d] p-6 flex flex-col sm:flex-row items-center justify-between gap-4"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#0057b8]/30 flex items-center justify-center">
                <BadgeCheck className="w-5 h-5 text-blue-300" />
              </div>
              <div>
                <p className="text-white font-semibold text-sm">Internationally Certified</p>
                <p className="text-blue-200 text-xs">ISO 9001 · ISO 14001 · ISO 27001</p>
              </div>
            </div>
            <a
              href="mailto:enquiry@vendorinfra.com"
              className="inline-flex items-center gap-2 bg-[#0057b8] hover:bg-[#0046a0] text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-colors duration-200 whitespace-nowrap"
            >
              enquiry@vendorinfra.com
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </motion.div>

        </div>
      </section>

      <Footer />
    </div>
  );
}