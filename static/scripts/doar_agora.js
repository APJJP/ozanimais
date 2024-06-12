let form = document.querySelector('.doacao')
let divValorDoacao = document.querySelector('#valor')
let inputValorDoacao = document.querySelector('#valor_doacao')
/* let msgErroValor = document.querySelector('.erro-valor') */
let msgValorPixGeral = document.querySelector('#valor-pix-geral')
let btnDoar = document.querySelector('#doar')
let opcaoPix = document.querySelector("#pix")
let divPagamentoPix = document.querySelector(".pix-pagamento")
let valorAPagar = document.querySelector("#valor-total")
let codigoPix = document.querySelector('#codigo-pix')
let btnCopiar = document.querySelector('#copiar-pix')
let qrCodeArroz = document.querySelector('#qr-code-arroz')
let qrCodeGas = document.querySelector('#qr-code-gas')
let qrCodeRacao = document.querySelector('#qr-code-racao')
let qrCodeGeral = document.querySelector('#qr-code-geral')

/* codigoPix.value = 'Teste de copiar texto' */


/* // Restringe a entrada para permitir apenas caracteres numéricos e vírgula removendo caracteres não numéricos e não vírgula
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
} */


// Prosseguir para a tela do pagamento pix
btnDoar.addEventListener('click', function (event) {
    event.preventDefault()

    /* if(inputValorDoacao.value !== '') {
        if(opcaoPix.checked) {
            form.classList.toggle('off')
            divPagamentoPix.classList.toggle('off')

            valorAPagar.innerText = `R$ ${inputValorDoacao.value}`
            
            codigoPix.value = 'Teste de copiar texto'
        }
    }
    else {
        msgErroValor.classList.toggle('off')
    } */

    form.classList.toggle('off')
    divPagamentoPix.classList.toggle('off')

    if(window.location.hash) {
        valorAPagar.innerText = `R$ ${inputValorDoacao.value}`
        codigoPix.value = 'Teste de copiar texto'
    }
    else {
        valorAPagar.innerText = 'Indefinido'
        codigoPix.value = 'Teste de copiar texto'
    }
})

// Copiar Pix Copia e Cola para a área de transferência
btnCopiar.addEventListener('click', function (event) {
    let texto = codigoPix.value

    navigator.clipboard.writeText(texto)
        .then(() => {
            alert("Pix Copia e Cola copiado para a área de transferência: " + texto)
        })
        .catch(err => {
            console.error('Falha ao copiar Pix Copia e Cola: ', err)
        })
})

// Verificar se há um hash na URL ao carregar a página
window.onload = function() {
    if (window.location.hash) {
        // Exibir o input com o valor do item que o usuário escolheu e ocultar a mensagem do pix de qualquer valor
        msgValorPixGeral.style.display = 'none'
        divValorDoacao.style.display = 'flex'

        // Extrair o ID do tipo de Pix do hash e exibi-lo
        let tipoPix = window.location.hash.substring(1)
        mostrarPix(tipoPix)
    }
    else {
        // Exibir a mensagem do pix de qualquer valor e ocultar o input que exibe o valor de um item escolhido pelo usuário
        msgValorPixGeral.style.display = 'block'
        divValorDoacao.style.display = 'none'

        // Exibir o QR Code do pix de qualquer valor e esconder os outros
        qrCodeGeral.style.display = 'block'
        qrCodeArroz.style.display = 'none'
        qrCodeGas.style.display = 'none'
        qrCodeRacao.style.display = 'none'
    }
}

// Função para definir o valor de doação e o QR Code com base no tipo de PIX
function mostrarPix(tipoPix) {
    if (tipoPix === 'doar_arroz') {
        inputValorDoacao.value = '35,00'
        qrCodeGeral.style.display = 'none'
        qrCodeArroz.style.display = 'block'
        qrCodeGas.style.display = 'none'
        qrCodeRacao.style.display = 'none'
    }
    else if(tipoPix === 'doar_gas')  {
        inputValorDoacao.value = '78,90'
        qrCodeGeral.style.display = 'none'
        qrCodeArroz.style.display = 'none'
        qrCodeGas.style.display = 'block'
        qrCodeRacao.style.display = 'none'
    }
    else {
        inputValorDoacao.value = '130,00'
        qrCodeGeral.style.display = 'none'
        qrCodeArroz.style.display = 'none'
        qrCodeGas.style.display = 'none'
        qrCodeRacao.style.display = 'block'
    }
}