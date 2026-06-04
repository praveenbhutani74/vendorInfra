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
    content: `If you have any questions about these Terms, please contact us at:\nVendor Infra Global Private Limited\nSuit No. 1436-1439, Plus Offices, Landmark Cyber Park, Sector 67, Gurugram, Haryana – 122101\nEmail: enquiry@vendorinfra.com`,
  },
];

export default function Terms() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <PageHero
        eyebrow="Terms of Service"
        title="Simple, transparent usage guidelines"
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
