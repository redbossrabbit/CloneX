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
/*! export getKeyState [provided] [no usage info] [missing usage info prevents renaming] */
/*! export setAnimation [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"setAnimation\": () => /* binding */ setAnimation,\n/* harmony export */   \"getKeyState\": () => /* binding */ getKeyState\n/* harmony export */ });\nlet keyIsDown = true,\r\n  { [\"log\"]: l } = console;\r\n\r\nconst setAnimation = component => {\r\n  component.frame = 1;\r\n  component.updateTime = 0;\r\n  component.animData = {\r\n    anim: {}\r\n  };\r\n\r\n  //Preload Image\r\n  const img = document.createElement(\"img\");\r\n  img.setAttribute(\"src\", component.animations.spriteSheet);\r\n  component.animations.spriteSheet = img;\r\n\r\n  /**\r\n   * @method play - the animation player\r\n   */\r\n  component.play = () => {\r\n    const { animData, animations } = component;\r\n\r\n    const { speed, frameWidth, frameHeight } = animations;\r\n\r\n    const { limit, xOrigin, yOrigin, animationOptions } = animData;\r\n\r\n    if (component.updateTime === speed) {\r\n      //counts gameloops before going to next frame of animation\r\n      component.updateTime = 0;\r\n      if (component.frame === limit) {\r\n        if (!animationOptions.loop) {\r\n          component.animations.y = frameHeight * yOrigin;\r\n          component.animations.x = xOrigin;\r\n        }\r\n        component.frame = 0;\r\n      }\r\n      if (!animationOptions.still) {\r\n        component.animations.x = (component.frame + xOrigin) * frameWidth;\r\n        component.frame++;\r\n      }\r\n    }\r\n    component.updateTime++;\r\n  };\r\n\r\n  /**\r\n   * @method animate - sets the animation data in the animData object for the animation player to work with\r\n   */\r\n  component.animate = anim => {\r\n    const { animations } = component;\r\n\r\n    const { [anim]: animVar, frameWidth, frameHeight } = animations;\r\n\r\n    const [xcor, ycor, frameAmt, options] = animVar;\r\n\r\n    if (!component.animData.anim[anim]) {\r\n      component.animData.anim = {};\r\n      component.animData.anim[anim] = true;\r\n      component.frame = 1;\r\n      component.updateTime = 0;\r\n\r\n      component.animData.yOrigin = xcor;\r\n      component.animData.xOrigin = ycor;\r\n      component.animData.limit = frameAmt;\r\n      component.animData.animationOptions = {\r\n        ...options\r\n      };\r\n      component.animations.y = frameHeight * xcor;\r\n      component.animations.x = frameWidth * ycor;\r\n    }\r\n  };\r\n};\r\nconst getKeyState = val => (keyIsDown = val);\r\n\n\n//# sourceURL=webpack://clonex/./animation.js?");

/***/ }),

/***/ "./camera.js":
/*!*******************!*\
  !*** ./camera.js ***!
  \*******************/
