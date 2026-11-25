// Interacoes compartilhadas pelas telas de acesso, cadastro e paginas principais.
(() => {
  const sessionUserKey = "irltv.auth.user";
  const pageParameters = new URLSearchParams(window.location.search);

  // Apresenta a saudacao usando primeiro o nome da URL e depois a sessao atual.
  function showLoggedInUser() {
    const nameFromUrl = pageParameters.get("nome")?.trim();
    const savedName = window.sessionStorage.getItem(sessionUserKey);
    const userName = nameFromUrl || savedName;

    if (!userName) {
      return;
    }

    if (nameFromUrl) {
      window.sessionStorage.setItem(sessionUserKey, nameFromUrl);
    }

    document
      .querySelectorAll(".topbar__actions, .sidebar__account-actions")
      .forEach((accountActions) => {
        const greeting = document.createElement("span");
        greeting.className = "auth-user-greeting";
        greeting.textContent = `Oi, ${userName}`;
        accountActions.replaceChildren(greeting);
      });
  }

  // Mantem o slide escolhido visivel e informa a selecao aos leitores de tela.
  function initializeShowcaseSlider() {
    const slider = document.querySelector("[data-auth-slider]");
    const slideButtons = [...document.querySelectorAll("[data-auth-slide-to]")];

    if (!slider || slideButtons.length === 0) {
      return;
    }

    const slides = [...slider.querySelectorAll("[data-auth-slide]")];
    const showcase = slider.closest(".auth-showcase__content") || slider;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    let activeIndex = slideButtons.findIndex((button) =>
      button.classList.contains("is-active"),
    );
    let rotationTimer;

    // Sincroniza o painel visivel e o indicador ativo para todas as formas de troca.
    function showSlide(selectedIndex) {
      if (selectedIndex < 0 || selectedIndex >= slides.length) {
        return;
      }

      activeIndex = selectedIndex;
      slides.forEach((slide, index) => {
        slide.hidden = index !== activeIndex;
      });

      slideButtons.forEach((button, index) => {
        const isSelected = index === activeIndex;
        button.classList.toggle("is-active", isSelected);
        button.setAttribute("aria-pressed", String(isSelected));
      });
    }

    // Pausa a rotacao para quem passa o mouse, usa teclado ou reduz movimentos.
    function scheduleRotation() {
      window.clearInterval(rotationTimer);

      if (
        prefersReducedMotion ||
        document.hidden ||
        showcase.matches(":hover") ||
        showcase.contains(document.activeElement)
      ) {
        return;
      }

      rotationTimer = window.setInterval(() => {
        showSlide((activeIndex + 1) % slides.length);
      }, 6000);
    }

    slideButtons.forEach((button) => {
      button.addEventListener("click", () => {
        showSlide(Number(button.dataset.authSlideTo));
        scheduleRotation();
      });
    });

    showcase.addEventListener("mouseenter", scheduleRotation);
    showcase.addEventListener("mouseleave", scheduleRotation);
    showcase.addEventListener("focusin", scheduleRotation);
    showcase.addEventListener("focusout", scheduleRotation);
    document.addEventListener("visibilitychange", scheduleRotation);
    scheduleRotation();
  }

  // Mantem os avisos acessiveis e escritos como texto, sem interpretar HTML.
  function showFeedback(message) {
    const feedback = document.querySelector("[data-auth-feedback]");

    if (!feedback) {
      return;
    }

    feedback.textContent = message;
    feedback.hidden = false;
  }

  // O acesso de demonstracao aceita qualquer par preenchido, exceto a rota admin.
  function initializeLoginForm() {
    const loginForm = document.querySelector('[data-auth-form="login"]');

    if (!loginForm) {
      return;
    }

    if (pageParameters.get("cadastro") === "sucesso") {
      showFeedback("Cadastro pronto! Entre com seu usuário para continuar.");
    }

    loginForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const usernameInput = loginForm.elements.namedItem("username");
      const passwordInput = loginForm.elements.namedItem("password");
      const username = usernameInput.value.trim();
      const password = passwordInput.value;

      usernameInput.setCustomValidity(
        username ? "" : "Informe um nome de usuário.",
      );

      if (!loginForm.reportValidity()) {
        return;
      }

      if (username.toLocaleLowerCase("pt-BR") === "admin" && password === "admin") {
        window.location.assign(new URL("dashboard.html", window.location.href).href);
        return;
      }

      window.sessionStorage.setItem(sessionUserKey, username);
      const homeUrl = new URL("index.html", window.location.href);
      homeUrl.searchParams.set("nome", username);
      window.location.assign(homeUrl.href);
    });
  }

  // Valida a confirmacao e encaminha ao login sem guardar dados pessoais no navegador.
  function initializeRegisterForm() {
    const registerForm = document.querySelector('[data-auth-form="register"]');

    if (!registerForm) {
      return;
    }

    const passwordInput = registerForm.elements.namedItem("password");
    const confirmInput = registerForm.elements.namedItem("confirmPassword");

    registerForm.addEventListener("input", () => {
      confirmInput.setCustomValidity("");
    });

    registerForm.addEventListener("submit", (event) => {
      event.preventDefault();
      confirmInput.setCustomValidity(
        passwordInput.value === confirmInput.value
          ? ""
          : "As senhas precisam ser iguais.",
      );

      if (!registerForm.reportValidity()) {
        return;
      }

      const loginUrl = new URL("login.html", window.location.href);
      loginUrl.searchParams.set("cadastro", "sucesso");
      window.location.assign(loginUrl.href);
    });
  }

  showLoggedInUser();
  initializeShowcaseSlider();
  initializeLoginForm();
  initializeRegisterForm();
})();
