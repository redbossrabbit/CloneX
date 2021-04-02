import {
  timeout,
  interval,
  newTimingFunction,
  clearTimer
} from "./helper-functions.js";
import { Camera } from "./camera";
import { component } from "./components";
import Bullet from "./Bullet";

const Boy = component({
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
    gravity: true,
    static: false,
    // color: "red",
    reactsWith: {
      enemy: true,
      ground: true
    },
    _jumpAmt: 1,
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
      idle: [0, 0, 1]
    }
  },
  states: {
    default() {
      !this.isMoving && this.animate("idle");
      this.isMoving = false;
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
      ArrowUp(e, keyDown) {
        if (!keyDown) return;
        // e.animate("upAnim");
        // e.y -= 5;
        // e.isMoving = true;
        if (!e._hasJumped) {
          e.gravity = false;
          const id = newTimingFunction();
          interval(() => {
            if (e._jumpAmt >= 30 || e.atBottom) {
              e._hasJumped = false;
              e.gravity = true;
              clearTimer(id);
              return;
            }
            e.y -= 8;
            e._jumpAmt++;
          }, 1);
          e._hasJumped = true;
        }
      },
      ArrowDown(e, keyDown) {
        if (!keyDown) return;
        e.animate("downAnim");
        e.y += 5;
        e.isMoving = true;
      },
      ArrowLeft(e, keyDown) {
        if (!keyDown) return;
        e.animate("leftAnim");
        e.x -= 5;
        e.isMoving = true;
        e.facingLeft = true;
      },
      ArrowRight(e, keyDown) {
        if (!keyDown) return;
        e.animate("rightAnim");
        e.x += 5;
        e.isMoving = true;
        e.facingLeft = false;
      },
      d(e, keyDown) {
        if (!keyDown) return;
        if (!e._hasShot) {
          newTimingFunction();
          timeout(shoot, 10);
          e._hasShot = true;
        }
      }
    },
    resetJump() {
      this.atBottom = false;
      this._jumpAmt = 1;
      this._hasJumped = false;
    },
    onCollision({ atTop, atBottom }) {
      if (atBottom) {
        this.atBottom = true;
      }
      if (atTop) {
        this.resetJump();
      }
    }
  }
});
const shoot = () => {
  Bullet(Boy).facingLeft = Boy.facingLeft;
  Boy._hasShot = false;
};
