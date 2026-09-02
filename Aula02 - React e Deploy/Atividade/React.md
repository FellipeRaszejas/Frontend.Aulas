# React: Características de um Framework Front-end

**Disciplina:** Frameworks Front-end — SENAI Sorocaba

---

## Sumário

1. [Introdução](#1-introdução)
2. [Principais características do React](#2-principais-características-do-react)

   * [2.1 Componentização](#21-componentização)
   * [2.2 Virtual DOM e reconciliação](#22-virtual-dom-e-reconciliação)
   * [2.3 JSX](#23-jsx)
   * [2.4 Fluxo de dados unidirecional](#24-fluxo-de-dados-unidirecional)
   * [2.5 Estado, Props e Hooks](#25-estado-props-e-hooks)
   * [2.6 Ecossistema e flexibilidade](#26-ecossistema-e-flexibilidade)
3. [Exemplo prático: To-do List](#3-exemplo-prático-to-do-list)
4. [Vantagens do React](#4-vantagens-do-react)
5. [Aplicação no mercado](#5-aplicação-no-mercado)
6. [Vite: ferramenta de desenvolvimento e build](#6-vite-ferramenta-de-desenvolvimento-e-build)
7. [Conclusão](#7-conclusão)

---

# 1. Introdução

O **React** é uma biblioteca JavaScript de código aberto criada pelo Facebook, atualmente Meta, e lançada em 2013. Seu principal objetivo é facilitar a construção de **interfaces de usuário (UI)** interativas, reutilizáveis e organizadas.

Embora tecnicamente seja uma **biblioteca**, e não um framework completo, o React é frequentemente associado ao desenvolvimento com frameworks front-end devido à grande quantidade de ferramentas que fazem parte de seu ecossistema. Entre elas estão o React Router, para roteamento, bibliotecas de gerenciamento de estado e frameworks como o Next.js.

Uma das principais ideias do React é dividir uma interface complexa em **componentes menores e independentes**. Cada componente pode possuir sua própria estrutura, lógica e estado, permitindo que partes da aplicação sejam reutilizadas e mantidas de forma mais simples.

O React também introduz conceitos importantes como **Virtual DOM, JSX, props, state e Hooks**, que modificam a maneira tradicional de construir interfaces web.

---

# 2. Principais características do React

## 2.1 Componentização

A **componentização** é um dos conceitos fundamentais do React.

Em vez de desenvolver uma página inteira como um único bloco de código, a interface pode ser dividida em componentes:

```text
App
├── Header
├── Sidebar
├── Content
│   ├── TaskInput
│   └── TaskList
│       ├── TaskItem
│       ├── TaskItem
│       └── TaskItem
└── Footer
```

Cada componente possui uma responsabilidade específica.

Por exemplo:

```text
App
    ↓
gerencia o estado geral

TaskInput
    ↓
recebe novas tarefas

TaskItem
    ↓
exibe uma tarefa individual
```

Essa organização favorece:

* reutilização de código;
* manutenção;
* testes;
* separação de responsabilidades;
* desenvolvimento de interfaces maiores.

Um mesmo componente `TaskItem`, por exemplo, pode ser utilizado várias vezes para representar diferentes tarefas.

A componentização também permite que diferentes partes da aplicação evoluam de maneira relativamente independente.

---

## 2.2 Virtual DOM e reconciliação

Outro conceito frequentemente associado ao React é o **Virtual DOM**.

O DOM é a representação da estrutura HTML de uma página mantida pelo navegador. Alterações frequentes no DOM podem ser custosas, principalmente em interfaces complexas.

O React mantém uma representação da interface em memória. Quando ocorre uma alteração de estado, o React cria uma nova representação e compara essa estrutura com a anterior.

Esse processo está relacionado à **reconciliação**.

De forma simplificada:

```text
Estado anterior
      ↓
Virtual DOM anterior
      ↓
     comparação
      ↑
Virtual DOM atual
      ↑
Novo estado
```

A partir dessa comparação, o React determina quais alterações precisam ser aplicadas à interface.

Por exemplo, se uma lista possui 100 tarefas e apenas uma foi alterada, o objetivo é atualizar somente o que realmente mudou, em vez de reconstruir toda a interface manualmente.

É importante destacar que o Virtual DOM não significa simplesmente que o React "não utiliza o DOM". O DOM real continua sendo utilizado pelo navegador. O React utiliza uma representação intermediária para organizar e calcular as atualizações da interface.

---

## 2.3 JSX

O React utiliza frequentemente **JSX (JavaScript XML)**, uma extensão de sintaxe que permite escrever estruturas semelhantes a HTML dentro do JavaScript.

Exemplo:

```jsx
function Titulo() {
    return <h1>Minhas tarefas</h1>;
}
```

Também é possível utilizar expressões JavaScript:

```jsx
function Usuario({ nome }) {
    return <h1>Olá, {nome}!</h1>;
}
```

O JSX facilita a associação entre a estrutura visual e a lógica do componente.

Apesar de parecer HTML, JSX não é HTML puro. Ele é transformado durante o processo de build em código JavaScript que o React consegue utilizar.

Por isso, podemos pensar no fluxo de forma simplificada:

```text
JSX
 ↓
Transformação
 ↓
JavaScript
 ↓
React
 ↓
Interface
```

---

## 2.4 Fluxo de dados unidirecional

No React, os dados normalmente fluem dos componentes **pais para os filhos** por meio das propriedades, chamadas de **props**.

Por exemplo:

```text
App
 │
 │ props
 ↓
TaskItem
```

O componente `App` pode possuir uma tarefa e enviá-la para `TaskItem`:

```jsx
<TaskItem tarefa={tarefa} />
```

O componente filho recebe essa informação:

```jsx
function TaskItem({ tarefa }) {
    return <p>{tarefa.nome}</p>;
}
```

Esse fluxo torna o comportamento da aplicação mais previsível, pois existe uma direção clara para a passagem dos dados.

Quando um componente filho precisa provocar uma alteração no estado do componente pai, normalmente uma função é enviada como prop:

```text
App
 │
 ├── estado
 │
 └── função de atualização
          ↓
       TaskItem
          │
          ↓
      callback
          │
          ↓
         App
          │
          ↓
     novo estado
```

Assim, o filho não precisa alterar diretamente o estado do pai.

---

## 2.5 Estado, Props e Hooks

O **state (estado)** representa informações que podem mudar durante a execução da aplicação.

Um exemplo simples utiliza o `useState`:

```jsx
const [contador, setContador] = useState(0);
```

Nesse caso:

```text
contador
   ↓
estado atual

setContador()
   ↓
função responsável por atualizar o estado
```

Quando o estado é atualizado, o React pode renderizar novamente o componente para refletir a mudança na interface.

As **props**, por outro lado, são informações recebidas por um componente.

Podemos resumir:

| Conceito | Função                                                |
| -------- | ----------------------------------------------------- |
| State    | Dados controlados pelo próprio componente             |
| Props    | Dados recebidos de outro componente                   |
| Hook     | Recurso que permite utilizar funcionalidades do React |

A partir da versão 16.8, os **Hooks** permitiram utilizar estado e outros recursos em componentes funcionais.

Alguns Hooks conhecidos são:

```text
useState
useEffect
useContext
useMemo
useCallback
```

Para aplicações maiores, também podem ser utilizadas soluções complementares de gerenciamento de estado, como Redux, Zustand ou Context API.

---

## 2.6 Ecossistema e flexibilidade

Uma característica importante do React é não impor uma arquitetura completa para todos os projetos.

Isso proporciona flexibilidade, mas também significa que o desenvolvedor precisa escolher ferramentas adicionais de acordo com as necessidades da aplicação.

Alguns exemplos:

| Ferramenta   | Finalidade                                             |
| ------------ | ------------------------------------------------------ |
| React Router | Roteamento                                             |
| Redux        | Gerenciamento de estado                                |
| Zustand      | Gerenciamento de estado                                |
| Next.js      | Aplicações React com recursos de servidor e full-stack |
| React Native | Desenvolvimento de aplicações mobile                   |

Essa flexibilidade contribuiu para a criação de um ecossistema bastante amplo.

---

# 3. Exemplo prático: To-do List

Um exemplo clássico para demonstrar React é uma **lista de tarefas**.

Imagine uma aplicação onde o usuário pode:

* adicionar tarefas;
* marcar tarefas como concluídas;
* remover tarefas.

Uma possível estrutura seria:

```text
App
├── TaskInput
└── TaskList
    └── TaskItem
```

Cada componente possui uma responsabilidade:

| Componente  | Responsabilidade               |
| ----------- | ------------------------------ |
| `App`       | Gerencia o estado da aplicação |
| `TaskInput` | Recebe uma nova tarefa         |
| `TaskList`  | Organiza a lista               |
| `TaskItem`  | Representa uma tarefa          |

O `App` poderia manter um array:

```text
[
    "Estudar React",
    "Fazer exercício",
    "Revisar projeto"
]
```

Quando o usuário adiciona uma tarefa, o estado é atualizado.

```text
Usuário
   ↓
TaskInput
   ↓
callback
   ↓
App
   ↓
novo state
   ↓
React renderiza novamente
   ↓
TaskList
   ↓
TaskItem
```

Cada `TaskItem` recebe os dados da tarefa por meio de props.

Quando o usuário marca uma tarefa como concluída, o componente pode chamar uma função recebida do `App`. Essa função atualiza o estado e o React reflete a alteração na interface.

O mesmo acontece ao remover uma tarefa: o estado é atualizado e a interface passa a representar o novo estado da aplicação.

Esse exemplo demonstra três ideias fundamentais:

### Reutilização

O mesmo `TaskItem` pode representar diversas tarefas.

### Separação de responsabilidades

Cada componente possui uma função específica.

### Atualização baseada em estado

A interface é consequência do estado atual da aplicação.

Esse modelo pode ser utilizado em aplicações muito maiores, como:

* sistemas administrativos;
* lojas virtuais;
* dashboards;
* sistemas de gerenciamento;
* redes sociais.

---

# 4. Vantagens do React

O React apresenta diversas características que contribuíram para sua ampla adoção.

## 4.1 Reutilização

Componentes podem ser utilizados diversas vezes em diferentes partes da aplicação.

Isso reduz duplicação e facilita a manutenção.

## 4.2 Organização

A componentização permite dividir interfaces complexas em partes menores.

## 4.3 Ecossistema

Existe uma grande quantidade de ferramentas, bibliotecas, frameworks e materiais de estudo relacionados ao React.

## 4.4 Flexibilidade

O React não exige uma única arquitetura para todos os projetos.

## 4.5 Mercado

A ampla adoção da tecnologia faz com que o conhecimento em React seja relevante para desenvolvedores front-end.

É importante, porém, separar uma característica da biblioteca React de uma característica de ferramentas do seu ecossistema. Por exemplo, recursos de build e desenvolvimento local estão relacionados ao Vite, e não ao React diretamente.

---

# 5. Aplicação no mercado

O React é utilizado em aplicações de diferentes setores e escalas.

## 5.1 Redes sociais e comunicação

### Instagram

Utiliza tecnologias do ecossistema React em sua presença web e React Native em aplicações mobile. Interfaces desse tipo precisam lidar com grandes quantidades de conteúdo e interações constantes.

### Facebook

O próprio Facebook, empresa responsável pela criação do React, utiliza a tecnologia em grande escala.

### Discord

A interface web do Discord utiliza React para construir partes altamente interativas da aplicação, como canais, mensagens e listas.

---

## 5.2 Streaming e entretenimento

### Netflix

A Netflix utiliza React em diferentes interfaces, incluindo aplicações acessadas por navegadores e outros dispositivos.

### Spotify

O Spotify utiliza tecnologias relacionadas ao ecossistema React em interfaces web e ferramentas de controle de mídia.

Aplicações desse tipo possuem interfaces altamente dinâmicas, nas quais listas, buscas, recomendações e informações são atualizadas constantemente.

---

## 5.3 E-commerce e marketplaces

### Mercado Livre

Plataformas de comércio eletrônico precisam lidar com buscas, filtros, carrinhos, produtos e diferentes estados da interface. React pode ser utilizado para construir essas interfaces de maneira componentizada.

### Uber e Uber Eats

Aplicações relacionadas a viagens e entregas precisam apresentar informações que mudam constantemente, como status, localização e pedidos.

O modelo baseado em componentes facilita a criação de interfaces compostas por diversos elementos independentes.

---

## 5.4 Produtividade

### Notion

O Notion utiliza uma interface baseada em blocos e elementos altamente interativos, exigindo uma arquitetura capaz de lidar com diferentes estados da aplicação.

### Trello

O Trello apresenta um modelo de quadros, listas e cartões, com interações como arrastar e soltar. Esse tipo de aplicação é adequado ao modelo de componentes e atualização baseada em estado utilizado pelo React.

---

# 6. Vite: ferramenta de desenvolvimento e build

O **Vite** é uma ferramenta utilizada para desenvolvimento e build de aplicações modernas, sendo uma opção muito comum em projetos React.

É importante deixar claro:

> **Vite não é uma característica do React.**

React é a biblioteca responsável pela construção da interface. Vite é uma ferramenta que auxilia no desenvolvimento e na preparação da aplicação para produção.

A relação pode ser representada assim:

```text
React
  ↓
Componentes + interface + estado

Vite
  ↓
Servidor de desenvolvimento + build
```

---

## 6.1 Desenvolvimento rápido

Durante o desenvolvimento, o Vite utiliza **ES Modules (ESM)** nativos do navegador e evita a necessidade de empacotar toda a aplicação antes de iniciar o servidor de desenvolvimento.

Isso permite que projetos grandes tenham inicialização e atualizações rápidas.

O Vite também oferece **Hot Module Replacement (HMR)**, permitindo atualizar partes da aplicação quando um arquivo é alterado sem precisar recarregar toda a página.

De forma simplificada:

```text
Alteração no código
       ↓
Vite detecta
       ↓
Módulo atualizado
       ↓
Navegador recebe alteração
       ↓
Interface atualizada
```

---

## 6.2 Build de produção

Quando a aplicação precisa ser publicada, o Vite realiza uma etapa de build.

O processo pode envolver ferramentas como **esbuild** e **Rollup**, utilizadas em diferentes etapas do fluxo.

O resultado é uma versão otimizada da aplicação para produção.

Entre os recursos envolvidos estão:

* minificação;
* organização dos arquivos;
* otimização dos módulos;
* code splitting;
* geração de assets para produção.

### Code splitting

O code splitting divide a aplicação em diferentes partes, chamadas de chunks.

Em vez de carregar todo o código de uma aplicação de uma única vez, partes podem ser carregadas conforme necessário.

Por exemplo:

```text
Aplicação
│
├── código inicial
│
├── página inicial
│
├── página de produtos
│
└── painel administrativo
```

Isso pode melhorar o carregamento inicial da aplicação.

---

## 6.3 Suporte a JSX e TypeScript

Projetos React frequentemente utilizam:

```text
.jsx
.tsx
```

O Vite possui suporte ao fluxo de desenvolvimento desses arquivos por meio de sua integração com ferramentas apropriadas.

Isso reduz a quantidade de configuração necessária para iniciar um projeto.

---

## 6.4 CSS e assets

O Vite também trabalha com diferentes tipos de recursos utilizados em aplicações front-end, como:

```text
CSS
CSS Modules
Sass/SCSS
imagens
SVG
fontes
outros assets
```

Isso permite importar recursos diretamente nos módulos da aplicação.

Exemplo:

```jsx
import logo from "./assets/logo.svg";
import "./App.css";
```

A ferramenta processa esses recursos de acordo com a configuração do projeto e com as necessidades do build.

---

## 6.5 Configuração

A configuração do Vite costuma ser relativamente simples.

Um projeto pode possuir um arquivo:

```text
vite.config.js
```

Esse arquivo permite configurar o comportamento da ferramenta e adicionar plugins.

A arquitetura baseada em plugins também permite estender o funcionamento do Vite sem precisar construir toda a infraestrutura de build manualmente.

---

## 6.6 Criando um projeto React com Vite

Um projeto React pode ser iniciado utilizando:

```bash
npm create vite@latest meu-projeto -- --template react
```

Depois:

```bash
cd meu-projeto
npm install
npm run dev
```

O fluxo básico fica:

```text
Vite
 ↓
cria estrutura do projeto
 ↓
npm install
 ↓
instala dependências
 ↓
npm run dev
 ↓
servidor de desenvolvimento
 ↓
aplicação React
```

---

# 7. Conclusão

O React se consolidou como uma das principais tecnologias utilizadas no desenvolvimento front-end moderno.

Seu modelo baseado em **componentes, estado, props e fluxo de dados unidirecional** permite construir interfaces organizadas, reutilizáveis e interativas.

O Virtual DOM e o processo de reconciliação ajudam o React a coordenar as atualizações da interface, enquanto JSX proporciona uma maneira prática de representar a estrutura dos componentes.

Um dos principais pontos fortes do React é seu ecossistema. A biblioteca pode ser combinada com diferentes ferramentas de acordo com as necessidades do projeto, como React Router, Redux, Zustand e Next.js.

O **Vite**, por sua vez, complementa esse ecossistema fornecendo um ambiente de desenvolvimento rápido e uma ferramenta de build para preparar a aplicação para produção.

Assim, é importante diferenciar os papéis:

```text
┌──────────────────────────────────┐
│             REACT                │
├──────────────────────────────────┤
│ Componentes                      │
│ Estado e Props                   │
│ JSX                              │
│ Reconciliação                    │
│ Interface de usuário             │
└────────────────┬─────────────────┘
                 │
                 ↓
┌──────────────────────────────────┐
│              VITE                │
├──────────────────────────────────┤
│ Servidor de desenvolvimento      │
│ HMR                              │
│ Build                            │
│ Code splitting                   │
│ Processamento de assets          │
└──────────────────────────────────┘
```

O domínio dessas tecnologias representa uma competência importante para o desenvolvimento de aplicações web modernas, especialmente em projetos que exigem interfaces interativas, escaláveis e organizadas.
