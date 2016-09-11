function botobj(){
	this.mapArea = [];
	this.name = "test";
	this.type = "";
	this.speed = 5;
	this.playerModel = "";
	this.xpos = 0;
	this.ypos = 0;
	this.oldxpos =0;
	this.olyypos = 0;
	this.target = "";
	this.position = "0";
}

function randomIntFromInterval(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}

module.exports = {
	
  addBot: function (mapArr) {
	  
	var newbot = new botobj();
	
	// Area bot can travel in
	newbot.mapArea = mapArr;
	
	newbot.name = "Jim";
	newbot.type = "fighter";
	newbot.speed = 5;
	newbot.playerModel;
	
	// Set starting location
	var x = mapArr.length;
	var rand = randomIntFromInterval (0,x);
	//console.log("SPAWN LOCATION:" +rand);
	newbot.xpos = mapArr[rand].xpos;
	newbot.ypos = mapArr[rand].ypos;
	newbot.oldxpos = mapArr[rand].xpos;
	newbot.oldypos = mapArr[rand].ypos;

	newbot.target = "";
	
    return newbot;
  },
  
  
  move: function () {
	  
	return newPosition;
  },
  
  
  firegun: function(){
	  
	  return bulletArr;
	  
  },
  
  setBotTarget: function(bot, connectedPlayers){
	  
	//	console.log("");

	  var targetArr = [];
	  var distanceArr = [];
	  
	  // Loop through all potential targets and find closest
	  for (var x = 0; x < connectedPlayers.length; x++){
		  
		var targetOptions = {};
		var xDistance = findDifference(bot.xpos, connectedPlayers[x].xpos);
		var yDistance = findDifference(bot.ypos, connectedPlayers[x].ypos);

		var totalDistance = xDistance + yDistance;
		
		targetOptions.username = connectedPlayers[x].username;
		targetOptions.xpos = connectedPlayers[x].xpos;
		targetOptions.ypos = connectedPlayers[x].ypos;
		targetOptions.distance = totalDistance;
		targetArr.push(targetOptions);
		
		distanceArr.push(totalDistance);
				
	  }

	  		
	 //console.log("TARGET ARRAY 0: " +targetArr[0].distance);
	 //console.log("TARGET ARRAY 1: " +targetArr[1].distance);
	 //console.log("DISTANCE ARRAY" +distanceArr);
	 
	  var chosenTarget = Array.min(distanceArr);
	  
	  for (var x = 0; x < targetArr.length; x++){
		  //console.log("CHOSEN TARGET DISTANCE:" +chosenTarget +", CURRENT PLAYER DISTANCE: " +targetArr[x].distance );
		  if (targetArr[x].distance === chosenTarget){
			  //console.log("TARGET username: " +targetArr[x].username);
			  //console.log(targetArr[x]);
			  return targetArr[x];

		  }
	  }
	  
	  		//console.log("");

  },
  
	moveTowardTarget: function(bot, connectedPlayers, targetxpos, targetypos){
		bot.oldxpos = bot.xpos;
		bot.oldypos = bot.ypos;
		if (targetxpos > bot.xpos){
			bot.xpos++;
					return bot;

		}
		
		if (targetypos > bot.ypos){
			bot.ypos++;
					return bot;

		}
		
		if (targetxpos < bot.xpos){
			bot.xpos--;
					return bot;

		}
	  
	  	if (targetypos < bot.ypos){
			bot.ypos--;
					return bot;

		}
		
		return bot;
	}
  
};

Array.min = function( array ){
    return Math.min.apply( Math, array );
};

function findDifference(num1 , num2) {
   return Math.abs(num1-num2);
} 