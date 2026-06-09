import { usePageSeo } from "@/lib/seo";
import { useState, useMemo, useRef } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  BadgeIndianRupee,
  BarChart3,
  CheckCircle2,
  ChevronRight,
  MapPinned,
  PackageSearch,
  Search,
  ShieldCheck,
  ShoppingCart,
  Truck,
  X,
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MaterialImage } from "@/components/materials/MaterialImage";
import { categories } from "@/lib/materialsData";
import { useQuoteCart } from "@/lib/quoteCart";

const features = [
  { icon: Truck, label: "On-Time Delivery" },
  { icon: ShieldCheck, label: "Quality Assured" },
  { icon: BadgeIndianRupee, label: "Competitive Pricing" },
  { icon: MapPinned, label: "Pan-India Availability" },
];

interface SearchResult {
  type: "category" | "product" | "variant";
  categorySlug: string;
  categoryName: string;
  productSlug?: string;
  productName?: string;
  variantName?: string;
  image: string;
}

function highlight(text: string, query: string) {
  if (!query.trim()) return <>{text}</>;
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return <>{text}</>;
  return (
    <>
      {text.slice(0, idx)}
      <mark className="bg-[#edad1a]/30 text-[#00274d] rounded px-0.5 font-bold not-italic">
        {text.slice(idx, idx + query.length)}
      </mark>
      {text.slice(idx + query.length)}
    </>
  );
}

