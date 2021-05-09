import {
  timeout,
  interval,
  newTimingFunction,
  clearTimer
} from "./helper-functions.js";
import { Camera } from "./camera";
import GameBox from "./gameBox";
import Bullet from "./Bullet";
// import boy_light from "./Boy-Light";

class Boy extends GameBox.Component {
  constructor() {
    super();
    this.name = "boy";
    this.mass = 1;
    this.w = 50;
    this.h = 50;
    this.x = 600;
    this.y = 338;
    this.facingLeft = false;
    this.rigidBody = true;
    this.canJump = true;
    this.gravity = true;
    this.static = false;
    this.layer = 2;
    // this.color: "red",
    this.reactsWith = {
      enemy: true
    };
    this._jumpAmt = 1;
    this.animations = {
      spriteSheet: "./assets/img/sprite-sheet.png",
      speed: 10,

      //animations
      downAnim: [
        [0, 0, 400, 450, 50, 50],
        [400, 0, 400, 450, 50, 50],
        [400 * 2, 0, 400, 450, 50, 50],
        [400 * 3, 0, 400, 450, 50, 50]
      ],
      rightAnim: [
        [0, 450 * 3, 400, 450, 50, 50],
        [400, 450 * 3, 400, 450, 50, 50],
        [400 * 2, 450 * 3, 400, 450, 50, 50],
        [400 * 3, 450 * 3, 400, 450, 50, 50]
      ],
      leftAnim: [
        [0, 450 * 2, 400, 450, 50, 50],
        [400, 450 * 2, 400, 450, 50, 50],
        [400 * 2, 450 * 2, 400, 450, 50, 50],
        [400 * 3, 450 * 2, 400, 450, 50, 50]
      ],
      upAnim: [
        [0, 450, 400, 450, 50, 50],
        [400, 450, 400, 450, 50, 50],
        [400 * 2, 450, 400, 450, 50, 50],
        [400 * 3, 450, 400, 450, 50, 50]
      ],
      idle: [[0, 0, 400, 450, 50, 50]]
    };
    this.controls = {
      ArrowUp(_this, keyDown) {
        // if (!keyDown) return;
        // _this.animate("upAnim");
        // _this.setY(-5);
        // _this.isMoving = true;
        if (!_this._hasJumped) {
          _this.gravity = false;
          const id = newTimingFunction();
          interval(() => {
            if (_this._jumpAmt >= 40 || _this._atBottom) {
              _this._hasJumped = false;
              _this.gravity = true;
              clearTimer(id);
              return;
            }
            _this.setY(-8);
            _this._jumpAmt++;
          }, 1);
          _this._hasJumped = true;
        }
      },
      // ArrowDown(_this, keyDown) {
      //   if (!keyDown) return;
      //   _this.animate("downAnim");
      //   _this.setY(5);
      //   _this.isMoving = true;
      // },
      ArrowLeft(_this, keyDown) {
        if (!keyDown) return;
        _this.animate("leftAnim");
        _this.setX(-5);
        _this._isMoving = true;
        _this._facingLeft = true;
      },
      ArrowRight(_this, keyDown) {
        if (!keyDown) return;
        _this.animate("rightAnim");
        _this.setX(5);
        _this._isMoving = true;
        _this._facingLeft = false;
      },
      d(_this, keyDown) {
        if (!keyDown) return;
        if (!_this._hasShot) {
          _this._hasShot = true;
          newTimingFunction();
          timeout(shoot, 10);
        }
      }
    };
  }
  update() {
    !this._isMoving && this.animate("idle");
    this._isMoving = false;
    this.camera.track();
    // boy_light.x = this.x - 225;
    // boy_light.y = this.y - 230;
  }
  camera() {
    return new Camera({
      focus: this,
      focusX: 500,
      focusY: 300,
      focusHeight: 120,
      focusWidth: 120
      // view: true
    });
  }
  _resetJump() {
    this._jumpAmt = 1;
  }
}

const boy = new Boy().init();

const shoot = () => {
  Bullet(boy);
  boy._hasShot = false;
};

export default boy;
