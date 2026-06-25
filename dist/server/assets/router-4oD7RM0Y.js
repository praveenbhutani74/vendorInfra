import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext, useRouter, Link, Outlet, HeadContent, Scripts, createFileRoute, lazyRouteComponent, createRouter } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { ZodError, z } from "zod";
import nodemailer from "nodemailer";
const appCss = "/assets/styles-BC_0G3J7.css";
function NotFoundComponent() {
  return /* @__PURE__ */ jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-7xl font-bold text-foreground", children: "404" }),
    /* @__PURE__ */ jsx("h2", { className: "mt-4 text-xl font-semibold text-foreground", children: "Page not found" }),
    /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "The page you're looking for doesn't exist or has been moved." }),
    /* @__PURE__ */ jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsx(
      Link,
      {
        to: "/",
        className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
        children: "Go home"
      }
    ) })
  ] }) });
}
function ErrorComponent({ error, reset }) {
  console.error(error);
  const router = useRouter();
  return /* @__PURE__ */ jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-xl font-semibold tracking-tight text-foreground", children: "This page didn't load" }),
    /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Something went wrong on our end. You can try refreshing or head back home." }),
    /* @__PURE__ */ jsxs("div", { className: "mt-6 flex flex-wrap justify-center gap-2", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => {
            router.invalidate();
            reset();
          },
          className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
          children: "Try again"
        }
      ),
      /* @__PURE__ */ jsx(
        "a",
        {
          href: "/",
          className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
          children: "Go home"
        }
      )
    ] })
  ] }) });
}
const Route$7 = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Vendor Infra | Vendor Management & Procurement Platform" },
      { name: "description", content: "Vendor Infra helps infrastructure, construction and manufacturing teams discover vendors, procure materials, request quotes and manage project services on one platform." },
      { name: "author", content: "Vendor Infra Global Private Limited" },
      { property: "og:title", content: "Vendor Infra | Vendor Management & Procurement Platform" },
      { property: "og:description", content: "Discover vendors, procure materials, request quotes and manage infrastructure services with Vendor Infra." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "@vendorinfra" },
      { name: "twitter:title", content: "Vendor Infra | Vendor Management & Procurement Platform" },
      { name: "twitter:description", content: "Discover vendors, procure materials, request quotes and manage infrastructure services with Vendor Infra." },
      { property: "og:image", content: "https://www.vendorinfra.com/opengraph.jpg" },
      { name: "twitter:image", content: "https://www.vendorinfra.com/opengraph.jpg" }
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "icon", href: "/favicon.ico" },
      { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32x32.png" },
      { rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon-16x16.png" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&display=swap"
      },
      {
        rel: "stylesheet",
        href: appCss
      }
    ]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsx("head", { children: /* @__PURE__ */ jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  const { queryClient } = Route$7.useRouteContext();
  return /* @__PURE__ */ jsx(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsx(Outlet, {}) });
}
const $$splitComponentImporter$1 = () => import("./_-DSAy_HVg.js");
const Route$6 = createFileRoute("/$")({
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./index-DSAy_HVg.js");
const Route$5 = createFileRoute("/")({
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
function jsonResponse(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json; charset=utf-8" }
  });
}
async function parseJsonRequest(request) {
  try {
    return await request.json();
  } catch {
    throw new Error("Invalid JSON body");
  }
}
function mailErrorResponse(error) {
  console.error(error);
  if (error instanceof ZodError) {
    return jsonResponse({ error: "Please check the form details and try again." }, 400);
  }
  if (error instanceof Error && error.message === "Invalid JSON body") {
    return jsonResponse({ error: "Invalid request body." }, 400);
  }
  return jsonResponse({ error: "Unable to send request right now." }, 500);
}
const inquirySchema = z.object({
  type: z.enum(["contact", "demo", "sales", "quote", "referral"]).default("contact"),
  name: z.string().trim().min(1).max(120),
  company: z.string().trim().max(160).optional().default(""),
  email: z.string().trim().email().max(254).optional().or(z.literal("")).default(""),
  phone: z.string().trim().max(30).optional().default(""),
  contact: z.string().trim().max(30).optional().default(""),
  message: z.string().trim().max(3e3).optional().default(""),
  sector: z.string().trim().max(160).optional().default(""),
  sectors: z.array(z.string().trim().max(160)).max(30).optional().default([]),
  plan: z.string().trim().max(120).optional().default(""),
  program: z.string().trim().max(160).optional().default(""),
  city: z.string().trim().max(120).optional().default(""),
  items: z.array(
    z.object({
      categoryName: z.string().trim().max(160).optional().default(""),
      productName: z.string().trim().max(180),
      variant: z.string().trim().max(180).optional().default(""),
      unit: z.string().trim().max(80).optional().default(""),
      qty: z.number().finite().positive().max(1e5).optional().default(1)
    })
  ).max(100).optional().default([])
}).refine((data) => data.email || data.phone || data.contact, {
  message: "Email or phone is required"
});
const labels = {
  contact: "Contact enquiry",
  demo: "Demo booking",
  sales: "Sales enquiry",
  quote: "Quote request",
  referral: "Referral application"
};
function getEnv(name, fallback = "") {
  return process.env[name] ?? fallback;
}
function getMailConfig() {
  const host = getEnv("SMTP_HOST", "smtp.gmail.com");
  const port = Number.parseInt(getEnv("SMTP_PORT", "465"), 10);
  const secure = getEnv("SMTP_SECURE", "true") !== "false";
  const user = getEnv("SMTP_USER", "enquiry@vendorinfra.com");
  const pass = getEnv("SMTP_PASS");
  const to = getEnv("MAIL_TO", "enquiry@vendorinfra.com");
  const from = getEnv("MAIL_FROM", `"Vendor Infra Website" <${user}>`);
  const replyTo = getEnv("MAIL_REPLY_TO");
  if (!host || !port || !user || !pass || !to) {
    throw new Error("Missing SMTP configuration");
  }
  return { host, port, secure, user, pass, to, from, replyTo };
}
function escapeHtml(value) {
  return String(value ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}
function field(label, value) {
  if (Array.isArray(value) && value.length === 0) return "";
  if (value == null || value === "") return "";
  const displayValue = Array.isArray(value) ? value.join(", ") : value;
  return `
    <tr>
      <td style="padding:8px 12px;color:#64748b;font-weight:600;border-bottom:1px solid #e5e7eb;width:180px;">${escapeHtml(label)}</td>
      <td style="padding:8px 12px;color:#0f172a;border-bottom:1px solid #e5e7eb;">${escapeHtml(displayValue)}</td>
    </tr>`;
}
function renderItems(items) {
  if (!items.length) return "";
  const rows = items.map(
    (item, index) => `
        <tr>
          <td style="padding:8px 10px;border-bottom:1px solid #e5e7eb;">${index + 1}</td>
          <td style="padding:8px 10px;border-bottom:1px solid #e5e7eb;">${escapeHtml(item.productName)}</td>
          <td style="padding:8px 10px;border-bottom:1px solid #e5e7eb;">${escapeHtml(item.categoryName)}</td>
          <td style="padding:8px 10px;border-bottom:1px solid #e5e7eb;">${escapeHtml(item.variant)}</td>
          <td style="padding:8px 10px;border-bottom:1px solid #e5e7eb;">${escapeHtml(item.unit)}</td>
          <td style="padding:8px 10px;border-bottom:1px solid #e5e7eb;">${escapeHtml(item.qty)}</td>
        </tr>`
  ).join("");
  return `
    <h2 style="font-size:16px;color:#00274d;margin:24px 0 10px;">Requested Items</h2>
    <table style="width:100%;border-collapse:collapse;font-size:13px;">
      <thead>
        <tr style="background:#f8fafc;color:#334155;text-align:left;">
          <th style="padding:8px 10px;">#</th>
          <th style="padding:8px 10px;">Product</th>
          <th style="padding:8px 10px;">Category</th>
          <th style="padding:8px 10px;">Variant</th>
          <th style="padding:8px 10px;">Unit</th>
          <th style="padding:8px 10px;">Qty</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>`;
}
function renderHtml(data) {
  const phone = data.phone || data.contact;
  return `
    <div style="font-family:Arial,sans-serif;background:#f6f8fb;padding:24px;">
      <div style="max-width:720px;margin:0 auto;background:#ffffff;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden;">
        <div style="background:#00274d;color:white;padding:20px 24px;">
          <p style="margin:0 0 6px;color:#edad1a;text-transform:uppercase;letter-spacing:.12em;font-size:12px;font-weight:700;">Vendor Infra Website</p>
          <h1 style="margin:0;font-size:22px;">${escapeHtml(labels[data.type])}</h1>
        </div>
        <div style="padding:22px 24px;">
          <table style="width:100%;border-collapse:collapse;font-size:14px;">
            <tbody>
              ${field("Name", data.name)}
              ${field("Company", data.company)}
              ${field("Email", data.email)}
              ${field("Phone", phone)}
              ${field("Plan", data.plan)}
              ${field("Program", data.program)}
              ${field("City", data.city)}
              ${field("Sector", data.sector)}
              ${field("Sectors", data.sectors)}
              ${field("Message", data.message)}
            </tbody>
          </table>
          ${renderItems(data.items)}
        </div>
      </div>
    </div>`;
}
function renderText(data) {
  const phone = data.phone || data.contact;
  const lines = [
    labels[data.type],
    "",
    `Name: ${data.name}`,
    data.company && `Company: ${data.company}`,
    data.email && `Email: ${data.email}`,
    phone && `Phone: ${phone}`,
    data.plan && `Plan: ${data.plan}`,
    data.program && `Program: ${data.program}`,
    data.city && `City: ${data.city}`,
    data.sector && `Sector: ${data.sector}`,
    data.sectors.length && `Sectors: ${data.sectors.join(", ")}`,
    data.message && `Message: ${data.message}`
  ].filter(Boolean);
  if (data.items.length) {
    lines.push(
      "",
      "Items:",
      ...data.items.map(
        (item, index) => `${index + 1}. ${item.productName} | ${item.categoryName} | ${item.variant} | ${item.unit} | Qty: ${item.qty}`
      )
    );
  }
  return lines.join("\n");
}
async function sendInquiryMail(rawData) {
  const data = inquirySchema.parse(rawData);
  const config = getMailConfig();
  const transporter = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: {
      user: config.user,
      pass: config.pass
    }
  });
  const replyTo = data.email || config.replyTo || config.user;
  await transporter.sendMail({
    from: config.from,
    to: config.to,
    replyTo,
    subject: `[Vendor Infra] ${labels[data.type]} from ${data.name}`,
    text: renderText(data),
    html: renderHtml(data)
  });
}
const Route$4 = createFileRoute("/api/referral")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const data = await parseJsonRequest(request);
          await sendInquiryMail({ ...data, type: "referral" });
          return jsonResponse({ ok: true });
        } catch (error) {
          return mailErrorResponse(error);
        }
      }
    }
  }
});
const Route$3 = createFileRoute("/api/quote-requests")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const data = await parseJsonRequest(request);
          await sendInquiryMail({ ...data, type: "quote" });
          return jsonResponse({ ok: true });
        } catch (error) {
          return mailErrorResponse(error);
        }
      }
    }
  }
});
const Route$2 = createFileRoute("/api/demo-bookings")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const data = await parseJsonRequest(request);
          await sendInquiryMail({ ...data, type: "demo" });
          return jsonResponse({ ok: true });
        } catch (error) {
          return mailErrorResponse(error);
        }
      }
    }
  }
});
const Route$1 = createFileRoute("/api/contact-sales")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const data = await parseJsonRequest(request);
          await sendInquiryMail({ ...data, type: "sales" });
          return jsonResponse({ ok: true });
        } catch (error) {
          return mailErrorResponse(error);
        }
      }
    }
  }
});
const Route = createFileRoute("/api/contact")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const data = await parseJsonRequest(request);
          await sendInquiryMail({ ...data, type: "contact" });
          return jsonResponse({ ok: true });
        } catch (error) {
          return mailErrorResponse(error);
        }
      }
    }
  }
});
const SplatRoute = Route$6.update({
  id: "/$",
  path: "/$",
  getParentRoute: () => Route$7
});
const IndexRoute = Route$5.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$7
});
const ApiReferralRoute = Route$4.update({
  id: "/api/referral",
  path: "/api/referral",
  getParentRoute: () => Route$7
});
const ApiQuoteRequestsRoute = Route$3.update({
  id: "/api/quote-requests",
  path: "/api/quote-requests",
  getParentRoute: () => Route$7
});
const ApiDemoBookingsRoute = Route$2.update({
  id: "/api/demo-bookings",
  path: "/api/demo-bookings",
  getParentRoute: () => Route$7
});
const ApiContactSalesRoute = Route$1.update({
  id: "/api/contact-sales",
  path: "/api/contact-sales",
  getParentRoute: () => Route$7
});
const ApiContactRoute = Route.update({
  id: "/api/contact",
  path: "/api/contact",
  getParentRoute: () => Route$7
});
const rootRouteChildren = {
  IndexRoute,
  SplatRoute,
  ApiContactRoute,
  ApiContactSalesRoute,
  ApiDemoBookingsRoute,
  ApiQuoteRequestsRoute,
  ApiReferralRoute
};
const routeTree = Route$7._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const queryClient = new QueryClient();
  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router;
};
export {
  getRouter
};
