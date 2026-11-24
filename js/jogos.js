// Filtra a lista de jogos pelo nome ou pelo gênero informado.
const gameSearchInput = document.querySelector("#game-search");
const gameSearchForm = document.querySelector(".channel-search");
const gameCards = Array.from(document.querySelectorAll(".game-card"));
const gameResults = document.querySelector("#game-results");
const gamesEmptyMessage = document.querySelector("#games-empty");

// Remove acentos e diferenças de caixa para facilitar a busca.
function normalizeGameText(text) {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("pt-BR")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

// Atualiza os cards visíveis e informa quantos resultados foram encontrados.
function filterGames() {
  const searchTerm = normalizeGameText(gameSearchInput.value);
  let visibleGames = 0;

  gameCards.forEach((card) => {
    const gameText = normalizeGameText(card.textContent);
    const matches =
      !searchTerm ||
      gameText.startsWith(searchTerm) ||
      gameText.includes(` ${searchTerm}`);
    card.hidden = !matches;
    visibleGames += Number(matches);
  });

  gameResults.textContent = `${visibleGames} ${visibleGames === 1 ? "jogo encontrado" : "jogos encontrados"}`;
  gamesEmptyMessage.hidden = visibleGames > 0;
}

// Atualiza os resultados enquanto o texto da busca é digitado.
gameSearchInput.addEventListener("input", filterGames);

// Mantém a busca no mesmo documento quando o formulário do topo é enviado.
gameSearchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  filterGames();
});
