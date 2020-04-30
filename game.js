$( document ).ready(
);

var daejeon=[];

var bandung=[
{
	"city": "bandung",
	"author": "Alvin",
	"question": "Cue cheese angry erm",
	"answer": "Cookies and cream",
	"hint": "It's a type of flavour!"
},
{
	"city": "bandung",
	"author": "Alvin",
	"question": "Eye ammo knicker",
	"answer": "I am Monica",
	"hint": "Who are you?"
}
];

var penang=[];

var kl=[];


function main() {
	sessionStorage.clear();
	sessionStorage.setItem("bandung",0);
	sessionStorage.setItem("daejeon",0);
	sessionStorage.setItem("penang",0);
	sessionStorage.setItem("kl",0);
	window.location.href = 'location.html';
}

function checkcity(id) {
	var city = id[0]["city"];
	if (sessionStorage.getItem(city) == id.length) {
		if(confirm("The challenge in this city is complete ady! \nProceed if you just wanna see your result.")) {
			window.location.href = city+'.html';
		}
	} else {
		window.location.href = city+'.html';
	}
}

function complete(city) {
	window.location.href = 'location.html';
}

function restart() {
	if (confirm("Every challenge will be reset. You sure huh?")) {
		window.location.href = 'index.html';
	}
}

function ablefinish() {
	if (sessionStorage.getItem("bandung") == bandung.length &&  sessionStorage.getItem("daejeon") == daejeon.length && sessionStorage.getItem("penang") == penang.length && sessionStorage.getItem("kl") == kl.length) {
		$("#location").append('<button class="mainbutton" onClick="finish()"><span>Yayy! Go to Finish!</span></button>');
	} else {
		$("#location").append('<button class="mainbutton" onClick="restart()"><span>Restart everything</span></button>');
	}
}

function loadques(city,seq) {
	$( "#question" ).empty();
	if (seq >= city.length) {
		$( "#question" ).append('<div class="row"><div class="column"><img src="img/onion.png" width="200" height="180"></div><div class="column"><p class="message" align="left">What?! You completed it?!<br>Don\'t get relaxed!<br>I will be back.. HAHAHA</p></div></div><br><br><button class="mainbutton" onClick="complete()"><span>Go back to map</span></button>');
	} else {
		$( "#question" ).append('<p class="ques">Question '+(seq+1).toString()+': '+city[seq]["question"]+'</p><p class="gochi">Your Answer:</p>');
		console.log(sessionStorage.getItem(city[seq]["city"]));
		if ((seq+1)>sessionStorage.getItem(city[seq]["city"])) {
			var check =city[seq]["answer"];
			$( "#question" ).append('<input type="text"  id="submit" class="answer"><br><br><button class="submitbutton" onclick="checkanswer(\''+check+'\','+city[seq]["city"]+','+seq+')">Submit</button>');
		} else {
			$( "#question" ).append('<p class="gochi">'+city[seq]["answer"]+'</p>');
			console.log("hi");
			$( "#question" ).append('<button class="submitbutton" onclick="loadques('+city[seq]["city"]+','+(seq+1).toString()+')">Next</button>');
		}
	}
}

function checkanswer(answer,city,seq) {
	var check = document.getElementById("submit").value;
	if (check.split(' ').join('').toLowerCase() == answer.split(' ').join('').toLowerCase()) {
		sessionStorage.setItem(city[seq]["city"],seq+1);
		loadques(city,seq+1);
	} else {
		alert("wrong!");
	}
}