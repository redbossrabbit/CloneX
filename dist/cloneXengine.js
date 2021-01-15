/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is not neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./animation.js":
/*!**********************!*\
  !*** ./animation.js ***!
  \**********************/
/*! namespace exports */
/*! export setAnimation [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"setAnimation\": () => /* binding */ setAnimation\n/* harmony export */ });\nconst setAnimation = (component) => {\r\n    component.frame = 0;\r\n      component.updateTime = 0;\r\n      component.animData = {\r\n        anim: {}\r\n      };\r\n      \r\n      /**\r\n      * animation data:\r\n      - X,Y positions for where to start the animation.\r\n      -How many frames.\r\n      */\r\n\r\n      //Preload Image\r\n      const img = document.createElement(\"img\");\r\n      img.setAttribute(\"src\", component.animations.spriteSheet);\r\n      component.animations.spriteSheet = img;\r\n\r\n      //Animation player\r\n      component.play = () => {\r\n        if (component.updateTime === component.animations.speed) {\r\n           //checks how many gameloops before going to next frame of animation\r\n          component.updateTime = 0;\r\n          if (component.frame >= component.animData.limit) {\r\n            component.animations.y = component.animations.frameHeight * component.animData.yOrigin;\r\n            component.animations.x = component.animData.xOrigin;\r\n            component.frame = 0;\r\n          }\r\n          component.animations.x = (component.frame + component.animData.xOrigin) * component.animations.frameWidth;\r\n        //   console.log(component.animations.x)\r\n          component.frame++;\r\n        }\r\n        component.updateTime++;\r\n      }\r\n\r\n      //animate function sets the animation data in the animData object.\r\n      component.animate = (anim) => {\r\n        if (!component.animData.anim[anim]) {\r\n          component.animData.anim = {};\r\n          component.animData.anim[anim] = true;\r\n          component.frame = 0;\r\n          component.updateTime = 0;\r\n\r\n          component.animData.yOrigin = component.animations[anim][0];\r\n          component.animData.xOrigin = component.animations[anim][1];\r\n          component.animData.limit = component.animations[anim][2];\r\n          component.animations.y = component.animations.frameHeight * component.animData.yOrigin;\r\n          component.animations.x = component.animations.frameWidth * (component.animData.xOrigin + 1);\r\n        }\r\n      }\r\n}\n\n//# sourceURL=webpack://clonex/./animation.js?");

/***/ }),

/***/ "./collision.js":
/*!**********************!*\
  !*** ./collision.js ***!
  \**********************/
