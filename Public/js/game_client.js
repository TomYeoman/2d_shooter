var canvas;
var context;
var currentZoom;
var gridsize;
var startx;
var starty;
var mapArray = [];
var lastDirection = "";
var lastBullet;
var bulletDrawCount = 0;
var animateTimer = 0;
var animateInterval;
var canMove = true;
var userString = "";

var animationArr = [];

function playerAnimation(){
		this.oldPlayerPosition;
		this.newPlayerPosition;
		this.animationFrame;
		this.animateAxis;
		this.playerName;
}

// Create 30fps second game loop
var myVar = setInterval(gameLoop, 1000/30)
function gameLoop() {

	updateAnimations();

}

function updateAnimations(){
	
	if (animationArr.length){
		
		// For each player that needs animating
		for (var x = 0; x < animationArr.length; x++){
		
			animatePlayer(animationArr[x].oldPlayerPosition, animationArr[x].animateAxis, animationArr[x].newPlayerPosition.xpos, animationArr[x].newPlayerPosition.ypos, gridsize, animationArr[x].newPlayerPosition.direction, animationArr[x].animationFrame, x);

		}	
	}

}


window.onload = function() {

	$('#mainContainer').hide();
	currentZoom = 30;
	gridsize = currentZoom;
	canvas = document.getElementById('myCanvas');
	context = canvas.getContext('2d');
	//startx = $('#canvasContainer').width() / 2, starty = $('#canvasContainer').height() / 2;
	startx = 10, starty = 10;
	$('#playerHP').html(100);

    var messages = [];
    var socket = io.connect('http://127.0.0.1:3700');

    var username = document.getElementById("inputuser");
    var password = document.getElementById("inputpass");

    var loginButton = document.getElementById("login");

	// We need socket to recieve player location, and the map array object
    socket.on('loggedin', function (data) {

		$('#mainContainer').show("");
		// Draw map
	
        // Spawn player onto map
		
		$( "#mainContent" ).slideUp( "slow", function() {

		});
    });

	loginButton.onclick = function() {
		userString = username.value;
		socket.emit('logindetails', { message: userString });
	};

	socket.on('updatePlayerDirection', function (playerPositionX, playerPositionY, newDirection) {	
		changePlayerDirection(playerPositionX, playerPositionY, gridsize, newDirection);
	});
		
	socket.on('players_update', function (newPlayerPosition, oldPlayerPosition) {	
	

		// If the player is moving 
		if (oldPlayerPosition){
			
			// If we arnet animating ourself let the player move again
			if (newPlayerPosition.username != userString){
				canMove = true;
			}
			
			// If the player is moving along the x axis then animate it
			if (oldPlayerPosition.xpos != newPlayerPosition.xpos){
				
				animation = new playerAnimation();
				animation.oldPlayerPosition = oldPlayerPosition;
				animation.newPlayerPosition = newPlayerPosition;
				animation.animationFrame = 0;
				animation.animateAxis = "x";
				animation.playerName = newPlayerPosition.username; //NewplayerPosition is object containing username + Positions
				animationArr.push(animation);
				
				return;
			
			}

			// If the player is moving along the y axis then animate it
			else if (oldPlayerPosition.ypos != newPlayerPosition.ypos){
				
				
				animation = new playerAnimation();
				animation.oldPlayerPosition = oldPlayerPosition;
				animation.newPlayerPosition = newPlayerPosition;
				animation.animationFrame = 0;
				animation.animateAxis = "y";
				animation.playerName = newPlayerPosition.username;
				animationArr.push(animation);
				
				return;
			
			}				
			// If we don't need to animate the player then allow control back to the player
			else {
				canMove = true;
			}
			
		}

		
    });
	
	socket.on('bots_update', function (bot, botcount) {	
		
		// If the bot has just spawned then draw it
		if (bot.xpos == bot.oldxpos && bot.ypos == bot.oldypos){
			drawPlayer(bot.xpos, bot.ypos, gridsize, 0);
		} else{
			//console.log("TRYING TO REMOVE BOT");
			drawSquare( bot.oldxpos, bot.oldypos, "grey", currentZoom);
			drawPlayer(bot.xpos, bot.ypos, gridsize, 0);
		}
		
		$('#botCount').html(botcount);
	});
	
	
	socket.on('player_hurt', function(data){
		
		alert("PLAYER HIT");
		$('#playerHP').html(data.message.hp);
		drawSquare(data.message.xpos, data.message.ypos, "red", currentZoom);

		if (data.message.hp == 0){
			socket.emit('respawn_player', { message: "true" });
			//alert("You've been killed in action, Press OK to respawn");
			$('#playerHP').html(100);
		}
		
	});
	
	// Draw the map once client has connected with valid details
	
	socket.on('draw_map', function (data) {
			
		
		clearCanvas();
		console.log("MAP RECIEVED FROM SERVER, TRYING TO DRAW");	
		console.log("MAP SIZE: "+data.message.length);
		mapArray = data.message;
		
		for (var x = 0; x < data.message.length; x++){
			drawSquare(data.message[x].xpos, data.message[x].ypos, "grey", currentZoom);
		}
		
		context.stroke();
    });
	
	
	socket.on('bullet_position', function (data) {

	
		if (data){
			
			//clearCanvas();
			context.beginPath();
			
			for (var x = 0; x < data.newBulletPositionArr.length; x++){
				
				drawBullet(data.newBulletPositionArr[x].xpos, data.newBulletPositionArr[x].ypos, currentZoom, data.newBulletPositionArr[x].direction);

			}
			
			// After the 1st bullet has been drawn then delete the previous
			
			if (lastBullet){
				for (var yy = 0; yy < lastBullet.newBulletPositionArr.length; yy++){
					drawSquare(lastBullet.newBulletPositionArr[yy].xpos, lastBullet.newBulletPositionArr[yy].ypos, "grey", currentZoom);
				}		
			}

		
			// Store the previous ticks bullets so we can cover them
			lastBullet = data;
			
			context.stroke();
				
		}

    });
	
	socket.on('bulletfiring_finished', function (data) {
		drawSquare(lastBullet.xpos, lastBullet.ypos, "grey", currentZoom);
		bulletDrawCount = 0;
	});
	
	
	
	
	document.onkeydown = checkKey;
		
	function checkKey(e) {
		
		console.log("CAN MOVE: "+canMove);
		if (canMove){
					
			e = e || window.event;

			// MOVEMENT
			
			if (e.keyCode == '38') {
				socket.emit('moveplayer', { direction: "up" });
				lastDirection = "up";
				canMove = false;
				}

			else if (e.keyCode == '40') {
				socket.emit('moveplayer', { direction: "down" });
				lastDirection = "down";
				canMove = false;
			}

			else if (e.keyCode == '37') {
				socket.emit('moveplayer', { direction: "left" });
				lastDirection = "left";
				canMove = false;
			}

			else if (e.keyCode == '39') {
				socket.emit('moveplayer', { direction: "right" });
				lastDirection = "right";
				canMove = false;
			}
			
			// DIRECTIONS
			else if (e.keyCode == '87') {
				socket.emit('changeDirection', { direction: "up" });
				lastDirection = "up";
			}

			else if (e.keyCode == '83') {
				socket.emit('changeDirection', { direction: "down" });
				lastDirection = "down";
			}

			else if (e.keyCode == '65') {
				socket.emit('changeDirection', { direction: "left" });
				lastDirection = "left";
			}
			
			else if (e.keyCode == '68') {
				socket.emit('changeDirection', { direction: "right" });
				lastDirection = "right";
			}
			
			// SHOOTING
			
			else if (e.keyCode == '32') {
				var sound = document.getElementById("audio");
				sound.play()
			
				socket.emit('firegun', { direction: lastDirection });

			}		
			
		}


	}
	
	$('#myCanvas').click(function(){
		socket.emit('firegun', { direction: lastDirection });

	});

	
}


