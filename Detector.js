import GameBox from "./components.js";
import { block8 } from "./Enemy";

class Detector extends GameBox.Component {
  constructor() {
    super();
    this.name = "detector";
    // this.color = "green";
    this.w = 450;
    this.h = 50;
  }
  update() {
    this.y = block8.y;
    this.x = block8.x - 200;
  }
  onCollision({ entity }) {
    if (entity.name === "boy") {
      if (entity.x < block8.x) {
        block8.facingLeft = true;
        block8.setX(-1);
      } else {
        block8.facingLeft = false;
        block8.setX(1);
      }
    }
  }
}
const detector = new Detector().init();

export default detector;
