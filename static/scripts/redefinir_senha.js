let titulo = document.querySelector('#titulo')
let subtitulo = document.querySelector('#subtitulo')
let btnAvancar = document.querySelector('#avancar')
let textoBtnAvancar = document.querySelector('#texto_botao')
let divInput = document.querySelector('.input')
let divAutenticacao = document.querySelector('.autenticacao')
let divNovaSenha = document.querySelector('.nova-senha')
let divRespostaSenha = document.querySelector('.resposta-senha')
let divTitulo = document.querySelector('#redefinicao-senha .topo')
let email = 'contact@dscode...com'

btnAvancar.addEventListener('click', function (event) {
    event.preventDefault()

    if(textoBtnAvancar.innerText === 'Receber código') {
        divInput.classList.toggle('off')
        divAutenticacao.classList.toggle('off')

        titulo.innerText = 'Verifique seu email'
        subtitulo.innerHTML = `Enviamos um email de redefinição para <strong>${email}</strong>. Insira o código de 5 dígitos mencionado no email.`

        setTimeout(function() {
            textoBtnAvancar.innerText = 'Verificar código'
        }, 10)        
    }

    if(textoBtnAvancar.innerText === 'Verificar código') {
        divAutenticacao.classList.toggle('off')
        divNovaSenha.classList.toggle('off')

        titulo.innerText = 'Defina uma nova senha'
        subtitulo.innerHTML = 'Crie uma nova senha. Certifique-se de que seja diferente de anteriores para segurança.'

        setTimeout(function() {
            textoBtnAvancar.innerText = 'Alterar senha'
        }, 10) 
    }

    if(textoBtnAvancar.innerText === 'Alterar senha') {
        divNovaSenha.classList.toggle('off')
        divRespostaSenha.classList.toggle('off')

        titulo.innerText = ''
        subtitulo.innerHTML = ''

        divTitulo.classList.toggle('off')

        setTimeout(function() {
            textoBtnAvancar.innerText = 'Voltar para login'
            textoBtnAvancar.href = '/area_restrita'
        }, 10)
    }

    if(textoBtnAvancar.innerText === 'Voltar para login') {
        window.location.href = '/area_restrita'
    }
})