////////////////////////// HELPERS //////////////////////

// ***** Draw each map square *****
function clearCanvas() {
	context.beginPath();
	context.clearRect(0, 0, canvas.width, canvas.height);
}

// ***** Draw each map square *****

function drawSquare(x, y, color, gridsize) {
	//console.log("TRYING TO DRAW SQUARE AT [x]: "+x + ", [y]: "+y+ " , With a gridsize of "+gridsize);
	context.fillStyle = color;
	context.fillRect(startx + (x * gridsize), starty + (y * gridsize), gridsize, gridsize);
}

var playerObj = new Image();
playerObj.src = 'assets/character.gif';

var zombieObj = new Image();
zombieObj.src = 'assets/zombie.gif';

var bulletObj = new Image();
bulletObj.src = 'assets/bullet.png';


// ***** Draw each player *****
function drawPlayer(x, y, gridsize, angle) {

	//console.log("TRYING TO DRAW PLAYER AT [x]: "+x + ", [y]: "+y+ " , With a gridsize of "+gridsize);

    if (!angle) {
        angle = 0;
    }
	
	//console.log("ANGLE TO MOVE" +angle);

    var TO_RADIANS = angle * (Math.PI / 180);

    var xx = startx + (x * gridsize) + gridsize / 2;
    var yy = starty + (y * gridsize) + gridsize / 2;
    var width = gridsize;
    var height = gridsize;

    context.translate(xx, yy);
    context.rotate(TO_RADIANS);
    context.drawImage(zombieObj, -width / 2, -height / 2, gridsize, gridsize);

    // Reset
    context.rotate(-TO_RADIANS);
    context.translate(-xx, -yy);

}

