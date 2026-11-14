// Configura os carrosséis da página inicial quando o HTML estiver pronto.
document.querySelectorAll(".carousel-track").forEach((track) => {
  // Envolve cada faixa para posicionar seus controles nas laterais.
  const shell = document.createElement("div");
  shell.className = "carousel-shell";
  track.parentNode.insertBefore(shell, track);
  shell.appendChild(track);

  // Remove as setas antigas que ficavam dentro de cada card.
  track.querySelectorAll(".carousel-arrows").forEach((arrows) => arrows.remove());

  // Converte a capa da live em um link provisório que poderá ser substituído depois.
  track.querySelectorAll(".live-card__link").forEach((cover) => {
    const card = cover.closest(".live-card");
    const title = card.querySelector(".live-card__info h3");
    const link = document.createElement("a");

    link.className = cover.className;
    link.href = "#live";
    link.setAttribute("aria-label", `Abrir live: ${title.textContent.trim()}`);

    while (cover.firstChild) {
      link.appendChild(cover.firstChild);
    }

    cover.replaceWith(link);
  });

  // Define e cria os controles laterais da faixa atual.
  const carouselName = track.id === "games-carousel" ? "game" : "transmissão";
  const controls = [
    {
      direction: -1,
      label: `Mostrar ${carouselName} anterior`,
      symbol: "‹",
    },
    {
      direction: 1,
      label: `Mostrar ${carouselName === "game" ? "próximo game" : "próxima transmissão"}`,
      symbol: "›",
    },
  ];

  controls.forEach(({ direction, label, symbol }) => {
    // Cria um botão nativo para oferecer clique, foco e suporte a teclado.
    const button = document.createElement("button");
    button.className = `carousel-control ${
      direction < 0 ? "carousel-control--previous" : "carousel-control--next"
    }`;
    button.type = "button";
    button.setAttribute("aria-label", label);
    button.setAttribute("aria-controls", track.id);
    button.textContent = symbol;

    // Move a faixa para o card anterior ou seguinte, voltando ao início ou fim.
    button.addEventListener("click", () => {
      const cards = [...track.querySelectorAll(":scope > .live-card")];
      const padding = Number.parseFloat(getComputedStyle(track).paddingLeft) || 0;
      const currentPosition = track.scrollLeft;

      // Localiza o slide mais próximo da posição atual, inclusive após arrastar.
      const currentIndex = cards.reduce(
        (nearestIndex, card, index) => {
          const nearestCard = cards[nearestIndex];
          const nearestPosition = nearestCard.offsetLeft - padding;
          const cardPosition = card.offsetLeft - padding;

          return Math.abs(cardPosition - currentPosition) <
            Math.abs(nearestPosition - currentPosition)
            ? index
            : nearestIndex;
        },
        0,
      );

      // Calcula o próximo índice com navegação circular entre os slides.
      const nextIndex =
        (currentIndex + direction + cards.length) % cards.length;
      const nextPosition = Math.max(0, cards[nextIndex].offsetLeft - padding);
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      const behavior = prefersReducedMotion ? "auto" : "smooth";

      // Alinha o card escolhido e respeita a preferência de movimento reduzido.
      track.scrollTo({ left: nextPosition, behavior });
    });

    // Coloca o controle no lado correspondente do carrossel.
    shell.appendChild(button);
  });

  // Permite avançar e voltar usando as setas do teclado quando a faixa tem foco.
  track.addEventListener("keydown", (event) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") {
      return;
    }

    event.preventDefault();
    const direction = event.key === "ArrowRight" ? 1 : -1;
    const button = shell.querySelector(
      direction > 0
        ? ".carousel-control--next"
        : ".carousel-control--previous",
    );

    button.click();
  });
});