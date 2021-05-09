import GameBox from "./gameBox.js";

class Boy_Light extends GameBox.Component {
  constructor() {
    super();
    this.name = "boy-light";
    this.w = 500;
    this.h = 500;
    this.image = "./assets/img/light.png";
    this.blendMode = "color-dodge";
  }
}

const boy_light = new Boy_Light().init();

export default boy_light;
