import { component, allComponentData } from "./components.js";
import { renderCommands, ctx, scene } from "./render.js";
import { resolveCollision } from "./collision.js";
import { loop, loopCommands, remove } from "./helper-functions.js";
import { getKeyState } from "./animation";
import { Camera } from "./camera";

// const frameRateTxt = document.getElementById("frame-rate");

const keyboardVals = {};

// let frame = 0;
// setInterval(() => {
//   frameRateTxt.innerText = `${frame}fps`;
//   frame = 0;
// }, 1000);

export const GRAVITY = 10;
const gravity = component => {
  component.y += component.GRAVITY +=
    component.GRAVITY * ((component.mass || 1) / 100);
};

const img = document.createElement("img");
img.setAttribute("src", "./assets/img/land.jpg");

let max = 0,
  hasReachedMax = true;

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
    ctx.clearRect(xcor, ycor, obj.w || width, obj.h || height);
    ctx.fillStyle = obj.color;
    ctx.fillRect(xcor, ycor, width, height);
    // ctx.fillStyle = "purple";
    // ctx.fillRect(500, 300, 120, 120);

    // game.drawImage(img, 0, 0, width, height);

    /**@render render all components */
    for (let i = 0; i < renderCommands.length; i++) {
      const currentComponent = renderCommands[i]();

      currentComponent.gravity && gravity(currentComponent);

      currentComponent.controls &&
        Object.keys(currentComponent.controls).forEach(e => {
          keyboardVals[e] && currentComponent.controls[e](currentComponent);
        });
    }

    /**@resolve collisions */
    Object.keys(allComponentData).forEach(component => {
      const currentComponent = allComponentData[component];

      resolveCollision(currentComponent);

      // currentComponent &&
      //   (currentComponent.y > height ||
      //     currentComponent.y < 0 ||
      //     currentComponent.x > width ||
      //     currentComponent.x < 0) &&
      //   remove(currentComponent);
      currentComponent.default && currentComponent.default();
    });

    for (const e of loopCommands.values()) {
      e[1]++;
    }
    // frame++;
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
      x: !e.facingLeft ? e.x + e.w : e.x - 20,
      y: e.y,
      w: 20,
      h: 20,
      // gravity: true,
      facingLeft: e.facingLeft,
      reactsWith: {
        enemy: true,
        block: true
      }
    },
    states: {
      default() {
        !this.facingLeft ? (this.x += 10) : (this.x -= 10);
      },
      onCollision({ entity }) {
        // entity.x += 5;
        remove(this);
      }
    }
  });

const boy = component({
  props: {
    name: "boy",
    mass: 1,
    w: 50,
    h: 50,
    x: 532,
    y: 338,
    facingLeft: false,
    rigidBody: true,
    canJump: true,
    // gravity: true,
    static: false,
    // color: "red",
    hasCollided: true,
    reactsWith: {
      enemy: true,
      ground: true
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
      idle: [
        0,
        0,
        1,
        {
          still: true
        }
      ]
    }
  },
  states: {
    default() {
      !this.isMoving && this.animate("idle");
      this.isMoving = false;

      // if (this.x < 10) this.x = 10;
      // else if (this.x > 950) this.x = 950;

      this.camera.track();
    },
    camera(e) {
      return new Camera({
        focus: e,
        focusX: 500,
        focusY: 300,
        focusHeight: 120,
        focusWidth: 120
      });
    },
    controls: {
      ArrowUp(e) {
        e.animate("upAnim");
        e.y -= 5;
        e.isMoving = true;
        // if (e.canJump) {
        //   e.atBottom = false;
        //   e.canJump = false;
        //   e.gravity = false;
        //   let jumpAmt = 1;
        //   const interval = setInterval(() => {
        //     if (jumpAmt >= 30 || e.atBottom) {
        //       e.gravity = true;
        //       clearInterval(interval);
        //       return;
        //     }
        //     e.y -= 30 / jumpAmt;
        //     jumpAmt++;
        //   }, 10);
        // }
      },
      ArrowDown(e) {
        e.animate("downAnim");
        e.y += 5;
        e.isMoving = true;
      },
      ArrowLeft(e) {
        e.animate("leftAnim");
        e.x -= 5;
        e.isMoving = true;
        e.facingLeft = true;
      },
      ArrowRight(e) {
        e.animate("rightAnim");
        e.x += 5;
        e.isMoving = true;
        e.facingLeft = false;
      },
      d(e) {
        loop(shoot, 10);
      }
    },
    onCollision({ atTop, atBottom }) {
      if (atBottom) {
        this.atBottom = true;
      }
      if (atTop) {
        this.canJump = true;
      }
    }
  }
});

const shoot = () => (bullet(boy).facingLeft = boy.facingLeft);

const enemy = () =>
  component({
    props: {
      name: "enemy",
      mass: 1,
      // color: 'rgba(200, 20, 100, 0.5)',
      color: "orange",
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
        ground: true,
        block: true
      },
      rigidBody: true
    },
    states: {
      default() {
        this.color = this.isHit ? "red" : this.color;
        this.isHit = false;
        // if (this.name === "ground") {
        //   console.log(this.x, this.y);
        // }
        // if (this.name !== "ground" && this.name !== "block") {
        //   if (this.y >= 400) {
        //     this.r = false;
        //     this.uv = 5;
        //   } else if (this.y <= 100) {
        //     this.r = true;
        //     this.dv = 5;
        //   }
        //   this.r ? (this.y += this.dv) : (this.y -= this.uv);
        // }
      },
      onCollision({ atTop, atBottom, entity }) {
        if (atBottom && entity.name === "boy") {
          entity.canJump = true;
        }
      }
    }
  });
const block4 = enemy();
block4.y = 350;
block4.x = 200;
block4.w = 200;
block4.h = 50;

// const block5 = enemy();
// block5.y = 400;
// block5.x = 400;
// block5.w = 100;
// block5.h = 50;

const block8 = enemy();
block8.static = false;
// block8.gravity = true;
block8.color = "blue";
block8.y = 200;
block8.x = 350;
block8.w = 50;
block8.h = 50;

const block9 = enemy();
block9.static = false;
// block9.gravity = true;
block9.color = "blue";
block9.y = 200;
block9.x = 450;
block9.w = 50;
block9.h = 50;

const block3 = enemy();
block3.y = 100;
block3.x = 300;
block3.w = 200;
block3.h = 50;

const block6 = enemy();
block6.name = "ground";
block6.color = "brown";
block6.y = 550;
block6.x = 0;
block6.w = 1000;
block6.h = 50;

const block7 = enemy();
block7.name = "block";
block7.y = 150;
block7.x = 700;
block7.w = 200;
block7.h = 400;

initScene(0, 0, window.innerWidth, window.innerHeight, {
  color: "rgb(153, 217, 234)"
});
