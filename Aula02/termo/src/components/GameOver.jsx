function GameOver({
  won,
  target,
  attempts,
  onRestart
}) {
  return (
    <div className="modal-overlay">

      <div className="modal">

        <div className="modal-icon">
          {won ? "🎉" : "😔"}
        </div>

        <h2>
          {won
            ? "Parabéns!"
            : "Fim de jogo"}
        </h2>

        {won ? (
          <p>
            Você acertou em{" "}
            <strong>
              {attempts}
            </strong>{" "}
            {attempts === 1
              ? "tentativa"
              : "tentativas"}.
          </p>
        ) : (
          <p>
            A palavra era:
          </p>
        )}

        <div className="answer">
          {target}
        </div>

        <button
          className="restart-button"
          onClick={onRestart}
        >
          JOGAR NOVAMENTE
        </button>

      </div>

    </div>
  );
}

export default GameOver;