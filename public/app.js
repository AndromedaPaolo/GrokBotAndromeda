const form = document.getElementById("chat-form");
const input = document.getElementById("chat-input");
const sendButton = document.getElementById("send-button");
const messages = document.getElementById("messages");
const modeBadge = document.getElementById("mode-badge");

function scrollToBottom() {
  messages.scrollTop = messages.scrollHeight;
}

function addMessage(text, who, extraClass = "") {
  const wrapper = document.createElement("div");
  wrapper.className = `message message--${who} ${extraClass}`.trim();
  const bubble = document.createElement("div");
  bubble.className = "message__bubble";
  bubble.textContent = text;
  wrapper.appendChild(bubble);
  messages.appendChild(wrapper);
  scrollToBottom();
  return wrapper;
}

async function refreshMode() {
  try {
    const res = await fetch("/api/health");
    const data = await res.json();
    if (data.mode === "grok") {
      modeBadge.textContent = "Grok";
      modeBadge.classList.add("badge--grok");
    } else {
      modeBadge.textContent = "local mode";
    }
  } catch {
    modeBadge.textContent = "offline";
  }
}

async function sendMessage(text) {
  addMessage(text, "user");
  const typing = addMessage("GrokBot is typing…", "bot", "message--typing");
  sendButton.disabled = true;

  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: text }),
    });
    const data = await res.json();
    typing.remove();
    if (!res.ok) {
      addMessage(`Error: ${data.error || res.statusText}`, "bot");
      return;
    }
    addMessage(data.reply, "bot");
  } catch (err) {
    typing.remove();
    addMessage(`Network error: ${err.message}`, "bot");
  } finally {
    sendButton.disabled = false;
    input.focus();
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = input.value.trim();
  if (!text) return;
  input.value = "";
  sendMessage(text);
});

refreshMode();
input.focus();
