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

  // const replaceWithLifecycle = (comp, idx) => {
  //   let part;
  //   if (comp === comp1) {
  //     if (comp2.beforeRender) {
  //       part = renderCommands.splice(idx - 1);
  //       renderCommands.push(comp.beforeRender, comp.render);
  //       if (comp.afterRender) renderCommands.push(comp.afterRender);
  //       renderCommands = [...renderCommands, ...part];
  //     }
  //   } else if (comp === comp2) {
  //     if (comp1.beforeRender) {
  //       part = renderCommands.splice(-(idx - 1));
  //       renderCommands = [
  //         ...part,
  //         ...(() => {
  //           if (comp.beforeRender && comp.afterRender) {
  //             return [comp.beforeRender, comp.render, comp.afterRender];
  //           } else if (comp.beforeRender) {
  //             return [comp.beforeRender, comp.render];
  //           } else if (comp.afterRender) {
  //             return [comp.render, comp.afterRender];
  //           }
  //         })(),
  //         ...renderCommands
  //       ];
  //     }
  //   }
  //   renderCommands.push(comp.beforeRender, comp.render);
  //   renderCommands = [...renderCommands, ...part];
  // };
  // if (comp1.beforeRender) {
  //   const id2 = findCompIdx(comp2);
  //   replaceWithLifecycle(comp1, id2);
  // }
  // if (comp1.afterRender) {
  //   const id1 = findCompIdx(comp1);
  //   replaceWithLifecycle(comp2, id1);
  // }
  // renderCommands[id1] = comp2.render;
  // renderCommands[id2] = comp1.render;
};
