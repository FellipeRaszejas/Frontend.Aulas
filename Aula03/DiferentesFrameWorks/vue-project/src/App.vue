<script setup>
import { ref, computed } from 'vue'

const linhas = 10
const colunas = 10
const quantidadeMinas = 15

const tabuleiro = ref([])
const jogoIniciado = ref(false)
const jogoFinalizado = ref(false)
const venceu = ref(false)
const minasMarcadas = ref(0)

function criarTabuleiro() {
  const novoTabuleiro = []

  for (let i = 0; i < linhas * colunas; i++) {
    novoTabuleiro.push({
      mina: false,
      aberta: false,
      marcada: false,
      minasProximas: 0
    })
  }

  // Coloca as minas
  let minasColocadas = 0

  while (minasColocadas < quantidadeMinas) {
    const posicao = Math.floor(Math.random() * novoTabuleiro.length)

    if (!novoTabuleiro[posicao].mina) {
      novoTabuleiro[posicao].mina = true
      minasColocadas++
    }
  }

  // Calcula as minas próximas
  for (let i = 0; i < novoTabuleiro.length; i++) {
    if (!novoTabuleiro[i].mina) {
      novoTabuleiro[i].minasProximas = contarMinasVizinhas(
        novoTabuleiro,
        i
      )
    }
  }

  tabuleiro.value = novoTabuleiro
  jogoIniciado.value = true
  jogoFinalizado.value = false
  venceu.value = false
  minasMarcadas.value = 0
}

function obterVizinhos(posicao) {
  const vizinhos = []

  const linha = Math.floor(posicao / colunas)
  const coluna = posicao % colunas

  for (let linhaOffset = -1; linhaOffset <= 1; linhaOffset++) {
    for (let colunaOffset = -1; colunaOffset <= 1; colunaOffset++) {
      if (linhaOffset === 0 && colunaOffset === 0) {
        continue
      }

      const novaLinha = linha + linhaOffset
      const novaColuna = coluna + colunaOffset

      if (
        novaLinha >= 0 &&
        novaLinha < linhas &&
        novaColuna >= 0 &&
        novaColuna < colunas
      ) {
        vizinhos.push(novaLinha * colunas + novaColuna)
      }
    }
  }

  return vizinhos
}

function contarMinasVizinhas(board, posicao) {
  const vizinhos = obterVizinhos(posicao)

  return vizinhos.filter(
    vizinho => board[vizinho].mina
  ).length
}

function abrirCelula(posicao) {
  if (
    jogoFinalizado.value ||
    tabuleiro.value[posicao].aberta ||
    tabuleiro.value[posicao].marcada
  ) {
    return
  }

  const celula = tabuleiro.value[posicao]

  celula.aberta = true

  // Acertou uma mina
  if (celula.mina) {
    jogoFinalizado.value = true
    venceu.value = false

    revelarMinas()
    return
  }

  // Se não houver minas próximas,
  // abre automaticamente as células vizinhas
  if (celula.minasProximas === 0) {
    abrirVizinhas(posicao)
  }

  verificarVitoria()
}

function abrirVizinhas(posicao) {
  const vizinhos = obterVizinhos(posicao)

  for (const vizinho of vizinhos) {
    const celula = tabuleiro.value[vizinho]

    if (
      !celula.aberta &&
      !celula.marcada &&
      !celula.mina
    ) {
      celula.aberta = true

      if (celula.minasProximas === 0) {
        abrirVizinhas(vizinho)
      }
    }
  }
}

function marcarCelula(event, posicao) {
  event.preventDefault()

  if (
    jogoFinalizado.value ||
    tabuleiro.value[posicao].aberta
  ) {
    return
  }

  const celula = tabuleiro.value[posicao]

  celula.marcada = !celula.marcada

  if (celula.marcada) {
    minasMarcadas.value++
  } else {
    minasMarcadas.value--
  }

  verificarVitoria()
}

function revelarMinas() {
  tabuleiro.value.forEach(celula => {
    if (celula.mina) {
      celula.aberta = true
    }
  })
}

function verificarVitoria() {
  const celulasSeguras = tabuleiro.value.filter(
    celula => !celula.mina
  )

  const todasAbertas = celulasSeguras.every(
    celula => celula.aberta
  )

  if (todasAbertas) {
    jogoFinalizado.value = true
    venceu.value = true

    revelarMinas()
  }
}

const mensagem = computed(() => {
  if (venceu.value) {
    return '🎉 Você venceu!'
  }

  if (jogoFinalizado.value) {
    return '💥 Você perdeu!'
  }

  return 'Boa sorte!'
})

criarTabuleiro()
</script>

<template>
  <main class="container">

    <section class="jogo">

      <header class="cabecalho">
        <div>
          <h1>💣 Campo Minado</h1>
          <p>Encontre todas as casas seguras.</p>
        </div>

        <button
          class="botao-reiniciar"
          @click="criarTabuleiro"
        >
          Novo jogo
        </button>
      </header>

      <div class="informacoes">

        <div class="informacao">
          <span>💣</span>
          <strong>{{ quantidadeMinas }}</strong>
          <small>Minas</small>
        </div>

        <div class="informacao">
          <span>🚩</span>
          <strong>{{ minasMarcadas }}</strong>
          <small>Marcadas</small>
        </div>

        <div class="informacao">
          <span>📊</span>
          <strong>{{ linhas }}x{{ colunas }}</strong>
          <small>Tabuleiro</small>
        </div>

      </div>

      <div
        v-if="jogoIniciado"
        class="mensagem"
        :class="{
          venceu: venceu,
          perdeu: jogoFinalizado && !venceu
        }"
      >
        {{ mensagem }}
      </div>

      <div class="tabuleiro">

        <button
          v-for="(celula, index) in tabuleiro"
          :key="index"
          class="celula"
          :class="{
            aberta: celula.aberta,
            marcada: celula.marcada,
            mina: celula.aberta && celula.mina
          }"
          @click="abrirCelula(index)"
          @contextmenu="marcarCelula($event, index)"
        >

          <span v-if="celula.marcada && !celula.aberta">
            🚩
          </span>

          <span v-else-if="celula.aberta && celula.mina">
            💣
          </span>

          <span
            v-else-if="
              celula.aberta &&
              celula.minasProximas > 0
            "
            :class="`numero numero-${celula.minasProximas}`"
          >
            {{ celula.minasProximas }}
          </span>

        </button>

      </div>

      <footer class="instrucoes">
        <span>🖱️ Clique para abrir</span>
        <span>🚩 Clique direito para marcar</span>
      </footer>

    </section>

  </main>
</template>