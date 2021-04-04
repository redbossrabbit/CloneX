import { setAnimation } from "./animation.js";
import { render, renderCommands } from "./render.js";
import { GRAVITY } from "./game-loop.js";
import { isMoving } from "./helper-functions";

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
    this.id = id += 1;

    this.setX = fn => {
      this.IS_MOVING_X = true;
      fn(this);
    };

    this.setY = fn => {
      this.IS_MOVING_Y = true;
      fn(this);
    };

    if (this.animations) {
      setAnimation(this);
    }

    if (this.camera) {
      this.camera = this.camera(this);
    }

    this.render = () => render(this);

    if (this.beforeRender) {
      renderCommands.push(() => this.beforeRender(this));
    }

    renderCommands.push(this.render);

    if (this.afterRender) {
      renderCommands.push(() => this.afterRender(this));
    }

    allComponentData[this.id] = this;
  }
}

export const component = obj => new Component(obj);
