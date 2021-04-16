import {
  timeout,
  interval,
  newTimingFunction,
  clearTimer
} from "./helper-functions.js";
import { Camera } from "./camera";
import GameBox from "./components";
import Bullet from "./Bullet";

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
    this.light = {
      lightMap: "./assets/img/light.png",
      blendMode: "color-dodge",
      x: 300,
      y: 100,
      w: 500,
      h: 500
    };
    // this.color: "red",
    this.reactsWith = {
      enemy: true
    };
    this._jumpAmt = 1;
    this.animations = {
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
    };
    this.controls = {
      ArrowUp(_this, keyDown) {
        if (!keyDown) return;
        // this.animate("upAnim");
        // this.setY(-5);
        // this.isMoving = true;
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
      // ArrowDown(this, keyDown) {
      //   if (!keyDown) return;
      //   this.animate("downAnim");
      //   this.setY(5);
      //   this.isMoving = true;
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
  beforeRender() {
    this.setLight();
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
