import { Link, useLocation } from "wouter";
import { Menu, X, ShoppingCart, ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuoteCart } from "@/lib/quoteCart";
import { siteButtonClasses } from "@/components/SiteButton";

const logoUrl = `${import.meta.env.BASE_URL}brand/Logo-Blue-1.png`;

const MORE_LINKS = [
  { href: "/pricing",  label: "Pricing" },
  { href: "/blog",     label: "Blog" },
  { href: "/why-us",   label: "Why Us" },
  { href: "/faq",      label: "FAQ" },
  { href: "/career", label: "Career" },
   { href: "/investor-relations", label: "Investor Relations" },
  { href: "/referral", label: "Referral Programme" },
];

export function Navbar() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);
  const { total } = useQuoteCart();

  const links = [
    { href: "/",          label: "Home" },
    { href: "/about",     label: "About Us" },
    { href: "/services",  label: "Services" },
    { href: "/sectors",   label: "Sectors" },
    { href: "/materials", label: "Materials" },
    { href: "/contact",   label: "Contact Us" },
  ];

  const isActive = (href: string) =>
    href === "/" ? location === "/" : location.startsWith(href);

  const isMoreActive = MORE_LINKS.some(l => location.startsWith(l.href));

  // Close dropdown on outside click
  useEffect(() => {
    function handle(e: MouseEvent) {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setMoreOpen(false);
      }
    }
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, []);

  // Close dropdown on route change
  useEffect(() => { setMoreOpen(false); setIsOpen(false); }, [location]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/70 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/85">
      <div className="container mx-auto px-4 flex items-center justify-between" style={{ height: 78 }}>
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <img src={logoUrl} alt="Vendor Infra" className="h-[38px] w-auto" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-[15px] font-medium">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`relative py-1 transition-colors hover:text-[#00274d] ${
                isActive(link.href) ? "text-[#00274d]" : "text-slate-600"
              }`}
            >
              {link.label}
              {isActive(link.href) && (
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#edad1a] rounded-full" />
              )}
            </Link>
          ))}

          {/* "More" dropdown */}
          <div ref={moreRef} className="relative">
            <button
              onClick={() => setMoreOpen(v => !v)}
              className={`flex items-center gap-1 py-1 transition-colors hover:text-[#00274d] ${
                isMoreActive ? "text-[#00274d]" : "text-slate-600"
              }`}
            >
              More
              <motion.span animate={{ rotate: moreOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                <ChevronDown className="w-3.5 h-3.5" />
              </motion.span>
            </button>

            <AnimatePresence>
              {moreOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.97 }}
                  transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden py-1 z-50"
                >
                  {MORE_LINKS.map(l => (
                    <Link
                      key={l.href}
                      href={l.href}
                    className={`block px-4 py-2.5 text-[15px] transition-colors hover:bg-[#edad1a]/8 hover:text-[#edad1a] ${
                        location.startsWith(l.href) ? "text-[#edad1a] font-semibold bg-[#edad1a]/5" : "text-gray-600"
                      }`}
                    >
                      {l.label}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link href="/quote-cart" className="relative p-2 text-slate-500 hover:text-[#00274d] transition-colors">
            <ShoppingCart className="w-5 h-5" />
            {total > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#edad1a] text-white text-[10px] font-black rounded-full flex items-center justify-center leading-none">
                {total > 9 ? "9+" : total}
              </span>
            )}
          </Link>

   <a
  href="http://3.110.208.157/customer/"
  target="_blank"
  rel="noopener noreferrer"
  className={siteButtonClasses(
    "primary",
    "rounded-full px-7 py-3 normal-case tracking-normal"
  )}
>
  Register
</a>  
        </nav>

        {/* Mobile: cart + hamburger */}
        <div className="md:hidden flex items-center gap-3">
          <Link href="/quote-cart" className="relative p-2 text-gray-500">
            <ShoppingCart className="w-5 h-5" />
            {total > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#edad1a] text-white text-[10px] font-black rounded-full flex items-center justify-center">
                {total > 9 ? "9+" : total}
              </span>
            )}
          </Link>
          <button className="p-2 text-gray-600" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
            <AnimatePresence mode="wait" initial={false}>
              {isOpen ? (
                <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                  <X className="h-6 w-6" />
                </motion.span>
              ) : (
                <motion.span key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                  <Menu className="h-6 w-6" />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            className="md:hidden border-t border-gray-100 bg-white overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-2.5 rounded-lg text-[15px] font-medium transition-colors ${
                    isActive(link.href)
                      ? "text-[#edad1a] bg-[#edad1a]/5 font-semibold"
                      : "text-gray-600 hover:text-[#edad1a] hover:bg-gray-50"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              {/* More links in mobile */}
              <div className="border-t border-gray-100 pt-2 mt-2">
                {MORE_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`block px-3 py-2.5 rounded-lg text-[15px] font-medium transition-colors ${
                      location.startsWith(link.href)
                        ? "text-[#edad1a] bg-[#edad1a]/5 font-semibold"
                        : "text-gray-500 hover:text-[#edad1a] hover:bg-gray-50"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
              <div className="pt-2">
                          <a
              href="https://customer.vendorinfra.com/#/login-2"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full px-7 py-3 font-medium bg-[#edad1a] text-[#00274d] hover:bg-[#d89b18] transition-colors"
            >
              Register
            </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
