import { test } from "node:test";
import assert from "node:assert/strict";
import { localReply, getReply, isConfigured } from "../src/grok.js";

test("localReply greets on hello", () => {
  const reply = localReply("Hello there");
  assert.match(reply, /GrokBot Andromeda/);
});

test("localReply handles empty input", () => {
  assert.equal(localReply("   "), "Say something and I'll do my best to help.");
});

test("localReply echoes a statement", () => {
  const reply = localReply("the sky is blue");
  assert.match(reply, /the sky is blue/);
});

test("getReply falls back to local mode without an API key", async (t) => {
  const original = process.env.XAI_API_KEY;
  delete process.env.XAI_API_KEY;
  t.after(() => {
    if (original !== undefined) process.env.XAI_API_KEY = original;
  });

  assert.equal(isConfigured(), false);
  const { reply, source } = await getReply("hi");
  assert.equal(source, "local");
  assert.ok(reply.length > 0);
});

test("getReply rejects empty messages", async () => {
  await assert.rejects(() => getReply(""), /non-empty/);
});

test("getReply calls the xAI API when configured", async (t) => {
  const original = process.env.XAI_API_KEY;
  process.env.XAI_API_KEY = "test-key";
  t.after(() => {
    if (original === undefined) delete process.env.XAI_API_KEY;
    else process.env.XAI_API_KEY = original;
  });

  let capturedUrl;
  let capturedInit;
  const fakeFetch = async (url, init) => {
    capturedUrl = url;
    capturedInit = init;
    return {
      ok: true,
      status: 200,
      json: async () => ({
        choices: [{ message: { content: "Hello from Grok!" } }],
      }),
    };
  };

  const { reply, source } = await getReply("hi", { fetchImpl: fakeFetch });
  assert.equal(source, "grok");
  assert.equal(reply, "Hello from Grok!");
  assert.match(capturedUrl, /x\.ai/);
  assert.match(capturedInit.headers.Authorization, /Bearer test-key/);
});

test("getReply surfaces xAI API errors", async (t) => {
  const original = process.env.XAI_API_KEY;
  process.env.XAI_API_KEY = "test-key";
  t.after(() => {
    if (original === undefined) delete process.env.XAI_API_KEY;
    else process.env.XAI_API_KEY = original;
  });

  const fakeFetch = async () => ({
    ok: false,
    status: 401,
    text: async () => "unauthorized",
  });

  await assert.rejects(() => getReply("hi", { fetchImpl: fakeFetch }), /401/);
});
