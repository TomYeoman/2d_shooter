// Server starts, We create the default map for clients to use

// >>  User logs in with details (E.g Jase / Tom)
// >>  We create a user object for them, Containing there X + Y positons, position they are faving, name etc..
// >>  We send a copy of the servers map to the client for them to be able to draw

// >> User tries to move (up/down/left/right)
// >> Server recieves message from the client stating the direction
// >> We do a check against our server copy of the map to see if the position the player would like to move to is valid
// >> If it's valid we send back an updated copy of the 'connectedClients' array containing the updated users details
// >> aswell as a copy of all other players connected (To ensure no client can)

// >> Client re-draws the map which is now stored locally (Could re-send from server if we want)

// Libraries
var express = require("express");
var app = express();
var port = 3700;
var io = require('socket.io').listen(app.listen(port));
var fs = require('fs');
var readline = require('readline');

var bots = require('./bot_AI.js');

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
    res.sendFile(__dirname + '/Public/html/mainpage.html');
});

// Directory for all resources (JS/ CSS/ Assets)
app.use(express.static(__dirname + '/public'));

// Globals
var currentUser = "";
var connectedClients = [];
var gridItemArr = [];
var bulletPath = [];
var userObj = new user();
var myTimer;
var bulletPathCount;
var botArr = [];

// On server load create our map
createHouse(50);

// Objects
function user() {
    this.username = "";
    this.password = "";
    this.socketid = "";
	this.xpos = "";
	this.ypos = "";
	this.direction = 0;
	this.hp = 100;
	this.bulletArr = [];
	this.bulletPosition = 0;
}

function projectile() {
  this.xpos = 0;
  this.ypos = 0;
  this.type = "";
  this.direction = 0;
  this.speed = 1;
}

function createPlayer(userObj){
	var x = gridItemArr.length;
	
	var rand = randomIntFromInterval (0,x);
	console.log("SPAWN LOCATION:" +rand);

	userObj.xpos = gridItemArr[rand].xpos;
	userObj.ypos = gridItemArr[rand].ypos;
	
	connectedClients.push(userObj);
		
	for (var x = 0; x < connectedClients.length; x++) {
		console.log("CLIENT [" + x + "] USERNAME >> " + connectedClients[x].username);
		console.log("CLIENT [" + x + "] SOCKETID >> " + connectedClients[x].socketid);
		console.log("CLIENT [" + x + "] XPOS >> " + connectedClients[x].xpos);
		console.log("CLIENT [" + x + "] YPOS >> " + connectedClients[x].ypos);
	}
	
	io.sockets.emit('players_update', { message: connectedClients });
	
}


