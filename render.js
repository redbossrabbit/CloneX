export const renderCommands = [];
export const scene = document.createElement("canvas");
document.body.append(scene);
export const game = scene.getContext("2d");

export const render = (component) => {
  // console.log(component)
    component.color &&
      (() => {
        game.fillStyle = component.color;
        game.fillRect(component.x, component.y, component.w, component.h);
      })();

    if (component.animations) {
      game.drawImage(component.animations.spriteSheet, component.animations.x, component.animations.y, component.animations.frameWidth, component.animations.frameHeight, component.x, component.y, component.animations.imageSizeX, component.animations.imageSizeY);
      component.play();
    }
    return component;
  };