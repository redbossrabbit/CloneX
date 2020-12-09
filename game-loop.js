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
    },
    true
  );
  window.addEventListener(
    "keyup",
    e => {
      keyboardVals[e.key] = false;
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

      if (currentComponent.canCollide) resolveCollision(currentComponent);

      currentComponent.gravity && gravity(currentComponent);
      (currentComponent.y > height ||
        currentComponent.y < 0 ||
        currentComponent.x > width ||
        currentComponent.x < 0) &&
      remove(currentComponent);
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
      mass: 1,
      x: !e.facingLeft ? e.x + 50 : e.x - 10,
      y: e.y + 25,
      w: 10,
      h: 3,
      facingLeft: e.facingLeft
    },
    states: {
      default () {
        !this.facingLeft ? (this.x += 10) : (this.x -= 10);
      }
    }
  });


const redBox = component({
  props: {
    name: "boy",
    mass: 10,
    w: 50,
    h: 50,

    // x: 600,
    // y: 200,
    // lv: 0,
    // rv: 0,
    // uv: 0,
    // dv: 0,

    x: 40,
    y: 20,
    lv: 5,
    rv: 5,
    uv: 5,
    dv: 5,
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
        e.y += e.dv;
        e.isMoving = true;
      },
      ArrowLeft(e) {
        e.animate('leftAnim');
        e.x -= e.lv;
        e.isMoving = true;
        e.facingLeft = true;
      },
      ArrowRight(e) {
        e.animate('rightAnim');
        e.x += e.rv;
        e.isMoving = true;
        e.facingLeft = false;
      },
      d(e) {
        loop(shoot, 10);
      }
    },
    onCollision(data) {
      const D = data.displacement,
        entity = data.entity;
      // this[D[0]] += D[1];
      // entity[D[0]] -= D[1];
    }
  }
});
const shoot = () => bullet(redBox).facingLeft = redBox.facingLeft;

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
      x: undefined,
      y: undefined,
      w: 50,
      h: 50,
      gravity: false,
      bounds: {},
      isHit: false,
      r: undefined,
      uv: 10,
      dv: 10,
      canCollide: true,
      reactsWith: {
        bullet: true,
        enemy: true,
        boy: true
      },
      rigidBody: true
    },
    states: {
      default () {
        this.isHit ?
          (this.color = 'red') :
          (this.color = 'yellow');
        this.isHit = false;
        // if (this.y >= 700) {
        //   this.r = false;
        // } else if (this.y <= 100) {
        //   this.r = true;
        // }
        // (this.r ? (this.y += this.dv) : (this.y -= this.uv));
      },
      onCollision(data) {
        const D = data.displacement,
          entity = data.entity;
        if (entity.name === "bullet") {
          this.isHit = true
          remove(e);
        };
        // entity[D[0]] -= D[1];

        // console.log('p')
      }
    }
  });
// const c1 = enemy();
// c1.x = 200;
// c1.y = 500;
// c1.normalColor = 'white';
// const c2 = enemy();
// c2.name = 'c2'
// c2.x = 600;
// c2.y = 700;
// c2.normalColor = '#00D4FF';
const block2 = enemy();
block2.y = 400;
block2.x = 600;
block2.w = 100;
block2.h = 300;
const block = enemy();
block.y = 300;
block.x = 450;
block.w = 50;
block.h = 200;
const block4 = enemy();
block4.y = 100;
block4.x = 100;
block4.w = 100;
block4.h = 50;
const block3 = enemy();
block3.y = 600;
block3.x = 300;
block3.w = 100;
block3.h = 50;



// const a = redBox.id,
//     b = c2.id,
//     c = renderCommands.slice(a, 1)[0],
//     d = renderCommands.slice(b)[0];
// renderCommands[a] = d;
// renderCommands[b] = c; //switch id's

initScene(0, 0, 1000, 790, {
  color: "grey"
});