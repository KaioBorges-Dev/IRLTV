// =====================================================================
// BANCO DE DADOS PERSONALIZADO DOS 5 STREAMERS DA IRLTV
// =====================================================================
const perfisIRLTV = {
  brksedu: {
    nome: "BRKsEDU",
    categoria: "GTA VI",
    seguidores: 142850,
    seguindo: 42,
    espectadores: "1.284",
    avatar: "https://yt3.googleusercontent.com/ytc/AIdro_lRcGaSpIGYKDAgSNDKOVadxL5tUwqzgx4_Uglmq-s-Dbw=s160-c-k-c0x00ffffff-no-rj",
    banner: "https://i.ytimg.com/vi/BG_y4qpQA-g/hqdefault.jpg",
    bio: "Domingo de GTA VI na IRLTV: missões, corridas e muita confusão pelas ruas de Los Santos com a comunidade.",
    sobreCompleto: "Canal oficial de BRKsEDU na IRLTV. Gameplays diárias, lançamentos AAA, séries completas e interação ao vivo com o chat.",
    tags: ["GTA VI", "Roleplay", "PT-BR", "Lançamentos"],
    liveTitulo: "Correndo sem limites em Los Santos",
    liveSubtitulo: "Grand Theft Auto VI • Roleplay • PT-BR",
    setup: [
      { peca: "Processador", valor: "AMD Ryzen 9 7950X" },
      { peca: "Placa de Vídeo", valor: "NVIDIA GeForce RTX 4090 24GB" },
      { peca: "Memória RAM", valor: "64GB DDR5 6000MHz" },
      { peca: "Microfone", valor: "Shure SM7B + GoXLR" }
    ],
    agenda: [
      { dia: "SEGUNDA", horario: "19:00 - 23:00", tema: "Campanha Principal - GTA VI" },
      { dia: "QUARTA", horario: "20:00 - 23:30", tema: "Primeiras Impressões e Lançamentos" },
      { dia: "DOMINGO", horario: "18:00 - 22:00", tema: "Roleplay com a Comunidade" }
    ],
    vods: [
      {
        titulo: "Correndo sem limites em Los Santos - Parte 1",
        info: "GTA VI • 18,4 mil visualizações",
        duracao: "03:42:18",
        capa: "https://i.ytimg.com/vi/BG_y4qpQA-g/hqdefault.jpg"
      },
      {
        titulo: "Testando Elden Ring no modo desafio",
        info: "Elden Ring • 12,1 mil visualizações",
        duracao: "02:15:40",
        capa: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1245620/library_600x900.jpg"
      },
      {
        titulo: "Competitivo intenso com os inscritos",
        info: "Counter-Strike 2 • 9,7 mil visualizações",
        duracao: "04:10:05",
        capa: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/730/library_600x900.jpg"
      }
    ]
  },

  lunacraft: {
    nome: "LunaCraft",
    categoria: "Minecraft",
    seguidores: 89420,
    seguindo: 31,
    espectadores: "846",
    avatar: "https://i.pravatar.cc/160?img=12",
    banner: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/367520/library_600x900.jpg",
    bio: "Construindo uma cidade do zero no Minecraft sobrevivência e explorando mundos criativos com o chat.",
    sobreCompleto: "Bem-vindos ao canal da LunaCraft! Aqui criamos megaconstruções, sistemas de redstone e aventuras em grupo.",
    tags: ["Minecraft", "Construção", "Sobrevivência", "Cozy"],
    liveTitulo: "Construindo uma cidade do zero",
    liveSubtitulo: "Minecraft • Sobrevivência • PT-BR",
    setup: [
      { peca: "Processador", valor: "Intel Core i7-13700K" },
      { peca: "Placa de Vídeo", valor: "NVIDIA GeForce RTX 4070 Ti" },
      { peca: "Memória RAM", valor: "32GB DDR5 5600MHz" },
      { peca: "Microfone", valor: "HyperX QuadCast S" }
    ],
    agenda: [
      { dia: "TERÇA", horario: "18:30 - 22:00", tema: "Série Cidade do Zero - Ep. Novos" },
      { dia: "QUINTA", horario: "19:00 - 22:30", tema: "Laboratório de Redstone" },
      { dia: "SÁBADO", horario: "15:00 - 19:00", tema: "Servidor Aberto com Inscritos" }
    ],
    vods: [
      {
        titulo: "Construindo uma cidade do zero - Ep. 14",
        info: "Minecraft • 6,2 mil visualizações",
        duracao: "02:50:12",
        capa: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/367520/library_600x900.jpg"
      },
      {
        titulo: "Explorando cavernas profundas e chefes",
        info: "Hollow Knight • 4,8 mil visualizações",
        duracao: "01:58:30",
        capa: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1245620/library_600x900.jpg"
      },
      {
        titulo: "Decorando casas modernas com o chat",
        info: "The Sims 4 • 5,1 mil visualizações",
        duracao: "03:05:44",
        capa: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1222670/library_600x900.jpg"
      }
    ]
  },

  byteninja: {
    nome: "ByteNinja",
    categoria: "League of Legends",
    seguidores: 64110,
    seguindo: 19,
    espectadores: "930",
    avatar: "https://i.pravatar.cc/160?img=32",
    banner: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Ahri_0.jpg",
    bio: "Subindo de elo no servidor brasileiro, dicas de rota mid e análise de partidas competitivas.",
    sobreCompleto: "Foco total em estratégia, mecânica de campeões e partidas ranqueadas de alto nível no League of Legends.",
    tags: ["LoL", "Mid Lane", "Ranqueada", "Competitivo"],
    liveTitulo: "Do Diamante ao Mestre hoje sem tiltar",
    liveSubtitulo: "League of Legends • Ranqueada • PT-BR",
    setup: [
      { peca: "Processador", valor: "AMD Ryzen 7 7800X3D" },
      { peca: "Placa de Vídeo", valor: "NVIDIA GeForce RTX 4070" },
      { peca: "Monitor", valor: "240Hz IPS 1ms" },
      { peca: "Periféricos", valor: "Logitech G Pro X Superlight" }
    ],
    agenda: [
      { dia: "SEGUNDA", horario: "20:00 - 00:00", tema: "Rush SoloQ - Rota Mid" },
      { dia: "QUARTA", horario: "20:00 - 23:00", tema: "Analisando Replays dos Inscritos" },
      { dia: "SEXTA", horario: "21:00 - 01:00", tema: "Clash e Campeonatos" }
    ],
    vods: [
      {
        titulo: "Guia completo de controle de rota com Ahri",
        info: "League of Legends • 11,3 mil visualizações",
        duracao: "02:34:10",
        capa: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Ahri_0.jpg"
      },
      {
        titulo: "Torneio da comunidade IRLTV - Semifinal",
        info: "Dota 2 • 7,9 mil visualizações",
        duracao: "03:18:22",
        capa: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/570/library_600x900.jpg"
      },
      {
        titulo: "Treino de reflexo e mira competitiva",
        info: "Counter-Strike 2 • 8,4 mil visualizações",
        duracao: "01:49:55",
        capa: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/730/library_600x900.jpg"
      }
    ]
  },

  pixelmila: {
    nome: "PixelMila",
    categoria: "The Sims 4",
    seguidores: 51300,
    seguindo: 54,
    espectadores: "612",
    avatar: "https://i.pravatar.cc/160?img=47",
    banner: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1222670/library_600x900.jpg",
    bio: "Arquitetura moderna, desafios de construção sem código e histórias criativas ao vivo.",
    sobreCompleto: "Canal dedicado a simulação, design de interiores e séries interativas decididas pelas enquetes do chat.",
    tags: ["The Sims 4", "Arquitetura", "Design", "Criativo"],
    liveTitulo: "Reformando uma mansão futurista em 2 horas",
    liveSubtitulo: "The Sims 4 • Construção • PT-BR",
    setup: [
      { peca: "Processador", valor: "Intel Core i5-13600K" },
      { peca: "Placa de Vídeo", valor: "NVIDIA GeForce RTX 4060 Ti" },
      { peca: "Memória RAM", valor: "32GB DDR4 3600MHz" },
      { peca: "Câmera", valor: "Sony ZV-E10 4K" }
    ],
    agenda: [
      { dia: "QUARTA", horario: "17:00 - 20:30", tema: "Desafio de Construção Rápida" },
      { dia: "SEXTA", horario: "18:00 - 21:30", tema: "Novela Interativa com o Chat" },
      { dia: "DOMINGO", horario: "16:00 - 19:30", tema: "Tour pelas Casas da Comunidade" }
    ],
    vods: [
      {
        titulo: "Desafio da casa de R$ 10.000 no The Sims 4",
        info: "The Sims 4 • 9,4 mil visualizações",
        duracao: "02:41:09",
        capa: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1222670/library_600x900.jpg"
      },
      {
        titulo: "Aventura em mundo aberto com inscritos",
        info: "Genshin Impact • 6,7 mil visualizações",
        duracao: "03:12:40",
        capa: "https://act-webstatic.hoyoverse.com/puzzle/hk4e/pz_c6XZYm0GKS/resource/puzzle/2026/10/19/d138d1ad3bf6f5240eb726ed2ac3d4b0_1292059728731863742.mp4?x-oss-process=video/snapshot,t_1,f_jpg,m_fast"
      },
      {
        titulo: "Partidas casuais de sexta-feira à noite",
        info: "Rocket League • 4,2 mil visualizações",
        duracao: "02:05:18",
        capa: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/252950/library_600x900.jpg"
      }
    ]
  },

  nekorush: {
    nome: "NekoRush",
    categoria: "Fortnite",
    seguidores: 112900,
    seguindo: 27,
    espectadores: "1.200",
    avatar: "https://i.pravatar.cc/160?img=5",
    banner: "https://cms-assets.unrealengine.com/cm6l5gfpm05kr07my04cqgy2x/output=format:webp/cmvpko1451jk407ogh9sqvg8k",
    bio: "Ranqueada até o Imortal, campeonatos de Battle Royale e treinos de movimentação rápida.",
    sobreCompleto: "Lives competitivas todos os dias com foco em Battle Royale, FPS tático e torneios com a galera da IRLTV.",
    tags: ["Fortnite", "Battle Royale", "Zero Build", "Torneios"],
    liveTitulo: "Ranqueada até o Imortal",
    liveSubtitulo: "Fortnite • Battle Royale • PT-BR",
    setup: [
      { peca: "Processador", valor: "AMD Ryzen 9 7900X" },
      { peca: "Placa de Vídeo", valor: "NVIDIA GeForce RTX 4080" },
      { peca: "Monitor", valor: "ASUS ROG 360Hz" },
      { peca: "Headset", valor: "Logitech G Pro X 2 Lightspeed" }
    ],
    agenda: [
      { dia: "SEGUNDA", horario: "18:00 - 22:00", tema: "Arena Solo - Rumo ao Surreal" },
      { dia: "QUINTA", horario: "19:00 - 23:00", tema: "Squad com Streamers da IRLTV" },
      { dia: "SÁBADO", horario: "20:00 - 00:00", tema: "Campeonato Valendo V-Bucks" }
    ],
    vods: [
      {
        titulo: "Vitória Royale solo com 18 eliminações",
        info: "Fortnite • 15,8 mil visualizações",
        duracao: "03:29:45",
        capa: "https://cms-assets.unrealengine.com/cm6l5gfpm05kr07my04cqgy2x/output=format:webp/cmvpko1451jk407ogh9sqvg8k"
      },
      {
        titulo: "Subindo de rank em trio no Apex Legends",
        info: "Apex Legends • 10,2 mil visualizações",
        duracao: "02:54:11",
        capa: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1172470/library_600x900.jpg"
      },
      {
        titulo: "Torneio relâmpago de Rocket League",
        info: "Rocket League • 7,5 mil visualizações",
        duracao: "01:55:30",
        capa: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/252950/library_600x900.jpg"
      }
    ]
  }
};

