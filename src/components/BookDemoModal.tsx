import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, Loader2, User, Building2, Phone, LayoutGrid, ChevronDown } from "lucide-react";

const SECTORS = [
  "All sectors",
  "Roads & Bridges",
  "Urban Transport",
  "Transmission Lines & Substations",
  "Airports",
  "Railways",
  "Industrial Corridor Projects",
  "Smart Cities",
  "Ports",
  "Water & Waste Water",
  "Renewable Power",
  "Power",
  "Buildings & Industrial Projects",
  "Oil & Gas",
  "Irrigation & Tunnel Projects",
  "Solid Waste Management",
  "Other",
];

interface Props {
  open: boolean;
  onClose: () => void;
}

type Step = "form" | "submitting" | "success";

export function BookDemoModal({ open, onClose }: Props) {
  const [step, setStep] = useState<Step>("form");
  const [form, setForm] = useState({
    name: "",
    company: "",
    phone: "",
    sectors: [] as string[],
    message: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof typeof form, string>>>({});
  const [submitError, setSubmitError] = useState("");

  const validate = () => {
    const e: Partial<Record<keyof typeof form, string>> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.company.trim()) e.company = "Company is required";
    if (!form.phone.trim() || !/^[0-9+\-\s]{7,15}$/.test(form.phone))
      e.phone = "Enter a valid phone number";
    if (!form.sectors.length) e.sectors = "Please select at least one sector";
    return e;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
    setErrors((p) => ({ ...p, [e.target.name]: undefined }));
  };

  const toggleSector = (sector: string) => {
    setForm((p) => {
      const sectors =
        sector === "All sectors"
          ? p.sectors.includes(sector) ? [] : ["All sectors"]
          : p.sectors.includes(sector)
          ? p.sectors.filter((s) => s !== sector)
          : [...p.sectors.filter((s) => s !== "All sectors"), sector];

      return { ...p, sectors };
    });
    setErrors((p) => ({ ...p, sectors: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setStep("submitting");
    setSubmitError("");
    try {
      const res = await fetch(`${import.meta.env.BASE_URL}api/demo-bookings`, {
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

  const handleClose = () => {
    onClose();
    setTimeout(() => { setStep("form"); setForm({ name: "", company: "", phone: "", sectors: [], message: "" }); setErrors({}); setSubmitError(""); }, 400);
  };

  const sectorLabel = form.sectors.length
    ? form.sectors.length === 1 ? form.sectors[0] : `${form.sectors.length} sectors selected`
    : "Select sectors of interest *";

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
          />

          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 24 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            className="fixed inset-0 z-[61] flex items-center justify-center p-4"
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
          >
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden">

              {/* Header */}
              <div className="relative bg-[#00274d] px-8 pt-8 pb-10">
                <div
                  className="absolute inset-0 opacity-10"
                  style={{ backgroundImage: "radial-gradient(circle at 1px 1px,#fff 1px,transparent 0)", backgroundSize: "24px 24px" }}
                />
                <button
                  onClick={handleClose}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/70 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
                <p className="text-[#edad1a] text-xs font-bold uppercase tracking-widest mb-2 relative z-10">
                  Free Demo
                </p>
                <h2 className="text-2xl font-semibold text-white relative z-10 leading-snug">
                  Book a Demo with<br />Vendor Infra
                </h2>
                <p className="text-white/70 text-sm mt-2 relative z-10">
                  See how we transform infrastructure procurement for your sector.
                </p>
              </div>

              {/* Curve divider */}
              <div className="h-4 bg-[#00274d] relative">
                <div className="absolute bottom-0 left-0 right-0 h-4 bg-white rounded-t-3xl" />
              </div>

              {/* Body */}
              <div className="px-8 pb-8">
                <AnimatePresence mode="wait">

                  {/* Form */}
                  {step === "form" && (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleSubmit}
                      noValidate
                      className="space-y-4"
                    >
                      {/* Name */}
                      <Field icon={<User className="w-4 h-4" />} error={errors.name}>
                        <input
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          placeholder="Your full name *"
                          className="w-full bg-transparent outline-none text-sm text-gray-800 placeholder-gray-400"
                        />
                      </Field>

                      {/* Company */}
                      <Field icon={<Building2 className="w-4 h-4" />} error={errors.company}>
                        <input
                          name="company"
                          value={form.company}
                          onChange={handleChange}
                          placeholder="Company / Organisation *"
                          className="w-full bg-transparent outline-none text-sm text-gray-800 placeholder-gray-400"
                        />
                      </Field>

                      {/* Phone */}
                      <Field icon={<Phone className="w-4 h-4" />} error={errors.phone}>
                        <input
                          name="phone"
                          value={form.phone}
                          onChange={handleChange}
                          placeholder="Phone number *"
                          type="tel"
                          className="w-full bg-transparent outline-none text-sm text-gray-800 placeholder-gray-400"
                        />
                      </Field>

                      {/* Sector */}
                      <Field icon={<LayoutGrid className="w-4 h-4" />} error={errors.sectors}>
                        <div className="relative group w-full">
                          <button
                            type="button"
                            className="flex w-full items-center justify-between gap-3 bg-transparent text-left text-sm outline-none"
                          >
                            <span className={form.sectors.length ? "text-gray-800" : "text-gray-400"}>
                              {sectorLabel}
                            </span>
                            <ChevronDown className="h-4 w-4 shrink-0 text-gray-400" />
                          </button>
                          <div className="invisible opacity-0 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100 absolute left-0 right-0 top-full z-30 mt-3 max-h-64 overflow-y-auto rounded-xl border border-gray-200 bg-white p-2 shadow-2xl transition-all">
                            {SECTORS.map((s) => (
                              <label key={s} className="flex min-h-10 cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium leading-snug text-[#00274d] hover:bg-[#edad1a]/10">
                                <input
                                  type="checkbox"
                                  checked={form.sectors.includes(s)}
                                  onChange={() => toggleSector(s)}
                                  className="h-4 w-4 shrink-0 rounded border-gray-300 accent-[#edad1a]"
                                />
                                <span>{s}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                      </Field>

                      {/* Message */}
                      <div className="rounded-xl border border-gray-200 px-4 py-3 focus-within:border-[#edad1a] transition-colors">
                        <textarea
                          name="message"
                          value={form.message}
                          onChange={handleChange}
                          placeholder="Any specific requirements? (optional)"
                          rows={2}
                          className="w-full bg-transparent outline-none text-sm text-gray-800 placeholder-gray-400 resize-none"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-[#edad1a] hover:bg-[#d4941a] text-white font-bold py-4 rounded-xl transition-all hover:scale-[1.02] shadow-lg shadow-yellow-400/20 text-sm"
                      >
                        Book My Free Demo →
                      </button>

                      <p className="text-center text-xs text-gray-400">
                        No commitment. Our team will reach out within 24 hours.
                      </p>
                      {submitError && (
                        <p className="text-center text-xs text-red-500">{submitError}</p>
                      )}
                    </motion.form>
                  )}

                  {/* Submitting */}
                  {step === "submitting" && (
                    <motion.div
                      key="submitting"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col items-center justify-center py-16 gap-4"
                    >
                      <Loader2 className="w-10 h-10 text-[#edad1a] animate-spin" />
                      <p className="text-gray-500 text-sm font-medium">Booking your demo…</p>
                    </motion.div>
                  )}

                  {/* Success */}
                  {step === "success" && (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ type: "spring", stiffness: 260, damping: 22 }}
                      className="flex flex-col items-center justify-center py-12 gap-4 text-center"
                    >
                      <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center">
                        <CheckCircle2 className="w-9 h-9 text-green-500" />
                      </div>
                      <h3 className="text-xl font-semibold text-[#00274d]">Demo Booked!</h3>
                      <p className="text-gray-500 text-sm max-w-xs leading-relaxed">
                        Thanks, <span className="font-semibold text-gray-700">{form.name}</span>! Our team will contact you on{" "}
                        <span className="font-semibold text-gray-700">{form.phone}</span> within 24 hours.
                      </p>
                      <button
                        onClick={handleClose}
                        className="mt-2 bg-[#00274d] text-white font-semibold px-8 py-3 rounded-full hover:bg-[#003a6e] transition-colors text-sm"
                      >
                        Done
                      </button>
                    </motion.div>
                  )}

                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function Field({
  icon,
  error,
  children,
}: {
  icon: React.ReactNode;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className={`flex items-center gap-3 rounded-xl border px-4 py-3 focus-within:border-[#edad1a] transition-colors ${error ? "border-red-400 bg-red-50" : "border-gray-200"}`}>
        <span className={`shrink-0 ${error ? "text-red-400" : "text-gray-400"}`}>{icon}</span>
        {children}
      </div>
      {error && <p className="text-red-500 text-xs mt-1 ml-1">{error}</p>}
    </div>
  );
}
