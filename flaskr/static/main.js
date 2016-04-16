

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
	var nar= document.getElementById("narrator");

	var formattingU = ">: ";
	var formattingN = "[]: ";
	var userChat = document.getElementById("chat").value;
	nar.appendChild(linebreak);
	var url = "http://localhost:5000/find/" + userChat;
	var buzzURL	= httpGet(url);


	nar.innerHTML += formattingU + userChat;
	nar.appendChild(linebreak);
	nar.innerHTML += formattingN + buzzURL;
	//console.log(userChat);
	
}