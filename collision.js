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
      let collisionData = {
        entity: otherComponent
      };
      try {
        if (
          otherComponent.rigidBody &&
          currentComponent.reactsWith[otherComponent.name]
        ) {
          if (exceptXPos < othersXPos) {
            const xD = exceptXPos + exceptWidth - othersXPos;
            collisionData.displacementX = xD;

            if (exceptYPos < othersYPos) {
              const yD = exceptYPos + exceptHeight - othersYPos;
              collisionData.displacementY = yD;

              if (xD < yD) {
                if (currentComponent.static) {
                  otherComponent.setX(e => (e.x += xD));
                  resolveCollision(otherComponent);
                } else if (otherComponent.static) {
                  currentComponent.setX(e => (e.x -= xD));
                  resolveCollision(currentComponent);
                } else {
                  if (currentComponent.IS_MOVING_X) {
                    otherComponent.setX(e => (e.x += xD));
                    resolveCollision(otherComponent);
                  } else if (otherComponent.IS_MOVING_X) {
                    currentComponent.setX(e => (e.x -= xD));
                    resolveCollision(currentComponent);
                  }
                }
                collisionData.atLeft = true;
                //at left
              } else {
                currentComponent.GRAVITY = GRAVITY;

                if (currentComponent.static) {
                  otherComponent.setY(e => (e.y += yD));
                  resolveCollision(otherComponent);
                } else if (otherComponent.static) {
                  currentComponent.setY(e => (e.y -= yD));
                  resolveCollision(currentComponent);
                } else {
                  if (currentComponent.IS_MOVING_Y) {
                    otherComponent.setY(e => (e.y += yD));
                    resolveCollision(otherComponent);
                  } else if (otherComponent.IS_MOVING_Y) {
                    currentComponent.setY(e => (e.y -= yD));
                    resolveCollision(currentComponent);
                  }
                }
                collisionData.atTop = true;
                //at top
              }
            } else {
              const yD = othersYPos + othersHeight - exceptYPos;
              collisionData.displacementY = yD;

              if (xD < yD) {
                if (currentComponent.static) {
                  otherComponent.setX(e => (e.x += xD));
                  resolveCollision(otherComponent);
                } else if (otherComponent.static) {
                  currentComponent.setX(e => (e.x -= xD));
                  resolveCollision(currentComponent);
                } else {
                  if (currentComponent.IS_MOVING_X) {
                    otherComponent.setX(e => (e.x += xD));
                    resolveCollision(otherComponent);
                  } else if (otherComponent.IS_MOVING_X) {
                    currentComponent.setX(e => (e.x -= xD));
                    resolveCollision(currentComponent);
                  }
                }
                collisionData.atLeft = true;
                //at left
              } else {
                otherComponent.GRAVITY = GRAVITY;

                if (currentComponent.static) {
                  otherComponent.setY(e => (e.y -= yD));
                  resolveCollision(otherComponent);
                } else if (otherComponent.static) {
                  currentComponent.setY(e => (e.y += yD));
                  resolveCollision(currentComponent);
                } else {
                  if (currentComponent.IS_MOVING_Y) {
                    otherComponent.setY(e => (e.y -= yD));
                    resolveCollision(otherComponent);
                  } else if (otherComponent.IS_MOVING_Y) {
                    currentComponent.setY(e => (e.y += yD));
                    resolveCollision(currentComponent);
                  }
                }
                collisionData.atBottom = true;
                //at bottom
              }
            }
          } else {
            const xD = othersXPos + othersWidth - exceptXPos;
            collisionData.displacementX = xD;

            if (exceptYPos < othersYPos) {
              const yD = exceptYPos + exceptHeight - othersYPos;
              collisionData.displacementY = yD;

              if (xD < yD) {
                if (currentComponent.static) {
                  otherComponent.setX(e => (e.x -= xD));
                  resolveCollision(otherComponent);
                } else if (otherComponent.static) {
                  currentComponent.setX(e => (e.x += xD));
                  resolveCollision(currentComponent);
                } else {
                  if (currentComponent.IS_MOVING_X) {
                    otherComponent.setX(e => (e.x -= xD));
                    resolveCollision(otherComponent);
                  } else if (otherComponent.IS_MOVING_X) {
                    currentComponent.setX(e => (e.x += xD));
                    resolveCollision(currentComponent);
                  }
                }
                collisionData.atRight = true;
                //at right
              } else {
                currentComponent.GRAVITY = GRAVITY;

                if (currentComponent.static) {
                  otherComponent.setY(e => (e.y += yD));
                  resolveCollision(otherComponent);
                } else if (otherComponent.static) {
                  currentComponent.setY(e => (e.y -= yD));
                  resolveCollision(currentComponent);
                } else {
                  if (currentComponent.IS_MOVING_Y) {
                    otherComponent.setY(e => (e.y += yD));
                    resolveCollision(otherComponent);
                  } else if (otherComponent.IS_MOVING_Y) {
                    currentComponent.setY(e => (e.y -= yD));
                    resolveCollision(currentComponent);
                  }
                }
                collisionData.atTop = true;
                //at top
              }
            } else {
              const yD = othersYPos + othersHeight - exceptYPos;
              collisionData.displacementY = yD;

              if (xD < yD) {
                if (currentComponent.static) {
                  otherComponent.setX(e => (e.x -= xD));
                  resolveCollision(otherComponent);
                } else if (otherComponent.static) {
                  currentComponent.setX(e => (e.x += xD));
                  resolveCollision(currentComponent);
                } else {
                  if (currentComponent.IS_MOVING_X) {
                    otherComponent.setX(e => (e.x -= xD));
                    resolveCollision(otherComponent);
                  } else if (otherComponent.IS_MOVING_X) {
                    currentComponent.setX(e => (e.x += xD));
                    resolveCollision(currentComponent);
                  }
                }
                collisionData.atRight = true;
                //at right
              } else {
                otherComponent.GRAVITY = GRAVITY;
                if (currentComponent.static) {
                  otherComponent.setY(e => (e.y -= yD));
                  resolveCollision(otherComponent);
                } else if (otherComponent.static) {
                  currentComponent.setY(e => (e.y += yD));
                  resolveCollision(currentComponent);
                } else {
                  if (currentComponent.IS_MOVING_Y) {
                    otherComponent.setY(e => (e.y -= yD));
                    resolveCollision(otherComponent);
                  } else if (otherComponent.IS_MOVING_Y) {
                    currentComponent.setY(e => (e.y += yD));
                    resolveCollision(currentComponent);
                  }
                }
                collisionData.atBottom = true;
                //at bottom
              }
            }
          }
        }
      } catch {}
      currentComponent.onCollision &&
        currentComponent.onCollision(collisionData);
    }
  }
};
