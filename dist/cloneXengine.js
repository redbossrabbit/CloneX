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

/***/ "./Boy.js":
/*!****************!*\
  !*** ./Boy.js ***!
  \****************/
/*! namespace exports */
/*! exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _helper_functions_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helper-functions.js */ \"./helper-functions.js\");\n/* harmony import */ var _camera__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./camera */ \"./camera.js\");\n/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components */ \"./components.js\");\n/* harmony import */ var _Bullet__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Bullet */ \"./Bullet.js\");\n\r\n\r\n\r\n\r\n\r\nconst Boy = (0,_components__WEBPACK_IMPORTED_MODULE_2__.component)({\r\n  props: {\r\n    name: \"boy\",\r\n    mass: 1,\r\n    w: 50,\r\n    h: 50,\r\n    x: 532,\r\n    y: 338,\r\n    facingLeft: false,\r\n    rigidBody: true,\r\n    canJump: true,\r\n    gravity: true,\r\n    static: false,\r\n    // color: \"red\",\r\n    reactsWith: {\r\n      enemy: true,\r\n      ground: true\r\n    },\r\n    _jumpAmt: 1,\r\n    animations: {\r\n      spriteSheet: \"./assets/img/sprite-sheet.png\",\r\n      imageSizeX: 50,\r\n      imageSizeY: 50,\r\n      speed: 10,\r\n      frameWidth: 400,\r\n      frameHeight: 450,\r\n\r\n      //animations\r\n      downAnim: [0, 0, 4],\r\n      rightAnim: [3, 0, 4],\r\n      leftAnim: [2, 0, 4],\r\n      upAnim: [1, 0, 4],\r\n      idle: [0, 0, 1]\r\n    }\r\n  },\r\n  states: {\r\n    default() {\r\n      !this.isMoving && this.animate(\"idle\");\r\n      this.isMoving = false;\r\n      this.camera.track();\r\n    },\r\n    camera(e) {\r\n      return new _camera__WEBPACK_IMPORTED_MODULE_1__.Camera({\r\n        focus: e,\r\n        focusX: 500,\r\n        focusY: 300,\r\n        focusHeight: 120,\r\n        focusWidth: 120\r\n      });\r\n    },\r\n    controls: {\r\n      ArrowUp(e, keyDown) {\r\n        if (!keyDown) return;\r\n        // e.animate(\"upAnim\");\r\n        // e.y -= 5;\r\n        // e.isMoving = true;\r\n        if (!e._hasJumped) {\r\n          e.gravity = false;\r\n          const id = (0,_helper_functions_js__WEBPACK_IMPORTED_MODULE_0__.newTimingFunction)();\r\n          (0,_helper_functions_js__WEBPACK_IMPORTED_MODULE_0__.interval)(() => {\r\n            if (e._jumpAmt >= 30 || e.atBottom) {\r\n              e._hasJumped = false;\r\n              e.gravity = true;\r\n              (0,_helper_functions_js__WEBPACK_IMPORTED_MODULE_0__.clearTimer)(id);\r\n              return;\r\n            }\r\n            e.y -= 8;\r\n            e._jumpAmt++;\r\n          }, 1);\r\n          e._hasJumped = true;\r\n        }\r\n      },\r\n      ArrowDown(e, keyDown) {\r\n        if (!keyDown) return;\r\n        e.animate(\"downAnim\");\r\n        e.y += 5;\r\n        e.isMoving = true;\r\n      },\r\n      ArrowLeft(e, keyDown) {\r\n        if (!keyDown) return;\r\n        e.animate(\"leftAnim\");\r\n        e.x -= 5;\r\n        e.isMoving = true;\r\n        e.facingLeft = true;\r\n      },\r\n      ArrowRight(e, keyDown) {\r\n        if (!keyDown) return;\r\n        e.animate(\"rightAnim\");\r\n        e.x += 5;\r\n        e.isMoving = true;\r\n        e.facingLeft = false;\r\n      },\r\n      d(e, keyDown) {\r\n        if (!keyDown) return;\r\n        if (!e._hasShot) {\r\n          (0,_helper_functions_js__WEBPACK_IMPORTED_MODULE_0__.newTimingFunction)();\r\n          (0,_helper_functions_js__WEBPACK_IMPORTED_MODULE_0__.timeout)(shoot, 10);\r\n          e._hasShot = true;\r\n        }\r\n      }\r\n    },\r\n    resetJump() {\r\n      this.atBottom = false;\r\n      this._jumpAmt = 1;\r\n      this._hasJumped = false;\r\n    },\r\n    onCollision({ atTop, atBottom }) {\r\n      if (atBottom) {\r\n        this.atBottom = true;\r\n      }\r\n      if (atTop) {\r\n        this.resetJump();\r\n      }\r\n    }\r\n  }\r\n});\r\nconst shoot = () => {\r\n  (0,_Bullet__WEBPACK_IMPORTED_MODULE_3__.default)(Boy).facingLeft = Boy.facingLeft;\r\n  Boy._hasShot = false;\r\n};\r\n\n\n//# sourceURL=webpack://clonex/./Boy.js?");

