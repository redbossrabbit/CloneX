import {
    setAnimation
} from './animation.js';
import {
    renderCommands,
    render
} from './render.js';
let id = 0;
export const allComponentData = {};
class Component {
    constructor(obj) {
        for (const key in obj.props) {
            this[key] = obj.props[key];
        }
        for (const key in obj.states) {
            this[key] = obj.states[key];
        }

        this.id = id;

        if (this.animations) {
            setAnimation(this);
        }

        allComponentData[id] = this;

        this.render = () => render(this);
        renderCommands.push(this.render);
        id++;
    }
}
export const component = obj => new Component(obj);