import models
from models import session
from datetime import datetime


def validarCachorro(n,s,r,d):

    try:
        models.Cachorro.validarNomeCachorro(n)
        models.Cachorro.validarSexoCachorro(s)
        models.Cachorro.validarRacaCachorro(r)
        models.Cachorro.validarDescricaoCachorro(d)
        novo_cachorro = models.Cachorro(nome_cachorro=n,sexo_cachorro=s,raca_cachorro=r,descricao_cachorro=d)
        session.add(novo_cachorro)
        session.commit()
    except ValueError as v:
        raise ValueError(v)       

def excluirC(id):
    session.query(models.Cachorro).filter(models.Cachorro.id_cachorro == id).delete()
    session.commit()


def validarDespesa(n,d,v,de):

    try:
        models.Despesa.validarNomeDespesa(n)
        models.Despesa.validarValor(v)
        models.Despesa.validarDescricaoDespesa(de)

        if d.strip() and d.strip().lower() != "vazia":  # Verifica se a data não está vazia
            d = datetime.strptime(d, '%Y-%m-%d')
        else:
            d = None

        nova_despesa = models.Despesa(nome_despesa=n,data_despesa=d,valor_despesa=v,descricao_despesa=de)
        session.add(nova_despesa)
        session.commit()
    except ValueError as v:
        raise ValueError(v)
    
def excluirDespesa(id):
    session.query(models.Despesa).filter(models.Despesa.id_despesa == id).delete()
    session.commit()


def validarUsuario(n,e,s):
    try:
        models.Administrador.validarNome(n)
        models.Administrador.validarEmail(e)
        models.Administrador.validarSenha(s)
        novo_adm = models.Administrador(nome_administrador=n, email_administrador=e,senha_administrador=s)
        session.add(novo_adm)
        session.commit()
    except ValueError as v:
        raise ValueError(v)

def excluirUsuario(id):
    session.query(models.Administrador).filter(models.Administrador.id_administrador == id).delete()
    session.commit()


def validarPadrinho(n,s,t,e):
    try:
        models.Padrinho.validarNomePadrinho(n)
        models.Padrinho.validarSobrenomePadrinho(s)
        models.Padrinho.validarEmail(e)
        novo_padrinho = models.Padrinho(nome_padrinho=n,sobrenome_padrinho=s,telefone_padrinho=t,email_padrinho=e)
        session.add(novo_padrinho)
        session.commit()
    except ValueError as v:
        raise ValueError(v)

def excluirPadrinho(id):
    session.query(models.Padrinho).filter(models.Padrinho.id_padrinho == id).delete()
    session.commit()


def validarAssinante(n, e):
    try:
        models.Assinante.validarNomeAssinante(n)
        models.Assinante.validarEmail(e)
        
        novo_assinante = models.Assinante(nome_assinante=n, email_assinante=e)
        session.add(novo_assinante)
        session.commit()
    except ValueError as v:
        raise ValueError(v)
    
def excluirAssinante(id):
    session.query(models.Assinante).filter(models.Assinante.id_assinante == id).delete()
    session.commit()