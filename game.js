$( document ).ready(
function showalert(num) {
	if (num == 0) {
		$( "#correct" ).dialog({
			autoOpen:false,
			modal: true,
			buttons: {
				Ok: function() {
					$( this ).dialog( "close" );
			}
		  }
		});
	} else if (num == 1) {
		$( "#wrong" ).dialog({
			autoOpen:false,
			modal: true,
			buttons: {
				Ok: function() {
					$( this ).dialog( "close" );
			}
		  }
		});
	} else {
		$( "#help" ).dialog({
			autoOpen:false,
			modal: true,
			buttons: {
				Ok: function() {
				  $( this ).dialog( "close" );
			}
		  }
		});
	}
}

function lastmission() {
    $( "#lastmission" ).dialog({
	  autoOpen:false,
      resizable: false,
      height: "auto",
      width: 400,
      modal: true,
      buttons: {
        "Yes, I got it and I will go now!": function() {
			$( this ).dialog( "close" );
			window.location.href = 'final.html';
        },
        Cancel: function() {
			$( this ).dialog( "close" );
			window.location.href = 'location.html';
        }
      }
    });
}

);


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
		$("#location").append('<button class="finishbutton" onClick="finish()"><span>Yayy! Go to Finish!</span></button>');
	} else {
		$("#location").append('<button class="mainbutton" onClick="restart()"><span>Restart everything</span></button>');
	}
}

function finish() {
	window.location.href = 'final.html';
}

function loadques(city,seq) {
	$( "#question" ).empty();
	if (seq >= city.length) {
		$( "#question" ).append('<div class="row"><div class="column"><img src="img/onion.png" width="200" height="180"></div><div class="column"><p class="message" align="left"><br><br>What?! You completed it?!<br>Don\'t get relaxed!<br>I will be back.. HAHAHA</p></div></div><br><br><button class="mainbutton" onClick="complete()"><span>Go back to map</span></button>');
	} else {
		$( "#question" ).append('<p class="ques">Question '+(seq+1).toString()+': '+city[seq]["question"]+'</p><p class="gochi">a question by ~ '+city[seq]["author"]+' ~</p><br><p class="gochi">Your Answer:</p>');
		if ((seq+1)>sessionStorage.getItem(city[seq]["city"])) {
			var check =city[seq]["answer"];
			$( "#question" ).append('<input type="text"  id="submit" class="answer" autocomplete="off"><button class="submitbutton" onclick="checkanswer(\''+check+'\','+city[seq]["city"]+','+seq+')">Submit</button><p class="hint" id="hint"></p>');
		} else {
			$( "#question" ).append('<p class="gochi" style="display:inline">'+city[seq]["answer"]+'&nbsp;&nbsp;&nbsp;</p><button class="submitbutton" onclick="loadques('+city[seq]["city"]+','+(seq+1).toString()+')">Next</button>');
		}
	}
}

var count = 0;

function checkanswer(answer,city,seq) {
	var check = document.getElementById("submit").value;
	if (check.replace(/'/g, '').split(' ').join('').toLowerCase() == answer.split(' ').join('').toLowerCase()) {
		sessionStorage.setItem(city[seq]["city"],seq+1);
		count=0;
		showalert(0);
		loadques(city,seq+1);
	} else {
		count++;
		if (count >= 3) {
			showalert(2);
		}
		showalert(1);
		if (count >= 1) {
			$( "#hint" ).empty();
			$( "#hint" ).append('Hint: '+city[seq]["hint"]);
		}
	}
}




