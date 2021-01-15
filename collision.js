import {
    allComponentData
} from './components.js'
export const resolveCollision = (currentComponent) => {

    const {
        [currentComponent.id]: except, ...others
    } = allComponentData,
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

        if (exceptXPos < othersXPos + othersWidth &&
            othersXPos < exceptXPos + exceptWidth &&
            exceptYPos < othersYPos + othersHeight &&
            othersYPos < exceptYPos + exceptHeight) {

            let collisionData = {entitiy: otherComponent};

            if (otherComponent.rigidBody && currentComponent.reactsWith[otherComponent.name]) {
                if (exceptXPos < othersXPos) {
                    const xD = exceptXPos + exceptWidth - othersXPos;
                    collisionData.displacementX = xD;

                    if (exceptYPos < othersYPos) {
                        const yD = exceptYPos + exceptHeight - othersYPos;
                        collisionData.displacementY = yD;

                        if (xD < yD) {
                            otherComponent.x += xD;
                            resolveCollision(otherComponent);
                            //at left
                        } else {
                            otherComponent.y += yD;
                            resolveCollision(otherComponent);
                            //at top
                        }
                    } else {
                        const yD = othersYPos + othersHeight - exceptYPos;
                        collisionData.displacementY = yD;

                        if (xD < yD) {
                            otherComponent.x += xD;
                            resolveCollision(otherComponent);
                            //at left
                        } else {
                            otherComponent.y -= yD;
                            resolveCollision(otherComponent);
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
                            otherComponent.x -= xD;
                            resolveCollision(otherComponent);
                            //at right
                        } else {
                            otherComponent.y += yD;
                            resolveCollision(otherComponent);
                            //at top
                        }
                    } else {
                        const yD = othersYPos + othersHeight - exceptYPos;
                        collisionData.displacementY = yD;

                        if (xD < yD) {
                            otherComponent.x -= xD;
                            resolveCollision(otherComponent);
                            //at right
                        } else {
                            otherComponent.y -= yD;
                            resolveCollision(otherComponent);
                            //at bottom
                        }
                    }
                    
                }
            }
            currentComponent.onCollision && currentComponent.onCollision(collisionData);
        }
    }
}