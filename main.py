
from flask import Flask, redirect, render_template, request, flash, jsonify
import validacao
import models


app = Flask(__name__)

app.secret_key = 'APJJP'


# rotas do site

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

logado = False

@app.route('/area_restrita')
def area_restrita():
   global logado
   logado = False

   """  return render_template('area_restrita.html') """
   usuarios = models.session.query(models.Administrador).all()
   return render_template('area_restrita.html', usuarios = usuarios)


@app.route('/redefinir_senha')
def redefinir_senha():
    return render_template('redefinir_senha.html')


@app.route('/doar_agora')
def doar_agora():
    return render_template('doar_agora.html')


@app.route('/apadrinhar_ong')
def apadrinhar_ong():
    return render_template('apadrinhar_ong.html')



# rotas do sistema

""" @app.route('/sistema')
def adm():
   usuarios = models.session.query(models.Administrador).all()
   return render_template('sistema.html', usuarios = usuarios)
 """

@app.route('/home_sistema')
def home_sistema():
    if logado == True:
        return render_template('home_sistema.html')
    if logado == False:
        return render_template('area_restrita.html')

@app.route('/despesas')
def despesas():
    if logado == True:
        despesa = models.session.query(models.Despesa).order_by(models.Despesa.nome_despesa).all()
        return render_template('despesas.html', despesa = despesa)
    if logado == False:
        return render_template('area_restrita.html')


@app.route('/cachorro')
def cachorro():
    if logado == True:
        cachorros = models.session.query(models.Cachorro).order_by(models.Cachorro.nome_cachorro).all()
        return render_template('cachorro.html', cachorros = cachorros)
    if logado == False:
        return render_template('area_restrita.html')


@app.route('/padrinhos')
def padrinhos():
    if logado == True:
        padrinhos = models.session.query(models.Padrinho).order_by(models.Padrinho.nome_padrinho).all()
        return render_template('padrinhos_sistema.html', padrinhos = padrinhos)
    if logado == False:
        return render_template('area_restrita.html')



# funções dos formulários do site

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



# funções do sistema 

""" @app.route('/entrar_usuario', methods=['POST'])
def entrar_usuario():
    email = request.form.get('email_usuario')
    senha = request.form.get('senha_usuario')

    usuarios = models.session.query(models.Administrador).all()
    if usuarios:
        for i in usuarios:
            if i.email_administrador == email and i.senha_administrador == senha:
                return redirect('/home_sistema')
            flash('email ou senha inválidos')
            return redirect('/area_restrita')
    else:
        flash('Nenhum usuário cadastrado')
        return redirect('/area_restrita') """

@app.route('/entrar_usuario', methods=['POST'])
def entrar_usuario():
    global logado

    email = request.json.get('email_usuario')
    senha = request.json.get('senha_usuario')

    usuarios = models.session.query(models.Administrador).all()
    if usuarios:
        for i in usuarios:
            if i.email_administrador == email and i.senha_administrador == senha:
                logado = True
                return jsonify({'autenticado': True})
        flash('Email ou senha inválidos')
        return jsonify({'autenticado': False})
    else:
        flash('Nenhum usuário cadastrado')
        return jsonify({'autenticado': False})


@app.route('/cachorros_json')
def cachorros_json():
    cachorros = models.session.query(models.Cachorro).order_by(models.Cachorro.nome_cachorro).all()
    cachorros_data = [
        {
            'id_cachorro': cachorro.id_cachorro,
            'nome_cachorro': cachorro.nome_cachorro,
            'sexo_cachorro': cachorro.sexo_cachorro,
            'raca_cachorro': cachorro.raca_cachorro,
            'descricao_cachorro': cachorro.descricao_cachorro
        } for cachorro in cachorros
    ]
    return jsonify(cachorros_data)


@app.route('/despesas_json')
def despesas_json():
    despesas = models.session.query(models.Despesa).order_by(models.Despesa.nome_despesa).all()
    despesas_data = [
        {
            'id_despesa': despesa.id_despesa,
            'nome_despesa': despesa.nome_despesa,
            'data_despesa': despesa.data_despesa,
            'valor_despesa': despesa.valor_despesa,
            'descricao_despesa': despesa.descricao_despesa
        } for despesa in despesas
    ]
    return jsonify(despesas_data)


