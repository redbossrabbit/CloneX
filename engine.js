import { allComponentData } from "./component.js";
import { renderCommands, ctx, scene } from "./render.js";
import { resolveCollision } from "./collision.js";
import {
  loopCommands,
  placeCommands,
  resetPlaceCommands
} from "./helper-functions.js";

const keyboardVals = {};
const wasCLicked = {};
export const GRAVITY = 10;

const gravity = component => {
  component.setY(
    (component.GRAVITY += component.GRAVITY * ((component.mass || 1) / 100))
  );
};

const InitScene = (xcor, ycor, width, height, obj) => {
  scene.width = width;
  scene.height = height;

  window.addEventListener(
    "keydown",
    e => {
      keyboardVals[e.key] = true;
      wasCLicked[e.key] = true;
    },
    true
  );
  window.addEventListener(
    "keyup",
    e => {
      keyboardVals[e.key] = false;
    },
    true
  );

  const gameLoop = () => {
    ctx.clearRect(xcor, ycor, obj.w || width, obj.h || height);
    ctx.fillStyle = obj.color;
    ctx.fillRect(xcor, ycor, width, height);

    const all = Object.keys(allComponentData);

    placeCommands.forEach(command => command());
    resetPlaceCommands();

    /**@initialize get defaults for all components */
    all.forEach(component => {
      const currentComponent = allComponentData[component];

      currentComponent.IS_MOVING_X = false;
      currentComponent.IS_MOVING_Y = false;

      currentComponent.gravity && gravity(currentComponent);
      currentComponent.update && currentComponent.update();

      if (currentComponent.controls) {
        Object.keys(currentComponent.controls).forEach(e => {
          if (keyboardVals[e]) {
            currentComponent.controls[e](currentComponent, true);
          } else if (!keyboardVals[e] && wasCLicked[e]) {
            currentComponent.animations &&
              (currentComponent.animData.anim = {});
            currentComponent.controls[e](currentComponent, false);
            wasCLicked[e] = false;
          }
        });
      }
    });

    /**@resolve collisions */
    all.forEach(component => {
      const currentComponent = allComponentData[component];
      resolveCollision(currentComponent);
    });

    /**@render render all components */
    for (let i = 0; i < renderCommands.length; i++) {
      renderCommands[i]();
    }

    /**@timingFunctions resolves timing functions */
    Object.values(loopCommands).forEach(command => {
      command[1]++;
      if (command[1] === command[2]) {
        command[0]();
        if (command[3] === "timeout") {
          delete loopCommands[command[4]];
        } else {
          if (loopCommands[command[4]]) {
            loopCommands[command[4]] = [
              command[0],
              0,
              command[2],
              command[3],
              command[4]
            ];
          }
        }
      }
    });
    requestAnimationFrame(gameLoop);
  };
  gameLoop();
};

export default InitScene;