io.sockets.on('connection', function (socket) {

    console.log("client connected with id: " +socket.id);

	// On clicking login button
    socket.on('logindetails', function (data) {

        console.log("");
        console.log("SOCKET ID >>>>>" + socket.id);
        currentUserName = data.message;
        userArr = [];


        var rd = readline.createInterface({
            input: fs.createReadStream('C:/2d_shooter/Login/Login.txt'),
            output: process.stdout,
            terminal: false
        });

        var foundUser = false;

        rd.on('line', function (line) {

            if (!foundUser) {

                var splitString = line.split(",");

                // Once a user has been found in the DB
                if (splitString[0] === currentUserName) {
					
					var loggedInAlready = false;
					
					// Check whether this username is already logged in
					for (var x = 0; x < connectedClients.length; x++){
						if (connectedClients[x].username == currentUserName){
							// Once the user who has requested to move has been found
							loggedInAlready = true;
						}
					}
					
					// Check if this socket already has client associated to it (So user cannot multi log)			
					for (var x = 0; x < connectedClients.length; x++){
						if (connectedClients[x].socketid == socket.id){
							// Once the user who has requested to move has been found
							loggedInAlready = true;
						}
					}
		
					// If the users not already logge din, Then create use object + give them a starting location
					
					if (!loggedInAlready){
						// Call GET request for main page once user is confirmed
						app.get('/newpage', function (req, res) {
							res.render('mainpage', {
								title: 'Home'
							});
						});
						
						console.log("");
						console.log("USER LOGGED IN AS: "+currentUserName)
						var userObj = new user();
						userObj.username = currentUserName;
						userObj.socketid = socket.id;
						
						// Send the client over the copy of the servers map
						console.log(" >> TRYING TO SEND MAP OF LENGTH: " + gridItemArr.length + " TO CLIENT <<")
						socket.emit('draw_map', { message: gridItemArr });

						loginUser(userObj);
						foundUser = true;
						
					}
					
					else{
						console.log("USER ALREADY LOGGED IN");
					}

                }

            }

            //console.log("WE'VE CREATED OUR USER ARRAY, userArr size: "+ userArr.length);

        });

        // Do stuff with user once logged in
        function loginUser(userObj) {

            // Lookup user details if they exist

            // Create new player (x, y, wep etc) if not

            for (var x = 0; x < connectedClients.length; x++) {
                console.log("CLIENT [" + x + "] >> " + connectedClients[x].username);
				console.log("CLIENT [" + x + "] >> " + connectedClients[x].socketid);
				console.log("CLIENT [" + x + "] >> " + connectedClients[x].xpos);
				console.log("CLIENT [" + x + "] >> " + connectedClients[x].ypos);
            }

			// We can now reference logged in client using there socket ID
            io.to(userObj.socketid).emit('loggedin', { message: "true"});
			
			createPlayer(userObj);
			
        }


    });
	
	
	// On disconnect
	socket.on('disconnect', function() {
		console.log("SOCKET HAS DISCONNECTED")
		for (var x = 0; x < connectedClients.length; x++){
			if (connectedClients[x].socketid == socket.id){
				// Once the user who has requested to move has been found
				connectedClients.splice(x, 1);
				break;
			}
		}
	});
	
	// On user dying we will send a request to the server to respawn them
	
	socket.on('respawn_player', function (data) {
		
		console.log("TRYING TO RESPAWN PLAYER, OUR CONNECTED CLIENTS" + connectedClients.length);
		for (var x = 0; x < connectedClients.length; x++){
			if (connectedClients[x].socketid == socket.id){
				
				//Once we've found the player to re-spawn, Reset their x,y coords, HP, + then update the client
				
				console.log("RESPAWNING A PLAYER")
				var gridSize = gridItemArr.length;
				var rand = randomIntFromInterval (0,gridSize);

				connectedClients[x].xpos = gridItemArr[rand].xpos;
				connectedClients[x].ypos = gridItemArr[rand].ypos;
				connectedClients[x].hp = 100;

				io.sockets.emit('players_update', { message: connectedClients });

				break;
			}
		}

	});
   
    // On clicking send button
    socket.on('send', function (data) {
        io.sockets.emit('message', data);
    });
	
	// On client pressing spacebar (Firing gun)
	socket.on('firegun', function (data) {
		
		// How far has bullet travelled in it's journey
		bulletPathCount = 0;
		
		bulletPath = [];
		
		var playernum = 0;
		// Find the player who has send the command
		for (var x = 0; x < connectedClients.length; x++){
			if (connectedClients[x].socketid == socket.id){
				// Once the user who has requested to move has been found
				playernum = x;
				break;
			}
		}
		
		//console.log("Player fired gun from x: "+connectedClients[playernum].xpos+" ,y: "+connectedClients[playernum].ypos+ " , facing direction " +data.direction);
		
		if (connectedClients[playernum].bulletArr.length !== 0){
			return;
		}
		// set x + y pos to begin @ the players position
		
		var xpos = connectedClients[playernum].xpos;
		var ypos = connectedClients[playernum].ypos;
		
		if (data.direction == "left"){
    
			do{
			  
			  var bullet = new projectile();
			  
			  bullet.xpos = xpos;
			  bullet.ypos = ypos;
			  bullet.direction = 0;
			  
			  xpos --;
			  
			  bulletPath.push (bullet);

				// While the next position that the bullet wishes to travel to exists int he grid array
				// keep adding the new location to the bulletPath array
			
			}while (findPosition(bullet, gridItemArr))
			
		}
		
		if (data.direction == "right"){
			do{
			  
			  var bullet = new projectile();
			  
			  bullet.xpos = xpos;
			  bullet.ypos = ypos;		 
			  bullet.direction = 180;
			  
			  xpos ++;
			  bulletPath.push (bullet);

			}while (findPosition(bullet, gridItemArr))	
		}
		
		if (data.direction == "up"){
			do{
			  
			  var bullet = new projectile();
			  
			  bullet.xpos = xpos;
			  bullet.ypos = ypos;	
			  bullet.direction = 90;
			  
			  ypos--;
			  bulletPath.push (bullet);

			}while (findPosition(bullet, gridItemArr))	
		}
		
		if (data.direction == "down"){
			do{
			  
			  var bullet = new projectile();
			  
			  bullet.xpos = xpos;
			  bullet.ypos = ypos;	
			  bullet.direction = 270;
			  
			  ypos++;
			  bulletPath.push (bullet);

			}while (findPosition(bullet, gridItemArr))	
		}
				
		// Get rid of 1st + last bullet

		bulletPath.splice(0,1);
  
  		console.log("The bullet path has a length of :" +bulletPath.length);

		// Assign this bullet path to the connectedClient
		connectedClients[playernum].bulletArr = bulletPath;

		console.log("PLAYER NUMBER: "+playernum+", HAS JUST HAD A BULLET PATH ASSIGNED (Size: "+connectedClients[playernum].bulletArr.length);
	});
	
	// Tell the client the current position of bullets being fired

		
	// On recieving movement command from the player (up / left/ down/ right)
	socket.on('moveplayer', function (data) {
		
		var tempPlayer = new user();
		var playernum = -1;
		
		// Find the player who has send the command
		for (var x = 0; x < connectedClients.length; x++){
			if (connectedClients[x].socketid == socket.id){
				// Once the user who has requested to move has been found
				playernum = x;
				break;
						
				console.log("");
				console.log("SOCKET WHICH HAS SEND REQUEST: "+socket.id)
				console.log("This is user number "+playernum);
				console.log("CurrentX:  "+connectedClients[playernum].xpos);
				console.log("CurrentY:  "+connectedClients[playernum].ypos);
				
			}
		}


		// If playernum isn;t still null (we've found the player who's trying to move) then try and move the requested character
		if (playernum >= 0){
			
			var oldPlayerPos = {};
			
			oldPlayerPos.xpos = connectedClients[playernum].xpos;
			oldPlayerPos.ypos = connectedClients[playernum].ypos;
			oldPlayerPos.position = connectedClients[playernum].position;

			//console.log("");
			//console.log("OldX:  "+oldPlayerPos.xpos);
			//console.log("OlyY:  "+oldPlayerPos.ypos);
			//console.log("Old DIRECTION:  "+oldPlayerPos.direction);

			//console.log("");

			if (data.direction == "up"){
				if (tryMovePlayer(connectedClients[playernum].xpos, connectedClients[playernum].ypos, "up", gridItemArr)) {
					// Set players new move after testing is this move is allowed
					connectedClients[playernum].ypos -= 1;
					// Angle in degrees to rotate the player icon if moving up
					connectedClients[playernum].direction = 270;
				}
			}
			if (data.direction == "down"){
				if (tryMovePlayer(connectedClients[playernum].xpos, connectedClients[playernum].ypos, "down", gridItemArr)) {
					connectedClients[playernum].ypos += 1;

					connectedClients[playernum].direction = 90;
				}
			}
			if (data.direction == "left"){
				if (tryMovePlayer(connectedClients[playernum].xpos, connectedClients[playernum].ypos, "left", gridItemArr)) {
					connectedClients[playernum].xpos -= 1;
					connectedClients[playernum].direction = 180;
				}
			}
			if (data.direction == "right"){
				if (tryMovePlayer(connectedClients[playernum].xpos, connectedClients[playernum].ypos, "right", gridItemArr)) {
					connectedClients[playernum].xpos += 1;
					connectedClients[playernum].direction = 0;
				}
			}
						
			//console.log("OldX:  "+oldPlayerPos.xpos);
			//console.log("OlyY:  "+oldPlayerPos.ypos);
			//console.log("Old DIRECTION:  "+oldPlayerPos.direction);

			//console.log("NewX:  "+connectedClients[playernum].xpos);
			//console.log("NewY:  "+connectedClients[playernum].ypos);
			//console.log("NEW DIRECTION:  "+connectedClients[playernum].direction);

			//console.log("");
			//console.log("");
			//console.log(" >>>>>>>>>> <<<<<<<<<<<<<<<");

			//console.log("");
			
			// Send the array with player positions to all connected clients
			io.sockets.emit('players_update', connectedClients[playernum], oldPlayerPos);
		
		}

	});
	
	// On recieving movement command from the player (up / left/ down/ right)
	socket.on('changeDirection', function (data) {
		
		var playernum = -1;
		
		// Find the player who has send the command
		for (var x = 0; x < connectedClients.length; x++){
			if (connectedClients[x].socketid == socket.id){
				// Once the user who has requested to move has been found
				playernum = x;
				break;
						
				//console.log("");
				//console.log("SOCKET WHICH HAS SEND REQUEST: "+socket.id)
				//console.log("This is user number "+playernum);
				//console.log("CurrentX:  "+connectedClients[playernum].xpos);
				//console.log("CurrentY:  "+connectedClients[playernum].ypos);
				
			}
		}

		// If playernum isn;t still null (we've found the player who's trying to move) then try and move the requested character
		if (playernum >= 0){
			
			var oldPlayerPos = {};


			if (data.direction == "up"){
				if (tryMovePlayer(connectedClients[playernum].xpos, connectedClients[playernum].ypos, "up", gridItemArr)) {
					// Angle in degrees to rotate the player icon if moving up
					connectedClients[playernum].direction = 270;
				}
			}
			if (data.direction == "down"){
				if (tryMovePlayer(connectedClients[playernum].xpos, connectedClients[playernum].ypos, "down", gridItemArr)) {
					connectedClients[playernum].direction = 90;
				}
			}
			if (data.direction == "left"){
				if (tryMovePlayer(connectedClients[playernum].xpos, connectedClients[playernum].ypos, "left", gridItemArr)) {
					connectedClients[playernum].direction = 180;
				}
			}
			if (data.direction == "right"){
				if (tryMovePlayer(connectedClients[playernum].xpos, connectedClients[playernum].ypos, "right", gridItemArr)) {
					connectedClients[playernum].direction = 0;
				}
			}

			// Send the array with player positions to all connected clients
			io.sockets.emit('updatePlayerDirection', connectedClients[playernum].xpos, connectedClients[playernum].ypos, connectedClients[playernum].direction);
		
		}

	});


});

