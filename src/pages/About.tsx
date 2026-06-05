import { usePageSeo } from "@/lib/seo";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Linkedin, Shield, Target } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CtaArrow } from "@/components/CtaArrow";

const base = import.meta.env.BASE_URL;

const trustedBy = [
  { name: "Adani Group",    logo: "/logos/adani-group.svg" },
  { name: "NCC",            logo: "/logos/ncc.svg" },
  { name: "Tata Projects",  logo: "/logos/tata-projects.svg" },
  { name: "JWIL",           logo: "/logos/jwil.svg" },
  { name: "Gawar",          logo: "/logos/gawar.svg" },
  { name: "JMC Projects",   logo: "/logos/jmc-projects.svg" },
  { name: "Dilip Buildcon", logo: "/logos/dilip-buildcon.svg" },
  { name: "INOX Wind",      logo: "/logos/inox-wind.svg" },
  { name: "IndInfravit",    logo: "/logos/indinfravit.svg" },
  { name: "KEC",            logo: "/logos/kec.svg" },
  { name: "Kalpataru",      logo: "/logos/kalpataru.svg" },
  { name: "IRB Infra",      logo: "/logos/irb-infra.svg" },
];

function LogoMarquee({ logos }: { logos: { name: string; logo: string }[] }) {
  const doubled = [...logos, ...logos];
  return (
    <div className="relative overflow-hidden">
      <div
        className="flex gap-8 items-center"
        style={{ animation: "marquee 28s linear infinite", width: "max-content" }}
      >
        {doubled.map((l, i) => (
          <div
            key={i}
            className="flex-shrink-0 flex items-center justify-center h-14 px-5 bg-white rounded-xl border border-gray-100 shadow-sm hover:scale-105 transition-transform duration-200"
            style={{ minWidth: 120 }}
          >
            <img src={l.logo} alt={l.name} className="max-h-10 max-w-[110px] object-contain" loading="eager" />
          </div>
        ))}
      </div>
      <style>{`@keyframes marquee{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}`}</style>
    </div>
  );
}

const usps = [
  {
    title: "End to End Value Chain Integration",
    image: "/images/wp/Untitled-design-62.png",
    desc: "From vendor discovery and material procurement to financing, insurance and plant & equipment hire/sales, we provide a full-stack AI powered platform that bridges every gap in infrastructure & construction. No more juggling multiple tools or vendors.",
  },
  {
    title: "Single Unified Data Lake",
    image: "/images/wp/6.png",
    desc: "One unified data lake for all project, procurement, vendor, and site data-fully unified and instantly accessible. Eliminate silos, improve decision-making, and run your entire project ecosystem with real-time intelligence.",
  },
  {
    title: "Smart Decision Support via Market Intelligence",
    image: "/images/wp/9.png",
    desc: "Sector insights, Industry Updates, schedules of rates, competitive intelligence, tender & PQ samples. We provide you context & foresight so you can plan strategically, not just reactively.",
  },
  {
    title: "AI & ML-Driven Insights",
    image: "/images/wp/7.png",
    desc: "Vendor Infra leverages Artificial Intelligence and Machine Learning to match you with the best-suited requirement and generate real-time analytics for smarter, data-backed decisions.",
  },
  {
    title: "Safety, Security & Trust built in",
    image: "/images/wp/8.png",
    desc: "Every vendor and supplier is vetted. Data security is paramount. We ensure the platform and your data adhere to high standards so your decisions are reliable, protected and scalable.",
  },
  {
    title: "Dedicated Support & Accountability",
    image: "/images/wp/17.png",
    desc: "Our team is available round-the-clock. Beyond just tech support, we assign dedicated account managers (or equivalents) to guide you at every stage so that deadlines aren't just met, but exceeded.",
  },
];

const management = [
  { name: "Rahul Jain",      role: "Founder & CEO",                  photo: "about-members/2025-11-10.png",                    linkedin: "https://www.linkedin.com/in/rahuljainbd/" },
  { name: "Rupali Jain",     role: "Co Founder",                     photo: "about-members/2025-11-11.png",                    linkedin: "https://www.linkedin.com/in/roopali-jain-1484a3200/" },
  { name: "Sukhdeep Bhogal", role: "Advisor - Product & Engineering", photo: "about-members/2025-11-VI-employee-photos-1.png",  linkedin: "https://www.linkedin.com/in/sukhdeepbhogal1/" },
  { name: "Munish Gupta",    role: "Advisor - Finance & Accounts",    photo: "about-members/2025-11-12.png",                    linkedin: "https://www.linkedin.com/in/munishgupta06/" },
];

