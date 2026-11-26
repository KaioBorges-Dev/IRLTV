// Reúne as interações compartilhadas pelas páginas de login, cadastro e início.
(() => {
  // Guarda apenas o nome do usuário na sessão atual, nunca a senha.
  const sessionUserKey = "irltv.auth.user";

  // Lê uma vez os parâmetros da URL para saudar o usuário e exibir mensagens.
  const pageParameters = new URLSearchParams(window.location.search);

  // Substitui os links de acesso por um link clicável para o perfil do usuário logado.
  function showLoggedInUser() {
    // O nome da URL tem prioridade; a sessão mantém a saudação ao navegar no site.
    const nameFromUrl = pageParameters.get("nome")?.trim();
    const savedName = window.sessionStorage.getItem(sessionUserKey);
    const userName = nameFromUrl || savedName;

    // Em páginas abertas sem login, mantém os links Entrar e Cadastrar originais.
    if (!userName) {
      return;
    }

    // Sincroniza o nome recebido após o login com a sessão da aba atual.
    if (nameFromUrl) {
      window.sessionStorage.setItem(sessionUserKey, nameFromUrl);
    }
// Atualiza as ações da barra superior e do menu lateral, se existirem.
    document
      .querySelectorAll(".topbar__actions, .sidebar__account-actions")
      .forEach((accountActions) => {
        const greeting = document.createElement("a");
        greeting.href = "usuario.html";
        greeting.className = "auth-user-greeting";
        greeting.textContent = `Oi, ${userName}`;
        accountActions.replaceChildren(greeting);
      });
  }

  // Configura os indicadores, a rotação e as pausas do painel de apresentação.
  function initializeShowcaseSlider() {
    // Localiza os painéis e seus indicadores pelo contrato de dados do HTML.
    const slider = document.querySelector("[data-auth-slider]");
    const slideButtons = [...document.querySelectorAll("[data-auth-slide-to]")];

    // O arquivo também é carregado nas páginas que não possuem esse painel.
    if (!slider || slideButtons.length === 0) {
      return;
    }

    // Reúne os slides e usa o conteúdo como limite para foco e hover.
    const slides = [...slider.querySelectorAll("[data-auth-slide]")];
    const showcase = slider.closest(".auth-showcase__content") || slider;

    // Respeita a preferência do sistema para não iniciar movimento automático.
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    // Mantém o índice e o temporizador acessíveis às funções internas do slider.
    let activeIndex = slideButtons.findIndex((button) =>
      button.classList.contains("is-active"),
    );
    let rotationTimer;

    // Mostra um slide e sincroniza o estado visual e acessível do indicador.
    function showSlide(selectedIndex) {
      // Ignora índices fora dos painéis definidos no HTML.
      if (selectedIndex < 0 || selectedIndex >= slides.length) {
        return;
      }

      activeIndex = selectedIndex;

      // O atributo hidden deixa apenas o slide selecionado visível.
      slides.forEach((slide, index) => {
        slide.hidden = index !== activeIndex;
      });

      // Atualiza a aparência e o estado aria-pressed de cada indicador.
      slideButtons.forEach((button, index) => {
        const isSelected = index === activeIndex;
        button.classList.toggle("is-active", isSelected);
        button.setAttribute("aria-pressed", String(isSelected));
      });
    }

    // Agenda a rotação automática, pausando quando ela atrapalharia a leitura.
    function scheduleRotation() {
      // Evita temporizadores duplicados após cliques ou mudanças de foco.
      window.clearInterval(rotationTimer);

      // Não troca slides com movimento reduzido, página oculta ou painel em uso.
      if (
        prefersReducedMotion ||
        document.hidden ||
        showcase.matches(":hover") ||
        showcase.contains(document.activeElement)
      ) {
        return;
      }

      // Avança um slide a cada seis segundos e volta ao primeiro ao chegar ao fim.
      rotationTimer = window.setInterval(() => {
        showSlide((activeIndex + 1) % slides.length);
      }, 6000);
    }

    // Permite escolher diretamente um slide pelos indicadores.
    slideButtons.forEach((button) => {
      button.addEventListener("click", () => {
        showSlide(Number(button.dataset.authSlideTo));
        scheduleRotation();
      });
    });

    // Pausa enquanto há interação e reconsidera a rotação quando ela termina.
    showcase.addEventListener("mouseenter", scheduleRotation);
    showcase.addEventListener("mouseleave", scheduleRotation);
    showcase.addEventListener("focusin", scheduleRotation);
    showcase.addEventListener("focusout", scheduleRotation);
    document.addEventListener("visibilitychange", scheduleRotation);

    // Inicia a rotação se a página estiver visível e sem interação ativa.
    scheduleRotation();
  }

  // Exibe uma mensagem de estado sem interpretar conteúdo como HTML.
  function showFeedback(message) {
    const feedback = document.querySelector("[data-auth-feedback]");

    // A mensagem é opcional nas páginas; sem o elemento, não há nada a atualizar.
    if (!feedback) {
      return;
    }

    // textContent mantém a mensagem literal e hidden revela o aviso ao usuário.
    feedback.textContent = message;
    feedback.hidden = false;
  }

  // Configura o login demonstrativo e trata o acesso especial de administrador.
  function initializeLoginForm() {
    const loginForm = document.querySelector('[data-auth-form="login"]');

    // O script também roda em páginas sem formulário de login.
    if (!loginForm) {
      return;
    }

    // Confirma o cadastro quando o usuário retorna pelo link de sucesso.
    if (pageParameters.get("cadastro") === "sucesso") {
      showFeedback("Cadastro pronto! Entre com seu usuário para continuar.");
    }

    // Intercepta o envio para executar a navegação de demonstração no navegador.
    loginForm.addEventListener("submit", (event) => {
      event.preventDefault();

      // Obtém e normaliza os campos antes de decidir o destino.
      const usernameInput = loginForm.elements.namedItem("username");
      const passwordInput = loginForm.elements.namedItem("password");
      const username = usernameInput.value.trim();
      const password = passwordInput.value;

      // A validação nativa não considera espaços como um nome de usuário válido.
      usernameInput.setCustomValidity(
        username ? "" : "Informe um nome de usuário.",
      );

      // Mantém o formulário na página até os campos obrigatórios serem válidos.
      if (!loginForm.reportValidity()) {
        return;
      }

      // Encaminha a combinação reservada para o painel, sem criá-lo neste projeto.
      if (username.toLocaleLowerCase("pt-BR") === "admin" && password === "admin") {
        window.location.assign(new URL("dashboard.html", window.location.href).href);
        return;
      }

      // Para os demais logins, guarda o nome na aba e o envia na URL da página inicial.
      window.sessionStorage.setItem(sessionUserKey, username);
      const homeUrl = new URL("index.html", window.location.href);
      homeUrl.searchParams.set("nome", username);
      window.location.assign(homeUrl.href);
    });
  }

 // Valida o cadastro demonstrativo e encaminha o usuário à tela de login.
  function initializeRegisterForm() {
    const registerForm = document.querySelector('[data-auth-form="register"]');

    // O formulário de cadastro só existe em register.html.
    if (!registerForm) {
      return;
    }

    // Mantém referências aos campos para comparar as senhas no envio.
    const passwordInput = registerForm.elements.namedItem("password");
    const confirmInput = registerForm.elements.namedItem("confirmPassword");

    // Remove o erro antigo assim que a pessoa começa a corrigir a confirmação.
    registerForm.addEventListener("input", () => {
      confirmInput.setCustomValidity("");
    });

// Impede o envio até a confirmação ser válida e as senhas coincidirem.
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

      // Salva o nome digitado no cadastro para aparecer no perfil pessoal
      const registeredName = registerForm.elements.namedItem("name")?.value.trim();
      if (registeredName) {
        window.sessionStorage.setItem(sessionUserKey, registeredName);
      }

      // O protótipo não armazena dados: apenas confirma e oferece o próximo passo.
      const loginUrl = new URL("login.html", window.location.href);
      loginUrl.searchParams.set("cadastro", "sucesso");
      window.location.assign(loginUrl.href);
    });
  }

  // Inicializa apenas os recursos presentes na página atual.
  showLoggedInUser();
  initializeShowcaseSlider();
  initializeLoginForm();
  initializeRegisterForm();
})();
