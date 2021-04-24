var context;
var shape = new Object();
var board;
var score;
var pac_color;
var start_time;
var time_elapsed;
var interval;
let song =new Audio("./music/Pac-man-theme-remix.mp3");

$(document).ready(function() {
	// context = canvas.getContext("2d");
	// Start();
});

function Start() {

	//###################################
	// startMusic();
	//####################################


	board = new Array();
	score = 0;
	pac_color = "yellow";
	var cnt = 900;
	var food_remain = 60;
	var good_food_remain = 30;
	var super_food_remain = 10;
	var pacman_remain = 1;
	start_time = new Date();
	for (var i = 0; i < 30; i++) {
		board[i] = new Array();
		//put obstacles in (i=3,j=3) and (i=3,j=4) and (i=3,j=5), (i=6,j=1) and (i=6,j=2)
		for (var j = 0; j < 30; j++) {
			if (
				(i == 3 && j == 3) ||
				(i == 3 && j == 4) ||
				(i == 3 && j == 5) ||
				(i == 6 && j == 1) ||
				(i == 6 && j == 2) ||
				
				(i == 10 && j == 13) ||
				(i == 10 && j == 14) ||
				(i == 15 && j == 23) ||
				(i == 16 && j == 23) ||
				(i == 17 && j == 23) ||
				(i == 10 && j == 23) ||
				(i == 9 && j == 23) ||
				(i == 3 && j == 15) ||
				(i == 4 && j == 3) ||
				(i == 5 && j == 3) ||
				(i == 19 && j == 13) ||
				(i == 19 && j == 14) ||
				(i == 19 && j == 28) ||
				(i == 9 && j == 9) ||
				(i == 8 && j == 9) ||
				(i == 7 && j == 9) 
			) {
				board[i][j] = 4;
			} else {
				var randomNum = Math.random();
				if (randomNum <= (1.0 * food_remain) / cnt) {
					food_remain--;
					board[i][j] = 1;
				} else if (randomNum < (1.0 * (pacman_remain + food_remain)) / cnt) {
					shape.i = i;
					shape.j = j;
					pacman_remain--;
					board[i][j] = 2;
				} else {
					board[i][j] = 0;
				}
				cnt--;
			}
		}
	}
	while (food_remain > 0) {
		var emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = 1;
		food_remain--;
	}
	while (good_food_remain > 0) {
		var emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = 6;
		good_food_remain--;
	}
	while (super_food_remain > 0) {
		var emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = 7;
		super_food_remain--;
	}
	keysDown = {};
	addEventListener(
		"keydown",
		function(e) {
			keysDown[e.keyCode] = true;
		},
		false
	);
	addEventListener(
		"keyup",
		function(e) {
			keysDown[e.keyCode] = false;
		},
		false
	);
	interval = setInterval(UpdatePosition, 75);
}

function findRandomEmptyCell(board) {
	var i = Math.floor(Math.random() * 29 + 1);
	var j = Math.floor(Math.random() * 29 + 1);
	while (board[i][j] != 0) {
		i = Math.floor(Math.random() * 29 + 1);
		j = Math.floor(Math.random() * 29 + 1);
	}
	return [i, j];
}

function GetKeyPressed() {
	if (keysDown[38]) {
		return 1;
	}
	if (keysDown[40]) {
		return 2;
	}
	if (keysDown[37]) {
		return 3;
	}
	if (keysDown[39]) {
		return 4;
	}
}