const advisory = [
  { name: "Shailendra Kumar Tripathi", role: "MD & CEO, JMC Project (India) Limited - Kalpataru Group",          photo: "about-members/2025-11-1.png",                    linkedin: "https://www.linkedin.com/in/shailendra-kumar-tripathi-866330106/" },
  { name: "Sanjeev Kumar Gupta",       role: "CEO-KEDM | Ex MD & CEO Lahari (GOI) | Ex Accenture, Microsoft, IBM",   photo: "about-members/2025-11-4.png",                    linkedin: "https://www.linkedin.com/in/sanjeevkgupta/" },
  { name: "Amit Jain",                 role: "Sales Director, HoneyWell",                                             photo: "about-members/2025-11-VI-employee-photos-13.png", linkedin: "https://www.linkedin.com/in/andleeb-jain-7a2026a/" },
  { name: "Nitin Jain",                role: "Head Corporate Center, L&T | Ex Sr. VP Kalpataru",                       photo: "about-members/2025-11-2.png",                    linkedin: "https://www.linkedin.com/in/njain2000/" },
];

const team = [
  { name: "Shashi Sharma",      role: "Human Resources",     tag: "HR",           photo: "about-members/2025-11-16-1.png",                  linkedin: "https://www.linkedin.com/in/shashi-sharma-b4965520" },
  { name: "Kartikay Sihna",     role: "Procurement",         tag: "Procurement",  photo: "about-members/2025-11-17.png",                    linkedin: "https://www.linkedin.com/in/kartikay-s-21402513b" },
  { name: "Tanay Singh",        role: "Product & Marketing", tag: "Product",      photo: "about-members/2024-01-VI-employee-photos-14.png", linkedin: "https://www.linkedin.com/in/tanaysingh07/" },
  { name: "Abhishek Srivastav", role: "Procurement",         tag: "Procurement",  photo: "about-members/2026-03-2.png",                     linkedin: "https://www.linkedin.com/in/abhishek-srivastav-01495a119" },
  { name: "Shaurya Sonu",       role: "Finance & Accounts",  tag: "Finance",      photo: "about-members/2026-03-3.png",                     linkedin: "https://www.linkedin.com/in/shaurya-sonu-840aa8247" },
  { name: "Ashutosh Pandey",    role: "Procurement",         tag: "Procurement",  photo: "about-members/2025-11-26.png",                    linkedin: "https://www.linkedin.com/in/ashutosh-pandey-83889945/" },
  { name: "Astha Tiwari",       role: "Human Resources",     tag: "HR",           photo: "about-members/2025-11-VI-employee-photos-12.png", linkedin: "https://www.linkedin.com/in/manju-saroj-5b0050229" },
  { name: "Aman Goyal",         role: "Finance",             tag: "Finance",      photo: "about-members/2025-11-22.png",                    linkedin: "https://www.linkedin.com/in/amangoyal824" },
  { name: "Rajat Singh",        role: "Supplier Relations",  tag: "Operations",   photo: "about-members/2026-03-5.png",                     linkedin: "https://www.linkedin.com/in/rajat-singh-3b010a145" },
  { name: "Rajni Kumar",        role: "Product & IT",        tag: "Product & IT", photo: "about-members/2025-11-VI-employee-photos-16.png", linkedin: "https://www.linkedin.com/in/rajni-kumar-628477123" },
  { name: "Praveen Bhutani",    role: "Software Developer", tag: "Engineering",  photo: "about-members/praveen-bhutani.png",               linkedin: "https://www.linkedin.com/in/praveen-bhutani/" },
  { name: "Utkarsh Kashyap",    role: "Strategy & IR",       tag: "Strategy",     photo: "about-members/2025-11-19.png",                    linkedin: "https://www.linkedin.com/in/utkarsh-kashyap/" },
  { name: "Pawanpreet Singh",   role: "Procurement",         tag: "Procurement",  photo: "about-members/2025-11-25.png",                    linkedin: "https://www.linkedin.com/in/pawanpreet-singh-2a4278143/" },
  { name: "Deepak Kumar",       role: "Supplier Relations",  tag: "Operations",   photo: "about-members/deepak-kumar.png",                  linkedin: "https://www.linkedin.com/in/deepak-kumar-89702321b" },
  { name: "Rahul Maurya",       role: "Accounts",            tag: "Accounts",     photo: "about-members/2025-11-VI-employee-photos-20.png", linkedin: "https://www.linkedin.com/in/rahul-maurya-indirect-taxation-b8b566280/" },
  { name: "Ankit Yadav",        role: "Data Optimization",   tag: "Data",         photo: "about-members/2025-11-27.png" },
  { name: "Kaushal Kumar",      role: "Supplier Relations",  tag: "Operations",   photo: "about-members/2025-12-VI-employee-photos-4.png" },
  { name: "Yashika Nimesh",     role: "Data Optimization",   tag: "Data",         photo: "about-members/2026-03-1.png",                     linkedin: "https://www.linkedin.com/in/yashika-nimesh-9bab51271/" },
  { name: "Shruti Mohrya",      role: "Data Optimization",   tag: "Data",         photo: "about-members/2025-12-VI-employee-photos-6.png" },
  { name: "Yojit Pareek",       role: "Legal & Compliance",  tag: "Legal",        photo: "about-members/2025-11-14.png",                    linkedin: "https://www.linkedin.com/in/yojit-pareek-b41a0080/" },
];

