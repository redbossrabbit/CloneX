import GameBox from "./components";
import { remove, timeout, newTimingFunction } from "./helper-functions";
import { block8 } from "./Enemy";
import boy from "./Boy";

const Bullet = e => {
  class Bullet extends GameBox.Component {
    constructor() {
      super();
      this.name = "bullet";
      this.color = e.name === "boy" ? "yellow" : "green";
      this.x = !e._facingLeft ? e.x + e.w : e.x - 20;
      this.y = e.y;
      this.w = 20;
      this.h = 20;
      this.facingLeft = e.facingLeft;
      this.reactsWith = {
        block: true
      };
      this.rate = 10;
    }
    update() {
      if (!e._facingLeft) {
        this.x += this.rate += 2;
      } else {
        this.x -= this.rate += 2;
      }
    }
    onCollision({ entity }) {
      entity.name !== "detector" && remove(this);
      if (entity.name === "block8") {
        if (boy.x < block8.x) {
          block8.setX(50);
        } else if (boy.x > block8.x) {
          block8.setX(-50);
        }
      }
    }
  }
  const _Bullet = new Bullet().init();

  newTimingFunction();
  timeout(() => {
    remove(_Bullet);
  }, 60);

  return _Bullet;
};

export default Bullet;
