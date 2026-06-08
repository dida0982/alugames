/**
 * =============================================================================
 * AluGames — app.js
 * Lógica principal da aplicação de aluguel de boardgames.
 *
 * Conceito geral:
 * Este arquivo controla o que acontece quando o usuário clica em "Alugar" ou
 * "Devolver". Ele lê o estado atual do jogo na tela (está alugado ou não?),
 * atualiza as classes CSS para mudar o visual, e mantém o contador global.
 * =============================================================================
 */


// =============================================================================
// VARIÁVEIS GLOBAIS
// =============================================================================

/**
 * jogosAlugados
 * Tipo: number (inteiro)
 *
 * Armazena quantos jogos estão atualmente alugados.
 * Começa em 0 e é incrementado (+1) ao alugar e decrementado (-1) ao devolver.
 *
 * Por que não usar 0 diretamente em cada lugar?
 * Porque ao centralizar o valor numa variável, qualquer parte do código pode
 * consultá-la ou modificá-la sem risco de inconsistência.
 */
let jogosAlugados = 0;


// =============================================================================
// FUNÇÕES PRINCIPAIS
// =============================================================================

/**
 * alterarStatus(id)
 * -------------------
 * FUNÇÃO PRINCIPAL da aplicação. É chamada quando o usuário clica em
 * "Alugar" ou "Devolver" em qualquer card.
 *
 * @param {number} id — O número do jogo (1, 2 ou 3), definido no HTML.
 *
 * O que ela faz, passo a passo:
 * 1. Encontra o elemento HTML do jogo pelo ID.
 * 2. Verifica se o jogo já está alugado (tem a classe --rented).
 * 3. Se sim → pede confirmação e devolve o jogo.
 * 4. Se não → aluga o jogo.
 * 5. Atualiza os contadores na tela.
 */
function alterarStatus(id) {

  /**
   * document.getElementById(`game-${id}`)
   * ----------------------------------------
   * `document` representa a página HTML inteira.
   * `.getElementById()` é um método que BUSCA um único elemento pelo atributo id="".
   * A crase (`) é uma Template String: permite inserir variáveis dentro da string
   * usando ${variável}. Então `game-${id}` vira "game-1", "game-2", ou "game-3".
   *
   * Retorna: o elemento <li> do jogo, ou null se não encontrar.
   * Por que usar isso aqui? Precisamos do elemento pai (o card inteiro) para
   * acessar os elementos filhos (imagem, botão, nome).
   */
  const card = document.getElementById(`game-${id}`);

  // Segurança: se por algum motivo o card não existir, sai da função.
  if (!card) return;

  /**
   * card.querySelector('.game-card__img-wrapper')
   * -----------------------------------------------
   * `.querySelector()` busca o PRIMEIRO elemento filho que corresponde ao
   * seletor CSS passado. Aqui, busca dentro de `card` (não na página toda).
   *
   * Diferença entre getElementById e querySelector:
   * - getElementById busca por id, na página toda, muito rápido.
   * - querySelector usa seletores CSS (classe, tag, etc.), mais flexível.
   *
   * Retorna: o primeiro elemento que corresponde, ou null.
   */
  const imgWrapper = card.querySelector('.game-card__img-wrapper');
  const overlay    = card.querySelector('.game-card__overlay');
  const badge      = card.querySelector('.game-card__badge');
  const botao      = card.querySelector('.game-card__btn');
  const nomeJogo   = card.querySelector('.game-card__name');

  /**
   * card.classList.contains('game-card--rented')
   * -----------------------------------------------
   * `.classList` é uma propriedade que retorna a lista de classes CSS de um elemento.
   * `.contains('nome-da-classe')` verifica se a classe existe na lista.
   * Retorna: true ou false.
   *
   * Por que usar classList em vez de checar o texto do botão?
   * Porque classes CSS representam ESTADO do elemento, não apenas aparência.
   * É uma prática mais robusta e semântica.
   *
   * Exemplo mental:
   * Se o card tem class="game-card game-card--rented"
   * → classList.contains('game-card--rented') retorna true
   * Se o card tem class="game-card"
   * → classList.contains('game-card--rented') retorna false
   */
  const estaAlugado = card.classList.contains('game-card--rented');


  if (estaAlugado) {
    // =========================================================================
    // BLOCO: DEVOLVER JOGO
    // O jogo está alugado → o usuário quer devolver.
    // =========================================================================

    /**
     * nomeJogo.textContent
     * ----------------------
     * `.textContent` lê ou define o TEXTO puro dentro de um elemento HTML,
     * sem nenhuma tag HTML. É seguro e rápido.
     *
     * Diferença de innerHTML:
     * - textContent → apenas texto, ignora tags HTML.
     * - innerHTML   → texto + tags HTML. Pode ser perigoso com dados do usuário
     *                 (risco de XSS — Cross-Site Scripting).
     * Aqui usamos textContent porque queremos apenas o nome do jogo.
     */
    const confirmacao = confirm(
      `Devolver "${nomeJogo.textContent}"?\nEle ficará disponível para outros jogadores.`
    );

    /**
     * confirm()
     * ----------
     * Exibe uma caixa de diálogo nativa do navegador com as opções OK e Cancelar.
     * Retorna: true se o usuário clicar OK, false se clicar Cancelar.
     *
     * Se o usuário cancelar, a função para aqui (return) sem fazer nada.
     */
    if (!confirmacao) return;

    // --- Remove as classes que indicam estado "alugado" ---

    /**
     * classList.remove('nome-da-classe')
     * ------------------------------------
     * Remove uma classe da lista de classes do elemento.
     * Se a classe não existir, não faz nada (não gera erro).
     *
     * Depois deste código:
     * card.classList remove 'game-card--rented'
     * overlay.classList remove 'game-card__overlay--active'
     */
    card.classList.remove('game-card--rented');
    overlay.classList.remove('game-card__overlay--active');

    /**
     * classList.add('nome-da-classe')
     * ---------------------------------
     * Adiciona uma classe à lista de classes do elemento.
     * Se a classe já existir, não duplica (não gera erro).
     */
    badge.classList.remove('game-card__badge--rented');
    badge.classList.add('game-card__badge--available');

    botao.classList.remove('game-card__btn--return');
    botao.classList.add('game-card__btn--rent');

    // Atualiza os textos do badge e do botão
    badge.textContent  = 'Disponível';
    botao.textContent  = 'Alugar';
    botao.setAttribute('aria-label', `Alugar ${nomeJogo.textContent}`);

    // Decrementa o contador (-1 jogo alugado)
    jogosAlugados--;

    // Mostra mensagem de retorno
    exibirToast(`${nomeJogo.textContent} devolvido com sucesso!`, 'success');

  } else {
    // =========================================================================
    // BLOCO: ALUGAR JOGO
    // O jogo está disponível → o usuário quer alugar.
    // =========================================================================

    card.classList.add('game-card--rented');
    overlay.classList.add('game-card__overlay--active');

    badge.classList.remove('game-card__badge--available');
    badge.classList.add('game-card__badge--rented');

    botao.classList.remove('game-card__btn--rent');
    botao.classList.add('game-card__btn--return');

    badge.textContent = 'Alugado';
    botao.textContent = 'Devolver';
    botao.setAttribute('aria-label', `Devolver ${nomeJogo.textContent}`);

    // Incrementa o contador (+1 jogo alugado)
    jogosAlugados++;

    exibirToast(`${nomeJogo.textContent} alugado! Aproveite.`, 'info');
  }

  // Após qualquer alteração, atualiza todos os contadores visuais
  atualizarContadores();
}


