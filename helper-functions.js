import { allComponentData } from "./component.js";
import { renderCommands, setRenderCommands } from "./render.js";

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

export let placeCommands = [];

export const resetPlaceCommands = () => {
  placeCommands = [];
};

export const placeInFront = (comp1, comp2) => {
  placeCommands.push(() => {
    const findCompIdx = comp => renderCommands.indexOf(comp.render);

    const id2 = findCompIdx(comp2);
    const id1 = findCompIdx(comp1);

    const comp1Render = renderCommands.splice(id1, 1)[0];
    const part = renderCommands.splice(id2);
    renderCommands.push(comp1Render);
    setRenderCommands([...renderCommands, ...part]);
  });
};
export const getRandom = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};
