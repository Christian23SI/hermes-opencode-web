/**
 * Lumio AI — landing page script.
 * Vanilla JS: mobile menu, scroll effects, reveal animations, form feedback.
 */

(function () {
  "use strict";

  // ---------- Mobile menu ----------
  var navToggle = document.getElementById("navToggle");
  var nav = document.getElementById("nav");

  if (navToggle && nav) {
    var isOpen = false;

    function toggleOpen() {
      isOpen = !isOpen;
      navToggle.classList.toggle("nav__toggle--open", isOpen);
      nav.classList.toggle("open", isOpen);
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    }

    navToggle.addEventListener("click", toggleOpen);

    // Close the menu when a link is clicked.
    nav.addEventListener("click", function (e) {
      var link = e.target.closest("a");
      if (link && link.getAttribute("href") !== "#") {
        toggleOpen();
      }
    });

    // Close on Escape.
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && isOpen) {
        toggleOpen();
        navToggle.focus();
      }
    });
  }

  // ---------- Scroll effects ----------
  var header = document.getElementById("header");
  if (header) {
    var headerObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          // Header stays transparent until it overlaps the top of the page.
          if (entry.intersectionRatio <= 0) {
            document.body.classList.add("scrolled");
          } else {
            document.body.classList.remove("scrolled");
          }
        });
      },
      { rootMargin: "-48px 0px -48px 0px" }
    );
    headerObserver.observe(header);
  }

  // Active nav link highlighting based on the section in view.
  var sections = Array.prototype.slice.call(
    document.querySelectorAll("main section[id]")
  );
  if (sections.length) {
    var sectionObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var id = entry.target.getAttribute("id");
            var links = Array.prototype.slice.call(
              document.querySelectorAll(".nav__link")
            );
            links.forEach(function (link) {
              link.classList.remove("nav__link--active");
              if (link.getAttribute("href") === "#" + id) {
                link.classList.add("nav__link--active");
              }
            });
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach(function (section) {
      sectionObserver.observe(section);
    });
  }

  // ---------- Reveal on scroll ----------
  var revealElements = Array.prototype.slice.call(
    document.querySelectorAll(".reveal")
  );

  if (revealElements.length) {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealElements.forEach(function (el) {
      revealObserver.observe(el);
    });
  }

  // ---------- Contact form (no backend) ----------
  var form = document.getElementById("contactForm");
  var status = document.getElementById("formStatus");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      status.textContent = "";

      var data = new FormData(form);
      var name = data.get("name")?.trim();
      var email = data.get("email")?.trim();
      var service = data.get("service");
      var message = data.get("message")?.trim();

      // Basic client-side validation (visual only; no JS syntax reliance).
      if (!name || !email || !service) {
        status.textContent = "Mohon isi nama, email, dan layanan terlebih dahulu.";
        status.className = "form__status";
        return;
      }

      // Validate email format.
      var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        status.textContent = "Format email tidak valid.";
        status.className = "form__status";
        return;
      }

      // Simulated submission — in production this would POST to an endpoint.
      status.textContent = "Terima kasih, " + name + "! Kami akan hubungi Anda segera.";
      status.className = "form__status form__status--success";

      // Reset the form visually after a short delay.
      setTimeout(function () {
        form.reset();
      }, 3500);
    });
  }
})();
