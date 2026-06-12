import React from "react";
import { Link, useParams } from "wouter";
import { motion } from "framer-motion";
import { ChevronRight, ShoppingCart, ShoppingBag, AlertCircle } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MaterialImage } from "@/components/materials/MaterialImage";
import { categories, getCategoryBySlug } from "@/lib/materialsData";
import { useQuoteCart } from "@/lib/quoteCart";
import { useState } from "react";
import { SiteButton } from "@/components/SiteButton";

function AddToQuoteBtn({
  categorySlug,
  categoryName,
  product,
}: {
  categorySlug: string;
  categoryName: string;
  product: { slug: string; name: string; image: string; variants: string[]; units: string[] };
}) {
  const { addItem } = useQuoteCart();
  const [selectedVariant, setSelectedVariant] = useState("");
  const [selectedUnit, setSelectedUnit] = useState("");
  const [selectedGrade, setSelectedGrade] = useState("");
  const [customVariant, setCustomVariant] = useState("");
  const [added, setAdded] = useState(false);
  const [error, setError] = useState("");

  const isSteel = categorySlug === "steel";

  const handleAdd = () => {
    if (isSteel && !selectedGrade) {
      setError("Select Primary or Secondary");
      setTimeout(() => setError(""), 2500);
      return;
    }
    if (!selectedVariant) {
      setError("Select a product option");
      setTimeout(() => setError(""), 2500);
      return;
    }
    if (!selectedUnit) {
      setError("Select a unit");
      setTimeout(() => setError(""), 2500);
      return;
    }
    setError("");
    addItem({
      categorySlug,
      categoryName,
      productSlug: product.slug,
      productName: product.name,
      variant: isSteel
        ? `${selectedGrade} · ${selectedVariant}${customVariant ? ` · ${customVariant}` : ""}`
        : `${selectedVariant}${customVariant ? ` · ${customVariant}` : ""}`,
      unit: selectedUnit,
      image: product.image,
      qty: 1,
    });
    setAdded(true);
    setCustomVariant("");
    setTimeout(() => setAdded(false), 2000);
  };

  return (
  <div className="px-3 pb-3 space-y-2 bg-[#00274d]">

      {/* Steel-only: Primary / Secondary dropdown */}
      {isSteel && (
        <select
          value={selectedGrade}
          onChange={e => { setSelectedGrade(e.target.value); setError(""); }}
          className="w-full border border-white/20 rounded-lg px-2.5 py-2 text-xs text-gray-700 focus:outline-none focus:border-[#edad1a] focus:ring-1 focus:ring-[#edad1a]/30 bg-white"
        >
          <option value="">Type — Choose an option</option>
          <option value="Primary">Primary</option>
          <option value="Secondary">Secondary</option>
        </select>
      )}

      {/* Products dropdown */}
      <select
        value={selectedVariant}
        onChange={e => { setSelectedVariant(e.target.value); setError(""); }}
        className="w-full border border-white/20 rounded-lg px-2.5 py-2 text-xs text-gray-700 focus:outline-none focus:border-[#edad1a] focus:ring-1 focus:ring-[#edad1a]/30 bg-white"
      >
        <option value="">Products — Choose an option</option>
        {product.variants.map(v => (
          <option key={v} value={v}>{v}</option>
        ))}
      </select>

      {/* Unit dropdown */}
     

      {/* Optional notes — all categories */}
   <input
  type="text"
  value={customVariant}
  onChange={e => setCustomVariant(e.target.value)}
  placeholder="Enter specification (e.g., Grade, Size, Model, Capacity)"
  className="w-full border border-gray-200 rounded-lg px-2.5 py-2 text-xs text-gray-700 placeholder:text-[11px] placeholder:text-gray-300 focus:outline-none focus:border-[#edad1a] focus:ring-1 focus:ring-[#edad1a]/30 bg-white"
/>
       <select
        value={selectedUnit}
        onChange={e => { setSelectedUnit(e.target.value); setError(""); }}
        className="w-full border border-white/20 rounded-lg px-2.5 py-2 text-xs text-gray-700 focus:outline-none focus:border-[#edad1a] focus:ring-1 focus:ring-[#edad1a]/30 bg-white"
      >
        <option value="">Unit — Choose an option</option>
        {product.units.map(u => (
          <option key={u} value={u}>{u}</option>
        ))}
      </select>

      {/* Validation error */}
      {error && (
        <p className="flex items-center gap-1 text-[10px] text-red-500 font-medium">
          <AlertCircle className="w-3 h-3 shrink-0" />
          {error}
        </p>
      )}

      {/* Add to Quote button */}
      <button
        onClick={handleAdd}
       className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
  added
    ? "bg-green-600 text-white border border-green-400"
    : "bg-[#00274d] hover:bg-[#edad1a] text-white hover:text-[#00274d] border border-white/40 hover:border-[#edad1a]"
}`}
      >
        <ShoppingBag className="w-4 h-4" />
        {added ? "Added!" : "Add to Quote"}
      </button>

      {/* WhatsApp quick enquiry */}
      <a
        href={`https://wa.me/918800119885?text=${encodeURIComponent(
          selectedVariant
            ? `Hi! I'm interested in ${isSteel && selectedGrade ? selectedGrade + " · " : ""}${selectedVariant}${customVariant ? ` · ${customVariant}` : ""} (${product.name}) from the ${categoryName} category. Can you share pricing and availability?`
            : `Hi! I'm interested in ${product.name} from the ${categoryName} category on Vendor Infra. Can you share pricing and availability?`
        )}`}
        target="_blank"
        rel="noopener noreferrer"
       className="w-full flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold bg-[#edad1a]/20 hover:bg-[#edad1a] text-[#edad1a] hover:text-[#00274d] transition-all duration-200"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 shrink-0">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
        </svg>
        Enquire on WhatsApp
      </a>
    </div>
  );
}

export default function MaterialCategory() {
  const { category: catSlug } = useParams<{ category: string }>();
  const { total } = useQuoteCart();
  const category = getCategoryBySlug(catSlug ?? "");

  if (!category) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-[#00274d] mb-4">Category not found</h2>
            <Link href="/materials" className="text-[#edad1a] hover:underline">← Back to Materials</Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const otherCategories = categories.filter(c => c.slug !== category.slug);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero */}
      <div data-preserve-hero-typography className="relative bg-[#00274d] overflow-hidden">
        <MaterialImage src={category.image} alt={category.name} label={category.name} className="absolute inset-0 w-full h-full object-cover opacity-20" />
        <div className="relative z-10 text-center py-16 px-4">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-[#edad1a]/40 bg-[#edad1a]/10 px-4 py-2 text-sm font-semibold text-[#edad1a]">
              Material Category
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-semibold text-white"
          >
            {category.name}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-white/70 mt-3 text-sm"
          >
            Covering all major products of Infrastructure, Construction &amp; Manufacturing industry
          </motion.p>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b py-3 px-4">
        <div className="container mx-auto flex flex-wrap items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-[#edad1a]">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/materials" className="hover:text-[#edad1a]">Materials</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-[#edad1a] font-medium">{category.name}</span>
          {total > 0 && (
            <Link href="/quote-cart" className="ml-auto flex items-center gap-2 bg-[#edad1a] text-[#00274d] px-4 py-1.5 rounded-full text-sm font-semibold hover:bg-[#00274d] hover:text-white transition-colors">
              <ShoppingCart className="w-4 h-4" />
              Quote Cart ({total})
            </Link>
          )}
        </div>
      </div>

      <main className="flex-1 py-12 bg-white">
        <div className="container mx-auto px-4">
          {/* Category heading */}
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-2 text-[#edad1a] text-[12px] font-bold uppercase tracking-[0.3em] mb-4">
              <span className="w-6 h-px bg-[#edad1a]/60" />
              Category: {category.name}
              <span className="w-6 h-px bg-[#edad1a]/60" />
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#00274d] leading-tight">We cover 1000+ Products</h2>
            <p className="text-sm text-gray-500 mt-2">Discover the right materials for your project.</p>
          </div>

          {/* Products Grid */}
          {category.products.length === 0 && (
            <div className="text-center py-16 mb-8">
              <p className="text-gray-400 text-lg font-medium">Products coming soon</p>
              <p className="text-gray-400 text-sm mt-2">Contact us for enquiries in this category</p>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mb-14">
            {category.products.map((product, i) => (
              <motion.div
                key={product.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="border-2 border-[#00274d] rounded-xl overflow-hidden group hover:shadow-lg transition-all duration-300 flex flex-col"
              >
                <Link href={`/materials/${category.slug}/${product.slug}`} className="block">
                  <div className="relative h-36 overflow-hidden bg-gray-50">
                    <MaterialImage
                      src={product.image}
                      alt={product.name}
                      label={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute bottom-2 right-2 w-7 h-7 bg-[#edad1a] rounded-full flex items-center justify-center shadow">
                      <ShoppingBag className="w-3.5 h-3.5 text-[#00274d]" />
                    </div>
                  </div>
              <div className="px-3 pt-3 pb-1 bg-[#00274d]">
  <p className="font-semibold text-white text-sm">{product.name}</p>
  <p className="text-[11px] text-white/60 mt-0.5">{product.variants.length} variants</p>
</div>
                </Link>

                <div className="mt-auto">
                  <AddToQuoteBtn categorySlug={category.slug} categoryName={category.name} product={product} />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Other categories */}
          <div className="mb-8">
            <span className="inline-flex items-center gap-2 text-[#edad1a] text-[12px] font-bold uppercase tracking-[0.3em] mb-5">
              <span className="w-6 h-px bg-[#edad1a]/60" />
              Other Categories
              <span className="w-6 h-px bg-[#edad1a]/60" />
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {otherCategories.map((cat, i) => (
                <motion.div
                  key={cat.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.04 }}
                >
                  <Link href={`/materials/${cat.slug}`}>
                    <div className="border-2 border-[#00274d] rounded-xl overflow-hidden hover:shadow-md hover:border-[#edad1a] transition-all duration-300 group cursor-pointer">
                      <div className="h-24 overflow-hidden">
                        <MaterialImage src={cat.image} alt={cat.name} label={cat.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      </div>
<div className="p-2.5">
  <span className="flex items-center gap-1 text-[#00274d] group-hover:text-[#edad1a] text-sm font-semibold transition-colors">
    <ChevronRight className="w-3.5 h-3.5" /> {cat.name}
  </span>
</div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <section
        className="bg-[#edad1a] py-16 relative"
        style={{
          backgroundImage: "radial-gradient(rgba(0,39,77,0.18) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-5">
              <span className="h-px w-10 bg-[#00274d]/40" />
              <span className="text-xs md:text-sm font-bold tracking-[0.3em] text-[#00274d]">
                GET STARTED TODAY
              </span>
              <span className="h-px w-10 bg-[#00274d]/40" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#00274d] mb-3">
              Ready to Grow and Transform your Business?
            </h2>
            <p className="text-[#00274d]/85 mb-6 text-sm md:text-base">
              Join <span className="font-semibold">32,000+</span> contractors, vendors, manufacturers, suppliers, and consultants across diverse sectors already using Vendor Infra to discover new opportunities, streamline procurement, acesss plants and equipment solutions, and secure project financing and insurance—all through a single integrated platform.
            </p>
            <div className="flex flex-wrap gap-3 justify-center items-center">
              <Link href="/contact">
                <SiteButton variant="onGold" className="normal-case tracking-normal">
                  Get in Touch
                </SiteButton>
              </Link>
              <Link href="/materials">
                <SiteButton variant="onGold" className="normal-case tracking-normal">
                  Back to Materials
                </SiteButton>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}