export const setAnimation = component => {
  component.animData = {
    anim: {}
  };

  //Preload Image
  const img = document.createElement("img");
  img.setAttribute("src", component.animations.spriteSheet);
  component.animations.spriteSheet = img;

  /**
   * @method play - the animation player
   */
  component.play = () => {
    const { animations, frame, currentAnimName } = component;

    const {
      speed,
      [currentAnimName]: [[x, y, w, h, ix, iy]],
      [currentAnimName]: currentAnimFrame
    } = animations;

    if (component.updateTime === speed) {
      //counts gameloops before going to next frame of animation

      component.updateTime = 0;

      if (frame === component.animations[currentAnimName].length) {
        component.frame = 1;
        component.animations.x = x;
        component.animations.y = y;
        component.animations.frameWidth = w;
        component.animations.frameHeight = h;
        component.animations.imageSizeX = ix;
        component.animations.imageSizeY = iy;
        return;
      }
      component.animations.x = currentAnimFrame[frame][0];
      component.animations.frameWidth = currentAnimFrame[frame][2];
      component.animations.frameHeight = currentAnimFrame[frame][3];
      component.animations.imageSizeX = currentAnimFrame[frame][4];
      component.animations.imageSizeY = currentAnimFrame[frame][5];

      component.frame += 1;
    }
    component.updateTime++;
  };

  /**
   * @method animate - sets the animation data in the animData object for the animation player to work with
   */
  component.animate = animName => {
    const [x, y, w, h, ix, iy] = component.animations[animName][0];
    if (!component.animData.anim[animName]) {
      component.animData.anim[animName] = true;

      component.currentAnimName = animName;
      component.frame = 1;
      component.updateTime = 0;

      //initiate starting coords for renderer
      component.animations.y = y;
      component.animations.x = x;
      component.animations.frameWidth = w;
      component.animations.frameHeight = h;
      component.animations.imageSizeX = ix;
      component.animations.imageSizeY = iy;
    }
  };
};
