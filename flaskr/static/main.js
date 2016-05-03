

function findArticle(args){

	var adj = document.getElementById("chat").value
	console.log(adj)
	window.location = adj
}

function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

function test(){
console.log("hello");
}
function updateScroll(){
	var element = document.getElementById("chat");
	element.scrollTop = element.scrollHeight;
}
function findArticle2(){
	var input = document.getElementById("inputBox").value;
	document.getElementById("inputBox").value = "";
	generateUser(input);
	updateScroll();
	makeCall(input);
	updateScroll();
}
function generateUser(input){
	var chatCont = document.getElementById("chatcontainter");

	var userLi = document.createElement("li");
	userLi.className = "userImage";
	
	var userImage = document.createElement("img");
	userImage.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADkAAAA6CAMAAAA9UgEZAAAAGFBMVEX/////1iH/6zcpKSnGjAD/7/+9ABiUYwBNS/lBAAAB/ElEQVRIiZWX26KFIAhEQ6j9/398FBBRwTq+dVkO4Eh2Xa8DEd9firmEfJkRj+QBxRcyYxGJDjPnKBKUQnlIjatTR4KlDjgkU18B2FAWrGA4Z48SAVYUFaySG4J037e83jQbivasc15SER16m0UbynMUNwxsjwZ39/sMEHNlGl1SpgRjRw7YwI0roIVVzlCfA5GltmsOUFDwZcMQVNSBFa3h0USGYOHV8ppiR0/GkgsamTiRbGRLSlwW+XCWJLWsgJxqaFCRRBxki8k4EU1RLBN5yxU4kn0WmJ/KrunqmYvW+hANkhCnJQQz0lbYh1jBVaXO/zw0kWLRlXzkBa/zPHrX9m4QLz5zcAkZoF1r4n20rgEEJPE+C8SbV7sZtmi1m8BaUwO7d6M+lw9iMgaPKCkZgy+qdfDz5PNyRjNSWuwx2TjaCinl7SeXPdm8tDT1aH7bwFHc3+pbfjR3ogWUBaWVvPyXxHZa26g9dTXRbyOvvfm1luY3T9X8ZeBK6lJYcWNw77f1xrTEjcyPBHOeAtoqYQzupFteJbPzS0ROF+nRJiDLVxJSsISeTUS3eb6SsJGns6GPl74He/W93clZ8gjyljGXwsy9HapHX7Av7yeOjza8Vd3hKP7E7yDpyUPaEuWWW2Md5xUN+///DLq/XioaktZB/o8efgv6+AMHhhAmi5ejQgAAAABJRU5ErkJggg==";
	
	userLi.appendChild(userImage);
	
	var userResponse = document.createElement("div");
	
	userResponse.className = "user";
	userResponse.innerHTML = "Tell me something " + input;
	
	userLi.appendChild(userResponse);
	
	chatCont.appendChild(userLi);
}
function makeCall(input){
	var url = "http://rcs-webportal-dev-corpulentgowk.c9users.io:8080/find/" + input;
	$.ajax({
        url: url,
        type: 'GET',
        dataType: 'json', // added data type
        success: function(res) {
            console.log(res);
            var data = res;
            generateNar(input, data)
        }
    });
	
}
function generateNar(input, data){
	var chatCont = document.getElementById("chatcontainter");

	var narLi = document.createElement("li");
	narLi.className = "narImage";
	
	var narImage = document.createElement("img");
	narImage.src = "/static/small3.jpeg";
	
	narLi.appendChild(narImage);
	
	var narResponse = document.createElement("div");
	
	narResponse.className = "narrator";
	narResponse.innerHTML = "Here is something " + input ;
	var articleInfo = data;

	buzzURL = articleInfo["buzzURL"];
	summary = articleInfo["summary"];
	gifURL = articleInfo["gifURL"];
	title = articleInfo["title"];
	console.log(gifURL);
	
	//build story
	var story = document.createElement("div");
	story.className = "story";
	story.innerHTML = title;
	
	var preview = document.createElement("div");
	preview.className = "preview";
	preview.innerHTML = summary;
	
	story.appendChild(preview);
	
	var urlD = document.createElement("div");
	var url = document.createElement("li");
	urlD.className = "url";
	
	var a = document.createElement("a");
	a.href = buzzURL;
	a.innerHTML = "Click here to read the Article:";
	url.appendChild(a);
	urlD.appendChild(url);
	story.appendChild(urlD);
	
	var gif = document.createElement("div");
	gif.className = "gif";
	var gifImage = document.createElement("img");
	gifImage.src = gifURL;
	
	gif.appendChild(gifImage);
	
	story.appendChild(gif);
	
	narResponse.appendChild(story);

	narLi.appendChild(narResponse);
	
	chatCont.appendChild(narLi);
}
