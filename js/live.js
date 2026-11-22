// Controla os elementos interativos da página de transmissão ao vivo.
(() => {
  const iframe = document.querySelector("#live-video");
  const playerStage = document.querySelector("#live-player-stage");
  const volumeControl = document.querySelector("#volume-control");
  const volumePopover = document.querySelector("#volume-popover");
  const volumeRange = document.querySelector("#volume-range");
  const volumeOutput = document.querySelector("#volume-output");
  const mutePopoverControl = document.querySelector("#mute-popover-control");
  const fullscreenControl = document.querySelector("#fullscreen-control");
  const followButton = document.querySelector("#follow-button");
  const viewerCount = document.querySelector("#live-viewers");

  const isMobileViewport = window.matchMedia("(max-width: 700px), (hover: none)");
  let isMuted = true;
  let youtubePlayer = null;

  // Autoplay confiável começa silenciado; o usuário pode ativar o som depois.
  if (iframe) {
    iframe.src = iframe.src
      .replace("mute=0", "mute=1")
      .replace("playsinline=0", "playsinline=1");
  }

  if (isMuted) {
    mutePopoverControl?.setAttribute("aria-pressed", "true");
    mutePopoverControl?.setAttribute("aria-label", "Ativar som");
    if (volumeRange) {
      volumeRange.value = "0";
    }
    if (volumeOutput) {
      volumeOutput.textContent = "0%";
    }
  }
  const liveStartSeconds = 23 * 60;
  let liveElapsedSeconds = liveStartSeconds;
  const liveTime = document.querySelector("#live-time");

  // Exibe os controles apenas durante a interação e recolhe após alguns segundos.
  let controlsTimer;
  const showPlayerControls = () => {
    if (!playerStage) {
      return;
    }

    playerStage.classList.add("is-controls-visible");
    window.clearTimeout(controlsTimer);
    controlsTimer = window.setTimeout(() => {
      playerStage.classList.remove("is-controls-visible");
    }, 2800);
  };

  playerStage?.addEventListener("mouseenter", showPlayerControls);
  playerStage?.addEventListener("mousemove", showPlayerControls);
  playerStage?.addEventListener("mouseleave", () => {
    window.clearTimeout(controlsTimer);
    playerStage.classList.remove("is-controls-visible");
  });
  playerStage?.addEventListener("touchstart", () => {
    if (!isMuted) {
      return;
    }

    isMuted = false;
    sendPlayerCommand("unMute");
    sendPlayerCommand("setVolume", [100]);
    mutePopoverControl?.setAttribute("aria-pressed", "false");
    mutePopoverControl?.setAttribute("aria-label", "Silenciar");
    if (volumeRange) {
      volumeRange.value = "100";
    }
    if (volumeOutput) {
      volumeOutput.textContent = "100%";
    }
    if (volumeRange) {
      volumeRange.value = "100";
    }
    if (volumeOutput) {
      volumeOutput.textContent = "100%";
    }
  }, { passive: true });

  // Impede cliques internos, clique duplo e menu do vídeo da plataforma externa.
  playerStage?.addEventListener("dblclick", (event) => event.preventDefault());
  playerStage?.addEventListener("contextmenu", (event) => event.preventDefault());
  playerStage?.addEventListener("click", () => {
    if (isMuted) {
      isMuted = false;
      sendPlayerCommand("unMute");
      sendPlayerCommand("setVolume", [100]);
      mutePopoverControl?.setAttribute("aria-pressed", "false");
      mutePopoverControl?.setAttribute("aria-label", "Silenciar");
    }
  });

  // Envia comandos para o player oficial do YouTube sem redirecionar o visitante.
  function sendPlayerCommand(command, args = []) {
    if (youtubePlayer) {
      if (command === "seekTo" && typeof youtubePlayer.seekTo === "function") {
        youtubePlayer.seekTo(args[0] ?? 1380, args[1] ?? true);
      } else if (command === "setVolume" && typeof youtubePlayer.setVolume === "function") {
        youtubePlayer.setVolume(args[0] ?? 100);
      } else if (command === "mute" && typeof youtubePlayer.mute === "function") {
        youtubePlayer.mute();
      } else if (command === "unMute" && typeof youtubePlayer.unMute === "function") {
        youtubePlayer.unMute();
      } else if (command === "playVideo" && typeof youtubePlayer.playVideo === "function") {
        youtubePlayer.playVideo();
      }
      return;
    }

    iframe?.contentWindow?.postMessage(
      JSON.stringify({ event: "command", func: command, args }),
      "*",
    );
  }

  // Busca o início aos 23 minutos e libera o vídeo assim que estiver pronto.
  function startLivePlayer() {
    if (youtubePlayer?.playVideo) {
      if (typeof youtubePlayer.seekTo === "function") {
        youtubePlayer.seekTo(1380, true);
      }
      if (isMuted) {
        youtubePlayer.mute();
        youtubePlayer.setVolume(0);
      } else {
        youtubePlayer.unMute();
        youtubePlayer.setVolume(100);
      }
      youtubePlayer.playVideo();
      return;
    }

    sendPlayerCommand("seekTo", [1380, true]);
    sendPlayerCommand(isMuted ? "mute" : "unMute");
    sendPlayerCommand("setVolume", [isMuted ? 0 : 100]);
    sendPlayerCommand("playVideo");
  }

  window.onYouTubeIframeAPIReady = () => {
    if (!window.YT?.Player || !iframe) {
      return;
    }

    youtubePlayer = new window.YT.Player("live-video", {
      events: {
        onReady: () => {
          startLivePlayer();
          window.setTimeout(startLivePlayer, 800);
        },
        onStateChange: (event) => {
          if (event.data === window.YT.PlayerState.ENDED) {
            youtubePlayer.seekTo(1380, true);
            youtubePlayer.playVideo();
          }
        },
      },
    });
  };

  // Inicializa no carregamento da API e mantém um fallback para redes lentas.
  if (window.YT?.Player) {
    window.onYouTubeIframeAPIReady();
  }
  iframe?.addEventListener("load", () => {
    window.setTimeout(startLivePlayer, 700);
  });
  window.setTimeout(startLivePlayer, 1800);

  // Atualiza o tempo da transmissão a partir do início configurado em 23:00.
  window.setInterval(() => {
    liveElapsedSeconds += 1;
    const minutes = Math.floor(liveElapsedSeconds / 60);
    const seconds = liveElapsedSeconds % 60;
    if (liveTime) {
      liveTime.textContent = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    }

  }, 1000);

  // Abre ou fecha o ajuste de volume sem interferir na reprodução.
  volumeControl?.addEventListener("click", () => {
    if (!volumePopover) {
      return;
    }

    const willOpen = volumePopover.hidden;
    volumePopover.hidden = !willOpen;
    volumeControl.setAttribute("aria-expanded", String(willOpen));
  });

  // Fecha o ajuste quando o visitante escolhe outro ponto da página.
  document.addEventListener("click", (event) => {
    if (
      volumePopover &&
      !volumePopover.hidden &&
      !event.target.closest(".live-volume-control")
    ) {
      volumePopover.hidden = true;
      volumeControl?.setAttribute("aria-expanded", "false");
    }
  });

  // Alterna mute pelo botão dentro da barra de volume.
  mutePopoverControl?.addEventListener("click", () => {
    isMuted = !isMuted;
    sendPlayerCommand(isMuted ? "mute" : "unMute");
    mutePopoverControl.setAttribute("aria-pressed", String(isMuted));
    mutePopoverControl.setAttribute(
      "aria-label",
      isMuted ? "Ativar som" : "Silenciar",
    );
    if (isMuted) {
      volumeOutput.textContent = "0%";
      return;
    }
    volumeRange.value = "100";
    volumeOutput.textContent = "100%";
    sendPlayerCommand("setVolume", [100]);
  });

  // Atualiza o volume do YouTube em tempo real pelo slider.
  volumeRange?.addEventListener("input", () => {
    const volume = Number(volumeRange.value);
    volumeOutput.textContent = `${volume}%`;
    sendPlayerCommand("setVolume", [volume]);
    isMuted = volume === 0;
    sendPlayerCommand(isMuted ? "mute" : "unMute");
    mutePopoverControl?.setAttribute("aria-pressed", String(isMuted));
    mutePopoverControl?.setAttribute(
      "aria-label",
      isMuted ? "Ativar som" : "Silenciar",
    );
  });

  // Usa o fullscreen nativo quando disponível e o fallback fixo em iPhone.
  const lockLandscapeOrientation = async () => {
    if (!window.screen) {
      return;
    }

    try {
      if (typeof window.screen.orientation?.lock === "function") {
        await window.screen.orientation.lock("landscape");
      } else if (typeof window.screen.lockOrientation === "function") {
        window.screen.lockOrientation("landscape");
      }
    } catch {
      // iPhone pode bloquear a API; o fallback permanece em tela cheia.
    }
  };

  const unlockLandscapeOrientation = () => {
    try {
      window.screen?.orientation?.unlock?.();
    } catch {
      // Alguns navegadores móveis não oferecem desbloqueio de orientação.
    }
  };

  const enterCssFullscreen = () => {
    if (!playerStage) {
      return;
    }

    playerStage.classList.add("is-css-fullscreen");
    document.body.classList.add("live-css-fullscreen");
    fullscreenControl?.setAttribute("aria-label", "Sair da tela cheia");
    lockLandscapeOrientation();
  };

  const exitCssFullscreen = () => {
    playerStage?.classList.remove("is-css-fullscreen");
    document.body.classList.remove("live-css-fullscreen");
    fullscreenControl?.setAttribute("aria-label", "Ativar tela cheia");
    unlockLandscapeOrientation();
  };

  fullscreenControl?.addEventListener("click", () => {
    if (document.fullscreenElement) {
      document.exitFullscreen?.();
      return;
    }

    if (playerStage?.classList.contains("is-css-fullscreen")) {
      exitCssFullscreen();
      return;
    }

    if (typeof document.documentElement?.requestFullscreen === "function") {
      try {
        const fullscreenRequest = document.documentElement.requestFullscreen({
          navigationUI: "hide",
        });
        fullscreenRequest?.then?.(() => {
          enterCssFullscreen();
          lockLandscapeOrientation();
        });
        fullscreenRequest?.catch?.(() => {
          if (typeof playerStage?.requestFullscreen === "function") {
            try {
              const stageRequest = playerStage.requestFullscreen();
              stageRequest?.catch?.(enterCssFullscreen);
              stageRequest?.then?.(lockLandscapeOrientation);
            } catch {
              enterCssFullscreen();
            }
          } else {
            enterCssFullscreen();
          }
        });
      } catch {
        if (typeof playerStage?.requestFullscreen === "function") {
          try {
            const stageRequest = playerStage.requestFullscreen();
            stageRequest?.catch?.(enterCssFullscreen);
            stageRequest?.then?.(lockLandscapeOrientation);
          } catch {
            enterCssFullscreen();
          }
        } else {
          enterCssFullscreen();
        }
      }
      return;
    }

    if (typeof playerStage?.requestFullscreen === "function") {
      try {
        const stageRequest = playerStage.requestFullscreen();
        stageRequest?.catch?.(enterCssFullscreen);
        stageRequest?.then?.(lockLandscapeOrientation);
      } catch {
        enterCssFullscreen();
      }
      return;
    }

    enterCssFullscreen();
  });

  // Fecha o fallback se a pessoa usar o gesto ou tecla de retorno.
  document.addEventListener("keydown", (event) => {
    if (
      event.key === "Escape" &&
      playerStage?.classList.contains("is-css-fullscreen")
    ) {
      exitCssFullscreen();
    }
  });

  // Atualiza o rótulo do botão durante o modo tela cheia nativo.
  document.addEventListener("fullscreenchange", () => {
    const isFullscreen = Boolean(document.fullscreenElement);
    fullscreenControl?.setAttribute(
      "aria-label",
      isFullscreen ? "Sair da tela cheia" : "Ativar tela cheia",
    );
    if (isFullscreen) {
      if (!playerStage?.classList.contains("is-css-fullscreen")) {
        enterCssFullscreen();
      }
      lockLandscapeOrientation();
    } else {
      exitCssFullscreen();
    }
  });

  window.addEventListener("orientationchange", () => {
    if (
      document.fullscreenElement ||
      playerStage?.classList.contains("is-css-fullscreen")
    ) {
      lockLandscapeOrientation();
    }
  });

  // Salva o estado de seguir apenas durante a navegação desta sessão.
  followButton?.addEventListener("click", () => {
    const isFollowing = followButton.getAttribute("aria-pressed") === "true";
    const nextState = !isFollowing;

    followButton.setAttribute("aria-pressed", String(nextState));
    followButton.textContent = nextState ? "Assinatura ativa" : "Assinar canal";
  });

  // Simula pequenas variações na quantidade de espectadores da transmissão.
  let viewers = 1284;
  window.setInterval(() => {
    if (!viewerCount) {
      return;
    }

    const change = Math.floor(Math.random() * 7) - 3;
    viewers = Math.max(1200, viewers + change);
    viewerCount.textContent = `${viewers.toLocaleString("pt-BR")} espectadores`;
  }, 4000);
})();

