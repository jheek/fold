var games = ["RBYY", "BRGG", "GGYR", "BYYB", "BRYY", "RBGG", "GGYB", "BYYR", "RBGY", "RRGG", "RYYB", "RRGY", "RYBR", "RBYR", "BYGG", "RRYY", "BYYG", "BBYR", "RRYG", "BBGY", "RRYB", "RRBY", "GGGY", "RYYR", "BYBB", "RGYR", "RRBB", "RGGY", "BGYR", "BYBG", "RYBG", "BGYB", "RBBG", "BGYY", "RRBG", "BGGY", "YRGY", "RBRR", "YRYY", "YRYG", "YRYB", "RYRR", "RGRR", "RBYG", "BBGG", "BRGY", "BBYG", "BYGR", "RGYB", "YGGB", "BRYG", "BBYY", "YYGG", "YYYG", "RBGR", "BBGR", "YRGB", "BRYB", "BRBB", "RGYY", "YYYB", "GGGR", "RGGR", "BYGB", "BRBG", "BBBG", "BGGR", "BGGB", "GGGB", "RYRB", "RYGG", "RYBB", "RYGB", "RRGB", "GYGB", "YYGB", "BYRB", "YGGY", "YBGY", "YGGR", "YBGR", "BRRG", "RYRG", "BBRG", "BYRG", "RYYG", "BYBR", "RGGB", "YGYB", "BRGB", "RBRG", "RBBR", "RYGR", "GRYY", "GRGY", "GRGB"];
var game;
var previous_game = "AAAA"
var hidden_part;
var hidden_part_checked;
var time = 0;
var progress_speed;
var progress_width;
var buzz = new Audio("buzz.mp3");
var drum = new Audio("drumroll.wav");
var tick = new Audio("tick.mp3");

function start_game() {
	if(time == 0) {
		game = games[Math.floor(Math.random()*games.length)];
		if(game != previous_game) {
			previous_game = game;
			if(document.getElementById("hidden_part_check").checked) {
				hidden_part_checked = true;
				hidden_part = Math.floor(Math.random()*4);
				paint_all();
			} else {
				hidden_part_checked = false;
				paint(0);
				paint(1);
				paint(2);
				paint(3);
			}
			time = parseInt(document.getElementById("game_time").value);
			progress_speed = 250 / (parseInt(document.getElementById("game_time").value) - 1);
			progress_width = 0;
			ticker();
			timer();
			buzz.play();
			document.getElementById("start_button").value = "stop";
		} else {
			start_game();
		}
	} else {
		time = 0;
		tick_speed = 1000;
		document.getElementById("progress").style.width = "0px"
		document.getElementById("left_square").style.backgroundColor = "white";
		document.getElementById("left_circle").style.backgroundColor = "white";
		document.getElementById("right_square").style.backgroundColor = "white";
		document.getElementById("right_circle").style.backgroundColor = "white";
		document.getElementById("start_button").value = "start";
		document.getElementById("timer").value = "...";
	}
}

function timer() {
	if(time != 0) {
		time--;
		document.getElementById("timer").value = time;
		if(time == 0) {
			if(hidden_part_checked) {
				drum.play();
				setTimeout("paint(hidden_part)", 4000);
				document.getElementById("start_button").value = "start";
			} else {
				buzz.play();
				document.getElementById("start_button").value = "start";
				document.getElementById("timer").value = "...";
			}
		} else {
			setTimeout("timer()", 1000);
		}
	}
}

function ticker() {
	if(time != 0) {
		tick.play()
		setTimeout("ticker()", 500);
		progress_width += progress_speed;
		document.getElementById("progress").style.width = progress_width + "px";
	}
}

function paint_all() {
	if(hidden_part == 0) {
		document.getElementById("left_square").style.backgroundColor = "white";
	} else if(hidden_part == 1) {
		document.getElementById("left_circle").style.backgroundColor = "white";
	} else if(hidden_part == 2) {
		document.getElementById("right_square").style.backgroundColor = "white";
	} else if(hidden_part == 3) {
		document.getElementById("right_circle").style.backgroundColor = "white";
	}
	if(hidden_part == 0) {
		paint(1);
		paint(2);
		paint(3);
	} else if(hidden_part == 1) {
		paint(0);
		paint(2);
		paint(3);
	} else if(hidden_part == 2) {
		paint(0);
		paint(1);
		paint(3);
	} else if(hidden_part == 3) {
		paint(0);
		paint(1);
		paint(2);
	}
}

function paint(part) {
		if(part == 0) {
			var id = "left_square";
		} else if(part == 1) {
			var id = "left_circle";
		} else if(part == 2) {
			var id = "right_square";
		} else if(part == 3) {
			var id = "right_circle";
		}
		if(game.charAt(part) == "B") {
			document.getElementById(id).style.backgroundColor = "blue";
		} else if(game.charAt(part) == "G") {
			document.getElementById(id).style.backgroundColor = "green";
		} else if(game.charAt(part) == "R") {
			document.getElementById(id).style.backgroundColor = "red";
		} else if(game.charAt(part) == "Y") {
			document.getElementById(id).style.backgroundColor = "yellow";
		}
}

function scoreboard(sum, id) {
	var value = document.getElementById(id).value;
	var new_value = parseInt(value) + sum;
	if(new_value < 0) {
		new_value = 0;
	}
	document.getElementById(id).value = new_value;
}