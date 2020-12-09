export const setAnimation = (component) => {
    component.frame = 0;
      component.updateTime = 0;
      component.animData = {
        anim: {}
      };
      
      /**
      * animation data:
      - X,Y positions for where to start the animation.
      -How many frames.
      */

      //Preload Image
      const img = document.createElement("img");
      img.setAttribute("src", component.animations.spriteSheet);
      component.animations.spriteSheet = img;

      //Animation player
      component.play = () => {
        if (component.updateTime === component.animations.speed) { //checks how many gameloops before going to next frame of animation
          component.updateTime = 0;
          if (component.frame >= component.animData.limit) {
            component.animations.y = component.animations.frameHeight * component.animData.yOrigin;
            component.animations.x = component.animData.xOrigin;
            component.frame = 0;
          }
          component.animations.x = (component.frame + component.animData.xOrigin) * component.animations.frameWidth;
        //   console.log(component.animations.x)
          component.frame++;
        }
        component.updateTime++;
      }

      //animate function sets the animation data in the animData object.
      component.animate = (anim) => {
        if (!component.animData.anim[anim]) {
          component.animData.anim = {};
          component.animData.anim[anim] = true;
          component.frame = 0;
          component.updateTime = 0;

          component.animData.yOrigin = component.animations[anim][0];
          component.animData.xOrigin = component.animations[anim][1];
          component.animData.limit = component.animations[anim][2];
          component.animations.y = component.animations.frameHeight * component.animData.yOrigin;
          component.animations.x = component.animData.xOrigin;
        }
      }
}