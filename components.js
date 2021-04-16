import { setAnimation } from "./animation.js";
import { render, renderCommands } from "./render.js";
import { GRAVITY } from "./game-loop.js";
import { light as setLight } from "./light.js";

export const allComponentData = {};

let id = 0;

class Component {
  constructor() {
    this.GRAVITY = GRAVITY;
    this.id = id += 1;

    this.setX = val => {
      this.IS_MOVING_X = true;
      this.x += val;
    };

    this.setY = val => {
      this.IS_MOVING_Y = true;
      this.y += val;
    };
  }
  init() {
    if (this.animations) {
      setAnimation(this);
    }

    if (this.camera) {
      this.camera = this.camera(this);
    }

    if (this.beforeRender && this.afterRender) {
      this.render = () => {
        [
          () => this.beforeRender(),
          () => render(this),
          () => this.afterRender()
        ].forEach(item => item());
      };
    } else if (this.beforeRender) {
      this.render = () => {
        [() => this.beforeRender(), () => render(this)].forEach(item => item());
      };
    } else if (this.afterRender) {
      this.render = () => {
        [() => render(this), () => this.afterRender()].forEach(item => item());
      };
    } else {
      this.render = () => render(this);
    }

    renderCommands.push(this.render);

    allComponentData[this.id] = this;

    return this;
  }
  setLight() {
    setLight(this);
  }
}
export const GameBox = {
  Component
};
export const component = obj => new Component(obj);
export default GameBox;
