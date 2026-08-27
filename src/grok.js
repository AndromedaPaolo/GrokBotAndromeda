const XAI_API_URL = process.env.XAI_API_URL || "https://api.x.ai/v1/chat/completions";
const XAI_MODEL = process.env.XAI_MODEL || "grok-2-latest";

const SYSTEM_PROMPT =
  "You are GrokBot Andromeda, a concise, friendly and slightly witty assistant.";

/**
 * Produce a deterministic local reply. Used when no XAI_API_KEY is configured,
 * so the app remains fully runnable end-to-end without any external secret.
 */
export function localReply(message) {
  const text = String(message ?? "").trim();
  if (!text) {
    return "Say something and I'll do my best to help.";
  }

  const lowered = text.toLowerCase();
  if (/\b(hi|hello|hey|yo)\b/.test(lowered)) {
    return "Hey there! I'm GrokBot Andromeda (running in local mode). How can I help?";
  }
  if (lowered.includes("help")) {
    return "I'm in local fallback mode. Set an XAI_API_KEY to unlock full Grok responses. Meanwhile, ask me anything!";
  }
  if (text.endsWith("?")) {
    return `Great question about "${text}". With an XAI_API_KEY I could answer for real; for now here's a friendly local echo.`;
  }
  return `You said: "${text}". (Local mode — add an XAI_API_KEY for real Grok answers.)`;
}

export function isConfigured() {
  return Boolean(process.env.XAI_API_KEY);
}

/**
 * Get a chat reply. Calls the xAI Grok API when XAI_API_KEY is set, otherwise
 * returns a deterministic local reply.
 * @returns {Promise<{reply: string, source: "grok"|"local"}>}
 */
export async function getReply(message, { fetchImpl = fetch } = {}) {
  const text = String(message ?? "").trim();
  if (!text) {
    const error = new Error("Message must be a non-empty string.");
    error.statusCode = 400;
    throw error;
  }

  if (!isConfigured()) {
    return { reply: localReply(text), source: "local" };
  }

  const response = await fetchImpl(XAI_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.XAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: XAI_MODEL,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: text },
      ],
    }),
  });

  if (!response.ok) {
    const body = await response.text().catch(() => "");
    const error = new Error(
      `xAI API error (${response.status}): ${body.slice(0, 500)}`
    );
    error.statusCode = 502;
    throw error;
  }

  const data = await response.json();
  const reply = data?.choices?.[0]?.message?.content?.trim();
  if (!reply) {
    const error = new Error("xAI API returned an empty response.");
    error.statusCode = 502;
    throw error;
  }

  return { reply, source: "grok" };
}