/***/ }),

/***/ "./Bullet.js":
/*!*******************!*\
  !*** ./Bullet.js ***!
  \*******************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components */ \"./components.js\");\n/* harmony import */ var _helper_functions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./helper-functions */ \"./helper-functions.js\");\n\r\n\r\n\r\nconst Bullet = e =>\r\n  (0,_components__WEBPACK_IMPORTED_MODULE_0__.component)({\r\n    props: {\r\n      name: \"bullet\",\r\n      color: \"green\",\r\n      x: !e.facingLeft ? e.x + e.w : e.x - 20,\r\n      y: e.y,\r\n      w: 20,\r\n      h: 20,\r\n      facingLeft: e.facingLeft,\r\n      reactsWith: {\r\n        block: true\r\n      }\r\n    },\r\n    states: {\r\n      default() {\r\n        !this.facingLeft ? (this.x += 10) : (this.x -= 10);\r\n      },\r\n      onCollision() {\r\n        (0,_helper_functions__WEBPACK_IMPORTED_MODULE_1__.remove)(this);\r\n      }\r\n    }\r\n  });\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Bullet);\r\n\n\n//# sourceURL=webpack://clonex/./Bullet.js?");

/***/ }),

/***/ "./Enemy.js":
/*!******************!*\
  !*** ./Enemy.js ***!
  \******************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components */ \"./components.js\");\n\r\n\r\nconst Enemy = () =>\r\n  (0,_components__WEBPACK_IMPORTED_MODULE_0__.component)({\r\n    props: {\r\n      name: \"enemy\",\r\n      mass: 1,\r\n      color: \"orange\",\r\n      static: true,\r\n      gravity: false,\r\n      bounds: {},\r\n      _isHit: false,\r\n      reactsWith: {\r\n        enemy: true,\r\n        boy: true,\r\n        ground: true,\r\n        block: true\r\n      },\r\n      rigidBody: true\r\n    },\r\n    states: {\r\n      default() {\r\n        this.color = this.isHit ? \"red\" : this.color;\r\n        this._isHit = false;\r\n      },\r\n      onCollision({ atBottom, entity }) {\r\n        if (atBottom && entity.name === \"boy\") {\r\n          entity.resetJump();\r\n        }\r\n      }\r\n    }\r\n  });\r\n\r\nconst block4 = Enemy();\r\nblock4.y = 350;\r\nblock4.x = 200;\r\nblock4.w = 200;\r\nblock4.h = 50;\r\n\r\nconst block8 = Enemy();\r\nblock8.static = false;\r\nblock8.gravity = true;\r\nblock8.color = \"blue\";\r\nblock8.y = 200;\r\nblock8.x = 350;\r\nblock8.w = 50;\r\nblock8.h = 50;\r\n\r\nconst block9 = Enemy();\r\nblock9.static = false;\r\nblock9.gravity = true;\r\nblock9.color = \"blue\";\r\nblock9.y = 200;\r\nblock9.x = 450;\r\nblock9.w = 50;\r\nblock9.h = 50;\r\n\r\nconst block3 = Enemy();\r\nblock3.y = 100;\r\nblock3.x = 300;\r\nblock3.w = 200;\r\nblock3.h = 50;\r\n\r\nconst blockd = Enemy();\r\nblockd.y = 55;\r\nblockd.x = 500;\r\nblockd.w = 200;\r\nblockd.h = 50;\r\n\r\nconst block6 = Enemy();\r\nblock6.name = \"ground\";\r\nblock6.color = \"brown\";\r\nblock6.y = 550;\r\nblock6.x = 0;\r\nblock6.w = 1000;\r\nblock6.h = 50;\r\n\r\n// const createEnemy = (x, y, w, h) => {\r\n//   const enemy = Enemy();\r\n//   enemy.x = x;\r\n//   enemy.y = y;\r\n//   enemy.w = w;\r\n//   enemy.h = h;\r\n//   return enemy;\r\n// };\r\n\r\nconst block7 = Enemy();\r\nblock7.y = 150;\r\nblock7.x = 700;\r\nblock7.w = 200;\r\nblock7.h = 400;\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Enemy);\r\n\n\n//# sourceURL=webpack://clonex/./Enemy.js?");

