// Controla os elementos interativos da página de transmissão ao vivo.
(() => {
  const iframe = document.querySelector("#live-video");
  const playerStage = document.querySelector("#live-player-stage");
  const muteControl = document.querySelector("#mute-control");
  const fullscreenControl = document.querySelector("#fullscreen-control");
  const followButton = document.querySelector("#follow-button");
  const viewerCount = document.querySelector("#live-viewers");

  let isMuted = true;

  // Impede cliques internos, clique duplo e menu do vídeo da plataforma externa.
  playerStage?.addEventListener("dblclick", (event) => event.preventDefault());
  playerStage?.addEventListener("contextmenu", (event) => event.preventDefault());

  // Envia comandos para o player oficial do YouTube sem redirecionar o visitante.
  function sendPlayerCommand(command, args = []) {
    iframe?.contentWindow?.postMessage(
      JSON.stringify({ event: "command", func: command, args }),
      "*",
    );
  }

  // Reinicia a reprodução assim que o player termina de carregar.
  iframe?.addEventListener("load", () => {
    sendPlayerCommand("playVideo");
  });

  // Alterna o áudio do player e atualiza seu estado acessível.
  muteControl?.addEventListener("click", () => {
    isMuted = !isMuted;
    sendPlayerCommand(isMuted ? "mute" : "unMute");
    muteControl.setAttribute("aria-pressed", String(isMuted));
    muteControl.setAttribute(
      "aria-label",
      isMuted ? "Ativar som" : "Silenciar",
    );
  });

  // Solicita tela cheia para a área completa que contém o vídeo.
  fullscreenControl?.addEventListener("click", () => {
    if (!document.fullscreenElement) {
      playerStage?.requestFullscreen?.();
      return;
    }

    document.exitFullscreen?.();
  });

  // Atualiza o rótulo do botão durante o modo tela cheia.
  document.addEventListener("fullscreenchange", () => {
    const isFullscreen = Boolean(document.fullscreenElement);
    fullscreenControl?.setAttribute(
      "aria-label",
      isFullscreen ? "Sair da tela cheia" : "Ativar tela cheia",
    );
  });

  // Salva o estado de seguir apenas durante a navegação desta sessão.
  followButton?.addEventListener("click", () => {
    const isFollowing = followButton.getAttribute("aria-pressed") === "true";
    const nextState = !isFollowing;

    followButton.setAttribute("aria-pressed", String(nextState));
    followButton.textContent = nextState ? "Seguindo" : "Seguir";
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
    ["LunaCraft", "Salve, BRKsEDU! GTA V é outro nível"],
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
})();
