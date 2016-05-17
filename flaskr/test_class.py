import ast
with open('data.txt', 'r') as myfile:
    lexiconDict = myfile.read().replace('\n', '')
lexiconDict = ast.literal_eval(lexiconDict)

import string


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
				emotes = lexiconDict[summ[index]]
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
		
	return emotion_counts

string2 = "happy sad mad glad bad"
print classify(string2)
	