/***/ }),

/***/ "./animation.js":
/*!**********************!*\
  !*** ./animation.js ***!
  \**********************/
/*! namespace exports */
/*! export setAnimation [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"setAnimation\": () => /* binding */ setAnimation\n/* harmony export */ });\nconst setAnimation = component => {\r\n  component.frame = 1;\r\n  component.updateTime = 0;\r\n  component.animData = {\r\n    anim: {}\r\n  };\r\n\r\n  //Preload Image\r\n  const img = document.createElement(\"img\");\r\n  img.setAttribute(\"src\", component.animations.spriteSheet);\r\n  component.animations.spriteSheet = img;\r\n\r\n  /**\r\n   * @method play - the animation player\r\n   */\r\n  component.play = () => {\r\n    const { animData, animations } = component;\r\n\r\n    const { speed, frameWidth, frameHeight } = animations;\r\n\r\n    const { limit, xOrigin, yOrigin, animationOptions } = animData;\r\n\r\n    if (component.updateTime === speed) {\r\n      //counts gameloops before going to next frame of animation\r\n      component.updateTime = 0;\r\n      if (component.frame === limit) {\r\n        if (!animationOptions.loop) {\r\n          component.animations.y = frameHeight * yOrigin;\r\n          component.animations.x = xOrigin;\r\n        }\r\n        component.frame = 0;\r\n      }\r\n      component.animations.x = (component.frame + xOrigin) * frameWidth;\r\n      component.frame++;\r\n    }\r\n    component.updateTime++;\r\n  };\r\n\r\n  /**\r\n   * @method animate - sets the animation data in the animData object for the animation player to work with\r\n   */\r\n  component.animate = animName => {\r\n    const { animations } = component;\r\n\r\n    const { [animName]: animVar, frameWidth, frameHeight } = animations;\r\n\r\n    const [xcor, ycor, frameAmt, options] = animVar;\r\n\r\n    if (!component.animData.anim[animName]) {\r\n      component.animData.anim[animName] = true;\r\n      component.frame = 1;\r\n      component.updateTime = 0;\r\n\r\n      component.animData.yOrigin = xcor;\r\n      component.animData.xOrigin = ycor;\r\n      component.animData.limit = frameAmt;\r\n      component.animData.animationOptions = {\r\n        ...options\r\n      };\r\n      component.animations.y = frameHeight * xcor;\r\n      component.animations.x = frameWidth * ycor;\r\n    }\r\n  };\r\n};\r\n\n\n//# sourceURL=webpack://clonex/./animation.js?");

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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Camera\": () => /* binding */ Camera\n/* harmony export */ });\n/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components */ \"./components.js\");\n\r\n\r\nconst observe = (obj, key) => {\r\n  let val = obj[key];\r\n  Object.defineProperty(obj, key, {\r\n    get() {\r\n      return val;\r\n    },\r\n    set(newVal) {\r\n      obj[`_PREVIOUS_VALUE_${key}`] = val;\r\n      val = newVal;\r\n    }\r\n  });\r\n};\r\nclass Camera {\r\n  constructor({ focus, focusX, focusY, focusWidth, focusHeight }) {\r\n    observe(focus, \"x\");\r\n    observe(focus, \"y\");\r\n\r\n    this.track = () => {\r\n      let { [focus.id]: currentComponent, ...others } = _components__WEBPACK_IMPORTED_MODULE_0__.allComponentData;\r\n\r\n      others = Object.values(others);\r\n\r\n      if (focus.x + focus.w > focusX + focusWidth) {\r\n        focus.x -= focus.x + focus.w - (focusX + focusWidth);\r\n        others.forEach(item => {\r\n          item.x -= Math.abs(focus.x - focus._PREVIOUS_VALUE_x);\r\n        });\r\n      } else if (focus.x < focusX) {\r\n        focus.x += focusX - focus.x;\r\n        others.forEach(item => {\r\n          item.x += Math.abs(focus._PREVIOUS_VALUE_x - focus.x);\r\n        });\r\n      }\r\n\r\n      if (focus.y + focus.h > focusY + focusHeight) {\r\n        focus.y -= focus.y + focus.h - (focusY + focusHeight);\r\n        others.forEach(item => {\r\n          item.y -= Math.abs(focus.y - focus._PREVIOUS_VALUE_y);\r\n        });\r\n      } else if (focus.y < focusY) {\r\n        focus.y += focusY - focus.y;\r\n        others.forEach(item => {\r\n          item.y += Math.abs(focus._PREVIOUS_VALUE_y - focus.y);\r\n        });\r\n      }\r\n    };\r\n    return this;\r\n  }\r\n}\r\n\n\n//# sourceURL=webpack://clonex/./camera.js?");

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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"resolveCollision\": () => /* binding */ resolveCollision\n/* harmony export */ });\n/* harmony import */ var _components_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components.js */ \"./components.js\");\n/* harmony import */ var _game_loop_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./game-loop.js */ \"./game-loop.js\");\n\r\n\r\n\r\nconst resolveCollision = currentComponent => {\r\n  if (!currentComponent) return;\r\n\r\n  const { [currentComponent.id]: except, ...others } = _components_js__WEBPACK_IMPORTED_MODULE_0__.allComponentData,\r\n    othersArr = Object.keys(others);\r\n\r\n  for (let e = 0; e < othersArr.length; e++) {\r\n    const otherComponent = others[othersArr[e]];\r\n\r\n    const exceptXPos = currentComponent.x,\r\n      exceptYPos = currentComponent.y,\r\n      exceptWidth = currentComponent.w,\r\n      exceptHeight = currentComponent.h,\r\n      othersXPos = otherComponent.x,\r\n      othersYPos = otherComponent.y,\r\n      othersWidth = otherComponent.w,\r\n      othersHeight = otherComponent.h;\r\n\r\n    if (\r\n      exceptXPos < othersXPos + othersWidth &&\r\n      othersXPos < exceptXPos + exceptWidth &&\r\n      exceptYPos < othersYPos + othersHeight &&\r\n      othersYPos < exceptYPos + exceptHeight\r\n    ) {\r\n      // currentComponent.name === \"bullet\" && console.log(\"a\");\r\n      let collisionData = {\r\n        entity: otherComponent\r\n      };\r\n      try {\r\n        if (\r\n          otherComponent.rigidBody &&\r\n          currentComponent.reactsWith[otherComponent.name]\r\n        ) {\r\n          if (exceptXPos < othersXPos) {\r\n            const xD = exceptXPos + exceptWidth - othersXPos;\r\n            collisionData.displacementX = xD;\r\n\r\n            if (exceptYPos < othersYPos) {\r\n              const yD = exceptYPos + exceptHeight - othersYPos;\r\n              collisionData.displacementY = yD;\r\n\r\n              if (xD < yD) {\r\n                if (currentComponent.static) {\r\n                  otherComponent.x += xD;\r\n                  resolveCollision(otherComponent);\r\n                } else if (otherComponent.static) {\r\n                  currentComponent.x -= xD;\r\n                  resolveCollision(currentComponent);\r\n                } else {\r\n                  otherComponent.x += xD;\r\n                  resolveCollision(otherComponent);\r\n                }\r\n                collisionData.atLeft = true;\r\n                //at left\r\n              } else {\r\n                currentComponent.GRAVITY = _game_loop_js__WEBPACK_IMPORTED_MODULE_1__.GRAVITY;\r\n\r\n                if (currentComponent.static) {\r\n                  otherComponent.y += yD;\r\n                  resolveCollision(otherComponent);\r\n                } else if (otherComponent.static) {\r\n                  currentComponent.y -= yD;\r\n                  resolveCollision(currentComponent);\r\n                } else {\r\n                  otherComponent.y += yD;\r\n                  resolveCollision(otherComponent);\r\n                }\r\n                collisionData.atTop = true;\r\n                //at top\r\n              }\r\n            } else {\r\n              const yD = othersYPos + othersHeight - exceptYPos;\r\n              collisionData.displacementY = yD;\r\n\r\n              if (xD < yD) {\r\n                if (currentComponent.static) {\r\n                  otherComponent.x += xD;\r\n                  resolveCollision(otherComponent);\r\n                } else if (otherComponent.static) {\r\n                  currentComponent.x -= xD;\r\n                  resolveCollision(currentComponent);\r\n                } else {\r\n                  otherComponent.x += xD;\r\n                  resolveCollision(otherComponent);\r\n                }\r\n                collisionData.atLeft = true;\r\n                //at left\r\n              } else {\r\n                otherComponent.GRAVITY = _game_loop_js__WEBPACK_IMPORTED_MODULE_1__.GRAVITY;\r\n\r\n                if (currentComponent.static) {\r\n                  otherComponent.y -= yD;\r\n                  resolveCollision(otherComponent);\r\n                } else if (otherComponent.static) {\r\n                  currentComponent.y += yD;\r\n                  resolveCollision(currentComponent);\r\n                } else {\r\n                  otherComponent.y -= yD;\r\n                  resolveCollision(otherComponent);\r\n                }\r\n                collisionData.atBottom = true;\r\n                //at bottom\r\n              }\r\n            }\r\n          } else {\r\n            const xD = othersXPos + othersWidth - exceptXPos;\r\n            collisionData.displacementX = xD;\r\n\r\n            if (exceptYPos < othersYPos) {\r\n              const yD = exceptYPos + exceptHeight - othersYPos;\r\n              collisionData.displacementY = yD;\r\n\r\n              if (xD < yD) {\r\n                if (currentComponent.static) {\r\n                  otherComponent.x -= xD;\r\n                  resolveCollision(otherComponent);\r\n                } else if (otherComponent.static) {\r\n                  currentComponent.x += xD;\r\n                  resolveCollision(currentComponent);\r\n                } else {\r\n                  otherComponent.x -= xD;\r\n                  resolveCollision(otherComponent);\r\n                }\r\n                collisionData.atRight = true;\r\n                //at right\r\n              } else {\r\n                currentComponent.GRAVITY = _game_loop_js__WEBPACK_IMPORTED_MODULE_1__.GRAVITY;\r\n\r\n                if (currentComponent.static) {\r\n                  otherComponent.y += yD;\r\n                  resolveCollision(otherComponent);\r\n                } else if (otherComponent.static) {\r\n                  currentComponent.y -= yD;\r\n                  resolveCollision(currentComponent);\r\n                } else {\r\n                  otherComponent.y += yD;\r\n                  resolveCollision(otherComponent);\r\n                }\r\n                collisionData.atTop = true;\r\n                //at top\r\n              }\r\n            } else {\r\n              const yD = othersYPos + othersHeight - exceptYPos;\r\n              collisionData.displacementY = yD;\r\n\r\n              if (xD < yD) {\r\n                if (currentComponent.static) {\r\n                  otherComponent.x -= xD;\r\n                  resolveCollision(otherComponent);\r\n                } else if (otherComponent.static) {\r\n                  currentComponent.x += xD;\r\n                  resolveCollision(currentComponent);\r\n                } else {\r\n                  otherComponent.x -= xD;\r\n                  resolveCollision(otherComponent);\r\n                }\r\n                collisionData.atRight = true;\r\n                //at right\r\n              } else {\r\n                otherComponent.GRAVITY = _game_loop_js__WEBPACK_IMPORTED_MODULE_1__.GRAVITY;\r\n                if (currentComponent.static) {\r\n                  otherComponent.y -= yD;\r\n                  resolveCollision(otherComponent);\r\n                } else if (otherComponent.static) {\r\n                  currentComponent.y += yD;\r\n                  resolveCollision(currentComponent);\r\n                } else {\r\n                  otherComponent.y -= yD;\r\n                  resolveCollision(otherComponent);\r\n                }\r\n                collisionData.atBottom = true;\r\n                //at bottom\r\n              }\r\n            }\r\n          }\r\n        }\r\n      } catch {\r\n        currentComponent.onCollision &&\r\n          currentComponent.onCollision(collisionData);\r\n      }\r\n      currentComponent.onCollision &&\r\n        currentComponent.onCollision(collisionData);\r\n    }\r\n  }\r\n};\r\n\n\n//# sourceURL=webpack://clonex/./collision.js?");

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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"allComponentData\": () => /* binding */ allComponentData,\n/* harmony export */   \"component\": () => /* binding */ component\n/* harmony export */ });\n/* harmony import */ var _animation_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./animation.js */ \"./animation.js\");\n/* harmony import */ var _render_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./render.js */ \"./render.js\");\n/* harmony import */ var _game_loop_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./game-loop.js */ \"./game-loop.js\");\n\r\n\r\n\r\n\r\nconst allComponentData = {};\r\n\r\nlet id = 0;\r\n\r\nclass Component {\r\n  constructor(obj) {\r\n    for (const key in obj.props) {\r\n      this[key] = obj.props[key];\r\n    }\r\n\r\n    for (const key in obj.states) {\r\n      this[key] = obj.states[key];\r\n    }\r\n\r\n    this.GRAVITY = _game_loop_js__WEBPACK_IMPORTED_MODULE_2__.GRAVITY;\r\n    this.id = id++;\r\n\r\n    if (this.animations) {\r\n      (0,_animation_js__WEBPACK_IMPORTED_MODULE_0__.setAnimation)(this);\r\n    }\r\n\r\n    if (this.camera) {\r\n      this.camera = this.camera(this);\r\n    }\r\n\r\n    allComponentData[this.id] = this;\r\n\r\n    this.render = () => (0,_render_js__WEBPACK_IMPORTED_MODULE_1__.render)(this);\r\n    _render_js__WEBPACK_IMPORTED_MODULE_1__.renderCommands.push(this.render);\r\n  }\r\n}\r\n\r\nconst component = obj => new Component(obj);\r\n\n\n//# sourceURL=webpack://clonex/./components.js?");

