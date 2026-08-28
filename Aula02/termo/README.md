# 🔤 Termo — Componentes React UI

Interface de usuário construída em React para o jogo de adivinhação de palavras **Termo** (inspirado no *Wordle*). Este repositório contém os componentes modulares de apresentação responsáveis pelo tabuleiro, teclado virtual, cabeçalho e modal de fim de jogo.

---

## 📋 Sumário

- [Estrutura dos Componentes](#-estrutura-dos-componentes)
- [Documentação dos Componentes](#-documentação-dos-componentes)
  - [1. Board & Tile](#1-board--tile)
  - [2. Keyboard](#2-keyboard)
  - [3. GameOver](#3-gameover)
  - [4. Header](#4-header)
- [Estrutura de Classes CSS](#-estrutura-de-classes-css)
- [Exemplo de Uso](#-exemplo-de-uso)

---

## 🧩 Estrutura dos Componentes

O projeto é dividido em quatro componentes principais de apresentação:

```text
src/
├── components/
│   ├── Board.jsx       # Grade principal e blocos de letras (Tile)
│   ├── Keyboard.jsx    # Teclado virtual interativo (QWERTY)
│   ├── GameOver.jsx    # Modal de encerramento da partida
│   └── Header.jsx      # Cabeçalho com título e instruções
```

---

## 📘 Documentação dos Componentes

### 1. Board & Tile

Renderiza a grade de palpites e os quadros individuais de cada letra.

* **`Tile`**: Componente interno que exibe uma única letra e gerencia suas classes de estado (`tile-filled`, `tile-correct`, `tile-present`, `tile-absent`).
* **`Board`**: Mapeia a matriz de palpites e calcula a avaliação visual de cada posição com base na linha atual.

#### Props (`Board`)

| Prop | Tipo | Obrigatório | Descrição |
| :--- | :--- | :---: | :--- |
| `board` | `Array<Array<string>>` | Sim | Matriz com as letras digitadas organizadas por linha e coluna. |
| `evaluations` | `Array<Array<string>>` | Sim | Matriz com os status de validação (`"correct"`, `"present"`, `"absent"`) de cada letra. |
| `currentRow` | `number` | Sim | Índice da linha ativa (tentativa atual do jogador). |

---

### 2. Keyboard

Renderiza o teclado virtual interativo no layout QWERTY.

* Destaca teclas especiais (`ENTER` e `BACKSPACE`).
* Aplica status visual às teclas com base no histórico de palpites do jogador.

#### Props (`Keyboard`)

| Prop | Tipo | Obrigatório | Descrição |
| :--- | :--- | :---: | :--- |
| `onKey` | `(key: string) => void` | Sim | Função disparada ao clicar em qualquer tecla do teclado virtual. |
| `keyStatus` | `Record<string, string>` | Sim | Objeto com o status de cada letra (ex: `{ A: "correct", B: "absent" }`). |

---

### 3. GameOver

Modal exibido ao finalizar uma partida (vitória ou derrota).

#### Props (`GameOver`)

| Prop | Tipo | Obrigatório | Descrição |
| :--- | :--- | :---: | :--- |
| `won` | `boolean` | Sim | Indica se o jogador venceu (`true`) ou perdeu (`false`). |
| `target` | `string` | Sim | A palavra correta da rodada. |
| `attempts` | `number` | Sim | Quantidade de tentativas utilizadas. |
| `onRestart` | `() => void` | Sim | Função executada ao clicar no botão "JOGAR NOVAMENTE". |

---

### 4. Header

Barra superior de navegação da aplicação contendo o título do jogo e o botão de ajuda.

#### Props (`Header`)

| Prop | Tipo | Obrigatório | Descrição |
| :--- | :--- | :---: | :--- |
| `onHelp` | `() => void` | Sim | Função disparada ao clicar no botão de instrução (`?`). |

---

## 🎨 Estrutura de Classes CSS

Para que os componentes tenham a renderização correta, o arquivo CSS do projeto deve conter o tratamento das seguintes classes:

### Tabuleiro e Quadrados
- `.board`: Container da grade.
- `.board-row`: Linha do tabuleiro.
- `.tile`: Quadrado individual de letra.
- `.tile-filled`: Quadrado com letra digitada.
- `.tile-correct`: Letra correta na posição correta (Verde).
- `.tile-present`: Letra existente na palavra, mas em outra posição (Amarelo).
- `.tile-absent`: Letra inexistente na palavra (Cinza escuro).

### Teclado
- `.keyboard`: Container do teclado.
- `.keyboard-row`: Linha do teclado.
- `.key`: Tecla individual.
- `.key-special`: Teclas `ENTER` e `BACKSPACE`.
- `.key-correct`, `.key-present`, `.key-absent`: Estados de cor correspondentes às letras.

### Modal e Cabeçalho
- `.modal-overlay`, `.modal`, `.modal-icon`, `.answer`, `.restart-button`
- `.header`, `.logo`, `.help-button`

---

## 💻 Exemplo de Uso

```jsx
import React, { useState } from "react";
import Header from "./components/Header";
import Board from "./components/Board";
import Keyboard from "./components/Keyboard";
import GameOver from "./components/GameOver";

export default function App() {
  const [board, setBoard] = useState([
    ["T", "E", "R", "M", "O"],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""]
  ]);

  const [evaluations, setEvaluations] = useState([
    ["correct", "present", "absent", "correct", "correct"]
  ]);

  const [keyStatus, setKeyStatus] = useState({
    T: "correct",
    E: "present",
    R: "absent",
    M: "correct",
    O: "correct"
  });

  const handleKey = (key) => {
    console.log("Tecla pressionada:", key);
  };

  return (
    <div className="app">
      <Header onHelp={() => alert("Instruções...")} />
      <Board board={board} evaluations={evaluations} currentRow={1} />
      <Keyboard onKey={handleKey} keyStatus={keyStatus} />
    </div>
  );
}