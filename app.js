var context;
var shape = new Object();
var board;
var score;
var pac_color;
var start_time;
var time_elapsed;
var interval;

let pacmanLives;
let timerInterval;
let timer;
let timeFromUser;
let song =new Audio("./music/Pac-man-theme-remix.mp3");
let buzzer =new Audio("./music/wrong-answer.mp3");
let trombone =new Audio("./music/sadtrombone.mp3");
let clock_ticking =new Audio("./music/clock-ticking.mp3");
let heart_gain =new Audio("./music/heart_gain.mp3");
let eat_sound =new Audio("./music/arcade-eat.mp3");
let tada =new Audio("./music/Tada.mp3");



let pacX;
let pacY;
let duplicateBoard;

let keyPressed;
let newKey;

let colorSmallBall;
let colorMediumBall;
let colorLargeBall;
let numOfBalls;


let timerImage = document.createElement('img');
timerImage.src = 'images/timer2.png';

let heartImage = document.createElement('img');
heartImage.src = 'images/heart.png';

let ghost1 = document.createElement('img');
ghost1.src = 'images/ghost.png';
let ghost2 = document.createElement('img');
ghost2.src = 'images/ghost1.png';
let ghost3 = document.createElement('img');
ghost3.src = 'images/ghost2.png';
let ghost4 = document.createElement('img');
ghost4.src = 'images/ghost3.png';

let ghostList = [ghost1, ghost2, ghost3, ghost4];
let numOfGhost;
let countGhost = 0;
let ghostPosition;
let ghostInterval;



$(document).ready(function() {
	// context = canvas.getContext("2d");
	// Start();
});

