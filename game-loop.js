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
  loopCommands,
  remove
} from './helper-functions.js';
import {
  getKeyState
} from './animation'

const frameRateTxt = document.getElementById('frame-rate');

const keyboardVals = {};

let frame = 0;
setInterval(() => {
  frameRateTxt.innerText = `${frame}fps`;
  frame = 0;
}, 1000);



const gravity = component => (component.y += component.y / 20);

const img = document.createElement("img");
img.setAttribute("src", './assets/img/land.jpg');

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
    getKeyState(false);
    game.clearRect(xcor, ycor, obj.w || width, obj.h || height);
    game.fillStyle = obj.color;
    game.fillRect(xcor, ycor, width, height);

    // game.drawImage(img, 0, 0, width, height);

    for (let i = 0; i < renderCommands.length; i++) {
      const currentComponent = renderCommands[i]();

      currentComponent.gravity && gravity(currentComponent)
      currentComponent.default && currentComponent.default();

      currentComponent.controls &&
        Object.keys(currentComponent.controls).forEach(e => {
          keyboardVals[e] && currentComponent.controls[e](currentComponent);
        });
    }

    Object.keys(allComponentData).forEach(component => {
      const currentComponent = allComponentData[component];
      
      resolveCollision(currentComponent);

      (currentComponent.y > height ||
        currentComponent.y < 0 ||
        currentComponent.x > width ||
        currentComponent.x < 0) &&
      remove(currentComponent);
    })
    for (const e of loopCommands.values()) {
      e[1]++;
    }
    frame++;
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
      color: "green",
      // mass: 1,
      x: !e.facingLeft ? e.x + e.w : e.x - 10,
      y: e.y,
      w: 10,
      h: 10,
      facingLeft: e.facingLeft,
      reactsWith: {}
    },
    states: {
      default () {
        !this.facingLeft ? (this.x += 10) : (this.x -= 10);
      },
      onCollision({
        entity
      }) {
        // entity.isHit = true;
        remove(this);
      }
    }
  });

const {
  ['log']: l
} = console;

let max = 0,
  hasReachedMax = true;

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
    canJump: true,
    gravity: true,
    // canCollide: true,
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
      idle: [0, 0, 1, {
        still: true
      }]
    },
  },
  states: {
    default () {
      // hasReachedMax = true;
      this.isColliding = false;
      !this.isMoving && this.animate('idle');
      this.isMoving = false;
      if (this.x < 10) this.x = 10;
      else if (this.x > 950) this.x = 950;
    },
    controls: {
      ArrowUp(e) {
        // e.animate('upAnim');
        // e.y -= 1;
        // e.isMoving = true;
        if (max === 20 || hasReachedMax) return max = 0, hasReachedMax = true;
        e.y -= 10 * (e.y / 100);
        max++
      },
      ArrowDown(e) {
        e.animate('downAnim');
        e.y += 8;
        e.isMoving = true;
      },
      ArrowLeft(e) {
        e.animate('leftAnim');
        e.x -= 8;
        e.isMoving = true;
        e.facingLeft = true;
      },
      ArrowRight(e) {
        e.animate('rightAnim');
        e.x += 8;
        e.isMoving = true;
        e.facingLeft = false;
      },
      d(e) {
        loop(shoot, 10);
      }
    },
    onCollision({
      entity
    }) {
      entity.name === 'enemy' && (this.canJump = true);
      entity.name === 'ground' && (this.canJump = true);
      hasReachedMax = false;
      max = 0;
    }
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
      // color: 'rgba(200, 20, 100, 0.5)',
      color: 'orange',
      static: true,
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
        // this.color = this.isHit ? 'red' : this.color;
        // this.isHit = false;

        if (this.name !== 'ground') {
          if (this.y >= 400) {
            this.r = false;
            this.uv = 5;
          } else if (this.y <= 100) {
            this.r = true;
            this.dv = 5;
          }
          this.r ? (this.y += this.dv) : (this.y -= this.uv);
        }
      },
      onCollision(data) {}
    }
  });
const block4 = enemy();
block4.y = 100;
block4.x = 200;
block4.w = 100;
block4.h = 50;

const block5 = enemy();
block5.y = 400;
block5.x = 400;
block5.w = 100;
block5.h = 50;

const block3 = enemy();
block3.y = 100;
block3.x = 600;
block3.w = 100;
block3.h = 50;

const block6 = enemy();
block6.name = 'ground';
block6.color = 'brown';
block6.reactsWith = {
  ...block6.reactsWith,
  bullet: false,
  enemy: false
};
block6.y = 550;
block6.x = 0;
block6.w = 1000;
block6.h = 50;

initScene(0, 0, 1000, 600, {
  color: "rgb(153, 217, 234)"
});