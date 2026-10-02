(() => {
  const mobileBreakpoint = window.matchMedia("(max-width: 767px)");

  function normalizePath(pathname) {
    let path = pathname.replace(/\/+$/, "") || "/";
    if (path.endsWith("/index.html")) {
      path = path.slice(0, -"index.html".length) || "/";
    }
    return path === "/" ? path : path.replace(/\/+$/, "");
  }

  function initializeNavigation(nav) {
    const desktopLinks = nav.querySelector("[data-site-desktop-links]");
    const toggle = nav.querySelector("[data-site-mobile-toggle]");

    if (!desktopLinks || !toggle) return;

    const sourceLinks = Array.from(desktopLinks.querySelectorAll("a[href]"));
    if (sourceLinks.length === 0) return;

    const panel = document.createElement("div");
    panel.id = toggle.getAttribute("aria-controls") || "site-mobile-navigation";
    panel.setAttribute("data-site-mobile-panel", "");
    panel.setAttribute("role", "group");
    panel.setAttribute("aria-label", "Mobile navigation");
    panel.hidden = true;

    const currentPath = normalizePath(window.location.pathname);
    sourceLinks.forEach((sourceLink) => {
      const link = document.createElement("a");
      const href = sourceLink.getAttribute("href");
      const linkPath = normalizePath(new URL(href, window.location.href).pathname);

      link.href = href;
      link.textContent = sourceLink.textContent.trim();
      link.setAttribute("data-site-mobile-nav-link", "");

      if (linkPath === currentPath) {
        link.setAttribute("aria-current", "page");
      }

      panel.appendChild(link);
    });

    nav.appendChild(panel);
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open navigation menu");
    nav.setAttribute("data-mobile-nav-ready", "");

    function setOpen(open) {
      if (open && !mobileBreakpoint.matches) return;

      if (open) {
        nav.setAttribute("data-mobile-nav-open", "");
        panel.hidden = false;
        toggle.setAttribute("aria-expanded", "true");
        toggle.setAttribute("aria-label", "Close navigation menu");
      } else {
        nav.removeAttribute("data-mobile-nav-open");
        panel.hidden = true;
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Open navigation menu");
      }
    }

    toggle.addEventListener("click", () => {
      setOpen(toggle.getAttribute("aria-expanded") !== "true");
    });

    panel.addEventListener("click", (event) => {
      if (event.target.closest("a[data-site-mobile-nav-link]")) setOpen(false);
    });

    document.addEventListener("click", (event) => {
      if (
        nav.hasAttribute("data-mobile-nav-open") &&
        !panel.contains(event.target) &&
        !toggle.contains(event.target)
      ) {
        setOpen(false);
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && nav.hasAttribute("data-mobile-nav-open")) {
        setOpen(false);
        toggle.focus();
      }
    });

    const closeWhenDesktop = (event) => {
      if (!event.matches) setOpen(false);
    };
    if (mobileBreakpoint.addEventListener) {
      mobileBreakpoint.addEventListener("change", closeWhenDesktop);
    } else {
      mobileBreakpoint.addListener(closeWhenDesktop);
    }
  }

  document.querySelectorAll("nav").forEach(initializeNavigation);
})();
