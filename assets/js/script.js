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
let value=0;
toggleButton.addEventListener("click", function () {
  
  // Zoho Pagesense (Test)
  value=value+1;
  var activityName = 'key';
  var activityJSON = {'value': value};
  window.pagesense = window.pagesense || [];
  window.pagesense.push(['trackActivity', activityName, activityJSON]);
  
  const mobileNav = document.querySelector(".navbar.active");
  isGreek = !isGreek;
  isGreek
    ? ((toggleButton.innerText = "Ελληνικά"),
      englishContent.forEach((element) => (element.style.display = "none")),
      (greekContent[0].style.display = "flex"),
      greekContent.forEach(
        (element, index) => index !== 0 && (element.style.display = "grid")
      ),
      mobileNav
        ? (greekContent[0].style.flexDirection = "column")
        : (greekContent[0].style.flexDirection = "row"))
    : ((toggleButton.innerText = "English"),
      greekContent.forEach((element) => (element.style.display = "none")),
      (englishContent[0].style.display = "flex"),
      englishContent.forEach(
        (element, index) => index !== 0 && (element.style.display = "grid")
      ),
      mobileNav
        ? (englishContent[0].style.flexDirection = "column")
        : (englishContent[0].style.flexDirection = "row"));
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
