

function projectile() {
  this.xpos = 0;
  this.ypos = 0;
  this.type = "bullet";
}

var myVar;

var bulletTimerArr = [];
var counter = 0;

var bulletCounter = 0;

function fireGun(player, direction, gridarr, currentZoom){

  counter = 0;
  console.log("FIRING GUN")
  var bulletPath = [[]];
  
  // Store starting position for bullet
  var xpos = player.xpos;
  var ypos = player.ypos;
  
  
  console.log("Player fired gun from x: "+xpos+" ,y: "+ypos+ " , facing direction " +direction);
  if (direction == "left"){
    
    do{
      
      console.log()
      var bullet = new projectile();
      
      bullet.xpos = xpos;
      bullet.ypos = ypos;
      
      xpos --;
      bulletPath.push (bullet);
      
      console.log(findPosition(bullet, gridarr));
    
    console.log(xpos);
    // While the next position that the bullet wishes to travel to exists int he grid array
    // keep adding the new location to the bulletPath array
    }while (findPosition(bullet, gridarr))
    
  }
  
  if (direction == "right"){
    
    do{
      
      console.log()
      var bullet = new projectile();
      
      bullet.xpos = xpos;
      bullet.ypos = ypos;
      
      xpos ++;
      bulletPath.push (bullet);
      
      console.log(findPosition(bullet, gridarr));
    
    console.log(xpos);
    // While the next position that the bullet wishes to travel to exists int he grid array
    // keep adding the new location to the bulletPath array
    }while (findPosition(bullet, gridarr))
    
  }
  
  if (direction == "down"){
    
    do{
      
      console.log()
      var bullet = new projectile();
      
      bullet.xpos = xpos;
      bullet.ypos = ypos;
      
      ypos ++;
      bulletPath.push (bullet);
      
      console.log(findPosition(bullet, gridarr));
    
    console.log(xpos);
    // While the next position that the bullet wishes to travel to exists int he grid array
    // keep adding the new location to the bulletPath array
    }while (findPosition(bullet, gridarr))
    
  }
  
  if (direction == "up"){
    
    do{
      
      console.log("ARR LENGGGTH:" +bulletPath.length);
      var bullet = new projectile();
      
      bullet.xpos = xpos;
      bullet.ypos = ypos;
      
      ypos --;
      bulletPath.push (bullet);
      
      console.log(findPosition(bullet, gridarr));
    
    console.log(xpos);
    
    // While the next position that the bullet wishes to travel to exists int he grid array
    // keep adding the new location to the bulletPath array
    }while (findPosition(bullet, gridarr))
    
  }
  
  console.log(bulletPath);
  console.log(bulletPath.length)
  bulletPath.pop();
  bulletPath.splice(1,1);
  // clearTimeout(myVar);

   myVar = setInterval(function(){
        moveBullet(bulletPath, currentZoom, gridarr, direction)
    },100);
  
   bulletCounter++;
   bulletTimerArr.push(myVar);

   console.log("TIMER ARRAY LENGTH: "+bulletTimerArr.length);
  //console.log(bulletPath);
  //console.log(bulletPath.length)

   
}

function moveBullet(bulletPath, currentZoom, gridarr, direction) {
  
  counter++;
  
  //console.log("MOVING BULLET");

  //console.log("COUNTER" + counter);
  
  if (counter >= bulletPath.length){
    
    redrawSquare(bulletPath[counter-1].xpos, bulletPath[counter-1].ypos, gridarr, currentZoom);
    counter = 0;
    //console.log("CLEARNING");
    clearTimeout(bulletTimerArr[bulletCounter]);
    bulletCounter.splice(0, bulletTimerArr[bulletCounter]);
    
  }
  
  else{

      //drawPlayer(bulletPath[counter].xpos, bulletPath[counter].ypos, currentZoom);
        
      context.beginPath();
      redrawSquare(bulletPath[counter - 1].xpos, bulletPath[counter - 1].ypos, gridarr, currentZoom);

      if (direction == "left") {
          drawBullet(bulletPath[counter].xpos, bulletPath[counter].ypos, currentZoom, 0);
      }
      if (direction == "right") {
          drawBullet(bulletPath[counter].xpos, bulletPath[counter].ypos, currentZoom, 180);
      }
      if (direction == "down") {
          drawBullet(bulletPath[counter].xpos, bulletPath[counter].ypos, currentZoom, 270);
      }
      if (direction == "up") {
          drawBullet(bulletPath[counter].xpos, bulletPath[counter].ypos, currentZoom, 90);
      }

      context.stroke();
      
  }

  // Lazer
  
  //for (var x = 0; x < bulletPath.length; x++){
    
			//context.beginPath();
    	//drawPlayer(bulletPath[x].xpos, bulletPath[x].ypos, currentZoom);
			//context.stroke();

    	//drawSquare(bulletPath[x].xpos, bulletPath[x].ypos, "yellow" , currentZoom);

  //}
  
}


var of;

function setup() {

    var t =
    {
        name: "test",
        colors: ["orange", "red"],
        lifetime: 50,
        angle: [330, 360],
        size: [1, 1],
        speedx: 0.7,
        x: 0.2,
        y: 0.1
    };
    of = new Fountain(null, t);
}

function draw() {
    background(51);
    of.Draw();
    of.Create();
    of.Step();
    noStroke();
    text(of.length, width / 2, 20);
    stroke(0);
}


