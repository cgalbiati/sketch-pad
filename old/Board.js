'use strict';

//  tile vs position - store both on sprite?  convert to tile from position?
//how should I be doing tilesize??
//collision - radius or box

//should new Sprite() add to map???

//width and height set by css??


// Create the canvas
// var canvas = document.createElement("canvas");
// var ctx = canvas.getContext("2d");
// canvas.width = 512;
// canvas.height = 480;
// document.body.appendChild(canvas);

//animates a sprite between two positions
//returns a promise


//board state - tile -sprite relationships
//SpriteActions
//  attemptMove
    //addSprite
    //removeSprite
//dispatch axns to actionhandler
//actionHandler - reducer
// -return new board
//look at state of board and tell whther acn has succeeded

// const boardState = () {
//   //contains nested arr of sets for each tile
//   tiles: []
// }





//draw board with data
//could include board, sprites, etc
//will create default board if one is not given
function init (canvas, data){
  if(canvas){
    canvas.width = canvas.height = 300;
    var ctx = canvas.getContext("2d");
    var width = canvas.width;
    var height = canvas.height;

    //make board
    var boardData = data.board || {};
    var board = new Board(ctx, width, height, boardData.numCols || 6, boardData.numRows || 6);

    //add sprites
    if (data.sprites){
      for (sprite in data.sprites){
        let sprite = new Sprite(this, sprite.name, sprite.options);
      }
    }
    //render board
    board.renderAll();
    return board;
  } else throw new Error('Could not get canvas');
}

class Board {
  constructor(ctx, width, height, numCols=6, numRows=numCols){
    //make tiles
    this.ctx = ctx;
    this.width = width;
    this.height = height;
    this.tiles = this.makeTiles(numCols, numRows);
    this.tileSize = this.getTileSize(width, height, numCols, numRows);
    this.__sprites = new Map();
  }

  makeTiles (numCols, numRows) {
    var board = [];
    for(var i=0; i<numRows; i++){
        board.push([]);
        for(var j=0; j<numCols; j++){
            board[i].push(new Set());
        } 
    }
    return board;
  }

  getTile(pos){
    return this.tiles[pos[0]][pos[1]];
  }

    //TODO: make responsive???
  getTileSize(width, height, numCols, numRows){
    if(!numRows) numRows = this.tiles.length;
    if(!numCols) numCols = this.tiles[0].length;
    return [width/numCols, height/numRows];
  }

  pixelToTile(pixel, tileSize){
    var tile = Math.floor(pixel/tileSize);
    return tile > 0 ? tile : 0; 
  }

  tileToPixel(tile, tileSize, max){
    var pixel = Math.floor(tile*tileSize);
    return pixel < max ? pixel : max;
  }

  posToTile (position){
    var x = this.pixelToTile(position[0]/this.tilesize[0]);
    var y = this.pixelToTile(position[1]/this.tilesize[1]);
    return [x, y];
  }

  tileToPos(tile){
    var x = this.tileToPixel(tile[0]*this.tilesize[0]);
    var y = this.tileToPixel(tile[1]*this.tilesize[1]);
    return [x, y];
  }

  getSpritePos(sprite){
    return __sprites.get(sprite);
  }

  addSprite(sprite, pos){
    if (sprite instanceof Sprite === false) {
      //make new Sprite
    } 
    //add to sprites
    this.__sprites.set(sprite, pos);
    //add to tiles
    getTile(pos).add(sprite);
  }

  removeSprite(sprite){
    var pos = getSpritePos(sprite);
    //remove from tiles
    let found = this.tiles[pos[0]][pos[1]].delete(sprite);
    if (!found) throw new Error('Could not find item to delete');
    
    //remove from board (un-render)
    this.renderAll();
    //TODO: only re-render that square
  }

