import { allComponentData } from "./components.js";
export const resolveCollision = currentComponent => {
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
                otherComponent.x += xD;
              } else if (otherComponent.static) {
                currentComponent.x -= xD;
              } else {
                otherComponent.x += xD;
                resolveCollision(otherComponent);
              }
              collisionData.atLeft = true;
              //at left
            } else {
              if (currentComponent.static) {
                otherComponent.y += yD;
              } else if (otherComponent.static) {
                currentComponent.y -= yD;
              } else {
                otherComponent.y += yD;
                resolveCollision(otherComponent);
              }
              collisionData.atTop = true;
              //at top
            }
          } else {
            const yD = othersYPos + othersHeight - exceptYPos;
            collisionData.displacementY = yD;

            if (xD < yD) {
              if (currentComponent.static) {
                otherComponent.x += xD;
              } else if (otherComponent.static) {
                currentComponent.x -= xD;
              } else {
                otherComponent.x += xD;
                resolveCollision(otherComponent);
              }
              collisionData.atLeft = true;
              //at left
            } else {
              if (currentComponent.static) {
                otherComponent.y -= yD;
              } else if (otherComponent.static) {
                currentComponent.y += yD;
              } else {
                otherComponent.y -= yD;
                resolveCollision(otherComponent);
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
                otherComponent.x -= xD;
              } else if (otherComponent.static) {
                currentComponent.x += xD;
              } else {
                otherComponent.x -= xD;
                resolveCollision(otherComponent);
              }
              collisionData.atRight = true;
              //at right
            } else {
              if (currentComponent.static) {
                otherComponent.y += yD;
              } else if (otherComponent.static) {
                currentComponent.y -= yD;
              } else {
                otherComponent.y += yD;
                resolveCollision(otherComponent);
              }
              collisionData.atTop = true;
              //at top
            }
          } else {
            const yD = othersYPos + othersHeight - exceptYPos;
            collisionData.displacementY = yD;

            if (xD < yD) {
              if (currentComponent.static) {
                otherComponent.x -= xD;
              } else if (otherComponent.static) {
                currentComponent.x += xD;
              } else {
                otherComponent.x -= xD;
                resolveCollision(otherComponent);
              }
              collisionData.atRight = true;
              //at right
            } else {
              if (currentComponent.static) {
                otherComponent.y -= yD;
              } else if (otherComponent.static) {
                currentComponent.y += yD;
              } else {
                otherComponent.y -= yD;
                resolveCollision(otherComponent);
              }
              collisionData.atBottom = true;
              //at bottom
            }
          }
        }
      }
      currentComponent.onCollision &&
        currentComponent.onCollision(collisionData);
    }
  }
};
