# DOCUMENTAÇÃO TÉCNICA — AluGames

## 1. Visão Geral do Projeto

**AluGames** é uma aplicação web de página única (sem roteamento) para gerenciamento de aluguel de boardgames. O projeto é inteiramente front-end: sem servidor, sem banco de dados, sem frameworks. Toda a lógica vive no navegador.

---

## 2. Estrutura de Arquivos e Função de Cada Um

```
alugames/
├── index.html          → Estrutura HTML da aplicação
├── css/
│   ├── _reset.css      → Normalização de estilos entre navegadores
│   └── main.css        → Todos os estilos visuais e responsividade
├── js/
│   └── app.js          → Lógica de negócio e manipulação do DOM
└── img/                → Assets visuais (logos, capas, decorações)
```

### `index.html`
Contém a marcação semântica da página. Define a estrutura visual (header, main, footer) e os elementos interativos (cards de jogos, botões). Conecta os arquivos CSS (via `<link>`) e JS (via `<script>`). Não contém nenhuma lógica.

### `css/_reset.css`
Remove os estilos padrão inconsistentes entre navegadores (margens, padding, estilos de lista, etc.). É importado no topo do `main.css` via `@import`.

### `css/main.css`
Contém toda a aparência visual:
- **`:root`** — Define variáveis CSS globais (cores, fontes, espaçamentos, raios de borda)
- **Seções de estilo** — Cada componente tem sua própria seção (header, card, botões, toast, responsividade)
- **Media Queries** — Adaptações para 3 breakpoints: 600px (mobile), 900px (tablet), 1440px+ (telas grandes)

### `js/app.js`
Contém toda a lógica interativa:
- `alterarStatus(id)` — Função central que gerencia o estado de cada jogo
- `atualizarContadores()` — Sincroniza os números exibidos na tela
- `exibirToast(mensagem, tipo)` — Notificações temporárias
- `ordenarNumeros(a, b, c)` — Função utilitária de demonstração
- Inicialização via `DOMContentLoaded`

---

## 3. Comunicação entre HTML, CSS e JavaScript

```
HTML (index.html)
    │
    ├── Define estrutura: <li id="game-1" class="game-card">
    │   └── O id permite que o JS encontre o elemento via getElementById()
    │   └── As classes permitem que o CSS estilize e o JS altere o estado
    │
    ├── Conecta ao CSS: <link rel="stylesheet" href="css/main.css">
    │   └── O CSS lê as classes do HTML para aplicar estilos
    │
    └── Conecta ao JS: <script src="js/app.js">
        └── O JS manipula o HTML adicionando/removendo classes
        └── As classes adicionadas pelo JS disparam estilos no CSS

Fluxo de dados:
Clique do usuário → HTML captura onclick → JS executa alterarStatus()
→ JS adiciona/remove classes CSS → CSS aplica novo visual
→ JS atualiza textContent dos contadores → Tela reflete novo estado
```

---

## 4. Fluxo da Aplicação

### Estado inicial (ao carregar a página)
1. HTML é lido e transformado em DOM pelo navegador
2. CSS é aplicado — elementos recebem aparência inicial
3. JS é carregado — `DOMContentLoaded` dispara
4. `atualizarContadores()` conta os jogos já marcados como alugados no HTML
5. Página está pronta para interação

### Fluxo: Alugar um jogo
```
Usuário clica em "Alugar"
    ↓
onclick="alterarStatus(2)" é chamado com id=2
    ↓
getElementById('game-2') encontra o card
    ↓
classList.contains('game-card--rented') → false (não está alugado)
    ↓
Entra no bloco ELSE:
  - card.classList.add('game-card--rented')
  - overlay.classList.add('game-card__overlay--active')
  - badge: remove --available, add --rented, text='Alugado'
  - botao: remove --rent, add --return, text='Devolver'
  - jogosAlugados++
  - exibirToast('Ticket to Ride alugado!')
    ↓
atualizarContadores():
  - querySelectorAll conta 1 card com --rented
  - Atualiza DOM: total-alugados=1, total-disponiveis=2
  - Atualiza header badge: "1 jogo alugado"
    ↓
Tela atualizada — visual reflete estado alugado
```

### Fluxo: Devolver um jogo
```
Usuário clica em "Devolver"
    ↓
alterarStatus(2) chamado, classList.contains → true
    ↓
confirm('Devolver "Ticket to Ride"?') abre diálogo
    ↓
Se OK → remove classes --rented, restaura classes --available e --rent
Se Cancelar → return (função termina sem fazer nada)
    ↓
atualizarContadores() atualiza os números
```

---

## 5. Padrões de Design Aplicados

### BEM (Block Element Modifier)
Metodologia de nomenclatura de classes CSS:
- **Block:** `.game-card` (componente independente)
- **Element:** `.game-card__btn` (parte do componente)
- **Modifier:** `.game-card__btn--return` (variação do elemento)

### Design Tokens via CSS Custom Properties
Todas as cores, fontes e medidas são variáveis em `:root`. Isso permite:
- Alterar toda a paleta modificando um único arquivo
- Consistência visual garantida por padrão
- Facilidade para criar temas (dark/light mode no futuro)

### Responsividade com CSS Grid
O grid `repeat(auto-fit, minmax(240px, 1fr))` ajusta automaticamente o número de colunas conforme o espaço disponível, sem necessidade de múltiplas media queries para o grid.

---

## 6. Acessibilidade

| Recurso | Implementação |
|---------|---------------|
| Labels descritivos | `aria-label="Alugar Monopoly"` em cada botão |
| Regiões dinâmicas | `aria-live="polite"` no badge de status do header |
| Alertas | `role="alert"` e `aria-live="assertive"` no toast |
| Textos alternativos | `alt` descritivo em todas as imagens |
| Foco visível | `:focus-visible` com outline em `_reset.css` |
| HTML semântico | `<header>`, `<main>`, `<section>`, `<footer>`, `<button>` |

---

## 7. Decisões Técnicas e Justificativas

| Decisão | Alternativa | Por que esta escolha |
|---------|------------|----------------------|
| `textContent` para textos | `innerHTML` | Mais seguro — evita XSS; mais rápido |
| Classes CSS para estado | Propriedade `disabled` / `style` | Mais semântico, testável, mantém separação CSS/JS |
| `querySelectorAll` para contagem | Apenas a variável `jogosAlugados` | Conta o estado real do DOM, não apenas a variável |
| Toast em vez de `alert()` | `alert()` nativo | Não bloqueia a thread, visual consistente com o app |
| `DOMContentLoaded` | Script no `<head>` sem defer | Garante que HTML existe antes do JS rodar |
| `<button>` em vez de `<a>` | `<a onclick>` como no original | Botões são semânticos para ações; links para navegação |

---

## 8. Melhorias Futuras (Ordenadas por Impacto)

### Curto prazo (para adicionar ao portfólio agora)
1. **localStorage** — Persistir estado ao recarregar a página
2. **GitHub Pages** — Deploy público para incluir link no currículo
3. **CSS transitions** no número do contador ao mudar (+1 com animação)

### Médio prazo (próximas semanas)
4. **Adicionar jogos** — Formulário com validação para cadastrar novas entradas
5. **Filtro de status** — Mostrar apenas disponíveis ou apenas alugados
6. **Data/hora de aluguel** — Registrar quando cada jogo foi alugado

### Longo prazo (após aprender mais)
7. **API REST** — Integrar com json-server ou Supabase
8. **Testes** — Jest para funções JS, Playwright para testes E2E
9. **TypeScript** — Adicionar tipagem estática
10. **React** — Refatorar como componentes reutilizáveis
