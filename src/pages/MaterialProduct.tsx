import { Link, useParams } from "wouter";
import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight, Minus, Plus, RotateCcw, ShoppingCart, Check, ShoppingBag, AlertCircle } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MaterialImage } from "@/components/materials/MaterialImage";
import { categories, getProductBySlug } from "@/lib/materialsData";
import { useQuoteCart } from "@/lib/quoteCart";

export default function MaterialProduct() {
  const { category: catSlug, product: prodSlug } = useParams<{ category: string; product: string }>();
  const { addItem, total } = useQuoteCart();
  const result = getProductBySlug(catSlug ?? "", prodSlug ?? "");
  const [selectedVariant, setSelectedVariant] = useState("");
  const [selectedUnit, setSelectedUnit] = useState("");
  const [selectedGrade, setSelectedGrade] = useState("");
  const [customVariant, setCustomVariant] = useState("");
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [validationError, setValidationError] = useState("");

  if (!result) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-[#00274d] mb-4">Product not found</h2>
            <Link href="/materials" className="text-[#edad1a] hover:underline">← Back to Materials</Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const { category, product } = result;
  const isSteel = category.slug === "steel";

  const handleAddToQuote = () => {
    if (isSteel && !selectedGrade) {
      setValidationError("Please select Primary or Secondary.");
      setTimeout(() => setValidationError(""), 3000);
      return;
    }
    if (!selectedVariant) {
      setValidationError("Please select a product option.");
      setTimeout(() => setValidationError(""), 3000);
      return;
    }
    if (!selectedUnit) {
      setValidationError("Please select a unit.");
      setTimeout(() => setValidationError(""), 3000);
      return;
    }
    setValidationError("");
    addItem({
      categorySlug: category.slug,
      categoryName: category.name,
      productSlug: product.slug,
      productName: product.name,
      variant: isSteel
        ? `${selectedGrade} · ${selectedVariant}${customVariant ? ` · ${customVariant}` : ""}`
        : `${selectedVariant}${customVariant ? ` · ${customVariant}` : ""}`,
      unit: selectedUnit,
      image: product.image,
      qty,
    });
    setAdded(true);
    setCustomVariant("");
    setTimeout(() => setAdded(false), 3000);
  };

  const relatedProducts = category.products.filter(p => p.slug !== product.slug);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b py-3 px-4">
        <div className="container mx-auto flex flex-wrap items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-[#edad1a]">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/materials" className="hover:text-[#edad1a]">Materials</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href={`/materials/${category.slug}`} className="hover:text-[#edad1a]">{category.name}</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-[#edad1a] font-medium">{product.name}</span>
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
          <div className="grid md:grid-cols-2 gap-10 mb-16 max-w-4xl mx-auto">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="border border-gray-200 rounded-2xl overflow-hidden"
            >
              <MaterialImage
                src={product.image}
                alt={product.name}
                label={product.name}
                className="w-full h-80 object-cover"
              />
            </motion.div>

            {/* Details panel */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              className="border border-gray-200 rounded-2xl p-8"
            >
              <span className="inline-flex items-center gap-2 text-[#edad1a] text-[12px] font-bold uppercase tracking-[0.3em] mb-4">
                <span className="w-6 h-px bg-[#edad1a]/60" />
                {category.name}
                <span className="w-6 h-px bg-[#edad1a]/60" />
              </span>
              <h1 className="text-3xl md:text-4xl font-bold text-[#00274d] leading-tight mb-2">{product.name}</h1>
              {product.description && (
                <p className="text-gray-500 text-sm mb-6 leading-relaxed">{product.description}</p>
              )}

              <div className="border-t border-gray-100 my-4" />

              {/* Steel-only: Grade dropdown */}
              {isSteel && (
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Type</label>
                  <select
                    value={selectedGrade}
                    onChange={e => { setSelectedGrade(e.target.value); setValidationError(""); }}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#edad1a]/40 focus:border-[#edad1a] bg-white"
                  >
                    <option value="">Choose an option</option>
                    <option value="Primary">Primary</option>
                    <option value="Secondary">Secondary</option>
                  </select>
                </div>
              )}

              {/* Products (variant) selector */}
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Products</label>
                <select
                  value={selectedVariant}
                  onChange={e => { setSelectedVariant(e.target.value); setValidationError(""); }}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#edad1a]/40 focus:border-[#edad1a] bg-white"
                >
                  <option value="">Choose an option</option>
                  {product.variants.map(v => (
                    <option key={v} value={v}>{v}</option>
                  ))}
                </select>
              </div>

                      <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Additional Notes <span className="text-gray-400 font-normal">(optional)</span>
                </label>
                <input
                  type="text"
                  value={customVariant}
                  onChange={e => setCustomVariant(e.target.value)}
                  placeholder="Enter specification (e.g., Grade, Size, Model, Capacity)"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm placeholder:text-[11px] placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#edad1a]/40 focus:border-[#edad1a] bg-white"
                />
              </div>

              {/* Unit selector */}
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Unit</label>
                <select
                  value={selectedUnit}
                  onChange={e => { setSelectedUnit(e.target.value); setValidationError(""); }}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#edad1a]/40 focus:border-[#edad1a] bg-white"
                >
                  <option value="">Choose an option</option>
                  {product.units.map(u => (
                    <option key={u} value={u}>{u}</option>
                  ))}
                </select>
              </div>

              {/* Additional notes — all categories */}
      

              <div className="border-t border-gray-100 my-4" />

              {/* Quantity */}
              <div className="mb-5">
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Quantity</label>
                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                    <button
                      onClick={() => setQty(q => Math.max(1, q - 1))}
                      className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 text-gray-600 transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <input
                      type="number"
                      min={1}
                      key={qty}
                      defaultValue={qty}
                      onBlur={e => {
                        const v = parseInt(e.target.value, 10);
                        setQty(Number.isFinite(v) && v > 0 ? v : 1);
                      }}
                      className="w-20 text-center text-sm font-semibold border-x border-gray-300 h-10 focus:outline-none focus:ring-2 focus:ring-[#edad1a]/40 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                    <button
                      onClick={() => setQty(q => q + 1)}
                      className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 text-gray-600 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setQty(1)}
                      className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 text-gray-400 transition-colors"
                      title="Reset"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Validation error */}
              {validationError && (
                <div className="mb-4 flex items-center gap-2 text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  {validationError}
                </div>
              )}

              {/* Add to Quote button */}
              <button
                onClick={handleAddToQuote}
                className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-base transition-all duration-300 ${
                  added
                    ? "bg-green-600 text-white"
                    : "bg-[#edad1a] hover:bg-[#00274d] text-[#00274d] hover:text-white"
                }`}
              >
                {added ? <Check className="w-5 h-5" /> : <ShoppingBag className="w-5 h-5" />}
                {added ? "Added to Quote!" : "Add to Quote"}
              </button>

              {added && (
                <div className="mt-3 text-center">
                  <Link href="/quote-cart" className="text-[#edad1a] text-sm hover:underline font-medium">
                    View Quote Cart →
                  </Link>
                </div>
              )}
            </motion.div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="max-w-4xl mx-auto">
              <span className="inline-flex items-center gap-2 text-[#edad1a] text-[12px] font-bold uppercase tracking-[0.3em] mb-4">
                <span className="w-6 h-px bg-[#edad1a]/60" />
                Related Products
                <span className="w-6 h-px bg-[#edad1a]/60" />
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#00274d] leading-tight mb-6">More from {category.name}</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
                {relatedProducts.map((rp, i) => (
                  <motion.div
                    key={rp.slug}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="border border-gray-200 rounded-xl overflow-hidden group hover:shadow-md transition-all duration-300"
                  >
                    <Link href={`/materials/${category.slug}/${rp.slug}`}>
                      <div className="h-32 overflow-hidden">
                        <MaterialImage src={rp.image} alt={rp.name} label={rp.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      </div>
                      <div className="p-3">
                        <p className="font-semibold text-[#00274d] text-sm">{rp.name}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{rp.variants.length} variants</p>
                      </div>
                    </Link>
                    <div className="px-3 pb-3">
                      <Link
                        href={`/materials/${category.slug}/${rp.slug}`}
                        className="w-full flex items-center justify-center gap-1 bg-[#00274d] hover:bg-[#edad1a] text-white hover:text-[#00274d] py-2 rounded-lg text-xs font-semibold transition-colors"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" /> Select & Add
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}