# Root site responsive browser verification

**Date:** 2026-09-29

**Browser:** Google Chrome 154.0.8037.58, headless through Chrome DevTools Protocol

**Site:** local HTTP server at `http://127.0.0.1:4173/`; CSS viewport widths, DPR 1

**Pages:** `index.html`, `bio.html`, `cv.html`, `other.html`, `projects.html`, `research.html`, and `work.html`

## Viewport and navigation results

The browser checked 320, 360, 375, 390, 430, 640, 767, 768, 820, 960, 1024, 1280, and 1440 CSS pixels on each of the seven pages. All **91/91** combinations passed `documentElement.scrollWidth <= clientWidth`; the raw per-page matrix is in [responsive-matrix.json](responsive-matrix.json).

At 390px, every page exposes the shared seven-destination mobile menu and marks its current destination. On each page, opening, Escape-close with focus return, outside-click close, and link activation close passed. At the 768px breakpoint, the mobile toggle is hidden and desktop links are visible.

## Page-specific behavior

- **Home:** portrait, identity, summary, primary links, and capability groups stack in the expected order; full page can scroll to the footer. Captures: [320px](index-320.png) and [390px](home-390.png).
- **Bio:** long biography and metadata remain within the page width. Capture: [320px](bio-320.png).
- **CV:** the “Open or download CV (PDF)” action is visible above the fluid inline PDF frame at 320px. Capture: [320px](cv-320.png).
- **Other:** both carousels expose 44px-high Previous/Pause/Next controls. Next and Previous update the current slide and announcement; manual interaction pauses auto-advance for at least 4.2 seconds; Resume restores it. With `prefers-reduced-motion: reduce`, autoplay is disabled and the toggle explains why. The Academic & Technical Writing section uses six semantic list items under two headings, wraps its title at 320px, and keeps the desktop composition at 1440px; 320, 360, 390, 430, 640, 767, 768, 1024, and 1440px all pass the section bounds/overflow checks. Captures: [page top at 320px](other-320.png), [writing section at 320px](writing-320.png), [390px](writing-390.png), [768px](writing-768.png), and [1440px](writing-1440.png).
- **Projects:** all six product iframes remain lazy and all six have a direct-open action at 390px. Capture: [320px](projects-320.png).
- **Research:** at page load all six live PDF.js cards are idle with zero rendered page thumbnails. Scrolling the first card near the viewport loads that card and its 11 pages while the other five remain idle. Tapping its first thumbnail opens the mapped PDF at `#page=1` in a new tab. The wordcloud iframe is lazy and has a direct-open action. Touch emulation hides the hover popup. At 1024px and 1440px the mouse hover popup remains in the viewport, does not overlap the thumbnail, and hides on pointer exit. Captures: [320px](research-320.png), [1024px hover](research-hover-1024.png), and [1440px hover](research-hover-1440.png).
- **Work:** all 25 mockup images declare lazy loading; the phone preview is 280px wide at 390px and remains inside the viewport. Yukuaidi stays one column on a phone and uses its three-column layout at 1024px. Capture: [320px](work-320.png).

The dedicated Writing section's per-width measurements, list semantics, and marker-color checks are also available in [writing-section-smoke.json](writing-section-smoke.json).

## Limits

This verification uses Chromium's emulated viewport and input capabilities. It does not certify physical iPhone Safari or WeChat WebView behavior; neither real device/browser was available. VoiceOver and TalkBack were not tested. External preview services were checked for layout and direct-open fallbacks, not for live availability, sign-in, or product functionality.

The viewport and media checks ran through temporary local CDP harnesses. They were not added as permanent tests because the approved plan calls for normalized verification rather than tests duplicating these static CSS/JavaScript rules. Screenshots and the machine-readable width matrix are retained here.
