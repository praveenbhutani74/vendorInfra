import { usePageSeo } from "@/lib/seo";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Phone, Mail, MapPin, Facebook, Twitter, Linkedin, Instagram, Send } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { siteButtonClasses } from "@/components/SiteButton";

export default function Contact() {
  usePageSeo("Contact Us | Vendor Infra", "Get in touch with the Vendor Infra team. Book a demo, ask about pricing, or send us any enquiry.");
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const form = e.target as HTMLFormElement;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      company: (form.elements.namedItem("company") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        toast({ title: "Message sent!", description: "Thank you for reaching out." });
        form.reset();
      } else {
        toast({ title: "Something went wrong", description: "Please try again or call us directly.", variant: "destructive" });
      }
    } catch {
      toast({ title: "Network error", description: "Please check your connection and try again.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero */}
        <section data-preserve-hero-typography className="relative bg-[#00274d] text-white py-24 overflow-hidden">
          <div className="absolute inset-0 opacity-[0.08] bg-[radial-gradient(circle_at_1px_1px,#ffffff_1px,transparent_0)] bg-[size:40px_40px]" />
          <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#edad1a]/40 bg-[#edad1a]/10 px-4 py-2 text-sm font-semibold text-[#edad1a] mb-6">
              Contact Us
            </div>
            <h1 className="text-4xl md:text-5xl font-semibold leading-tight tracking-tight mb-6">
              Let's connect and build something great together
            </h1>
          </div>
        </section>

        <section className="py-24 bg-[#f6f8fb]">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">

              <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-8 items-stretch">
                <div className="rounded-2xl bg-[#00274d] text-white p-7 md:p-8 relative overflow-hidden">
                  <div className="absolute inset-0 opacity-[0.08] bg-[radial-gradient(circle_at_1px_1px,#ffffff_1px,transparent_0)] bg-[size:24px_24px]" />
                  <div className="relative">
                    <span className="inline-flex items-center gap-2 text-[#edad1a] text-[12px] font-bold uppercase tracking-[0.3em] mb-5">
                      <span className="w-6 h-px bg-[#edad1a]/60" />
                      Get in touch
                      <span className="w-6 h-px bg-[#edad1a]/60" />
                    </span>
                    <h3 className="text-2xl md:text-3xl font-bold leading-tight mb-2">
                      We are here to help you move faster.
                    </h3>
                    <p className="text-white/70 mb-8">
                      Let's connect and collaborate — the Vendor Infra team is just a message away.
                    </p>

                    <div className="space-y-4">
                      <a href="tel:+918800119885" className="flex items-start gap-4 rounded-xl border border-white/10 bg-white/6 p-4 hover:bg-white/10 transition-colors">
                        <Phone className="w-5 h-5 text-[#edad1a] mt-1 shrink-0" />
                        <span>
                          <span className="block font-semibold">Call Center (SaaS)</span>
                          <span className="block text-white/70 text-sm">8800119885</span>
                        </span>
                      </a>
                      <a href="tel:+918800404840" className="flex items-start gap-4 rounded-xl border border-white/10 bg-white/6 p-4 hover:bg-white/10 transition-colors">
                        <Phone className="w-5 h-5 text-[#edad1a] mt-1 shrink-0" />
                        <span>
                          <span className="block font-semibold">Call Center (Supply Chain)</span>
                          <span className="block text-white/70 text-sm">8800404840</span>
                        </span>
                      </a>
                      <a href="mailto:enquiry@vendorinfra.com" className="flex items-start gap-4 rounded-xl border border-white/10 bg-white/6 p-4 hover:bg-white/10 transition-colors">
                        <Mail className="w-5 h-5 text-[#edad1a] mt-1 shrink-0" />
                        <span>
                          <span className="block font-semibold">Email</span>
                          <span className="block text-white/70 text-sm">enquiry@vendorinfra.com</span>
                        </span>
                      </a>
                      <div className="flex items-start gap-4 rounded-xl border border-white/10 bg-white/6 p-4">
                        <MapPin className="w-5 h-5 text-[#edad1a] mt-1 shrink-0" />
                        <span>
                          <span className="block font-semibold">Head Office</span>
                          <span className="block text-white/70 text-sm leading-relaxed">
                            Suit No. 1436-1440, Plus Offices,<br />
                            Landmark Cyber Park,<br />
                            Sector 67, Gurugram,<br />
                            Haryana, India - 122101
                          </span>
                        </span>
                      </div>
                    </div>


                    <div className="mt-8 pt-6 border-t border-white/10">
                      <p className="text-[#edad1a] text-[12px] font-bold uppercase tracking-[0.3em] mb-4">Follow Us</p>
                      <div className="flex gap-3">
                        <a href="https://www.facebook.com/VENDORINFRA/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-white hover:bg-[#1877F2] transition-colors"><Facebook className="w-4 h-4" /></a>
                        <a href="https://x.com/vendorinfra" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-white hover:bg-black transition-colors"><Twitter className="w-4 h-4" /></a>
                        <a href="https://www.linkedin.com/company/vendor-infra/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-white hover:bg-[#0077B5] transition-colors"><Linkedin className="w-4 h-4" /></a>
                        <a href="https://www.instagram.com/vendorinfra/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-white hover:bg-[#E1306C] transition-colors"><Instagram className="w-4 h-4" /></a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7 md:p-8">
                  <div className="mb-7">
                    <span className="inline-flex items-center gap-2 text-[#edad1a] text-[12px] font-bold uppercase tracking-[0.3em] mb-4">
                      <span className="w-6 h-px bg-[#edad1a]/60" />
                      Send an Enquiry
                      <span className="w-6 h-px bg-[#edad1a]/60" />
                    </span>
                    <h3 className="text-2xl font-bold text-[#00274d] leading-tight">
                      Tell us your requirements, and our team will get back to you shortly.
                    </h3>
                  </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid sm:grid-cols-2 gap-5">
                        <div className="space-y-1.5">
                          <Label htmlFor="name" className="text-[#00274d] font-semibold text-sm">Your Name <span className="text-red-500">*</span></Label>
                          <Input id="name" name="name" required placeholder="Your Name" className="bg-gray-50 border-gray-200 placeholder:text-[12.5px] placeholder:text-gray-400 placeholder:font-normal focus:border-[#edad1a] focus:ring-[#edad1a]/20" />
                        </div>
                        <div className="space-y-1.5">
                          <Label htmlFor="company" className="text-[#00274d] font-semibold text-sm">Company Name</Label>
                          <Input id="company" name="company" placeholder="Company Name" className="bg-gray-50 border-gray-200 placeholder:text-[12.5px] placeholder:text-gray-400 placeholder:font-normal focus:border-[#edad1a] focus:ring-[#edad1a]/20" />
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-5">
                        <div className="space-y-1.5">
                          <Label htmlFor="email" className="text-[#00274d] font-semibold text-sm">Your Email <span className="text-red-500">*</span></Label>
                          <Input id="email" name="email" type="email" required placeholder="Your Email" className="bg-gray-50 border-gray-200 placeholder:text-[12.5px] placeholder:text-gray-400 placeholder:font-normal focus:border-[#edad1a] focus:ring-[#edad1a]/20" />
                        </div>
                        <div className="space-y-1.5">
                          <Label htmlFor="phone" className="text-[#00274d] font-semibold text-sm">Contact Number <span className="text-red-500">*</span></Label>
                          <Input id="phone" name="phone" type="tel" required placeholder="Contact Number" className="bg-gray-50 border-gray-200 placeholder:text-[12.5px] placeholder:text-gray-400 placeholder:font-normal focus:border-[#edad1a] focus:ring-[#edad1a]/20" />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <Label htmlFor="message" className="text-[#00274d] font-semibold text-sm">Write your query here</Label>
                        <Textarea
                          id="message"
                          name="message"
                          placeholder="Write your query here"
                          rows={5}
                          className="bg-gray-50 border-gray-200 resize-none placeholder:text-[12.5px] placeholder:text-gray-400 placeholder:font-normal focus:border-[#edad1a] focus:ring-[#edad1a]/20"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className={siteButtonClasses("primary", "w-full py-4 rounded-xl normal-case tracking-normal disabled:cursor-not-allowed disabled:opacity-60")}
                      >
                        {isSubmitting ? (
                          <>
                            <span className="animate-spin rounded-full h-4 w-4 border-2 border-[#00274d]/30 border-t-[#00274d]" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            Submit
                          </>
                        )}
                      </button>

                    </form>
                </div>
              </div>

              <div className="mt-8 relative rounded-2xl p-[2px] shadow-xl shadow-[#00274d]/15" style={{ background: "linear-gradient(135deg, #00274d 0%, #0a3b73 40%, #edad1a 100%)" }}>
                <div className="bg-white rounded-[14px] overflow-hidden">
                  <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between gap-3 bg-gradient-to-r from-[#00274d] to-[#0a3b73] text-white">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#edad1a] flex items-center justify-center shadow-md">
                        <MapPin className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-bold">Visit Our Office</p>
                        <p className="text-xs text-white/70">Landmark Cyber Park, Sector 67, Gurugram</p>
                      </div>
                    </div>
                    <a href="https://maps.google.com/?q=Landmark+Cyber+Park+Sector+67+Gurugram" target="_blank" rel="noopener noreferrer" className={siteButtonClasses("primary", "hidden sm:inline-flex px-3 py-2 text-xs normal-case tracking-normal")}>
                      Get Directions
                    </a>
                  </div>
                  <div className="relative">
                    <iframe
                      title="Vendor Infra Office Location"
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3509.6!2d77.0927!3d28.4185!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d23439c000001%3A0x4000000000000000!2sLandmark+Cyber+Park%2C+Sector+67%2C+Gurugram%2C+Haryana+122102!5e0!3m2!1sen!2sin!4v1700000000000"
                      width="100%"
                      height="380"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="eager"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                    <div className="pointer-events-none absolute top-4 left-4 bg-white rounded-xl shadow-lg border border-gray-100 p-3 flex items-center gap-2.5 max-w-[260px]">
                      <div className="w-9 h-9 rounded-lg bg-[#00274d] flex items-center justify-center shrink-0">
                        <MapPin className="w-4 h-4 text-[#edad1a]" />
                      </div>
                      <div>
                        <p className="text-[11px] font-bold text-[#00274d] leading-tight">Vendor Infra HQ</p>
                        <p className="text-[10px] text-gray-500 leading-snug">Suit 1436-1440, Plus Offices</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}