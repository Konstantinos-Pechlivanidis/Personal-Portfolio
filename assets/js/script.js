"use strict";

/**
 * add event listener on multiple elements
 */

const addEventOnElements = function (elements, eventType, callback) {
  for (let i = 0, len = elements.length; i < len; i++) {
    elements[i].addEventListener(eventType, callback);
  }
};

/**
 * NAVBAR TOGGLE FOR MOBILE
 */

const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const overlay = document.querySelector("[data-overlay]");

const navbarLinks = document.querySelectorAll(".navbar-link");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.classList.toggle("nav-active");
};

const toggleFromLinks = function () {
  navbar.classList.remove("active");
  overlay.classList.remove("active");
  document.body.classList.remove("nav-active");
};
addEventOnElements(navTogglers, "click", toggleNavbar);
addEventOnElements(navbarLinks, "click", toggleFromLinks);

/**
 * LANGUAGE BUTTON TOGGLE
 */
const toggleButton = document.getElementById("toggle-language-button");
const greekContent = document.querySelectorAll('[language="Greek"]');
const englishContent = document.querySelectorAll('[language="English"]');
let isGreek = true;

toggleButton.addEventListener("click", function () {
  isGreek = !isGreek;
  const currentLang = isGreek ? "Greek" : "English";
  const otherLang = isGreek ? "English" : "Greek";

  toggleButton.innerText = isGreek ? "Ελληνικά" : "English";

  document.querySelectorAll(`[language="${currentLang}"]`).forEach((el) => {
    el.style.display = "";
  });

  document.querySelectorAll(`[language="${otherLang}"]`).forEach((el) => {
    el.style.display = "none";
  });
});

/**
 * HEADER
 * active header when window scroll down to 100px
 */

const header = document.querySelector("[data-header]");

window.addEventListener("scroll", function () {
  if (window.scrollY > 100) {
    header.classList.add("active");
  } else {
    header.classList.remove("active");
  }
});

/**
 * SCROLL REVEAL
 */

const revealElements = document.querySelectorAll("[data-reveal]");
const revealDelayElements = document.querySelectorAll("[data-reveal-delay]");

const reveal = function () {
  for (let i = 0, len = revealElements.length; i < len; i++) {
    if (
      revealElements[i].getBoundingClientRect().top <
      window.innerHeight / 1.2
    ) {
      revealElements[i].classList.add("revealed");
    }
  }
};

for (let i = 0, len = revealDelayElements.length; i < len; i++) {
  revealDelayElements[i].style.transitionDelay =
    revealDelayElements[i].dataset.revealDelay;
}

window.addEventListener("scroll", reveal);
window.addEventListener("load", reveal);

const forms = document.querySelectorAll(".contact-form");

  forms.forEach((form) => {
    form.addEventListener("submit", async function (e) {
      e.preventDefault();
      const responseBox = document.getElementById("form-response");

      const formData = new FormData(form);
      try {
        const response = await fetch(form.action, {
          method: "POST",
          body: formData,
          headers: {
            Accept: "application/json",
          },
        });

        if (response.ok) {
          form.reset();
          responseBox.style.display = "block";
          responseBox.style.color = "green";
          responseBox.innerText = "✅ Το μήνυμά σας εστάλη με επιτυχία!";
        } else {
          throw new Error("Form submission failed");
        }
      } catch (error) {
        responseBox.style.display = "block";
        responseBox.style.color = "red";
        responseBox.innerText = "❌ Κάτι πήγε στραβά. Δοκιμάστε ξανά.";
      }
    });
  });
