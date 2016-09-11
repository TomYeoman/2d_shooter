// Set default zoom
var currentZoom = 30;
// Contains array of gridItems
var gridItemArr = [[]];

var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');

var startx = $('#canvasContainer').width() / 2, starty = $('#canvasContainer').height() / 2;
canvas.width = $('#canvasContainer').width();
canvas.height = $('#canvasContainer').height();

var input = ">^^v^<>v<<<v<v^>>v^^^<v<>^^><^<<^vv>>>^<<^>><vv<<v^<^^><>>><>v<><>^^<^^^<><>>vv>vv>v<<^>v<>^>v<v^<>v>><>^v<<<<v^vv^><v>v^>>>vv>v^^^<^^<>>v<^^v<>^<vv^^<^><<>^>><^<>>><><vv><>v<<<><><>v><<>^^^^v>>^>^<v<<vv^^<v<^<^>^^v^^^^^v<><^v><<><^v^>v<<>^<>^^v^<>v<v^>v>^^<vv^v><^<>^v<><^><v^><><><<<<>^vv^>^vvvvv><><^<vv^v^v>v<<^<^^v^<>^<vv><v<v^v<<v<<^^>>^^^v^>v<><^vv<<^<>v<v><><v^^><v<>^^>^^>v^>^<<<<v><v<<>v><^v>^>><v^^<^>v<vvvv<>>>>>^v^^>v<v<^<vv>^>^vv^>vv^^v<<^<^^<>v>vv^v>><>>>v^>^>^^v<>^<v<<>^vv>v^<<v>v<<><v>^vvv<v<vvv^v<vv<v^^^>v><<^<>><v^^>^v^>>^v<^<><v<>>v^<>>v<>>v^^^><^>>vvvv>^v<^><<>>^<>^>vv><v<<>>^^>v^^^><^<<^^v>v<^<<>v>^^vvv^v^>v^<>^^<>v^v>v>v<v^>vv>^^v<>v>>^<>><>v>v^<<vvvv<vvv><v^<^>^v<>>^><v>><>^<v>v<v>vv^>>vvv<>v>v<v^>>^>>v<<>^<>^<>>>^v<<<^<^v>vv^>><<><v^>^v^^^v<>^^vv><>><>>^>v^<v<>v<>>^<<^v>^^^<>^v^><>v<<v>vv^>vv<<>>><<^v^<>v<vv>>>^^<>^><<^>vv>>^<<v^^vv<>>><v>v><^<v<<>>>^^<>>^<^v><>vv^^^v>vvv>^><<>^^>^<<v^<v<^v<<>vvv<^<<>^>^v<vv<^>vvv>v>vv^<v^><>>^vv<^^^vv><^vv<v^<><v^vvv><<^>^^><v<<vv^>v<vv<v>^<>^v<<>v<v^v^>^>^>v<<^vvv<<<v>^^>^<<<<>vv>>^<>^>>>v<v>^^<v^<v<>>>vv>^^v<<>>>^^v><<<v<v<^v<>^^><v<^v<<v^><><^<><v<^^v>>><v^^v<<v^><^<><<v^>><^<>v>v^<><^<v>^v^>^>^vv^>^^<<vv^>vv<^vvv<>>^^<^>v^>^>^<v^><v<v>>>v<<<><^v<<><^<vv^v^^^>v<^^<v^vvv<v<><v<vv<^vv<>vv<v^<>>vvvvv<<>^v^v>vv>>>vvv^^<^<^<><>v<v>><^v><^<<<>><<<v>^>v<>^>^v>>^<>v^<^>><<>^<v>^>^^^>^^<v>>>><>^v^v><<<<vv^<vv<>vv>v<>v^<v^>v><>>>v^<><^vvv>vv^<^<<^<^^v>^>>>v<^<^v^^<^<^>>><v>vv>^<<><>^>>v>^<<>><^<>v<>vv^^>^>vvv^v<<^<^^<vv<>^vvv<^^v^vv^>>v<^>^^<v^<>v<^<^vv>v<<vv>vv>^>vvv>>>^^>v<>^v>v^<^>>v>^^v>>>>v^<v>v<^>v<v<<>>^v<^^<v><^<>>^<<vv^>>v<<v>^v<>><^>vv<v<^>>^^<vvvvvvvvv>>>v<v<>v^<>>^vv<v^^v<<^vvv^<<^><>vv<><<>>v>vv^><>>^^v^>>v^v^><<<>>^^<^v<<^<>>>>^<^>v^><<^>v<^v<^>>^^<<<<><^<^v^v<>>^v<^<<vv^<><^^vv><v^v^v>^>>^>^vv^>^v<v^v<<vvv^><>>^v^^><>v>vv><^>>vv<vvv<<<<^<>vvv^v<v>^<v<^>^<^<v<><>v^^^^<<vv<^^vv<v>><<v^><>>><v^>^v><^>^><vv^<><^<v>><<^vv<>>v^<<v<>v><v<><><vv>^>>v^<^<v>^><>>><^><v^v<>>>^^<^>v<v>vvv<>^<<><v^^>^>>v<^v>^>v>>>vv>v>>v^^^<^<vvv^<>^>^<v^<v^v>v>^>vv>vvv<>v<^>v>^^>>^<vv^^v>v^^^^^v^vv><^<><>^>vv<^>>^vvvv^^^>^<vv>^v<<^><^^>^<>^^>^<<v<^>>>^><<^^>v^v>>^>vvvv>^^v><v>>vv><<<vv<^>v>^^^<v>v^vvv<^><<^>^<>^><<<<<v^<<vv^v>^<>v<v>^>^>><>v^v<^vv^^>vv<<v^v>vv^vvv<<<<>^v<v^^v^v>v<<v>^^<>^vv^^>^>^v^vv^>>v^vv^^<vv><<v^v^^v><vv<^vvv<vv^^<<v>v^v^^^^v<^<^>v>^>v>^vv^v^^<v<^vvvv<<<>^<^^^<^^<>^<><vv<^^<<^>>><v^vvvv>^<>>^^>v^^v^<<v^^^<<<><^<v^v^^v<v^<>v><<v<>^v>v<^><^>vv^^<vvv<^v>>v>^<><v^><^^^<v^>>vv<<<<<^<>^v^v>^vv^<>v>v<^>vv<<^vv>vv<v<><>>v>><v<^<^^>><<v^v<<^><v<^<vv<v<<vv^>^<<><^^>^<^>>^<vv>><v<<vvv<^^v^>^^<^v>^v<v<>v><v^v^<<^<><<v<<^v>v<<>>^>v>>v>>v<^<<^<^>>>v>^^^v><^>^^>>v<<>^v><v>vvv^vv<<<>vvv<<>^>>>v<v<v^<^<^>^<^>v^^v<^^<v<>v<>>^^>^v^>v<<<<^<>v^><<<v>>>><<v^<^vv>v>><>>^<<<^<^^>v<>>v<>vv<<^<<><<^>v^^^vv^>vvvv>>v>v^><<v<>vv^<<><<vvv>^>>>^<<<^<^<<v>^>v<>>v>>vv^^><<<<^^^v>><<^><v><v^^><v<<v^^v^^v>>v<><><<>^><v><^<vv>><^v<>v<vvv<>^>><v>>v<^><<v>^<>^v><^><^^<v>^><^^v^<<><>>^>v^<^v^vv<><^>vv^>v^vvv^<>>^><^<^<>^<<v^v<^v><>^v<v>>^>>^v^vv>><vv><v^^<<^v^<>^v<<>^><^>><v>>v<<<v^^vv<>^^v>>><><><<v^<<<v^<^^><v^>v^^vv<v^<>>vv^<^v<>^v>>v^v>v<^^vv><>^v<<>v^<>v^>>v>vvv<^><><^^>^vv^>>v^>^<^^<><>><<>^^^><^v^v><<<><<^v^vv>v>><^>>><v^>v<v><><v^v<>v^^>>v<<>v>v<v<v<^^<><>v^^<>>v<^v<v>v<><v<v>^<<>v>vv^^<>>^^^<>^^>^v>v>>>^v^v><v^^<><v>^^v^v<^<^^><<v<^<^<>^<>><<>^>>^>^^><v><>v<><>><<<>>>>vv>>>^>>^v<^>v^^^v<<vv>><<<^<<<>>>>>^>vv<^v^<>^<v^>^v><v>vvv<>>>^v^^^v<<<<>>^^<vv<^<^^>^<>v<^<<<>><>>v<^<>^<vvv<^<>><><<v>^^^>^^<<v<v^>^^v^>><<^vv><v>^v>>^<v>v>^^>^v>^vvv<>v^v^^<><vv>vv^>>><>v<^><v<v^<><<<>^v>^v<<<^>^>^>v^v<<><vvv<<v^^<><v>^>>><vv>><v>>v^<vv>>vv<<^v^v<<><^v<vv>>>vv<>>>>^vv>v^<>vv>v^v<v^><v<^^^^^>vv<><<vvv^<v><^<vv><^^^vv^<>^^^^<^><^<>v^<v^v<<^v<<^^<>>^<v^^>>>vv<vvv<>v<<>><^vvv^<<^^<<>>>^<>>>v^^><>><<>><v^v>>>>>><>>><v^<<vvv^>v<>>v^<>vv<><^^^^v^<<^<v^vv><<^^>v<^vvv^v>>v>^>>v>^^><<v^<>v<>vv<^v^vv><v><<vv^v>>v^>>v<^^^>^><<v<>^><>v>>>vvv<v<vv<^>>^v<v>^<^^^^^v><>v><>v^v^v<v^vv^v>vvvv<>vv<<<vv<v<<>^<^>^^v^<<>^<v><^><v<v<><<>v^<<^<><vv>v<<^v>>^v<><v>^>>^^><>v^<^<vvv^>^>^<<<<>vv>^v^v<^^^<vv>><>^^<<v<^<^^>>>v^v<<^^^<v<v<^<>^v<v><v^vv^^v^^v^^<vv<>^<><vv^<^v^<<^><<vvv>^^<^^^<^v>^>^vv><<<^v<v>vv>v<>v^v<v^>v^>>>v^v<>^v<<>^vv>v>v>v^<^>v^^<^>^^^^vv>^^><^>vv^>>^^v>><<<<^><>v<>^<v<vv^>^^><<^><v>v^>^^<^>>><>><v^v<v^<v<vv^v^<<^<vvv>>><vv<^^>>^>^><<v^<>>v>v^v^^><<>vv^v>v^<v><^<>^^<^>v>^<><<<v>^<^<^>^>^>^^v^<<^^v^^<^<>><^>v>>^^<>^^^<<<<v^>^v<^vv>^<<<v<><<v<>vv>>>v><>>><>>v<<<vv><>^v>v<^>><^><><v<>^v^>^v>^v<<><<^<>>v>^><>^>><>><^<v^><v^^<><v><^^>^v^^<>v^<v^<^v<v^^^^^v^<<^>^^^<^v><>^^<<<><<<<<^^>v^vvvv>v<>>vv<^>^v^>v<^vv^v<<><<v>v^v>^^><><^<v^>v><vv><>>><<>^vv<>v>>v<^v>>>v<v>v>v>^vv<<>^^vv<v<^v^<v<v>vv<>^<^<vv<v^<^v^^><<>^>><^v>vv^^v<<^^><<>v^^<><><v^^<v^v>^>^>^>v<^<v>^v^^>v<>vvv<^v<v^v><<v^><<^^><^<<v^v^>v<>^>v><><v>^<v<v>^<^^^>^v<<><<><>vv>v^<>v^><v^v<v><><<v>v<vv><<v>>v>^<<<>vv>>vvv>^^vv^v^^<^^<>v^^<>v>>^^>^>^>v>><^>><>>^<<>><^>v<<<<<<<^v^v<v^<v^^>^<><<v<^>v^>v^vv<<^^vv^>>>>^<>v<^v<>v<vv<^>>v^vv>vv><vv<<^>v>><vv>>>vv^<<<<vv^>v<<<<^^>^^v^><<^<v^>v^>^^<v<>vvv^>^<>vvv<v<^^>v^<<v>><>v<v<>^^<vvv>^>vv><><<<^^vv<v^<v<>v<>><<v><^vv^>^<^>^^^<<<v>vv^<^<<>^>^<vv>v><v<<^><^>^^<vv^v^^>>>>vv^><^^vv><>^<v^v>v<vv>v><<<v>v<v>^><v^^><v>v<^v^>>^^<v^>^^>vv>>vv^><^vv^vv<<^>vv>^v<v><vv><v<vvvvv>^^v^v><v>>>^vv<>v>^^^^<^>><>^v^^^>v<^^<<^^v<vv<>vvv<^>><><^>>^><^<>v<v<<><<v><v^v<>><^>v><<v^<v>v<^<vv^v^v^>vvv^^>v>^<vv^>v^v^<>v>^>>vv>><^^<v<<>^vv<><><<^v<v>v<<vv><>><^v<v>>v^>vvv^v^<<^><v<>^vv^>v^<v<^>>v<v><v><v>>^<<<v^<><<>v>^>^^<v<>>^<>^>^><<<^<<^<<^>^v>>><vvv>><<<<v>>>>>>>^<^v<^>v<>vv<><>v>>^>>^>vv^^><<^<v<v>>^^<<^>v<^>>vv>^<>v><^>v<vv>>>>>>^v<^<<<v^><vv<<>>vv<<><v<><<<v<^<v<>>v<^^^^v^^<^^^<^<vv><<^>><>v<<>v<v<>>>><>v^vv>^>^>>vv^v<v<<><^v>vv^><v<<>v^v<^>vv<<^^v><^>>^^vv<^<>>v^^>><v>^v>>>^>>v>v<>v<^vv><>^<<^>vv>>><><>v^><>v^>v>v><^v<><v<v>^v<<^vv^><^^>><^^^<<<^>v>^v>>><^>><^>>>^^^<^>vv<><<<v^>^<^^>>^^^v^v^v>v<v>>>><^>>>v>^vv<<^^^<^^vv>v<<><v<<^^>v>><<v^^><^>^<^>^v^>v><^<^vv>v>><>^<<vv<<v>v<vv<v>^>^>><^^<v>^v^v<><<>vvv<^<v>^><>^>vvv>>>^><<>><v^^<^<<^v>>^v<v<vv>vv^v^>v<<vvv<^^v^v>^<^>>^>v<^>^v<<><<<^>^<^^^>vv<^^^^vv<v<^^v<<<<v<^v^<><v<<^><<>vv>>><^<^<>>>^>^>>^<<<<<^^v>^>^<>vvv^^<^><^>^^v>^vv^><v^<^<<v^<vvv<<^v<><^><^>>>v>^v>^>^v<vv^v>><v><^><v^^>v^>^<><<><>v<v^>vvv^>^>>v<>^><^>^><vvv>^^v^v>v<>^v^><^>>v>v^><<<^>>^<>^<>>v><>>v^>^>^^<>>v^>^<vvvv<^vvvv^>>vv^<v^v>^vv<>v<>^<v<v>v>^^><^>vv^<^v^<<^<^<><vv<^v<^v><>>>^v^<<^><^>vv<v>v<^>vv^>v<<<>^<><v<^^^>v><^^<>^<^<v^vv^<<^>><<v^v<^vvv<<<>>vvvv^v^^^>v<>>><<>vvv<<^^^>v>v>>v<<v<v^v^>^^v>^><^<><<v^<v<v^^^><>v^^^<v>vv<>^>^^vv>^<<^v<^v><v>>>^>>><^<<>^v>>^>vv<<<v<>^<v><v^<^<>v>v^^v^>><<^v<<<<>v>v>v^^<^><>^^<<<v>vv<>>>^>>v<><v^>^<><vv>v>v^v<v^<^>>^>><<^^<^^v<vv<>><<<v<^<<^^^>vvv^<vvv<^>vv><>><<<^<v^v^^<<^vvv^^<^<><<>^<^<>>vvv<>^<>v^v<><>>v^v><<>>>vvv>v<>^>>^><^>vv<<>>v<<^><>v>>^^<v>^>^<<>><^<<vv<^<vv^vv><>>>><^<v>^>vv<v><>^<>vvvvv^vv<<v<>>>^<<><>^^vvv>>>vv<<^^><^v^^v<>^^>^><^>v^^^^v<^<<vv<vv<>vv^^>v^vv>v><>>vv>^<^<v^v^>>v^v^^v>^>vv^>v<vvvv<^v<^v>^v>^^v<<^>^^<<>^><^v>>>vv^>^^>vvvv>>v<^<v>^>>>v^<><^<^^<v>vv^^><v>v^<>^^^>>><^^v>v>^<<>^<v^>vvv^>^^^><v<^>>v<v>>^v><<><<>v<^<<>^><>^>vv>^<v>^^v<<^v^vvv^^>^vv^<^>^>^^v>v^>^<<><<^>v>>vv^vv><v>>^<<^<v^^<^<v^^vv^><^^<^^><v^^>v^^^<^<>^<>>^v<^vvv^^v^<><^>>>>>v><><<<>vv<^v>><<>vvv<><<vv<<<^>v^^>>^>^v>><><^^v<>><>>v^>^<vv><<<>><><<v>^^<>>v<><^<vv>vv<^v>^<<<<v<^<<^^>>^<><^>><<>^>v>^^^v>>^<^^v><v^v>^><<><>>^>>^<<v<>^v<>^>^<v>>vv>^vvv<<v<<^>^>^<<^^<>^^^^vvv<>^vv<vvvvv^^>^^<^>>><>v^<><^<<^>v^^v<>>^vv<>v^^<>>v^vvvvv<<v^<v^^>>><vvvvv>><^>vv>v^v^<v<^>^^><^>^^^^v<><^v<<>v^>v>>vv<<>^<v^^>vvv>^^<v^<>vv^><>><v^^v<>^>>^>v><>>^^v>^>^>>>^>v<^v>v>^<^^^^^>>v<v<>>v<<^>^<v<<>^^>><<^><>v<>^^^vv<>^^>><<^^>v>vv>vv>v^>^v>v^^<>>><<v><v<<>>v><>vvv^^v>^^>^vvvv^>^<>^vvvv><v><v<>>><>^<^vv<>^v<^v<>^vvv<<>><vvv^>>^><<vv^<v^>^<v<<^^>^^<^^v^>v<>v^v><>><v^^>>^vvv><^vv>v^<^<^v>>v^^>^vvv^<v^^v^^>v<^<>>^<>>>^^<><^^vv<>^vv^<>>>>^^<<^^<>vv^^><>^^<v<<v>^<v^^>^v<><><>vvv>^v^>>vv<<^v<<>><v>^><^>>>^<^<^^>vv^<<^<>>^^><><<v>^^<v>>v<<vvvv>^v^vv>><^^<<^>>v>v<^^^<^><^^vv>^vv<^<vv<>v><^<><v><^^^>>^<><^<v>>>>v^<v>>>>>v<><^^>v<^<^>><v<>^>vv>^^v^v^<<v<><<<^v^><<^<><<<<v<^>><<<>v>>vv><vv<><<^<^<><vv>^^^^<>v<<<<v>vv<>vv^^^>><>vv^><>>^vv<<><^^vv<>v^>>^<<>^<v^<^>v<";
var botAddTimer;

