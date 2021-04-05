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

    this.setX = val => {
      this.IS_MOVING_X = true;
      this.x += val;
    };

    this.setY = val => {
      this.IS_MOVING_Y = true;
      this.y += val;
    };

    if (this.animations) {
      setAnimation(this);
    }

    if (this.camera) {
      this.camera = this.camera(this);
    }

    if (this.beforeRender && this.afterRender) {
      this.render = () => {
        [
          () => this.beforeRender(this),
          () => render(this),
          () => this.afterRender(this)
        ].forEach(item => item());
      };
      renderCommands.push(this.render);
    } else if (this.beforeRender) {
      this.render = () => {
        [() => this.beforeRender(this), () => render(this)].forEach(item =>
          item()
        );
      };
      renderCommands.push(this.render);
    } else if (this.afterRender) {
      this.render = () => {
        [() => render(this), () => this.afterRender(this)].forEach(item =>
          item()
        );
      };
      renderCommands.push(this.render);
    } else {
      this.render = () => render(this);
      renderCommands.push(this.render);
    }

    allComponentData[this.id] = this;
  }
}

export const component = obj => new Component(obj);
