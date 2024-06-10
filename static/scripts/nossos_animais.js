let tituloPrincipal = document.querySelector('#titulo-principal')
let divAnimais = document.querySelector('.animais')
let main = document.querySelector('main')

let swiper = new Swiper('.swiperVida', {
    slidesPerView: 1,
    loop: true,
    grabCursor: true,

    autoplay: {
       delay: 6000, // tempo de espera
       disableOnInteraction: false, // permite que o autoplay continue mesmo se o usuário interagir com o swiprt
    },

    pagination: {
        el: '.swiperVida .swiper-pagination',
        clickable: true,
    },
  
    navigation: {
       nextEl: '.swiperVida .swiper-button-next',
       prevEl: '.swiperVida .swiper-button-prev',
    },
})



function mostrarAnimal(id) {
    // Esconder todos os animais
    document.querySelectorAll('div[id^="animal"]').forEach(div => {
        div.style.display = 'none';
    });

    divAnimais.style.display = 'none';
    tituloPrincipal.style.display = 'none';
    
    // Exibir o animal selecionado
    document.getElementById(id).style.display = 'flex';
    
    // Atualizar a parte de hash da URL
    window.location.hash = id;

    // Ajustar os paddings da main após exibir o animal selecionado
    main.style.paddingTop = '4em';
    main.style.paddingBottom = '0';

    if(ehMobile()) {
        main.style.paddingTop = '3em';
        main.style.paddingBottom = '0';
    }
}

// Função para verificar se é um dispositivo móvel
function ehMobile() {
    return window.innerWidth <= 1025;
}

window.onload = function() {
    // Verificar se há um hash na URL ao carregar a página
    if (window.location.hash) {
        // Extrair o ID do animal do hash e exibi-lo
        var animalId = window.location.hash.substring(1);
        mostrarAnimal(animalId);

        if(ehMobile()) {
            main.style.paddingTop = '3em'
            main.style.paddingBottom = '0'
        }
        else {
            // Configurar os paddings da main
            main.style.paddingTop = '4em';
            main.style.paddingBottom = '0';
        }
    }
    else {
        divAnimais.style.display = 'grid';
        tituloPrincipal.style.display = 'block';
        main.style.paddingTop = '7em'
        main.style.paddingBottom = '4em'
    }
};


function limparHash() {
    history.replaceState({}, document.title, window.location.pathname + window.location.search);
}

function voltarParaPaginaNormal() {
    limparHash();
    divAnimais.style.display = 'grid';
    tituloPrincipal.style.display = 'block';
    main.style.paddingTop = '7em';
    main.style.paddingBottom = '4em';

    // Esconder todos os animais novamente
    document.querySelectorAll('div[id^="animal"]').forEach(div => {
        div.style.display = 'none';
    });
}