//var input = "vvvvvvvvvvvvvvv<<<<<<>>>>>^^^^<>>>>"

function gridItem() {
	this.xpos;
	this.ypos;
	this.color = "";
	this.special = "none";
}

function person() {
	this.xpos;
	this.ypos;
	this.color = "purple";
}

var player = new person();

// Create initial map, Create a person + draw specials onto the map   // ENTRY POINT


function initialise() {
	//drawMap(currentZoom); // Use "input" global to draw map with
	//input = "";
	xpos = 0; // Left / right
	ypos = 0;  // Up / down
	gridItemArr = [[]];
	//clearCanvas();

	//drawHouse(10);
	//createPerson();
	
	createMap();

	context.stroke();
	createPerson();
	drawSpecials(currentZoom);
}

initialise();

// REBUILD EVENTS

$('#smallRebuild').click(function () {
	createMap();
});

$('#bigRebuild').click(function () {
	generateMap(50000);
	drawMap(currentZoom);
});

$('#addBots').click(function () {
    botAddTimer = setInterval(function(){
        addBot(player, gridItemArr)
    },2000);
    
});

$('#stopBots').click(function () {
    clearTimeout(botAddTimer);
});
// ZOOM EVENTS

$('#zoomOut').mousedown(function () {
	timeoutId = setInterval(zoomOut, 50);
}).bind('mouseup mouseleave', function () {
	clearTimeout(timeoutId);
});


