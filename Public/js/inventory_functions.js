
var sword = "https://cdn1.iconfinder.com/data/icons/outlined-medieval-icons-pack/200/weapons_medieval_sword-512.png";
var armourbody = "";
var armourlegs = "http://www.polyvore.com/cgi/img-thing?.out=jpg&size=l&tid=125844372";
var armourhelmet = "https://www.iconexperience.com/_img/v_collection_png/512x512/shadow/helmet.png";


function addItem(invSlot, item){
  if (invSlot == 1){
    $('#invslot1').append('<img id="drag1" src="'+item+'" draggable="true"ondragstart="drag(event)" width="50" height="40">');
  }

  if (invSlot == 2){
    $('#invslot2').append('<img id="drag1" src="'+item+'" draggable="true"ondragstart="drag(event)" width="50" height="40">');
  }
  
  if (invSlot == 3){
    $('#invslot3').append('<img id="drag1" src="'+item+'" draggable="true"ondragstart="drag(event)" width="50" height="40">');
  }
}

//addItem(1, sword);
//addItem(2, armourhelmet);
//addItem(3, armourlegs);

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
}

