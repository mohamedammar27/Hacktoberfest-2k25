const games = [
  {
    name: "Catch The Dot 🎯",
    path: "catch_the_dot/index.html",
    description: "Test your reflexes by clicking the dot!",
    type: "Arcade",
    players: "1 player"
  },
  {
    name: "Tic Tac Toe ❎",
    path: "tic_tac_toe/index.html",
    description: "Classic 3x3 strategy. Outsmart your opponent!",
    type: "Strategy",
    players: "2 players"
  },

  {
  name: "Rock Paper Scissors ✊✋✌️",
  path: "rock_paper_scissors_2p/index.html",
  description: "Challenge your friend in this classic hand game. Best of fun!",
  type: "Strategy",
  players: "2 players"
  }, 


];

const gameList = document.getElementById("gameList");
const searchInput = document.getElementById("search");

function displayGames(filteredGames) {
  gameList.innerHTML = "";
  filteredGames.forEach(game => {
    const card = document.createElement("div");
    card.className = "game-card";
    card.innerHTML = `
      <h3>${game.name}</h3>
      <p>${game.description}</p>
      <p>Type: ${game.type} | Players: ${game.players}</p>
      <a href="${game.path}" target="_blank">Play Now ▶</a>
    `;
    gameList.appendChild(card);
  });
}

searchInput.addEventListener("input", e => {
  const searchTerm = e.target.value.toLowerCase();
  const filteredGames = games.filter(game =>
    game.name.toLowerCase().includes(searchTerm)
  );
  displayGames(filteredGames);
});

// Initial display
displayGames(games);
