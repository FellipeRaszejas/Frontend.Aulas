# UniSenai · Portal de Projetos de Extensão

Portal visual de exposição dos projetos de extensão da faculdade SENAI, desenvolvido com **React + Vite**. O tema usa tons de vermelho e o projeto cobre os principais conceitos de React, com uma página de login/cadastro sem backend e um mapa com a localização da Escola SENAI Gaspar Ricardo Júnior.

## Tecnologias

| Tecnologia | Para que serve no projeto |
|---|---|
| React + Vite | Base da aplicação e servidor de desenvolvimento |
| React Router (`react-router-dom`) | Navegação entre páginas sem recarregar o navegador |
| `@vis.gl/react-google-maps` | Componentes React para o Google Maps |
| Google Maps Geocoding API | Converte o nome/endereço da escola em coordenadas |
| JSONPlaceholder | API pública de teste que alimenta a lista de projetos |

## Como rodar

```bash
npm install
# crie o arquivo .env com VITE_GOOGLE_MAPS_API_KEY=SUA_CHAVE
# copie senai.jpg para a pasta public/
npm run dev
```

Acesse `http://localhost:5173`.

## Estrutura de pastas

```
unisenai-react/
├── .env                      → chave do Google Maps (VITE_GOOGLE_MAPS_API_KEY)
├── public/
│   └── senai.jpg             → imagem de fundo do hero da Home
└── src/
    ├── main.jsx              → ponto de entrada: React, StrictMode e BrowserRouter
    ├── App.jsx               → layout geral e definição das rotas
    ├── index.css             → tema em tons de vermelho e estilos globais
    ├── services/
    │   └── api.js            → funções fetch para a API de projetos
    ├── hooks/
    │   └── useProjetos.js    → hook customizado com useState e useEffect
    ├── components/           → peças reutilizáveis (recebem props)
    │   ├── Navbar.jsx
    │   ├── Footer.jsx
    │   ├── ProjectCard.jsx
    │   ├── ProjectList.jsx
    │   ├── FeatureCard.jsx
    │   ├── Campo.jsx
    │   └── MapaSenai.jsx
    └── pages/                → telas acessadas pelas rotas
        ├── Home.jsx
        ├── Projetos.jsx
        ├── ProjetoDetalhe.jsx
        ├── Localizacao.jsx
        └── Acesso.jsx
```

## Mapa de rotas

| Caminho | Página | Arquivo | Observação |
|---|---|---|---|
| `/` | Home | `pages/Home.jsx` | Hero com a foto da escola e cards de recursos |
| `/projetos` | Lista de projetos | `pages/Projetos.jsx` | Busca, limite de itens e consumo da API |
| `/projetos/:id` | Detalhe do projeto | `pages/ProjetoDetalhe.jsx` | Parâmetro `:id` lido com `useParams` |
| `/localizacao` | Mapa | `pages/Localizacao.jsx` | Google Maps com marcador no SENAI |
| `/acesso` | Login / Cadastro | `pages/Acesso.jsx` | Formulários com validação, sem backend |
| `*` | Página 404 | `App.jsx` | Rota coringa com link de volta ao início |

---

## Onde cada conceito foi utilizado

### Resumo

| Conceito | Onde está | Arquivos |
|---|---|---|
| JSX | Todos os componentes e páginas | `components/*`, `pages/*`, `App.jsx`, `main.jsx` |
| Components | Peças reutilizáveis e telas | `ProjectCard`, `ProjectList`, `FeatureCard`, `Campo`, `Navbar`, `Footer`, `MapaSenai` |
| Props | Dados enviados de um componente pai para o filho | `Navbar`, `ProjectCard`, `ProjectList`, `FeatureCard`, `Campo`, `MapaSenai` |
| Virtual DOM | Atualização eficiente ao digitar na busca | `pages/Projetos.jsx` |
| Lista e Keys | Renderização de cards, links, recursos e opções | `ProjectList`, `Navbar`, `Home`, `Campo` |
| Renderização | Condicional e de listas | `Projetos`, `ProjetoDetalhe`, `ProjectList`, `Acesso`, `MapaSenai` |
| State e useState | Estado de busca, formulário, mapa e API | `Projetos`, `Acesso`, `useProjetos`, `ProjetoDetalhe`, `MapaInterno` |
| Formulários | Inputs controlados, validação e envio | `pages/Acesso.jsx`, `components/Campo.jsx`, `pages/Projetos.jsx` |
| useEffect | Chamadas à API, limpeza e geocoding | `hooks/useProjetos.js`, `pages/ProjetoDetalhe.jsx`, `components/MapaSenai.jsx` |
| Consumo de API | `fetch` para JSONPlaceholder e Google Geocoding | `services/api.js`, `hooks/useProjetos.js`, `MapaSenai.jsx` |
| React Router | Rotas, links, parâmetros e navegação | `main.jsx`, `App.jsx`, `Navbar.jsx`, `ProjectCard.jsx`, `ProjetoDetalhe.jsx` |