function Start() {

	//###################################
	startMusic();
	//####################################

	window.clearInterval(timerInterval);
	window.clearInterval(interval);
	window.clearInterval(ghostInterval);


	// timeFromUser = 60;
	// numOfBalls = 90;
	// numOfGhost = 4;
	// colorSmallBall = "blue"
	// colorMediumBall = "black"
	// colorLargeBall = "orange"


	countGhost = 0;
	ghostPosition = [];

	timer = timeFromUser;
	
	pacmanLives = 5;
	keyPressed = 0;

	let ghostRemain = numOfGhost;
	let timerFoodRamain = 7;
	let heartRemain = 6;

	board = new Array();
	duplicateBoard = new Array();
	score = 0;
	pac_color = "yellow";
	var cnt = 900;
	
	var food_remain = Math.round(0.6*numOfBalls);
	var good_food_remain = Math.round(0.3*numOfBalls);
	var super_food_remain = Math.round(0.1*numOfBalls);
	while ( food_remain + good_food_remain + super_food_remain < numOfBalls){ food_remain++ }

	var pacman_remain = 1;
	// start_time = new Date();
	for (var i = 0; i < 30; i++) {
		board[i] = new Array();
		duplicateBoard[i] = new Array();
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
				(i == 7 && j == 9) ||

				(i == 16 && j == 25) ||
				(i == 16 && j == 24) ||
				(i == 19 && j == 15) ||
				(i == 20 && j == 15) ||
				(i == 21 && j == 15) ||
				(i == 3 && j == 25) ||
				(i == 4 && j == 25) ||
				(i == 5 && j == 25) ||
				(i == 11 && j == 11) ||
				(i == 12 && j == 11) ||
				(i == 20 && j == 20) ||
				(i == 20 && j == 21) ||
				(i == 20 && j == 22) ||
				(i == 19 && j == 21) ||
				(i == 29 && j == 11) ||
				(i == 28 && j == 11) ||

				(i == 26 && j == 3) ||
				(i == 26 && j == 4) ||
				(i == 26 && j == 5) ||
				(i == 27 && j == 4) ||
				(i == 28 && j == 5) ||
				(i == 25 && j == 7) ||
				(i == 24 && j == 8) ||
				(i == 23 && j == 10) ||
				(i == 24 && j == 10) ||
				(i == 26 && j == 11) ||

				(i == 3 && j == 11) ||
				(i == 4 && j == 11) ||
				(i == 5 && j == 15) ||
				(i == 6 && j == 13) ||
				(i == 3 && j == 18) ||
				(i == 7 && j == 18) ||
				(i == 6 && j == 9) ||
				(i == 4 && j == 16) ||
				(i == 2 && j == 16) ||
				(i == 5 && j == 11) ||

				(i == 14 && j == 2) ||
				(i == 15 && j == 2) ||
				(i == 11 && j == 3) ||
				(i == 12 && j == 3) ||
				(i == 18 && j == 4) ||
				(i == 16 && j == 5) ||
				(i == 17 && j == 5) ||
				(i == 19 && j == 6) ||
				(i == 15 && j == 5) ||
				(i == 9 && j == 3) ||
				
				(i == 26 && j == 26) ||
				(i == 26 && j == 28) ||
				(i == 26 && j == 25) ||
				(i == 27 && j == 22) ||
				(i == 28 && j == 25) ||
				(i == 25 && j == 25) ||
				(i == 24 && j == 23) ||
				(i == 23 && j == 26) ||
				(i == 24 && j == 28) ||
				(i == 26 && j == 24) ||

				(i == 26 && j == 16) ||
				(i == 26 && j == 17) ||
				(i == 26 && j == 18) ||
				(i == 27 && j == 20) ||
				(i == 28 && j == 15) ||
				(i == 25 && j == 15) ||
				(i == 24 && j == 14) ||
				(i == 23 && j == 14) ||
				(i == 24 && j == 15) ||
				(i == 26 && j == 14) ||
				
				(i == 0 && j == 10) ||
				(i == 1 && j == 10) ||
				(i == 2 && j == 10) ||
				(i == 0 && j == 20) ||
				(i == 1 && j == 20) ||
				(i == 3 && j == 22) ||
				(i == 0 && j == 25) ||
				(i == 1 && j == 26) ||
				(i == 3 && j == 27) ||
				(i == 1 && j == 28) ||
				(i == 23 && j == 0) ||
				(i == 23 && j == 1) ||
				(i == 23 && j == 2) ||
				(i == 23 && j == 3) ||

				(i == 15 && j == 15) ||
				(i == 16 && j == 15) ||
				(i == 15 && j == 16) ||
				(i == 17 && j == 15) ||

				(i == 9 && j == 29) ||
				(i == 9 && j == 28) ||
				(i == 9 && j == 27) ||
				(i == 9 && j == 26) ||
				(i == 15 && j == 29) ||
				(i == 15 && j == 28) ||
				(i == 15 && j == 27) 

				
			) {
				board[i][j] = 4;
				duplicateBoard[i][j] = 4;

			} else {
				var randomNum = Math.random();
				if (randomNum <= (1.0 * food_remain) / cnt) {
					food_remain--;
					board[i][j] = 5;
					duplicateBoard[i][j] = 5;
				} else if (randomNum < (1.0 * (pacman_remain + food_remain)) / cnt) {
					shape.i = i;
					shape.j = j;
					pacX = i;
					pacY = j;
					pacman_remain--;
					board[i][j] = 2;
					duplicateBoard[i][j] = 0;

				} else {
					board[i][j] = 0;
					duplicateBoard[i][j] = 0;

				}
				cnt--;
			}
		}
	}
	while (food_remain > 0) {
		var emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = 5;
		duplicateBoard[emptyCell[0]][emptyCell[1]] = 5;

		food_remain--;
	}
	while (good_food_remain > 0) {
		var emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = 6;
		duplicateBoard[emptyCell[0]][emptyCell[1]] = 6;

		good_food_remain--;
	}
	while (super_food_remain > 0) {
		var emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = 7;
		duplicateBoard[emptyCell[0]][emptyCell[1]] = 7;

		super_food_remain--;
	}

	while (timerFoodRamain > 0) {
		var emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = 11;
		duplicateBoard[emptyCell[0]][emptyCell[1]] = 11;

		timerFoodRamain--;
	}

	while (heartRemain > 0) {
		var emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = 13;
		duplicateBoard[emptyCell[0]][emptyCell[1]] = 13;

		heartRemain--;
	}

	while (ghostRemain > 0) {
		var emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = 20;
		duplicateBoard[emptyCell[0]][emptyCell[1]] = 20;

		ghostPosition.push(emptyCell)
		ghostRemain--;
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
	interval = setInterval(UpdatePosition, 180);
	timerInterval = setInterval(oneSecond, 1000);
	ghostInterval = setInterval(UpdateGhost, 230)

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
	if (keysDown[movementKeys["up"]]) { //up
		return 1;
	}
	if (keysDown[movementKeys["down"]]) { //down
		return 2;
	}
	if (keysDown[movementKeys["left"]]) { //left
		return 3;
	}
	if (keysDown[movementKeys["right"]]) { //right
		return 4;
	}
	else{
		return keyPressed;
	}
}

