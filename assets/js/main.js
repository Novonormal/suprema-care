(function () {
  var header = document.querySelector(".site-header");
  var navToggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".site-nav");
  var form = document.querySelector("[data-whatsapp-form]");
  var year = document.querySelector("[data-year]");
  var decisionCards = document.querySelectorAll("[data-decision-card]");
  var testimonialCarousel = document.querySelector("[data-testimonial-carousel]");

  function setHeaderState() {
    if (!header) return;
    var currentScroll = window.scrollY || 0;

    header.classList.toggle("is-scrolled", currentScroll > 18);
  }

  setHeaderState();
  window.addEventListener("scroll", setHeaderState, { passive: true });

  function closeMenu() {
    if (!navToggle || !nav) return;
    nav.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
    if (header) header.classList.remove("is-menu-open");
  }

  function openMenu() {
    if (!navToggle || !nav) return;
    nav.classList.add("is-open");
    navToggle.setAttribute("aria-expanded", "true");
    if (header) header.classList.add("is-menu-open");
  }

  if (navToggle && nav) {
    navToggle.addEventListener("click", function () {
      if (nav.classList.contains("is-open")) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });

    document.querySelectorAll(".nav-cta a").forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("click", function (event) {
      if (!header || !nav.classList.contains("is-open")) return;
      if (!header.contains(event.target)) closeMenu();
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") closeMenu();
    });
  }

  if (testimonialCarousel) {
    var testimonialTrack = testimonialCarousel.querySelector(".testimonial-track");
    var testimonialSlides = testimonialCarousel.querySelectorAll(".testimonial-card");
    var testimonialIndex = 0;

    if (testimonialTrack && testimonialSlides.length > 1) {
      window.setInterval(function () {
        testimonialIndex = (testimonialIndex + 1) % testimonialSlides.length;
        testimonialTrack.style.transform = "translateX(" + testimonialIndex * -100 + "%)";
      }, 5200);
    }
  }

  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );

    document.querySelectorAll(".reveal").forEach(function (item) {
      observer.observe(item);
    });
  } else {
    document.querySelectorAll(".reveal").forEach(function (item) {
      item.classList.add("is-visible");
    });
  }

  if (form) {
    var serviceSelect = form.querySelector("[name='servico']");
    var submitLabel = form.querySelector("[data-submit-label]");

    function isWorkRequest() {
      return serviceSelect && String(serviceSelect.value || "").toLowerCase().indexOf("trabalhe") !== -1;
    }

    function updateSubmitLabel() {
      if (!submitLabel) return;
      submitLabel.textContent = isWorkRequest() ? "Enviar por e-mail" : "Enviar questionario pelo WhatsApp";
    }

    if (serviceSelect) {
      serviceSelect.addEventListener("change", updateSubmitLabel);
      updateSubmitLabel();
    }

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var data = new FormData(form);
      var service = data.get("servico") || "";
      var name = data.get("nome") || "";
      var phone = data.get("telefone") || "";
      var bairro = data.get("bairro") || "";
      var periodo = data.get("periodo") || "";
      var inicio = data.get("inicio") || "";
      var local = data.get("local") || "";
      var apoio = data.get("apoio") || "";
      var responsavel = data.get("responsavel") || "";
      var message = data.get("mensagem") || "";
      var parts = [
        isWorkRequest()
          ? "Trabalhe conosco - Suprema Care Brasil"
          : "Ola, vim do Google e gostaria de informacoes sobre cuidado domiciliar.",
        "Nome: " + name,
        "WhatsApp: " + phone,
        "Bairro do atendimento: " + bairro,
        "Servico: " + service,
        "Periodo desejado: " + periodo,
        "Quando precisa comecar: " + inicio,
        "Atendimento em casa ou hospital: " + local,
        "Apoio principal: " + apoio,
        "Responsavel pela contratacao: " + responsavel,
        "Mensagem adicional: " + message
      ];

      if (isWorkRequest()) {
        window.location.href =
          "mailto:contato@supremacarebrasil.com.br?subject=" +
          encodeURIComponent("Trabalhe conosco - Suprema Care Brasil") +
          "&body=" +
          encodeURIComponent(parts.join("\n"));
        return;
      }

      window.location.href = "https://wa.me/5511981280639?text=" + encodeURIComponent(parts.join("\n"));
    });
  }

  if (decisionCards.length) {
    decisionCards.forEach(function (card) {
      card.addEventListener("mouseenter", function () {
        decisionCards.forEach(function (item) {
          item.classList.remove("is-active");
        });
        card.classList.add("is-active");
      });

      card.addEventListener("focus", function () {
        decisionCards.forEach(function (item) {
          item.classList.remove("is-active");
        });
        card.classList.add("is-active");
      });
    });
  }

  if (year) {
    year.textContent = new Date().getFullYear();
  }
})();