let seguindo = false;
let totalSeguidores = 0;

// =====================================================================
// PREENCHE O PERFIL DO STREAMER ESCOLHIDO
// =====================================================================
function carregarStreamer(chave) {
  const dados = perfisIRLTV[chave] || perfisIRLTV.brksedu;

  document.getElementById("topbar-titulo").textContent = `Canal • ${dados.nome}`;
  document.getElementById("streamer-nome").textContent = dados.nome;
  document.getElementById("streamer-categoria").textContent = dados.categoria;
  document.getElementById("streamer-bio").textContent = dados.bio;
  document.getElementById("sobre-texto-completo").textContent = dados.sobreCompleto;
  document.getElementById("streamer-avatar").src = dados.avatar;
  document.getElementById("perfil-banner").style.backgroundImage = `url("${dados.banner}")`;

  document.getElementById("live-capa").src = dados.banner;
  document.getElementById("live-titulo").textContent = dados.liveTitulo;
  document.getElementById("live-subtitulo").textContent = dados.liveSubtitulo;

  seguindo = false;
  totalSeguidores = dados.seguidores;

  document.querySelector(".perfil-meta__stats").innerHTML = `
    <span><strong id="contador-seguidores">${totalSeguidores.toLocaleString("pt-BR")}</strong> seguidores</span>
    <span class="dot-sep">•</span>
    <span><strong>${dados.seguindo}</strong> seguindo</span>
    <span class="dot-sep">•</span>
    <span><strong>${dados.espectadores}</strong> assistindo agora</span>
  `;

  const btnSeguir = document.getElementById("btn-seguir");
  btnSeguir.classList.remove("is-following");
  document.getElementById("texto-seguir").textContent = "Seguir";

  // Preenche tags, setup do PC e agenda do streamer
  document.querySelector(".perfil-tags").innerHTML = dados.tags
    .map((tag) => `<span>${tag}</span>`)
    .join("");

  document.querySelector(".perfil-specs").innerHTML = dados.setup
    .map((item) => `<li><strong>${item.peca}:</strong> ${item.valor}</li>`)
    .join("");

  document.querySelector(".perfil-schedule").innerHTML = dados.agenda
    .map(
      (item) => `
      <div class="perfil-schedule__row">
        <span class="perfil-day">${item.dia}</span>
        <strong>${item.horario}</strong>
        <span>${item.tema}</span>
      </div>
    `
    )
    .join("");

  // Preenche as lives já feitas (VODs)
  document.getElementById("lista-vods").innerHTML = dados.vods
    .map(
      (vod) => `
      <article class="card vod-card">
        <div class="vod-card__thumb">
          <img src="${vod.capa}" alt="${vod.titulo}" loading="lazy">
          <span class="vod-card__badge">GRAVADO</span>
          <span class="vod-card__duration">${vod.duracao}</span>
        </div>
        <div class="vod-card__body">
          <h4>${vod.titulo}</h4>
          <p>${vod.info}</p>
        </div>
      </article>
    `
    )
    .join("");

  // Destaca o streamer ativo na barra lateral
  document.querySelectorAll(".sidebar__channel-link").forEach((link) => {
    const ehAtual = link.getAttribute("href").includes(`canal=${chave}`);
    link.style.backgroundColor = ehAtual ? "var(--card)" : "";
  });
}

