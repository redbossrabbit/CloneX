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

        if (currentComponent.reactsWith[otherComponent.name]) {

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
                        if (exceptYPos < othersYPos) {
                            if (exceptXPos + exceptWidth - othersXPos < exceptYPos + exceptHeight - othersYPos) {

                                if (otherComponent.reactsWith[currentComponent.name]) {
                                    let v1 = otherComponent.lv || 0,
                                        v2 = currentComponent.rv || 0;
                                    currentComponent.x -= v1;
                                    otherComponent.x += v2;
                                } else {
                                    currentComponent.x -= currentComponent.rv || 0 + otherComponent.lv || 0;
                                } //at left
                            } else {
                                if (otherComponent.reactsWith[currentComponent.name]) {
                                    let v1 = otherComponent.uv || 0,
                                        v2 = currentComponent.dv || 0;
                                    currentComponent.y -= v1;
                                    otherComponent.y += v2;
                                } else {
                                    currentComponent.y -= currentComponent.dv || 0 + otherComponent.uv || 0;
                                } //at top
                            }
                        } else {
                            if (exceptXPos + exceptWidth - othersXPos < othersYPos + othersHeight - exceptYPos) {
                                if (otherComponent.reactsWith[currentComponent.name]) {
                                    let v1 = otherComponent.lv || 0,
                                        v2 = currentComponent.rv || 0;
                                    currentComponent.x -= v1;
                                    otherComponent.x += v2;
                                } else {
                                    currentComponent.x -= currentComponent.rv || 0 + otherComponent.lv || 0;
                                }; //at left
                            } else {
                                if (otherComponent.reactsWith[currentComponent.name]) {
                                    let v1 = otherComponent.dv || 0,
                                        v2 = currentComponent.uv || 0;
                                    currentComponent.y += v1;
                                    otherComponent.y -= v2;
                                } else {
                                    currentComponent.y += currentComponent.uv || 0 + otherComponent.dv || 0;
                                } //at bottom
                            }
                        }
                    } else {
                        if (exceptYPos < othersYPos) {
                            if (othersXPos + othersWidth - exceptXPos < exceptYPos + exceptHeight - othersYPos) {
                                if (otherComponent.reactsWith[currentComponent.name]) {
                                    let v1 = otherComponent.rv || 0,
                                        v2 = currentComponent.lv || 0;
                                    currentComponent.x += v1;
                                    otherComponent.x -= v2;
                                } else {
                                    currentComponent.x += currentComponent.lv || 0 + otherComponent.rv || 0;
                                } //at right
                            } else {
                                if (otherComponent.reactsWith[currentComponent.name]) {
                                    let v1 = otherComponent.uv || 0,
                                        v2 = currentComponent.dv || 0;
                                    currentComponent.y -= v1;
                                    otherComponent.y += v2;
                                } else {
                                    currentComponent.y -= currentComponent.dv || 0 + otherComponent.uv || 0;
                                } //at top
                            }
                        } else {
                            if (othersXPos + othersWidth - exceptXPos < othersYPos + othersHeight - exceptYPos) {
                                if (otherComponent.reactsWith[currentComponent.name]) {
                                    let v1 = otherComponent.rv || 0,
                                        v2 = currentComponent.lv || 0;
                                    currentComponent.x += v1;
                                    otherComponent.x -= v2;
                                } else {
                                    currentComponent.x += currentComponent.rv || 0 + otherComponent.rv || 0;
                                } //at right
                            } else {
                                if (otherComponent.reactsWith[currentComponent.name]) {
                                    let v1 = otherComponent.dv || 0,
                                        v2 = currentComponent.uv || 0;
                                    currentComponent.y += v1;
                                    otherComponent.y -= v2;
                                } else {
                                    currentComponent.y += currentComponent.dv || 0 + otherComponent.dv || 0;
                                } //at bottom
                            }
                        }
                    }
                }

                currentComponent.onCollision && currentComponent.onCollision(collisionData);

            }
        };
    }
}