/***/ }),

/***/ "./game-loop.js":
/*!**********************!*\
  !*** ./game-loop.js ***!
  \**********************/
/*! namespace exports */
/*! export GRAVITY [provided] [no usage info] [missing usage info prevents renaming] */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"GRAVITY\": () => /* binding */ GRAVITY,\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var _components_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components.js */ \"./components.js\");\n/* harmony import */ var _render_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./render.js */ \"./render.js\");\n/* harmony import */ var _collision_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./collision.js */ \"./collision.js\");\n/* harmony import */ var _helper_functions_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./helper-functions.js */ \"./helper-functions.js\");\n\r\n\r\n\r\n\r\n\r\nconst keyboardVals = {};\r\nconst wasCLicked = {};\r\nconst GRAVITY = 10;\r\n\r\nconst gravity = component => {\r\n  component.y += component.GRAVITY +=\r\n    component.GRAVITY * ((component.mass || 1) / 100);\r\n};\r\n\r\nconst img = document.createElement(\"img\");\r\n\r\nimg.setAttribute(\"src\", \"./assets/img/land.jpg\");\r\n\r\nconst InitScene = (xcor, ycor, width, height, obj) => {\r\n  _render_js__WEBPACK_IMPORTED_MODULE_1__.scene.width = width;\r\n  _render_js__WEBPACK_IMPORTED_MODULE_1__.scene.height = height;\r\n\r\n  window.addEventListener(\r\n    \"keydown\",\r\n    e => {\r\n      keyboardVals[e.key] = true;\r\n      wasCLicked[e.key] = true;\r\n    },\r\n    true\r\n  );\r\n  window.addEventListener(\r\n    \"keyup\",\r\n    e => {\r\n      keyboardVals[e.key] = false;\r\n    },\r\n    true\r\n  );\r\n\r\n  const gameLoop = () => {\r\n    _render_js__WEBPACK_IMPORTED_MODULE_1__.ctx.clearRect(xcor, ycor, obj.w || width, obj.h || height);\r\n    _render_js__WEBPACK_IMPORTED_MODULE_1__.ctx.fillStyle = obj.color;\r\n    _render_js__WEBPACK_IMPORTED_MODULE_1__.ctx.fillRect(xcor, ycor, width, height);\r\n    // ctx.fillStyle = \"purple\";\r\n    // ctx.fillRect(500, 300, 120, 120);\r\n\r\n    // game.drawImage(img, 0, 0, width, height);\r\n\r\n    const all = Object.keys(_components_js__WEBPACK_IMPORTED_MODULE_0__.allComponentData);\r\n\r\n    /**@initialize get defaults for all components */\r\n    all.forEach(component => {\r\n      const currentComponent = _components_js__WEBPACK_IMPORTED_MODULE_0__.allComponentData[component];\r\n\r\n      currentComponent.default && currentComponent.default();\r\n      currentComponent.gravity && gravity(currentComponent);\r\n\r\n      if (currentComponent.controls) {\r\n        Object.keys(currentComponent.controls).forEach(e => {\r\n          if (keyboardVals[e]) {\r\n            currentComponent.controls[e](currentComponent, true);\r\n          } else if (!keyboardVals[e] && wasCLicked[e]) {\r\n            currentComponent.animations &&\r\n              (currentComponent.animData.anim = {});\r\n            currentComponent.controls[e](currentComponent, false);\r\n            wasCLicked[e] = false;\r\n          }\r\n        });\r\n      }\r\n    });\r\n\r\n    /**@resolve collisions */\r\n    all.forEach(component => {\r\n      const currentComponent = _components_js__WEBPACK_IMPORTED_MODULE_0__.allComponentData[component];\r\n      (0,_collision_js__WEBPACK_IMPORTED_MODULE_2__.resolveCollision)(currentComponent);\r\n    });\r\n\r\n    /**@render render all components */\r\n    for (let i = 0; i < _render_js__WEBPACK_IMPORTED_MODULE_1__.renderCommands.length; i++) {\r\n      _render_js__WEBPACK_IMPORTED_MODULE_1__.renderCommands[i]();\r\n    }\r\n\r\n    Object.values(_helper_functions_js__WEBPACK_IMPORTED_MODULE_3__.loopCommands).forEach(command => {\r\n      command[1]++;\r\n      if (command[1] === command[2]) {\r\n        command[0]();\r\n        if (command[3] === \"timeout\") {\r\n          delete _helper_functions_js__WEBPACK_IMPORTED_MODULE_3__.loopCommands[command[4]];\r\n        } else {\r\n          if (_helper_functions_js__WEBPACK_IMPORTED_MODULE_3__.loopCommands[command[4]]) {\r\n            _helper_functions_js__WEBPACK_IMPORTED_MODULE_3__.loopCommands[command[4]] = [\r\n              command[0],\r\n              0,\r\n              command[2],\r\n              command[3],\r\n              command[4]\r\n            ];\r\n          }\r\n        }\r\n      }\r\n    });\r\n    requestAnimationFrame(gameLoop);\r\n  };\r\n  gameLoop();\r\n};\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (InitScene);\r\n\n\n//# sourceURL=webpack://clonex/./game-loop.js?");

