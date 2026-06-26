import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
  Mail,
  Send,
  Sparkles,
  Upload,
  Users,
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/layout/PageHero";
import { usePageSeo } from "@/lib/seo";
import { siteButtonClasses } from "@/components/SiteButton";

const culturePoints = [
  {
    title: "Growth-oriented culture",
    text: "We invest in our people through hands-on learning, mentorship, and clear paths for advancement.",
    icon: Sparkles,
  },
  {
    title: "Collaborative environment",
    text: "Every team member's voice is heard. We believe the best ideas can come from anyone, at any level.",
    icon: Users,
  },
  {
    title: "Performance-driven",
    text: "Hard work and results are recognized and rewarded, not overlooked.",
    icon: CheckCircle2,
  },
  {
    title: "Stability with opportunity",
    text: "Join an established, reputable business while still having the chance to make a visible impact.",
    icon: BriefcaseBusiness,
  },
];

const openings = [
  "Sales Executive / Senior Sales Executive",
  "Digital Marketing Executive (Graphic Design & Social Media Specialist)",
];

const positions = [
  "Sales Executive",
  "Sr. Sales Executive",
  "Social Media Executive",
  "Other",
];

export default function Career() {
  usePageSeo(
    "Career at Vendor Infra | Join Our Team",
    "Explore current openings at Vendor Infra and apply to build your career with a growth-oriented infrastructure technology company."
  );

  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
    event.currentTarget.reset();
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="fixed right-0 top-0 h-full w-[18px] bg-[#00274d] z-50 pointer-events-none" />
      <Navbar />

      <PageHero
        eyebrow="Career"
        title="Transforming a Trillion-Dollar Industry with Technology, Innovation & Deep Industry Expertise."
      />

      <main className="flex-1 bg-gradient-to-b from-[#f6f8fb] via-white to-[#f6f8fb]">
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-14 items-start">
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="lg:sticky lg:top-28"
              >

                
                <span className="inline-flex items-center gap-3 text-[#edad1a] text-[12px] font-bold uppercase tracking-[0.3em] mb-4">
                  <span className="w-8 h-px bg-[#edad1a]/60" />
                  Join the team
                  <span className="w-8 h-px bg-[#edad1a]/60" />
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-[#00274d] leading-tight mb-5">
                  Your work should feel visible, valued, and useful.
                </h2>
                <p className="text-gray-600 leading-relaxed mb-5">
                  At Vendor Infra, our people are the foundation of everything we build. We are always looking for driven, talented individuals who want to grow with a company that values initiative, integrity, and innovation.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  If you are looking for a workplace where your contributions matter and your career can genuinely progress, explore our current openings below.
                </p>
              </motion.div>

              <div className="grid sm:grid-cols-2 gap-2">
                {culturePoints.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <motion.article
                      key={item.title}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                      className="bg-white border border-[#00274d] rounded-2xl p-6 shadow-sm hover:shadow-lg hover:shadow-[#00274d]/10 transition-all"
                    >
                      <div className="w-12 h-12 rounded-xl bg-[#00274d]/5 text-[#00274d] flex items-center justify-center mb-5">
                        <Icon className="w-6 h-6" />
                      </div>
                      <h4 className="text-lg font-bold text-[#00274d] mb-2">{item.title}</h4>
                      <p className="text-sm text-gray-600 leading-relaxed">{item.text}</p>
                    </motion.article>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20 bg-white">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid lg:grid-cols-[1fr_380px] gap-8 items-start">
              <div>
                <span className="inline-flex items-center gap-3 text-[#edad1a] text-[12px] font-bold uppercase tracking-[0.3em] mb-4">
                  <span className="w-8 h-px bg-[#edad1a]/60" />
                  Current openings
                  <span className="w-8 h-px bg-[#edad1a]/60" />
                </span>

                <h2 className="text-3xl md:text-4xl font-bold text-[#00274d] leading-tight mb-8">
                  Roles we are hiring for
                </h2>
                <div className="space-y-4">
                  {openings.map((opening, index) => (
                    <motion.div
                      key={opening}
                      initial={{ opacity: 0, x: -14 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                      className="group flex items-center gap-5 rounded-2xl border border-l-4 border-gray-200 border-l-[#00274d] bg-[#f8fafc] p-5 md:p-6 hover:border-[#edad1a]/70 hover:bg-white hover:shadow-md transition-all"
                    >
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#00274d] text-white group-hover:bg-[#edad1a] transition-colors">
                        <BriefcaseBusiness className="w-5 h-5" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="font-bold text-[#00274d] text-lg leading-snug">{opening}</p>
                        <p className="text-sm text-gray-500 mt-1">Full-time role at Vendor Infra</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <aside className="rounded-2xl overflow-hidden text-white p-6 shadow-xl shadow-[#00274d]/15 bg-[#00274d]">
                <div className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center mb-5">
                  <Mail className="w-6 h-6 text-[#edad1a]" />
                </div>
                <h3 className="text-xl font-bold mb-3">How to apply</h3>
                <p className="text-white/80 text-sm leading-relaxed mb-5">
                  Send your updated CV along with your portfolio, if applicable, to our HR team.
                </p>
                <a
                  href="mailto:hr@vendorinfra.com"
                  className="inline-flex items-center gap-2 text-[#edad1a] font-bold break-all"
                >
                  hr@vendorinfra.com <ArrowRight className="w-4 h-4 shrink-0" />
                </a>
                <p className="text-white/70 text-sm leading-relaxed mt-5">
                  Please mention the position you are applying for in the subject line, such as "Application for Sales Executive" or "Application for Social Media Executive".
                </p>
              </aside>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-12">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="text-center mb-10">
              <span className="inline-flex items-center gap-3 text-[#edad1a] text-[12px] font-bold uppercase tracking-[0.3em] mb-4">
                <span className="w-8 h-px bg-[#edad1a]/60" />
                Apply now
                <span className="w-8 h-px bg-[#edad1a]/60" />
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#00274d] leading-tight">
                Share your CV/Resume
              </h2>
              <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
                Use this form to submit your application. Our HR team will review your profile and get in touch if there is a match.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-[#00274d] shadow-xl shadow-[#00274d]/10 p-5 md:p-8">
              <div className="grid md:grid-cols-2 gap-5">

                {/* 1. Full Name — required */}
                <label className="block">
                  <span className="block text-sm font-semibold text-[#00274d] mb-2">
                    Full Name <span className="text-[#00274d]">*</span>
                  </span>
                  <input
                    required
                    name="name"
                    className="w-full rou nded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#edad1a] focus:ring-4 focus:ring-[#edad1a]/10"
                  />
                </label>

                {/* 2. Email Address — required */}
                <label className="block">
                  <span className="block text-sm font-semibold text-[#00274d] mb-2">
                    Email Address <span className="text-[#00274d]">*</span>
                  </span>
                  <input
                    required
                    type="email"
                    name="email"
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#edad1a] focus:ring-4 focus:ring-[#edad1a]/10"
                  />
                </label>

                {/* 3. Phone Number — required */}
                <label className="block">
                  <span className="block text-sm font-semibold text-[#00274d] mb-2">
                    Phone Number <span className="text-[#00274d]">*</span>
                  </span>
                  <input
                    required
                    type="tel"
                    name="phone"
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#edad1a] focus:ring-4 focus:ring-[#edad1a]/10"
                  />
                </label>

                {/* 4. Position Applying For — required */}
                <label className="block">
                  <span className="block text-sm font-semibold text-[#00274d] mb-2">
                    Position Applying For <span className="text-[#00274d]">*</span>
                  </span>
                  <input
                    required
                    name="position"
                    placeholder="e.g. Sales Executive"
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#edad1a] focus:ring-4 focus:ring-[#edad1a]/10"
                  />
                </label>

                {/* 5. Years of Experience — required */}
                <label className="block">
                  <span className="block text-sm font-semibold text-[#00274d] mb-2">
                    Years of Experience <span className="text-[#00274d]">*</span>
                  </span>
                  <input
                    required
                    type="number"
                    min="0"
                    step="0.5"
                    name="experience"
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#edad1a] focus:ring-4 focus:ring-[#edad1a]/10"
                  />
                </label>

                {/* 6. Upload CV/Resume — required */}
                <label className="block">
                  <span className="block text-sm font-semibold text-[#00274d] mb-2">
                    Upload CV/Resume <span className="text-[#00274d]">*</span>
                  </span>
                  <span className="flex items-center gap-3 rounded-xl border border-dashed border-gray-300 bg-[#f8fafc] px-4 py-3 text-sm text-gray-600">
                    <Upload className="w-4 h-4 text-[#00274d]" />
                    <input
                      required
                      type="file"
                      name="resume"
                      accept=".pdf,.doc,.docx"
                      className="min-w-0 flex-1 text-sm file:mr-3 file:rounded-lg file:border-0 file:bg-[#00274d] file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-white"
                    />
                  </span>
                  <span className="mt-1 block text-xs text-gray-400">PDF or DOC, max 5MB.</span>
                </label>

                {/* 7. Portfolio Link — optional */}
                <label className="block md:col-span-2">
                  <span className="block text-sm font-semibold text-[#00274d] mb-2">
                    Portfolio Link <span className="text-gray-400 font-normal">(if applicable)</span>
                  </span>
                  <input
                    type="url"
                    name="portfolio"
                    placeholder="https://"
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#edad1a] focus:ring-4 focus:ring-[#edad1a]/10"
                  />
                </label>

                {/* 8. Cover Note — optional */}
                <label className="block md:col-span-2">
                  <span className="block text-sm font-semibold text-[#00274d] mb-2">
                    Cover Note / Message
                  </span>
                  <textarea
                    name="message"
                    rows={5}
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#edad1a] focus:ring-4 focus:ring-[#edad1a]/10"
                  />
                </label>
              </div>

              {submitted && (
                <div className="mt-6 rounded-xl border border-[#edad1a]/30 bg-[#edad1a]/10 px-4 py-3 text-sm font-semibold text-[#00274d]">
                  Thank you for applying to Vendor Infra. Our HR team will review your application and reach out if your profile matches our requirements.
                </div>
              )}

              <div className="mt-7 flex flex-col sm:flex-row sm:items-center gap-4">
                <button type="submit" className={siteButtonClasses("primary", "px-6 py-3")}>
                  Submit Application <Send className="w-4 h-4" />
                </button>
                <p className="text-xs text-gray-500">
                  Questions? Reach out anytime at{" "}
                  <a href="mailto:hr@vendorinfra.com" className="font-semibold text-[#00274d] hover:text-[#edad1a]">
                    hr@vendorinfra.com
                  </a>
                </p>
              </div>
            </form>
          </div>
        </section>

        <section className="pb-16 md:pb-20">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="rounded-2xl bg-[#00274d] px-6 py-8 md:px-10 md:py-10 text-white">
              <h2 className="text-2xl font-bold mb-3">Equal opportunity statement</h2>
              <p className="text-white/75 leading-relaxed">
                Vendor Infra is an equal opportunity employer. We celebrate diversity and are committed to creating an inclusive environment for all employees, regardless of background, gender, religion, or disability status.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}