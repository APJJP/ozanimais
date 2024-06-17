let btnExibirCadastro = document.querySelector('#exibir-cadastro-padrinho')
let btnExibirPadrinhos = document.querySelector('#exibir-padrinhos')
let divCadastro = document.querySelector('#cadastrar-padrinho')
let divPadrinhos= document.querySelector('#padrinhos-frente')
let divMenu= document.querySelector('#menu-padrinho')

let form = document.querySelector('#form-cadastrar-padrinho')
let inputNome = document.querySelector('#nome_padrinho')
let inputSobrenome = document.querySelector('#sobrenome_padrinho')
let inputEmail = document.querySelector('#email_padrinho')
let inputTelefone = document.querySelector('#telefone_padrinho')



// Função para verificar se é um dispositivo móvel
function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
}

// Função para redirecionar para a página especificada com delay
function delayRedirection(event, target) {
    event.preventDefault() // Evita o comportamento padrão do link
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



btnExibirCadastro.addEventListener('click', function (event) {
    divCadastro.style.display = 'flex'
    divMenu.style.display = 'none'
})

btnExibirPadrinhos.addEventListener('click', function (event) {
    divMenu.style.display = 'none'
    divPadrinhos.style.display = 'flex'
})

function resetarLayout() {
    divCadastro.style.display = 'none'
    divPadrinhos.style.display = 'none'
    divMenu.style.display = 'flex'
}



// Função para formatar nome e sobrenome
function formatarNome(input) {
    let string = input.value

    // Restringe a entrada para permitir apenas letras e espaço
    string = input.value.replace(/[^a-zA-Z\s]/g, '');

    // Remove os espaços em branco no início da string
    string = string.trimStart()
    input.value = string

    // Evita que o usuário digite mais de um espaço consecutivo
    string = string.replace(/\s{2,}/g, ' ')
    input.value = string

    // Capitaliza a primeira letra de cada palavra
    string = string.toLowerCase().replace(/(?:^|\s)\S/g, function (a) { return a.toUpperCase() })
    input.value = string
}

// Restringe a entrada para não permitir qualquer espaços em branco
function impedirEspaco(input) {
    input.value = input.value.replace(/\s/g, '')
}

// Aplica uma máscara para formatar o número de telefone no formato (00) 0000-0000
$(document).ready(function () {
    $('#telefone_padrinho').mask('(00) 00000-0000')
})

form.addEventListener("input", (e) => {
    switch (e.target.id) {
        case 'nome_padrinho':
            formatarNome(inputNome)
            break
        case 'sobrenome_padrinho':
            formatarNome(inputSobrenome)
            break
        case 'email_padrinho':
            impedirEspaco(inputEmail)
            break
    }
})


document.addEventListener('DOMContentLoaded', function() {
    const formCadastro = document.getElementById('form-cadastrar-padrinho')
    formCadastro.addEventListener('submit', function(event) {
        event.preventDefault()
        const formData = new FormData(formCadastro)
        fetch('/cadastrar_padrinho_restrito', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert(data.message)
                formCadastro.reset()
                atualizarListaPadrinhos()
            } else {
                alert('Erro ao cadastrar padrinho: ' + data.message)
            }
        })
        .catch(error => console.error('Erro:', error))
    })

    document.addEventListener('submit', function(event) {
        if (event.target.matches('form[action="/excluir_padrinho"]')) {
            event.preventDefault()
            const formData = new FormData(event.target)
            fetch('/excluir_padrinho', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert(data.message)
                    atualizarListaPadrinhos()
                } else {
                    alert('Erro ao excluir padrinho: ' + data.message)
                }
            })
            .catch(error => console.error('Erro:', error))
        }
    })

    function atualizarListaPadrinhos() {
        fetch('/padrinhos_json')
        .then(response => response.json())
        .then(padrinhos => {
            const padrinhoFundo = document.getElementById('padrinhos-fundo')
            padrinhoFundo.innerHTML = ''
            if (padrinhos.length > 0) {
                padrinhos.forEach(padrinho => {
                    const form = document.createElement('form')
                    form.action = '/excluir_padrinho'
                    form.method = 'post'
                    form.id = 'dados-padrinho'

                    const h3 = document.createElement('h3')
                    h3.textContent = padrinho.nome_padrinho

                    const ul = document.createElement('ul')
                    ul.id = 'lista'

                    const inputId = document.createElement('input')
                    inputId.type = 'hidden'
                    inputId.name = 'idPadrinho'
                    inputId.value = padrinho.id_padrinho

                    const inputNome = document.createElement('input')
                    inputNome.type = 'hidden'
                    inputNome.name = 'nome'
                    inputNome.value = padrinho.nome_padrinho

                    const liSobrenome = document.createElement('li')
                    liSobrenome.innerHTML = `<strong>Sobrenome:</strong> ${padrinho.sobrenome_padrinho}`

                    const liTelefone = document.createElement('li')
                    liTelefone.innerHTML = `<strong>Telefone:</strong> ${padrinho.telefone_padrinho}`

                    const liEmail = document.createElement('li')
                    liEmail.innerHTML = `<strong>Email:</strong> ${padrinho.email_padrinho}`

                    ul.appendChild(inputId)
                    ul.appendChild(inputNome)
                    ul.appendChild(liSobrenome)
                    ul.appendChild(liTelefone)
                    ul.appendChild(liEmail)

                    const button = document.createElement('button')
                    button.type = 'submit'
                    button.id = 'excluir'
                    button.innerHTML = '<span>Excluir</span>'

                    form.appendChild(h3)
                    form.appendChild(ul)
                    form.appendChild(button)

                    padrinhoFundo.appendChild(form)
                })
            } else {
                padrinhoFundo.innerHTML = '<p>Ainda não há padrinhos cadastrados.</p>'
            }
        })
        .catch(error => console.error('Erro:', error))
    }

    // Chama a função para carregar a lista de padrinhos quando a página é carregada
    atualizarListaPadrinhos()
})