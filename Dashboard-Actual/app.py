import os
import dawsonwebscrapper

from flask import Flask, render_template, url_for, json

app = Flask(__name__, static_url_path='/static')

#Main page
@app.route('/')
def index():
    return render_template("loading.html")


#Dashboard
@app.route('/', methods=['POST'])
def form(display=None):
    #First run scrapping
    dawsonwebscrapper.init()

    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)