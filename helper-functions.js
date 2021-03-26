import { allComponentData } from "./components.js";
import { renderCommands } from "./render.js";

export const loopCommands = new Map();

export const loop = (func, speed) => {
  if (!loopCommands.get(func)) {
    loopCommands.set(func, [func, 0]);
    func();
  }
  if (loopCommands.get(func)[1] >= speed) {
    func();
    loopCommands.set(func, [func, 0]);
  }
};

export const remove = component => {
  delete allComponentData[component.id];
  const componentPostiton = renderCommands.indexOf(component.render);
  if (componentPostiton < 0) return;
  renderCommands.splice(componentPostiton, 1);
};
