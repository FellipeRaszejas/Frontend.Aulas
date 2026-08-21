import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  tabuleiro: string[] = Array(9).fill('');

  jogadorAtual: string = 'X';

  vencedor: string = '';

  empate: boolean = false;

  combinacoesVencedoras = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    [0, 4, 8],
    [2, 4, 6]
  ];

  jogar(posicao: number): void {

    // Não permite jogar em uma casa ocupada
    if (this.tabuleiro[posicao] !== '') {
      return;
    }

    // Não permite jogar depois que o jogo terminou
    if (this.vencedor || this.empate) {
      return;
    }

    // Coloca X ou O na casa
    this.tabuleiro[posicao] = this.jogadorAtual;

    // Verifica se alguém venceu
    this.verificarResultado();

    // Troca o jogador
    if (!this.vencedor && !this.empate) {

      if (this.jogadorAtual === 'X') {
        this.jogadorAtual = 'O';
      } else {
        this.jogadorAtual = 'X';
      }

    }
  }

  verificarResultado(): void {

    for (const combinacao of this.combinacoesVencedoras) {

      const [a, b, c] = combinacao;

      if (
        this.tabuleiro[a] !== '' &&
        this.tabuleiro[a] === this.tabuleiro[b] &&
        this.tabuleiro[a] === this.tabuleiro[c]
      ) {

        this.vencedor = this.tabuleiro[a];

        return;
      }
    }

    // Se todas as casas estiverem preenchidas
    if (this.tabuleiro.every(casa => casa !== '')) {
      this.empate = true;
    }
  }

  reiniciar(): void {

    this.tabuleiro = Array(9).fill('');

    this.jogadorAtual = 'X';

    this.vencedor = '';

    this.empate = false;
  }
}