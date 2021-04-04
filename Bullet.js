import { component } from "./components";
import { remove, timeout, newTimingFunction } from "./helper-functions";

const Bullet = e => {
  const bullet = component({
    props: {
      name: "bullet",
      color: "green",
      x: !e.facingLeft ? e.x + e.w : e.x - 20,
      y: e.y,
      w: 20,
      h: 20,
      layer: 2,
      facingLeft: e.facingLeft,
      reactsWith: {
        block: true
      }
    },
    states: {
      default() {
        !this.facingLeft ? (this.x += 10) : (this.x -= 10);
      },
      onCollision() {
        remove(this);
      }
    }
  });
  newTimingFunction();
  timeout(() => {
    remove(bullet);
  }, 60);
  return bullet;
};

export default Bullet;
