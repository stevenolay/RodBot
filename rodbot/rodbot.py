import sys
sys.path.append("requests-2.9.1-py2.7.egg")
import requests
import random


r = requests.get('http://www.buzzfeed.com/api/v2/feeds/lol')
res = r.json()
buzzes = res['buzzes']
print len(buzzes)
buzzes = []
print len(buzzes)
for i in range(1,10):
    r = requests.get('http://www.buzzfeed.com/api/v2/feeds/lol?p='+str(i))
    res = r.json()
    buzz = res['buzzes']
    for j in buzz:
        buzzes.append(j)
        
num = random.randint(1, 100)

print 'http://www.buzzfeed.com/' + buzzes[num]['username'] + "/" + buzzes[num]['uri']
    
    
