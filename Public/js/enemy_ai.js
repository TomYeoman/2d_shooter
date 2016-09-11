function aibot(){
  this.xpos = 9999999;
  this.ypos = 9999999;
  this.curr_targetx;
  this.curr_targety;
  this.weapon;
}



var botarr = [[]];

function moveBot(player,gridarr){
  
  // For each bot
  for (var count = botarr.length; count++){
    
    // Try to move them a position closer to the player, add the x + y to create a score for square
    
    // Choose square with lowest score
  }
  
}
// Call every 1second while the botarr.size < 10

function addBot(player, gridarr){
  
  console.log("adding bot");
  
  var distance = 5;
  var foundSpot = false;
  var playerxpos = player.xpos;
  var playerypos = player.ypos;
  
  var bot = new aibot();
  
  // EG car at (y:0, x:5
  for (var c = 0; c < distance; c++){
    
    	bot.ypos = playerypos + distance + c   // y = 0 ever time
    	bot.xpos  = playerxpos - c //  x goes from 5,4,3,2,1
    	
    	console.log("TRYING TO ADD POSITION Y: " + bot.ypos + ", X: "+bot.xpos)
    	
    	// IF we've found a valid spot to add a bot
    	if(findPosition(bot, gridarr)){
    	  botarr.push(bot);
    	  foundSpot = true;
    	  break;
    	}
    	
  }

  if (foundSpot){
    
    console.log("FOUND A SPOT FOR THIS BOT?: " + foundSpot)
  	console.log(botarr.length);
  	drawBot(bot);
    
  }

}

function drawBot(bot){
  
      context.beginPath();
      //redrawSquare(bulletPath[counter-1].xpos, bulletPath[counter-1].ypos, gridarr, currentZoom);
      drawSquare(bot.xpos, bot.ypos, "purple" , currentZoom);
      context.stroke();
      
      console.log("TRYING TO MOVE THIS BOT NOW")
  // Find x and y position that is closer to player than current position
  
  // Check if that is a valid positon, if not keep doing check until 1 found
  
  // Move bot
}
