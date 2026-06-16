import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/layout/PageHero";
import { motion } from "framer-motion";

const sections = [
  {
    title: "Introduction",
    content: `This privacy policy ("Policy") describes how we collect, protect and use the identifiable personal or business information ("Personal Information", "Business Information" or "Personal and Business Information") you ("User", "you" or "your") provide on the www.vendorinfra.com website and any of its products or services (collectively, "Website" or "Services") owned and operated by Vendor Infra Global Private Limited ("VendorInfra", "Vendor Infra", "us", "we" or "our").\n\nPersonal information means information or an opinion about an identified individual, or a reasonably identifiable individual. This Policy applies to personal information collected and/or held by Vendor Infra.`,
  },
  {
    title: "Collection of Personal & Business Information",
    content: `We collect, receive and store any Personal and Business information you knowingly provide to us when you create an account, publish content, make a purchase, fill any online form on the Website. When required this information may include your email address, name, phone number, address, Business Information and other Personal Information.\n\nYou can choose not to provide us with certain information, but then you may not be able to take advantage of some of the Website's features. However, once you provided the information, it is deemed that you have given Vendor Infra right to publish the provided business and personal information.`,
  },
  {
    title: "Collection of Usage Statistics",
    content: `When you visit the Website our servers automatically record information that your browser sends. This data may include information such as your computer's IP address, browser type and version, operating system type and version, language preferences or the webpage you were visiting before you came to our Website, pages of our Website that you visit, the time spent on those pages, information you search for on our Website, access times and dates, and other statistics.`,
  },
  {
    title: "Use of Collected Information",
    content: `Any of the information we collect from you may be used to: personalise your experience; improve our Website; improve customer service; process transactions; send periodic emails; and run and operate our Website and Services. Information collected automatically is used only to identify potential cases of abuse and establish statistical information regarding Website usage. This statistical information is not otherwise aggregated in such a way that would identify any particular user of the system.`,
  },
  {
    title: "Sharing of Information",
    content: `We do not sell, trade, or rent Users' personal identification information to others. We may share generic aggregated demographic information not linked to any personal identification information regarding visitors and users with our business partners, trusted affiliates and advertisers. We may use third-party service providers to help us operate our business and the Website or administer activities on our behalf.`,
  },
  {
    title: "Data Retention",
    content: `We will retain and use your personal information for the period necessary to comply with our legal obligations, resolve disputes, and enforce our agreements unless a longer retention period is required or permitted by law. We may use any aggregated data derived from or incorporating your Personal Information after you update or delete it, but not in a manner that would identify you personally.`,
  },
  {
    title: "Security of Information",
    content: `We secure information you provide on computer servers in a controlled, secure environment, protected from unauthorized access, use, or disclosure. We maintain reasonable administrative, technical, and physical safeguards in an effort to protect against unauthorized access, use, modification, and disclosure of personal information in its control and custody.`,
  },
  {
    title: "Your Rights",
    content: `You have the right to access, update or delete the information we have on you. You may object to processing of your personal information, ask us to restrict processing of your personal information, or request portability of your personal information. To exercise any of these rights, please contact us at enquiry@vendorinfra.com.`,
  },
  {
    title: "Contact Us",
    content: `If you have any questions about this Policy, please contact us at:\nVendor Infra Global Private Limited\nSuit No. 1436-1440, Plus Offices, Landmark Cyber Park, Sector 67, Gurugram, Haryana, India – 122101\nEmail: enquiry@vendorinfra.com\nPhone: +91-8800404840`,
  },
];

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <PageHero
        eyebrow="Policy"
        title="Committed to protecting your privacy"
      />

      {/* Last updated banner */}
      {/* <div className="bg-[#00274d] text-white text-center text-xs py-2 tracking-wide">
        Last updated: <span className="font-semibold text-blue-300">June 2025</span>
        &nbsp;&nbsp;|&nbsp;&nbsp;
        Applicable to all users of{" "}
        <span className="font-semibold text-blue-300">vendorinfra.com</span>
      </div> */}

      <section className="py-16 flex-1">
        <div className="container mx-auto px-4 max-w-4xl">

          {/* Quick-nav index card */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-10 rounded-2xl border border-[#0057b8]/20 bg-white shadow-sm overflow-hidden"
          >
            <div className="flex items-center gap-3 px-6 py-4 bg-[#00274d]">
              <div className="w-2 h-2 rounded-full bg-blue-300 animate-pulse" />
              <span className="text-white text-sm font-semibold tracking-wider uppercase">
                Table of Contents
              </span>
            </div>
            <ul className="grid grid-cols-2 sm:grid-cols-3 gap-px bg-[#e8f1fb]">
              {sections.map((s, i) => (
                <li key={s.title} className="bg-white">
                  <a
                    href={`#section-${i}`}
                    className="flex items-center gap-2 px-4 py-3 text-xs text-[#00274d] font-medium hover:bg-[#e8f1fb] hover:text-[#0057b8] transition-colors group"
                  >
                    <span className="w-5 h-5 flex-shrink-0 rounded-full bg-[#e8f1fb] group-hover:bg-[#0057b8] group-hover:text-white text-[10px] font-bold flex items-center justify-center text-[#0057b8] transition-colors">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Sections */}
          <div className="relative">
            {/* Vertical timeline rail */}
            <div className="absolute left-[27px] top-0 bottom-0 w-px bg-gradient-to-b from-[#0057b8] via-[#0057b8]/30 to-transparent hidden sm:block" />

            <div className="space-y-5">
              {sections.map((s, i) => (
                <motion.div
                  id={`section-${i}`}
                  key={s.title}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ delay: i * 0.05, duration: 0.4 }}
                  className="group relative"
                >
                  {/* Timeline node */}
                  <div className="absolute left-0 top-6 w-[55px] hidden sm:flex items-center justify-center z-10">
                    <div className="w-9 h-9 rounded-full bg-white border-2 border-[#0057b8] flex items-center justify-center text-[11px] font-bold text-[#0057b8] shadow-sm group-hover:bg-[#0057b8] group-hover:text-white transition-colors duration-200">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                  </div>

                  {/* Card */}
                  <div className="sm:ml-16 rounded-2xl bg-white border border-[#0057b8]/15 shadow-sm overflow-hidden group-hover:border-[#0057b8]/50 group-hover:shadow-md transition-all duration-200">
                    {/* Accent top border — always visible */}
                    <div className="h-[3px] w-full bg-gradient-to-r from-[#0057b8] to-[#38bdf8]" />

                    <div className="px-8 py-7">
                      <div className="flex items-start gap-4 mb-4">
                        {/* Mobile number badge */}
                        <span className="sm:hidden flex-shrink-0 mt-1 w-7 h-7 rounded-full bg-[#e8f1fb] text-[#0057b8] text-[11px] font-bold flex items-center justify-center">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <h2 className="text-xl md:text-2xl font-bold text-[#00274d] leading-snug">
                          {s.title}
                        </h2>
                      </div>

                      {/* Divider */}
                      <div className="h-px bg-gradient-to-r from-[#0057b8]/30 via-[#0057b8]/10 to-transparent mb-5" />

                      {s.content.split("\n\n").map((para, j) => (
                        <p
                          key={j}
                          className="text-slate-600 leading-relaxed text-sm mb-3 last:mb-0 whitespace-pre-line text-justify"
                        >
                          {para}
                        </p>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Footer contact card */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 sm:ml-16 rounded-2xl bg-[#00274d] border border-[#0057b8]/30 p-8 text-center shadow-lg"
          >
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#0057b8]/20 mb-4">
              <svg
                className="w-5 h-5 text-blue-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <p className="text-white font-semibold text-base mb-1">
               Have questions? Reach out to us at
            </p>
            {/* <p className="text-blue-200 text-sm mb-4">
              Our team is happy to clarify anything about how we handle your data.
            </p> */}
            <a
              href="mailto:enquiry@vendorinfra.com"
              className="inline-flex items-center gap-2 bg-[#0057b8] hover:bg-[#0046a0] text-white text-sm font-semibold px-6 py-2.5 rounded-full transition-colors duration-200"
            >
              enquiry@vendorinfra.com
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>
          </motion.div>

        </div>
      </section>

      <Footer />
    </div>
  );
}