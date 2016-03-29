//  quadrant vs position - store both on sprite?  convert to quadrant from position?
//how should I be doing tilesize??



// Create the canvas
// var canvas = document.createElement("canvas");
// var ctx = canvas.getContext("2d");
// canvas.width = 512;
// canvas.height = 480;
// document.body.appendChild(canvas);


var canvas = document.getElementById("canvas");


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


class Board {
  constructor(numCols, numRows, width, height){
    //make quadrantsArr
    this.quadrantsArr = this.makeQuadrantsArr(numCols, numRows);
    this.tileSize = this.getTileSize(width, height, numCols, numRows);
  }
  makeQuadrantsArr () {
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
class Sprite {
  constructor(map, name, imgLoc, type='Sprite', passable=true, position=null){
    if(!quadrant){
      if (!position) quadrant = [0, 0];
      else {
        var x = Math.floor(position[0]/map.tilesize[0]);
        var y = Math.floor(position[1]/map.tilesize[1]);
        quadrant = [x, y];
      }
    }
    this.name = name;
    this.position = position;
    this.type = type;
    this.passable = passable;
    this.map = map;
  }

  draw(map, ctx){
    var tileSize = map.tileSize;
    ctx.drawImage(this.img, this.position[0], this.position[1], tileSize[0], tileSize[1]);
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
  getQuandrant(map)

}

class Avatar extends Sprite {
  constructor(){
    super()
    this.type = 'Avatar';
  }
}

class Obstacle extends Sprite {
  constructor(){
    super()
    this.type = 'Obstacle';
  }
}


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








