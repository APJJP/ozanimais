let titulo = document.querySelector('#titulo')
let subtitulo = document.querySelector('#subtitulo')
let btnAvancar = document.querySelector('#btn-avancar')
let textoBtnAvancar = document.querySelector('#texto_botao')
let divInput = document.querySelector('.input')
let divAutenticacao = document.querySelector('.autenticacao')
let divNovaSenha = document.querySelector('.nova-senha')
let divRespostaSenha = document.querySelector('.resposta-senha')
let divTitulo = document.querySelector('#redefinicao-senha .topo')
let email = 'contact@dscode...com'
let btnVoltar = document.querySelector('#btn-voltar')

// Adiciona um listener de evento para o botão de voltar, permitindo retornar ao passo anterior do processo de redefinição de senha
btnVoltar.addEventListener('click', function (event) {
    if(textoBtnAvancar.innerText === 'Receber código') {
        setTimeout(function() {
            window.location.href = '/area_restrita'
        }, 10)  
    }

    if(textoBtnAvancar.innerText === 'Verificar código') {
        divAutenticacao.classList.toggle('off') // fica off
        divInput.classList.toggle('off') // fica on

        titulo.innerText = 'Esqueceu a senha?'
        subtitulo.innerHTML = `Por favor, informe o seu email para receber um código e redefinir a sua senha.`

        setTimeout(function() {
            textoBtnAvancar.innerText = 'Receber código'
        }, 10)
    }

    if(textoBtnAvancar.innerText === 'Alterar senha') {
        divNovaSenha.classList.toggle('off') // fica off
        divAutenticacao.classList.toggle('off') // fica on

        titulo.innerText = 'Verifique seu email'
        subtitulo.innerHTML = `Enviamos um email de redefinição para <strong>${email}</strong>. Insira o código de 5 dígitos mencionado no email.`

        setTimeout(function() {
            textoBtnAvancar.innerText = 'Verificar código'
        }, 10)
    }
})

// Adiciona um listener de evento para o botão de avançar, permitindo avançar no processo de redefinição de senha
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