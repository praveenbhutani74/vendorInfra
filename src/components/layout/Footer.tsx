import { Link } from "wouter";
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

const faviconUrl = `${import.meta.env.BASE_URL}favicon.ico`;

export function Footer() {
  return (
    <footer className="bg-[#00274d] text-white">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12">
        <div className="flex flex-col md:flex-row md:justify-between gap-10">

          {/* Column 1: Brand */}
{/* Column 1: Brand */}
<div className="shrink-0 max-w-[280px] space-y-4">
<img
  src={`${import.meta.env.BASE_URL}brand/White.png`}
  alt="Vendor Infra"
  className="h-[48px] w-auto -ml-4"
/>
            <h3 className="text-white text-lg md:text-xl font-bold leading-snug">
              AI - Powered Operating System for{" "}
              <span className="text-[#edad1a] underline decoration-[#edad1a] decoration-2 underline-offset-4">Infrastructure,</span> Construction &amp; Manufacturing Industry
            </h3>
            <p className="text-white/70 text-sm mt-3">
              Unleashing the potential through Ecosystem.
            </p>
            <div className="flex gap-3 mt-6">
              <a href="https://www.facebook.com/VENDORINFRA/" target="_blank" rel="noopener noreferrer" className="bg-white/10 p-2.5 rounded-lg hover:bg-[#edad1a] transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="https://x.com/vendorinfra" target="_blank" rel="noopener noreferrer" className="bg-white/10 p-2.5 rounded-lg hover:bg-[#edad1a] transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="https://www.linkedin.com/company/vendor-infra/" target="_blank" rel="noopener noreferrer" className="bg-white/10 p-2.5 rounded-lg hover:bg-[#edad1a] transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="https://www.instagram.com/vendorinfra/" target="_blank" rel="noopener noreferrer" className="bg-white/10 p-2.5 rounded-lg hover:bg-[#edad1a] transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Pages */}
          <div className="shrink-0">
            <h3 className="font-semibold text-base mb-5">Pages</h3>
            <ul className="space-y-3 text-sm">
              {[
                { href: "/", label: "Home" },
                { href: "/about", label: "About Us" },
                { href: "/services", label: "Services" },
                { href: "/sectors", label: "Sectors" },
                { href: "/materials", label: "Materials" },
                  { href: "/why-us", label: "Why Us" },
                { href: "/pricing", label: "Pricing Plans" },
                { href: "/blog", label: "Blog" },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-white/75 hover:text-[#edad1a] transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Quick Links */}
          <div className="shrink-0">
            <h3 className="font-semibold text-base mb-5">Quick Links</h3>
            <ul className="space-y-3 text-sm">
              {[
              
                { href: "/referral", label: "Referral" },
                { href: "/iso", label: "ISO Certification" },
                { href: "/faq", label: "FAQ" },
                { href: "/privacy-policy", label: "Privacy Policy" },
                { href: "/terms", label: "Terms of Service" },
                { href: "/pricing-policy", label: "Pricing Policy" },
                { href: "/security", label: "Security" },
                 { href: "/contact", label: "Contact Us" },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-white/75 hover:text-[#edad1a] transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div className="shrink-0 max-w-[240px]">
            <h3 className="font-semibold text-base mb-5">Contact Info</h3>
            <ul className="space-y-3 text-white/75 text-sm">
              <li>
                <span className="text-white font-medium block mb-0.5">SaaS Support</span>
                <a href="tel:+918800119885" className="hover:text-[#edad1a] transition-colors">+91-8800119885</a>
              </li>
              <li>
                <span className="text-white font-medium block mb-0.5">Supply Chain</span>
                <a href="tel:+918800404840" className="hover:text-[#edad1a] transition-colors">+91-8800404840</a>
              </li>
              <li>
                <a href="mailto:enquiry@vendorinfra.com" className="hover:text-[#edad1a] transition-colors">enquiry@vendorinfra.com</a>
              </li>
              <li className="leading-relaxed">
                Suit No. 1436-1440, Plus Offices, Landmark Cyber Park, Sector 67, Gurugram, Haryana, India – 122101
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-5 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-white/40 text-xs">
            &copy; Vendor Infra 2026. All rights reserved.
          </p>
          <p className="text-white/30 text-xs">
           Meet. Collaborate. Construct
          </p>
        </div>
      </div>
    </footer>
  );
}
