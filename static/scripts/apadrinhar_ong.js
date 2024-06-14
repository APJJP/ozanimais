let form = document.querySelector('#cadastro')
let btnCadastrar = document.querySelector('#cadastrar')

let inputNome = document.querySelector('#nome')
let inputSobrenome = document.querySelector('#sobrenome')
let inputEmail = document.querySelector('#email')
let inputTelefone = document.querySelector('#telefone')

let divNome = document.querySelector('.div-nome')
let divSobrenome = document.querySelector('.div-sobrenome')
let divEmail = document.querySelector('.div-email')
let divTelefone = document.querySelector('.div-telefone')

let msgErroNome = document.querySelector('.nome-invalido')
let msgErroSobrenome = document.querySelector('.sobrenome-invalido')
let msgErroEmail = document.querySelector('.email-invalido')
let msgErroTelefone = document.querySelector('.tel-invalido')
let msgErroDeclaracao = document.querySelector('.declaracao-unchecked')


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
    $('#telefone').mask('(00) 00000-0000')
})

form.addEventListener("input", (e) => {
    switch (e.target.id) {
        case 'nome':
            formatarNome(inputNome)
            break
        case 'sobrenome':
            formatarNome(inputSobrenome)
            break
        case 'email':
            impedirEspaco(inputEmail)
            break
    }
})


// Função para verificar se os campos de entrada 'nome' e 'sobrenome' estão preenchidos corretamente
function checarInput(inputAtual, msgErro, div) {
    let input = inputAtual.value
    let ehValido = false

    if (!input) {
        msgErro.innerHTML = "Preencha este campo."
        ehValido = false
    }
    else {
        msgErro.innerHTML = ""
        ehValido = true
    }

    if (!ehValido) {
        div.classList.add("input-invalido")
    }
    else {
        div.classList.remove("input-invalido")
    }
}

// Função para verificar se o campo de e-mail está preenchido corretamente
function checarEmail() {
    let email = inputEmail.value
    let ehValido = false

    if (!email) {
        msgErroEmail.innerHTML = "Preencha este campo."
        ehValido = false
    }
    else if (!validarEmail(email)) {
        msgErroEmail.innerHTML = "Insira um email válido."
        ehValido = false
    }
    else {
        msgErroEmail.innerHTML = ""
        ehValido = true
    }

    if (!ehValido) {
        divEmail.classList.add("input-invalido")
    }
    else {
        divEmail.classList.remove("input-invalido")
    }
}

// Função para verificar se o campo do telefone está preenchido corretamente
function checarTelefone() {
    let tel = inputTelefone.value
    let ehValido = false

    if (!tel) {
        msgErroTelefone.innerHTML = "Preencha este campo."
        ehValido = false
    }
    else if (tel.length !== 15) {
        msgErroTelefone.innerHTML = "Insira um número válido."
        ehValido = false
    }
    else {
        msgErroTelefone.innerHTML = ""
        ehValido = true
    }

    if (!ehValido) {
        divTelefone.classList.add("input-invalido")
    }
    else {
        divTelefone.classList.remove("input-invalido")
    }
}

// Função para verificar se o radio da declaração foi selecionado
/* function checarDeclaracao() {
    let radioDeclaracao = document.getElementById("radio-declaracao");
    let declaracaoDiv = document.querySelector(".declaracao");

    if (!radioDeclaracao.checked) {
        // O radio button está marcado
        msgErroDeclaracao.innerHTML = "Selecione este campo."
        declaracaoDiv.classList.add('unchecked');
        
    } else {
        msgErroDeclaracao.innerHTML = "A declaração é obrigatória."
        declaracaoDiv.classList.remove('unchecked');
    }
} */

function checarDeclaracao() {
    let radioDeclaracao = document.getElementById("radio-declaracao");
    let declaracaoDiv = document.querySelector(".declaracao");

    if (!radioDeclaracao.checked) {
        // O radio button não está marcado
        msgErroDeclaracao.innerHTML = "A declaração é obrigatória.";
        declaracaoDiv.classList.add('unchecked');
    } else {
        // O radio button está marcado
        msgErroDeclaracao.innerHTML = "";
        declaracaoDiv.classList.remove('unchecked');
    }
}


// Função para validar um endereço de e-mail usando expressão regular
function validarEmail(email) {
    var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email)
}

/* btnCadastrar.addEventListener('click', function (event) {
    event.preventDefault()

    checarInput(inputNome, msgErroNome, divNome)
    checarInput(inputSobrenome, msgErroSobrenome, divSobrenome)
    checarEmail()
    checarTelefone()
    checarDeclaracao()

    let inputsInvalidos = document.querySelectorAll(".input-invalido")
    let declaracaoUnchecked = document.querySelector(".declaracao.unchecked");

    if (inputsInvalidos.length === 0 && !declaracaoUnchecked) {
        alert('Cadastro efetuado com sucesso!')
        form.submit()
    }
    else {
        alert('Não foi possível efetuar o cadastro. Por favor, corrija os erros.')
    }

}) */



btnCadastrar.addEventListener('click', function (event) {
    event.preventDefault();

    checarInput(inputNome, msgErroNome, divNome);
    checarInput(inputSobrenome, msgErroSobrenome, divSobrenome);
    checarEmail();
    checarTelefone();
    checarDeclaracao();

    let inputsInvalidos = document.querySelectorAll(".input-invalido");
    let declaracaoUnchecked = document.querySelector(".declaracao.unchecked");

    if (inputsInvalidos.length === 0 && !declaracaoUnchecked) {
        let email = inputEmail.value;

        fetch('/verificar_email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: email })
        })
            .then(response => response.json())
            .then(data => {
                if (data.existe) {
                    alert('Email já cadastrado. Por favor, use outro email.');
                } else {
                    alert('Cadastro efetuado com sucesso!');
                    form.submit();
                }
            })
            .catch(error => {
                console.error('Erro:', error);
            });
    } else {
        alert('Não foi possível efetuar o cadastro. Por favor, corrija os erros.');
    }
});
