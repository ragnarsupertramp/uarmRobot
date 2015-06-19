function launchIntoFullscreen(element) {
	if(element.requestFullscreen) {
		element.requestFullscreen();
	} else if(element.mozRequestFullScreen) {
		element.mozRequestFullScreen();
	} else if(element.webkitRequestFullscreen) {
		element.webkitRequestFullscreen();
	} else if(element.msRequestFullscreen) {
		element.msRequestFullscreen();
	}
}

var locked = false;    
var time = "";
var socket = io();

function timepress(){
	window.addEventListener('keydown',function(e){if(e.keyIdentifier=='U+0008'||e.keyIdentifier=='Backspace'){if(e.target==document.body){e.preventDefault();}}},true);
	$(document).keydown(function(e) {
		if( locked ){
			console.log("locked");
			return;
		}

		if (e.keyCode == 96) {
			//0
			time = time + "0";
		}
		if(e.keyCode == 97){
			//1
			time = time + "1";          
		}
		if(e.keyCode == 98){
			//2
			time = time + "2";
		}
		if(e.keyCode == 99){
			//3
			time = time + "3";
		}
		if(e.keyCode == 100){
			//4
			time = time + "4";
		}
		if(e.keyCode == 101){
			//5
			time = time + "5";
		}
		if(e.keyCode == 102){
			//6
			time = time + "6";
		}
		if(e.keyCode == 103){
			//7
			time = time + "7";
		}
		if(e.keyCode == 104){
			//8
			time = time + "8";
		}
		if(e.keyCode == 105){
			//9
			time = time + "9";
		}
		if(e.keyCode == 110){
			//.
			var n = time.search(":");
			if(n == -1){
				time = time + ":";
			}else{
				time = time + "";
			}
		}

		if(e.keyCode == 8){
			//backspace
			time = "";
		}

		socket.emit('updateBrowserInput', time);

		console.log(time);
		$("#kaliberbot--index--clock").html(time);
		locked = true;
		setTimeout(function() { 
			locked = false; 
		}, 500);
	});
}