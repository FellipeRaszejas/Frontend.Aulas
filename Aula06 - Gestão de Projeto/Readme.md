# Gestão de Projetos com GitHub — Anotações de Estudo

> Documentação pessoal sobre o uso do **GitHub Projects (v2)**, **Issues** e **Labels** para gestão ágil de projetos, construída durante o desenvolvimento do projeto acadêmico **GastroMatch**.

---

## 1. Introdução

O GitHub oferece, além do controle de versão, um conjunto de ferramentas de **gestão de projetos** integradas ao repositório: Issues, Labels, Milestones e o **GitHub Projects (v2)** — um quadro Kanban/planilha altamente configurável. Este documento resume os conceitos e decisões de configuração estudados e aplicados no projeto GastroMatch.

---

## 2. Issues: a unidade básica de trabalho

Cada item de trabalho (funcionalidade, bug, tarefa) vira uma **Issue**. Uma Issue pode ter:

- **Labels** (categorização rápida, ex.: `bug`, `documentation`, `enhancement`)
- **Assignees** (responsáveis)
- **Milestone** (agrupamento por entrega/versão)
- **Projects** (vínculo com um ou mais quadros de projeto)
- **Development** (branch/PR vinculado automaticamente)

### Labels padrão vs Labels customizados

O GitHub já vem com labels padrão (`bug`, `duplicate`, `enhancement`, `good first issue`, `help wanted`, `invalid`, `question`, `wontfix`). É possível — e recomendado — criar labels próprios para o contexto do projeto. No GastroMatch foram criados:

| Label | Uso |
|---|---|
| `extreme` | Marca itens de complexidade/risco muito alto |
| `Maybe` | Itens que podem não ser implementados por complexidade/necessidade |
| `low` / `medium` | Nível de prioridade |
| `Sprint01`, `Sprint02`, `Sprint03` | Marcação de qual sprint o item pertence |
| `accessibility` | Barreiras de acessibilidade |

**Aprendizado importante:** usar labels para representar "Sprint" funciona, mas tem uma limitação — um item pode acabar em mais de uma label de sprint por engano, e não há noção de data de início/fim. Para isso existe uma ferramenta mais adequada dentro do Projects: o **campo do tipo Iteration** (ver seção 4).

---

## 3. GitHub Projects (v2): o quadro por trás de tudo

O **Project** é uma camada acima das Issues. Ele não guarda as Issues em si — ele guarda **referências** a elas, com **campos próprios** (que não existem na Issue original), como:
- Status (Backlog, Refinement, Ready, In Progress, In Review, Done)
- Priority
- Size / Estimate
- Start date / Target date
- Campos customizados (ex.: Squad, Área, Sprint)

### Diferença entre Projeto de Organização e Projeto Pessoal

Ao comparar um projeto de uma organização com o projeto pessoal (`@usuário`), a estrutura de **Views, campos e filtros é idêntica** — a engine é a mesma (Projects v2). As diferenças reais são:

- Em projetos de **organização**, é possível vincular **Teams** reais do GitHub a permissões e squads, com controle de acesso granular por time.
- Em projetos **pessoais**, não existem "Teams" — um campo como "Squad/Área" serve apenas como **categorização visual/filtro**, não como controle de permissão.
- Alguns recursos de automação/insights mais avançados (roadmap com múltiplos projetos, workflows automáticos mais robustos) podem ter limitações no plano gratuito pessoal.

Ou seja: dá para reproduzir a mesma organização visual (múltiplas views, squads, sprints) em um projeto pessoal sem problema — só não existe a camada de "time com permissão própria" por trás.

---

## 4. Tipos de campo (Fields) dentro do Project

O poder do Projects (v2) está nos campos customizados, configurados em **Project → ... → Settings → New field**:

| Tipo de campo | Uso típico |
|---|---|
| **Text** | Anotações livres |
| **Number** | Estimativas numéricas |
| **Date** | Datas de início/entrega |
| **Single select** | Categorias fechadas (ex.: `Squad`: Frontend, Backend, Database, Product, Cloud) |
| **Iteration** | Sprints com data de início/fim automática, permite view "Current iteration" |

**Aprendizado chave:** um campo do tipo **Single select** chamado `Squad` (ou `Área`) é o que permite criar views como "Squad — Frontend", "Squad — Backend" etc., todas puxando **os mesmos itens**, apenas filtrados. Não são cópias — é o mesmo dado com lentes diferentes.

---

