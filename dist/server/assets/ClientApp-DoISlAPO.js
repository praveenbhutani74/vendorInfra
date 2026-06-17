import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import * as React from "react";
import { useState, createContext, useContext, useRef, useEffect, useMemo } from "react";
import { useLocation, Link, useParams, Router as Router$1, Switch, Route } from "wouter";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import * as ToastPrimitives from "@radix-ui/react-toast";
import { cva } from "class-variance-authority";
import { X, AlertCircle, ArrowRight, ChevronDown, ShoppingCart, Menu, Facebook, Twitter, Linkedin, Instagram, User, Phone, Mail, Building2, MessageSquare, Loader2, CheckCircle2, Sparkles, Search, Calculator, Tractor, Package, Factory, ShieldCheck, Briefcase, BarChart3, ArrowUpRight, Star, ChevronLeft, ChevronRight, Target, Shield, Layers, Zap, BarChart, Globe, Play, FileSearch, Gauge, Layers3, BadgeCheck, ClipboardCheck, GitBranch, Truck, PackageCheck, LineChart, Globe2, MapPin, Send, Calendar, Tag, ArrowLeft, TrendingUp, Check, Brain, Database, Clock, Leaf, Lock, Network, LockKeyhole, Users, BriefcaseBusiness, HelpCircle, BadgeIndianRupee, MapPinned, PackageSearch, ShoppingBag, Minus, Plus, RotateCcw, CheckCircle, Trash2, CalendarCheck, ArrowUp } from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { motion, AnimatePresence, useInView } from "framer-motion";
import * as LabelPrimitive from "@radix-ui/react-label";
const TOAST_LIMIT = 1;
const TOAST_REMOVE_DELAY = 1e6;
let count = 0;
function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER;
  return count.toString();
}
const toastTimeouts = /* @__PURE__ */ new Map();
const addToRemoveQueue = (toastId) => {
  if (toastTimeouts.has(toastId)) {
    return;
  }
  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId);
    dispatch({
      type: "REMOVE_TOAST",
      toastId
    });
  }, TOAST_REMOVE_DELAY);
  toastTimeouts.set(toastId, timeout);
};
const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TOAST":
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT)
      };
    case "UPDATE_TOAST":
      return {
        ...state,
        toasts: state.toasts.map(
          (t) => t.id === action.toast.id ? { ...t, ...action.toast } : t
        )
      };
    case "DISMISS_TOAST": {
      const { toastId } = action;
      if (toastId) {
        addToRemoveQueue(toastId);
      } else {
        state.toasts.forEach((toast2) => {
          addToRemoveQueue(toast2.id);
        });
      }
      return {
        ...state,
        toasts: state.toasts.map(
          (t) => t.id === toastId || toastId === void 0 ? {
            ...t,
            open: false
          } : t
        )
      };
    }
    case "REMOVE_TOAST":
      if (action.toastId === void 0) {
        return {
          ...state,
          toasts: []
        };
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId)
      };
  }
};
const listeners = [];
let memoryState = { toasts: [] };
function dispatch(action) {
  memoryState = reducer(memoryState, action);
  listeners.forEach((listener) => {
    listener(memoryState);
  });
}
function toast({ ...props }) {
  const id = genId();
  const update = (props2) => dispatch({
    type: "UPDATE_TOAST",
    toast: { ...props2, id }
  });
  const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id });
  dispatch({
    type: "ADD_TOAST",
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: (open) => {
        if (!open) dismiss();
      }
    }
  });
  return {
    id,
    dismiss,
    update
  };
}
function useToast() {
  const [state, setState] = React.useState(memoryState);
  React.useEffect(() => {
    listeners.push(setState);
    return () => {
      const index = listeners.indexOf(setState);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }, [state]);
  return {
    ...state,
    toast,
    dismiss: (toastId) => dispatch({ type: "DISMISS_TOAST", toastId })
  };
}
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const ToastProvider = ToastPrimitives.Provider;
const ToastViewport = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  ToastPrimitives.Viewport,
  {
    ref,
    className: cn(
      "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
      className
    ),
    ...props
  }
));
ToastViewport.displayName = ToastPrimitives.Viewport.displayName;
const toastVariants = cva(
  "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",
  {
    variants: {
      variant: {
        default: "border bg-background text-foreground",
        destructive: "destructive group border-destructive bg-destructive text-destructive-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
const Toast = React.forwardRef(({ className, variant, ...props }, ref) => {
  return /* @__PURE__ */ jsx(
    ToastPrimitives.Root,
    {
      ref,
      className: cn(toastVariants({ variant }), className),
      ...props
    }
  );
});
Toast.displayName = ToastPrimitives.Root.displayName;
const ToastAction = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  ToastPrimitives.Action,
  {
    ref,
    className: cn(
      "inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive",
      className
    ),
    ...props
  }
));
ToastAction.displayName = ToastPrimitives.Action.displayName;
const ToastClose = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  ToastPrimitives.Close,
  {
    ref,
    className: cn(
      "absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600",
      className
    ),
    "toast-close": "",
    ...props,
    children: /* @__PURE__ */ jsx(X, { className: "h-4 w-4" })
  }
));
ToastClose.displayName = ToastPrimitives.Close.displayName;
const ToastTitle = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  ToastPrimitives.Title,
  {
    ref,
    className: cn("text-sm font-semibold", className),
    ...props
  }
));
ToastTitle.displayName = ToastPrimitives.Title.displayName;
const ToastDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  ToastPrimitives.Description,
  {
    ref,
    className: cn("text-sm opacity-90", className),
    ...props
  }
));
ToastDescription.displayName = ToastPrimitives.Description.displayName;
function Toaster() {
  const { toasts } = useToast();
  return /* @__PURE__ */ jsxs(ToastProvider, { children: [
    toasts.map(function({ id, title, description, action, ...props }) {
      return /* @__PURE__ */ jsxs(Toast, { ...props, children: [
        /* @__PURE__ */ jsxs("div", { className: "grid gap-1", children: [
          title && /* @__PURE__ */ jsx(ToastTitle, { children: title }),
          description && /* @__PURE__ */ jsx(ToastDescription, { children: description })
        ] }),
        action,
        /* @__PURE__ */ jsx(ToastClose, {})
      ] }, id);
    }),
    /* @__PURE__ */ jsx(ToastViewport, {})
  ] });
}
const TooltipProvider = TooltipPrimitive.Provider;
const TooltipContent = React.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsx(TooltipPrimitive.Portal, { children: /* @__PURE__ */ jsx(
  TooltipPrimitive.Content,
  {
    ref,
    sideOffset,
    className: cn(
      "z-50 overflow-hidden rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-tooltip-content-transform-origin]",
      className
    ),
    ...props
  }
) }));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;
const CartContext = createContext(null);
function QuoteCartProvider({ children }) {
  const [items, setItems] = useState([]);
  const addItem = (item2) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.productSlug === item2.productSlug && i.variant === item2.variant);
      if (existing) {
        return prev.map(
          (i) => i.productSlug === item2.productSlug && i.variant === item2.variant ? { ...i, qty: i.qty + (item2.qty ?? 1) } : i
        );
      }
      return [...prev, { ...item2, qty: item2.qty ?? 1 }];
    });
  };
  const removeItem = (productSlug, variant) => {
    setItems((prev) => prev.filter((i) => !(i.productSlug === productSlug && i.variant === variant)));
  };
  const updateQty = (productSlug, variant, qty) => {
    if (qty <= 0) {
      removeItem(productSlug, variant);
      return;
    }
    setItems((prev) => prev.map(
      (i) => i.productSlug === productSlug && i.variant === variant ? { ...i, qty } : i
    ));
  };
  const clearCart = () => setItems([]);
  return /* @__PURE__ */ jsx(CartContext.Provider, { value: { items, addItem, removeItem, updateQty, total: items.length, clearCart }, children });
}
function useQuoteCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useQuoteCart must be inside QuoteCartProvider");
  return ctx;
}
const Card = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "div",
  {
    ref,
    className: cn(
      "rounded-xl border bg-card text-card-foreground shadow",
      className
    ),
    ...props
  }
));
Card.displayName = "Card";
const CardHeader = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "div",
  {
    ref,
    className: cn("flex flex-col space-y-1.5 p-6", className),
    ...props
  }
));
CardHeader.displayName = "CardHeader";
const CardTitle = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "div",
  {
    ref,
    className: cn("font-semibold leading-none tracking-tight", className),
    ...props
  }
));
CardTitle.displayName = "CardTitle";
const CardDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "div",
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
CardDescription.displayName = "CardDescription";
const CardContent = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", { ref, className: cn("p-6 pt-0", className), ...props }));
CardContent.displayName = "CardContent";
const CardFooter = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "div",
  {
    ref,
    className: cn("flex items-center p-6 pt-0", className),
    ...props
  }
));
CardFooter.displayName = "CardFooter";
function NotFound() {
  return /* @__PURE__ */ jsx("div", { className: "min-h-screen w-full flex items-center justify-center bg-gray-50", children: /* @__PURE__ */ jsx(Card, { className: "w-full max-w-md mx-4", children: /* @__PURE__ */ jsxs(CardContent, { className: "pt-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex mb-4 gap-2", children: [
      /* @__PURE__ */ jsx(AlertCircle, { className: "h-8 w-8 text-red-500" }),
      /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold text-gray-900", children: "404 Page Not Found" })
    ] }),
    /* @__PURE__ */ jsx("p", { className: "mt-4 text-sm text-gray-600", children: "Did you forget to add the page to the router?" })
  ] }) }) });
}
function CtaArrow({
  variant = "dark",
  className
}) {
  return /* @__PURE__ */ jsx(
    "span",
    {
      className: cn(
        "inline-flex items-center justify-center rounded-full w-6 h-6 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5",
        variant === "dark" ? "bg-[#00274d] text-white" : variant === "light" ? "bg-white text-[#00274d]" : variant === "gold" ? "bg-[#edad1a] text-[#00274d]" : "bg-[#00274d] text-white",
        className
      ),
      children: /* @__PURE__ */ jsx(ArrowRight, { className: "w-3.5 h-3.5" })
    }
  );
}
const buttonVariants = {
  primary: "bg-[#edad1a] text-[#00274d] hover:bg-[#f7c44a] shadow-[0_10px_28px_-10px_rgba(237,173,26,0.75)] hover:shadow-[0_14px_36px_-10px_rgba(237,173,26,0.85)]",
  onGold: "bg-[#00274d] text-[#edad1a] hover:bg-[#003a73] shadow-[0_10px_28px_-12px_rgba(0,39,77,0.75)] hover:shadow-[0_14px_36px_-12px_rgba(0,39,77,0.85)]",
  navy: "bg-[#00274d] text-[#edad1a] hover:bg-[#003a73] shadow-[0_10px_28px_-12px_rgba(0,39,77,0.55)] hover:shadow-[0_14px_36px_-12px_rgba(0,39,77,0.75)]"
};
function siteButtonClasses(variant = "primary", className) {
  return cn(
    "group inline-flex items-center justify-center gap-2.5 rounded-xl px-7 py-3.5 text-[15px] font-semibold leading-none transition-all duration-300 hover:-translate-y-0.5",
    buttonVariants[variant],
    className
  );
}
function SiteButton({
  children,
  variant = "primary",
  className,
  arrow = true,
  ...props
}) {
  return /* @__PURE__ */ jsxs("button", { className: siteButtonClasses(variant, className), ...props, children: [
    children,
    arrow && /* @__PURE__ */ jsx(CtaArrow, { variant: variant === "primary" ? "dark" : "gold" })
  ] });
}
const logoUrl = `${"/"}brand/Logo-Blue-1.png`;
const MORE_LINKS = [
  { href: "/pricing", label: "Pricing" },
  { href: "/blog", label: "Blog" },
  { href: "/why-us", label: "Why Us" },
  { href: "/faq", label: "FAQ" },
  { href: "/referral", label: "Referral Programme" }
];
function Navbar() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const moreRef = useRef(null);
  const { total } = useQuoteCart();
  const links = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/services", label: "Services" },
    { href: "/sectors", label: "Sectors" },
    { href: "/materials", label: "Materials" },
    { href: "/contact", label: "Contact Us" }
  ];
  const isActive = (href) => href === "/" ? location === "/" : location.startsWith(href);
  const isMoreActive = MORE_LINKS.some((l) => location.startsWith(l.href));
  useEffect(() => {
    function handle(e) {
      if (moreRef.current && !moreRef.current.contains(e.target)) {
        setMoreOpen(false);
      }
    }
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, []);
  useEffect(() => {
    setMoreOpen(false);
    setIsOpen(false);
  }, [location]);
  return /* @__PURE__ */ jsxs("header", { className: "sticky top-0 z-50 w-full border-b border-slate-200/70 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/85", children: [
    /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 flex items-center justify-between", style: { height: 78 }, children: [
      /* @__PURE__ */ jsx(Link, { href: "/", className: "flex items-center gap-2 shrink-0", children: /* @__PURE__ */ jsx("img", { src: logoUrl, alt: "Vendor Infra", className: "h-[38px] w-auto" }) }),
      /* @__PURE__ */ jsxs("nav", { className: "hidden md:flex items-center gap-6 text-[15px] font-medium", children: [
        links.map((link) => /* @__PURE__ */ jsxs(
          Link,
          {
            href: link.href,
            className: `relative py-1 transition-colors hover:text-[#00274d] ${isActive(link.href) ? "text-[#00274d]" : "text-slate-600"}`,
            children: [
              link.label,
              isActive(link.href) && /* @__PURE__ */ jsx("span", { className: "absolute -bottom-1 left-0 right-0 h-0.5 bg-[#edad1a] rounded-full" })
            ]
          },
          link.href
        )),
        /* @__PURE__ */ jsxs("div", { ref: moreRef, className: "relative", children: [
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => setMoreOpen((v) => !v),
              className: `flex items-center gap-1 py-1 transition-colors hover:text-[#00274d] ${isMoreActive ? "text-[#00274d]" : "text-slate-600"}`,
              children: [
                "More",
                /* @__PURE__ */ jsx(motion.span, { animate: { rotate: moreOpen ? 180 : 0 }, transition: { duration: 0.2 }, children: /* @__PURE__ */ jsx(ChevronDown, { className: "w-3.5 h-3.5" }) })
              ]
            }
          ),
          /* @__PURE__ */ jsx(AnimatePresence, { children: moreOpen && /* @__PURE__ */ jsx(
            motion.div,
            {
              initial: { opacity: 0, y: 8, scale: 0.97 },
              animate: { opacity: 1, y: 0, scale: 1 },
              exit: { opacity: 0, y: 8, scale: 0.97 },
              transition: { duration: 0.18, ease: [0.22, 1, 0.36, 1] },
              className: "absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden py-1 z-50",
              children: MORE_LINKS.map((l) => /* @__PURE__ */ jsx(
                Link,
                {
                  href: l.href,
                  className: `block px-4 py-2.5 text-[15px] transition-colors hover:bg-[#edad1a]/8 hover:text-[#edad1a] ${location.startsWith(l.href) ? "text-[#edad1a] font-semibold bg-[#edad1a]/5" : "text-gray-600"}`,
                  children: l.label
                },
                l.href
              ))
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxs(Link, { href: "/quote-cart", className: "relative p-2 text-slate-500 hover:text-[#00274d] transition-colors", children: [
          /* @__PURE__ */ jsx(ShoppingCart, { className: "w-5 h-5" }),
          total > 0 && /* @__PURE__ */ jsx("span", { className: "absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#edad1a] text-white text-[10px] font-black rounded-full flex items-center justify-center leading-none", children: total > 9 ? "9+" : total })
        ] }),
        /* @__PURE__ */ jsx(
          "a",
          {
            href: "http://3.110.208.157/customer/",
            target: "_blank",
            rel: "noopener noreferrer",
            className: siteButtonClasses(
              "primary",
              "rounded-full px-7 py-3 normal-case tracking-normal"
            ),
            children: "Register"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "md:hidden flex items-center gap-3", children: [
        /* @__PURE__ */ jsxs(Link, { href: "/quote-cart", className: "relative p-2 text-gray-500", children: [
          /* @__PURE__ */ jsx(ShoppingCart, { className: "w-5 h-5" }),
          total > 0 && /* @__PURE__ */ jsx("span", { className: "absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#edad1a] text-white text-[10px] font-black rounded-full flex items-center justify-center", children: total > 9 ? "9+" : total })
        ] }),
        /* @__PURE__ */ jsx("button", { className: "p-2 text-gray-600", onClick: () => setIsOpen(!isOpen), "aria-label": "Toggle menu", children: /* @__PURE__ */ jsx(AnimatePresence, { mode: "wait", initial: false, children: isOpen ? /* @__PURE__ */ jsx(motion.span, { initial: { rotate: -90, opacity: 0 }, animate: { rotate: 0, opacity: 1 }, exit: { rotate: 90, opacity: 0 }, transition: { duration: 0.15 }, children: /* @__PURE__ */ jsx(X, { className: "h-6 w-6" }) }, "close") : /* @__PURE__ */ jsx(motion.span, { initial: { rotate: 90, opacity: 0 }, animate: { rotate: 0, opacity: 1 }, exit: { rotate: -90, opacity: 0 }, transition: { duration: 0.15 }, children: /* @__PURE__ */ jsx(Menu, { className: "h-6 w-6" }) }, "open") }) })
      ] })
    ] }),
    /* @__PURE__ */ jsx(AnimatePresence, { initial: false, children: isOpen && /* @__PURE__ */ jsx(
      motion.div,
      {
        initial: { opacity: 0, height: 0 },
        animate: { opacity: 1, height: "auto" },
        exit: { opacity: 0, height: 0 },
        transition: { duration: 0.25, ease: [0.4, 0, 0.2, 1] },
        className: "md:hidden border-t border-gray-100 bg-white overflow-hidden",
        children: /* @__PURE__ */ jsxs("div", { className: "px-4 py-4 space-y-1", children: [
          links.map((link) => /* @__PURE__ */ jsx(
            Link,
            {
              href: link.href,
              onClick: () => setIsOpen(false),
              className: `block px-3 py-2.5 rounded-lg text-[15px] font-medium transition-colors ${isActive(link.href) ? "text-[#edad1a] bg-[#edad1a]/5 font-semibold" : "text-gray-600 hover:text-[#edad1a] hover:bg-gray-50"}`,
              children: link.label
            },
            link.href
          )),
          /* @__PURE__ */ jsx("div", { className: "border-t border-gray-100 pt-2 mt-2", children: MORE_LINKS.map((link) => /* @__PURE__ */ jsx(
            Link,
            {
              href: link.href,
              onClick: () => setIsOpen(false),
              className: `block px-3 py-2.5 rounded-lg text-[15px] font-medium transition-colors ${location.startsWith(link.href) ? "text-[#edad1a] bg-[#edad1a]/5 font-semibold" : "text-gray-500 hover:text-[#edad1a] hover:bg-gray-50"}`,
              children: link.label
            },
            link.href
          )) }),
          /* @__PURE__ */ jsx("div", { className: "pt-2", children: /* @__PURE__ */ jsx(
            "a",
            {
              href: "https://customer.vendorinfra.com/#/login-2",
              target: "_blank",
              rel: "noopener noreferrer",
              className: "inline-flex items-center justify-center rounded-full px-7 py-3 font-medium bg-[#edad1a] text-[#00274d] hover:bg-[#d89b18] transition-colors",
              children: "Register"
            }
          ) })
        ] })
      },
      "mobile-menu"
    ) })
  ] });
}
function Footer() {
  return /* @__PURE__ */ jsxs("footer", { className: "bg-[#00274d] text-white", children: [
    /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row md:justify-between gap-10", children: [
      /* @__PURE__ */ jsxs("div", { className: "shrink-0 max-w-[280px] space-y-4", children: [
        /* @__PURE__ */ jsx(
          "img",
          {
            src: `${"/"}brand/White.png`,
            alt: "Vendor Infra",
            className: "h-[48px] w-auto -ml-4"
          }
        ),
        /* @__PURE__ */ jsxs("h3", { className: "text-white text-lg md:text-xl font-bold leading-snug", children: [
          "AI - Powered Operating System for",
          " ",
          /* @__PURE__ */ jsx("span", { className: "text-[#edad1a] underline decoration-[#edad1a] decoration-2 underline-offset-4", children: "Infrastructure," }),
          " Construction & Manufacturing Industry"
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-white/70 text-sm mt-3", children: "Unleashing the potential through Ecosystem." }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-3 mt-6", children: [
          /* @__PURE__ */ jsx("a", { href: "https://www.facebook.com/VENDORINFRA/", target: "_blank", rel: "noopener noreferrer", className: "bg-white/10 p-2.5 rounded-lg hover:bg-[#edad1a] transition-colors", children: /* @__PURE__ */ jsx(Facebook, { className: "w-4 h-4" }) }),
          /* @__PURE__ */ jsx("a", { href: "https://x.com/vendorinfra", target: "_blank", rel: "noopener noreferrer", className: "bg-white/10 p-2.5 rounded-lg hover:bg-[#edad1a] transition-colors", children: /* @__PURE__ */ jsx(Twitter, { className: "w-4 h-4" }) }),
          /* @__PURE__ */ jsx("a", { href: "https://www.linkedin.com/company/vendor-infra/", target: "_blank", rel: "noopener noreferrer", className: "bg-white/10 p-2.5 rounded-lg hover:bg-[#edad1a] transition-colors", children: /* @__PURE__ */ jsx(Linkedin, { className: "w-4 h-4" }) }),
          /* @__PURE__ */ jsx("a", { href: "https://www.instagram.com/vendorinfra/", target: "_blank", rel: "noopener noreferrer", className: "bg-white/10 p-2.5 rounded-lg hover:bg-[#edad1a] transition-colors", children: /* @__PURE__ */ jsx(Instagram, { className: "w-4 h-4" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "shrink-0", children: [
        /* @__PURE__ */ jsx("h3", { className: "font-semibold text-base mb-5", children: "Pages" }),
        /* @__PURE__ */ jsx("ul", { className: "space-y-3 text-sm", children: [
          { href: "/", label: "Home" },
          { href: "/about", label: "About Us" },
          { href: "/services", label: "Services" },
          { href: "/sectors", label: "Sectors" },
          { href: "/materials", label: "Materials" },
          { href: "/why-us", label: "Why Us" },
          { href: "/pricing", label: "Pricing Plans" },
          { href: "/blog", label: "Blog" }
        ].map(({ href, label }) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { href, className: "text-white/75 hover:text-[#edad1a] transition-colors", children: label }) }, href)) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "shrink-0", children: [
        /* @__PURE__ */ jsx("h3", { className: "font-semibold text-base mb-5", children: "Quick Links" }),
        /* @__PURE__ */ jsx("ul", { className: "space-y-3 text-sm", children: [
          { href: "/referral", label: "Referral" },
          { href: "/iso", label: "ISO Certification" },
          { href: "/faq", label: "FAQ" },
          { href: "/privacy-policy", label: "Privacy Policy" },
          { href: "/terms", label: "Terms of Service" },
          { href: "/pricing-policy", label: "Pricing Policy" },
          { href: "/security", label: "Security" },
          { href: "/contact", label: "Contact Us" }
        ].map(({ href, label }) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { href, className: "text-white/75 hover:text-[#edad1a] transition-colors", children: label }) }, href)) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "shrink-0 max-w-[240px]", children: [
        /* @__PURE__ */ jsx("h3", { className: "font-semibold text-base mb-5", children: "Contact Info" }),
        /* @__PURE__ */ jsxs("ul", { className: "space-y-3 text-white/75 text-sm", children: [
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx("span", { className: "text-white font-medium block mb-0.5", children: "SaaS Support" }),
            /* @__PURE__ */ jsx("a", { href: "tel:+918800119885", className: "hover:text-[#edad1a] transition-colors", children: "+91-8800119885" })
          ] }),
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx("span", { className: "text-white font-medium block mb-0.5", children: "Supply Chain" }),
            /* @__PURE__ */ jsx("a", { href: "tel:+918800404840", className: "hover:text-[#edad1a] transition-colors", children: "+91-8800404840" })
          ] }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "mailto:enquiry@vendorinfra.com", className: "hover:text-[#edad1a] transition-colors", children: "enquiry@vendorinfra.com" }) }),
          /* @__PURE__ */ jsx("li", { className: "leading-relaxed", children: "Suit No. 1436-1440, Plus Offices, Landmark Cyber Park, Sector 67, Gurugram, Haryana, India – 122101" })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "border-t border-white/10", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 py-5 flex flex-col sm:flex-row items-center justify-between gap-2", children: [
      /* @__PURE__ */ jsx("p", { className: "text-white/40 text-xs", children: "© Vendor Infra 2026. All rights reserved." }),
      /* @__PURE__ */ jsx("p", { className: "text-white/30 text-xs", children: "Meet. Collaborate. Construct" })
    ] }) })
  ] });
}
function ContactSalesModal({ open, onClose, planName }) {
  const [step, setStep] = useState("form");
  const [form, setForm] = useState({ name: "", contact: "", email: "", company: "", message: "" });
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");
  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.contact.trim() || !/^[0-9+\-\s]{7,15}$/.test(form.contact))
      e.contact = "Enter a valid contact number";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Enter a valid email";
    return e;
  };
  const handleChange = (e) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
    setErrors((p) => ({ ...p, [e.target.name]: void 0 }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setStep("submitting");
    setSubmitError("");
    try {
      const res = await fetch(`${"/"}api/contact-sales`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, plan: planName })
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
    setTimeout(() => {
      setStep("form");
      setForm({ name: "", contact: "", email: "", company: "", message: "" });
      setErrors({});
      setSubmitError("");
    }, 400);
  };
  return /* @__PURE__ */ jsx(AnimatePresence, { children: open && /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      motion.div,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0.2 },
        onClick: handleClose,
        className: "fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
      }
    ),
    /* @__PURE__ */ jsx(
      motion.div,
      {
        initial: { opacity: 0, scale: 0.94, y: 24 },
        animate: { opacity: 1, scale: 1, y: 0 },
        exit: { opacity: 0, scale: 0.94, y: 24 },
        transition: { type: "spring", stiffness: 300, damping: 28 },
        className: "fixed inset-0 z-[61] flex items-center justify-center p-4",
        onClick: (e) => e.stopPropagation(),
        children: /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden", children: [
          /* @__PURE__ */ jsxs("div", { className: "relative bg-[#00274d] px-8 pt-8 pb-10", children: [
            /* @__PURE__ */ jsx(
              "div",
              {
                className: "absolute inset-0 opacity-10",
                style: { backgroundImage: "radial-gradient(circle at 1px 1px,#fff 1px,transparent 0)", backgroundSize: "24px 24px" }
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: handleClose,
                className: "absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/70 hover:text-white transition-colors",
                children: /* @__PURE__ */ jsx(X, { className: "w-4 h-4" })
              }
            ),
            /* @__PURE__ */ jsx("p", { className: "text-[#edad1a] text-xs font-bold uppercase tracking-widest mb-2 relative z-10", children: planName ? `${planName} Plan` : "Talk to Sales" }),
            /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold text-white relative z-10 leading-snug", children: "Get in touch with us" }),
            /* @__PURE__ */ jsx("p", { className: "text-white/70 text-sm mt-2 relative z-10", children: "Share your details and our team will reach out with a tailored quote." })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "h-4 bg-[#00274d] relative", children: /* @__PURE__ */ jsx("div", { className: "absolute bottom-0 left-0 right-0 h-4 bg-white rounded-t-3xl" }) }),
          /* @__PURE__ */ jsx("div", { className: "px-8 pb-8", children: /* @__PURE__ */ jsxs(AnimatePresence, { mode: "wait", children: [
            step === "form" && /* @__PURE__ */ jsxs(
              motion.form,
              {
                initial: { opacity: 0 },
                animate: { opacity: 1 },
                exit: { opacity: 0 },
                onSubmit: handleSubmit,
                noValidate: true,
                className: "space-y-4",
                children: [
                  /* @__PURE__ */ jsx(Field$1, { icon: /* @__PURE__ */ jsx(User, { className: "w-4 h-4" }), error: errors.name, children: /* @__PURE__ */ jsx(
                    "input",
                    {
                      name: "name",
                      value: form.name,
                      onChange: handleChange,
                      placeholder: "Your full name *",
                      className: "w-full bg-transparent outline-none text-sm text-gray-800 placeholder-gray-400"
                    }
                  ) }),
                  /* @__PURE__ */ jsx(Field$1, { icon: /* @__PURE__ */ jsx(Phone, { className: "w-4 h-4" }), error: errors.contact, children: /* @__PURE__ */ jsx(
                    "input",
                    {
                      name: "contact",
                      value: form.contact,
                      onChange: handleChange,
                      placeholder: "Contact number *",
                      type: "tel",
                      className: "w-full bg-transparent outline-none text-sm text-gray-800 placeholder-gray-400"
                    }
                  ) }),
                  /* @__PURE__ */ jsx(Field$1, { icon: /* @__PURE__ */ jsx(Mail, { className: "w-4 h-4" }), error: errors.email, children: /* @__PURE__ */ jsx(
                    "input",
                    {
                      name: "email",
                      value: form.email,
                      onChange: handleChange,
                      placeholder: "Email address *",
                      type: "email",
                      className: "w-full bg-transparent outline-none text-sm text-gray-800 placeholder-gray-400"
                    }
                  ) }),
                  /* @__PURE__ */ jsx(Field$1, { icon: /* @__PURE__ */ jsx(Building2, { className: "w-4 h-4" }), children: /* @__PURE__ */ jsx(
                    "input",
                    {
                      name: "company",
                      value: form.company,
                      onChange: handleChange,
                      placeholder: "Company name",
                      className: "w-full bg-transparent outline-none text-sm text-gray-800 placeholder-gray-400"
                    }
                  ) }),
                  /* @__PURE__ */ jsx("div", { className: "rounded-xl border border-gray-200 px-4 py-3 focus-within:border-[#edad1a] transition-colors", children: /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
                    /* @__PURE__ */ jsx(MessageSquare, { className: "w-4 h-4 text-gray-400 mt-1 shrink-0" }),
                    /* @__PURE__ */ jsx(
                      "textarea",
                      {
                        name: "message",
                        value: form.message,
                        onChange: handleChange,
                        placeholder: "Message (optional)",
                        rows: 3,
                        className: "w-full bg-transparent outline-none text-sm text-gray-800 placeholder-gray-400 resize-none"
                      }
                    )
                  ] }) }),
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      type: "submit",
                      className: "w-full bg-[#edad1a] hover:bg-[#d4941a] text-white font-bold py-4 rounded-xl transition-all hover:scale-[1.02] shadow-lg shadow-yellow-400/20 text-sm",
                      children: "Submit →"
                    }
                  ),
                  /* @__PURE__ */ jsx("p", { className: "text-center text-xs text-gray-400", children: "We'll get back to you soon." }),
                  submitError && /* @__PURE__ */ jsx("p", { className: "text-center text-xs text-red-500", children: submitError })
                ]
              },
              "form"
            ),
            step === "submitting" && /* @__PURE__ */ jsxs(
              motion.div,
              {
                initial: { opacity: 0 },
                animate: { opacity: 1 },
                exit: { opacity: 0 },
                className: "flex flex-col items-center justify-center py-16 gap-4",
                children: [
                  /* @__PURE__ */ jsx(Loader2, { className: "w-10 h-10 text-[#edad1a] animate-spin" }),
                  /* @__PURE__ */ jsx("p", { className: "text-gray-500 text-sm font-medium", children: "Sending your request…" })
                ]
              },
              "submitting"
            ),
            step === "success" && /* @__PURE__ */ jsxs(
              motion.div,
              {
                initial: { opacity: 0, scale: 0.9 },
                animate: { opacity: 1, scale: 1 },
                exit: { opacity: 0 },
                transition: { type: "spring", stiffness: 260, damping: 22 },
                className: "flex flex-col items-center justify-center py-12 gap-4 text-center",
                children: [
                  /* @__PURE__ */ jsx("div", { className: "w-16 h-16 bg-green-50 rounded-full flex items-center justify-center", children: /* @__PURE__ */ jsx(CheckCircle2, { className: "w-9 h-9 text-green-500" }) }),
                  /* @__PURE__ */ jsx("h3", { className: "text-xl font-semibold text-[#00274d]", children: "Request Sent!" }),
                  /* @__PURE__ */ jsxs("p", { className: "text-gray-500 text-sm max-w-xs leading-relaxed", children: [
                    "Thanks, ",
                    /* @__PURE__ */ jsx("span", { className: "font-semibold text-gray-700", children: form.name }),
                    "! Our team will contact you on",
                    " ",
                    /* @__PURE__ */ jsx("span", { className: "font-semibold text-gray-700", children: form.contact }),
                    " soon."
                  ] }),
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      onClick: handleClose,
                      className: "mt-2 bg-[#00274d] text-white font-semibold px-8 py-3 rounded-full hover:bg-[#003a6e] transition-colors text-sm",
                      children: "Done"
                    }
                  )
                ]
              },
              "success"
            )
          ] }) })
        ] })
      }
    )
  ] }) });
}
function Field$1({ icon, error, children }) {
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs("div", { className: `flex items-center gap-3 rounded-xl border px-4 py-3 focus-within:border-[#edad1a] transition-colors ${error ? "border-red-400 bg-red-50" : "border-gray-200"}`, children: [
      /* @__PURE__ */ jsx("span", { className: `shrink-0 ${error ? "text-red-400" : "text-gray-400"}`, children: icon }),
      children
    ] }),
    error && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-xs mt-1 ml-1", children: error })
  ] });
}
const categories = [
  {
    slug: "steel",
    name: "Steel",
    image: "/materials/Cat-Steel.jpg",
    products: [
      {
        slug: "pipes",
        name: "Pipes",
        image: "/materials/Steel-pipes.jpg",
        variants: [
          "Anti-Siphonage Pipe",
          "Cast Iron Pipes",
          "Copper Pipes",
          "DI fitting",
          "DI pipe",
          "Drain Pipes or Waste Disposal Pipes",
          "Drainage Pipes",
          "Galvanized Iron Pipes",
          "GI flat",
          "GI pipe",
          "GI Rectangular tube",
          "GI square tube",
          "MS flat",
          "MS pipe",
          "MS Rectangular tube",
          "MS square tube",
          "Polythene Pipes",
          "PVC Pipes",
          "Rainwater Pipe",
          "Seamless pipe",
          "Soil Pipe",
          "Stoneware Pipes",
          "Vent Pipe"
        ],
        units: ["MT", "Mtrs"],
        description: ""
      },
      {
        slug: "structural-steel",
        name: "Structural Steel",
        image: "/materials/Structural-steel.jpg",
        variants: [
          "Angles",
          "Beams",
          "Billet",
          "Channels",
          "Coils",
          "Column",
          "Flats",
          "Hexagonal Bars",
          "Rectangular Bar",
          "Rounds Bar",
          "Sheet / Plates",
          "Square Bar",
          "Strips",
          "Wire Rods"
        ],
        units: ["KG", "MT"],
        description: ""
      },
      {
        slug: "tmt",
        name: "TMT",
        image: "/materials/TMT-Bars.jpg",
        variants: [
          "Binding Wire",
          "CRS",
          "Epoxy Coated",
          "TMT Bar",
          "TMT Coil",
          "Without Ribs"
        ],
        units: ["KG", "MT"],
        description: ""
      },
      {
        slug: "plates-coils",
        name: "Plates & Coils",
        image: "/materials/Plates-Coils.png",
        variants: [
          "MS Plates",
          "HR Plates",
          "HR Coils",
          "CR Sheets",
          "GI Sheets",
          "GP Coils",
          "Galvalume Coils",
          "Stainless Steel Plates",
          "Color Coated Coils",
          "Roofing Sheets",
          "Chequered Plates",
          "High Tensile Plates",
          "Wear Resistant Plates",
          "Boiler Quality Plates",
          "Pressure Vessel Plates",
          "Structural Steel Plates",
          "Alloy Steel Plates",
          "Electrical Steel Coils",
          "Shipbuilding Plates"
        ],
        units: ["KG", "MT"],
        description: ""
      }
    ]
  },
  {
    slug: "cement",
    name: "Cement",
    image: "/materials/Cat-cement.jpg",
    products: [
      {
        slug: "bag",
        name: "Bag",
        image: "/materials/Cement-bag.jpg",
        variants: [
          "Coloured Cement",
          "Hydrophobic Portland Cement",
          "Ordinary Portland Cement 33 Grade",
          "Ordinary Portland Cement 43 Grade",
          "Ordinary Portland Cement 53 Grade",
          "Portland Pozzolana Cement (PPC)",
          "Portland Slag Cement (PSC)"
        ],
        units: ["MT", "No. of Bags"],
        description: ""
      },
      {
        slug: "block-jointing-mortar",
        name: "Block Jointing Mortar",
        image: "/materials/Block-Jointing-Mortar.jpg",
        variants: [
          "Type K Mortar Mix",
          "Type M Mortar Mix",
          "Type N Mortar Mix",
          "Type O Mortar Mix",
          "Type S Mortar Mix"
        ],
        units: ["Qtl"],
        description: ""
      },
      {
        slug: "bricks",
        name: "Bricks",
        image: "/materials/Bricks.jpg",
        variants: [
          "Burnt Clay Bricks",
          "Calcium Silicate Bricks",
          "Concrete Bricks",
          "Engineering Bricks",
          "Fly Ash Bricks",
          "Porotherm Smart Bricks Or Eco Bricks.",
          "Sun-Dried Bricks"
        ],
        units: ["Nos."],
        description: ""
      },
      {
        slug: "concrete-blocks",
        name: "Concrete Blocks",
        image: "/materials/Concrete-blocks.jpeg",
        variants: [
          "Bullnose Concrete Blocks",
          "Concrete Pillar Blocks",
          "Concrete Stretcher Blocks",
          "Expanded Clay Aggregate Solid Construction Blocks",
          "Hollow Concrete Blocks",
          "Jamb Concrete Blocks",
          "Lintel Blocks",
          "Partition Concrete Blocks",
          "Paving Blocks"
        ],
        units: ["CuM", "Nos."],
        description: ""
      },
      {
        slug: "concrete-ready-mix-concrete",
        name: "Concrete/ Ready Mix Concrete",
        image: "/materials/Concrete-_-Ready-Mix-Concrete-bag.jpg",
        variants: [
          "Air-Entrained Concrete",
          "High-Density Concrete",
          "Lightweight Concrete",
          "Normal Strength Concrete",
          "Plain or Ordinary Concrete",
          "Polymer Concrete",
          "Precast Concrete",
          "Prestressed Concrete",
          "Ready Mix Concrete",
          "Reinforced Concrete"
        ],
        units: ["CuM", "Nos."],
        description: ""
      },
      {
        slug: "fiber-reinforced-concrete",
        name: "Fiber Reinforced Concrete",
        image: "/materials/Fiber-Reinforced-Concrete.jpg",
        variants: [
          "Asbestos Fibers",
          "Carbon Fibers",
          "GFRC Glass Fiber Reinforced Concrete",
          "Organic Fibers",
          "Polypropylene Fiber Reinforced (PFR) cement mortar & concrete",
          "Steel Fiber Reinforced Concrete"
        ],
        units: ["KG", "M3"],
        description: ""
      },
      {
        slug: "ready-mix-plaster",
        name: "Ready Mix Plaster",
        image: "/materials/ready-mix-plaster-.jpg",
        variants: [
          "Cement Plaster",
          "Clay plaster",
          "Gypsum Plaster",
          "Heat-Resistant Plaster",
          "Lime Plaster",
          "POP"
        ],
        units: ["MT", "Nos."],
        description: ""
      }
    ]
  },
  {
    slug: "sand-aggregate-fly-ash",
    name: "Sand Aggregate Fly Ash",
    image: "/materials/Cat-Sand-Aggregate.jpg",
    products: [
      {
        slug: "fly-ash",
        name: "Fly Ash",
        image: "/materials/fly-ash.jpg",
        variants: ["Fly Ash"],
        units: ["MT"],
        description: ""
      },
      {
        slug: "sand",
        name: "Sand",
        image: "/materials/Sand.jpg",
        variants: [
          "Coarse Sand",
          "Concrete Sand",
          "Fill Sand",
          "Fine Sand",
          "M-Sand",
          "Pit Sand",
          "River Sand",
          "Utility Sand"
        ],
        units: ["Cu. Ft.", "CuM"],
        description: ""
      },
      {
        slug: "sand-aggregate",
        name: "Sand Aggregate",
        image: "/materials/send-aggregate.jpg",
        variants: ["Aggregate 10 mm", "Aggregate 20 mm", "Aggregate 40 mm"],
        units: ["CuM", "MT"],
        description: ""
      }
    ]
  },
  {
    slug: "chemical",
    name: "Chemical",
    image: "/materials/Cat-Chemicals.jpg",
    products: [
      {
        slug: "cleaning-chemicals",
        name: "Cleaning Chemicals",
        image: "/materials/cleaning-chemicals-1.jpg",
        variants: [
          "Acids",
          "Alkalies",
          "Bleaches",
          "Detergents",
          "Sanitizers",
          "Spirit Solvents"
        ],
        units: ["KG", "Ltr."],
        description: ""
      },
      {
        slug: "construction-chemicals",
        name: "Construction Chemicals",
        image: "/materials/Chemicals.jpg",
        variants: [
          "Adhesives",
          "Admixture High PC Based",
          "Admixture Low PC Based",
          "Admixture Mid PC Based",
          "Admixture Naptha Based",
          "Concrete Admixtures",
          "Concrete Curing Compound",
          "Epoxy Grouts",
          "Polymer Bonding Agents",
          "Protective and Decorative Agents",
          "Sealants and Caulks",
          "Water Repellents"
        ],
        units: ["KG", "Ltr."],
        description: ""
      },
      {
        slug: "micro-silica",
        name: "Micro Silica",
        image: "/materials/micro-silica.jpg",
        variants: [
          "Condensed Microsilica",
          "Powdered Microsilica",
          "Slurry Microsilica"
        ],
        units: ["KG", "MT"],
        description: ""
      },
      {
        slug: "waterproofing-chemicals",
        name: "Waterproofing Chemicals",
        image: "/materials/waterproofing-chemicals-.jpg",
        variants: [
          "Bituminous Membrane",
          "Cementitious Coating",
          "EPDM Rubber",
          "Polyurethane",
          "PVC Waterproofing Membrane",
          "Rubberized Asphalt",
          "Thermoplastic"
        ],
        units: ["KG", "Ltr."],
        description: ""
      }
    ]
  },
  {
    slug: "civil-and-infrastructure",
    name: "Civil and Infrastructure",
    image: "/materials/Cat-Civil-and-Infrastructure.jpg",
    products: [
      {
        slug: "flooring",
        name: "Flooring",
        image: "/materials/Flooring.jpg",
        variants: [
          "Bamboo",
          "Brick",
          "Concrete",
          "Granite",
          "Hardwood",
          "Laminate",
          "Linoleum",
          "Marble",
          "Red Oxide",
          "Terrazzo",
          "Vinyl",
          "Vitrified Tile"
        ],
        units: ["Sq.Ft.", "Sqm"],
        description: ""
      },
      {
        slug: "foundations",
        name: "Foundations",
        image: "/materials/Foundation.jpg",
        variants: [
          "Combined footing",
          "Deep Foundation",
          "Drilled Shafts or caissons",
          "Individual footing or isolated footing",
          "Pile foundation",
          "Raft or mat foundation",
          "Shallow foundation",
          "Strip foundation"
        ],
        units: ["Sq.Ft.", "Sqm"],
        description: ""
      },
      {
        slug: "gardening-landscaping",
        name: "Gardening & Landscaping",
        image: "/materials/Gardening-tools.jpg",
        variants: [
          "Cutting & Pruning Tools",
          "Garden Tool Set",
          "Garden Utilities",
          "Gardening Products",
          "Mowers & Trimmers",
          "Sprayers"
        ],
        units: ["Sq.Ft.", "Sqm"],
        description: ""
      },
      {
        slug: "hvac",
        name: "HVAC",
        image: "/materials/HVAC.jpg",
        variants: [
          "Duct free (Mini-split)",
          "Heating and cooling split systems",
          "Hybrid split system",
          "Packaged heating and air conditioning system"
        ],
        units: ["package", "Sq.Ft."],
        description: ""
      },
      {
        slug: "masonry",
        name: "Masonry",
        image: "/materials/masonry.jpg",
        variants: [
          "Bagged Concrete Masonry",
          "Block Masonry",
          "Brick Masonry",
          "Composite Masonry",
          "Gabion Masonry",
          "Reinforced Masonry",
          "Stone Masonry",
          "Veneer Masonry"
        ],
        units: ["Sq.Ft.", "Sqm"],
        description: ""
      },
      {
        slug: "pre-engineered-buildings",
        name: "Pre-Engineered Buildings",
        image: "/materials/Pre-engineereed-building.jpg",
        variants: [
          "Clear Span with Top running Crane",
          "Flat Roof",
          "Lean-to",
          "Mezzanine Floor",
          "Mono slope clear span",
          "Muti-Gable",
          "Roof System"
        ],
        units: ["Nos.", "Sq.Ft."],
        description: ""
      },
      {
        slug: "roof",
        name: "Roof",
        image: "/materials/Roof.jpg",
        variants: [
          "Clipped Gable Roof",
          "Dutch Gable Roof",
          "Flat Roof (Low Slope Roof)",
          "Gable Roof",
          "Gambrel Roof",
          "Hip Roof",
          "Mansard Roof",
          "Shed Roof"
        ],
        units: ["Sq.Ft.", "Sqm"],
        description: ""
      },
      {
        slug: "scaffolding-formwork",
        name: "Scaffolding / Formwork",
        image: "/materials/Scaffolding.jpg",
        variants: [
          "Cantilever scaffolding",
          "Double scaffolding",
          "Kwikstage scaffolding",
          "Patented scaffolding",
          "Purlin",
          "shuttering ply",
          "Single scaffolding",
          "Steel scaffolding",
          "Suspended scaffolding",
          "Trestle scaffolding",
          "Tube and clip scaffolding",
          "Walkway Jali",
          "Wooden and bamboo scaffolding",
          "Wooden runner"
        ],
        units: ["KG", "Nos."],
        description: ""
      },
      {
        slug: "sheets",
        name: "Sheets",
        image: "/materials/Sheets.jpg",
        variants: ["GI sheets", "MS sheets", "Perforated"],
        units: ["KG", "Nos."],
        description: ""
      },
      {
        slug: "textiles",
        name: "Textiles",
        image: "/materials/Textile-1.jpg",
        variants: [
          "Architectural Membranes",
          "Awnings and canopies",
          "Hoardings / Signages",
          "Scaffolding Nets",
          "Tarpaulins"
        ],
        units: ["Nos.", "Sq.Ft."],
        description: ""
      },
      {
        slug: "thermal-insulation",
        name: "Thermal Insulation",
        image: "/materials/Thermal-insulation.jpg",
        variants: [
          "Blanket: Batt and Roll Insulation",
          "Concrete Block Insulation",
          "Foam Board or Rigid Foam",
          "Insulating Concrete Forms",
          "Loose-Fill and Blown-In Insulation",
          "Radiant Barriers and Reflective Insulation Systems",
          "Rigid Fiber Board Insulation",
          "Sprayed-Foam and Foamed-In-Place Insulation"
        ],
        units: ["Sq.Ft.", "Sqm"],
        description: ""
      },
      {
        slug: "wall-cladding",
        name: "Wall Cladding",
        image: "/materials/wall-cladding-.jpg",
        variants: [
          "Aluminum cladding",
          "Brick cladding",
          "Ceramic cladding",
          "External foam cladding",
          "Fiber Cement Cladding",
          "Glass cladding",
          "Natural stone cladding",
          "Stainless Steel cladding",
          "Vinyl cladding",
          "Weatherboard cladding",
          "Wood cladding"
        ],
        units: ["Sq.Ft.", "Sqm"],
        description: ""
      },
      {
        slug: "waterproofing",
        name: "Waterproofing",
        image: "/materials/Waterproofing.jpg",
        variants: [
          "Bituminous Coating Waterproofing",
          "Bituminous Membrane Waterproofing",
          "Cementitious Waterproofing",
          "Liquid Waterproofing Membrane",
          "membrane waterproofing",
          "Polyurethane Liquid Membrane Waterproofing"
        ],
        units: ["Sq.Ft.", "Sqm"],
        description: ""
      }
    ]
  },
  {
    slug: "petroleum",
    name: "Petroleum",
    image: "/materials/Cat-Petroleum.jpg",
    products: [
      {
        slug: "bitumen",
        name: "Bitumen",
        image: "/materials/Bitumen.jpg",
        variants: [
          "Bitumen Emulsion",
          "Cut Back Bitumen",
          "Oxidized Bitumen Grades",
          "Penetration Grade Bitumen",
          "Polymer Modified Bitumen"
        ],
        units: ["KG", "Ltr."],
        description: ""
      },
      {
        slug: "coal",
        name: "Coal",
        image: "/materials/Coal.jpg",
        variants: ["Anthracite", "Bituminous", "Lignite", "Subbituminous"],
        units: ["MT", "Nos."],
        description: ""
      },
      {
        slug: "emulsion",
        name: "Emulsion",
        image: "/materials/Emulsion.jpg",
        variants: [
          "MIcroemulsions",
          "Multiple Emulsion",
          "Oil in Water Emulsion",
          "Water in Oil Emulsion"
        ],
        units: ["KG", "Ltr."],
        description: ""
      },
      {
        slug: "lubricant",
        name: "Lubricant",
        image: "/materials/lubricant-oil.jpg",
        variants: ["Dry Lubricants", "Penetrating Lubricants"],
        units: ["KG", "Ltr."],
        description: ""
      },
      {
        slug: "oil",
        name: "Oil",
        image: "/materials/Oil.jpg",
        variants: [
          "Engine oil",
          "Gear oil",
          "Grease",
          "Mineral Oils",
          "Natural Oils",
          "Synthetic Oils",
          "Transformer oil"
        ],
        units: ["MT", "Nos."],
        description: ""
      }
    ]
  },
  {
    slug: "interior-architecture",
    name: "Interior & Architecture",
    image: "/materials/Cat-Interior-Architecture.jpg",
    products: [
      {
        slug: "architecture",
        name: "Architecture",
        image: "/materials/Architecture.jpg",
        variants: [
          "Commercial Architect",
          "Conservation Architect",
          "Industrial Architect",
          "Interior Architect",
          "Landscape Architect",
          "Residential Architect",
          "Sustainable / Green Design Architect",
          "Urban Designer"
        ],
        units: ["Sq.Ft.", "Sqm"],
        description: ""
      },
      {
        slug: "door",
        name: "Door",
        image: "/materials/Door.jpg",
        variants: [
          "Aluminium Doors",
          "Battened & Ledged Doors",
          "Fiber Reinforced Plastic Doors",
          "Fiberglass Doors",
          "Flush Doors",
          "Framed & Paneled Doors",
          "Glass Doors",
          "PVC Doors",
          "Steel Doors",
          "Timber Wood"
        ],
        units: ["Nos.", "Sq.Ft."],
        description: ""
      },
      {
        slug: "facades",
        name: "Facades",
        image: "/materials/facades.jpg",
        variants: [
          "Aluminum Composite facade",
          "Clay facade",
          "Curtain Walling facade",
          "Double-skin facade",
          "Glazing facade",
          "Homeostatic facade",
          "Insulated wall facade",
          "Panel frame facade",
          "Precast Concrete facade",
          "Self-cleaning facade",
          "Solar shading facade",
          "Steel and glass facade",
          "Steel facade"
        ],
        units: ["Sq.Ft.", "Sqm"],
        description: ""
      },
      {
        slug: "gates",
        name: "Gates",
        image: "/materials/Gates.jpg",
        variants: [
          "Automatic Gate",
          "Retractable Security Gate",
          "Sliding Gate",
          "Swing Gate",
          "Turnstile Gate",
          "Vertical Pivot Gate"
        ],
        units: ["Nos.", "Sq.Ft."],
        description: ""
      },
      {
        slug: "glass",
        name: "Glass",
        image: "/materials/Glass.jpg",
        variants: [
          "Chromatic Glass",
          "Extra Clean Glass",
          "Float Glass",
          "Glass Blocks",
          "Glass Wool",
          "Insulated Glazed Units",
          "Laminated Glass",
          "Shatterproof Glass",
          "Tinted Glass",
          "Toughened Glass"
        ],
        units: ["Nos.", "Sq.Ft."],
        description: ""
      },
      {
        slug: "hardware-and-bathroom-accessories",
        name: "Hardware and Bathroom Accessories",
        image: "/materials/hardware-and-washroom-accessories.jpg",
        variants: [
          "Bathroom Fixtures",
          "Cabinet Hardware",
          "Door Hardware",
          "Faucets",
          "Locks",
          "Paints and Coatings",
          "Sanitary Ware",
          "Showers",
          "Sinks"
        ],
        units: ["Nos.", "Piece"],
        description: ""
      },
      {
        slug: "interior",
        name: "Interior",
        image: "/materials/Interior.jpg",
        variants: [
          "Art Moderne Interior Design",
          "Contemporary Interior Design",
          "Eclectic Interior Design",
          "Farmhouse Interior Design",
          "Industrial Interior Design",
          "Mid-Century Interior Design",
          "Minimalist Interior Design",
          "Modern Interior Design",
          "Scandinavian Interior Design",
          "Shabby Chic Interior Design Style"
        ],
        units: ["Sq.Ft.", "Sqm"],
        description: ""
      },
      {
        slug: "plastics",
        name: "Plastics",
        image: "/materials/Plastics.jpg",
        variants: [
          "Acrylic",
          "Composites",
          "Polycarbonate",
          "Polypropylene",
          "Polyvinyl Chloride"
        ],
        units: ["KG", "Sq.Ft."],
        description: ""
      },
      {
        slug: "stone",
        name: "Stone",
        image: "/materials/Stone.jpg",
        variants: [
          "Basalt",
          "Gneiss",
          "Granite",
          "Laterite",
          "Limestone",
          "Marble",
          "Quartzite",
          "Sandstone",
          "Slate",
          "Travertine"
        ],
        units: ["Nos.", "Sq.Ft."],
        description: ""
      },
      {
        slug: "window",
        name: "Window",
        image: "/materials/window.jpg",
        variants: [
          "Arched Windows",
          "Awning Windows",
          "Bay Windows",
          "Bow Windows",
          "Casement Windows",
          "Double Hung Windows",
          "Egress Windows",
          "Garden Windows",
          "Glass Block Windows",
          "Hopper Windows",
          "Jalousie Windows",
          "Other Window",
          "Picture Windows",
          "Round Circle Windows",
          "Single Hung Windows"
        ],
        units: ["Nos.", "Sq.Ft."],
        description: ""
      }
    ]
  },
  {
    slug: "solar",
    name: "Solar",
    image: "/materials/Cat-Solar.jpg",
    products: [
      {
        slug: "solar-cell",
        name: "Solar Cell",
        image: "/materials/solar-cell.jpeg",
        variants: [
          "Amorphous Silicon solar cell",
          "Biohybrid solar cell",
          "Cadmium telluride solar cell",
          "Concentrated PV cell",
          "Copper indium gallium selenide solar cells",
          "Crystalline silicon solar cell",
          "Dye-sensitized solar cell",
          "Float-zone silicon",
          "Gallium arsenide germanium solar cell",
          "Hybrid solar cell",
          "Luminescent solar concentrator",
          "Micromorph",
          "Monocrystalline solar cell",
          "Multi-junction solar cell",
          "Other Cell"
        ],
        units: ["Nos.", "W"],
        description: ""
      },
      {
        slug: "solar-module",
        name: "Solar Module",
        image: "/materials/solar-module.jpg",
        variants: [
          "Mono-crystalline Solar Modules",
          "Polycrystalline Solar Modules",
          "Thin-film Solar Modules"
        ],
        units: ["Qtl"],
        description: ""
      },
      {
        slug: "solar-panel",
        name: "Solar Panel",
        image: "/materials/solar-pannel.jpg",
        variants: [
          "ACDB & DCDB for solar plant",
          "Earthing material",
          "Lightning arrestor",
          "Monocrystalline solar panels",
          "Passivated Emitter and Rear Cell (PERC) panels",
          "Polycrystalline solar panels",
          "Solar modules Mono crystline",
          "Solar modules Polycrystline",
          "Solar On grid inverters",
          "Solar Structure made from GI",
          "Thin-film solar panels"
        ],
        units: ["Nos.", "W"],
        description: ""
      }
    ]
  },
  {
    slug: "electronic-and-electrical-accessories",
    name: "Electrical Accessories",
    image: "/materials/Cat-Electrical-Accessories.jpg",
    products: [
      {
        slug: "appliances-and-utilities",
        name: "Appliances and Utilities",
        image: "/materials/Appliances-and-Utilities.jpg",
        variants: [
          "Air Conditioner",
          "Chimneys",
          "Fans",
          "Grinders & Juice Extractors",
          "Home Invertor & UPS",
          "Kitchen Appliances",
          "Refrigerators",
          "Room Heaters",
          "Washing Machines"
        ],
        units: ["Nos.", "Set"],
        description: ""
      },
      {
        slug: "cables-wire",
        name: "Cables & Wire",
        image: "/materials/Cables-_-Wire.jpg",
        variants: [
          "CCTV Cables",
          "Coaxial Cables",
          "Communication & Networking Cables",
          "High Tension Cables",
          "Industrial Wires & Cables",
          "Low Tension Cables",
          "Mounting & Cable Accessories",
          "Solar Cables",
          "Submersible Cables",
          "Telephone Cables"
        ],
        units: ["Mtr.", "Nos."],
        description: ""
      },
      {
        slug: "circuit-breakers-fuses",
        name: "Circuit Breakers & Fuses",
        image: "/materials/Circuit-Breakers-_-Fuses.jpg",
        variants: [
          "Air Circuit Breaker",
          "Fuses & Fuse Holders",
          "Isolators",
          "MCB",
          "MCCB",
          "Motor Circuit Breakers",
          "MPCB",
          "RCBO",
          "RCCB & ELCB",
          "RCD",
          "Surge Protection Devices",
          "Switchgears Accessories"
        ],
        units: ["Nos."],
        description: ""
      },
      {
        slug: "led-lighting",
        name: "LED & Lighting",
        image: "/materials/LED-_-Lighting.jpg",
        variants: [
          "Ceiling & Wall Lights",
          "Decorative Lights",
          "Lamp",
          "LED",
          "Light Blubs",
          "Lighting Accessories",
          "Outdoor Lighting",
          "Portable Lighting",
          "Smart Lights"
        ],
        units: ["Nos."],
        description: ""
      },
      {
        slug: "pump-and-motor",
        name: "Pump And Motor",
        image: "/materials/Pump-And-Motor.jpg",
        variants: [
          "Booster Pumps",
          "Centrifugal Pumps",
          "Control Motor Starters",
          "Gear Pump",
          "General Purpose Motor",
          "Sewage Pumps",
          "Shallow Well Pumps",
          "Submersible Pumps"
        ],
        units: ["Nos."],
        description: ""
      }
    ]
  },
  {
    slug: "miscellaneous",
    name: "Miscellaneous",
    image: "/materials/Cat-Others-Miscellaneous.jpg",
    products: [
      {
        slug: "automotive",
        name: "Automotive",
        image: "/materials/automotive.jpg",
        variants: [
          "Automoblie Rubber and Components",
          "Automotive Filters",
          "Automotive Tools",
          "Bikes Accessories",
          "Car Accessories",
          "Car Care and Cleaning",
          "Car Lighting",
          "Car Washers",
          "Clutch Part and Accessories",
          "Spare Parts"
        ],
        units: ["Nos.", "Set"],
        description: ""
      },
      {
        slug: "measurements-testings",
        name: "Measurements & Testings",
        image: "/materials/Measurenment-and-testing.jpg",
        variants: [
          "Air-Velocity Meters",
          "Detectors",
          "Electrical Power Testings",
          "Electronic and Bench Testing",
          "Flow Meters",
          "Indoor Air Quality Meters",
          "Laser Levels",
          "Measuring and Layout Tools",
          "Measuring Presicion Tools",
          "Milli & Micro OHM Meters",
          "Non- Electrical Properties Testings",
          "Process Monitoring Meters",
          "Temperature and Humidity Meters",
          "Weighing Scales"
        ],
        units: ["Nos.", "Set"],
        description: ""
      },
      {
        slug: "office-stationery-and-supplier",
        name: "Office Stationery and Supplier",
        image: "/materials/Office-stationery.jpg",
        variants: [
          "Cleaning and Housingkeeping",
          "IT & Electronics",
          "Office Furniture",
          "Security"
        ],
        units: ["Nos."],
        description: ""
      },
      {
        slug: "safety-and-ppe-supplies",
        name: "Safety and PPE Supplies",
        image: "/materials/Safety-and-ppe-supplies.jpg",
        variants: [
          "Fall Protection",
          "Fire Fighting Cloting and Accessories",
          "Hearing Protection",
          "Respiratory Masks",
          "Safety Gloves",
          "Safety Helmets",
          "Safety Jackets",
          "Safety Shoes",
          "Safety Sign and Signal",
          "Traffic Safety"
        ],
        units: ["Nos.", "Piece"],
        description: ""
      },
      {
        slug: "tool-and-machinery",
        name: "Tool and Machinery",
        image: "/materials/Tools-and-machinery.jpg",
        variants: [
          "Abrasives",
          "Cutting Tools and Machinery",
          "Fasteners",
          "Hand Tools",
          "Hydraulics",
          "Industrial Plant and Machinery",
          "Material Handling and Packaging",
          "Penumatics",
          "Power Tools",
          "Welding and Soldering"
        ],
        units: ["Nos.", "Set"],
        description: ""
      }
    ]
  }
];
function getCategoryBySlug(slug) {
  return categories.find((category) => category.slug === slug);
}
function getProductBySlug(catSlug, prodSlug) {
  const category = getCategoryBySlug(catSlug);
  if (!category) return void 0;
  const product = category.products.find((item2) => item2.slug === prodSlug);
  if (!product) return void 0;
  return { category, product };
}
const sectors = [
  {
    slug: "roads-bridges",
    name: "Roads & Bridges",
    image: "/images/wp/ROADS-AND-BRIDGES-600x400.jpg",
    description: "National highways, expressways, flyovers & bridge infrastructure",
    overview: "India has the world's second-largest road network, extending over 6.63 million km as of 2026 (up from 5.89 million km in 2013). This network handles 71% of freight and 85% of passenger movement, powering economic activity and regional connectivity. The sector contributes roughly 4.7% to GDP and supports industrial, agricultural, and tourism growth. Government programs like Bharatmala Pariyojana, PM GatiShakti, and NIP have accelerated capacity addition, while digitalization through FASTag and AI traffic monitoring is enhancing efficiency. The focus is shifting toward climate-resilient, green corridors and integrated logistics networks.",
    keyStats: [
      { label: "Total Road Length", value: "6.63M km" },
      { label: "National Highways", value: "1,46,600 km" },
      { label: "Avg. Construction Speed", value: "34 km/day" },
      { label: "Annual Capex Allocation", value: "₹2.95L Cr" }
    ],
    programs: [
      "Bharatmala Pariyojana – 34,800 km planned (22,000 km built) | ₹5.35 lakh crore budget",
      "PM GatiShakti – National Master Plan for integrated transport planning",
      "Multimodal Logistics Parks – 35 identified (9 under construction)",
      "Green Highway Policy – tree plantations, solar lighting, rainwater harvesting"
    ],
    futureOutlook: "By 2030, India targets reducing logistics cost to <8% of GDP through asset monetization, AI-enabled operations, and multimodal corridors. EV charging lanes and digital tolling will enhance efficiency, while PPP models and foreign financing will expand expressway development to over 7 million km.",
    projectTypes: [
      "National Highways & Expressways",
      "State Highways & MDRs",
      "Flyovers & Grade Separators",
      "ROBs / RUBs",
      "Long-span Cable-stayed & Suspension Bridges",
      "Tunnel Approaches",
      "Urban Ring Roads",
      "Hill Roads & Border Roads"
    ],
    vendorInfraRole: [
      "Verified vendor discovery across 20+ material categories",
      "Real-time price benchmarking for TMT, cement & bitumen",
      "Equipment hire marketplace for paving, compaction & batching",
      "Project tender alerts and SOR access for NHAI / state PWDs",
      "Supply chain financing through HDFC, Tata Capital & L&T Finance",
      "ISO-certified data security for bid and procurement data"
    ]
  },
  {
    slug: "urban-transport",
    name: "Urban Transport",
    image: "/images/wp/URBAN-TRANSPORT.jpg",
    description: "Metro rail, MRTS, BRT and urban mobility systems",
    overview: "Rapid urbanization has made mass transit a core pillar of city infrastructure. India hosts the world's third-largest metro network (982 km operational), which will surpass 2,000 km by 2030. Expansions across Delhi, Mumbai, Bengaluru, and Chennai support low-carbon mobility and reduced congestion. Digital ticketing, intelligent traffic systems, and safe urban stations enhance commuter experience. Public transport integration with EV and e-bus fleets is reducing urban emissions and fossil fuel dependence.",
    keyStats: [
      { label: "Operational Metro Length", value: "982 km" },
      { label: "Under Construction", value: "1,150+ km" },
      { label: "Daily Metro Ridership", value: "8 Million" },
      { label: "Electric Buses (FAME-II)", value: "12,000+" }
    ],
    programs: [
      "Metro Lite and Neo Metro models for Tier-2 cities",
      "RRTS – Delhi–Meerut 82 km operational corridor",
      "National Common Mobility Card (NCMC) for interoperable ticketing",
      "Smart City Transit Integration: Bike-sharing + EV infrastructure"
    ],
    futureOutlook: "By 2030 urban transit will anchor net-zero-mobility goals through AI-based dispatch, automation, and hydrogen-powered rolling stock, enabling seamless multi-modal networks in 100+ cities.",
    projectTypes: [
      "Metro Rail (underground, elevated & at-grade)",
      "Light Rail Transit (LRT)",
      "Bus Rapid Transit (BRT) Corridors",
      "Elevated Urban Corridors",
      "Monorail Systems",
      "Integrated Multimodal Hubs",
      "Last-mile Connectivity Infrastructure"
    ],
    vendorInfraRole: [
      "Vendor discovery for civil, MEP and track-work specialists",
      "Price discovery for structural steel, cables and precast segments",
      "Equipment hire for TBMs, segment erectors and gantry cranes",
      "Sector-specific SORs and tender alert subscriptions",
      "Supply chain financing for subcontractors"
    ]
  },
  {
    slug: "railways",
    name: "Railways",
    image: "/images/wp/RAILWAYS.jpg",
    description: "Dedicated freight corridors, high-speed rail and station upgrades",
    overview: "Indian Railways is the lifeline of national mobility, transporting 23 million passengers and 1.55 billion tonnes of freight every day. Covering 68,426 route km, the network is 95.3% electrified, enhancing efficiency and cutting emissions. Capex investments of ₹2.65 lakh crore (FY26) support modern coaches, AI signaling, and station redevelopment. Dedicated freight corridors and high-speed rail projects are pushing India toward a next-generation rail economy.",
    keyStats: [
      { label: "Route Length", value: "68,426 km" },
      { label: "Electrification", value: "95.3%" },
      { label: "Freight Traffic / Year", value: "1.55 BT" },
      { label: "Vande Bharat Trains", value: "130 Running" }
    ],
    programs: [
      "Dedicated Freight Corridors (DFC): 2,843 km | 96% complete",
      "Amrit Bharat Station Scheme: 550 smart stations",
      "KAVACH Safety System: 1,500 route km deployed",
      "Net-Zero 2030 Railway Target"
    ],
    futureOutlook: "Complete electrification and logistics integration with ports and corridors will accelerate freight turnaround. Hydrogen and solar-based locomotives will support carbon neutrality by 2030.",
    projectTypes: [
      "Dedicated Freight Corridors (EDFC / WDFC)",
      "High-Speed Rail (Bullet Train)",
      "Station Redevelopment (Amrit Bharat)",
      "Electrification (25 kV OHE)",
      "Signalling & Telecommunication Upgrades",
      "Track Laying & Ballasting",
      "ROB / Subway Construction"
    ],
    vendorInfraRole: [
      "Vendor discovery for track, OHE and civil specialists",
      "Price benchmarking for rails, sleepers and ballast",
      "Tender alerts from RITES, IRCON, DFCCIL and NHSRCL",
      "Equipment hire for track-laying machines and rail cranes",
      "Project financing and working capital support"
    ]
  },
  {
    slug: "airports",
    name: "Airports & Aviation",
    image: "/images/wp/AIRPORTS.jpg",
    description: "Greenfield airports, terminal expansions and airside works",
    overview: "India's aviation sector is among the fastest growing globally, projected to handle 1 billion passengers annually within a decade. Operational airports rose from 74 (2014) to 149 (2026), boosting Tier-2 and Tier-3 connectivity. With US$15 billion in investments, modernization covers terminal expansion, cargo handling, and smart operations. The sector is embracing AI security, biometric boarding, and green energy to reduce carbon intensity.",
    keyStats: [
      { label: "Active Airports (2026)", value: "149" },
      { label: "Target Airports by 2030", value: ">230" },
      { label: "Passenger Traffic FY25", value: "396 Million" },
      { label: "Sector Investment 2024-30", value: "US$15B" }
    ],
    programs: [
      "UDAN Scheme: 517 routes | 76 new airports linked",
      "Greenfield Airports: Jewar, Navi Mumbai, Dholera, Mopa",
      "AI Surveillance & Smart Baggage Systems",
      "Sustainable Aviation Fuel testing programs"
    ],
    futureOutlook: "India targets net-zero airport operations by 2030 and 50% domestic air traffic growth by FY28. Airport city models and MRO hubs will turn India into a global aviation cluster.",
    projectTypes: [
      "Greenfield Airports",
      "Terminal Expansion & Modernisation",
      "Runway & Taxiway Construction",
      "Cargo Terminal Development",
      "Airport City & Aerocity Projects",
      "MRO Facilities",
      "Helicopter Terminals (Heliports)"
    ],
    vendorInfraRole: [
      "Vendor discovery for speciality civil, MEP and IT/AV contractors",
      "Price discovery for structural glass, cladding and AGL systems",
      "Equipment hire for runway paving and compaction equipment",
      "Tender alerts from AAI, MIAL and greenfield airport developers",
      "Supply chain financing for SME vendors"
    ]
  },
  {
    slug: "transmission-lines-substations",
    name: "Transmission Lines & Substations",
    image: "/images/wp/TRANSMISSION-LINE.jpg",
    description: "HV/EHV transmission networks and substation projects",
    overview: "India's grid is a critical enabler of industrial and renewable growth. Over 4.98 lakh circuit km of 400 kV+ lines connect all regions, with interstate capacity of 123 GW. Investments worth ₹4.1 lakh crore (FY25–30) focus on smart substations, HVDC corridors, and real-time SCADA systems. The network integrates solar and wind projects under Green Energy Corridors.",
    keyStats: [
      { label: "Transmission Lines", value: "4.98L ckm" },
      { label: "Smart GIS Substations", value: "250+" },
      { label: "Inter-Regional Transfer", value: "123 GW" },
      { label: "Green Integration Capacity", value: "60 GW" }
    ],
    programs: [
      "Green Energy Corridor I & II – linking renewables to the national grid",
      "HVDC Backbone: Raigarh–Pugalur–Trissur and Alipurduar–Siliguri corridors",
      "Smart Meter Mission: Nationwide rollout across all states"
    ],
    futureOutlook: "AI-driven load balancing and decentralized storage grids will shape India's next power-distribution era, ensuring zero blackout reliability.",
    projectTypes: [
      "220 kV, 400 kV & 765 kV Transmission Lines",
      "HVDC Transmission Corridors",
      "GIS & AIS Substations",
      "Line Bays & Switching Stations",
      "Underground Cable Systems",
      "Rural Electrification (RDSS / PMDP)"
    ],
    vendorInfraRole: [
      "Vendor discovery for tower fabricators, conductor & hardware suppliers",
      "Price benchmarking for ACSR/ACCC conductors, transformers & insulators",
      "Equipment hire for stringing equipment and tensioners",
      "Tender alerts from PGCIL, STUs and SECI",
      "Project financing support through reputed NBFCs"
    ]
  },
  {
    slug: "industrial-corridor",
    name: "Industrial Corridors",
    image: "/images/wp/INDUSTRIAL-CORRIDOR.jpg",
    description: "DMIC, CBIC and other industrial zone developments",
    overview: "Industrial corridors are designed as integrated economic zones combining manufacturing, urban living, and logistics. Stretching over 4,200 km, they anchor India's goal to raise manufacturing GDP share to 25% by 2030. Each corridor links smart cities, ports, and freight networks, facilitating plug-and-play industrialization. They have generated massive foreign interest from Japan, Singapore, and Gulf sovereign funds.",
    keyStats: [
      { label: "Total Investment", value: "₹9L Cr+" },
      { label: "Corridor Length", value: "4,200 km" },
      { label: "Industrial Nodes", value: "32 (14 Live)" },
      { label: "Job Potential", value: "12 Million+" }
    ],
    programs: [
      "DMIC: ₹6 lakh crore | 1,500 km | 8 Industrial Nodes",
      "Dholera Smart City & Vikram Udyogpuri industrial township",
      "NICDIT Integrated Approach for Corridor governance"
    ],
    futureOutlook: "Next-gen corridors will adopt green manufacturing, AI logistics parks, and net-zero smart townships aligned with 'Make in India 2.0' mission.",
    projectTypes: [
      "DMIC & CBIC Node Development",
      "Industrial Parks & Manufacturing Zones",
      "Plug-and-Play Industrial Sheds",
      "Integrated Township Infrastructure",
      "Utility Corridors (Power, Water, Gas)",
      "Logistics Parks & Warehousing",
      "SEZ & NIMZ Development"
    ],
    vendorInfraRole: [
      "Vendor discovery across civil, MEP, pre-engineered buildings and utilities",
      "Price benchmarking for structural steel, pre-engineered structures and cables",
      "Equipment hire for earthmoving, piling and erection equipment",
      "Tender alerts from NICDC, NITI Aayog and state industrial authorities",
      "End-to-end supply chain financing"
    ]
  },
  {
    slug: "smart-cities",
    name: "Smart Cities",
    image: "/images/wp/SMART-CITY.jpg",
    description: "Integrated command centers, ICT infrastructure and urban services",
    overview: "Covering 100 cities, the Smart Cities Mission represents a nationwide push for data-driven urban transformation. Projects worth ₹2.1 lakh crore drive ICT integration for mobility, water, waste, and energy systems. Integrated Command & Control Centres (ICCCs) operate in 80+ cities, enabling digital governance and faster public service delivery. The mission has significantly enhanced urban resilience and citizen participation.",
    keyStats: [
      { label: "Smart Cities Covered", value: "100" },
      { label: "Approved Investment", value: "₹2.1L Cr" },
      { label: "Projects Completed", value: "7,400+ (88%)" },
      { label: "ICCCs Operational", value: "80+" }
    ],
    programs: [
      "Smart Mobility, Lighting & Monitoring Systems",
      "IoT Sensors for waste and water tracking",
      "EV Charging Networks in urban centres"
    ],
    futureOutlook: "By 2030, India plans to scale Smart City principles across 200+ Tier-2 and Tier-3 cities, making digital urban governance standard nationwide.",
    projectTypes: [
      "Integrated Command & Control Centres (ICCC)",
      "Smart Street Lighting (LED & IoT)",
      "Smart Water Metering & SCADA",
      "Surveillance & Traffic Management Systems",
      "Wi-Fi Hotspots & Public Broadband",
      "Area-Based Development (ABD)",
      "E-Governance Infrastructure"
    ],
    vendorInfraRole: [
      "Vendor discovery for ICT, civil and MEP contractors",
      "Price discovery for LED fittings, CCTV, networking and sensors",
      "Tender tracking from Smart Cities SPVs and ULBs",
      "Equipment hire for civil and installation works",
      "Working capital financing for SME technology vendors"
    ]
  },
  {
    slug: "ports",
    name: "Ports & Maritime",
    image: "/images/wp/PORTS.jpg",
    description: "Major ports, minor ports and inland waterways infrastructure",
    overview: "Ports enable India's trade-led industrial strategy, handling 95% of cargo volume and 70% by value. Twelve major ports and 210 minor ports now hold 2,600 MTPA capacity with 1.49 billion-tonne throughput (FY25). Under Sagarmala Programme (₹5.6 lakh crore), automation, mechanization, and green initiatives are redefining maritime efficiency. Inland waterways development is reducing freight costs and GHG emissions.",
    keyStats: [
      { label: "Cargo Handled FY25", value: "1.49 BT" },
      { label: "Port Capacity", value: "2,600 MTPA" },
      { label: "Sagarmala Projects", value: "800+" },
      { label: "Green Port Renewable Share", value: "25%" }
    ],
    programs: [
      "Sagarmala Programme – coastal connectivity & logistics parks (₹5.6 lakh crore)",
      "Maritime India Vision 2030",
      "Port Automation Projects at JNPT and Paradip"
    ],
    futureOutlook: "Focus on blue-economy zones, offshore wind support ports, and green shipping fuel will position India as a global maritime hub by 2030.",
    projectTypes: [
      "Deep-draft Port Development",
      "Container Terminal Construction",
      "Jetty & Berth Construction",
      "Dredging & Reclamation",
      "Dry Docks & Ship Repair Facilities",
      "Inland Waterway Terminals (IWT)",
      "Fishing Harbour Development"
    ],
    vendorInfraRole: [
      "Vendor discovery for marine civil, dredging and cargo handling specialists",
      "Price benchmarking for sheet piles, fenders, bollards and crane systems",
      "Equipment hire for dredgers, grab cranes and barges",
      "Tender alerts from MoPSW, Major Port Trusts and Sagarmala",
      "Supply chain financing for port subcontractors"
    ]
  },
  {
    slug: "water-waste-water",
    name: "Water & Waste Water",
    image: "/images/wp/WATER-AND-WASTE-WATER.jpg",
    description: "Water supply, sewage treatment and distribution networks",
    overview: "India's water infrastructure is advancing toward universal access and sustainability. The Jal Jeevan Mission achieved 96% rural coverage, bringing tap water to 14 crore households. Urban programs (AMRUT 2.0) are modernizing wastewater treatment capacities to 38,000 MLD by 2030. IoT networks now monitor water quality and leakage in 150+ cities, reducing losses and improving efficiency. Water recycling and reuse markets are growing in industrial corridors.",
    keyStats: [
      { label: "Rural Tap Coverage", value: "96%" },
      { label: "Households with Tap Water", value: "14 Cr+" },
      { label: "STP Capacity Target (2030)", value: "38,000 MLD" },
      { label: "JJM Investment", value: "₹3.6L Cr" }
    ],
    programs: [
      "Jal Jeevan Mission, AMRUT 2.0, and Namami Gange",
      "Leak Detection IoT Programs in urban networks",
      "SCADA Control Systems for real-time operation"
    ],
    futureOutlook: "Digital water governance, desalination and river basin mapping will drive India to full water security by 2030.",
    projectTypes: [
      "Bulk Water Supply Schemes",
      "Water Treatment Plants (WTP)",
      "Sewage Treatment Plants (STP)",
      "Underground Drainage (UGD) Networks",
      "Jal Jeevan Mission (FHTC connections)",
      "Desalination Plants",
      "Stormwater Drainage & Flood Management"
    ],
    vendorInfraRole: [
      "Vendor discovery for pipe suppliers, pump OEMs and civil contractors",
      "Price benchmarking for HDPE, DI & CI pipes, pumps and valves",
      "Equipment hire for trenching, pipe-laying and compaction equipment",
      "Tender alerts from NMCG, CPHEEO, AMRUT and Jal Boards",
      "Supply chain financing for SME contractors"
    ]
  },
  {
    slug: "renewable-power",
    name: "Renewable Power",
    image: "/images/wp/RENEWABLE-POWER.jpg",
    description: "Solar, wind, hydro and hybrid renewable energy projects",
    overview: "India is charting a historic energy transition with 204 GW renewables in 2026 and a 500 GW target by 2030. Solar (104 GW) and wind (45 GW) drive this growth; hydro and biomass provide balance. The sector attracts global capital via green bonds and PPAs with data centers and industries. The Green Hydrogen Mission (₹8 lakh crore) and battery manufacturing initiatives position India as a clean tech export leader.",
    keyStats: [
      { label: "Total RE Capacity (2026)", value: "204 GW" },
      { label: "Target by 2030", value: "500 GW" },
      { label: "Solar / Wind / Hydro", value: "104 / 45 / 51 GW" },
      { label: "Investment 2024–30", value: "US$320B+" }
    ],
    programs: [
      "PLI Scheme for solar manufacturing (65 GW domestic capability)",
      "National Offshore Wind Mission",
      "Battery Storage Roadmap – 50 GWh target by 2027"
    ],
    futureOutlook: "Hybrid solar-wind parks, green ammonia exports, and decentralized micro-grids will anchor India's net-zero by 2070 strategy.",
    projectTypes: [
      "Utility-scale Solar Parks",
      "Rooftop Solar (C&I and Residential)",
      "Onshore Wind Farms",
      "Offshore Wind Projects",
      "Pumped Storage Hydro",
      "Solar-Wind Hybrid Projects",
      "Green Hydrogen Plants"
    ],
    vendorInfraRole: [
      "Vendor discovery for module, inverter, cable and BOP suppliers",
      "Price benchmarking for solar modules, wind towers and transformers",
      "Equipment hire for cranes, cable-laying and testing equipment",
      "Tender tracking from SECI, MNRE, NTPC and SERCs",
      "Project finance and working capital through green finance partners"
    ]
  },
  {
    slug: "power",
    name: "Power",
    image: "/images/wp/power-cinematic.jpg",
    description: "Thermal, hydro and nuclear power generation projects",
    overview: "India's power sector is among the largest in the world, with 435 GW installed capacity supplying a peak demand of 253 GW. Renewables already form 46% of capacity, well ahead of global averages. Smart metering and digital distribution under the Revamped DISCOM Scheme are reducing T&D losses to 15.1%. Massive grid modernization and storage investments will support energy-intensive digital and EV economies.",
    keyStats: [
      { label: "Installed Power Capacity", value: "435 GW" },
      { label: "T&D Losses", value: "15.1%" },
      { label: "Smart Meters Deployed", value: "8.4 Crore" },
      { label: "FY25–30 Investments", value: "₹11L Cr" }
    ],
    programs: [
      "UDAY 2.0 & Smart Grid Mission",
      "National Power Distribution Reforms",
      "FGD Installation for Emission Control"
    ],
    futureOutlook: "Digital grids with AI forecasting, rooftop solar net-metering, and EV integration will create a flexible 24×7 renewable-ready power market.",
    projectTypes: [
      "Thermal Power Stations (Coal, Gas, Oil)",
      "Large Hydro Power Projects",
      "Nuclear Power Plants",
      "Pumped Storage Projects",
      "Captive Power Plants",
      "Waste-to-Energy Projects",
      "Combined Cycle Power Plants (CCPP)"
    ],
    vendorInfraRole: [
      "Vendor discovery for civil, mechanical and electrical specialists",
      "Price benchmarking for boiler components, turbines and HV cables",
      "Equipment hire for large-capacity cranes and specialised machinery",
      "Tender alerts from NTPC, NHPC, NPCIL and state GENCOs",
      "Supply chain financing for sub-vendors and ancillary suppliers"
    ]
  },
  {
    slug: "buildings-industrial",
    name: "Buildings & Industrial Projects",
    image: "/images/wp/BUILDINGS-INDUSTRIAL-PROJECTS.jpg",
    description: "Commercial complexes, factories and industrial facilities",
    overview: "The construction sector fuels India's urban and industrial transformation, creating over 50 million jobs. Valued at US$480 billion in 2025 and heading toward US$1 trillion by 2030, growth is driven by housing, commercial real estate, and logistics parks. Transition toward green and digital construction — PEB, BIM, and sustainable materials — has cut project times by 40%. Government schemes like PM Awas Yojana and PLI for construction materials are stimulating capacity and innovation.",
    keyStats: [
      { label: "Market Value (2025)", value: "US$480B" },
      { label: "Target Market (2030)", value: "US$1T" },
      { label: "Green Buildings", value: "10B sq ft" },
      { label: "FDI Inflows (2020–24)", value: "US$28B" }
    ],
    programs: [
      "PM Awas Yojana – 3 crore homes and Smart Housing Mission",
      "PLI Schemes for cement and eco-steel",
      "Data Center Infrastructure Policy 2025"
    ],
    futureOutlook: "Digital twin technology, 3D printing, and carbon-neutral construction materials will dominate the built environment by 2030.",
    projectTypes: [
      "Commercial Office Complexes & IT Parks",
      "Data Centres",
      "Hospitals & Healthcare Facilities",
      "Educational Campuses",
      "Hotels & Hospitality Projects",
      "Industrial Factories & Warehouses",
      "Government & Institutional Buildings"
    ],
    vendorInfraRole: [
      "Vendor discovery for structural, interior and MEP contractors",
      "Price benchmarking for structural steel, glass, flooring and finishes",
      "Equipment hire for tower cranes, hoists and concrete pumps",
      "Tender alerts from CPWD, NBCC and state PWDs",
      "Supply chain financing for building material suppliers"
    ]
  },
  {
    slug: "oil-gas",
    name: "Oil & Gas",
    image: "/images/wp/OIL-GAS.jpg",
    description: "Offshore platforms, pipelines and refinery infrastructure",
    overview: "India's oil & gas sector, valued at US$150 billion by 2030, is undergoing strategic transformation to support cleaner energy use. With refining capacity of 254 MMTPA (4th globally) and expanding pipelines (23,300 km → 34,000 km by 2028), India is emerging as Asia's refining hub. The government's vision is to boost natural gas to 15% of the energy mix and expand city gas distribution to 70% of districts.",
    keyStats: [
      { label: "Refining Capacity", value: "254 MMTPA" },
      { label: "Gas Pipeline Length", value: "23,300→34,000 km" },
      { label: "LNG Terminals", value: "8 + 4 Underway" },
      { label: "Sector Investment (2030)", value: "US$150B" }
    ],
    programs: [
      "National Gas Grid & CGD Expansion to 70% of districts",
      "Strategic Oil Reserves Phase II (12 MMT)",
      "Hydrogen-Ready Refinery Upgrades"
    ],
    futureOutlook: "Higher LNG storage, bio-fuel blending, and CCUS projects will transition India toward a low-carbon hydrocarbon economy by 2035.",
    projectTypes: [
      "Cross-Country Oil & Gas Pipelines",
      "City Gas Distribution (CGD) Networks",
      "LNG Import Terminals",
      "Petroleum Refineries & Petrochemical Plants",
      "Offshore Platforms & Jackets",
      "Storage Terminals & Depots",
      "Gas Processing Plants"
    ],
    vendorInfraRole: [
      "Vendor discovery for piping, instrumentation and civil specialists",
      "Price benchmarking for line pipes, fittings, valves and instruments",
      "Equipment hire for pipeline construction and testing equipment",
      "Tender alerts from ONGC, OIL, GAIL, IOC, BPCL and HPCL",
      "Supply chain financing through sector-specialised lenders"
    ]
  },
  {
    slug: "irrigation-tunneling",
    name: "Irrigation & Tunnel Projects",
    image: "/images/wp/irrigation-tunneling-cinematic.jpg",
    description: "Dams, canals, micro-irrigation and tunnel construction",
    overview: "Irrigation supports India's agricultural backbone while tunnels enable connectivity across complex terrains. Under PMKSY, ₹3.5 lakh crore has been deployed to modernize canals and lift systems, covering over 100 lakh hectares of farmland. Advanced TBM methodologies drive 1,100 km of active tunnel projects across metros, hydro, and highways. Technological innovation is reducing construction time and improving safety across mountainous regions.",
    keyStats: [
      { label: "Irrigation Investment", value: "₹3.5L Cr" },
      { label: "Irrigated Area Covered", value: "100 Lakh ha" },
      { label: "Active Tunnel Projects", value: "350+" },
      { label: "Total Tunnel Length", value: "1,100 km" }
    ],
    programs: [
      "PMKSY, River Linking (Ken-Betwa), and National Hydro Tunneling Plan",
      "Smart Irrigation and Micro-Drip Expansion"
    ],
    futureOutlook: "Focus on climate-resilient irrigation and AI monitoring of hydro structures will strengthen rural productivity and climate adaptation by 2030.",
    projectTypes: [
      "Major & Medium Irrigation Dams",
      "Canal Networks & Lining Works",
      "Micro-Irrigation Systems (Drip & Sprinkler)",
      "Lift Irrigation Schemes",
      "Road, Rail & Hydro Tunnels",
      "Pumped Storage Hydro Tunnels",
      "Underground Metro Tunnels"
    ],
    vendorInfraRole: [
      "Vendor discovery for TBM operators, shotcrete and civil specialists",
      "Price benchmarking for HDPE liners, waterproofing and concrete additives",
      "Equipment hire for TBMs, drilling jumbos and concrete pumps",
      "Tender alerts from CWC, state irrigation departments and PMKSY",
      "Supply chain financing for sub-contractors"
    ]
  },
  {
    slug: "solid-waste-management",
    name: "Solid Waste Management",
    image: "/images/wp/solid-waste-management-cinematic.jpg",
    description: "Waste processing plants, landfill and material recovery facilities",
    overview: "India produces 165,000 tonnes of municipal waste daily; scientific management is now core to urban sustainability. Driven by the Swachh Bharat Mission (U) 2.0, waste processing capacity has reached 76% of total generation (up from just 20% in 2014). Cities adopt GPS tracking, AI sorting, and integrated segregation systems. Recycling and waste-to-energy initiatives make SWM a circular-economy pillar.",
    keyStats: [
      { label: "Daily Municipal Waste", value: "1,65,000 T" },
      { label: "Waste Processed", value: "76%" },
      { label: "WTE Plants / Capacity", value: "55 / 440 MW" },
      { label: "SBM-U 2.0 Investment", value: "₹60,000 Cr" }
    ],
    programs: [
      "Swachh Bharat Mission Urban 2.0",
      "Waste-to-Energy & C&D Recycling Plants",
      "AI Tracking & Digital Landfill Maps"
    ],
    futureOutlook: "By 2030 India aims for 100% scientific waste processing and near-zero landfills through private participation and green technologies.",
    projectTypes: [
      "Integrated Solid Waste Management Facilities",
      "Sanitary Landfills & Bio-remediation",
      "Waste-to-Energy (WtE) Plants",
      "Material Recovery Facilities (MRF)",
      "Composting & Biogas Plants",
      "Construction & Demolition Waste Plants",
      "Hazardous Waste Treatment Facilities"
    ],
    vendorInfraRole: [
      "Vendor discovery for civil, mechanical and environmental contractors",
      "Price benchmarking for HDPE liners, leachate systems and conveyors",
      "Equipment hire for compactors, shredders and sorting systems",
      "Tender alerts from ULBs, Smart Cities SPVs and SBM Mission",
      "Supply chain financing for SME vendors"
    ]
  }
];
function getSectorBySlug(slug) {
  return sectors.find((s) => s.slug === slug);
}
const heroImage = "/assets/hero-construction-PkMOOhzu.png";
const PORTAL_REGISTER_URL$7 = "http://3.110.208.157/customer/";
function Counter({ target, suffix = "", prefix = "" }) {
  const [count2, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = target / 60;
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);
  return /* @__PURE__ */ jsxs("span", { ref, children: [
    prefix,
    count2.toLocaleString("en-IN"),
    suffix
  ] });
}
function FadeUp$3({ children, delay = 0, className = "" }) {
  return /* @__PURE__ */ jsx(
    motion.div,
    {
      initial: { opacity: 0, y: 24 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true, margin: "-50px" },
      transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
      className,
      children
    }
  );
}
const gridVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } }
};
const gridItem = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } }
};
const PORTAL_LOGIN_URL$1 = "http://3.110.208.157/customer/";
const services$1 = [
  { icon: Search, title: "AI-Powered Vendor Discovery", href: PORTAL_LOGIN_URL$1, external: true, image: "/images/services/ai-discovery.jpg", desc: "Search and connect with verified vendors and suppliers in real time. Compare multiple options to identify the best partners for your projects quickly and confidently." },
  { icon: Calculator, title: "Smart Price Discovery", href: PORTAL_LOGIN_URL$1, external: true, image: "/images/services/smart-price-discovery.jpg", desc: "Streamline vendor selection and proposal management. Request quotes or send instant proposals to secure the best prices for services and materials." },
  { icon: Tractor, title: "AI-Powered Plants & Equipment", href: PORTAL_LOGIN_URL$1, external: true, image: "/images/services/plants-equipment-marketplace.png", desc: "A dedicated marketplace to buy, sell, or hire plants and equipment. Maximize asset utilization and reduce idle machinery across projects." },
  { icon: Package, title: "Smart Material Procurement", href: "/materials", image: "/images/services/smart-material-procurement.jpg", desc: "Access a one-stop marketplace for all construction and raw material requirements. Simplify sourcing and ensure timely availability for every project." },
  { icon: Factory, title: "Contract Manufacturing", href: "/contract-manufacturing", image: "/contract-manufacturing-ai.jpg", desc: "Design, source, manufacture, and deliver products through verified manufacturers, structured workflows, and real-time execution visibility." },
  { icon: ShieldCheck, title: "Smart Project Insurance", href: "/contact", image: "/images/services/insurance.png", desc: "Get competitive rates and customized quotes for project, material, and equipment insurance from reputed insurers and trusted partners." },
  { icon: Briefcase, title: "AI Powered Enterprise Services", href: "/contact", image: "/images/services/ai-enterprise-services.jpg", desc: "Leverage enterprise solutions for subcontracting, organisational growth, market entry, and diversification into new businesses." },
  { icon: BarChart3, title: "Other Services", href: "/services", image: "/images/services/otherServices.png", desc: "Stay ahead with tender updates, sector intelligence, and access to 75+ Schedules of Rates (SOR) for accurate estimation and benchmarking." }
];
const stats$1 = [
  { value: 31637, suffix: "", label: "Contractors & Vendors", sub: "Certified Contractors & Vendors & accross 20+ Sectors." },
  { value: 263, suffix: "", label: "Live Users", sub: "Total number of customers who are using our products." },
  { value: 6052, suffix: " Cr", label: "Project Value", sub: "Value of the projects posted in our portal." },
  { value: 159, suffix: "", label: "Plants & Equipment", sub: "Number of Plants & Equipment." }
];
const blogs = [
  { img: "/images/blog/Blog-promote-digitalisation.png", date: "March 31, 2026", cat: "Marketplace", title: "Vendor Infra Marketplace for Plants & Equipment: Unlocking the Power of a Marketplace", excerpt: "In the ever-evolving landscape of industries, effective management of plants and equipment is crucial for businesses seeking to optimize their ROI." },
  { img: "/images/blog/ChatGPT Image Jun 6, 2026, 12_13_52 PM.png", date: "March 30, 2026", cat: "Technology", title: "SaaS Revolution in Construction and Infrastructure Industry", excerpt: "The Indian economy stands on the shoulders of the Construction and Infrastructure industry, encompassing vital sectors like roads, railways, and urban infrastructure." },
  { img: "/images/blog/ChatGPT Image Jun 6, 2026, 12_14_22 PM.png", date: "March 30, 2026", cat: "AI", title: "Promote Digitalisation in Construction Industry: The Catalysts of Change", excerpt: "The construction industry is undergoing a digital revolution. It's time to embrace the catalysts of change and the power of innovation." }
];
const testimonials = [
  { name: "Andleeb Jain", role: "Group President: People | Culture | Digital, JK Cement", image: "/testimonials/andleeb-jain.jpg", text: "I have witnessed this platform taking shape and the great efforts, thoughts analysis and data going into it. It's surely the first and one of a kind in the infrastructure space — a one stop shop, very useful, very comprehensive, very handy." },
  { name: "Nitin Jain", role: "Head: Corporate Centre (Tech | Strategy | Digital), Larsen & Toubro", image: "/testimonials/nitin-jain.jpg", text: "Vendor Infra platform provides me with sector intelligence, detailed vendor database by sector, ability to provide me with costing information of projects in 20+ infrastructure & EPC sectors. Kudos to the Vendor Infra team for providing such a great platform for the EPC sector." },
  { name: "Pankaj Tandon", role: "Entrepreneur, Former Finance Professional of large Infrastructure Groups, CA", image: "/testimonials/pankaj-tandon.jpg", text: "I am delighted to see this concept in construction and infrastructure industry because it is one of its kind. I've never seen this type of Collaboration platform before. My wishes are with Rahul & Vendor Infra Team." },
  { name: "Sanjeev Kumar Gupta", role: "CEO, Karnataka Digital Economy Mission (A GOK initiative)", image: "/testimonials/sanjeev-gupta.jpg", text: "Vendor Infra is much needed for the infra ecosystem. The bundle of IT, Knowledge and experience of infrastructure makes this platform unique. I am very impressed with their solution which is ready to digitally transform the Infrastructure, Construction & Manufacturing industry. All the best team!" },
  { name: "OP Pandey", role: "Dy. President, JMC Projects Limited (Kalpataru Group)", image: "/testimonials/op-pandey.jpg", text: "When you have a project, you need a construction company committed to doing construction — someone who knows and understands the flow of companies and vendors. Vendor Infra fits us perfectly. I highly recommend it to eliminate your business risks, achieve your goals and improve your ROI." },
  { name: "Amit Jain", role: "Sales Director", image: "about-members/2025-11-VI-employee-photos-13.png", text: "Vendor Infra has been a trusted partner, combining technology, industry expertise, and seamless execution to help us achieve our business goals. Their commitment to quality, efficiency, and customer success has consistently delivered measurable results." }
];
const trustedBy$1 = [
  { name: "Adani Group", logo: "/logos/Adani-Group.png" },
  { name: "NCC", logo: "/logos/NCC.png" },
  { name: "Tata Projects", logo: "/logos/tata-projects.png" },
  { name: "JWIL", logo: "/logos/JWIL.jpg" },
  { name: "Gawar", logo: "/logos/Gawar.png" },
  { name: "JMC Projects", logo: "/logos/jmc-projects.png" },
  { name: "Dilip Buildcon", logo: "/logos/DBL.png" },
  { name: "INOX Wind", logo: "/logos/inox-wind.png" },
  { name: "IndInfravit", logo: "/logos/Indinfravit.png" },
  { name: "KEC", logo: "/logos/kec.png" },
  { name: "Kalpataru", logo: "/logos/KPILLOGO.png" },
  { name: "IRB Infra", logo: "/logos/IRB-logo.jpg" }
];
const associations = [
  { name: "ISO 14001", logo: "/logos/ISO-14001.jpg" },
  { name: "ISO 27001", logo: "/logos/ISO-27001.jpg" },
  { name: "ISO Certified", logo: "/logos/iso-certified.svg" },
  { name: "GEM", logo: "/logos/GeM.jpg" },
  { name: "FICCI", logo: "/logos/FICCI.jpg" },
  { name: "Startup India", logo: "/logos/startupindia.jpg" },
  { name: "CII", logo: "/logos/CII.jpg" },
  { name: "DPIIT", logo: "/logos/dpiit.svg" },
  { name: "InvoiceMart", logo: "/logos/invoicemart.svg" },
  { name: "MSME", logo: "/logos/MEME.jpg" }
];
const financingPartners = [
  { name: "HDFC Bank", logo: "/logos/Hdfc-Bank.png" },
  { name: "Aditya Birla Capital", logo: "/logos/ABC.jpg" },
  { name: "Tata Capital", logo: "/logos/Tata-capital.jpg" },
  { name: "Shriram Finance", logo: "/logos/shriram.jpg" },
  { name: "L&T Finance", logo: "/logos/L&T.jpg" },
  { name: "IDFC FIRST Bank", logo: "/logos/IDFC-BANK.png" }
];
const awards = [
  {
    name: "HDFC Tech Innovators",
    label: "Tech Innovators",
    image: "https://www.hdfccapital.com/techinnovators/images/HDFC_Capital.png"
  },
  {
    name: "IIT Delhi",
    label: "Entrepreneurship Ecosystem",
    image: "https://upload.wikimedia.org/wikipedia/commons/9/9d/IIT_Delhi_header.svg"
  },
  {
    name: "VCCIRCLE",
    label: "Startup Recognition",
    image: "https://www.vccircle.com/VCC-logo.svg"
  },
  {
    name: "HICOOL",
    label: "Global Entrepreneur Summit",
    image: "/awards/hicool.png",
    dark: true
  }
];
const whyPoints = [
  { title: "End-to-End Value Chain Integration", desc: "From vendor discovery and material procurement to financing, insurance and equipment hire — one unified platform." },
  { title: "Single Unified Data Lake", desc: "All project, procurement, vendor, and site data — fully unified and instantly accessible. Eliminate silos." },
  { title: "Smart Decision Support via Market Intelligence", desc: "Sector insights, schedules of rates, competitive intelligence, and tender & PQ samples." },
  { title: "AI & ML-Driven Insights", desc: "Match with the best-suited vendors and generate real-time analytics for smarter, data-backed decisions." },
  { title: "Safety, Security & Trust Built In", desc: "Every vendor is vetted. ISO 27001-certified data security ensures your information is always protected." },
  { title: "Dedicated Support & Accountability", desc: "Round-the-clock team with dedicated account managers to guide you at every stage." }
];
function LogoMarquee$1({ logos, bg = "white" }) {
  const doubled = [...logos, ...logos];
  return /* @__PURE__ */ jsxs("div", { className: "relative overflow-hidden", children: [
    /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute inset-y-0 left-0 w-24 z-10 bg-gradient-to-r from-[#eef3fb] to-transparent" }),
    /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute inset-y-0 right-0 w-24 z-10 bg-gradient-to-l from-[#eef3fb] to-transparent" }),
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "flex gap-4 items-center py-1",
        style: { animation: "marquee 30s linear infinite", width: "max-content" },
        children: doubled.map((l, i) => /* @__PURE__ */ jsx(
          "div",
          {
            className: `group flex-shrink-0 flex items-center justify-center h-14 px-8 rounded-xl border transition-all duration-300 hover:-translate-y-0.5 ${bg === "dark" ? "bg-white/8 border-white/10 hover:border-[#edad1a]/40" : "bg-white border-[#00274d]/10 shadow-[0_2px_10px_-6px_rgba(0,39,77,0.18)] hover:shadow-[0_6px_18px_-8px_rgba(0,39,77,0.3)] hover:border-[#00274d]/25"}`,
            style: { minWidth: 150 },
            children: /* @__PURE__ */ jsx(
              "img",
              {
                src: l.logo,
                alt: l.name,
                className: `max-h-12 max-w-[140px] object-contain transition duration-300 ${bg === "dark" ? "brightness-0 invert opacity-80" : "opacity-90 group-hover:opacity-100"}`,
                loading: "eager"
              }
            )
          },
          i
        ))
      }
    ),
    /* @__PURE__ */ jsx("style", { children: `
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      ` })
  ] });
}
function Home() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [contactOpen, setContactOpen] = useState(false);
  const [contactPlan, setContactPlan] = useState(void 0);
  useEffect(() => {
    const t = setInterval(() => setActiveTestimonial((p) => (p + 1) % testimonials.length), 5500);
    return () => clearInterval(t);
  }, []);
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen flex flex-col overflow-x-hidden", children: [
    /* @__PURE__ */ jsx(Navbar, {}),
    /* @__PURE__ */ jsxs("section", { "data-preserve-hero-typography": true, className: "relative overflow-hidden bg-[#0d2c52] min-h-[88vh] flex items-center", children: [
      /* @__PURE__ */ jsxs("div", { className: "absolute inset-0", children: [
        /* @__PURE__ */ jsx(
          motion.img,
          {
            initial: { scale: 1.08 },
            animate: { scale: 1 },
            transition: { duration: 2.4, ease: [0.22, 1, 0.36, 1] },
            src: heroImage,
            alt: "Infrastructure construction site",
            className: "w-full h-full object-cover"
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-[#0a2548]/80 via-[#0a2548]/65 to-[#0a2548]/40" }),
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-[#0a1f3d]/40 via-[#0a2548]/25 to-[#0a2548]/60" }),
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-black/25" }),
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0", style: { background: "radial-gradient(ellipse at 50% 50%, rgba(10,37,72,0.35) 0%, rgba(10,37,72,0.7) 100%)" } }),
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 opacity-[0.04]", style: { backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "28px 28px" } }),
        /* @__PURE__ */ jsx("div", { className: "absolute -top-32 -left-32 w-[480px] h-[480px] rounded-full bg-[#edad1a]/10 blur-[120px]" }),
        /* @__PURE__ */ jsx("div", { className: "absolute bottom-0 right-0 w-[520px] h-[520px] rounded-full bg-[#1e6bb8]/20 blur-[140px]" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-20 lg:py-28 w-full", children: /* @__PURE__ */ jsxs("div", { className: "max-w-4xl w-full", children: [
        /* @__PURE__ */ jsxs(
          motion.h1,
          {
            initial: { opacity: 0, y: 28 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.75, delay: 0.12, ease: [0.22, 1, 0.36, 1] },
            className: "text-3xl sm:text-4xl lg:text-5xl xl:text-[3.4rem] font-semibold text-white leading-[1.08] tracking-[-0.02em] mb-5",
            children: [
              "AI - Powered Operating System for",
              " ",
              /* @__PURE__ */ jsxs("span", { className: "relative inline-block text-[#edad1a]", children: [
                "Infrastructure,",
                /* @__PURE__ */ jsx("svg", { className: "absolute left-0 -bottom-2 w-full", height: "6", viewBox: "0 0 300 6", preserveAspectRatio: "none", fill: "none", children: /* @__PURE__ */ jsx("path", { d: "M2 3 Q150 0 298 3", stroke: "#edad1a", strokeWidth: "3", strokeLinecap: "round" }) })
              ] }),
              " Construction & Manufacturing Industry"
            ]
          }
        ),
        /* @__PURE__ */ jsx(
          motion.p,
          {
            initial: { opacity: 0, y: 16 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.6, delay: 0.28 },
            className: "text-white/75 text-sm lg:text-base leading-relaxed mb-8 max-w-xl font-light",
            children: "Unleashing the potential through Ecosystem."
          }
        ),
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 14 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.55, delay: 0.38 },
            className: "flex flex-wrap items-center gap-3 mb-10",
            children: [
              /* @__PURE__ */ jsx(Link, { href: "/services", children: /* @__PURE__ */ jsx(SiteButton, { children: "Services" }) }),
              /* @__PURE__ */ jsx(Link, { href: "/materials", children: /* @__PURE__ */ jsx(SiteButton, { children: "Materials" }) })
            ]
          }
        )
      ] }) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "relative z-30 -mt-16 md:-mt-24 mb-10 md:mb-16", children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto px-6 sm:px-8 lg:px-12", children: /* @__PURE__ */ jsx(
      motion.div,
      {
        className: "grid grid-cols-2 md:grid-cols-4 gap-px bg-gray-100 rounded-2xl border border-gray-100 shadow-2xl overflow-hidden",
        variants: gridVariants,
        initial: "hidden",
        whileInView: "show",
        viewport: { once: true, margin: "-60px" },
        children: stats$1.map((s, i) => /* @__PURE__ */ jsxs(
          motion.div,
          {
            variants: gridItem,
            className: "bg-white py-10 md:py-12 px-6 hover:bg-gray-50 transition-colors duration-300 text-center",
            children: [
              /* @__PURE__ */ jsx(
                "div",
                {
                  className: "text-4xl md:text-5xl font-extrabold text-[#edad1a] leading-none mb-3 tabular-nums whitespace-nowrap",
                  style: { WebkitTextStroke: "0.75px rgba(0,39,77,0.45)" },
                  children: /* @__PURE__ */ jsx(Counter, { target: s.value, suffix: s.suffix })
                }
              ),
              /* @__PURE__ */ jsx("h3", { className: "text-sm font-medium text-[#00274d] mb-1", children: s.label }),
              /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-xs leading-relaxed font-normal", children: s.sub })
            ]
          },
          i
        ))
      }
    ) }) }),
    /* @__PURE__ */ jsxs("section", { className: "relative overflow-hidden bg-[#00274d] py-16 md:py-24 text-white", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(237,173,26,0.08),transparent_50%),radial-gradient(ellipse_at_bottom_right,rgba(2,26,54,0.9),transparent_65%)]" }),
      /* @__PURE__ */ jsx(
        "div",
        {
          className: "absolute inset-0 opacity-[0.12]",
          style: {
            backgroundImage: "linear-gradient(rgba(255,255,255,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.06) 1px,transparent 1px)",
            backgroundSize: "44px 44px"
          }
        }
      ),
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          "aria-hidden": true,
          className: "pointer-events-none absolute -right-28 top-1/2 -translate-y-1/2 h-[420px] w-[420px] rounded-full border border-[#edad1a]/15",
          animate: { rotate: 360 },
          transition: { duration: 70, repeat: Infinity, ease: "linear" },
          children: [
            /* @__PURE__ */ jsx("div", { className: "absolute inset-8 rounded-full border border-dashed border-[#edad1a]/20" }),
            /* @__PURE__ */ jsx("div", { className: "absolute inset-16 rounded-full border border-white/5" })
          ]
        }
      ),
      /* @__PURE__ */ jsx(
        motion.div,
        {
          "aria-hidden": true,
          className: "pointer-events-none absolute left-10 top-16 h-2 w-2 rounded-full bg-[#edad1a]/70 shadow-[0_0_18px_4px_rgba(237,173,26,0.45)]",
          animate: { y: [0, -18, 0], opacity: [0.5, 1, 0.5] },
          transition: { duration: 5, repeat: Infinity, ease: "easeInOut" }
        }
      ),
      /* @__PURE__ */ jsx(
        motion.div,
        {
          "aria-hidden": true,
          className: "pointer-events-none absolute left-1/3 bottom-12 h-1.5 w-1.5 rounded-full bg-white/70",
          animate: { y: [0, 12, 0], opacity: [0.3, 0.9, 0.3] },
          transition: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#edad1a]/60 to-transparent" }),
      /* @__PURE__ */ jsx("div", { className: "absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#edad1a]/40 to-transparent" }),
      /* @__PURE__ */ jsx("div", { className: "relative max-w-6xl mx-auto px-6 sm:px-8 lg:px-10", children: /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-12 gap-10 lg:gap-16 items-center", children: [
        /* @__PURE__ */ jsxs(FadeUp$3, { className: "lg:col-span-7", children: [
          /* @__PURE__ */ jsxs(
            motion.span,
            {
              initial: { opacity: 0, y: 10 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              transition: { duration: 0.45 },
              className: "inline-flex items-center gap-2 text-[#edad1a] text-[12px] font-bold uppercase tracking-[0.3em]",
              children: [
                /* @__PURE__ */ jsx("span", { className: "w-6 h-px bg-[#edad1a]/60" }),
                "About",
                /* @__PURE__ */ jsx("span", { className: "w-6 h-px bg-[#edad1a]/60" })
              ]
            }
          ),
          /* @__PURE__ */ jsxs("h2", { className: "mt-4 text-3xl md:text-4xl leading-tight font-semibold tracking-tight text-white", children: [
            "Discover contractors, unlock opportunities and execute projects with an all-in-one",
            " ",
            /* @__PURE__ */ jsxs("span", { className: "relative inline-block text-[#edad1a]", children: [
              "AI-Powered Ecosystem.",
              /* @__PURE__ */ jsx(
                motion.span,
                {
                  "aria-hidden": true,
                  initial: { scaleX: 0 },
                  whileInView: { scaleX: 1 },
                  viewport: { once: true },
                  transition: { duration: 0.8, ease: "easeOut", delay: 0.25 },
                  className: "absolute left-0 -bottom-1.5 h-[2px] w-full origin-left bg-[#edad1a]/70"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "mt-5 max-w-2xl text-sm md:text-[15px] leading-7 text-white/75", children: "Vendor Infra is more than just a platform; it's a community for the Infrastructure, Construction & Manufacturing industry. Designed exclusively for vendors, suppliers, contractors, consultants, and developers, we combine collaboration, marketplace, and supply chain management into one powerful AI-Powered Ecosystem. Based in Delhi NCR and founded by seasoned leaders with decades of experience, Vendor Infra helps stakeholders eliminate bottlenecks, discover the right partners, and execute projects with unmatched speed, transparency, and efficiency." }),
          /* @__PURE__ */ jsx("p", { className: "hidden", children: "Empowering contractors & vendors with an AI-driven SaaS platform to discover partners, access opportunities, source efficiently, and scale execution — all in one place." }),
          /* @__PURE__ */ jsx(
            motion.ul,
            {
              initial: "hidden",
              whileInView: "show",
              viewport: { once: true },
              variants: {
                hidden: {},
                show: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } }
              },
              className: "mt-7 grid max-w-2xl grid-cols-1 gap-3 sm:grid-cols-3",
              children: [
                "AI-Powered Platform",
                "Unified Ecosystem",
                "Data Intelligence"
              ].map((chip) => /* @__PURE__ */ jsxs(
                motion.li,
                {
                  variants: {
                    hidden: { opacity: 0, y: 10 },
                    show: { opacity: 1, y: 0 }
                  },
                  whileHover: { y: -3 },
                  className: "group flex min-h-[74px] items-center gap-3 rounded-xl border border-white/15 bg-white/[0.06] px-4 py-4 text-sm font-semibold text-white shadow-[0_18px_38px_-28px_rgba(0,0,0,0.9)] backdrop-blur transition-colors hover:border-[#edad1a]/50 hover:bg-[#edad1a]/10",
                  children: [
                    /* @__PURE__ */ jsx("span", { className: "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#edad1a]/15 text-[#edad1a] ring-1 ring-[#edad1a]/25", children: /* @__PURE__ */ jsx(Sparkles, { className: "h-4 w-4" }) }),
                    chip
                  ]
                },
                chip
              ))
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "mt-7 flex flex-wrap items-center gap-4", children: /* @__PURE__ */ jsx(Link, { href: "/about", children: /* @__PURE__ */ jsx(SiteButton, { className: "px-5 py-2.5", children: "Know More" }) }) })
        ] }),
        /* @__PURE__ */ jsx(FadeUp$3, { delay: 0.2, className: "lg:col-span-5 hidden lg:block", children: /* @__PURE__ */ jsxs("div", { className: "relative pl-6 pr-2 pb-10", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute left-0 top-4 bottom-12 w-[3px] rounded-full bg-gradient-to-b from-[#edad1a] via-[#edad1a]/40 to-transparent" }),
          /* @__PURE__ */ jsx(
            motion.div,
            {
              animate: { scale: [1, 1.3, 1], opacity: [0.8, 1, 0.8] },
              transition: { duration: 3, repeat: Infinity, ease: "easeInOut" },
              className: "absolute left-[-5px] top-4 h-[13px] w-[13px] rounded-full bg-[#edad1a] shadow-[0_0_16px_4px_rgba(237,173,26,0.55)]"
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "relative rounded-2xl overflow-hidden shadow-[0_32px_72px_-18px_rgba(0,0,0,0.85)] border border-white/[0.08]", children: [
            /* @__PURE__ */ jsx("div", { className: "absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#edad1a] via-[#f7c44a]/70 to-transparent z-10" }),
            /* @__PURE__ */ jsx(
              "img",
              {
                src: "/about/team-photo.jpg",
                alt: "Vendor Infra Team",
                className: "w-full object-cover",
                style: { height: 340, objectPosition: "center 20%" }
              }
            ),
            /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-[#00274d]/40 via-transparent to-transparent" })
          ] }),
          /* @__PURE__ */ jsx(
            motion.div,
            {
              animate: { y: [0, -5, 0] },
              transition: { duration: 4.5, repeat: Infinity, ease: "easeInOut" },
              className: "absolute -top-3 right-1 bg-[#edad1a] text-[#00274d] text-[9px] font-black uppercase tracking-[0.18em] px-3.5 py-1.5 rounded-full shadow-[0_8px_24px_-4px_rgba(237,173,26,0.55)]",
              children: "Since 2020"
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute -bottom-6 -right-6 h-40 w-40 rounded-full bg-[#edad1a]/10 blur-3xl" })
        ] }) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsx("section", { className: "relative overflow-hidden bg-white py-8 md:py-12", "aria-label": "AI SaaS platform marquee", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
      /* @__PURE__ */ jsx("div", { className: "w-[150vw] -ml-[25vw] -rotate-[0.8deg] overflow-hidden bg-[#00274d] py-5 md:py-6", children: /* @__PURE__ */ jsx("div", { className: "ai-marquee-track [animation-duration:80s]", children: Array.from({ length: 8 }).map((_, index) => /* @__PURE__ */ jsx("span", { className: "ai-marquee-item", children: "SaaS Platform with Artificial Intelligence & Machine Learning" }, `navy-${index}`)) }) }),
      /* @__PURE__ */ jsx("div", { className: "w-[150vw] -ml-[25vw] -mt-6 rotate-[0.8deg] overflow-hidden bg-[#edad1a] py-5 md:py-6", children: /* @__PURE__ */ jsx("div", { className: "ai-marquee-track ai-marquee-track-reverse [animation-duration:75s]", children: Array.from({ length: 8 }).map((_, index) => /* @__PURE__ */ jsx("span", { className: "ai-marquee-item", children: "SaaS Platform with Artificial Intelligence & Machine Learning" }, `gold-${index}`)) }) })
    ] }) }),
    /* @__PURE__ */ jsxs("section", { className: "py-16 md:py-24 bg-white relative overflow-hidden", children: [
      /* @__PURE__ */ jsxs("div", { className: "pointer-events-none absolute inset-0", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 opacity-[0.025]", style: { backgroundImage: "radial-gradient(circle at 1px 1px,#00274d 1px,transparent 0)", backgroundSize: "32px 32px" } }),
        /* @__PURE__ */ jsx("div", { className: "absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00274d]/8 to-transparent" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12", children: [
        /* @__PURE__ */ jsxs(FadeUp$3, { className: "text-center mb-14", children: [
          /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-2 text-[#edad1a] text-[12px] font-bold uppercase tracking-[0.3em] mb-4", children: [
            /* @__PURE__ */ jsx("span", { className: "w-6 h-px bg-[#edad1a]/60" }),
            "Services",
            /* @__PURE__ */ jsx("span", { className: "w-6 h-px bg-[#edad1a]/60" })
          ] }),
          /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold text-[#00274d] mb-3", children: "Our Comprehensive Services" }),
          /* @__PURE__ */ jsx("p", { className: "text-[#00274d]/60 text-base md:text-lg max-w-2xl mx-auto", children: "AI-powered solutions that enhance efficiency, fuel growth, and create measurable business impact." })
        ] }),
        /* @__PURE__ */ jsx(
          motion.div,
          {
            className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5",
            variants: gridVariants,
            initial: "hidden",
            whileInView: "show",
            viewport: { once: true, margin: "-60px" },
            children: services$1.map((s, i) => {
              const card = /* @__PURE__ */ jsxs("div", { className: "group relative rounded-2xl bg-[#00274d] overflow-hidden h-full transition-all duration-300  flex flex-col", children: [
                s.image && /* @__PURE__ */ jsxs("div", { className: "relative aspect-[16/9] overflow-hidden bg-[#00274d] z-10", children: [
                  /* @__PURE__ */ jsx(
                    "img",
                    {
                      src: s.image,
                      alt: s.title,
                      className: "w-full h-full object-cover opacity-95 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500",
                      loading: "eager"
                    }
                  ),
                  /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-white/55 via-white/10 to-transparent" }),
                  /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-tr from-[#3b6fa0]/10 via-transparent to-[#cfe0f2]/25" }),
                  /* @__PURE__ */ jsx("div", { className: "absolute inset-x-0 bottom-0 h-full bg-gradient-to-b from-transparent via-[#00274d]/50 to-[#00274d]" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "relative p-5 z-10 -mt-2", children: [
                  /* @__PURE__ */ jsx("div", { className: "flex items-center gap-2.5 mb-3", children: /* @__PURE__ */ jsx("div", { className: "w-9 h-9 rounded-xl bg-[#edad1a]/20 border border-[#edad1a]/40 flex items-center justify-center flex-shrink-0 group-hover:bg-[#edad1a]/30 transition-colors", children: /* @__PURE__ */ jsx(s.icon, { className: "w-4 h-4 text-[#edad1a]" }) }) }),
                  /* @__PURE__ */ jsx("h3", { className: "text-white font-semibold text-sm leading-snug mb-2", children: s.title }),
                  /* @__PURE__ */ jsx("p", { className: "text-white/70 text-xs leading-relaxed", children: s.desc })
                ] })
              ] });
              return /* @__PURE__ */ jsx(
                motion.div,
                {
                  variants: gridItem,
                  children: s.href ? s.external ? /* @__PURE__ */ jsx("a", { href: s.href, target: "_blank", rel: "noopener noreferrer", className: "block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#edad1a] focus-visible:ring-offset-4 rounded-2xl", children: card }) : /* @__PURE__ */ jsx(Link, { href: s.href, className: "block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#edad1a] focus-visible:ring-offset-4 rounded-2xl", children: card }) : card
                },
                i
              );
            })
          }
        ),
        /* @__PURE__ */ jsx(FadeUp$3, { delay: 0.1, className: "mt-12 text-left", children: /* @__PURE__ */ jsx(Link, { href: "/services", children: /* @__PURE__ */ jsx(SiteButton, { children: "Know More" }) }) })
      ] })
    ] }),
    /* @__PURE__ */ jsx("section", { className: "py-14 md:py-20 bg-white overflow-hidden", children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto px-6 sm:px-8 lg:px-12", children: /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-2 gap-12 lg:gap-20 items-center", children: [
      /* @__PURE__ */ jsxs(FadeUp$3, { children: [
        /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-2 text-[#edad1a] text-[12px] font-bold uppercase tracking-[0.3em] mb-4", children: [
          /* @__PURE__ */ jsx("span", { className: "w-6 h-px bg-[#edad1a]/60" }),
          "Materials",
          /* @__PURE__ */ jsx("span", { className: "w-6 h-px bg-[#edad1a]/60" })
        ] }),
        /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold text-[#00274d] mb-5 max-w-lg", children: "One Destination for all Project Materials needs" }),
        /* @__PURE__ */ jsx("p", { className: "type-body-lg text-gray-600 max-w-lg mb-8", children: "Market Place to provide end-to-end requirement for all Raw Material needs for your projects." }),
        /* @__PURE__ */ jsx("div", { className: "space-y-4 max-w-lg", children: [
          { num: "01", title: "Categories", desc: "These include core inputs such as steel, cement, sand and aggregates, chemicals, and petroleum products, along with specialized categories covering civil and infrastructure materials, electrical and electronic components, fire protection systems, security solutions, solar and renewable energy equipment, and interior and architectural materials." },
          { num: "02", title: "Quality & Price", desc: "Buy all construction Raw Materials at the lowest price with quality assurance for your projects on a Single Platform." }
        ].map((p) => /* @__PURE__ */ jsxs("div", { className: "flex gap-4 p-4 rounded-xl border border-gray-100 bg-gray-50 hover:bg-white hover:shadow-sm transition-all duration-200", children: [
          /* @__PURE__ */ jsx("div", { className: "flex-shrink-0 w-9 h-9 rounded-lg bg-[#00274d] text-[#edad1a] flex items-center justify-center text-xs font-semibold", children: p.num }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { className: "type-card-title text-[#00274d] mb-1", children: p.title }),
            /* @__PURE__ */ jsx("p", { className: "text-[0.95rem] text-gray-600 leading-relaxed font-normal", children: p.desc })
          ] })
        ] }, p.num)) }),
        /* @__PURE__ */ jsx(Link, { href: "/materials", children: /* @__PURE__ */ jsx(SiteButton, { className: "mt-8", children: "Know More" }) })
      ] }),
      /* @__PURE__ */ jsx(FadeUp$3, { delay: 0.12, children: /* @__PURE__ */ jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute -inset-6 bg-[#edad1a]/6 blur-3xl" }),
        /* @__PURE__ */ jsxs("div", { className: "relative overflow-hidden rounded-2xl bg-[#082b4f] p-5 sm:p-6 shadow-2xl", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 opacity-[0.06]", style: { backgroundImage: "radial-gradient(circle at 1px 1px,#ffffff 1px,transparent 0)", backgroundSize: "24px 24px" } }),
          /* @__PURE__ */ jsxs("div", { className: "relative flex items-center justify-between mb-5", children: [
            /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("p", { className: "text-[#edad1a] text-[10px] font-bold uppercase tracking-[0.25em] mb-0.5", children: "Material" }) }),
            /* @__PURE__ */ jsxs(Link, { href: "/materials", className: "inline-flex items-center gap-1.5 rounded-full bg-[#edad1a]/15 hover:bg-[#edad1a]/25 border border-[#edad1a]/25 px-3 py-1.5 text-xs font-semibold text-[#edad1a] transition-colors", children: [
              "View All ",
              /* @__PURE__ */ jsx(ArrowUpRight, { className: "w-3 h-3" })
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "relative grid grid-cols-3 sm:grid-cols-4 gap-2.5", children: categories.slice(0, 12).map((cat) => /* @__PURE__ */ jsx(Link, { href: `/materials/${cat.slug}`, className: "group", children: /* @__PURE__ */ jsxs("div", { className: "h-full flex flex-col overflow-hidden rounded-lg border border-white/10 bg-white/8 p-1.5 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/14 hover:border-[#edad1a]/50", children: [
            /* @__PURE__ */ jsx("div", { className: "aspect-[4/3] rounded-md overflow-hidden bg-white", children: /* @__PURE__ */ jsx(
              "img",
              {
                src: cat.image,
                alt: cat.name,
                className: "w-full h-full object-cover transition-transform duration-300 group-hover:scale-105",
                loading: "eager"
              }
            ) }),
            /* @__PURE__ */ jsx("p", { className: "mt-2 text-white/80 text-[11px] leading-tight font-normal px-0.5 line-clamp-2 break-words min-h-[2.1rem]", title: cat.name, children: cat.name })
          ] }) }, cat.slug)) })
        ] })
      ] }) })
    ] }) }) }),
    /* @__PURE__ */ jsxs("section", { className: "py-16 md:py-24 bg-gray-50 overflow-hidden relative", children: [
      /* @__PURE__ */ jsxs("div", { className: "pointer-events-none absolute inset-0", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00274d]/15 to-transparent" }),
        /* @__PURE__ */ jsx("div", { className: "absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00274d]/10 to-transparent" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto px-6 sm:px-8 lg:px-12", children: /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-2 gap-12 lg:gap-20 items-center", children: [
        /* @__PURE__ */ jsx(FadeUp$3, { delay: 0.12, className: "lg:order-2", children: /* @__PURE__ */ jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute -inset-4 bg-[#00274d]/6 blur-3xl rounded-3xl" }),
          /* @__PURE__ */ jsxs("div", { className: "relative overflow-hidden rounded-3xl bg-[#00274d] p-5 sm:p-6 shadow-[0_32px_72px_-20px_rgba(0,39,77,0.45)]", children: [
            /* @__PURE__ */ jsx("div", { className: "absolute inset-0 opacity-[0.07]", style: { backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.1) 1px,transparent 1px)", backgroundSize: "28px 28px" } }),
            /* @__PURE__ */ jsx("div", { className: "absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#edad1a] via-[#f7c44a]/60 to-transparent" }),
            /* @__PURE__ */ jsxs("div", { className: "relative flex items-center justify-between mb-5", children: [
              /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("p", { className: "text-[#edad1a] text-[10px] font-bold uppercase tracking-[0.25em] mb-0.5", children: "Sectors" }) }),
              /* @__PURE__ */ jsxs(Link, { href: "/sectors", className: "inline-flex items-center gap-1.5 rounded-full bg-[#edad1a]/15 hover:bg-[#edad1a]/25 border border-[#edad1a]/25 px-3 py-1.5 text-xs font-semibold text-[#edad1a] transition-colors", children: [
                "View All ",
                /* @__PURE__ */ jsx(ArrowUpRight, { className: "w-3 h-3" })
              ] })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "relative grid grid-cols-3 sm:grid-cols-4 gap-2", children: sectors.slice(0, 12).map((sector) => /* @__PURE__ */ jsx(Link, { href: `/sectors/${sector.slug}`, className: "group", children: /* @__PURE__ */ jsxs("div", { className: "h-full flex flex-col overflow-hidden rounded-xl border border-white/10 bg-white/[0.06] p-1.5 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/[0.12] hover:border-[#edad1a]/40 hover:shadow-[0_8px_20px_-8px_rgba(237,173,26,0.3)]", children: [
              /* @__PURE__ */ jsx("div", { className: "aspect-[4/3] rounded-md overflow-hidden", children: /* @__PURE__ */ jsx(
                "img",
                {
                  src: sector.image,
                  alt: sector.name,
                  className: "w-full h-full object-cover transition-transform duration-300 group-hover:scale-110",
                  loading: "eager"
                }
              ) }),
              /* @__PURE__ */ jsx("p", { className: "mt-1.5 text-white/75 group-hover:text-white text-[10.5px] leading-tight font-medium px-0.5 line-clamp-2 break-words min-h-[2rem] transition-colors", title: sector.name, children: sector.name })
            ] }) }, sector.slug)) })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxs(FadeUp$3, { className: "lg:order-1", children: [
          /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-2 text-[#edad1a] text-[12px] font-bold uppercase tracking-[0.3em] mb-4", children: [
            /* @__PURE__ */ jsx("span", { className: "w-6 h-px bg-[#edad1a]/60" }),
            "Sectors",
            /* @__PURE__ */ jsx("span", { className: "w-6 h-px bg-[#edad1a]/60" })
          ] }),
          /* @__PURE__ */ jsxs("h2", { className: "text-3xl sm:text-4xl font-bold text-[#00274d] leading-tight mb-4 max-w-lg", children: [
            "One Platform for ",
            /* @__PURE__ */ jsx("span", { className: "text-[#edad1a]", children: "20+" }),
            " Infrastructure Sectors"
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-500 text-[15px] leading-relaxed max-w-md mb-8", children: "We cover all major Sectors of the Infrastructure, Construction & Manufacturing Industry." }),
          /* @__PURE__ */ jsx("div", { className: "space-y-6 max-w-xl mb-8", children: [
            { num: "01", title: "Sectors", desc: "Vendor Infra serves a wide range of infrastructure sectors including roads & bridges, urban transport, railways, transmission lines and substations, airports, industrial corridors, smart cities, ports, water & wastewater, renewable energy, power, buildings & industrial projects, oil & gas, irrigation & tunneling, and solid waste management." },
            { num: "02", title: "Seamless Collaboration for all Stakeholders across sectors", desc: "This broad sector coverage enables companies and vendors to discover opportunities, collaborate, and execute projects across diverse domains through a single platform." }
          ].map((p) => /* @__PURE__ */ jsxs(
            "div",
            {
              className: "flex gap-4 p-4 rounded-xl border border-gray-100 bg-white hover:bg-white hover:shadow-sm transition-all duration-200",
              children: [
                /* @__PURE__ */ jsx("div", { className: "flex-shrink-0 w-9 h-9 rounded-lg bg-[#00274d] text-[#edad1a] flex items-center justify-center text-xs font-semibold", children: p.num }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("h3", { className: "type-card-title text-[#00274d] mb-1", children: p.title }),
                  /* @__PURE__ */ jsx("p", { className: "text-[0.95rem] text-gray-600 leading-relaxed font-normal", children: p.desc })
                ] })
              ]
            },
            p.num
          )) }),
          /* @__PURE__ */ jsx(Link, { href: "/sectors", children: /* @__PURE__ */ jsx(SiteButton, { children: "Know More" }) })
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsx("section", { className: "py-14 md:py-20 bg-white", children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto px-6 sm:px-8 lg:px-12", children: /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-2 gap-12 lg:gap-20 items-start", children: [
      /* @__PURE__ */ jsxs(FadeUp$3, { children: [
        /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-2 text-[#edad1a] text-[12px] font-bold uppercase tracking-[0.3em] mb-4", children: [
          /* @__PURE__ */ jsx("span", { className: "w-6 h-px bg-[#edad1a]/60" }),
          "Why Us",
          /* @__PURE__ */ jsx("span", { className: "w-6 h-px bg-[#edad1a]/60" })
        ] }),
        /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold text-[#00274d] leading-tight mb-5 max-w-lg", children: "Everything you need to know about our Platform" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-500 text-base leading-relaxed font-normal max-w-lg mb-8", children: "From discovery to delivery, we digitize every step — giving vendors the exposure they deserve and contractors the reliability they demand." }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-3 divide-x divide-[#00274d] border-y border-[#00274d] max-w-md mb-8", children: [
          { value: "20+", label: "Sectors" },
          { value: "31K+", label: "Vendors" },
          { value: "24×7", label: "Support" }
        ].map((item2) => /* @__PURE__ */ jsxs("div", { className: "py-5 px-3 text-center", children: [
          /* @__PURE__ */ jsx("p", { className: "text-2xl font-bold text-[#00274d] leading-none tabular-nums", children: item2.value }),
          /* @__PURE__ */ jsx("p", { className: "text-[11px] font-medium uppercase tracking-wider text-gray-400 mt-2", children: item2.label })
        ] }, item2.label)) }),
        /* @__PURE__ */ jsx(Link, { href: "/why-us", children: /* @__PURE__ */ jsx(SiteButton, { children: "Know More" }) })
      ] }),
      /* @__PURE__ */ jsx(FadeUp$3, { delay: 0.12, children: /* @__PURE__ */ jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute -inset-6 bg-[#edad1a]/6 blur-3xl" }),
        /* @__PURE__ */ jsxs("div", { className: "relative overflow-hidden rounded-2xl bg-white border border-[#00274d] p-5 sm:p-6 shadow-xl", children: [
          /* @__PURE__ */ jsxs("div", { className: "relative flex items-center justify-between mb-5", children: [
            /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("h3", { className: "text-[#00274d] text-xl font-semibold leading-tight mt-1", children: "Why Vendor Infra" }) }),
            /* @__PURE__ */ jsxs(Link, { href: "/why-us", className: "inline-flex items-center gap-1.5 rounded-full bg-[#00274d] hover:bg-[#003a73] border border-[#00274d] px-3 py-1.5 text-xs font-semibold text-white transition-colors", children: [
              "View All ",
              /* @__PURE__ */ jsx(ArrowUpRight, { className: "w-3 h-3" })
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "relative grid grid-cols-1 sm:grid-cols-2 gap-2.5", children: whyPoints.map((p, i) => /* @__PURE__ */ jsx(
            "div",
            {
              className: "rounded-lg border border-gray-100 bg-gray-50 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-sm hover:border-[#edad1a]/40",
              children: /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
                /* @__PURE__ */ jsx("div", { className: "flex-shrink-0 w-9 h-9 rounded-lg bg-[#00274d] text-[#edad1a] flex items-center justify-center text-xs font-semibold", children: String(i + 1).padStart(2, "0") }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("h4", { className: "text-sm font-medium leading-snug mb-1 text-[#00274d]", children: p.title }),
                  /* @__PURE__ */ jsx("p", { className: "text-xs leading-relaxed font-normal text-gray-400", children: p.desc })
                ] })
              ] })
            },
            p.title
          )) })
        ] })
      ] }) })
    ] }) }) }),
    /* @__PURE__ */ jsxs("section", { className: "py-16 md:py-24 bg-[#00274d] relative overflow-hidden", children: [
      /* @__PURE__ */ jsxs("div", { className: "pointer-events-none absolute inset-0", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full bg-[#021a36]/70 blur-[90px]" }),
        /* @__PURE__ */ jsx("div", { className: "absolute -bottom-24 -left-24 w-[320px] h-[320px] rounded-full bg-[#edad1a]/[0.04] blur-[70px]" }),
        /* @__PURE__ */ jsx("div", { className: "absolute -bottom-24 -right-24 w-[320px] h-[320px] rounded-full bg-[#021a36]/50 blur-[70px]" }),
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 opacity-[0.035]", style: { backgroundImage: "linear-gradient(rgba(255,255,255,0.12) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.12) 1px,transparent 1px)", backgroundSize: "44px 44px" } }),
        /* @__PURE__ */ jsx("div", { className: "absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#edad1a]/40 to-transparent" }),
        /* @__PURE__ */ jsx("div", { className: "absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#edad1a]/20 to-transparent" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "relative max-w-5xl mx-auto px-6 sm:px-8 lg:px-12", children: [
        /* @__PURE__ */ jsxs(FadeUp$3, { className: "text-center mb-14", children: [
          /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-2 text-[#edad1a] text-[12px] font-bold uppercase tracking-[0.3em] mb-4", children: [
            /* @__PURE__ */ jsx("span", { className: "w-6 h-px bg-[#edad1a]/60" }),
            "Testimonials",
            /* @__PURE__ */ jsx("span", { className: "w-6 h-px bg-[#edad1a]/60" })
          ] }),
          /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold text-white", children: "What Our Clients Say" }),
          /* @__PURE__ */ jsx("p", { className: "mt-3 text-white/45 text-sm max-w-md mx-auto", children: "Trusted by industry leaders across Infrastructure, Construction & Manufacturing Industry" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsx(AnimatePresence, { mode: "wait", children: testimonials.map(
            (t, i) => i === activeTestimonial ? /* @__PURE__ */ jsxs(
              motion.div,
              {
                initial: { opacity: 0, y: 16 },
                animate: { opacity: 1, y: 0 },
                exit: { opacity: 0, y: -16 },
                transition: { duration: 0.4, ease: "easeInOut" },
                className: "relative rounded-3xl bg-[#021a36]/70 backdrop-blur-md border border-white/[0.09] shadow-[0_32px_80px_-24px_rgba(0,0,0,0.65)] overflow-hidden",
                children: [
                  /* @__PURE__ */ jsx("div", { className: "absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#edad1a] via-[#f7c44a]/60 to-transparent" }),
                  /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row gap-0", children: [
                    /* @__PURE__ */ jsxs("div", { className: "md:w-56 flex-shrink-0 flex flex-col items-center justify-center gap-4 p-8 md:p-10 md:border-r border-white/[0.08]", children: [
                      /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                        /* @__PURE__ */ jsx("div", { className: "w-24 h-24 rounded-full overflow-hidden ring-[3px] ring-[#edad1a]/60 shadow-[0_0_28px_rgba(237,173,26,0.35)]", children: /* @__PURE__ */ jsx("img", { src: t.image, alt: t.name, className: "w-full h-full object-cover" }) }),
                        /* @__PURE__ */ jsx("div", { className: "absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-[#edad1a] flex items-center justify-center shadow-lg border-1 border-[#00274d]", children: /* @__PURE__ */ jsx(CheckCircle2, { className: "w-3.5 h-3.5 text-[#00274d]" }) })
                      ] }),
                      /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
                        /* @__PURE__ */ jsx("p", { className: "text-white font-semibold text-sm leading-snug", children: t.name }),
                        /* @__PURE__ */ jsx("p", { className: "text-white/45 text-[10.5px] mt-1.5 leading-relaxed", children: t.role })
                      ] }),
                      /* @__PURE__ */ jsx("div", { className: "flex gap-0.5", children: Array.from({ length: 5 }).map((_, j) => /* @__PURE__ */ jsx(Star, { className: "w-3.5 h-3.5 text-[#edad1a] fill-[#edad1a]" }, j)) })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "flex-1 p-8 md:p-10 flex flex-col justify-center relative", children: [
                      /* @__PURE__ */ jsx("div", { "aria-hidden": true, className: "absolute top-6 right-8 text-[#edad1a]/10 text-[100px] font-serif leading-none select-none pointer-events-none", children: '"' }),
                      /* @__PURE__ */ jsxs("blockquote", { className: "relative text-white/80 text-base md:text-[16.5px] leading-[1.85] font-light", children: [
                        '"',
                        t.text,
                        '"'
                      ] }),
                      /* @__PURE__ */ jsx("div", { className: "mt-6 w-10 h-[2px] bg-gradient-to-r from-[#edad1a] to-[#edad1a]/30 rounded-full" })
                    ] })
                  ] })
                ]
              },
              i
            ) : null
          ) }),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => setActiveTestimonial((p) => (p - 1 + testimonials.length) % testimonials.length),
              className: "absolute left-0 top-1/2 -translate-y-1/2 -translate-x-5 w-10 h-10 rounded-full bg-[#00274d] border border-white/15 flex items-center justify-center text-white/60 hover:bg-[#edad1a] hover:border-[#edad1a] hover:text-[#00274d] transition-all duration-250 shadow-lg hidden md:flex",
              children: /* @__PURE__ */ jsx(ChevronLeft, { className: "w-4 h-4" })
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => setActiveTestimonial((p) => (p + 1) % testimonials.length),
              className: "absolute right-0 top-1/2 -translate-y-1/2 translate-x-5 w-10 h-10 rounded-full bg-[#00274d] border border-white/15 flex items-center justify-center text-white/60 hover:bg-[#edad1a] hover:border-[#edad1a] hover:text-[#00274d] transition-all duration-250 shadow-lg hidden md:flex",
              children: /* @__PURE__ */ jsx(ChevronRight, { className: "w-4 h-4" })
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-10 flex flex-col items-center gap-5", children: [
          /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center gap-2.5", children: testimonials.map((t, i) => /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => setActiveTestimonial(i),
              title: t.name,
              className: `rounded-full overflow-hidden border-1 transition-all duration-300 ${i === activeTestimonial ? "border-[#edad1a] w-11 h-11 shadow-[0_0_14px_rgba(237,173,26,0.45)] opacity-100" : "border-white/15 w-8 h-8 opacity-40 hover:opacity-70 hover:border-white/40"}`,
              children: /* @__PURE__ */ jsx("img", { src: t.image, alt: t.name, className: "w-full h-full object-cover" })
            },
            i
          )) }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 md:hidden", children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => setActiveTestimonial((p) => (p - 1 + testimonials.length) % testimonials.length),
                className: "w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-white/50 hover:text-white transition-all",
                children: /* @__PURE__ */ jsx(ChevronLeft, { className: "w-4 h-4" })
              }
            ),
            testimonials.map((_, i) => /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => setActiveTestimonial(i),
                className: `rounded-full transition-all duration-300 ${i === activeTestimonial ? "bg-[#edad1a] w-5 h-1.5" : "bg-white/25 w-1.5 h-1.5 hover:bg-white/50"}`
              },
              i
            )),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => setActiveTestimonial((p) => (p + 1) % testimonials.length),
                className: "w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-white/50 hover:text-white transition-all",
                children: /* @__PURE__ */ jsx(ChevronRight, { className: "w-4 h-4" })
              }
            )
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("section", { className: "py-14 md:py-20 bg-white", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-6 sm:px-8 lg:px-12", children: [
      /* @__PURE__ */ jsx("div", { className: "flex flex-col items-center text-center mb-14", children: /* @__PURE__ */ jsxs(FadeUp$3, { children: [
        /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-2 text-[#edad1a] text-[12px] font-bold uppercase tracking-[0.3em] mb-4", children: [
          /* @__PURE__ */ jsx("span", { className: "w-6 h-px bg-[#edad1a]/60" }),
          "Blog",
          /* @__PURE__ */ jsx("span", { className: "w-6 h-px bg-[#edad1a]/60" })
        ] }),
        /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold text-[#00274d] max-w-2xl mx-auto leading-tight", children: "Trends, Technologies & Developments in the Infrastructure, Construction & Manufacturing Industry" }),
        /* @__PURE__ */ jsx("p", { className: "text-[#00274d]/60 text-base md:text-lg max-w-2xl mx-auto mt-4", children: "Empowering growth through knowledge, innovation, and insights" })
      ] }) }),
      /* @__PURE__ */ jsx(
        motion.div,
        {
          className: "grid grid-cols-1 md:grid-cols-3 gap-7",
          variants: gridVariants,
          initial: "hidden",
          whileInView: "show",
          viewport: { once: true, margin: "-50px" },
          children: blogs.map((b, i) => /* @__PURE__ */ jsx(motion.div, { variants: gridItem, children: /* @__PURE__ */ jsx(Link, { href: "/blog", children: /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl overflow-hidden shadow-sm  border-1 border-[#00274d] hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group h-full flex flex-col cursor-pointer", children: [
            /* @__PURE__ */ jsx("div", { className: "overflow-hidden h-48 bg-gray-100", children: /* @__PURE__ */ jsx(
              "img",
              {
                src: b.img,
                alt: b.title,
                className: "w-full h-full object-cover transition-transform duration-500 group-hover:scale-105",
                loading: "eager"
              }
            ) }),
            /* @__PURE__ */ jsxs("div", { className: "p-5 flex flex-col flex-1", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mb-3", children: [
                /* @__PURE__ */ jsx("span", { className: "text-[10px] font-medium text-[#edad1a] bg-[#edad1a]/8 border border-[#edad1a]/15 px-2.5 py-1 rounded-full", children: b.cat }),
                /* @__PURE__ */ jsx("span", { className: "text-gray-300 text-xs font-normal", children: b.date })
              ] }),
              /* @__PURE__ */ jsx("h3", { className: "font-medium text-[#00274d] text-sm leading-snug mb-2 flex-1 line-clamp-2", children: b.title }),
              /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-xs leading-relaxed font-normal line-clamp-2", children: b.excerpt }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1 mt-4 text-[#edad1a] text-xs font-medium", children: [
                "Read More ",
                /* @__PURE__ */ jsx(ArrowRight, { className: "w-3 h-3" })
              ] })
            ] })
          ] }) }) }, i))
        }
      ),
      /* @__PURE__ */ jsx(FadeUp$3, { delay: 0.1, className: "mt-12 text-left", children: /* @__PURE__ */ jsx(Link, { href: "/blog", children: /* @__PURE__ */ jsx(SiteButton, { children: "Know More" }) }) })
    ] }) }),
    /* @__PURE__ */ jsxs("section", { className: "relative overflow-hidden bg-[#00274d] py-20", children: [
      /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute inset-0 opacity-[0.5]", style: { backgroundImage: "linear-gradient(rgba(255,255,255,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.06) 1px,transparent 1px)", backgroundSize: "44px 44px" } }),
      /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-[60%] h-72 rounded-full bg-[#edad1a]/[0.08] blur-3xl" }),
      /* @__PURE__ */ jsx("div", { className: "relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-16", children: [
        { title: "Trusted By", subtitle: "Chosen by the companies building India's National Infrastructure pipeline.", logos: trustedBy$1 },
        { title: "Associations", subtitle: "We are Proud to be a part of", logos: associations },
        { title: "Our Financing Partners", subtitle: "Who help us drive innovation in the Supply Chain Financing", logos: financingPartners }
      ].map((block) => /* @__PURE__ */ jsx(FadeUp$3, { children: /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-12 gap-6 lg:gap-10 items-center", children: [
        /* @__PURE__ */ jsxs("div", { className: "lg:col-span-3 text-left", children: [
          /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-2 text-[#edad1a] text-[12px] font-bold uppercase tracking-[0.3em] mb-4", children: [
            /* @__PURE__ */ jsx("span", { className: "w-6 h-px bg-[#edad1a]/60" }),
            block.title,
            /* @__PURE__ */ jsx("span", { className: "w-6 h-px bg-[#edad1a]/60" })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-white/75 text-base leading-relaxed max-w-xs", children: block.subtitle })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "lg:col-span-9", children: /* @__PURE__ */ jsxs("div", { className: "relative rounded-3xl bg-white border border-white/15 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.6)] p-4 md:p-5 overflow-hidden", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-[#edad1a] via-[#f7bc2e] to-transparent" }),
          /* @__PURE__ */ jsx(LogoMarquee$1, { logos: block.logos })
        ] }) })
      ] }) }, block.title)) })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "py-14 md:py-20 bg-white relative overflow-hidden", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 opacity-[0.5]", style: { backgroundImage: "radial-gradient(circle at 1px 1px, rgba(0,39,77,0.12) 1px, transparent 0)", backgroundSize: "28px 28px" } }),
      /* @__PURE__ */ jsxs("div", { className: "relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12", children: [
        /* @__PURE__ */ jsxs(FadeUp$3, { className: "text-center mb-12", children: [
          /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-2 text-[#edad1a] text-[12px] font-bold uppercase tracking-[0.3em] mb-4", children: [
            /* @__PURE__ */ jsx("span", { className: "w-6 h-px bg-[#edad1a]/60" }),
            "Awards & Recognitions",
            /* @__PURE__ */ jsx("span", { className: "w-6 h-px bg-[#edad1a]/60" })
          ] }),
          /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold text-[#00274d] mb-4", children: "Recognized for Innovation, Impact, and Excellence" }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-600 text-base font-normal max-w-2xl mx-auto", children: "Vendor Infra has earned recognition from leading industry, technology, and entrepreneurship platforms for driving innovation and transforming the infrastructure ecosystem." })
        ] }),
        /* @__PURE__ */ jsx(
          motion.div,
          {
            className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5",
            variants: gridVariants,
            initial: "hidden",
            whileInView: "show",
            viewport: { once: true, margin: "-50px" },
            children: awards.map((award) => /* @__PURE__ */ jsx(motion.div, { variants: gridItem, children: /* @__PURE__ */ jsxs("div", { className: "h-full rounded-2xl border border-[#00274d]/10 bg-[#00274d] p-5 hover:border-[#edad1a]/60 hover:bg-[#0a3463] hover:-translate-y-1 transition-all duration-300 shadow-lg shadow-[#00274d]/20", children: [
              /* @__PURE__ */ jsx("div", { className: `h-28 rounded-xl px-5 py-4 flex items-center justify-center overflow-hidden ${award.dark ? "bg-black" : "bg-white"}`, children: /* @__PURE__ */ jsx(
                "img",
                {
                  src: award.image,
                  alt: award.name,
                  className: "max-h-16 max-w-full object-contain",
                  loading: "lazy"
                }
              ) }),
              /* @__PURE__ */ jsx("p", { className: "text-[11px] font-semibold uppercase tracking-widest text-[#edad1a] mt-5 mb-2", children: award.label }),
              /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-white leading-snug", children: award.name })
            ] }) }, award.name))
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsx(
      "section",
      {
        className: "bg-[#edad1a] py-16 relative",
        style: {
          backgroundImage: "radial-gradient(rgba(0,39,77,0.18) 1px, transparent 1px)",
          backgroundSize: "22px 22px"
        },
        children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-3xl mx-auto text-center", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center gap-3 mb-5", children: [
            /* @__PURE__ */ jsx("span", { className: "h-px w-10 bg-[#00274d]/40" }),
            /* @__PURE__ */ jsx("span", { className: "text-xs md:text-sm font-bold tracking-[0.3em] text-[#00274d]", children: "GET STARTED TODAY" }),
            /* @__PURE__ */ jsx("span", { className: "h-px w-10 bg-[#00274d]/40" })
          ] }),
          /* @__PURE__ */ jsx("h2", { className: "text-2xl md:text-3xl font-bold text-[#00274d] mb-3", children: "Ready to Grow and Transform your Business?" }),
          /* @__PURE__ */ jsxs("p", { className: "text-[#00274d]/85 mb-6 text-sm md:text-base", children: [
            "Join ",
            /* @__PURE__ */ jsx("span", { className: "font-semibold", children: "32,000+" }),
            " contractors, vendors, manufacturers, suppliers, and consultants already using Vendor Infra to discover new opportunities, streamline procurement, acesss plants and equipment solutions, and secure project financing and insurance—all through a single integrated platform."
          ] }),
          /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-3 justify-center items-center", children: /* @__PURE__ */ jsx(
            "a",
            {
              href: PORTAL_REGISTER_URL$7,
              target: "_blank",
              rel: "noopener noreferrer",
              children: /* @__PURE__ */ jsx(SiteButton, { variant: "onGold", className: "normal-case tracking-normal", children: "Join Now" })
            }
          ) })
        ] }) })
      }
    ),
    /* @__PURE__ */ jsx(Footer, {}),
    /* @__PURE__ */ jsx(
      ContactSalesModal,
      {
        open: contactOpen,
        onClose: () => setContactOpen(false),
        planName: contactPlan
      }
    )
  ] });
}
const DEFAULT_TITLE = "Vendor Infra | Vendor Management & Procurement Platform";
const DEFAULT_DESCRIPTION = "Discover vendors, procure materials & access real-time market intelligence. India's #1 platform for contractors and EPC companies.";
function getOgImageUrl() {
  return `${window.location.origin}/og-image.jpg`;
}
function setPageSeo({
  title,
  description,
  ogImage
}) {
  document.title = title;
  const setMeta = (name, content, isOg = false) => {
    const attr = isOg ? "property" : "name";
    let el = document.querySelector(`meta[${attr}="${name}"]`);
    if (!el) {
      el = document.createElement("meta");
      el.setAttribute(attr, name);
      document.head.appendChild(el);
    }
    el.setAttribute("content", content);
  };
  const desc = description ?? DEFAULT_DESCRIPTION;
  const image = ogImage ?? getOgImageUrl();
  const url = window.location.href;
  setMeta("description", desc);
  setMeta("og:title", title, true);
  setMeta("og:description", desc, true);
  setMeta("og:image", image, true);
  setMeta("og:image:width", "1200", true);
  setMeta("og:image:height", "630", true);
  setMeta("og:url", url, true);
  setMeta("og:type", "website", true);
  setMeta("og:site_name", "Vendor Infra", true);
  setMeta("twitter:card", "summary_large_image");
  setMeta("twitter:title", title);
  setMeta("twitter:description", desc);
  setMeta("twitter:image", image);
}
function resetPageSeo() {
  setPageSeo({ title: DEFAULT_TITLE, description: DEFAULT_DESCRIPTION });
}
function usePageSeo(title, description) {
  useEffect(() => {
    setPageSeo({ title, description });
    return () => resetPageSeo();
  }, [title, description]);
}
const base = "/";
const PORTAL_REGISTER_URL$6 = "http://3.110.208.157/customer/";
const trustedBy = [
  { name: "Adani Group", logo: "/logos/Adani-Group.png" },
  { name: "NCC", logo: "/logos/NCC.png" },
  { name: "Tata Projects", logo: "/logos/tata-projects.png" },
  { name: "JWIL", logo: "/logos/JWIL.jpg" },
  { name: "Gawar", logo: "/logos/Gawar.png" },
  { name: "JMC Projects", logo: "/logos/jmc-projects.png" },
  { name: "Dilip Buildcon", logo: "/logos/DBL.png" },
  { name: "INOX Wind", logo: "/logos/inox-wind.png" },
  { name: "IndInfravit", logo: "/logos/Indinfravit.png" },
  { name: "KEC", logo: "/logos/kec.png" },
  { name: "Kalpataru", logo: "/logos/KPILLOGO.png" },
  { name: "IRB Infra", logo: "/logos/IRB-logo.jpg" }
];
function LogoMarquee({ logos }) {
  const doubled = [...logos, ...logos];
  return /* @__PURE__ */ jsxs("div", { className: "relative overflow-hidden", children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "flex gap-8 items-center",
        style: { animation: "marquee 28s linear infinite", width: "max-content" },
        children: doubled.map((l, i) => /* @__PURE__ */ jsx(
          "div",
          {
            className: "flex-shrink-0 flex items-center justify-center h-14 px-5 bg-white rounded-xl border border-gray-100 shadow-sm hover:scale-105 transition-transform duration-200",
            style: { minWidth: 120 },
            children: /* @__PURE__ */ jsx("img", { src: l.logo, alt: l.name, className: "max-h-10 max-w-[110px] object-contain", loading: "eager" })
          },
          i
        ))
      }
    ),
    /* @__PURE__ */ jsx("style", { children: `@keyframes marquee{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}` })
  ] });
}
const usps = [
  {
    title: "End to End Value Chain Integration",
    image: "/images/wp/ValueChain.png",
    desc: "From vendor discovery and material procurement to financing, insurance and plant & equipment hire/sales, we provide a full-stack AI powered platform that bridges every gap in infrastructure & construction. No more juggling multiple tools or vendors."
  },
  {
    title: "Single Unified Data Lake",
    image: "/images/wp/unified.png",
    desc: "One unified data lake for all project, procurement, vendor, and site data-fully unified and instantly accessible. Eliminate silos, improve decision-making, and run your entire project ecosystem with real-time intelligence."
  },
  {
    title: "Smart Decision Support via Market Intelligence",
    image: "/images/wp/SmartDecision.png",
    desc: "Sector insights, Industry Updates, schedules of rates, competitive intelligence, tender & PQ samples. We provide you context & foresight so you can plan strategically, not just reactively."
  },
  {
    title: "AI & ML-Driven Insights",
    image: "/images/wp/AI-ML.png",
    desc: "Vendor Infra leverages Artificial Intelligence and Machine Learning to match you with the best-suited requirement and generate real-time analytics for smarter, data-backed decisions."
  },
  {
    title: "Safety, Security & Trust built in",
    image: "/images/wp/safety.png",
    desc: "Every vendor and supplier is vetted. Data security is paramount. We ensure the platform and your data adhere to high standards so your decisions are reliable, protected and scalable."
  },
  {
    title: "Dedicated Support & Accountability",
    image: "/images/wp/support.png",
    desc: "Our team is available round-the-clock. Beyond just tech support, we assign dedicated account managers (or equivalents) to guide you at every stage so that deadlines aren't just met, but exceeded."
  }
];
const management = [
  { name: "Rahul Jain", role: "Founder & CEO", photo: "about-members/2025-11-10.png", linkedin: "https://www.linkedin.com/in/rahuljainbd/" },
  { name: "Rupali Jain", role: "Co Founder", photo: "about-members/2025-11-11.png", linkedin: "https://www.linkedin.com/in/roopali-jain-1484a3200/" },
  { name: "Sukhdeep Bhogal", role: "Advisor - Product & Engineering", photo: "about-members/2025-11-VI-employee-photos-1.png", linkedin: "https://www.linkedin.com/in/sukhdeepbhogal1/" },
  { name: "Munish Gupta", role: "Advisor - Finance & Accounts", photo: "about-members/2025-11-12.png", linkedin: "https://www.linkedin.com/in/munishgupta06/" }
];
const advisory = [
  { name: "Shailendra Kumar Tripathi", role: "MD & CEO, JMC Project (India) Limited - Kalpataru Group", photo: "about-members/2025-11-1.png", linkedin: "https://www.linkedin.com/in/shailendra-kumar-tripathi-866330106/" },
  { name: "Sanjeev Kumar Gupta", role: "CEO-KEDM | Ex MD & CEO Lahari (GOI) | Ex Accenture, Microsoft, IBM", photo: "about-members/2025-11-4.png", linkedin: "https://www.linkedin.com/in/sanjeevkgupta/" },
  { name: "Amit Jain", role: "Sales Director, HoneyWell", photo: "about-members/2025-11-VI-employee-photos-13.png", linkedin: "https://www.linkedin.com/in/amit-jain-0b27651b/" },
  { name: "Nitin Jain", role: "Head Corporate Center, L&T | Ex Sr. VP Kalpataru", photo: "about-members/2025-11-2.png", linkedin: "https://www.linkedin.com/in/njain2000/" }
];
const team = [
  { name: "Shashi Sharma", role: "Human Resources", tag: "HR", photo: "about-members/2025-11-16-1.png", linkedin: "https://www.linkedin.com/in/shashi-sharma-b4965520" },
  { name: "Kartikay Sihna", role: "Procurement", tag: "Procurement", photo: "about-members/2025-11-17.png", linkedin: "https://www.linkedin.com/in/kartikay-s-21402513b" },
  { name: "Tanay Singh", role: "Product & Marketing", tag: "Product", photo: "about-members/2024-01-VI-employee-photos-14.png", linkedin: "https://www.linkedin.com/in/tanaysingh07/" },
  { name: "Abhishek Srivastav", role: "Procurement", tag: "Procurement", photo: "about-members/2026-03-2.png", linkedin: "https://www.linkedin.com/in/abhishek-srivastav-01495a119" },
  { name: "Shaurya Sonu", role: "Finance & Accounts", tag: "Finance", photo: "about-members/2026-03-3.png", linkedin: "https://www.linkedin.com/in/shaurya-sonu-840aa8247" },
  { name: "Ashutosh Pandey", role: "Procurement", tag: "Procurement", photo: "about-members/2025-11-26.png", linkedin: "https://www.linkedin.com/in/ashutosh-pandey-83889945/" },
  { name: "Astha Tiwari", role: "Human Resources", tag: "HR", photo: "about-members/2025-11-VI-employee-photos-12.png", linkedin: "https://www.linkedin.com/in/astha-tiwari-6990511b2/" },
  { name: "Aman Goyal", role: "Finance", tag: "Finance", photo: "about-members/2025-11-22.png", linkedin: "https://www.linkedin.com/in/amangoyal824" },
  { name: "Rajat Singh", role: "Supplier Relations", tag: "Operations", photo: "about-members/2026-03-5.png", linkedin: "https://www.linkedin.com/in/rajat-singh-3b010a145" },
  { name: "Rajni Kumar", role: "Product & IT", tag: "Product & IT", photo: "about-members/2025-11-VI-employee-photos-16.png", linkedin: "https://www.linkedin.com/in/rajni-kumar-628477123" },
  { name: "Praveen Bhutani", role: "Software Developer", tag: "Engineering", photo: "about-members/praveen-bhutani.png", linkedin: "https://www.linkedin.com/in/praveen-bhutani/" },
  { name: "Utkarsh Kashyap", role: "Strategy & IR", tag: "Strategy", photo: "about-members/2025-11-19.png", linkedin: "https://www.linkedin.com/in/utkarsh-kashyap/" },
  { name: "Pawanpreet Singh", role: "Procurement", tag: "Procurement", photo: "about-members/2025-11-25.png", linkedin: "https://www.linkedin.com/in/pawanpreet-singh-b68b7b3b3/" },
  { name: "Deepak Kumar", role: "Supplier Relations", tag: "Operations", photo: "about-members/deepak-kumar.png", linkedin: "https://www.linkedin.com/in/deepak-kumar-89702321b" },
  { name: "Rahul Maurya", role: "Accounts", tag: "Accounts", photo: "about-members/2025-11-VI-employee-photos-20.png", linkedin: "https://www.linkedin.com/in/rahul-maurya-indirect-taxation%F0%9F%8F%A6-b8b566280/" },
  { name: "Ankit Yadav", role: "Data Optimization", tag: "Data", photo: "about-members/2025-11-27.png", linkedin: "https://www.linkedin.com/in/yashika-nimh-9bab51271/" },
  { name: "Kaushal Kumar", role: "Supplier Relations", tag: "Operations", photo: "about-members/2025-12-VI-employee-photos-4.png", linkedin: "https://www.linkedin.com/in/kaushal-kumar-166a0b347" },
  { name: "Yashika Nimesh", role: "Data Optimization", tag: "Data", photo: "about-members/2026-03-1.png", linkedin: "https://www.linkedin.com/in/yashika-nimesh-9bab51271/" },
  { name: "Shruti Mohrya", role: "Data Optimization", tag: "Data", photo: "about-members/2025-12-VI-employee-photos-6.png", linkedin: "https://www.linkedin.com/in/shruti-mohrya-7a03b3327" },
  { name: "Yojit Pareek", role: "Legal & Compliance", tag: "Legal", photo: "about-members/2025-11-14.png", linkedin: "https://www.linkedin.com/in/yojit-pareek-b41a0080/" }
];
const tagColors = {
  HR: "bg-pink-100 text-pink-700",
  Strategy: "bg-purple-100 text-purple-700",
  Procurement: "bg-orange-100 text-orange-700",
  Product: "bg-[#fef9e0] text-[#00274d]",
  "Product & IT": "bg-[#fef9e0] text-[#00274d]",
  Engineering: "bg-blue-100 text-blue-700",
  Finance: "bg-green-100 text-green-700",
  Operations: "bg-[#fef9e0] text-[#8A3F00]",
  Accounts: "bg-teal-100 text-teal-700",
  Data: "bg-indigo-100 text-indigo-700",
  Legal: "bg-red-100 text-red-700"
};
function About() {
  usePageSeo("About Us | Vendor Infra", "Transforming the Infrastructure, Construction and Manufacturing industry. Built on Trust and Reliability with AI and ML.");
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen flex flex-col", children: [
    /* @__PURE__ */ jsx(Navbar, {}),
    /* @__PURE__ */ jsxs("main", { className: "flex-1", children: [
      /* @__PURE__ */ jsxs("section", { "data-preserve-hero-typography": true, className: "relative bg-[#00274d] text-white py-24 overflow-hidden", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 opacity-[0.08] bg-[radial-gradient(circle_at_1px_1px,#ffffff_1px,transparent_0)] bg-[size:40px_40px]" }),
        /* @__PURE__ */ jsxs("div", { className: "relative z-10 text-center px-4 max-w-4xl mx-auto", children: [
          /* @__PURE__ */ jsx(motion.div, { initial: { opacity: 0, y: -10 }, animate: { opacity: 1, y: 0 }, className: "inline-flex items-center gap-2 rounded-full border border-[#edad1a]/40 bg-[#edad1a]/10 px-4 py-2 text-sm font-semibold text-[#edad1a] mb-6", children: "About Us" }),
          /* @__PURE__ */ jsx(motion.h1, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.1 }, className: "text-4xl md:text-5xl font-semibold leading-tight tracking-tight mb-6", children: "Transforming the Infrastructure, Construction and Manufacturing industry" })
        ] })
      ] }),
      /* @__PURE__ */ jsx("section", { className: "py-24 bg-white", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 xl:px-12", children: [
        /* @__PURE__ */ jsxs("div", { className: "text-center max-w-3xl mx-auto mb-14", children: [
          /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-2 text-[#edad1a] text-[12px] font-bold uppercase tracking-[0.3em] mb-4", children: [
            /* @__PURE__ */ jsx("span", { className: "w-6 h-px bg-[#edad1a]/60" }),
            "About Vendor Infra",
            /* @__PURE__ */ jsx("span", { className: "w-6 h-px bg-[#edad1a]/60" })
          ] }),
          /* @__PURE__ */ jsxs("h2", { className: "text-3xl md:text-4xl font-bold text-[#00274d] leading-tight text-balance", children: [
            "The Vendor Infra Story",
            /* @__PURE__ */ jsx("br", {}),
            "Meet. ",
            /* @__PURE__ */ jsx("span", { className: "text-[#edad1a]", children: "Collaborate" }),
            ". Construct"
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-2 gap-6", children: [
          /* @__PURE__ */ jsxs(motion.div, { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, className: "rounded-2xl  border-1 border-[#00274d] bg-[#f6f8fb] p-7 md:p-8", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-6", children: [
              /* @__PURE__ */ jsx("div", { className: "w-11 h-11 rounded-xl bg-[#edad1a]/10 flex items-center justify-center", children: /* @__PURE__ */ jsx(Target, { className: "w-5 h-5 text-[#edad1a]" }) }),
              /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold text-[#00274d]", children: "Who we are" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-5 text-gray-600 text-[16px] leading-8", children: [
              /* @__PURE__ */ jsx("p", { children: "It connects infrastructure companies, vendors, suppliers, contractors, consultants, and developers, offering a cost-effective and efficient way to collaborate, source, and execute projects across diverse sectors." }),
              /* @__PURE__ */ jsx("p", { children: "Headquartered in Delhi NCR, Vendor Infra was founded by industry leaders with over two decades of experience in managing and executing large-scale infrastructure projects." }),
              /* @__PURE__ */ jsx("p", { children: "Our platform is built to simplify vendor discovery and collaboration, enable supply chain finance, offer a dedicated plants and equipment marketplace, and facilitate project insurance - empowering businesses to overcome industry challenges and drive greater efficiency, transparency, and growth." })
            ] }),
            /* @__PURE__ */ jsx(Link, { href: "/services", className: "mt-7 inline-block", children: /* @__PURE__ */ jsx(SiteButton, { variant: "primary", children: "Explore Services" }) })
          ] }),
          /* @__PURE__ */ jsxs(motion.div, { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { delay: 0.08 }, className: "rounded-2xl border border-gray-200 bg-[#082b4f] p-7 md:p-8 text-white relative overflow-hidden", children: [
            /* @__PURE__ */ jsx("div", { className: "absolute inset-0 opacity-[0.08] bg-[radial-gradient(circle_at_1px_1px,#ffffff_1px,transparent_0)] bg-[size:24px_24px]" }),
            /* @__PURE__ */ jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-6", children: [
                /* @__PURE__ */ jsx("div", { className: "w-11 h-11 rounded-xl bg-[#edad1a] flex items-center justify-center", children: /* @__PURE__ */ jsx(Shield, { className: "w-5 h-5 text-white" }) }),
                /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold", children: "What we do" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-5 text-white/78 text-[16px] leading-8", children: [
                /* @__PURE__ */ jsx("p", { children: "Vendor Infra, we offer more than just a Vendor Discovery and Marketplace. We provide a powerful AI ecosystem designed for B2B businesses across all sectors of the infrastructure, construction and manufacturing industry." }),
                /* @__PURE__ */ jsx("p", { children: "Our AI- and ML Powered seamlessly blends technology with the real-world needs of infrastructure stakeholders, enabling smarter decision-making, cost optimization, profit maximization, and faster collaboration." }),
                /* @__PURE__ */ jsx("p", { children: "Vendor Infra brings integrated services on a single platform, empowering contractors, suppliers, consultants, and developers to connect, collaborate, and construct more efficiently than ever before." })
              ] }),
              /* @__PURE__ */ jsx(Link, { href: "/contact", children: /* @__PURE__ */ jsx(SiteButton, { variant: "primary", className: "mt-7", children: "Book a Demo" }) })
            ] })
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsx("section", { className: "py-20 bg-gray-50 border-y", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 max-w-5xl", children: [
        /* @__PURE__ */ jsxs("div", { className: "text-center mb-12", children: [
          /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-2 text-[#edad1a] text-[12px] font-bold uppercase tracking-[0.3em] mb-4", children: [
            /* @__PURE__ */ jsx("span", { className: "w-6 h-px bg-[#edad1a]/60" }),
            "USP",
            /* @__PURE__ */ jsx("span", { className: "w-6 h-px bg-[#edad1a]/60" })
          ] }),
          /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold text-[#00274d] max-w-3xl mx-auto text-balance leading-tight", children: "One Platform. One Ecosystem. Infinite Possibilities." })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "grid sm:grid-cols-2 md:grid-cols-3 gap-5", children: usps.map((usp, i) => /* @__PURE__ */ jsxs(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { delay: i * 0.06 }, className: "group overflow-hidden bg-white rounded-2xl shadow-sm  border border-[#00274d] hover:shadow-lg hover:-translate-y-1 transition-all duration-300", children: [
          /* @__PURE__ */ jsx("div", { className: "aspect-[16/10] overflow-hidden bg-gray-100", children: /* @__PURE__ */ jsx("img", { src: usp.image, alt: usp.title, className: "w-full h-full object-cover transition-transform duration-500 group-hover:scale-105", loading: "eager" }) }),
          /* @__PURE__ */ jsxs("div", { className: "p-5", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3 mb-3", children: [
              /* @__PURE__ */ jsx(CheckCircle2, { className: "w-6 h-6 text-[#edad1a] shrink-0 mt-0.5" }),
              /* @__PURE__ */ jsx("h3", { className: "font-bold text-[#00274d] leading-snug", children: usp.title })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-500 text-sm leading-relaxed", children: usp.desc })
          ] })
        ] }, usp.title)) })
      ] }) }),
      /* @__PURE__ */ jsx("section", { className: "py-12 bg-white border-b border-gray-100", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "text-center mb-8", children: [
          /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-2 text-[#edad1a] text-[12px] font-bold uppercase tracking-[0.3em] mb-4", children: [
            /* @__PURE__ */ jsx("span", { className: "w-6 h-px bg-[#edad1a]/60" }),
            "Trusted By",
            /* @__PURE__ */ jsx("span", { className: "w-6 h-px bg-[#edad1a]/60" })
          ] }),
          /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold text-[#00274d] max-w-4xl mx-auto text-balance leading-tight", children: "Chosen by the companies building India's National Infrastructure pipeline" })
        ] }),
        /* @__PURE__ */ jsx(LogoMarquee, { logos: trustedBy })
      ] }) }),
      /* @__PURE__ */ jsx("section", { className: "py-20 bg-white", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 max-w-6xl", children: [
        /* @__PURE__ */ jsxs("div", { className: "text-center mb-14", children: [
          /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-2 text-[#edad1a] text-[12px] font-bold uppercase tracking-[0.3em] mb-4", children: [
            /* @__PURE__ */ jsx("span", { className: "w-6 h-px bg-[#edad1a]/60" }),
            "Leadership",
            /* @__PURE__ */ jsx("span", { className: "w-6 h-px bg-[#edad1a]/60" })
          ] }),
          /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold text-[#00274d]", children: "Management Team" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-4 gap-6", children: management.map((m, i) => /* @__PURE__ */ jsxs(motion.div, { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { delay: i * 0.08 }, className: "group relative bg-white rounded-2xl overflow-hidden border border-[#00274d] shadow-md hover:shadow-xl transition-all duration-300", children: [
          /* @__PURE__ */ jsxs("div", { className: "relative aspect-[4/5] bg-gradient-to-br from-[#f6f8fb] to-[#eef2f8] overflow-hidden", children: [
            /* @__PURE__ */ jsx("img", { src: `${base}${m.photo}`, alt: m.name, className: "absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500", onError: (e) => {
              e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(m.name)}&background=00274d&color=fff&size=400`;
            } }),
            /* @__PURE__ */ jsx("a", { href: m.linkedin, target: "_blank", rel: "noopener noreferrer", className: "absolute top-3 right-3 w-9 h-9 bg-white/90 hover:bg-[#0077b5] text-[#0077b5] hover:text-white rounded-full flex items-center justify-center shadow transition-all duration-200", children: /* @__PURE__ */ jsx(Linkedin, { className: "w-4 h-4" }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "p-4", children: [
            /* @__PURE__ */ jsx("h4", { className: "font-bold text-[#00274d] text-[15px] leading-snug", children: m.name }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 mt-1 leading-snug", children: m.role })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "absolute bottom-0 left-0 w-0 group-hover:w-full h-0.5 bg-[#edad1a] transition-all duration-300" })
        ] }, i)) })
      ] }) }),
      /* @__PURE__ */ jsx("section", { className: "py-20 bg-[#00274d]", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 max-w-6xl", children: [
        /* @__PURE__ */ jsxs("div", { className: "text-center mb-14", children: [
          /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-2 text-[#edad1a] text-[12px] font-bold uppercase tracking-[0.3em] mb-4", children: [
            /* @__PURE__ */ jsx("span", { className: "w-6 h-px bg-[#edad1a]/60" }),
            "Guidance & Expertise",
            /* @__PURE__ */ jsx("span", { className: "w-6 h-px bg-[#edad1a]/60" })
          ] }),
          /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold text-white", children: "Advisory Board" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-4 gap-6", children: advisory.map((a, i) => /* @__PURE__ */ jsxs(motion.div, { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { delay: i * 0.08 }, className: "group relative bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#edad1a]/40 rounded-2xl overflow-hidden transition-all duration-300", children: [
          /* @__PURE__ */ jsxs("div", { className: "relative aspect-[4/5] overflow-hidden bg-gradient-to-br from-[#0a3b73] to-[#021a36]", children: [
            /* @__PURE__ */ jsx("img", { src: `${base}${a.photo}`, alt: a.name, className: "absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500", onError: (e) => {
              e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(a.name)}&background=1a4fdb&color=fff&size=400`;
            } }),
            /* @__PURE__ */ jsx("a", { href: a.linkedin, target: "_blank", rel: "noopener noreferrer", className: "absolute top-3 right-3 w-9 h-9 bg-white/90 hover:bg-[#0077b5] text-[#0077b5] hover:text-white rounded-full flex items-center justify-center backdrop-blur-sm shadow transition-all duration-200", children: /* @__PURE__ */ jsx(Linkedin, { className: "w-4 h-4" }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "p-4", children: [
            /* @__PURE__ */ jsx("h4", { className: "font-bold text-white text-[15px] leading-snug", children: a.name }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-white/75 mt-1.5 leading-relaxed", children: a.role })
          ] })
        ] }, i)) })
      ] }) }),
      /* @__PURE__ */ jsx("section", { className: "py-20 bg-gray-50", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 max-w-7xl", children: [
        /* @__PURE__ */ jsxs("div", { className: "text-center mb-14", children: [
          /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-2 text-[#edad1a] text-[12px] font-bold uppercase tracking-[0.3em] mb-4", children: [
            /* @__PURE__ */ jsx("span", { className: "w-6 h-px bg-[#edad1a]/60" }),
            "Our People",
            /* @__PURE__ */ jsx("span", { className: "w-6 h-px bg-[#edad1a]/60" })
          ] }),
          /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold text-[#00274d]", children: "Team Members" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5", children: team.map((member, i) => /* @__PURE__ */ jsxs(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { delay: i % 5 * 0.06 }, className: "group bg-white rounded-2xl overflow-hidden  border-1 border-[#00274d] shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col", children: [
          /* @__PURE__ */ jsxs("div", { className: "relative aspect-square overflow-hidden bg-gradient-to-br from-[#00274d]/5 to-[#edad1a]/10", children: [
            /* @__PURE__ */ jsx("img", { src: `${base}${member.photo}`, alt: member.name, className: "absolute inset-0 w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500", onError: (e) => {
              e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=e8eef9&color=1a4fdb&size=300`;
            } }),
            member.linkedin && /* @__PURE__ */ jsx("a", { href: member.linkedin, target: "_blank", rel: "noopener noreferrer", className: "absolute top-2 right-2 w-7 h-7 bg-white/90 hover:bg-[#0077b5] text-[#0077b5] hover:text-white rounded-full flex items-center justify-center shadow transition-all duration-200 opacity-0 group-hover:opacity-100", children: /* @__PURE__ */ jsx(Linkedin, { className: "w-3.5 h-3.5" }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "p-3.5 flex-1 flex flex-col", children: [
            /* @__PURE__ */ jsx("h4", { className: "font-bold text-[#00274d] text-sm leading-tight", children: member.name }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 mt-0.5", children: member.role }),
            /* @__PURE__ */ jsx("span", { className: `mt-2 inline-flex self-start text-[10px] font-bold px-2 py-0.5 rounded-full ${tagColors[member.tag] || "bg-gray-100 text-gray-600"}`, children: member.tag })
          ] })
        ] }, i)) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsx(
      "section",
      {
        className: "bg-[#edad1a] py-16 relative",
        style: {
          backgroundImage: "radial-gradient(rgba(0,39,77,0.18) 1px, transparent 1px)",
          backgroundSize: "22px 22px"
        },
        children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-3xl mx-auto text-center", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center gap-3 mb-5", children: [
            /* @__PURE__ */ jsx("span", { className: "h-px w-10 bg-[#00274d]/40" }),
            /* @__PURE__ */ jsx("span", { className: "text-xs md:text-sm font-bold tracking-[0.3em] text-[#00274d]", children: "GET STARTED TODAY" }),
            /* @__PURE__ */ jsx("span", { className: "h-px w-10 bg-[#00274d]/40" })
          ] }),
          /* @__PURE__ */ jsx("h2", { className: "text-2xl md:text-3xl font-bold text-[#00274d] mb-3", children: "Ready to Grow and Transform your Business?" }),
          /* @__PURE__ */ jsxs("p", { className: "text-[#00274d]/85 mb-6 text-sm md:text-base", children: [
            "Join ",
            /* @__PURE__ */ jsx("span", { className: "font-semibold", children: "32,000+" }),
            " contractors, vendors, manufacturers, suppliers, and consultants already using Vendor Infra to discover new opportunities, streamline procurement, acesss plants and equipment solutions, and secure project financing and insurance—all through a single integrated platform."
          ] }),
          /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-3 justify-center items-center", children: /* @__PURE__ */ jsx(
            "a",
            {
              href: PORTAL_REGISTER_URL$6,
              target: "_blank",
              rel: "noopener noreferrer",
              children: /* @__PURE__ */ jsx(SiteButton, { variant: "onGold", className: "normal-case tracking-normal", children: "Join Now" })
            }
          ) })
        ] }) })
      }
    ),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
const PORTAL_LOGIN_URL = "http://3.110.208.157/customer/";
const PORTAL_REGISTER_URL$5 = "http://3.110.208.157/customer/";
const services = [
  {
    title: "AI-Powered Vendor Discovery",
    icon: Search,
    image: "/images/services/ai-discovery.jpg",
    imageAlt: "AI vendor discovery platform",
    flip: false,
    href: PORTAL_LOGIN_URL,
    points: [
      {
        label: "Multiple Vendors",
        desc: "Search and compare multiple verified vendors for every single item in your Bill of Quantities to ensure the right selection."
      },
      {
        label: "Vendor by rating",
        desc: "Find and choose vendors based on their past performance, reliability, and verified ratings."
      },
      {
        label: "Vendor by Size and Capability",
        desc: "Select the most suitable vendor by evaluating their company profile, size, and operational capability to match your project needs."
      }
    ]
  },
  {
    title: "Smart Price Discovery",
    icon: Calculator,
    image: "/images/services/smart-price-discovery.jpg",
    imageAlt: "Smart price discovery and quotation",
    flip: true,
    href: PORTAL_LOGIN_URL,
    points: [
      {
        label: "Hassle Free Management",
        desc: "Easily track all vendor responses, manage communications, and access your account anytime, anywhere."
      },
      {
        label: "Multiple Quotes",
        desc: "Send instant proposals or receive multiple quotes to identify the best service or supplier at the right price."
      },
      {
        label: "Easy View Dashboard",
        desc: "Get an intuitive dashboard to view vendor and supplier profiles along with detailed comparison reports for smarter decisions."
      }
    ]
  },
  {
    title: "AI-Powered Plants & Equipment",
    icon: Tractor,
    image: "/images/services/plants-equipment-marketplace.png",
    imageAlt: "Plants and heavy equipment marketplace",
    flip: false,
    href: PORTAL_LOGIN_URL,
    points: [
      {
        label: "Search",
        desc: "Quickly find plants and equipment by brand, category, or location from our extensive database."
      },
      {
        label: "List Your Idle Plants & Equipment",
        desc: "List your idle or unused plants and equipment for short-term or long-term use to maximize asset utilization."
      },
      {
        label: "Buy, Sell, or Hire Plants & Equipment",
        desc: "Easily buy, sell, or hire verified plants and equipment through a secure and transparent process."
      }
    ]
  },
  {
    title: "Smart Material Procurement",
    icon: Package,
    image: "/images/services/smart-material-procurement.jpg",
    imageAlt: "Smart material procurement for construction",
    flip: true,
    href: "/materials",
    points: [
      {
        label: "One-Stop Solution for All Raw Material Needs",
        desc: "Fulfill all your raw material requirements through our comprehensive B2B platform designed for the Infrastructure, Construction & Manufacturing industry."
      },
      {
        label: "Value Chain Integration",
        desc: "Our value chain integration connects you with reliable suppliers to meet every material requirement efficiently."
      },
      {
        label: "Right Material & Wide Range",
        desc: "Choose from a wide range of raw material categories — get the right size, finish, and quantity tailored to your project needs."
      }
    ]
  },
  {
    title: "Contract Manufacturing",
    icon: Factory,
    image: "/contract-manufacturing-ai.jpg",
    imageAlt: "Contract manufacturing production facility",
    href: "/contract-manufacturing",
    flip: false,
    points: [
      {
        label: "End-to-End Manufacturing",
        desc: "Manage the complete manufacturing lifecycle—from sourcing and production to quality control and final delivery."
      },
      {
        label: "Production Tracking & Control",
        desc: "Monitor production in real time with milestone-based tracking, proactive alerts, and complete operational visibility."
      },
      {
        label: "Quality & Logistics Management",
        desc: "Maintain consistent product quality while ensuring seamless logistics coordination and on-time fulfillment."
      }
    ]
  },
  {
    title: "Smart Project Insurance",
    icon: ShieldCheck,
    image: "/images/services/insurance.png",
    imageAlt: "Smart project insurance and protection",
    flip: false,
    href: "/contact",
    points: [
      {
        label: "Project Insurance",
        desc: "Get attractive rates and customized quotes for Project Insurance such as CAR, EAR, and Workmen Compensation from reputed insurers."
      },
      {
        label: "Plants & Equipment Insurance",
        desc: "Access specialized insurance plans for plants and equipment from trusted insurance partners at competitive rates."
      },
      {
        label: "Raw Material Insurance",
        desc: "Protect your materials with comprehensive insurance coverage from leading and reliable insurance companies."
      }
    ]
  },
  {
    title: "AI Powered Enterprise Services",
    icon: Briefcase,
    image: "/images/services/ai-enterprise-services.jpg",
    imageAlt: "Enterprise services and business growth",
    flip: true,
    href: "/contact",
    points: [
      {
        label: "Subcontracting",
        desc: "We help companies subcontract their projects effectively by connecting them with technically and financially sound contractors suited to their scale and capability."
      },
      {
        label: "Growth",
        desc: "We assist small and mid-sized companies in organizational restructuring, team development, and creating growth strategies for scaling and diversification."
      },
      {
        label: "Market Entry",
        desc: "We support global companies in setting up and expanding their business in India through deep market knowledge, optimal sourcing, and value chain integration."
      }
    ]
  },
  {
    title: "Other Services",
    icon: BarChart3,
    image: "/images/services/otherServices.png",
    imageAlt: "Sector intelligence and SOR data analytics",
    flip: false,
    points: [
      {
        label: "Projects & Tender Updates",
        desc: "Stay updated with the latest projects and tender announcements across major infrastructure and construction sectors."
      },
      {
        label: "Sector Intelligence",
        desc: "Access insights such as sector overviews, client and ministry data, sample PQs, tender information, and contractor/project listings to support diversification."
      },
      {
        label: "Schedule of Rates ( SOR)",
        desc: "Subscribers gain access to over 75+ Schedules of Rates (SOR) and current market rates to assist in accurate estimation, budgeting, and cost benchmarking."
      }
    ]
  }
];
const advantages = [
  { icon: Layers, title: "All-in-One Platform for entire Value Chain", desc: "Manage vendor discovery, price comparison, procurement, insurance, and enterprise services — all in one place." },
  { icon: CheckCircle2, title: "Verified Vendors and transparent selection", desc: "Connect only with verified and rated vendors to ensure reliability, quality, and trust in every transaction." },
  { icon: Star, title: "Best quote every time for your project", desc: "Get multiple quotes instantly and choose the most cost-effective option for your project needs." },
  { icon: Zap, title: "Simplified Procurement process", desc: "Save time and effort with a streamlined, hassle-free process for material sourcing and vendor management." },
  { icon: BarChart, title: "End-to-End Material Management", desc: "Access a wide range of raw materials and fulfill all requirements through integrated value chain services." },
  { icon: Tractor, title: "Smart Equipment utilization", desc: "Buy, sell, hire, or rent plants and equipment easily — or list idle assets to generate extra income" },
  { icon: Shield, title: "Complete Project protection", desc: "Secure your projects, materials, and machinery with the best insurance rates from top-rated companies." },
  { icon: Globe, title: "AI-ML driven Platform", desc: "AI-ML powered platform that transforms how infrastructure stakeholders discover, evaluate, and collaborate." }
];
const faqs = [
  {
    q: "Is Vendor Infra powered by technology like AI and ML?",
    a: "Yes. Vendor Infra is an AI and ML-driven platform, providing intelligent recommendations, data analytics, and performance insights to help you make smarter, faster, and more profitable business decisions."
  },
  {
    q: "How can Vendor Infra support my company's growth and expansion?",
    a: "Through our Enterprise Services, we assist in subcontracting, business restructuring, diversification, and market entry strategies. Whether you're a mid-size company looking to grow or a global firm entering India, we help you scale confidently."
  },
  {
    q: "How does the Plants & Equipment service work?",
    a: "You can list your idle plants and equipment on the portal for buy, sell, or hire. Companies and contractors can search by brand, category, or location and choose equipment as per their requirements."
  },
  {
    q: "Is Vendor Infra suitable for both small and large companies?",
    a: "Yes. Vendor Infra supports small, mid-size, and large companies through vendor discovery, procurement, plants and equipment, insurance, financing, enterprise services, and sector intelligence across infrastructure and construction."
  }
];
const VIDEO_ID = "tn81mJqaeEM";
function FadeUp$2({
  children,
  delay = 0,
  className = ""
}) {
  return /* @__PURE__ */ jsx(
    motion.div,
    {
      initial: { opacity: 0, y: 28 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true, margin: "-50px" },
      transition: {
        duration: 0.6,
        delay,
        ease: [0.22, 1, 0.36, 1]
      },
      className,
      children
    }
  );
}
function FAQItem$1({ q, a }) {
  const [open, setOpen] = useState(false);
  return /* @__PURE__ */ jsxs("div", { className: "border border-[#00274d] rounded-xl overflow-hidden", children: [
    /* @__PURE__ */ jsxs(
      "button",
      {
        onClick: () => setOpen(!open),
        className: "w-full flex items-center justify-between px-6 py-5 text-left hover:bg-gray-50 transition-colors",
        children: [
          /* @__PURE__ */ jsx("span", { className: "font-semibold text-[#00274d] pr-4", children: q }),
          /* @__PURE__ */ jsx(ChevronDown, { className: `w-5 h-5 text-[#edad1a] shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}` })
        ]
      }
    ),
    /* @__PURE__ */ jsx(
      motion.div,
      {
        initial: false,
        animate: { height: open ? "auto" : 0, opacity: open ? 1 : 0 },
        transition: { duration: 0.3 },
        className: "overflow-hidden",
        children: /* @__PURE__ */ jsx("p", { className: "px-6 pb-5 text-gray-500 leading-relaxed text-sm", children: a })
      }
    )
  ] });
}
function VideoPlayer() {
  const [playing, setPlaying] = useState(false);
  return /* @__PURE__ */ jsx("div", { className: "relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 aspect-video bg-black", children: playing ? /* @__PURE__ */ jsx(
    "iframe",
    {
      src: `https://www.youtube.com/embed/${VIDEO_ID}?rel=0&modestbranding=1&autoplay=1`,
      title: "Vendor Infra Services Overview",
      allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
      allowFullScreen: true,
      className: "w-full h-full"
    }
  ) : /* @__PURE__ */ jsxs(
    "button",
    {
      onClick: () => setPlaying(true),
      className: "relative w-full h-full group block",
      "aria-label": "Play video: Vendor Infra Services Overview",
      children: [
        /* @__PURE__ */ jsx(
          "img",
          {
            src: `https://img.youtube.com/vi/${VIDEO_ID}/maxresdefault.jpg`,
            alt: "Vendor Infra Services Overview",
            className: "w-full h-full object-cover",
            loading: "eager"
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-black/40 group-hover:bg-black/25 transition-colors duration-300 flex items-center justify-center", children: /* @__PURE__ */ jsx("div", { className: "w-20 h-20 rounded-full bg-white/95 flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300", children: /* @__PURE__ */ jsx(Play, { className: "w-8 h-8 text-red-600 ml-1", fill: "currentColor" }) }) }),
        /* @__PURE__ */ jsx("div", { className: "absolute bottom-4 left-4 right-4 text-center", children: /* @__PURE__ */ jsx("span", { className: "text-white/90 text-sm font-medium drop-shadow-lg", children: "Watch: How Vendor Infra Transforms Infrastructure Procurement" }) })
      ]
    }
  ) });
}
function Services() {
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen flex flex-col bg-white", children: [
    /* @__PURE__ */ jsx(Navbar, {}),
    /* @__PURE__ */ jsxs("section", { "data-preserve-hero-typography": true, className: "relative bg-[#00274d] text-white py-24 overflow-hidden", children: [
      /* @__PURE__ */ jsx(
        "div",
        {
          className: "absolute inset-0 opacity-[0.08]",
          style: { backgroundImage: "radial-gradient(circle at 1px 1px,#ffffff 1px,transparent 0)", backgroundSize: "40px 40px" }
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "relative z-10 text-center px-4 max-w-4xl mx-auto", children: [
        /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { opacity: 0, y: -10 },
            animate: { opacity: 1, y: 0 },
            className: "inline-flex items-center gap-2 rounded-full border border-[#edad1a]/40 bg-[#edad1a]/10 px-4 py-2 text-sm font-semibold text-[#edad1a] mb-6",
            children: "Services"
          }
        ),
        /* @__PURE__ */ jsx(
          motion.h1,
          {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: 0.1 },
            className: "text-4xl md:text-5xl font-semibold leading-tight tracking-tight mb-6",
            children: "Redefining Collaboration with 10+ Integrated Services"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsx("section", { id: "services-list", className: "py-24 md:py-32 bg-gradient-to-b from-white via-[#f7f9fc] to-white", children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto px-6 sm:px-8 lg:px-12", children: /* @__PURE__ */ jsx("div", { className: "space-y-28 md:space-y-36", children: services.map((service, idx) => {
      const reverse = idx % 2 === 1;
      const section = /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-12 gap-10 lg:gap-16 items-center", children: [
        /* @__PURE__ */ jsx("div", { className: `lg:col-span-6 ${reverse ? "lg:order-2" : ""}`, children: /* @__PURE__ */ jsxs("div", { className: "relative group", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute -inset-3 bg-gradient-to-br from-[#edad1a]/30 to-[#00274d]/20 rounded-3xl blur-2xl opacity-60 group-hover:opacity-90 transition-opacity duration-500" }),
          /* @__PURE__ */ jsxs("div", { className: "relative aspect-[4/3] overflow-hidden rounded-3xl bg-gray-100 ring-1 ring-black/5 shadow-2xl", children: [
            /* @__PURE__ */ jsx(
              "img",
              {
                src: service.image,
                alt: service.imageAlt,
                loading: "lazy",
                className: "w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
              }
            ),
            /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-tr from-[#00274d]/30 via-transparent to-transparent" }),
            /* @__PURE__ */ jsx("div", { className: "absolute top-5 left-5 w-14 h-14 rounded-2xl bg-white/90 backdrop-blur-md flex items-center justify-center shadow-xl ring-1 ring-white/60", children: /* @__PURE__ */ jsx(service.icon, { className: "w-6 h-6 text-[#edad1a]" }) })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxs("div", { className: `lg:col-span-6 ${reverse ? "lg:order-1" : ""}`, children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-baseline gap-4 mb-5", children: [
            /* @__PURE__ */ jsx("span", { className: "text-5xl md:text-6xl font-bold text-[#edad1a] tracking-tight tabular-nums", children: String(idx + 1).padStart(2, "0") }),
            /* @__PURE__ */ jsx("span", { className: "h-px flex-1 bg-gradient-to-r from-[#edad1a]/40 to-transparent" })
          ] }),
          /* @__PURE__ */ jsx("h3", { className: "text-2xl md:text-3xl font-semibold text-[#00274d] tracking-normal leading-tight mb-7", children: service.title }),
          /* @__PURE__ */ jsx("div", { className: "space-y-8", children: service.points.map((point, i) => /* @__PURE__ */ jsxs("div", { className: "relative flex gap-4", children: [
            i !== service.points.length - 1 && /* @__PURE__ */ jsx("div", { className: "absolute left-[18px] top-10 w-[2px] h-[calc(100%+24px)] bg-[#edad1a]" }),
            /* @__PURE__ */ jsx("div", { className: "relative z-10 w-9 h-9 rounded-xl bg-[#fdf4e3] flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsx(
              CheckCircle2,
              {
                className: "w-4 h-4 text-[#edad1a]",
                strokeWidth: 2.5
              }
            ) }),
            /* @__PURE__ */ jsxs("div", { className: "pb-6", children: [
              /* @__PURE__ */ jsx("h4", { className: "type-card-title text-[#00274d] mb-1", children: point.label }),
              /* @__PURE__ */ jsx("p", { className: "text-gray-500 text-sm leading-relaxed", children: point.desc })
            ] })
          ] }, i)) })
        ] })
      ] });
      return /* @__PURE__ */ jsx(FadeUp$2, { children: "href" in service && service.href ? /* @__PURE__ */ jsx(
        "a",
        {
          href: service.href,
          target: "_blank",
          rel: "noopener noreferrer",
          className: "block rounded-3xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[#edad1a] focus-visible:ring-offset-4",
          children: section
        }
      ) : section }, idx);
    }) }) }) }),
    /* @__PURE__ */ jsxs("section", { className: "py-24 md:py-28 bg-[#0a1d36] text-white relative overflow-hidden", children: [
      /* @__PURE__ */ jsx(
        "div",
        {
          className: "absolute inset-0 opacity-[0.05]",
          style: { backgroundImage: "radial-gradient(circle at 1px 1px,#ffffff 1px,transparent 0)", backgroundSize: "32px 32px" }
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-[#edad1a]/10 blur-[140px]" }),
      /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10", children: [
        /* @__PURE__ */ jsxs(FadeUp$2, { className: "text-center max-w-3xl mx-auto mb-16", children: [
          /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-2 text-[#edad1a] text-[12px] font-bold uppercase tracking-[0.3em] mb-4", children: [
            /* @__PURE__ */ jsx("span", { className: "w-6 h-px bg-[#edad1a]/60" }),
            "Advantages",
            /* @__PURE__ */ jsx("span", { className: "w-6 h-px bg-[#edad1a]/60" })
          ] }),
          /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold leading-tight text-white", children: "Our Service advantages that deliver results" })
        ] }),
        /* @__PURE__ */ jsx(
          motion.div,
          {
            className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4",
            initial: "hidden",
            whileInView: "show",
            viewport: { once: true, margin: "-60px" },
            variants: { hidden: {}, show: { transition: { staggerChildren: 0.06 } } },
            children: advantages.map((adv, i) => /* @__PURE__ */ jsx(motion.div, { variants: { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } }, children: /* @__PURE__ */ jsxs("div", { className: "group relative h-full rounded-2xl p-6 bg-white/[0.04] border border-white/10 hover:bg-white/[0.07] hover:border-[#edad1a]/40 transition-all duration-300 overflow-hidden", children: [
              /* @__PURE__ */ jsx("div", { className: "absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-[#edad1a]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" }),
              /* @__PURE__ */ jsx("div", { className: "w-12 h-12 rounded-xl bg-gradient-to-br from-[#edad1a] to-[#d99c14] flex items-center justify-center mb-5 shadow-lg shadow-[#edad1a]/20", children: /* @__PURE__ */ jsx(adv.icon, { className: "w-5 h-5 text-[#00274d]" }) }),
              /* @__PURE__ */ jsx("h3", { className: "type-card-title text-white mb-2", children: adv.title }),
              /* @__PURE__ */ jsx("p", { className: "text-white/60 text-sm leading-relaxed", children: adv.desc })
            ] }) }, i))
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsx("section", { className: "py-24 md:py-28 bg-white", children: /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto px-6 sm:px-8 lg:px-12", children: [
      /* @__PURE__ */ jsxs(FadeUp$2, { className: "text-center mb-14", children: [
        /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-2 text-[#edad1a] text-[12px] font-bold uppercase tracking-[0.3em] mb-4", children: [
          /* @__PURE__ */ jsx("span", { className: "w-6 h-px bg-[#edad1a]/60" }),
          "FAQ",
          /* @__PURE__ */ jsx("span", { className: "w-6 h-px bg-[#edad1a]/60" })
        ] }),
        /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold leading-tight text-[#00274d]", children: "Explore answers to frequently asked questions." })
      ] }),
      /* @__PURE__ */ jsx(FadeUp$2, { delay: 0.1, className: "space-y-3", children: faqs.map((faq, i) => /* @__PURE__ */ jsx(FAQItem$1, { q: faq.q, a: faq.a }, i)) })
    ] }) }),
    /* @__PURE__ */ jsxs("section", { className: "py-24 md:py-28 bg-[#00274d] relative overflow-hidden", children: [
      /* @__PURE__ */ jsx(
        "div",
        {
          className: "absolute inset-0 opacity-[0.07]",
          style: { backgroundImage: "radial-gradient(circle at 1px 1px,#ffffff 1px,transparent 0)", backgroundSize: "36px 36px" }
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute -bottom-32 -right-20 w-[520px] h-[520px] rounded-full bg-[#edad1a]/15 blur-[140px]" }),
      /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 relative z-10 max-w-5xl", children: [
        /* @__PURE__ */ jsxs(FadeUp$2, { className: "text-center mb-12", children: [
          /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-2 text-[#edad1a] text-[12px] font-bold uppercase tracking-[0.3em] mb-4", children: [
            /* @__PURE__ */ jsx("span", { className: "w-6 h-px bg-[#edad1a]/60" }),
            "Explore more",
            /* @__PURE__ */ jsx("span", { className: "w-6 h-px bg-[#edad1a]/60" })
          ] }),
          /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold leading-tight text-white", children: "Get to know more about our Services" }),
          /* @__PURE__ */ jsx("p", { className: "type-body-lg text-white/70 mt-4 max-w-xl mx-auto", children: "Explore how our ecosystem supports your business from opportunity to execution." })
        ] }),
        /* @__PURE__ */ jsx(FadeUp$2, { delay: 0.15, children: /* @__PURE__ */ jsx(VideoPlayer, {}) })
      ] })
    ] }),
    /* @__PURE__ */ jsx(
      "section",
      {
        className: "bg-[#edad1a] py-16 relative",
        style: {
          backgroundImage: "radial-gradient(rgba(0,39,77,0.18) 1px, transparent 1px)",
          backgroundSize: "22px 22px"
        },
        children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-3xl mx-auto text-center", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center gap-3 mb-5", children: [
            /* @__PURE__ */ jsx("span", { className: "h-px w-10 bg-[#00274d]/40" }),
            /* @__PURE__ */ jsx("span", { className: "text-xs md:text-sm font-bold tracking-[0.3em] text-[#00274d]", children: "GET STARTED TODAY" }),
            /* @__PURE__ */ jsx("span", { className: "h-px w-10 bg-[#00274d]/40" })
          ] }),
          /* @__PURE__ */ jsx("h2", { className: "text-2xl md:text-3xl font-bold text-[#00274d] mb-3", children: "Ready to Grow and Transform your Business?" }),
          /* @__PURE__ */ jsxs("p", { className: "text-[#00274d]/85 mb-6 text-sm md:text-base", children: [
            "Join ",
            /* @__PURE__ */ jsx("span", { className: "font-semibold", children: "32,000+" }),
            " contractors, vendors, manufacturers, suppliers, and consultants already using Vendor Infra to discover new opportunities, streamline procurement, acesss plants and equipment solutions, and secure project financing and insurance—all through a single integrated platform."
          ] }),
          /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-3 justify-center items-center", children: /* @__PURE__ */ jsx(
            "a",
            {
              href: PORTAL_REGISTER_URL$5,
              target: "_blank",
              rel: "noopener noreferrer",
              children: /* @__PURE__ */ jsx(SiteButton, { variant: "onGold", className: "normal-case tracking-normal", children: "Join Now" })
            }
          ) })
        ] }) })
      }
    ),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
const heroImages = [
  "/contract-manufacturing-ai.jpg",
  "/cm-production-line.jpg",
  "/cm-quality-inspection.jpg"
];
const chips = ["Verified Manufacturers", "Real-Time Tracking", "Competitive RFQ", "End-to-End Execution", "Quality Assurance"];
const problemPoints = [
  ["Relationship-driven discovery", "Finding capable manufacturers still depends on personal networks and cold outreach, making sourcing slow, inconsistent, and geographically limited."],
  ["Unclear capability evaluation", "Quality, capacity, compliance, and process fit are hard to compare without a standardized verification framework."],
  ["Inconsistent pricing", "Ad hoc RFQ processes create incomparable quotes, hidden variables, vague scope, and limited benchmarking."],
  ["Opaque production tracking", "Once an order is placed, visibility drops and delays are often discovered after they happen."],
  ["Manual quality assurance", "Inspections depend on individual judgment with limited digital logs, protocols, or audit trails."],
  ["Siloed logistics", "Transport, documentation, and compliance are handled through separate vendors without unified coordination."]
];
const approach = [
  [FileSearch, "Demand Orchestration", "Convert specs, timelines, materials, and volumes into procurement-ready briefs manufacturers can act on immediately."],
  [Search, "Supply Intelligence", "Match demand to manufacturers using capability data, certifications, performance history, and available capacity."],
  [Gauge, "Execution Control", "Structure production with milestones, escalation paths, and exception alerts across every order."],
  [BarChart3, "Visibility Layer", "Give buyers and manufacturers shared visibility into production status, quality checks, and delivery progress."]
];
const capabilities = [
  [Layers3, "Product Development to Production", "Validate feasibility, prototype, run pilot batches, and scale into full production with confidence."],
  [BadgeCheck, "Intelligent Supplier Discovery", "Filter manufacturers by process type, capacity, location, specialization, availability, and performance."],
  [ClipboardCheck, "RFQ & Commercial Engine", "Receive standardized quotes, benchmark pricing, and negotiate on volume, lead time, and payment terms."],
  [GitBranch, "Production Execution & Control", "Monitor milestones, identify deviations early, and resolve exceptions at the source."],
  [ShieldCheck, "Quality Assurance & Compliance", "Manage validation, in-process checks, final sign-offs, certifications, and digital inspection records."],
  [Truck, "Logistics & Fulfillment", "Coordinate dispatch, freight booking, documentation, shipment tracking, and delivery confirmation."]
];
const process = [
  ["Define Requirement", "Upload specifications, drawings, material requirements, volumes, and delivery timelines."],
  ["Smart Matching", "Match your brief with verified manufacturers by capability, location, certification, capacity, and performance."],
  ["Commercial Evaluation", "Compare standardized quotes with scope, pricing, lead times, terms, benchmarks, and negotiation support."],
  ["Supplier Finalization", "Evaluate capability fit, cost, reliability, and compliance before issuing POs and locking schedules."],
  ["Production Kickoff", "Configure milestones, inspection points, and escalation triggers before manufacturing begins."],
  ["Real-Time Monitoring", "Track progress and act on alerts for schedule, input, or capacity risks."],
  ["Quality Validation", "Record multi-stage inspections with timestamped reports and documented resolution paths."],
  ["Logistics & Delivery", "Coordinate dispatch, freight, documentation, tracking, verification, and delivery acknowledgement."],
  ["Closure & Feedback", "Generate ratings, quality scores, delivery accuracy, and benchmarks for future sourcing intelligence."]
];
const industries = ["Infrastructure & Construction", "Industrial Equipment & Machinery", "Automotive & EV", "Electronics & Electricals", "Energy & Renewables"];
const manufacturing = ["CNC Machining", "Fabrication & Welding", "Casting", "Forging & Heat Treatment", "Injection Molding", "Sheet Metal Processing", "Precision Engineering", "Modular Assemblies", "Turnkey Manufacturing", "Custom Industrial Solutions"];
const buyerValue = ["Access manufacturing capacity without factory capex.", "Use specialized capabilities that scale with demand.", "Optimize costs through structured RFQs and benchmarking.", "Monitor orders, milestones, and shipments from one dashboard.", "Reduce risk with vendor scoring, compliance tracking, and risk profiling."];
const vendorValue = ["Access high-quality, structured demand.", "Improve plant utilization by filling capacity gaps.", "Digitize production workflows and operational discipline.", "Build a performance-based reputation using real delivery data.", "Expand beyond local markets with matched buyer demand."];
const technology = [
  [Zap, "AI-Driven Vendor Matchmaking", "Capability data and performance history surface the right manufacturer faster than manual sourcing."],
  [PackageCheck, "Real-Time Production Tracking", "Live status feeds, milestone triggers, and exception alerts provide continuous awareness."],
  [BarChart3, "Vendor Performance Analytics", "Every order builds a record across quality, delivery accuracy, responsiveness, and trends."],
  [LineChart, "Predictive Insights", "Roadmap capabilities include demand forecasting, capacity conflict prediction, price trends, and risk scoring."],
  [Globe2, "ERP & API Integrations", "Open APIs connect Vendor Infra with ERP, procurement, logistics, and financial systems."]
];
const comparison = [
  ["Vendor Discovery", "Manual, network-dependent, slow", "Intelligent, capability-driven, instant"],
  ["Execution", "Unstructured, relationship-managed", "Structured, milestone-tracked, auditable"],
  ["Visibility", "Periodic updates, reactive", "End-to-end real-time, proactive alerts"],
  ["Flexibility", "Single vendor dependency", "Multi-vendor ecosystem, scalable"],
  ["Quality Control", "Informal, end-of-line", "Multi-stage, digital, traceable"],
  ["Scalability", "Limited by existing relationships", "Built for large-scale, multi-order demand"]
];
function FadeUp$1({ children, delay = 0, className = "" }) {
  return /* @__PURE__ */ jsx(
    motion.div,
    {
      initial: { opacity: 0, y: 28 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true, margin: "-60px" },
      transition: { duration: 0.58, delay, ease: [0.22, 1, 0.36, 1] },
      className,
      children
    }
  );
}
function SectionLabel({ label }) {
  return /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-3 text-[#edad1a] text-[12px] font-bold uppercase tracking-[0.28em] mb-4", children: [
    /* @__PURE__ */ jsx("span", { className: "h-px w-8 bg-[#edad1a]/60" }),
    /* @__PURE__ */ jsx("span", { children: label }),
    /* @__PURE__ */ jsx("span", { className: "h-px w-8 bg-[#edad1a]/60" })
  ] });
}
function ContractManufacturing() {
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-white text-slate-900", children: [
    /* @__PURE__ */ jsx(Navbar, {}),
    /* @__PURE__ */ jsxs("section", { "data-preserve-hero-typography": true, className: "relative overflow-hidden bg-[#00274d] text-white", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 opacity-[0.07]", style: { backgroundImage: "radial-gradient(circle at 1px 1px,#ffffff 1px,transparent 0)", backgroundSize: "34px 34px" } }),
      /* @__PURE__ */ jsxs("div", { className: "relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-24 md:py-28", children: [
        /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-12 gap-12 lg:gap-16 items-center", children: [
          /* @__PURE__ */ jsxs("div", { className: "lg:col-span-7", children: [
            /* @__PURE__ */ jsx(motion.div, { initial: { opacity: 0, y: -10 }, animate: { opacity: 1, y: 0 }, className: "inline-flex items-center rounded-full border border-[#edad1a]/45 bg-[#edad1a]/10 px-5 py-3 text-sm font-semibold text-[#edad1a] mb-8 shadow-sm", children: "Contract Manufacturing" }),
            /* @__PURE__ */ jsx(motion.h1, { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.1 }, className: "text-4xl md:text-6xl font-semibold leading-tight tracking-tight", children: "Build Products at Scale, Without Building Factories." }),
            /* @__PURE__ */ jsx(motion.p, { initial: { opacity: 0, y: 18 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.2 }, className: "mt-6 text-base md:text-xl leading-relaxed text-white/78 max-w-2xl", children: "Vendor Infra enables businesses to design, source, manufacture, and deliver products through a connected ecosystem of verified manufacturers, intelligent workflows, and real-time execution visibility." }),
            /* @__PURE__ */ jsxs(motion.div, { initial: { opacity: 0, y: 18 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.3 }, className: "mt-8 flex flex-col sm:flex-row gap-4", children: [
              /* @__PURE__ */ jsxs(Link, { href: "/contact", className: siteButtonClasses("primary", "rounded-2xl px-7 py-4"), children: [
                "Start Your Project ",
                /* @__PURE__ */ jsx(CtaArrow, { variant: "dark" })
              ] }),
              /* @__PURE__ */ jsx("a", { href: "#capabilities", className: "inline-flex items-center justify-center gap-2 rounded-2xl border border-white/35 bg-white/10 px-7 py-4 text-sm font-semibold text-white transition-all hover:bg-white/15", children: "Explore Capabilities" })
            ] })
          ] }),
          /* @__PURE__ */ jsx(motion.div, { initial: { opacity: 0, x: 24 }, animate: { opacity: 1, x: 0 }, transition: { delay: 0.18 }, className: "lg:col-span-5", children: /* @__PURE__ */ jsxs("div", { className: "relative min-h-[390px]", children: [
            /* @__PURE__ */ jsx("div", { className: "absolute right-0 top-0 w-[82%] overflow-hidden rounded-3xl border border-white/15 bg-white/10 shadow-2xl", children: /* @__PURE__ */ jsx("img", { src: heroImages[0], alt: "Pre-engineered manufacturing structure", className: "h-[245px] w-full object-cover" }) }),
            /* @__PURE__ */ jsx("div", { className: "absolute left-0 bottom-12 w-[58%] overflow-hidden rounded-3xl border border-white/15 bg-white/10 shadow-2xl", children: /* @__PURE__ */ jsx("img", { src: heroImages[1], alt: "Automated production line for contract manufacturing", className: "h-[190px] w-full object-cover" }) }),
            /* @__PURE__ */ jsx("div", { className: "absolute right-8 bottom-0 w-[46%] overflow-hidden rounded-3xl border border-white/15 bg-white/10 shadow-2xl", children: /* @__PURE__ */ jsx("img", { src: heroImages[2], alt: "Quality inspection of manufactured components", className: "h-[160px] w-full object-cover" }) })
          ] }) })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "mt-12 flex flex-wrap gap-3", children: chips.map((chip) => /* @__PURE__ */ jsx("span", { className: "rounded-full border border-white/20 bg-white/10 px-5 py-2.5 text-sm text-white/86", children: chip }, chip)) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "relative overflow-hidden bg-[#00182f] py-24 md:py-32 text-white", children: [
      /* @__PURE__ */ jsx(
        "div",
        {
          "aria-hidden": true,
          className: "absolute inset-0 opacity-[0.07]",
          style: {
            backgroundImage: "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            maskImage: "radial-gradient(ellipse at center, black 40%, transparent 80%)"
          }
        }
      ),
      /* @__PURE__ */ jsx(
        "div",
        {
          "aria-hidden": true,
          className: "absolute -top-40 -right-40 h-[480px] w-[480px] rounded-full bg-[#edad1a]/20 blur-[120px]"
        }
      ),
      /* @__PURE__ */ jsx(
        "div",
        {
          "aria-hidden": true,
          className: "absolute -bottom-40 -left-40 h-[420px] w-[420px] rounded-full bg-[#0a4a8f]/40 blur-[120px]"
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12", children: /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-12 gap-14 lg:gap-20", children: [
        /* @__PURE__ */ jsxs(FadeUp$1, { className: "lg:col-span-5 lg:sticky lg:top-28 lg:self-start", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsx("span", { className: "h-px w-10 bg-[#edad1a]" }),
            /* @__PURE__ */ jsx("span", { className: "text-xs font-semibold uppercase tracking-[0.32em] text-[#edad1a]", children: "The Problem" })
          ] }),
          /* @__PURE__ */ jsxs("h2", { className: "mt-6 text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight", children: [
            "Manufacturing is",
            " ",
            /* @__PURE__ */ jsxs("span", { className: "relative inline-block", children: [
              /* @__PURE__ */ jsx("span", { className: "relative z-10", children: "fractured" }),
              /* @__PURE__ */ jsx(
                "span",
                {
                  "aria-hidden": true,
                  className: "absolute inset-x-0 bottom-1 h-3 bg-[#edad1a]/40 -skew-x-6"
                }
              )
            ] }),
            " ",
            "by design."
          ] }),
          /* @__PURE__ */ jsx("p", { className: "mt-6 text-lg leading-relaxed text-white/70", children: "Six structural fault lines run through every contract manufacturing engagement — from sourcing to shipment. Each one quietly compounds cost, time, and risk." }),
          /* @__PURE__ */ jsx("div", { className: "mt-10 grid grid-cols-3 gap-3", children: [
            ["06", "Fault lines"],
            ["100%", "Operational"],
            ["0", "Unified view"]
          ].map(([num, label]) => /* @__PURE__ */ jsxs(
            "div",
            {
              className: "rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur",
              children: [
                /* @__PURE__ */ jsx("div", { className: "font-bold text-2xl text-[#edad1a]", children: num }),
                /* @__PURE__ */ jsx("div", { className: "mt-1 text-[11px] uppercase tracking-wider text-white/55", children: label })
              ]
            },
            label
          )) }),
          /* @__PURE__ */ jsxs("div", { className: "mt-10 relative rounded-3xl border border-[#edad1a]/30 bg-gradient-to-br from-[#edad1a]/10 to-transparent p-7", children: [
            /* @__PURE__ */ jsx("div", { className: "absolute -top-3 left-7 px-3 py-1 rounded-full bg-[#edad1a] text-[#00182f] text-[10px] font-bold uppercase tracking-[0.2em]", children: "The Result" }),
            /* @__PURE__ */ jsxs("p", { className: "mt-2 text-lg leading-relaxed text-white/85", children: [
              "Delays, cost overruns, quality surprises, and unpredictable outcomes at ",
              /* @__PURE__ */ jsx("span", { className: "text-[#edad1a] font-semibold", children: "every stage" }),
              " of the manufacturing lifecycle."
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "lg:col-span-7", children: /* @__PURE__ */ jsxs("div", { className: "relative space-y-4", children: [
          /* @__PURE__ */ jsx(
            "div",
            {
              "aria-hidden": true,
              className: "absolute left-[28px] top-4 bottom-4 w-px bg-gradient-to-b from-transparent via-[#edad1a]/40 to-transparent hidden md:block"
            }
          ),
          problemPoints.map(([title, desc], index) => /* @__PURE__ */ jsx(FadeUp$1, { delay: index * 0.05, children: /* @__PURE__ */ jsxs("div", { className: "group relative rounded-2xl border border-white/10 bg-white/[0.04] p-5 md:p-6 transition-all duration-300 hover:border-[#edad1a]/50 hover:bg-white/[0.06] hover:-translate-y-0.5", children: [
            /* @__PURE__ */ jsx(
              "span",
              {
                "aria-hidden": true,
                className: "absolute left-0 top-6 bottom-6 w-[3px] rounded-r bg-[#edad1a] origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-300"
              }
            ),
            /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-5 md:gap-6", children: [
              /* @__PURE__ */ jsx("div", { className: "relative shrink-0", children: /* @__PURE__ */ jsx("div", { className: "flex h-14 w-14 items-center justify-center rounded-xl border border-white/15 bg-[#00182f] font-mono text-base font-bold text-[#edad1a] group-hover:border-[#edad1a]/60 transition-colors", children: String(index + 1).padStart(2, "0") }) }),
              /* @__PURE__ */ jsxs("div", { className: "flex-1 pt-1", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-4", children: [
                  /* @__PURE__ */ jsx("h3", { className: "text-lg md:text-xl font-semibold leading-snug text-white group-hover:text-[#edad1a] transition-colors", children: title }),
                  /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4 text-white/30 group-hover:text-[#edad1a] group-hover:translate-x-1 transition-all shrink-0" })
                ] }),
                /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm md:text-[15px] leading-relaxed text-white/65", children: desc })
              ] })
            ] })
          ] }) }, title))
        ] }) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsx("section", { className: "py-20 md:py-24 bg-[#f7f9fc]", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-6 sm:px-8 lg:px-12", children: [
      /* @__PURE__ */ jsxs(FadeUp$1, { className: "text-center max-w-3xl mx-auto", children: [
        /* @__PURE__ */ jsx(SectionLabel, { label: "Our Approach" }),
        /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold text-[#00274d] leading-tight", children: "A connected manufacturing ecosystem, not just a marketplace." }),
        /* @__PURE__ */ jsx("p", { className: "mt-5 text-slate-600 leading-relaxed", children: "Vendor Infra integrates every layer of the production lifecycle into a single operating environment, from initial specification to final delivery." })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-5", children: approach.map(([Icon, title, desc], index) => /* @__PURE__ */ jsx(FadeUp$1, { delay: index * 0.04, children: /* @__PURE__ */ jsxs("div", { className: "h-full rounded-2xl bg-white border border-slate-200 p-6 shadow-sm", children: [
        /* @__PURE__ */ jsx("div", { className: "mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#edad1a]/15 text-[#edad1a]", children: /* @__PURE__ */ jsx(Icon, { className: "h-5 w-5" }) }),
        /* @__PURE__ */ jsx("h3", { className: "font-semibold text-[#00274d]", children: title }),
        /* @__PURE__ */ jsx("p", { className: "mt-3 text-sm leading-relaxed text-slate-600", children: desc })
      ] }) }, title)) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { id: "capabilities", className: "py-20 md:py-24 bg-white", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-6 sm:px-8 lg:px-12", children: [
      /* @__PURE__ */ jsxs(FadeUp$1, { className: "max-w-3xl", children: [
        /* @__PURE__ */ jsx(SectionLabel, { label: "Capabilities" }),
        /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold text-[#00274d] leading-tight", children: "End-to-end manufacturing, every capability on one platform." })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-5", children: capabilities.map(([Icon, title, desc], index) => /* @__PURE__ */ jsx(FadeUp$1, { delay: index * 0.03, children: /* @__PURE__ */ jsxs("div", { className: "h-full rounded-2xl border border-slate-200 p-6 transition-all hover:-translate-y-1 hover:shadow-xl", children: [
        /* @__PURE__ */ jsx("div", { className: "mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-[#00274d] text-white", children: /* @__PURE__ */ jsx(Icon, { className: "h-5 w-5" }) }),
        /* @__PURE__ */ jsx("h3", { className: "font-semibold text-[#00274d]", children: title }),
        /* @__PURE__ */ jsx("p", { className: "mt-3 text-sm leading-relaxed text-slate-600", children: desc })
      ] }) }, title)) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-20 md:py-24 bg-[#0a1d36] text-white", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-6 sm:px-8 lg:px-12", children: [
      /* @__PURE__ */ jsxs(FadeUp$1, { className: "max-w-3xl", children: [
        /* @__PURE__ */ jsx(SectionLabel, { label: "Process" }),
        /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold leading-tight", children: "How it works, from requirement to delivery." }),
        /* @__PURE__ */ jsx("p", { className: "mt-5 text-white/68 leading-relaxed", children: "A structured nine-stage process removes ambiguity, eliminates coordination gaps, and gives every stakeholder the right information at each step." })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-4", children: process.map(([title, desc], index) => /* @__PURE__ */ jsx(FadeUp$1, { delay: index * 0.025, children: /* @__PURE__ */ jsxs("div", { className: "flex h-full gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-5", children: [
        /* @__PURE__ */ jsx("span", { className: "mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#edad1a] text-white", children: /* @__PURE__ */ jsx(CheckCircle2, { className: "h-5 w-5" }) }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h3", { className: "font-semibold", children: title }),
          /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-white/60 leading-relaxed", children: desc })
        ] })
      ] }) }, title)) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-20 md:py-24 bg-white", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 grid lg:grid-cols-2 gap-12", children: [
      /* @__PURE__ */ jsxs(FadeUp$1, { children: [
        /* @__PURE__ */ jsx(SectionLabel, { label: "Industries" }),
        /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold text-[#00274d] leading-tight", children: "Built for sectors that cannot afford manufacturing risk." }),
        /* @__PURE__ */ jsx("div", { className: "mt-8 space-y-3", children: industries.map((industry) => /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 rounded-xl border border-slate-200 p-4", children: [
          /* @__PURE__ */ jsx(CheckCircle2, { className: "h-5 w-5 text-[#edad1a]" }),
          /* @__PURE__ */ jsx("span", { className: "font-medium text-[#00274d]", children: industry })
        ] }, industry)) })
      ] }),
      /* @__PURE__ */ jsxs(FadeUp$1, { delay: 0.08, children: [
        /* @__PURE__ */ jsx(SectionLabel, { label: "Manufacturing" }),
        /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold text-[#00274d] leading-tight", children: "Core and advanced manufacturing capabilities." }),
        /* @__PURE__ */ jsx("div", { className: "mt-8 flex flex-wrap gap-3", children: manufacturing.map((item2) => /* @__PURE__ */ jsx("span", { className: "rounded-full border border-[#00274d]/10 bg-[#f7f9fc] px-4 py-2 text-sm font-medium text-slate-700", children: item2 }, item2)) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-20 md:py-24 bg-[#f7f9fc]", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-6 sm:px-8 lg:px-12", children: [
      /* @__PURE__ */ jsxs(FadeUp$1, { className: "text-center max-w-3xl mx-auto", children: [
        /* @__PURE__ */ jsx(SectionLabel, { label: "Value Proposition" }),
        /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold text-[#00274d] leading-tight", children: "Built for both sides of the manufacturing equation." })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mt-12 grid lg:grid-cols-2 gap-6", children: [["For Businesses", buyerValue], ["For Manufacturers", vendorValue]].map(([title, values]) => /* @__PURE__ */ jsx(FadeUp$1, { children: /* @__PURE__ */ jsxs("div", { className: "h-full rounded-2xl bg-white border border-slate-200 p-7 shadow-sm", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-xl font-semibold text-[#00274d]", children: title }),
        /* @__PURE__ */ jsx("div", { className: "mt-6 space-y-4", children: values.map((value) => /* @__PURE__ */ jsxs("div", { className: "flex gap-3", children: [
          /* @__PURE__ */ jsx(CheckCircle2, { className: "mt-0.5 h-5 w-5 shrink-0 text-[#edad1a]" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm leading-relaxed text-slate-600", children: value })
        ] }, value)) })
      ] }) }, title)) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-20 md:py-24 bg-[#00274d] text-white", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-6 sm:px-8 lg:px-12", children: [
      /* @__PURE__ */ jsxs(FadeUp$1, { className: "max-w-3xl", children: [
        /* @__PURE__ */ jsx(SectionLabel, { label: "Technology" }),
        /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold text-white leading-tight", children: "The intelligence layer behind every decision." })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mt-12 grid md:grid-cols-2 lg:grid-cols-5 gap-5", children: technology.map(([Icon, title, desc], index) => /* @__PURE__ */ jsx(FadeUp$1, { delay: index * 0.03, children: /* @__PURE__ */ jsxs("div", { className: "h-full rounded-2xl border border-white/15 bg-white/[0.06] p-5", children: [
        /* @__PURE__ */ jsx("div", { className: "mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-[#edad1a]/20 text-[#edad1a]", children: /* @__PURE__ */ jsx(Icon, { className: "h-5 w-5" }) }),
        /* @__PURE__ */ jsx("h3", { className: "font-semibold text-white leading-snug", children: title }),
        /* @__PURE__ */ jsx("p", { className: "mt-3 text-sm leading-relaxed text-white/70", children: desc })
      ] }) }, title)) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-20 md:py-24 bg-[#f7f9fc]", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-6 sm:px-8 lg:px-12", children: [
      /* @__PURE__ */ jsxs(FadeUp$1, { className: "max-w-3xl", children: [
        /* @__PURE__ */ jsx(SectionLabel, { label: "Competitive Advantage" }),
        /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold text-[#00274d] leading-tight", children: "Why Vendor Infra outperforms every alternative." })
      ] }),
      /* @__PURE__ */ jsx(FadeUp$1, { className: "mt-10 overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm", children: /* @__PURE__ */ jsxs("table", { className: "w-full min-w-[760px] text-left text-sm", children: [
        /* @__PURE__ */ jsx("thead", { className: "bg-[#00274d] text-white", children: /* @__PURE__ */ jsxs("tr", { children: [
          /* @__PURE__ */ jsx("th", { className: "px-5 py-4 font-semibold", children: "Dimension" }),
          /* @__PURE__ */ jsx("th", { className: "px-5 py-4 font-semibold", children: "Traditional Approach" }),
          /* @__PURE__ */ jsx("th", { className: "px-5 py-4 font-semibold", children: "Vendor Infra" })
        ] }) }),
        /* @__PURE__ */ jsx("tbody", { children: comparison.map(([dimension, traditional, vendor], index) => /* @__PURE__ */ jsxs("tr", { className: index % 2 === 0 ? "bg-white" : "bg-slate-50", children: [
          /* @__PURE__ */ jsx("td", { className: "px-5 py-4 font-semibold text-[#00274d]", children: dimension }),
          /* @__PURE__ */ jsx("td", { className: "px-5 py-4 text-slate-600", children: traditional }),
          /* @__PURE__ */ jsx("td", { className: "px-5 py-4 text-slate-700 font-medium", children: vendor })
        ] }, dimension)) })
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-20 md:py-24 bg-white", children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto px-6 sm:px-8 lg:px-12", children: /* @__PURE__ */ jsx(FadeUp$1, { children: /* @__PURE__ */ jsx("div", { className: "overflow-hidden rounded-3xl bg-[#f7f9fc] border border-slate-200", children: /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-12", children: [
      /* @__PURE__ */ jsxs("div", { className: "lg:col-span-7 p-8 md:p-12", children: [
        /* @__PURE__ */ jsx(SectionLabel, { label: "Vision" }),
        /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-5xl font-bold leading-tight text-[#00274d]", children: "Building the operating system for manufacturing." }),
        /* @__PURE__ */ jsx("p", { className: "mt-6 text-slate-600 text-base md:text-lg leading-relaxed", children: "Vendor Infra's long-term mission is to become the foundational infrastructure layer for the manufacturing economy, unifying every function that today exists in fragmented systems." }),
        /* @__PURE__ */ jsx("h3", { className: "mt-8 text-2xl md:text-3xl font-semibold text-[#edad1a]", children: "Build Smarter. Scale Faster. Deliver Better." }),
        /* @__PURE__ */ jsx("p", { className: "mt-4 text-slate-600", children: "Join businesses and manufacturers operating on a connected platform where every stage of production is structured, visible, and optimized." }),
        /* @__PURE__ */ jsxs("div", { className: "mt-8 flex flex-col sm:flex-row gap-3", children: [
          /* @__PURE__ */ jsxs(Link, { href: "/contact", className: siteButtonClasses(), children: [
            "Start Your Manufacturing Project ",
            /* @__PURE__ */ jsx(CtaArrow, { variant: "dark" })
          ] }),
          /* @__PURE__ */ jsx(Link, { href: "/services", className: "inline-flex items-center justify-center gap-2 rounded-xl border border-[#00274d]/15 bg-white px-6 py-3 text-sm font-semibold text-[#00274d] transition-all hover:bg-[#00274d] hover:text-white", children: "Discover Verified Partners" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "relative min-h-[320px] lg:col-span-5 bg-[#00274d]", children: [
        /* @__PURE__ */ jsx("img", { src: "/vision-manufacturing.jpg", alt: "Smart manufacturing facility", className: "h-full w-full object-cover opacity-55" }),
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-[#00274d]/80 to-[#edad1a]/20" })
      ] })
    ] }) }) }) }) }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
const Input = React.forwardRef(
  ({ className, type, ...props }, ref) => {
    return /* @__PURE__ */ jsx(
      "input",
      {
        type,
        className: cn(
          "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        ),
        ref,
        ...props
      }
    );
  }
);
Input.displayName = "Input";
const Textarea = React.forwardRef(({ className, ...props }, ref) => {
  return /* @__PURE__ */ jsx(
    "textarea",
    {
      className: cn(
        "flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      ),
      ref,
      ...props
    }
  );
});
Textarea.displayName = "Textarea";
const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
);
const Label = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  LabelPrimitive.Root,
  {
    ref,
    className: cn(labelVariants(), className),
    ...props
  }
));
Label.displayName = LabelPrimitive.Root.displayName;
function Contact() {
  usePageSeo("Contact Us | Vendor Infra", "Get in touch with the Vendor Infra team. Book a demo, ask about pricing, or send us any enquiry.");
  const { toast: toast2 } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const form = e.target;
    const data = {
      name: form.elements.namedItem("name").value,
      company: form.elements.namedItem("company").value,
      email: form.elements.namedItem("email").value,
      phone: form.elements.namedItem("phone").value,
      message: form.elements.namedItem("message").value
    };
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
      if (res.ok) {
        toast2({ title: "Message sent!", description: "Thank you for reaching out." });
        form.reset();
      } else {
        toast2({ title: "Something went wrong", description: "Please try again or call us directly.", variant: "destructive" });
      }
    } catch {
      toast2({ title: "Network error", description: "Please check your connection and try again.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen flex flex-col", children: [
    /* @__PURE__ */ jsx(Navbar, {}),
    /* @__PURE__ */ jsxs("main", { className: "flex-1", children: [
      /* @__PURE__ */ jsxs("section", { "data-preserve-hero-typography": true, className: "relative bg-[#00274d] text-white py-24 overflow-hidden", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 opacity-[0.08] bg-[radial-gradient(circle_at_1px_1px,#ffffff_1px,transparent_0)] bg-[size:40px_40px]" }),
        /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 relative z-10 text-center max-w-4xl animate-in fade-in slide-in-from-bottom-8 duration-1000", children: [
          /* @__PURE__ */ jsx("div", { className: "inline-flex items-center gap-2 rounded-full border border-[#edad1a]/40 bg-[#edad1a]/10 px-4 py-2 text-sm font-semibold text-[#edad1a] mb-6", children: "Contact Us" }),
          /* @__PURE__ */ jsx("h1", { className: "text-4xl md:text-5xl font-semibold leading-tight tracking-tight mb-6", children: "Let's connect and build something great together" })
        ] })
      ] }),
      /* @__PURE__ */ jsx("section", { className: "py-20 bg-[#f5f5f7]", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-6xl mx-auto", children: [
        /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-[0.9fr_1.1fr] gap-8 items-stretch", children: [
          /* @__PURE__ */ jsxs("div", { className: "rounded-2xl bg-[#00274d] text-white p-8 relative overflow-hidden flex flex-col", children: [
            /* @__PURE__ */ jsx("div", { className: "absolute inset-0 opacity-[0.08] bg-[radial-gradient(circle_at_1px_1px,#ffffff_1px,transparent_0)] bg-[size:24px_24px]" }),
            /* @__PURE__ */ jsx("div", { className: "absolute -top-16 -right-16 w-56 h-56 rounded-full border-[28px] border-[#edad1a]/10 pointer-events-none" }),
            /* @__PURE__ */ jsx("div", { className: "absolute -bottom-10 -left-10 w-40 h-40 rounded-full border-[20px] border-[#edad1a]/8 pointer-events-none" }),
            /* @__PURE__ */ jsxs("div", { className: "relative flex flex-col h-full", children: [
              /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-2 text-[#edad1a] text-[11px] font-bold uppercase tracking-[0.35em] mb-5", children: [
                /* @__PURE__ */ jsx("span", { className: "w-6 h-px bg-[#edad1a]/60" }),
                "Get in touch",
                /* @__PURE__ */ jsx("span", { className: "w-6 h-px bg-[#edad1a]/60" })
              ] }),
              /* @__PURE__ */ jsx("h3", { className: "text-2xl md:text-[1.65rem] font-bold leading-tight mb-2", children: "We are here to help you move faster." }),
              /* @__PURE__ */ jsx("p", { className: "text-white/60 text-[0.92rem] leading-relaxed mb-8", children: "Let's connect and collaborate — the Vendor Infra team is just a message away." }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-3 flex-1", children: [
                [
                  {
                    href: "tel:+918800119885",
                    icon: /* @__PURE__ */ jsx(Phone, { className: "w-[18px] h-[18px] text-[#edad1a]" }),
                    label: "Call Center (SaaS)",
                    value: "8800119885"
                  },
                  {
                    href: "tel:+918800404840",
                    icon: /* @__PURE__ */ jsx(Phone, { className: "w-[18px] h-[18px] text-[#edad1a]" }),
                    label: "Call Center (Supply Chain)",
                    value: "8800404840"
                  },
                  {
                    href: "mailto:enquiry@vendorinfra.com",
                    icon: /* @__PURE__ */ jsx(Mail, { className: "w-[18px] h-[18px] text-[#edad1a]" }),
                    label: "Email",
                    value: "enquiry@vendorinfra.com"
                  }
                ].map((item2) => /* @__PURE__ */ jsxs(
                  "a",
                  {
                    href: item2.href,
                    className: "group flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 hover:bg-white/10 hover:border-[#edad1a]/30 transition-all duration-200",
                    children: [
                      /* @__PURE__ */ jsx("div", { className: "w-9 h-9 rounded-lg bg-[#edad1a]/15 flex items-center justify-center shrink-0 group-hover:bg-[#edad1a]/25 transition-colors", children: item2.icon }),
                      /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
                        /* @__PURE__ */ jsx("span", { className: "block text-[11px] text-white/50 font-semibold uppercase tracking-wide mb-0.5", children: item2.label }),
                        /* @__PURE__ */ jsx("span", { className: "block text-white font-semibold text-[0.9rem] truncate", children: item2.value })
                      ] })
                    ]
                  },
                  item2.value
                )),
                /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4 rounded-xl border border-white/10 bg-white/5 px-4 py-3.5", children: [
                  /* @__PURE__ */ jsx("div", { className: "w-9 h-9 rounded-lg bg-[#edad1a]/15 flex items-center justify-center shrink-0 mt-0.5", children: /* @__PURE__ */ jsx(MapPin, { className: "w-[18px] h-[18px] text-[#edad1a]" }) }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("span", { className: "block text-[11px] text-white/50 font-semibold uppercase tracking-wide mb-0.5", children: "Head Office" }),
                    /* @__PURE__ */ jsxs("span", { className: "block text-white font-semibold text-[0.9rem] leading-relaxed", children: [
                      "Suit No. 1436-1440, Plus Offices,",
                      /* @__PURE__ */ jsx("br", {}),
                      "Landmark Cyber Park,",
                      /* @__PURE__ */ jsx("br", {}),
                      "Sector 67, Gurugram,",
                      /* @__PURE__ */ jsx("br", {}),
                      "Haryana, India - 122101"
                    ] })
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "mt-8 pt-6 border-t border-white/10", children: [
                /* @__PURE__ */ jsx("p", { className: "text-[#edad1a] text-[11px] font-bold uppercase tracking-[0.3em] mb-4", children: "Follow Us" }),
                /* @__PURE__ */ jsxs("div", { className: "flex gap-2.5", children: [
                  /* @__PURE__ */ jsx(
                    "a",
                    {
                      href: "https://www.facebook.com/VENDORINFRA/",
                      target: "_blank",
                      rel: "noopener noreferrer",
                      className: "w-10 h-10 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center text-white hover:bg-[#1877F2] hover:border-[#1877F2] transition-all duration-200",
                      children: /* @__PURE__ */ jsx(Facebook, { className: "w-4 h-4" })
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "a",
                    {
                      href: "https://x.com/vendorinfra",
                      target: "_blank",
                      rel: "noopener noreferrer",
                      className: "w-10 h-10 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center text-white hover:bg-black hover:border-black transition-all duration-200",
                      children: /* @__PURE__ */ jsx(Twitter, { className: "w-4 h-4" })
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "a",
                    {
                      href: "https://www.linkedin.com/company/vendor-infra/",
                      target: "_blank",
                      rel: "noopener noreferrer",
                      className: "w-10 h-10 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center text-white hover:bg-[#0077B5] hover:border-[#0077B5] transition-all duration-200",
                      children: /* @__PURE__ */ jsx(Linkedin, { className: "w-4 h-4" })
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "a",
                    {
                      href: "https://www.instagram.com/vendorinfra/",
                      target: "_blank",
                      rel: "noopener noreferrer",
                      className: "w-10 h-10 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center text-white hover:bg-[#E1306C] hover:border-[#E1306C] transition-all duration-200",
                      children: /* @__PURE__ */ jsx(Instagram, { className: "w-4 h-4" })
                    }
                  )
                ] })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl shadow-sm border-1 border-[#00274d] p-8 flex flex-col", style: { backgroundColor: "#ffffff" }, children: [
            /* @__PURE__ */ jsxs("div", { className: "mb-7", children: [
              /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-2 text-[#edad1a] text-[11px] font-bold uppercase tracking-[0.35em] mb-4", children: [
                /* @__PURE__ */ jsx("span", { className: "w-6 h-px bg-[#edad1a]/60" }),
                "Send an Enquiry",
                /* @__PURE__ */ jsx("span", { className: "w-6 h-px bg-[#edad1a]/60" })
              ] }),
              /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold text-[#00274d] leading-snug", children: "Tell us your requirements, and our team will get back to you shortly." })
            ] }),
            /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-5 flex-1 flex flex-col", children: [
              /* @__PURE__ */ jsxs("div", { className: "grid sm:grid-cols-2 gap-5", children: [
                /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxs(Label, { htmlFor: "name", className: "text-[#00274d] font-semibold text-[13px]", children: [
                    "Your Name ",
                    /* @__PURE__ */ jsx("span", { className: "text-red-500", children: "*" })
                  ] }),
                  /* @__PURE__ */ jsx(
                    Input,
                    {
                      id: "name",
                      name: "name",
                      required: true,
                      placeholder: "Your Name",
                      className: "h-11 bg-gray-50 border-gray-200 rounded-lg text-[13.5px] placeholder:text-[12.5px] placeholder:text-gray-400 focus:border-[#edad1a] focus:ring-2 focus:ring-[#edad1a]/15 transition-all"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsx(Label, { htmlFor: "company", className: "text-[#00274d] font-semibold text-[13px]", children: "Company Name" }),
                  /* @__PURE__ */ jsx(
                    Input,
                    {
                      id: "company",
                      name: "company",
                      placeholder: "Company Name",
                      className: "h-11 bg-gray-50 border-gray-200 rounded-lg text-[13.5px] placeholder:text-[12.5px] placeholder:text-gray-400 focus:border-[#edad1a] focus:ring-2 focus:ring-[#edad1a]/15 transition-all"
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "grid sm:grid-cols-2 gap-5", children: [
                /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxs(Label, { htmlFor: "email", className: "text-[#00274d] font-semibold text-[13px]", children: [
                    "Your Email ",
                    /* @__PURE__ */ jsx("span", { className: "text-red-500", children: "*" })
                  ] }),
                  /* @__PURE__ */ jsx(
                    Input,
                    {
                      id: "email",
                      name: "email",
                      type: "email",
                      required: true,
                      placeholder: "Your Email",
                      className: "h-11 bg-gray-50 border-gray-200 rounded-lg text-[13.5px] placeholder:text-[12.5px] placeholder:text-gray-400 focus:border-[#edad1a] focus:ring-2 focus:ring-[#edad1a]/15 transition-all"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxs(Label, { htmlFor: "phone", className: "text-[#00274d] font-semibold text-[13px]", children: [
                    "Contact Number ",
                    /* @__PURE__ */ jsx("span", { className: "text-red-500", children: "*" })
                  ] }),
                  /* @__PURE__ */ jsx(
                    Input,
                    {
                      id: "phone",
                      name: "phone",
                      type: "tel",
                      required: true,
                      placeholder: "Contact Number",
                      className: "h-11 bg-gray-50 border-gray-200 rounded-lg text-[13.5px] placeholder:text-[12.5px] placeholder:text-gray-400 focus:border-[#edad1a] focus:ring-2 focus:ring-[#edad1a]/15 transition-all"
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsx(Label, { htmlFor: "message", className: "text-[#00274d] font-semibold text-[13px]", children: "Write your query here" }),
                /* @__PURE__ */ jsx(
                  Textarea,
                  {
                    id: "message",
                    name: "message",
                    placeholder: "Write your query here",
                    rows: 4,
                    className: "bg-gray-50 border-gray-200 rounded-lg resize-none text-[13.5px] placeholder:text-[12.5px] placeholder:text-gray-400 focus:border-[#edad1a] focus:ring-2 focus:ring-[#edad1a]/15 transition-all"
                  }
                )
              ] }),
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "submit",
                  disabled: isSubmitting,
                  className: siteButtonClasses("primary", "w-full py-3.5 rounded-xl normal-case tracking-normal disabled:cursor-not-allowed disabled:opacity-60 text-[15px] font-semibold"),
                  children: isSubmitting ? /* @__PURE__ */ jsxs(Fragment, { children: [
                    /* @__PURE__ */ jsx("span", { className: "animate-spin rounded-full h-4 w-4 border-1 border-[#00274d]/30 border-t-[#00274d]" }),
                    "Sending..."
                  ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
                    /* @__PURE__ */ jsx(Send, { className: "w-4 h-4" }),
                    "Submit"
                  ] })
                }
              )
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "mt-8 relative rounded-2xl p-[2px] shadow-xl shadow-[#00274d]/15", style: { background: "linear-gradient(135deg, #00274d 0%, #0a3b73 40%, #edad1a 100%)" }, children: /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-[14px] overflow-hidden", children: [
          /* @__PURE__ */ jsxs("div", { className: "px-6 py-5 border-b border-gray-100 flex items-center justify-between gap-3 bg-gradient-to-r from-[#00274d] to-[#0a3b73] text-white", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-xl bg-[#edad1a] flex items-center justify-center shadow-md", children: /* @__PURE__ */ jsx(MapPin, { className: "w-5 h-5 text-white" }) }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("p", { className: "font-bold", children: "Visit Our Office" }),
                /* @__PURE__ */ jsx("p", { className: "text-xs text-white/70", children: "Landmark Cyber Park, Sector 67, Gurugram" })
              ] })
            ] }),
            /* @__PURE__ */ jsx("a", { href: "https://maps.google.com/?q=Landmark+Cyber+Park+Sector+67+Gurugram", target: "_blank", rel: "noopener noreferrer", className: siteButtonClasses("primary", "hidden sm:inline-flex px-3 py-2 text-xs normal-case tracking-normal"), children: "Get Directions" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsx(
              "iframe",
              {
                title: "Vendor Infra Office Location",
                src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3509.6!2d77.0927!3d28.4185!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d23439c000001%3A0x4000000000000000!2sLandmark+Cyber+Park%2C+Sector+67%2C+Gurugram%2C+Haryana+122102!5e0!3m2!1sen!2sin!4v1700000000000",
                width: "100%",
                height: "380",
                style: { border: 0 },
                allowFullScreen: true,
                loading: "eager",
                referrerPolicy: "no-referrer-when-downgrade"
              }
            ),
            /* @__PURE__ */ jsxs("div", { className: "pointer-events-none absolute top-4 left-4 bg-white rounded-xl shadow-lg border border-gray-100 p-3 flex items-center gap-2.5 max-w-[260px]", children: [
              /* @__PURE__ */ jsx("div", { className: "w-9 h-9 rounded-lg bg-[#00274d] flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsx(MapPin, { className: "w-4 h-4 text-[#edad1a]" }) }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("p", { className: "text-[11px] font-bold text-[#00274d] leading-tight", children: "Vendor Infra HQ" }),
                /* @__PURE__ */ jsx("p", { className: "text-[10px] text-gray-500 leading-snug", children: "Suit 1436-1440, Plus Offices" })
              ] })
            ] })
          ] })
        ] }) })
      ] }) }) })
    ] }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
const blogPosts = [
  {
    slug: "marketplace-plants-equipment",
    title: "Vendor Infra Marketplace for Plants and Equipment: Unlocking the Power of a Marketplace for Plants and Equipment",
    date: "March 31, 2026",
    author: "Tanay Singh",
    tags: ["Equipments", "Infrastructure", "Marketplace", "Technology"],
    preview: "In the ever-evolving landscape of industries, the effective management of plants and equipment is crucial for businesses seeking to optimize their Return on Investment (ROI)...",
    content: `
In the ever-evolving landscape of industries, the effective management of plants and equipment is crucial for businesses seeking to optimize their Return on Investment (ROI). Plants and equipment form the backbone of numerous sectors, from construction and manufacturing to agriculture and energy. However, the traditional approach to managing these assets has often been fragmented, inefficient, and costly.

Enter the concept of a marketplace for plants and equipment — a transformative solution that is revolutionizing how businesses acquire, utilize, and manage their physical assets. Vendor Infra is at the forefront of this revolution, offering a comprehensive marketplace that addresses the unique challenges faced by industries in managing their plants and equipment portfolios.

## The Challenge of Traditional Asset Management

Historically, businesses have struggled with several key challenges when it comes to plants and equipment:

**Fragmented Procurement**: Companies often had to deal with multiple vendors, each with their own pricing structures, quality standards, and delivery timelines. This fragmentation led to inefficiencies, increased costs, and a lack of transparency.

**Underutilization of Assets**: Equipment that is not in active use represents a significant financial burden. Traditional asset management approaches often failed to optimize the utilization of these assets, leading to unnecessary capital expenditure.

**Lack of Market Visibility**: Businesses lacked access to real-time market data, making it difficult to make informed decisions about buying, selling, or leasing equipment. This information asymmetry often resulted in suboptimal transactions.

**Maintenance and Lifecycle Management**: Keeping track of maintenance schedules, warranty information, and end-of-life decisions for a large portfolio of plants and equipment was a complex and time-consuming task.

## The Vendor Infra Marketplace Solution

Vendor Infra's marketplace for plants and equipment addresses these challenges head-on, offering a holistic platform that connects buyers and sellers while providing a suite of tools for effective asset management.

**Centralized Procurement Platform**: Vendor Infra brings together a vast network of verified vendors and suppliers, offering a wide range of plants and equipment across various categories. This centralized platform simplifies the procurement process, reduces costs, and ensures quality through rigorous vendor verification.

**AI-Powered Asset Optimization**: Leveraging advanced AI and machine learning algorithms, Vendor Infra's platform analyzes usage patterns, market trends, and financial data to provide actionable insights on asset utilization. This enables businesses to make data-driven decisions about when to buy, sell, lease, or retire equipment.

**Real-Time Market Intelligence**: The platform provides access to real-time market data, including pricing trends, availability, and demand forecasts. This empowers businesses to make informed decisions and negotiate better deals.

**Comprehensive Lifecycle Management**: Vendor Infra's platform offers end-to-end lifecycle management capabilities, from procurement and deployment to maintenance and disposal. This holistic approach ensures that businesses can maximize the value of their plants and equipment throughout their useful life.

## The Impact on ROI

By leveraging Vendor Infra's marketplace, businesses can achieve significant improvements in their ROI:

- **Cost Reduction**: Centralized procurement and AI-powered negotiations can lead to cost savings of 15-25% on equipment purchases.
- **Improved Utilization**: Better asset tracking and optimization can increase equipment utilization rates by 20-30%, reducing the need for additional capital expenditure.
- **Faster Transactions**: Streamlined processes and real-time market access can reduce procurement cycles by up to 50%.
- **Better Decision Making**: Access to comprehensive data and analytics enables more informed decisions, leading to better long-term outcomes.

## Conclusion

The marketplace for plants and equipment represents a paradigm shift in how businesses manage their physical assets. By providing a centralized, AI-powered platform that addresses the key challenges of asset management, Vendor Infra is helping businesses across India optimize their ROI and drive sustainable growth.

As industries continue to evolve and the demand for efficient asset management grows, platforms like Vendor Infra will play an increasingly important role in shaping the future of industrial operations. The question is not whether to embrace this transformation, but how quickly businesses can adapt to stay competitive in an increasingly dynamic marketplace.
    `
  },
  {
    slug: "saas-revolution-construction",
    title: "SaaS Revolution in Construction and Infrastructure Industry",
    date: "March 30, 2026",
    author: "Tanay Singh",
    tags: ["Construction", "Infrastructure", "SaaS", "Technology"],
    preview: "The Indian economy stands on the shoulders of the Construction and Infrastructure industry, encompassing vital sectors like roads and bridges, railways, urban infrastructure...",
    content: `
The Indian economy stands on the shoulders of the Construction and Infrastructure industry, encompassing vital sectors like roads and bridges, railways, urban infrastructure, and more. This industry is a key driver of economic growth, employment, and national development. However, it has traditionally been characterized by fragmented processes, lack of transparency, and inefficiencies that have hindered its full potential.

The advent of Software as a Service (SaaS) technology is changing this narrative, ushering in a new era of efficiency, transparency, and innovation in the Construction and Infrastructure industry. Vendor Infra is at the forefront of this SaaS revolution, offering a comprehensive platform that addresses the unique challenges faced by this sector.

## The Current State of the Industry

The Construction and Infrastructure industry in India is a complex ecosystem involving multiple stakeholders — contractors, subcontractors, suppliers, consultants, and government agencies. The traditional way of managing projects and supply chains in this industry has been characterized by:

**Paper-Based Processes**: Much of the industry still relies on paper-based documentation, leading to inefficiencies, errors, and delays.

**Lack of Real-Time Visibility**: Project managers often lack real-time visibility into project status, resource utilization, and supply chain performance.

**Fragmented Communication**: Communication between different stakeholders is often fragmented and inefficient, leading to misunderstandings and delays.

**Data Silos**: Critical data is often stored in silos, making it difficult to gain a comprehensive view of operations and make informed decisions.

## How SaaS is Transforming the Industry

SaaS technology is addressing these challenges by providing cloud-based solutions that are accessible, scalable, and affordable. Here's how SaaS is transforming the Construction and Infrastructure industry:

**Streamlined Project Management**: SaaS platforms offer powerful project management tools that enable real-time tracking of project milestones, resource utilization, and budget performance. This helps project managers stay on top of multiple projects simultaneously and make informed decisions.

**Enhanced Collaboration**: Cloud-based SaaS platforms facilitate seamless collaboration between different stakeholders, regardless of their location. This improves communication, reduces misunderstandings, and accelerates decision-making.

**Data-Driven Decision Making**: SaaS platforms collect and analyze vast amounts of data, providing actionable insights that help businesses make better decisions. From optimizing supply chains to identifying cost-saving opportunities, data-driven decision making is becoming a key competitive advantage.

**Improved Compliance and Risk Management**: SaaS solutions can automate compliance tracking and risk management, helping businesses stay on top of regulatory requirements and mitigate potential risks.

## The Vendor Infra Advantage

Vendor Infra's SaaS platform is specifically designed for the Construction and Infrastructure industry, offering a range of features that address the unique challenges of this sector:

- **Vendor Discovery and Verification**: A comprehensive database of verified vendors and suppliers, making it easy to find the right partners for any project.
- **Supply Chain Management**: End-to-end supply chain management tools that provide real-time visibility into procurement, logistics, and inventory.
- **Project Finance**: Integrated finance tools that streamline payment processes and improve cash flow management.
- **AI-Powered Analytics**: Advanced analytics capabilities that provide actionable insights on project performance, market trends, and operational efficiency.

## The Road Ahead

The SaaS revolution in the Construction and Infrastructure industry is just beginning. As more businesses adopt these technologies and the ecosystem matures, we can expect to see even greater levels of efficiency, transparency, and innovation.

Vendor Infra is committed to being at the forefront of this transformation, continuously innovating and expanding its platform to meet the evolving needs of the industry. By embracing SaaS technology, businesses in the Construction and Infrastructure sector can position themselves for success in an increasingly competitive and technology-driven landscape.
    `
  },
  {
    slug: "digitalisation-construction",
    title: "Promote Digitalisation in Construction Industry: The Catalysts of Change and the Power of Innovation",
    date: "March 30, 2026",
    author: "Tanay Singh",
    tags: ["Artificial Intelligence", "Construction", "Digitalisation", "SaaS", "Technology"],
    preview: "The construction industry is undergoing a digital revolution, and it's high time to embrace the catalysts of change and the power of innovation...",
    content: `
The construction industry is undergoing a digital revolution, and it's high time to embrace the catalysts of change and the power of innovation. Digitalisation in construction is not just a trend — it's a fundamental shift in how the industry operates, creating new opportunities for efficiency, sustainability, and growth.

## Why Digitalisation Matters

The construction industry has historically been one of the least digitised sectors of the global economy. This has led to significant inefficiencies, cost overruns, and productivity gaps. However, the tide is turning, driven by several key factors:

**Increasing Complexity**: Modern construction projects are becoming increasingly complex, involving multiple stakeholders, intricate supply chains, and sophisticated regulatory requirements. Digital tools are essential for managing this complexity effectively.

**Rising Cost Pressures**: With margins under pressure, construction companies are looking to digital solutions to reduce costs and improve efficiency. Digital tools can help optimize resource utilization, reduce waste, and streamline processes.

**Sustainability Imperatives**: The construction industry is under increasing pressure to reduce its environmental impact. Digital tools can help companies design more sustainable buildings, optimize energy use, and minimize waste.

**Talent Shortage**: The construction industry is facing a significant talent shortage, particularly in technical roles. Digital tools can help companies do more with less, compensating for the lack of skilled workers.

## The Catalysts of Digital Change

Several key technologies are driving the digitalisation of the construction industry:

**Building Information Modelling (BIM)**: BIM is a digital representation of a building's physical and functional characteristics. It enables architects, engineers, and construction professionals to collaborate more effectively, reducing errors and improving efficiency.

**Internet of Things (IoT)**: IoT sensors can monitor everything from equipment performance to environmental conditions on construction sites, providing real-time data that can be used to optimize operations and prevent problems before they occur.

**Artificial Intelligence and Machine Learning**: AI and ML are being used to analyze vast amounts of data and provide actionable insights on everything from project scheduling to risk management. These technologies can help construction companies make better decisions and improve outcomes.

**Drones and Autonomous Vehicles**: Drones are being used for site surveys, progress monitoring, and safety inspections, while autonomous vehicles are beginning to be deployed for tasks like material transport and earthmoving.

**3D Printing**: 3D printing is enabling the production of building components with unprecedented precision and efficiency, opening up new possibilities for design and construction.

## The Vendor Infra Approach to Digitalisation

Vendor Infra is committed to driving digitalisation in the construction industry through its comprehensive platform. Our approach is built on three key pillars:

**Connect**: We connect contractors, suppliers, consultants, and other stakeholders through our digital platform, enabling seamless collaboration and information sharing.

**Optimize**: We use AI and data analytics to help our clients optimize their operations, from procurement and supply chain management to project scheduling and resource allocation.

**Innovate**: We continuously innovate our platform, incorporating new technologies and best practices to stay at the forefront of the digitalisation revolution.

## The Path Forward

The digitalisation of the construction industry is not a destination — it's a journey. As technologies evolve and new opportunities emerge, the industry will need to adapt continuously. Vendor Infra is committed to being a partner on this journey, providing the tools, insights, and support that construction companies need to thrive in a digital world.

The future of construction is digital, and the time to embrace that future is now. Companies that take the lead in digitalisation will be better positioned to compete, grow, and create value for their stakeholders. The question is: are you ready to embrace the digital revolution?
    `
  },
  {
    slug: "ai-for-business",
    title: "How can I get started with Artificial Intelligence for my business?",
    date: "February 19, 2024",
    author: "Rohit",
    tags: ["Artificial Intelligence", "Technology", "Revolution"],
    preview: "The Indian economy stands on the shoulders of the Construction and Infrastructure industry. AI is rapidly transforming how businesses operate, make decisions, and serve their customers...",
    content: `
Artificial Intelligence (AI) is rapidly transforming how businesses operate, make decisions, and serve their customers. For many business owners and managers, especially in traditional industries like construction and infrastructure, the prospect of implementing AI can seem daunting. However, getting started with AI doesn't have to be complicated. This guide will walk you through the key steps to begin your AI journey.

## Understanding AI and Its Business Applications

Before diving into implementation, it's important to understand what AI is and how it can benefit your business. At its core, AI refers to computer systems that can perform tasks that typically require human intelligence — things like understanding language, recognizing patterns, making decisions, and learning from experience.

For businesses in the construction and infrastructure sector, AI can be applied in numerous ways:

**Predictive Maintenance**: AI can analyze data from equipment sensors to predict when maintenance is needed, reducing downtime and extending equipment life.

**Supply Chain Optimization**: AI can analyze supply chain data to identify inefficiencies, predict demand, and optimize inventory levels.

**Project Management**: AI can help with project scheduling, resource allocation, and risk management, improving project outcomes and reducing costs.

**Quality Control**: AI-powered image recognition can detect defects and quality issues in construction materials and finished structures.

**Customer Service**: AI chatbots can handle routine customer inquiries, freeing up your team to focus on more complex issues.

## Step 1: Identify Your Business Challenges

The first step in getting started with AI is to identify the specific business challenges you want to address. Rather than implementing AI for its own sake, focus on where it can create the most value for your business.

Ask yourself:
- What are the biggest pain points in your operations?
- Where are you spending the most time on repetitive tasks?
- What decisions would benefit from better data and analysis?
- Where are you losing money due to inefficiencies or errors?

## Step 2: Start Small and Scale

One of the most common mistakes businesses make when adopting AI is trying to do too much too soon. Instead, start with a small, well-defined pilot project that can demonstrate clear ROI. This approach allows you to:

- Learn from experience without risking too much
- Build internal expertise and confidence
- Demonstrate value to stakeholders
- Refine your approach before scaling up

## Step 3: Choose the Right Tools and Partners

You don't need to build AI from scratch. There are many off-the-shelf AI solutions and platforms that can be customized to your specific needs. When choosing AI tools and partners, consider:

**Ease of Use**: Look for solutions that your team can use without extensive technical expertise.

**Integration Capabilities**: Ensure the AI solution can integrate with your existing systems and workflows.

**Scalability**: Choose solutions that can grow with your business.

**Support and Training**: Make sure the vendor provides adequate support and training resources.

**Data Security**: Ensure the solution meets your data security and privacy requirements.

## Step 4: Prepare Your Data

AI is only as good as the data it's trained on. Before implementing AI, you need to ensure your data is:

- **Accurate**: Data should be correct and up-to-date.
- **Complete**: There should be minimal missing data.
- **Consistent**: Data formats and definitions should be standardized.
- **Accessible**: Data should be available in a format that can be used by AI systems.

## Step 5: Build Internal Capabilities

Successful AI implementation requires more than just technology — it requires people who can use it effectively. Invest in training your team and, if necessary, hire new talent with AI expertise. Consider creating an internal AI champion who can drive adoption and help colleagues navigate the technology.

## How Vendor Infra Can Help

Vendor Infra's AI-powered platform is designed to make it easy for businesses in the construction and infrastructure sector to get started with AI. Our platform provides:

- **Ready-to-Use AI Tools**: Pre-built AI capabilities that can be deployed quickly and without extensive technical expertise.
- **Data Integration**: Easy integration with your existing data sources and systems.
- **Expert Support**: A team of AI experts who can help you identify opportunities and implement solutions.
- **Continuous Learning**: Our platform continuously learns and improves, ensuring you always have access to the latest AI capabilities.

## Conclusion

Getting started with AI doesn't have to be overwhelming. By taking a structured approach — identifying your business challenges, starting small, choosing the right tools, preparing your data, and building internal capabilities — you can begin your AI journey with confidence.

The businesses that succeed in the digital age will be those that embrace AI as a core part of their operations. The time to start is now, and with the right approach and partners, the rewards can be significant.
    `
  }
];
function Blog() {
  useEffect(() => {
    setPageSeo({
      title: "Blog — Insights & Updates | Vendor Infra",
      description: "Insights and updates from Vendor Infra on AI, infrastructure, construction, and procurement."
    });
    return () => resetPageSeo();
  }, []);
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen flex flex-col", children: [
    /* @__PURE__ */ jsx(Navbar, {}),
    /* @__PURE__ */ jsxs("main", { className: "flex-1", children: [
      /* @__PURE__ */ jsxs("section", { "data-preserve-hero-typography": true, className: "relative bg-[#00274d] text-white py-24 overflow-hidden", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 opacity-[0.08] bg-[radial-gradient(circle_at_1px_1px,#ffffff_1px,transparent_0)] bg-[size:40px_40px]" }),
        /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 relative z-10 text-center max-w-4xl", children: [
          /* @__PURE__ */ jsx("div", { className: "inline-flex items-center gap-2 rounded-full border border-[#edad1a]/40 bg-[#edad1a]/10 px-4 py-2 text-sm font-semibold text-[#edad1a] mb-6", children: "Blog" }),
          /* @__PURE__ */ jsx("h1", { className: "text-4xl md:text-5xl font-semibold leading-tight tracking-tight mb-6", children: "Insights & Updates" })
        ] })
      ] }),
      /* @__PURE__ */ jsx("section", { className: "py-24 bg-gray-50", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4", children: /* @__PURE__ */ jsx("div", { className: "max-w-4xl mx-auto space-y-10", children: blogPosts.map((post) => /* @__PURE__ */ jsx(
        Card,
        {
          className: "overflow-hidden border border-[#00274d] hover:shadow-xl transition-all duration-300 group",
          children: /* @__PURE__ */ jsx(CardContent, { className: "p-0", children: /* @__PURE__ */ jsxs("div", { className: "p-8 md:p-10 space-y-5 bg-white", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-4 text-sm font-medium text-muted-foreground", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsx(Calendar, { className: "w-4 h-4 text-[#edad1a]" }),
                post.date
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsx(User, { className: "w-4 h-4 text-[#edad1a]" }),
                post.author
              ] })
            ] }),
            /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold leading-tight text-[#00274d] group-hover:text-[#edad1a] transition-colors", children: /* @__PURE__ */ jsx(Link, { href: `/blog/${post.slug}`, children: post.title }) }),
            /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-base leading-relaxed", children: post.preview }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-2 pt-2", children: [
              /* @__PURE__ */ jsx(Tag, { className: "w-4 h-4 text-muted-foreground mr-1" }),
              post.tags.map((tag) => /* @__PURE__ */ jsx("span", { className: "px-3 py-1 bg-[#00274d]/8 text-[#00274d] rounded-full text-xs font-semibold uppercase tracking-wider", children: tag }, tag))
            ] }),
            /* @__PURE__ */ jsx("div", { className: "pt-4 border-t border-border/50", children: /* @__PURE__ */ jsxs(Link, { href: `/blog/${post.slug}`, className: "inline-flex items-center gap-2 text-[#edad1a] font-semibold hover:text-[#00274d] transition-colors", children: [
              "Read Full Article",
              /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4 group-hover:translate-x-1 transition-transform" })
            ] }) })
          ] }) })
        },
        post.slug
      )) }) }) })
    ] }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
function BlogPost() {
  const { slug } = useParams();
  const post = blogPosts.find((p) => p.slug === slug);
  const postIndex = blogPosts.findIndex((p) => p.slug === slug);
  const prevPost = postIndex > 0 ? blogPosts[postIndex - 1] : null;
  const nextPost = postIndex < blogPosts.length - 1 ? blogPosts[postIndex + 1] : null;
  useEffect(() => {
    if (post) {
      setPageSeo({
        title: `${post.title} | Vendor Infra Blog`,
        description: post.preview
      });
    }
    return () => resetPageSeo();
  }, [post]);
  if (!post) {
    return /* @__PURE__ */ jsxs("div", { className: "min-h-screen flex flex-col", children: [
      /* @__PURE__ */ jsx(Navbar, {}),
      /* @__PURE__ */ jsx("div", { className: "flex-1 flex items-center justify-center", children: /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-[#00274d] mb-4", children: "Article not found" }),
        /* @__PURE__ */ jsx(Link, { href: "/blog", className: "text-[#edad1a] hover:underline font-semibold", children: "← Back to Blog" })
      ] }) }),
      /* @__PURE__ */ jsx(Footer, {})
    ] });
  }
  const paragraphs = post.content.trim().split("\n\n");
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen flex flex-col", children: [
    /* @__PURE__ */ jsx(Navbar, {}),
    /* @__PURE__ */ jsxs("section", { "data-preserve-hero-typography": true, className: "relative bg-[#00274d] text-white py-24 px-4 overflow-hidden", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 opacity-[0.08] bg-[radial-gradient(circle_at_1px_1px,#ffffff_1px,transparent_0)] bg-[size:40px_40px]" }),
      /* @__PURE__ */ jsx("div", { className: "absolute bottom-0 left-0 right-0 h-1 bg-[#edad1a]" }),
      /* @__PURE__ */ jsxs("div", { className: "container mx-auto max-w-4xl relative z-10", children: [
        /* @__PURE__ */ jsxs(Link, { href: "/blog", className: "inline-flex items-center gap-2 text-[#edad1a] text-sm font-semibold mb-8 hover:underline", children: [
          /* @__PURE__ */ jsx(ArrowLeft, { className: "w-4 h-4" }),
          " Back to Blog"
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2 mb-5", children: post.tags.map((tag) => /* @__PURE__ */ jsx("span", { className: "inline-flex items-center gap-2 rounded-full border border-[#edad1a]/40 bg-[#edad1a]/10 px-3 py-1 text-xs font-semibold text-[#edad1a] uppercase tracking-wider", children: tag }, tag)) }),
        /* @__PURE__ */ jsx("h1", { className: "text-4xl md:text-5xl font-semibold leading-tight tracking-tight mb-6", children: post.title }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-5 text-white/70 text-sm", children: [
          /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsx(Calendar, { className: "w-4 h-4 text-[#edad1a]" }),
            post.date
          ] }),
          /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsx(User, { className: "w-4 h-4 text-[#edad1a]" }),
            post.author
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("main", { className: "flex-1 bg-white py-14", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto max-w-3xl px-4", children: [
      /* @__PURE__ */ jsx("article", { className: "prose prose-lg max-w-none\r\n            prose-headings:font-semibold prose-headings:text-[#00274d]\r\n            prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4\r\n            prose-p:text-gray-600 prose-p:leading-relaxed\r\n            prose-strong:text-[#00274d]\r\n            prose-li:text-gray-600\r\n          ", children: paragraphs.map((block, i) => {
        const trimmed = block.trim();
        if (!trimmed) return null;
        if (trimmed.startsWith("## ")) {
          return /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold text-[#00274d] mt-10 mb-4 pb-2 border-b border-gray-100", children: trimmed.replace("## ", "") }, i);
        }
        if (trimmed.startsWith("**") && trimmed.includes("**:")) {
          const [boldPart, ...rest] = trimmed.split("**:");
          const label = boldPart.replace("**", "");
          return /* @__PURE__ */ jsxs("p", { className: "text-gray-600 leading-relaxed mb-4", children: [
            /* @__PURE__ */ jsxs("strong", { className: "text-[#00274d] font-bold", children: [
              label,
              ":"
            ] }),
            rest.join("**:")
          ] }, i);
        }
        if (trimmed.startsWith("- ")) {
          const items = trimmed.split("\n").filter((l) => l.startsWith("- "));
          return /* @__PURE__ */ jsx("ul", { className: "list-none space-y-2 mb-6", children: items.map((item2, j) => /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2 text-gray-600", children: [
            /* @__PURE__ */ jsx("span", { className: "mt-1.5 w-2 h-2 rounded-full bg-[#edad1a] shrink-0" }),
            /* @__PURE__ */ jsx("span", { children: item2.replace("- ", "").replace(/\*\*(.*?)\*\*/g, "$1") })
          ] }, j)) }, i);
        }
        return /* @__PURE__ */ jsx("p", { className: "text-gray-600 leading-relaxed mb-5", children: trimmed.replace(/\*\*(.*?)\*\*/g, "$1") }, i);
      }) }),
      /* @__PURE__ */ jsxs("div", { className: "mt-12 pt-8 border-t border-gray-200 flex flex-wrap items-center gap-2", children: [
        /* @__PURE__ */ jsx(Tag, { className: "w-4 h-4 text-gray-400" }),
        post.tags.map((tag) => /* @__PURE__ */ jsx("span", { className: "px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-semibold uppercase tracking-wider", children: tag }, tag))
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
        prevPost ? /* @__PURE__ */ jsxs(Link, { href: `/blog/${prevPost.slug}`, className: "group flex flex-col gap-1 border border-gray-200 rounded-xl p-5 hover:border-[#edad1a] hover:shadow-md transition-all", children: [
          /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1 text-xs font-bold text-gray-400 uppercase tracking-wider", children: [
            /* @__PURE__ */ jsx(ArrowLeft, { className: "w-3.5 h-3.5" }),
            " Previous"
          ] }),
          /* @__PURE__ */ jsx("span", { className: "text-sm font-semibold text-[#00274d] group-hover:text-[#edad1a] transition-colors leading-snug line-clamp-2", children: prevPost.title })
        ] }) : /* @__PURE__ */ jsx("div", {}),
        nextPost ? /* @__PURE__ */ jsxs(Link, { href: `/blog/${nextPost.slug}`, className: "group flex flex-col gap-1 border border-gray-200 rounded-xl p-5 hover:border-[#edad1a] hover:shadow-md transition-all text-right sm:ml-auto sm:w-full", children: [
          /* @__PURE__ */ jsxs("span", { className: "flex items-center justify-end gap-1 text-xs font-bold text-gray-400 uppercase tracking-wider", children: [
            "Next ",
            /* @__PURE__ */ jsx(ArrowRight, { className: "w-3.5 h-3.5" })
          ] }),
          /* @__PURE__ */ jsx("span", { className: "text-sm font-semibold text-[#00274d] group-hover:text-[#edad1a] transition-colors leading-snug line-clamp-2", children: nextPost.title })
        ] }) : /* @__PURE__ */ jsx("div", {})
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mt-8 text-center", children: /* @__PURE__ */ jsxs(Link, { href: "/blog", className: "inline-flex items-center gap-2 bg-[#00274d] hover:bg-[#edad1a] text-white hover:text-[#00274d] font-semibold px-6 py-3 rounded-full transition-colors text-sm", children: [
        /* @__PURE__ */ jsx(ArrowLeft, { className: "w-4 h-4" }),
        " Back to all articles"
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
const PORTAL_REGISTER_URL$4 = "http://3.110.208.157/customer/";
const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.07 } }
};
const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};
function Sectors() {
  usePageSeo("Infrastructure Sectors | Vendor Infra", "Explore 20+ infrastructure sectors including roads, railways, airports, ports, power, solar, water, and more.");
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen flex flex-col", children: [
    /* @__PURE__ */ jsx(Navbar, {}),
    /* @__PURE__ */ jsxs("section", { "data-preserve-hero-typography": true, className: "relative bg-[#00274d] py-24 overflow-hidden", children: [
      /* @__PURE__ */ jsx(
        "div",
        {
          className: "absolute inset-0 opacity-[0.08]",
          style: {
            backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.4) 1px, transparent 0)",
            backgroundSize: "32px 32px"
          }
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 text-center relative z-10", children: [
        /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { opacity: 0, y: -10 },
            animate: { opacity: 1, y: 0 },
            className: "inline-flex items-center gap-2 rounded-full border border-[#edad1a]/40 bg-[#edad1a]/10 px-4 py-2 text-sm font-semibold text-[#edad1a] mb-6",
            children: "Sectors"
          }
        ),
        /* @__PURE__ */ jsxs(
          motion.h1,
          {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: 0.1 },
            className: "text-4xl md:text-5xl font-semibold text-white mb-6",
            children: [
              "Enabling transformation across",
              " ",
              /* @__PURE__ */ jsx("span", { children: "20+ sectors" })
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsx("section", { className: "py-24 bg-gray-50 flex-1", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center max-w-5xl mx-auto mb-14", children: [
        /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-2 text-[#edad1a] text-[12px] font-bold uppercase tracking-[0.3em] mb-4", children: [
          /* @__PURE__ */ jsx("span", { className: "w-6 h-px bg-[#edad1a]/60" }),
          "Sectors",
          /* @__PURE__ */ jsx("span", { className: "w-6 h-px bg-[#edad1a]/60" })
        ] }),
        /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold text-[#00274d] leading-tight", children: "One ecosystem serving multiple sectors with seamless business support" })
      ] }),
      /* @__PURE__ */ jsx(
        motion.div,
        {
          variants: container,
          initial: "hidden",
          whileInView: "show",
          viewport: { once: true },
          className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6",
          children: sectors.map((sector) => /* @__PURE__ */ jsx(motion.div, { variants: item, children: /* @__PURE__ */ jsx(Link, { href: `/sectors/${sector.slug}`, children: /* @__PURE__ */ jsxs("div", { className: "group relative overflow-hidden rounded-2xl shadow-md cursor-pointer border-1 border-[#00274d]", children: [
            /* @__PURE__ */ jsx("div", { className: "aspect-[4/3] overflow-hidden", children: /* @__PURE__ */ jsx(
              "img",
              {
                src: sector.image,
                alt: sector.name,
                className: "w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              }
            ) }),
            /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-[#00274d]/90 via-[#00274d]/30 to-transparent" }),
            /* @__PURE__ */ jsxs("div", { className: "absolute bottom-0 left-0 right-0 min-h-[128px] p-6 flex flex-col justify-end", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-white font-bold text-xl leading-tight min-h-[56px] flex items-end", children: sector.name }),
              /* @__PURE__ */ jsx("p", { className: "text-white/80 text-sm leading-snug line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-2 min-h-[36px]", children: sector.description })
            ] })
          ] }) }) }, sector.slug))
        }
      )
    ] }) }),
    /* @__PURE__ */ jsx(
      "section",
      {
        className: "bg-[#edad1a] py-16 relative",
        style: {
          backgroundImage: "radial-gradient(rgba(0,39,77,0.18) 1px, transparent 1px)",
          backgroundSize: "22px 22px"
        },
        children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-3xl mx-auto text-center", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center gap-3 mb-5", children: [
            /* @__PURE__ */ jsx("span", { className: "h-px w-10 bg-[#00274d]/40" }),
            /* @__PURE__ */ jsx("span", { className: "text-xs md:text-sm font-bold tracking-[0.3em] text-[#00274d]", children: "GET STARTED TODAY" }),
            /* @__PURE__ */ jsx("span", { className: "h-px w-10 bg-[#00274d]/40" })
          ] }),
          /* @__PURE__ */ jsx("h2", { className: "text-2xl md:text-3xl font-bold text-[#00274d] mb-3", children: "Ready to Grow and Transform your Business?" }),
          /* @__PURE__ */ jsxs("p", { className: "text-[#00274d]/85 mb-6 text-sm md:text-base", children: [
            "Join ",
            /* @__PURE__ */ jsx("span", { className: "font-semibold", children: "32,000+" }),
            " ccontractors, vendors, manufacturers, suppliers, and consultants across diverse sectors already using Vendor Infra to discover new opportunities, streamline procurement, acesss plants and equipment solutions, and secure project financing and insurance—all through a single integrated platform."
          ] }),
          /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-3 justify-center items-center", children: /* @__PURE__ */ jsx(
            "a",
            {
              href: PORTAL_REGISTER_URL$4,
              target: "_blank",
              rel: "noopener noreferrer",
              children: /* @__PURE__ */ jsx(SiteButton, { variant: "onGold", className: "normal-case tracking-normal", children: "Join Now" })
            }
          ) })
        ] }) })
      }
    ),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
const PORTAL_REGISTER_URL$3 = "http://3.110.208.157/customer/";
function SectorDetail() {
  const { slug } = useParams();
  const sector = getSectorBySlug(slug);
  if (!sector) return /* @__PURE__ */ jsx(NotFound, {});
  const otherSectors = sectors.filter((s) => s.slug !== slug).slice(0, 3);
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen flex flex-col", children: [
    /* @__PURE__ */ jsx(Navbar, {}),
    /* @__PURE__ */ jsxs("section", { "data-preserve-hero-typography": true, className: "relative h-[65vh] min-h-[460px] overflow-hidden", children: [
      /* @__PURE__ */ jsx(
        "img",
        {
          src: sector.image,
          alt: sector.name,
          className: "w-full h-full object-cover"
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-[#00274d] via-[#00274d]/65 to-[#00274d]/20" }),
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 flex flex-col justify-end pb-14", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4", children: [
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 10 },
            animate: { opacity: 1, y: 0 },
            className: "flex items-center gap-2 text-white/60 text-sm mb-5",
            children: [
              /* @__PURE__ */ jsx(Link, { href: "/", className: "hover:text-white transition-colors", children: "Home" }),
              /* @__PURE__ */ jsx(ChevronRight, { className: "w-3.5 h-3.5" }),
              /* @__PURE__ */ jsx(Link, { href: "/sectors", className: "hover:text-white transition-colors", children: "Sectors" }),
              /* @__PURE__ */ jsx(ChevronRight, { className: "w-3.5 h-3.5" }),
              /* @__PURE__ */ jsx("span", { className: "text-white/90", children: sector.name })
            ]
          }
        ),
        /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: 0.1 },
            className: "mb-4",
            children: /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-2 text-[#edad1a] text-[12px] font-bold uppercase tracking-[0.3em]", children: [
              /* @__PURE__ */ jsx("span", { className: "w-6 h-px bg-[#edad1a]/60" }),
              "Sector",
              /* @__PURE__ */ jsx("span", { className: "w-6 h-px bg-[#edad1a]/60" })
            ] })
          }
        ),
        /* @__PURE__ */ jsx(
          motion.h1,
          {
            initial: { opacity: 0, y: 24 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: 0.15 },
            className: "text-4xl md:text-5xl font-semibold text-white mb-4 leading-tight tracking-tight",
            children: sector.name
          }
        ),
        /* @__PURE__ */ jsx(
          motion.p,
          {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: 0.2 },
            className: "text-white/75 text-base max-w-xl",
            children: sector.description
          }
        )
      ] }) })
    ] }),
    /* @__PURE__ */ jsx("section", { className: "bg-[#edad1a]", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4", children: /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 divide-x divide-white/25", children: sector.keyStats.map((stat, i) => /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 16 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { delay: i * 0.08 },
        className: "py-8 px-6 text-center",
        children: [
          /* @__PURE__ */ jsx("div", { className: "text-2xl md:text-3xl font-semibold text-white mb-1", children: stat.value }),
          /* @__PURE__ */ jsx("div", { className: "text-white/80 text-xs font-semibold uppercase tracking-widest", children: stat.label })
        ]
      },
      i
    )) }) }) }),
    /* @__PURE__ */ jsx("section", { className: "py-20 bg-white", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4 max-w-5xl", children: /* @__PURE__ */ jsx("div", { className: "max-w-3xl", children: /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0, x: -24 },
        whileInView: { opacity: 1, x: 0 },
        viewport: { once: true },
        transition: { duration: 0.6 },
        children: [
          /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-2 text-[#edad1a] text-[12px] font-bold uppercase tracking-[0.3em] mb-4", children: [
            /* @__PURE__ */ jsx("span", { className: "w-6 h-px bg-[#edad1a]/60" }),
            "Sector Overview",
            /* @__PURE__ */ jsx("span", { className: "w-6 h-px bg-[#edad1a]/60" })
          ] }),
          /* @__PURE__ */ jsxs("h2", { className: "text-3xl md:text-4xl font-bold text-[#00274d] mb-6 leading-tight", children: [
            sector.name,
            " in India"
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-600 leading-relaxed text-base mb-8", children: sector.overview }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-3", children: [
            /* @__PURE__ */ jsx(Link, { href: "/contact", children: /* @__PURE__ */ jsx(SiteButton, { className: "normal-case tracking-normal", children: "Get Started" }) }),
            /* @__PURE__ */ jsx(Link, { href: "/services", children: /* @__PURE__ */ jsx(SiteButton, { className: "normal-case tracking-normal", children: "Our Services" }) })
          ] })
        ]
      }
    ) }) }) }),
    /* @__PURE__ */ jsxs("section", { className: "py-20 bg-[#00274d] relative overflow-hidden", children: [
      /* @__PURE__ */ jsx(
        "div",
        {
          className: "absolute inset-0 opacity-5",
          style: { backgroundImage: "radial-gradient(circle at 1px 1px,#ffffff 1px,transparent 0)", backgroundSize: "28px 28px" }
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4 max-w-5xl relative z-10", children: /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-8", children: [
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            transition: { duration: 0.5 },
            children: [
              /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-2 text-[#edad1a] text-[12px] font-bold uppercase tracking-[0.3em] mb-4", children: [
                /* @__PURE__ */ jsx("span", { className: "w-6 h-px bg-[#edad1a]/60" }),
                "Government Initiatives",
                /* @__PURE__ */ jsx("span", { className: "w-6 h-px bg-[#edad1a]/60" })
              ] }),
              /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold text-white mb-6 leading-tight", children: "Major Programs" }),
              /* @__PURE__ */ jsx("ul", { className: "space-y-3", children: sector.programs.map((program, i) => /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-3 text-white/85 text-sm bg-white/10 border border-white/10 rounded-xl p-4", children: [
                /* @__PURE__ */ jsx("span", { className: "w-6 h-6 rounded-full bg-[#edad1a] text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5", children: i + 1 }),
                program
              ] }, i)) })
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            transition: { duration: 0.5, delay: 0.15 },
            className: "flex flex-col",
            children: [
              /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-2 text-[#edad1a] text-[12px] font-bold uppercase tracking-[0.3em] mb-4", children: [
                /* @__PURE__ */ jsx("span", { className: "w-6 h-px bg-[#edad1a]/60" }),
                "What's Next",
                /* @__PURE__ */ jsx("span", { className: "w-6 h-px bg-[#edad1a]/60" })
              ] }),
              /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold text-white mb-6 leading-tight", children: "Future Outlook" }),
              /* @__PURE__ */ jsxs("div", { className: "bg-white/10 border border-white/10 rounded-2xl p-8 flex-1 flex flex-col justify-center", children: [
                /* @__PURE__ */ jsx("div", { className: "w-10 h-10 bg-[#edad1a] rounded-full flex items-center justify-center mb-5", children: /* @__PURE__ */ jsx(TrendingUp, { className: "w-5 h-5 text-white" }) }),
                /* @__PURE__ */ jsx("p", { className: "text-white/85 leading-relaxed text-base", children: sector.futureOutlook })
              ] })
            ]
          }
        )
      ] }) })
    ] }),
    /* @__PURE__ */ jsx("section", { className: "py-20 bg-gray-50", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-10", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-2 text-[#edad1a] text-[12px] font-bold uppercase tracking-[0.3em] mb-4", children: [
            /* @__PURE__ */ jsx("span", { className: "w-6 h-px bg-[#edad1a]/60" }),
            "Explore More",
            /* @__PURE__ */ jsx("span", { className: "w-6 h-px bg-[#edad1a]/60" })
          ] }),
          /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold text-[#00274d] leading-tight", children: "Other Sectors" })
        ] }),
        /* @__PURE__ */ jsxs(Link, { href: "/sectors", className: "text-[#edad1a] font-semibold text-sm hover:underline inline-flex items-center gap-1", children: [
          "View All ",
          /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4" })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-6", children: otherSectors.map((s) => /* @__PURE__ */ jsx(Link, { href: `/sectors/${s.slug}`, children: /* @__PURE__ */ jsxs(
        motion.div,
        {
          whileHover: { y: -5 },
          transition: { duration: 0.2 },
          className: "group relative rounded-2xl overflow-hidden shadow-md cursor-pointer",
          children: [
            /* @__PURE__ */ jsx("div", { className: "aspect-[4/3] overflow-hidden", children: /* @__PURE__ */ jsx(
              "img",
              {
                src: s.image,
                alt: s.name,
                className: "w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              }
            ) }),
            /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-[#00274d]/90 via-[#00274d]/30 to-transparent" }),
            /* @__PURE__ */ jsxs("div", { className: "absolute bottom-0 left-0 right-0 p-5", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-white font-bold text-base mb-1", children: s.name }),
              /* @__PURE__ */ jsx("p", { className: "text-white/65 text-xs", children: s.description })
            ] })
          ]
        }
      ) }, s.slug)) })
    ] }) }),
    /* @__PURE__ */ jsx(
      "section",
      {
        className: "bg-[#edad1a] py-16 relative",
        style: {
          backgroundImage: "radial-gradient(rgba(0,39,77,0.18) 1px, transparent 1px)",
          backgroundSize: "22px 22px"
        },
        children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-3xl mx-auto text-center", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center gap-3 mb-5", children: [
            /* @__PURE__ */ jsx("span", { className: "h-px w-10 bg-[#00274d]/40" }),
            /* @__PURE__ */ jsx("span", { className: "text-xs md:text-sm font-bold tracking-[0.3em] text-[#00274d]", children: "GET STARTED TODAY" }),
            /* @__PURE__ */ jsx("span", { className: "h-px w-10 bg-[#00274d]/40" })
          ] }),
          /* @__PURE__ */ jsx("h2", { className: "text-2xl md:text-3xl font-bold text-[#00274d] mb-3", children: "Ready to Grow and Transform your Business?" }),
          /* @__PURE__ */ jsxs("p", { className: "text-[#00274d]/85 mb-6 text-sm md:text-base", children: [
            "Join ",
            /* @__PURE__ */ jsx("span", { className: "font-semibold", children: "32,000+" }),
            " ccontractors, vendors, manufacturers, suppliers, and consultants across diverse sectors already using Vendor Infra to discover new opportunities, streamline procurement, acesss plants and equipment solutions, and secure project financing and insurance—all through a single integrated platform."
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-3 justify-center items-center", children: [
            /* @__PURE__ */ jsx(
              "a",
              {
                href: PORTAL_REGISTER_URL$3,
                target: "_blank",
                rel: "noopener noreferrer",
                children: /* @__PURE__ */ jsx(SiteButton, { variant: "onGold", className: "normal-case tracking-normal", children: "Join Now" })
              }
            ),
            /* @__PURE__ */ jsx(Link, { href: "/sectors", children: /* @__PURE__ */ jsx(SiteButton, { variant: "onGold", className: "normal-case tracking-normal", children: "Back to Sectors" }) })
          ] })
        ] }) })
      }
    ),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
function FeatureLabel({ text }) {
  const parts = text.split(/(\([^)]*\))/g);
  return /* @__PURE__ */ jsx(Fragment, { children: parts.map(
    (p, i) => p.startsWith("(") && p.endsWith(")") ? /* @__PURE__ */ jsx("span", { className: "text-[#edad1a] font-semibold", children: p }, i) : /* @__PURE__ */ jsx("span", { children: p }, i)
  ) });
}
const PORTAL_REGISTER_URL$2 = "http://3.110.208.157/customer/";
function FadeUp({ children, delay = 0, className = "" }) {
  return /* @__PURE__ */ jsx(
    motion.div,
    {
      initial: { opacity: 0, y: 24 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true, margin: "-50px" },
      transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
      className,
      children
    }
  );
}
function PlanCard({
  plan,
  index,
  onContact
}) {
  const isContact = plan.ctaType === "contact";
  const ctaLabel = isContact ? "Contact Us" : "Get Started";
  return /* @__PURE__ */ jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 30 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true },
      transition: { duration: 0.4, delay: index * 0.08 },
      className: `relative flex flex-col rounded-2xl overflow-hidden h-full bg-white border border-[#00274d] shadow-md ${plan.highlight ? "shadow-2xl shadow-yellow-400/20 ring-2 ring-[#edad1a]" : "shadow-md ring-1 ring-gray-200"}`,
      children: [
        /* @__PURE__ */ jsxs("div", { className: `px-8 pt-8 pb-6 ${plan.highlight ? "bg-[#00274d]" : "bg-white"}`, children: [
          plan.badge ? /* @__PURE__ */ jsx("span", { className: "inline-block mb-3 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#edad1a] text-white", children: plan.badge }) : /* @__PURE__ */ jsx(
            "span",
            {
              className: `inline-block mb-3 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${plan.highlight ? "bg-white/10 text-white/70" : "bg-gray-100 text-gray-500"}`,
              children: plan.tag
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-8 mb-4", children: [
            /* @__PURE__ */ jsx(
              "h3",
              {
                className: `text-2xl font-bold ${plan.highlight ? "text-white" : "text-[#00274d]"}`,
                children: plan.name
              }
            ),
            isContact ? /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: () => onContact(plan.name),
                className: `inline-flex items-center justify-center rounded-xl px-5 py-3 text-lg font-bold transition-all ${plan.highlight ? "bg-[#edad1a] text-white hover:bg-[#d4941a]" : "bg-[#00274d] text-white hover:bg-[#003a73]"}`,
                children: plan.price
              }
            ) : /* @__PURE__ */ jsxs("div", { className: "flex items-baseline gap-1", children: [
              /* @__PURE__ */ jsx(
                "span",
                {
                  className: `text-4xl font-extrabold tracking-tight ${plan.highlight ? "text-white" : "text-[#00274d]"}`,
                  children: plan.price
                }
              ),
              plan.priceSuffix && /* @__PURE__ */ jsx(
                "span",
                {
                  className: `text-sm font-medium ${plan.highlight ? "text-white/60" : "text-gray-500"}`,
                  children: plan.priceSuffix
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsx("p", { className: `text-sm leading-snug ${plan.highlight ? "text-white/65" : "text-gray-500"}`, children: plan.description })
        ] }),
        /* @__PURE__ */ jsx("div", { className: `h-px ${plan.highlight ? "bg-white/10" : "bg-[#00274d]"}` }),
        /* @__PURE__ */ jsxs("div", { className: `px-8 py-6 flex-1 flex flex-col ${plan.highlight ? "bg-[#00274d]" : "bg-white"}`, children: [
          /* @__PURE__ */ jsxs("ul", { className: "space-y-3 flex-1 mb-8", children: [
            plan.features.map((f) => /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-3", children: [
              /* @__PURE__ */ jsx(
                "span",
                {
                  className: `mt-0.5 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${plan.highlight ? "bg-[#edad1a]/20" : "bg-[#edad1a]/10"}`,
                  children: /* @__PURE__ */ jsx(Check, { className: "w-3 h-3 text-[#edad1a]" })
                }
              ),
              /* @__PURE__ */ jsx("span", { className: `text-sm ${plan.highlight ? "text-white/85" : "text-gray-700"}`, children: /* @__PURE__ */ jsx(FeatureLabel, { text: f }) })
            ] }, f)),
            plan.excluded?.map((f) => /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-3", children: [
              /* @__PURE__ */ jsx("span", { className: "mt-0.5 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center bg-red-500/10", children: /* @__PURE__ */ jsx(X, { className: "w-3 h-3 text-red-500" }) }),
              /* @__PURE__ */ jsx("span", { className: `text-sm ${plan.highlight ? "text-white/50" : "text-gray-500"}`, children: /* @__PURE__ */ jsx(FeatureLabel, { text: f }) })
            ] }, f))
          ] }),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => {
                if (isContact) {
                  onContact(plan.name);
                } else {
                  window.open(PORTAL_REGISTER_URL$2, "_blank", "noopener,noreferrer");
                }
              },
              className: `block w-full text-center font-semibold py-3.5 px-6 rounded-xl transition-all duration-200 text-sm ${plan.highlight ? "bg-[#edad1a] text-white hover:bg-[#d4941a] shadow-lg shadow-yellow-500/20" : "bg-[#00274d] text-white hover:bg-[#003a73]"}`,
              children: ctaLabel
            }
          )
        ] })
      ]
    }
  );
}
function PricingSection({
  id,
  label,
  heading,
  plans,
  onContact,
  variant = "light"
}) {
  const isDark = variant === "dark";
  return /* @__PURE__ */ jsx(
    "section",
    {
      id,
      className: `scroll-mt-24 py-20 border-t ${isDark ? "bg-[#00274d] border-[#00274d]" : "bg-white border-gray-200"}`,
      children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 max-w-6xl", children: [
        /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { opacity: 0, y: 10 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            className: "text-center mb-4",
            children: /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-2 text-[#edad1a] text-[12px] font-bold uppercase tracking-[0.3em]", children: [
              /* @__PURE__ */ jsx("span", { className: "w-6 h-px bg-[#edad1a]/60" }),
              label,
              /* @__PURE__ */ jsx("span", { className: "w-6 h-px bg-[#edad1a]/60" })
            ] })
          }
        ),
        /* @__PURE__ */ jsx(
          motion.h2,
          {
            initial: { opacity: 0, y: 10 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            transition: { delay: 0.05 },
            className: `text-3xl md:text-4xl font-bold text-center mb-4 ${isDark ? "text-white" : "text-[#00274d]"}`,
            children: heading
          }
        ),
        /* @__PURE__ */ jsx("p", { className: `text-center text-sm mb-12 ${isDark ? "text-white/60" : "text-gray-500"}`, children: "All pricing plans are monthly pricing plans, billed annually." }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch", children: plans.map((plan, i) => /* @__PURE__ */ jsx(PlanCard, { plan, index: i, onContact }, plan.name)) })
      ] })
    }
  );
}
const contractorPlans = [
  {
    name: "Basic",
    tag: "Starter",
    badge: null,
    price: "₹7,999",
    priceSuffix: "/month",
    description: "For companies ready to digitize, optimize, and grow",
    highlight: false,
    features: [
      "AI-Powered Vendor Discovery (Upto 3 Sectors)",
      "Price Discovery (Upto 3 Sectors)",
      "Smart Material Procurement",
      "AI-Powered Plants & Equipment Marketplace",
      "Smart Project Financing & Insurance",
      "Unified Analytics Dashboard",
      "AI-Enabled Sector Intelligence & SOR",
      "Intelligent Industry Updates",
      "Tender Services",
      "User Login (Single)",
      "Basic Support"
    ],
    excluded: ["Dedicated Account Manager"],
    ctaType: "register"
  },
  {
    name: "Plus",
    tag: "Most Popular",
    badge: "Most Popular",
    price: "₹9,999",
    priceSuffix: "/month",
    description: "For growing contractors who need wider sector coverage",
    highlight: true,
    features: [
      "AI-Powered Vendor Discovery (Upto 10 Sectors)",
      "Price Discovery (Upto 10 Sectors)",
      "Smart Material Procurement",
      "AI-Powered Plants & Equipment Marketplace",
      "Smart Project Financing & Insurance",
      "Unified Analytics Dashboard",
      "AI-Enabled Sector Intelligence & SOR",
      "Intelligent Industry Updates",
      "Tender Services",
      "User Login (1+3)",
      "Priority Support",
      "Dedicated Account Manager"
    ],
    ctaType: "register"
  },
  {
    name: "Premium",
    tag: "Enterprise",
    badge: null,
    price: "Contact Us",
    description: "Enterprise-grade access for large EPC organisations",
    highlight: false,
    features: [
      "AI-Powered Vendor Discovery (20+ Sectors)",
      "Price Discovery (20+ Sectors)",
      "Smart Material Procurement",
      "AI-Powered Plants & Equipment Marketplace",
      "Smart Project Financing & Insurance",
      "Unified Analytics Dashboard",
      "AI-Enabled Sector Intelligence & SOR",
      "Intelligent Industry Updates",
      "Tender Services",
      "User Login (Unlimited)",
      "Priority Support",
      "Dedicated Account Manager"
    ],
    ctaType: "contact"
  }
];
const vendorPlans = [
  {
    name: "Basic",
    tag: "Starter",
    badge: null,
    price: "₹7,999",
    priceSuffix: "/month",
    description: "Unlock new opportunities and accelerate business growth",
    highlight: false,
    features: [
      "Smart Profile",
      "Search Multiple Projects (Upto 3 Sectors)",
      "Quote Projects & RFPs",
      "Smart Material Procurement",
      "Smart Project Insurance",
      "AI-Powered Plants & Equipment Marketplace",
      "AI-Enabled Sector Intelligence & SOR",
      "Intelligent Industry Updates",
      "User Login (Single)",
      "Basic Support"
    ],
    excluded: ["Dedicated Account Manager"],
    ctaType: "register"
  },
  {
    name: "Plus",
    tag: "Most Popular",
    badge: "Most Popular",
    price: "₹9,999",
    priceSuffix: "/month",
    description: "Expand reach across more sectors and projects",
    highlight: true,
    features: [
      "Smart Profile",
      "Search Multiple Projects (Upto 10 Sectors)",
      "Quote Projects & RFPs",
      "Smart Material Procurement",
      "Smart Project Insurance",
      "AI-Powered Plants & Equipment Marketplace",
      "AI-Enabled Sector Intelligence & SOR",
      "Intelligent Industry Updates",
      "User Login (1+3)",
      "Priority Support",
      "Dedicated Account Manager"
    ],
    ctaType: "register"
  },
  {
    name: "Premium",
    tag: "Enterprise",
    badge: null,
    price: "Contact Us",
    description: "Full platform access for established vendors",
    highlight: false,
    features: [
      "Smart Profile",
      "Search Multiple Projects (20+ Sectors)",
      "Quote Projects & RFPs",
      "Smart Material Procurement",
      "Smart Project Insurance",
      "AI-Powered Plants & Equipment Marketplace",
      "AI-Enabled Sector Intelligence & SOR",
      "Intelligent Industry Updates",
      "User Login (Unlimited)",
      "Priority Support",
      "Dedicated Account Manager"
    ],
    ctaType: "contact"
  }
];
const bothPlans = [
  {
    name: "Basic",
    tag: "Starter",
    badge: null,
    price: "₹11,999",
    priceSuffix: "/month",
    description: "For companies operating as both contractor and vendor",
    highlight: false,
    features: [
      "AI-Powered Vendor Discovery (Upto 3 Sectors)",
      "Price Discovery (Upto 3 Sectors)",
      "Smart Material Procurement",
      "AI-Powered Plants & Equipment Marketplace",
      "Smart Project Financing & Insurance",
      "Unified Analytics Dashboard",
      "AI-Enabled Sector Intelligence & SOR",
      "Intelligent Industry Updates",
      "Tender Services",
      "User Login (Single)",
      "Basic Support"
    ],
    excluded: ["Dedicated Account Manager"],
    ctaType: "register"
  },
  {
    name: "Plus",
    tag: "Best Value",
    badge: "Best Value",
    price: "₹14,999",
    priceSuffix: "/month",
    description: "Best for mid-size firms active on both sides of the market",
    highlight: true,
    features: [
      "AI-Powered Vendor Discovery (Upto 10 Sectors)",
      "Price Discovery (Upto 10 Sectors)",
      "Smart Material Procurement",
      "Buy, Sell & Hire Plants & Equipment (AI-Powered)",
      "Smart Project Financing & Insurance",
      "Unified Analytics Dashboard",
      "AI-Enabled Sector Intelligence & SOR",
      "Intelligent Industry Updates",
      "Tender Services",
      "User Login (1+3)",
      "Priority Support",
      "Dedicated Account Manager"
    ],
    ctaType: "register"
  },
  {
    name: "Premium",
    tag: "Enterprise",
    badge: null,
    price: "Contact Us",
    description: "Unlimited enterprise access across all platform features",
    highlight: false,
    features: [
      "AI-Powered Vendor Discovery (20+ Sectors)",
      "Price Discovery (20+ Sectors)",
      "Smart Material Procurement",
      "Buy, Sell & Hire Plants & Equipment (AI-Powered)",
      "Smart Project Financing & Insurance",
      "Unified Analytics Dashboard",
      "AI-Enabled Sector Intelligence & SOR",
      "Intelligent Industry Updates",
      "Tender Services",
      "User Login (Unlimited)",
      "Priority Support",
      "Dedicated Account Manager"
    ],
    ctaType: "contact"
  }
];
function Pricing() {
  usePageSeo(
    "Pricing Plans | Vendor Infra",
    "Clear and transparent pricing for contractors and vendors. Monthly plans billed annually."
  );
  const [contactOpen, setContactOpen] = useState(false);
  const [contactPlan, setContactPlan] = useState(void 0);
  const openContact = (planName) => {
    setContactPlan(planName);
    setContactOpen(true);
  };
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen flex flex-col", children: [
    /* @__PURE__ */ jsx(Navbar, {}),
    /* @__PURE__ */ jsxs("section", { "data-preserve-hero-typography": true, className: "relative bg-[#00274d] text-white py-24 overflow-hidden", children: [
      /* @__PURE__ */ jsx(
        "div",
        {
          className: "absolute inset-0 opacity-[0.08]",
          style: {
            backgroundImage: "radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)",
            backgroundSize: "40px 40px"
          }
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 text-center relative z-10 max-w-4xl", children: [
        /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { opacity: 0, y: -10 },
            animate: { opacity: 1, y: 0 },
            className: "inline-flex items-center gap-2 rounded-full border border-[#edad1a]/40 bg-[#edad1a]/10 px-4 py-2 text-sm font-semibold text-[#edad1a] mb-6",
            children: "Pricing Plans"
          }
        ),
        /* @__PURE__ */ jsx(
          motion.h1,
          {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: 0.1 },
            className: "text-4xl md:text-5xl font-semibold leading-tight tracking-tight mb-4",
            children: "Clear and transparent pricing"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsx(
      PricingSection,
      {
        id: "contractors",
        label: "For Contractors",
        heading: "Pricing for Contractors",
        plans: contractorPlans,
        onContact: openContact
      }
    ),
    /* @__PURE__ */ jsx(
      PricingSection,
      {
        id: "vendors",
        label: "For Vendors",
        heading: "Pricing for Vendors",
        plans: vendorPlans,
        onContact: openContact,
        variant: "dark"
      }
    ),
    /* @__PURE__ */ jsx(
      PricingSection,
      {
        id: "contractors-vendors",
        label: "For Both",
        heading: "Pricing for Contractors & Vendors",
        plans: bothPlans,
        onContact: openContact
      }
    ),
    /* @__PURE__ */ jsxs("section", { className: "py-24 bg-[#00274d] relative overflow-hidden", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 opacity-[0.06] bg-[radial-gradient(circle_at_1px_1px,#ffffff_1px,transparent_0)] bg-[size:28px_28px]" }),
      /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 max-w-4xl relative z-10", children: [
        /* @__PURE__ */ jsxs(FadeUp, { className: "text-center mb-14", children: [
          /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-2 text-[#edad1a] text-[12px] font-bold uppercase tracking-[0.3em] mb-4", children: [
            /* @__PURE__ */ jsx("span", { className: "w-6 h-px bg-[#edad1a]/60" }),
            "FAQ",
            /* @__PURE__ */ jsx("span", { className: "w-6 h-px bg-[#edad1a]/60" })
          ] }),
          /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold leading-tight text-white max-w-3xl mx-auto", children: "Explore Answers To Frequently Asked Questions" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "space-y-5", children: [
          {
            q: "How is billing handled?",
            a: "All listed plans are monthly pricing plans billed annually. You pay once for the year and receive the discounted monthly rate."
          },
          {
            q: "Can I switch plans later?",
            a: "Yes. You can upgrade or downgrade your subscription at any time. Our support team will help you transition smoothly."
          },
          {
            q: "How do I get started?",
            a: "Click Get Started on your preferred plan to register. For Premium plans, our team will contact you with a customized proposal."
          },
          {
            q: "Do you offer volume or enterprise discounts?",
            a: "Yes. Organizations with large procurement requirements or multiple business entities can request a custom enterprise quotation."
          }
        ].map(({ q, a }) => /* @__PURE__ */ jsxs(
          "details",
          {
            className: "group rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:border-[#edad1a]/40",
            children: [
              /* @__PURE__ */ jsxs("summary", { className: "flex items-center justify-between cursor-pointer px-7 py-6 text-white font-semibold text-base list-none", children: [
                /* @__PURE__ */ jsx("span", { children: q }),
                /* @__PURE__ */ jsx("span", { className: "ml-4 flex h-8 w-8 items-center justify-center rounded-full bg-[#edad1a]/15 text-[#edad1a] group-open:rotate-180 transition-transform duration-300", children: "▾" })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "px-7 pb-6 pt-2 border-t border-white/10 text-white/75 leading-7", children: a })
            ]
          },
          q
        )) })
      ] })
    ] }),
    /* @__PURE__ */ jsx(
      "section",
      {
        className: "bg-[#edad1a] py-16 relative",
        style: {
          backgroundImage: "radial-gradient(rgba(0,39,77,0.18) 1px, transparent 1px)",
          backgroundSize: "22px 22px"
        },
        children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-3xl mx-auto text-center", children: [
          /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center gap-3 mb-5" }),
          /* @__PURE__ */ jsx("h2", { className: "text-2xl md:text-3xl font-bold text-[#00274d] mb-3", children: "Not sure which plan is right for you?" }),
          /* @__PURE__ */ jsx("p", { className: "text-[#00274d]/85 mb-6 text-sm md:text-base", children: "Our experts will help you choose the right plan for your business and walk you through everything." }),
          /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-3 justify-center items-center", children: /* @__PURE__ */ jsx(Link, { href: "/contact", children: /* @__PURE__ */ jsx(SiteButton, { variant: "onGold", className: "normal-case tracking-normal", children: "Contact Us" }) }) })
        ] }) })
      }
    ),
    /* @__PURE__ */ jsx(Footer, {}),
    /* @__PURE__ */ jsx(
      ContactSalesModal,
      {
        open: contactOpen,
        onClose: () => setContactOpen(false),
        planName: contactPlan
      }
    )
  ] });
}
function PageHero({ eyebrow, title, subtitle, showEyebrow = true }) {
  return /* @__PURE__ */ jsxs("section", { "data-preserve-hero-typography": true, className: "relative bg-[#00274d] text-white py-24 overflow-hidden", children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "absolute inset-0 opacity-[0.08]",
        style: {
          backgroundImage: "radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)",
          backgroundSize: "40px 40px"
        }
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "relative z-10 max-w-4xl mx-auto px-4 text-center", children: [
      showEyebrow && /* @__PURE__ */ jsx(
        motion.div,
        {
          initial: { opacity: 0, y: -10 },
          animate: { opacity: 1, y: 0 },
          className: "inline-flex items-center gap-2 rounded-full border border-[#edad1a]/40 bg-[#edad1a]/10 px-4 py-2 text-sm font-semibold text-[#edad1a] mb-6",
          children: eyebrow
        }
      ),
      /* @__PURE__ */ jsx(
        motion.h1,
        {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: 0.1 },
          className: "text-4xl md:text-5xl font-semibold leading-tight tracking-tight mb-4",
          children: title
        }
      ),
      subtitle && /* @__PURE__ */ jsx(
        motion.p,
        {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: 0.2 },
          className: "text-white/70 text-base md:text-lg max-w-2xl mx-auto",
          children: subtitle
        }
      )
    ] })
  ] });
}
const uspItems = [
  {
    number: "01",
    title: "Integrated Services at One Platform",
    desc: "Vendor Infra brings together vendor discovery, comparison, communication, and project management on a single digital platform - eliminating the hassle of switching between multiple systems or service providers",
    icon: Layers
  },
  {
    number: "02",
    title: "Smart Decision Making Through Market Intelligence",
    desc: "With real-time data, AI-driven analytics, and verified market insights, we empower clients to make informed procurement and project decisions - backed by transparency and measurable intelligence.",
    icon: BarChart3
  },
  {
    number: "03",
    title: "Reduced Cost & Save Time",
    desc: "By digitizing the vendor search and management process, Vendor Infra minimizes manual effort, accelerates timelines, and helps businesses save significant time and operational costs.",
    icon: Clock
  },
  {
    number: "04",
    title: "Risks Mitigation",
    desc: "We onboard only verified and certified vendors, reducing the risks associated with unreliable suppliers. Our transparent rating and feedback system ensures consistent quality and accountability.",
    icon: CheckCircle2
  },
  {
    number: "05",
    title: "Cloud-Based Secure Platform",
    desc: "Vendor Infra ensures data security, accessibility, and scalability with a robust cloud infrastructure - enabling businesses to manage information safely from anywhere, anytime.",
    icon: ShieldCheck
  },
  {
    number: "06",
    title: "AI & ML-Driven Recommendations",
    desc: "Our intelligent system uses AI and Machine Learning to suggest the most relevant vendors and opportunities, helping clients and suppliers connect faster and more effectively.",
    icon: Brain
  }
];
const stats = [
  { label: "AI-based Ecosystem", value: "VI", icon: Database },
  { label: "Certified Vendors", value: "31K+", icon: CheckCircle2 },
  { label: "Live users", value: "143+", icon: BarChart3 }
];
function WhyUs() {
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen flex flex-col", children: [
    /* @__PURE__ */ jsx(Navbar, {}),
    /* @__PURE__ */ jsx(
      PageHero,
      {
        eyebrow: "Why Us",
        title: "We turn ambition into measurable success",
        subtitle: ""
      }
    ),
    /* @__PURE__ */ jsx("section", { className: "py-24 bg-[#f6f8fb] overflow-hidden", children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 xl:px-12", children: /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-16 items-center", children: [
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 24 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          className: "relative",
          children: [
            /* @__PURE__ */ jsx("div", { className: "absolute -inset-4 bg-[#edad1a]/10 blur-3xl" }),
            /* @__PURE__ */ jsxs("div", { className: "relative overflow-hidden rounded-2xl bg-[#082b4f] shadow-2xl shadow-[#00274d]/20", children: [
              /* @__PURE__ */ jsx("div", { className: "absolute inset-0 opacity-[0.08] bg-[radial-gradient(circle_at_1px_1px,#ffffff_1px,transparent_0)] bg-[size:24px_24px]" }),
              /* @__PURE__ */ jsxs("div", { className: "relative min-h-[390px] bg-[#00274d] p-7 md:p-10", children: [
                /* @__PURE__ */ jsx("div", { className: "absolute inset-0 opacity-[0.1] bg-[radial-gradient(circle_at_1px_1px,#ffffff_1px,transparent_0)] bg-[size:28px_28px]" }),
                /* @__PURE__ */ jsxs("div", { className: "relative h-full min-h-[320px]", children: [
                  /* @__PURE__ */ jsxs("div", { className: "absolute left-1/2 top-1/2 z-10 flex h-32 w-32 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-[#edad1a]/40 bg-white text-center shadow-2xl", children: [
                    /* @__PURE__ */ jsx(Brain, { className: "mb-2 h-7 w-7 text-[#edad1a]" }),
                    /* @__PURE__ */ jsx("span", { className: "text-sm font-bold leading-tight text-[#00274d]", children: "AI Driven" }),
                    /* @__PURE__ */ jsx("span", { className: "text-xs font-semibold text-gray-500", children: "Ecosystem" })
                  ] }),
                  /* @__PURE__ */ jsx("div", { className: "absolute left-1/2 top-1/2 h-px w-[62%] -translate-x-1/2 bg-white/15" }),
                  /* @__PURE__ */ jsx("div", { className: "absolute left-1/2 top-1/2 h-[62%] w-px -translate-y-1/2 bg-white/15" }),
                  /* @__PURE__ */ jsx("div", { className: "absolute left-[19%] top-[18%] h-px w-[62%] rotate-45 bg-white/10" }),
                  /* @__PURE__ */ jsx("div", { className: "absolute left-[19%] top-[78%] h-px w-[62%] -rotate-45 bg-white/10" }),
                  [
                    { label: "Verified Vendors", icon: CheckCircle2, className: "left-0 top-0" },
                    { label: "Market Intelligence", icon: BarChart3, className: "right-0 top-0" },
                    { label: "Secure Data", icon: ShieldCheck, className: "left-0 bottom-0" },
                    { label: "Single Platform", icon: Layers, className: "right-0 bottom-0" }
                  ].map((node) => /* @__PURE__ */ jsxs(
                    "div",
                    {
                      className: `absolute ${node.className} w-[42%] rounded-2xl border border-white/10 bg-white/8 p-4 backdrop-blur-sm`,
                      children: [
                        /* @__PURE__ */ jsx(node.icon, { className: "mb-3 h-5 w-5 text-[#edad1a]" }),
                        /* @__PURE__ */ jsx("p", { className: "text-sm font-bold leading-snug text-white", children: node.label })
                      ]
                    },
                    node.label
                  ))
                ] })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "relative grid sm:grid-cols-3 gap-3 p-5", children: stats.map((stat) => /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-white/10 bg-white/8 p-4", children: [
                /* @__PURE__ */ jsx(stat.icon, { className: "h-5 w-5 text-[#edad1a] mb-4" }),
                /* @__PURE__ */ jsx("p", { className: "text-2xl font-semibold text-white leading-none", children: stat.value }),
                /* @__PURE__ */ jsx("p", { className: "mt-2 text-xs font-semibold uppercase tracking-wide text-white/65", children: stat.label })
              ] }, stat.label)) })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 24 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { delay: 0.08 },
          children: [
            /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-2 text-[#edad1a] text-[12px] font-bold uppercase tracking-[0.3em] mb-4", children: [
              /* @__PURE__ */ jsx("span", { className: "w-6 h-px bg-[#edad1a]/60" }),
              "Why Us",
              /* @__PURE__ */ jsx("span", { className: "w-6 h-px bg-[#edad1a]/60" })
            ] }),
            /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold text-[#00274d] leading-tight max-w-xl", children: "How we are different from our competetiors" }),
            /* @__PURE__ */ jsxs("p", { className: "mt-7 text-gray-600 text-base leading-8 max-w-xl", children: [
              "Every vendor needs exposure to grow in a digitally expanding world, where clients can compare, connect, and collaborate with multiple real-time vendors for their projects. ",
              /* @__PURE__ */ jsx("strong", { children: "Vendor Infra" }),
              " empowers this growth by providing a ",
              /* @__PURE__ */ jsx("strong", { children: "cloud-based, AI-driven marketplace" }),
              " that connects ",
              /* @__PURE__ */ jsx("strong", { children: "certified suppliers, contractors, consultants, and developers" }),
              " across the infrastructure and construction ecosystem. We ensure reliability, transparency, and speed by bringing the entire vendor discovery, management, and collaboration process under one secure digital roof - helping businesses make smarter, faster, and data-backed decisions."
            ] }),
            /* @__PURE__ */ jsx(Link, { href: "/services", children: /* @__PURE__ */ jsx(SiteButton, { className: "mt-9", children: "Explore Services" }) })
          ]
        }
      )
    ] }) }) }),
    /* @__PURE__ */ jsxs("section", { className: "py-24 bg-[#00274d] relative overflow-hidden", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 opacity-[0.05] bg-[radial-gradient(circle_at_1px_1px,#ffffff_1px,transparent_0)] bg-[size:28px_28px]" }),
      /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 xl:px-12", children: [
        /* @__PURE__ */ jsxs("div", { className: "mb-12 max-w-4xl", children: [
          /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-2 text-[#edad1a] text-[12px] font-bold uppercase tracking-[0.3em] mb-4", children: [
            /* @__PURE__ */ jsx("span", { className: "w-6 h-px bg-[#edad1a]/60" }),
            "USP",
            /* @__PURE__ */ jsx("span", { className: "w-6 h-px bg-[#edad1a]/60" })
          ] }),
          /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold text-white leading-tight", children: "Empowering Smarter, Faster, and Safer Business Decisions in the Infrastructure Industry" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-5", children: uspItems.map((item2, i) => /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 24 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            transition: { delay: i * 0.05 },
            className: "group rounded-3xl border border-white/10 bg-white p-7 shadow-xl hover:-translate-y-2 hover:shadow-2xl hover:border-[#edad1a]/40 transition-all duration-300",
            children: [
              /* @__PURE__ */ jsxs("div", { className: "mb-5 flex items-center justify-between", children: [
                /* @__PURE__ */ jsx("div", { className: "flex h-12 w-12 items-center justify-center rounded-xl bg-[#00274d] text-[#edad1a] font-semibold", children: item2.number }),
                /* @__PURE__ */ jsx("div", { className: "flex h-12 w-12 items-center justify-center rounded-xl bg-white text-[#edad1a] shadow-sm", children: /* @__PURE__ */ jsx(item2.icon, { className: "h-6 w-6" }) })
              ] }),
              /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-[#00274d] leading-snug", children: item2.title }),
              /* @__PURE__ */ jsx("p", { className: "mt-3 text-sm leading-7 text-gray-600", children: item2.desc })
            ]
          },
          item2.number
        )) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "py-24 bg-white relative overflow-hidden", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute right-0 top-1/2 -translate-y-1/2 h-[450px] w-[450px] rounded-full bg-[#edad1a]/10 blur-3xl" }),
      /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 xl:px-12 relative z-10", children: /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-2 gap-10 lg:gap-16 items-center", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-2 text-[#edad1a] text-[12px] font-bold uppercase tracking-[0.3em] mb-4", children: [
            /* @__PURE__ */ jsx("span", { className: "w-6 h-px bg-[#edad1a]/60" }),
            "Video",
            /* @__PURE__ */ jsx("span", { className: "w-6 h-px bg-[#edad1a]/60" })
          ] }),
          /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold leading-tight text-[#00274d]", children: "Get to know more about us and our Services" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "overflow-hidden rounded-[28px] border border-gray-200 bg-white shadow-[0_25px_70px_rgba(0,39,77,0.15)] aspect-video", children: /* @__PURE__ */ jsx(
          "iframe",
          {
            src: "https://www.youtube.com/embed/tn81mJqaeEM?rel=0&modestbranding=1",
            title: "Vendor Infra overview",
            allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
            allowFullScreen: true,
            className: "h-full w-full"
          }
        ) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
const referralPrograms = [
  {
    code: "CRP",
    title: "Client Referral Program",
    image: "/images/wp/Mesa-de-trabajo.png",
    description: "Refer Vendor Infra services to Infrastructure & Construction Companies, Vendors, Consultant, Suppliers, Manufacturers etc and earn Cash with each referral from our Exclusive Client Referral Program"
  },
  {
    code: "IBC",
    title: "Independent Business Consultant",
    image: "/images/wp/2-1.png",
    description: "Vendor Infra is ISO 14001 certified. This ISO standard provides guidelines on what has to be done to implement an environmental management system (EMS). It includes policies, processes, plans, records, and best practices that define rules regarding how your company interacts with the environment. ISO 14001 requirements give you a framework, along with guidelines. for creating EMS for any organization"
  }
];
function Referral() {
  const [open, setOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState("");
  const [step, setStep] = useState("form");
  const [form, setForm] = useState({ name: "", email: "", phone: "", city: "", message: "" });
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");
  const openModal = (program) => {
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
  const handleChange = (e) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
    setErrors((p) => ({ ...p, [e.target.name]: void 0 }));
  };
  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email";
    if (!form.phone.trim() || !/^[0-9+\-\s]{7,15}$/.test(form.phone)) e.phone = "Enter a valid phone";
    return e;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setStep("submitting");
    setSubmitError("");
    try {
      const res = await fetch("/api/referral", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, program: selectedProgram })
      });
      if (!res.ok) throw new Error("Server error");
      setStep("success");
    } catch {
      setStep("form");
      setSubmitError("Could not send your application. Please call us or try again.");
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen flex flex-col", children: [
    /* @__PURE__ */ jsx(Navbar, {}),
    /* @__PURE__ */ jsx(PageHero, { eyebrow: "Referral", title: "Referral" }),
    /* @__PURE__ */ jsx("section", { className: "py-20 bg-gray-50 flex-1", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4", children: /* @__PURE__ */ jsx("div", { className: "max-w-6xl mx-auto space-y-12", children: referralPrograms.map((program, index) => /* @__PURE__ */ jsxs(
      motion.article,
      {
        initial: { opacity: 0, y: 28 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { delay: index * 0.08 },
        className: "grid grid-cols-1 lg:grid-cols-2 gap-0 bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden",
        children: [
          /* @__PURE__ */ jsx("div", { className: `${index % 2 === 1 ? "lg:order-2" : ""} bg-[#08294d]`, children: /* @__PURE__ */ jsx(
            "img",
            {
              src: program.image,
              alt: program.title,
              className: "w-full h-full min-h-[360px] object-cover",
              loading: "eager"
            }
          ) }),
          /* @__PURE__ */ jsxs("div", { className: "p-8 md:p-12 flex flex-col justify-center", children: [
            /* @__PURE__ */ jsx("div", { className: "w-16 h-16 rounded-2xl bg-[#edad1a] text-[#071827] flex items-center justify-center font-semibold text-xl mb-8", children: program.code }),
            /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold leading-tight text-[#071827] mb-6", children: program.title }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-600 leading-relaxed text-base md:text-lg mb-8", children: program.description }),
            /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-3 items-center", children: /* @__PURE__ */ jsx(
              SiteButton,
              {
                onClick: () => openModal(program?.title || "Join Now"),
                className: "normal-case tracking-normal",
                children: "Join Now"
              }
            ) })
          ] })
        ]
      },
      program.code
    )) }) }) }),
    /* @__PURE__ */ jsx(Footer, {}),
    /* @__PURE__ */ jsx(AnimatePresence, { children: open && /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(
        motion.div,
        {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 0 },
          transition: { duration: 0.2 },
          onClick: handleClose,
          className: "fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
        }
      ),
      /* @__PURE__ */ jsx(
        motion.div,
        {
          initial: { opacity: 0, scale: 0.94, y: 24 },
          animate: { opacity: 1, scale: 1, y: 0 },
          exit: { opacity: 0, scale: 0.94, y: 24 },
          transition: { type: "spring", stiffness: 300, damping: 28 },
          className: "fixed inset-0 z-[61] flex items-center justify-center p-4 pointer-events-none",
          children: /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden pointer-events-auto max-h-[90vh] overflow-y-auto", children: [
            /* @__PURE__ */ jsxs("div", { className: "relative bg-[#00274d] px-8 pt-8 pb-10", children: [
              /* @__PURE__ */ jsx(
                "div",
                {
                  className: "absolute inset-0 opacity-10",
                  style: { backgroundImage: "radial-gradient(circle at 1px 1px,#fff 1px,transparent 0)", backgroundSize: "24px 24px" }
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: handleClose,
                  className: "absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/70 hover:text-white transition-colors z-10",
                  children: /* @__PURE__ */ jsx(X, { className: "w-4 h-4" })
                }
              ),
              /* @__PURE__ */ jsx("p", { className: "text-[#edad1a] text-xs font-bold uppercase tracking-widest mb-2 relative z-10", children: "Referral Program" }),
              /* @__PURE__ */ jsxs("h2", { className: "text-2xl font-semibold text-white relative z-10 leading-snug", children: [
                "Join ",
                selectedProgram
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-white/70 text-sm mt-2 relative z-10", children: "Share your details and our team will get back to you soon." })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "h-4 bg-[#00274d] relative", children: /* @__PURE__ */ jsx("div", { className: "absolute bottom-0 left-0 right-0 h-4 bg-white rounded-t-3xl" }) }),
            /* @__PURE__ */ jsx("div", { className: "px-8 pb-8", children: /* @__PURE__ */ jsxs(AnimatePresence, { mode: "wait", children: [
              step === "form" && /* @__PURE__ */ jsxs(
                motion.form,
                {
                  initial: { opacity: 0 },
                  animate: { opacity: 1 },
                  exit: { opacity: 0 },
                  onSubmit: handleSubmit,
                  noValidate: true,
                  className: "space-y-4",
                  children: [
                    /* @__PURE__ */ jsx(Field, { icon: /* @__PURE__ */ jsx(User, { className: "w-4 h-4" }), error: errors.name, children: /* @__PURE__ */ jsx(
                      "input",
                      {
                        name: "name",
                        value: form.name,
                        onChange: handleChange,
                        placeholder: "Your full name *",
                        maxLength: 100,
                        className: "w-full bg-transparent outline-none text-sm text-gray-800 placeholder-gray-400"
                      }
                    ) }),
                    /* @__PURE__ */ jsx(Field, { icon: /* @__PURE__ */ jsx(Mail, { className: "w-4 h-4" }), error: errors.email, children: /* @__PURE__ */ jsx(
                      "input",
                      {
                        name: "email",
                        type: "email",
                        value: form.email,
                        onChange: handleChange,
                        placeholder: "Email address *",
                        maxLength: 255,
                        className: "w-full bg-transparent outline-none text-sm text-gray-800 placeholder-gray-400"
                      }
                    ) }),
                    /* @__PURE__ */ jsx(Field, { icon: /* @__PURE__ */ jsx(Phone, { className: "w-4 h-4" }), error: errors.phone, children: /* @__PURE__ */ jsx(
                      "input",
                      {
                        name: "phone",
                        type: "tel",
                        value: form.phone,
                        onChange: handleChange,
                        placeholder: "Phone number *",
                        maxLength: 20,
                        className: "w-full bg-transparent outline-none text-sm text-gray-800 placeholder-gray-400"
                      }
                    ) }),
                    /* @__PURE__ */ jsx(Field, { icon: /* @__PURE__ */ jsx(MapPin, { className: "w-4 h-4" }), children: /* @__PURE__ */ jsx(
                      "input",
                      {
                        name: "city",
                        value: form.city,
                        onChange: handleChange,
                        placeholder: "City",
                        maxLength: 100,
                        className: "w-full bg-transparent outline-none text-sm text-gray-800 placeholder-gray-400"
                      }
                    ) }),
                    /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3 rounded-xl border border-gray-200 px-4 py-3 focus-within:border-[#edad1a] transition-colors", children: [
                      /* @__PURE__ */ jsx("span", { className: "shrink-0 text-gray-400 mt-0.5", children: /* @__PURE__ */ jsx(MessageSquare, { className: "w-4 h-4" }) }),
                      /* @__PURE__ */ jsx(
                        "textarea",
                        {
                          name: "message",
                          value: form.message,
                          onChange: handleChange,
                          placeholder: "Tell us about your interest (optional)",
                          rows: 3,
                          maxLength: 1e3,
                          className: "w-full bg-transparent outline-none text-sm text-gray-800 placeholder-gray-400 resize-none"
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsx(
                      "button",
                      {
                        type: "submit",
                        className: "w-full bg-[#edad1a] hover:bg-[#d4941a] text-white font-bold py-4 rounded-xl transition-all hover:scale-[1.02] shadow-lg shadow-yellow-400/20 text-sm",
                        children: "Submit →"
                      }
                    ),
                    /* @__PURE__ */ jsxs("p", { className: "text-center text-xs text-gray-400", children: [
                      "By submitting, you agree to be contacted about the ",
                      selectedProgram,
                      "."
                    ] }),
                    submitError && /* @__PURE__ */ jsx("p", { className: "text-center text-xs text-red-500", children: submitError })
                  ]
                },
                "form"
              ),
              step === "submitting" && /* @__PURE__ */ jsxs(
                motion.div,
                {
                  initial: { opacity: 0 },
                  animate: { opacity: 1 },
                  exit: { opacity: 0 },
                  className: "flex flex-col items-center justify-center py-16 gap-4",
                  children: [
                    /* @__PURE__ */ jsx(Loader2, { className: "w-10 h-10 text-[#edad1a] animate-spin" }),
                    /* @__PURE__ */ jsx("p", { className: "text-gray-500 text-sm font-medium", children: "Submitting your application…" })
                  ]
                },
                "submitting"
              ),
              step === "success" && /* @__PURE__ */ jsxs(
                motion.div,
                {
                  initial: { opacity: 0, scale: 0.9 },
                  animate: { opacity: 1, scale: 1 },
                  exit: { opacity: 0 },
                  transition: { type: "spring", stiffness: 260, damping: 22 },
                  className: "flex flex-col items-center justify-center py-12 gap-4 text-center",
                  children: [
                    /* @__PURE__ */ jsx("div", { className: "w-16 h-16 bg-green-50 rounded-full flex items-center justify-center", children: /* @__PURE__ */ jsx(CheckCircle2, { className: "w-9 h-9 text-green-500" }) }),
                    /* @__PURE__ */ jsx("h3", { className: "text-xl font-semibold text-[#00274d]", children: "Application Received!" }),
                    /* @__PURE__ */ jsxs("p", { className: "text-gray-500 text-sm max-w-xs leading-relaxed", children: [
                      "Thanks, ",
                      /* @__PURE__ */ jsx("span", { className: "font-semibold text-gray-700", children: form.name }),
                      "! Our team will reach out to you at",
                      " ",
                      /* @__PURE__ */ jsx("span", { className: "font-semibold text-gray-700", children: form.phone }),
                      " shortly."
                    ] }),
                    /* @__PURE__ */ jsx(
                      "button",
                      {
                        onClick: handleClose,
                        className: "mt-2 bg-[#00274d] text-white font-semibold px-8 py-3 rounded-full hover:bg-[#003a6e] transition-colors text-sm",
                        children: "Done"
                      }
                    )
                  ]
                },
                "success"
              )
            ] }) })
          ] })
        }
      )
    ] }) })
  ] });
}
function Field({ icon, error, children }) {
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs("div", { className: `flex items-center gap-3 rounded-xl border px-4 py-3 focus-within:border-[#edad1a] transition-colors ${error ? "border-red-400 bg-red-50" : "border-gray-200"}`, children: [
      /* @__PURE__ */ jsx("span", { className: `shrink-0 ${error ? "text-red-400" : "text-gray-400"}`, children: icon }),
      children
    ] }),
    error && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-xs mt-1 ml-1", children: error })
  ] });
}
const certifications = [
  {
    title: "ISO 9001",
    image: "/images/wp/ISO-9001-img.png",
    icon: ShieldCheck,
    accent: "#0057b8",
    accentLight: "#e8f1fb",
    accentMid: "#b5d4f4",
    label: "Quality Management",
    content: "Vendor Infra is ISO 9001 certified. This is one of the most popular ISO standards for creating, implementing, and maintaining a Quality Management System (QMS) for any given company, regardless of its industry, capital, or size"
  },
  {
    title: "ISO 14001",
    image: "/images/wp/ISO-14001.png",
    icon: Leaf,
    accent: "#166534",
    accentLight: "#dcfce7",
    accentMid: "#86efac",
    label: "Environmental Management",
    content: "Vendor Infra is ISO 14001 certified. This ISO standard provides guidelines on what has to be done to implement an environmental management system (EMS). It includes policies, processes, plans, records, and best practices that define rules regarding how your company interacts with the environment. ISO 14001 requirements give you a framework, along with guidelines. for creating EMS for any organization"
  },
  {
    title: "ISO 27001",
    image: "/images/wp/iso-27000.png",
    icon: Lock,
    accent: "#6d28d9",
    accentLight: "#ede9fe",
    accentMid: "#c4b5fd",
    label: "Information Security",
    content: "Vendor Infra is ISO 27001 certified. This ISO Standard is for information security. It specifies the requirements for establishing, implementing, maintaining and continually improving an information security management and continually improving an information security management system within the context of the organization. It also includes requirements for the assessment and treatment of information security risks tailored to the needs of the organization."
  }
];
function ISO() {
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen flex flex-col bg-white", children: [
    /* @__PURE__ */ jsx(Navbar, {}),
    /* @__PURE__ */ jsx(PageHero, { eyebrow: "ISO", title: "ISO Certifications" }),
    /* @__PURE__ */ jsx("section", { className: "py-16 flex-1", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 max-w-5xl", children: [
      /* @__PURE__ */ jsx("div", { className: "flex flex-wrap justify-center gap-3 mb-12", children: certifications.map((cert) => {
        const Icon = cert.icon;
        return /* @__PURE__ */ jsxs(
          "div",
          {
            className: "flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-semibold",
            style: {
              borderColor: cert.accent,
              color: cert.accent,
              backgroundColor: cert.accentLight
            },
            children: [
              /* @__PURE__ */ jsx(Icon, { className: "w-4 h-4" }),
              cert.title
            ]
          },
          cert.title
        );
      }) }),
      /* @__PURE__ */ jsx("div", { className: "space-y-8", children: certifications.map((cert, index) => {
        const Icon = cert.icon;
        const flip = index % 2 === 1;
        return /* @__PURE__ */ jsxs(
          motion.article,
          {
            initial: { opacity: 0, y: 32 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true, margin: "-60px" },
            transition: { delay: index * 0.1, duration: 0.5 },
            className: "relative bg-white rounded-3xl overflow-hidden shadow-sm",
            style: { border: `1.5px solid ${cert.accentMid}` },
            children: [
              /* @__PURE__ */ jsx(
                "div",
                {
                  className: "h-1 w-full",
                  style: { backgroundColor: cert.accent }
                }
              ),
              /* @__PURE__ */ jsxs(
                "div",
                {
                  className: `flex flex-col lg:flex-row ${flip ? "lg:flex-row-reverse" : ""}`,
                  children: [
                    /* @__PURE__ */ jsxs(
                      "div",
                      {
                        className: "relative lg:w-[42%] flex-shrink-0 flex items-center justify-center p-10 min-h-[260px]",
                        style: { backgroundColor: cert.accentLight },
                        children: [
                          /* @__PURE__ */ jsx(
                            "div",
                            {
                              className: "absolute inset-0 hidden lg:block",
                              style: {
                                backgroundColor: cert.accentLight,
                                clipPath: flip ? "polygon(0 0, 100% 0, 85% 100%, 0 100%)" : "polygon(0 0, 100% 0, 100% 100%, 15% 100%)"
                              }
                            }
                          ),
                          /* @__PURE__ */ jsx(
                            "span",
                            {
                              className: "absolute font-black select-none pointer-events-none",
                              style: {
                                fontSize: "clamp(80px, 14vw, 140px)",
                                color: cert.accentMid,
                                opacity: 0.5,
                                bottom: "-10px",
                                right: flip ? "auto" : "8px",
                                left: flip ? "8px" : "auto",
                                lineHeight: 1,
                                letterSpacing: "-4px"
                              },
                              children: cert.title.replace("ISO ", "")
                            }
                          ),
                          /* @__PURE__ */ jsx("div", { className: "relative z-10 bg-white rounded-2xl p-5 shadow-md w-full max-w-[220px]", children: /* @__PURE__ */ jsx(
                            "img",
                            {
                              src: cert.image,
                              alt: cert.title,
                              className: "w-full h-auto object-contain",
                              loading: "eager"
                            }
                          ) })
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxs("div", { className: "flex-1 p-8 md:p-10 flex flex-col justify-center", children: [
                      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mb-5", children: [
                        /* @__PURE__ */ jsx(
                          "div",
                          {
                            className: "flex items-center justify-center w-9 h-9 rounded-xl",
                            style: { backgroundColor: cert.accentLight },
                            children: /* @__PURE__ */ jsx(
                              Icon,
                              {
                                className: "w-5 h-5",
                                style: { color: cert.accent }
                              }
                            )
                          }
                        ),
                        /* @__PURE__ */ jsx(
                          "span",
                          {
                            className: "text-xs font-bold uppercase tracking-widest",
                            style: { color: cert.accent },
                            children: cert.label
                          }
                        ),
                        /* @__PURE__ */ jsx(
                          BadgeCheck,
                          {
                            className: "w-4 h-4 ml-1",
                            style: { color: cert.accent }
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsx(
                        "h2",
                        {
                          className: "text-4xl md:text-5xl font-black leading-none mb-1",
                          style: { color: "#00274d" },
                          children: "ISO"
                        }
                      ),
                      /* @__PURE__ */ jsx(
                        "h2",
                        {
                          className: "text-4xl md:text-5xl font-black leading-none mb-6",
                          style: { color: cert.accent },
                          children: cert.title.replace("ISO ", "")
                        }
                      ),
                      /* @__PURE__ */ jsx(
                        "div",
                        {
                          className: "h-[2px] w-12 rounded-full mb-5",
                          style: { backgroundColor: cert.accent }
                        }
                      ),
                      /* @__PURE__ */ jsx("p", { className: "text-slate-600 leading-relaxed text-sm md:text-base text-justify", children: cert.content })
                    ] })
                  ]
                }
              )
            ]
          },
          cert.title
        );
      }) }),
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 16 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          className: "mt-12 rounded-2xl bg-[#00274d] p-6 flex flex-col sm:flex-row items-center justify-between gap-4",
          children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-full bg-[#0057b8]/30 flex items-center justify-center", children: /* @__PURE__ */ jsx(BadgeCheck, { className: "w-5 h-5 text-blue-300" }) }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("p", { className: "text-white font-semibold text-sm", children: "Internationally Certified" }),
                /* @__PURE__ */ jsx("p", { className: "text-blue-200 text-xs", children: "ISO 9001 · ISO 14001 · ISO 27001" })
              ] })
            ] }),
            /* @__PURE__ */ jsxs(
              "a",
              {
                href: "mailto:enquiry@vendorinfra.com",
                className: "inline-flex items-center gap-2 bg-[#0057b8] hover:bg-[#0046a0] text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-colors duration-200 whitespace-nowrap",
                children: [
                  "enquiry@vendorinfra.com",
                  /* @__PURE__ */ jsx("svg", { className: "w-3.5 h-3.5", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2.5, children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M17 8l4 4m0 0l-4 4m4-4H3" }) })
                ]
              }
            )
          ]
        }
      )
    ] }) }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
const sections$2 = [
  {
    title: "Applicability",
    content: 'Vendor Infra is the exclusive property of the Vendor Infra Global Private Limited. This Pricing Policy is applicable between Vendor Infra, a company registered under Indian laws (hereafter referred to as "Vendor Infra"), and any persons wishing to put plants, machines, equipment, tools etc. for sell/hire/purchase/rent using the Website http://VendorInfra.com/ (hereafter referred to as "Users, Members"). This Pricing Policy is to be considered in conjunction with our Privacy Policies and Terms of Use.'
  },
  {
    title: "Definitions",
    content: 'Unless otherwise defined hereunder or ascertained from the context, expressions employed in this Pricing Policy shall have the meaning ascribed to them under the Terms of Use.\n\n"Commission" means the amount charged by Vendor Infra in advance from both Owner and Hirer once the rental/sell agreement is confirmed between the Parties.'
  },
  {
    title: "Terms for Rental Agreement",
    content: "The Parties represent that they are legally competent to enter into a contract. Owners who offer a machine etc. for rent represent that they are legally entitled to offer and/or rent the machine to others. Any agents, employees, attorneys, or anyone else acting on behalf of the Owners or Hirers must follow the terms of this Pricing Policy and all other Vendor Infra Policies."
  },
  {
    title: "Fees",
    content: "The price of each Item listed on Vendor Infra is expressed in Indian Rupees or the relevant currency as applicable in such countries. While listing their machines etc., the Owners must indicate whether the listed price is exclusive or inclusive of applicable taxes, costs, possible delivery fees and insurance costs.\n\nTo initiate the process, the Hirer will send a request for the reservation to the Owner through Vendor Infra website. A Rental Agreement is confirmed by the Owner's acceptance of the Hirer's Reservation Request. With the exception of promotional offers that are explicitly outlined on the Website, the Owner and Hirer are liable to pay commission to Vendor Infra once a Rental Agreement is confirmed between the Parties."
  },
  {
    title: "Access, registration, the listing of machines and use of the Website are free.",
    content: "Vendor Infra can modify its policies on listings and commission fees and can also modify the fees set for these services. Temporary or permanent modifications are effective as soon as they are published on the Website and are applicable to all subsequent transactions. In the case of temporary modifications, the duration of the changes will be clearly indicated on the Website.\n\nAs an Owner, you must pay commission if prescribed of the Total Rent Amount whenever you accept a Hirer's Reservation Request. As a Hirer, you must pay commission if prescribed of the Total Rent Amount whenever a Rental Agreement is confirmed between you and an Owner."
  },
  {
    title: "Billing & Payment",
    content: "An invoice must be paid within 30 days of when it was issued to the Member Account on Vendor Infra. If payment is not made by its due date, late fees will be applied to the Member Account. It is possible to set up automatic payments of your invoices at regular intervals by contacting Vendor Infra."
  },
  {
    title: "Payment Default & Late Fees",
    content: "Late fees shall be levied if an invoice has not been paid 30 calendar days after being issued. In case of payment default on amounts due to Vendor Infra, a formal notice will be sent and billed to the Member. If the default invoices remain unpaid following the formal notice, the amounts due will accrue late fees interest at a yearly rate of 12%. A penalty fee of 15% of the total due will also be applied, which will be added to the fees for the formal notice, and any other costs incurred by Vendor Infra in recovering the amounts owed."
  },
  {
    title: "Tax",
    content: "Members are solely liable for all the taxes, fees and commissions resulting from the use of Services and Website. Taxes (such as, and without limitations, indirect taxes) might apply to your transactions whether you are an individual or entity, or whether you are an Owner or a Hirer. Members are encouraged to seek tax advice from a professional."
  },
  {
    title: "Warranties & Limitation of Liabilities",
    content: "As agreed, outline in the Terms of Use, Vendor Infra is not responsible for any loss that may occur during usage of the Website or Services. You are encouraged to review the Terms of Use for any further information."
  },
  {
    title: "Applicable Laws",
    content: "This Pricing Policy is governed by and construed in accordance with the laws of India and you agree, in the event of any dispute arising in relation to this Agreement or any dispute arising in relation to the Website, to submit to the jurisdiction of the courts of New Delhi, India for the resolution of all such disputes."
  },
  {
    title: "Contacting Us",
    content: "If you have any questions or queries or clarification about this Policy, please contact us at enquiry@vendorinfra.com."
  },
  {
    title: "Note",
    content: "For pricing policy related to annual subscription plans of Vendor Infra, please refer to Terms of Services document (Section -11)."
  }
];
function PricingPolicy() {
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen flex flex-col bg-white", children: [
    /* @__PURE__ */ jsx(Navbar, {}),
    /* @__PURE__ */ jsx(PageHero, { eyebrow: "Policy", title: "Pricing Policy" }),
    /* @__PURE__ */ jsx("section", { className: "py-16 flex-1", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 max-w-4xl", children: [
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.4 },
          className: "mb-10 rounded-2xl border border-[#0057b8]/20 bg-white shadow-sm overflow-hidden",
          children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 px-6 py-4 bg-[#00274d]", children: [
              /* @__PURE__ */ jsx("div", { className: "w-2 h-2 rounded-full bg-blue-300 animate-pulse" }),
              /* @__PURE__ */ jsx("span", { className: "text-white text-sm font-semibold tracking-wider uppercase", children: "Table of Contents" })
            ] }),
            /* @__PURE__ */ jsx("ul", { className: "grid grid-cols-2 sm:grid-cols-3 gap-px bg-[#e8f1fb]", children: sections$2.map((s, i) => /* @__PURE__ */ jsx("li", { className: "bg-white", children: /* @__PURE__ */ jsxs(
              "a",
              {
                href: `#section-${i}`,
                className: "flex items-center gap-2 px-4 py-3 text-xs text-[#00274d] font-medium hover:bg-[#e8f1fb] hover:text-[#0057b8] transition-colors group",
                children: [
                  /* @__PURE__ */ jsx("span", { className: "w-5 h-5 flex-shrink-0 rounded-full bg-[#e8f1fb] group-hover:bg-[#0057b8] group-hover:text-white text-[10px] font-bold flex items-center justify-center text-[#0057b8] transition-colors", children: String(i + 1).padStart(2, "0") }),
                  s.title
                ]
              }
            ) }, s.title)) })
          ]
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute left-[27px] top-0 bottom-0 w-px bg-gradient-to-b from-[#0057b8] via-[#0057b8]/30 to-transparent hidden sm:block" }),
        /* @__PURE__ */ jsx("div", { className: "space-y-5", children: sections$2.map((s, i) => /* @__PURE__ */ jsxs(
          motion.div,
          {
            id: `section-${i}`,
            initial: { opacity: 0, x: -12 },
            whileInView: { opacity: 1, x: 0 },
            viewport: { once: true, margin: "-60px" },
            transition: { delay: i * 0.05, duration: 0.4 },
            className: "group relative",
            children: [
              /* @__PURE__ */ jsx("div", { className: "absolute left-0 top-6 w-[55px] hidden sm:flex items-center justify-center z-10", children: /* @__PURE__ */ jsx("div", { className: "w-9 h-9 rounded-full bg-white border-2 border-[#0057b8] flex items-center justify-center text-[11px] font-bold text-[#0057b8] shadow-sm group-hover:bg-[#0057b8] group-hover:text-white transition-colors duration-200", children: String(i + 1).padStart(2, "0") }) }),
              /* @__PURE__ */ jsxs("div", { className: "sm:ml-16 rounded-2xl bg-white border border-[#0057b8]/15 shadow-sm overflow-hidden group-hover:border-[#0057b8]/50 group-hover:shadow-md transition-all duration-200", children: [
                /* @__PURE__ */ jsx("div", { className: "h-[3px] w-full bg-gradient-to-r from-[#0057b8] to-[#38bdf8]" }),
                /* @__PURE__ */ jsxs("div", { className: "px-8 py-7", children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4 mb-4", children: [
                    /* @__PURE__ */ jsx("span", { className: "sm:hidden flex-shrink-0 mt-1 w-7 h-7 rounded-full bg-[#e8f1fb] text-[#0057b8] text-[11px] font-bold flex items-center justify-center", children: String(i + 1).padStart(2, "0") }),
                    /* @__PURE__ */ jsx("h2", { className: "text-xl md:text-2xl font-bold text-[#00274d] leading-snug", children: s.title })
                  ] }),
                  /* @__PURE__ */ jsx("div", { className: "h-px bg-gradient-to-r from-[#0057b8]/30 via-[#0057b8]/10 to-transparent mb-5" }),
                  s.content.split("\n\n").map((para, j) => /* @__PURE__ */ jsx(
                    "p",
                    {
                      className: "text-slate-600 leading-relaxed text-sm mb-3 last:mb-0 whitespace-pre-line text-justify",
                      children: para
                    },
                    j
                  ))
                ] })
              ] })
            ]
          },
          s.title
        )) })
      ] }),
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 16 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          className: "mt-12 sm:ml-16 rounded-2xl bg-[#00274d] border border-[#0057b8]/30 p-8 text-center shadow-lg",
          children: [
            /* @__PURE__ */ jsx("div", { className: "inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#0057b8]/20 mb-4", children: /* @__PURE__ */ jsx(
              "svg",
              {
                className: "w-5 h-5 text-blue-300",
                fill: "none",
                viewBox: "0 0 24 24",
                stroke: "currentColor",
                strokeWidth: 2,
                children: /* @__PURE__ */ jsx(
                  "path",
                  {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    d: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  }
                )
              }
            ) }),
            /* @__PURE__ */ jsx("p", { className: "text-white font-semibold text-base mb-1", children: "Have questions? Reach out to us at" }),
            /* @__PURE__ */ jsxs(
              "a",
              {
                href: "mailto:enquiry@vendorinfra.com",
                className: "inline-flex items-center gap-2 bg-[#0057b8] hover:bg-[#0046a0] text-white text-sm font-semibold px-6 py-2.5 rounded-full transition-colors duration-200",
                children: [
                  "enquiry@vendorinfra.com",
                  /* @__PURE__ */ jsx(
                    "svg",
                    {
                      className: "w-3.5 h-3.5",
                      fill: "none",
                      viewBox: "0 0 24 24",
                      stroke: "currentColor",
                      strokeWidth: 2.5,
                      children: /* @__PURE__ */ jsx(
                        "path",
                        {
                          strokeLinecap: "round",
                          strokeLinejoin: "round",
                          d: "M17 8l4 4m0 0l-4 4m4-4H3"
                        }
                      )
                    }
                  )
                ]
              }
            )
          ]
        }
      )
    ] }) }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
const sections$1 = [
  {
    title: "Introduction",
    content: `This privacy policy ("Policy") describes how we collect, protect and use the identifiable personal or business information ("Personal Information", "Business Information" or "Personal and Business Information") you ("User", "you" or "your") provide on the www.vendorinfra.com website and any of its products or services (collectively, "Website" or "Services") owned and operated by Vendor Infra Global Private Limited ("VendorInfra", "Vendor Infra", "us", "we" or "our").

Personal information means information or an opinion about an identified individual, or a reasonably identifiable individual. This Policy applies to personal information collected and/or held by Vendor Infra.`
  },
  {
    title: "Collection of Personal & Business Information",
    content: `We collect, receive and store any Personal and Business information you knowingly provide to us when you create an account, publish content, make a purchase, fill any online form on the Website. When required this information may include your email address, name, phone number, address, Business Information and other Personal Information.

You can choose not to provide us with certain information, but then you may not be able to take advantage of some of the Website's features. However, once you provided the information, it is deemed that you have given Vendor Infra right to publish the provided business and personal information.`
  },
  {
    title: "Collection of Usage Statistics",
    content: `When you visit the Website our servers automatically record information that your browser sends. This data may include information such as your computer's IP address, browser type and version, operating system type and version, language preferences or the webpage you were visiting before you came to our Website, pages of our Website that you visit, the time spent on those pages, information you search for on our Website, access times and dates, and other statistics.`
  },
  {
    title: "Use of Collected Information",
    content: `Any of the information we collect from you may be used to: personalise your experience; improve our Website; improve customer service; process transactions; send periodic emails; and run and operate our Website and Services. Information collected automatically is used only to identify potential cases of abuse and establish statistical information regarding Website usage. This statistical information is not otherwise aggregated in such a way that would identify any particular user of the system.`
  },
  {
    title: "Sharing of Information",
    content: `We do not sell, trade, or rent Users' personal identification information to others. We may share generic aggregated demographic information not linked to any personal identification information regarding visitors and users with our business partners, trusted affiliates and advertisers. We may use third-party service providers to help us operate our business and the Website or administer activities on our behalf.`
  },
  {
    title: "Data Retention",
    content: `We will retain and use your personal information for the period necessary to comply with our legal obligations, resolve disputes, and enforce our agreements unless a longer retention period is required or permitted by law. We may use any aggregated data derived from or incorporating your Personal Information after you update or delete it, but not in a manner that would identify you personally.`
  },
  {
    title: "Security of Information",
    content: `We secure information you provide on computer servers in a controlled, secure environment, protected from unauthorized access, use, or disclosure. We maintain reasonable administrative, technical, and physical safeguards in an effort to protect against unauthorized access, use, modification, and disclosure of personal information in its control and custody.`
  },
  {
    title: "Your Rights",
    content: `You have the right to access, update or delete the information we have on you. You may object to processing of your personal information, ask us to restrict processing of your personal information, or request portability of your personal information. To exercise any of these rights, please contact us at enquiry@vendorinfra.com.`
  },
  {
    title: "Contact Us",
    content: `If you have any questions about this Policy, please contact us at:
Vendor Infra Global Private Limited
Suit No. 1436-1440, Plus Offices, Landmark Cyber Park, Sector 67, Gurugram, Haryana, India – 122101
Email: enquiry@vendorinfra.com
Phone: +91-8800404840`
  }
];
function PrivacyPolicy() {
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen flex flex-col bg-white", children: [
    /* @__PURE__ */ jsx(Navbar, {}),
    /* @__PURE__ */ jsx(
      PageHero,
      {
        eyebrow: "Policy",
        title: "Committed to protecting your privacy"
      }
    ),
    /* @__PURE__ */ jsx("section", { className: "py-16 flex-1", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 max-w-4xl", children: [
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.4 },
          className: "mb-10 rounded-2xl border border-[#0057b8]/20 bg-white shadow-sm overflow-hidden",
          children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 px-6 py-4 bg-[#00274d]", children: [
              /* @__PURE__ */ jsx("div", { className: "w-2 h-2 rounded-full bg-blue-300 animate-pulse" }),
              /* @__PURE__ */ jsx("span", { className: "text-white text-sm font-semibold tracking-wider uppercase", children: "Table of Contents" })
            ] }),
            /* @__PURE__ */ jsx("ul", { className: "grid grid-cols-2 sm:grid-cols-3 gap-px bg-[#e8f1fb]", children: sections$1.map((s, i) => /* @__PURE__ */ jsx("li", { className: "bg-white", children: /* @__PURE__ */ jsxs(
              "a",
              {
                href: `#section-${i}`,
                className: "flex items-center gap-2 px-4 py-3 text-xs text-[#00274d] font-medium hover:bg-[#e8f1fb] hover:text-[#0057b8] transition-colors group",
                children: [
                  /* @__PURE__ */ jsx("span", { className: "w-5 h-5 flex-shrink-0 rounded-full bg-[#e8f1fb] group-hover:bg-[#0057b8] group-hover:text-white text-[10px] font-bold flex items-center justify-center text-[#0057b8] transition-colors", children: String(i + 1).padStart(2, "0") }),
                  s.title
                ]
              }
            ) }, s.title)) })
          ]
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute left-[27px] top-0 bottom-0 w-px bg-gradient-to-b from-[#0057b8] via-[#0057b8]/30 to-transparent hidden sm:block" }),
        /* @__PURE__ */ jsx("div", { className: "space-y-5", children: sections$1.map((s, i) => /* @__PURE__ */ jsxs(
          motion.div,
          {
            id: `section-${i}`,
            initial: { opacity: 0, x: -12 },
            whileInView: { opacity: 1, x: 0 },
            viewport: { once: true, margin: "-60px" },
            transition: { delay: i * 0.05, duration: 0.4 },
            className: "group relative",
            children: [
              /* @__PURE__ */ jsx("div", { className: "absolute left-0 top-6 w-[55px] hidden sm:flex items-center justify-center z-10", children: /* @__PURE__ */ jsx("div", { className: "w-9 h-9 rounded-full bg-white border-2 border-[#0057b8] flex items-center justify-center text-[11px] font-bold text-[#0057b8] shadow-sm group-hover:bg-[#0057b8] group-hover:text-white transition-colors duration-200", children: String(i + 1).padStart(2, "0") }) }),
              /* @__PURE__ */ jsxs("div", { className: "sm:ml-16 rounded-2xl bg-white border border-[#0057b8]/15 shadow-sm overflow-hidden group-hover:border-[#0057b8]/50 group-hover:shadow-md transition-all duration-200", children: [
                /* @__PURE__ */ jsx("div", { className: "h-[3px] w-full bg-gradient-to-r from-[#0057b8] to-[#38bdf8]" }),
                /* @__PURE__ */ jsxs("div", { className: "px-8 py-7", children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4 mb-4", children: [
                    /* @__PURE__ */ jsx("span", { className: "sm:hidden flex-shrink-0 mt-1 w-7 h-7 rounded-full bg-[#e8f1fb] text-[#0057b8] text-[11px] font-bold flex items-center justify-center", children: String(i + 1).padStart(2, "0") }),
                    /* @__PURE__ */ jsx("h2", { className: "text-xl md:text-2xl font-bold text-[#00274d] leading-snug", children: s.title })
                  ] }),
                  /* @__PURE__ */ jsx("div", { className: "h-px bg-gradient-to-r from-[#0057b8]/30 via-[#0057b8]/10 to-transparent mb-5" }),
                  s.content.split("\n\n").map((para, j) => /* @__PURE__ */ jsx(
                    "p",
                    {
                      className: "text-slate-600 leading-relaxed text-sm mb-3 last:mb-0 whitespace-pre-line text-justify",
                      children: para
                    },
                    j
                  ))
                ] })
              ] })
            ]
          },
          s.title
        )) })
      ] }),
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 16 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          className: "mt-12 sm:ml-16 rounded-2xl bg-[#00274d] border border-[#0057b8]/30 p-8 text-center shadow-lg",
          children: [
            /* @__PURE__ */ jsx("div", { className: "inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#0057b8]/20 mb-4", children: /* @__PURE__ */ jsx(
              "svg",
              {
                className: "w-5 h-5 text-blue-300",
                fill: "none",
                viewBox: "0 0 24 24",
                stroke: "currentColor",
                strokeWidth: 2,
                children: /* @__PURE__ */ jsx(
                  "path",
                  {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    d: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  }
                )
              }
            ) }),
            /* @__PURE__ */ jsx("p", { className: "text-white font-semibold text-base mb-1", children: "Have questions? Reach out to us at" }),
            /* @__PURE__ */ jsxs(
              "a",
              {
                href: "mailto:enquiry@vendorinfra.com",
                className: "inline-flex items-center gap-2 bg-[#0057b8] hover:bg-[#0046a0] text-white text-sm font-semibold px-6 py-2.5 rounded-full transition-colors duration-200",
                children: [
                  "enquiry@vendorinfra.com",
                  /* @__PURE__ */ jsx(
                    "svg",
                    {
                      className: "w-3.5 h-3.5",
                      fill: "none",
                      viewBox: "0 0 24 24",
                      stroke: "currentColor",
                      strokeWidth: 2.5,
                      children: /* @__PURE__ */ jsx(
                        "path",
                        {
                          strokeLinecap: "round",
                          strokeLinejoin: "round",
                          d: "M17 8l4 4m0 0l-4 4m4-4H3"
                        }
                      )
                    }
                  )
                ]
              }
            )
          ]
        }
      )
    ] }) }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
const securityPillars = [
  {
    title: "Physical Security",
    icon: Building2,
    number: "01",
    summary: "Hardened data centers with zero-trust physical access controls.",
    points: [
      "Biometric ID, metal detection, cameras, vehicle barriers & laser intrusion detection",
      "Security personnel on-site 24 / 7 / 365",
      "Regular human audits to verify site inviolability",
      "Multi-factor authentication for all remote server access",
      "No sensitive server directly reachable from the public internet"
    ]
  },
  {
    title: "Network Security",
    icon: Network,
    number: "02",
    summary: "Custom-hardened OS with real-time traffic inspection.",
    points: [
      "Custom hardware running a hardened OS and proprietary file system",
      "Strict firewall rules governing all ingress and egress traffic",
      "IDS / IPS with automated alerts for anomalous behavior",
      "All actions logged to an isolated external server with alarm triggers"
    ]
  },
  {
    title: "Data Security",
    icon: Database,
    number: "03",
    summary: "End-to-end encryption for data in transit and at rest.",
    points: [
      "All browser-to-server communication secured via SSL / TLS",
      "Internal server traffic re-encrypted to prevent interception",
      "Persistent disks encrypted with AES-256; keys protected by master keys",
      "Daily encrypted backups stored across distributed sites",
      "All passwords hashed — never stored in plaintext"
    ]
  },
  {
    title: "Operational Security",
    icon: LockKeyhole,
    number: "04",
    summary: "Strict developer controls and continuous system observability.",
    points: [
      "Zero sensitive data exposed in the customer support portal",
      "Strong MFA required for all code pushes to the central repository",
      "Every commit automatically scanned for bugs and vulnerabilities",
      "Systems monitored 24 / 7 with leading third-party observability tooling"
    ]
  }
];
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1], delay }
});
function Security() {
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen flex flex-col", style: { background: "#f4f6fa" }, children: [
    /* @__PURE__ */ jsx(Navbar, {}),
    /* @__PURE__ */ jsx(PageHero, { eyebrow: "Policy", title: "Security Policy" }),
    /* @__PURE__ */ jsx("section", { className: "py-24", style: { background: "#f4f6fa" }, children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-6", children: /* @__PURE__ */ jsxs("div", { className: "max-w-6xl mx-auto", children: [
      /* @__PURE__ */ jsxs(motion.div, { ...fadeUp(0), className: "flex items-center gap-3 mb-10", children: [
        /* @__PURE__ */ jsxs(
          "div",
          {
            className: "flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest",
            style: { background: "#00274d", color: "#edad1a" },
            children: [
              /* @__PURE__ */ jsx(ShieldCheck, { className: "w-3.5 h-3.5" }),
              "Enterprise Grade Security"
            ]
          }
        ),
        /* @__PURE__ */ jsx(
          "div",
          {
            className: "h-px flex-1",
            style: { background: "linear-gradient(to right, #00274d 0%, transparent 100%)", maxWidth: 120, opacity: 0.15 }
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-5 gap-6 items-stretch", children: [
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            ...fadeUp(0.05),
            className: "lg:col-span-2 relative rounded-3xl overflow-hidden flex flex-col justify-between",
            style: { background: "#00274d", minHeight: 360, padding: "2.5rem" },
            children: [
              /* @__PURE__ */ jsx(
                "div",
                {
                  className: "absolute",
                  style: {
                    top: -60,
                    right: -60,
                    width: 220,
                    height: 220,
                    borderRadius: "50%",
                    border: "40px solid #edad1a",
                    opacity: 0.12
                  }
                }
              ),
              /* @__PURE__ */ jsx(
                "div",
                {
                  className: "absolute",
                  style: {
                    bottom: 40,
                    right: 40,
                    width: 64,
                    height: 64,
                    borderRadius: "50%",
                    background: "#edad1a",
                    opacity: 0.1
                  }
                }
              ),
              /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsx(
                  "div",
                  {
                    className: "w-14 h-14 rounded-2xl flex items-center justify-center mb-8",
                    style: { background: "#edad1a" },
                    children: /* @__PURE__ */ jsx(ShieldCheck, { className: "w-7 h-7", style: { color: "#00274d" } })
                  }
                ),
                /* @__PURE__ */ jsxs(
                  "h2",
                  {
                    className: "font-extrabold leading-tight tracking-tight",
                    style: { fontSize: "clamp(1.75rem, 3vw, 2.5rem)", color: "#ffffff" },
                    children: [
                      "Built for",
                      /* @__PURE__ */ jsx("br", {}),
                      /* @__PURE__ */ jsx("span", { style: { color: "#edad1a" }, children: "confidential" }),
                      /* @__PURE__ */ jsx("br", {}),
                      "procurement data."
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsx("p", { className: "relative mt-6 leading-relaxed text-sm", style: { color: "rgba(255,255,255,0.55)" }, children: "Vendor Infra protects project, vendor, pricing, and procurement information with layered controls across every security dimension." })
            ]
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "lg:col-span-3 flex flex-col gap-6", children: [
          /* @__PURE__ */ jsxs(
            motion.div,
            {
              ...fadeUp(0.1),
              className: "rounded-3xl flex-1",
              style: { background: "#ffffff", padding: "2rem 2.25rem", border: "1px solid rgba(7,24,39,0.08)" },
              children: [
                /* @__PURE__ */ jsx(
                  "h3",
                  {
                    className: "font-bold mb-4 leading-snug",
                    style: { fontSize: "1.2rem", color: "#00274d" },
                    children: "Cloud & Data Security is critical to everything we do"
                  }
                ),
                /* @__PURE__ */ jsx("p", { className: "leading-relaxed text-sm", style: { color: "#64748b" }, children: "We know how important and confidential your pricing information is to your business and competitive edge. Vendor Infra was built from the ground up and operated daily to keep your data secure and confidential at all times." }),
                /* @__PURE__ */ jsx("p", { className: "leading-relaxed text-sm mt-4", style: { color: "#64748b" }, children: "This page describes key security measures we maintain. We are extremely active in security and constantly working to raise the bar — updated regularly as new controls are added." })
              ]
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "grid grid-cols-3 gap-4", children: [
            { label: "Encryption", value: "AES-256" },
            { label: "Uptime SLA", value: "99.99%" },
            { label: "Monitoring", value: "24 / 7" }
          ].map(({ label, value }, i) => /* @__PURE__ */ jsxs(
            motion.div,
            {
              ...fadeUp(0.15 + i * 0.05),
              className: "rounded-2xl flex flex-col items-center justify-center py-5 px-3 text-center",
              style: { background: "#00274d" },
              children: [
                /* @__PURE__ */ jsx(
                  "span",
                  {
                    className: "font-extrabold tracking-tight leading-none",
                    style: { fontSize: "1.35rem", color: "#edad1a" },
                    children: value
                  }
                ),
                /* @__PURE__ */ jsx(
                  "span",
                  {
                    className: "mt-1.5 text-xs font-semibold uppercase tracking-widest",
                    style: { color: "rgba(255,255,255,0.4)" },
                    children: label
                  }
                )
              ]
            },
            label
          )) })
        ] })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsx("section", { className: "pb-28", style: { background: "#f4f6fa" }, children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-6", children: /* @__PURE__ */ jsxs("div", { className: "max-w-6xl mx-auto", children: [
      /* @__PURE__ */ jsxs(motion.div, { ...fadeUp(0), className: "mb-12", children: [
        /* @__PURE__ */ jsx(
          "p",
          {
            className: "text-xs font-bold uppercase tracking-widest mb-2",
            style: { color: "#edad1a" },
            children: "Security Framework"
          }
        ),
        /* @__PURE__ */ jsx(
          "h2",
          {
            className: "font-extrabold tracking-tight",
            style: { fontSize: "clamp(1.6rem, 3vw, 2.25rem)", color: "#071827" },
            children: "Four layers of protection"
          }
        )
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-5", children: securityPillars.map((pillar, index) => {
        const Icon = pillar.icon;
        return /* @__PURE__ */ jsxs(
          motion.article,
          {
            ...fadeUp(index * 0.08),
            className: "group relative rounded-3xl overflow-hidden",
            style: {
              background: "#ffffff",
              border: "1px solid rgba(7,24,39,0.07)",
              transition: "box-shadow 0.25s ease, transform 0.25s ease"
            },
            whileHover: { y: -4, boxShadow: "0 20px 48px rgba(7,24,39,0.10)" },
            children: [
              /* @__PURE__ */ jsx(
                "div",
                {
                  className: "absolute left-0 top-0 bottom-0 w-1 rounded-l-3xl",
                  style: { background: "#edad1a" }
                }
              ),
              /* @__PURE__ */ jsxs("div", { style: { padding: "2rem 2rem 2rem 2.25rem" }, children: [
                /* @__PURE__ */ jsx("div", { className: "flex items-start justify-between mb-6", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
                  /* @__PURE__ */ jsx(
                    "div",
                    {
                      className: "w-12 h-12 rounded-2xl flex items-center justify-center shrink-0",
                      style: { background: "#071827" },
                      children: /* @__PURE__ */ jsx(Icon, { className: "w-5 h-5", style: { color: "#edad1a" } })
                    }
                  ),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx(
                      "h3",
                      {
                        className: "font-bold leading-tight",
                        style: { fontSize: "1.05rem", color: "#071827" },
                        children: pillar.title
                      }
                    ),
                    /* @__PURE__ */ jsx("p", { className: "text-xs mt-0.5 leading-snug", style: { color: "#94a3b8" }, children: pillar.summary })
                  ] })
                ] }) }),
                /* @__PURE__ */ jsx(
                  "div",
                  {
                    className: "mb-5",
                    style: { height: 1, background: "rgba(7,24,39,0.06)" }
                  }
                ),
                /* @__PURE__ */ jsx("ul", { className: "space-y-3", children: pillar.points.map((point) => /* @__PURE__ */ jsxs("li", { className: "flex gap-3 items-start", children: [
                  /* @__PURE__ */ jsx(
                    ArrowRight,
                    {
                      className: "w-3.5 h-3.5 shrink-0 mt-1",
                      style: { color: "#edad1a" }
                    }
                  ),
                  /* @__PURE__ */ jsx("span", { className: "text-sm leading-relaxed", style: { color: "#475569" }, children: point })
                ] }, point)) })
              ] })
            ]
          },
          pillar.title
        );
      }) })
    ] }) }) }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
const sections = [
  {
    title: "Introduction",
    content: `These terms of service ("Terms", "User Agreement") are an agreement between Vendor Infra Global Private Limited, Owner and operator of the website www.vendorinfra.com ("VendorInfra", "Vendor Infra", "us", "we" or "our") and you ("User", "you" or "your"). This Agreement sets forth the general terms and conditions of your use of the www.vendorinfra.com website and any of its products or services (collectively, "Website" or "Services").

Kindly read this Agreement carefully. In part consideration for accessing/using this Website in any way whatsoever, you agree to be bound by all the terms and conditions of this Agreement.`
  },
  {
    title: "Interpretations",
    content: `In this User Agreement, the following words and expressions shall have the meanings stated:

1. "Agreement" means this User Agreement including but not limited to Terms of Use, Privacy Policy, Pricing Policy, Security Policy etc.
2. "Content" means Website's design, layout, text, images, graphics, sound, video etc.
3. "VendorInfra" means Vendor Infra Global Private Limited, a company duly registered in India under Companies Act 2013.
4. "vendorinfra.com" means the internet Website and Portal currently located at the URL www.vendorinfra.com.
5. "Services" means services including premium and/or upgraded services, or any content, or any benefits or facilities provided via vendorinfra.com.`
  },
  {
    title: "Accounts & Registration",
    content: `You are responsible for maintaining the confidentiality of your account and password and for restricting access to your computer to prevent unauthorized access to your account. You agree to accept responsibility for all activities that occur under your account or password. We reserve the right to refuse service, terminate accounts, remove or edit content, or cancel orders in our sole discretion.`
  },
  {
    title: "Intellectual Property",
    content: `The Website and its content, features and functionality (including but not limited to all information, software, text, displays, images, video and audio, and the design, selection and arrangement thereof), are owned by Vendor Infra Global Private Limited, its licensors or other providers of such material and are protected by Indian and international copyright, trademark, patent, trade secret and other intellectual property or proprietary rights laws.`
  },
  {
    title: "User Conduct",
    content: `You agree not to use the Website in any way that:

- Is unlawful, fraudulent, or deceptive
- Infringes any third party's intellectual property or privacy rights
- Transmits unsolicited advertising or promotional material (spam)
- Introduces viruses, trojans, worms, or other malicious or harmful material
- Attempts to gain unauthorized access to any part of the Website or its related systems`
  },
  {
    title: "Limitation of Liability",
    content: `To the fullest extent permitted by applicable law, Vendor Infra shall not be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of (or inability to access or use) the Website or Services.`
  },
  {
    title: "Governing Law",
    content: `These Terms shall be governed and construed in accordance with the laws of India, without regard to its conflict of law provisions. Any disputes arising under or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts located in Gurugram, Haryana, India.`
  },
  {
    title: "Changes to Terms",
    content: `We reserve the right to modify these Terms at any time. We will provide notice of significant changes by updating the date at the top of this page. Your continued use of the Website after such changes constitutes your acceptance of the new Terms.`
  },
  {
    title: "Contact",
    content: `If you have any questions about these Terms, please contact us at:
Vendor Infra Global Private Limited
Suit No. 1436-1440, Plus Offices, Landmark Cyber Park, Sector 67, Gurugram, Haryana – 122101
Email: enquiry@vendorinfra.com`
  }
];
function Terms() {
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen flex flex-col bg-white", children: [
    /* @__PURE__ */ jsx(Navbar, {}),
    /* @__PURE__ */ jsx(
      PageHero,
      {
        eyebrow: "Terms of Service",
        title: "Simple, transparent usage guidelines"
      }
    ),
    /* @__PURE__ */ jsx("section", { className: "py-16 flex-1", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 max-w-4xl", children: [
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.4 },
          className: "mb-10 rounded-2xl border border-[#0057b8]/20 bg-white shadow-sm overflow-hidden",
          children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 px-6 py-4 bg-[#00274d]", children: [
              /* @__PURE__ */ jsx("div", { className: "w-2 h-2 rounded-full bg-blue-300 animate-pulse" }),
              /* @__PURE__ */ jsx("span", { className: "text-white text-sm font-semibold tracking-wider uppercase", children: "Table of Contents" })
            ] }),
            /* @__PURE__ */ jsx("ul", { className: "grid grid-cols-2 sm:grid-cols-3 gap-px bg-[#e8f1fb]", children: sections.map((s, i) => /* @__PURE__ */ jsx("li", { className: "bg-white", children: /* @__PURE__ */ jsxs(
              "a",
              {
                href: `#section-${i}`,
                className: "flex items-center gap-2 px-4 py-3 text-xs text-[#00274d] font-medium hover:bg-[#e8f1fb] hover:text-[#0057b8] transition-colors group",
                children: [
                  /* @__PURE__ */ jsx("span", { className: "w-5 h-5 flex-shrink-0 rounded-full bg-[#e8f1fb] group-hover:bg-[#0057b8] group-hover:text-white text-[10px] font-bold flex items-center justify-center text-[#0057b8] transition-colors", children: String(i + 1).padStart(2, "0") }),
                  s.title
                ]
              }
            ) }, s.title)) })
          ]
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute left-[27px] top-0 bottom-0 w-px bg-gradient-to-b from-[#0057b8] via-[#0057b8]/30 to-transparent hidden sm:block" }),
        /* @__PURE__ */ jsx("div", { className: "space-y-5", children: sections.map((s, i) => /* @__PURE__ */ jsxs(
          motion.div,
          {
            id: `section-${i}`,
            initial: { opacity: 0, x: -12 },
            whileInView: { opacity: 1, x: 0 },
            viewport: { once: true, margin: "-60px" },
            transition: { delay: i * 0.05, duration: 0.4 },
            className: "group relative",
            children: [
              /* @__PURE__ */ jsx("div", { className: "absolute left-0 top-6 w-[55px] hidden sm:flex items-center justify-center z-10", children: /* @__PURE__ */ jsx("div", { className: "w-9 h-9 rounded-full bg-white border-2 border-[#0057b8] flex items-center justify-center text-[11px] font-bold text-[#0057b8] shadow-sm group-hover:bg-[#0057b8] group-hover:text-white transition-colors duration-200", children: String(i + 1).padStart(2, "0") }) }),
              /* @__PURE__ */ jsxs("div", { className: "sm:ml-16 rounded-2xl bg-white border border-[#0057b8]/15 shadow-sm overflow-hidden group-hover:border-[#0057b8]/50 group-hover:shadow-md transition-all duration-200", children: [
                /* @__PURE__ */ jsx("div", { className: "h-[3px] w-full bg-gradient-to-r from-[#0057b8] to-[#38bdf8]" }),
                /* @__PURE__ */ jsxs("div", { className: "px-8 py-7", children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4 mb-4", children: [
                    /* @__PURE__ */ jsx("span", { className: "sm:hidden flex-shrink-0 mt-1 w-7 h-7 rounded-full bg-[#e8f1fb] text-[#0057b8] text-[11px] font-bold flex items-center justify-center", children: String(i + 1).padStart(2, "0") }),
                    /* @__PURE__ */ jsx("h2", { className: "text-xl md:text-2xl font-bold text-[#00274d] leading-snug", children: s.title })
                  ] }),
                  /* @__PURE__ */ jsx("div", { className: "h-px bg-gradient-to-r from-[#0057b8]/30 via-[#0057b8]/10 to-transparent mb-5" }),
                  s.content.split("\n\n").map((para, j) => /* @__PURE__ */ jsx(
                    "p",
                    {
                      className: "text-slate-600 leading-relaxed text-sm mb-3 last:mb-0 whitespace-pre-line text-justify",
                      children: para
                    },
                    j
                  ))
                ] })
              ] })
            ]
          },
          s.title
        )) })
      ] }),
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 16 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          className: "mt-12 sm:ml-16 rounded-2xl bg-[#00274d] border border-[#0057b8]/30 p-8 text-center shadow-lg",
          children: [
            /* @__PURE__ */ jsx("div", { className: "inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#0057b8]/20 mb-4", children: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5 text-blue-300", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2, children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" }) }) }),
            /* @__PURE__ */ jsx("p", { className: "text-white font-semibold text-base mb-1", children: "Have questions? Reach out to us at " }),
            /* @__PURE__ */ jsxs(
              "a",
              {
                href: "mailto:enquiry@vendorinfra.com",
                className: "inline-flex items-center gap-2 bg-[#0057b8] hover:bg-[#0046a0] text-white text-sm font-semibold px-6 py-2.5 rounded-full transition-colors duration-200",
                children: [
                  "enquiry@vendorinfra.com",
                  /* @__PURE__ */ jsx("svg", { className: "w-3.5 h-3.5", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2.5, children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M17 8l4 4m0 0l-4 4m4-4H3" }) })
                ]
              }
            )
          ]
        }
      )
    ] }) }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
const faqGroups = [
  {
    group: "For Vendors, Contractors, Suppliers, Manufacturers, Consultants",
    short: "Platform Users",
    icon: Users,
    faqs: [
      {
        q: "What are the benefits for vendors/suppliers joining Vendor Infra?",
        a: "Vendors gain visibility among infrastructure & construction project owners, access to multiple sectors, market exposure, opportunities for business growth, and integration into project supply-chains."
      },
      {
        q: "How do I get support if I face issues or need help onboarding?",
        a: "Vendor Infra provides dedicated support and guidance to users to help them achieve goals and meet deadlines."
      },
      {
        q: "How does the Plants & Equipment “hire or sale” functionality work?",
        a: "List equipment for hire or sale and connect with project owners and contractors actively looking for plants & equipment. Optimize asset utilization and reduce idle machinery across sites."
      },
      {
        q: "How is vendor reliability and data security handled?",
        a: "The platform emphasises verified vendors and high standards of data security — every vendor is vetted and ISO 27001-certified data security keeps your information protected."
      },
      {
        q: "Is use of Vendor Infra free or paid?",
        a: "Registration is free, but full access to premium services typically requires a paid subscription. See our pricing page for the latest plans."
      },
      {
        q: "What sectors does Vendor Infra cover?",
        a: "Vendor Infra covers 20+ infrastructure & construction sectors including Roads, Railways, Metros, Airports, Power, Oil & Gas, Water, Buildings, Mining, Smart Cities and more."
      }
    ]
  },
  {
    group: "For Investors",
    short: "Investors",
    icon: BriefcaseBusiness,
    faqs: [
      {
        q: "What is the business model of Vendor Infra?",
        a: "Vendor Infra is an AI-powered operating system for the infrastructure, construction, and manufacturing industry. We connect all industry stakeholders on a single integrated platform, enabling contractors and businesses to discover verified vendors through AI-powered vendor discovery, access smart procurement, buy, hire, and sell plants & equipment through our AI-powered marketplace, secure project insurance, leverage AI-powered market intelligence, find subcontracting opportunities, and drive business growth—all while reducing costs, improving efficiency, and accelerating growth."
      },
      {
        q: "What problem is Vendor Infra solving in the infrastructure industry?",
        a: "It addresses inefficiencies such as fragmented vendor discovery, limited access to competitive quotes, under-utilised equipment assets, slow procurement, vendor unavailability risk, and the need for integrated project intelligence."
      },
      {
        q: "What is the market opportunity and target audience?",
        a: "The platform targets vendors, suppliers, contractors, developers and project owners in the infrastructure and construction sectors across many sub-sectors. The infrastructure market in India and globally presents significant growth potential for digital tools."
      },
      {
        q: "How can interested investors engage with Vendor Infra?",
        a: "Investors can reach out through our Contact Us page. Our Investor Relations team will get in touch with you to discuss potential investment opportunities and the next steps."
      }
    ]
  }
];
function FAQItem({ q, a, index }) {
  const [open, setOpen] = useState(false);
  return /* @__PURE__ */ jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 12 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true },
      transition: { delay: index * 0.04 },
      className: `group rounded-2xl overflow-hidden bg-white border border-l-4 border-l-[#00274d] transition-all duration-300 ${open ? "border-[#edad1a]/60 shadow-[0_18px_40px_-22px_rgba(237,173,26,0.45)]" : "border-gray-200 hover:border-[#00274d]/30 hover:shadow-md"}`,
      children: [
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => setOpen(!open),
            className: "w-full flex items-center gap-5 p-5 md:p-6 text-left",
            children: [
              /* @__PURE__ */ jsx(
                "span",
                {
                  className: `flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm font-bold transition-colors ${open ? "bg-[#edad1a] text-white" : "bg-[#00274d]/5 text-[#00274d] group-hover:bg-[#00274d] group-hover:text-white"}`,
                  children: String(index + 1).padStart(2, "0")
                }
              ),
              /* @__PURE__ */ jsx("span", { className: "flex-1 font-semibold text-[#00274d] text-[15px] md:text-base leading-snug", children: q }),
              /* @__PURE__ */ jsx(
                "span",
                {
                  className: `flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all ${open ? "bg-[#00274d] border-[#00274d] text-white rotate-180" : "bg-white border-gray-200 text-[#00274d]"}`,
                  children: /* @__PURE__ */ jsx(ChevronDown, { className: "w-4 h-4" })
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsx(AnimatePresence, { initial: false, children: open && /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { height: 0, opacity: 0 },
            animate: { height: "auto", opacity: 1 },
            exit: { height: 0, opacity: 0 },
            transition: { duration: 0.25 },
            className: "overflow-hidden",
            children: /* @__PURE__ */ jsx("div", { className: "px-5 md:px-6 pb-6 pl-[76px] md:pl-[80px]", children: /* @__PURE__ */ jsx("div", { className: "border-l-2 border-[#edad1a]/60 pl-4", children: /* @__PURE__ */ jsx("p", { className: "text-gray-600 text-sm md:text-[15px] leading-relaxed", children: a }) }) })
          }
        ) })
      ]
    }
  );
}
function FAQ() {
  usePageSeo(
    "FAQ | Vendor Infra",
    "Answers to frequently asked questions about the Vendor Infra platform, pricing, vendor discovery, and material procurement."
  );
  const [activeTab, setActiveTab] = useState(0);
  const [query, setQuery] = useState("");
  const activeGroup = faqGroups[activeTab];
  const filteredFaqs = activeGroup.faqs.filter(
    (f) => query.trim() === "" || f.q.toLowerCase().includes(query.toLowerCase()) || f.a.toLowerCase().includes(query.toLowerCase())
  );
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen flex flex-col", children: [
    /* @__PURE__ */ jsx("div", { className: "fixed right-0 top-0 h-full w-[18px] bg-[#00274d] z-50 pointer-events-none" }),
    /* @__PURE__ */ jsx(Navbar, {}),
    /* @__PURE__ */ jsx(PageHero, { eyebrow: "FAQ", title: "Answers to your most common questions" }),
    /* @__PURE__ */ jsx("section", { className: "py-16 md:py-20 bg-gradient-to-b from-[#f6f8fb] to-white flex-1", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 max-w-6xl", children: [
      /* @__PURE__ */ jsx("div", { className: "flex flex-wrap items-center justify-center gap-3 mb-12", children: faqGroups.map((g, i) => {
        const Icon = g.icon;
        const active = activeTab === i;
        return /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => setActiveTab(i),
            className: `group inline-flex items-center gap-3 rounded-full px-5 py-3 text-sm font-semibold transition-all border ${active ? "bg-[#00274d] text-white border-[#00274d] shadow-lg shadow-[#00274d]/25" : "bg-white text-[#00274d] border-gray-200 hover:border-[#edad1a]/60"}`,
            children: [
              /* @__PURE__ */ jsx(
                "span",
                {
                  className: `flex h-7 w-7 items-center justify-center rounded-full ${active ? "bg-[#edad1a] text-white" : "bg-[#edad1a]/10 text-[#edad1a]"}`,
                  children: /* @__PURE__ */ jsx(Icon, { className: "w-3.5 h-3.5" })
                }
              ),
              g.short
            ]
          },
          g.group
        );
      }) }),
      /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-[1fr_320px] gap-8 items-start", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 10 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.3 },
              className: "mb-6",
              children: [
                /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-3 text-[#edad1a] text-[12px] font-bold uppercase tracking-[0.3em] mb-2", children: [
                  /* @__PURE__ */ jsx("span", { className: "w-6 h-px bg-[#edad1a]/60" }),
                  activeGroup.short,
                  /* @__PURE__ */ jsx("span", { className: "w-6 h-px bg-[#edad1a]/60" })
                ] }),
                /* @__PURE__ */ jsx("h2", { className: "text-2xl md:text-3xl font-bold text-[#00274d] leading-tight", children: activeGroup.group })
              ]
            },
            activeTab + query
          ),
          /* @__PURE__ */ jsx("div", { className: "space-y-3", children: filteredFaqs.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-dashed border-gray-300 bg-white p-10 text-center", children: [
            /* @__PURE__ */ jsx(HelpCircle, { className: "w-10 h-10 text-gray-300 mx-auto mb-3" }),
            /* @__PURE__ */ jsx("p", { className: "text-[#00274d] font-semibold", children: "No matches found" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 mt-1", children: "Try a different keyword or clear your search." })
          ] }) : filteredFaqs.map((faq, i) => /* @__PURE__ */ jsx(FAQItem, { q: faq.q, a: faq.a, index: i }, faq.q)) })
        ] }),
        /* @__PURE__ */ jsxs("aside", { className: "lg:sticky lg:top-28 space-y-4", children: [
          /* @__PURE__ */ jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 20 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              className: "relative rounded-2xl overflow-hidden text-white p-6 shadow-xl shadow-[#00274d]/15",
              style: {
                background: "linear-gradient(140deg, #00274d 0%, #0a3b73 55%, #edad1a 130%)"
              },
              children: [
                /* @__PURE__ */ jsx("div", { className: "absolute inset-0 opacity-[0.1]", style: { backgroundImage: "radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)", backgroundSize: "22px 22px" } }),
                /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsx("div", { className: "w-12 h-12 rounded-xl bg-white/15 backdrop-blur flex items-center justify-center mb-5", children: /* @__PURE__ */ jsx(MessageSquare, { className: "w-6 h-6 text-[#edad1a]" }) }),
                  /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold leading-snug mb-2", children: "Still have questions?" }),
                  /* @__PURE__ */ jsx("p", { className: "text-white/80 text-sm leading-relaxed mb-5", children: "Our team is ready to help with onboarding, pricing, vendor discovery, procurement, and investor enquiries." }),
                  /* @__PURE__ */ jsxs(
                    Link,
                    {
                      href: "/contact",
                      className: siteButtonClasses("primary", "w-full px-4 py-2.5 normal-case tracking-normal"),
                      children: [
                        "Contact Us ",
                        /* @__PURE__ */ jsx(CtaArrow, { variant: "dark" })
                      ]
                    }
                  )
                ] })
              ]
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "rounded-2xl bg-white border border-gray-100 p-5 shadow-sm", children: [
            /* @__PURE__ */ jsx("p", { className: "text-[11px] font-bold uppercase tracking-[0.25em] text-[#edad1a] mb-4", children: "Reach us directly" }),
            /* @__PURE__ */ jsxs("a", { href: "tel:+918800119885", className: "flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors", children: [
              /* @__PURE__ */ jsx("span", { className: "w-9 h-9 rounded-lg bg-[#00274d]/5 flex items-center justify-center text-[#00274d]", children: /* @__PURE__ */ jsx(Phone, { className: "w-4 h-4" }) }),
              /* @__PURE__ */ jsxs("span", { children: [
                /* @__PURE__ */ jsx("span", { className: "block text-xs text-gray-500", children: "Call" }),
                /* @__PURE__ */ jsx("span", { className: "block text-sm font-semibold text-[#00274d]", children: "+91-8800119885" })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("a", { href: "mailto:enquiry@vendorinfra.com", className: "flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors", children: [
              /* @__PURE__ */ jsx("span", { className: "w-9 h-9 rounded-lg bg-[#00274d]/5 flex items-center justify-center text-[#00274d]", children: /* @__PURE__ */ jsx(Mail, { className: "w-4 h-4" }) }),
              /* @__PURE__ */ jsxs("span", { children: [
                /* @__PURE__ */ jsx("span", { className: "block text-xs text-gray-500", children: "Email" }),
                /* @__PURE__ */ jsx("span", { className: "block text-sm font-semibold text-[#00274d]", children: "enquiry@vendorinfra.com" })
              ] })
            ] })
          ] })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
function MaterialImage({
  src,
  alt,
  label,
  className,
  onError,
  ...props
}) {
  const [failed, setFailed] = useState(false);
  if (failed || !src) {
    return /* @__PURE__ */ jsx(
      "div",
      {
        className: cn(
          "flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 px-3 text-center text-sm font-semibold text-[#00274d]",
          className
        ),
        "aria-label": alt || label,
        role: "img",
        children: /* @__PURE__ */ jsx("span", { className: "line-clamp-2", children: label })
      }
    );
  }
  return /* @__PURE__ */ jsx(
    "img",
    {
      src,
      alt: alt || label,
      className,
      loading: "eager",
      onError: (event) => {
        setFailed(true);
        onError?.(event);
      },
      ...props
    }
  );
}
const features = [
  { icon: Truck, label: "On-Time Delivery" },
  { icon: ShieldCheck, label: "Quality Assured" },
  { icon: BadgeIndianRupee, label: "Competitive Pricing" },
  { icon: MapPinned, label: "Pan-India Availability" }
];
function highlight(text, query) {
  if (!query.trim()) return /* @__PURE__ */ jsx(Fragment, { children: text });
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return /* @__PURE__ */ jsx(Fragment, { children: text });
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    text.slice(0, idx),
    /* @__PURE__ */ jsx("mark", { className: "bg-[#edad1a]/30 text-[#00274d] rounded px-0.5 font-bold not-italic", children: text.slice(idx, idx + query.length) }),
    text.slice(idx + query.length)
  ] });
}
const PORTAL_REGISTER_URL$1 = "http://3.110.208.157/customer/";
function Materials() {
  usePageSeo("Material Procurement | Vendor Infra", "Source 1000+ construction and infrastructure materials across 10+ categories including steel, cement, electrical and solar.");
  const { total } = useQuoteCart();
  const [query, setQuery] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const inputRef = useRef(null);
  const closeTimer = useRef(null);
  const productCount = categories.reduce((sum, cat) => sum + cat.products.length, 0);
  const featuredCategories = categories.slice(0, 3);
  const isSearching = query.trim().length > 0;
  const { dropdownResults, filteredCategories } = useMemo(() => {
    if (!query.trim()) {
      return { dropdownResults: [], filteredCategories: categories };
    }
    const q = query.toLowerCase();
    const categoryResults = [];
    const productResults = [];
    const variantResults = [];
    const gridMatchedSlugs = /* @__PURE__ */ new Set();
    for (const cat of categories) {
      const catMatches = cat.name.toLowerCase().includes(q) || cat.slug.toLowerCase().includes(q);
      if (catMatches) {
        gridMatchedSlugs.add(cat.slug);
        categoryResults.push({ type: "category", categorySlug: cat.slug, categoryName: cat.name, image: cat.image });
      }
      for (const prod of cat.products) {
        const prodMatches = prod.name.toLowerCase().includes(q) || prod.slug.toLowerCase().includes(q);
        if (prodMatches) {
          gridMatchedSlugs.add(cat.slug);
          productResults.push({ type: "product", categorySlug: cat.slug, categoryName: cat.name, productSlug: prod.slug, productName: prod.name, image: prod.image });
        }
        for (const variant of prod.variants) {
          if (variant.toLowerCase().includes(q)) {
            gridMatchedSlugs.add(cat.slug);
            if (!productResults.find((r) => r.productSlug === prod.slug && r.categorySlug === cat.slug)) {
              productResults.push({ type: "product", categorySlug: cat.slug, categoryName: cat.name, productSlug: prod.slug, productName: prod.name, image: prod.image });
            }
            variantResults.push({ type: "variant", categorySlug: cat.slug, categoryName: cat.name, productSlug: prod.slug, productName: prod.name, variantName: variant, image: prod.image });
          }
        }
      }
    }
    const results = [...categoryResults, ...productResults, ...variantResults];
    return {
      dropdownResults: results.slice(0, 10),
      filteredCategories: categories.filter((c) => gridMatchedSlugs.has(c.slug))
    };
  }, [query]);
  function clearSearch() {
    setQuery("");
    setDropdownOpen(false);
  }
  function handleInputFocus() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setDropdownOpen(true);
  }
  function handleInputBlur() {
    closeTimer.current = setTimeout(() => setDropdownOpen(false), 200);
  }
  function handleResultClick() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    clearSearch();
  }
  const displayedCategories = isSearching ? filteredCategories : categories;
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen flex flex-col bg-slate-50", children: [
    /* @__PURE__ */ jsx(Navbar, {}),
    /* @__PURE__ */ jsxs("section", { "data-preserve-hero-typography": true, className: "relative overflow-hidden bg-[#00274d]", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-[linear-gradient(120deg,rgba(7,20,63,0.96),rgba(12,42,110,0.88))]" }),
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 opacity-[0.08] bg-[radial-gradient(circle_at_1px_1px,#ffffff_1px,transparent_0)] bg-[length:28px_28px]" }),
      /* @__PURE__ */ jsxs("div", { className: "container relative z-10 mx-auto grid min-h-[360px] gap-10 px-4 py-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-center", children: [
        /* @__PURE__ */ jsxs(motion.div, { initial: { opacity: 0, y: 18 }, animate: { opacity: 1, y: 0 }, children: [
          /* @__PURE__ */ jsx("div", { className: "mb-6 inline-flex items-center gap-2 rounded-full border border-[#edad1a]/40 bg-[#edad1a]/10 px-4 py-2 text-sm font-semibold text-[#edad1a]", children: "Materials" }),
          /* @__PURE__ */ jsx("h1", { className: "text-4xl md:text-5xl font-semibold leading-tight tracking-tight max-w-3xl text-white", children: "Source construction materials across every major category" }),
          /* @__PURE__ */ jsxs("div", { className: "mt-8 relative max-w-2xl z-50", children: [
            /* @__PURE__ */ jsxs("div", { className: `flex items-center gap-3 rounded-xl bg-white px-4 py-3 shadow-xl transition-all ${dropdownOpen ? "ring-2 ring-[#edad1a]" : ""}`, children: [
              /* @__PURE__ */ jsx(Search, { className: "h-5 w-5 shrink-0 text-[#00274d]" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  ref: inputRef,
                  type: "text",
                  value: query,
                  onChange: (e) => setQuery(e.target.value),
                  onFocus: handleInputFocus,
                  onBlur: handleInputBlur,
                  placeholder: "Search categories, products, variants… e.g. TMT, Cement, Flooring",
                  className: "flex-1 bg-transparent text-sm font-medium text-[#00274d] placeholder:text-gray-400 outline-none"
                }
              ),
              query && /* @__PURE__ */ jsx(
                "button",
                {
                  onMouseDown: (e) => e.preventDefault(),
                  onClick: clearSearch,
                  className: "text-gray-400 hover:text-[#00274d] transition-colors",
                  children: /* @__PURE__ */ jsx(X, { className: "h-4 w-4" })
                }
              )
            ] }),
            /* @__PURE__ */ jsx(AnimatePresence, { children: dropdownOpen && isSearching && /* @__PURE__ */ jsx(
              motion.div,
              {
                initial: { opacity: 0, y: -6 },
                animate: { opacity: 1, y: 0 },
                exit: { opacity: 0, y: -6 },
                transition: { duration: 0.15 },
                className: "absolute left-0 right-0 top-full mt-2 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xl",
                children: dropdownResults.length > 0 ? dropdownResults.map((r, i) => /* @__PURE__ */ jsx(
                  Link,
                  {
                    href: r.type === "category" ? `/materials/${r.categorySlug}` : `/materials/${r.categorySlug}/${r.productSlug}`,
                    onClick: handleResultClick,
                    children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 px-4 py-3 hover:bg-slate-50 transition-colors border-b border-slate-100 last:border-0", children: [
                      /* @__PURE__ */ jsx("img", { src: r.image, alt: "", className: "h-10 w-10 rounded-lg object-cover shrink-0" }),
                      /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1", children: [
                        /* @__PURE__ */ jsx("p", { className: "text-xs font-bold uppercase tracking-wide text-[#edad1a]", children: r.type === "category" ? "Category" : r.type === "product" ? "Product" : "Variant" }),
                        /* @__PURE__ */ jsx("p", { className: "truncate text-sm font-semibold text-[#00274d]", children: r.type === "variant" ? highlight(r.variantName, query) : r.type === "product" ? highlight(r.productName, query) : highlight(r.categoryName, query) }),
                        r.type !== "category" && /* @__PURE__ */ jsxs("p", { className: "text-xs text-gray-400", children: [
                          r.categoryName,
                          r.type === "variant" && r.productName ? ` › ${r.productName}` : ""
                        ] })
                      ] }),
                      /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4 shrink-0 text-gray-300" })
                    ] })
                  },
                  i
                )) : /* @__PURE__ */ jsxs("div", { className: "px-4 py-6 text-center", children: [
                  /* @__PURE__ */ jsxs("p", { className: "text-sm font-semibold text-gray-500", children: [
                    'No results for "',
                    query,
                    '"'
                  ] }),
                  /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs text-gray-400", children: "Try a different keyword or browse below" })
                ] })
              }
            ) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-6 grid max-w-xl grid-cols-3 overflow-hidden rounded-lg border border-white/15 bg-white/10 backdrop-blur", children: [
            /* @__PURE__ */ jsxs("div", { className: "border-r border-white/15 p-4", children: [
              /* @__PURE__ */ jsxs("p", { className: "text-2xl font-semibold text-white", children: [
                categories.length,
                "+"
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-xs font-medium text-white/85", children: "Categories" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "border-r border-white/15 p-4", children: [
              /* @__PURE__ */ jsxs("p", { className: "text-2xl font-semibold text-white", children: [
                productCount,
                "+"
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-xs font-medium text-white/85", children: "Product groups" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "p-4", children: [
              /* @__PURE__ */ jsx("p", { className: "text-2xl font-semibold text-white", children: "1K+" }),
              /* @__PURE__ */ jsx("p", { className: "text-xs font-medium text-white/85", children: "Material options" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { opacity: 0, x: 24 },
            animate: { opacity: 1, x: 0 },
            transition: { delay: 0.1 },
            className: "grid gap-3 sm:grid-cols-3 lg:grid-cols-1",
            children: featuredCategories.map((category) => /* @__PURE__ */ jsx(Link, { href: `/materials/${category.slug}`, children: /* @__PURE__ */ jsxs("div", { className: "group grid grid-cols-[92px_1fr] overflow-hidden rounded-lg border border-[#00274d]/30 bg-white shadow-xl shadow-black/10 transition-transform hover:-translate-y-0.5", children: [
              /* @__PURE__ */ jsx(MaterialImage, { src: category.image, alt: category.name, label: category.name, className: "h-24 w-full object-cover" }),
              /* @__PURE__ */ jsxs("div", { className: "flex min-w-0 flex-col justify-center p-4", children: [
                /* @__PURE__ */ jsx("p", { className: "truncate text-sm font-semibold text-[#00274d]", children: category.name }),
                /* @__PURE__ */ jsxs("p", { className: "mt-1 text-xs text-gray-500", children: [
                  category.products.length,
                  " product groups"
                ] }),
                /* @__PURE__ */ jsxs("span", { className: "mt-3 inline-flex items-center gap-1 text-xs font-bold text-[#edad1a]", children: [
                  "View category ",
                  /* @__PURE__ */ jsx(ArrowRight, { className: "h-3.5 w-3.5 transition-transform group-hover:translate-x-1" })
                ] })
              ] })
            ] }) }, category.slug))
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "border-b bg-white px-4 py-3", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto flex items-center gap-2 text-sm text-gray-500", children: [
      /* @__PURE__ */ jsx(Link, { href: "/", className: "hover:text-[#edad1a]", children: "Home" }),
      /* @__PURE__ */ jsx(ChevronRight, { className: "w-4 h-4" }),
      /* @__PURE__ */ jsx("span", { className: "text-[#edad1a] font-medium", children: "Materials" }),
      total > 0 && /* @__PURE__ */ jsxs(Link, { href: "/quote-cart", className: "ml-auto flex items-center gap-2 rounded-full bg-[#edad1a] px-4 py-1.5 text-sm font-semibold text-white transition-colors hover:bg-[#00274d]", children: [
        /* @__PURE__ */ jsx(ShoppingCart, { className: "w-4 h-4" }),
        "Quote Cart (",
        total,
        ")"
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("main", { className: "flex-1 py-12", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4", children: [
      /* @__PURE__ */ jsx("div", { className: "mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between", children: /* @__PURE__ */ jsx("div", { children: isSearching ? /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-2 text-[#edad1a] text-[12px] font-bold uppercase tracking-[0.3em] mb-4", children: [
          /* @__PURE__ */ jsx("span", { className: "w-6 h-px bg-[#edad1a]/60" }),
          "Search results",
          /* @__PURE__ */ jsx("span", { className: "w-6 h-px bg-[#edad1a]/60" })
        ] }),
        /* @__PURE__ */ jsxs("h2", { className: "text-3xl md:text-4xl font-bold leading-tight text-[#00274d]", children: [
          filteredCategories.length,
          " ",
          filteredCategories.length === 1 ? "category" : "categories",
          ' matching "',
          query,
          '"'
        ] }),
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: clearSearch,
            className: "mt-2 inline-flex items-center gap-1 text-sm text-gray-500 hover:text-[#edad1a] transition-colors",
            children: [
              /* @__PURE__ */ jsx(X, { className: "h-3.5 w-3.5" }),
              " Clear search"
            ]
          }
        )
      ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-2 text-[#edad1a] text-[12px] font-bold uppercase tracking-[0.3em] mb-4", children: [
          /* @__PURE__ */ jsx("span", { className: "w-6 h-px bg-[#edad1a]/60" }),
          "Material categories",
          /* @__PURE__ */ jsx("span", { className: "w-6 h-px bg-[#edad1a]/60" })
        ] }),
        /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold leading-tight text-[#00274d]", children: "Discover the right materials for your project." }),
        /* @__PURE__ */ jsx("p", { className: "mt-2 max-w-2xl text-sm leading-relaxed text-gray-500", children: "Browse categories, explore product options and variants, and add the required items to your quotation cart." })
      ] }) }) }),
      /* @__PURE__ */ jsx("div", { className: "mb-8 grid grid-cols-2 gap-3 lg:grid-cols-4", children: features.map((feature) => /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 rounded-lg border border-[#00274d] bg-white px-4 py-3 shadow-sm relative overflow-hidden border-l-4 border-l-[#00274d]", children: [
        /* @__PURE__ */ jsx("span", { className: "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#00274d]/10", children: /* @__PURE__ */ jsx(feature.icon, { className: "h-4 w-4 text-[#00274d]" }) }),
        /* @__PURE__ */ jsx("span", { className: "text-sm font-bold text-[#00274d]", children: feature.label })
      ] }, feature.label)) }),
      displayedCategories.length > 0 ? /* @__PURE__ */ jsx("div", { className: "mb-12 mt-20 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4", children: displayedCategories.map((cat, i) => /* @__PURE__ */ jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 30 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { delay: Math.min(i * 0.04, 0.3) },
          children: /* @__PURE__ */ jsx(Link, { href: `/materials/${cat.slug}`, children: /* @__PURE__ */ jsxs("div", { className: "group h-full cursor-pointer overflow-hidden rounded-lg border-1 border-[#00274d] bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#edad1a] hover:shadow-xl hover:shadow-blue-900/10", children: [
            /* @__PURE__ */ jsxs("div", { className: "relative h-44 overflow-hidden bg-slate-100", children: [
              /* @__PURE__ */ jsx(
                MaterialImage,
                {
                  src: cat.image,
                  alt: cat.name,
                  label: cat.name,
                  className: "h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                }
              ),
              /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-[#00274d]/70 via-transparent to-transparent" }),
              /* @__PURE__ */ jsxs("div", { className: "absolute bottom-3 left-3 rounded-full bg-[#edad1a]/95 px-3 py-1 text-xs font-medium text-[#00274d] shadow-sm", children: [
                cat.products.length,
                " groups"
              ] })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "p-4 bg-[#00274d]", children: /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between gap-3", children: [
              /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsx("h3", { className: "truncate text-base font-semibold text-[#edad1a]", children: isSearching ? highlight(cat.name, query) : cat.name }),
                /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-white/70", children: "Select a product, variant and unit, then add to cart." })
              ] }),
              /* @__PURE__ */ jsx("span", { className: "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#edad1a] text-white transition-colors group-hover:bg-[#edad1a]/80", children: /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4" }) })
            ] }) })
          ] }) })
        },
        cat.slug
      )) }) : /* @__PURE__ */ jsxs("div", { className: "mb-12 flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-white py-20 text-center", children: [
        /* @__PURE__ */ jsx(PackageSearch, { className: "h-12 w-12 text-slate-300 mb-4" }),
        /* @__PURE__ */ jsxs("p", { className: "text-lg font-bold text-[#00274d]", children: [
          'No materials found for "',
          query,
          '"'
        ] }),
        /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-gray-500", children: "Try searching by category, product name, or variant" }),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: clearSearch,
            className: "mt-4 rounded-full bg-[#edad1a] px-5 py-2 text-sm font-bold text-white hover:bg-[#d49a10] transition-colors",
            children: "Browse all categories"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "rounded-lg border-1 border-[#00274d] bg-white p-6 shadow-sm", children: [
        /* @__PURE__ */ jsxs("div", { className: "mb-5 flex items-center gap-3", children: [
          /* @__PURE__ */ jsx("span", { className: "flex h-10 w-10 items-center justify-center rounded-lg bg-[#edad1a]/20 text-[#00274d]", children: /* @__PURE__ */ jsx(CheckCircle2, { className: "h-5 w-5" }) }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { className: "font-semibold text-[#00274d]", children: "Product category index" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500", children: "Find categories based on your project requirements" })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: categories.map((cat) => /* @__PURE__ */ jsxs(Link, { href: `/materials/${cat.slug}`, className: "inline-flex items-center gap-1 rounded-full border-1 border-[#00274d] bg-slate-50 px-3 py-1.5 text-sm font-semibold text-[#00274d] transition-colors hover:border-[#edad1a] hover:bg-[#edad1a] hover:text-white", children: [
          cat.name,
          /* @__PURE__ */ jsx(ChevronRight, { className: "h-3.5 w-3.5" })
        ] }, cat.slug)) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(
      "section",
      {
        className: "bg-[#edad1a] py-16 relative",
        style: {
          backgroundImage: "radial-gradient(rgba(0,39,77,0.18) 1px, transparent 1px)",
          backgroundSize: "22px 22px"
        },
        children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-3xl mx-auto text-center", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center gap-3 mb-5", children: [
            /* @__PURE__ */ jsx("span", { className: "h-px w-10 bg-[#00274d]/40" }),
            /* @__PURE__ */ jsx("span", { className: "text-xs md:text-sm font-bold tracking-[0.3em] text-[#00274d]", children: "GET STARTED TODAY" }),
            /* @__PURE__ */ jsx("span", { className: "h-px w-10 bg-[#00274d]/40" })
          ] }),
          /* @__PURE__ */ jsx("h2", { className: "text-2xl md:text-3xl font-bold text-[#00274d] mb-3", children: "Ready to Grow and Transform your Business?" }),
          /* @__PURE__ */ jsxs("p", { className: "text-[#00274d]/85 mb-6 text-sm md:text-base", children: [
            "Join ",
            /* @__PURE__ */ jsx("span", { className: "font-semibold", children: "32,000+" }),
            " contractors, vendors, manufacturers, suppliers, and consultants already using Vendor Infra to discover new opportunities, streamline procurement, acesss plants and equipment solutions, and secure project financing and insurance—all through a single integrated platform."
          ] }),
          /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-3 justify-center items-center", children: /* @__PURE__ */ jsx(
            "a",
            {
              href: PORTAL_REGISTER_URL$1,
              target: "_blank",
              rel: "noopener noreferrer",
              children: /* @__PURE__ */ jsx(SiteButton, { variant: "onGold", className: "normal-case tracking-normal", children: "Join Now" })
            }
          ) })
        ] }) })
      }
    ),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
const PORTAL_REGISTER_URL = "http://3.110.208.157/customer/";
function AddToQuoteBtn({
  categorySlug,
  categoryName,
  product
}) {
  const { addItem } = useQuoteCart();
  const [selectedVariant, setSelectedVariant] = useState("");
  const [selectedUnit, setSelectedUnit] = useState("");
  const [selectedGrade, setSelectedGrade] = useState("");
  const [customVariant, setCustomVariant] = useState("");
  const [added, setAdded] = useState(false);
  const [error, setError] = useState("");
  const isSteel = categorySlug === "steel";
  const handleAdd = () => {
    if (isSteel && !selectedGrade) {
      setError("Select Primary or Secondary");
      setTimeout(() => setError(""), 2500);
      return;
    }
    if (!selectedVariant) {
      setError("Select a product option");
      setTimeout(() => setError(""), 2500);
      return;
    }
    if (!selectedUnit) {
      setError("Select a unit");
      setTimeout(() => setError(""), 2500);
      return;
    }
    setError("");
    addItem({
      categorySlug,
      categoryName,
      productSlug: product.slug,
      productName: product.name,
      variant: isSteel ? `${selectedGrade} · ${selectedVariant}${customVariant ? ` · ${customVariant}` : ""}` : `${selectedVariant}${customVariant ? ` · ${customVariant}` : ""}`,
      unit: selectedUnit,
      image: product.image,
      qty: 1
    });
    setAdded(true);
    setCustomVariant("");
    setTimeout(() => setAdded(false), 2e3);
  };
  return /* @__PURE__ */ jsxs("div", { className: "px-3 pb-3 space-y-2 bg-[#00274d]", children: [
    isSteel && /* @__PURE__ */ jsxs(
      "select",
      {
        value: selectedGrade,
        onChange: (e) => {
          setSelectedGrade(e.target.value);
          setError("");
        },
        className: "w-full border border-white/20 rounded-lg px-2.5 py-2 text-xs text-gray-700 focus:outline-none focus:border-[#edad1a] focus:ring-1 focus:ring-[#edad1a]/30 bg-white",
        children: [
          /* @__PURE__ */ jsx("option", { value: "", children: "Type — Choose an option" }),
          /* @__PURE__ */ jsx("option", { value: "Primary", children: "Primary" }),
          /* @__PURE__ */ jsx("option", { value: "Secondary", children: "Secondary" })
        ]
      }
    ),
    /* @__PURE__ */ jsxs(
      "select",
      {
        value: selectedVariant,
        onChange: (e) => {
          setSelectedVariant(e.target.value);
          setError("");
        },
        className: "w-full border border-white/20 rounded-lg px-2.5 py-2 text-xs text-gray-700 focus:outline-none focus:border-[#edad1a] focus:ring-1 focus:ring-[#edad1a]/30 bg-white",
        children: [
          /* @__PURE__ */ jsx("option", { value: "", children: "Products — Choose an option" }),
          product.variants.map((v) => /* @__PURE__ */ jsx("option", { value: v, children: v }, v))
        ]
      }
    ),
    /* @__PURE__ */ jsx(
      "input",
      {
        type: "text",
        value: customVariant,
        onChange: (e) => setCustomVariant(e.target.value),
        placeholder: "Enter specification (e.g., Grade, Size, Model, Capacity)",
        className: "w-full border border-gray-200 rounded-lg px-2.5 py-2 text-xs text-gray-700 placeholder:text-[11px] placeholder:text-gray-300 focus:outline-none focus:border-[#edad1a] focus:ring-1 focus:ring-[#edad1a]/30 bg-white"
      }
    ),
    /* @__PURE__ */ jsxs(
      "select",
      {
        value: selectedUnit,
        onChange: (e) => {
          setSelectedUnit(e.target.value);
          setError("");
        },
        className: "w-full border border-white/20 rounded-lg px-2.5 py-2 text-xs text-gray-700 focus:outline-none focus:border-[#edad1a] focus:ring-1 focus:ring-[#edad1a]/30 bg-white",
        children: [
          /* @__PURE__ */ jsx("option", { value: "", children: "Unit — Choose an option" }),
          product.units.map((u) => /* @__PURE__ */ jsx("option", { value: u, children: u }, u))
        ]
      }
    ),
    error && /* @__PURE__ */ jsxs("p", { className: "flex items-center gap-1 text-[10px] text-red-500 font-medium", children: [
      /* @__PURE__ */ jsx(AlertCircle, { className: "w-3 h-3 shrink-0" }),
      error
    ] }),
    /* @__PURE__ */ jsxs(
      "button",
      {
        onClick: handleAdd,
        className: `w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${added ? "bg-green-600 text-white border border-green-400" : "bg-[#00274d] hover:bg-[#edad1a] text-white hover:text-[#00274d] border border-white/40 hover:border-[#edad1a]"}`,
        children: [
          /* @__PURE__ */ jsx(ShoppingBag, { className: "w-4 h-4" }),
          added ? "Added!" : "Add to Quote"
        ]
      }
    ),
    /* @__PURE__ */ jsxs(
      "a",
      {
        href: `https://wa.me/918800119885?text=${encodeURIComponent(
          selectedVariant ? `Hi! I'm interested in ${isSteel && selectedGrade ? selectedGrade + " · " : ""}${selectedVariant}${customVariant ? ` · ${customVariant}` : ""} (${product.name}) from the ${categoryName} category. Can you share pricing and availability?` : `Hi! I'm interested in ${product.name} from the ${categoryName} category on Vendor Infra. Can you share pricing and availability?`
        )}`,
        target: "_blank",
        rel: "noopener noreferrer",
        className: "w-full flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold bg-[#edad1a]/20 hover:bg-[#edad1a] text-[#edad1a] hover:text-[#00274d] transition-all duration-200",
        children: [
          /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "currentColor", className: "w-3.5 h-3.5 shrink-0", children: /* @__PURE__ */ jsx("path", { d: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" }) }),
          "Enquire on WhatsApp"
        ]
      }
    )
  ] });
}
function MaterialCategory() {
  const { category: catSlug } = useParams();
  const { total } = useQuoteCart();
  const category = getCategoryBySlug(catSlug ?? "");
  if (!category) {
    return /* @__PURE__ */ jsxs("div", { className: "min-h-screen flex flex-col", children: [
      /* @__PURE__ */ jsx(Navbar, {}),
      /* @__PURE__ */ jsx("div", { className: "flex-1 flex items-center justify-center", children: /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-[#00274d] mb-4", children: "Category not found" }),
        /* @__PURE__ */ jsx(Link, { href: "/materials", className: "text-[#edad1a] hover:underline", children: "← Back to Materials" })
      ] }) }),
      /* @__PURE__ */ jsx(Footer, {})
    ] });
  }
  const otherCategories = categories.filter((c) => c.slug !== category.slug);
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen flex flex-col", children: [
    /* @__PURE__ */ jsx(Navbar, {}),
    /* @__PURE__ */ jsxs("div", { "data-preserve-hero-typography": true, className: "relative bg-[#00274d] overflow-hidden", children: [
      /* @__PURE__ */ jsx(MaterialImage, { src: category.image, alt: category.name, label: category.name, className: "absolute inset-0 w-full h-full object-cover opacity-20" }),
      /* @__PURE__ */ jsxs("div", { className: "relative z-10 text-center py-16 px-4", children: [
        /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { opacity: 0, y: -10 },
            animate: { opacity: 1, y: 0 },
            className: "mb-6",
            children: /* @__PURE__ */ jsx("span", { className: "inline-flex items-center gap-2 rounded-full border border-[#edad1a]/40 bg-[#edad1a]/10 px-4 py-2 text-sm font-semibold text-[#edad1a]", children: "Material Category" })
          }
        ),
        /* @__PURE__ */ jsx(
          motion.h1,
          {
            initial: { opacity: 0, y: 10 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: 0.1 },
            className: "text-3xl md:text-4xl font-semibold text-white",
            children: category.name
          }
        ),
        /* @__PURE__ */ jsx(
          motion.p,
          {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            transition: { delay: 0.2 },
            className: "text-white/70 mt-3 text-sm",
            children: "Covering all major products of Infrastructure, Construction & Manufacturing industry"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "bg-gray-50 border-b py-3 px-4", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto flex flex-wrap items-center gap-2 text-sm text-gray-500", children: [
      /* @__PURE__ */ jsx(Link, { href: "/", className: "hover:text-[#edad1a]", children: "Home" }),
      /* @__PURE__ */ jsx(ChevronRight, { className: "w-4 h-4" }),
      /* @__PURE__ */ jsx(Link, { href: "/materials", className: "hover:text-[#edad1a]", children: "Materials" }),
      /* @__PURE__ */ jsx(ChevronRight, { className: "w-4 h-4" }),
      /* @__PURE__ */ jsx("span", { className: "text-[#edad1a] font-medium", children: category.name }),
      total > 0 && /* @__PURE__ */ jsxs(Link, { href: "/quote-cart", className: "ml-auto flex items-center gap-2 bg-[#edad1a] text-[#00274d] px-4 py-1.5 rounded-full text-sm font-semibold hover:bg-[#00274d] hover:text-white transition-colors", children: [
        /* @__PURE__ */ jsx(ShoppingCart, { className: "w-4 h-4" }),
        "Quote Cart (",
        total,
        ")"
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("main", { className: "flex-1 py-12 bg-white", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-10", children: [
        /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-2 text-[#edad1a] text-[12px] font-bold uppercase tracking-[0.3em] mb-4", children: [
          /* @__PURE__ */ jsx("span", { className: "w-6 h-px bg-[#edad1a]/60" }),
          "Category: ",
          category.name,
          /* @__PURE__ */ jsx("span", { className: "w-6 h-px bg-[#edad1a]/60" })
        ] }),
        /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold text-[#00274d] leading-tight", children: "We cover 1000+ Products" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 mt-2", children: "Discover the right materials for your project." })
      ] }),
      category.products.length === 0 && /* @__PURE__ */ jsxs("div", { className: "text-center py-16 mb-8", children: [
        /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-lg font-medium", children: "Products coming soon" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-sm mt-2", children: "Contact us for enquiries in this category" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mb-14", children: category.products.map((product, i) => /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { delay: i * 0.06 },
          className: "border-1 border-[#00274d] rounded-xl overflow-hidden group hover:shadow-lg transition-all duration-300 flex flex-col",
          children: [
            /* @__PURE__ */ jsxs(Link, { href: `/materials/${category.slug}/${product.slug}`, className: "block", children: [
              /* @__PURE__ */ jsxs("div", { className: "relative h-36 overflow-hidden bg-gray-50", children: [
                /* @__PURE__ */ jsx(
                  MaterialImage,
                  {
                    src: product.image,
                    alt: product.name,
                    label: product.name,
                    className: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  }
                ),
                /* @__PURE__ */ jsx("div", { className: "absolute bottom-2 right-2 w-7 h-7 bg-[#edad1a] rounded-full flex items-center justify-center shadow", children: /* @__PURE__ */ jsx(ShoppingBag, { className: "w-3.5 h-3.5 text-[#00274d]" }) })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "px-3 pt-3 pb-1 bg-[#00274d]", children: [
                /* @__PURE__ */ jsx("p", { className: "font-semibold text-white text-sm", children: product.name }),
                /* @__PURE__ */ jsxs("p", { className: "text-[11px] text-white/60 mt-0.5", children: [
                  product.variants.length,
                  " variants"
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "mt-auto", children: /* @__PURE__ */ jsx(AddToQuoteBtn, { categorySlug: category.slug, categoryName: category.name, product }) })
          ]
        },
        product.slug
      )) }),
      /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
        /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-2 text-[#edad1a] text-[12px] font-bold uppercase tracking-[0.3em] mb-5", children: [
          /* @__PURE__ */ jsx("span", { className: "w-6 h-px bg-[#edad1a]/60" }),
          "Other Categories",
          /* @__PURE__ */ jsx("span", { className: "w-6 h-px bg-[#edad1a]/60" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4", children: otherCategories.map((cat, i) => /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            transition: { delay: i * 0.04 },
            children: /* @__PURE__ */ jsx(Link, { href: `/materials/${cat.slug}`, children: /* @__PURE__ */ jsxs("div", { className: "border-1 border-[#00274d] rounded-xl overflow-hidden hover:shadow-md hover:border-[#edad1a] transition-all duration-300 group cursor-pointer", children: [
              /* @__PURE__ */ jsx("div", { className: "h-24 overflow-hidden", children: /* @__PURE__ */ jsx(MaterialImage, { src: cat.image, alt: cat.name, label: cat.name, className: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" }) }),
              /* @__PURE__ */ jsx("div", { className: "p-2.5", children: /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1 text-[#00274d] group-hover:text-[#edad1a] text-sm font-semibold transition-colors", children: [
                /* @__PURE__ */ jsx(ChevronRight, { className: "w-3.5 h-3.5" }),
                " ",
                cat.name
              ] }) })
            ] }) })
          },
          cat.slug
        )) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(
      "section",
      {
        className: "bg-[#edad1a] py-16 relative",
        style: {
          backgroundImage: "radial-gradient(rgba(0,39,77,0.18) 1px, transparent 1px)",
          backgroundSize: "22px 22px"
        },
        children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-3xl mx-auto text-center", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center gap-3 mb-5", children: [
            /* @__PURE__ */ jsx("span", { className: "h-px w-10 bg-[#00274d]/40" }),
            /* @__PURE__ */ jsx("span", { className: "text-xs md:text-sm font-bold tracking-[0.3em] text-[#00274d]", children: "GET STARTED TODAY" }),
            /* @__PURE__ */ jsx("span", { className: "h-px w-10 bg-[#00274d]/40" })
          ] }),
          /* @__PURE__ */ jsx("h2", { className: "text-2xl md:text-3xl font-bold text-[#00274d] mb-3", children: "Ready to Grow and Transform your Business?" }),
          /* @__PURE__ */ jsxs("p", { className: "text-[#00274d]/85 mb-6 text-sm md:text-base", children: [
            "Join ",
            /* @__PURE__ */ jsx("span", { className: "font-semibold", children: "32,000+" }),
            " contractors, vendors, manufacturers, suppliers, and consultants across diverse sectors already using Vendor Infra to discover new opportunities, streamline procurement, acesss plants and equipment solutions, and secure project financing and insurance—all through a single integrated platform."
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-3 justify-center items-center", children: [
            /* @__PURE__ */ jsx(
              "a",
              {
                href: PORTAL_REGISTER_URL,
                target: "_blank",
                rel: "noopener noreferrer",
                children: /* @__PURE__ */ jsx(SiteButton, { variant: "onGold", className: "normal-case tracking-normal", children: "Join Now" })
              }
            ),
            /* @__PURE__ */ jsx(Link, { href: "/materials", children: /* @__PURE__ */ jsx(SiteButton, { variant: "onGold", className: "normal-case tracking-normal", children: "Back to Materials" }) })
          ] })
        ] }) })
      }
    ),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
function MaterialProduct() {
  const { category: catSlug, product: prodSlug } = useParams();
  const { addItem, total } = useQuoteCart();
  const result = getProductBySlug(catSlug ?? "", prodSlug ?? "");
  const [selectedVariant, setSelectedVariant] = useState("");
  const [selectedUnit, setSelectedUnit] = useState("");
  const [selectedGrade, setSelectedGrade] = useState("");
  const [customVariant, setCustomVariant] = useState("");
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [validationError, setValidationError] = useState("");
  if (!result) {
    return /* @__PURE__ */ jsxs("div", { className: "min-h-screen flex flex-col", children: [
      /* @__PURE__ */ jsx(Navbar, {}),
      /* @__PURE__ */ jsx("div", { className: "flex-1 flex items-center justify-center", children: /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-[#00274d] mb-4", children: "Product not found" }),
        /* @__PURE__ */ jsx(Link, { href: "/materials", className: "text-[#edad1a] hover:underline", children: "← Back to Materials" })
      ] }) }),
      /* @__PURE__ */ jsx(Footer, {})
    ] });
  }
  const { category, product } = result;
  const isSteel = category.slug === "steel";
  const handleAddToQuote = () => {
    if (isSteel && !selectedGrade) {
      setValidationError("Please select Primary or Secondary.");
      setTimeout(() => setValidationError(""), 3e3);
      return;
    }
    if (!selectedVariant) {
      setValidationError("Please select a product option.");
      setTimeout(() => setValidationError(""), 3e3);
      return;
    }
    if (!selectedUnit) {
      setValidationError("Please select a unit.");
      setTimeout(() => setValidationError(""), 3e3);
      return;
    }
    setValidationError("");
    addItem({
      categorySlug: category.slug,
      categoryName: category.name,
      productSlug: product.slug,
      productName: product.name,
      variant: isSteel ? `${selectedGrade} · ${selectedVariant}${customVariant ? ` · ${customVariant}` : ""}` : `${selectedVariant}${customVariant ? ` · ${customVariant}` : ""}`,
      unit: selectedUnit,
      image: product.image,
      qty
    });
    setAdded(true);
    setCustomVariant("");
    setTimeout(() => setAdded(false), 3e3);
  };
  const relatedProducts = category.products.filter((p) => p.slug !== product.slug);
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen flex flex-col", children: [
    /* @__PURE__ */ jsx(Navbar, {}),
    /* @__PURE__ */ jsx("div", { className: "bg-gray-50 border-b py-3 px-4", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto flex flex-wrap items-center gap-2 text-sm text-gray-500", children: [
      /* @__PURE__ */ jsx(Link, { href: "/", className: "hover:text-[#edad1a]", children: "Home" }),
      /* @__PURE__ */ jsx(ChevronRight, { className: "w-4 h-4" }),
      /* @__PURE__ */ jsx(Link, { href: "/materials", className: "hover:text-[#edad1a]", children: "Materials" }),
      /* @__PURE__ */ jsx(ChevronRight, { className: "w-4 h-4" }),
      /* @__PURE__ */ jsx(Link, { href: `/materials/${category.slug}`, className: "hover:text-[#edad1a]", children: category.name }),
      /* @__PURE__ */ jsx(ChevronRight, { className: "w-4 h-4" }),
      /* @__PURE__ */ jsx("span", { className: "text-[#edad1a] font-medium", children: product.name }),
      total > 0 && /* @__PURE__ */ jsxs(Link, { href: "/quote-cart", className: "ml-auto flex items-center gap-2 bg-[#edad1a] text-[#00274d] px-4 py-1.5 rounded-full text-sm font-semibold hover:bg-[#00274d] hover:text-white transition-colors", children: [
        /* @__PURE__ */ jsx(ShoppingCart, { className: "w-4 h-4" }),
        "Quote Cart (",
        total,
        ")"
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("main", { className: "flex-1 py-12 bg-white", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-10 mb-16 max-w-4xl mx-auto", children: [
        /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { opacity: 0, x: -30 },
            animate: { opacity: 1, x: 0 },
            className: "border border-gray-200 rounded-2xl overflow-hidden",
            children: /* @__PURE__ */ jsx(
              MaterialImage,
              {
                src: product.image,
                alt: product.name,
                label: product.name,
                className: "w-full h-80 object-cover"
              }
            )
          }
        ),
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, x: 30 },
            animate: { opacity: 1, x: 0 },
            className: "border border-gray-200 rounded-2xl p-8",
            children: [
              /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-2 text-[#edad1a] text-[12px] font-bold uppercase tracking-[0.3em] mb-4", children: [
                /* @__PURE__ */ jsx("span", { className: "w-6 h-px bg-[#edad1a]/60" }),
                category.name,
                /* @__PURE__ */ jsx("span", { className: "w-6 h-px bg-[#edad1a]/60" })
              ] }),
              /* @__PURE__ */ jsx("h1", { className: "text-3xl md:text-4xl font-bold text-[#00274d] leading-tight mb-2", children: product.name }),
              product.description && /* @__PURE__ */ jsx("p", { className: "text-gray-500 text-sm mb-6 leading-relaxed", children: product.description }),
              /* @__PURE__ */ jsx("div", { className: "border-t border-gray-100 my-4" }),
              isSteel && /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
                /* @__PURE__ */ jsx("label", { className: "block text-sm font-semibold text-gray-700 mb-1.5", children: "Type" }),
                /* @__PURE__ */ jsxs(
                  "select",
                  {
                    value: selectedGrade,
                    onChange: (e) => {
                      setSelectedGrade(e.target.value);
                      setValidationError("");
                    },
                    className: "w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#edad1a]/40 focus:border-[#edad1a] bg-white",
                    children: [
                      /* @__PURE__ */ jsx("option", { value: "", children: "Choose an option" }),
                      /* @__PURE__ */ jsx("option", { value: "Primary", children: "Primary" }),
                      /* @__PURE__ */ jsx("option", { value: "Secondary", children: "Secondary" })
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
                /* @__PURE__ */ jsx("label", { className: "block text-sm font-semibold text-gray-700 mb-1.5", children: "Products" }),
                /* @__PURE__ */ jsxs(
                  "select",
                  {
                    value: selectedVariant,
                    onChange: (e) => {
                      setSelectedVariant(e.target.value);
                      setValidationError("");
                    },
                    className: "w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#edad1a]/40 focus:border-[#edad1a] bg-white",
                    children: [
                      /* @__PURE__ */ jsx("option", { value: "", children: "Choose an option" }),
                      product.variants.map((v) => /* @__PURE__ */ jsx("option", { value: v, children: v }, v))
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
                /* @__PURE__ */ jsxs("label", { className: "block text-sm font-semibold text-gray-700 mb-1.5", children: [
                  "Additional Notes ",
                  /* @__PURE__ */ jsx("span", { className: "text-gray-400 font-normal", children: "(optional)" })
                ] }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "text",
                    value: customVariant,
                    onChange: (e) => setCustomVariant(e.target.value),
                    placeholder: "Enter specification (e.g., Grade, Size, Model, Capacity)",
                    className: "w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm placeholder:text-[11px] placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#edad1a]/40 focus:border-[#edad1a] bg-white"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
                /* @__PURE__ */ jsx("label", { className: "block text-sm font-semibold text-gray-700 mb-1.5", children: "Unit" }),
                /* @__PURE__ */ jsxs(
                  "select",
                  {
                    value: selectedUnit,
                    onChange: (e) => {
                      setSelectedUnit(e.target.value);
                      setValidationError("");
                    },
                    className: "w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#edad1a]/40 focus:border-[#edad1a] bg-white",
                    children: [
                      /* @__PURE__ */ jsx("option", { value: "", children: "Choose an option" }),
                      product.units.map((u) => /* @__PURE__ */ jsx("option", { value: u, children: u }, u))
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsx("div", { className: "border-t border-gray-100 my-4" }),
              /* @__PURE__ */ jsxs("div", { className: "mb-5", children: [
                /* @__PURE__ */ jsx("label", { className: "block text-sm font-semibold text-gray-700 mb-1.5", children: "Quantity" }),
                /* @__PURE__ */ jsx("div", { className: "flex items-center gap-3", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center border border-gray-300 rounded-lg overflow-hidden", children: [
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      onClick: () => setQty((q) => Math.max(1, q - 1)),
                      className: "w-10 h-10 flex items-center justify-center hover:bg-gray-50 text-gray-600 transition-colors",
                      children: /* @__PURE__ */ jsx(Minus, { className: "w-4 h-4" })
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "number",
                      min: 1,
                      defaultValue: qty,
                      onBlur: (e) => {
                        const v = parseInt(e.target.value, 10);
                        setQty(Number.isFinite(v) && v > 0 ? v : 1);
                      },
                      className: "w-20 text-center text-sm font-semibold border-x border-gray-300 h-10 focus:outline-none focus:ring-2 focus:ring-[#edad1a]/40 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    },
                    qty
                  ),
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      onClick: () => setQty((q) => q + 1),
                      className: "w-10 h-10 flex items-center justify-center hover:bg-gray-50 text-gray-600 transition-colors",
                      children: /* @__PURE__ */ jsx(Plus, { className: "w-4 h-4" })
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      onClick: () => setQty(1),
                      className: "w-10 h-10 flex items-center justify-center hover:bg-gray-50 text-gray-400 transition-colors",
                      title: "Reset",
                      children: /* @__PURE__ */ jsx(RotateCcw, { className: "w-3.5 h-3.5" })
                    }
                  )
                ] }) })
              ] }),
              validationError && /* @__PURE__ */ jsxs("div", { className: "mb-4 flex items-center gap-2 text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg px-3 py-2", children: [
                /* @__PURE__ */ jsx(AlertCircle, { className: "w-4 h-4 shrink-0" }),
                validationError
              ] }),
              /* @__PURE__ */ jsxs(
                "button",
                {
                  onClick: handleAddToQuote,
                  className: `w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-base transition-all duration-300 ${added ? "bg-green-600 text-white" : "bg-[#edad1a] hover:bg-[#00274d] text-[#00274d] hover:text-white"}`,
                  children: [
                    added ? /* @__PURE__ */ jsx(Check, { className: "w-5 h-5" }) : /* @__PURE__ */ jsx(ShoppingBag, { className: "w-5 h-5" }),
                    added ? "Added to Quote!" : "Add to Quote"
                  ]
                }
              ),
              added && /* @__PURE__ */ jsx("div", { className: "mt-3 text-center", children: /* @__PURE__ */ jsx(Link, { href: "/quote-cart", className: "text-[#edad1a] text-sm hover:underline font-medium", children: "View Quote Cart →" }) })
            ]
          }
        )
      ] }),
      relatedProducts.length > 0 && /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto", children: [
        /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-2 text-[#edad1a] text-[12px] font-bold uppercase tracking-[0.3em] mb-4", children: [
          /* @__PURE__ */ jsx("span", { className: "w-6 h-px bg-[#edad1a]/60" }),
          "Related Products",
          /* @__PURE__ */ jsx("span", { className: "w-6 h-px bg-[#edad1a]/60" })
        ] }),
        /* @__PURE__ */ jsxs("h2", { className: "text-3xl md:text-4xl font-bold text-[#00274d] leading-tight mb-6", children: [
          "More from ",
          category.name
        ] }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5", children: relatedProducts.map((rp, i) => /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            transition: { delay: i * 0.08 },
            className: "border border-gray-200 rounded-xl overflow-hidden group hover:shadow-md transition-all duration-300",
            children: [
              /* @__PURE__ */ jsxs(Link, { href: `/materials/${category.slug}/${rp.slug}`, children: [
                /* @__PURE__ */ jsx("div", { className: "h-32 overflow-hidden", children: /* @__PURE__ */ jsx(MaterialImage, { src: rp.image, alt: rp.name, label: rp.name, className: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" }) }),
                /* @__PURE__ */ jsxs("div", { className: "p-3", children: [
                  /* @__PURE__ */ jsx("p", { className: "font-semibold text-[#00274d] text-sm", children: rp.name }),
                  /* @__PURE__ */ jsxs("p", { className: "text-xs text-gray-400 mt-0.5", children: [
                    rp.variants.length,
                    " variants"
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "px-3 pb-3", children: /* @__PURE__ */ jsxs(
                Link,
                {
                  href: `/materials/${category.slug}/${rp.slug}`,
                  className: "w-full flex items-center justify-center gap-1 bg-[#00274d] hover:bg-[#edad1a] text-white hover:text-[#00274d] py-2 rounded-lg text-xs font-semibold transition-colors",
                  children: [
                    /* @__PURE__ */ jsx(ShoppingBag, { className: "w-3.5 h-3.5" }),
                    " Select & Add"
                  ]
                }
              ) })
            ]
          },
          rp.slug
        )) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
const inputCls$1 = "w-full bg-white border border-white/20 rounded-xl px-4 py-3 text-sm text-[#00274d] placeholder:text-gray-400 focus:outline-none focus:border-[#edad1a] focus:ring-2 focus:ring-[#edad1a]/20 transition-all duration-150 font-[inherit]";
function QuoteCart() {
  const { items, removeItem, updateQty, clearCart, total } = useQuoteCart();
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    message: ""
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/quote-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          items: items.map((i) => ({
            categoryName: i.categoryName,
            productName: i.productName,
            variant: i.variant,
            unit: i.unit,
            qty: i.qty
          }))
        })
      });
      if (res.ok) {
        setSubmitted(true);
        clearCart();
      } else {
        const d = await res.json().catch(() => ({}));
        setError(d.error ?? "Something went wrong. Please try again or call us directly.");
      }
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  if (submitted) {
    return /* @__PURE__ */ jsxs("div", { className: "min-h-screen flex flex-col bg-[#f7f8fa]", children: [
      /* @__PURE__ */ jsx(Navbar, {}),
      /* @__PURE__ */ jsx("div", { className: "flex-1 flex items-center justify-center py-24 px-4", children: /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, scale: 0.88, y: 24 },
          animate: { opacity: 1, scale: 1, y: 0 },
          transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
          className: "bg-[#00274d] rounded-3xl p-14 shadow-2xl text-center max-w-sm w-full border border-white/5",
          children: [
            /* @__PURE__ */ jsxs("div", { className: "relative mx-auto w-20 h-20 mb-8", children: [
              /* @__PURE__ */ jsx(
                motion.div,
                {
                  initial: { scale: 0.6, opacity: 0 },
                  animate: { scale: 1.4, opacity: 0 },
                  transition: { repeat: Infinity, duration: 1.8, ease: "easeOut" },
                  className: "absolute inset-0 rounded-full bg-[#edad1a]/20"
                }
              ),
              /* @__PURE__ */ jsx("div", { className: "relative w-20 h-20 rounded-full bg-[#edad1a]/10 border-1 border-[#edad1a]/30 flex items-center justify-center", children: /* @__PURE__ */ jsx(CheckCircle, { className: "w-9 h-9 text-[#edad1a]" }) })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "inline-flex items-center gap-2 bg-[#edad1a]/10 border border-[#edad1a]/20 text-[#edad1a] text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-widest mb-5", children: "Request sent" }),
            /* @__PURE__ */ jsxs("h2", { className: "text-2xl font-extrabold text-white mb-3 tracking-tight leading-snug", children: [
              "We've got your quote",
              /* @__PURE__ */ jsx("br", {}),
              "request!"
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-white/40 text-sm leading-relaxed mb-8", children: "Our team personally reviews every request and will contact you soon with pricing and availability." }),
            /* @__PURE__ */ jsx(Link, { href: "/materials", children: /* @__PURE__ */ jsx("button", { className: "w-full bg-[#edad1a] text-[#00274d] font-extrabold py-4 rounded-2xl hover:bg-[#f5c43a] transition-all duration-200 tracking-wide text-sm", children: "Continue browsing" }) })
          ]
        }
      ) }),
      /* @__PURE__ */ jsx(Footer, {})
    ] });
  }
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen flex flex-col bg-[#f7f8fa]", children: [
    /* @__PURE__ */ jsx(Navbar, {}),
    /* @__PURE__ */ jsx(
      PageHero,
      {
        eyebrow: "Materials",
        title: "Your Quote Cart",
        subtitle: "Our team will review your requirements and get in touch with you soon."
      }
    ),
    /* @__PURE__ */ jsx("section", { className: "flex-1 py-12", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 max-w-6xl", children: [
      /* @__PURE__ */ jsxs(Link, { href: "/materials", className: "inline-flex items-center gap-2 text-[#edad1a] text-xs font-bold uppercase tracking-widest mb-10 group", children: [
        /* @__PURE__ */ jsx(ArrowLeft, { className: "w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" }),
        "Back to materials"
      ] }),
      items.length === 0 ? /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          className: "bg-white rounded-3xl p-20 text-center border border-gray-100 shadow-sm",
          children: [
            /* @__PURE__ */ jsx("div", { className: "w-16 h-16 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center mx-auto mb-6", children: /* @__PURE__ */ jsx(ShoppingCart, { className: "w-8 h-8 text-gray-200" }) }),
            /* @__PURE__ */ jsx("h3", { className: "text-xl font-extrabold text-[#00274d] mb-3 tracking-tight", children: "Nothing here yet" }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-sm mb-8 max-w-xs mx-auto leading-relaxed", children: "Browse our materials catalogue and add items to get a personalised quote." }),
            /* @__PURE__ */ jsx(Link, { href: "/materials", children: /* @__PURE__ */ jsx("button", { className: "bg-[#00274d] text-white font-bold px-10 py-3.5 rounded-2xl hover:bg-[#edad1a] hover:text-white transition-all duration-200 text-sm tracking-wide", children: "Browse Materials" }) })
          ]
        }
      ) : /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-[1fr_380px] gap-8 items-start", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-end justify-between mb-6", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "text-[10px] font-bold tracking-[0.16em] uppercase text-[#00274d] mb-1.5", children: "Your selection" }),
              /* @__PURE__ */ jsxs("h2", { className: "text-[28px] font-extrabold text-[#00274d] tracking-tight leading-none", children: [
                total,
                " ",
                total === 1 ? "item" : "items",
                /* @__PURE__ */ jsx("span", { className: "text-[14px] font-normal text-[#b0b8c8] ml-2 tracking-normal", children: "in cart" })
              ] })
            ] }),
            /* @__PURE__ */ jsxs(
              "button",
              {
                onClick: clearCart,
                className: "flex items-center gap-1.5 text-xs text-red-400 hover:text-red-600 font-semibold px-3 py-2 rounded-xl hover:bg-red-50 transition-all",
                children: [
                  /* @__PURE__ */ jsx(Trash2, { className: "w-3.5 h-3.5" }),
                  " Clear all"
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsx("div", { className: "space-y-3", children: /* @__PURE__ */ jsx(AnimatePresence, { children: items.map((item2, i) => /* @__PURE__ */ jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 10 },
              animate: { opacity: 1, y: 0 },
              exit: { opacity: 0, x: 40, height: 0, marginBottom: 0 },
              transition: { delay: i * 0.07, duration: 0.32, ease: [0.22, 1, 0.36, 1] },
              className: "group bg-white rounded-[20px] border border-[#eef0f4] hover:border-[#edad1a]/60 hover:shadow-[0_8px_32px_rgba(237,173,26,0.09)] transition-all duration-200 p-5 flex gap-4 relative overflow-hidden",
              children: [
                /* @__PURE__ */ jsx("span", { className: "absolute top-3.5 right-4 text-[11px] font-black text-[#e8ecf4] tracking-widest select-none", children: String(i + 1).padStart(2, "0") }),
                /* @__PURE__ */ jsx("div", { className: "w-[68px] h-[68px] rounded-[14px] bg-[#f3f5f8] border border-[#eef0f4] flex-shrink-0 overflow-hidden flex items-center justify-center", children: /* @__PURE__ */ jsx(
                  MaterialImage,
                  {
                    src: item2.image,
                    alt: item2.productName,
                    label: item2.productName,
                    className: "w-full h-full object-cover"
                  }
                ) }),
                /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0 pr-6", children: [
                  /* @__PURE__ */ jsx("p", { className: "text-[10px] font-bold tracking-[0.14em] uppercase text-[#00274d] mb-1", children: item2.categoryName }),
                  /* @__PURE__ */ jsx("p", { className: "text-[15px] font-extrabold text-[#00274d] tracking-tight leading-snug mb-1.5", children: item2.productName }),
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
                    /* @__PURE__ */ jsx("span", { className: "text-xs text-[#b0b8c8]", children: item2.variant }),
                    /* @__PURE__ */ jsx("span", { className: "text-[#dde2ea]", children: "·" }),
                    /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1.5 bg-[#fdf3d8] text-[#a07010] text-[11px] font-bold px-2.5 py-0.5 rounded-lg", children: [
                      /* @__PURE__ */ jsx(Package, { className: "w-3 h-3" }),
                      item2.unit
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mt-3.5", children: [
                    /* @__PURE__ */ jsxs("div", { className: "flex items-center rounded-xl overflow-hidden border-[1.5px] border-[#eef0f4] bg-[#f8fafc]", children: [
                      /* @__PURE__ */ jsx(
                        "button",
                        {
                          onClick: () => updateQty(item2.productSlug, item2.variant, item2.qty - 1),
                          className: "w-9 h-9 flex items-center justify-center text-[#8896aa] hover:bg-[#edad1a] hover:text-white transition-all",
                          "aria-label": "Decrease",
                          children: /* @__PURE__ */ jsx(Minus, { className: "w-3.5 h-3.5" })
                        }
                      ),
                      /* @__PURE__ */ jsx(
                        "input",
                        {
                          type: "number",
                          min: 1,
                          defaultValue: item2.qty,
                          onBlur: (e) => {
                            const v = parseInt(e.target.value, 10);
                            updateQty(item2.productSlug, item2.variant, Number.isFinite(v) && v > 0 ? v : 1);
                          },
                          className: "w-12 h-9 text-center text-sm font-black text-[#00274d] bg-white border-x-[1.5px] border-[#eef0f4] focus:outline-none focus:ring-2 focus:ring-[#edad1a]/20 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        },
                        item2.qty
                      ),
                      /* @__PURE__ */ jsx(
                        "button",
                        {
                          onClick: () => updateQty(item2.productSlug, item2.variant, item2.qty + 1),
                          className: "w-9 h-9 flex items-center justify-center text-[#8896aa] hover:bg-[#edad1a] hover:text-white transition-all",
                          "aria-label": "Increase",
                          children: /* @__PURE__ */ jsx(Plus, { className: "w-3.5 h-3.5" })
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsx(
                      "button",
                      {
                        onClick: () => removeItem(item2.productSlug, item2.variant),
                        className: "ml-auto w-9 h-9 flex items-center justify-center rounded-xl bg-[#fff5f5] hover:bg-[#fee2e2] text-[#f87171] hover:text-[#ef4444] transition-all",
                        "aria-label": `Remove ${item2.productName}`,
                        children: /* @__PURE__ */ jsx(Trash2, { className: "w-4 h-4" })
                      }
                    )
                  ] })
                ] })
              ]
            },
            `${item2.productSlug}-${item2.variant}`
          )) }) })
        ] }),
        /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { opacity: 0, y: 16 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.4, delay: 0.12 },
            className: "sticky top-24",
            children: /* @__PURE__ */ jsxs("div", { className: "bg-[#00274d] rounded-3xl overflow-hidden border border-white/5 shadow-2xl shadow-[#00274d]/20", children: [
              /* @__PURE__ */ jsxs("div", { className: "px-7 pt-7 pb-6 border-b-2 border-[#edad1a]", children: [
                /* @__PURE__ */ jsx("p", { className: "text-[10px] font-bold tracking-[0.18em] uppercase text-white mb-2", children: "Quote request" }),
                /* @__PURE__ */ jsx("p", { className: "text-xs text-white/35 leading-relaxed", children: "We'll confirm pricing and stock availability." })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "px-7 py-6", children: [
                error && /* @__PURE__ */ jsxs("div", { className: "mb-5 flex items-start gap-3 p-3.5 bg-red-500/10 border border-red-500/20 rounded-xl text-xs text-red-300", children: [
                  /* @__PURE__ */ jsx(AlertCircle, { className: "w-4 h-4 shrink-0 mt-0.5 text-red-400" }),
                  /* @__PURE__ */ jsx("span", { children: error })
                ] }),
                /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-3.5", children: [
                  /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
                    /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsxs("label", { className: "block text-[10px] font-bold tracking-[0.1em] uppercase text-white mb-2", children: [
                        "Full name ",
                        /* @__PURE__ */ jsx("span", { className: "text-white", children: "*" })
                      ] }),
                      /* @__PURE__ */ jsx(
                        "input",
                        {
                          required: true,
                          value: form.name,
                          onChange: (e) => setForm((f) => ({ ...f, name: e.target.value })),
                          placeholder: "John Smith",
                          className: inputCls$1
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsxs("label", { className: "block text-[10px] font-bold tracking-[0.1em] uppercase text-white mb-2", children: [
                        "Company ",
                        /* @__PURE__ */ jsx("span", { className: "text-white", children: "*" })
                      ] }),
                      /* @__PURE__ */ jsx(
                        "input",
                        {
                          required: true,
                          value: form.company,
                          onChange: (e) => setForm((f) => ({ ...f, company: e.target.value })),
                          placeholder: "Acme Ltd.",
                          className: inputCls$1
                        }
                      )
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsxs("label", { className: "block text-[10px] font-bold tracking-[0.1em] uppercase text-white mb-2", children: [
                      "Email address ",
                      /* @__PURE__ */ jsx("span", { className: "text-white", children: "*" })
                    ] }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        required: true,
                        type: "email",
                        value: form.email,
                        onChange: (e) => setForm((f) => ({ ...f, email: e.target.value })),
                        placeholder: "you@company.com",
                        className: inputCls$1
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsxs("label", { className: "block text-[10px] font-bold tracking-[0.1em] uppercase text-white mb-2", children: [
                      "Phone number ",
                      /* @__PURE__ */ jsx("span", { className: "text-white", children: "*" })
                    ] }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        required: true,
                        type: "tel",
                        value: form.phone,
                        onChange: (e) => setForm((f) => ({ ...f, phone: e.target.value })),
                        placeholder: "+91-XXXXX XXXXX",
                        className: inputCls$1
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsxs("label", { className: "block text-[10px] font-bold tracking-[0.1em] uppercase text-white mb-2", children: [
                      "Notes",
                      " "
                    ] }),
                    /* @__PURE__ */ jsx(
                      "textarea",
                      {
                        rows: 3,
                        value: form.message,
                        onChange: (e) => setForm((f) => ({ ...f, message: e.target.value })),
                        placeholder: "Delivery location, timeline, special requirements…",
                        className: `${inputCls$1} resize-none`
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      type: "submit",
                      disabled: isSubmitting,
                      className: "w-full bg-[#edad1a] hover:bg-[#f5c43a] disabled:opacity-50 text-[#00274d] font-extrabold py-4 rounded-2xl transition-all duration-200 flex items-center justify-center gap-2.5 text-sm tracking-wide hover:-translate-y-0.5 active:translate-y-0 shadow-lg shadow-[#edad1a]/20 mt-1",
                      children: isSubmitting ? /* @__PURE__ */ jsxs(Fragment, { children: [
                        /* @__PURE__ */ jsx("span", { className: "animate-spin rounded-full h-4 w-4 border-1 border-[#00274d]/20 border-t-[#00274d]" }),
                        "Sending…"
                      ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
                        /* @__PURE__ */ jsx(Send, { className: "w-4 h-4" }),
                        "Send quote request"
                      ] })
                    }
                  )
                ] })
              ] })
            ] })
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
const WHATSAPP_NUMBER = "918800119885";
const QUICK_REPLIES = [
  {
    label: "Book a Free Demo",
    message: "Hi! I'd like to book a free demo of the Vendor Infra platform. Please let me know the available slots."
  },
  {
    label: "Vendor Discovery",
    message: "Hi! I'm looking to discover verified vendors for my infrastructure project. Can you help me get started on Vendor Infra?"
  },
  {
    label: "Material Procurement",
    message: "Hi! I need help with material procurement for a construction/infrastructure project. Can you tell me how Vendor Infra can assist?"
  },
  {
    label: "Plants & Equipment",
    message: "Hi! I'm interested in buying, selling, or hiring plants & equipment through Vendor Infra. Please share more details."
  },
  {
    label: "Pricing & Plans",
    message: "Hi! I'd like to know more about Vendor Infra's pricing plans and which one suits my business best."
  }
];
const DEFAULT_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Hi! I'd like to know more about Vendor Infra's services."
)}`;
function waUrl(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
function WhatsAppIcon({ className }) {
  return /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "currentColor", className, children: /* @__PURE__ */ jsx("path", { d: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" }) });
}
function WhatsAppButton() {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 1500);
    return () => clearTimeout(t);
  }, []);
  return /* @__PURE__ */ jsx(AnimatePresence, { children: visible && /* @__PURE__ */ jsxs("div", { className: "fixed bottom-6 right-4 sm:right-6 z-50 flex flex-col items-end gap-3", children: [
    /* @__PURE__ */ jsx(AnimatePresence, { children: open && /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 12, scale: 0.92 },
        animate: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: 12, scale: 0.92 },
        transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] },
        className: "bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden w-72",
        children: [
          /* @__PURE__ */ jsxs("div", { className: "bg-[#075e54] px-4 py-3 flex items-center justify-between", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2.5", children: [
              /* @__PURE__ */ jsx("div", { className: "w-9 h-9 bg-[#25D366] rounded-full flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsx(WhatsAppIcon, { className: "w-5 h-5 text-white" }) }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("p", { className: "text-white font-bold text-sm leading-none", children: "Vendor Infra" }),
                /* @__PURE__ */ jsxs("p", { className: "text-white/70 text-xs mt-0.5 flex items-center gap-1", children: [
                  /* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 bg-[#25D366] rounded-full inline-block animate-pulse" }),
                  "Typically replies instantly"
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => setOpen(false),
                className: "text-white/60 hover:text-white transition-colors p-1",
                "aria-label": "Close",
                children: /* @__PURE__ */ jsx(X, { className: "w-4 h-4" })
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-[#e5ddd5] px-4 pt-4 pb-3", children: [
            /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl rounded-tl-none px-3 py-2.5 shadow-sm max-w-[92%]", children: [
              /* @__PURE__ */ jsx("p", { className: "text-gray-800 text-sm leading-relaxed", children: "Hi, welcome to Vendor Infra. How can we assist you today?" }),
              /* @__PURE__ */ jsx("p", { className: "text-[10px] text-gray-400 text-right mt-1", children: "Now" })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "mt-3 flex flex-col gap-2", children: QUICK_REPLIES.map((qr) => /* @__PURE__ */ jsxs(
              "a",
              {
                href: waUrl(qr.message),
                target: "_blank",
                rel: "noopener noreferrer",
                className: "self-end bg-white hover:bg-[#25D366] hover:text-white text-[#075e54] border border-[#25D366]/40 hover:border-[#25D366] font-semibold text-xs px-3.5 py-2 rounded-full shadow-sm transition-all duration-150 text-right leading-snug",
                children: [
                  qr.label,
                  " →"
                ]
              },
              qr.label
            )) })
          ] }),
          /* @__PURE__ */ jsxs(
            "a",
            {
              href: DEFAULT_URL,
              target: "_blank",
              rel: "noopener noreferrer",
              className: "flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20b85a] text-white font-bold py-3 text-sm transition-colors",
              children: [
                /* @__PURE__ */ jsx(WhatsAppIcon, { className: "w-4 h-4" }),
                "Open Chat"
              ]
            }
          )
        ]
      }
    ) }),
    /* @__PURE__ */ jsxs(
      motion.button,
      {
        initial: { opacity: 0, scale: 0.5 },
        animate: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0.5 },
        transition: { type: "spring", stiffness: 260, damping: 20 },
        whileHover: { scale: 1.1 },
        whileTap: { scale: 0.93 },
        onClick: () => setOpen((v) => !v),
        "aria-label": "Chat on WhatsApp",
        className: "relative w-14 h-14 bg-[#25D366] rounded-full shadow-[0_4px_24px_rgba(37,211,102,0.5)] flex items-center justify-center cursor-pointer",
        children: [
          /* @__PURE__ */ jsx("span", { className: "absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-25" }),
          /* @__PURE__ */ jsx(WhatsAppIcon, { className: "w-7 h-7 text-white relative z-10" })
        ]
      }
    )
  ] }) });
}
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
  "Other"
];
const inputCls = "w-full bg-white border border-gray-200 rounded-md px-3 py-2 text-[13px] text-gray-700 placeholder:text-[12.5px] placeholder:text-gray-400 placeholder:font-normal focus:outline-none focus:border-[#edad1a] focus:ring-2 focus:ring-[#edad1a]/15 transition-all";
const labelCls = "block text-[10px] font-medium text-gray-500 uppercase tracking-[0.08em] mb-1";
function BookDemoButton() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState("form");
  const [form, setForm] = useState({ name: "", company: "", phone: "", email: "", sectors: [] });
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");
  const set = (k) => (e) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    setErrors((p) => ({ ...p, [k]: void 0 }));
  };
  const toggleSector = (sector) => {
    setForm((f) => {
      const sectors2 = sector === "All sectors" ? f.sectors.includes(sector) ? [] : ["All sectors"] : f.sectors.includes(sector) ? f.sectors.filter((s) => s !== sector) : [...f.sectors.filter((s) => s !== "All sectors"), sector];
      return { ...f, sectors: sectors2 };
    });
    setErrors((p) => ({ ...p, sectors: void 0 }));
  };
  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Required";
    if (!form.company.trim()) e.company = "Required";
    if (!form.phone.trim()) e.phone = "Required";
    return e;
  };
  const submit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setStep("loading");
    setSubmitError("");
    try {
      const res = await fetch("/api/demo-bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
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
    setTimeout(() => {
      setStep("form");
      setForm({ name: "", company: "", phone: "", email: "", sectors: [] });
      setErrors({});
      setSubmitError("");
    }, 350);
  };
  const sectorLabel = form.sectors.length ? form.sectors.length === 1 ? form.sectors[0] : `${form.sectors.length} sectors selected` : "Select sectors...";
  return /* @__PURE__ */ jsxs("div", { className: "fixed bottom-6 left-4 sm:left-6 z-50 flex flex-col items-start gap-0", children: [
    /* @__PURE__ */ jsx(AnimatePresence, { children: open && /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 20, scale: 0.96 },
        animate: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: 16, scale: 0.96 },
        transition: { type: "spring", stiffness: 340, damping: 30 },
        className: "mb-3 w-[300px] bg-white rounded-xl shadow-xl shadow-black/15 border border-gray-100 overflow-hidden",
        children: [
          /* @__PURE__ */ jsxs("div", { className: "relative bg-[#00274d] px-4 py-3", children: [
            /* @__PURE__ */ jsx(
              "div",
              {
                className: "absolute inset-0 opacity-[0.07]",
                style: { backgroundImage: "radial-gradient(circle at 1px 1px,#fff 1px,transparent 0)", backgroundSize: "18px 18px" }
              }
            ),
            /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between relative z-10 gap-2", children: [
              /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsx("div", { className: "w-6 h-6 bg-white/12 rounded-md flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsx(CalendarCheck, { className: "w-3 h-3 text-white" }) }),
                  /* @__PURE__ */ jsx("p", { className: "text-white font-semibold text-[13px] leading-none tracking-tight", children: "Book a Free Demo" })
                ] }),
                /* @__PURE__ */ jsx("p", { className: "text-white/65 text-[11px] mt-1.5 leading-snug", children: "For AI-Powered SaaS Platform for the Infrastructure, Construction & Manufacturing Industry." })
              ] }),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: close,
                  "aria-label": "Close",
                  className: "w-6 h-6 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/70 hover:text-white transition-colors shrink-0",
                  children: /* @__PURE__ */ jsx(X, { className: "w-3 h-3" })
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "p-4", children: /* @__PURE__ */ jsxs(AnimatePresence, { mode: "wait", children: [
            step === "form" && /* @__PURE__ */ jsxs(
              motion.form,
              {
                initial: { opacity: 0 },
                animate: { opacity: 1 },
                exit: { opacity: 0 },
                onSubmit: submit,
                noValidate: true,
                className: "space-y-2.5",
                children: [
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("label", { className: labelCls, children: "Full Name *" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        value: form.name,
                        onChange: set("name"),
                        placeholder: "James",
                        className: `${inputCls} ${errors.name ? "border-red-400 ring-2 ring-red-200" : ""}`
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("label", { className: labelCls, children: "Company *" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        value: form.company,
                        onChange: set("company"),
                        placeholder: "Your company",
                        className: `${inputCls} ${errors.company ? "border-red-400 ring-2 ring-red-200" : ""}`
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("label", { className: labelCls, children: "Phone *" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        value: form.phone,
                        onChange: set("phone"),
                        placeholder: "98765 43210",
                        type: "tel",
                        className: `${inputCls} ${errors.phone ? "border-red-400 ring-2 ring-red-200" : ""}`
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("label", { className: labelCls, children: "Email" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        value: form.email,
                        onChange: set("email"),
                        placeholder: "you@company.com",
                        type: "email",
                        className: inputCls
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("label", { className: labelCls, children: "Sectors" }),
                    /* @__PURE__ */ jsxs("div", { className: "relative group", children: [
                      /* @__PURE__ */ jsxs(
                        "button",
                        {
                          type: "button",
                          className: `${inputCls} flex items-center justify-between text-left`,
                          children: [
                            /* @__PURE__ */ jsx("span", { className: form.sectors.length ? "text-[13px] text-gray-700 truncate" : "text-[12.5px] text-gray-400 font-normal", children: sectorLabel }),
                            /* @__PURE__ */ jsx(ChevronDown, { className: "w-4 h-4 text-gray-400 shrink-0" })
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsx("div", { className: "invisible opacity-0 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100 absolute left-0 right-0 bottom-full z-30 mb-2 max-h-52 overflow-y-auto rounded-lg border border-gray-200 bg-white p-1.5 shadow-2xl transition-all", children: SECTORS.map((s) => /* @__PURE__ */ jsxs("label", { className: "flex min-h-9 cursor-pointer items-center gap-2.5 rounded-md px-2.5 py-1.5 text-[13px] font-medium leading-snug text-[#00274d] hover:bg-[#edad1a]/10", children: [
                        /* @__PURE__ */ jsx(
                          "input",
                          {
                            type: "checkbox",
                            checked: form.sectors.includes(s),
                            onChange: () => toggleSector(s),
                            className: "h-3.5 w-3.5 shrink-0 rounded border-gray-300 accent-[#edad1a]"
                          }
                        ),
                        /* @__PURE__ */ jsx("span", { children: s })
                      ] }, s)) })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs(
                    "button",
                    {
                      type: "submit",
                      className: "group/btn w-full bg-[#edad1a] hover:bg-[#d4941a] text-white font-semibold py-2.5 pl-4 pr-2 rounded-md text-[13px] tracking-tight transition-all mt-1 flex items-center justify-between shadow-sm hover:shadow-md",
                      children: [
                        /* @__PURE__ */ jsx("span", { children: "Request My Free Demo" }),
                        /* @__PURE__ */ jsx("span", { className: "w-6 h-6 bg-white rounded-full flex items-center justify-center text-[#1a1a1a] transition-transform group-hover/btn:translate-x-0.5", children: /* @__PURE__ */ jsx(ArrowRight, { className: "w-3.5 h-3.5" }) })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsx("p", { className: "text-center text-gray-400 text-[10px] pt-0.5", children: "Our expert will connect with you shortly" }),
                  submitError && /* @__PURE__ */ jsx("p", { className: "text-center text-red-500 text-[11px] leading-snug", children: submitError })
                ]
              },
              "form"
            ),
            step === "loading" && /* @__PURE__ */ jsxs(
              motion.div,
              {
                initial: { opacity: 0 },
                animate: { opacity: 1 },
                exit: { opacity: 0 },
                className: "flex flex-col items-center justify-center py-10 gap-3",
                children: [
                  /* @__PURE__ */ jsx(Loader2, { className: "w-8 h-8 text-[#edad1a] animate-spin" }),
                  /* @__PURE__ */ jsx("p", { className: "text-gray-500 text-sm", children: "Booking your demo…" })
                ]
              },
              "loading"
            ),
            step === "success" && /* @__PURE__ */ jsxs(
              motion.div,
              {
                initial: { opacity: 0, scale: 0.92 },
                animate: { opacity: 1, scale: 1 },
                exit: { opacity: 0 },
                transition: { type: "spring", stiffness: 260, damping: 22 },
                className: "flex flex-col items-center justify-center py-8 gap-3 text-center",
                children: [
                  /* @__PURE__ */ jsx("div", { className: "w-14 h-14 bg-green-50 rounded-full flex items-center justify-center", children: /* @__PURE__ */ jsx(CheckCircle2, { className: "w-8 h-8 text-green-500" }) }),
                  /* @__PURE__ */ jsx("h3", { className: "text-base font-semibold text-[#00274d]", children: "Demo Booked!" }),
                  /* @__PURE__ */ jsxs("p", { className: "text-gray-500 text-xs leading-relaxed max-w-[200px]", children: [
                    "Thank you,  ",
                    /* @__PURE__ */ jsx("strong", { className: "text-gray-700", children: form.name }),
                    "!  One of our experts will contact you shortly."
                  ] }),
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      onClick: close,
                      className: "mt-1 bg-[#00274d] text-white font-medium px-6 py-2.5 rounded-full text-sm hover:bg-[#003a6e] transition-colors",
                      children: "Done"
                    }
                  )
                ]
              },
              "success"
            )
          ] }) })
        ]
      }
    ) }),
    /* @__PURE__ */ jsxs(
      motion.button,
      {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: 2, duration: 0.5, type: "spring" },
        onClick: () => setOpen((v) => !v),
        "aria-label": "Book a Free Demo",
        className: "flex items-center gap-2.5 bg-[#00274d] hover:bg-[#003a6e] text-white font-medium p-3 sm:pl-3 sm:pr-4 sm:py-3 rounded-full shadow-lg shadow-[#00274d]/25 transition-colors duration-200 group border border-white/10",
        children: [
          /* @__PURE__ */ jsx("div", { className: "w-7 h-7 bg-[#edad1a] rounded-full flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsx(CalendarCheck, { className: "w-4 h-4 text-white" }) }),
          /* @__PURE__ */ jsx("span", { className: "hidden sm:inline text-sm", children: "Book a Demo" }),
          /* @__PURE__ */ jsx(
            motion.div,
            {
              className: "hidden sm:block",
              animate: { rotate: open ? 180 : 0 },
              transition: { duration: 0.25 },
              children: /* @__PURE__ */ jsx(ChevronDown, { className: "w-4 h-4 text-white/60" })
            }
          )
        ]
      }
    )
  ] });
}
function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return /* @__PURE__ */ jsx(AnimatePresence, { children: show && /* @__PURE__ */ jsx(
    motion.button,
    {
      initial: { opacity: 0, y: 12 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: 12 },
      transition: { duration: 0.2 },
      onClick: () => window.scrollTo({ top: 0, behavior: "smooth" }),
      className: "fixed bottom-24 right-4 z-40 w-11 h-11 bg-[#00274d] text-white rounded-full shadow-xl flex items-center justify-center hover:bg-[#edad1a] transition-colors duration-200",
      "aria-label": "Back to top",
      children: /* @__PURE__ */ jsx(ArrowUp, { className: "w-5 h-5" })
    }
  ) });
}
const queryClient = new QueryClient();
function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [location]);
  return null;
}
function Router() {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(ScrollToTop, {}),
    /* @__PURE__ */ jsxs(Switch, { children: [
      /* @__PURE__ */ jsx(Route, { path: "/", component: Home }),
      /* @__PURE__ */ jsx(Route, { path: "/about", component: About }),
      /* @__PURE__ */ jsx(Route, { path: "/services", component: Services }),
      /* @__PURE__ */ jsx(Route, { path: "/contract-manufacturing", component: ContractManufacturing }),
      /* @__PURE__ */ jsx(Route, { path: "/sectors", component: Sectors }),
      /* @__PURE__ */ jsx(Route, { path: "/sectors/:slug", component: SectorDetail }),
      /* @__PURE__ */ jsx(Route, { path: "/pricing", component: Pricing }),
      /* @__PURE__ */ jsx(Route, { path: "/contact", component: Contact }),
      /* @__PURE__ */ jsx(Route, { path: "/blog", component: Blog }),
      /* @__PURE__ */ jsx(Route, { path: "/blog/:slug", component: BlogPost }),
      /* @__PURE__ */ jsx(Route, { path: "/why-us", component: WhyUs }),
      /* @__PURE__ */ jsx(Route, { path: "/referral", component: Referral }),
      /* @__PURE__ */ jsx(Route, { path: "/iso", component: ISO }),
      /* @__PURE__ */ jsx(Route, { path: "/pricing-policy", component: PricingPolicy }),
      /* @__PURE__ */ jsx(Route, { path: "/privacy-policy", component: PrivacyPolicy }),
      /* @__PURE__ */ jsx(Route, { path: "/security", component: Security }),
      /* @__PURE__ */ jsx(Route, { path: "/terms", component: Terms }),
      /* @__PURE__ */ jsx(Route, { path: "/faq", component: FAQ }),
      /* @__PURE__ */ jsx(Route, { path: "/materials", component: Materials }),
      /* @__PURE__ */ jsx(Route, { path: "/materials/:category", component: MaterialCategory }),
      /* @__PURE__ */ jsx(Route, { path: "/materials/:category/:product", component: MaterialProduct }),
      /* @__PURE__ */ jsx(Route, { path: "/quote-cart", component: QuoteCart }),
      /* @__PURE__ */ jsx(Route, { component: NotFound })
    ] })
  ] });
}
function App() {
  return /* @__PURE__ */ jsx(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsxs(TooltipProvider, { children: [
    /* @__PURE__ */ jsx(QuoteCartProvider, { children: /* @__PURE__ */ jsx(Router$1, { base: "/".replace(/\/$/, ""), children: /* @__PURE__ */ jsx(Router, {}) }) }),
    /* @__PURE__ */ jsx(WhatsAppButton, {}),
    /* @__PURE__ */ jsx(BookDemoButton, {}),
    /* @__PURE__ */ jsx(BackToTop, {}),
    /* @__PURE__ */ jsx(Toaster, {})
  ] }) });
}
function ClientApp() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return /* @__PURE__ */ jsx(App, {});
}
export {
  ClientApp as C
};
