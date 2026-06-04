import { useState, type ImgHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

interface MaterialImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  label: string;
}

export function MaterialImage({
  src,
  alt,
  label,
  className,
  onError,
  ...props
}: MaterialImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed || !src) {
    return (
      <div
        className={cn(
          "flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 px-3 text-center text-sm font-semibold text-[#00274d]",
          className,
        )}
        aria-label={alt || label}
        role="img"
      >
        <span className="line-clamp-2">{label}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt || label}
      className={className}
      loading="eager"
      onError={(event) => {
        setFailed(true);
        onError?.(event);
      }}
      {...props}
    />
  );
}
