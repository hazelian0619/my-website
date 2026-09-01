(function () {
  "use strict";

  var config = window.siteConfig || {};
  var identity = config.identity || {};
  var navigation = config.navigation || [];
  var copy = config.copy || {};

  function escapeHtml(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function link(value, fallback) {
    return escapeHtml(value || fallback || "#");
  }

  function renderChrome() {
    var pageKey = document.body.getAttribute("data-page") || "home";
    var nav = document.querySelector("[data-site-nav]");
    var footer = document.querySelector("[data-site-footer]");
    if (nav) {
      nav.innerHTML =
        '<div class="nav-inner">' +
        '<a class="brand" href="index.html">' + escapeHtml(identity.shortName || identity.name || "Your Name") + "</a>" +
        '<div class="nav-links" data-desktop-links>' + navigation.map(function (item) {
          return '<a class="nav-link" href="' + link(item.href) + '" data-nav-key="' + link(item.key) + '"' +
            (item.key === pageKey ? ' aria-current="page"' : "") + ">" + escapeHtml(item.label) + "</a>";
        }).join("") + "</div>" +
        '<button class="menu-toggle" type="button" aria-expanded="false" aria-controls="mobile-menu" aria-label="Open navigation"><span></span></button>' +
        '</div>' +
        '<div id="mobile-menu" class="mobile-panel" data-mobile-menu><div>' + navigation.map(function (item) {
          return '<a href="' + link(item.href) + '" data-nav-key="' + link(item.key) + '"' +
            (item.key === pageKey ? ' aria-current="page"' : "") + ">" + escapeHtml(item.label) + "</a>";
        }).join("") + "</div></div>";
    }
    if (footer) {
      footer.innerHTML = "<p>© " + new Date().getFullYear() + " " + escapeHtml(identity.shortName || identity.name || "Your Name") + ". Built with a lightweight open template.</p>";
    }
    initMobileMenu();
  }

  function initMobileMenu() {
    var toggle = document.querySelector(".menu-toggle");
    var panel = document.querySelector("[data-mobile-menu]");
    if (!toggle || !panel) return;
    function close() {
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Open navigation");
      panel.classList.remove("is-open");
    }
    toggle.addEventListener("click", function () {
      var open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      toggle.setAttribute("aria-label", open ? "Open navigation" : "Close navigation");
      panel.classList.toggle("is-open", !open);
    });
    panel.addEventListener("click", function (event) {
      if (event.target.closest("a")) close();
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") close();
    });
  }

  function renderHome() {
    var target = document.querySelector("[data-home-content]");
    if (!target) return;
    target.innerHTML =
      '<div class="home-grid">' +
      '<div class="avatar-container" data-avatar tabindex="0"><img class="avatar-main" src="' + link(identity.avatar, "images/avatar.jpg") + '" alt="Portrait of ' + escapeHtml(identity.name || "Your Name") + '"><img class="avatar-hover" src="' + link(identity.avatarHover, identity.avatar) + '" alt="Alternate portrait" aria-hidden="true"></div>' +
      '<div class="home-copy"><p class="eyebrow">' + escapeHtml(identity.location || "Independent practice") + '</p><h1 class="home-title">' + escapeHtml(identity.name || "Your Name") + '</h1><p class="home-role">' + escapeHtml(identity.role || "Researcher · Builder") + '</p><p class="home-affiliation">' + escapeHtml(identity.affiliation || "Independent research studio") + '</p><p class="home-tagline">' + escapeHtml(identity.tagline || "Turning questions into useful, shareable work.") + '</p>' +
      '<div class="home-groups"><div><p class="label">Core</p><ul class="dot-list">' + (copy.home && copy.home.core || []).map(function (item) { return "<li>" + escapeHtml(item) + "</li>"; }).join("") + '</ul></div><div><p class="label">Background</p><ul class="dot-list">' + (copy.home && copy.home.background || []).map(function (item) { return "<li>" + escapeHtml(item) + "</li>"; }).join("") + '</ul></div></div>' +
      '<div class="button-row"><a class="button" href="projects.html">Projects</a><a class="button" href="research.html">Research</a></div></div></div>';
    initAvatarSwap();
  }

  function initAvatarSwap() {
    var avatar = document.querySelector("[data-avatar]");
    if (!avatar) return;
    var hover = avatar.querySelector(".avatar-hover");
    if (!hover || !hover.getAttribute("src")) hover && hover.remove();
  }

  function renderBio() {
    var target = document.querySelector("[data-bio-content]");
    if (!target) return;
    target.innerHTML = '<div class="stack"><section class="section-block"><div class="section-head"><h2>About</h2><div class="section-meta">A short note<span>' + escapeHtml(identity.location || "Independent practice") + '</span></div></div><p>' + escapeHtml(copy.bio && copy.bio.intro) + '</p></section>' + sectionList("Education", "Background", copy.bio && copy.bio.education || []) + sectionList("Research focus", "Current threads", copy.bio && copy.bio.focus || []) + '</div>';
  }

  function sectionList(title, meta, items) {
    return '<section class="section-block"><div class="section-head"><h2>' + escapeHtml(title) + '</h2><div class="section-meta">' + escapeHtml(meta) + '</div></div><ul>' + items.map(function (item) { return '<li>' + escapeHtml(item) + '</li>'; }).join("") + '</ul></section>';
  }

  function renderResearch() {
    var target = document.querySelector("[data-research-content]");
    if (!target) return;
    target.innerHTML = '<div class="stack">' + (copy.research || []).map(function (item) {
      return '<article class="section-block"><div class="section-head"><h2>' + escapeHtml(item.title) + '</h2><div class="section-meta">' + escapeHtml(item.status) + '<span>' + escapeHtml(item.meta) + '</span></div></div><p class="label">Research problem</p><p>' + escapeHtml(item.problem) + '</p><p class="accent-heading">Approach</p><ul>' + (item.approach || []).map(function (point) { return '<li>' + escapeHtml(point) + '</li>'; }).join("") + '</ul><p class="section-subtitle">' + escapeHtml(item.subtitle) + '</p></article>';
    }).join("") + '</div>';
  }

  function renderProjects() {
    var target = document.querySelector("[data-projects-content]");
    if (!target) return;
    target.innerHTML = '<div class="project-grid">' + (copy.projects || []).map(function (item) {
      return '<article class="project-card"><a href="' + link(item.href) + '" aria-label="Open ' + escapeHtml(item.title) + '"><div class="project-image"><img src="' + link(item.image) + '" alt="' + escapeHtml(item.title) + ' preview" loading="lazy"></div><div class="project-body"><p class="project-type">' + escapeHtml(item.type) + '</p><h2>' + escapeHtml(item.title) + '</h2><p>' + escapeHtml(item.description) + '</p><ul class="tag-list">' + (item.tags || []).map(function (tag) { return '<li>' + escapeHtml(tag) + '</li>'; }).join("") + '</ul></div></a></article>';
    }).join("") + '</div>';
  }

  function renderWork() {
    var target = document.querySelector("[data-work-content]");
    if (!target) return;
    target.innerHTML = '<div class="work-list">' + (copy.work || []).map(function (item) { return '<article class="work-item"><div><h2>' + escapeHtml(item.title) + '</h2><time>' + escapeHtml(item.period) + '</time></div><p>' + escapeHtml(item.detail) + '</p></article>'; }).join("") + '</div>';
  }

  function renderCv() {
    var target = document.querySelector("[data-cv-content]");
    if (!target) return;
    target.innerHTML = '<div class="button-row" style="justify-content:flex-end; margin-bottom:18px;"><a class="button" href="' + link(config.links && config.links.cv, "files/cv.pdf") + '" download>Download CV</a></div><div class="cv-frame"><div class="cv-placeholder"><div><strong>CV preview</strong><p>Add your PDF at <code>files/cv.pdf</code>, or change <code>links.cv</code> in <code>content/site.js</code>.</p></div></div></div>';
  }

  function renderOther() {
    var target = document.querySelector("[data-other-content]");
    if (!target) return;
    target.innerHTML = '<div class="carousel-grid">' + (((copy.other || {}).cards) || []).map(function (card, index) {
      return '<article class="carousel-card"><div class="carousel-media" data-carousel data-interval="4000" data-carousel-index="' + index + '">' + (card.images || []).map(function (image, imageIndex) { return '<div class="carousel-slide' + (imageIndex === 0 ? ' is-active' : '') + '"><img src="' + link(image) + '" alt="' + escapeHtml(card.title) + ' image ' + (imageIndex + 1) + '" loading="lazy"></div>'; }).join("") + '<div class="carousel-controls"><button class="carousel-button" type="button" data-carousel-prev aria-label="Previous image">←</button><span class="carousel-status" data-carousel-status>1 / ' + ((card.images || []).length || 1) + '</span><button class="carousel-button" type="button" data-carousel-next aria-label="Next image">→</button></div></div><div class="carousel-copy"><p class="eyebrow">' + escapeHtml(card.icon) + ' ' + escapeHtml(card.subtitle) + '</p><h2>' + escapeHtml(card.title) + '</h2><p>' + escapeHtml(card.detail) + '</p></div></article>';
    }).join("") + '</div>';
    initCarousels();
  }

  function initCarousels() {
    document.querySelectorAll("[data-carousel]").forEach(function (carousel) {
      var slides = Array.prototype.slice.call(carousel.querySelectorAll(".carousel-slide"));
      if (!slides.length) return;
      var status = carousel.querySelector("[data-carousel-status]");
      var current = 0;
      var timer;
      function show(index) {
        current = (index + slides.length) % slides.length;
        slides.forEach(function (slide, slideIndex) { slide.classList.toggle("is-active", slideIndex === current); });
        if (status) status.textContent = (current + 1) + " / " + slides.length;
      }
      function stop() { if (timer) window.clearInterval(timer); timer = null; }
      function start() { stop(); if (slides.length > 1 && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) timer = window.setInterval(function () { show(current + 1); }, Number(carousel.getAttribute("data-interval")) || 4000); }
      var prev = carousel.querySelector("[data-carousel-prev]");
      var next = carousel.querySelector("[data-carousel-next]");
      if (prev) prev.addEventListener("click", function () { show(current - 1); start(); });
      if (next) next.addEventListener("click", function () { show(current + 1); start(); });
      carousel.addEventListener("mouseenter", stop); carousel.addEventListener("mouseleave", start); carousel.addEventListener("focusin", stop); carousel.addEventListener("focusout", start); start();
    });
  }

  function renderPage() {
    renderChrome();
    renderHome(); renderBio(); renderResearch(); renderProjects(); renderWork(); renderCv(); renderOther();
  }

  document.addEventListener("DOMContentLoaded", renderPage);
}());
