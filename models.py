from sqlalchemy import create_engine,Column,Integer,String,Date
from sqlalchemy.orm import sessionmaker
from sqlalchemy.orm import declarative_base



engine = create_engine('postgresql://postgres:jlindgren@localhost:5432/ozanimais')
#engine = create_engine('postgresql://postgres:87232a23@localhost:5432/ozanimais')


Base = declarative_base()
Session = sessionmaker(bind=engine)
session = Session()




class Administrador(Base):
   __tablename__ = 'administrador'
   id_administrador = Column(Integer,primary_key=True,autoincrement=True)
   email_administrador = Column(String(30),nullable=False)    
   senha_administrador = Column(String(15),nullable=False)

   def validarEmail(email):
      if email == '':
         raise ValueError('O Campo "email" não pode ser nulo!')
       
      tamanho = len(email)

      if tamanho < 10 or tamanho > 40:
         raise ValueError('O tamanho do email deve conter entre 10 a 40 caracteres!')
       
      for i in email:
         if not i.isalpha() and not i.isdigit() and i != '@' and i != '.':                     
            raise ValueError('O campo email deve conter apenas caracteres válidos!')

      if email.count('@') != 1 or email.count('.') < 1:
        raise ValueError('O campo email deve conter um "@" e pelo menos um "."!')         
          
    
   def validarSenha(senha):
      if senha == '':
         raise ValueError('O campo "senha" não pode ser nula')
       
      tamanho = len(senha)
  
      if tamanho < 7 or tamanho > 15:
         raise ValueError('A senha deve conter entre 7 a 15 caracteres !')
       
   def __str__(self):
     return f'nome: {self.nome_administrador}, senha: {self.senha_administrador}'



class Cachorro(Base):
   __tablename__= 'cachorro'
   id_cachorro = Column(Integer,primary_key=True,autoincrement=True)
   nome_cachorro = Column(String(20),nullable=False)
   sexo_cachorro = Column(String(1), nullable=False)
   raca_cachorro = Column(String(20))
   descricao_cachorro = Column(String(255))


   def validarNomeCachorro(nome_cachorro):
      if nome_cachorro == '':
         raise ValueError('O Campo "nome" não pode ser nulo!')
       
      tamanho = len(nome_cachorro)

      if tamanho < 2 or tamanho > 20:
         raise ValueError('O tamanho do nome tem que ter entre 2 a 20  caracteres!')
       
      for i in nome_cachorro:
         if not i.isalpha() and not i.isspace():
            raise ValueError('O campo nome deve conter apenas caracteres válidos!')

   def validarSexoCachorro(sexo_cachorro):
      if sexo_cachorro == '':
         raise ValueError('O Campo "sexo" não pode ser nulo!')

      sexo_cachorro = sexo_cachorro.upper()

      tamanho = len(sexo_cachorro)

      if tamanho != 1:
         raise ValueError('Deve conter apenas 1 character!')
        
      if sexo_cachorro not in 'MF':
         raise ValueError('Sexo deve ser apenas masculino ou feminino!')
  
    

   def validarRacaCachorro(raca_cachorro):
                 
      for i in raca_cachorro:
         if not i.isalpha() and not i.isspace() and i != '-':
            raise ValueError('o nome da raça deve conter apenas characters válidos!')




   def validarDescricaoCachorro(descricao_cachorro):
              
      tamanho = len(descricao_cachorro)

      if tamanho < 0 or tamanho > 255:
         raise ValueError('O tamanho da descrição tem que ter entre 1 a 255 character!')
   
   def __str__(self):
     return f'nome: {self.nome_cachorro}, sexo: {self.sexo_cachorro}, raça: {self.raca_cachorro}, Descrição {self.descricao_cachorro}'





