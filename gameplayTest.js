var canvas = document.getElementById("canvas");
var contxt = canvas.getContext("2d");
var lefty = false;
var righty = false;
var gameOver = true;
var score = 0;
var lives = 3;
var track = 0;
var badTrack = 0;
var level = 1;


document.addEventListener("keydown", keysDown, false);
document.addEventListener("keyup", keysUp, false);

// when key is pressed down, move
function keysDown(e) {
	if(e.keyCode == 39){
		righty = true;
	}
	else if(e.keyCode == 37){
		lefty = true;
	}
	else if(e.keyCode == 32 && gameOver){
		playAgain();
	}
}
// when key is released, stop moving
function keysUp(e) {
	if(e.keyCode == 39){
		righty = false;
	}
	else if(e.keyCode == 37){
		lefty = false;
	}
	
}

// player specs
var player = {
	size: 30,
	x: (canvas.width -30)/ 2,
	y: canvas.height - 30,
	color: "green"
};

// specs for balls you want to collect
var goodArc = {
	x:[],
	y:[],
	speed: 2,
	color: ["red","blue","yellow"],
	state: []
};
var redNum = 0;

// specs for balls you want to avoid
var badArc = {
	x:[],
	y:[],
	speed: 2,
	color: ["black", "purple", "#003300", "#663300", "white"]

};
var blackNum = 0;
var rad = 10;

// adds value to x property of goodArc
function drawNewGood(){
	if(Math.random() < .02){
		goodArc.x.push(Math.random() * canvas.width);
		goodArc.y.push(0);
		goodArc.state.push(true);

	}
	redNum = goodArc.x.length;
}

//adds values to x property of badArc
function drawNewBad() {
	if(score < 30){
		if(Math.random() < .05){
			badArc.x.push(Math.random() * canvas.width);
			badArc.y.push(0);
		}
	}
	else if(score < 50){
		if(Math.random() < .1){
			badArc.x.push(Math.random() * canvas.width);
			badArc.y.push(0);
		}
	}
	else{
		if(Math.random() < .2){
			badArc.x.push(Math.random() * canvas.width);
			badArc.y.push(0);
		}
	}
	blackNum = badArc.x.length;
}

// draws red and blue balls
function drawRedBall() {
	for(var i = 0; i < redNum; i++){
		if(goodArc.state[i] == true){
			//Keeps track of position in color array with changing redNum size
			var trackCol = (i + track);
		
			contxt.beginPath();
			contxt.arc(goodArc.x[i], goodArc.y[i], rad, 0, Math.PI * 2);
			contxt.fillStyle = goodArc.color[trackCol % 3];
			contxt.fill();
			contxt.closePath();
		}
	}
}

// draws black ball to avoid
function drawBlackBall() {
	for(var i = 0; i < blackNum; i++){
		//Keeps track of position in color array with changing blackNum size
		var badCol = (i + badTrack);
		
		contxt.beginPath();
		contxt.arc(badArc.x[i], badArc.y[i], rad, 0, Math.PI * 2);
		contxt.fillStyle = badArc.color[badCol % 5];
		contxt.fill();
		contxt.closePath();
	}
}
// draw player to canvas
function drawPlayer() {
	contxt.beginPath();
	contxt.rect(player.x, player.y, player.size, player.size);
	contxt.fillStyle = player.color;
	contxt.fill();
	contxt.closePath();
}

// moves objects in play
function playUpdate() {
	
	if(lefty && player.x > 0){
		player.x -= 7;
	}
	if(righty && player.x + player.size < canvas.width) {
		player.x += 7;
	}
	for(var i = 0; i < redNum; i++){
		goodArc.y[i] += goodArc.speed;
	}
	for(var i = 0; i < blackNum; i++){
		badArc.y[i] += badArc.speed;
	}
	
	// collision detection
	for(var i = 0; i < redNum; i++){
		// Only counts collision once
		if(goodArc.state[i]){
			if(player.x < goodArc.x[i] + rad && player.x + 30 + rad> goodArc.x[i] && player.y < goodArc.y[i] + rad && player.y + 30 > goodArc.y[i]){
				score++
				// Cycles through goodArc's color array
				player.color = goodArc.color[(i + track) % 3];
				goodArc.state[i] = false;
			}
		}
		// Removes circles from array that are no longer in play
		if(goodArc.y[i] + rad > canvas.height){
			goodArc.x.shift();
			goodArc.y.shift();
			goodArc.state.shift();
			track++;
		}
	}
	for(var i = 0; i < blackNum; i++){
		if(player.x < badArc.x[i] + rad && player.x + 30 + rad > badArc.x[i] && player.y < badArc.y[i] + rad && player.y + 30 > badArc.y[i]){
			lives--;
			player.color = badArc.color[(i+badTrack)%5];
			badArc.y[i] = 0;
			if(lives <= 0){
				gamesOver();
			}
		}
		// Removes circles from x and y arrays that are no longer in play
		if(badArc.y[i] + rad > canvas.height){
			badArc.x.shift();
			badArc.y.shift();
			badTrack++;
		}
	}
	switch(score){
		case 20:
			badArc.speed = 3;
			goodArc.speed = 3;
			level = 2;
			break;
		case 30:
			level = 3;
			break;
		case 40: 
			goodArc.speed = 4;
			level = 4;
			break;
		case 50:
			level = 5;
			break;
	}

}
//signals end of game and resets x, y, and state arrays for arcs
function gamesOver(){
	goodArc.x = [];
	badArc.x = [];
	goodArc.y = [];
	badArc.y = [];
	goodArc.state = [];
	gameOver = true;
}

//resets game, life, and score counters
function playAgain() {
	gameOver = false;
	player.color = "green";
	level = 1;
	score = 0;
	lives = 3;
	badArc.speed = 2;
	goodArc.speed = 2;
}
function draw(){
	contxt.clearRect(0, 0, canvas.width, canvas.height);
	if(!gameOver){
		drawPlayer();
		drawBlackBall();
		drawRedBall();
		playUpdate();
		drawNewGood();
		drawNewBad();
			
		//score
		contxt.fillStyle = "black";
		contxt.font = "20px Helvetica";
		contxt.textAlign = "left";
		contxt.fillText("Score: " + score, 10, 25);
	
		//lives
		contxt.textAlign = "right";
		contxt.fillText("Lives: " + lives, 500, 25);
	}
	else{
		contxt.fillStyle = "black";
		contxt.font = "25px Helvetica";
		contxt.textAlign = "center";
		contxt.fillText("GAME OVER!", canvas.width/2, 175);
		
		contxt.font = "20px Helvetica";
		contxt.fillText("PRESS SPACE TO PLAY", canvas.width/2, 475);
		
		contxt.fillText("FINAL SCORE: " + score, canvas.width/2, 230);
	}
	document.getElementById("level").innerHTML = "Level: " + level;
	requestAnimationFrame(draw);
}



draw();
