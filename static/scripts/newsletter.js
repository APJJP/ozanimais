let form = document.querySelector('#cadastro-assinante')
let btnAssinar = document.querySelector('.assinar')
let inputNome = document.querySelector('#nome-completo')
let inputEmail = document.querySelector('#email')

form.addEventListener("input", (e) => {
    switch (e.target.id) {
        case 'nome-completo':
            formatarNome(inputNome)
            break
        case 'email':
            impedirEspaco(inputEmail)
            break
    }
})

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


function impedirEspaco(input) {
    input.value = input.value.replace(/\s/g, '')
}

btnAssinar.addEventListener('click', function (event) {
    event.preventDefault();


    let email = inputEmail.value;

    fetch('/verificar_email_assinante', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email })
    })
        .then(response => response.json())
        .then(data => {
            if (data.existe) {
                alert('Email já cadastrado para um assinante. Por favor, use outro email.');
            } else {
                alert('Cadastro de assinante efetuado com sucesso!');
                form.submit();
            }
        })
        .catch(error => {
            console.error('Erro:', error);
        });

    //alert('Não foi possível efetuar o cadastro de assinante. Por favor, corrija os erros.');



form.submit()
});

