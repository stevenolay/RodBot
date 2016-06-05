
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
storyBoard = {'sadness': ['Hope you are not having a bad day. :(.  Coming with what you want.', 'Oh no there are so many heartbreaking stories...', "Here's one. I have my shoulder for you if you need it."], 'anticipation': ['I have something tantalizing for you!'], 'disgust': ['As you wish.', "I can't look at this one anymore...", "You're gonna hate me for this....But that's exactly what you want today right?"], 'positive': ["Got you! I'm sure I have something you want!", "This one's pretty nice!", "Here you go! I'm sure you'll like this one. "], 'anger': ['Alright, now this may or may not be pretty upsetting. I am bad at finding negative stories.'], 'joy': ["Great! I'll help facilitate some happiness for you.", "Ahh... Here's something that'll bring you joy! Please enjoy. :)"], 'fear': ['Boy do I have something scary for you!', 'This should give you something to be afraid of.'], 'trust': ["Well, having trust in each other is always a good thing. I'll see if I can find an honorable story for you.", 'Trust trust trust, do you want to bulid trust with others?', 'Well here is something lighthearted at least. :)'], 'negative': ['Okay, seems you are having a really bad day, sorry for you.', "Don't worry, Rodbot can make you happy."], 'surprise': ["Hold on. I'll be right back with what you want.", '......zzz', "Surprise! Here's something that'll shock your mind."]} #RodBot Storyboard
#lexiconDict = json.dumps(lexiconDict)
#lexiconDict = json.loads(lexiconDict)
#print lexiconDict['happily']
@app.route('/')
def show_vanilla_home():
    return render_template('welcome.html', data = {'status': '', 'article_url': ''}) #Loads Welcome Page

@app.route('/find/<param>')
def show_entries(param):
    #entries = [dict(title='hello', text='swaggy')]
    art = findArticle(str(param)) #Finds an article
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

emotion_hash = {'anger': ['hate', 'fail'], 'fear': ['creepy'], 'anticipation': ['omg', 'surprise', 'win', 'wtf', 'splendid'] ,'trust' : ['win', 'splendid', 'love'], 'surprise' : ['blimey', 'amazing', 'omg', 'wtf'], 'sadness' : ['fail'], 'joy' : ['lol', 'amazing', 'splendid', 'cute', 'omg', 'yaaass', 'win'], 'disgust' : ['ew', 'trashy', 'fail'], 'positive' : ['yaass', 'lol', 'cute', 'win', 'love', 'splendid', 'amazing'], 'negative' : ['trashy', 'wtf', 'hate', 'ew']}

def getGif(param):
    '''input an Adjective
        Fetches a gif for the adjective
        '''
    adj = str(param) #converts to string 
    r = requests.get("http://api.giphy.com/v1/gifs/search?q="+adj+"&api_key=dc6zaTOxFJmzC")
    resp = r.json()
    return resp["data"][random.randint(0, len(resp["data"]) - 1)]["images"]["fixed_width"]["url"]

def findArticle(adj): #Provide string such as 'funny', 'happy', 'sad'
	if str(adj) in lexiconDict: #Checks to see if user input is in lexicon dictionary
		emotion_list = lexiconDict[str(adj)] #Fetches the list of emotions associated with that word
		emotion = random.choice(emotion_list) #Selects one of the emotions at random
		adj = random.choice(emotion_hash[emotion]) #Maps to buzzfeed tags 
		story = storyBoard[emotion] #Maps story based on the emotion classification
	else:
		ranK = random.choice(emotion_hash.keys()) #Selects a random emotion
		adj = random.choice(emotion_hash[ranK]) 
		story = ["I'm sorry I couldn't find the story that you wanted. I think this story is pretty interesting and I hope you can find appreciation in it too."] #Generic story when a story cannoy be found

	buzzes = [] #Empty list to collect stories from Buzzfeed api
	for i in range(1,10):
		r = requests.get('http://www.buzzfeed.com/api/v2/feeds/'+str(adj)+'?p='+str(i)) #Makes API call to BuzzFeed API to find articles that match the BuzzFeed tag
		res = r.text.replace('\n', '') #Removes new lines in the response. New lines malform JSON response
		res = json.loads(res) #Convert string to JSON

		buzz = res['buzzes'] 
		for j in buzz:
			if j['language'] == 'en': #Verifies that the articles found are in english
				buzzes.append(j)

	if buzzes:	
		num = random.randint(0, len(buzzes) - 1) #Random number
		url = "http://www.buzzfeed.com/api/v2/buzz/" + str(buzzes[num]['id']) #Fetch contents of random article
		r = requests.get(url) #Call to BuzzFeed Buzz API to get page contents
		resp = r.json()
		if resp['buzz']['images']['big']:
			pic =  resp['buzz']['images']['big'] #Fetches an image from the Buzz article
		else:
			pic = str(getGif(adj))
		resp = resp['buzz']['sub_buzzes']
		content = ""
		for i in resp:
			content += i['description'] #Parses through all the pages content and concats
		title = buzzes[num]['title'] #Fetches title of the article

		if len(content) > 140:
			summary = content[:140] + "..."
		else:
			summary = content
		buzzURL = 'http://www.buzzfeed.com/' + buzzes[num]['username'] + "/" + buzzes[num]['uri'] #Constructs URL to article
		#gif = str(getGif(adj))

		ret = {"summary": summary, "buzzURL": buzzURL, "gifURL": pic, "title": title.upper(), "classification": "Calssification is Deprecated", 'story': story}
		return jsonify(ret)
	ret = {"summary": "", "buzzURL": "", "gifURL": "", "title": "", "classification": "", 'story': ""} #Failed article fetch.
	return jsonify(ret)


def classify(summary): #Naive approach to artcile classification 
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
