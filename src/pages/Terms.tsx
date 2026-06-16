import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/layout/PageHero";
import { motion } from "framer-motion";

const sections = [
  {
    title: "Introduction",
    content: `These terms of service ("Terms", "User Agreement") are an agreement between Vendor Infra Global Private Limited, Owner and operator of the website www.vendorinfra.com ("VendorInfra", "Vendor Infra", "us", "we" or "our") and you ("User", "you" or "your"). This Agreement sets forth the general terms and conditions of your use of the www.vendorinfra.com website and any of its products or services (collectively, "Website" or "Services").\n\nKindly read this Agreement carefully. In part consideration for accessing/using this Website in any way whatsoever, you agree to be bound by all the terms and conditions of this Agreement.`,
  },
  {
    title: "Interpretations",
    content: `In this User Agreement, the following words and expressions shall have the meanings stated:\n\n1. "Agreement" means this User Agreement including but not limited to Terms of Use, Privacy Policy, Pricing Policy, Security Policy etc.\n2. "Content" means Website's design, layout, text, images, graphics, sound, video etc.\n3. "VendorInfra" means Vendor Infra Global Private Limited, a company duly registered in India under Companies Act 2013.\n4. "vendorinfra.com" means the internet Website and Portal currently located at the URL www.vendorinfra.com.\n5. "Services" means services including premium and/or upgraded services, or any content, or any benefits or facilities provided via vendorinfra.com.`,
  },
  {
    title: "Accounts & Registration",
    content: `You are responsible for maintaining the confidentiality of your account and password and for restricting access to your computer to prevent unauthorized access to your account. You agree to accept responsibility for all activities that occur under your account or password. We reserve the right to refuse service, terminate accounts, remove or edit content, or cancel orders in our sole discretion.`,
  },
  {
    title: "Intellectual Property",
    content: `The Website and its content, features and functionality (including but not limited to all information, software, text, displays, images, video and audio, and the design, selection and arrangement thereof), are owned by Vendor Infra Global Private Limited, its licensors or other providers of such material and are protected by Indian and international copyright, trademark, patent, trade secret and other intellectual property or proprietary rights laws.`,
  },
  {
    title: "User Conduct",
    content: `You agree not to use the Website in any way that:\n\n- Is unlawful, fraudulent, or deceptive\n- Infringes any third party's intellectual property or privacy rights\n- Transmits unsolicited advertising or promotional material (spam)\n- Introduces viruses, trojans, worms, or other malicious or harmful material\n- Attempts to gain unauthorized access to any part of the Website or its related systems`,
  },
  {
    title: "Limitation of Liability",
    content: `To the fullest extent permitted by applicable law, Vendor Infra shall not be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of (or inability to access or use) the Website or Services.`,
  },
  {
    title: "Governing Law",
    content: `These Terms shall be governed and construed in accordance with the laws of India, without regard to its conflict of law provisions. Any disputes arising under or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts located in Gurugram, Haryana, India.`,
  },
  {
    title: "Changes to Terms",
    content: `We reserve the right to modify these Terms at any time. We will provide notice of significant changes by updating the date at the top of this page. Your continued use of the Website after such changes constitutes your acceptance of the new Terms.`,
  },
  {
    title: "Contact",
    content: `If you have any questions about these Terms, please contact us at:\nVendor Infra Global Private Limited\nSuit No. 1436-1440, Plus Offices, Landmark Cyber Park, Sector 67, Gurugram, Haryana – 122101\nEmail: enquiry@vendorinfra.com`,
  },
];

export default function Terms() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <PageHero
        eyebrow="Terms of Service"
        title="Simple, transparent usage guidelines"
      />

      {/* Last updated banner */}
      {/* <div className="bg-[#00274d] text-white text-center text-xs py-2 tracking-wide">
        Last updated: <span className="font-semibold text-blue-300">June 2025</span>
        &nbsp;&nbsp;|&nbsp;&nbsp;
        Effective for all users of <span className="font-semibold text-blue-300">vendorinfra.com</span>
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
                    {/* Accent top border */}
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
              <svg className="w-5 h-5 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="text-white font-semibold text-base mb-1">Have questions? Reach out to us at </p>
            {/* <p className="text-blue-200 text-sm mb-4">Our team is happy to clarify anything in this agreement.</p> */}
            <a
              href="mailto:enquiry@vendorinfra.com"
              className="inline-flex items-center gap-2 bg-[#0057b8] hover:bg-[#0046a0] text-white text-sm font-semibold px-6 py-2.5 rounded-full transition-colors duration-200"
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