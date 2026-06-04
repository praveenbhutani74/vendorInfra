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
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <PageHero
        eyebrow="Policy"
        title="Pricing Policy"
      />

      <section className="py-20 bg-gray-50 flex-1">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {sections.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.03 }}
                className={`p-7 md:p-8 ${index < sections.length - 1 ? "border-b border-gray-100" : ""}`}
              >
                <h2 className="text-3xl md:text-4xl font-bold leading-tight text-[#00274d] mb-3">{section.title}</h2>
                {section.content.split("\n\n").map((paragraph) => (
                  <p key={paragraph} className="text-gray-600 leading-relaxed text-sm mb-3 last:mb-0">
                    {paragraph}
                  </p>
                ))}
              </motion.div>
            ))}
          </div>
          <p className="text-center text-gray-400 text-xs mt-8">
            For questions, contact enquiry@vendorinfra.com
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
