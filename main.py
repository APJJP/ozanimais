
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






if __name__ == '__main__':
    app.run(debug=True)

