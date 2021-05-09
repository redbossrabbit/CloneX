import GameBox from "./gameBox";
import {
  timeout,
  newTimingFunction,
  interval,
  clearTimer
} from "./helper-functions";

class Enemy extends GameBox.Component {
  constructor() {
    super();
    this.name = "enemy";
    this.mass = 1;
    this.color = "rgb(50,100,100)";
    this.static = true;
    this.gravity = false;
    this.layer = 1;
    this._isHit = false;
    this.reactsWith = {
      enemy: true,
      boy: true,
      ground: true
    };
    this.rigidBody = true;
  }
  update() {
    if (!this.static) {
      this.color = this._isHit ? "white" : "red";
      this._isHit = false;
    } else {
      this.color = this._isHit ? "white" : "rgb(50,50,50)";
      this._isHit = false;
    }
  }
  onCollision({ atTop, atBottom, entity }) {
    if (atTop && entity.name === "boy") {
      entity._atBottom = true;
      entity._resetJump();
    }
    if (atBottom && entity.name === "boy") {
      entity._hasJumped = false;
      entity._atBottom = false;
      entity._resetJump();
    }
    if (entity.name === "bullet") {
      this._isHit = true;
    }
  }
}

const createEnemy = () => new Enemy().init();

const block4 = createEnemy();
block4.y = 350;
block4.x = 100;
block4.w = 200;
block4.h = 50;
block4.max = 0;

let rate = -1;

const resetTimeout = () => {
  const id = newTimingFunction();
  timeout(() => {
    rate = -rate;
    clearTimer(id);
    resetTimeout();
  }, 300);
};
resetTimeout();

newTimingFunction();
interval(() => {
  block4.setY(rate);
}, 1);

export const block8 = createEnemy();
block8.static = false;
block8.gravity = true;
block8.y = 200;
block8.x = 350;
block8.w = 50;
block8.h = 50;
block8.facingLeft = true;
block8.name = "block8";

// const block9 = Enemy();
// block9.static = false;
// block9.gravity = true;
// block9.y = 200;
// block9.x = 450;
// block9.w = 50;
// block9.h = 50;
// block9.name = "block9";

const block3 = createEnemy();
block3.y = 100;
block3.x = 300;
block3.w = 200;
block3.h = 50;

const blockd = createEnemy();
blockd.y = 55;
blockd.x = 500;
blockd.w = 200;
blockd.h = 50;

const block6 = createEnemy();
block6.y = 550;
block6.x = 0;
block6.w = 1000;
block6.h = 50;
block6.name = "ground";

const nextGround = createEnemy();
nextGround.y = 400;
nextGround.x = 1100;
nextGround.w = 1000;
nextGround.h = 50;

// const createEnemy = (x, y, w, h) => {
//   const enemy = Enemy();
//   enemy.x = x;
//   enemy.y = y;
//   enemy.w = w;
//   enemy.h = h;
//   return enemy;
// };

const block7 = createEnemy();
block7.y = 150;
block7.x = 700;
block7.w = 200;
block7.h = 400;

export default Enemy;