// =============================================================================
// FUNÇÕES AUXILIARES
// =============================================================================

/**
 * atualizarContadores()
 * ----------------------
 * Atualiza os números exibidos na barra de contadores e no badge do header.
 * É chamada toda vez que um jogo é alugado ou devolvido.
 *
 * Por que separar em função própria?
 * Porque vários lugares podem precisar atualizar os contadores (inicialização,
 * após alugar, após devolver). Separar evita repetição de código (princípio DRY:
 * Don't Repeat Yourself).
 */
function atualizarContadores() {

  /**
   * document.querySelectorAll('.game-card--rented')
   * --------------------------------------------------
   * Diferente de querySelector (que retorna apenas o PRIMEIRO),
   * querySelectorAll retorna TODOS os elementos que combinam com o seletor,
   * numa NodeList (parecida com um array).
   *
   * Por que usar isso aqui?
   * Para contar quantos cards têm a classe --rented. Isso garante que o
   * contador sempre reflete a realidade do DOM, não apenas a variável.
   * É uma verificação de segurança: se algo der errado com a variável,
   * o DOM ainda diz a verdade.
   *
   * .length → propriedade que retorna o número de itens encontrados.
   */
  const totalCards       = document.querySelectorAll('.game-card').length;
  const alugadosNoDom    = document.querySelectorAll('.game-card--rented').length;
  const disponiveis      = totalCards - alugadosNoDom;

  // Sincroniza a variável global com a realidade do DOM
  jogosAlugados = alugadosNoDom;

  // Atualiza os elementos de texto na tela
  const elAlugados     = document.getElementById('total-alugados');
  const elDisponiveis  = document.getElementById('total-disponiveis');
  const elStatusTexto  = document.getElementById('status-text');

  /**
   * elemento.textContent = 'novo texto'
   * -------------------------------------
   * Atribui um novo texto ao elemento. O navegador atualiza a tela
   * imediatamente (isso é chamado de "manipulação do DOM").
   */
  if (elAlugados)    elAlugados.textContent    = alugadosNoDom;
  if (elDisponiveis) elDisponiveis.textContent  = disponiveis;
  if (elStatusTexto) elStatusTexto.textContent  = `${alugadosNoDom} jogo${alugadosNoDom !== 1 ? 's' : ''} alugado${alugadosNoDom !== 1 ? 's' : ''}`;

  // Log no console para fins de desenvolvimento
  console.log(`[AluGames] Total: ${totalCards} | Alugados: ${alugadosNoDom} | Disponíveis: ${disponiveis}`);
}


