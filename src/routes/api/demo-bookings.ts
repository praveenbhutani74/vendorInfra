import { createFileRoute } from "@tanstack/react-router";

import { mailErrorResponse, jsonResponse, parseJsonRequest } from "@/lib/api-response.server";
import { sendInquiryMail } from "@/lib/mail.server";

export const Route = createFileRoute("/api/demo-bookings")({
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
      },
    },
  },
});

