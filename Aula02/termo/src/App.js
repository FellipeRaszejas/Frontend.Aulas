import {
  useCallback,
  useEffect,
  useMemo,
  useState
} from "react";

import Header from "./components/Header";
import Board from "./components/Board";
import Keyboard from "./components/Keyboard";
import GameOver from "./components/GameOver";

import {
  WORDS
} from "./data/words";

import {
  WORD_LENGTH,
  MAX_ATTEMPTS,
  createEmptyBoard,
  evaluateGuess,
  getKeyboardStatus,
  getRandomWord,
  normalizeWord
} from "./utils/game";

import "./App.css";

const STORAGE_KEY =
  "termo-react-game";

function createGame() {
  return {
    target:
      getRandomWord(WORDS),

    board:
      createEmptyBoard(),

    evaluations: [],

    currentRow: 0,

    currentGuess: "",

    gameOver: false,

    won: false
  };
}

function App() {

  const [
    game,
    setGame
  ] = useState(() => {

    try {

      const saved =
        localStorage.getItem(
          STORAGE_KEY
        );

      if (saved) {
        return JSON.parse(saved);
      }

    } catch (error) {

      console.error(
        "Erro ao recuperar jogo:",
        error
      );

    }

    return createGame();
  });

  const {
    target,
    board,
    evaluations,
    currentRow,
    currentGuess,
    gameOver,
    won
  } = game;

  /*
   * Salva automaticamente
   * o estado do jogo.
   */
  useEffect(() => {

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(game)
    );

  }, [game]);

  /*
   * Descobre o estado das teclas.
   */
  const keyboardStatus =
    useMemo(() => {

      const guesses =
        board
          .slice(0, currentRow)
          .map((row) =>
            row.join("")
          );

      return getKeyboardStatus(
        guesses,
        target
      );

    }, [
      board,
      currentRow,
      target
    ]);

  /*
   * Adiciona uma letra.
   */
  const addLetter =
    useCallback((letter) => {

      if (gameOver) {
        return;
      }

      if (
        currentGuess.length >=
        WORD_LENGTH
      ) {
        return;
      }

      setGame(
        (previous) => {

          const newBoard =
            previous.board.map(
              (row, index) => {

                if (
                  index !==
                  currentRow
                ) {
                  return row;
                }

                const newRow =
                  [...row];

                newRow[
                  currentGuess.length
                ] = letter;

                return newRow;
              }
            );

          return {
            ...previous,

            currentGuess:
              previous.currentGuess +
              letter,

            board: newBoard
          };
        }
      );

    }, [
      currentGuess.length,
      currentRow,
      gameOver
    ]);

  /*
   * Remove uma letra.
   */
  const removeLetter =
    useCallback(() => {

      if (gameOver) {
        return;
      }

      if (!currentGuess.length) {
        return;
      }

      setGame(
        (previous) => {

          const newBoard =
            previous.board.map(
              (row, index) => {

                if (
                  index !==
                  currentRow
                ) {
                  return row;
                }

                const newRow =
                  [...row];

                newRow[
                  currentGuess.length - 1
                ] = "";

                return newRow;
              }
            );

          return {
            ...previous,

            currentGuess:
              previous.currentGuess.slice(
                0,
                -1
              ),

            board: newBoard
          };
        }
      );

    }, [
      currentGuess,
      currentRow,
      gameOver
    ]);

  /*
   * Confirma a tentativa.
   */
  const submitGuess =
    useCallback(() => {

      if (gameOver) {
        return;
      }

      if (
        currentGuess.length !==
        WORD_LENGTH
      ) {
        return;
      }

      const guess =
        normalizeWord(
          currentGuess
        );

      const answer =
        normalizeWord(target);

      /*
       * Verifica se a palavra existe.
       */
      if (!WORDS.includes(guess)) {

        alert(
          "Essa palavra não está no dicionário."
        );

        return;
      }

      const evaluation =
        evaluateGuess(
          guess,
          answer
        );

      const newEvaluations = [
        ...evaluations,
        evaluation
      ];

      const correct =
        guess === answer;

      const lastAttempt =
        currentRow + 1 >=
        MAX_ATTEMPTS;

      setGame(
        (previous) => ({
          ...previous,

          board:
            previous.board.map(
              (row, index) =>
                index === currentRow
                  ? [...guess]
                  : row
            ),

          evaluations:
            newEvaluations,

          currentRow:
            currentRow + 1,

          currentGuess: "",

          gameOver:
            correct ||
            lastAttempt,

          won: correct
        })
      );

    }, [
      currentGuess,
      currentRow,
      evaluations,
      gameOver,
      target
    ]);

  /*
   * Processa teclado virtual
   * e teclado físico.
   */
  const handleKey =
    useCallback(
      (key) => {

        if (key === "ENTER") {

          submitGuess();

          return;
        }

        if (
          key ===
          "BACKSPACE"
        ) {

          removeLetter();

          return;
        }

        if (
          /^[A-Z]$/.test(key)
        ) {

          addLetter(key);
        }

      },
      [
        addLetter,
        removeLetter,
        submitGuess
      ]
    );

  /*
   * Teclado físico.
   */
  useEffect(() => {

    function handleKeyboard(
      event
    ) {

      const key =
        event.key.toUpperCase();

      if (
        key === "ENTER"
      ) {

        handleKey("ENTER");

        return;
      }

      if (
        key === "BACKSPACE" ||
        key === "DELETE"
      ) {

        handleKey(
          "BACKSPACE"
        );

        return;
      }

      if (
        /^[A-Z]$/.test(key)
      ) {

        handleKey(key);
      }
    }

    window.addEventListener(
      "keydown",
      handleKeyboard
    );

    return () => {

      window.removeEventListener(
        "keydown",
        handleKeyboard
      );

    };

  }, [handleKey]);

  /*
   * Reinicia o jogo.
   */
  function restartGame() {

    const newGame =
      createGame();

    setGame(newGame);

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(newGame)
    );
  }

  /*
   * Ajuda.
   */
  function showHelp() {

    alert(
      "COMO JOGAR\n\n" +
      "Adivinhe a palavra de 5 letras " +
      "em até 6 tentativas.\n\n" +
      "🟩 Letra correta e no lugar correto.\n\n" +
      "🟨 Letra correta, mas no lugar errado.\n\n" +
      "⬜ A letra não existe na palavra."
    );
  }

  return (
    <div className="app">

      <Header
        onHelp={showHelp}
      />

      <main className="game-container">

        <Board
          board={board}
          evaluations={evaluations}
          currentRow={currentRow}
        />

        <div className="game-message">

          {!gameOver &&
            currentGuess.length ===
              WORD_LENGTH && (

              <span>
                Pressione ENTER
                para confirmar
              </span>

            )}

        </div>

        <Keyboard
          onKey={handleKey}
          keyStatus={keyboardStatus}
        />

      </main>

      {gameOver && (

        <GameOver
          won={won}
          target={target}
          attempts={currentRow}
          onRestart={restartGame}
        />

      )}

    </div>
  );
}

export default App;