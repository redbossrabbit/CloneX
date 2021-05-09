import GameBox from "./gameBox.js";
import { getRandom } from "./helper-functions";

export class Blocks extends GameBox.Component {
  constructor() {
    super();
    this.color = "rgb(100, 150, 50)";
    this.name = "block";
  }
}

const createBlock = () => {
  const amount = 10;
  for (let i = 0; i < amount; i++) {
    const block = new Blocks().init();
    block.depth = 2;
    block.x = getRandom(50, 1500);
    block.y = getRandom(50, 1000);
    block.w = getRandom(50, 500);
    block.h = getRandom(50, 500);
  }
};
createBlock();
export default Blocks;
