const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");
const roastLevelText = document.getElementById("roast-level");
const toggleModeBtn = document.getElementById("toggle-mode");

let roastLevel = parseInt(localStorage.getItem("roastLevel")) || 1;
let mode = localStorage.getItem("mode") || "roast";

const roasts = [
  "You're like a cloud — when you disappear, it's a beautiful day. ☀️",
  "You bring everyone so much joy… when you leave the room. 😎",
  "I’d agree with you, but then we’d both be wrong. 🤷‍♂️",
  "You have something on your chin… no, the third one down. 😂",
  "You're proof that evolution can go in reverse. 🧬",
  "You remind me of a cloud. Fluffy, useless, and always in the way. ☁️",
  "Somewhere out there, a tree is working hard to replace the oxygen you waste. 🌳"
];

const compliments = [
  "You’re doing amazing, keep shining! ✨",
  "You have great energy! 🌈",
  "Your smile could literally save the world. 😁",
  "You’re like sunshine on a rainy day. ☀️",
  "You have an awesome vibe, never lose it! 💫",
  "You're built different — in the best way. 🔥"
];

function addMessage(sender, text) {
  const msg = document.createElement("div");
  msg.classList.add("message", sender);
  msg.textContent = `${sender === "user" ? "You" : "Bot"}: ${text}`;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function getRandomReply() {
  if (mode === "roast") {
    return roasts[Math.floor(Math.random() * roasts.length)];
  } else {
    return compliments[Math.floor(Math.random() * compliments.length)];
  }
}

function updateRoastLevel() {
  roastLevel = Math.min(roastLevel + 1, 5);
  localStorage.setItem("roastLevel", roastLevel);
  roastLevelText.textContent = `Roast Level: ${roastLevel} 🔥`;
}

sendBtn.addEventListener("click", () => {
  const input = userInput.value.trim();
  if (!input) return;

  addMessage("user", input);
  userInput.value = "";

  setTimeout(() => {
    const reply = getRandomReply();
    addMessage("bot", reply);
    updateRoastLevel();
  }, 600);
});

toggleModeBtn.addEventListener("click", () => {
  mode = mode === "roast" ? "compliment" : "roast";
  localStorage.setItem("mode", mode);
  toggleModeBtn.textContent =
    mode === "roast"
      ? "Switch to Compliment Mode 💖"
      : "Switch to Roast Mode 🔥";
});

roastLevelText.textContent = `Roast Level: ${roastLevel} 🔥`;
toggleModeBtn.textContent =
  mode === "roast" ? "Switch to Compliment Mode 💖" : "Switch to Roast Mode 🔥";
