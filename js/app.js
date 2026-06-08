function alterarStatus(id) {
    let gameClicado = document.getElementById( `game-${ id }` );
    let imagem = gameClicado.querySelector( '.dashboard__item__img' );
    let botao = gameClicado.querySelector( '.dashboard__item__button' );

    if ( imagem?.classList.contains( 'dashboard__item__img--rented' ) ){

        let confirmar = confirm( 'Tem certeza que deseja devolver este jogo?' );


        if ( confirmar ) {
            imagem.classList.remove( 'dashboard__item__img--rented' );
            botao.classList.remove( 'dashboard__item__button--return' );
            botao.textContent = 'Alugar';
        }

    } else {
        imagem.classList.add( 'dashboard__item__img--rented' );
        botao.classList.add( 'dashboard__item__button--return' );
        botao.textContent = 'Devolver';
    }
}
