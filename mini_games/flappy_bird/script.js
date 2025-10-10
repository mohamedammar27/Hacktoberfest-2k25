// Responsive canvas setup
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Adjust canvas to fit the screen nicely
function resizeCanvas() {
  const width = Math.min(window.innerWidth * 0.9, 420);
  const height = Math.min(window.innerHeight * 0.7, 600);
  canvas.width = width;
  canvas.height = height;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

let frames = 0;
const DEGREE = Math.PI / 180;

// Game states
const state = {
  current: 0,
  getReady: 0,
  game: 1,
  over: 2,
};

// Control input
window.addEventListener("keydown", (e) => {
  if (e.code === "Space" || e.key === " ") {
    e.preventDefault();
    handleInput();
  }
});
canvas.addEventListener("click", handleInput);

function handleInput() {
  switch (state.current) {
    case state.getReady:
      state.current = state.game;
      break;
    case state.game:
      bird.flap();
      break;
    case state.over:
      resetGame();
      break;
  }
}

// Bird
const bird = {
  x: 70,
  y: 150,
  w: 34,
  h: 26,
  gravity: 0.25,
  jump: 4.6,
  speed: 0,
  rotation: 0,
  color: "#FFD700",

  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.ellipse(0, 0, this.w / 2, this.h / 2, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  },

  flap() {
    this.speed = -this.jump;
  },

  update() {
    if (state.current === state.getReady) {
      this.y = canvas.height / 2 - 40;
      this.rotation = 0;
      return;
    }

    this.speed += this.gravity;
    this.y += this.speed;

    if (this.y + this.h / 2 >= ground.y) {
      this.y = ground.y - this.h / 2;
      if (state.current === state.game) state.current = state.over;
    }

    this.rotation = this.speed >= this.jump ? 90 * DEGREE : -25 * DEGREE;
  },

  reset() {
    this.speed = 0;
    this.y = canvas.height / 2;
  },
};

// Pipes
const pipes = {
  list: [],
  width: 60,
  gap: 130,
  dx: 2,
  color: "#228B22",

  draw() {
    for (const p of this.list) {
      ctx.fillStyle = this.color;
      ctx.fillRect(p.x, p.y, this.width, p.height);
      ctx.fillRect(p.x, p.y + p.height + this.gap, this.width, canvas.height);
    }
  },

  update() {
    if (state.current !== state.game) return;

    if (frames % 100 === 0) {
      const height = Math.random() * (canvas.height / 2) + 40;
      this.list.push({
        x: canvas.width,
        y: 0,
        height: height,
      });
    }

    for (let i = 0; i < this.list.length; i++) {
      const p = this.list[i];
      p.x -= this.dx;

      // Collision
      if (
        bird.x + bird.w / 2 > p.x &&
        bird.x - bird.w / 2 < p.x + this.width &&
        (bird.y - bird.h / 2 < p.height ||
          bird.y + bird.h / 2 > p.height + this.gap)
      ) {
        state.current = state.over;
      }

      // Remove off-screen pipes
      if (p.x + this.width < 0) {
        this.list.shift();
        score.value++;
        score.best = Math.max(score.best, score.value);
      }
    }
  },

  reset() {
    this.list = [];
  },
};

// Ground
const ground = {
  y: canvas.height - 80,
  height: 80,
  color: "#8B4513",
  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(0, this.y, canvas.width, this.height);
  },
};

// Score
const score = {
  value: 0,
  best: 0,

  draw() {
    ctx.fillStyle = "#fff";
    ctx.font = "30px Poppins";
    ctx.textAlign = "center";

    if (state.current === state.game) {
      ctx.fillText(this.value, canvas.width / 2, 50);
    } else if (state.current === state.over) {
      ctx.fillText(`Score: ${this.value}`, canvas.width / 2, canvas.height / 2 - 20);
      ctx.fillText(`Best: ${this.best}`, canvas.width / 2, canvas.height / 2 + 20);
      ctx.fillText("Click or press SPACE to Restart", canvas.width / 2, canvas.height / 2 + 80);
    }
  },

  reset() {
    this.value = 0;
  },
};

// Reset the game
function resetGame() {
  pipes.reset();
  bird.reset();
  score.reset();
  state.current = state.getReady;
}

// Background
function drawBackground() {
  ctx.fillStyle = "#70c5ce";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// Main loop
function draw() {
  drawBackground();
  pipes.draw();
  ground.draw();
  bird.draw();
  score.draw();
}

function update() {
  ground.y = canvas.height - 80;
  bird.update();
  pipes.update();
}

function loop() {
  update();
  draw();
  frames++;
  requestAnimationFrame(loop);
}

loop();