function stripAlphaChars(source) { 
  var out = source.replace(/[^0-9]/g, ''); 

  return out; 
}

function updatePlayers(connectedClients) {
		
	/// NEW LOGIC ///
	
	//console.log("WE HAVE "+connectedClients.length + " CONNECTED CLIENTS")
	// Loop through each client
	for (var x = 0; x < connectedClients.length; x++){
		

			
		var status = "";

		// If the current user has a bullet array try and update
		if (connectedClients[x].bulletArr.length > 0){
			
			var bulletPos = connectedClients[x].bulletPosition;

			if (bulletPos >= connectedClients[x].bulletArr.length){
				connectedClients[x].bulletPosition = 0;
				connectedClients[x].bulletArr = [];
				return;
			}
			
			//console.log("BULLET POS : " + bulletPos);
			//console.log(connectedClients[x].bulletArr);
			//console.log("BULLET COORDS" + connectedClients[x].bulletArr[bulletPos]);

				//console.log("FOUND BULLETARRAY WITH LENGTH: " + connectedClients[x].bulletArr.length);
			// Check whether updating this clients bullet will hit anyone
			for (var yy = 0; yy < connectedClients.length; yy++){
				
				//console.log(" >> <<<");
				//console.log("POSITION: "+  connectedClients[yy].xpos);
				//console.log("POSITION: "+  connectedClients[x].bulletArr[bulletPos].xpos);
				//console.log("POSITION: "+  connectedClients[yy].ypos);
				//console.log("POSITION: "+  connectedClients[x].bulletArr[bulletPos].ypos);
				//console.log(".... . ...");
				
				// Check if there are any collisions for the bullet we are trying to move
				
				if (  (connectedClients[yy].xpos == connectedClients[x].bulletArr[bulletPos].xpos)  &&  (5 == connectedClients[x].bulletArr[bulletPos].ypos)){
					//console.log("HIIIIIT");

					// If we haven't hit ourself
					if (connectedClients[x].socketid != connectedClients[yy].socketid){
						status = "hit_player";
						connectedClients[yy].hp = connectedClients[yy].hp - 50;	
						io.to(connectedClients[yy].socketid).emit('player_hurt', { message: connectedClients[yy] });
						break;
					}
				}
			}				
				
			// If this bullet has reached end of path // Hit a player
			if (bulletPos >= connectedClients[x].bulletArr.length-1 || status==="hit_player" ){
					
					status + "bullet_finished";
					connectedClients[x].bulletPosition = 0;
					connectedClients[x].bulletArr = [];
			} else{
				//console.log("TRYING TO DRAW POSITON: " +connectedClients[x].bulletPosition);
				connectedClients[x].bulletPosition++;
			}
		
			
			

		}
	}
	
	// Create array containing all the new positions to update clients UI
	var newBulletPositionArr = [];
	
	for (var x = 0; x < connectedClients.length; x++){
		
		if (connectedClients[x].bulletArr.length > 0){
			
			newBulletPositionArr.push(connectedClients[x].bulletArr[connectedClients[x].bulletPosition-1]);
		}
	}
	
	// If any bullet positions have changed this tick then update all clients
	
	if (newBulletPositionArr.length){
		
		// Send the bullet position to all clients
		for (var y = 0; y < connectedClients.length; y++){
			//console.log("TRYING TO SEND ARRAY WITH " + newBulletPositionArr.length +" POSITIONS");
			io.to(connectedClients[y].socketid).emit('bullet_position', { newBulletPositionArr })
			
		}
	}

	
	//io.sockets.emit('players_update', { message: connectedClients });
	
	/// NEW LOGIC ///

	
  
}
	