$('#zoomIn').mousedown(function () {
	timeoutId = setInterval(zoomIn, 50);
}).bind('mouseup mouseleave', function () {
	clearTimeout(timeoutId);
});

function zoomOut() {
	if (currentZoom > 3) {
		startx = $('#canvasContainer').width() / 2, starty = $('#canvasContainer').height() / 2;
		currentZoom--;
		reDrawMap(currentZoom);
	}
}

function zoomIn() {
	startx = $('#canvasContainer').width() / 2, starty = $('#canvasContainer').height() / 2;
	currentZoom++;
	reDrawMap(currentZoom);
}


// DRAW FUNCTIONS



function clearCanvas() {
	context.beginPath();
	context.clearRect(0, 0, canvas.width, canvas.height);
}

function drawSquare(x, y, color, gridsize) {
	context.fillStyle = color;
	context.fillRect(startx + (x * gridsize), starty + (y * gridsize), gridsize, gridsize);
}

function drawSpecials(gridsize) {
	for (var count = 0; count < gridItemArr.length; count++) {

		if (gridItemArr[count].special == "dungeon") {
			//console.log("dungeon found")
			var x = gridItemArr[count].xpos;
			var y = gridItemArr[count].ypos;
			context.beginPath();
			radius = gridsize - 5;
			context.arc(startx + (x * gridsize) + gridsize / 2, starty + (y * gridsize) + gridsize / 2, radius, 0, 2 * Math.PI, false);
			context.fillStyle = 'yellow';
			context.fill();
			context.lineWidth = 5;
			context.strokeStyle = '#003300';
			context.stroke();
		}

		if (gridItemArr[count].special == "house") {
			//console.log("house found")
			var x = gridItemArr[count].xpos;
			var y = gridItemArr[count].ypos;
			context.beginPath();
			radius = gridsize - 5;
			context.arc(startx + (x * gridsize) + gridsize / 2, starty + (y * gridsize) + gridsize / 2, radius, 0, 2 * Math.PI, false);
			context.fillStyle = 'red';
			context.fill();
			context.lineWidth = 5;
			context.strokeStyle = '#003300';
			context.stroke();
		}

	}
}


