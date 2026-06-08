function alterarStatus(id) {
    let botoes = document.querySelectorAll( '.dashboard__item__button' );
    let botao = botoes[ id - 1 ];

    if ( botao.textContent === 'Alugar' ){
        botao.textContent = 'Devolver';
        botao.classList.add( 'dashboard__item__button--return' );
    } else {
        botao.textContent = 'Alugar';
        botao.classList.remove( 'dashboard__item__button--return' );
    }
}
