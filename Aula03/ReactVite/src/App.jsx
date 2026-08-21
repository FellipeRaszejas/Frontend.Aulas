import { useCallback, useEffect, useState } from "react";
import "./App.css";

const BOARD_SIZE = 20;

const INITIAL_SNAKE = [
  { x: 10, y: 10 },
  { x: 9, y: 10 },
  { x: 8, y: 10 },
];

const INITIAL_DIRECTION = { x: 1, y: 0 };

function generateFood(snake) {
  const availablePositions = [];

  for (let y = 0; y < BOARD_SIZE; y++) {
    for (let x = 0; x < BOARD_SIZE; x++) {
      const occupied = snake.some(
        (segment) => segment.x === x && segment.y === y
      );

      if (!occupied) {
        availablePositions.push({ x, y });
      }
    }
  }

  if (availablePositions.length === 0) {
    return null;
  }

  return availablePositions[
    Math.floor(Math.random() * availablePositions.length)
  ];
}

export default function App() {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [food, setFood] = useState(() => generateFood(INITIAL_SNAKE));
  const [direction, setDirection] = useState(INITIAL_DIRECTION);
  const [nextDirection, setNextDirection] = useState(INITIAL_DIRECTION);

  const [score, setScore] = useState(0);

  const [highScore, setHighScore] = useState(() => {
    return Number(localStorage.getItem("snake-high-score")) || 0;
  });

  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [paused, setPaused] = useState(false);

  const speed = Math.max(70, 160 - score * 5);

  const resetGame = useCallback(() => {
    const initialSnake = INITIAL_SNAKE.map((segment) => ({ ...segment }));

    setSnake(initialSnake);
    setFood(generateFood(initialSnake));
    setDirection(INITIAL_DIRECTION);
    setNextDirection(INITIAL_DIRECTION);
    setScore(0);
    setGameOver(false);
    setPaused(false);
    setGameStarted(false);
  }, []);

  const startGame = () => {
    if (gameOver) {
      resetGame();
    }

    setGameStarted(true);
    setPaused(false);
  };

  const changeDirection = useCallback(
    (newDirection) => {
      if (gameOver) return;

      const isOpposite =
        newDirection.x === -direction.x &&
        newDirection.y === -direction.y;

      if (isOpposite) {
        return;
      }

      setNextDirection(newDirection);
    },
    [direction, gameOver]
  );

  useEffect(() => {
    const handleKeyDown = (event) => {
      const key = event.key.toLowerCase();

      const directions = {
        arrowup: { x: 0, y: -1 },
        w: { x: 0, y: -1 },

        arrowdown: { x: 0, y: 1 },
        s: { x: 0, y: 1 },

        arrowleft: { x: -1, y: 0 },
        a: { x: -1, y: 0 },

        arrowright: { x: 1, y: 0 },
        d: { x: 1, y: 0 },
      };

      if (directions[key]) {
        event.preventDefault();

        if (!gameStarted && !gameOver) {
          setGameStarted(true);
        }

        changeDirection(directions[key]);
      }

      if (key === " ") {
        event.preventDefault();

        if (gameStarted && !gameOver) {
          setPaused((current) => !current);
        }
      }

      if (key === "enter" && gameOver) {
        resetGame();
        setGameStarted(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [changeDirection, gameStarted, gameOver, resetGame]);

  useEffect(() => {
    if (!gameStarted || gameOver || paused) {
      return;
    }

    const moveSnake = () => {
      setSnake((currentSnake) => {
        const currentDirection = nextDirection;

        setDirection(currentDirection);

        const head = currentSnake[0];

        const newHead = {
          x: head.x + currentDirection.x,
          y: head.y + currentDirection.y,
        };

        // Colisão com as paredes
        const hitWall =
          newHead.x < 0 ||
          newHead.x >= BOARD_SIZE ||
          newHead.y < 0 ||
          newHead.y >= BOARD_SIZE;

        if (hitWall) {
          setGameOver(true);
          setGameStarted(false);
          return currentSnake;
        }

        // Verifica se comeu
        const ateFood =
          food &&
          newHead.x === food.x &&
          newHead.y === food.y;

        // Se não comeu, a cauda será removida.
        // Por isso podemos ignorar o último segmento
        // ao verificar a colisão.
        const bodyToCheck = ateFood
          ? currentSnake
          : currentSnake.slice(0, -1);

        const hitBody = bodyToCheck.some(
          (segment) =>
            segment.x === newHead.x &&
            segment.y === newHead.y
        );

        if (hitBody) {
          setGameOver(true);
          setGameStarted(false);
          return currentSnake;
        }

        const newSnake = [newHead, ...currentSnake];

        if (ateFood) {
          const newScore = score + 1;

          setScore(newScore);

          if (newScore > highScore) {
            setHighScore(newScore);
            localStorage.setItem(
              "snake-high-score",
              newScore.toString()
            );
          }

          setFood(generateFood(newSnake));

          return newSnake;
        }

        newSnake.pop();

        return newSnake;
      });
    };

    const interval = setInterval(moveSnake, speed);

    return () => {
      clearInterval(interval);
    };
  }, [
    gameStarted,
    gameOver,
    paused,
    nextDirection,
    food,
    score,
    highScore,
    speed,
  ]);

  const renderBoard = () => {
    const cells = [];

    for (let y = 0; y < BOARD_SIZE; y++) {
      for (let x = 0; x < BOARD_SIZE; x++) {
        const isSnake = snake.some(
          (segment) => segment.x === x && segment.y === y
        );

        const isHead =
          snake[0]?.x === x &&
          snake[0]?.y === y;

        const isFood =
          food?.x === x &&
          food?.y === y;

        let className = "cell";

        if (isSnake) {
          className += " snake";

          if (isHead) {
            className += " snake-head";
          }
        }

        if (isFood) {
          className += " food";
        }

        cells.push(
          <div
            key={`${x}-${y}`}
            className={className}
          >
            {isFood && <span>🍎</span>}
          </div>
        );
      }
    }

    return cells;
  };

  return (
    <main className="game-container">
      <section className="game-wrapper">
        <header className="game-header">
          <div>
            <p className="eyebrow">ARCADE GAME</p>
            <h1>
              SNAKE<span>.</span>
            </h1>
          </div>

          <div className="stats">
            <div className="stat">
              <span>PONTOS</span>
              <strong>{score}</strong>
            </div>

            <div className="stat">
              <span>RECORDE</span>
              <strong>{highScore}</strong>
            </div>
          </div>
        </header>

        <div className="game-area">
          <div className="board-wrapper">
            <div className="board">
              {renderBoard()}

              {!gameStarted && !gameOver && (
                <div className="game-overlay">
                  <div className="overlay-content">
                    <div className="overlay-icon">🐍</div>

                    <h2>Snake</h2>

                    <p>
                      Use as setas ou WASD
                      <br />
                      para controlar a cobra.
                    </p>

                    <button onClick={startGame}>
                      COMEÇAR
                    </button>
                  </div>
                </div>
              )}

              {paused && !gameOver && (
                <div className="game-overlay">
                  <div className="overlay-content">
                    <div className="overlay-icon">Ⅱ</div>

                    <h2>Pausado</h2>

                    <p>
                      Pressione espaço
                      <br />
                      para continuar.
                    </p>

                    <button onClick={() => setPaused(false)}>
                      CONTINUAR
                    </button>
                  </div>
                </div>
              )}

              {gameOver && (
                <div className="game-overlay">
                  <div className="overlay-content">
                    <div className="overlay-icon">💥</div>

                    <h2>Game Over</h2>

                    <p>
                      Sua pontuação foi
                      <br />
                      <strong>{score}</strong>
                    </p>

                    <button onClick={startGame}>
                      JOGAR NOVAMENTE
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <aside className="game-sidebar">
            <div className="control-card">
              <h3>CONTROLES</h3>

              <div className="keyboard">
                <div className="key-row">
                  <button
                    onClick={() =>
                      changeDirection({ x: 0, y: -1 })
                    }
                  >
                    ↑
                  </button>
                </div>

                <div className="key-row">
                  <button
                    onClick={() =>
                      changeDirection({ x: -1, y: 0 })
                    }
                  >
                    ←
                  </button>

                  <button
                    onClick={() =>
                      changeDirection({ x: 0, y: 1 })
                    }
                  >
                    ↓
                  </button>

                  <button
                    onClick={() =>
                      changeDirection({ x: 1, y: 0 })
                    }
                  >
                    →
                  </button>
                </div>
              </div>

              <p className="keyboard-help">
                Teclado: <strong>WASD</strong> ou{" "}
                <strong>↑ ↓ ← →</strong>
              </p>

              <button
                className="pause-button"
                onClick={() => {
                  if (!gameStarted || gameOver) return;

                  setPaused((current) => !current);
                }}
              >
                {paused ? "CONTINUAR" : "PAUSAR"}
              </button>

              <button
                className="restart-button"
                onClick={resetGame}
              >
                REINICIAR
              </button>
            </div>

            <div className="info-card">
              <span>VELOCIDADE</span>

              <div className="speed-bar">
                <div
                  className="speed-progress"
                  style={{
                    width: `${Math.min(
                      100,
                      25 + score * 6
                    )}%`,
                  }}
                />
              </div>

              <small>
                A cobra fica mais rápida conforme
                você pontua.
              </small>
            </div>
          </aside>
        </div>

        <footer>
          <span>SPACE</span> pausar
          <span>•</span>
          <span>ENTER</span> reiniciar após Game Over
        </footer>
      </section>
    </main>
  );
}