import { component } from "./components";
const Enemy = () =>
  component({
    props: {
      name: "enemy",
      mass: 1,
      color: "rgb(5,10,0)",
      static: true,
      gravity: false,
      layer: 1,
      bounds: {},
      _isHit: false,
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
        this._isHit = false;
      },
      onCollision({ atTop, atBottom, entity }) {
        if (atTop && entity.name === "boy") {
          entity.atBottom = true;
          entity.resetJump();
        }
        if (atBottom && entity.name === "boy") {
          entity._hasJumped = false;
          entity.atBottom = false;
          entity.resetJump();
        }
      }
    }
  });

const block4 = Enemy();
block4.y = 350;
block4.x = 200;
block4.w = 200;
block4.h = 50;

const block8 = Enemy();
block8.static = false;
block8.gravity = true;
block8.color = "rgb(1,0,0)";
block8.y = 200;
block8.x = 550;
block8.w = 50;
block8.h = 50;
// block8.default = () => {
//   block8.setX(-5);
// };

const block9 = Enemy();
block9.static = false;
block9.gravity = true;
block9.color = "rgb(1,0,0)";
block9.y = 200;
block9.x = 450;
block9.w = 50;
block9.h = 50;
// block9.default = () => {
//   block9.setX(3);
// };

const block3 = Enemy();
block3.y = 100;
block3.x = 300;
block3.w = 200;
block3.h = 50;

const blockd = Enemy();
blockd.y = 55;
blockd.x = 500;
blockd.w = 200;
blockd.h = 50;

const block6 = Enemy();
block6.name = "ground";
block6.y = 550;
block6.x = 0;
block6.w = 1000;
block6.h = 50;

const nextGround = Enemy();
nextGround.name = "ground";
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

const block7 = Enemy();
block7.y = 150;
block7.x = 700;
block7.w = 200;
block7.h = 400;

export default Enemy;