const tagColors: Record<string, string> = {
  HR:             "bg-pink-100 text-pink-700",
  Strategy:       "bg-purple-100 text-purple-700",
  Procurement:    "bg-orange-100 text-orange-700",
  Product:        "bg-[#fef9e0] text-[#00274d]",
  "Product & IT": "bg-[#fef9e0] text-[#00274d]",
  Engineering:    "bg-blue-100 text-blue-700",
  Finance:        "bg-green-100 text-green-700",
  Operations:     "bg-[#fef9e0] text-[#8A3F00]",
  Accounts:       "bg-teal-100 text-teal-700",
  Data:           "bg-indigo-100 text-indigo-700",
  Legal:          "bg-red-100 text-red-700",
};

export default function About() {
  usePageSeo("About Us | Vendor Infra", "Transforming the Infrastructure, Construction and Manufacturing industry. Built on Trust and Reliability with AI and ML.");
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">

        {/* Hero */}
        <section data-preserve-hero-typography className="relative bg-[#00274d] text-white py-24 overflow-hidden">
          <div className="absolute inset-0 opacity-[0.08] bg-[radial-gradient(circle_at_1px_1px,#ffffff_1px,transparent_0)] bg-[size:40px_40px]" />
          
          <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 rounded-full border border-[#edad1a]/40 bg-[#edad1a]/10 px-4 py-2 text-sm font-semibold text-[#edad1a] mb-6">
              About Us
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl md:text-5xl font-semibold leading-tight tracking-tight mb-6">
              Transforming the Infrastructure, Construction and Manufacturing industry
            </motion.h1>
          </div>
        </section>

        {/* Story & What We Do */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 xl:px-12">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <span className="inline-flex items-center gap-2 text-[#edad1a] text-[12px] font-bold uppercase tracking-[0.3em] mb-4">
                <span className="w-6 h-px bg-[#edad1a]/60" />
                About Vendor Infra
                <span className="w-6 h-px bg-[#edad1a]/60" />
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#00274d] leading-tight text-balance">
                The Vendor Infra Story
                <br />
                Meet. <span className="text-[#edad1a]">Collaborate</span>. Construct
              </h2>


            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="rounded-2xl border border-gray-200 bg-[#f6f8fb] p-7 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-11 h-11 rounded-xl bg-[#edad1a]/10 flex items-center justify-center">
                    <Target className="w-5 h-5 text-[#edad1a]" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#00274d]">Who we are</h3>
                </div>
                <div className="space-y-5 text-gray-600 text-[16px] leading-8">
                  <p>It connects infrastructure companies, vendors, suppliers, contractors, consultants, and developers, offering a cost-effective and efficient way to collaborate, source, and execute projects across diverse sectors.</p>
                  <p>Headquartered in Delhi NCR, Vendor Infra was founded by industry leaders with over two decades of experience in managing and executing large-scale infrastructure projects.</p>
                  <p>Our platform is built to simplify vendor discovery and collaboration, enable supply chain finance, offer a dedicated plants and equipment marketplace, and facilitate project insurance - empowering businesses to overcome industry challenges and drive greater efficiency, transparency, and growth.</p>
                </div>
                <a href="/services" className="group mt-7 inline-flex items-center gap-3 rounded-lg bg-[#edad1a] px-5 py-3 text-sm font-bold text-white hover:bg-[#d49a10] transition-colors">
                  Explore Services <CtaArrow variant="dark" />
                </a>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.08 }} className="rounded-2xl border border-gray-200 bg-[#082b4f] p-7 md:p-8 text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-[0.08] bg-[radial-gradient(circle_at_1px_1px,#ffffff_1px,transparent_0)] bg-[size:24px_24px]" />
                <div className="relative">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-11 h-11 rounded-xl bg-[#edad1a] flex items-center justify-center">
                      <Shield className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold">What we do</h3>
                  </div>
                  <div className="space-y-5 text-white/78 text-[16px] leading-8">
                    <p>Vendor Infra, we offer more than just a Vendor Discovery and Marketplace. We provide a powerful AI ecosystem designed for B2B businesses across all sectors of the infrastructure, construction and manufacturing industry.</p>
                    <p>Our AI- and ML Powered seamlessly blends technology with the real-world needs of infrastructure stakeholders, enabling smarter decision-making, cost optimization, profit maximization, and faster collaboration.</p>
                    <p>Vendor Infra brings integrated services on a single platform, empowering contractors, suppliers, consultants, and developers to connect, collaborate, and construct more efficiently than ever before.</p>
                  </div>
                  <a href="/contact" className="group mt-7 inline-flex items-center gap-2 bg-[#edad1a] hover:bg-[#f5bb2e] text-[#00274d] font-semibold px-5 py-2.5 rounded-lg text-sm transition-all duration-300 shadow-[0_8px_20px_-10px_rgba(237,173,26,0.7)] hover:shadow-[0_10px_24px_-10px_rgba(237,173,26,0.85)] hover:-translate-y-0.5">
                    Book a demo
                    <CtaArrow variant="blue" />
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* USP */}
        <section className="py-20 bg-gray-50 border-y">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="text-center mb-12">
              <span className="inline-flex items-center gap-2 text-[#edad1a] text-[12px] font-bold uppercase tracking-[0.3em] mb-4">
                <span className="w-6 h-px bg-[#edad1a]/60" />
                USP
                <span className="w-6 h-px bg-[#edad1a]/60" />
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#00274d] max-w-3xl mx-auto text-balance leading-tight">One Platform. One Ecosystem. Infinite Possibilities.</h2>
            </div>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
              {usps.map((usp, i) => (
                <motion.div key={usp.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }} className="group overflow-hidden bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                  <div className="aspect-[16/10] overflow-hidden bg-gray-100">
                    <img src={usp.image} alt={usp.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="eager" />
                  </div>
                  <div className="p-5">
                    <div className="flex items-start gap-3 mb-3">
                      <CheckCircle2 className="w-6 h-6 text-[#edad1a] shrink-0 mt-0.5" />
                      <h3 className="font-bold text-[#00274d] leading-snug">{usp.title}</h3>
                    </div>
                    <p className="text-gray-500 text-sm leading-relaxed">{usp.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Trusted By */}
        <section className="py-12 bg-white border-b border-gray-100">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <span className="inline-flex items-center gap-2 text-[#edad1a] text-[12px] font-bold uppercase tracking-[0.3em] mb-4">
                <span className="w-6 h-px bg-[#edad1a]/60" />
                Trusted By
                <span className="w-6 h-px bg-[#edad1a]/60" />
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#00274d] max-w-4xl mx-auto text-balance leading-tight">Chosen by the companies building India's National Infrastructure pipeline</h2>
            </div>
            <LogoMarquee logos={trustedBy} />
          </div>
        </section>

        {/* Management Team */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-14">
              <span className="inline-flex items-center gap-2 text-[#edad1a] text-[12px] font-bold uppercase tracking-[0.3em] mb-4">
                <span className="w-6 h-px bg-[#edad1a]/60" />
                Leadership
                <span className="w-6 h-px bg-[#edad1a]/60" />
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#00274d]">Management Team</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {management.map((m, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="group relative bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300">
                  <div className="relative aspect-[4/5] bg-gradient-to-br from-[#f6f8fb] to-[#eef2f8] overflow-hidden">
                    <img src={`${base}${m.photo}`} alt={m.name} className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500" onError={e => { (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(m.name)}&background=00274d&color=fff&size=400`; }} />
                    <a href={m.linkedin} target="_blank" rel="noopener noreferrer" className="absolute top-3 right-3 w-9 h-9 bg-white/90 hover:bg-[#0077b5] text-[#0077b5] hover:text-white rounded-full flex items-center justify-center shadow transition-all duration-200">
                      <Linkedin className="w-4 h-4" />
                    </a>
                  </div>
                  <div className="p-4">
                    <h4 className="font-bold text-[#00274d] text-[15px] leading-snug">{m.name}</h4>
                    <p className="text-xs text-gray-500 mt-1 leading-snug">{m.role}</p>
                  </div>
                  <div className="absolute bottom-0 left-0 w-0 group-hover:w-full h-0.5 bg-[#edad1a] transition-all duration-300" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Advisory Board */}
        <section className="py-20 bg-[#00274d]">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-14">
              <span className="inline-flex items-center gap-2 text-[#edad1a] text-[12px] font-bold uppercase tracking-[0.3em] mb-4">
                <span className="w-6 h-px bg-[#edad1a]/60" />
                Guidance &amp; Expertise
                <span className="w-6 h-px bg-[#edad1a]/60" />
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-white">Advisory Board</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {advisory.map((a, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="group relative bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#edad1a]/40 rounded-2xl overflow-hidden transition-all duration-300">
                  <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-br from-[#0a3b73] to-[#021a36]">
                    <img src={`${base}${a.photo}`} alt={a.name} className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500" onError={e => { (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(a.name)}&background=1a4fdb&color=fff&size=400`; }} />
                    <a href={a.linkedin} target="_blank" rel="noopener noreferrer" className="absolute top-3 right-3 w-9 h-9 bg-white/90 hover:bg-[#0077b5] text-[#0077b5] hover:text-white rounded-full flex items-center justify-center backdrop-blur-sm shadow transition-all duration-200">
                      <Linkedin className="w-4 h-4" />
                    </a>
                  </div>
                  <div className="p-4">
                    <h4 className="font-bold text-white text-[15px] leading-snug">{a.name}</h4>
                    <p className="text-xs text-white/75 mt-1.5 leading-relaxed">{a.role}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Members */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="text-center mb-14">
              <span className="inline-flex items-center gap-2 text-[#edad1a] text-[12px] font-bold uppercase tracking-[0.3em] mb-4">
                <span className="w-6 h-px bg-[#edad1a]/60" />
                Our People
                <span className="w-6 h-px bg-[#edad1a]/60" />
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#00274d]">Team Members</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
              {team.map((member, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: (i % 5) * 0.06 }} className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col">
                  <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-[#00274d]/5 to-[#edad1a]/10">
                    <img src={`${base}${member.photo}`} alt={member.name} className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" onError={e => { (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=e8eef9&color=1a4fdb&size=300`; }} />
                    {member.linkedin && (
                      <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="absolute top-2 right-2 w-7 h-7 bg-white/90 hover:bg-[#0077b5] text-[#0077b5] hover:text-white rounded-full flex items-center justify-center shadow transition-all duration-200 opacity-0 group-hover:opacity-100">
                        <Linkedin className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                  <div className="p-3.5 flex-1 flex flex-col">
                    <h4 className="font-bold text-[#00274d] text-sm leading-tight">{member.name}</h4>
                    <p className="text-xs text-gray-500 mt-0.5">{member.role}</p>
                    <span className={`mt-2 inline-flex self-start text-[10px] font-bold px-2 py-0.5 rounded-full ${tagColors[member.tag] || "bg-gray-100 text-gray-600"}`}>{member.tag}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