function Draw() {
	canvas.width = canvas.width; //clean board
	lblScore.value = score;
	lblTime.value = timer;
	lbllives.value = pacmanLives;

	for (var i = 0; i < 30; i++) {
		for (var j = 0; j < 30; j++) {
			var center = new Object();
			center.x = i * 60/3 + 30/3;
			center.y = j * 60/3 + 30/3;
			if (board[i][j] == 2) {

				if (keyPressed == 1){  //up
					context.beginPath();
					context.arc(center.x, center.y, 30/3, 1.65 * Math.PI, 1.35 * Math.PI); // half circle
					context.lineTo(center.x, center.y);
					context.fillStyle = pac_color; //color
					context.fill();
					context.beginPath();
					context.arc(center.x + 15/3, center.y + 2/3, 5/3, 0, 2 * Math.PI); // circle
					context.fillStyle = "black"; //color
					context.fill();
				} else if (keyPressed == 2){ // down
					context.beginPath();
					context.arc(center.x, center.y, 30/3, 0.65 * Math.PI, 0.35 * Math.PI); // half circle
					context.lineTo(center.x, center.y);
					context.fillStyle = pac_color; //color
					context.fill();
					context.beginPath();
					context.arc(center.x - 15/3, center.y + 2/3, 5/3, 0, 2 * Math.PI); // circle
					context.fillStyle = "black"; //color
					context.fill();
				} else if (keyPressed == 3){ //left
					context.beginPath();
					context.arc(center.x, center.y, 30/3, 1.15 * Math.PI,  0.85 * Math.PI); // half circle
					context.lineTo(center.x, center.y);
					context.fillStyle = pac_color; //color
					context.fill();
					context.beginPath();
					context.arc(center.x - 5/3, center.y - 15/3, 5/3, 0, 2 * Math.PI); // circle
					context.fillStyle = "black"; //color
					context.fill();
				} else { 					//right
					context.beginPath();
					context.arc(center.x, center.y, 30/3, 0.15 * Math.PI, 1.85 * Math.PI); // half circle
					context.lineTo(center.x, center.y);
					context.fillStyle = pac_color; //color
					context.fill();
					context.beginPath();
					context.arc(center.x + 5/3, center.y - 15/3, 5/3, 0, 2 * Math.PI); // circle
					context.fillStyle = "black"; //color
					context.fill();
				}
			} else if (board[i][j] == 5) { // big balls
				context.beginPath();
				context.arc(center.x, center.y, 15/3 *1.2 , 0, 2 * Math.PI); // circle
				context.fillStyle = colorLargeBall; //color
				context.fill();
			
			}else if (board[i][j] == 6) { // medium balls
				context.beginPath();
				context.arc(center.x, center.y, 15/3 * 0.8 , 0, 2 * Math.PI); // circle
				context.fillStyle = colorMediumBall; //color
				context.fill();
			} else if (board[i][j] == 7) { //small balls
				context.beginPath();
				context.arc(center.x, center.y, 15/3 * 0.6 , 0, 2 * Math.PI); // circle
				context.fillStyle = colorSmallBall; //color
				context.fill();
			}
			 else if (board[i][j] == 4) { //wall
				context.beginPath();
				context.rect(center.x - 30/3, center.y - 30/3, 60/3, 60/3);
				context.fillStyle = "#d8dbe4"; //color
				context.fill();
			}
			else if (board[i][j] == 11) {  //timer
				let rand = Math.random();
				if (rand > 0.9994){
					board[i][j] = 12
					duplicateBoard[i][j] == 12

				}
				else if (rand > 0.999 && timer < timeFromUser/2){
					board[i][j] = 12
					duplicateBoard[i][j] == 12

				}
				else if (rand > 0.995 && timer < timeFromUser/4){
					board[i][j] = 12
					duplicateBoard[i][j] == 12

				}
			}

			else if (board[i][j] == 12) {
				context.beginPath();
				context.drawImage(timerImage, center.x - 10, center.y - 10, 20, 20); 
				context.fill();
			}
			else if (board[i][j] == 13) { // lives
				let intrand = Math.random();
				if (intrand > 0.9995){
					board[i][j] = 14
				}
				else if (intrand > 0.9992 && pacmanLives < 4){
					board[i][j] = 14
					duplicateBoard[i][j] == 14

				}
				else if (intrand > 0.999 && pacmanLives < 3){
					board[i][j] = 14
					duplicateBoard[i][j] == 14

				}
				else if (intrand > 0.992 && pacmanLives < 2){
					board[i][j] = 14
					duplicateBoard[i][j] == 14

				}
			}

			else if (board[i][j] == 14) {
				context.beginPath();
				context.drawImage(heartImage, center.x - 10, center.y - 10, 20, 20); // circle
				// context.fillStyle = "#d8dbe4"; //color
				context.fill();
			}

			else if (board[i][j] == 20){
				context.beginPath();
				context.drawImage(ghostList[countGhost], center.x - 10, center.y - 10, 20, 20); // circle
				// context.fillStyle = "#d8dbe4"; //color
				context.fill();
				if (countGhost ==numOfGhost-1){countGhost = 0} else {countGhost++}
			}
		}
	}
}

