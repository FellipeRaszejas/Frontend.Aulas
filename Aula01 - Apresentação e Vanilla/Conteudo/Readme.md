# 🎮 TERMO

Um projeto simples inspirado no jogo **Termo**, desenvolvido com **HTML**, **CSS** e **JavaScript puro**. O jogador deve descobrir a palavra secreta de cinco letras. Após cada tentativa, as letras recebem cores indicando se estão corretas, existem na palavra ou não fazem parte dela.

---

## 📌 Funcionalidades

- Entrada de palavras com **5 letras**.
- Validação do tamanho da palavra.
- Exibição das tentativas em um tabuleiro.
- Sistema de cores semelhante ao jogo Termo:
  - 🟩 Verde: letra correta na posição correta.
  - 🟨 Amarelo: letra existe na palavra, mas está na posição errada.
  - ⬜ Cinza: letra não existe na palavra.
- Mensagem de vitória com animação.
- Botão para reiniciar a partida.

---

## 🛠️ Tecnologias Utilizadas

- HTML5
- CSS3
- JavaScript (Vanilla JS)

---

## 📁 Estrutura do Projeto

```
termo/
│
├── index.html
├── style.css
├── script.js
└── README.md
```

---

## 🚀 Como Executar

1. Clone o repositório:

```bash
git clone https://github.com/seu-usuario/termo.git
```

2. Abra a pasta do projeto.

3. Execute o arquivo `index.html` em qualquer navegador.

Não é necessário instalar dependências ou utilizar servidor.

---

## 🎯 Como Jogar

1. Digite uma palavra com **5 letras**.
2. Clique em **Enviar**.
3. Observe as cores das letras:

| Cor | Significado |
|------|-------------|
| 🟩 Verde | Letra correta na posição correta. |
| 🟨 Amarelo | A letra existe na palavra, mas está em outra posição. |
| ⬜ Cinza | A letra não faz parte da palavra. |

4. Continue tentando até descobrir a palavra secreta.

---

## ⚙️ Funcionamento

O jogo utiliza uma palavra fixa armazenada na variável:

```javascript
const resposta = "TERMO";
```

Quando o usuário envia uma tentativa:

1. O sistema verifica se possui 5 letras.
2. Compara cada caractere com a palavra secreta.
3. Cria uma nova linha no tabuleiro.
4. Aplica a cor correspondente para cada letra.
5. Caso o jogador acerte, exibe uma mensagem de vitória e desabilita os controles.

---

## 📷 Interface

A interface possui:

- Tabuleiro para exibir as tentativas.
- Campo de texto para digitação.
- Botão de envio.
- Mensagem de vitória.
- Botão para reiniciar a partida.

---

## 🔮 Melhorias Futuras

- Gerar palavra aleatória.
- Banco de palavras válidas.
- Limite de tentativas.
- Teclado virtual.
- Contador de tentativas.
- Sistema de pontuação.
- Modo difícil.
- Responsividade para dispositivos móveis.
- Animações das letras.
- Histórico de partidas.

---

## 👨‍💻 Autor
