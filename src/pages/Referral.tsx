import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { PageHero } from "@/components/layout/PageHero";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ArrowRight, CheckCircle2, Loader2, User, Mail, Phone, MapPin, MessageSquare, X } from "lucide-react";

const referralPrograms = [
  {
    code: "CRP",
    title: "Client Referral Program",
    image: "/images/wp/Mesa-de-trabajo.png",
    description:
      "Refer Vendor Infra services to Infrastructure & Construction Companies, Vendors, Consultant, Suppliers, Manufacturers etc and earn Cash with each referral from our Exclusive Client Referral Program",
  },
  {
    code: "IBC",
    title: "Independent Business Consultant",
    image: "/images/wp/2-1.png",
    description:
      "Vendor Infra is ISO 14001 certified. This ISO standard provides guidelines on what has to be done to implement an environmental management system (EMS). It includes policies, processes, plans, records, and best practices that define rules regarding how your company interacts with the environment. ISO 14001 requirements give you a framework, along with guidelines. for creating EMS for any organization",
  },
];

type Step = "form" | "submitting" | "success";

export default function Referral() {
  const [open, setOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState("");
  const [step, setStep] = useState<Step>("form");
  const [form, setForm] = useState({ name: "", email: "", phone: "", city: "", message: "" });
  const [errors, setErrors] = useState<Partial<Record<keyof typeof form, string>>>({});
  const [submitError, setSubmitError] = useState("");

  const openModal = (program: string) => {
    setSelectedProgram(program);
    setStep("form");
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => {
      setStep("form");
      setForm({ name: "", email: "", phone: "", city: "", message: "" });
      setErrors({});
      setSubmitError("");
    }, 300);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
    setErrors((p) => ({ ...p, [e.target.name]: undefined }));
  };

  const validate = () => {
    const e: Partial<Record<keyof typeof form, string>> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email";
    if (!form.phone.trim() || !/^[0-9+\-\s]{7,15}$/.test(form.phone)) e.phone = "Enter a valid phone";
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setStep("submitting");
    setSubmitError("");
    try {
      const res = await fetch("/api/referral", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, program: selectedProgram }),
      });
      if (!res.ok) throw new Error("Server error");
      setStep("success");
    } catch {
      setStep("form");
      setSubmitError("Could not send your application. Please call us or try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <PageHero eyebrow="Referral" title="Referral" />

      <section className="py-20 bg-gray-50 flex-1">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto space-y-12">
            {referralPrograms.map((program, index) => (
              <motion.article
                key={program.code}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-0 bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden"
              >
                <div className={`${index % 2 === 1 ? "lg:order-2" : ""} bg-[#08294d]`}>
                  <img
                    src={program.image}
                    alt={program.title}
                    className="w-full h-full min-h-[360px] object-cover"
                    loading="eager"
                  />
                </div>
                <div className="p-8 md:p-12 flex flex-col justify-center">
                  <div className="w-16 h-16 rounded-2xl bg-[#edad1a] text-[#071827] flex items-center justify-center font-semibold text-xl mb-8">
                    {program.code}
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold leading-tight text-[#071827] mb-6">
                    {program.title}
                  </h2>
                  <p className="text-gray-600 leading-relaxed text-base md:text-lg mb-8">
                    {program.description}
                  </p>
                  <div>
                    <button
                      onClick={() => openModal(program.title)}
                      className="group inline-flex items-center gap-2 bg-[#edad1a] hover:bg-[#d4941a] text-[#071827] font-semibold text-base px-7 py-3.5 rounded-lg shadow-[0_8px_24px_-6px_rgba(237,173,26,0.55)] transition-all hover:shadow-[0_12px_28px_-6px_rgba(237,173,26,0.7)] hover:-translate-y-0.5"
                    >
                      Join Now
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>
                </div>
              </motion.article>

            ))}
          </div>
        </div>
      </section>

      <Footer />

      {/* Themed Modal */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={handleClose}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 24 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              className="fixed inset-0 z-[61] flex items-center justify-center p-4 pointer-events-none"
            >
              <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden pointer-events-auto max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="relative bg-[#00274d] px-8 pt-8 pb-10">
                  <div
                    className="absolute inset-0 opacity-10"
                    style={{ backgroundImage: "radial-gradient(circle at 1px 1px,#fff 1px,transparent 0)", backgroundSize: "24px 24px" }}
                  />
                  <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/70 hover:text-white transition-colors z-10"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <p className="text-[#edad1a] text-xs font-bold uppercase tracking-widest mb-2 relative z-10">
                    Referral Program
                  </p>
                  <h2 className="text-2xl font-semibold text-white relative z-10 leading-snug">
                    Join {selectedProgram}
                  </h2>
                  <p className="text-white/70 text-sm mt-2 relative z-10">
                    Share your details and our team will get back within 24 hours.
                  </p>
                </div>

                {/* Curve divider */}
                <div className="h-4 bg-[#00274d] relative">
                  <div className="absolute bottom-0 left-0 right-0 h-4 bg-white rounded-t-3xl" />
                </div>

                {/* Body */}
                <div className="px-8 pb-8">
                  <AnimatePresence mode="wait">
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
                        <Field icon={<User className="w-4 h-4" />} error={errors.name}>
                          <input name="name" value={form.name} onChange={handleChange} placeholder="Your full name *" maxLength={100}
                            className="w-full bg-transparent outline-none text-sm text-gray-800 placeholder-gray-400" />
                        </Field>
                        <Field icon={<Mail className="w-4 h-4" />} error={errors.email}>
                          <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Email address *" maxLength={255}
                            className="w-full bg-transparent outline-none text-sm text-gray-800 placeholder-gray-400" />
                        </Field>
                        <Field icon={<Phone className="w-4 h-4" />} error={errors.phone}>
                          <input name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="Phone number *" maxLength={20}
                            className="w-full bg-transparent outline-none text-sm text-gray-800 placeholder-gray-400" />
                        </Field>
                        <Field icon={<MapPin className="w-4 h-4" />}>
                          <input name="city" value={form.city} onChange={handleChange} placeholder="City" maxLength={100}
                            className="w-full bg-transparent outline-none text-sm text-gray-800 placeholder-gray-400" />
                        </Field>
                        <div className="flex items-start gap-3 rounded-xl border border-gray-200 px-4 py-3 focus-within:border-[#edad1a] transition-colors">
                          <span className="shrink-0 text-gray-400 mt-0.5"><MessageSquare className="w-4 h-4" /></span>
                          <textarea name="message" value={form.message} onChange={handleChange} placeholder="Tell us about your interest (optional)" rows={3} maxLength={1000}
                            className="w-full bg-transparent outline-none text-sm text-gray-800 placeholder-gray-400 resize-none" />
                        </div>
                        <button type="submit"
                          className="w-full bg-[#edad1a] hover:bg-[#d4941a] text-white font-bold py-4 rounded-xl transition-all hover:scale-[1.02] shadow-lg shadow-yellow-400/20 text-sm">
                          Submit Application →
                        </button>
                        <p className="text-center text-xs text-gray-400">
                          By submitting, you agree to be contacted about the {selectedProgram}.
                        </p>
                        {submitError && (
                          <p className="text-center text-xs text-red-500">{submitError}</p>
                        )}
                      </motion.form>
                    )}

                    {step === "submitting" && (
                      <motion.div key="submitting" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="flex flex-col items-center justify-center py-16 gap-4">
                        <Loader2 className="w-10 h-10 text-[#edad1a] animate-spin" />
                        <p className="text-gray-500 text-sm font-medium">Submitting your application…</p>
                      </motion.div>
                    )}

                    {step === "success" && (
                      <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                        transition={{ type: "spring", stiffness: 260, damping: 22 }}
                        className="flex flex-col items-center justify-center py-12 gap-4 text-center">
                        <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center">
                          <CheckCircle2 className="w-9 h-9 text-green-500" />
                        </div>
                        <h3 className="text-xl font-semibold text-[#00274d]">Application Received!</h3>
                        <p className="text-gray-500 text-sm max-w-xs leading-relaxed">
                          Thanks, <span className="font-semibold text-gray-700">{form.name}</span>! Our team will contact you on{" "}
                          <span className="font-semibold text-gray-700">{form.phone}</span> within 24 hours.
                        </p>
                        <button onClick={handleClose}
                          className="mt-2 bg-[#00274d] text-white font-semibold px-8 py-3 rounded-full hover:bg-[#003a6e] transition-colors text-sm">
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
    </div>
  );
}

function Field({ icon, error, children }: { icon: React.ReactNode; error?: string; children: React.ReactNode }) {
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
