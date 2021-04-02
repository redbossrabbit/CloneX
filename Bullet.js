import { component } from "./components";
import { remove } from "./helper-functions";

const Bullet = e =>
  component({
    props: {
      name: "bullet",
      color: "green",
      x: !e.facingLeft ? e.x + e.w : e.x - 20,
      y: e.y,
      w: 20,
      h: 20,
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

export default Bullet;
