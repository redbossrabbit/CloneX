export const setAnimation = component => {
  component.frame = 1;
  component.updateTime = 0;
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
    const { animData, animations } = component;

    const { speed, frameWidth, frameHeight } = animations;

    const { limit, xOrigin, yOrigin, animationOptions } = animData;

    if (component.updateTime === speed) {
      //counts gameloops before going to next frame of animation
      component.updateTime = 0;
      if (component.frame === limit) {
        if (!animationOptions.loop) {
          component.animations.y = frameHeight * yOrigin;
          component.animations.x = xOrigin;
        }
        component.frame = 0;
      }
      component.animations.x = (component.frame + xOrigin) * frameWidth;
      component.frame++;
    }
    component.updateTime++;
  };

  /**
   * @method animate - sets the animation data in the animData object for the animation player to work with
   */
  component.animate = animName => {
    const { animations } = component;

    const { [animName]: animVar, frameWidth, frameHeight } = animations;

    const [xcor, ycor, frameAmt, options] = animVar;

    if (!component.animData.anim[animName]) {
      component.animData.anim[animName] = true;
      component.frame = 1;
      component.updateTime = 0;

      component.animData.yOrigin = xcor;
      component.animData.xOrigin = ycor;
      component.animData.limit = frameAmt;
      component.animData.animationOptions = {
        ...options
      };
      component.animations.y = frameHeight * xcor;
      component.animations.x = frameWidth * ycor;
    }
  };
};