function Draw() {
	canvas.width = canvas.width; //clean board
	lblScore.value = score;
	lblTime.value = time_elapsed;
	for (var i = 0; i < 30; i++) {
		for (var j = 0; j < 30; j++) {
			var center = new Object();
			center.x = i * 60/3 + 30/3;
			center.y = j * 60/3 + 30/3;
			if (board[i][j] == 2) {
				context.beginPath();
				context.arc(center.x, center.y, 30/3, 0.15 * Math.PI, 1.85 * Math.PI); // half circle
				context.lineTo(center.x, center.y);
				context.fillStyle = pac_color; //color
				context.fill();
				context.beginPath();
				context.arc(center.x + 5/3, center.y - 15/3, 5/3, 0, 2 * Math.PI); // circle
				context.fillStyle = "black"; //color
				context.fill();
			} else if (board[i][j] == 1) {
				context.beginPath();
				context.arc(center.x, center.y, 15/3 *1.2 , 0, 2 * Math.PI); // circle
				context.fillStyle = "black"; //color
				context.fill();
			
			}else if (board[i][j] == 6) {
				context.beginPath();
				context.arc(center.x, center.y, 15/3 * 0.8 , 0, 2 * Math.PI); // circle
				context.fillStyle = "red"; //color
				context.fill();
			} else if (board[i][j] == 7) {
				context.beginPath();
				context.arc(center.x, center.y, 15/3 * 0.6 , 0, 2 * Math.PI); // circle
				context.fillStyle = "green"; //color
				context.fill();
			}
			 else if (board[i][j] == 4) {
				context.beginPath();
				context.rect(center.x - 30/3, center.y - 30/3, 60/3, 60/3);
				context.fillStyle = "#d8dbe4"; //color
				context.fill();
			}
		}
	}
}

function UpdatePosition() {
	board[shape.i][shape.j] = 0;
	var x = GetKeyPressed();
	if (x == 1) {
		if (shape.j > 0 && board[shape.i][shape.j - 1] != 4) {
			shape.j--;
		}
	}
	if (x == 2) {
		if (shape.j < 29 && board[shape.i][shape.j + 1] != 4) {
			shape.j++;
		}
	}
	if (x == 3) {
		if (shape.i > 0 && board[shape.i - 1][shape.j] != 4) {
			shape.i--;
		}
	}
	if (x == 4) {
		if (shape.i < 29 && board[shape.i + 1][shape.j] != 4) {
			shape.i++;
		}
	}
	if (board[shape.i][shape.j] == 1) {
		score = score +5;
	}
	if (board[shape.i][shape.j] == 6) {
		score = score +15;
	}
	if (board[shape.i][shape.j] == 7) {
		score = score +25;
	}
	board[shape.i][shape.j] = 2;
	var currentTime = new Date();
	time_elapsed = (currentTime - start_time) / 1000;
	if (score >= 100 && time_elapsed <= 10) {
		pac_color = "green";
	}
	if (score >= 300) {
		Draw();
		song.pause();
		window.clearInterval(interval);
		window.alert("Winner!!!");
	} else {
		Draw();
	}
}


// #######################################################
var divs = ["gamePage", "Register", "Login", "Welcome", "Settings"];



var visibleDivId = null;
function showPage(divId) {
	if(!visibleDivId === divId) {
	visibleDivId = null;
	}
	else
	{
	visibleDivId = divId;
	}
	hideNonVisibleDivs();
	if (divId === "Settings"){
		document.getElementById("Settings").style.marginLeft = "";
	}
	if (divId === "gamePage"){
	showSettingsRight();
	context = canvas.getContext("2d");
	Start();
	}
	else{
	pauseSong();
	}	
}
function hideNonVisibleDivs() {
	var i, divId, div;
	for(i = 0; i < divs.length; i++) {
	divId = divs[i];
	div = document.getElementById(divId);
	if(visibleDivId === divId) {
		div.style.display = "block";
	} else {
		div.style.display = "none";
	}
	}
}

function startMusic() {
	song.currentTime=0
	song.loop = true;
	togglePlay();
}

function togglePlay() {
	song.volume = 0.1;
	return song.paused ? song.play() : song.pause();
  };


function resetRegisterForm(){
	document.getElementById("RegisterForm").reset();
	var error = document.getElementsByClassName("error");
	[...error].forEach(element => {
		element.classList.remove("error");
		element.innerHTML = "";
	})

	showPage('Register');
}

function showSettingsRight(){
	set = document.getElementById("Settings");
	// set.style.marginLeft = "55%";
	// set.style.width = "50%";
	set.style.display = "block";

}