function clearAnimationFrame(x, y, color, gridsize, animateTimer, animateAxis, angle) {
	console.log("TRYING TO DRAW SQUARE AT [x]: "+x + ", [y]: "+y+ " , With a gridsize of "+gridsize);
	context.fillStyle = color;
	
	if (animateAxis === "x"){
		
		// If moving left along X axis
		if (angle == "180"){
			context.fillRect(startx + (x * gridsize) - animateTimer, starty + (y * gridsize), gridsize, gridsize);
		}
		
		// If moving right along X axis
		if (angle == "0"){
			context.fillRect(startx + (x * gridsize) + animateTimer, starty + (y * gridsize), gridsize, gridsize);
		}
	}	
	
	if (animateAxis === "y"){
		
		// If moving down along y axis
		if (angle == "90"){
			context.fillRect(startx + (x * gridsize), starty + (y * gridsize) + animateTimer, gridsize, gridsize);
		}
		
		// If moving up along y axis
		if (angle == "270"){
			context.fillRect(startx + (x * gridsize), starty + (y * gridsize) - animateTimer, gridsize, gridsize);
		}
	}
	
}

// X + Y holds the coords for the position we wish to move the player
// oldPlayerPosition is used as a reference to clear up each new frame as we add it
// Angle = the players direction
// AnimateAxis = "x" or "y", Tells us which axis we want to animate the player against