export default function Materials() {
  usePageSeo("Material Procurement | Vendor Infra", "Source 1000+ construction and infrastructure materials across 10+ categories including steel, cement, electrical and solar.");
  const { total } = useQuoteCart();
  const [query, setQuery] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const productCount = categories.reduce((sum, cat) => sum + cat.products.length, 0);
  const featuredCategories = categories.slice(0, 3);
  const isSearching = query.trim().length > 0;

  const { dropdownResults, filteredCategories } = useMemo(() => {
    if (!query.trim()) {
      return { dropdownResults: [] as SearchResult[], filteredCategories: categories };
    }
    const q = query.toLowerCase();
    const results: SearchResult[] = [];
    // For the grid: only match category name or product name (not variants)
    const gridMatchedSlugs = new Set<string>();

    for (const cat of categories) {
      const catMatches = cat.name.toLowerCase().includes(q);
      if (catMatches) {
        gridMatchedSlugs.add(cat.slug);
        results.push({ type: "category", categorySlug: cat.slug, categoryName: cat.name, image: cat.image });
      }
      for (const prod of cat.products) {
        const prodMatches = prod.name.toLowerCase().includes(q);
        if (prodMatches) {
          // Product name match → include category in grid
          gridMatchedSlugs.add(cat.slug);
          results.push({ type: "product", categorySlug: cat.slug, categoryName: cat.name, productSlug: prod.slug, productName: prod.name, image: prod.image });
        }
        for (const variant of prod.variants) {
          if (variant.toLowerCase().includes(q)) {
            // Variant match → dropdown only, does NOT pull parent into grid
            const already = results.find(r => r.type === "product" && r.productSlug === prod.slug && r.categorySlug === cat.slug);
            if (!already) {
              results.push({ type: "product", categorySlug: cat.slug, categoryName: cat.name, productSlug: prod.slug, productName: prod.name, image: prod.image });
            }
            results.push({ type: "variant", categorySlug: cat.slug, categoryName: cat.name, productSlug: prod.slug, productName: prod.name, variantName: variant, image: prod.image });
          }
        }
      }
    }
    return {
      dropdownResults: results.slice(0, 8),
      filteredCategories: categories.filter(c => gridMatchedSlugs.has(c.slug)),
    };
  }, [query]);

  function clearSearch() {
    setQuery("");
    setDropdownOpen(false);
  }

  function handleInputFocus() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setDropdownOpen(true);
  }

  function handleInputBlur() {
    closeTimer.current = setTimeout(() => setDropdownOpen(false), 200);
  }

  function handleResultClick() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    clearSearch();
  }

  const displayedCategories = isSearching ? filteredCategories : categories;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      {/* Hero */}
      <section data-preserve-hero-typography className="relative overflow-hidden bg-[#00274d]">
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(7,20,63,0.96),rgba(12,42,110,0.88))]" />
        <div className="absolute inset-0 opacity-[0.08] bg-[radial-gradient(circle_at_1px_1px,#ffffff_1px,transparent_0)] bg-[length:28px_28px]" />
        <div className="container relative z-10 mx-auto grid min-h-[360px] gap-10 px-4 py-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#edad1a]/40 bg-[#edad1a]/10 px-4 py-2 text-sm font-semibold text-[#edad1a]">
              Materials
            </div>
            <h1 className="text-4xl md:text-5xl font-semibold leading-tight tracking-tight max-w-3xl text-white">
              Source construction materials across every major category
            </h1>
            {/* Search Bar */}
            <div className="mt-8 relative max-w-2xl z-50">
              <div className={`flex items-center gap-3 rounded-xl bg-white px-4 py-3 shadow-xl transition-all ${dropdownOpen ? "ring-2 ring-[#edad1a]" : ""}`}>
                <Search className="h-5 w-5 shrink-0 text-[#00274d]" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                  placeholder="Search categories, products, variants… e.g. TMT, Cement, Flooring"
                  className="flex-1 bg-transparent text-sm font-medium text-[#00274d] placeholder:text-gray-400 outline-none"
                />
                {query && (
                  <button
                    onMouseDown={e => e.preventDefault()}
                    onClick={clearSearch}
                    className="text-gray-400 hover:text-[#00274d] transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>

              {/* Dropdown */}
              <AnimatePresence>
                {dropdownOpen && isSearching && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.15 }}
                    className="absolute left-0 right-0 top-full mt-2 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xl"
                  >
                    {dropdownResults.length > 0 ? (
                      dropdownResults.map((r, i) => (
                        <Link
                          key={i}
                          href={r.type === "category" ? `/materials/${r.categorySlug}` : `/materials/${r.categorySlug}/${r.productSlug}`}
                          onClick={handleResultClick}
                        >
                          <div className="flex items-center gap-3 px-4 py-3 hover:bg-slate-50 transition-colors border-b border-slate-100 last:border-0">
                            <img src={r.image} alt="" className="h-10 w-10 rounded-lg object-cover shrink-0" />
                            <div className="min-w-0 flex-1">
                              <p className="text-xs font-bold uppercase tracking-wide text-[#edad1a]">
                                {r.type === "category" ? "Category" : r.type === "product" ? "Product" : "Variant"}
                              </p>
                              <p className="truncate text-sm font-semibold text-[#00274d]">
                                {r.type === "variant"
                                  ? highlight(r.variantName!, query)
                                  : r.type === "product"
                                  ? highlight(r.productName!, query)
                                  : highlight(r.categoryName, query)}
                              </p>
                              {r.type !== "category" && (
                                <p className="text-xs text-gray-400">
                                  {r.categoryName}{r.type === "variant" && r.productName ? ` › ${r.productName}` : ""}
                                </p>
                              )}
                            </div>
                            <ArrowRight className="h-4 w-4 shrink-0 text-gray-300" />
                          </div>
                        </Link>
                      ))
                    ) : (
                      <div className="px-4 py-6 text-center">
                        <p className="text-sm font-semibold text-gray-500">No results for "{query}"</p>
                        <p className="mt-1 text-xs text-gray-400">Try a different keyword or browse below</p>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="mt-6 grid max-w-xl grid-cols-3 overflow-hidden rounded-lg border border-white/15 bg-white/10 backdrop-blur">
              <div className="border-r border-white/15 p-4">
                <p className="text-2xl font-semibold text-white">{categories.length}+</p>
                <p className="text-xs font-medium text-white/85">Categories</p>
              </div>
              <div className="border-r border-white/15 p-4">
                <p className="text-2xl font-semibold text-white">{productCount}+</p>
                <p className="text-xs font-medium text-white/85">Product groups</p>
              </div>
              <div className="p-4">
                <p className="text-2xl font-semibold text-white">1K+</p>
                <p className="text-xs font-medium text-white/85">Material options</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1"
          >
            {featuredCategories.map((category) => (
              <Link key={category.slug} href={`/materials/${category.slug}`}>
                <div className="group grid grid-cols-[92px_1fr] overflow-hidden rounded-lg border border-white/15 bg-white shadow-xl shadow-black/10 transition-transform hover:-translate-y-0.5">
                  <MaterialImage src={category.image} alt={category.name} label={category.name} className="h-24 w-full object-cover" />
                  <div className="flex min-w-0 flex-col justify-center p-4">
                    <p className="truncate text-sm font-semibold text-[#00274d]">{category.name}</p>
                    <p className="mt-1 text-xs text-gray-500">{category.products.length} product groups</p>
                    <span className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-[#edad1a]">
                      View category <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="border-b bg-white px-4 py-3">
        <div className="container mx-auto flex items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-[#edad1a]">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-[#edad1a] font-medium">Materials</span>
          {total > 0 && (
            <Link href="/quote-cart" className="ml-auto flex items-center gap-2 rounded-full bg-[#edad1a] px-4 py-1.5 text-sm font-semibold text-white transition-colors hover:bg-[#00274d]">
              <ShoppingCart className="w-4 h-4" />
              Quote Cart ({total})
            </Link>
          )}
        </div>
      </div>

      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">

          {/* Section heading */}
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              {isSearching ? (
                <>
                  <span className="inline-flex items-center gap-2 text-[#edad1a] text-[12px] font-bold uppercase tracking-[0.3em] mb-4">
                    <span className="w-6 h-px bg-[#edad1a]/60" />
                    Search results
                    <span className="w-6 h-px bg-[#edad1a]/60" />
                  </span>
                  <h2 className="text-3xl md:text-4xl font-bold leading-tight text-[#00274d]">
                    {filteredCategories.length} {filteredCategories.length === 1 ? "category" : "categories"} matching "{query}"
                  </h2>
                  <button
                    onClick={clearSearch}
                    className="mt-2 inline-flex items-center gap-1 text-sm text-gray-500 hover:text-[#edad1a] transition-colors"
                  >
                    <X className="h-3.5 w-3.5" /> Clear search
                  </button>
                </>
              ) : (
                <>
                  <span className="inline-flex items-center gap-2 text-[#edad1a] text-[12px] font-bold uppercase tracking-[0.3em] mb-4">
                    <span className="w-6 h-px bg-[#edad1a]/60" />
                    Material categories
                    <span className="w-6 h-px bg-[#edad1a]/60" />
                  </span>
                  <h2 className="text-3xl md:text-4xl font-bold leading-tight text-[#00274d]">Discover the right materials for your project.</h2>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-gray-500">
                   Browse categories, explore product options and variants, and add the required items to your quotation cart.
                  </p>
                </>
              )}
            </div>

            {/* Persistent inline search */}
            {/* <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 shadow-sm w-full md:w-72 shrink-0">
              <Search className="h-4 w-4 shrink-0 text-gray-400" />
              <input
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Filter categories…"
                className="flex-1 bg-transparent text-sm text-[#00274d] placeholder:text-gray-400 outline-none"
              />
              {query && (
                <button onClick={clearSearch} className="text-gray-400 hover:text-[#00274d]">
                  <X className="h-4 w-4" />
                </button>
              )}
            </div> */}
          </div>

          {/* Feature Strip — always visible */}
          <div className="mb-8 grid grid-cols-2 gap-3 lg:grid-cols-4">
            {features.map((feature) => (
              <div key={feature.label} className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3 shadow-sm">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#edad1a]/10">
                  <feature.icon className="h-4 w-4 text-[#edad1a]" />
                </span>
                <span className="text-sm font-bold text-[#00274d]">{feature.label}</span>
              </div>
            ))}
          </div>

          {/* Category Grid */}
          {displayedCategories.length > 0 ? (
            <div className="mb-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {displayedCategories.map((cat, i) => (
                <motion.div
                  key={cat.slug}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: Math.min(i * 0.04, 0.3) }}
                >
                  <Link href={`/materials/${cat.slug}`}>
                    <div className="group h-full cursor-pointer overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#edad1a]/50 hover:shadow-xl hover:shadow-blue-900/10">
                      <div className="relative h-44 overflow-hidden bg-slate-100">
                        <MaterialImage
                          src={cat.image}
                          alt={cat.name}
                          label={cat.name}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#00274d]/70 via-transparent to-transparent" />
                        <div className="absolute bottom-3 left-3 rounded-full bg-white/95 px-3 py-1 text-xs font-medium text-[#00274d] shadow-sm">
                          {cat.products.length} groups
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <h3 className="truncate text-base font-semibold text-[#00274d]">
                              {isSearching ? highlight(cat.name, query) : cat.name}
                            </h3>
                            <p className="mt-1 text-sm text-gray-500">Select a product, variant and unit, then add to cart.</p>
                          </div>
                          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-slate-200 text-[#edad1a] transition-colors group-hover:border-[#edad1a] group-hover:bg-[#edad1a] group-hover:text-white">
                            <ArrowRight className="h-4 w-4" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="mb-12 flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-white py-20 text-center">
              <PackageSearch className="h-12 w-12 text-slate-300 mb-4" />
              <p className="text-lg font-bold text-[#00274d]">No materials found for "{query}"</p>
              <p className="mt-2 text-sm text-gray-500">Try searching by category, product name, or variant</p>
              <button
                onClick={clearSearch}
                className="mt-4 rounded-full bg-[#edad1a] px-5 py-2 text-sm font-bold text-white hover:bg-[#d49a10] transition-colors"
              >
                Browse all categories
              </button>
            </div>
          )}

          {/* Product Category Index */}
          <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#edad1a]/20 text-[#00274d]">
                <CheckCircle2 className="h-5 w-5" />
              </span>
              <div>
                <h3 className="font-semibold text-[#00274d]">Product category index</h3>
                <p className="text-sm text-gray-500">Find categories based on your project requirements</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <Link key={cat.slug} href={`/materials/${cat.slug}`} className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm font-semibold text-[#00274d] transition-colors hover:border-[#edad1a] hover:bg-[#edad1a] hover:text-white">
                  {cat.name}
                  <ChevronRight className="h-3.5 w-3.5" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
