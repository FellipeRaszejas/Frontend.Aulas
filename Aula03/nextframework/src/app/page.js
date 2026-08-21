"use client";

import { useEffect, useState } from "react";
import "./globals.css";

const imagens = [
  "🍎",
  "🍌",
  "🍇",
  "🍉",
  "🍓",
  "🍒",
  "🥝",
  "🍍",
];

function embaralhar(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

function criarCartas() {
  const cartas = [...imagens, ...imagens];

  return embaralhar(cartas).map((imagem, index) => ({
    id: index,
    imagem,
    virada: false,
    encontrada: false,
  }));
}

export default function Home() {
  const [cartas, setCartas] = useState([]);
  const [selecionadas, setSelecionadas] = useState([]);
  const [bloqueado, setBloqueado] = useState(false);
  const [movimentos, setMovimentos] = useState(0);
  const [vitorias, setVitorias] = useState(false);

  useEffect(() => {
    iniciarJogo();
  }, []);

  function iniciarJogo() {
    setCartas(criarCartas());
    setSelecionadas([]);
    setBloqueado(false);
    setMovimentos(0);
    setVitorias(false);
  }

  function virarCarta(id) {
    if (bloqueado) return;

    const carta = cartas.find((carta) => carta.id === id);

    if (!carta || carta.virada || carta.encontrada) {
      return;
    }

    const novasCartas = cartas.map((carta) =>
      carta.id === id
        ? { ...carta, virada: true }
        : carta
    );

    setCartas(novasCartas);

    const novasSelecionadas = [...selecionadas, id];

    setSelecionadas(novasSelecionadas);

    if (novasSelecionadas.length === 2) {
      setBloqueado(true);
      setMovimentos((valor) => valor + 1);

      verificarPar(novasSelecionadas, novasCartas);
    }
  }

  function verificarPar(ids, cartasAtuais) {
    const primeira = cartasAtuais.find(
      (carta) => carta.id === ids[0]
    );

    const segunda = cartasAtuais.find(
      (carta) => carta.id === ids[1]
    );

    if (primeira.imagem === segunda.imagem) {
      const cartasAtualizadas = cartasAtuais.map((carta) =>
        ids.includes(carta.id)
          ? { ...carta, encontrada: true }
          : carta
      );

      setCartas(cartasAtualizadas);
      setSelecionadas([]);
      setBloqueado(false);

      const terminou = cartasAtualizadas.every(
        (carta) => carta.encontrada
      );

      if (terminou) {
        setVitorias(true);
      }
    } else {
      setTimeout(() => {
        setCartas((cartas) =>
          cartas.map((carta) =>
            ids.includes(carta.id)
              ? { ...carta, virada: false }
              : carta
          )
        );

        setSelecionadas([]);
        setBloqueado(false);
      }, 800);
    }
  }

  return (
    <main className="game">
      <section className="game-container">

        <header className="game-header">
          <div>
            <p className="eyebrow">MEMORY GAME</p>
            <h1>Jogo da Memória</h1>
            <p className="description">
              Encontre todos os pares de cartas.
            </p>
          </div>

          <div className="stats">
            <div className="stat">
              <span>Movimentos</span>
              <strong>{movimentos}</strong>
            </div>

            <button
              className="restart-button"
              onClick={iniciarJogo}
            >
              Novo jogo
            </button>
          </div>
        </header>

        <section className="board">
          {cartas.map((carta) => (
            <button
              key={carta.id}
              className={`card ${
                carta.virada || carta.encontrada
                  ? "flipped"
                  : ""
              } ${
                carta.encontrada
                  ? "matched"
                  : ""
              }`}
              onClick={() => virarCarta(carta.id)}
              disabled={
                carta.virada ||
                carta.encontrada ||
                bloqueado
              }
            >
              <span className="card-inner">

                <span className="card-front">
                  ?
                </span>

                <span className="card-back">
                  {carta.imagem}
                </span>

              </span>
            </button>
          ))}
        </section>

        {vitorias && (
          <div className="victory">
            <div className="victory-content">
              <span className="victory-icon">🎉</span>

              <h2>Você venceu!</h2>

              <p>
                Todos os pares foram encontrados em{" "}
                <strong>{movimentos}</strong> movimentos.
              </p>

              <button
                className="restart-button"
                onClick={iniciarJogo}
              >
                Jogar novamente
              </button>
            </div>
          </div>
        )}

      </section>
    </main>
  );
}