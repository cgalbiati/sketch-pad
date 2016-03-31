const Promise = require('bluebird');
import {createDefaultDimentions, createDefaultTiles, createDefaultSprites, createDefaultState} from './create-data';
import { posToTile } from './positions';

export function size (state=createDefaultDimentions({}), action){
  switch(action.type){
    case 'SET_INITIAL_STATE':
      return createDefaultDimentions(action.size);
  }
  return state;
}
export function tiles (tilesState=createDefaultTiles({}), action){
  switch(action.type){
    case 'ATTEMPT_MOVE':
      //updates tile
      // let endPoint = getValidEndPoint(tilesState, {sprite:action.sprite, target:action.target});
      // MoveSprites
      return tilesState;
    case 'ADD_SPRITE':
      if(validateTile(tilesState, action.pos)) 
        return addSpriteToTiles(tilesState, {sprite: action.sprite, pos:action.pos});
      else return errhandler(tilesState, {message: 'invalid position'});
    case 'REMOVE_SPRITE':
      if(validateSprite(tilesState, action.sprite)) return removeSpriteFromTiles(tilesState, action.sprite);
      else return errhandler(tilesState, {message: 'invalid position'});
    case 'SET_INITIAL_STATE':
      if(!action.size) action.size = {};
      return createDefaultTiles(action.size.numRows, action.size.numCols);
    default:
      return tilesState;
  }
  return tilesState;
}

export function sprites (SpritesState=createDefaultSprites([]), action){
  switch(action.type){
    case 'ATTEMPT_MOVE':
      return SpritesState;
    case 'ADD_SPRITE':
      if(validatePos(SpritesState, action.pos)) return addSpriteToSprites(SpritesState, {sprite: action.sprite, pos:action.pos});
      else return errhandler(SpritesState, {message: 'invalid position'});
    case 'REMOVE_SPRITE':
      if(validateSprite(SpritesState, action.sprite)) return removeSpriteFromSprites(SpritesState, action.sprite);
      else return errhandler(SpritesState, {message: 'invalid position'});
    case 'SET_INITIAL_STATE':
      if(!action.sprites) action.sprites = [];
      return createDefaultSprites(action.sprites);
    default:
      return SpritesState;
  }
  return SpritesState;
}

// export function render (state=createDefaultState(), action){
//   switch (action.type){
//     case: 'RENDER_ALL':
//      return state;
//     case: 'DRAW_SPRITE':
//     case: 'RENDER_SQUARE':
//     default: return state;
//   }
//   return state;
// }

// function reduceBoardState (state=createDefaultState(), action) {
//   switch(action.type){
//     case 'ATTEMPT_MOVE':
//       return state;
//     case 'ADD_SPRITE':
//       if(validateTile(state, action.pos)) return addSprite(state, {sprite: action.sprite, pos:action.pos});
//       else return errhandler(state, {message: 'invalid position'});
//     case 'REMOVE_SPRITE':
//       if(validateSprite(state, action.sprite)) return removeSprite(state, action.sprite);
//       else return errhandler(state, {message: 'invalid position'});
//       return state;
//     default:
//       return state;
//   }
//   return state;
// }

function validateTile(tileState, pos){
  console.log(pos, tileState)
  let tileName = posToTile(pos, tileState.tileSize);
  return !!tileState[tileName];
}
function validatePos(SpritesState, pos){
  return true;
}

function validateSprite(spritesState, sprite){
  return spritesState.has(sprite);
}

//state is board.sprites Map
function addSpriteToSprites(spritesState, {sprite, pos}){
  //spritesState is sprite Map
  let newMap = new Map(spritesState);
  newMap.set(sprite, pos);
  return newMap;
}


function addSpriteToTiles(tilesState, {sprite, pos}){
  //tilesState is tiles dictionary
  let newState = {};
  let tileName = posToTile(pos, tilesState.tileSize);
  let newSet = new Set(tilesState[tileName]);
  newSet.add(sprite);
  newState[tileName] = newSet;
  return Object.assign({}, tilesState, newState);
}

function removeSpriteFromSprites(state, sprite){
  //state is sprite Map
  let newMap = new Map(state);
  newMap.delete(sprite);
  return newMap;
}

function removeSpriteFromTiles(tilesState, {sprite, pos}){
  let newState = {}
  let tileName = posToTile(pos, tilesState.tileSize);
  let newSet = new Set(tilesState[tileName]);
  newSet.delete(sprite);
  newState[tileName] = newSet;
  return Object.assign({}, tilesState, newState);
}

