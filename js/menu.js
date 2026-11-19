// Controla a abertura acessível do menu lateral em telas móveis.
(() => {
  const sidebar = document.querySelector(".sidebar");
  const toggleButton = document.querySelector(".menu-toggle");
  const closeButton = document.querySelector(".sidebar__close");
  const backdrop = document.querySelector(".menu-backdrop");
  const topbar = document.querySelector(".topbar");
  const mobileViewport = window.matchMedia("(max-width: 700px)");
  let previousBodyOverflow = "";
  let lastScrollY = window.scrollY;

  // Encerra sem instalar eventos caso a página não tenha os controles do menu.
  if (!sidebar || !toggleButton || !closeButton || !backdrop || !topbar) {
    return;
  }

  // Mantém os atributos, o bloqueio de rolagem e o foco alinhados ao estado do painel.
  function setMenuOpen(isOpen, restoreFocus = false) {
    if (isOpen && !mobileViewport.matches) {
      return;
    }

    document.body.classList.toggle("menu-open", isOpen);
    toggleButton.setAttribute("aria-expanded", String(isOpen));
    toggleButton.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
    backdrop.hidden = !isOpen;

    if (isOpen) {
      topbar.classList.remove("is-hidden");
      lastScrollY = window.scrollY;
      previousBodyOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      sidebar.querySelector(".sidebar__link")?.focus();
      return;
    }

    document.body.style.overflow = previousBodyOverflow;
    if (restoreFocus && mobileViewport.matches) {
      toggleButton.focus();
    }
  }

  // Abre e fecha o painel por meio do botão hambúrguer.
  toggleButton.addEventListener("click", () => {
    setMenuOpen(toggleButton.getAttribute("aria-expanded") !== "true");
  });

  // Permite fechar o painel pelo botão interno ou clicando fora dele.
  closeButton.addEventListener("click", () => setMenuOpen(false, true));
  backdrop.addEventListener("click", () => setMenuOpen(false, true));

  // Fecha o painel ao escolher um destino e permite sair usando Escape.
  sidebar.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", () => {
      if (mobileViewport.matches) {
        setMenuOpen(false);

        const destination = document.querySelector(link.hash);
        if (destination) {
          if (!destination.hasAttribute("tabindex")) {
            destination.setAttribute("tabindex", "-1");
          }
          requestAnimationFrame(() => destination.focus({ preventScroll: true }));
        }
      }
    });
  });

  // Mantém o foco dentro do painel quando a navegação é feita pelo teclado.
  document.addEventListener("keydown", (event) => {
    if (toggleButton.getAttribute("aria-expanded") !== "true") {
      return;
    }

    if (event.key === "Escape") {
      event.preventDefault();
      setMenuOpen(false, true);
      return;
    }

    if (event.key !== "Tab") {
      return;
    }

    const focusableItems = sidebar.querySelectorAll('a[href], button:not([disabled])');
    const firstItem = focusableItems[0];
    const lastItem = focusableItems[focusableItems.length - 1];

    if (!sidebar.contains(document.activeElement)) {
      event.preventDefault();
      (event.shiftKey ? lastItem : firstItem).focus();
    } else if (event.shiftKey && document.activeElement === firstItem) {
      event.preventDefault();
      lastItem.focus();
    } else if (!event.shiftKey && document.activeElement === lastItem) {
      event.preventDefault();
      firstItem.focus();
    }
  });

  // Ajusta a acessibilidade do painel quando a janela cruza o breakpoint móvel.
  function syncViewportState() {
    if (mobileViewport.matches) {
      return;
    }

    setMenuOpen(false);
  }

  // Escuta tanto a mudança da consulta de mídia quanto o redimensionamento da janela.
  mobileViewport.addEventListener("change", syncViewportState);
  window.addEventListener("resize", syncViewportState);

  // Esconde o cabeçalho ao descer e revela-o assim que a pessoa volta para cima.
  window.addEventListener("scroll", () => {
    const currentScrollY = Math.max(0, window.scrollY);

    if (!mobileViewport.matches || toggleButton.getAttribute("aria-expanded") === "true") {
      topbar.classList.remove("is-hidden");
      lastScrollY = currentScrollY;
      return;
    }

    const scrollDelta = currentScrollY - lastScrollY;
    if (Math.abs(scrollDelta) < 4) {
      return;
    }

    if (currentScrollY <= 40 || scrollDelta < 0) {
      topbar.classList.remove("is-hidden");
    } else {
      topbar.classList.add("is-hidden");
    }

    lastScrollY = currentScrollY;
  }, { passive: true });

  // Inicia a camada de fundo escondida até o painel ser aberto pelo usuário.
  backdrop.hidden = true;
})();