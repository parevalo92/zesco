const navLinks = document.querySelectorAll(".nav-menu .nav-link");
const menuOpenButton = document.querySelector("#menu-open-button");
const menuCloseButton = document.querySelector("#menu-close-button");

menuOpenButton.addEventListener("click", () => {
//Toggle mobile menu
    document.body.classList.toggle("show-mobile-menu");
});

//Close menu whe the close button is clicked
    menuCloseButton.addEventListener("click", () => menuOpenButton.click());

//Close menu whe the nav link is clicked

    navLinks.forEach(link => {
        link.addEventListener("click", () => menuOpenButton.click());
    });

// Initialize Swiper

const swiper = new Swiper('.slider-wrapper', {
  loop: true,
  grabCursor: true,
  spaceBetween: 25,

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
    dynamicBullets: true
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

//Responsives Breakpoints

  breakpoints: {
    0: {
        slidesPerView: 1
    },
    768: {
        slidesPerView: 2
    },
    1024: {
        slidesPerView: 3
    },
  }
});


/*  LANG SWITCHER */

document.addEventListener("DOMContentLoaded", () => {
  const langButtons = document.querySelectorAll("[data-lang-button]");
  const defaultLang = localStorage.getItem("siteLang") || "esp";

  async function loadLanguage(lang) {
    try {
      const response = await fetch(`lang/${lang}.json`);
      if (!response.ok) throw new Error(`No se pudo cargar el idioma: ${lang}`);

      const translations = await response.json();

      document.querySelectorAll("[data-i18n]").forEach((element) => {
        const key = element.getAttribute("data-i18n");
        if (translations[key]) {
          element.textContent = translations[key];
        }
      });

      document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
        const key = element.getAttribute("data-i18n-placeholder");
        if (translations[key]) {
          element.setAttribute("placeholder", translations[key]);
        }
      });

      localStorage.setItem("siteLang", lang);
      document.documentElement.lang = lang === "eng" ? "en" : "es";

      langButtons.forEach((btn) => {
        btn.classList.remove("active");
        if (btn.dataset.langButton === lang) {
          btn.classList.add("active");
        }
      });
    } catch (error) {
      console.error("Error cargando idioma:", error);
    }
  }

  langButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const lang = button.dataset.langButton;
      loadLanguage(lang);
    });
  });

  loadLanguage(defaultLang);
});