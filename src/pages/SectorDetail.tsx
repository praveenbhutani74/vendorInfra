import { motion } from "framer-motion";
import { Link, useParams } from "wouter";
import { ArrowLeft, ArrowRight, ChevronRight, TrendingUp, Layers } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { getSectorBySlug, sectors } from "@/lib/sectorsData";
import { SiteButton } from "@/components/SiteButton";
import NotFound from "@/pages/not-found";

export default function SectorDetail() {
  const { slug } = useParams<{ slug: string }>();
  const sector = getSectorBySlug(slug);

  if (!sector) return <NotFound />;

  const otherSectors = sectors.filter((s) => s.slug !== slug).slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero */}
      <section data-preserve-hero-typography className="relative h-[65vh] min-h-[460px] overflow-hidden">
        <img
          src={sector.image}
          alt={sector.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#00274d] via-[#00274d]/65 to-[#00274d]/20" />
        <div className="absolute inset-0 flex flex-col justify-end pb-14">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 text-white/60 text-sm mb-5"
            >
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <Link href="/sectors" className="hover:text-white transition-colors">Sectors</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-white/90">{sector.name}</span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-4"
            >
              <span className="inline-flex items-center gap-2 text-[#edad1a] text-[12px] font-bold uppercase tracking-[0.3em]">
                <span className="w-6 h-px bg-[#edad1a]/60" />
                Sector
                <span className="w-6 h-px bg-[#edad1a]/60" />
              </span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="text-4xl md:text-5xl font-semibold text-white mb-4 leading-tight tracking-tight"
            >
              {sector.name}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-white/75 text-base max-w-xl"
            >
              {sector.description}
            </motion.p>
          </div>
        </div>
      </section>

      {/* Key Stats */}
      <section className="bg-[#edad1a]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/25">
            {sector.keyStats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="py-8 px-6 text-center"
              >
                <div className="text-2xl md:text-3xl font-semibold text-white mb-1">{stat.value}</div>
                <div className="text-white/80 text-xs font-semibold uppercase tracking-widest">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 text-[#edad1a] text-[12px] font-bold uppercase tracking-[0.3em] mb-4">
                <span className="w-6 h-px bg-[#edad1a]/60" />
                Sector Overview
                <span className="w-6 h-px bg-[#edad1a]/60" />
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#00274d] mb-6 leading-tight">
                {sector.name} in India
              </h2>
              <p className="text-gray-600 leading-relaxed text-base mb-8">{sector.overview}</p>
              <div className="flex flex-wrap gap-3">
                <Link href="/contact">
                  <SiteButton className="normal-case tracking-normal">
                    Get Started
                  </SiteButton>
                </Link>
                <Link href="/services">
                  <SiteButton className="normal-case tracking-normal">
                    Our Services
                  </SiteButton>
                </Link>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Programs & Future Outlook */}
      <section className="py-20 bg-[#00274d] relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-5"
          style={{ backgroundImage: "radial-gradient(circle at 1px 1px,#ffffff 1px,transparent 0)", backgroundSize: "28px 28px" }}
        />
        <div className="container mx-auto px-4 max-w-5xl relative z-10">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Major Programs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex items-center gap-2 text-[#edad1a] text-[12px] font-bold uppercase tracking-[0.3em] mb-4">
                <span className="w-6 h-px bg-[#edad1a]/60" />
                Government Initiatives
                <span className="w-6 h-px bg-[#edad1a]/60" />
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">Major Programs</h2>
              <ul className="space-y-3">
                {sector.programs.map((program, i) => (
                  <li key={i} className="flex items-start gap-3 text-white/85 text-sm bg-white/10 border border-white/10 rounded-xl p-4">
                    <span className="w-6 h-6 rounded-full bg-[#edad1a] text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                    {program}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Future Outlook */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="flex flex-col"
            >
              <span className="inline-flex items-center gap-2 text-[#edad1a] text-[12px] font-bold uppercase tracking-[0.3em] mb-4">
                <span className="w-6 h-px bg-[#edad1a]/60" />
                What's Next
                <span className="w-6 h-px bg-[#edad1a]/60" />
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">Future Outlook</h2>
              <div className="bg-white/10 border border-white/10 rounded-2xl p-8 flex-1 flex flex-col justify-center">
                <div className="w-10 h-10 bg-[#edad1a] rounded-full flex items-center justify-center mb-5">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <p className="text-white/85 leading-relaxed text-base">{sector.futureOutlook}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Other Sectors */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-10">
            <div>
              <span className="inline-flex items-center gap-2 text-[#edad1a] text-[12px] font-bold uppercase tracking-[0.3em] mb-4">
                <span className="w-6 h-px bg-[#edad1a]/60" />
                Explore More
                <span className="w-6 h-px bg-[#edad1a]/60" />
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#00274d] leading-tight">Other Sectors</h2>
            </div>
            <Link href="/sectors" className="text-[#edad1a] font-semibold text-sm hover:underline inline-flex items-center gap-1">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {otherSectors.map((s) => (
              <Link key={s.slug} href={`/sectors/${s.slug}`}>
                <motion.div
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.2 }}
                  className="group relative rounded-2xl overflow-hidden shadow-md cursor-pointer"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={s.image}
                      alt={s.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#00274d]/90 via-[#00274d]/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3 className="text-white font-bold text-base mb-1">{s.name}</h3>
                    <p className="text-white/65 text-xs">{s.description}</p>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#edad1a]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
            Ready to streamline your {sector.name} supply chain?
          </h2>
          <p className="text-white/85 mb-8 max-w-xl mx-auto text-base">
            Join thousands of contractors, vendors and EPC companies already on Vendor Infra.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/contact">
              <SiteButton variant="onGold" className="normal-case tracking-normal">
                Get in Touch
              </SiteButton>
            </Link>
            <Link href="/sectors">
              <SiteButton variant="onGold" arrow={false} className="normal-case tracking-normal">
                <ArrowLeft className="w-4 h-4" /> Back to Sectors
              </SiteButton>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
