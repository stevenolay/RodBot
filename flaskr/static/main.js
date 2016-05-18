
var user_count = 0
var nar_count = 0
function findArticle(args){

	var adj = document.getElementById("chat").value
	console.log(adj)
	window.location = adj
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
}
function narratorSpeaks(input, data, i){
	var chatCont = document.getElementById("chatcontainter");

	var narLi = document.createElement("li");
	narLi.className = "narImage";

	var narImage = document.createElement("img");
	narImage.src = "/static/small3.jpeg";

	narLi.appendChild(narImage);

	var narResponse = document.createElement("div");

	narResponse.className = "narrator";

	var typedStrings =  document.createElement("div");
	var nar_strings = "nar_strings" + nar_count;
	typedStrings.id = nar_strings;

	var par = document.createElement("p");
	var storyboard = data["storyboard"];
	var index = i;
	var textNode = document.createTextNode(storyboard[index]);
	par.appendChild(textNode);

	typedStrings.appendChild(par);

	narResponse.appendChild(typedStrings);

	span = document.createElement("span");
	var nar_span = "nar_typed" + nar_count;
	span.id = nar_span;

	narResponse.appendChild(span);

	narLi.appendChild(narResponse);

	chatCont.appendChild(narLi);
	updateScroll();

	//console.log(index);
	index += 1;
	if(index == storyboard.length)
		makeTypeNar(nar_strings,nar_span, input, data);
	else
		makeNarSpeak(nar_strings,nar_span, input, data, index);
	updateScroll();
	nar_count += 1;
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

	var typedStrings =  document.createElement("div");
	var user_strings = "user_strings" + user_count;
	typedStrings.id = user_strings;

	var par = document.createElement("p");
	var textNode = document.createTextNode("Tell me something " + input);
	par.appendChild(textNode);

	typedStrings.appendChild(par);

	userResponse.appendChild(typedStrings);

	var span = document.createElement("span");
	var user_span = "user_typed" + user_count;
	span.id = user_span;

	userResponse.appendChild(span);
	userLi.appendChild(userResponse);
	chatCont.appendChild(userLi);

	updateScroll();
	makeType(user_strings, user_span, input);
	user_count += 1;
}

function makeType(strings, typed, input){
	$("#" + typed).typed({
		stringsElement: $('#' + strings),
		typeSpeed: 30,
		backDelay: 500,
		loop: false,
		contentType: 'html', // or text
		// defaults to false for infinite loop
		loopCount: false,
		callback: function(){ makeCall(input); }
		//callback: function(){ narratorSpeaks(input), updateScroll(); }
	});
}
function makeTypeNar(strings, typed, input, data){
	$("#" + typed).delay(1000).typed({
		stringsElement: $('#' + strings),
		typeSpeed: 30,
		backDelay: 500,
		loop: false,
		contentType: 'html', // or text
		// defaults to false for infinite loop
		loopCount: false,
		callback: function(){
			updateScroll(),
            generateNar(input, data),
            updateScroll();
		}
	});

}
function makeCall(input){
	//var url = "http://rcs-webportal-dev-corpulentgowk.c9users.io:8080/find/" + input;
	var url = "/find/" + input;
	$.ajax({
        url: url,
        type: 'GET',
        dataType: 'json', // added data type
        success: function(res) {
            console.log(res);
            var data = res;
			narratorSpeaks(input, data, 0);
			updateScroll();
            //generateNar(input, data)
        }
    });
}
function makeNarSpeak(strings, typed, input, data, i){
	$("#" + typed).delay(1000).typed({
		stringsElement: $('#' + strings),
		typeSpeed: 30,
		backDelay: 500,
		loop: false,
		contentType: 'html', // or text
		// defaults to false for infinite loop
		loopCount: false,
		callback: function(){
			updateScroll(),
			narratorSpeaks(input, data, i),
			updateScroll();
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
	console.log(articleInfo['classification']);
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
	updateScroll();
}
