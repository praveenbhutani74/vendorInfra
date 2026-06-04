import nodemailer from "nodemailer";
import { z } from "zod";

const inquirySchema = z
  .object({
    type: z
      .enum(["contact", "demo", "sales", "quote", "referral"])
      .default("contact"),
    name: z.string().trim().min(1).max(120),
    company: z.string().trim().max(160).optional().default(""),
    email: z.string().trim().email().max(254).optional().or(z.literal("")).default(""),
    phone: z.string().trim().max(30).optional().default(""),
    contact: z.string().trim().max(30).optional().default(""),
    message: z.string().trim().max(3000).optional().default(""),
    sector: z.string().trim().max(160).optional().default(""),
    sectors: z.array(z.string().trim().max(160)).max(30).optional().default([]),
    plan: z.string().trim().max(120).optional().default(""),
    program: z.string().trim().max(160).optional().default(""),
    city: z.string().trim().max(120).optional().default(""),
    items: z
      .array(
        z.object({
          categoryName: z.string().trim().max(160).optional().default(""),
          productName: z.string().trim().max(180),
          variant: z.string().trim().max(180).optional().default(""),
          unit: z.string().trim().max(80).optional().default(""),
          qty: z.number().finite().positive().max(100000).optional().default(1),
        }),
      )
      .max(100)
      .optional()
      .default([]),
  })
  .refine((data) => data.email || data.phone || data.contact, {
    message: "Email or phone is required",
  });

export type InquiryPayload = z.infer<typeof inquirySchema>;

const labels: Record<InquiryPayload["type"], string> = {
  contact: "Contact enquiry",
  demo: "Demo booking",
  sales: "Sales enquiry",
  quote: "Quote request",
  referral: "Referral application",
};

function getEnv(name: string, fallback = "") {
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

function escapeHtml(value: unknown) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function field(label: string, value: unknown) {
  if (Array.isArray(value) && value.length === 0) return "";
  if (value == null || value === "") return "";
  const displayValue = Array.isArray(value) ? value.join(", ") : value;
  return `
    <tr>
      <td style="padding:8px 12px;color:#64748b;font-weight:600;border-bottom:1px solid #e5e7eb;width:180px;">${escapeHtml(label)}</td>
      <td style="padding:8px 12px;color:#0f172a;border-bottom:1px solid #e5e7eb;">${escapeHtml(displayValue)}</td>
    </tr>`;
}

function renderItems(items: InquiryPayload["items"]) {
  if (!items.length) return "";

  const rows = items
    .map(
      (item, index) => `
        <tr>
          <td style="padding:8px 10px;border-bottom:1px solid #e5e7eb;">${index + 1}</td>
          <td style="padding:8px 10px;border-bottom:1px solid #e5e7eb;">${escapeHtml(item.productName)}</td>
          <td style="padding:8px 10px;border-bottom:1px solid #e5e7eb;">${escapeHtml(item.categoryName)}</td>
          <td style="padding:8px 10px;border-bottom:1px solid #e5e7eb;">${escapeHtml(item.variant)}</td>
          <td style="padding:8px 10px;border-bottom:1px solid #e5e7eb;">${escapeHtml(item.unit)}</td>
          <td style="padding:8px 10px;border-bottom:1px solid #e5e7eb;">${escapeHtml(item.qty)}</td>
        </tr>`,
    )
    .join("");

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

function renderHtml(data: InquiryPayload) {
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

function renderText(data: InquiryPayload) {
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
    data.message && `Message: ${data.message}`,
  ].filter(Boolean);

  if (data.items.length) {
    lines.push(
      "",
      "Items:",
      ...data.items.map(
        (item, index) =>
          `${index + 1}. ${item.productName} | ${item.categoryName} | ${item.variant} | ${item.unit} | Qty: ${item.qty}`,
      ),
    );
  }

  return lines.join("\n");
}

export async function sendInquiryMail(rawData: unknown) {
  const data = inquirySchema.parse(rawData);
  const config = getMailConfig();
  const transporter = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: {
      user: config.user,
      pass: config.pass,
    },
  });

  const replyTo = data.email || config.replyTo || config.user;

  await transporter.sendMail({
    from: config.from,
    to: config.to,
    replyTo,
    subject: `[Vendor Infra] ${labels[data.type]} from ${data.name}`,
    text: renderText(data),
    html: renderHtml(data),
  });
}

