# Root site mobile responsiveness audit

**Scope:** the published personal site at `https://hazelian0619.github.io/my-website/` and its seven root HTML files. The independent `academic-website-template/` is not part of the live site.

**Method:** source read and live HTML identity check by the coordinator, plus two parallel read-only audits: one covering shared layout/navigation and one covering media-heavy pages. Findings below distinguish source evidence from rendered behavior. No agent edited site files.

## Baseline and ownership

- The live homepage returns `Lian - Portfolio` and references `assets/css/tailwind.local.css`; its `w-1/2` homepage classes match the root `index.html`. Root pages match `origin/main`.
- `academic-website-template/` is a separate, forkable template. Its own pages reference `assets/site.css` and `assets/site.js`. The template's responsive CSS is useful prior art, not an active stylesheet for the live site. See [template scope decision](/Users/pluviophile/website/docs/superpowers/specs/2026-09-01-academic-template-parity-design.md:5).
- Every root page has a viewport meta tag. The main issue is layout behavior and navigation, rather than a missing viewport declaration.
- The generated Tailwind CSS already provides standard responsive utilities; `assets/css/tailwind.local.css` should remain generated. A root-specific override stylesheet is the right owner for custom behavior.

## Findings

| Priority | Page / evidence | Finding and user impact | Proposed treatment | Evidence type |
|---|---|---|---|---|
| P0 | [index.html:39](/Users/pluviophile/website/index.html:39), [index.html:122](/Users/pluviophile/website/index.html:122), [index.html:126](/Users/pluviophile/website/index.html:126), [index.html:134](/Users/pluviophile/website/index.html:134) | `body` hid overflow, `main` was one screen high, and the main content remained a 50/50 row; this matches the screenshot's narrow right text column and risked cutting off lower content. | Restore normal vertical scroll; keep desktop split; stack image, identity, summary, primary links, then capability groups on mobile. | Fixed; 320px/390px captures and all 13 viewport widths pass. |
| P0 | [index.html:116](/Users/pluviophile/website/index.html:116), [index.html:227](/Users/pluviophile/website/index.html:227); e.g. [bio.html:105](/Users/pluviophile/website/bio.html:105) | Six content pages hid desktop links below 768px without providing a mobile menu. The homepage button's selector toggled the header row containing the logo and button, not the link list. | Add one shared menu from each page's existing links, with accessible state and keyboard close behavior. | Fixed; all seven pages pass open, Escape/focus return, outside-click, link-close, and 768px desktop-nav checks. |
| P1 | [research.html:272](/Users/pluviophile/website/research.html:272), [research.html:669](/Users/pluviophile/website/research.html:669), [work.html:255](/Users/pluviophile/website/work.html:255) | Research and Work contained fixed 260×520px preview frames; 500px floating PDF previews were mouse-hover-only and could overflow or disappear on touch. | Clamp previews to their container; suppress floating previews on touch; make direct PDF/product actions easy to find. | Fixed; no document overflow at 320px, touch emulation hides hover previews, and desktop previews fit at 1024px/1440px. |
| P1 | [research.html](/Users/pluviophile/website/research.html), [assets/js/research-media.js](/Users/pluviophile/website/assets/js/research-media.js) | Six live PDF.js viewers initialized at DOM ready and rendered thumbnails; the BookDone config had no matching viewer target. | Initialize the six live viewers near the viewport; preserve page-click and full-document links. | Fixed; at page load all six are idle with no thumbnails; only the nearby card initializes and renders. BookDone remains an image-based preview. |
| P1 | [work.html:222](/Users/pluviophile/website/work.html:222), [work.html:227](/Users/pluviophile/website/work.html:227) | Yukuaidi title/date stayed in one row. The three-column grid started at 768px while preview columns already occupied 560px. | Stack title/date on narrow screens; delay the dense grid until a wider breakpoint. | Fixed; 320px layout is one column and the three-column layout begins at 1024px. |
| P1 | [other.html:335](/Users/pluviophile/website/other.html:335), [other.html:353](/Users/pluviophile/website/other.html:353) | Both carousels auto-advanced without pause, manual navigation, or touch controls. | Add labeled Previous/Next/Pause controls and respect reduced motion. | Fixed; both carousels pass manual navigation, pause/resume and reduced-motion checks; controls are at least 44px high. |
| P2 | [other.html:273](/Users/pluviophile/website/other.html:273) | The Academic & Technical Writing section stored six points as bullet characters inside two paragraphs, so individual items were harder to scan on a narrow screen. | Preserve both headings and content, convert each point to a semantic list item, and let the heading and copy wrap within the mobile content width. | Fixed; 320–1440px section measurements pass, with dedicated 320/390/768/1440px captures. |
| P2 | [projects.html:64](/Users/pluviophile/website/projects.html:64), [projects.html:167](/Users/pluviophile/website/projects.html:167), [projects.html:257](/Users/pluviophile/website/projects.html:257) | Projects already used a single-column breakpoint, lazy iframes, and direct-open links, but scaled app previews could be hard to use on a phone. | Keep embedded previews contained and preserve explicit open actions. | Fixed/verified; all six frames remain lazy and all six direct-open actions are present at 390px. |
| P2 | [cv.html:72](/Users/pluviophile/website/cv.html:72) | CV PDF viewing differs by browser; iOS/WeChat support could not be inferred from source. | Keep open/download as a clear fallback and test on target devices where available. | Open/download fallback appears above the fluid PDF frame at 320px. iPhone Safari and WeChat remain unverified. |
| P2 | [work.html:255](/Users/pluviophile/website/work.html:255) | Work mockups used around 25 images (~15 MB) without explicit lazy loading and created nested scroll regions. | Add native lazy loading; keep the phone frame fluid and touch-scrollable. | Fixed; all 25 images declare lazy loading; at 320px the frame is contained and has vertical touch scrolling. Network savings were not measured. |
| P2 | [research.html:248](/Users/pluviophile/website/research.html:248) | Wordcloud iframe was fixed at 384px and had no adjacent direct-open action. Touch gestures could compete with page scrolling. | Make the iframe fluid and add a direct-open action. | Fixed; iframe is lazy, direct-open is visible, and touch viewport has no floating-hover behavior. |

## Positive findings to preserve

- All seven pages include a viewport declaration.
- Bio already has a narrow-screen metadata rule.
- Projects already uses an intermediate single-column layout, lazy-loaded frames, and direct-open links.
- CV already exposes a PDF download link.
- Most Work and Research content is a vertical list rather than a wide table or horizontal timeline.

## Verification and remaining limits

Chrome 154 headless via CDP checked all seven root pages at 13 CSS widths: 320, 360, 375, 390, 430, 640, 767, 768, 820, 960, 1024, 1280, and 1440px. All 91 page-width combinations satisfied `documentElement.scrollWidth <= clientWidth`. Navigation interactions passed on all seven pages, including the 768px desktop transition. Page-specific media checks and screenshots are recorded in [browser-smoke.md](/Users/pluviophile/website/docs/mobile-responsiveness-evidence/browser-smoke.md).

These are desktop Chromium emulation results, not physical-device certification. iPhone Safari, WeChat WebView, VoiceOver, and TalkBack were not available and remain unverified. The embedded third-party previews were checked for layout and fallback affordances, not for every external service's availability or authentication state.
