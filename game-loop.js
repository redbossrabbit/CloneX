import {
  component,
  allComponentData
} from './components.js';
import {
  renderCommands,
  game,
  scene
} from './render.js';
import {
  resolveCollision
} from './collision.js';
import {
  loop,
  loopCommands
} from './helper-functions.js';
import {getKeyState} from './animation'

const frameRateTxt = document.getElementById('frame-rate');

const keyboardVals = {};

let frame = 0;
setInterval(() => {
  frameRateTxt.innerText = `${frame}fps`;
  frame = 0;
}, 1000);

const remove = component => {
  delete allComponentData[component.id];
  renderCommands.splice(renderCommands.indexOf(component.render), 1);
};

let g = 20;
const gravity = component => (component.y += g);

export const initScene = (xcor, ycor, width, height, obj) => {
  scene.width = width;
  scene.height = height;

  window.addEventListener(
    "keydown",
    e => {
      keyboardVals[e.key] = true;
      getKeyState(true);
    },
    true
  );
  window.addEventListener(
    "keyup",
    e => {
      keyboardVals[e.key] = false;
      getKeyState(false);
    },
    true
  );

  const gameLoop = () => {
    game.clearRect(xcor, ycor, obj.w || width, obj.h || height);
    game.fillStyle = obj.color;
    game.fillRect(xcor, ycor, width, height);

    for (let i = 0; i < renderCommands.length; i++) {

      const currentComponent = renderCommands[i]();


      currentComponent.default && currentComponent.default();


      currentComponent.controls &&
        Object.keys(currentComponent.controls).forEach(e => {
          keyboardVals[e] && currentComponent.controls[e](currentComponent);
        });

      resolveCollision(currentComponent);
    }
    frame++;
    for (const e of loopCommands.values()) {
      e[1]++;
    }
    requestAnimationFrame(gameLoop);
  };
  gameLoop();
};
/**--------------
 *
 * TEST AREA
 *
 * -----------------------*/
const bullet = e =>
  component({
    props: {
      name: "bullet",
      color: "yellow",
      // mass: 1,
      x: !e.facingLeft ? e.x + 50 : e.x - 10,
      y: e.y + 25,
      w: 10,
      h: 3,
      facingLeft: e.facingLeft,
      reactsWith: {}
    },
    states: {
      default () {
        !this.facingLeft ? (this.x += 50) : (this.x -= 50);
      },
      onCollision(d) {
        d.entity.isHit = true;
        remove(this);
      }
    }
  });


const boy = component({
  props: {
    name: "boy",
    mass: 10,
    w: 50,
    h: 50,
    x: 40,
    y: 20,
    facingLeft: false,
    rigidBody: true,
    // canJump: false,
    // gravity: true,
    canCollide: true,
    reactsWith: {
      enemy: true
    },
    animations: {
      spriteSheet: "./assets/img/sprite-sheet.png",
      imageSizeX: 50,
      imageSizeY: 50,
      speed: 10,
      frameWidth: 400,
      frameHeight: 450,

      //animations
      downAnim: [0, 0, 4],
      rightAnim: [3, 0, 4],
      leftAnim: [2, 0, 4],
      upAnim: [1, 0, 4],
      idle: [0, 0, 0]
    },
  },
  states: {
    default () {
      !this.isMoving && this.animate('idle');
      this.isMoving = false;
      // if (this.y >= 700 && this.gravity) {
      //   this.gravity = false;
      //   this.y = this.y;
      //   this.canJump = true;
      // }
      if (this.x < 10) this.x = 10;
      else if (this.x > 950) this.x = 950;
    },
    controls: {
      ArrowUp(e) {
        e.animate('upAnim');
        e.uv = 5;
        e.y -= e.uv;
        e.isMoving = true;
        // if(!redBox.canJump) return;
        // redBox.canJump = false;
        // let max = 0;
        // redBox.gravity = false;
        // redBox.jump = () => {
        //   if(max === 60){
        //     redBox.gravity = true;
        //     return
        //   }
        //   redBox.y -= 30;
        //   max += 5;
        //   requestAnimationFrame(redBox.jump);
        // }
        // redBox.jump();
      },
      ArrowDown(e) {
        e.animate('downAnim');
        e.dv = 5;
        e.y += e.dv;
        e.isMoving = true;
      },
      ArrowLeft(e) {
        e.animate('leftAnim');
        e.lv = 5;
        e.x -= e.lv;
        e.isMoving = true;
        e.facingLeft = true;
      },
      ArrowRight(e) {
        e.animate('rightAnim');
        e.rv = 5;
        e.x += e.rv;
        e.isMoving = true;
        e.facingLeft = false;
      },
      d(e) {
        loop(shoot, 10);
      }
    },
    onCollision(data) {}
  }
});
const shoot = () => bullet(boy).facingLeft = boy.facingLeft;

// document.addEventListener('keyup', e => {
//   redBox.animate('idle');
// })

/**
 * @param 
 */
const enemy = () =>
  component({
    props: {
      name: 'enemy',
      mass: 10,
      color: 'red',
      x: undefined,
      y: undefined,
      w: 50,
      h: 50,
      lv: 0,
      rv: 0,
      dv: 0,
      uv: 0,
      gravity: false,
      bounds: {},
      isHit: false,
      r: undefined,
      canCollide: true,
      reactsWith: {
        enemy: true,
        boy: true,
        bullet: true
      },
      rigidBody: true
    },
    states: {
      default () {
        this.isHit ?
          (this.color = 'red') :
          (this.color = 'yellow');
        this.isHit = false;
        // this.x -= this.lv;
        // if (this.y >= 600) {
        //   this.r = false;
        //   this.uv = 10;
        // } else if (this.y <= 100) {
        //   this.r = true;
        //   this.dv = 10;
        // }
        // console.log(this.dv)
        // this.r ? (this.y += this.dv) : (this.y -= this.uv);
      },
      onCollision(data) {}
    }
  });
const block4 = enemy();
block4.y = 90;
block4.x = 300;
block4.w = 100;
block4.h = 50;
const block3 = enemy();
block3.y = 100;
block3.x = 500;
block3.w = 100;
block3.h = 50;
const block5 = enemy();
block5.y = 100;
block5.x = 700;
block5.w = 100;
block5.h = 50;

initScene(0, 0, 1000, 790, {
  color: "grey"
});