// Create 30fps second game loop

var botTimer = setInterval(moveBots, 75)
var chunkNumber = 1;
var chunkSize = 15;

var botSize = 1;
function assignBots(){
	for (var x = 0; x < botSize; x++){
	
		botArr.push(bots.addBot(gridItemArr));
	}

}
assignBots();


function moveBots(){
	
	// Add bots every 5 seconds if there are less than 5
	
	if (connectedClients.length > 0){
		//if (botArr.length < 400){
			
				// Create inital bot
				//botArr.push(bots.addBot(gridItemArr));
				//console.log(botArr.length);
				
		//}
				

		
		if (botArr.length > chunkSize){
			
			// E.g 12 bots, x = 3,6,9,12
			var chunkEnd = Math.floor((botArr.length/chunkSize)) * chunkNumber;		
			
			//console.log("CHUNK SIZE" + Math.floor((botArr.length/4)));
			//console.log("CHUNK NUMBER: "+chunkNumber)
			// E.g 12 bots, y = 0,3,6,9
			var chunkStart = chunkEnd -  Math.floor(botArr.length/chunkSize);
			
			if (chunkNumber >= chunkSize){
				chunkNumber =1;
			} else{
				chunkNumber++
			}
			
			console.log("CHUNK START: "+chunkStart +" CHUNK END: " +chunkEnd);
			
			for (var chunkPositon = chunkStart; chunkPositon < chunkEnd; chunkPositon++){
				
				// Set target closest to bot
				var target = bots.setBotTarget(botArr[chunkPositon], connectedClients);
				
				//console.log(botArr[chunkPositon]);
				//console.log(target);
				// Try to move bot towards target
				botArr[chunkPositon] = bots.moveTowardTarget(botArr[chunkPositon], connectedClients, target.xpos, target.ypos)
				
				//console.log("BOT " + x + " TARGET IS : " + targetname);
				tryMoveBot(botArr[chunkPositon]);
				
			}	
		} else{
		
			for (var x = 0; x < botArr.length; x++){
			
				// Set target closest to bot
				var target = bots.setBotTarget(botArr[x], connectedClients);
				
				// Try to move bot towards target
				botArr[x] = bots.moveTowardTarget(botArr[x], connectedClients, target.xpos, target.ypos)
				
				//console.log("BOT " + x + " TARGET IS : " + targetname);
				tryMoveBot(botArr[x]);
				

			}	
		}
			

	}

	
}

