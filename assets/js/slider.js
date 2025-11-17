let indicatorPage = 0;

function updateIndicators(sliderContainer, indicators, currentIndex) {
  indicators.forEach((indicator, index) => {
    if (index === currentIndex) {
      indicator.classList.add("is-active");
    } else {
      indicator.classList.remove("is-active");
    }
  });
}

function controlSlider() {
  document.querySelectorAll("[data-slider]").forEach(function (slider) {
    var slides = Array.from(slider.querySelectorAll(".slide"));
    if (!slides.length) return;

    var current = 0;

    function show(i) {
      current = (i + slides.length) % slides.length;
      slides.forEach((slide, idx) => {
        slide.classList.toggle("is-active", idx === current);
      });
    }

    var container = slider.closest(".slider-container");
    var btnPrev = container.querySelector("[data-slider-prev]");
    var btnNext = container.querySelector("[data-slider-next]");

    btnPrev.addEventListener("click", function () {
      show(current - 1);
    });

    btnNext.addEventListener("click", function () {
      show(current + 1);
    });
  });
}

function updateIndicatorsQuery() {
  document.querySelectorAll(".slider-container").forEach((container) => {
    const slider = container.querySelector("[data-slider]");
    if (!slider) return;

    const slides = Array.from(slider.querySelectorAll(".slide"));
    if (!slides.length) return;

    const indicatorSelector =
      ".indicator, .slider-indicator, [data-slider-indicator], [data-indicator], .indicator-button, .slide-indicator, .pagination button, .pagination li";
    const indicators = Array.from(
      container.querySelectorAll(indicatorSelector)
    );
    if (!indicators.length) return;

    function syncFromActive() {
      const activeIndex = slides.findIndex((s) =>
        s.classList.contains("is-active")
      );
      if (activeIndex === -1) return;
      indicatorPage = activeIndex;
      updateIndicators(container, indicators, activeIndex);
    }

    syncFromActive();

    const observer = new MutationObserver((mutations) => {
      for (const m of mutations) {
        if (m.type === "attributes" && m.attributeName === "class") {
          const target = m.target;
          if (target.classList.contains("is-active")) {
            syncFromActive();
            break;
          }
        }
      }
    });

    slides.forEach((s) =>
      observer.observe(s, { attributes: true, attributeFilter: ["class"] })
    );
  });
}

function hideArrowsIfNeededQuery() {
    document.querySelectorAll(".slider-container").forEach((container) => {
        const slider = container.querySelector("[data-slider]");
        if (!slider) return;

        const slides = Array.from(slider.querySelectorAll(".slide"));
        if (!slides.length) return;

        const btnPrev = container.querySelector("[data-slider-prev]");
        const btnNext = container.querySelector("[data-slider-next]");

        function update() {
            const activeIndex = slides.findIndex((s) => s.classList.contains("is-active"));

            if (btnPrev) {
                btnPrev.style.display = activeIndex <= 0 ? "none" : "";
            }
            if (btnNext) {
                btnNext.style.display =
                    activeIndex === -1 || activeIndex >= slides.length - 1 ? "none" : "";
            }
        }

        update();
        const observer = new MutationObserver((mutations) => {
            for (const m of mutations) {
                if (m.type === "attributes" && m.attributeName === "class") {
                    update();
                    break;
                }
            }
        });

        slides.forEach((s) =>
            observer.observe(s, { attributes: true, attributeFilter: ["class"] })
        );
    });
}

document.addEventListener("DOMContentLoaded", hideArrowsIfNeededQuery);

document.addEventListener("DOMContentLoaded", function () {
  updateIndicatorsQuery();
  controlSlider();
  hideArrowsIfNeededQuery();
});
