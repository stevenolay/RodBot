var user_count = 0
var nar_count = 0
var flag = false;

$(document).keypress(function(e) {
    if(e.which == 13) {
        findArticle2()
    }
});

function checkDOMChange()
{
    // check for any new element being inserted here,
    // or a particular node being modified
	if (flag != false) {
		var element = document.getElementById("chat");
		if (element.scrollTop != element.scrollHeight) {
			element.scrollTop = element.scrollHeight;
		}
	}
    // call the function again after 100 milliseconds

		setTimeout(checkDOMChange, 100);

}
checkDOMChange()

function updateScroll(){
	var element = document.getElementById("chat");
	element.scrollTop = element.scrollHeight;
}
function findArticle2(){ 
	var input = document.getElementById("inputBox").value;
	if (input != ""){
		document.getElementById("inputBox").value = "";
		generateUser(input);
		updateScroll();
		}
}
function narratorSpeaks(input){ //Generate and fill Narrator speech bubble 
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
	var textNode = document.createTextNode("Okay. Let me see if I can find something " + input + " for you.");
	par.appendChild(textNode);

	typedStrings.appendChild(par);

	narResponse.appendChild(typedStrings);

	span = document.createElement("span");
	var nar_span = "nar_typed" + nar_count;
	span.id = nar_span;

	narResponse.appendChild(span);

	narLi.appendChild(narResponse);

	chatCont.appendChild(narLi);
	makeTypeNar(nar_strings,nar_span, input);
	nar_count += 1;
}
function generateUser(input){ //Generate and Fill user speech bubble
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

	makeType(user_strings, user_span, input);
	user_count += 1;
}

//All functions below are JQUERY Typed.js function calls
function makeType(strings, typed, input){
	flag = true;
	$("#" + typed).typed({
		stringsElement: $('#' + strings),
		typeSpeed: 30,
		backDelay: 500,
		loop: false,
		contentType: 'html', // or text
		// defaults to false for infinite loop
		loopCount: false,
		callback: function(){
			var judge = input.split(" ");
			if(judge.length > 1){
				narratorSpeaksReloader(null, input, ["You asked for that much! Just one word plz :("],0 ,0);
				//narSpeakError("You asked for that much! Just one word plz :(");
			} else {
				narratorSpeaks(input);
			}
			updateScroll();
		}
	});
}
function makeTypeNar(strings, typed, input){
	flag = true;
	$("#" + typed).delay(1000).typed({

		stringsElement: $('#' + strings),
		typeSpeed: 30,
		backDelay: 500,
		loop: false,
		contentType: 'html', // or text
		// defaults to false for infinite loop
		loopCount: false,
		callback: function(){
			var judge = input.split(" ");
			if(judge.length > 1) {return}
			makeCall(input);
			updateScroll();
			flag=false;
		}
	});

}
function makeCall(input){
	//var url = "http://rcs-webportal-dev-corpulentgowk.c9users.io:8080/find/" + input;
	var url = "http://localhost:5000/find/" + input;
	$.ajax({
        url: url,
        type: 'GET',
        dataType: 'json', // added data type
        success: function(res) {
            var data = res;
            if(data['title']==""){
            	narratorSpeaksReloader(null, input, ["Sorry didn't catch you. What did you say?"],0 ,0);
            }
            else {
				narratorSpeaksReloader(data, input, data['story'],0 ,data['story'].length);
			}
        }
    });
}


function generateNar(input, data){ //Generate and fill narrator speech bubble
	if(data==null) return
	var chatCont = document.getElementById("chatcontainter");

	var narLi = document.createElement("li");
	narLi.className = "narImage";
	
	var narImage = document.createElement("img");
	narImage.src = "/static/small3.jpeg";
	
	narLi.appendChild(narImage);
	
	var narResponse = document.createElement("div");
	
	narResponse.className = "narrator";
	//narResponse.innerHTML = "Here is something " + input ;

	var articleInfo = data;

	buzzURL = articleInfo["buzzURL"];
	summary = articleInfo["summary"];
	gifURL = articleInfo["gifURL"];
	title = articleInfo["title"];
	
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
function makeTypeNarReloader(strings, typed, data, input,story, cur_index, steps){
	flag = true;
	$("#" + typed).delay(1000).typed({

		stringsElement: $('#' + strings),
		typeSpeed: 30,
		backDelay: 500,
		loop: false,
		contentType: 'html', // or text
		// defaults to false for infinite loop
		loopCount: false,
		callback: function(){
			if (cur_index < steps){
				narratorSpeaksReloader(data, input, story, cur_index, steps);
			}
			else{
				flag = false;
				generateNar(input, data);
			}
			updateScroll();
		}
	});



}
function narratorSpeaksReloader(data, input, story, curr_index, steps){
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

	var textNode = document.createTextNode(story[curr_index]);
	par.appendChild(textNode);

	typedStrings.appendChild(par);

	narResponse.appendChild(typedStrings);

	span = document.createElement("span");
	var nar_span = "nar_typed" + nar_count;
	span.id = nar_span;

	narResponse.appendChild(span);

	narLi.appendChild(narResponse);

	chatCont.appendChild(narLi);
	var new_index = curr_index + 1
	makeTypeNarReloader(nar_strings,nar_span, data, input, story, new_index, steps);
	nar_count += 1;
}
