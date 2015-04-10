 //     ____              _        _     _       
 //    / / /__  ___   ___| | _____| |_  (_) ___  
 //   / / / __|/ _ \ / __| |/ / _ \ __| | |/ _ \ 
 //  / / /\__ \ (_) | (__|   <  __/ |_  | | (_) |
 // /_/_/ |___/\___/ \___|_|\_\___|\__| |_|\___/ 
 
 var socket = io();
 
 //     ____   _             _             _            _    
 //    / / /__| |_ __ _ _ __| |_       ___| | ___   ___| | __
 //   / / / __| __/ _` | '__| __|____ / __| |/ _ \ / __| |/ /
 //  / / /\__ \ || (_| | |  | ||_____| (__| | (_) | (__|   < 
 // /_/_/ |___/\__\__,_|_|   \__|     \___|_|\___/ \___|_|\_\


var clockActive = false;
$('#start-clock').click(function(){
	if(clockActive == false){
		//uitvoeren als de klok nog niet aan is.
		$(this).text('Sending request...');
		setTimeout(function(){
			//button veranderen naar stop button
			$("#start-clock").text('Stop typing PLEASE!');
			//klok naar actief zetten
			clockActive = true;
			//verzend data naar socket to save on server (True event)
			socket.emit('clockState','true');
			//debug
			console.log("Clock_on | socketSend");
		},1000);
	}else{
		//uitvoeren als de klok al aan is Uitschakelen.
		//knop omzetten naar start knop
		$(this).text("Start");
		//clock naar nonactief zetten
		clockActive = false;
		//verzend data naar socket to save on server (false event)
		socket.emit('clockState','false');
		//debug
		console.log("Clock_off | socketSend");
	}
});

 //     ____   _             _        _   _                     
 //    / / /__| |_ __ _ _ __| |_     | |_(_)_ __ ___   ___ _ __ 
 //   / / / __| __/ _` | '__| __|____| __| | '_ ` _ \ / _ \ '__|
 //  / / /\__ \ || (_| | |  | ||_____| |_| | | | | | |  __/ |   
 // /_/_/ |___/\__\__,_|_|   \__|     \__|_|_| |_| |_|\___|_|  

//var die bijhoud of dat de robot aan is of uit.
var timerActive = false; //0 or 1
$("#start-timer").click(function() {
	//kijken of dat timer actieif is 
	if(timerActive == false){
		//timer actief do 
		$(this).text('Sending request...');
		//ophalen van de timerTime uit het inputveld
		var timerTime = $('#timer-time').val();
		if(timerTime.length == 0){
			var timerTime = "10:00";
		}else{
			timerTime = timerTime;
		}
		//debug
		console.log(timerTime);
		setTimeout(function(){
			//button text aan passen naar stop knop
			$("#start-timer").text('Stop typing PLEASE!');
			//zet de timer op aan want de timer is nu aan
			timerActive = true;
			//verzend data naar socket to save on server (True event)
			socket.emit('timerState','');
			socket.emit('countDownTime', hmsToSecondsOnly(timerTime));
			//debug
			console.log("Timer_ON | socketSend");
		},1000);
	}else{
		//timer uitschakelen
		//button text aan passen naar start knop
		$(this).text("Start");
		//timer state aan passen naar uit
		timerActive = false;
		//verzend data naar socket to save on server (False event)
		socket.emit('rest','');
		//debug 
		console.log("Timer_OFF | socketSend");
	}
});

function hmsToSecondsOnly(str) {
    var p = str.split(':'),
        s = 0, m = 1;
    while (p.length > 0) {
        s += m * parseInt(p.pop(), 10);
        m *= 60;
    }
    return s;
}