---

### 1. JSX

JSX é a sintaxe que mistura HTML com JavaScript dentro dos componentes. Aparece em todos os arquivos `.jsx`.

- `components/ProjectCard.jsx`: estrutura do card com `<article>`, `<img>` e expressões como `{nome}` e `{descricao.slice(0, 90)}`.
- `pages/Home.jsx`: `style={{ backgroundImage: 'url(/senai.jpg)' }}` mostra um objeto JavaScript passado como estilo.
- `pages/Acesso.jsx`: `{cadastro && (...)}` e `className={`tab ${...}`}` misturam lógica e marcação.
- `main.jsx`: `<React.StrictMode>` e `<BrowserRouter>` envolvem a aplicação.

Diferenças do HTML que aparecem no código: `className` no lugar de `class`, `htmlFor` no lugar de `for`, `onChange` e `onClick` em camelCase.

### 2. Components

Componente é uma função que retorna JSX. O projeto usa três tipos:

- **Layout**: `Navbar` e `Footer`, usados em `App.jsx` em todas as páginas.
- **Peças reutilizáveis**: `ProjectCard` é usado dentro de `ProjectList`; `FeatureCard` é usado três vezes na Home; `Campo` é usado vinte vezes no formulário de `Acesso`.
- **Páginas**: `Home`, `Projetos`, `ProjetoDetalhe`, `Localizacao` e `Acesso`, cada uma associada a uma rota.

Hierarquia principal:

```
App
├── Navbar
├── Routes
│   ├── Home → FeatureCard (x3)
│   ├── Projetos → ProjectList → ProjectCard (x n)
│   ├── ProjetoDetalhe
│   ├── Localizacao → MapaSenai → MapaInterno
│   └── Acesso → Campo (x n)
└── Footer
```

### 3. Props

Props são os dados que um componente pai envia ao filho. Exemplos do projeto:

| Componente | Props recebidas | Enviadas por |
|---|---|---|
| `Navbar` | `marca` | `App.jsx`: `<Navbar marca="UniSenai" />` |
| `ProjectList` | `projetos` | `Projetos.jsx`: lista filtrada |
| `ProjectCard` | `projeto` (objeto com id, nome, descrição, categoria, imagem) | `ProjectList.jsx` |
| `FeatureCard` | `icone`, `titulo`, `texto` | `Home.jsx`, a partir do array `recursos` |
| `Campo` | `label`, `name`, `value`, `onChange`, `erro`, `type`, `opcoes` | `Acesso.jsx` |
| `MapaSenai` | nenhuma (usa constantes internas) | `Localizacao.jsx` |

`Campo` mostra também o uso de **valores padrão** em props (`type = 'text'`) e de **renderização condicional** pela prop `opcoes`: se ela existe, renderiza `<select>`, senão `<input>`.

### 4. Virtual DOM

O React não recria a página inteira a cada mudança. Ele monta uma árvore virtual, compara com a versão anterior e atualiza apenas o que mudou.

Exemplo em `pages/Projetos.jsx`: ao digitar no campo de busca, `setBusca` atualiza o estado, o componente é renderizado de novo, o React compara a nova árvore com a anterior e altera somente os cards que entraram ou saíram do filtro. O `<input>` continua com o foco porque o elemento é reaproveitado.

