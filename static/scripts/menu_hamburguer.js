let iconMenu = document.querySelector('.menu-hamburguer')
let menu = document.querySelector('.menu-mobile')

iconMenu.addEventListener('click', function (event) {
    iconMenu.classList.toggle('menu-ativo')
    menu.classList.toggle('hidden')

    if (iconMenu.classList.contains('menu-ativo')) {
        document.body.classList.add('no-scroll')
    } else {
        document.body.classList.remove('no-scroll')
    }
})

// Função para verificar se é um dispositivo móvel
function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
}

// Função para redirecionar para a página especificada
/* function redirecionar(url) {
    if(isMobile()) {
        setTimeout(function() {
            window.location.href = url
        }, 500)
    }
    else {
        setTimeout(function() {
            window.open(url, '_blank')
        }, 800)
    }
} */


// Função para redirecionar para a página especificada com delay
function delayRedirection(event, target) {
    event.preventDefault(); // Evita o comportamento padrão do link
    var url = target.getAttribute('href')

    if(isMobile()) {
        setTimeout(function() {
            window.location.href = url
        }, 500)
    }
    else {
        setTimeout(function() {
            window.location.href = url // Redireciona para o URL após o tempo de atraso
        }, 0)
    }
}