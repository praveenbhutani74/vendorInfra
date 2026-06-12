import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingCart, Trash2, Plus, Minus, ArrowLeft,
  Send, CheckCircle, AlertCircle, Clock, Shield, Zap, Package,
} from "lucide-react";
import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MaterialImage } from "@/components/materials/MaterialImage";
import { useQuoteCart } from "@/lib/quoteCart";
import { PageHero } from "@/components/layout/PageHero";

const inputCls =
  "w-full bg-white border border-white/20 rounded-xl px-4 py-3 text-sm text-[#00274d] placeholder:text-gray-400 " +
  "focus:outline-none focus:border-[#edad1a] focus:ring-2 focus:ring-[#edad1a]/20 transition-all duration-150 font-[inherit]";

export default function QuoteCart() {
  const { items, removeItem, updateQty, clearCart, total } = useQuoteCart();
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "", company: "", email: "", phone: "", message: "",
  });

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
          items: items.map(i => ({
            categoryName: i.categoryName,
            productName: i.productName,
            variant: i.variant,
            unit: i.unit,
            qty: i.qty,
          })),
        }),
      });
      if (res.ok) { setSubmitted(true); clearCart(); }
      else {
        const d = await res.json().catch(() => ({}));
        setError(d.error ?? "Something went wrong. Please try again or call us directly.");
      }
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ── Success ── */
  if (submitted) {
    return (
      <div className="min-h-screen flex flex-col bg-[#f7f8fa]">
        <Navbar />
        <div className="flex-1 flex items-center justify-center py-24 px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.88, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="bg-[#00274d] rounded-3xl p-14 shadow-2xl text-center max-w-sm w-full border border-white/5"
          >
            <div className="relative mx-auto w-20 h-20 mb-8">
              <motion.div
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1.4, opacity: 0 }}
                transition={{ repeat: Infinity, duration: 1.8, ease: "easeOut" }}
                className="absolute inset-0 rounded-full bg-[#edad1a]/20"
              />
              <div className="relative w-20 h-20 rounded-full bg-[#edad1a]/10 border-2 border-[#edad1a]/30 flex items-center justify-center">
                <CheckCircle className="w-9 h-9 text-[#edad1a]" />
              </div>
            </div>
            <div className="inline-flex items-center gap-2 bg-[#edad1a]/10 border border-[#edad1a]/20 text-[#edad1a] text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-widest mb-5">
              Request sent
            </div>
            <h2 className="text-2xl font-extrabold text-white mb-3 tracking-tight leading-snug">
              We've got your quote<br />request!
            </h2>
            <p className="text-white/40 text-sm leading-relaxed mb-8">
              Our team personally reviews every request and will contact you within{" "}
              <span className="text-white/70 font-semibold">12 hours</span> with pricing and availability.
            </p>
            <Link href="/materials">
              <button className="w-full bg-[#edad1a] text-[#00274d] font-extrabold py-4 rounded-2xl hover:bg-[#f5c43a] transition-all duration-200 tracking-wide text-sm">
                Continue browsing
              </button>
            </Link>
          </motion.div>
        </div>
        <Footer />
      </div>
    );
  }

  /* ── Main ── */
  return (
    <div className="min-h-screen flex flex-col bg-[#f7f8fa]">
      <Navbar />
      <PageHero
        eyebrow="Materials"
        title="Your Quote Cart"
        subtitle="Our team will review your requirements and get in touch with you soon."
      />

      <section className="flex-1 py-12">
        <div className="container mx-auto px-4 max-w-6xl">

          <Link href="/materials" className="inline-flex items-center gap-2 text-[#edad1a] text-xs font-bold uppercase tracking-widest mb-10 group">
            <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
            Back to materials
          </Link>

          {items.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl p-20 text-center border border-gray-100 shadow-sm"
            >
              <div className="w-16 h-16 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center mx-auto mb-6">
                <ShoppingCart className="w-8 h-8 text-gray-200" />
              </div>
              <h3 className="text-xl font-extrabold text-[#00274d] mb-3 tracking-tight">Nothing here yet</h3>
              <p className="text-gray-400 text-sm mb-8 max-w-xs mx-auto leading-relaxed">
                Browse our materials catalogue and add items to get a personalised quote.
              </p>
              <Link href="/materials">
                <button className="bg-[#00274d] text-white font-bold px-10 py-3.5 rounded-2xl hover:bg-[#edad1a] hover:text-white transition-all duration-200 text-sm tracking-wide">
                  Browse Materials
                </button>
              </Link>
            </motion.div>
          ) : (
            <div className="grid lg:grid-cols-[1fr_380px] gap-8 items-start">

              {/* ─ LEFT: Items ─ */}
              <div>
                <div className="flex items-end justify-between mb-6">
                  <div>
                    <p className="text-[10px] font-bold tracking-[0.16em] uppercase text-[#00274d] mb-1.5">Your selection</p>
                    <h2 className="text-[28px] font-extrabold text-[#00274d] tracking-tight leading-none">
                      {total} {total === 1 ? "item" : "items"}
                      <span className="text-[14px] font-normal text-[#b0b8c8] ml-2 tracking-normal">in cart</span>
                    </h2>
                  </div>
                  <button
                    onClick={clearCart}
                    className="flex items-center gap-1.5 text-xs text-red-400 hover:text-red-600 font-semibold px-3 py-2 rounded-xl hover:bg-red-50 transition-all"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Clear all
                  </button>
                </div>

                <div className="space-y-3">
                  <AnimatePresence>
                    {items.map((item, i) => (
                      <motion.div
                        key={`${item.productSlug}-${item.variant}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: 40, height: 0, marginBottom: 0 }}
                        transition={{ delay: i * 0.07, duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                        className="group bg-white rounded-[20px] border border-[#eef0f4] hover:border-[#edad1a]/60 hover:shadow-[0_8px_32px_rgba(237,173,26,0.09)] transition-all duration-200 p-5 flex gap-4 relative overflow-hidden"
                      >
                        <span className="absolute top-3.5 right-4 text-[11px] font-black text-[#e8ecf4] tracking-widest select-none">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <div className="w-[68px] h-[68px] rounded-[14px] bg-[#f3f5f8] border border-[#eef0f4] flex-shrink-0 overflow-hidden flex items-center justify-center">
                          <MaterialImage
                            src={item.image}
                            alt={item.productName}
                            label={item.productName}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0 pr-6">
                          <p className="text-[10px] font-bold tracking-[0.14em] uppercase text-[#00274d] mb-1">{item.categoryName}</p>
                          <p className="text-[15px] font-extrabold text-[#00274d] tracking-tight leading-snug mb-1.5">{item.productName}</p>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-xs text-[#b0b8c8]">{item.variant}</span>
                            <span className="text-[#dde2ea]">·</span>
                            <span className="inline-flex items-center gap-1.5 bg-[#fdf3d8] text-[#a07010] text-[11px] font-bold px-2.5 py-0.5 rounded-lg">
                              <Package className="w-3 h-3" />
                              {item.unit}
                            </span>
                          </div>
                          <div className="flex items-center gap-3 mt-3.5">
                            <div className="flex items-center rounded-xl overflow-hidden border-[1.5px] border-[#eef0f4] bg-[#f8fafc]">
                              <button
                                onClick={() => updateQty(item.productSlug, item.variant, item.qty - 1)}
                                className="w-9 h-9 flex items-center justify-center text-[#8896aa] hover:bg-[#edad1a] hover:text-white transition-all"
                                aria-label="Decrease"
                              >
                                <Minus className="w-3.5 h-3.5" />
                              </button>
                              <input
                                type="number" min={1} key={item.qty} defaultValue={item.qty}
                                onBlur={e => {
                                  const v = parseInt(e.target.value, 10);
                                  updateQty(item.productSlug, item.variant, Number.isFinite(v) && v > 0 ? v : 1);
                                }}
                                className="w-12 h-9 text-center text-sm font-black text-[#00274d] bg-white border-x-[1.5px] border-[#eef0f4] focus:outline-none focus:ring-2 focus:ring-[#edad1a]/20 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                              />
                              <button
                                onClick={() => updateQty(item.productSlug, item.variant, item.qty + 1)}
                                className="w-9 h-9 flex items-center justify-center text-[#8896aa] hover:bg-[#edad1a] hover:text-white transition-all"
                                aria-label="Increase"
                              >
                                <Plus className="w-3.5 h-3.5" />
                              </button>
                            </div>
                            <button
                              onClick={() => removeItem(item.productSlug, item.variant)}
                              className="ml-auto w-9 h-9 flex items-center justify-center rounded-xl bg-[#fff5f5] hover:bg-[#fee2e2] text-[#f87171] hover:text-[#ef4444] transition-all"
                              aria-label={`Remove ${item.productName}`}
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                {/* <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mt-5 flex items-center gap-4 bg-white border border-[#eef0f4] rounded-[18px] p-4"
                >
                  <div className="w-11 h-11 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-amber-500" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#00274d]">Reply within 12 hours</p>
                    <p className="text-xs text-[#b0b8c8] mt-0.5 leading-relaxed">
                      Every request is personally reviewed. We'll send pricing, availability & delivery details.
                    </p>
                  </div>
                </motion.div> */}
              </div>

              {/* ─ RIGHT: Form panel ─ */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.12 }}
                className="sticky top-24"
              >
                <div className="bg-[#00274d] rounded-3xl overflow-hidden border border-white/5 shadow-2xl shadow-[#00274d]/20">

                  {/* Header */}
                  <div className="px-7 pt-7 pb-6 border-b-2 border-[#edad1a]">
                    <p className="text-[10px] font-bold tracking-[0.18em] uppercase text-white mb-2">Quote request</p>
                    {/* <h3 className="text-[18px] font-extrabold text-white tracking-tight leading-snug mb-1">
                      Tell us about yourself
                    </h3> */}
                    <p className="text-xs text-white/35 leading-relaxed">
                      We'll confirm pricing and stock availability.
                    </p>
                    {/* <div className="inline-flex items-center gap-2 mt-4 bg-[#edad1a]/10 border border-[#edad1a]/25 text-[#edad1a] text-[11px] font-bold px-3 py-1.5 rounded-full">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#edad1a] inline-block" />
                      {total} item{total !== 1 ? "s" : ""} selected
                    </div> */}
                  </div>

                  {/* Form */}
                  <div className="px-7 py-6">
                    {error && (
                      <div className="mb-5 flex items-start gap-3 p-3.5 bg-red-500/10 border border-red-500/20 rounded-xl text-xs text-red-300">
                        <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-400" />
                        <span>{error}</span>
                      </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-3.5">
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] font-bold tracking-[0.1em] uppercase text-white mb-2">
                            Full name <span className="text-white">*</span>
                          </label>
                          <input
                            required value={form.name}
                            onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                            placeholder="John Smith"
                            className={inputCls}
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold tracking-[0.1em] uppercase text-white mb-2">
                            Company <span className="text-white">*</span>
                          </label>
                          <input
                            required value={form.company}
                            onChange={e => setForm(f => ({ ...f, company: e.target.value }))}
                            placeholder="Acme Ltd."
                            className={inputCls}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold tracking-[0.1em] uppercase text-white mb-2">
                          Email address <span className="text-white">*</span>
                        </label>
                        <input
                          required type="email" value={form.email}
                          onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                          placeholder="you@company.com"
                          className={inputCls}
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold tracking-[0.1em] uppercase text-white mb-2">
                          Phone number <span className="text-white">*</span>
                        </label>
                        <input
                          required type="tel" value={form.phone}
                          onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                          placeholder="+91-XXXXX XXXXX"
                          className={inputCls}
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold tracking-[0.1em] uppercase text-white mb-2">
                          Notes{" "}
                          {/* <span className="text-white font-normal normal-case tracking-normal">optional</span> */}
                        </label>
                        <textarea
                          rows={3} value={form.message}
                          onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                          placeholder="Delivery location, timeline, special requirements…"
                          className={`${inputCls} resize-none`}
                        />
                      </div>

                      <button
                        type="submit" disabled={isSubmitting}
                        className="w-full bg-[#edad1a] hover:bg-[#f5c43a] disabled:opacity-50 text-[#00274d] font-extrabold py-4 rounded-2xl transition-all duration-200 flex items-center justify-center gap-2.5 text-sm tracking-wide hover:-translate-y-0.5 active:translate-y-0 shadow-lg shadow-[#edad1a]/20 mt-1"
                      >
                        {isSubmitting ? (
                          <>
                            <span className="animate-spin rounded-full h-4 w-4 border-2 border-[#00274d]/20 border-t-[#00274d]" />
                            Sending…
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            Send quote request
                          </>
                        )}
                      </button>

                      {/* <div className="flex items-center justify-center gap-0 pt-1 border-t border-white/[0.06] mt-2">
                        {[
                          { icon: <Shield className="w-3 h-3 text-green-400" />, label: "No commitment" },
                          { icon: <Zap className="w-3 h-3 text-[#edad1a]" />, label: "Free quote" },
                          { icon: <Clock className="w-3 h-3 text-blue-400" />, label: "Reply in 12 hrs" },
                        ].map((t, i) => (
                          <div key={i} className={`flex items-center gap-1.5 text-[11px] text-white/30 px-3 py-2.5 ${i > 0 ? "border-l border-white/[0.07]" : ""}`}>
                            {t.icon} {t.label}
                          </div>
                        ))}
                      </div> */}
                    </form>
                  </div>
                </div>
              </motion.div>

            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}