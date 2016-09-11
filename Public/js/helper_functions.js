// Sort the original array so that only unique grid items exist
function findUnique(gridItemArr){
  var sortedArr = [];
  var shouldPush = true;
  var tempx;
  var tempy;
  
  for (var x = 0; x < gridItemArr.length; x++){
    shouldPush = true;
    tempx = gridItemArr[x].xpos;
    tempy = gridItemArr[x].ypos;
    
    for (var y = 0; y < sortedArr.length; y++){
      
      if (tempx === sortedArr[y].xpos && tempy === sortedArr[y].ypos){
        shouldPush = false;
      }
      
    }
    
    if (shouldPush){
      sortedArr.push(gridItemArr[x]);
    }
  }
  
  return sortedArr;
}

// Sort the original array so that only unique grid items exist
function isUnique(item, array){
  
  var uniqueItem = true;
  var tempx;
  var tempy;
  
  //console.log("X: "+item.xpos, ", Y: "+item.ypos);
  for (var x = 0; x < array.length; x++){
    tempx = item.xpos;
    tempy = item.ypos;

  //console.log("TempX: "+item.xpos, ", TempY: "+item.ypos + "arrayx: "+array[x].xpos, ", arrayY: "+array[x].ypos);

    if (tempx === array[x].xpos && tempy === array[x].ypos){
      uniqueItem = false;
    }
  }
  
  //console.log(uniqueItem);
  //console.log(array.length);
  return uniqueItem;
}

function findPosition(item, array){

  var tempx;
  var tempy;
  //console.log(item);
  //console.log(array.length);
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

function redrawSquare(xpos, ypos){
  
}

function redrawSquare(xpos, ypos, array, currentZoom){

  var tempx;
  var tempy;
  //console.log(item);
  //console.log(array.length);
  for (var x = 0; x < array.length; x++){
    tempx = xpos;
    tempy = ypos;
    
    //console.log("TempX: "+tempx, ", TempY: "+tempy + "arrayx: "+array[x].xpos, ", arrayY: "+array[x].ypos);

    if (tempx !==undefined && tempy!==undefined && array[x].xpos!==undefined && array[x].ypos!==undefined){
        if (tempx === array[x].xpos && tempy === array[x].ypos){
            drawSquare(array[x].xpos, array[x].ypos, array[x].color , currentZoom);
      }
    }

  }

  return 0;
}

