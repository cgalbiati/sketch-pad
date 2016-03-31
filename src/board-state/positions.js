'use strict';

export function pixelToTile(pixel, tileSize){
  let tile = Math.floor(pixel/tileSize);
  return tile > 0 ? tile : 0; 
}

export function tileToPixel(tileNum, tileSize, max){
  let pixel = Math.floor(tileNum*tileSize);
  return pixel < max ? pixel : max;
}

//tilesize is [x,y]
export function posToTile ([posX, posY], [tileSizeX, tileSizeY]){
  let x = pixelToTile(posX/tileSizeX);
  let y = pixelToTile(posY/tileSizeY);
  return x.toString()+':'+y.toString();
}

//tilesize is [x,y]
export function tileToPos(tileName, [tileSizeX, tileSizeY]){
  let [tileX, tileY] = getTileCoords(tileName);
  let x = tileToPixel(tileX*tileSizeX);
  let y = tileToPixel(tileX*tileSizeY);
  return [x, y];
}

export function getTileCoords(tileName){
  return tileName.split(':').map(coord=>Number(coord));
}