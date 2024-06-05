let iconMenu = document.querySelector('.menu-hamburguer')
let menu = document.querySelector('.menu-mobile')

iconMenu.addEventListener('click', function (event) {
    iconMenu.classList.toggle('menu-ativo')
    menu.classList.toggle('hidden')

    if (iconMenu.classList.contains('menu-ativo')) {
        document.body.classList.add('no-scroll');
    } else {
        document.body.classList.remove('no-scroll');
    }
})

// Função para verificar se é um dispositivo móvel
function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Função para redirecionar para a página especificada
function redirecionar(pagina) {
    if(isMobile()) {
        setTimeout(function() {
            /* window.open(pagina, '_blank'); */
            window.location.href = pagina;
        }, 500)
    }
    else {
        setTimeout(function() {
            window.open(pagina, '_blank');
        }, 800)
    }
}