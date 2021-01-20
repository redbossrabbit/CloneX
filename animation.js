let keyIsDown = true,
  {
    ['log']: l
  } = console;

export const setAnimation = (component) => {
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
    const {
      animData,
      animations
    } = component;

    const {
      speed,
      frameWidth,
      frameHeight
    } = animations;

    const {
      limit,
      xOrigin,
      yOrigin,
      animationOptions
    } = animData;

    if (component.updateTime === speed) {
      //counts gameloops before going to next frame of animation
      component.updateTime = 0;
      if (component.frame === limit) {
        if (!animationOptions.loop) {
          component.animations.y = frameHeight * yOrigin;
          component.animations.x = xOrigin;
        }
        component.frame = 1;
      }
      if (!animationOptions.still) {
        component.animations.x = (component.frame + xOrigin) * frameWidth;
        component.frame++;
      }
    }
    component.updateTime++;
  }

   /**
   * @method animate - sets the animation data in the animData object for the animation player to work with
   */
  component.animate = anim => {
    const {
      animations
    } = component;

    const {
      [anim]: animVar,
      frameWidth,
      frameHeight
    } = animations

    const [i0, i1, i2, i3] = animVar;

    if (!component.animData.anim[anim]) {
      component.animData.anim = {};
      component.animData.anim[anim] = true;
      component.frame = 1;
      component.updateTime = 0;

      component.animData.yOrigin = i0;
      component.animData.xOrigin = i1;
      component.animData.limit = i2;
      component.animData.animationOptions = {
        ...i3
      };
      component.animations.y = frameHeight * i0;
      component.animations.x = frameWidth * i1;
    }
  }
}
export const getKeyState = (val) => keyIsDown = val;