/**
 * exibirToast(mensagem, tipo)
 * ----------------------------
 * Exibe uma notificação temporária na parte inferior da tela.
 * Desaparece automaticamente após 3 segundos.
 *
 * @param {string} mensagem — Texto a exibir.
 * @param {string} tipo     — 'success' (verde) ou 'info' (azul).
 *
 * O que é um toast?
 * É um padrão de UI/UX: uma mensagem rápida que aparece e some,
 * sem interromper o usuário (diferente do alert/confirm).
 */
function exibirToast(mensagem, tipo = 'info') {
  const toast = document.getElementById('toast');
  if (!toast) return;

  // Define o texto e a classe de cor
  toast.textContent = mensagem;
  toast.className   = `toast toast--${tipo} toast--visible`;

  /**
   * setTimeout(função, milissegundos)
   * ------------------------------------
   * Executa a função passada após o tempo definido (em ms).
   * 3000ms = 3 segundos.
   *
   * Por que usar isso aqui?
   * Precisamos que o toast desapareça sozinho. setTimeout agenda isso
   * sem travar o restante do código (é assíncrono).
   *
   * Como funciona internamente:
   * O JavaScript coloca a função numa fila. Enquanto isso, o resto
   * do código continua rodando. Após 3s, a função é executada.
   */
  setTimeout(() => {
    /**
     * A Arrow Function (() => { ... }) é passada como argumento para setTimeout.
     * É executada após 3000ms.
     * Aqui ela remove a classe --visible, fazendo o toast sumir com animação CSS.
     */
    toast.classList.remove('toast--visible');
  }, 3000);
}


/**
 * ordenarNumeros(a, b, c)
 * ------------------------
 * Recebe três números e os exibe ordenados do menor ao maior.
 * Função utilitária mantida do código original.
 *
 * @param {number} a, b, c — Três números quaisquer.
 */
function ordenarNumeros(a, b, c) {
  /**
   * [a, b, c] — Cria um array com os três valores.
   * .sort((x, y) => x - y) — Ordena numericamente de forma crescente.
   *
   * Como o sort funciona com a função comparadora?
   * O array chama a função com dois elementos por vez (x e y).
   * Se o resultado for negativo → x vem antes de y.
   * Se o resultado for positivo → y vem antes de x.
   * Se for zero → posição inalterada.
   * Então (x - y) sempre garante ordem crescente.
   *
   * .join(', ') — Une os elementos do array em uma string, separados por ", ".
   * Exemplo: [1, 3, 5].join(', ') → "1, 3, 5"
   */
  const numerosOrdenados = [a, b, c].sort((x, y) => x - y);
  console.log(`[AluGames] Números ordenados: ${numerosOrdenados.join(', ')}`);
}


// =============================================================================
// INICIALIZAÇÃO — EXECUÇÃO AO CARREGAR A PÁGINA
// =============================================================================

/**
 * document.addEventListener('DOMContentLoaded', callback)
 * ---------------------------------------------------------
 * `addEventListener` registra um "ouvinte de evento": uma função que será
 * chamada quando o evento especificado acontecer.
 *
 * Eventos são coisas que acontecem: clique, tecla pressionada, página carregada.
 *
 * 'DOMContentLoaded' → evento que dispara quando o HTML foi lido e transformado
 * em objetos pelo navegador, mas antes de imagens e fontes carregarem.
 *
 * Por que usar isso em vez de colocar o código diretamente?
 * Se o código tentar acessar um elemento antes que o HTML esteja pronto,
 * getElementById retorna null e gera erros. O DOMContentLoaded garante que
 * o HTML já existe quando o código roda.
 *
 * A função callback aqui é uma Arrow Function: () => { ... }
 * Arrow Functions são uma forma moderna e concisa de escrever funções em JS.
 */
document.addEventListener('DOMContentLoaded', () => {

  // Conta quantos jogos já estão marcados como alugados no HTML inicial
  atualizarContadores();

  // Demonstração da função de ordenação (pode ser removida em produção)
  ordenarNumeros(3, 1, 5);

  console.log('[AluGames] Aplicação iniciada com sucesso.');
});
