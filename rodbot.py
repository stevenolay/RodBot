import sys
sys.path.append("requests-2.9.1-py2.7.egg")
import requests
import random

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
		print 'http://www.buzzfeed.com/' + buzzes[num]['username'] + "/" + buzzes[num]['uri']
        
findArticle('funny')        
