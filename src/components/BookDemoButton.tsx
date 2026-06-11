import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, Loader2, CalendarCheck, ChevronDown, ArrowRight } from "lucide-react";

const SECTORS = [
  "All sectors",
  "Roads & Bridges", "Urban Transport", "Transmission Lines & Substations",
  "Airports", "Railways", "Industrial Corridor Projects", "Smart Cities",
  "Ports", "Water & Waste Water", "Renewable Power", "Power",
  "Buildings & Industrial Projects", "Oil & Gas", "Irrigation & Tunnel Projects",
  "Solid Waste Management", "Other",
];

type Step = "form" | "loading" | "success";

const inputCls = "w-full bg-white border border-gray-200 rounded-md px-3 py-2 text-[13px] text-gray-700 placeholder:text-[12.5px] placeholder:text-gray-400 placeholder:font-normal focus:outline-none focus:border-[#edad1a] focus:ring-2 focus:ring-[#edad1a]/15 transition-all";
const labelCls = "block text-[10px] font-medium text-gray-500 uppercase tracking-[0.08em] mb-1";

export function BookDemoButton() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>("form");
  const [form, setForm] = useState({ name: "", company: "", phone: "", email: "", sectors: [] as string[] });
  const [errors, setErrors] = useState<Partial<Record<keyof typeof form, string>>>({});
  const [submitError, setSubmitError] = useState("");

  const set = (k: "name" | "company" | "phone" | "email") => (e: React.ChangeEvent<HTMLInputElement>) => {

    setForm(f => ({ ...f, [k]: e.target.value }));
    setErrors(p => ({ ...p, [k]: undefined }));
  };

  const toggleSector = (sector: string) => {
    setForm(f => {
      const sectors =
        sector === "All sectors"
          ? f.sectors.includes(sector) ? [] : ["All sectors"]
          : f.sectors.includes(sector)
          ? f.sectors.filter(s => s !== sector)
          : [...f.sectors.filter(s => s !== "All sectors"), sector];

      return { ...f, sectors };
    });
    setErrors(p => ({ ...p, sectors: undefined }));
  };

  const validate = () => {
    const e: Partial<Record<keyof typeof form, string>> = {};
    if (!form.name.trim()) e.name = "Required";
    if (!form.company.trim()) e.company = "Required";
    if (!form.phone.trim()) e.phone = "Required";
    return e;
  };


  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setStep("loading");
    setSubmitError("");
    try {
      const res = await fetch("/api/demo-bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Server error");
      setStep("success");
    } catch {
      setStep("form");
      setSubmitError("Could not send your request. Please call us or try again.");
    }
  };

  const close = () => {
    setOpen(false);
    setTimeout(() => { setStep("form"); setForm({ name: "", company: "", phone: "", email: "", sectors: [] }); setErrors({}); setSubmitError(""); }, 350);

  };

  const sectorLabel = form.sectors.length
    ? form.sectors.length === 1 ? form.sectors[0] : `${form.sectors.length} sectors selected`
    : "Select sectors...";

  return (
    <div className="fixed bottom-6 left-4 sm:left-6 z-50 flex flex-col items-start gap-0">
      {/* Slide-up panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 340, damping: 30 }}
            className="mb-3 w-[300px] bg-white rounded-xl shadow-xl shadow-black/15 border border-gray-100 overflow-hidden"
          >
            {/* Panel header */}
            <div className="relative bg-[#00274d] px-4 py-3">
              <div className="absolute inset-0 opacity-[0.07]"
                style={{ backgroundImage: "radial-gradient(circle at 1px 1px,#fff 1px,transparent 0)", backgroundSize: "18px 18px" }} />
              <div className="flex items-start justify-between relative z-10 gap-2">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-white/12 rounded-md flex items-center justify-center shrink-0">
                      <CalendarCheck className="w-3 h-3 text-white" />
                    </div>
                    <p className="text-white font-semibold text-[13px] leading-none tracking-tight">Book a Free Demo</p>
                  </div>
                  <p className="text-white/65 text-[11px] mt-1.5 leading-snug">
                    For AI-Powered SaaS Platform for the Infrastructure, Construction & Manufacturing Industry.
                  </p>
                </div>
                <button onClick={close} aria-label="Close"
                  className="w-6 h-6 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/70 hover:text-white transition-colors shrink-0">
                  <X className="w-3 h-3" />
                </button>
              </div>
            </div>


            {/* Panel body */}
            <div className="p-4">
              <AnimatePresence mode="wait">

                {step === "form" && (
                  <motion.form key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    onSubmit={submit} noValidate className="space-y-2.5">
                    <div>
                      <label className={labelCls}>Full Name *</label>
                      <input value={form.name} onChange={set("name")} placeholder="James"
                        className={`${inputCls} ${errors.name ? "border-red-400 ring-2 ring-red-200" : ""}`} />
                    </div>

                    <div>
                      <label className={labelCls}>Company *</label>
                      <input value={form.company} onChange={set("company")} placeholder="Your company"
                        className={`${inputCls} ${errors.company ? "border-red-400 ring-2 ring-red-200" : ""}`} />
                    </div>

                    <div>
                      <label className={labelCls}>Phone *</label>
                      <input value={form.phone} onChange={set("phone")} placeholder="98765 43210" type="tel"
                        className={`${inputCls} ${errors.phone ? "border-red-400 ring-2 ring-red-200" : ""}`} />
                    </div>

                    <div>
                      <label className={labelCls}>Email</label>
                      <input value={form.email} onChange={set("email")} placeholder="you@company.com" type="email"
                        className={inputCls} />
                    </div>

                    <div>
                      <label className={labelCls}>Sectors</label>
                      <div className="relative group">
                        <button
                          type="button"
                          className={`${inputCls} flex items-center justify-between text-left`}
                        >
                          <span className={form.sectors.length ? "text-[13px] text-gray-700 truncate" : "text-[12.5px] text-gray-400 font-normal"}>
                            {sectorLabel}
                          </span>
                          <ChevronDown className="w-4 h-4 text-gray-400 shrink-0" />
                        </button>
                        <div className="invisible opacity-0 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100 absolute left-0 right-0 bottom-full z-30 mb-2 max-h-52 overflow-y-auto rounded-lg border border-gray-200 bg-white p-1.5 shadow-2xl transition-all">
                          {SECTORS.map(s => (
                            <label key={s} className="flex min-h-9 cursor-pointer items-center gap-2.5 rounded-md px-2.5 py-1.5 text-[13px] font-medium leading-snug text-[#00274d] hover:bg-[#edad1a]/10">
                              <input
                                type="checkbox"
                                checked={form.sectors.includes(s)}
                                onChange={() => toggleSector(s)}
                                className="h-3.5 w-3.5 shrink-0 rounded border-gray-300 accent-[#edad1a]"
                              />
                              <span>{s}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>

                    <button type="submit"
                      className="group/btn w-full bg-[#edad1a] hover:bg-[#d4941a] text-white font-semibold py-2.5 pl-4 pr-2 rounded-md text-[13px] tracking-tight transition-all mt-1 flex items-center justify-between shadow-sm hover:shadow-md">
                      <span>Request My Free Demo</span>
                      <span className="w-6 h-6 bg-white rounded-full flex items-center justify-center text-[#1a1a1a] transition-transform group-hover/btn:translate-x-0.5">
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </button>

                    <p className="text-center text-gray-400 text-[10px] pt-0.5">
                      Our expert will connect with you shortly
                    </p>
                    {submitError && (
                      <p className="text-center text-red-500 text-[11px] leading-snug">{submitError}</p>
                    )}


                  </motion.form>
                )}

                {step === "loading" && (
                  <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center py-10 gap-3">
                    <Loader2 className="w-8 h-8 text-[#edad1a] animate-spin" />
                    <p className="text-gray-500 text-sm">Booking your demo…</p>
                  </motion.div>
                )}

                {step === "success" && (
                  <motion.div key="success" initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }} transition={{ type: "spring", stiffness: 260, damping: 22 }}
                    className="flex flex-col items-center justify-center py-8 gap-3 text-center">
                    <div className="w-14 h-14 bg-green-50 rounded-full flex items-center justify-center">
                      <CheckCircle2 className="w-8 h-8 text-green-500" />
                    </div>
                    <h3 className="text-base font-semibold text-[#00274d]">Demo Booked!</h3>
                    <p className="text-gray-500 text-xs leading-relaxed max-w-[200px]">
                      Thank you,  <strong className="text-gray-700">{form.name}</strong>!  One of our experts will contact you shortly.
                      {/* <strong className="text-gray-700">{form.phone}</strong> within 12 hours. */}
                    </p>
                    <button onClick={close}
                      className="mt-1 bg-[#00274d] text-white font-medium px-6 py-2.5 rounded-full text-sm hover:bg-[#003a6e] transition-colors">
                      Done
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating trigger button — icon-only on mobile, full label on sm+ */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.5, type: "spring" }}
        onClick={() => setOpen(v => !v)}
        aria-label="Book a Free Demo"
        className="flex items-center gap-2.5 bg-[#00274d] hover:bg-[#003a6e] text-white font-medium p-3 sm:pl-3 sm:pr-4 sm:py-3 rounded-full shadow-lg shadow-[#00274d]/25 transition-colors duration-200 group border border-white/10"
      >
        <div className="w-7 h-7 bg-[#edad1a] rounded-full flex items-center justify-center shrink-0">
          <CalendarCheck className="w-4 h-4 text-white" />
        </div>
        <span className="hidden sm:inline text-sm">Book a Demo</span>
        <motion.div
          className="hidden sm:block"
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25 }}
        >
          <ChevronDown className="w-4 h-4 text-white/60" />
        </motion.div>
      </motion.button>
    </div>
  );
}
