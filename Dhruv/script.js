const gameArea = document.getElementById("game-area");
const input = document.getElementById("word-input");
const scoreDisplay = document.getElementById("score");
const timeDisplay = document.getElementById("time");
const restartBtn = document.getElementById("restart-btn");

let words = [
    "samurai", "blade", "katana", "ninja", "dojo", "honor", "battle", "strike", "focus", "swift",
    "shadow", "shuriken", "dragon", "warrior", "zen", "master", "speed", "discipline", "sword", "fight",
    "guard", "armor", "enemy", "attack", "defend", "slash", "parry", "kick", "jump", "duck", "run",
    "strike", "power", "strength", "agility", "courage", "spirit", "mission", "quest", "victory", "loss",
    "challenge", "skill", "training", "technique", "strategy", "tactic", "honesty", "loyalty", "wisdom", "patience",
    "fire", "ice", "wind", "earth", "water", "storm", "thunder", "lightning", "moon", "sun",
    "star", "sky", "cloud", "rain", "snow", "mountain", "forest", "river", "ocean", "desert",
    "sand", "stone", "metal", "wood", "steel", "iron", "gold", "silver", "bronze", "crystal",
    "jade", "ruby", "emerald", "sapphire", "diamond", "pearl", "rose", "lotus", "cherry", "pine",
    "oak", "maple", "cactus", "bamboo", "vine", "leaf", "flower", "root", "seed", "fruit",
    "heart", "soul", "mind", "body", "spirit", "life", "death", "destiny", "fate", "honor", "glory"
];

let fallingWords = [];
let score = 0;
let timeLeft = 60;
let gameInterval;
let fallInterval;
let gameOver = false;

// Spawn new words
function spawnWord() {
    const word = document.createElement("div");
    word.classList.add("word");
    word.textContent = words[Math.floor(Math.random() * words.length)];
    word.style.left = `${Math.random() * 80 + 10}%`;

    // random start top between 0 and 50px
    word.style.top = `${Math.random() * 50}px`;

    gameArea.appendChild(word);

    fallingWords.push({
        element: word,
        y: parseFloat(word.style.top),
        speed: Math.random() * 1.6 + 0.8 // slightly faster than before
    });

}


// Animate words falling
function updateWords() {
    for (let i = fallingWords.length - 1; i >= 0; i--) {
        let w = fallingWords[i];
        w.y += w.speed;
        w.element.style.top = `${w.y}px`;

        if (w.y > 370) {
            endGame();
            break;
        }
    }
}

// Check typed word
input.addEventListener("input", () => {
    const typed = input.value.trim().toLowerCase();
    for (let i = 0; i < fallingWords.length; i++) {
        const w = fallingWords[i];
        if (typed === w.element.textContent.toLowerCase()) {
            gameArea.removeChild(w.element);
            fallingWords.splice(i, 1);
            score += 10;
            scoreDisplay.textContent = score;
            input.value = "";
            break;
        }
    }
});

// Countdown timer
function updateTime() {
    timeLeft--;
    timeDisplay.textContent = timeLeft;
    if (timeLeft <= 0) endGame();
}

// End the game
function endGame() {
    if (gameOver) return;
    gameOver = true;
    clearInterval(gameInterval);
    clearInterval(fallInterval);
    alert(`Game Over! Your score: ${score}`);
}

// Restart
restartBtn.addEventListener("click", startGame);

function startGame() {
    // Reset
    gameArea.innerHTML = "";
    input.value = "";
    score = 0;
    timeLeft = 60;
    gameOver = false;
    scoreDisplay.textContent = "0";
    timeDisplay.textContent = "60";

    fallingWords = [];
    gameInterval = setInterval(updateTime, 1000);

    // slower spawn: 1 word every 400ms
    fallInterval = setInterval(() => {
        if (fallingWords.length < 8) { // max 8 words at a time
            spawnWord();
        }
        updateWords();
    }, 400);

}

startGame();
