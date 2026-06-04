import { createFileRoute } from "@tanstack/react-router";

import { mailErrorResponse, jsonResponse, parseJsonRequest } from "@/lib/api-response.server";
import { sendInquiryMail } from "@/lib/mail.server";

export const Route = createFileRoute("/api/contact")({
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
      },
    },
  },
});

