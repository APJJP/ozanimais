let form = document.querySelector('#cadastro-assinante')
let btnEntrar = document.querySelector('#entrar')
let inputEmail = document.querySelector('#nome_usuario')
let inputSenha = document.querySelector('#senha')

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

btnEntrar.addEventListener('click', function (event) {
    event.preventDefault();

    // Obtenha os valores do formulário
    let email = inputEmail.value;
    let senha = inputSenha.value;

    // Envie a solicitação POST para entrar_usuario
    fetch('/entrar_usuario', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email_usuario: email,
            senha_usuario: senha
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.autenticado) {
            // Se autenticado, redirecione para a página home_sistema
            window.location.href = '/home_sistema';
        } else {
            // Se não autenticado, exiba uma mensagem de erro
            alert('Email ou senha inválidos. Por favor, tente novamente.');
        }
    })
    .catch(error => {
        console.error('Erro:', error);
        // Em caso de erro, exiba uma mensagem genérica
        alert('Ocorreu um erro ao tentar entrar. Por favor, tente novamente.');
    });

    form.submit()
})