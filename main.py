
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


@app.route('/area_restrita')
def area_restrita():
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
   return render_template('home_sistema.html')


@app.route('/despesas')
def despesas():
   despesas = models.session.query(models.Despesas).all()
   return render_template('despesas.html', despesas = despesas)


@app.route('/cachorro')
def cachorro():
   cachorros = models.session.query(models.Cachorro).all()
   return render_template('cachorro.html', cachorros = cachorros)




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

@app.route('/entrar_usuario', methods=['POST'])
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
        return redirect('/area_restrita')


@app.route('/cadastrar_cachorro',methods=['POST'])
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
      validacao.validarCachorro(nome,sexo,raca,descricao)
      flash('cadastrado com sucesso')
      return redirect('/cachorro')
   except ValueError as v:
      flash(str(v))
      return redirect('/cachorro')
   

@app.route('/excluir_cachorro', methods=['POST'])
def excluir_cachorro():
   nome = request.form.get('nome')
   id = request.form.get('idCachorro')

   try:
      validacao.excluirC(id)
      flash(f'Cachorro "{nome}" excluido com sucesso')
      return redirect('/cachorro')
   except:
      flash(f'erro ao excluir cachorro')
      
   return redirect('/cachorro')


@app.route('/cadastrar_despesas', methods=['POST'])
def cadastrar_despesas():
   data = request.form.get('data_despesas')
   valor = request.form.get('valor_despesas')
   descricao = request.form.get('descricao_despesas')
   
   if data == '':
      data = 'vazia'

   try:
      validacao.validarDespesas(data,valor,descricao)
      flash('Despesa cadastrada!')
      return redirect('/despesas')
   except ValueError as v:
      flash(str(v))
      return redirect('/despesas')
   

@app.route('/excluir_despesas',methods=['POST'])
def excluir_despesas():
   id = request.form.get('idDespesas')

   try:
      validacao.excluirDespesas(id)
      flash(f'Despesa excluida com sucesso')
      return redirect('/despesas')
   except:
      flash(f'erro ao excluir despesas')
      
   return redirect('/despesas')


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