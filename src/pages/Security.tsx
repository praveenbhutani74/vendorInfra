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
} from "lucide-react";

const securityPillars = [
  {
    title: "Physical Security",
    icon: Building2,
    points: [
      "Technologies like biometric identification, metal detection, cameras, vehicle barriers, and laser-based intrusion detection systems are used to protect Data Center floors",
      "Security guards are present 24/7/365 to protect access to the servers",
      "Human audits are regularly run to check the inviolability of sites",
      "Remote access of the servers requires multiple levels of authentication",
      "No sensitive server can be accessed directly from the Internet",
    ],
  },
  {
    title: "Network Security",
    icon: Network,
    points: [
      "The Platform runs on custom hardware running a custom hardened operating system and file system.",
      "Rigorous firewall rules are set up to control ingress and egress of data",
      "Intrusion Detection System and Intrusion Protection System with alarms of abnormalities",
      "All actions are logged on an external central logging server configured with alarms & automatic notifications",
    ],
  },
  {
    title: "Data Security",
    icon: Database,
    points: [
      "All communication between your browser and our servers is secured via a strong SSL certificate",
      "All communications between our internal servers are re-encrypted to ensure it cannot be monitored",
      "Persistent disks, for instance, are already encrypted using AES-256, and the keys themselves are encrypted with master keys.",
      "Daily encrypted backups of the database are stored in multiple locations for disaster recovery",
      "All passwords are encrypted in our database using strong encryption and cannot be decoded",
    ],
  },
  {
    title: "Operational Security",
    icon: LockKeyhole,
    points: [
      "No sensitive data is displayed in our Customer Support portal",
      "All developers require strong authentication to be able to push code to our central repository",
      "All committed code is automatically tested for errors, bugs, and security holes by third party services",
      "All systems are monitored 24/7 using leading 3rd party tools for errors, exceptions, and performance issues",
    ],
  },
];

export default function Security() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <PageHero
        eyebrow="Policy"
        title="Security Policy"
      />

      <section className="py-20 bg-[#f5f7fb] flex-1">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] gap-8 items-stretch mb-10">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-[#071827] text-white rounded-2xl p-8 md:p-10 flex flex-col justify-between overflow-hidden relative"
              >
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_20%_15%,#edad1a_0,transparent_28%),radial-gradient(circle_at_85%_20%,#2e6ba8_0,transparent_32%)]" />
                <div className="relative">
                  <div className="w-14 h-14 rounded-2xl bg-[#edad1a] text-[#071827] flex items-center justify-center mb-8">
                    <ShieldCheck className="w-7 h-7" aria-hidden="true" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold leading-tight max-w-xl">
                    Built for confidential procurement data
                  </h2>
                  <p className="mt-5 text-white/70 leading-relaxed">
                    Vendor Infra protects project, vendor, pricing, and procurement information with layered controls across physical, network, data, and operational security.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.08 }}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 md:p-10"
              >
                <h2 className="text-3xl md:text-4xl font-bold text-[#00274d] leading-tight mb-5">
                  Cloud & Data Security is Critical to everything we do at
                  Vendor Infra
                </h2>
                <div className="space-y-5 text-gray-600 leading-relaxed">
                  <p>
                    We know how important and confidential your pricing
                    information is to your business and competitive edge. Feel
                    reassured knowing that Vendor Infra was built from the
                    ground up and is operated on a daily basis to ensure that
                    your confidential data is always secure and confidential.
                  </p>
                  <p>
                    This page describes some of the security measures we've set
                    up to protect your data. We are extremely concerned and
                    active in security. We are always doing our best to maintain
                    and increase the security of Vendor Infra. As such, this
                    page will be regularly updated with new measures and
                    information.
                  </p>
                </div>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {securityPillars.map((pillar, index) => {
                const Icon = pillar.icon;
                return (
                  <motion.article
                    key={pillar.title}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.06 }}
                    className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7 md:p-8"
                  >
                    <div className="flex items-center gap-4 mb-7">
                      <div className="w-12 h-12 rounded-xl bg-[#fef3c7] text-[#071827] flex items-center justify-center">
                        <Icon className="w-6 h-6" aria-hidden="true" />
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold text-[#071827]">
                        {pillar.title}
                      </h3>
                    </div>
                    <ul className="space-y-4">
                      {pillar.points.map((point) => (
                        <li
                          key={point}
                          className="flex gap-3 text-sm md:text-base text-gray-600 leading-relaxed"
                        >
                          <span className="mt-1.5 h-2 w-2 rounded-full bg-[#edad1a] shrink-0" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
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
