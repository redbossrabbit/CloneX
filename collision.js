import { allComponentData } from "./components.js";
import { GRAVITY } from "./game-loop.js";

export const resolveCollision = currentComponent => {
  if (!currentComponent) return;

  const { [currentComponent.id]: except, ...others } = allComponentData,
    othersArr = Object.keys(others);

  for (let e = 0; e < othersArr.length; e++) {
    const otherComponent = others[othersArr[e]];

    const exceptXPos = currentComponent.x,
      exceptYPos = currentComponent.y,
      exceptWidth = currentComponent.w,
      exceptHeight = currentComponent.h,
      othersXPos = otherComponent.x,
      othersYPos = otherComponent.y,
      othersWidth = otherComponent.w,
      othersHeight = otherComponent.h;

    if (
      exceptXPos < othersXPos + othersWidth &&
      othersXPos < exceptXPos + exceptWidth &&
      exceptYPos < othersYPos + othersHeight &&
      othersYPos < exceptYPos + exceptHeight
    ) {
      let currCollisionData = {
        entity: otherComponent
      };
      let otherCollisionData = {
        entity: currentComponent
      };
      try {
        if (
          otherComponent.rigidBody &&
          currentComponent.reactsWith[otherComponent.name]
        ) {
          if (exceptXPos < othersXPos) {
            const xD = exceptXPos + exceptWidth - othersXPos;
            currCollisionData.displacementX = xD;
            otherCollisionData.displacementX = xD;

            if (exceptYPos < othersYPos) {
              const yD = exceptYPos + exceptHeight - othersYPos;
              currCollisionData.displacementY = yD;
              otherCollisionData.displacementY = yD;

              if (xD < yD) {
                if (currentComponent.static) {
                  otherComponent.setX(xD);
                  resolveCollision(otherComponent);
                } else if (otherComponent.static) {
                  currentComponent.setX(-xD);
                  resolveCollision(currentComponent);
                } else {
                  if (currentComponent.IS_MOVING_X) {
                    otherComponent.setX(xD);
                    resolveCollision(otherComponent);
                  } else if (otherComponent.IS_MOVING_X) {
                    currentComponent.setX(-xD);
                    resolveCollision(currentComponent);
                  }
                }
                currCollisionData.atLeft = true;
                otherCollisionData.atRight = true;
                //at left
              } else {
                currentComponent.GRAVITY = GRAVITY;

                if (currentComponent.static) {
                  otherComponent.setY(yD);
                  resolveCollision(otherComponent);
                } else if (otherComponent.static) {
                  currentComponent.setY(-yD);
                  resolveCollision(currentComponent);
                } else {
                  if (currentComponent.IS_MOVING_Y) {
                    otherComponent.setY(yD);
                    resolveCollision(otherComponent);
                  } else if (otherComponent.IS_MOVING_Y) {
                    currentComponent.setY(-yD);
                    resolveCollision(currentComponent);
                  }
                }
                currCollisionData.atTop = true;
                otherCollisionData.atBottom = true;
                //at top
              }
            } else {
              const yD = othersYPos + othersHeight - exceptYPos;
              currCollisionData.displacementY = yD;
              otherCollisionData.displacementY = yD;

              if (xD < yD) {
                if (currentComponent.static) {
                  otherComponent.setX(xD);
                  resolveCollision(otherComponent);
                } else if (otherComponent.static) {
                  currentComponent.setX(-xD);
                  resolveCollision(currentComponent);
                } else {
                  if (currentComponent.IS_MOVING_X) {
                    otherComponent.setX(xD);
                    resolveCollision(otherComponent);
                  } else if (otherComponent.IS_MOVING_X) {
                    currentComponent.setX(-xD);
                    resolveCollision(currentComponent);
                  }
                }
                currCollisionData.atLeft = true;
                otherCollisionData.atRight = true;
                //at left
              } else {
                otherComponent.GRAVITY = GRAVITY;

                if (currentComponent.static) {
                  otherComponent.setY(-yD);
                  resolveCollision(otherComponent);
                } else if (otherComponent.static) {
                  currentComponent.setY(yD);
                  resolveCollision(currentComponent);
                } else {
                  if (currentComponent.IS_MOVING_Y) {
                    otherComponent.setY(-yD);
                    resolveCollision(otherComponent);
                  } else if (otherComponent.IS_MOVING_Y) {
                    currentComponent.setY(yD);
                    resolveCollision(currentComponent);
                  }
                }
                currCollisionData.atBottom = true;
                otherCollisionData.atTop = true;
                //at bottom
              }
            }
          } else {
            const xD = othersXPos + othersWidth - exceptXPos;
            currCollisionData.displacementX = xD;
            otherCollisionData.displacementX = xD;

            if (exceptYPos < othersYPos) {
              const yD = exceptYPos + exceptHeight - othersYPos;
              currCollisionData.displacementY = yD;
              otherCollisionData.displacementY = yD;

              if (xD < yD) {
                if (currentComponent.static) {
                  otherComponent.setX(-xD);
                  resolveCollision(otherComponent);
                } else if (otherComponent.static) {
                  currentComponent.setX(xD);
                  resolveCollision(currentComponent);
                } else {
                  if (currentComponent.IS_MOVING_X) {
                    otherComponent.setX(-xD);
                    resolveCollision(otherComponent);
                  } else if (otherComponent.IS_MOVING_X) {
                    currentComponent.setX(xD);
                    resolveCollision(currentComponent);
                  }
                }
                currCollisionData.atRight = true;
                otherCollisionData.atLeft = true;
                //at right
              } else {
                currentComponent.GRAVITY = GRAVITY;

                if (currentComponent.static) {
                  otherComponent.setY(yD);
                  resolveCollision(otherComponent);
                } else if (otherComponent.static) {
                  currentComponent.setY(-yD);
                  resolveCollision(currentComponent);
                } else {
                  if (currentComponent.IS_MOVING_Y) {
                    otherComponent.setY(yD);
                    resolveCollision(otherComponent);
                  } else if (otherComponent.IS_MOVING_Y) {
                    currentComponent.setY(-yD);
                    resolveCollision(currentComponent);
                  }
                }
                currCollisionData.atTop = true;
                otherCollisionData.atBottom = true;
                //at top
              }
            } else {
              const yD = othersYPos + othersHeight - exceptYPos;
              currCollisionData.displacementY = yD;
              otherCollisionData.displacementY = yD;

              if (xD < yD) {
                if (currentComponent.static) {
                  otherComponent.setX(-xD);
                  resolveCollision(otherComponent);
                } else if (otherComponent.static) {
                  currentComponent.setX(xD);
                  resolveCollision(currentComponent);
                } else {
                  if (currentComponent.IS_MOVING_X) {
                    otherComponent.setX(-xD);
                    resolveCollision(otherComponent);
                  } else if (otherComponent.IS_MOVING_X) {
                    currentComponent.setX(xD);
                    resolveCollision(currentComponent);
                  }
                }
                currCollisionData.atRight = true;
                otherCollisionData.atLeft = true;
                //at right
              } else {
                otherComponent.GRAVITY = GRAVITY;
                if (currentComponent.static) {
                  otherComponent.setY(-yD);
                  resolveCollision(otherComponent);
                } else if (otherComponent.static) {
                  currentComponent.setY(yD);
                  resolveCollision(currentComponent);
                } else {
                  if (currentComponent.IS_MOVING_Y) {
                    otherComponent.setY(-yD);
                    resolveCollision(otherComponent);
                  } else if (otherComponent.IS_MOVING_Y) {
                    currentComponent.setY(yD);
                    resolveCollision(currentComponent);
                  }
                }
                currCollisionData.atBottom = true;
                otherCollisionData.atTop = true;
                //at bottom
              }
            }
          }
        }
      } catch {}
      currentComponent.onCollision &&
        currentComponent.onCollision(currCollisionData);

      otherComponent.onCollision &&
        otherComponent.onCollision(otherCollisionData);
    }
  }
};