@app.route('/cadastrar_cachorro', methods=['POST'])
def cadastrar_cachorro():
    nome = request.form.get('nome_cachorro')
    sexo = request.form.get('sexo_cachorro')
    raca = request.form.get('raca_cachorro')
    descricao = request.form.get('descricao_cachorro')

    if raca == '':
        raca = 'vazia'
    if descricao == '':
        descricao = 'vazia'

    try:
        validacao.validarCachorro(nome, sexo, raca, descricao)
        # Sucesso
        return jsonify({'success': True, 'message': 'Cachorro cadastrado com sucesso'})
    except ValueError as v:
        # Erro de validação
        return jsonify({'success': False, 'message': str(v)})

@app.route('/excluir_cachorro', methods=['POST'])
def excluir_cachorro():
    nome = request.form.get('nome')
    id = request.form.get('idCachorro')

    try:
        validacao.excluirC(id)
        return jsonify({'success': True, 'message': f'Cachorro "{nome}" excluído com sucesso'})
    except Exception as e:
        return jsonify({'success': False, 'message': str(e)})


@app.route('/cadastrar_despesa', methods=['POST'])
def cadastrar_despesa():
    nome = request.form.get('nome_despesa')
    data = request.form.get('data_despesa')
    valor = request.form.get('valor_despesa')
    descricao = request.form.get('descricao_despesa')

    if data == '':
        data = 'vazia'

    try:
        validacao.validarDespesa(nome,data,valor,descricao)
        # Sucesso
        return jsonify({'success': True, 'message': 'Despesa cadastrada com sucesso'})
    except ValueError as v:
        # Erro de validação
        return jsonify({'success': False, 'message': str(v)})

@app.route('/excluir_despesa',methods=['POST'])
def excluir_despesa():
   nome = request.form.get('nome')
   id = request.form.get('idDespesa')

   try:
        validacao.excluirDespesa(id)
        return jsonify({'success': True, 'message': f'Despesa "{nome}" excluída com sucesso'})
   except  Exception as e:
        return jsonify({'success': False, 'message': str(e)})


@app.route('/cadastrar_padrinho_restrito', methods=['POST'])
def cadastrar_padrinho_restrito():
    nome = request.form.get('nome_padrinho')
    sobrenome = request.form.get('sobrenome_padrinho')
    telefone = request.form.get('telefone_padrinho')
    email = request.form.get('email_padrinho')

    try:
        validacao.validarPadrinho(nome, sobrenome, telefone, email)
        return jsonify({'success': True, 'message': 'Padrinho cadastrado com sucesso'})
    except ValueError as v:
        return jsonify({'success': False, 'message': str(v)})

@app.route('/excluir_padrinho', methods=['POST'])
def excluir_padrinho():
    nome = request.form.get('nome')
    id = request.form.get('idPadrinho')

    try:
        validacao.excluirPadrinho(id)
        return jsonify({'success': True, 'message': f'Padrinho "{nome}" excluído com sucesso'})
    except Exception as e:
        return jsonify({'success': False, 'message': str(e)})

@app.route('/padrinhos_json')
def padrinhos_json():
    padrinhos = models.session.query(models.Padrinho).order_by(models.Padrinho.nome_padrinho).all()
    padrinhos_data = [
        {
            'id_padrinho': padrinho.id_padrinho,
            'nome_padrinho': padrinho.nome_padrinho,
            'sobrenome_padrinho': padrinho.sobrenome_padrinho,
            'telefone_padrinho': padrinho.telefone_padrinho,
            'email_padrinho': padrinho.email_padrinho
        } for padrinho in padrinhos
    ]
    return jsonify(padrinhos_data)



@app.route('/cadastrar_adm', methods=['POST'])
def cadastrar_adm():
   email = request.form.get('email_adm')
   senha = request.form.get('senha_adm')
   btn = request.form.get('btn_adm')

   if btn == 'cadastrar':
      try:
         validacao.cadastrarUsuario(email,senha)
         flash('Usuário cadastrado com sucesso')
         return redirect('/')
      except ValueError as v:
         flash(str(v))

      return redirect('/')
   else:
      usuarios = models.session.query(models.Administrador).all()
      if usuarios:
         for i in usuarios:
            if i.email_administrador == email and i.senha_administrador == senha:
               return redirect('/home_sistema')
         flash('email ou senha inválidos')
         return redirect('/')
      else:
         flash('Nenhum usuário cadastrado')
         return redirect('/')



if __name__ == '__main__':
    app.run(debug=True)