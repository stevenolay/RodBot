# all the imports
#import sqlite3
import sys
sys.path.append("requests-2.9.1-py2.7.egg") #This prevents the need from installing requests on your machine
sys.path.append("Flask-0.10.1-py2.7.egg") #This prevents the need of installing flask on your machine

from flask import Flask, request, session, g, redirect, url_for, \
     abort, render_template, flash, jsonify
from jinja2 import Environment, FileSystemLoader
import os


##Chat Bot/BUZZFEED API IMPORTS
import requests
import random

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
@app.route('/')
def show_vanilla_home():
	return render_template('index.html', data = {'status': '', 'article_url': ''})

@app.route('/<param>')
def show_entries(param):
    #entries = [dict(title='hello', text='swaggy')]
	art = findArticle(str(param))
	return render_template('index.html', data = {'status': 'submitted', 'article_url': art})
	
@app.route('/status')	
def get_status():
	return str(status)
	


happy = ['cute', 'lol', 'yaaass', 'omg']
funny = ['lol', 'fail']
sad = ['fail', 'omg']

def findArticle(adj): #Provide string such as 'funny', 'happy', 'sad'
	if str(adj) == "happy":
		adj = random.choice(happy)
	if str(adj) == "funny":
		adj = random.choice(happy)
	if str(adj) == "sad":
		adj = random.choice(happy)
	buzzes = []
	for i in range(1,10):
		r = requests.get('http://www.buzzfeed.com/api/v2/feeds/'+str(adj)+'?p='+str(i))
		res = r.json()
		buzz = res['buzzes']
		for j in buzz:
			buzzes.append(j)
	if buzzes:	
		num = random.randint(0, len(buzzes) - 1)
		return 'http://www.buzzfeed.com/' + buzzes[num]['username'] + "/" + buzzes[num]['uri']
	return " "
	
if __name__ == '__main__':
    app.run()