## 5. Views: múltiplas "abas" sobre os mesmos dados

Uma **View** é uma visualização salva do projeto com:
- Um **layout** (Board/Kanban, Table, Roadmap)
- Um **filtro** (query, ex.: `Squad:"Frontend"`, `status:"Sprint 2"`)
- Um **agrupamento/ordenação** próprios

### Por que isso importa

Como todas as views leem da mesma base de itens, **editar um item em qualquer view atualiza automaticamente todas as outras** — inclusive campos como Status, Squad, Priority. Isso é o que permite ter uma estrutura como:

```
Backlog | Sprint 2 | Sprint 3 | Sprint 4 | Sprint 5 | Sprint 6 | Contínuas S1–4 | Future
Squad — Product | Squad — Backend | Squad — Frontend | Squad — Database | Squad — Cloud & Infra
```

Cada uma dessas abas é uma **View** salva:
- As views de Sprint filtram por `Iteration` (ou por label de sprint)
- As views de Squad filtram por `Squad:"<nome>"`
- "Contínuas S1–4" agrupa itens recorrentes que atravessam várias sprints
- "Future" reúne itens ainda sem sprint definida

### Passo a passo para replicar no projeto pessoal

1. Criar o campo `Squad` (Single select) com as opções necessárias.
2. Preencher o campo `Squad` em cada Issue existente.
3. Criar uma nova View para cada Squad (`+ New view` → Board → filtro `Squad:"Frontend"`).
4. Migrar labels de Sprint para um campo `Iteration`, se desejar granularidade de datas.
5. Criar uma View por Sprint, filtrando pela iteration correspondente.
6. Nomear e ordenar as abas conforme a lógica de trabalho (Backlog primeiro, depois sprints em ordem, depois squads).

---

## 6. Status (colunas do Kanban)

O board padrão traz colunas como:
- **No Status** — item ainda não classificado
- **Backlog** — não iniciado
- **Refinement** — em detalhamento/refino de requisito
- **Ready** — pronto para entrar em desenvolvimento
- **In Progress** — em execução
- **In Review** — em revisão (ex.: Pull Request aberto)
- **Done** — concluído

Essas colunas vêm do campo padrão **Status** (Single select), que pode ser customizado (renomeado, adicionar/remover colunas) conforme o fluxo do time.

---

## 7. Labels vs Custom Fields — quando usar cada um

| Critério | Label | Custom Field |
|---|---|---|
| Escopo | Do repositório inteiro | Do Project específico |
| Múltiplos valores no mesmo item | Sim (várias labels ao mesmo tempo) | Não, no caso de Single select (um valor por vez) |
| Aparece em views/filtros do Project | Sim, mas como filtro externo | Sim, nativamente, com agrupamento visual |
| Ideal para | Classificação transversal (bug, prioridade simples, tipo) | Estrutura de fluxo do projeto (Sprint, Squad, Status, Estimate) |

**Conclusão prática:** labels são ótimos para classificação geral e busca rápida nas Issues; campos customizados do Project são melhores para estruturar **fluxo de trabalho** (sprints, squads, status), pois permitem views dedicadas e evitam inconsistência (um item só pode estar em uma sprint por vez, por exemplo).

---

## 8. Boas práticas aplicadas no GastroMatch

- Cada requisito/funcionalidade vira uma Issue numerada (`GastroMatch #2`, `#3`...).
- Prioridade e complexidade tratadas por labels (`low`, `medium`, `extreme`) e pelo campo `Priority`/`Size` do Project.
- Separação clara entre **Backlog geral** e **Sprints específicas**.
- Uso do label `Maybe` para sinalizar itens sob avaliação de escopo — evita que fiquem "escondidos" misturados ao backlog confirmado.
- Planejamento de migração de labels de sprint (`Sprint01`, `Sprint02`...) para um campo `Iteration`, ganhando datas automáticas e views "Current iteration".
- Estrutura de views inspirada em um modelo de organização real: Backlog → Sprints numeradas → Contínuas → Future → Squads, todas como visões diferentes da mesma base de dados.

---

## 9. Referências

- [Documentação oficial do GitHub Projects](https://docs.github.com/en/issues/planning-and-tracking-with-projects)
- [Sobre campos customizados no Projects](https://docs.github.com/en/issues/planning-and-tracking-with-projects/understanding-fields)
- [Sobre views salvas](https://docs.github.com/en/issues/planning-and-tracking-with-projects/customizing-views-in-your-project)