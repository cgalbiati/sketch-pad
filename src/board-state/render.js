'use strict';
var Promise = require('bluebird');

//TODO: return a promise
export default function renderAll(ctx, boardState){
  //loop through tiles
  let drawnTiles = Promise.map(Object.keys(boardState.tiles), tileName=>{
    if (tileName !== 'tileSize' ) return drawTile(ctx, boardState, tileName);
  });
  return Promise.all(drawnTiles);
  //TODO: don't render things in dontdrawset
  //check if item matches something in dontDraw
  //check if mult instances
  //draw item
}

//TODO: return a promise
export function drawTile(ctx, boardState, tileName){
  console.log(boardState.tiles, tileName)
  boardState.tiles[tileName].forEach(sprite=>drawSprite(ctx, boardState, sprite));
  return Promise.resolve();
}

//returns a promise
export function drawSprite(ctx, boardState, sprite){
  console.log('in draw sprite', boardState, sprite)
  const tileSize = boardState.tiles.tileSize; // [x,y] pixels
  let spritePos = boardState.sprites.get(sprite); // [x,y] pixels
  // var prom = new Promise(); // resolves after load and draw
  
  let img = new Image();
  img.src = sprite.imgUrl;
  img.onload = () => {
    //check what options are actually there
    if(!sprite.height) sprite.height = img.height;
    if(!sprite.width) sprite.width = img.width;
    ctx.drawImage(img, sprite.imgX, sprite.imgY, sprite.width, sprite.height, spritePos[0], spritePos[1], tileSize[0], tileSize[1]);
    //resolve promise to signify finished loading and drawing
    // prom.resolve();
  };
  // return prom;
  return Promise.resolve('hi')
}