  drawSprite(sprite){
    const tileSize = this.tileSize;
    let tile = this.getSpritePos(sprite);
    let tilePos = tileToPos(tile);
    let ctx = this.ctx;
    
    let img = new Image();
    img.src = sprite.imgUrl;
    img.onload = () => {
      //check what options are actually there
      if(!sprite.height) sprite.height = img.height;
      if(!sprite.width) sprite.width = img.width;
      ctx.drawImage(img, sprite.imgX, sprite.imgY, sprite.width, sprite.height, tilePos[0], tilePos[1], tileSize[0], tileSize[1]);
    };
  }

  renderAll(dontDrawSet){
    const self = this;
    //loop through tiles
    this.tiles.forEach(row=>{
      row.forEach(tile=>{
        console.log(tile)
        tile.forEach(item=>{
          console.log('item', item)
          self.drawSprite(item);
        });
      });
    });
    //TODO: don't render things in dontdrawset
    //check if item matches something in dontDraw
    //check if mult instances
    //draw item
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
  //tile
//}

// function makeName(map){
//   var name = map.sprites.size;
//   while(map.sprites.get(name)) name = (name+1)*2;
//   return name;
// }

class Sprite {
  constructor(options){
    if (!options) options = {};
    //if no name give unique name
    this.name = options.name || null;
    if (options.imgUrl) this.imgUrl = options.imgUrl;
    this.imgX = options.imgX || 0;
    this.imgY = options.imgY || 0;
    this.width = options.width ||null;
    this.height = options.height || null;
    this.type = options.type || 'Sprite';
    this.passable = options.passable || true;
  }

  //returns a promise
  move(x, y){
    //test passable

    //tween on board
    //change tile array position
  }

  moveOne(direction){}

  //returns a promise
  bounce(direction){
    //tween one way and then back
  }

  tween(start, end, board){
    //make rendered version without moving objects
    //each move - replace square with empty version, draw obj in new position
  }

  tweenCollision(x, y){
    //test for colisions in each position???
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

// addSprite(sprite){
//     var name = sprite.name;
//     var quad = sprite.tile;
//     //add to tiles array
//     // this.tiles[quad[0]][quad[1]][sprite.name] = sprite;
//     console.log('quad', this.tiles[quad[0]][quad[1]])
//     this.tiles[quad[0]][quad[1]].push(sprite);

//     //render on board


//   }

// if(!options.tile){
    //   if (!options.position) tile = [0, 0];
    //   else {
    //     var x = Math.floor(options.position[0]/map.tileSize[0]);
    //     var y = Math.floor(options.position[1]/map.tileSize[1]);
    //     this.tile = [x, y];
    //   }
    // }



// document.addEventListener("DOMContentLoaded", function(event) { 
//   var canvas = document.getElementById("canvas");
//   var ctx = canvas.getContext("2d");

//   var board = new Board(ctx, 300, 300, 6, 6);
//   console.log(board)

//   var sprite = new Sprite(board, {name: 'me', position:[200,100], imgUrl:'images/sprites.png', width:50, height: 50, imgX: 50, imgY:50});
//   var sprite2 = new Sprite(board, {name:'lala', position:[250,100], imgUrl:'images/sprites.png', width:50, height: 50, imgX: 150, imgY:150});
//   var sprite3 = new Sprite(board, {position:[200,200], imgUrl:'images/sprites.png', width:50, height: 50, imgX: 100, imgY:100});
//   var sprite4 = new Sprite(board, {position:[100,100], imgUrl:'images/sprites.png', width:50, height: 50, imgX: 250, imgY:150});
//   // console.log(canvas)
//   console.log(sprite)
//   // board.addSprite(sprite)
//   // board.addSprite(sprite2)
//   // board.addSprite(sprite3)
//   // board.addSprite(sprite4)
//   board.renderAll()

// });

// var x = new Map();
// x.set('me', {a:4});
// x.set('1', 3);
// x.set(2, 'hi');

// console.log('map', x);
// console.log("'1'", x.get('1'))
// console.log("2", x.get(2))
// console.log("me", x.get('me'))
// var z = 2;
// console.log("2 var", x.get(z))
// console.log(x)








