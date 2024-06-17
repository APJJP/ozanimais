let btnExibirCadastro = document.querySelector('#exibir-cadastro-despesa')
let btnExibirDespesas = document.querySelector('#exibir-despesas')
let divCadastro = document.querySelector('#cadastrar-despesa')
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

function resetarLayout() {
    divCadastro.style.display = 'none'
    divDespesas.style.display = 'none'
    divMenu.style.display = 'flex'
}

document.addEventListener('DOMContentLoaded', function() {
    const formCadastro = document.getElementById('form-cadastrar-despesa')
    formCadastro.addEventListener('submit', function(event) {
        event.preventDefault()
        const formData = new FormData(formCadastro)
        fetch('/cadastrar_despesa', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert(data.message)
                formCadastro.reset()
                atualizarListaDespesas()
            } else {
                alert('Erro ao cadastrar despesa: ' + data.message)
            }
        })
        .catch(error => console.error('Erro:', error))
    })

    document.addEventListener('submit', function(event) {
        if (event.target.matches('form[action="/excluir_despesa"]')) {
            event.preventDefault()
            const formData = new FormData(event.target)
            fetch('/excluir_despesa', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert(data.message)
                    atualizarListaDespesas()
                } else {
                    alert('Erro ao excluir despesa: ' + data.message)
                }
            })
            .catch(error => console.error('Erro:', error))
        }
    })

    function atualizarListaDespesas() {
        fetch('/despesas_json')
        .then(response => response.json())
        .then(despesas => {
            const despesasFundo = document.getElementById('despesas-fundo')
            despesasFundo.innerHTML = ''
            if (despesas.length > 0) {
                despesas.forEach(despesa => {
                    const form = document.createElement('form')
                    form.action = '/excluir_despesa'
                    form.method = 'post'
                    form.id = 'dados-despesa'

                    const h3 = document.createElement('h3')
                    h3.textContent = despesa.nome_despesa

                    const ul = document.createElement('ul')
                    ul.id = 'lista'

                    const inputId = document.createElement('input')
                    inputId.type = 'hidden'
                    inputId.name = 'idDespesa'
                    inputId.value = despesa.id_despesa

                    const inputNome = document.createElement('input')
                    inputNome.type = 'hidden'
                    inputNome.name = 'nome'
                    inputNome.value = despesa.nome_despesa

                    const liData = document.createElement('li')
                    liData.innerHTML = `<strong>Data:</strong> ${formatarData(despesa.data_despesa)}`


                    const liValor = document.createElement('li')
                    liValor.innerHTML = `<strong>Valor:</strong> ${formatarValor(despesa.valor_despesa)}`

                    const liDescricao = document.createElement('li')
                    liDescricao.innerHTML = `<strong>Descrição:</strong> ${despesa.descricao_despesa}`

                    ul.appendChild(inputId)
                    ul.appendChild(inputNome)
                    ul.appendChild(liData)
                    ul.appendChild(liValor)
                    ul.appendChild(liDescricao)

                    const button = document.createElement('button')
                    button.type = 'submit'
                    button.id = 'excluir'
                    button.innerHTML = '<span>Excluir</span>'

                    form.appendChild(h3)
                    form.appendChild(ul)
                    form.appendChild(button)

                    despesasFundo.appendChild(form)
                })
            } else {
                despesasFundo.innerHTML = '<p>Ainda não há despesas cadastradas.</p>'
            }

            /* // Conta o número de elementos filhos (formulários de despesa)
            const numDespesas = despesasFundo.children.length
            
            // Determina o número de colunas com base no número de despesas
            let numColunas = 1
            if (numDespesas >= 2) {
                numColunas = 2
            }
            if (numDespesas >= 3) {
                numColunas = 3
            }

            // Aplica o estilo CSS dinamicamente apenas para desktops
            if (window.innerWidth > 1024) {
                despesasFundo.style.gridTemplateColumns = `repeat(${numColunas}, 1fr)`
            } */

            // Conta o número de elementos filhos (formulários de despesa)
            const numDespesas = despesasFundo.children.length

            let numColunas = 1

            if (window.innerWidth >= 800 && window.innerWidth <= 1024) {
                if (numDespesas >= 2) {
                    numColunas = 2
                }
                despesasFundo.style.gridTemplateColumns = `repeat(${numColunas}, 1fr)`
            }
            else if (window.innerWidth > 1024) {
                if (numDespesas >= 2) {
                    numColunas = 2
                }
                if (numDespesas >= 3) {
                    numColunas = 3
                }
                despesasFundo.style.gridTemplateColumns = `repeat(${numColunas}, 1fr)`
            }
        })
        .catch(error => console.error('Erro:', error))
    }

    function formatarData(data) {
        if (!data) {
            return 'não informada'
        }
        const date = new Date(data)
        const dia = String(date.getDate()).padStart(2, '0')
        const mes = String(date.getMonth() + 1).padStart(2, '0')
        const ano = date.getFullYear()
        return `${dia}/${mes}/${ano}`
    }

    function formatarValor(valor) {
        return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
    }

    // Chama a função para carregar a lista de despesas quando a página é carregada
    atualizarListaDespesas()
})