/*! namespace exports */
/*! export Camera [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Camera\": () => /* binding */ Camera\n/* harmony export */ });\n/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components */ \"./components.js\");\n\r\n\r\nconst observe = (obj, key) => {\r\n  let val = obj[key];\r\n  Object.defineProperty(obj, key, {\r\n    get() {\r\n      return val;\r\n    },\r\n    set(newVal) {\r\n      obj[`_PREVIOUS_VALUE_${key}`] = val;\r\n      val = newVal;\r\n    }\r\n  });\r\n};\r\nclass Camera {\r\n  constructor({ focus, focusX, focusY, focusWidth, focusHeight }) {\r\n    observe(focus, \"x\");\r\n    observe(focus, \"y\");\r\n\r\n    this.track = () => {\r\n      let { [focus.id]: currentComponent, ...others } = _components__WEBPACK_IMPORTED_MODULE_0__.allComponentData;\r\n\r\n      others = Object.values(others);\r\n\r\n      if (focus.x + focus.w > focusX + focusWidth) {\r\n        others.forEach(item => {\r\n          item.x -= focus.x - focus._PREVIOUS_VALUE_x;\r\n        });\r\n        focus.x -= focus.x + focus.w - (focusX + focusWidth);\r\n      } else if (focus.x < focusX) {\r\n        others.forEach(item => {\r\n          item.x += focus._PREVIOUS_VALUE_x - focus.x;\r\n        });\r\n        focus.x += focusX - focus.x;\r\n      }\r\n\r\n      if (focus.y + focus.h > focusY + focusHeight) {\r\n        others.forEach(item => {\r\n          item.y -= focus.y - focus._PREVIOUS_VALUE_y;\r\n        });\r\n        focus.y -= focus.y + focus.h - (focusY + focusHeight);\r\n      } else if (focus.y < focusY) {\r\n        others.forEach(item => {\r\n          item.y += focus._PREVIOUS_VALUE_y - focus.y;\r\n        });\r\n        focus.y += focusY - focus.y;\r\n      }\r\n    };\r\n    return this;\r\n  }\r\n}\r\n\n\n//# sourceURL=webpack://clonex/./camera.js?");

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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"resolveCollision\": () => /* binding */ resolveCollision\n/* harmony export */ });\n/* harmony import */ var _components_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components.js */ \"./components.js\");\n/* harmony import */ var _game_loop_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./game-loop.js */ \"./game-loop.js\");\n\r\n\r\nconst resolveCollision = currentComponent => {\r\n  if (!currentComponent) return;\r\n  const { [currentComponent.id]: except, ...others } = _components_js__WEBPACK_IMPORTED_MODULE_0__.allComponentData,\r\n    othersArr = Object.keys(others);\r\n\r\n  for (let e = 0; e < othersArr.length; e++) {\r\n    const otherComponent = others[othersArr[e]];\r\n\r\n    const exceptXPos = currentComponent.x,\r\n      exceptYPos = currentComponent.y,\r\n      exceptWidth = currentComponent.w,\r\n      exceptHeight = currentComponent.h,\r\n      othersXPos = otherComponent.x,\r\n      othersYPos = otherComponent.y,\r\n      othersWidth = otherComponent.w,\r\n      othersHeight = otherComponent.h;\r\n\r\n    if (\r\n      exceptXPos < othersXPos + othersWidth &&\r\n      othersXPos < exceptXPos + exceptWidth &&\r\n      exceptYPos < othersYPos + othersHeight &&\r\n      othersYPos < exceptYPos + exceptHeight\r\n    ) {\r\n      // currentComponent.name === \"bullet\" && console.log(\"a\");\r\n      let collisionData = {\r\n        entity: otherComponent\r\n      };\r\n      if (\r\n        otherComponent.rigidBody &&\r\n        currentComponent.reactsWith[otherComponent.name]\r\n      ) {\r\n        if (exceptXPos < othersXPos) {\r\n          const xD = exceptXPos + exceptWidth - othersXPos;\r\n          collisionData.displacementX = xD;\r\n\r\n          if (exceptYPos < othersYPos) {\r\n            const yD = exceptYPos + exceptHeight - othersYPos;\r\n            collisionData.displacementY = yD;\r\n\r\n            if (xD < yD) {\r\n              if (currentComponent.static) {\r\n                otherComponent.x += xD;\r\n                resolveCollision(otherComponent);\r\n              } else if (otherComponent.static) {\r\n                currentComponent.x -= xD;\r\n                resolveCollision(currentComponent);\r\n              } else {\r\n                otherComponent.x += xD;\r\n                resolveCollision(otherComponent);\r\n              }\r\n              collisionData.atLeft = true;\r\n              //at left\r\n            } else {\r\n              currentComponent.GRAVITY = _game_loop_js__WEBPACK_IMPORTED_MODULE_1__.GRAVITY;\r\n\r\n              if (currentComponent.static) {\r\n                otherComponent.y += yD;\r\n                resolveCollision(otherComponent);\r\n              } else if (otherComponent.static) {\r\n                currentComponent.y -= yD;\r\n                resolveCollision(currentComponent);\r\n              } else {\r\n                otherComponent.y += yD;\r\n                resolveCollision(otherComponent);\r\n              }\r\n              collisionData.atTop = true;\r\n              //at top\r\n            }\r\n          } else {\r\n            const yD = othersYPos + othersHeight - exceptYPos;\r\n            collisionData.displacementY = yD;\r\n\r\n            if (xD < yD) {\r\n              if (currentComponent.static) {\r\n                otherComponent.x += xD;\r\n                resolveCollision(otherComponent);\r\n              } else if (otherComponent.static) {\r\n                currentComponent.x -= xD;\r\n                resolveCollision(currentComponent);\r\n              } else {\r\n                otherComponent.x += xD;\r\n                resolveCollision(otherComponent);\r\n              }\r\n              collisionData.atLeft = true;\r\n              //at left\r\n            } else {\r\n              otherComponent.GRAVITY = _game_loop_js__WEBPACK_IMPORTED_MODULE_1__.GRAVITY;\r\n\r\n              if (currentComponent.static) {\r\n                otherComponent.y -= yD;\r\n                resolveCollision(otherComponent);\r\n              } else if (otherComponent.static) {\r\n                currentComponent.y += yD;\r\n                resolveCollision(currentComponent);\r\n              } else {\r\n                otherComponent.y -= yD;\r\n                resolveCollision(otherComponent);\r\n              }\r\n              collisionData.atBottom = true;\r\n              //at bottom\r\n            }\r\n          }\r\n        } else {\r\n          const xD = othersXPos + othersWidth - exceptXPos;\r\n          collisionData.displacementX = xD;\r\n\r\n          if (exceptYPos < othersYPos) {\r\n            const yD = exceptYPos + exceptHeight - othersYPos;\r\n            collisionData.displacementY = yD;\r\n\r\n            if (xD < yD) {\r\n              if (currentComponent.static) {\r\n                otherComponent.x -= xD;\r\n                resolveCollision(otherComponent);\r\n              } else if (otherComponent.static) {\r\n                currentComponent.x += xD;\r\n                resolveCollision(currentComponent);\r\n              } else {\r\n                otherComponent.x -= xD;\r\n                resolveCollision(otherComponent);\r\n              }\r\n              collisionData.atRight = true;\r\n              //at right\r\n            } else {\r\n              currentComponent.GRAVITY = _game_loop_js__WEBPACK_IMPORTED_MODULE_1__.GRAVITY;\r\n              if (currentComponent.static) {\r\n                otherComponent.y += yD;\r\n                resolveCollision(otherComponent);\r\n              } else if (otherComponent.static) {\r\n                currentComponent.y -= yD;\r\n                resolveCollision(currentComponent);\r\n              } else {\r\n                otherComponent.y += yD;\r\n                resolveCollision(otherComponent);\r\n              }\r\n              collisionData.atTop = true;\r\n              //at top\r\n            }\r\n          } else {\r\n            const yD = othersYPos + othersHeight - exceptYPos;\r\n            collisionData.displacementY = yD;\r\n\r\n            if (xD < yD) {\r\n              if (currentComponent.static) {\r\n                otherComponent.x -= xD;\r\n                resolveCollision(otherComponent);\r\n              } else if (otherComponent.static) {\r\n                currentComponent.x += xD;\r\n                resolveCollision(currentComponent);\r\n              } else {\r\n                otherComponent.x -= xD;\r\n                resolveCollision(otherComponent);\r\n              }\r\n              collisionData.atRight = true;\r\n              //at right\r\n            } else {\r\n              otherComponent.GRAVITY = _game_loop_js__WEBPACK_IMPORTED_MODULE_1__.GRAVITY;\r\n              if (currentComponent.static) {\r\n                otherComponent.y -= yD;\r\n                resolveCollision(otherComponent);\r\n              } else if (otherComponent.static) {\r\n                currentComponent.y += yD;\r\n                resolveCollision(currentComponent);\r\n              } else {\r\n                otherComponent.y -= yD;\r\n                resolveCollision(otherComponent);\r\n              }\r\n              collisionData.atBottom = true;\r\n              //at bottom\r\n            }\r\n          }\r\n        }\r\n      }\r\n      currentComponent.onCollision &&\r\n        currentComponent.onCollision(collisionData);\r\n    }\r\n  }\r\n};\r\n\n\n//# sourceURL=webpack://clonex/./collision.js?");

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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"allComponentData\": () => /* binding */ allComponentData,\n/* harmony export */   \"component\": () => /* binding */ component\n/* harmony export */ });\n/* harmony import */ var _animation_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./animation.js */ \"./animation.js\");\n/* harmony import */ var _render_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./render.js */ \"./render.js\");\n/* harmony import */ var _game_loop_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./game-loop.js */ \"./game-loop.js\");\n\r\n\r\n\r\nconst allComponentData = {};\r\nlet id = 0;\r\nclass Component {\r\n  constructor(obj) {\r\n    for (const key in obj.props) {\r\n      this[key] = obj.props[key];\r\n    }\r\n\r\n    for (const key in obj.states) {\r\n      this[key] = obj.states[key];\r\n    }\r\n\r\n    this.GRAVITY = _game_loop_js__WEBPACK_IMPORTED_MODULE_2__.GRAVITY;\r\n    this.id = id++;\r\n\r\n    if (this.animations) {\r\n      (0,_animation_js__WEBPACK_IMPORTED_MODULE_0__.setAnimation)(this);\r\n    }\r\n\r\n    if (this.camera) {\r\n      this.camera = this.camera(this);\r\n    }\r\n\r\n    allComponentData[this.id] = this;\r\n\r\n    this.render = () => (0,_render_js__WEBPACK_IMPORTED_MODULE_1__.render)(this);\r\n    _render_js__WEBPACK_IMPORTED_MODULE_1__.renderCommands.push(this.render);\r\n  }\r\n}\r\nconst component = obj => new Component(obj);\r\n\n\n//# sourceURL=webpack://clonex/./components.js?");

