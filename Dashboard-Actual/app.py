import os
import dawsonwebscrapper

from flask import Flask, render_template, url_for, json

app = Flask(__name__, static_url_path='/static')

@app.route('/')
def index():
    #SITE_ROOT = os.path.realpath(os.path.dirname(__file__))

    dawsonwebscrapper.init()

    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)