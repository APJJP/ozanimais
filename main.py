
from flask import Flask, redirect, render_template, request, flash


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


@app.route('/doar_agora')
def doar_agora():
    return render_template('doar_agora.html')


@app.route('/apadrinhar_ong')
def apadrinhar_ong():
    return render_template('apadrinhar_ong.html')


if __name__ == '__main__':
    app.run(debug=True)