/*! namespace exports */
/*! export resolveCollision [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"resolveCollision\": () => /* binding */ resolveCollision\n/* harmony export */ });\n/* harmony import */ var _components_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components.js */ \"./components.js\");\n\r\nconst resolveCollision = (currentComponent, components) => {\r\n    // if(!currentComponent)return;\r\n    const {\r\n        [currentComponent.id]: except, ...others\r\n    } = _components_js__WEBPACK_IMPORTED_MODULE_0__.allComponentData,\r\n    othersArr = Object.keys(others);\r\n\r\n    for (let e = 0; e < othersArr.length; e++) {\r\n\r\n        const otherComponent = others[othersArr[e]];\r\n\r\n\r\n            const exceptXPos = currentComponent.x,\r\n                exceptYPos = currentComponent.y,\r\n                exceptWidth = currentComponent.w,\r\n                exceptHeight = currentComponent.h,\r\n                othersXPos = otherComponent.x,\r\n                othersYPos = otherComponent.y,\r\n                othersWidth = otherComponent.w,\r\n                othersHeight = otherComponent.h;\r\n\r\n            if (exceptXPos < othersXPos + othersWidth &&\r\n                othersXPos < exceptXPos + exceptWidth &&\r\n                exceptYPos < othersYPos + othersHeight &&\r\n                othersYPos < exceptYPos + exceptHeight) {\r\n                const collisionData = {\r\n                    entity: otherComponent\r\n                };\r\n                if (otherComponent.rigidBody) {\r\n\r\n                    if (exceptXPos < othersXPos) {\r\n                        const xD = exceptXPos + exceptWidth - othersXPos;\r\n                        if (exceptYPos < othersYPos) {\r\n                            const yD = exceptYPos + exceptHeight - othersYPos;\r\n                            if (xD < yD) {\r\n\r\n\r\n                                collisionData.displacement = ['x', -xD];\r\n                                    collisionData.atLeft = true;\r\n                                //at left\r\n                            } else {\r\n                                \r\n                                collisionData.displacement = ['y', -yD];\r\n                                    collisionData.atTop = true;\r\n                                //at top\r\n                            }\r\n                        } else {\r\n                            const yD = othersYPos + othersHeight - exceptYPos;\r\n                            if (xD < yD) {\r\n                                \r\n                                collisionData.displacement = ['x', -xD];\r\n                                    collisionData.atLeft = true;\r\n                                 //at left\r\n                            } else {\r\n                                \r\n                                collisionData.displacement = ['y', yD];\r\n                                    collisionData.atBottom = true;\r\n                                 //at bottom\r\n                            }\r\n                        }\r\n                    } else {\r\n                        const xD = othersXPos + othersWidth - exceptXPos;\r\n                        if (exceptYPos < othersYPos) {\r\n                            const yD =  exceptYPos + exceptHeight - othersYPos;\r\n                            if (xD < yD) {\r\n                                \r\n                                collisionData.displacement = ['x', xD];\r\n                                    collisionData.atRight = true;\r\n                                 //at right\r\n                            } else {\r\n                                \r\n                                collisionData.displacement = ['y', -yD];\r\n                                    collisionData.atTop = true;\r\n                                 //at top\r\n                            }\r\n                        } else {\r\n                            const yD = othersYPos + othersHeight - exceptYPos;\r\n                            if (xD < yD) {\r\n                                \r\n                                collisionData.displacement = ['x', xD];\r\n                                    collisionData.atRight = true;\r\n                                 //at right\r\n                            } else {\r\n                                \r\n                                collisionData.displacement = ['y', yD];\r\n                                    collisionData.atBottom = true;\r\n                                 //at bottom\r\n                            }\r\n                        }\r\n                    }\r\n                }\r\n\r\n                components.splice(components.indexOf(otherComponent.id), 1);\r\n                currentComponent.onCollision && currentComponent.onCollision(collisionData);\r\n                \r\n\r\n            }\r\n        };\r\n    }\r\n\n\n//# sourceURL=webpack://clonex/./collision.js?");

/***/ }),

/***/ "./components.js":
/*!***********************!*\
  !*** ./components.js ***!
  \***********************/
/*! namespace exports */
/*! export allComponentData [provided] [no usage info] [missing usage info prevents renaming] */
/*! export component [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"allComponentData\": () => /* binding */ allComponentData,\n/* harmony export */   \"component\": () => /* binding */ component\n/* harmony export */ });\n/* harmony import */ var _animation_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./animation.js */ \"./animation.js\");\n/* harmony import */ var _render_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./render.js */ \"./render.js\");\n\r\n\r\nlet id = 0;\r\nconst allComponentData = {};\r\nclass Component {\r\n    constructor(obj) {\r\n        for (const key in obj.props) {\r\n            this[key] = obj.props[key];\r\n        }\r\n        for (const key in obj.states) {\r\n            this[key] = obj.states[key];\r\n        }\r\n\r\n        this.id = id;\r\n\r\n        if (this.animations) {\r\n            (0,_animation_js__WEBPACK_IMPORTED_MODULE_0__.setAnimation)(this);\r\n        }\r\n\r\n        allComponentData[id] = this;\r\n\r\n        this.render = () => (0,_render_js__WEBPACK_IMPORTED_MODULE_1__.render)(this);\r\n        _render_js__WEBPACK_IMPORTED_MODULE_1__.renderCommands.push(this.render);\r\n        id++;\r\n    }\r\n}\r\nconst component = obj => new Component(obj);\n\n//# sourceURL=webpack://clonex/./components.js?");

