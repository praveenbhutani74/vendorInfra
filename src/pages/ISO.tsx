import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { PageHero } from "@/components/layout/PageHero";
import { motion } from "framer-motion";
import { BadgeCheck, Leaf, Lock, ShieldCheck } from "lucide-react";

const certifications = [
  {
    title: "ISO 9001",
    image: "https://vendorinfra.com/wp-content/uploads/2025/11/9001-2015.jpg",
    icon: ShieldCheck,
    content:
      "Vendor Infra is ISO 9001 certified. This is one of the most popular ISO standards for creating, implementing, and maintaining a Quality Management System (QMS) for any given company, regardless of its industry, capital, or size",
  },
  {
    title: "ISO 14001",
    image: "https://vendorinfra.com/wp-content/uploads/2025/11/14001-2015.jpg",
    icon: Leaf,
    content:
      "Vendor Infra is ISO 14001 certified. This ISO standard provides guidelines on what has to be done to implement an environmental management system (EMS). It includes policies, processes, plans, records, and best practices that define rules regarding how your company interacts with the environment. ISO 14001 requirements give you a framework, along with guidelines. for creating EMS for any organization",
  },
  {
    title: "ISO 27001",
    image: "https://vendorinfra.com/wp-content/uploads/2025/11/27001-2013.jpg",
    icon: Lock,
    content:
      "Vendor Infra is ISO 27001 certified. This ISO Standard is for information security. It specifies the requirements for establishing, implementing, maintaining and continually improving an information security management and continually improving an information security management system within the context of the organization. It also includes requirements for the assessment and treatment of information security risks tailored to the needs of the organization.",
  },
];

export default function ISO() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <PageHero
        eyebrow="ISO"
        title="ISO Certifications"
      />

      <section className="py-20 bg-[#f5f7fb] flex-1">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="space-y-10">
              {certifications.map((cert, index) => {
                const Icon = cert.icon;
                const flip = index % 2 === 1;

                return (
                  <motion.article
                    key={cert.title}
                    initial={{ opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ delay: index * 0.08 }}
                    className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
                  >
                    <div
                      className={`${flip ? "lg:order-2" : ""} bg-[#071827] p-8 md:p-10 flex items-center justify-center`}
                    >
                      <div className="bg-white rounded-2xl p-6 shadow-xl w-full max-w-sm">
                        <img
                          src={cert.image}
                          alt={cert.title}
                          className="w-full h-auto object-contain"
                          loading="eager"
                        />
                      </div>
                    </div>

                    <div
                      className={`${flip ? "lg:order-1" : ""} p-8 md:p-12 flex flex-col justify-center`}
                    >
                      <div className="flex items-center gap-3 mb-7">
                        <div className="w-13 h-13 rounded-2xl bg-[#fef3c7] text-[#071827] flex items-center justify-center">
                          <Icon className="w-6 h-6" aria-hidden="true" />
                        </div>
                        <span className="inline-flex items-center gap-2 rounded-full bg-[#f8fafc] border border-gray-200 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-gray-600">
                          <BadgeCheck
                            className="w-4 h-4 text-[#edad1a]"
                            aria-hidden="true"
                          />
                          {cert.title}
                        </span>
                      </div>
                      <h2 className="text-3xl md:text-4xl font-bold leading-tight text-[#071827] mb-5">
                        {cert.title}
                      </h2>
                      <p className="text-gray-600 leading-relaxed text-base md:text-lg">
                        {cert.content}
                      </p>
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