function animatePlayer(oldPlayerPosition, animateAxis, x, y, gridsize, angle, animationFrame, arrIndex) {

	//console.log("TRYING TO ANIMATE: FRAME: "+animationFrame+ "Player X + Y: ", x, " ,",y);
	if (animationFrame >= gridsize){
		//console.log("ANIMINATION DONE");
		//canMove = true;
		//clearTimeout(animateInterval);
		//return false;
		
		// If we've finished animating the player who's logged in let them move again
		if (animationArr[arrIndex].playerName === userString){
			canMove = true;
		}
		
		animationArr.splice(arrIndex, 1);
		return;
	}
	
	// If we are on last animation, clear square before drawing player image
	if (animationFrame === (gridsize-1)){
		drawSquare( x, y, "grey", currentZoom);

	}
	
	if (animateAxis === "x"){
		
		// If moving left along X axis
		if (angle == "180"){
			var xx = startx + ((x+1) * gridsize) - animationFrame / 2;
			clearAnimationFrame(oldPlayerPosition.xpos, oldPlayerPosition.ypos, "grey", currentZoom, animationFrame, animateAxis, angle);
		}
		
		// If moving right along X axis
		if (angle == "0"){
			var xx = startx + (x * gridsize) + animationFrame / 2;
			clearAnimationFrame(oldPlayerPosition.xpos, oldPlayerPosition.ypos, "grey", currentZoom, animationFrame, animateAxis, angle);
		}
		
		var yy = starty + (y * gridsize) + gridsize / 2;
	}
	
		
	if (animateAxis === "y"){
		
		// If moving down along Y axis
		if (angle == "90"){
			var yy = Math.floor(starty + (y * gridsize) + animationFrame / 2);
			clearAnimationFrame(oldPlayerPosition.xpos, oldPlayerPosition.ypos, "grey", currentZoom, animationFrame, animateAxis, angle);
		}
		
		// If moving up along X axis
		if (angle == "270"){
			var yy = Math.floor(starty + ((y+1) * gridsize) - animationFrame / 2);
			clearAnimationFrame(oldPlayerPosition.xpos, oldPlayerPosition.ypos, "grey", currentZoom, animationFrame, animateAxis, angle);
		}
		
		var xx = startx + (x * gridsize) + gridsize / 2;
	}
	
	
	//console.log(" > > >> x = "+x);

	//console.log("TRYING TO DRAW PLAYER AT [x]: "+x + ", [y]: "+y+ " , With a gridsize of "+gridsize);

    if (!angle) {
        angle = 0;
    }
	
	//console.log("ANGLE TO MOVE" +angle);

    var TO_RADIANS = angle * (Math.PI / 180);

    //var xx = startx + (x * gridsize) - animateTimer / 2;
    //var yy = starty + (y * gridsize) + gridsize / 2;
	
	console.log("MOVING POSITION x:" + xx + " ,Y, "+yy);
    var width = gridsize;
    var height = gridsize;

    context.translate(xx, yy);
    context.rotate(TO_RADIANS);
    context.drawImage(playerObj, -width / 2, -height / 2, gridsize, gridsize);

    // Reset
    context.rotate(-TO_RADIANS);
    context.translate(-xx, -yy);

	animationArr[arrIndex].animationFrame++;
	
	context.stroke();


}


function changePlayerDirection(x, y, gridsize, angle){
	
	drawSquare( x, y, "grey", currentZoom);

	var yy = starty + (y * gridsize) + gridsize / 2;
	var xx = startx + (x * gridsize) + gridsize / 2;
	
	
	if (!angle) {
		angle = 0;
	}
	
	console.log("ANGLE TO MOVE" +angle);

	var TO_RADIANS = angle * (Math.PI / 180);


	var width = gridsize;
	var height = gridsize;

	context.translate(xx, yy);
	context.rotate(TO_RADIANS);
	context.drawImage(playerObj, -width / 2, -height / 2, gridsize, gridsize);

	// Reset
	context.rotate(-TO_RADIANS);
	context.translate(-xx, -yy);

	context.stroke();

}


function drawBullet(x, y, gridsize, angle) {

    if (!angle) {
        angle = 0;
    }

    var TO_RADIANS = angle * (Math.PI / 180);


	var xx = startx + (x * gridsize) + gridsize / 2;
	var yy = starty + (y * gridsize) + gridsize / 2;
	var width = gridsize;
	var height = gridsize;

	context.translate(xx, yy);
	context.rotate(TO_RADIANS);
	context.drawImage(bulletObj, -width / 2, -height / 2, gridsize, gridsize);

	// Reset
	context.rotate(-TO_RADIANS);
	context.translate(-xx, -yy);



}