function tryMoveBot(bot){

	io.sockets.emit('bots_update', bot, botArr.length);
}

var fpsRate = 60;
var myVar = setInterval(gameLoop, 1000/fpsRate)

function gameLoop() {

	
	updatePlayers(connectedClients);
    // For each connected player, See if they have 
    //	-tried to move (sent server up/down/left/right key since last tick)
    //	-Fired weapon  

    // Try to move player if they have

    // Send client updated gamearray / object containing all players locations

}

///////////////////////////////////////////////////////////////////////////////////////
//									START MAP CREATION LOGIC
///////////////////////////////////////////////////////////////////////////////////////

function gridItem() {
	this.xpos = 0;;
	this.ypos = 0;;
	this.color = "";
	this.special = "none";
}


// Create a house for example 10x10, Stored in the array gridItemArr
function createHouse(size){
	
	var tempGridItem;
	var xpos = 0;
	var ypos = 0;
	randnum = Math.random();
	
	for (var count = 0; count < size; count++) {
		
		tempGridItem = new gridItem();

		//console.log("XPOSSSSS: "+xpos);
		ypos = 0;
		
		for (var count2 = 0; count2 < size; count2++) {
			
			tempGridItem = new gridItem();

			//console.log("YPOSSSSSS: "+ypos);
			// X = 0, Y = 0,1,2,3,4,5...
			// X = 1, Y = 0,1,2,3,4,...
			// And so on
			tempGridItem.xpos = xpos;
			tempGridItem.ypos = ypos;
			
			ypos++;
			gridItemArr.push(tempGridItem);

		}
		
		xpos++;
	}
	
	console.log("GRID ITEM ARRAY LENGTH: "+ gridItemArr.length);
	
	
}