// Botões Seguir, Assinar e Notificações
document.getElementById("btn-seguir").addEventListener("click", function () {
  seguindo = !seguindo;
  totalSeguidores += seguindo ? 1 : -1;
  this.classList.toggle("is-following", seguindo);
  document.getElementById("texto-seguir").textContent = seguindo ? "Seguindo" : "Seguir";
  document.getElementById("contador-seguidores").textContent = totalSeguidores.toLocaleString("pt-BR");
});

document.getElementById("btn-assinar").addEventListener("click", function () {
  const assinado = this.classList.toggle("is-subscribed");
  this.textContent = assinado ? "Canal assinado ✓" : "Assinar canal";
});

document.getElementById("btn-notificar").addEventListener("click", function () {
  this.classList.toggle("is-active");
});

// Troca de abas (VODs, Sobre e Setup, Agenda)
const abas = document.querySelectorAll(".perfil-tab");
const paineis = document.querySelectorAll(".perfil-panel");

abas.forEach((aba) => {
  aba.addEventListener("click", () => {
    abas.forEach((item) => item.classList.remove("is-active"));
    paineis.forEach((painel) => painel.classList.remove("is-active"));
    aba.classList.add("is-active");
    document.getElementById(aba.dataset.tab).classList.add("is-active");
  });
});

// Troca instantânea ao clicar nos streamers da sidebar
document.querySelectorAll(".sidebar__channel-link").forEach((link) => {
  link.addEventListener("click", (event) => {
    const url = new URL(link.href);
    const canalClicado = url.searchParams.get("canal");
    if (canalClicado && perfisIRLTV[canalClicado]) {
      event.preventDefault();
      window.history.pushState({}, "", `?canal=${canalClicado}`);
      carregarStreamer(canalClicado);
    }
  });
});

// Busca pelo nome do canal na barra superior
document.getElementById("form-busca-perfil").addEventListener("submit", (event) => {
  event.preventDefault();
  const termo = document.getElementById("input-busca-perfil").value.trim().toLowerCase();
  if (perfisIRLTV[termo]) {
    window.history.pushState({}, "", `?canal=${termo}`);
    carregarStreamer(termo);
  }
});

// Carrega o canal vindo da URL (padrão: brksedu)
const params = new URLSearchParams(window.location.search);
const canalInicial = (params.get("canal") || "brksedu").toLowerCase();
carregarStreamer(canalInicial);