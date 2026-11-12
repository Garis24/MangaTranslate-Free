import { CHROME_WEB_STORE_URL, PLUS_CHECKOUT_URL } from "./site-config.js";

document.querySelector("#year").textContent = String(new Date().getFullYear());

const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector("#main-nav");
menuToggle.addEventListener("click", () => {
  const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isExpanded));
  mainNav.classList.toggle("is-open", !isExpanded);
});
mainNav.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    menuToggle.setAttribute("aria-expanded", "false");
    mainNav.classList.remove("is-open");
  }
});

for (const link of document.querySelectorAll("[data-store-cta]")) {
  if (CHROME_WEB_STORE_URL) {
    link.href = CHROME_WEB_STORE_URL;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    continue;
  }
  link.href = "#install";
  link.setAttribute("aria-disabled", "true");
  link.addEventListener("click", (event) => {
    event.preventDefault();
    document.querySelector("#install").scrollIntoView({ behavior: "smooth" });
  });
}

for (const note of document.querySelectorAll("[data-store-note]")) {
  if (CHROME_WEB_STORE_URL) {
    note.textContent = "Disponible sur le Chrome Web Store.";
  }
}

for (const link of document.querySelectorAll("[data-plus-cta]")) {
  if (PLUS_CHECKOUT_URL) {
    link.href = PLUS_CHECKOUT_URL;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  } else {
    link.href = "#faq";
    link.setAttribute("aria-label", "Découvrir l’offre Plus et son statut de disponibilité");
  }
}

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const target = document.querySelector(link.getAttribute("href"));
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth" });
  });
});
