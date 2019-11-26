import * as PIXI from 'pixi.js';
import { keyboard } from './utils';

// default to using WebGL but fall back on canvas if WebGL not supported
let type = 'WebGL';
if (!PIXI.utils.isWebGLSupported()) {
  type = 'canvas';
}

PIXI.utils.sayHello(type);

// Aliases for DRY code
let Application = PIXI.Application,
  app = new Application({ width: 768, height: 640 }),
  loader = app.loader,
  resources = loader.resources,
  Sprite = PIXI.Sprite;

//Add the canvas that PIXI automatically created for you to the HTML document
document.body.appendChild(app.view);

// load raw images into PIXI's texture cash and run the callback when done
const spritePath = './pixi/images';
loader
  .add([`${spritePath}/island_scene.gif`, `${spritePath}/boat.png`])
  .on('progress', loadProgressHandler) // this can be leveraged for a loading progress bar
  .load(setup);

function loadProgressHandler() {
  console.log('loading');
}

// declare to-be-Sprite names outside setup() so they can be reused in various fns
let boat, fish;

// declare game state variable outside setup() as well
let pixiGameState;

function setup() {
  // create a Sprite from a texture
  let island_scene = new Sprite(
    resources[`${spritePath}/island_scene.gif`].texture
  );
  boat = new Sprite(resources[`${spritePath}/boat.png`].texture);

  // init position, velocity, and moveReelStart coords
  boat.position.set(32, 32);
  boat.vx = 0;
  boat.vy = 0;

  // add it to the stage
  app.stage.addChild(island_scene);
  app.stage.addChild(boat);

  // init the gamestate to 'play'. Gameloop will run the current gamestate as a fn
  pixiGameState = play;

  // start a 60fps game cycle
  app.ticker.add(() => gameLoop());
}

// init an empty array for capturing move reel
const moveReel = []
const TILE_SIZE = 32

//capture keyboard arrow keys
let left = keyboard('ArrowLeft'),
  up = keyboard('ArrowUp'),
  right = keyboard('ArrowRight'),
  down = keyboard('ArrowDown');

// *** MOVEMENT REEL ************************************************
// if boat is stationary, its next move is relative to its current position.
// else, adding moves to the reel must set target coords based on the last move in the reel.
left.press = () => {
  moveReel.push(moveReel.length ? ({
    targetX: moveReel[moveReel.length - 1].targetX - TILE_SIZE,
    targetY: moveReel[moveReel.length - 1].targetY
  }) : ({
    targetX: boat.x - TILE_SIZE,
    targetY: boat.y
  }))
}

right.press = () => {
  moveReel.push(moveReel.length ? ({
    targetX: moveReel[moveReel.length - 1].targetX + TILE_SIZE,
    targetY: moveReel[moveReel.length - 1].targetY
  }) : ({
    targetX: boat.x + TILE_SIZE,
    targetY: boat.y
  }))
}

up.press = () => {
  moveReel.push(moveReel.length ? ({
    targetX: moveReel[moveReel.length - 1].targetX,
    targetY: moveReel[moveReel.length - 1].targetY - TILE_SIZE
  }) : ({
    targetX: boat.x,
    targetY: boat.y - TILE_SIZE
  }))
}

down.press = () => {
  moveReel.push(moveReel.length ? ({
    targetX: moveReel[moveReel.length - 1].targetX,
    targetY: moveReel[moveReel.length - 1].targetY + TILE_SIZE
  }) : ({
    targetX: boat.x,
    targetY: boat.y + TILE_SIZE
  }))
}

// animation loop- 60fps
function gameLoop() {
  // 60 times per second, run the function bound to pixi game state
  pixiGameState();
}


function play() {
  if (moveReel.length > 0 ) {
    // set boat's first target to the first frame in the moveReel
    const targetX = moveReel[0].targetX
    const targetY = moveReel[0].targetY

    // speed is set to 0.5 for nice slow movement
    boat.vx = Math.sign(targetX - boat.x) * 0.5
    boat.vy = Math.sign(targetY - boat.y) * 0.5

    // useful console logs to see wassup
    console.log(moveReel[0])
    console.log('targetX ', targetX, 'targetY', targetY )
    console.log('boat x ', boat.x, 'boat y', boat.y)
    console.log('boat vx ', boat.vx, 'boat vy, ', boat.vy)

    if (boat.x !== targetX || boat.y !== targetY) {
      // move the boat until it reaches the destination for this moveReel frame
      boat.x += boat.vx
      boat.y += boat.vy
    } else {
      // stop the boat & dispose of this moveReel frame
      boat.vx = 0
      boat.vy = 0
      moveReel.shift()
    }
  }

  // ***********************************
  // TO DO!! - in FishSim, we can add a hitTestRectangle(spriteOne,
  // spriteTwo) to detect collision of boat & fishes

  // if (hitTestRectangle(boat, fish)) {
  //begin collecting fish
  // } else {
  //There's no collision
  // }
}