/***/ }),

/***/ "./game-loop.js":
/*!**********************!*\
  !*** ./game-loop.js ***!
  \**********************/
/*! namespace exports */
/*! export initScene [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"initScene\": () => /* binding */ initScene\n/* harmony export */ });\n/* harmony import */ var _components_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components.js */ \"./components.js\");\n/* harmony import */ var _render_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./render.js */ \"./render.js\");\n/* harmony import */ var _collision_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./collision.js */ \"./collision.js\");\n/* harmony import */ var _helper_functions_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./helper-functions.js */ \"./helper-functions.js\");\n\r\n\r\n\r\n\r\n\r\nconst frameRateTxt = document.getElementById('frame-rate');\r\n\r\nconst keyboardVals = {};\r\n\r\nlet frame = 0;\r\nsetInterval(() => {\r\n  frameRateTxt.innerText = `${frame}fps`;\r\n  frame = 0;\r\n}, 1000);\r\n\r\nconst remove = component => {\r\n  delete _components_js__WEBPACK_IMPORTED_MODULE_0__.allComponentData[component.id];\r\n  _render_js__WEBPACK_IMPORTED_MODULE_1__.renderCommands.splice(_render_js__WEBPACK_IMPORTED_MODULE_1__.renderCommands.indexOf(component.render), 1);\r\n};\r\n\r\nlet g = 20;\r\nconst gravity = component => (component.y += g);\r\n\r\nconst initScene = (xcor, ycor, width, height, obj) => {\r\n  _render_js__WEBPACK_IMPORTED_MODULE_1__.scene.width = width;\r\n  _render_js__WEBPACK_IMPORTED_MODULE_1__.scene.height = height;\r\n\r\n  window.addEventListener(\r\n    \"keydown\",\r\n    e => {\r\n      keyboardVals[e.key] = true;\r\n    },\r\n    true\r\n  );\r\n  window.addEventListener(\r\n    \"keyup\",\r\n    e => {\r\n      keyboardVals[e.key] = false;\r\n    },\r\n    true\r\n  );\r\n\r\n  const gameLoop = () => {\r\n    _render_js__WEBPACK_IMPORTED_MODULE_1__.game.clearRect(xcor, ycor, obj.w || width, obj.h || height);\r\n    _render_js__WEBPACK_IMPORTED_MODULE_1__.game.fillStyle = obj.color;\r\n    _render_js__WEBPACK_IMPORTED_MODULE_1__.game.fillRect(xcor, ycor, width, height);\r\n\r\n    for (let i = 0; i < _render_js__WEBPACK_IMPORTED_MODULE_1__.renderCommands.length; i++) {\r\n\r\n      const currentComponent = _render_js__WEBPACK_IMPORTED_MODULE_1__.renderCommands[i]();\r\n\r\n\r\n      currentComponent.default && currentComponent.default();\r\n\r\n\r\n      currentComponent.controls &&\r\n        Object.keys(currentComponent.controls).forEach(e => {\r\n          keyboardVals[e] && currentComponent.controls[e](currentComponent);\r\n        });\r\n\r\n\r\n      const resolve = (currentComponent) => {\r\n\r\n        const {\r\n          [currentComponent.id]: except, ...others\r\n        } = _components_js__WEBPACK_IMPORTED_MODULE_0__.allComponentData,\r\n        othersArr = Object.keys(others);\r\n\r\n        for (let e = 0; e < othersArr.length; e++) {\r\n\r\n          const otherComponent = others[othersArr[e]];\r\n\r\n          const exceptXPos = currentComponent.x,\r\n            exceptYPos = currentComponent.y,\r\n            exceptWidth = currentComponent.w,\r\n            exceptHeight = currentComponent.h,\r\n            othersXPos = otherComponent.x,\r\n            othersYPos = otherComponent.y,\r\n            othersWidth = otherComponent.w,\r\n            othersHeight = otherComponent.h;\r\n\r\n          if (exceptXPos < othersXPos + othersWidth &&\r\n            othersXPos < exceptXPos + exceptWidth &&\r\n            exceptYPos < othersYPos + othersHeight &&\r\n            othersYPos < exceptYPos + exceptHeight) {\r\n            const collisionData = {\r\n              entity: otherComponent\r\n            };\r\n            if (otherComponent.rigidBody && currentComponent.reactsWith[otherComponent.name]) {\r\n              if (exceptXPos < othersXPos) {\r\n                const xD = exceptXPos + exceptWidth - othersXPos;\r\n\r\n                if (exceptYPos < othersYPos) {\r\n                  const yD = exceptYPos + exceptHeight - othersYPos;\r\n\r\n                  if (xD < yD) {\r\n                    otherComponent.x += xD;\r\n                    resolve(otherComponent);\r\n                    //at left\r\n                  } else {\r\n                    otherComponent.y += yD;\r\n                    resolve(otherComponent);\r\n                    //at top\r\n                  }\r\n                } else {\r\n                  const yD = othersYPos + othersHeight - exceptYPos;\r\n\r\n                  if (xD < yD) {\r\n                    otherComponent.x += xD;\r\n                    resolve(otherComponent);\r\n                    //at left\r\n                  } else {\r\n                    otherComponent.y -= yD;\r\n                    resolve(otherComponent);\r\n                    //at bottom\r\n                  }\r\n                }\r\n              } else {\r\n                const xD = othersXPos + othersWidth - exceptXPos;\r\n\r\n                if (exceptYPos < othersYPos) {\r\n                  const yD = exceptYPos + exceptHeight - othersYPos;\r\n                  \r\n                  if (xD < yD) {\r\n                    otherComponent.x -= xD;\r\n                    resolve(otherComponent);\r\n                    //at right\r\n                  } else {\r\n                    otherComponent.y += yD;\r\n                    resolve(otherComponent);\r\n                    //at top\r\n                  }\r\n                } else {\r\n                  const yD = othersYPos + othersHeight - exceptYPos;\r\n                  \r\n                  if (xD < yD) {\r\n                    otherComponent.x -= xD;\r\n                    resolve(otherComponent);\r\n                    //at right\r\n                  } else {\r\n                    otherComponent.y -= yD;\r\n                    resolve(otherComponent);\r\n                    //at bottom\r\n                  }\r\n                }\r\n              }\r\n            }\r\n            currentComponent.onCollision && currentComponent.onCollision(collisionData);\r\n          }\r\n        }\r\n      }\r\n      resolve(currentComponent);\r\n    }\r\n    frame++;\r\n    for (const e of _helper_functions_js__WEBPACK_IMPORTED_MODULE_3__.loopCommands.values()) {\r\n      e[1]++;\r\n    }\r\n    requestAnimationFrame(gameLoop);\r\n  };\r\n  gameLoop();\r\n};\r\n/**--------------\r\n *\r\n * TEST AREA\r\n *\r\n * -----------------------*/\r\nconst bullet = e =>\r\n  (0,_components_js__WEBPACK_IMPORTED_MODULE_0__.component)({\r\n    props: {\r\n      name: \"bullet\",\r\n      color: \"yellow\",\r\n      // mass: 1,\r\n      x: !e.facingLeft ? e.x + 50 : e.x - 10,\r\n      y: e.y + 25,\r\n      w: 10,\r\n      h: 3,\r\n      facingLeft: e.facingLeft,\r\n      reactsWith: {}\r\n    },\r\n    states: {\r\n      default () {\r\n        !this.facingLeft ? (this.x += 50) : (this.x -= 50);\r\n      },\r\n      onCollision(d) {\r\n        d.entity.isHit = true;\r\n        remove(this);\r\n      }\r\n    }\r\n  });\r\n\r\n\r\nconst boy = (0,_components_js__WEBPACK_IMPORTED_MODULE_0__.component)({\r\n  props: {\r\n    name: \"boy\",\r\n    mass: 10,\r\n    w: 50,\r\n    h: 50,\r\n    x: 40,\r\n    y: 20,\r\n    facingLeft: false,\r\n    rigidBody: true,\r\n    // canJump: false,\r\n    // gravity: true,\r\n    canCollide: true,\r\n    reactsWith: {\r\n      enemy: true\r\n    },\r\n    animations: {\r\n      spriteSheet: \"./assets/img/sprite-sheet.png\",\r\n      imageSizeX: 50,\r\n      imageSizeY: 50,\r\n      speed: 10,\r\n      frameWidth: 400,\r\n      frameHeight: 450,\r\n\r\n      //animations\r\n      downAnim: [0, 0, 4],\r\n      rightAnim: [3, 0, 4],\r\n      leftAnim: [2, 0, 4],\r\n      upAnim: [1, 0, 4],\r\n      idle: [0, 0, 1]\r\n    },\r\n  },\r\n  states: {\r\n    default () {\r\n      !this.isMoving && this.animate('idle');\r\n      this.isMoving = false;\r\n      // if (this.y >= 700 && this.gravity) {\r\n      //   this.gravity = false;\r\n      //   this.y = this.y;\r\n      //   this.canJump = true;\r\n      // }\r\n      if (this.x < 10) this.x = 10;\r\n      else if (this.x > 950) this.x = 950;\r\n    },\r\n    controls: {\r\n      ArrowUp(e) {\r\n        e.animate('upAnim');\r\n        e.uv = 5;\r\n        e.y -= e.uv;\r\n        e.isMoving = true;\r\n        // if(!redBox.canJump) return;\r\n        // redBox.canJump = false;\r\n        // let max = 0;\r\n        // redBox.gravity = false;\r\n        // redBox.jump = () => {\r\n        //   if(max === 60){\r\n        //     redBox.gravity = true;\r\n        //     return\r\n        //   }\r\n        //   redBox.y -= 30;\r\n        //   max += 5;\r\n        //   requestAnimationFrame(redBox.jump);\r\n        // }\r\n        // redBox.jump();\r\n      },\r\n      ArrowDown(e) {\r\n        e.animate('downAnim');\r\n        e.dv = 5;\r\n        e.y += e.dv;\r\n        e.isMoving = true;\r\n      },\r\n      ArrowLeft(e) {\r\n        e.animate('leftAnim');\r\n        e.lv = 5;\r\n        e.x -= e.lv;\r\n        e.isMoving = true;\r\n        e.facingLeft = true;\r\n      },\r\n      ArrowRight(e) {\r\n        e.animate('rightAnim');\r\n        e.rv = 5;\r\n        e.x += e.rv;\r\n        e.isMoving = true;\r\n        e.facingLeft = false;\r\n      },\r\n      d(e) {\r\n        (0,_helper_functions_js__WEBPACK_IMPORTED_MODULE_3__.loop)(shoot, 10);\r\n      }\r\n    },\r\n    onCollision(data) {}\r\n  }\r\n});\r\nconst shoot = () => bullet(boy).facingLeft = boy.facingLeft;\r\n\r\n// document.addEventListener('keyup', e => {\r\n//   redBox.animate('idle');\r\n// })\r\n\r\n/**\r\n * @param \r\n */\r\nconst enemy = () =>\r\n  (0,_components_js__WEBPACK_IMPORTED_MODULE_0__.component)({\r\n    props: {\r\n      name: 'enemy',\r\n      mass: 10,\r\n      color: 'red',\r\n      x: undefined,\r\n      y: undefined,\r\n      w: 50,\r\n      h: 50,\r\n      lv: 0,\r\n      rv: 0,\r\n      dv: 0,\r\n      uv: 0,\r\n      gravity: false,\r\n      bounds: {},\r\n      isHit: false,\r\n      r: undefined,\r\n      canCollide: true,\r\n      reactsWith: {\r\n        enemy: true,\r\n        boy: true,\r\n        bullet: true\r\n      },\r\n      rigidBody: true\r\n    },\r\n    states: {\r\n      default () {\r\n        this.isHit ?\r\n          (this.color = 'red') :\r\n          (this.color = 'yellow');\r\n        this.isHit = false;\r\n        // this.x -= this.lv;\r\n        // if (this.y >= 600) {\r\n        //   this.r = false;\r\n        //   this.uv = 10;\r\n        // } else if (this.y <= 100) {\r\n        //   this.r = true;\r\n        //   this.dv = 10;\r\n        // }\r\n        // console.log(this.dv)\r\n        // this.r ? (this.y += this.dv) : (this.y -= this.uv);\r\n      },\r\n      onCollision(data) {}\r\n    }\r\n  });\r\nconst block4 = enemy();\r\nblock4.y = 90;\r\nblock4.x = 300;\r\nblock4.w = 100;\r\nblock4.h = 50;\r\nconst block3 = enemy();\r\nblock3.y = 100;\r\nblock3.x = 500;\r\nblock3.w = 100;\r\nblock3.h = 50;\r\nconst block5 = enemy();\r\nblock5.y = 100;\r\nblock5.x = 700;\r\nblock5.w = 100;\r\nblock5.h = 50;\r\n\r\ninitScene(0, 0, 1000, 790, {\r\n  color: \"grey\"\r\n});\n\n//# sourceURL=webpack://clonex/./game-loop.js?");

