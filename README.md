# 🎲 AluGames — Plataforma de Aluguel de Boardgames

<p align="center">
  <img src="img/logo.svg" alt="AluGames Logo" width="200">
</p>

<p align="center">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5">
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript">
</p>

<p align="center">
  Aplicação web para controle de aluguel de boardgames, com interface moderna, responsiva e interativa.
</p>

---

## 📋 Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Demonstração](#demonstração)
- [Funcionalidades](#funcionalidades)
- [Tecnologias](#tecnologias)
- [Estrutura de Pastas](#estrutura-de-pastas)
- [Como Executar](#como-executar)
- [Conceitos Aprendidos](#conceitos-aprendidos)
- [Melhorias Futuras](#melhorias-futuras)
- [Boas Práticas Aplicadas](#boas-práticas-aplicadas)
- [Autor](#autor)

---

## 📖 Sobre o Projeto

O **AluGames** é uma aplicação de página única (SPA-like) desenvolvida como projeto prático durante o curso de **Lógica de Programação e JavaScript** da [Alura](https://www.alura.com.br).

O objetivo é simular uma plataforma de aluguel de boardgames, onde é possível visualizar o catálogo de jogos disponíveis, alugar ou devolver jogos com um clique, e acompanhar em tempo real quantos jogos estão alugados e disponíveis.

O projeto aplica **manipulação do DOM**, **controle de estado via classes CSS** e **UX responsivo** — sem frameworks, apenas HTML, CSS e JavaScript puro (vanilla JS).

---

## 🖥️ Demonstração

```
[ Screenshot da tela inicial ]
```

```
[ Screenshot após alugar um jogo ]
```

**[🔗[ Ver demonstração ao vivo](https://alugames-alpha-red.vercel.app/)](#)** 

---

## ✅ Funcionalidades

- [x] Visualizar catálogo de boardgames com imagem, nome e gênero
- [x] Alugar um jogo (botão "Alugar" → estado alugado)
- [x] Devolver um jogo com confirmação do usuário (dialog nativo)
- [x] Feedback visual imediato: overlay escuro + badge "Alugado" na capa
- [x] Notificação tipo "toast" ao alugar ou devolver
- [x] Contador em tempo real: total de jogos, alugados e disponíveis
- [x] Badge de status no header (mostra quantos jogos estão alugados)
- [x] Layout totalmente responsivo: desktop, tablet e mobile
- [x] Acessibilidade: atributos ARIA, `aria-label` nos botões, `role="alert"` no toast

---

## 🛠️ Tecnologias

| Tecnologia | Finalidade |
|------------|------------|
| **HTML5 semântico** | Estrutura da página com tags como `<header>`, `<main>`, `<section>`, `<footer>` |
| **CSS3** | Estilização, animações, variáveis CSS (custom properties), flexbox, grid |
| **JavaScript ES6+** | Lógica de negócio, manipulação do DOM, eventos, template strings |
| **Google Fonts** | Tipografia: Chakra Petch (display) + Outfit (corpo) |

---

## 📁 Estrutura de Pastas

```
alugames/
│
├── index.html          # Página principal — estrutura HTML da aplicação
│
├── css/
│   ├── _reset.css      # Reset de estilos padrão do navegador
│   └── main.css        # Todos os estilos: variáveis, layout, componentes
│
├── js/
│   └── app.js          # Toda a lógica JavaScript da aplicação
│
└── img/
    ├── logo.svg             # Logotipo AluGames
    ├── fade_bar.svg         # Elemento decorativo do divisor
    ├── hachuras.svg         # Elemento decorativo do rodapé
    ├── monopoly.png         # Capa do jogo Monopoly
    ├── ticket_to_ride.png   # Capa do jogo Ticket to Ride
    └── takenoko.png         # Capa do jogo Takenoko
```

---

## 🚀 Como Executar

Nenhuma instalação ou dependência externa necessária.

**1. Clone o repositório:**
```bash
git clone https://github.com/seu-usuario/alugames.git
```

**2. Acesse a pasta do projeto:**
```bash
cd alugames
```

**3. Abra no navegador:**

Abra o arquivo `index.html` diretamente, ou use o **Live Server** no VS Code para melhor experiência de desenvolvimento:

```
Extensão recomendada: Live Server (Ritwick Dey) — VS Code
Atalho: botão direito no index.html → "Open with Live Server"
```

> Sem build, sem npm, sem instalação. Funciona direto no navegador. ✅

---

## 📚 Conceitos Aprendidos

Este projeto consolidou os seguintes fundamentos de JavaScript e desenvolvimento Front-End:

### JavaScript

| Conceito | Onde foi usado |
|----------|---------------|
| `document.getElementById()` | Buscar o card do jogo pelo id |
| `document.querySelector()` | Buscar elementos filhos dentro do card |
| `document.querySelectorAll()` | Contar todos os cards alugados |
| `classList.contains()` | Verificar se o jogo está alugado |
| `classList.add()` | Adicionar classe de estado alugado |
| `classList.remove()` | Remover classe de estado alugado |
| `element.textContent` | Atualizar textos de botão, badge e contador |
| `confirm()` | Pedir confirmação antes de devolver |
| `addEventListener()` | Executar código após o DOM carregar |
| `setTimeout()` | Esconder o toast após 3 segundos |
| Template Strings | Montar strings dinâmicas com variáveis |
| Arrow Functions | Callbacks e funções modernas |
| `Array.sort()` com comparador | Ordenar números corretamente |
| `Array.join()` | Unir elementos do array em string |

### HTML e CSS

- HTML semântico: uso correto de `<header>`, `<main>`, `<section>`, `<footer>`
- Atributos de acessibilidade: `aria-label`, `aria-live`, `role`, `alt`
- CSS Custom Properties (variáveis) para manutenção centralizada
- Flexbox e CSS Grid para layout responsivo
- Media Queries para adaptar a diferentes tamanhos de tela
- Animações CSS (`@keyframes`) e transições (`transition`)
- BEM — metodologia de nomenclatura de classes CSS

---

## 🔮 Melhorias Futuras

- [ ] **Persistência de dados:** salvar estado no `localStorage` para sobreviver ao reload
- [ ] **Adicionar jogos:** formulário para cadastrar novos jogos ao catálogo
- [ ] **Busca e filtro:** filtrar por nome ou status (disponível / alugado)
- [ ] **Histórico de aluguéis:** registrar data e hora de cada transação
- [ ] **Backend simulado:** usar uma API fake (json-server ou MockAPI)
- [ ] **Autenticação:** tela de login simples para identificar o usuário
- [ ] **Animações de transição:** usar a View Transitions API ao mudar estados
- [ ] **Testes automatizados:** implementar testes com Jest ou Vitest
- [ ] **Deploy:** publicar no GitHub Pages ou Vercel

---

## ✨ Boas Práticas Aplicadas

- **Código limpo:** funções pequenas, com nomes descritivos e responsabilidade única
- **DRY (Don't Repeat Yourself):** lógica de contadores centralizada em `atualizarContadores()`
- **Separação de responsabilidades:** HTML (estrutura), CSS (aparência), JS (comportamento)
- **Acessibilidade:** `aria-live`, `aria-label`, foco visível, HTML semântico
- **Segurança:** `textContent` em vez de `innerHTML` para evitar XSS
- **Variáveis CSS:** paleta e espaçamentos centralizados em `:root`
- **Responsividade mobile-first:** adaptação para celulares, tablets e desktops
- **Comentários educativos:** código documentado para facilitar aprendizado

---

## 📸 Créditos

Projeto desenvolvido com base nos exercícios do curso de **Lógica de Programação** da [Alura](https://www.alura.com.br).

**Instrutores:**

**Jacqueline Oliveira**

<img src="https://github.com/jacqueline-oliveira.png" width="150" alt="Foto de perfil">

GitHub: [github.com/jacqueline-oliveira](https://github.com/jacqueline-oliveira)
LinkedIn: [linkedin.com/in/jacqueline-r-oliveira](https://www.linkedin.com/in/jacqueline-r-oliveira/)

**Rodrigo da Silva Ferreira Caneppele**

<img src="https://github.com/rcaneppele.png" width="150" alt="Foto de perfil">

GitHub: [github.com/jacqueline-oliveira](https://github.com/rcaneppele)
LinkedIn: [linkedin.com/in/rcaneppele](https://www.linkedin.com/in/rcaneppele/)

---

| Nome | GitHub | LinkedIn |
|------|--------|---------|
| Jacqueline Oliveira | [@jacqueline-oliveira](https://github.com/jacqueline-oliveira) | [linkedin.com/in/jacqueline-r-oliveira](https://www.linkedin.com/in/jacqueline-r-oliveira/) |
| Rodrigo Caneppele | [@rcaneppele](https://github.com/rcaneppele) | [linkedin.com/in/rcaneppele](https://www.linkedin.com/in/rcaneppele/) |

---

## 👤 Autor

**Guilherme Barros**

<img src="https://github.com/dida0982.png" width="150" alt="Foto de perfil">

GitHub: [github.com/dida0982](https://github.com/dida0982)
LinkedIn: [linkedin.com/in/guilherme-barros-6a0369209](https://www.linkedin.com/in/guilherme-barros-6a0369209/)

[![GitHub](https://img.shields.io/badge/GitHub-dida0982-181717?style=flat-square&logo=github)](https://github.com/dida0982)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-guilherme--barros-0077B5?style=flat-square&logo=linkedin)](https://www.linkedin.com/in/guilherme-barros-6a0369209/)

---

## 📄 Licença

Este projeto está sob a licença **MIT**. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

<p align="center">
  Desenvolvido durante os estudos de programação na <a href="https://www.alura.com.br">Alura</a> 🚀
</p>