function UpdatePosition() {

	keyPressed = GetKeyPressed();
	
	board[shape.i][shape.j] = 0;
	
	if (keyPressed == 1) {
		if (shape.j > 0 && board[shape.i][shape.j - 1] != 4) {
			shape.j--;
		}
	}
	if (keyPressed == 2) {
		if (shape.j < 29 && board[shape.i][shape.j + 1] != 4) {
			shape.j++;
		}
	}
	if (keyPressed == 3) {
		if (shape.i > 0 && board[shape.i - 1][shape.j] != 4) {
			shape.i--;
		}
	}
	if (keyPressed == 4) {
		if (shape.i < 29 && board[shape.i + 1][shape.j] != 4) {
			shape.i++;
		}
	}

	var cell_value = board[shape.i][shape.j];

	board[shape.i][shape.j] = 2;
	pacX = shape.i
	pacY = shape.j

	if (cell_value == 5) {
		duplicateBoard[shape.i][shape.j] = 0;
		score = score +5;
		pacman_eat()
	}
	if (cell_value == 6) {
		duplicateBoard[shape.i][shape.j] = 0;
		score = score +15;
		pacman_eat()
	}
	if (cell_value == 7) {
		duplicateBoard[shape.i][shape.j] = 0;
		score = score +25;
		pacman_eat()
	}
	if (cell_value == 12) {
		duplicateBoard[shape.i][shape.j] = 0;
		timer = timer +5;
		clock_ticking.volume = 0.3;
		clock_ticking.pause();
		clock_ticking.currentTime = 0;
		clock_ticking.play();
	}

	if (cell_value == 14) {
		duplicateBoard[shape.i][shape.j] = 0;
		pacmanLives++;
		heart_gain.volume = 0.3;
		heart_gain.pause();
		heart_gain.currentTime = 0;
		heart_gain.play();
	}

	if (cell_value == 20 || board[shape.i][shape.j]  == 20 || board[shape.i +1 ][shape.j] == 20 || board[shape.i-1][shape.j == 20] || board[shape.i][shape.j-1] == 20 || board[shape.i][shape.j+1]  == 20) {
		pacmanLives--;
		buzzer.pause();
		buzzer.currentTime=0;
		buzzer.play();
		repositionGhost();
	}

	board[shape.i][shape.j] = 2;
	pacX = shape.i
	pacY = shape.j

	

	// var currentTime = new Date();
	// time_elapsed = (currentTime - start_time) / 1000;
	// time_elapsed = timer;
	if (timer <= 5) {
		pac_color = "#ec0000";
	}
	else if (timer <= 10) {
		pac_color = "#ec2400";
	}
	else if (timer <= 15) {
		pac_color = "#ec5300";
	}
	else if (timer <= 20) {
		pac_color = "#ec9b00";
	}
	
	else if (timer <= 25) {
		pac_color = "#ecca00";
	}


	if (pacmanLives == 0){
		pauseSong();
		Draw();
		window.clearInterval(interval);
		window.clearInterval(timerInterval);
		window.clearInterval(ghostInterval);

		trombone.play();
		window.alert("Loser!"); 
	}
	else if (timer == 0) {
		pauseSong();
		window.clearInterval(interval);
		window.clearInterval(timerInterval);
		window.clearInterval(ghostInterval);

		if (score > 100){ 
			tada.play();
			window.alert("Winner!!!"); }
		else {
			window.alert("You are better than " + score + " points!");
			trombone.play();
		}
	}
	else {
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
	window.clearInterval(timerInterval);
	window.clearInterval(interval);
	window.clearInterval(ghostInterval);
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
	clock_ticking.volume = 0.3;
	buzzer.volume = 0.5;
	trombone.volume = 0.3;
	eat_sound.volume = 0.3;

	return song.paused ? song.play() : song.pause();
  };

function pauseSong(){
	song.pause();
}

function pacman_eat(){
	eat_sound.pause();
	eat_sound.currentTime = 0;
	eat_sound.play();
}


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


function oneSecond(){
	timer--;
}

function repositionGhost(){
	ghostPosition.forEach(c => {
		board[c[0]][c[1]] = 0
		var emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = 20;
		c[0] = emptyCell[0]
		c[1] = emptyCell[1]
	})
	Draw();

}



function UpdateGhost() {

	var i;
	for (i = 0; i < numOfGhost; i++){

		// let newPos = Math.floor(Math.random() * 4);

		if (board[ghostPosition[i][0]][ghostPosition[i][1]] == 2) {
			pacmanLives--;
			buzzer.pause();
			buzzer.currentTime=0;
			buzzer.play();
			repositionGhost();
			break;
		}
		let GhostX = ghostPosition[i][0];
		let GhostY = ghostPosition[i][1];
		
		let newPos = manhattanDis(GhostX , GhostY);

		if (duplicateBoard[ghostPosition[i][0]][ghostPosition[i][1]] != 20){
		board[ghostPosition[i][0]][ghostPosition[i][1]] = duplicateBoard[ghostPosition[i][0]][ghostPosition[i][1]];
		}
		else{
			board[ghostPosition[i][0]][ghostPosition[i][1]] = 0;
		}

		if (newPos == "up") {
			// if (ghostPosition[i][1] > 0 && board[ghostPosition[i][0]][ghostPosition[i][1] - 1] != 4) {
				ghostPosition[i][1] = ghostPosition[i][1] - 1;
			}
		// }
		if (newPos == "down") {
			// if (ghostPosition[i][1] < 29 && board[ghostPosition[i][0]][ghostPosition[i][1] + 1] != 4) {
				ghostPosition[i][1] = ghostPosition[i][1] + 1;;
			}
			
		// }
		if (newPos == "left") {
			// if (ghostPosition[i][0] > 0 && board[ghostPosition[i][0] - 1][ghostPosition[i][1]] != 4) {
				ghostPosition[i][0] = ghostPosition[i][0] - 1;
			}
		// }
		if (newPos == "right") {
			// if (ghostPosition[i][0] < 29 && board[ghostPosition[i][0] + 1][ghostPosition[i][1]] != 4) {
				ghostPosition[i][0] = ghostPosition[i][0] + 1;
			}
		// }
		board[ghostPosition[i][0]][ghostPosition[i][1]] = 20;

	}

	Draw();
	
}

function manhattanDis(ghostXpos, ghostYpos){
		let manDis = 0;
		let bestmove = 1500;
		let newPosition = "";
		let randPos = Math.random();
		let direction = []

		
		

		if (ghostYpos > 0 && board[ghostXpos][ghostYpos - 1] != 4 && board[ghostXpos][ghostYpos - 1] != 20) {
			manDis = Math.abs(pacX - ghostXpos) + Math.abs(pacY - ghostYpos + 1)
			direction.push("up")

			console.log("up dis: " + manDis)

			if (manDis < bestmove){
				bestmove = manDis
				newPosition = "up"
			}
		}
	
		if (ghostYpos < 29 && board[ghostXpos][ghostYpos + 1] != 4 && board[ghostXpos][ghostYpos + 1] != 20) {
			manDis = Math.abs(pacX - ghostXpos) + Math.abs(pacY - ghostYpos - 1)
			direction.push("down")

			console.log("down dis: " + manDis)


			if (manDis < bestmove){
				bestmove = manDis
				newPosition = "down"

			}
		}
		
	
		if (ghostXpos > 0 && board[ghostXpos - 1][ghostYpos] != 4 && board[ghostXpos - 1][ghostYpos] != 20) {
			manDis = Math.abs(pacX - ghostXpos + 1) + Math.abs(pacY - ghostYpos)
			direction.push("left")

			console.log("left dis: " + manDis)


			if (manDis < bestmove){
				bestmove = manDis
				newPosition = "left"

			}
		}
	
		if (ghostXpos < 29 && board[ghostXpos + 1][ghostYpos] != 4 && board[ghostXpos + 1][ghostYpos] != 20) {
			manDis = Math.abs(pacX - ghostXpos - 1) + Math.abs(pacY - ghostYpos)
			direction.push("right")
			
			console.log("right dis: " + manDis)


			if (manDis < bestmove){
				bestmove = manDis
				newPosition = "right"

			}
		}

		if (randPos > 0.75){
			newPosition = direction[Math.floor(Math.random() * direction.length)]
		}

		// console.log("direction : " + direction)

		// console.log("manDis : " + bestmove + " newPos: " + newPosition)
		return newPosition
}