/***/ }),

/***/ "./helper-functions.js":
/*!*****************************!*\
  !*** ./helper-functions.js ***!
  \*****************************/
/*! namespace exports */
/*! export loop [provided] [no usage info] [missing usage info prevents renaming] */
/*! export loopCommands [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"loopCommands\": () => /* binding */ loopCommands,\n/* harmony export */   \"loop\": () => /* binding */ loop\n/* harmony export */ });\nconst loopCommands = new Map();\r\nconst loop = (func, speed) => {\r\n    if (!loopCommands.get(func)) {\r\n        loopCommands.set(func, [func, 0]);\r\n        func();\r\n    }\r\n    if (loopCommands.get(func)[1] >= speed) {\r\n        func();\r\n        loopCommands.set(func, [func, 0]);\r\n    }\r\n}\n\n//# sourceURL=webpack://clonex/./helper-functions.js?");

/***/ }),

/***/ "./render.js":
/*!*******************!*\
  !*** ./render.js ***!
  \*******************/
/*! namespace exports */
/*! export game [provided] [no usage info] [missing usage info prevents renaming] */
/*! export render [provided] [no usage info] [missing usage info prevents renaming] */
/*! export renderCommands [provided] [no usage info] [missing usage info prevents renaming] */
/*! export scene [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"renderCommands\": () => /* binding */ renderCommands,\n/* harmony export */   \"scene\": () => /* binding */ scene,\n/* harmony export */   \"game\": () => /* binding */ game,\n/* harmony export */   \"render\": () => /* binding */ render\n/* harmony export */ });\nconst renderCommands = [];\r\nconst scene = document.createElement(\"canvas\");\r\ndocument.body.append(scene);\r\nconst game = scene.getContext(\"2d\");\r\n\r\nconst render = (component) => {\r\n  // console.log(component)\r\n    component.color &&\r\n      (() => {\r\n        game.fillStyle = component.color;\r\n        game.fillRect(component.x, component.y, component.w, component.h);\r\n      })();\r\n\r\n    if (component.animations) {\r\n      game.drawImage(component.animations.spriteSheet, component.animations.x, component.animations.y, component.animations.frameWidth, component.animations.frameHeight, component.x, component.y, component.animations.imageSizeX, component.animations.imageSizeY);\r\n      component.play();\r\n    }\r\n    return component;\r\n  };\n\n//# sourceURL=webpack://clonex/./render.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./game-loop.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;