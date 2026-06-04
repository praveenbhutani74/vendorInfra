import { usePageSeo } from "@/lib/seo";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { sectors } from "@/lib/sectorsData";
import { CtaArrow } from "@/components/CtaArrow";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.07 } },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Sectors() {
  usePageSeo("Infrastructure Sectors | Vendor Infra", "Explore 20+ infrastructure sectors including roads, railways, airports, ports, power, solar, water, and more.");
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero */}
      <section data-preserve-hero-typography className="relative bg-[#00274d] py-24 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.4) 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 rounded-full border border-[#edad1a]/40 bg-[#edad1a]/10 px-4 py-2 text-sm font-semibold text-[#edad1a] mb-6"
          >
            Sectors
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-semibold text-white mb-6"
          >
            Enabling transformation across{" "}
            <span>20+ sectors</span>
          </motion.h1>
        </div>
      </section>

      {/* Sectors Grid */}
      <section className="py-24 bg-gray-50 flex-1">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="inline-flex items-center gap-2 text-[#edad1a] text-[12px] font-bold uppercase tracking-[0.3em] mb-4">
              <span className="w-6 h-px bg-[#edad1a]/60" />
              Infrastructure Sectors
              <span className="w-6 h-px bg-[#edad1a]/60" />
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#00274d] leading-tight">
              Explore sectors powered by Vendor Infra
            </h2>
          </div>
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {sectors.map((sector) => (
              <motion.div key={sector.slug} variants={item}>
                <Link href={`/sectors/${sector.slug}`}>
                  <div className="group relative overflow-hidden rounded-2xl shadow-md cursor-pointer">
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={sector.image}
                        alt={sector.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#00274d]/90 via-[#00274d]/30 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 min-h-[128px] p-6 flex flex-col justify-end">
                      <h3 className="text-white font-bold text-xl leading-tight min-h-[56px] flex items-end">{sector.name}</h3>
                      <p className="text-white/80 text-sm leading-snug line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-2 min-h-[36px]">
                        {sector.description}
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#edad1a]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold leading-tight text-[#00274d] mb-4">
            Ready to streamline your sector's supply chain?
          </h2>
          <p className="text-[#00274d]/75 mb-8 max-w-xl mx-auto font-medium">
            Join thousands of contractors, vendors and EPC companies already on Vendor Infra.
          </p>
          <Link href="/contact">
            <button className="group inline-flex items-center gap-2 bg-[#00274d] hover:bg-[#003a73] text-white font-semibold px-5 py-2.5 rounded-md text-sm transition-colors shadow-lg">
              Get in Touch
              <CtaArrow variant="blue" />
            </button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
