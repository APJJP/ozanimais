let form = document.querySelector('.doacao')
let inputValorDoacao = document.querySelector('#valor_doacao')
let msgErroValor = document.querySelector('.erro-valor')
let btnDoar = document.querySelector('#doar')
let opcaoPix = document.querySelector("#pix")
let divPagamentoPix = document.querySelector(".pix-pagamento")
let valorAPagar = document.querySelector("#valor-total")
let codigoPix = document.querySelector('#codigo-pix')
let btnCopiar = document.querySelector('#copiar-pix')

/* codigoPix.value = 'Teste de copiar texto' */


// Restringe a entrada para permitir apenas caracteres numéricos e vírgula removendo caracteres não numéricos e não vírgula
function permitirApenasNumerosEVirgula(char) {
    char.value = char.value.replace(/[^0-9,]/g, '')
}

form.addEventListener("input", (e) => {
    switch(e.target.id) {
        case 'valor_doacao':
            permitirApenasNumerosEVirgula(inputValorDoacao)
            inputValorDoacao.value = formatarValor(inputValorDoacao.value)
    }
})

// Função para formatar um número adicionando pontos como separador de milhares e preservando a formatação decimal
function formatarValor(number) {
    // Converte o número para string e divide em partes inteiras e decimais
    let partes = number.toString().split(",")
    let parteInteira = partes[0]
    let parteDecimal

    // Verifica se o número tem parte decimal
    if (partes.length > 1) {
        parteDecimal = "," + partes[1]
    } else {
        parteDecimal = ""
    }

    // Insere vírgulas como separador de milhares na parte inteira
    parteInteira = parteInteira.replace(/\B(?=(\d{3})+(?!\d))/g, ".")

    return parteInteira + parteDecimal
}

// Função para converter a string do valor para um número float
function stringParaFloat(valorString) {
    // Remove os pontos de milhar da string e substitui a vírgula por ponto
    var valorNumerico = valorString.replace(/\./g, "").replace(",", ".")
    // Converte a string para um número float
    return parseFloat(valorNumerico)
}


btnDoar.addEventListener('click', function (event) {
    event.preventDefault()

    if(inputValorDoacao.value !== '') {
        if(opcaoPix.checked) {
            form.classList.toggle('off')
            divPagamentoPix.classList.toggle('off')

            valorAPagar.innerText = `R$ ${inputValorDoacao.value}`
            
            /* gerarPix(inputValorDoacao.value) */
            codigoPix.value = 'Teste de copiar texto'
        }
    }
    else {
        msgErroValor.classList.toggle('off')
    }
})

btnCopiar.addEventListener('click', function (event) {
    let texto = codigoPix.value

    navigator.clipboard.writeText(texto)
        .then(() => {
            alert("Texto copiado para a área de transferência: " + texto)
        })
        .catch(err => {
            console.error('Falha ao copiar texto: ', err)
        })
})