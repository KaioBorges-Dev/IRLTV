let aoVivo = false;
let segundosLive = 0;
let intervaloCronometro = null;
let intervaloChatBot = null;

const mensagensSimuladas = [
  { user: 'Lucas_DevBR', texto: 'Salve! Qualidade da live tá impecável hoje 🔥' },
  { user: 'MarianaGames', texto: 'Essa interface da IRLTV ficou muito clean!' },
  { user: 'DevParaiba', texto: 'Bora codar! O que vai sair hoje?' },
  { user: 'AnaTech', texto: 'Cheguei agora, já deixei o follow!' }
];

function mudarAba(event, abaId) {
  event.preventDefault();

  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('active');
  });
  event.currentTarget.classList.add('active');

  document.querySelectorAll('.tab-section').forEach(sec => {
    sec.classList.add('hidden');
  });
  document.getElementById('tab-' + abaId).classList.remove('hidden');
}

function formatarTempo(totalSegundos) {
  const h = String(Math.floor(totalSegundos / 3600)).padStart(2, '0');
  const m = String(Math.floor((totalSegundos % 3600) / 60)).padStart(2, '0');
  const s = String(totalSegundos % 60).padStart(2, '0');
  return `${h}:${m}:${s}`;
}

function alternarLive() {
  aoVivo = !aoVivo;
  const badge = document.getElementById('status-badge');
  const btn = document.getElementById('btn-toggle-live');
  const videoText = document.getElementById('video-text');
  const videoBox = document.getElementById('video-box');
  const viewers = document.getElementById('viewers-count');
  const time = document.getElementById('stream-time');
  const qualidade = document.getElementById('cfg-quality').value;

  if (aoVivo) {
    badge.textContent = 'AO VIVO';
    badge.className = 'badge live';
    btn.textContent = 'Encerrar Transmissão';
    btn.style.background = 'var(--live)';
    btn.style.color = 'var(--text)';
    videoBox.classList.add('live-active');
    videoText.textContent = `🔴 Sinal de vídeo conectado (${qualidade})`;
    viewers.textContent = '48';

    segundosLive = 0;
    intervaloCronometro = setInterval(() => {
      segundosLive++;
      time.textContent = formatarTempo(segundosLive);

      const variacao = Math.floor(Math.random() * 5) - 2;
      const atual = Math.max(12, parseInt(viewers.textContent) + variacao);
      viewers.textContent = atual;
    }, 1000);

    let idx = 0;
    intervaloChatBot = setInterval(() => {
      const msg = mensagensSimuladas[idx % mensagensSimuladas.length];
      adicionarMensagemChat(msg.user, msg.texto, '#A1A1AA');
      idx++;
    }, 5000);

  } else {
    badge.textContent = 'OFFLINE';
    badge.className = 'badge offline';
    btn.textContent = 'Iniciar Transmissão';
    btn.style.background = 'var(--primary)';
    btn.style.color = 'var(--background)';
    videoBox.classList.remove('live-active');
    videoText.textContent = 'A transmissão está offline no momento.';
    viewers.textContent = '0';
    time.textContent = '00:00:00';

    clearInterval(intervaloCronometro);
    clearInterval(intervaloChatBot);
  }
}

function salvarInfo(event) {
  event.preventDefault();
  const titulo = document.getElementById('stream-title').value;
  const categoria = document.getElementById('stream-category').value;
  adicionarMensagemChat('Sistema', `Live atualizada: "${titulo}" [${categoria}]`, 'var(--primary)');
  alert(`Informações atualizadas!\nTítulo: ${titulo}\nCategoria: ${categoria}`);
}

function adicionarMensagemChat(autor, texto, cor) {
  const chatBox = document.getElementById('chat-box');
  const novaMsg = document.createElement('p');
  novaMsg.innerHTML = `<strong style="color: ${cor};">${autor}:</strong> ${texto}`;
  chatBox.appendChild(novaMsg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function enviarMensagem(event) {
  event.preventDefault();
  const input = document.getElementById('chat-input');
  if (input.value.trim() !== '') {
    adicionarMensagemChat('Você (Streamer)', input.value, 'var(--primary)');
    input.value = '';
  }
}

function atualizarRegrasChat() {
  const slow = document.getElementById('mod-slow').checked;
  const followers = document.getElementById('mod-followers').checked;
  const tag = document.getElementById('chat-mode-tag');
  const feedback = document.getElementById('mod-feedback');

  let modos = [];
  if (slow) modos.push('Modo Lento');
  if (followers) modos.push('Só Seguidores');

  tag.textContent = modos.length > 0 ? modos.join(' • ') : 'Chat Aberto';
  feedback.textContent = 'Regras do chat atualizadas!';
  setTimeout(() => feedback.textContent = '', 3000);
}

function limparChat() {
  const chatBox = document.getElementById('chat-box');
  chatBox.innerHTML = `<p><strong style="color: var(--primary);">Sistema:</strong> O chat foi limpo pela moderação.</p>`;
  const feedback = document.getElementById('mod-feedback');
  feedback.textContent = 'Histórico do chat limpo com sucesso!';
  setTimeout(() => feedback.textContent = '', 3000);
}

function punirUsuario(usuario, acao) {
  adicionarMensagemChat('Moderação', `${usuario} recebeu: ${acao}.`, 'var(--live)');
  const feedback = document.getElementById('mod-feedback');
  feedback.textContent = `Ação aplicada em ${usuario}: ${acao}`;
  setTimeout(() => feedback.textContent = '', 3500);
}


function atualizarGrafico() {
  const periodo = document.getElementById('stats-period').value;
  const chart = document.getElementById('stats-chart');

  const dados = periodo === 'semana'
    ? [
        { dia: 'Seg', valor: 65 },
        { dia: 'Ter', valor: 90 },
        { dia: 'Qua', valor: 75 },
        { dia: 'Qui', valor: 120 },
        { dia: 'Sex', valor: 155 },
        { dia: 'Sáb', valor: 184 },
        { dia: 'Dom', valor: 140 }
      ]
    : [
        { dia: 'Sem 1', valor: 82 },
        { dia: 'Sem 2', valor: 110 },
        { dia: 'Sem 3', valor: 145 },
        { dia: 'Sem 4', valor: 184 }
      ];

  const maxValor = Math.max(...dados.map(d => d.valor));
  chart.innerHTML = '';

  dados.forEach(item => {
    const alturaPercent = Math.round((item.valor / maxValor) * 100);
    const col = document.createElement('div');
    col.className = 'chart-bar-wrapper';
    col.innerHTML = `
      <span class="chart-value">${item.valor}</span>
      <div class="chart-bar" style="height: ${alturaPercent}%;"></div>
      <span class="chart-label">${item.dia}</span>
    `;
    chart.appendChild(col);
  });
}
function alternarVisibilidadeChave() {
  const input = document.getElementById('stream-key-input');
  const btn = document.getElementById('btn-show-key');
  if (input.type === 'password') {
    input.type = 'text';
    btn.textContent = 'Ocultar';
  } else {
    input.type = 'password';
    btn.textContent = 'Mostrar';
  }
}

function copiarChave() {
  const input = document.getElementById('stream-key-input');
  navigator.clipboard.writeText(input.value);
  const feedback = document.getElementById('key-feedback');
  feedback.textContent = 'Chave de transmissão copiada para a área de transferência!';
  setTimeout(() => feedback.textContent = '', 3000);
}

function salvarConfiguracoes(event) {
  event.preventDefault();
  alert('Preferências de transmissão salvas com sucesso!');
}

atualizarGrafico();
