# tell-me-something RodBot
#### General Information
##### What RodBot does:
RodBot is a storyboard-based chatbot that provides buzzfeed news stories that fits a user’s desired emotion.
##### Technologies:

RodBot operates using a few key technologies.

HTML and CSS:  RodBot is a web-platform based chatbot and the interface is created in HTML and CSS. 

Python: The interface interacts with the an API that we have written using Python’s Flask.

Javascript: Making calls to the API is done using Javascript. 

BuzzFeed API: Used to query and find articles to suggest to users. 

Type.js: Used to allow for the contents of the page to be typed using jquery. 

##### How RodBot Works:
When a user uses RodBot they are prompted to input a single word to describe what type of article they would like to hear. When a word is inputted and the “send” button is pressed a GET request to the RodBot API is made with the word inputted by the user as a parameter. When the request is lost or the user mistakenly input more than one word, a conversation is raised based on that situation.

Since the users are provided with free range to input any single word into the input box the intent and sentiments of the word must be interpreted. To do so a dictionary of 14,182 words that are mapped to 8 emotions and 2 sentiments is used to approximate what type of article would be desired by the user. After the word is mapped to an emotion or sentiment it is then mapped to BuzzFeed tags such as “LOL”, “Cute”, “WIN”, “FAIL”, etc,  which are classifications given by BuzzFeed users that read the articles. RodBot searches for articles in the BuzzFeed API using these tags.

When a user initially inputted word is classified it is mapped to an appropriate BuzzFeed tag and a GET request is made to the BuzzFeed feeds API which returns around 100 articles and one is selected at random. From there a call is made to the BuzzFeed buzz API which returns the contents of the article such as descriptions, images, etc. The first 140 characters of the description, the title of the article, an image,the article url, and a storyboard that matches the classified emotion or sentiment are then packaged in a JSON which is returned to the front end at the end of the GET request. 

In the front end the contents of the returned JSON are parsed and it begins by first executing the storyboard to set the tone based on the type of article requested. The storyboard is a list of strings which are chained into the dynamically allocated user response and narrator response div boxes. This process simulates the chat interface message flow. The responses are dynamically given unique tags and passed to the Type.js tool which adds the contents of the story incrementally into the div. After a div is completed if there are more strings in the storyboard it continues until the storyboard is finished and then displays the article. The title of the article is one the top of the dialog box and the article URL is shown along with the snippet of the description of the article. From there the image in the JSON response is also displayed beneath the presented story to help highlight the tone of the article to the user. 

