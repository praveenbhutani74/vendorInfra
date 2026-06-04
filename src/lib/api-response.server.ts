import { ZodError } from "zod";

export function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json; charset=utf-8" },
  });
}

export async function parseJsonRequest(request: Request) {
  try {
    return await request.json();
  } catch {
    throw new Error("Invalid JSON body");
  }
}

export function mailErrorResponse(error: unknown) {
  console.error(error);

  if (error instanceof ZodError) {
    return jsonResponse({ error: "Please check the form details and try again." }, 400);
  }

  if (error instanceof Error && error.message === "Invalid JSON body") {
    return jsonResponse({ error: "Invalid request body." }, 400);
  }

  return jsonResponse({ error: "Unable to send request right now." }, 500);
}