function drawBullet(x, y, gridsize, angle) {

    if (!angle) {
        angle = 0;
    }

    var TO_RADIANS = angle * (Math.PI / 180);


    var imageObj = new Image();
    imageObj.src = 'assets/bullet.png';

    imageObj.onload = function () {

        var xx = startx + (x * gridsize) + gridsize / 2;
        var yy = starty + (y * gridsize) + gridsize / 2;
        var width = gridsize;
        var height = gridsize;

        context.translate(xx, yy);
        context.rotate(TO_RADIANS);
        context.drawImage(imageObj, -width / 2, -height / 2, gridsize, gridsize);

        // Reset
        context.rotate(-TO_RADIANS);
        context.translate(-xx, -yy);

    };

}



var playerObj = new Image();
playerObj.src = 'assets/character.gif';

function drawPlayer(x, y, gridsize, angle) {

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
    context.drawImage(playerObj, -width / 2, -height / 2, gridsize, gridsize);

    // Reset
    context.rotate(-TO_RADIANS);
    context.translate(-xx, -yy);

}

function reDrawMap(gridSize) {

	clearCanvas();

	for (var x = 0; x < gridItemArr.length; x++) {
		drawSquare(gridItemArr[x].xpos, gridItemArr[x].ypos, gridItemArr[x].color, gridSize);
	}

	//drawPlayer(player.xpos, player.ypos, currentZoom);

	context.stroke();
	drawSpecials(currentZoom);
}


