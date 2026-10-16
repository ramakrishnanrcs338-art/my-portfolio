
// ======================================================
// RAMKI PORTFOLIO — CONFIGURATION
// Replace these values with your actual details.
// ======================================================

const CONFIG = {
  email: "ramakrishnanrcs338@gmail.com",
  phone: "6379696616",

  linkedin: "https://www.linkedin.com/in/ramakrishnan-r-433819347/",
  github: "https://github.com/ramakrishnanrcs338-art",

  // Keep empty until these URLs actually exist.
  projectDemo: "",
  projectSource: ""
};

// ======================================================
// MOBILE NAVIGATION
// ======================================================

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

function closeMenu() {
  navLinks.classList.remove("is-open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation menu");
  document.body.classList.remove("menu-open");
}

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("is-open");

  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Close navigation menu" : "Open navigation menu"
  );

  document.body.classList.toggle("menu-open", isOpen);
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeMenu);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMenu();
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 760) closeMenu();
});

// ======================================================
// PROJECT DETAILS BUTTON
// ======================================================

const viewDetailsButton = document.getElementById("viewDetails");
const projectDetails = document.getElementById("projectDetails");

viewDetailsButton.addEventListener("click", () => {
  const isOpening = projectDetails.hidden;

  projectDetails.hidden = !isOpening;
  viewDetailsButton.setAttribute("aria-expanded", String(isOpening));

  viewDetailsButton.innerHTML = isOpening
    ? 'Hide Details <span aria-hidden="true">↗</span>'
    : 'View Details <span aria-hidden="true">↗</span>';
});

// ======================================================
// IMAGE PLACEHOLDERS
// ======================================================

document.querySelectorAll("[data-optional-image]").forEach((img) => {
  const placeholder = img.parentElement.querySelector(
    "[data-image-placeholder]"
  );

  function showPlaceholder() {
    img.hidden = true;
    if (placeholder) placeholder.hidden = false;
  }

  function showImage() {
    if (img.naturalWidth > 0) {
      img.hidden = false;
      if (placeholder) placeholder.hidden = true;
    } else {
      showPlaceholder();
    }
  }

  img.addEventListener("load", showImage);
  img.addEventListener("error", showPlaceholder);

  if (img.complete) showImage();
});

// ======================================================
// VALIDATE EXTERNAL HTTPS LINKS
// ======================================================

function getSafeHttpsUrl(value) {
  if (typeof value !== "string" || !value.trim()) {
    return null;
  }

  try {
    const url = new URL(value.trim());

    if (url.protocol !== "https:" || !url.hostname.includes(".")) {
      return null;
    }

    return url.href;
  } catch {
    return null;
  }
}

// ======================================================
// LINKEDIN AND GITHUB
// ======================================================

function configureProfile(key) {
  const link = document.querySelector(`[data-profile="${key}"]`);
  const pending = document.querySelector(
    `[data-profile-pending="${key}"]`
  );

  if (!link) return;

  const safeUrl = getSafeHttpsUrl(CONFIG[key]);

  if (safeUrl) {
    link.href = safeUrl;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.hidden = false;

    if (pending) pending.hidden = true;
  } else {
    link.hidden = true;
    if (pending) pending.hidden = false;
  }
}

configureProfile("linkedin");
configureProfile("github");

// ======================================================
// OPTIONAL PROJECT LINKS
// ======================================================

function configureProjectLink(key) {
  const link = document.querySelector(
    `[data-project-link="${key}"]`
  );

  if (!link) return;

  const safeUrl = getSafeHttpsUrl(CONFIG[key]);

  if (safeUrl) {
    link.href = safeUrl;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.hidden = false;
  } else {
    link.hidden = true;
    link.removeAttribute("href");
  }
}

configureProjectLink("projectDemo");
configureProjectLink("projectSource");

// ======================================================
// CONTACT DETAILS
// ======================================================

const emailDisplay = document.querySelector("[data-contact-email]");
const phoneDisplay = document.querySelector("[data-contact-phone]");
const contactButton = document.querySelector("[data-contact-button]");
const contactNote = document.getElementById("contactNote");

function configureContact() {
  const email = CONFIG.email.trim();
  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  if (validEmail) {
    // Display a clickable email address.
    const emailLink = document.createElement("a");
    emailLink.href = `mailto:${email}`;
    emailLink.textContent = email;
    emailLink.className = "text-link";

    emailDisplay.replaceChildren(emailLink);

    // Enable the main Contact Me button.
    contactButton.href = `mailto:${email}`;
    contactButton.removeAttribute("aria-disabled");
    contactButton.removeAttribute("tabindex");

    contactNote.textContent =
      "Opens your default email application. Sending depends on your email setup.";
  } else {
    emailDisplay.textContent = "Email not configured";
    contactButton.href = "#contact";
    contactButton.setAttribute("aria-disabled", "true");
    contactButton.setAttribute("tabindex", "-1");

    contactNote.textContent =
      "Add a valid email address in the CONFIG section.";
  }

  // Configure optional phone contact.
  const phone = CONFIG.phone.trim();

  if (phone) {
    const dialable = phone.replace(/[^\d+]/g, "");

    phoneDisplay.textContent = phone;

    if (/^\+?\d{7,15}$/.test(dialable)) {
      const phoneLink = document.createElement("a");
      phoneLink.href = `tel:${dialable}`;
      phoneLink.textContent = phone;
      phoneLink.className = "text-link";

      phoneDisplay.replaceChildren(phoneLink);
    }
  } else {
    phoneDisplay.textContent = "Optional — not provided";
  }
}

configureContact();

// ======================================================
// SCROLL REVEAL ANIMATIONS
// ======================================================

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.08,
      rootMargin: "0px 0px -25px 0px"
    }
  );

  revealElements.forEach((element) => {
    revealObserver.observe(element);
  });
} else {
  revealElements.forEach((element) => {
    element.classList.add("is-visible");
  });
}

// ======================================================
// CURRENT COPYRIGHT YEAR
// ======================================================

document.getElementById("copyrightYear").textContent =
  new Date().getFullYear();
