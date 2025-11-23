let heartCount = 0;
let coinCount = 100;
let copyCount = 0;

const heartDisplay = document.getElementById("heartCount");
const coinDisplay = document.getElementById("coinCount");
const copyDisplay = document.getElementById("copyCount");
const historyList = document.getElementById("history-list");
const clearBtn = document.getElementById("clear-btn");

heartDisplay.textContent = heartCount;
coinDisplay.textContent = coinCount;
copyDisplay.textContent = copyCount;

// Heart click handler
document.querySelectorAll(".love-icon").forEach((btn) => {
  btn.addEventListener("click", () => {
    heartCount++;
    heartDisplay.textContent = heartCount;
  });
});

// Copy buttons handler
document.querySelectorAll(".copy-btn").forEach((btn) => {
  btn.addEventListener("click", async (e) => {
    const card = e.target.closest(".card");
    const number = card?.querySelector(".number")?.textContent.trim();
    if (!number) return alert("Number not found");

    try {
      await navigator.clipboard.writeText(number);
    } catch {
      return alert("Copy not supported on this device");
    }

    copyCount++;
    copyDisplay.textContent = copyCount;
    alert(`Copied: ${number}`);
  });
});

// Call buttons
document.querySelectorAll(".call-btn").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const card = e.target.closest(".card");
    const title = card
      ?.querySelector("h1.font-bold.text-lg")
      ?.textContent.trim();
    const number = card?.querySelector(".number")?.textContent.trim();

    if (!title || !number) return;

    if (coinCount < 20) return alert("Not enough coins!");

    coinCount -= 20;
    coinDisplay.textContent = coinCount;

    alert(`Calling ${title}: ${number}`);

    const li = document.createElement("li");
    li.className = "border-b pb-1 mt-2";
    li.textContent = `${title} - ${number} at ${new Date().toLocaleString()}`;
    historyList.appendChild(li);
  });
});

// Clear history
clearBtn?.addEventListener("click", () => (historyList.innerHTML = ""));