// GENERATE MAP

function setColor(tempGridItem) {
	var randnum = Math.random();

	if (randnum < 0.25) {

		tempGridItem.color = "blue";
	}

	if (randnum >= 0.25 && randnum < 0.5) {
		tempGridItem.color = "red";

	}

	if (randnum >= 0.5 && randnum < 75) {
		tempGridItem.color = "green";

	}

	if (randnum >= 0.75) {
		tempGridItem.color = "black";
	}

	return tempGridItem.color;
}

function generateMap(mapSize) {
	input = "";
	for (var x = 0; x < mapSize; x++) {

		var randnum = Math.random();

		if (randnum < 0.25) {

			input += "^";
		}

		if (randnum >= 0.25 && randnum < 0.5) {
			input += "v";
		}

		if (randnum >= 0.5 && randnum < 0.75) {
			input += "<";
		}

		if (randnum >= 0.75) {
			input += ">";
		}
	}

}

var xpos = 0; // Left / right
var ypos = 0;  // Up / down
function createMap() {

	input = "";
	xpos = 0; // Left / right
	ypos = 0;  // Up / down
	gridItemArr = [[]];
	clearCanvas();

	createWoods(7500);
	drawBridge(30);
	createVillage(7500);
	drawBridge(20);
	drawHouse(10);
	context.stroke();
	createPerson();

}

