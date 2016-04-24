import random
from Summary import *
import requests, urllib2
happy = ['cute', 'lol', 'yaaass', 'omg']
def findArticle(adj): #Provide string such as 'funny', 'happy', 'sad'
	content = "Hint: All of your secrets, and probably some stickers.IN CURSIVE. The lock and key gave you all the privacy you needed. If you needed purple, all you had to do was click! Those eyes are sort of terrifying, but also mesmerizing...Tens of your hard-earned dollars were spent on it! All of them were Lisa Frank approved, obviously.All of this beauty...FOR ME?!"
	title = "Check your bases"
	st = SummaryTool()
	sentences_dic = st.get_sentences_ranks(content)
	summary = st.get_summary(title, content, sentences_dic)
	return summary
def getGif(param):
	adj = str(param)
	r = requests.get("http://api.giphy.com/v1/gifs/search?q="+adj+"&api_key=dc6zaTOxFJmzC")
	resp = r.json()
	return resp["data"][1]["images"]["fixed_width"]["url"]
	
print getGif("happy")