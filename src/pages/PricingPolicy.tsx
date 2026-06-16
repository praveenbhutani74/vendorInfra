import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { PageHero } from "@/components/layout/PageHero";
import { motion } from "framer-motion";

const sections = [
  {
    title: "Applicability",
    content:
      'Vendor Infra is the exclusive property of the Vendor Infra Global Private Limited. This Pricing Policy is applicable between Vendor Infra, a company registered under Indian laws (hereafter referred to as "Vendor Infra"), and any persons wishing to put plants, machines, equipment, tools etc. for sell/hire/purchase/rent using the Website http://VendorInfra.com/ (hereafter referred to as "Users, Members"). This Pricing Policy is to be considered in conjunction with our Privacy Policies and Terms of Use.',
  },
  {
    title: "Definitions",
    content:
      'Unless otherwise defined hereunder or ascertained from the context, expressions employed in this Pricing Policy shall have the meaning ascribed to them under the Terms of Use.\n\n"Commission" means the amount charged by Vendor Infra in advance from both Owner and Hirer once the rental/sell agreement is confirmed between the Parties.',
  },
  {
    title: "Terms for Rental Agreement",
    content:
      "The Parties represent that they are legally competent to enter into a contract. Owners who offer a machine etc. for rent represent that they are legally entitled to offer and/or rent the machine to others. Any agents, employees, attorneys, or anyone else acting on behalf of the Owners or Hirers must follow the terms of this Pricing Policy and all other Vendor Infra Policies.",
  },
  {
    title: "Fees",
    content:
      "The price of each Item listed on Vendor Infra is expressed in Indian Rupees or the relevant currency as applicable in such countries. While listing their machines etc., the Owners must indicate whether the listed price is exclusive or inclusive of applicable taxes, costs, possible delivery fees and insurance costs.\n\nTo initiate the process, the Hirer will send a request for the reservation to the Owner through Vendor Infra website. A Rental Agreement is confirmed by the Owner's acceptance of the Hirer's Reservation Request. With the exception of promotional offers that are explicitly outlined on the Website, the Owner and Hirer are liable to pay commission to Vendor Infra once a Rental Agreement is confirmed between the Parties.",
  },
  {
    title: "Access, registration, the listing of machines and use of the Website are free.",
    content:
      "Vendor Infra can modify its policies on listings and commission fees and can also modify the fees set for these services. Temporary or permanent modifications are effective as soon as they are published on the Website and are applicable to all subsequent transactions. In the case of temporary modifications, the duration of the changes will be clearly indicated on the Website.\n\nAs an Owner, you must pay commission if prescribed of the Total Rent Amount whenever you accept a Hirer's Reservation Request. As a Hirer, you must pay commission if prescribed of the Total Rent Amount whenever a Rental Agreement is confirmed between you and an Owner.",
  },
  {
    title: "Billing & Payment",
    content:
      "An invoice must be paid within 30 days of when it was issued to the Member Account on Vendor Infra. If payment is not made by its due date, late fees will be applied to the Member Account. It is possible to set up automatic payments of your invoices at regular intervals by contacting Vendor Infra.",
  },
  {
    title: "Payment Default & Late Fees",
    content:
      "Late fees shall be levied if an invoice has not been paid 30 calendar days after being issued. In case of payment default on amounts due to Vendor Infra, a formal notice will be sent and billed to the Member. If the default invoices remain unpaid following the formal notice, the amounts due will accrue late fees interest at a yearly rate of 12%. A penalty fee of 15% of the total due will also be applied, which will be added to the fees for the formal notice, and any other costs incurred by Vendor Infra in recovering the amounts owed.",
  },
  {
    title: "Tax",
    content:
      "Members are solely liable for all the taxes, fees and commissions resulting from the use of Services and Website. Taxes (such as, and without limitations, indirect taxes) might apply to your transactions whether you are an individual or entity, or whether you are an Owner or a Hirer. Members are encouraged to seek tax advice from a professional.",
  },
  {
    title: "Warranties & Limitation of Liabilities",
    content:
      "As agreed, outline in the Terms of Use, Vendor Infra is not responsible for any loss that may occur during usage of the Website or Services. You are encouraged to review the Terms of Use for any further information.",
  },
  {
    title: "Applicable Laws",
    content:
      "This Pricing Policy is governed by and construed in accordance with the laws of India and you agree, in the event of any dispute arising in relation to this Agreement or any dispute arising in relation to the Website, to submit to the jurisdiction of the courts of New Delhi, India for the resolution of all such disputes.",
  },
  {
    title: "Contacting Us",
    content:
      "If you have any questions or queries or clarification about this Policy, please contact us at enquiry@vendorinfra.com.",
  },
  {
    title: "Note",
    content:
      "For pricing policy related to annual subscription plans of Vendor Infra, please refer to Terms of Services document (Section -11).",
  },
];

export default function PricingPolicy() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <PageHero eyebrow="Policy" title="Pricing Policy" />

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
              Our team is happy to clarify any aspect of this policy.
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