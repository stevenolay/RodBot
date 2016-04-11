# all the imports
#import sqlite3
from flask import Flask, request, session, g, redirect, url_for, \
     abort, render_template, flash, jsonify
from jinja2 import Environment, FileSystemLoader
import os
# configuration
DATABASE = '/tmp/flaskr.db'
DEBUG = True
SECRET_KEY = 'development key'
USERNAME = 'admin'
PASSWORD = 'default'

# create our little application :)
app = Flask(__name__)
app.config.from_object(__name__)

#def connect_db():
    #return sqlite3.connect(app.config['DATABASE'])
status =  True
@app.route('/<param>')
def show_entries(param):
    #entries = [dict(title='hello', text='swaggy')]
	art = ""
	return render_template('index.html', data = {'status': param, 'article_url': art})
	
@app.route('/status')	
def get_status():
	return str(status)

	
	
if __name__ == '__main__':
    app.run()