function createWoods(size) {

	var tempGridItem;
	var randnum;

	for (var count = 0; count < size; count++) {

		tempGridItem = new gridItem();
		randnum = Math.random();

		if (randnum < 0.25) {
			input += "^";
			ypos -= 1;
		}

		if (randnum >= 0.25 && randnum < 0.5) {
			input += "v";
			ypos += 1;
		}

		if (randnum >= 0.5 && randnum < 0.75) {
			input += "<";
			xpos -= 1;
		}

		if (randnum >= 0.75) {
			input += ">";
			xpos += 1;
		}

		tempGridItem.xpos = xpos;
		tempGridItem.ypos = ypos;
		tempGridItem.color = "green";

		if (isUnique(tempGridItem, gridItemArr)) {

			gridItemArr.push(tempGridItem);
			drawSquare(tempGridItem.xpos, tempGridItem.ypos, tempGridItem.color, currentZoom);
		}

	}
	console.log(gridItemArr);

}

function createVillage(size) {

	var tempGridItem;
	var randnum;

	for (var count = 0; count < size; count++) {

		tempGridItem = new gridItem();
		randnum = Math.random();

		if (randnum < 0.25) {
			input += "^";
			ypos -= 1;
		}

		if (randnum >= 0.25 && randnum < 0.5) {
			input += "v";
			ypos += 1;
		}

		if (randnum >= 0.5 && randnum < 0.75) {
			input += "<";
			xpos -= 1;
		}

		if (randnum >= 0.75) {
			input += ">";
			xpos += 1;
		}

		tempGridItem.xpos = xpos;
		tempGridItem.ypos = ypos;
		tempGridItem.color = "brown";

		if (isUnique(tempGridItem, gridItemArr)) {

			gridItemArr.push(tempGridItem);
			drawSquare(tempGridItem.xpos, tempGridItem.ypos, tempGridItem.color, currentZoom);
		}

	}
}

