var canvas;
var context;
var currentZoom;
var gridsize;
var startx;
var starty;
var mapArray = [];
var playerArr = [];
var lastDirection = "";
var lastBullet;
var bulletDrawCount = 0;
var animateTimer = 0;
var animateInterval;

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
		var user = username.value;
		socket.emit('logindetails', { message: user });
	};

	socket.on('players_update', function (newPlayerPosition, oldPlayerPosition) {	
	

		//drawSquare(oldPlayerPosition.xpos, oldPlayerPosition.ypos, "grey", currentZoom);
		animateTimer = 0;
		
		if (oldPlayerPosition){
		// If the player is moving along the x axis then animate it
		if (oldPlayerPosition.xpos != newPlayerPosition.xpos){
			
			var animateAxis = "x"
			
			animateInterval = setInterval( function() { 
				animatePlayer(oldPlayerPosition,animateAxis, newPlayerPosition.xpos, newPlayerPosition.ypos, gridsize, newPlayerPosition.direction);
				}, 1 	
			);
			
			return;
		
		}

		// If the player is moving along the y axis then animate it
		if (oldPlayerPosition.ypos != newPlayerPosition.ypos){
			
			var animateAxis = "y"
			
			animateInterval = setInterval( function() { 
				animatePlayer(oldPlayerPosition,animateAxis, newPlayerPosition.xpos, newPlayerPosition.ypos, gridsize, newPlayerPosition.direction);
				}, 1 	
			);
			
			return;
		
		}			
			
		}

		
    });
	
	socket.on('player_hurt', function(data){
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

	e = e || window.event;

	if (e.keyCode == '38') {
		socket.emit('moveplayer', { direction: "up" });
		lastDirection = "up";
	}

	else if (e.keyCode == '40') {
		socket.emit('moveplayer', { direction: "down" });
		lastDirection = "down";
	}

	else if (e.keyCode == '37') {
		socket.emit('moveplayer', { direction: "left" });
		lastDirection = "left";
	}

	else if (e.keyCode == '39') {
		socket.emit('moveplayer', { direction: "right" });
		lastDirection = "right";
	}
	else if (e.keyCode == '32') {
		//alert("SPACE HIT");
		socket.emit('firegun', { direction: lastDirection });
	}

}

	
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

var bulletObj = new Image();
bulletObj.src = 'assets/bullet.png';

  
  
/*
playerObj.onload = function () {
	drawPlayer(player.xpos, player.ypos, currentZoom);
};
*/
	
// ***** Draw each player *****
function drawPlayer(x, y, gridsize, angle) {

	console.log("TRYING TO DRAW PLAYER AT [x]: "+x + ", [y]: "+y+ " , With a gridsize of "+gridsize);

    if (!angle) {
        angle = 0;
    }
	
	console.log("ANGLE TO MOVE" +angle);

    var TO_RADIANS = angle * (Math.PI / 180);

    var xx = startx + (x * gridsize) + gridsize / 2;
    var yy = starty + (y * gridsize) + gridsize / 2;
    var width = gridsize;
    var height = gridsize;

    context.translate(xx, yy);
    context.rotate(TO_RADIANS);
    context.drawImage(playerObj, -width / 2, -height / 2, gridsize, gridsize);

    // Reset
    context.rotate(-TO_RADIANS);
    context.translate(-xx, -yy);

}

function clearAnimationFrame(x, y, color, gridsize, animateTimer, animateAxis, angle) {
	//console.log("TRYING TO DRAW SQUARE AT [x]: "+x + ", [y]: "+y+ " , With a gridsize of "+gridsize);
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
		
		// If moving left along X axis
		if (angle == "180"){
			context.fillRect(startx + (x * gridsize), starty + (y * gridsize) - animateTimer, gridsize, gridsize);
		}
		
		// If moving right along X axis
		if (angle == "0"){
			context.fillRect(startx + (x * gridsize), starty + (y * gridsize) + animateTimer, gridsize, gridsize);
		}
	}
	
}


function animatePlayer(oldPlayerPosition, animateAxis, x, y, gridsize, angle) {

	if (animateTimer >= gridsize){
		clearTimeout(animateInterval);
		return false;
	}
	
	// If we are on last animation, clear square before drawing player image
	if (animateTimer === (gridsize-1)){
		drawSquare( x, y, "grey", currentZoom);
	}
	
	if (animateAxis === "x"){
		
		// If moving left along X axis
		if (angle == "180"){
			var xx = startx + ((x+1) * gridsize) - animateTimer / 2;
			clearAnimationFrame(oldPlayerPosition.xpos, oldPlayerPosition.ypos, "grey", currentZoom, animateTimer, animateAxis, angle);
		}
		
		// If moving right along X axis
		if (angle == "0"){
			var xx = startx + (x * gridsize) + animateTimer / 2;
			clearAnimationFrame(oldPlayerPosition.xpos, oldPlayerPosition.ypos, "grey", currentZoom, animateTimer, animateAxis, angle);
		}
		
		var yy = starty + (y * gridsize) + gridsize / 2;
	}
	
		
	if (animateAxis === "y"){
		
		// If moving down along X axis
		if (angle == "90"){
			var yy = starty + (y * gridsize) - animateTimer / 2;
			wipeSquare(oldPlayerPosition.xpos, oldPlayerPosition.ypos, "grey", currentZoom, animateTimer, animateAxis);
		}
		
		// If moving right along X axis
		if (angle == "270"){
			var yy = starty + (y * gridsize) + animateTimer / 2;
			wipeSquare(oldPlayerPosition.xpos, oldPlayerPosition.ypos, "grey", currentZoom, animateTimer, animateAxis);
		}
		
		var xx = startx + (x * gridsize) - animateTimer / 2;
	}
	
	
	console.log(" > > >> x = "+x);

	console.log("TRYING TO DRAW PLAYER AT [x]: "+x + ", [y]: "+y+ " , With a gridsize of "+gridsize);

    if (!angle) {
        angle = 0;
    }
	
	console.log("ANGLE TO MOVE" +angle);

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

	animateTimer++;
	
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
