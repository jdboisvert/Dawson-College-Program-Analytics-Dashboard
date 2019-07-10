import dawsonwebscrapper
import webbrowser
from threading import Timer
from flask import Flask
app = Flask(__name__, static_url_path='')

@app.route('/')
#Function for index
def root():
    #dawsonwebscrapper.init()
    return app.send_static_file('index.html')

#def openBrowser():
 #   webbrowser.open_new('http://127.0.0.1:2000/')

if __name__ == '__main__':
    app.run()