function drawBridge(size) {

	var tempGridItem;
	randnum = Math.random();

	// Create a bridge going left / right / up / down from the last point on previous area

	if (randnum < 0.25) {

		for (var count = 0; count < size; count++) {

			tempGridItem = new gridItem();
			input += "^";
			ypos -= 1;

			tempGridItem.xpos = xpos;
			tempGridItem.ypos = ypos;
			tempGridItem.color = "grey";

			gridItemArr.push(tempGridItem);
			drawSquare(tempGridItem.xpos, tempGridItem.ypos, tempGridItem.color, currentZoom);

		}

	}

	if (randnum >= 0.25 && randnum < 0.5) {
		for (var count = 0; count < size; count++) {

			tempGridItem = new gridItem();
			input += "^";
			ypos += 1;

			tempGridItem.xpos = xpos;
			tempGridItem.ypos = ypos;
			tempGridItem.color = "grey";

			gridItemArr.push(tempGridItem);
			drawSquare(tempGridItem.xpos, tempGridItem.ypos, tempGridItem.color, currentZoom);

		}
	}

	if (randnum >= 0.5 && randnum < 0.75) {
		for (var count = 0; count < size; count++) {

			tempGridItem = new gridItem();
			input += "^";
			xpos -= 1;

			tempGridItem.xpos = xpos;
			tempGridItem.ypos = ypos;
			tempGridItem.color = "grey";

			gridItemArr.push(tempGridItem);
			drawSquare(tempGridItem.xpos, tempGridItem.ypos, tempGridItem.color, currentZoom);

		}
	}

	if (randnum >= 0.75) {
		for (var count = 0; count < size; count++) {

			tempGridItem = new gridItem();
			input += "^";
			xpos += 1;

			tempGridItem.xpos = xpos;
			tempGridItem.ypos = ypos;
			tempGridItem.color = "grey";

			gridItemArr.push(tempGridItem);
			drawSquare(tempGridItem.xpos, tempGridItem.ypos, tempGridItem.color, currentZoom);

		}
	}

}

function drawHouse(size) {

	var tempGridItem;
	randnum = Math.random();

	var curx = xpos;

	for (var count = 0; count < size; count++) {

		tempGridItem = new gridItem();
		xpos = xpos - 10;
		ypos -= 1;

		tempGridItem.xpos = xpos;
		tempGridItem.ypos = ypos;
		tempGridItem.color = "black";

		gridItemArr.push(tempGridItem);
		drawSquare(tempGridItem.xpos, tempGridItem.ypos, tempGridItem.color, currentZoom);

		for (var count2 = 0; count2 < size; count2++) {

			tempGridItem = new gridItem();
			input += "^";
			xpos += 1;

			tempGridItem.xpos = xpos;
			tempGridItem.ypos = ypos;
			tempGridItem.color = "black";

			gridItemArr.push(tempGridItem);
			drawSquare(tempGridItem.xpos, tempGridItem.ypos, tempGridItem.color, currentZoom);


		}
	}



}


function generateDungeon() {
	startx = $('#canvasContainer').width() / 2, starty = $('#canvasContainer').height() / 2;
	generateMap(20000);
	currentZoom = 20;
	drawMap();
	createPerson();
}

function drawMap(gridSize) {

	gridItemArr = [[]];
	var tempx = 0;
	var tempy = 0;
	var randnum = 0;

	clearCanvas();

	for (var x = 0; x < input.length; x++) {

		randnum = Math.floor((Math.random() * 100) + 1);

		var tempGridItem = new gridItem();
		tempGridItem.color = setColor(tempGridItem);

		if (input[x] == ">") {
			tempx += 1;
		}
		if (input[x] == "<") {
			tempx -= 1;
		}
		if (input[x] == "v") {
			tempy -= 1;
		}
		if (input[x] == "^") {
			tempy += 1;
		}

		tempGridItem.xpos = tempx;
		tempGridItem.ypos = tempy;

		// 1 in 1000 chance of randnum being 10
		if (randnum == 10) {
			tempGridItem.special = "dungeon";
		}

		if (randnum == 50) {
			tempGridItem.special = "house";
		}

		// Check if this grid location exists in the array already, if not then draw
		if (isUnique(tempGridItem, gridItemArr)) {
			gridItemArr.push(tempGridItem);
			drawSquare(tempGridItem.xpos, tempGridItem.ypos, tempGridItem.color, gridSize);
		}

	}
	context.stroke();

	// Draw any dungeons etc

	// Array will not only contain unique map instances
	//gridItemArr = findUnique(gridItemArr);
}



function createPerson() {

	player = new person();
	// Assign player location of 1st map point created
	player.xpos = gridItemArr[1].xpos;
	player.ypos = gridItemArr[1].xpos;

	var playerObj = new Image();
	playerObj.src = 'assets/character.gif';

	playerObj.onload = function () {

	    drawPlayer(player.xpos, player.ypos, currentZoom);
	};
	
	context.stroke();
}