### 5. Lista e Keys

Listas são renderizadas com `.map()`, e cada item precisa de uma `key` estável para o React identificar elementos entre renderizações.

| Local | Código | Por que a key |
|---|---|---|
| `components/ProjectList.jsx` | `key={projeto.id}` | Identifica cada card de projeto |
| `components/Navbar.jsx` | `key={link.to}` | Identifica cada link (o caminho é único) |
| `pages/Home.jsx` | `key={r.id}` | Identifica cada card de recurso |
| `components/Campo.jsx` | `key={opcao}` | Identifica cada opção do `<select>` de cursos |
| `pages/Projetos.jsx` | `[3, 6, 9].map(...)` com `key={n}` | Opções do seletor "Mostrar" |

### 6. Renderização

Há dois tipos no projeto.

**Condicional** (mostra ou esconde conteúdo):

- `pages/Projetos.jsx`: `{loading && ...}`, `{erro && ...}` e `{!loading && !erro && <ProjectList />}`.
- `pages/ProjetoDetalhe.jsx`: `if (loading) return ...` e `if (erro) return ...` antes do conteúdo principal.
- `components/ProjectList.jsx`: `if (projetos.length === 0)` mostra a mensagem de lista vazia.
- `pages/Acesso.jsx`: campos extras só no cadastro (`cadastro && (...)`) e a mensagem de sucesso (`{mensagem && ...}`).
- `components/MapaSenai.jsx`: mostra aviso se a chave do Google não estiver no `.env`.
- `MapaInterno` (dentro de `MapaSenai.jsx`): mostra "Localizando o SENAI..." enquanto `local` é `null`.

**De listas**: `.map()` em `ProjectList`, `Navbar`, `Home`, `Campo` e `Projetos`, como descrito no item anterior.

### 7. State e useState

`useState` guarda dados que, quando mudam, fazem o componente ser renderizado de novo.

| Componente | Estados | Função |
|---|---|---|
| `pages/Projetos.jsx` | `busca`, `mostrar` | Texto digitado e quantidade de cards exibidos |
| `pages/Acesso.jsx` | `modo`, `form`, `erros`, `mensagem` | Login ou cadastro, valores dos campos, erros de validação e mensagem final |
| `hooks/useProjetos.js` | `projetos`, `loading`, `erro` | Resultado da API e seus estados |
| `pages/ProjetoDetalhe.jsx` | `projeto`, `loading`, `erro` | Dados de um único projeto |
| `components/MapaSenai.jsx` (`MapaInterno`) | `local`, `endereco`, `aviso` | Coordenadas, endereço formatado e aviso de fallback |

Em `pages/Projetos.jsx` existe também **estado derivado**: `filtrados` não tem `useState`, é calculado a partir de `projetos`, `busca` e `mostrar` a cada renderização.

### 8. Formulários

O formulário de `pages/Acesso.jsx` usa **inputs controlados**: o valor vem do estado (`value={form.email}`) e cada tecla atualiza esse estado pelo `onChange`.

Fluxo:

1. `handleChange` lê `name` e `value` do evento e atualiza `form` com `setForm((prev) => ...)`.
2. `validar()` retorna um objeto com os erros (e-mail, senha, RA, curso, turma, confirmação de senha). Se o formulário for de cadastro, valida também os campos extras.
3. `handleSubmit` chama `e.preventDefault()` para não recarregar a página, grava os erros em `erros` e, se não houver erros, mostra a mensagem de simulação.
4. `noValidate` desativa a validação nativa do navegador, para que a validação seja feita pelo React.
5. `trocarModo` limpa o formulário ao alternar entre login e cadastro.

O componente `Campo` centraliza a montagem de cada campo, com label, erro e `<select>` ou `<input>`.

Em `pages/Projetos.jsx` há também um formulário simples: o `<input type="search">` e o `<select>` de quantidade são controlados pelo estado.

### 9. useEffect

`useEffect` executa efeitos colaterais, como chamadas à API ou integração com bibliotecas externas.