/***/ }),

/***/ "./game-loop.js":
/*!**********************!*\
  !*** ./game-loop.js ***!
  \**********************/
/*! namespace exports */
/*! export GRAVITY [provided] [no usage info] [missing usage info prevents renaming] */
/*! export initScene [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"GRAVITY\": () => /* binding */ GRAVITY,\n/* harmony export */   \"initScene\": () => /* binding */ initScene\n/* harmony export */ });\n/* harmony import */ var _components_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components.js */ \"./components.js\");\n/* harmony import */ var _render_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./render.js */ \"./render.js\");\n/* harmony import */ var _collision_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./collision.js */ \"./collision.js\");\n/* harmony import */ var _helper_functions_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./helper-functions.js */ \"./helper-functions.js\");\n/* harmony import */ var _animation__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./animation */ \"./animation.js\");\n/* harmony import */ var _camera__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./camera */ \"./camera.js\");\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n// const frameRateTxt = document.getElementById(\"frame-rate\");\r\n\r\nconst keyboardVals = {};\r\n\r\n// let frame = 0;\r\n// setInterval(() => {\r\n//   frameRateTxt.innerText = `${frame}fps`;\r\n//   frame = 0;\r\n// }, 1000);\r\n\r\nconst GRAVITY = 10;\r\nconst gravity = component => {\r\n  component.y += component.GRAVITY +=\r\n    component.GRAVITY * ((component.mass || 1) / 100);\r\n};\r\n\r\nconst img = document.createElement(\"img\");\r\nimg.setAttribute(\"src\", \"./assets/img/land.jpg\");\r\n\r\nlet max = 0,\r\n  hasReachedMax = true;\r\n\r\nconst initScene = (xcor, ycor, width, height, obj) => {\r\n  _render_js__WEBPACK_IMPORTED_MODULE_1__.scene.width = width;\r\n  _render_js__WEBPACK_IMPORTED_MODULE_1__.scene.height = height;\r\n\r\n  window.addEventListener(\r\n    \"keydown\",\r\n    e => {\r\n      keyboardVals[e.key] = true;\r\n      (0,_animation__WEBPACK_IMPORTED_MODULE_4__.getKeyState)(true);\r\n    },\r\n    true\r\n  );\r\n  window.addEventListener(\r\n    \"keyup\",\r\n    e => {\r\n      keyboardVals[e.key] = false;\r\n      (0,_animation__WEBPACK_IMPORTED_MODULE_4__.getKeyState)(false);\r\n    },\r\n    true\r\n  );\r\n\r\n  const gameLoop = () => {\r\n    (0,_animation__WEBPACK_IMPORTED_MODULE_4__.getKeyState)(false);\r\n    _render_js__WEBPACK_IMPORTED_MODULE_1__.ctx.clearRect(xcor, ycor, obj.w || width, obj.h || height);\r\n    _render_js__WEBPACK_IMPORTED_MODULE_1__.ctx.fillStyle = obj.color;\r\n    _render_js__WEBPACK_IMPORTED_MODULE_1__.ctx.fillRect(xcor, ycor, width, height);\r\n    // ctx.fillStyle = \"purple\";\r\n    // ctx.fillRect(500, 300, 120, 120);\r\n\r\n    // game.drawImage(img, 0, 0, width, height);\r\n\r\n    const all = Object.keys(_components_js__WEBPACK_IMPORTED_MODULE_0__.allComponentData);\r\n\r\n    /**@initialize get defaults for all components */\r\n    all.forEach(component => {\r\n      const currentComponent = _components_js__WEBPACK_IMPORTED_MODULE_0__.allComponentData[component];\r\n\r\n      currentComponent.gravity && gravity(currentComponent);\r\n\r\n      currentComponent.controls &&\r\n        Object.keys(currentComponent.controls).forEach(e => {\r\n          keyboardVals[e] && currentComponent.controls[e](currentComponent);\r\n        });\r\n    });\r\n\r\n    /**@resolve collisions */\r\n    all.forEach(component => {\r\n      const currentComponent = _components_js__WEBPACK_IMPORTED_MODULE_0__.allComponentData[component];\r\n\r\n      (0,_collision_js__WEBPACK_IMPORTED_MODULE_2__.resolveCollision)(currentComponent);\r\n\r\n      currentComponent.default && currentComponent.default();\r\n      // currentComponent &&\r\n      //   (currentComponent.y > height ||\r\n      //     currentComponent.y < 0 ||\r\n      //     currentComponent.x > width ||\r\n      //     currentComponent.x < 0) &&\r\n      //   remove(currentComponent);\r\n    });\r\n\r\n    /**@render render all components */\r\n    for (let i = 0; i < _render_js__WEBPACK_IMPORTED_MODULE_1__.renderCommands.length; i++) {\r\n      _render_js__WEBPACK_IMPORTED_MODULE_1__.renderCommands[i]();\r\n    }\r\n\r\n    for (const e of _helper_functions_js__WEBPACK_IMPORTED_MODULE_3__.loopCommands.values()) {\r\n      e[1]++;\r\n    }\r\n    // frame++;\r\n    requestAnimationFrame(gameLoop);\r\n  };\r\n  gameLoop();\r\n};\r\n/**--------------\r\n *\r\n * TEST AREA\r\n *\r\n * -----------------------*/\r\nconst bullet = e =>\r\n  (0,_components_js__WEBPACK_IMPORTED_MODULE_0__.component)({\r\n    props: {\r\n      name: \"bullet\",\r\n      color: \"green\",\r\n      // mass: 1,\r\n      x: !e.facingLeft ? e.x + e.w : e.x - 20,\r\n      y: e.y,\r\n      w: 20,\r\n      h: 20,\r\n      // gravity: true,\r\n      facingLeft: e.facingLeft,\r\n      reactsWith: {\r\n        enemy: true,\r\n        block: true\r\n      }\r\n    },\r\n    states: {\r\n      default() {\r\n        !this.facingLeft ? (this.x += 10) : (this.x -= 10);\r\n      },\r\n      onCollision({ entity }) {\r\n        // entity.x += 5;\r\n        (0,_helper_functions_js__WEBPACK_IMPORTED_MODULE_3__.remove)(this);\r\n      }\r\n    }\r\n  });\r\n\r\nconst boy = (0,_components_js__WEBPACK_IMPORTED_MODULE_0__.component)({\r\n  props: {\r\n    name: \"boy\",\r\n    mass: 1,\r\n    w: 50,\r\n    h: 50,\r\n    x: 532,\r\n    y: 338,\r\n    facingLeft: false,\r\n    rigidBody: true,\r\n    canJump: true,\r\n    // gravity: true,\r\n    static: false,\r\n    // color: \"red\",\r\n    hasCollided: true,\r\n    reactsWith: {\r\n      enemy: true,\r\n      ground: true\r\n    },\r\n    animations: {\r\n      spriteSheet: \"./assets/img/sprite-sheet.png\",\r\n      imageSizeX: 50,\r\n      imageSizeY: 50,\r\n      speed: 10,\r\n      frameWidth: 400,\r\n      frameHeight: 450,\r\n\r\n      //animations\r\n      downAnim: [0, 0, 4],\r\n      rightAnim: [3, 0, 4],\r\n      leftAnim: [2, 0, 4],\r\n      upAnim: [1, 0, 4],\r\n      idle: [\r\n        0,\r\n        0,\r\n        1,\r\n        {\r\n          still: true\r\n        }\r\n      ]\r\n    }\r\n  },\r\n  states: {\r\n    default() {\r\n      !this.isMoving && this.animate(\"idle\");\r\n      this.isMoving = false;\r\n      // this.x -= 3;\r\n      // if (this.x < 10) this.x = 10;\r\n      // else if (this.x > 950) this.x = 950;\r\n\r\n      this.camera.track();\r\n    },\r\n    camera(e) {\r\n      return new _camera__WEBPACK_IMPORTED_MODULE_5__.Camera({\r\n        focus: e,\r\n        focusX: 500,\r\n        focusY: 300,\r\n        focusHeight: 120,\r\n        focusWidth: 120\r\n      });\r\n    },\r\n    controls: {\r\n      ArrowUp(e) {\r\n        e.animate(\"upAnim\");\r\n        e.y -= 5;\r\n        e.isMoving = true;\r\n        // if (e.canJump) {\r\n        //   e.atBottom = false;\r\n        //   e.canJump = false;\r\n        //   e.gravity = false;\r\n        //   let jumpAmt = 1;\r\n        //   const interval = setInterval(() => {\r\n        //     if (jumpAmt >= 30 || e.atBottom) {\r\n        //       e.gravity = true;\r\n        //       clearInterval(interval);\r\n        //       return;\r\n        //     }\r\n        //     e.y -= 30 / jumpAmt;\r\n        //     jumpAmt++;\r\n        //   }, 10);\r\n        // }\r\n      },\r\n      ArrowDown(e) {\r\n        e.animate(\"downAnim\");\r\n        e.y += 5;\r\n        e.isMoving = true;\r\n      },\r\n      ArrowLeft(e) {\r\n        e.animate(\"leftAnim\");\r\n        e.x -= 5;\r\n        e.isMoving = true;\r\n        e.facingLeft = true;\r\n      },\r\n      ArrowRight(e) {\r\n        e.animate(\"rightAnim\");\r\n        e.x += 5;\r\n        e.isMoving = true;\r\n        e.facingLeft = false;\r\n      },\r\n      d(e) {\r\n        (0,_helper_functions_js__WEBPACK_IMPORTED_MODULE_3__.loop)(shoot, 10);\r\n      }\r\n    },\r\n    onCollision({ atTop, atBottom }) {\r\n      if (atBottom) {\r\n        this.atBottom = true;\r\n      }\r\n      if (atTop) {\r\n        this.canJump = true;\r\n      }\r\n    }\r\n  }\r\n});\r\n\r\nconst shoot = () => (bullet(boy).facingLeft = boy.facingLeft);\r\n\r\nconst enemy = () =>\r\n  (0,_components_js__WEBPACK_IMPORTED_MODULE_0__.component)({\r\n    props: {\r\n      name: \"enemy\",\r\n      mass: 1,\r\n      // color: 'rgba(200, 20, 100, 0.5)',\r\n      color: \"orange\",\r\n      static: true,\r\n      x: undefined,\r\n      y: undefined,\r\n      w: 50,\r\n      h: 50,\r\n      lv: 0,\r\n      rv: 0,\r\n      dv: 0,\r\n      uv: 0,\r\n      gravity: false,\r\n      bounds: {},\r\n      isHit: false,\r\n      r: undefined,\r\n      canCollide: true,\r\n      reactsWith: {\r\n        enemy: true,\r\n        boy: true,\r\n        ground: true,\r\n        block: true\r\n      },\r\n      rigidBody: true\r\n    },\r\n    states: {\r\n      default() {\r\n        this.color = this.isHit ? \"red\" : this.color;\r\n        this.isHit = false;\r\n        // if (this.name === \"ground\") {\r\n        //   console.log(this.x, this.y);\r\n        // }\r\n        // if (this.name !== \"ground\" && this.name !== \"block\") {\r\n        //   if (this.y >= 400) {\r\n        //     this.r = false;\r\n        //     this.uv = 5;\r\n        //   } else if (this.y <= 100) {\r\n        //     this.r = true;\r\n        //     this.dv = 5;\r\n        //   }\r\n        //   this.r ? (this.y += this.dv) : (this.y -= this.uv);\r\n        // }\r\n      },\r\n      onCollision({ atTop, atBottom, entity }) {\r\n        if (atBottom && entity.name === \"boy\") {\r\n          entity.canJump = true;\r\n        }\r\n      }\r\n    }\r\n  });\r\nconst block4 = enemy();\r\nblock4.y = 350;\r\nblock4.x = 200;\r\nblock4.w = 200;\r\nblock4.h = 50;\r\n\r\n// const block5 = enemy();\r\n// block5.y = 400;\r\n// block5.x = 400;\r\n// block5.w = 100;\r\n// block5.h = 50;\r\n\r\nconst block8 = enemy();\r\nblock8.static = false;\r\n// block8.gravity = true;\r\nblock8.color = \"blue\";\r\nblock8.y = 200;\r\nblock8.x = 350;\r\nblock8.w = 50;\r\nblock8.h = 50;\r\n\r\nconst block9 = enemy();\r\nblock9.static = false;\r\n// block9.gravity = true;\r\nblock9.color = \"blue\";\r\nblock9.y = 200;\r\nblock9.x = 450;\r\nblock9.w = 50;\r\nblock9.h = 50;\r\n// block9.default = () => {\r\n//   block9.y -= 0.5;\r\n// };\r\n\r\nconst block3 = enemy();\r\nblock3.y = 100;\r\nblock3.x = 300;\r\nblock3.w = 200;\r\nblock3.h = 50;\r\n\r\nconst block6 = enemy();\r\nblock6.name = \"ground\";\r\nblock6.color = \"brown\";\r\nblock6.y = 550;\r\nblock6.x = 0;\r\nblock6.w = 1000;\r\nblock6.h = 50;\r\n\r\nconst block7 = enemy();\r\nblock7.name = \"block\";\r\nblock7.y = 150;\r\nblock7.x = 700;\r\nblock7.w = 200;\r\nblock7.h = 400;\r\n\r\ninitScene(0, 0, window.innerWidth, window.innerHeight, {\r\n  color: \"rgb(153, 217, 234)\"\r\n});\r\n\n\n//# sourceURL=webpack://clonex/./game-loop.js?");

