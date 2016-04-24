

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
/*

*/

function findArticle2(){
	linebreak = document.createElement("br");
	var elem = document.createElement("img");
	var nar= document.getElementById("narrator");

	var formattingU = "[]: ";
	var formattingN = ">: ";
	var userChat = document.getElementById("chat").value;
	
	nar.appendChild(linebreak);
	var url = "http://localhost:5000/find/" + userChat;
	var articleInfo	= JSON.parse(httpGet(url));
	
	buzzURL = articleInfo["buzzURL"];
	summary = articleInfo["summary"];
	gifURL = articleInfo["gifURL"];
	console.log(gifURL);

	nar.innerHTML += formattingU + userChat;
	nar.appendChild(linebreak);
	nar.appendChild(linebreak); //Extraneous linebreak
	nar.innerHTML += formattingN 
	nar.innerHTML += summary;
	nar.appendChild(linebreak);
	nar.appendChild(elem);
	elem.src = gifURL;
	
	nar.appendChild(linebreak);
	nar.innerHTML += "Find the article here: " + buzzURL;

	//console.log(userChat);
	
}