| Local | Dependências | O que faz |
|---|---|---|
| `hooks/useProjetos.js` | `[]` | Busca a lista de projetos ao montar o componente |
| `pages/ProjetoDetalhe.jsx` | `[id]` | Busca o projeto novamente quando o `id` da URL muda |
| `components/MapaSenai.jsx` | `[geocodingLib]` | Geocodifica o endereço quando a biblioteca do Google carrega |

Padrão usado nos três casos:

- Flag `ativo` evita atualizar o estado depois que o componente foi desmontado.
- A função retornada (`return () => { ativo = false; }`) é a limpeza do efeito.

Em `useProjetos.js` o `useEffect` com array vazio roda uma vez. Em `ProjetoDetalhe.jsx`, o `[id]` faz a busca rodar de novo quando a rota muda de `/projetos/1` para `/projetos/2`, sem desmontar o componente.

### 10. Consumo de API

**JSONPlaceholder** (`services/api.js`):

- `buscarProjetos(limite)` faz `fetch` em `/posts?_limit=9`.
- `buscarProjeto(id)` faz `fetch` em `/posts/:id`.
- `mapearProjeto` converte o formato da API (`title`, `body`) para o formato do portal (`nome`, `descricao`, `categoria`, `imagem`). Esse passo deixa claro que os dados da API precisam ser adaptados ao modelo da aplicação.
- Os erros HTTP são tratados com `if (!res.ok) throw new Error(...)`.

O hook `useProjetos` encapsula a chamada para que as páginas não precisem conhecer o `fetch`.

**Google Geocoding** (`components/MapaSenai.jsx`): a biblioteca `geocoding` é carregada pelo `APIProvider`, e `new Geocoder().geocode({ address })` converte o nome da escola em latitude e longitude.

### 11. React Router

| Recurso | Arquivo | Uso |
|---|---|---|
| `BrowserRouter` | `main.jsx` | Habilita o roteamento pelo histórico do navegador |
| `Routes` e `Route` | `App.jsx` | Define as rotas e as páginas correspondentes |
| Parâmetro `:id` | `App.jsx` (`/projetos/:id`) | Caminho dinâmico para o detalhe |
| Rota `*` | `App.jsx` | Página 404 |
| `NavLink` | `components/Navbar.jsx` | Links do menu, com classe `active` na página atual |
| `end` | `components/Navbar.jsx` | Impede que o link "Início" fique ativo em todas as páginas |
| `Link` | `components/ProjectCard.jsx`, `pages/ProjetoDetalhe.jsx`, `App.jsx`, `pages/Home.jsx` | Navegação sem recarregar a página |
| `useParams` | `pages/ProjetoDetalhe.jsx` | Lê o `id` da URL |

### 12. Google Maps

Implementado em `components/MapaSenai.jsx`:

- `APIProvider` carrega o script do Google com a chave de `import.meta.env.VITE_GOOGLE_MAPS_API_KEY`.
- `useMapsLibrary('geocoding')` carrega a biblioteca de geocodificação.
- `Map` renderiza o mapa com `defaultCenter`, `defaultZoom` e `mapId`.
- `AdvancedMarker` e `Pin` colocam um marcador vermelho sobre a escola.
- Se a geocodificação falhar, `FALLBACK` mostra o centro de Sorocaba e uma mensagem de aviso.

---

## Fluxo de dados resumido

```
main.jsx (BrowserRouter)
  └─ App.jsx (Routes)
       └─ Projetos.jsx
            ├─ useProjetos()  → useEffect → api.js → fetch JSONPlaceholder
            │     └─ devolve { projetos, loading, erro }
            ├─ useState: busca, mostrar
            └─ ProjectList (props: projetos filtrados)
                 └─ ProjectCard (props: projeto) → Link → /projetos/:id
```

## Observações

- O formulário de `Acesso` é apenas visual: nenhum dado é enviado a servidores.
- Os textos dos projetos vêm do JSONPlaceholder, em inglês. Para dados reais, troque `BASE_URL` e ajuste `mapearProjeto`.
- Em produção, adicione o domínio final às restrições da chave do Google Maps.
- A chave do Google Maps fica no `.env`. Não suba esse arquivo para o repositório público.