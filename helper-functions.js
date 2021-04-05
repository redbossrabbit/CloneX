import { allComponentData } from "./components.js";
import { renderCommands } from "./render.js";

let id = 0;

export const loopCommands = {};

export const newTimingFunction = () => {
  return (id += 1);
};

export const clearTimer = id => {
  delete loopCommands[id];
};

export const timeout = (func, speed) => {
  loopCommands[id] = [func, 0, speed, "timeout", id];
};

export const interval = (func, speed) => {
  loopCommands[id] = [func, 0, speed, "interval", id];
};

export const remove = component => {
  delete allComponentData[component.id];
  const componentPostiton = renderCommands.indexOf(component.render);
  if (componentPostiton < 0) return;
  renderCommands.splice(componentPostiton, 1);
};

export const swap = (comp1, comp2) => {
  const findCompIdx = comp => renderCommands.indexOf(comp.render);

  const id2 = findCompIdx(comp2);
  const id1 = findCompIdx(comp1);

  renderCommands[id1] = comp2.render;
  renderCommands[id2] = comp1.render;
};
