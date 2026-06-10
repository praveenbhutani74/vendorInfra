import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Trash2, Plus, Minus, ArrowLeft, Send, CheckCircle, AlertCircle } from "lucide-react";
import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MaterialImage } from "@/components/materials/MaterialImage";
import { useQuoteCart } from "@/lib/quoteCart";
import { PageHero } from "@/components/layout/PageHero";

export default function QuoteCart() {
  const { items, removeItem, updateQty, clearCart, total } = useQuoteCart();
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", company: "", email: "", phone: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/quote-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          items: items.map(item => ({
            categoryName: item.categoryName,
            productName: item.productName,
            variant: item.variant,
            unit: item.unit,
            qty: item.qty,
          })),
        }),
      });

      if (res.ok) {
        setSubmitted(true);
        clearCart();
      } else {
        const data = await res.json().catch(() => ({}));
        setError(data.error ?? "Something went wrong. Please try again or call us directly.");
      }
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center bg-gray-50 py-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-12 shadow-sm border border-gray-100 text-center max-w-md"
          >
            <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-500" />
            </div>
            <h2 className="text-2xl font-semibold text-[#00274d] mb-3">Quote Request Sent!</h2>
            <p className="text-gray-500 mb-8 leading-relaxed">
              Our team will review your requirements and contact you within 12 hours with pricing and availability.
            </p>
            <Link href="/materials">
              <button className="bg-[#edad1a] text-white font-bold px-8 py-3 rounded-full hover:bg-[#00274d] transition-colors shadow-md">
                Continue Shopping
              </button>
            </Link>
          </motion.div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <PageHero
        eyebrow="Materials"
        title="Your Quote Cart"
        subtitle="Our team will review your requirements and get in touch with you soon."
      />

      <section className="flex-1 bg-gray-50 py-12">
        <div className="container mx-auto px-4 max-w-5xl">
          <Link href="/materials" className="inline-flex items-center gap-2 text-[#edad1a] text-sm font-medium mb-8 hover:gap-3 transition-all">
            <ArrowLeft className="w-4 h-4" /> Back to Materials
          </Link>

          {items.length === 0 ? (
            <div className="bg-white rounded-2xl p-16 text-center border border-gray-100 shadow-sm">
              <ShoppingCart className="w-16 h-16 text-gray-200 mx-auto mb-6" />
              <h3 className="text-xl font-bold text-[#00274d] mb-3">Your cart is empty</h3>
              <p className="text-gray-400 mb-8">Browse our materials catalogue and add items to get a quote.</p>
              <Link href="/materials">
                <button className="bg-[#edad1a] text-white font-semibold px-8 py-3 rounded-full hover:bg-[#00274d] transition-colors">
                  Browse Materials
                </button>
              </Link>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="font-bold text-[#00274d] text-lg">{total} item{total !== 1 ? "s" : ""} in cart</h2>
                  <button onClick={clearCart} className="text-red-400 hover:text-red-600 text-sm font-medium flex items-center gap-1 transition-colors">
                    <Trash2 className="w-4 h-4" /> Clear All
                  </button>
                </div>

                <AnimatePresence>
                  {items.map((item) => (
                    <motion.div
                      key={`${item.productSlug}-${item.variant}`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20, height: 0 }}
                      className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex gap-4"
                    >
                      <MaterialImage src={item.image} alt={item.productName} label={item.productName} className="w-20 h-20 object-cover rounded-lg shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-gray-400 uppercase tracking-wide">{item.categoryName}</p>
                        <p className="font-bold text-[#00274d] mt-0.5">{item.productName}</p>
                        <p className="text-sm text-gray-500 mt-0.5">{item.variant} · {item.unit}</p>
                        <div className="flex items-center gap-3 mt-3">
                          <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                            <button
                              onClick={() => updateQty(item.productSlug, item.variant, item.qty - 1)}
                              className="w-8 h-8 flex items-center justify-center hover:bg-gray-50 transition-colors"
                            >
                              <Minus className="w-3.5 h-3.5 text-gray-600" />
                            </button>
                     <input
                      type="number"
                      min={1}
                      key={item.qty}
                      defaultValue={item.qty}
                      onBlur={e => {
                        const v = parseInt(e.target.value, 10);
                        updateQty(item.productSlug, item.variant, Number.isFinite(v) && v > 0 ? v : 1);
                      }}
                      className="w-16 h-8 text-center text-sm font-semibold border-x border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#edad1a]/40 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                            <button
                              onClick={() => updateQty(item.productSlug, item.variant, item.qty + 1)}
                              className="w-8 h-8 flex items-center justify-center hover:bg-gray-50 transition-colors"
                            >
                              <Plus className="w-3.5 h-3.5 text-gray-600" />
                            </button>
                          </div>
                          <button
                            onClick={() => removeItem(item.productSlug, item.variant)}
                            className="text-red-400 hover:text-red-600 transition-colors ml-auto"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Quote Form */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden sticky top-24">
                  <div className="bg-[#00274d] px-6 py-5 border-b-2 border-[#edad1a]">
                    <h3 className="font-semibold text-white text-base flex items-center gap-2">
                      <Send className="w-4 h-4 text-[#edad1a]" /> Submit Quote Request
                    </h3>
                    <p className="text-white/60 text-xs mt-1">{total} item{total !== 1 ? "s" : ""} </p>
                  </div>

                  <div className="p-6">
                    {error && (
                      <div className="mb-4 flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
                        <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                        {error}
                      </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label className="text-xs font-semibold text-[#00274d] block mb-1">Full Name *</label>
                        <input required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                          className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm placeholder:font-light placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#edad1a]/30 focus:border-[#edad1a]"
                          placeholder="John Smith"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-[#00274d] block mb-1">Company Name *</label>
                        <input required value={form.company} onChange={e => setForm(f => ({ ...f, company: e.target.value }))}
                          className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm placeholder:font-light placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#edad1a]/30 focus:border-[#edad1a]"
                          placeholder="Your Company Pvt. Ltd."
                        />
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-[#00274d] block mb-1">Email *</label>
                        <input required type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                          className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm placeholder:font-light placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#edad1a]/30 focus:border-[#edad1a]"
                          placeholder="you@company.com"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-[#00274d] block mb-1">Phone *</label>
                        <input required type="tel" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                          className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm placeholder:font-light placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#edad1a]/30 focus:border-[#edad1a]"
                          placeholder="+91-XXXXX XXXXX"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-[#00274d] block mb-1">Additional Notes</label>
                        <textarea value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                          rows={3}
                          className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm placeholder:font-light placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#edad1a]/30 focus:border-[#edad1a] resize-none"
                          placeholder="Delivery location, project timeline, special requirements..."
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-[#edad1a] hover:bg-[#d49a10] disabled:opacity-60 text-white font-bold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 shadow-md shadow-yellow-400/20"
                      >
                        {isSubmitting ? (
                          <>
                            <span className="animate-spin rounded-full h-4 w-4 border-2 border-white/30 border-t-white" />
                            Sending…
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4" /> Submit Quote Request
                          </>
                        )}
                      </button>
                      <p className="text-center text-xs text-gray-400"></p>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
