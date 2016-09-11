


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
