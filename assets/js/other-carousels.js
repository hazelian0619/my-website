(() => {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  document.querySelectorAll("[data-site-carousel-root]").forEach((root) => {
    const track = root.querySelector("[data-carousel-track]");
    const controls = root.querySelector("[data-site-carousel-controls]");
    const slides = track ? Array.from(track.querySelectorAll(".carousel-item")) : [];
    const previousButton = controls?.querySelector("[data-carousel-prev]");
    const nextButton = controls?.querySelector("[data-carousel-next]");
    const toggleButton = controls?.querySelector("[data-carousel-toggle]");
    const status = controls?.querySelector("[data-carousel-status]");

    if (!track || slides.length < 2 || !previousButton || !nextButton || !toggleButton) {
      return;
    }

    let currentIndex = 0;
    let timer = null;
    let autoplayEnabled = !reducedMotion.matches;

    const clearTimer = () => {
      if (timer !== null) {
        window.clearInterval(timer);
        timer = null;
      }
    };

    const render = (index, announce = false) => {
      currentIndex = (index + slides.length) % slides.length;
      slides.forEach((slide, slideIndex) => {
        const isCurrent = slideIndex === currentIndex;
        slide.style.opacity = isCurrent ? "1" : "0";
        slide.setAttribute("aria-hidden", String(!isCurrent));
      });

      if (announce && status) {
        status.textContent = `Photo ${currentIndex + 1} of ${slides.length}`;
      }
    };

    const syncAutoplay = () => {
      clearTimer();
      const canAutoplay = autoplayEnabled && !reducedMotion.matches;
      toggleButton.disabled = reducedMotion.matches;
      toggleButton.textContent = reducedMotion.matches
        ? "Autoplay off (reduced motion)"
        : canAutoplay
          ? "Pause slideshow"
          : "Resume slideshow";

      if (canAutoplay && !document.hidden) {
        timer = window.setInterval(() => render(currentIndex + 1), 4000);
      }
    };

    const pauseForInteraction = () => {
      autoplayEnabled = false;
      syncAutoplay();
    };

    render(0);
    syncAutoplay();

    root.addEventListener("pointerenter", pauseForInteraction);
    track.addEventListener("touchstart", pauseForInteraction, { passive: true });
    root.addEventListener("focusin", pauseForInteraction);
    previousButton.addEventListener("click", () => {
      pauseForInteraction();
      render(currentIndex - 1, true);
    });
    nextButton.addEventListener("click", () => {
      pauseForInteraction();
      render(currentIndex + 1, true);
    });
    toggleButton.addEventListener("click", () => {
      if (reducedMotion.matches) return;
      autoplayEnabled = !autoplayEnabled;
      syncAutoplay();
    });

    document.addEventListener("visibilitychange", syncAutoplay);
    const handleMotionPreferenceChange = () => {
      if (reducedMotion.matches) autoplayEnabled = false;
      syncAutoplay();
    };

    if (typeof reducedMotion.addEventListener === "function") {
      reducedMotion.addEventListener("change", handleMotionPreferenceChange);
    } else {
      reducedMotion.addListener(handleMotionPreferenceChange);
    }
  });
})();
