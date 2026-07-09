/* Close the <details> dropdown(s) on outside-click and Escape.
   The menu still opens/closes via the summary without JS; this only adds
   the dismiss behaviour native <details> lacks.
   Also wires the mobile hamburger (.nav-toggle) that collapses the primary
   nav on narrow screens; it opens/closes via a data-open attribute so the
   nav is still just plain links/markup underneath. */
(() => {
  "use strict";
  const menus = document.querySelectorAll("details.menu");

  document.addEventListener("click", (e) => {
    menus.forEach((m) => {
      if (m.open && !m.contains(e.target)) m.open = false;
    });
  });

  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    menus.forEach((m) => {
      if (m.open) {
        m.open = false;
        m.querySelector("summary")?.focus();
      }
    });
  });

  const toggle = document.querySelector(".nav-toggle");
  const nav = document.getElementById("primary-nav");
  if (toggle && nav) {
    const setOpen = (v) => {
      nav.toggleAttribute("data-open", v);
      toggle.setAttribute("aria-expanded", String(v));
    };
    toggle.addEventListener("click", () => setOpen(!nav.hasAttribute("data-open")));
    nav.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setOpen(false)));
    document.addEventListener("click", (e) => {
      if (nav.hasAttribute("data-open") && !nav.contains(e.target) && !toggle.contains(e.target)) setOpen(false);
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && nav.hasAttribute("data-open")) {
        setOpen(false);
        toggle.focus();
      }
    });
  }
})();