///////////////////////////////////////////////////////////////////////////////////////
//									END MAP CREATION LOGIC
///////////////////////////////////////////////////////////////////////////////////////




///////// HELPER FUNCTIONS //////////////////


// **** Given an array, return unique items ****

function sortUnique(arr) {
    arr.sort();
    var last_i;
    for (var i = 0; i < arr.length; i++)
        if ((last_i = arr.lastIndexOf(arr[i])) !== i)
            arr.splice(i + 1, last_i - i);
    return arr;
}


// **** Give us random number between min and max (e.g 10,15)   ****

function randomIntFromInterval(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}

// **** Given a players X and Y location, and a direction, see if the position exists in the gridItemArr ****

function tryMovePlayer(x, y, direction) {

	switch (direction) {
		case "up":
			//console.log("TRYING TO MOVE PLAYER WITH XPOS: "+x+" , ypos: "+y)
			for (var counter = 0 ; counter < gridItemArr.length; counter++) {

				if (gridItemArr[counter].ypos === y - 1 && gridItemArr[counter].xpos === x) {
					
					return true;
				}
			}
			return false;
			break;

		case "down":
			//console.log("TRYING TO MOVE PLAYER WITH XPOS: "+x+" , ypos: "+y)
			for (var counter = 0 ; counter < gridItemArr.length; counter++) {
				if (gridItemArr[counter].ypos === y + 1 && gridItemArr[counter].xpos === x) {
					
					return true;
				}
			}
			return false;
			break;

		case "left":
			for (var counter = 0 ; counter < gridItemArr.length; counter++) {
				if (gridItemArr[counter].ypos === y && gridItemArr[counter].xpos === x - 1) {

					return true;
				}

			}
			return false;
			break;

		case "right":
			for (var counter = 0 ; counter < gridItemArr.length; counter++) {
				if (gridItemArr[counter].ypos === y && gridItemArr[counter].xpos === x + 1) {

					return true;
				}
			}
			return false;
			break;

		default:
			console.log("ERROR SOMEWHERE WHEN TRYING TO MOVE");

	}

}

// Return us true if item x,y match any array items x,y

function findPosition(item, array){

  var tempx;
  var tempy;

  for (var x = 0; x < array.length; x++){
    tempx = item.xpos;
    tempy = item.ypos;
    
    //console.log("TempX: "+tempx, ", TempY: "+tempy + "arrayx: "+array[x].xpos, ", arrayY: "+array[x].ypos);
    if (tempx !==undefined && tempy!==undefined && array[x].xpos!==undefined && array[x].ypos!==undefined){
        if (tempx === array[x].xpos && tempy === array[x].ypos){
        return x;
      }
    }

  }

  return 0;
}


	

console.log("Listening on port " + port);