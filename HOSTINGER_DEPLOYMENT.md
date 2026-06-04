# Vendor Infra Hostinger Deployment

This project is a TanStack Start/Vite app with server-side API routes for inquiry email. Deploy it on a Hostinger plan that supports Node.js applications. A plain WordPress/static `public_html` upload will not run `/api/contact`, `/api/demo-bookings`, `/api/contact-sales`, `/api/quote-requests`, or `/api/referral`.

## 1. Build Locally

```bash
pnpm install
pnpm run build
```

The build output is:

- `dist/client` for browser assets
- `dist/server` for the TanStack server entry
- `hostinger-server.mjs` as the Node adapter Hostinger runs

## 2. Upload Files To Hostinger

Upload the project folder to the Hostinger account, for example:

```text
/home/u123456789/domains/vendorinfra.com/app
```

Upload these at minimum:

- `dist/`
- `hostinger-server.mjs`
- `package.json`
- `pnpm-lock.yaml`

If installing dependencies on Hostinger, upload the full project except `node_modules`.

## 3. Configure Hostinger Node.js App

In Hostinger hPanel:

1. Open **Websites** > `vendorinfra.com` > **Advanced** > **Node.js**.
2. Create a Node.js app.
3. Set the application root to the uploaded app folder.
4. Set Node version to 20 or newer.
5. Set startup file to:

```text
hostinger-server.mjs
```

6. Set start command:

```bash
npm start
```

Hostinger will provide `PORT`; the adapter reads it automatically. For local testing, use:

```bash
PORT=8080 npm start
```

## 4. Set Email Environment Variables

Add these in Hostinger's Node.js app environment variables:

```text
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=enquiry@vendorinfra.com
SMTP_PASS=nvkbnmtdxpagagsh
MAIL_TO=enquiry@vendorinfra.com
MAIL_FROM=Vendor Infra Website <enquiry@vendorinfra.com>
MAIL_REPLY_TO=enquiry@vendorinfra.com
```

If `enquiry@vendorinfra.com` is hosted on Hostinger Email instead of Google Workspace/Gmail, use:

```text
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=465
SMTP_SECURE=true
```

Keep the real password out of source control. `.env.local` is ignored and can be used for local testing only.

## 5. Replace The WordPress Site

Before switching:

1. Take a full Hostinger backup of the existing WordPress site and database.
2. Export current WordPress pages/content if the team may need it later.
3. Keep WordPress in a backup folder or subdomain during the first launch window.

To make this app live:

1. Point `vendorinfra.com` to the Hostinger Node.js app in hPanel.
2. Make sure SSL is active for `vendorinfra.com` and `www.vendorinfra.com`.
3. Redirect `www.vendorinfra.com` and `vendorinfra.com` consistently to the preferred version.
4. Test:
   - `/`
   - `/about`
   - `/services`
   - `/contact`
   - `/quote-cart`
   - contact form email delivery
   - demo form email delivery
   - quote request email delivery

## 6. Production Checks

Run before deployment:

```bash
pnpm run build
```

After deployment, submit one test contact request and confirm the email arrives at `enquiry@vendorinfra.com`.

