import { ctx } from "./render";

export const light = component => {
  const lightMap = component.light.lightMap;
  const light = document.createElement("img");
  light.setAttribute("src", lightMap);
  const { x, y, w, h, blendMode } = component.light;

  ctx.globalCompositeOperation = blendMode;
  ctx.drawImage(light, x, y, w, h);
  ctx.globalCompositeOperation = "normal";
};
