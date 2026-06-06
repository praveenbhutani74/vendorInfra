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
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <PageHero
        eyebrow="Policy"
        title="Committed to protecting your privacy"
      />

      <section className="py-20 bg-gray-50 flex-1">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {sections.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className={`p-8 ${i < sections.length - 1 ? "border-b border-gray-100" : ""}`}
              >
                <h2 className="text-3xl md:text-4xl font-bold leading-tight text-[#00274d] mb-3">{s.title}</h2>
                {s.content.split("\n\n").map((para, j) => (
                  <p key={j} className="text-gray-600 leading-relaxed text-sm mb-3 last:mb-0 whitespace-pre-line">{para}</p>
                ))}
              </motion.div>
            ))}
          </div>
          <p className="text-center text-gray-400 text-xs mt-8">
            Last updated: January 2026 · For questions, contact enquiry@vendorinfra.com
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
