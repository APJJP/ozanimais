let btnExibirCadastro = document.querySelector('#exibir-cadastro-assinante')
let btnExibirAssinantes = document.querySelector('#exibir-assinantes')
let divCadastro = document.querySelector('#cadastrar-assinante')
let divAssinantes= document.querySelector('#assinantes-frente')
let divMenu= document.querySelector('#menu-assinante')



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

btnExibirAssinantes.addEventListener('click', function (event) {
    divMenu.style.display = 'none'
    divAssinantes.style.display = 'flex'
})

function resetarLayout() {
    divCadastro.style.display = 'none'
    divAssinantes.style.display = 'none'
    divMenu.style.display = 'flex'
}


 document.addEventListener('DOMContentLoaded', function() {
    const formCadastro = document.getElementById('form-cadastrar-assinante')
    formCadastro.addEventListener('submit', function(event) {
        event.preventDefault()
        const formData = new FormData(formCadastro)
        fetch('/cadastrar_assinante_restrito', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert(data.message)
                formCadastro.reset()
                atualizarListaAssinantes()
            } else {
                alert('Erro ao cadastrar assinante: ' + data.message)
            }
        })
        .catch(error => console.error('Erro:', error))
    })

    document.addEventListener('submit', function(event) {
        if (event.target.matches('form[action="/excluir_assinante"]')) {
            event.preventDefault()
            const formData = new FormData(event.target)
            fetch('/excluir_assinante', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert(data.message)
                    atualizarListaAssinantes()
                } else {
                    alert('Erro ao excluir assinante: ' + data.message)
                }
            })
            .catch(error => console.error('Erro:', error))
        }
    })

    function atualizarListaAssinantes() {
        fetch('/assinantes_json')
        .then(response => response.json())
        .then(assinantes => {
            const assinanteFundo = document.getElementById('assinantes-fundo')
            assinanteFundo.innerHTML = ''
            if (assinantes.length > 0) {
                assinantes.forEach(assinante => {
                    const form = document.createElement('form')
                    form.action = '/excluir_assinante'
                    form.method = 'post'
                    form.id = 'dados-assinante'

                    const h3 = document.createElement('h3')
                    h3.textContent = assinante.nome_assinante

                    const ul = document.createElement('ul')
                    ul.id = 'lista'

                    const inputId = document.createElement('input')
                    inputId.type = 'hidden'
                    inputId.name = 'idAssinante'
                    inputId.value = assinante.id_assinante

                    const inputNome = document.createElement('input')
                    inputNome.type = 'hidden'
                    inputNome.name = 'nome'
                    inputNome.value = assinante.nome_assinante

                    const liEmail = document.createElement('li')
                    liEmail.innerHTML = `<strong>Email:</strong> ${assinante.email_assinante}`

                  

                    ul.appendChild(liEmail)

                    const button = document.createElement('button')
                    button.type = 'submit'
                    button.id = 'excluir'
                    button.innerHTML = '<span>Excluir</span>'

                    form.appendChild(h3)
                    form.appendChild(ul)
                    form.appendChild(inputId) 
                    form.appendChild(inputNome)
                    form.appendChild(button)
                    
                    assinanteFundo.appendChild(form)
                })
            } else {
                assinanteFundo.innerHTML = '<p>Ainda não há assinantes cadastrados.</p>'
            }

            // Conta o número de elementos filhos (formulários de assinante)
            const numAssinantes = assinanteFundo.children.length

            let numColunas = 1

            if (window.innerWidth >= 800 && window.innerWidth <= 1024) {
                if (numAssinantes >= 2) {
                    numColunas = 2
                }
                assinanteFundo.style.gridTemplateColumns = `repeat(${numColunas}, 1fr)`
            }
            else if (window.innerWidth > 1024) {
                if (numAssinantes >= 2) {
                    numColunas = 2
                }
                if (numAssinantes >= 3) {
                    numColunas = 3
                }
                assinanteFundo.style.gridTemplateColumns = `repeat(${numColunas}, 1fr)`
            }
        })
        .catch(error => console.error('Erro:', error))
    }

    // Chama a função para carregar a lista de assinantes quando a página é carregada
    atualizarListaAssinantes()
}) 