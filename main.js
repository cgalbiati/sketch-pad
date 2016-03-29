//  quadrant vs position - store both on sprite?  convert to quadrant from position?
//how should I be doing tilesize??
//collision - radius or box

//width and height set by css??


// Create the canvas
// var canvas = document.createElement("canvas");
// var ctx = canvas.getContext("2d");
// canvas.width = 512;
// canvas.height = 480;
// document.body.appendChild(canvas);




//animates a sprite between two positions
//returns a promise


//draw board with data
//could include board, sprites, etc
//will create default board if one is not given
function init (canvas, data){
  if(canvas){
    var ctx = canvas.getContext("2d");
    var width = canvas.width;
    var height = canvas.height;
  } else throw new Error('Could not get canvas')
}

function posToQuadrant(position, map){
  var x = Math.floor(position[0]/map.tilesize[0]);
  var y = Math.floor(position[1]/map.tilesize[1]);
  return [x, y];
}

function quadrantToPos(quadrant, map){
  var x = Math.floor(quadrant[0]*map.tilesize[0]);
  var y = Math.floor(quadrant[1]*map.tilesize[1]);
  return [x, y];
}


class Board {
  constructor(numCols, numRows, width, height){
    //make quadrantsArr
    this.quadrantsArr = this.makeQuadrantsArr(numCols, numRows);
    this.tileSize = this.getTileSize(width, height, numCols, numRows);
  }
  makeQuadrantsArr (numCols, numRows) {
    var board = [];
    for(var i=0; i<numRows; i++){
        board.push([]);
        for(var j=0; j<numCols; j++){
            board[i].push({});
        } 
    }
    return board;
  }

  addSprite(sprite, pos){
    var name = sprite.name;
    //add to quadrantsArr array
    // this.quadrantsArr[pos[0]][pos[1]][sprite.name] = sprite;
    this.quadrantsArr[pos[0]][pos[1]].push(sprite);

    //render on board


  }
  removeSprite(sprite){
    var pos = sprite.quadrant;
    var name = sprite.name;
    //remove from quadrantsArr
    // delete this.quadrantsArr[pos[0]][pos[1]][name];
    var foundIdx = -1;
    this.quadrantsArr[pos[0]][pos[1]].some(item, idx => {
      if(item.name === sprite.name){
        foundIdx = idx;
        return true;
      } 
    });
    if(foundIdx>-1) this.quadrantsArr[pos[0]][pos[1]].splice(foundIdx, 1);
    else throw new Error('Could not find item to delete');
    
    //remove from board (un-render)
  }
  //TODO: make responsive???
  getTileSize(width, height, numCols, numRows){
    if(!numRows) numRows = this.quadrantsArr.length;
    if(!numCols) numCols = this.quadrantsArr[0].length;
    return [width/numCols, height/numRows];
  }
}


//sprites are objects with methods
//imgLoc is an obj with keys imgUrl, x, y, width, height
//options: {
  //imgUrl
  //imgx, imgy, img, imgWidth, imgHeight, 
  //type='Sprite', 
  //passable=true, 
  //position=null
  //quadrant
//}
class Sprite {
  constructor(map, name, options){
    // if(!quadrant){
    //   if (!position) quadrant = [0, 0];
    //   else {
    //     var x = Math.floor(position[0]/map.tilesize[0]);
    //     var y = Math.floor(position[1]/map.tilesize[1]);
    //     quadrant = [x, y];
    //   }
    // }
    this.name = name;

    this.position = options.position || [0,0]
    if(options.imgUrl) this.imgUrl = options.imgUrl;
    this.imgX = options.imgX || 0;
    this.imgY = options.imgY || 0;
    this.width = options.width ||null;
    this.height = options.height || null;
    this.type = options.type || 'Sprite';
    this.passable = options.passable || true;
    this.map = map;
  }

  draw(map, ctx){
    var tileSize = map.tileSize;
    var self = this
    //check what options are actually there
    var img = new Image();
    img.src = this.imgUrl;
    var stuff = document.getElementById('lalala')
    // stuff.appendChild(img)
  img.onload = function(){
      if(!self.height) self.height = img.height;
      if(!self.width) self.width = img.width;
      ctx.drawImage(img, self.imgX, self.imgY, self.width, self.height, self.position[0], self.position[1], tileSize[0], tileSize[1]);
  }

    console.log(this.position)

    ctx.fillStyle = "rgb(200,0,0)";
        ctx.fillRect (10, 10, 55, 50);

        ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
        ctx.fillRect (30, 30, 55, 50);
  }

  //returns a promise
  move(x, y){
    //test passable

    //tween on board
    //change quadrant array position
  }
  //returns a promise
  bounce(direction){

  }

  tween(x, y, map){
    //make rendered version without moving objects
    //each move - replace square with empty version, draw obj in new position
  }

  tweenCollision(x, y, map){
    //test for colisions in each position???
    return true;
  }

  getQuandrant(map){
    return true;
  }
}

// class Avatar extends Sprite {
//   constructor(){
//     super()
//     this.type = 'Avatar';
//   }
// }

// class Obstacle extends Sprite {
//   constructor(){
//     super()
//     this.type = 'Obstacle';
//   }
// }


// var arr = [{name:'a'}, 
//   {name:'b'}, {name:'c'}, 
//   {name:'d'}, {name:'e'}, 
//   {name:'f'}, {name:'g'}, 
//   {name:'h'}, {name:'i'}, 
//   {name:'j'}];

// var obj = {a:{name:'a'}, 
//   b:{name:'b'}, c:{name:'c'}, 
//   d:{name:'d'}, e:{name:'e'}, 
//   f:{name:'f'}, g:{name:'g'}, 
//   h:{name:'h'}, i:{name:'i'}, 
//   j:{name:'j'}};

// function loop (arr, name){
//   var foundIdx = -1;
//   arr.some(function (item, idx) {
//       if(item.name === name){
//         foundIdx = idx;
//         return true;
//       } 
//     });
//     if(foundIdx>-1) arr.splice(foundIdx, 1);
//     return arr;
// }

// console.time("loop");
// loop(arr, 'j')
// console.timeEnd("loop");
// console.time('delete');
// delete obj.f;
// console.timeEnd('delete');



document.addEventListener("DOMContentLoaded", function(event) { 
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");

  var board = new Board(6, 6, 300, 300);

  var sprite = new Sprite(board, 'me', {position:[200,100], imgUrl:'images/sprites.png', width:50, height: 50, imgX: 100, imgY:100});
  console.log(canvas)
  console.log(sprite)
  sprite.draw(board, ctx)

});







