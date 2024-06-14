let btnExibirCadastro = document.querySelector('#exibir-cadastro-despesa')
let btnExibirDespesas = document.querySelector('#exibir-despesas')
let divCadastro = document.querySelector('#cadastrar-despesas')
let divDespesas= document.querySelector('#despesas-frente')
let divMenu= document.querySelector('#menu-despesas')

btnExibirCadastro.addEventListener('click', function (event) {
    divCadastro.style.display = 'flex'
    divMenu.style.display = 'none'
})

btnExibirDespesas.addEventListener('click', function (event) {
    divMenu.style.display = 'none'
    divDespesas.style.display = 'flex'
})