// Initialize counts
let heartCount = 0;
let coinCount = 100;
let copyCount = 0;

// DOM elements (safe lookups)
const heartDisplay = document.getElementById("heartCount");
const coinDisplay = document.getElementById("coinCount");
const copyDisplay = document.getElementById("copyCount");
const historyList = document.getElementById("history-list");
const clearBtn = document.getElementById("clear-btn");

// Initialize UI values
if (coinDisplay) coinDisplay.textContent = coinCount;
if (heartDisplay) heartDisplay.textContent = heartCount;
if (copyDisplay) copyDisplay.textContent = copyCount;

// --- Heart (global count) ---
document.querySelectorAll(".love-icon").forEach((btn) => {
  btn.addEventListener("click", () => {
    heartCount++;
    if (heartDisplay) heartDisplay.textContent = heartCount;
  });
});

// --- Copy buttons ---
document.querySelectorAll(".copy-btn").forEach((btn) => {
  btn.addEventListener("click", async (e) => {
    const card = e.target.closest(".card");
    if (!card) return;

    const numEl = card.querySelector(".number");
    if (!numEl) {
      alert("Number not found");
      return;
    }
    const number = numEl.textContent.trim();

    try {
      // copy to clipboard
      await navigator.clipboard.writeText(number);
      copyCount++;
      if (copyDisplay) copyDisplay.textContent = copyCount;
      alert(`Copied: ${number}`);
    } catch (err) {
      // fallback for older browsers
      try {
        const textarea = document.createElement("textarea");
        textarea.value = number;
        textarea.style.position = "fixed";
        textarea.style.left = "-9999px";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
        copyCount++;
        if (copyDisplay) copyDisplay.textContent = copyCount;
        alert(`Copied (fallback): ${number}`);
      } catch (e) {
        alert("Unable to copy to clipboard");
      }
    }
  });
});

// --- Call buttons ---
document.querySelectorAll(".call-btn").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const card = e.target.closest(".card");
    if (!card) return;

    const titleEl = card.querySelector("h1.font-bold.text-lg");
    const numEl = card.querySelector(".number");
    if (!titleEl || !numEl) return;

    const serviceName = titleEl.textContent.trim();
    const number = numEl.textContent.trim();

    if (coinCount < 20) {
      alert("Do not have sufficient coins to make a call!");
      return;
    }

    // Deduct coins
    coinCount -= 20;
    if (coinDisplay) coinDisplay.textContent = coinCount;

    // Alert user
    alert(`Calling ${serviceName}: ${number}`);

    // Add to history with full local timestamp
    if (historyList) {
      const time = new Date().toLocaleString(); // local date & time
      const li = document.createElement("li");
      li.className = "border-b pb-1 mt-2";
      li.textContent = `${serviceName} - ${number} at ${time}`;
      historyList.appendChild(li);
    }
  });
});

// --- Clear history ---
if (clearBtn) {
  clearBtn.addEventListener("click", () => {
    if (historyList) historyList.innerHTML = "";
  });
}