/***/ }),

/***/ "./helper-functions.js":
/*!*****************************!*\
  !*** ./helper-functions.js ***!
  \*****************************/
/*! namespace exports */
/*! export clearTimer [provided] [no usage info] [missing usage info prevents renaming] */
/*! export interval [provided] [no usage info] [missing usage info prevents renaming] */
/*! export loopCommands [provided] [no usage info] [missing usage info prevents renaming] */
/*! export newTimingFunction [provided] [no usage info] [missing usage info prevents renaming] */
/*! export remove [provided] [no usage info] [missing usage info prevents renaming] */
/*! export timeout [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"loopCommands\": () => /* binding */ loopCommands,\n/* harmony export */   \"newTimingFunction\": () => /* binding */ newTimingFunction,\n/* harmony export */   \"clearTimer\": () => /* binding */ clearTimer,\n/* harmony export */   \"timeout\": () => /* binding */ timeout,\n/* harmony export */   \"interval\": () => /* binding */ interval,\n/* harmony export */   \"remove\": () => /* binding */ remove\n/* harmony export */ });\n/* harmony import */ var _components_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components.js */ \"./components.js\");\n/* harmony import */ var _render_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./render.js */ \"./render.js\");\n\r\n\r\n\r\nlet id = 0;\r\nconst loopCommands = {};\r\n\r\nconst newTimingFunction = () => {\r\n  return (id += 1);\r\n};\r\n\r\nconst clearTimer = id => {\r\n  delete loopCommands[id];\r\n};\r\n\r\nconst timeout = (func, speed) => {\r\n  loopCommands[id] = [func, 0, speed, \"timeout\", id];\r\n};\r\n\r\nconst interval = (func, speed) => {\r\n  loopCommands[id] = [func, 0, speed, \"interval\", id];\r\n};\r\n\r\nconst remove = component => {\r\n  delete _components_js__WEBPACK_IMPORTED_MODULE_0__.allComponentData[component.id];\r\n  const componentPostiton = _render_js__WEBPACK_IMPORTED_MODULE_1__.renderCommands.indexOf(component.render);\r\n  if (componentPostiton < 0) return;\r\n  _render_js__WEBPACK_IMPORTED_MODULE_1__.renderCommands.splice(componentPostiton, 1);\r\n};\r\n\n\n//# sourceURL=webpack://clonex/./helper-functions.js?");

/***/ }),

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! namespace exports */
/*! exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _game_loop_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game-loop.js */ \"./game-loop.js\");\n/* harmony import */ var _Bullet__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Bullet */ \"./Bullet.js\");\n/* harmony import */ var _Boy__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Boy */ \"./Boy.js\");\n/* harmony import */ var _Enemy__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Enemy */ \"./Enemy.js\");\n\r\n\r\n\r\n\r\n\r\n(0,_game_loop_js__WEBPACK_IMPORTED_MODULE_0__.default)(0, 0, window.innerWidth, window.innerHeight, {\r\n  color: \"rgb(0, 0, 0)\"\r\n});\r\n\n\n//# sourceURL=webpack://clonex/./index.js?");

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
/******/ 	__webpack_require__("./index.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;