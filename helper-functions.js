import {
    allComponentData
} from './components.js';
import {
    renderCommands
} from './render.js';
export const loopCommands = new Map(),
    loop = (func, speed) => {
        if (!loopCommands.get(func)) {
            loopCommands.set(func, [func, 0]);
            func();
        }
        if (loopCommands.get(func)[1] >= speed) {
            func();
            loopCommands.set(func, [func, 0]);
        }
    },
    remove = component => {
        delete allComponentData[component.id];
        renderCommands.splice(renderCommands.indexOf(component.render), 1);
    };