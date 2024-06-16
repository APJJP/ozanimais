let btnExibirCadastro = document.querySelector('#exibir-cadastro-dog')
let btnExibirCachorros = document.querySelector('#exibir-dogs')
let divCadastro = document.querySelector('#cadastrar-cachorros')
let divCachorros= document.querySelector('#cachorro-frente')
let divMenu= document.querySelector('#menu-cachorro')

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

btnExibirCachorros.addEventListener('click', function (event) {
    divMenu.style.display = 'none'
    divCachorros.style.display = 'flex'
})

function resetarLayout() {
    divCadastro.style.display = 'none'
    divCachorros.style.display = 'none'
    divMenu.style.display = 'flex'
}

document.addEventListener('DOMContentLoaded', function() {
    const formCadastro = document.getElementById('form-cadastrar-dog')
    formCadastro.addEventListener('submit', function(event) {
        event.preventDefault()
        const formData = new FormData(formCadastro)
        fetch('/cadastrar_cachorro', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert(data.message)
                formCadastro.reset()
                atualizarListaCachorros()
            } else {
                alert('Erro ao cadastrar cachorro: ' + data.message)
            }
        })
        .catch(error => console.error('Erro:', error))
    })

    document.addEventListener('submit', function(event) {
        if (event.target.matches('form[action="/excluir_cachorro"]')) {
            event.preventDefault()
            const formData = new FormData(event.target)
            fetch('/excluir_cachorro', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert(data.message)
                    atualizarListaCachorros()
                } else {
                    alert('Erro ao excluir cachorro: ' + data.message)
                }
            })
            .catch(error => console.error('Erro:', error))
        }
    })

    function atualizarListaCachorros() {
        fetch('/cachorros_json')
        .then(response => response.json())
        .then(cachorros => {
            const cachorroFundo = document.getElementById('cachorro-fundo')
            cachorroFundo.innerHTML = ''
            if (cachorros.length > 0) {
                cachorros.forEach(cachorro => {
                    const form = document.createElement('form')
                    form.action = '/excluir_cachorro'
                    form.method = 'post'
                    form.id = 'dados-cachorro'

                    const h3 = document.createElement('h3')
                    h3.textContent = cachorro.nome_cachorro

                    const ul = document.createElement('ul')
                    ul.id = 'lista'

                    const inputId = document.createElement('input')
                    inputId.type = 'hidden'
                    inputId.name = 'idCachorro'
                    inputId.value = cachorro.id_cachorro

                    const inputNome = document.createElement('input')
                    inputNome.type = 'hidden'
                    inputNome.name = 'nome'
                    inputNome.value = cachorro.nome_cachorro

                    const liSexo = document.createElement('li')
                    liSexo.innerHTML = `<strong>Sexo:</strong> ${cachorro.sexo_cachorro}`

                    const liRaca = document.createElement('li')
                    liRaca.innerHTML = `<strong>Raça:</strong> ${cachorro.raca_cachorro}`

                    const liDescricao = document.createElement('li')
                    liDescricao.innerHTML = `<strong>Descrição:</strong> ${cachorro.descricao_cachorro}`

                    ul.appendChild(inputId)
                    ul.appendChild(inputNome)
                    ul.appendChild(liSexo)
                    ul.appendChild(liRaca)
                    ul.appendChild(liDescricao)

                    const button = document.createElement('button')
                    button.type = 'submit'
                    button.id = 'excluir'
                    button.innerHTML = '<span>Excluir</span>'

                    form.appendChild(h3)
                    form.appendChild(ul)
                    form.appendChild(button)

                    cachorroFundo.appendChild(form)
                })
            } else {
                cachorroFundo.innerHTML = '<p>Ainda não há cachorros cadastrados.</p>'
            }
        })
        .catch(error => console.error('Erro:', error))
    }

    // Chama a função para carregar a lista de cachorros quando a página é carregada
    atualizarListaCachorros()
})