
from flask import Flask, redirect, render_template, request, flash, jsonify
import validacao
import models


app = Flask(__name__)

app.secret_key = 'APJJP'




@app.route('/')
def home():
    return render_template('index.html')



@app.route('/quem_somos')
def quem_somos():
    return render_template('quem_somos.html')


@app.route('/nossos_animais')
def nossos_animais():
    return render_template('nossos_animais.html')


@app.route('/como_ajudar')
def como_ajudar():
    return render_template('como_ajudar.html')


@app.route('/area_restrita')
def area_restrita():
    return render_template('area_restrita.html')


@app.route('/redefinir_senha')
def redefinir_senha():
    return render_template('redefinir_senha.html')


@app.route('/doar_agora')
def doar_agora():
    return render_template('doar_agora.html')


@app.route('/apadrinhar_ong')
def apadrinhar_ong():
    return render_template('apadrinhar_ong.html')


"""@app.route('/cadastrar_assinante', methods=['POST'])
def cadastrar_assinante():
    nome = request.form.get('nome-completo')
    email = request.form.get('email')

    try:
        validacao.validarAssinante(nome,email)
        flash('Assinante cadastrado com sucesso')
        return redirect('/')
    except ValueError as v:
        flash(str(v))
        return redirect('/')"""


"""@app.route('/cadastrar_padrinho', methods=['POST'])
def cadastrar_padrinho():
    nome = request.form.get('nome')
    sobrenome = request.form.get('sobrenome')
    telefone = request.form.get('telefone')
    email = request.form.get('email')

    padrinhos = models.session.query(models.Padrinho).all()
    for padrinho in padrinhos:
        if padrinho.email_padrinho == email:
            flash('Email já cadastrado')
            return redirect('/apadrinhar_ong')

    try:
        validacao.validarPadrinho(nome,sobrenome,telefone,email)
        flash('padrinho cadastrado com sucesso')
        return redirect('/apadrinhar_ong')
    except ValueError as v:
        flash(str(v))
        return redirect('/apadrinhar_ong')
"""



def validar_email_existe(email):
    return models.session.query(models.Padrinho).filter_by(email_padrinho=email).first() is not None

@app.route('/verificar_email', methods=['POST'])
def verificar_email():
    data = request.json
    email = data.get('email')
    if validar_email_existe(email):
        return jsonify({'existe': True})
    return jsonify({'existe': False})

@app.route('/cadastrar_padrinho', methods=['POST'])
def cadastrar_padrinho():
    nome = request.form.get('nome')
    sobrenome = request.form.get('sobrenome')
    telefone = request.form.get('telefone')
    email = request.form.get('email')

    if validar_email_existe(email):
        flash('Email já cadastrado')
        return redirect('/apadrinhar_ong')

    try:
        validacao.validarPadrinho(nome, sobrenome, telefone, email)
        flash('Padrinho cadastrado com sucesso')
        return redirect('/apadrinhar_ong')
    except ValueError as v:
        flash(str(v))
        return redirect('/apadrinhar_ong')
    




def validar_email_assinante_existe(email):
    return models.session.query(models.Assinante).filter_by(email_assinante=email).first() is not None




@app.route('/verificar_email_assinante', methods=['POST'])
def verificar_email_assinante():
    data = request.json
    email = data.get('email')
    if validar_email_assinante_existe(email):
        return jsonify({'existe': True})
    return jsonify({'existe': False})



@app.route('/cadastrar_assinante', methods=['POST'])
def cadastrar_assinante():
    nome = request.form.get('nome-completo')
    email = request.form.get('email')

    if validar_email_assinante_existe(email):
        flash('Email já cadastrado para um assinante')
        return redirect('/')
    
    try:
        validacao.validarAssinante(nome, email)
        flash('Assinante cadastrado com sucesso')
        return redirect('/')
    except ValueError as v:
        flash(str(v))
        return redirect('/')



if __name__ == '__main__':
    app.run(debug=True)