/***/ }),

/***/ "./helper-functions.js":
/*!*****************************!*\
  !*** ./helper-functions.js ***!
  \*****************************/
/*! namespace exports */
/*! export loop [provided] [no usage info] [missing usage info prevents renaming] */
/*! export loopCommands [provided] [no usage info] [missing usage info prevents renaming] */
/*! export remove [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"loopCommands\": () => /* binding */ loopCommands,\n/* harmony export */   \"loop\": () => /* binding */ loop,\n/* harmony export */   \"remove\": () => /* binding */ remove\n/* harmony export */ });\n/* harmony import */ var _components_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components.js */ \"./components.js\");\n/* harmony import */ var _render_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./render.js */ \"./render.js\");\n\r\n\r\n\r\nconst loopCommands = new Map();\r\n\r\nconst loop = (func, speed) => {\r\n  if (!loopCommands.get(func)) {\r\n    loopCommands.set(func, [func, 0]);\r\n    func();\r\n  }\r\n  if (loopCommands.get(func)[1] >= speed) {\r\n    func();\r\n    loopCommands.set(func, [func, 0]);\r\n  }\r\n};\r\n\r\nconst remove = component => {\r\n  delete _components_js__WEBPACK_IMPORTED_MODULE_0__.allComponentData[component.id];\r\n  const componentPostiton = _render_js__WEBPACK_IMPORTED_MODULE_1__.renderCommands.indexOf(component.render);\r\n  if (componentPostiton < 0) return;\r\n  _render_js__WEBPACK_IMPORTED_MODULE_1__.renderCommands.splice(componentPostiton, 1);\r\n};\r\n\n\n//# sourceURL=webpack://clonex/./helper-functions.js?");

