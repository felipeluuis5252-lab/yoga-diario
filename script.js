// =========================================================
// YOGA DIÁRIO — script.js
// =========================================================

// -----------------------------------------------------
// CHECKOUT LINK
// Change this one URL and every "START"/"GET ACCESS"
// button on the page will point to it automatically.
// -----------------------------------------------------
const CHECKOUT_URL = "https://pay.hotmart.com/U5885677J?sck=HOTMART_PRODUCT_PAGE&off=zdnla3kd&hotfeature=32&bid=1790497149510";

document.addEventListener("DOMContentLoaded", () => {

  // Point every CTA button to the checkout link
  document.querySelectorAll(".js-cta").forEach((el) => {
    el.setAttribute("href", CHECKOUT_URL);
    el.setAttribute("target", "_blank");
    el.setAttribute("rel", "noopener noreferrer");
  });

  // -----------------------------------------------------
  // Mobile navigation menu
  // -----------------------------------------------------
  const navToggle = document.querySelector(".nav-toggle");
  const navMobile = document.querySelector(".nav-mobile");

  if (navToggle && navMobile) {
    navToggle.addEventListener("click", () => {
      const isOpen = navMobile.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    // Close the mobile menu after tapping a link
    navMobile.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navMobile.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // -----------------------------------------------------
  // FAQ accordion
  // -----------------------------------------------------
  document.querySelectorAll(".faq-item").forEach((item) => {
    const question = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");

    question.addEventListener("click", () => {
      const isOpen = item.classList.contains("open");

      // Close all other items
      document.querySelectorAll(".faq-item.open").forEach((openItem) => {
        if (openItem !== item) {
          openItem.classList.remove("open");
          openItem.querySelector(".faq-question").setAttribute("aria-expanded", "false");
          openItem.querySelector(".faq-answer").style.maxHeight = null;
        }
      });

      if (isOpen) {
        item.classList.remove("open");
        question.setAttribute("aria-expanded", "false");
        answer.style.maxHeight = null;
      } else {
        item.classList.add("open");
        question.setAttribute("aria-expanded", "true");
        answer.style.maxHeight = answer.scrollHeight + "px";
      }
    });

    // Keyboard accessibility (Enter / Space handled natively by <button>)
  });

  // -----------------------------------------------------
  // Subtle scroll reveal animation
  // -----------------------------------------------------
  const revealEls = document.querySelectorAll(".reveal");
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    revealEls.forEach((el) => el.classList.add("in-view"));
  } else {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealEls.forEach((el) => observer.observe(el));
  }
});
