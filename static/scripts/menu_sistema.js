let iconMenu = document.querySelector('.menu-hamburguer')
let header = document.querySelector('header')

iconMenu.addEventListener('click', function (event) {
    iconMenu.classList.toggle('menu-ativo')
    header.classList.toggle('menu-aberto')
})