/***/ }),

/***/ "./render.js":
/*!*******************!*\
  !*** ./render.js ***!
  \*******************/
/*! namespace exports */
/*! export ctx [provided] [no usage info] [missing usage info prevents renaming] */
/*! export render [provided] [no usage info] [missing usage info prevents renaming] */
/*! export renderCommands [provided] [no usage info] [missing usage info prevents renaming] */
/*! export scene [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"renderCommands\": () => /* binding */ renderCommands,\n/* harmony export */   \"scene\": () => /* binding */ scene,\n/* harmony export */   \"ctx\": () => /* binding */ ctx,\n/* harmony export */   \"render\": () => /* binding */ render\n/* harmony export */ });\nconst renderCommands = [];\r\nconst scene = document.createElement(\"canvas\");\r\ndocument.body.append(scene);\r\nconst ctx = scene.getContext(\"2d\");\r\n\r\nconst render = component => {\r\n  if (component.color) {\r\n    ctx.fillStyle = component.color;\r\n    ctx.fillRect(component.x, component.y, component.w, component.h);\r\n  }\r\n\r\n  if (component.animations) {\r\n    ctx.drawImage(\r\n      component.animations.spriteSheet,\r\n      component.animations.x,\r\n      component.animations.y,\r\n      component.animations.frameWidth,\r\n      component.animations.frameHeight,\r\n      component.x,\r\n      component.y,\r\n      component.animations.imageSizeX,\r\n      component.animations.imageSizeY\r\n    );\r\n    component.play();\r\n  }\r\n};\r\n\n\n//# sourceURL=webpack://clonex/./render.js?");

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
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	__webpack_require__("./game-loop.js");
/******/ })()
;