// Simula uma conversa ao vivo e permite que o visitante envie mensagens.
(() => {
  const messages = document.querySelector("#chat-messages");
  const chatForm = document.querySelector("#chat-form");
  const chatInput = document.querySelector("#chat-input");
  const channelSearchForm = document.querySelector(".channel-search");
  const channelSearchInput = document.querySelector("#channel-search-input");

  // Lista de nomes e frases usada para representar mensagens reais da comunidade.
  const simulatedUsers = [
    "MilaGames",
    "TicoTactics",
    "LunaCraft",
    "ByteNinja",
    "RafaArcano",
    "DudaPlay",
  ];

  const simulatedMessages = [
    "Essa correria ficou muito boa!",
    "Vamo BRKsEDU 🔥",
    "Perdeu o carro ali, cuidado!",
    "Primeira vez assistindo e já virei fã",
    "Essa missão está impossível 😂",
    "GTA sempre rende live!",
    "Ativa o modo difícil",
    "Alguém mais achou essa corrida insana?",
    "Boa jogada!",
  ];

  // Cria uma mensagem visual seguindo o mesmo avatar das redes da plataforma.
  function addMessage(name, text, isUser = false) {
    if (!messages) {
      return;
    }

    const message = document.createElement("article");
    message.className = "chat-message";

    const avatar = document.createElement("img");
    const avatarNumber = (name.length % 50) + 1;
    avatar.className = "chat-message__avatar";
    avatar.src = `https://i.pravatar.cc/80?img=${avatarNumber}`;
    avatar.alt = "";
    avatar.loading = "lazy";

    const content = document.createElement("div");
    content.className = "chat-message__content";

    const userName = document.createElement("span");
    userName.className = `chat-message__name${isUser ? " is-user" : ""}`;
    userName.textContent = name;

    content.appendChild(userName);
    content.append(document.createTextNode(text));
    message.append(avatar, content);
    messages.appendChild(message);
    messages.scrollTop = messages.scrollHeight;
  }

  // Inicializa o chat com uma conversa curta para parecer uma live já ativa.
  [
    ["MilaGames", "Essa abertura já começou muito boa!"],
    ["TicoTactics", "Alguém perdeu o carro logo no início 😂"],
    ["LunaCraft", "Salve, BRKsEDU! GTA VI é outro nível"],
    ["DudaPlay", "Esse roleplay está ficando insano"],
    ["ByteNinja", "Vamo pra mais uma missão!"],
  ].forEach(([name, text]) => addMessage(name, text));

  // Adiciona novas mensagens simuladas em intervalos aleatórios.
  window.setInterval(() => {
    const name =
      simulatedUsers[Math.floor(Math.random() * simulatedUsers.length)];
    const text =
      simulatedMessages[
        Math.floor(Math.random() * simulatedMessages.length)
      ];
    addMessage(name, text);
  }, 3500);

  // Permite que o visitante publique uma mensagem própria no chat.
  chatForm?.addEventListener("submit", (event) => {
    event.preventDefault();

    const text = chatInput.value.trim();
    if (!text) {
      return;
    }

    addMessage("Você", text, true);
    chatInput.value = "";
    chatInput.focus();
  });

  // Leva uma busca feita na página da live diretamente para os canais da página inicial.
  channelSearchForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    const query = channelSearchInput?.value.trim();
    const searchUrl = query
      ? `index.html?channel=${encodeURIComponent(query)}#canais`
      : "index.html#canais";
    window.location.href = searchUrl;
  });

  // Gerencia os valores e prêmios enviados como superchat.
  const supportForm = document.querySelector("#support-form");
  const supportMessage = document.querySelector("#support-message");
  const supportAmount = document.querySelector("#support-amount");
  const supportTier = document.querySelector("#support-tier");
  const supportAmountButtons = [
    ...document.querySelectorAll("[data-support-amount]"),
  ];
  const superchatContainer = document.querySelector("#live-superchats");

  // Atualiza o prêmio selecionado antes do envio.
  supportAmountButtons.forEach((button) => {
    button.addEventListener("click", () => {
      supportAmountButtons.forEach((item) => item.classList.remove("is-selected"));
      button.classList.add("is-selected");
      supportAmount.value = button.dataset.supportAmount;
      supportTier.value = button.dataset.supportTier;
    });
  });

  // Cria um superchat visual sobre o player e também registra no chat.
  supportForm?.addEventListener("submit", (event) => {
    event.preventDefault();

    const message = supportMessage.value.trim();
    const amount = Number(supportAmount.value);
    const tierName = supportTier.value;
    if (!message || !amount) {
      return;
    }

    if (superchatContainer) {
      const superchat = document.createElement("article");
      superchat.className = `live-superchat${amount >= 25 ? " is-premium" : ""}${amount >= 50 ? " is-legendary" : ""}`;

      const header = document.createElement("div");
      header.className = "live-superchat__header";

      const name = document.createElement("span");
      name.textContent = "Você";

      const tier = document.createElement("span");
      tier.className = "live-superchat__tier";
      tier.textContent = tierName;

      const value = document.createElement("span");
      value.className = "live-superchat__amount";
      value.textContent = `R$ ${amount.toLocaleString("pt-BR")}`;

      const text = document.createElement("p");
      text.textContent = message;

      header.append(name, tier, value);
      superchat.append(header, text);
      superchatContainer.prepend(superchat);

      while (superchatContainer.children.length > 3) {
        superchatContainer.lastElementChild.remove();
      }

      window.setTimeout(() => superchat.remove(), 9000);
    }

    addMessage("Você", `${tierName} • R$ ${amount.toLocaleString("pt-BR")}: ${message}`, true);
    supportMessage.value = "";
  });
})();
