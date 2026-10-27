
/* ==============================
   MOBILE NAVIGATION
============================== */

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const navItems = document.querySelectorAll(".nav-link");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Close navigation menu" : "Open navigation menu"
    );

    menuToggle.textContent = isOpen ? "✕" : "☰";
  });

  navItems.forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation menu");
      menuToggle.textContent = "☰";
    });
  });
}

/* ==============================
   FOOTER YEAR
============================== */

const currentYear = document.getElementById("currentYear");

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

/* ==============================
   TYPING ANIMATION
============================== */

const typingText = document.getElementById("typingText");

const roles = [
  "Web Developer",
  "Mern Stack Developer",
  "Python Backend Developer",
  "Problem Solver"
];

let roleIndex = 0;
let characterIndex = 0;
let deleting = false;

function typeRole() {
  if (!typingText) return;

  const currentRole = roles[roleIndex];

  characterIndex += deleting ? -1 : 1;

  typingText.textContent = currentRole.substring(
    0,
    characterIndex
  );

  let delay = deleting ? 45 : 85;

  if (!deleting && characterIndex === currentRole.length) {
    deleting = true;
    delay = 1400;
  } else if (deleting && characterIndex === 0) {
    deleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    delay = 350;
  }

  window.setTimeout(typeRole, delay);
}

if (typingText) {
  typeRole();
}

/* ==============================
   SCROLL REVEAL
============================== */

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12
    }
  );

  revealElements.forEach((element) => {
    revealObserver.observe(element);
  });
} else {
  revealElements.forEach((element) => {
    element.classList.add("visible");
  });
}

/* ==============================
   ACTIVE NAV LINK
============================== */

const sections = document.querySelectorAll("main section[id]");

if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;

          navItems.forEach((link) => {
            const isActive =
              link.getAttribute("href") === `#${sectionId}`;

            link.classList.toggle("active", isActive);
          });
        }
      });
    },
    {
      rootMargin: "-35% 0px -55% 0px"
    }
  );

  sections.forEach((section) => {
    sectionObserver.observe(section);
  });
}

/* ==============================
   CONTACT FORM
   FormSubmit email service
============================== */

const contactForm = document.getElementById("contactForm");
const portfolioEmail = "samirdas4401@gmail.com";

const emailDisplay = document.getElementById("emailDisplay");
const formStatus = document.getElementById("formStatus");

if (emailDisplay) {
  emailDisplay.textContent = portfolioEmail;
}

if (contactForm) {
  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const submitButton = contactForm.querySelector(
      'button[type="submit"]'
    );

    const name = document.getElementById("name")?.value.trim() || "";
    const senderEmail =
      document.getElementById("email")?.value.trim() || "";
    const message =
      document.getElementById("message")?.value.trim() || "";

    if (!name || !senderEmail || !message) {
      if (formStatus) {
        formStatus.textContent = "Please fill in all fields.";
      } else {
        alert("Please fill in all fields.");
      }
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(senderEmail)) {
      if (formStatus) {
        formStatus.textContent = "Please enter a valid email address.";
      } else {
        alert("Please enter a valid email address.");
      }
      return;
    }

    const originalButtonText = submitButton
      ? submitButton.textContent
      : "Send Message";

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = "Sending...";
    }

    if (formStatus) {
      formStatus.textContent = "Submitting your message...";
    }

    try {
      const response = await fetch(
        `https://formsubmit.co/ajax/${portfolioEmail}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          body: JSON.stringify({
            name: name,
            email: senderEmail,
            message: message,
            _subject: `New Portfolio Message from ${name}`,
            _template: "table",
            _captcha: "false"
          })
        }
      );

      let result;

      try {
        result = await response.json();
      } catch {
        throw new Error(
          "The email service returned an unreadable response."
        );
      }

      console.log("FormSubmit HTTP status:", response.status);
      console.log("FormSubmit response:", result);

      if (!response.ok) {
        throw new Error(
          result.message || `Request failed (${response.status}).`
        );
      }

      if (
        result.success === true ||
        String(result.success).toLowerCase() === "true"
      ) {
        if (formStatus) {
          formStatus.textContent =
            "Message sent successfully! Thank you for contacting me.";
        }

        contactForm.reset();
      } else {
        throw new Error(
          result.message || "The email service did not accept the submission."
        );
      }
    } catch (error) {
      console.error("Contact form error:", error);

      if (formStatus) {
        formStatus.textContent =
          "Unable to confirm submission: " +
          (error.message || "Please try again later.");
      } else {
        alert(
          "Unable to submit your message. Please try again or email " +
          portfolioEmail
        );
      }
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = originalButtonText;
      }
    }
  });
}

/* ==============================
   BACK TO TOP BUTTON
============================== */

const backToTop = document.getElementById("backToTop");

if (backToTop) {
  window.addEventListener(
    "scroll",
    () => {
      backToTop.classList.toggle(
        "visible",
        window.scrollY > 450
      );
    },
    {
      passive: true
    }
  );

  backToTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}
