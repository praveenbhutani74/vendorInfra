import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { X } from "lucide-react";

const WHATSAPP_NUMBER = "918800119885";

const QUICK_REPLIES = [
  {
    label: "Book a Free Demo",
    message: "Hi! I'd like to book a free demo of the Vendor Infra platform. Please let me know the available slots.",
  },
  {
    label: "Vendor Discovery",
    message: "Hi! I'm looking to discover verified vendors for my infrastructure project. Can you help me get started on Vendor Infra?",
  },
  {
    label: "Material Procurement",
    message: "Hi! I need help with material procurement for a construction/infrastructure project. Can you tell me how Vendor Infra can assist?",
  },
  {
    label: "Plants & Equipment",
    message: "Hi! I'm interested in buying, selling, or hiring plants & equipment through Vendor Infra. Please share more details.",
  },
  {
    label: "Pricing & Plans",
    message: "Hi! I'd like to know more about Vendor Infra's pricing plans and which one suits my business best.",
  },
];

const DEFAULT_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Hi! I'd like to know more about Vendor Infra's services."
)}`;

function waUrl(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  );
}

export function WhatsAppButton() {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 1500);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <div className="fixed bottom-6 right-4 sm:right-6 z-50 flex flex-col items-end gap-3">
          {/* Popup card */}
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, y: 12, scale: 0.92 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 12, scale: 0.92 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden w-72"
              >
                {/* Card header */}
                <div className="bg-[#075e54] px-4 py-3 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 bg-[#25D366] rounded-full flex items-center justify-center shrink-0">
                      <WhatsAppIcon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-white font-bold text-sm leading-none">Vendor Infra</p>
                      <p className="text-white/70 text-xs mt-0.5 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-[#25D366] rounded-full inline-block animate-pulse" />
                        Typically replies instantly
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setOpen(false)}
                    className="text-white/60 hover:text-white transition-colors p-1"
                    aria-label="Close"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Chat bubble */}
                <div className="bg-[#e5ddd5] px-4 pt-4 pb-3">
                  <div className="bg-white rounded-2xl rounded-tl-none px-3 py-2.5 shadow-sm max-w-[92%]">
                    <p className="text-gray-800 text-sm leading-relaxed">
                      Hi, welcome to Vendor Infra. How can we assist you today?
                    </p>
                    <p className="text-[10px] text-gray-400 text-right mt-1">Now</p>
                  </div>

                  {/* Quick-reply chips */}
                  <div className="mt-3 flex flex-col gap-2">
                    {QUICK_REPLIES.map((qr) => (
                      <a
                        key={qr.label}
                        href={waUrl(qr.message)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="self-end bg-white hover:bg-[#25D366] hover:text-white text-[#075e54] border border-[#25D366]/40 hover:border-[#25D366] font-semibold text-xs px-3.5 py-2 rounded-full shadow-sm transition-all duration-150 text-right leading-snug"
                      >
                        {qr.label} →
                      </a>
                    ))}
                  </div>
                </div>

                {/* Generic CTA */}
                <a
                  href={DEFAULT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20b85a] text-white font-bold py-3 text-sm transition-colors"
                >
                  <WhatsAppIcon className="w-4 h-4" />
                  Open Chat
                </a>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main floating button */}
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.93 }}
            onClick={() => setOpen(v => !v)}
            aria-label="Chat on WhatsApp"
            className="relative w-14 h-14 bg-[#25D366] rounded-full shadow-[0_4px_24px_rgba(37,211,102,0.5)] flex items-center justify-center cursor-pointer"
          >
            <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-25" />
            <WhatsAppIcon className="w-7 h-7 text-white relative z-10" />
          </motion.button>
        </div>
      )}
    </AnimatePresence>
  );
}
