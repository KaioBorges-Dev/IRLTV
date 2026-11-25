// Sincroniza o item ativo da navegação com a seção visível da página.
// by kaio borges

(() => {
  const navigationLinks = Array.from(
    document.querySelectorAll(".sidebar__nav .sidebar__link[href^='#']")
  );
  const sectionLinks = navigationLinks
    .map((link) => ({
      link,
      section: document.querySelector(link.getAttribute("href"))
    }))
    .filter((item) => item.section);
  const visibleSections = new Map();

  // Atualiza o destaque visual e o estado anunciado por tecnologias assistivas.
  function setActiveLink(activeLink) {
    navigationLinks.forEach((link) => {
      const isActive = link === activeLink;
      link.classList.toggle("is-active", isActive);

      if (isActive) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }

  // Encontra o link correspondente ao destino inicial, ou usa a página inicial.
  const initialLink = sectionLinks.find(({ link }) => link.hash === window.location.hash)
    ?.link ?? navigationLinks.find((link) => link.hash === "#inicio");
  setActiveLink(initialLink);

  // Mantém a seção que atravessa a faixa de leitura como o item ativo.
  function updateActiveSection() {
    const intersectingSections = Array.from(visibleSections.entries())
      .filter(([, isVisible]) => isVisible)
      .map(([section]) => section)
      .sort((first, second) => second.getBoundingClientRect().top - first.getBoundingClientRect().top);

    if (intersectingSections.length > 0) {
      const activeSection = intersectingSections[0];
      setActiveLink(sectionLinks.find(({ section }) => section === activeSection)?.link);
      return;
    }

    const readingLine = window.scrollY + window.innerHeight * 0.3;
    const previousSection = sectionLinks
      .map(({ section }) => section)
      .filter((section) => section.getBoundingClientRect().top + window.scrollY <= readingLine)
      .pop();
    const activeSection = previousSection || document.querySelector("#inicio");
    setActiveLink(sectionLinks.find(({ section }) => section === activeSection)?.link);
  }

  // Observa as seções principais sem monitorar continuamente cada evento de rolagem.
  if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          visibleSections.set(entry.target, entry.isIntersecting);
        });
        updateActiveSection();
      },
      { rootMargin: "-20% 0px 0px 0px", threshold: 0 }
    );

    sectionLinks
      .filter(({ section }) => section.id !== "inicio")
      .forEach(({ section }) => sectionObserver.observe(section));
  }

  // Atualiza durante a rolagem como complemento e fallback ao observador de seções.
  let scrollUpdateScheduled = false;
  window.addEventListener("scroll", () => {
    if (scrollUpdateScheduled) {
      return;
    }

    scrollUpdateScheduled = true;
    requestAnimationFrame(() => {
      scrollUpdateScheduled = false;
      updateActiveSection();
    });
  }, { passive: true });

  // Aplica o destaque inicial enquanto o observador ainda prepara suas entradas.
  updateActiveSection();

  // Atualiza o item ativo quando uma âncora principal é aberta diretamente.
  window.addEventListener("hashchange", () => {
    const destinationLink = sectionLinks.find(({ link }) => link.hash === window.location.hash)?.link;
    if (destinationLink) {
      setActiveLink(destinationLink);
    }
  });
})();