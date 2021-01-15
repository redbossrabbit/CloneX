import {
    allComponentData
} from './components.js'
export const resolveCollision = (currentComponent, components) => {
    // if(!currentComponent)return;
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
                const collisionData = {
                    entity: otherComponent
                };
                if (otherComponent.rigidBody) {

                    if (exceptXPos < othersXPos) {
                        const xD = exceptXPos + exceptWidth - othersXPos;
                        if (exceptYPos < othersYPos) {
                            const yD = exceptYPos + exceptHeight - othersYPos;
                            if (xD < yD) {


                                collisionData.displacement = ['x', -xD];
                                    collisionData.atLeft = true;
                                //at left
                            } else {
                                
                                collisionData.displacement = ['y', -yD];
                                    collisionData.atTop = true;
                                //at top
                            }
                        } else {
                            const yD = othersYPos + othersHeight - exceptYPos;
                            if (xD < yD) {
                                
                                collisionData.displacement = ['x', -xD];
                                    collisionData.atLeft = true;
                                 //at left
                            } else {
                                
                                collisionData.displacement = ['y', yD];
                                    collisionData.atBottom = true;
                                 //at bottom
                            }
                        }
                    } else {
                        const xD = othersXPos + othersWidth - exceptXPos;
                        if (exceptYPos < othersYPos) {
                            const yD =  exceptYPos + exceptHeight - othersYPos;
                            if (xD < yD) {
                                
                                collisionData.displacement = ['x', xD];
                                    collisionData.atRight = true;
                                 //at right
                            } else {
                                
                                collisionData.displacement = ['y', -yD];
                                    collisionData.atTop = true;
                                 //at top
                            }
                        } else {
                            const yD = othersYPos + othersHeight - exceptYPos;
                            if (xD < yD) {
                                
                                collisionData.displacement = ['x', xD];
                                    collisionData.atRight = true;
                                 //at right
                            } else {
                                
                                collisionData.displacement = ['y', yD];
                                    collisionData.atBottom = true;
                                 //at bottom
                            }
                        }
                    }
                }

                components.splice(components.indexOf(otherComponent.id), 1);
                currentComponent.onCollision && currentComponent.onCollision(collisionData);
                

            }
        };
    }
