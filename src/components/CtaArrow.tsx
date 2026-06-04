import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "dark" | "light" | "blue";

/**
 * Circular arrow badge used inside CTA buttons.
 * - `dark`  → navy circle, white arrow (use on yellow / light buttons)
 * - `light` → white circle, navy arrow (use on navy / dark buttons)
 */
export function CtaArrow({
  variant = "dark",
  className,
}: {
  variant?: Variant;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-full w-6 h-6 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5",
        variant === "dark"
          ? "bg-white text-[#00274d]"
          : variant === "light"
            ? "bg-white text-[#00274d]"
            : "bg-[#00274d] text-white",
        className,
      )}
    >
      <ArrowRight className="w-3.5 h-3.5" />
    </span>
  );
}

export default CtaArrow;