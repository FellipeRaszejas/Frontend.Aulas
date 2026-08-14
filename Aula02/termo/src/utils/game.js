export const WORD_LENGTH = 5;

export const MAX_ATTEMPTS = 6;

export function normalizeWord(word) {
  return word
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toUpperCase();
}

export function createEmptyBoard() {
  return Array.from(
    { length: MAX_ATTEMPTS },
    () => Array(WORD_LENGTH).fill("")
  );
}

export function evaluateGuess(
  guess,
  target
) {
  const normalizedGuess =
    normalizeWord(guess);

  const normalizedTarget =
    normalizeWord(target);

  const result =
    Array(WORD_LENGTH).fill("absent");

  const remainingLetters = {};

  /*
   * Primeiro contamos quantas vezes
   * cada letra aparece na palavra.
   */
  for (const letter of normalizedTarget) {
    remainingLetters[letter] =
      (remainingLetters[letter] || 0) + 1;
  }

  /*
   * PRIMEIRA PASSAGEM
   *
   * Verificamos as letras que estão
   * exatamente na posição correta.
   */
  for (
    let index = 0;
    index < WORD_LENGTH;
    index++
  ) {
    if (
      normalizedGuess[index] ===
      normalizedTarget[index]
    ) {
      result[index] = "correct";

      remainingLetters[
        normalizedGuess[index]
      ]--;
    }
  }

  /*
   * SEGUNDA PASSAGEM
   *
   * Verificamos letras que existem,
   * mas estão em outra posição.
   */
  for (
    let index = 0;
    index < WORD_LENGTH;
    index++
  ) {
    if (result[index] === "correct") {
      continue;
    }

    const letter =
      normalizedGuess[index];

    if (
      remainingLetters[letter] > 0
    ) {
      result[index] = "present";

      remainingLetters[letter]--;
    }
  }

  return result;
}

export function getRandomWord(words) {
  const index = Math.floor(
    Math.random() * words.length
  );

  return words[index];
}

export function getKeyboardStatus(
  guesses,
  target
) {
  const status = {};

  const priority = {
    absent: 1,
    present: 2,
    correct: 3
  };

  guesses.forEach((guess) => {
    const evaluation =
      evaluateGuess(
        guess,
        target
      );

    [...guess].forEach(
      (letter, index) => {
        const current =
          evaluation[index];

        if (
          !status[letter] ||
          priority[current] >
            priority[status[letter]]
        ) {
          status[letter] = current;
        }
      }
    );
  });

  return status;
}