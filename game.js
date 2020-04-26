$( document ).ready(
	
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
	if (sessionStorage.getItem(id) == 1) {
		alert("done");
	} else {
		window.location.href = id+'.html';
	}
}

function complete(city) {
	sessionStorage.setItem(city,1);
	window.location.href = 'location.html';
}

function restart() {
	if (confirm("Every challenge will be reset. You sure huh?")) {
		window.location.href = 'index.html';
	}
}