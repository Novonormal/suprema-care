(function () {
  var header = document.querySelector(".site-header");
  var navToggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".site-nav");
  var form = document.querySelector("[data-whatsapp-form]");
  var year = document.querySelector("[data-year]");
  var decisionCards = document.querySelectorAll("[data-decision-card]");

  function setHeaderState() {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 18);
  }

  setHeaderState();
  window.addEventListener("scroll", setHeaderState, { passive: true });

  if (navToggle && nav) {
    navToggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
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
      submitLabel.textContent = isWorkRequest() ? "Enviar por e-mail" : "Enviar questionario";
    }

    if (serviceSelect) {
      serviceSelect.addEventListener("change", updateSubmitLabel);
      updateSubmitLabel();
    }

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var data = new FormData(form);
      var service = data.get("servico") || "";
      var parts = [
        isWorkRequest()
          ? "Trabalhe conosco - Suprema Care Brasil"
          : "Ola, equipe Suprema Care Brasil. Gostaria de um orcamento.",
        "Nome: " + (data.get("nome") || ""),
        "Telefone: " + (data.get("telefone") || ""),
        "Servico: " + service,
        "Mensagem: " + (data.get("mensagem") || "")
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
