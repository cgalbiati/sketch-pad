//create store //
export function createDefaultState({size={}, sprites=[]}){
  //data : size: {width, height, numCols, numRows}, sprites:[{},{}]

  let sizeInit = createDefaultDimentions(size);
  console.log('lala', sizeInit, sprites)
  
  return {
    size: sizeInit,
    tiles: createDefaultTiles(sizeInit),
    sprites: createDefaultSprites(sprites)
  };
}

export function createDefaultDimentions({width=300, height=300, numRows=null, numCols=numRows||6}){
  //set default for numRows (becuase it can't be set on numCols before numCols is defined)
  if (!numRows) numRows = numCols;
  return { width, height, numRows, numCols,
  };
}

 //TODO: make responsive???
function getTileSize({width, height, numRows, numCols}){
  console.log('here', width, height, numRows, numCols)
  return [width/numCols, height/numRows];
}

//returns board: dictionary of Sets with col/
export function createDefaultTiles({numRows, numCols, width, height}){
//TODO: make functional??
  //make obj with keys for each square
  let tileSize = getTileSize({width:width, height:height, numCols:numCols, numRows:numRows});
  let tiles = {tileSize};
  for(let i = 0; i<numRows; i++){
    for(let j = 0; j<numCols; j++){
      let tileName = i.toString()+':'+j.toString();
      tiles[tileName] = new Set();
    }
  }
  return tiles;
}

//spriteData is array or nothing
export function createDefaultSprites(spriteData){
  //make sprites
  let sprites = spriteData.map(sprite=>makeSprite(sprite));

  let boardSprites = new Map(sprites);

  return boardSprites;
}

export function makeSprite({name, imgUrl, imgX=0, imgY=0, width, height, passable=true, type='Sprite'}){
  return {
    name,
    imgUrl,
    imgX,
    imgY,
    width,
    height,
    passable,
    type
  };
}

// export function makeSprite(data){
//   return {
//     name: data.name,
//     imgUrl: data.imgUrl,
//     imgX: data.imgX || 0,
//     imgY: data.imgY || 0,
//     width: data.width,
//     height: data.height,
//     passable: data.passable || true,
//     type: data.type || Sprite
//   };
// }