export let renderCommands = [];
export const setRenderCommands = val => {
  renderCommands = [...val];
};
export const scene = document.createElement("canvas");
document.body.append(scene);
export const ctx = scene.getContext("2d");

export const render = component => {
  if (component.color) {
    ctx.fillStyle = component.color;
    ctx.fillRect(component.x, component.y, component.w, component.h);
  }

  if (component.animations) {
    ctx.drawImage(
      component.animations.spriteSheet,
      component.animations.x,
      component.animations.y,
      component.animations.frameWidth,
      component.animations.frameHeight,
      component.x,
      component.y,
      component.animations.imageSizeX,
      component.animations.imageSizeY
    );
    component.play();
  }
};