class Despesas(Base):
   __tablename__ = 'despesas'
   id_despesas = Column(Integer,primary_key=True,autoincrement=True)
   data_despesas = Column(Date)
   valor_despesas = Column(Integer,nullable=False)
   descricao_despesas = Column(String(255),nullable=False)



   def validarValor(valor):
      if valor == '':
         raise ValueError('O valor não pode ser nulo!')
      
      for i in str(valor):
          if not i.isdigit():
             raise ValueError('No campo valor só pode ser digitado numeros!')

   def validarDescricaoDespesas(descricao_despesas):
              
       tamanho = len(descricao_despesas)

       if descricao_despesas == '':
          raise ValueError('A descrição de despesas não pode ser nula!')

       if tamanho < 0 or tamanho > 255:
          raise ValueError('O tamanho da descrição tem que ter entre 0 a 255 character!')
   
   def __str__(self):
     return f'Valor: {self.valor_despesas}, Descrição: {self.descricao_despesas}'
   
class Assinante(Base):
   __tablename__ = 'assinante'
   id_assinante = Column(Integer,primary_key=True,autoincrement=True)
   nome_assinante = Column(String(60),nullable=False)
   email_assinante = Column(String(40),nullable=False)



   def validarNomeAssinante(nomeAssinante):

      if nomeAssinante == '':
         raise ValueError('O Campo "nome" não pode ser nulo!')
       
      tamanho = len(nomeAssinante)

      if tamanho < 2 or tamanho > 60:
         raise ValueError('O tamanho do nome tem que ter entre 2 a 60  caracteres!')
       
      for i in nomeAssinante:
         if not i.isalpha() and not i.isspace():
            raise ValueError('O campo nome deve conter apenas caracteres válidos!')
   


   def validarEmail(email_assinante):
      if email_assinante == '':
         raise ValueError('O Campo "email" não pode ser nulo!')
       
      tamanho = len(email_assinante)

      if tamanho < 10 or tamanho > 40:
         raise ValueError('O tamanho do email deve conter entre 10 a 40 caracteres!')
       
      for i in email_assinante:
         if not i.isalpha() and not i.isdigit() and i != '@' and i != '.':                     
            raise ValueError('O campo email deve conter apenas caracteres válidos!')

      if email_assinante.count('@') != 1 or email_assinante.count('.') < 1:
        raise ValueError('O campo email deve conter um "@" e pelo menos um "."!')



class Padrinho(Base):
   __tablename__ = 'padrinho'
   id_padrinho = Column(Integer,primary_key=True,autoincrement=True)
   nome_padrinho = Column(String(60))
   sobrenome_padrinho = Column(String(60))
   telefone_padrinho = Column(String(20))
   email_padrinho = Column(String(40))


   def validarNomePadrinho(nomePadrinho):

      if nomePadrinho == '':
         raise ValueError('O Campo "nome" não pode ser nulo!')
       
      tamanho = len(nomePadrinho)

      if tamanho < 2 or tamanho > 60:
         raise ValueError('O tamanho do nome tem que ter entre 2 a 60  caracteres!')
       
      for i in nomePadrinho:
         if not i.isalpha() and not i.isspace():
            raise ValueError('O campo nome deve conter apenas caracteres válidos!')

   @staticmethod
   def validarSobrenomePadrinho(sobrenomePadrinho):

      if sobrenomePadrinho == '':
         raise ValueError('O Campo "sobrenome" não pode ser nulo!')
       
      tamanho = len(sobrenomePadrinho)

      if tamanho < 2 or tamanho > 60:
         raise ValueError('O tamanho do Sobrenome tem que ter entre 2 a 60  caracteres!')
       
      for i in sobrenomePadrinho:
         if not i.isalpha() and not i.isspace():
            raise ValueError('O campo nome deve conter apenas caracteres válidos!')
         
      
         
   def validarEmail(email_padrinho):
      if email_padrinho == '':
         raise ValueError('O Campo "email" não pode ser nulo!')
       
      tamanho = len(email_padrinho)

      if tamanho < 10 or tamanho > 40:
         raise ValueError('O tamanho do email deve conter entre 10 a 40 caracteres!')
       
      for i in email_padrinho:
         if not i.isalpha() and not i.isdigit() and i != '@' and i != '.':                     
            raise ValueError('O campo email deve conter apenas caracteres válidos!')

      if email_padrinho.count('@') != 1 or email_padrinho.count('.') < 1:
        raise ValueError('O campo email deve conter um "@" e pelo menos um "."!')



Base.metadata.create_all(bind=engine)



