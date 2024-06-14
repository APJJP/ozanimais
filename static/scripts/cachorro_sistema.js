let btnExibirCadastro = document.querySelector('#exibir-cadastro-dog')
let btnExibirCachorros = document.querySelector('#exibir-dogs')
let divCadastro = document.querySelector('#cadastrar-cachorros')
let divCachorros= document.querySelector('#cachorro-frente')
let divMenu= document.querySelector('#menu-cachorro')

btnExibirCadastro.addEventListener('click', function (event) {
    divCadastro.style.display = 'flex'
    divMenu.style.display = 'none'
})

btnExibirCachorros.addEventListener('click', function (event) {
    divMenu.style.display = 'none'
    divCachorros.style.display = 'flex'
})