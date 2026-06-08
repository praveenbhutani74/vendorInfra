import { ButtonHTMLAttributes, ReactNode } from "react";
import { CtaArrow } from "@/components/CtaArrow";
import { cn } from "@/lib/utils";

type SiteButtonVariant = "primary" | "onGold" | "navy";

const buttonVariants: Record<SiteButtonVariant, string> = {
  primary:
    "bg-[#edad1a] text-[#00274d] hover:bg-[#f7c44a] shadow-[0_10px_28px_-10px_rgba(237,173,26,0.75)] hover:shadow-[0_14px_36px_-10px_rgba(237,173,26,0.85)]",
  onGold:
    "bg-[#00274d] text-[#edad1a] hover:bg-[#003a73] shadow-[0_10px_28px_-12px_rgba(0,39,77,0.75)] hover:shadow-[0_14px_36px_-12px_rgba(0,39,77,0.85)]",
  navy:
    "bg-[#00274d] text-[#edad1a] hover:bg-[#003a73] shadow-[0_10px_28px_-12px_rgba(0,39,77,0.55)] hover:shadow-[0_14px_36px_-12px_rgba(0,39,77,0.75)]",
};

export function siteButtonClasses(variant: SiteButtonVariant = "primary", className?: string) {
  return cn(
    "group inline-flex items-center justify-center gap-3 rounded-lg px-6 py-3 text-sm font-bold tracking-wide uppercase transition-all duration-300 hover:-translate-y-0.5",
    buttonVariants[variant],
    className,
  );
}

export function SiteButton({
  children,
  variant = "primary",
  className,
  arrow = true,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: SiteButtonVariant;
  arrow?: boolean;
}) {
  return (
    <button className={siteButtonClasses(variant, className)} {...props}>
      {children}
      {arrow && <CtaArrow variant={variant === "primary" ? "dark" : "gold"} />}
    </button>
  );
}
