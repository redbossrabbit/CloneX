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

  if (component.image) {
    const imagePath = component.image;
    const image = document.createElement("img");
    image.setAttribute("src", imagePath);
    const { x, y, w, h, blendMode } = component;
    if (blendMode) {
      ctx.globalCompositeOperation = blendMode;
      ctx.drawImage(image, x, y, w, h);
      ctx.globalCompositeOperation = "normal";
    } else {
      ctx.drawImage(image, x, y, w, h);
    }
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
