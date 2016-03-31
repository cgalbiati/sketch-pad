'use strict';


import createStore from './create-data-store';
import render from './render';

//createStore can take data as: {size: {numCols, numRows, width, height}, sprites:[]}

function init (canvas, data){
  if(canvas){
    canvas.width = canvas.height = 300;
    var ctx = canvas.getContext("2d");
    var width = canvas.width;
    var height = canvas.height;

    let store = createStore();

    console.log('made', store.getState())

    store.subscribe(renderChanges);

    function renderChanges(){
      let currentState = store.getState();
      return render(ctx, currentState);
    }

    // //make board
    // var boardData = data.board || {};
    // var board = new Board(ctx, width, height, boardData.numCols || 6, boardData.numRows || 6);

    // //add sprites
    // if (data.sprites){
    //   for (sprite in data.sprites){
    //     let sprite = new Sprite(this, sprite.name, sprite.options);
    //   }
    // }
    // //render board
    // board.renderAll();
    // return board;
    return store;
  } else throw new Error('Could not get canvas');
}


document.addEventListener("DOMContentLoaded", function(event) { 
  const canvas = document.getElementById('canvas');

    var sprite = {name: 'me', imgUrl:'images/sprites.png', width:60, height: 60, imgX: 68, imgY:65};
    var sprite2 = {name:'lala', imgUrl:'images/sprites.png', width:60, height: 60, imgX: 130, imgY:130};
    var sprite3 = {imgUrl:'images/sprites.png', width:60, height: 60, imgX: 68, imgY:130};
    var sprite4 = {imgUrl:'images/sprites.png', width:60, height: 60, imgX: 255, imgY:192};

  const startData = {
    // size:{},
    // tiles:{},
    sprites:[sprite, sprite2]
  };

  let store = init(canvas, startData);
  // console.log()

  store.dispatch({type:'ADD_SPRITE', sprite: sprite, pos:[200,100]})
  store.dispatch({type:'ADD_SPRITE', sprite: sprite2, pos:[100,100]})
  store.dispatch({type:'ADD_SPRITE', sprite: sprite3, pos:[200,200]})
  store.dispatch({type:'ADD_SPRITE', sprite: sprite4, pos:[100,200]})
});

// function boo (c, {a, b, stuff}){
//   console.log(stuff, a, b, c)
// }

// boo(4, {a:1, b:2, stuff:3})

//subscribe 
//when changed, run render fn






// function createDefaultDimentions({width=300, height=300, numRows=null, numCols=numRows||6}){
// // export function createDefaultDimentions(){
//   // console.log(arguments)
//   // console.log()
//   //set default for numRows (becuase it can't be set on numCols before numCols is defined)
//   if (!numRows) numRows = numCols;
//   return { 
//     width, height, numRows, numCols,
//     // tileSize: getTileSize(width, height, numRows, numCols)
//     // width: width || 300,
//     // height: height || width || 300,
//     // numRows: numRows ||6,
//     // numCols: numCols || numRows || 6
//   };
// }


// console.log(createDefaultDimentions({}));