document.onkeydown = checkKey;

var lastDirection = "up";
var gunshot = new Audio("assets/Gunshot_sound.mp3"); // buffers automatically when created

function checkKey(e) {

	e = e || window.event;

	if (e.keyCode == '38') {
		if (tryMovePlayer(player.xpos, player.ypos, "up")) {

			// Set players new move after testing is this move is allowed
			player.ypos -= 1;

			// Redraw the grid cells with new center point
			starty += currentZoom;

			// Redraw the grid cells with new center point
			reDrawMap(currentZoom);

			// Draw the player onto correct location
			drawPlayer(player.xpos, player.ypos, currentZoom, 270);
			
			lastDirection = "up";
		}

	}

	else if (e.keyCode == '40') {
		if (tryMovePlayer(player.xpos, player.ypos, "down")) {
			player.ypos += 1;

			// Change the location the grid will start drawing from 
			starty -= currentZoom;

			// Redraw the grid cells with new center point
			reDrawMap(currentZoom);

			// Draw the player onto correct location
			drawPlayer(player.xpos, player.ypos, currentZoom, 90);
			
			lastDirection = "down";
		}
	}

	else if (e.keyCode == '37') {
		if (tryMovePlayer(player.xpos, player.ypos, "left")) {

			player.xpos -= 1;
			startx += currentZoom;

			reDrawMap(currentZoom);
			drawPlayer(player.xpos, player.ypos, currentZoom, 180);

      lastDirection = "left";
		}
	}

	else if (e.keyCode == '39') {
		if (tryMovePlayer(player.xpos, player.ypos, "right")) {

			player.xpos += 1;
			startx -= currentZoom;

			reDrawMap(currentZoom);
			drawPlayer(player.xpos, player.ypos, currentZoom,0);
			
			lastDirection = "right";


		}
	}
	else if (e.keyCode == '32') {
	    gunshot.play();
	    gunshot.currentTime = 0;
		fireGun(player, lastDirection, gridItemArr, currentZoom);
	}

}



function tryMovePlayer(x, y, direction) {

	switch (direction) {
		case "up":
			for (var counter = 0 ; counter < gridItemArr.length; counter++) {

				//console.log("TRYING TO MOVE FROM: "+y+" TO " ,y+1, ", X IS "+x);
				//console.log("CURRY: ", gridItemArr[counter].ypos, "CURRX", gridItemArr[counter].xpos);
				if (gridItemArr[counter].ypos === y - 1 && gridItemArr[counter].xpos === x) {

					// After finding the position that the player wants to move too, See if any dungeons are on the square
					if (gridItemArr[counter].special === "dungeon") {
						alert("LANDED ON DUNGEON");
						generateDungeon();
						return true;
					}
					if (gridItemArr[counter].special === "house") {
						alert("LANDED ON HOUSE");
						generateHouse();
						return true;
					}

					return true;
				}
			}
			return false;
			break;

		case "down":

			for (var counter = 0 ; counter < gridItemArr.length; counter++) {
				if (gridItemArr[counter].ypos === y + 1 && gridItemArr[counter].xpos === x) {

					if (gridItemArr[counter].special === "dungeon") {
						alert("LANDED ON DUNGEON");
						generateDungeon();
						return true;
					}
					if (gridItemArr[counter].special === "house") {
						alert("LANDED ON HOUSE");
						generateHouse();
						return true;
					}

					return true;
				}
			}
			return false;
			break;

		case "left":
			for (var counter = 0 ; counter < gridItemArr.length; counter++) {
				if (gridItemArr[counter].ypos === y && gridItemArr[counter].xpos === x - 1) {
					if (gridItemArr[counter].special === "dungeon") {
						alert("LANDED ON DUNGEON");
						generateDungeon();
						return true;
					}
					if (gridItemArr[counter].special === "house") {
						alert("LANDED ON HOUSE");
						generateHouse();
						return true;
					}

					return true;
				}

			}
			return false;
			break;

		case "right":
			for (var counter = 0 ; counter < gridItemArr.length; counter++) {
				if (gridItemArr[counter].ypos === y && gridItemArr[counter].xpos === x + 1) {
					if (gridItemArr[counter].special === "dungeon") {
						alert("LANDED ON DUNGEON");
						generateDungeon();
						return true;
					}
					if (gridItemArr[counter].special === "house") {
						alert("LANDED ON HOUSE");
						generateHouse();
						return true;
					}
					return true;
				}
			}
			return false;
			break;

		default:
			console.log("ERROR SOMEWHERE");

	}

}

