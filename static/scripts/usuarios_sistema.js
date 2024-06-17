let btnExibirCadastro = document.querySelector('#exibir-cadastro-usuario')
let btnExibirUsuarios = document.querySelector('#exibir-usuarios')
let divCadastro = document.querySelector('#cadastrar-usuario')
let divUsuarios= document.querySelector('#usuarios-frente')
let divMenu= document.querySelector('#menu-usuario')



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

btnExibirUsuarios.addEventListener('click', function (event) {
    divMenu.style.display = 'none'
    divUsuarios.style.display = 'flex'
})

function resetarLayout() {
    divCadastro.style.display = 'none'
    divUsuarios.style.display = 'none'
    divMenu.style.display = 'flex'
}


/* document.addEventListener('DOMContentLoaded', function() {
    const formCadastro = document.getElementById('form-cadastrar-usuario')
    formCadastro.addEventListener('submit', function(event) {
        event.preventDefault()
        const formData = new FormData(formCadastro)
        fetch('/cadastrar_usuario', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert(data.message)
                formCadastro.reset()
                atualizarListaUsuarios()
            } else {
                alert('Erro ao cadastrar usuario: ' + data.message)
            }
        })
        .catch(error => console.error('Erro:', error))
    })

    document.addEventListener('submit', function(event) {
        if (event.target.matches('form[action="/excluir_usuario"]')) {
            event.preventDefault()
            const formData = new FormData(event.target)
            fetch('/excluir_usuario', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert(data.message)
                    atualizarListaUsuarios()
                } else {
                    alert('Erro ao excluir usuario: ' + data.message)
                }
            })
            .catch(error => console.error('Erro:', error))
        }
    })

    function atualizarListaUsuarios() {
        fetch('/usuarios_json')
        .then(response => response.json())
        .then(usuarios => {
            const usuarioFundo = document.getElementById('usuarios-fundo')
            usuarioFundo.innerHTML = ''
            if (usuarios.length > 0) {
                usuarios.forEach(usuario => {
                    const form = document.createElement('form')
                    form.action = '/excluir_usuario'
                    form.method = 'post'
                    form.id = 'dados-usuario'

                    const h3 = document.createElement('h3')
                    h3.textContent = usuario.nome_administrador

                    const ul = document.createElement('ul')
                    ul.id = 'lista'

                    const inputId = document.createElement('input')
                    inputId.type = 'hidden'
                    inputId.name = 'idUsuario'
                    inputId.value = usuario.id_administrador

                    const inputNome = document.createElement('input')
                    inputNome.type = 'hidden'
                    inputNome.name = 'nome'
                    inputNome.value = usuario.nome_administrador

                    const liEmail = document.createElement('li')
                    liEmail.innerHTML = `<strong>Sexo:</strong> ${usuario.sexo_administrador}`

                    ul.appendChild(liEmail)

                    const button = document.createElement('button')
                    button.type = 'submit'
                    button.id = 'excluir'
                    button.innerHTML = '<span>Excluir</span>'

                    form.appendChild(h3)
                    form.appendChild(ul)
                    form.appendChild(button)

                    usuarioFundo.appendChild(form)
                })
            } else {
                usuarioFundo.innerHTML = '<p>Ainda não há usuarios cadastrados.</p>'
            }

            // Conta o número de elementos filhos (formulários de usuario)
            const numUsuarios = usuarioFundo.children.length

            let numColunas = 1

            if (window.innerWidth >= 800 && window.innerWidth <= 1024) {
                if (numUsuarios >= 2) {
                    numColunas = 2
                }
                usuarioFundo.style.gridTemplateColumns = `repeat(${numColunas}, 1fr)`
            }
            else if (window.innerWidth > 1024) {
                if (numUsuarios >= 2) {
                    numColunas = 2
                }
                if (numUsuarios >= 3) {
                    numColunas = 3
                }
                usuarioFundo.style.gridTemplateColumns = `repeat(${numColunas}, 1fr)`
            }
        })
        .catch(error => console.error('Erro:', error))
    }

    // Chama a função para carregar a lista de usuarios quando a página é carregada
    atualizarListaUsuarios()
}) */