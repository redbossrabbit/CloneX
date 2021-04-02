import { setAnimation } from "./animation.js";
import { renderCommands, render } from "./render.js";
import { GRAVITY } from "./game-loop.js";

export const allComponentData = {};

let id = 0;

class Component {
  constructor(obj) {
    for (const key in obj.props) {
      this[key] = obj.props[key];
    }

    for (const key in obj.states) {
      this[key] = obj.states[key];
    }

    this.GRAVITY = GRAVITY;
    this.id = id++;

    if (this.animations) {
      setAnimation(this);
    }

    if (this.camera) {
      this.camera = this.camera(this);
    }

    allComponentData[this.id] = this;

    this.render = () => render(this);
    renderCommands.push(this.render);
  }
}

export const component = obj => new Component(obj);
