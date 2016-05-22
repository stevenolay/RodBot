# all the imports
#import sqlite3
import sys
import ast
import json 
import string 
import copy
import io 
from flask import Flask, request, session, g, redirect, url_for, \
     abort, render_template, flash, jsonify
from jinja2 import Environment, FileSystemLoader
import os

from Summary import *
import re, urllib2

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

with open('data.txt', 'r') as myfile:
    lexiconDict = myfile.read().replace('\n', '')
lexiconDict = ast.literal_eval(lexiconDict)
storyBoard = {'sadness': ['Hope you are not having a bad day. :(.  Coming with what you want.', 'Oh no there are so many heartbreaking stories...', "Here's one. I have my shoulder for you if you need it."], 'anticipation': ['I have something tantalizing for you!'], 'disgust': ['As you wish.', "I can't look at this one anymore...", "You're gonna hate me for this....But that's exactly what you want today right?"], 'positive': ["Got you! I'm sure I have something <>", "This one's pretty nice!", "Here's something <>. I'm sure you'll like it"], 'anger': ['Alright, now this may or may not be pretty upsetting. I am bad at finding negative stories.'], 'joy': ["Great! I'll help facilitate some happiness for you.", "Ahh... Here's something that'll bring you joy! Please enjoy. :)"], 'fear': ['Boy do I have something scary for you!', 'This should give you something to be afraid of.'], 'trust': ["Well, having trust in each other is always a good thing. I'll see if I can find an honorable story for you.", 'Trust trust trust, do you want to bulid trust with others?', 'Well here is something lighthearted at least. :)'], 'negative': ['Okay, seems you are having a really bad day, sorry for you.', "Don't worry, Rodbot can make you happy."], 'surprise': ["Hold on. I'll be right back with what you want.", '......zzz', "Surprise! Here's something that'll shock your mind."]}
#lexiconDict = json.dumps(lexiconDict)
#lexiconDict = json.loads(lexiconDict)
#print lexiconDict['happily']
@app.route('/')
def show_vanilla_home():
	return render_template('welcome.html', data = {'status': '', 'article_url': ''})

@app.route('/find/<param>')
def show_entries(param):
    #entries = [dict(title='hello', text='swaggy')]
    art = findArticle(str(param))
    return art
@app.route('/home')
def home():
    return render_template('index.html')

def summarize(title, content):

	st = SummaryTool()
	sentences_dic = st.get_sentences_ranks(content)
	summary = st.get_summary(title, content, sentences_dic)
	return jsonify(result=summary)

happy = ['cute', 'lol', 'yaaass', 'omg']
funny = ['lol', 'fail']
sad = ['fail']
#buzzfeed  = ['yaaass', 'omg', 'surprise', 'lol', 'cute', 'win', 'wtf', 'fail', 'ew', 'love', 'hate', 'amazing', 'blimey', 'splendid',  'trashy']

# anger = ['hate', 'fail']
# fear =  ['ew', 'creepy']
# anticipation =  ['omg', 'surprise', 'win', 'wtf', 'splendid']
# trust = ['win', 'splendid', 'love']
# surprise = ['blimey', 'amazing', 'omg', 'wtf']
# sadness = ['fail']
# joy = ['lol', 'amazing', 'splendid', 'cute', 'omg', 'yaaass', 'win']
# disgust = ['ew', 'trashy', 'fail']
# positive = ['yaass', 'lol', 'cute', 'win', 'love', 'splendid', 'amazing']
# negative = ['trashy', 'wtf', 'fail', 'hate', 'ew']
emotion_hash = {'anger': ['hate', 'fail'], 'fear': ['creepy'], 'anticipation': ['omg', 'surprise', 'win', 'wtf', 'splendid'] ,'trust' : ['win', 'splendid', 'love'], 'surprise' : ['blimey', 'amazing', 'omg', 'wtf'], 'sadness' : ['fail'], 'joy' : ['lol', 'amazing', 'splendid', 'cute', 'omg', 'yaaass', 'win'], 'disgust' : ['ew', 'trashy', 'fail'], 'positive' : ['yaass', 'lol', 'cute', 'win', 'love', 'splendid', 'amazing'], 'negative' : ['trashy', 'wtf', 'hate', 'ew']}

def getGif(param):
	adj = str(param)
	r = requests.get("http://api.giphy.com/v1/gifs/search?q="+adj+"&api_key=dc6zaTOxFJmzC")
	resp = r.json()
	return resp["data"][random.randint(0, len(resp["data"]) - 1)]["images"]["fixed_width"]["url"]
	
def findArticle(adj): #Provide string such as 'funny', 'happy', 'sad'
	if str(adj) in lexiconDict:
		emotion_list = lexiconDict[str(adj)]
		emotion = random.choice(emotion_list)
		adj = random.choice(emotion_hash[emotion])
		story = storyBoard[emotion]
	else:
		ranK = random.choice(emotion_hash.keys())
		adj = random.choice(emotion_hash[ranK])
		story = storyBoard[ranK]

	buzzes = []
	for i in range(1,10):
		r = requests.get('http://www.buzzfeed.com/api/v2/feeds/'+str(adj)+'?p='+str(i))
		res = r.text.replace('\n', '')
		res = json.loads(res)
		
		buzz = res['buzzes']
		for j in buzz:
			if j['language'] == 'en':
				buzzes.append(j)
			
	if buzzes:	#Generates summary
		num = random.randint(0, len(buzzes) - 1)
		url = "http://www.buzzfeed.com/api/v2/buzz/" + str(buzzes[num]['id'])
		r = requests.get(url) 
		resp = r.json()
		resp = resp['buzz']['sub_buzzes']
		content = ""
		for i in resp:
			content += i['description']
		title = buzzes[num]['title']
		title = urllib2.unquote(title)
		content = urllib2.unquote(content)
		st = SummaryTool()
		sentences_dic = st.get_sentences_ranks(content)
		summary = st.get_summary(title, content, sentences_dic)
		
		classification = classify(content)
			
		buzzURL = 'http://www.buzzfeed.com/' + buzzes[num]['username'] + "/" + buzzes[num]['uri']
		ret = {"summary": summary, "buzzURL": buzzURL, "gifURL": str(getGif(adj)), "title": title, "classification": classification, 'story': story}
		return jsonify(ret)
		#"Summary: " + summary + "\n" + "Content Original: " + content + "Title: " + title
	return " "


def classify(summary):
	summ = summary
	
	for i in string.punctuation:
		summ = summ.replace(i, ' ')

	summ = summ.split(' ')
	summ = filter(lambda a: a != '', summ)
	
	lexiconDict
	emotion_counts = {'anger': 0, 'fear': 0, 'anticipation': 0 ,'trust' : 0, 'surprise' : 0, 'sadness' : 0, 'joy' : 0, 'disgust' : 0, 'positive' : 0, 'negative' : 0}
	
	index = 0 
	while index < len(summ):
		if summ[index] == ("not" or "Not"):
			if summ[index + 1] in lexiconDict.keys():
				emotes = lexiconDict[summ[index + 1]]
				for i in emotes:
					emotion_counts[i] = emotion_counts[i] - 1
			index += 2
		elif summ[index] in lexiconDict.keys():
			emotes = lexiconDict[summ[index]]
			for i in emotes:
				emotion_counts[i] = emotion_counts[i] + 1
			index += 1
		else: 
			index += 1

	return max(emotion_counts, key=emotion_counts.get)

if __name__ == '__main__':
    #app.run(host=os.getenv('IP', '0.0.0.0'),port=int(os.getenv('PORT', 8080)))
	app.run(debug=True)
