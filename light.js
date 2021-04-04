import { ctx } from "./render";

export const light = component => {
  const lightMap = component.light.lightMap;
  const light = document.createElement("img");
  light.setAttribute("src", lightMap);

  ctx.globalCompositeOperation = "color-dodge";
  ctx.drawImage(light, 300, 100, 500, 500);
  ctx.globalCompositeOperation = "normal";
};
