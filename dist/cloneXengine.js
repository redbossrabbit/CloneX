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
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var _helper_functions_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helper-functions.js */ \"./helper-functions.js\");\n/* harmony import */ var _camera__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./camera */ \"./camera.js\");\n/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components */ \"./components.js\");\n/* harmony import */ var _Bullet__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Bullet */ \"./Bullet.js\");\n\r\n\r\n\r\n\r\n\r\nclass Boy extends _components__WEBPACK_IMPORTED_MODULE_2__.default.Component {\r\n  constructor() {\r\n    super();\r\n    this.name = \"boy\";\r\n    this.mass = 1;\r\n    this.w = 50;\r\n    this.h = 50;\r\n    this.x = 600;\r\n    this.y = 338;\r\n    this.facingLeft = false;\r\n    this.rigidBody = true;\r\n    this.canJump = true;\r\n    this.gravity = true;\r\n    this.static = false;\r\n    this.layer = 2;\r\n    this.light = {\r\n      lightMap: \"./assets/img/light.png\",\r\n      blendMode: \"color-dodge\",\r\n      x: 300,\r\n      y: 100,\r\n      w: 500,\r\n      h: 500\r\n    };\r\n    // this.color: \"red\",\r\n    this.reactsWith = {\r\n      enemy: true\r\n    };\r\n    this._jumpAmt = 1;\r\n    this.animations = {\r\n      spriteSheet: \"./assets/img/sprite-sheet.png\",\r\n      imageSizeX: 50,\r\n      imageSizeY: 50,\r\n      speed: 10,\r\n      frameWidth: 400,\r\n      frameHeight: 450,\r\n\r\n      //animations\r\n      downAnim: [0, 0, 4],\r\n      rightAnim: [3, 0, 4],\r\n      leftAnim: [2, 0, 4],\r\n      upAnim: [1, 0, 4],\r\n      idle: [0, 0, 1]\r\n    };\r\n    this.controls = {\r\n      ArrowUp(_this, keyDown) {\r\n        if (!keyDown) return;\r\n        // this.animate(\"upAnim\");\r\n        // this.setY(-5);\r\n        // this.isMoving = true;\r\n        if (!_this._hasJumped) {\r\n          _this.gravity = false;\r\n          const id = (0,_helper_functions_js__WEBPACK_IMPORTED_MODULE_0__.newTimingFunction)();\r\n          (0,_helper_functions_js__WEBPACK_IMPORTED_MODULE_0__.interval)(() => {\r\n            if (_this._jumpAmt >= 40 || _this._atBottom) {\r\n              _this._hasJumped = false;\r\n              _this.gravity = true;\r\n              (0,_helper_functions_js__WEBPACK_IMPORTED_MODULE_0__.clearTimer)(id);\r\n              return;\r\n            }\r\n            _this.setY(-8);\r\n            _this._jumpAmt++;\r\n          }, 1);\r\n          _this._hasJumped = true;\r\n        }\r\n      },\r\n      // ArrowDown(this, keyDown) {\r\n      //   if (!keyDown) return;\r\n      //   this.animate(\"downAnim\");\r\n      //   this.setY(5);\r\n      //   this.isMoving = true;\r\n      // },\r\n      ArrowLeft(_this, keyDown) {\r\n        if (!keyDown) return;\r\n        _this.animate(\"leftAnim\");\r\n        _this.setX(-5);\r\n        _this._isMoving = true;\r\n        _this._facingLeft = true;\r\n      },\r\n      ArrowRight(_this, keyDown) {\r\n        if (!keyDown) return;\r\n        _this.animate(\"rightAnim\");\r\n        _this.setX(5);\r\n        _this._isMoving = true;\r\n        _this._facingLeft = false;\r\n      },\r\n      d(_this, keyDown) {\r\n        if (!keyDown) return;\r\n        if (!_this._hasShot) {\r\n          _this._hasShot = true;\r\n          (0,_helper_functions_js__WEBPACK_IMPORTED_MODULE_0__.newTimingFunction)();\r\n          (0,_helper_functions_js__WEBPACK_IMPORTED_MODULE_0__.timeout)(shoot, 10);\r\n        }\r\n      }\r\n    };\r\n  }\r\n  update() {\r\n    !this._isMoving && this.animate(\"idle\");\r\n    this._isMoving = false;\r\n    this.camera.track();\r\n  }\r\n  camera() {\r\n    return new _camera__WEBPACK_IMPORTED_MODULE_1__.Camera({\r\n      focus: this,\r\n      focusX: 500,\r\n      focusY: 300,\r\n      focusHeight: 120,\r\n      focusWidth: 120\r\n      // view: true\r\n    });\r\n  }\r\n  beforeRender() {\r\n    this.setLight();\r\n  }\r\n  _resetJump() {\r\n    this._jumpAmt = 1;\r\n  }\r\n}\r\n\r\nconst boy = new Boy().init();\r\n\r\nconst shoot = () => {\r\n  (0,_Bullet__WEBPACK_IMPORTED_MODULE_3__.default)(boy);\r\n  boy._hasShot = false;\r\n};\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (boy);\r\n\n\n//# sourceURL=webpack://clonex/./Boy.js?");

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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components */ \"./components.js\");\n/* harmony import */ var _helper_functions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./helper-functions */ \"./helper-functions.js\");\n/* harmony import */ var _Enemy__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Enemy */ \"./Enemy.js\");\n/* harmony import */ var _Boy__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Boy */ \"./Boy.js\");\n\r\n\r\n\r\n\r\n\r\nconst Bullet = e => {\r\n  class Bullet extends _components__WEBPACK_IMPORTED_MODULE_0__.default.Component {\r\n    constructor() {\r\n      super();\r\n      this.name = \"bullet\";\r\n      this.color = e.name === \"boy\" ? \"yellow\" : \"green\";\r\n      this.x = !e._facingLeft ? e.x + e.w : e.x - 20;\r\n      this.y = e.y;\r\n      this.w = 20;\r\n      this.h = 20;\r\n      this.layer = 2;\r\n      this.facingLeft = e.facingLeft;\r\n      this.reactsWith = {\r\n        block: true\r\n      };\r\n      this.rate = 10;\r\n    }\r\n    update() {\r\n      if (!e._facingLeft) {\r\n        this.x += this.rate += 2;\r\n      } else {\r\n        this.x -= this.rate += 2;\r\n      }\r\n    }\r\n    onCollision({ entity }) {\r\n      entity.name !== \"detector\" && (0,_helper_functions__WEBPACK_IMPORTED_MODULE_1__.remove)(this);\r\n      if (entity.name === \"block8\") {\r\n        if (_Boy__WEBPACK_IMPORTED_MODULE_3__.default.x < _Enemy__WEBPACK_IMPORTED_MODULE_2__.block8.x) {\r\n          _Enemy__WEBPACK_IMPORTED_MODULE_2__.block8.setX(50);\r\n        } else if (_Boy__WEBPACK_IMPORTED_MODULE_3__.default.x > _Enemy__WEBPACK_IMPORTED_MODULE_2__.block8.x) {\r\n          _Enemy__WEBPACK_IMPORTED_MODULE_2__.block8.setX(-50);\r\n        }\r\n      }\r\n    }\r\n  }\r\n  const _Bullet = new Bullet().init();\r\n\r\n  (0,_helper_functions__WEBPACK_IMPORTED_MODULE_1__.newTimingFunction)();\r\n  (0,_helper_functions__WEBPACK_IMPORTED_MODULE_1__.timeout)(() => {\r\n    (0,_helper_functions__WEBPACK_IMPORTED_MODULE_1__.remove)(_Bullet);\r\n  }, 60);\r\n\r\n  return _Bullet;\r\n};\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Bullet);\r\n\n\n//# sourceURL=webpack://clonex/./Bullet.js?");

/***/ }),

/***/ "./Detector.js":
/*!*********************!*\
  !*** ./Detector.js ***!
  \*********************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var _components_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components.js */ \"./components.js\");\n/* harmony import */ var _Enemy__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Enemy */ \"./Enemy.js\");\n\r\n\r\n\r\nclass Detector extends _components_js__WEBPACK_IMPORTED_MODULE_0__.default.Component {\r\n  constructor() {\r\n    super();\r\n    this.name = \"detector\";\r\n    // this.color = \"green\";\r\n    this.w = 450;\r\n    this.h = 50;\r\n    this.layer = 2;\r\n  }\r\n  update() {\r\n    this.y = _Enemy__WEBPACK_IMPORTED_MODULE_1__.block8.y;\r\n    this.x = _Enemy__WEBPACK_IMPORTED_MODULE_1__.block8.x - 200;\r\n  }\r\n  onCollision({ entity }) {\r\n    if (entity.name === \"boy\") {\r\n      if (entity.x < _Enemy__WEBPACK_IMPORTED_MODULE_1__.block8.x) {\r\n        _Enemy__WEBPACK_IMPORTED_MODULE_1__.block8.facingLeft = true;\r\n        _Enemy__WEBPACK_IMPORTED_MODULE_1__.block8.setX(-1);\r\n      } else {\r\n        _Enemy__WEBPACK_IMPORTED_MODULE_1__.block8.facingLeft = false;\r\n        _Enemy__WEBPACK_IMPORTED_MODULE_1__.block8.setX(1);\r\n      }\r\n    }\r\n  }\r\n}\r\nconst detector = new Detector().init();\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (detector);\r\n\n\n//# sourceURL=webpack://clonex/./Detector.js?");

/***/ }),

/***/ "./Enemy.js":
/*!******************!*\
  !*** ./Enemy.js ***!
  \******************/
/*! namespace exports */
/*! export block8 [provided] [no usage info] [missing usage info prevents renaming] */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"block8\": () => /* binding */ block8,\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components */ \"./components.js\");\n/* harmony import */ var _helper_functions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./helper-functions */ \"./helper-functions.js\");\n/* harmony import */ var _Boy__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Boy */ \"./Boy.js\");\n\r\n\r\n\r\n\r\nclass Enemy extends _components__WEBPACK_IMPORTED_MODULE_0__.default.Component {\r\n  constructor() {\r\n    super();\r\n    this.name = \"enemy\";\r\n    this.mass = 1;\r\n    this.color = \"rgb(5,10,0)\";\r\n    this.static = true;\r\n    this.gravity = false;\r\n    this.layer = 1;\r\n    this._isHit = false;\r\n    this.reactsWith = {\r\n      enemy: true,\r\n      boy: true\r\n    };\r\n    this.rigidBody = true;\r\n  }\r\n  update() {\r\n    if (!this.static) {\r\n      this.color = this._isHit ? \"white\" : \"rgb(1,0,0)\";\r\n      this._isHit = false;\r\n    } else {\r\n      this.color = this._isHit ? \"white\" : \"rgb(5,10,0)\";\r\n      this._isHit = false;\r\n    }\r\n  }\r\n  onCollision({ atTop, atBottom, entity }) {\r\n    if (atTop && entity.name === \"boy\") {\r\n      entity._atBottom = true;\r\n      entity._resetJump();\r\n    }\r\n    if (atBottom && entity.name === \"boy\") {\r\n      entity._hasJumped = false;\r\n      entity._atBottom = false;\r\n      entity._resetJump();\r\n    }\r\n    if (entity.name === \"bullet\") {\r\n      this._isHit = true;\r\n    }\r\n  }\r\n}\r\n\r\nconst createEnemy = () => new Enemy().init();\r\n\r\nconst block4 = createEnemy();\r\nblock4.y = 350;\r\nblock4.x = 100;\r\nblock4.w = 200;\r\nblock4.h = 50;\r\nblock4.max = 0;\r\n\r\nlet rate = -1;\r\n\r\nconst resetTimeout = () => {\r\n  const id = (0,_helper_functions__WEBPACK_IMPORTED_MODULE_1__.newTimingFunction)();\r\n  (0,_helper_functions__WEBPACK_IMPORTED_MODULE_1__.timeout)(() => {\r\n    rate = -rate;\r\n    (0,_helper_functions__WEBPACK_IMPORTED_MODULE_1__.clearTimer)(id);\r\n    resetTimeout();\r\n  }, 300);\r\n};\r\nresetTimeout();\r\n\r\n(0,_helper_functions__WEBPACK_IMPORTED_MODULE_1__.newTimingFunction)();\r\n(0,_helper_functions__WEBPACK_IMPORTED_MODULE_1__.interval)(() => {\r\n  block4.setY(rate);\r\n}, 1);\r\n\r\nconst block8 = createEnemy();\r\nblock8.static = false;\r\nblock8.gravity = true;\r\nblock8.y = 200;\r\nblock8.x = 350;\r\nblock8.w = 50;\r\nblock8.h = 50;\r\nblock8.facingLeft = true;\r\nblock8.name = \"block8\";\r\n\r\n// const block9 = Enemy();\r\n// block9.static = false;\r\n// block9.gravity = true;\r\n// block9.y = 200;\r\n// block9.x = 450;\r\n// block9.w = 50;\r\n// block9.h = 50;\r\n// block9.name = \"block9\";\r\n\r\nconst block3 = createEnemy();\r\nblock3.y = 100;\r\nblock3.x = 300;\r\nblock3.w = 200;\r\nblock3.h = 50;\r\n\r\nconst blockd = createEnemy();\r\nblockd.y = 55;\r\nblockd.x = 500;\r\nblockd.w = 200;\r\nblockd.h = 50;\r\n\r\nconst block6 = createEnemy();\r\nblock6.y = 550;\r\nblock6.x = 0;\r\nblock6.w = 1000;\r\nblock6.h = 50;\r\n\r\nconst nextGround = createEnemy();\r\nnextGround.y = 400;\r\nnextGround.x = 1100;\r\nnextGround.w = 1000;\r\nnextGround.h = 50;\r\n\r\n// const createEnemy = (x, y, w, h) => {\r\n//   const enemy = Enemy();\r\n//   enemy.x = x;\r\n//   enemy.y = y;\r\n//   enemy.w = w;\r\n//   enemy.h = h;\r\n//   return enemy;\r\n// };\r\n\r\nconst block7 = createEnemy();\r\nblock7.y = 150;\r\nblock7.x = 700;\r\nblock7.w = 200;\r\nblock7.h = 400;\r\n\r\n(0,_helper_functions__WEBPACK_IMPORTED_MODULE_1__.placeInFront)(_Boy__WEBPACK_IMPORTED_MODULE_2__.default, block7);\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Enemy);\r\n\n\n//# sourceURL=webpack://clonex/./Enemy.js?");

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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Camera\": () => /* binding */ Camera\n/* harmony export */ });\n/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components */ \"./components.js\");\n/* harmony import */ var _render__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./render */ \"./render.js\");\n\r\n\r\n\r\nconst observe = (obj, key) => {\r\n  let val = obj[key];\r\n  Object.defineProperty(obj, key, {\r\n    get() {\r\n      return val;\r\n    },\r\n    set(newVal) {\r\n      obj[`_PREVIOUS_VALUE_${key}`] = val;\r\n      val = newVal;\r\n    }\r\n  });\r\n};\r\n\r\nclass Camera {\r\n  constructor({ focus, focusX, focusY, focusWidth, focusHeight, view, shake }) {\r\n    observe(focus, \"x\");\r\n    observe(focus, \"y\");\r\n\r\n    this.track = () => {\r\n      let { [focus.id]: currentComponent, ...others } = _components__WEBPACK_IMPORTED_MODULE_0__.allComponentData;\r\n\r\n      others = Object.values(others);\r\n\r\n      if (focus.x + focus.w > focusX + focusWidth) {\r\n        focus.x -= focus.x + focus.w - (focusX + focusWidth);\r\n        others.forEach(item => {\r\n          item.x -= Math.abs(focus.x - focus._PREVIOUS_VALUE_x);\r\n        });\r\n      } else if (focus.x < focusX) {\r\n        focus.x += focusX - focus.x;\r\n        others.forEach(item => {\r\n          item.x += Math.abs(focus._PREVIOUS_VALUE_x - focus.x);\r\n        });\r\n      }\r\n\r\n      if (focus.y + focus.h > focusY + focusHeight) {\r\n        focus.y -= focus.y + focus.h - (focusY + focusHeight);\r\n        others.forEach(item => {\r\n          item.y -= Math.abs(focus.y - focus._PREVIOUS_VALUE_y);\r\n        });\r\n      } else if (focus.y < focusY) {\r\n        focus.y += focusY - focus.y;\r\n        others.forEach(item => {\r\n          item.y += Math.abs(focus._PREVIOUS_VALUE_y - focus.y);\r\n        });\r\n      }\r\n      if (view) {\r\n        _render__WEBPACK_IMPORTED_MODULE_1__.ctx.strokeStyle = \"purple\";\r\n        _render__WEBPACK_IMPORTED_MODULE_1__.ctx.strokeRect(focusX, focusY, focusWidth, focusHeight);\r\n      }\r\n    };\r\n\r\n    return this;\r\n  }\r\n}\r\n\n\n//# sourceURL=webpack://clonex/./camera.js?");

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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"resolveCollision\": () => /* binding */ resolveCollision\n/* harmony export */ });\n/* harmony import */ var _components_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components.js */ \"./components.js\");\n/* harmony import */ var _game_loop_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./game-loop.js */ \"./game-loop.js\");\n\r\n\r\n\r\nconst resolveCollision = currentComponent => {\r\n  if (!currentComponent) return;\r\n\r\n  const { [currentComponent.id]: except, ...others } = _components_js__WEBPACK_IMPORTED_MODULE_0__.allComponentData,\r\n    othersArr = Object.keys(others);\r\n\r\n  for (let e = 0; e < othersArr.length; e++) {\r\n    const otherComponent = others[othersArr[e]];\r\n\r\n    const exceptXPos = currentComponent.x,\r\n      exceptYPos = currentComponent.y,\r\n      exceptWidth = currentComponent.w,\r\n      exceptHeight = currentComponent.h,\r\n      othersXPos = otherComponent.x,\r\n      othersYPos = otherComponent.y,\r\n      othersWidth = otherComponent.w,\r\n      othersHeight = otherComponent.h;\r\n\r\n    if (\r\n      exceptXPos < othersXPos + othersWidth &&\r\n      othersXPos < exceptXPos + exceptWidth &&\r\n      exceptYPos < othersYPos + othersHeight &&\r\n      othersYPos < exceptYPos + exceptHeight\r\n    ) {\r\n      let currCollisionData = {\r\n        entity: otherComponent\r\n      };\r\n      let otherCollisionData = {\r\n        entity: currentComponent\r\n      };\r\n      try {\r\n        if (\r\n          otherComponent.rigidBody &&\r\n          currentComponent.reactsWith[otherComponent.name]\r\n        ) {\r\n          if (exceptXPos < othersXPos) {\r\n            const xD = exceptXPos + exceptWidth - othersXPos;\r\n            currCollisionData.displacementX = xD;\r\n            otherCollisionData.displacementX = xD;\r\n\r\n            if (exceptYPos < othersYPos) {\r\n              const yD = exceptYPos + exceptHeight - othersYPos;\r\n              currCollisionData.displacementY = yD;\r\n              otherCollisionData.displacementY = yD;\r\n\r\n              if (xD < yD) {\r\n                if (currentComponent.static) {\r\n                  otherComponent.setX(xD);\r\n                  resolveCollision(otherComponent);\r\n                } else if (otherComponent.static) {\r\n                  currentComponent.setX(-xD);\r\n                  resolveCollision(currentComponent);\r\n                } else {\r\n                  if (currentComponent.IS_MOVING_X) {\r\n                    otherComponent.setX(xD);\r\n                    resolveCollision(otherComponent);\r\n                  } else if (otherComponent.IS_MOVING_X) {\r\n                    currentComponent.setX(-xD);\r\n                    resolveCollision(currentComponent);\r\n                  }\r\n                }\r\n                currCollisionData.atLeft = true;\r\n                otherCollisionData.atRight = true;\r\n                //at left\r\n              } else {\r\n                currentComponent.GRAVITY = _game_loop_js__WEBPACK_IMPORTED_MODULE_1__.GRAVITY;\r\n\r\n                if (currentComponent.static) {\r\n                  otherComponent.setY(yD);\r\n                  resolveCollision(otherComponent);\r\n                } else if (otherComponent.static) {\r\n                  currentComponent.setY(-yD);\r\n                  resolveCollision(currentComponent);\r\n                } else {\r\n                  if (currentComponent.IS_MOVING_Y) {\r\n                    otherComponent.setY(yD);\r\n                    resolveCollision(otherComponent);\r\n                  } else if (otherComponent.IS_MOVING_Y) {\r\n                    currentComponent.setY(-yD);\r\n                    resolveCollision(currentComponent);\r\n                  }\r\n                }\r\n                currCollisionData.atTop = true;\r\n                otherCollisionData.atBottom = true;\r\n                //at top\r\n              }\r\n            } else {\r\n              const yD = othersYPos + othersHeight - exceptYPos;\r\n              currCollisionData.displacementY = yD;\r\n              otherCollisionData.displacementY = yD;\r\n\r\n              if (xD < yD) {\r\n                if (currentComponent.static) {\r\n                  otherComponent.setX(xD);\r\n                  resolveCollision(otherComponent);\r\n                } else if (otherComponent.static) {\r\n                  currentComponent.setX(-xD);\r\n                  resolveCollision(currentComponent);\r\n                } else {\r\n                  if (currentComponent.IS_MOVING_X) {\r\n                    otherComponent.setX(xD);\r\n                    resolveCollision(otherComponent);\r\n                  } else if (otherComponent.IS_MOVING_X) {\r\n                    currentComponent.setX(-xD);\r\n                    resolveCollision(currentComponent);\r\n                  }\r\n                }\r\n                currCollisionData.atLeft = true;\r\n                otherCollisionData.atRight = true;\r\n                //at left\r\n              } else {\r\n                otherComponent.GRAVITY = _game_loop_js__WEBPACK_IMPORTED_MODULE_1__.GRAVITY;\r\n\r\n                if (currentComponent.static) {\r\n                  otherComponent.setY(-yD);\r\n                  resolveCollision(otherComponent);\r\n                } else if (otherComponent.static) {\r\n                  currentComponent.setY(yD);\r\n                  resolveCollision(currentComponent);\r\n                } else {\r\n                  if (currentComponent.IS_MOVING_Y) {\r\n                    otherComponent.setY(-yD);\r\n                    resolveCollision(otherComponent);\r\n                  } else if (otherComponent.IS_MOVING_Y) {\r\n                    currentComponent.setY(yD);\r\n                    resolveCollision(currentComponent);\r\n                  }\r\n                }\r\n                currCollisionData.atBottom = true;\r\n                otherCollisionData.atTop = true;\r\n                //at bottom\r\n              }\r\n            }\r\n          } else {\r\n            const xD = othersXPos + othersWidth - exceptXPos;\r\n            currCollisionData.displacementX = xD;\r\n            otherCollisionData.displacementX = xD;\r\n\r\n            if (exceptYPos < othersYPos) {\r\n              const yD = exceptYPos + exceptHeight - othersYPos;\r\n              currCollisionData.displacementY = yD;\r\n              otherCollisionData.displacementY = yD;\r\n\r\n              if (xD < yD) {\r\n                if (currentComponent.static) {\r\n                  otherComponent.setX(-xD);\r\n                  resolveCollision(otherComponent);\r\n                } else if (otherComponent.static) {\r\n                  currentComponent.setX(xD);\r\n                  resolveCollision(currentComponent);\r\n                } else {\r\n                  if (currentComponent.IS_MOVING_X) {\r\n                    otherComponent.setX(-xD);\r\n                    resolveCollision(otherComponent);\r\n                  } else if (otherComponent.IS_MOVING_X) {\r\n                    currentComponent.setX(xD);\r\n                    resolveCollision(currentComponent);\r\n                  }\r\n                }\r\n                currCollisionData.atRight = true;\r\n                otherCollisionData.atLeft = true;\r\n                //at right\r\n              } else {\r\n                currentComponent.GRAVITY = _game_loop_js__WEBPACK_IMPORTED_MODULE_1__.GRAVITY;\r\n\r\n                if (currentComponent.static) {\r\n                  otherComponent.setY(yD);\r\n                  resolveCollision(otherComponent);\r\n                } else if (otherComponent.static) {\r\n                  currentComponent.setY(-yD);\r\n                  resolveCollision(currentComponent);\r\n                } else {\r\n                  if (currentComponent.IS_MOVING_Y) {\r\n                    otherComponent.setY(yD);\r\n                    resolveCollision(otherComponent);\r\n                  } else if (otherComponent.IS_MOVING_Y) {\r\n                    currentComponent.setY(-yD);\r\n                    resolveCollision(currentComponent);\r\n                  }\r\n                }\r\n                currCollisionData.atTop = true;\r\n                otherCollisionData.atBottom = true;\r\n                //at top\r\n              }\r\n            } else {\r\n              const yD = othersYPos + othersHeight - exceptYPos;\r\n              currCollisionData.displacementY = yD;\r\n              otherCollisionData.displacementY = yD;\r\n\r\n              if (xD < yD) {\r\n                if (currentComponent.static) {\r\n                  otherComponent.setX(-xD);\r\n                  resolveCollision(otherComponent);\r\n                } else if (otherComponent.static) {\r\n                  currentComponent.setX(xD);\r\n                  resolveCollision(currentComponent);\r\n                } else {\r\n                  if (currentComponent.IS_MOVING_X) {\r\n                    otherComponent.setX(-xD);\r\n                    resolveCollision(otherComponent);\r\n                  } else if (otherComponent.IS_MOVING_X) {\r\n                    currentComponent.setX(xD);\r\n                    resolveCollision(currentComponent);\r\n                  }\r\n                }\r\n                currCollisionData.atRight = true;\r\n                otherCollisionData.atLeft = true;\r\n                //at right\r\n              } else {\r\n                otherComponent.GRAVITY = _game_loop_js__WEBPACK_IMPORTED_MODULE_1__.GRAVITY;\r\n                if (currentComponent.static) {\r\n                  otherComponent.setY(-yD);\r\n                  resolveCollision(otherComponent);\r\n                } else if (otherComponent.static) {\r\n                  currentComponent.setY(yD);\r\n                  resolveCollision(currentComponent);\r\n                } else {\r\n                  if (currentComponent.IS_MOVING_Y) {\r\n                    otherComponent.setY(-yD);\r\n                    resolveCollision(otherComponent);\r\n                  } else if (otherComponent.IS_MOVING_Y) {\r\n                    currentComponent.setY(yD);\r\n                    resolveCollision(currentComponent);\r\n                  }\r\n                }\r\n                currCollisionData.atBottom = true;\r\n                otherCollisionData.atTop = true;\r\n                //at bottom\r\n              }\r\n            }\r\n          }\r\n        }\r\n      } catch {}\r\n      currentComponent.onCollision &&\r\n        currentComponent.onCollision(currCollisionData);\r\n\r\n      otherComponent.onCollision &&\r\n        otherComponent.onCollision(otherCollisionData);\r\n    }\r\n  }\r\n};\r\n\n\n//# sourceURL=webpack://clonex/./collision.js?");

/***/ }),

/***/ "./components.js":
/*!***********************!*\
  !*** ./components.js ***!
  \***********************/
/*! namespace exports */
/*! export GameBox [provided] [no usage info] [missing usage info prevents renaming] */
/*! export allComponentData [provided] [no usage info] [missing usage info prevents renaming] */
/*! export component [provided] [no usage info] [missing usage info prevents renaming] */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"allComponentData\": () => /* binding */ allComponentData,\n/* harmony export */   \"GameBox\": () => /* binding */ GameBox,\n/* harmony export */   \"component\": () => /* binding */ component,\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var _animation_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./animation.js */ \"./animation.js\");\n/* harmony import */ var _render_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./render.js */ \"./render.js\");\n/* harmony import */ var _game_loop_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./game-loop.js */ \"./game-loop.js\");\n/* harmony import */ var _light_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./light.js */ \"./light.js\");\n\r\n\r\n\r\n\r\n\r\nconst allComponentData = {};\r\n\r\nlet id = 0;\r\n\r\nclass Component {\r\n  constructor() {\r\n    this.GRAVITY = _game_loop_js__WEBPACK_IMPORTED_MODULE_2__.GRAVITY;\r\n    this.id = id += 1;\r\n\r\n    this.setX = val => {\r\n      this.IS_MOVING_X = true;\r\n      this.x += val;\r\n    };\r\n\r\n    this.setY = val => {\r\n      this.IS_MOVING_Y = true;\r\n      this.y += val;\r\n    };\r\n  }\r\n  init() {\r\n    if (this.animations) {\r\n      (0,_animation_js__WEBPACK_IMPORTED_MODULE_0__.setAnimation)(this);\r\n    }\r\n\r\n    if (this.camera) {\r\n      this.camera = this.camera(this);\r\n    }\r\n\r\n    if (this.beforeRender && this.afterRender) {\r\n      this.render = () => {\r\n        [\r\n          () => this.beforeRender(),\r\n          () => (0,_render_js__WEBPACK_IMPORTED_MODULE_1__.render)(this),\r\n          () => this.afterRender()\r\n        ].forEach(item => item());\r\n      };\r\n    } else if (this.beforeRender) {\r\n      this.render = () => {\r\n        [() => this.beforeRender(), () => (0,_render_js__WEBPACK_IMPORTED_MODULE_1__.render)(this)].forEach(item => item());\r\n      };\r\n    } else if (this.afterRender) {\r\n      this.render = () => {\r\n        [() => (0,_render_js__WEBPACK_IMPORTED_MODULE_1__.render)(this), () => this.afterRender()].forEach(item => item());\r\n      };\r\n    } else {\r\n      this.render = () => (0,_render_js__WEBPACK_IMPORTED_MODULE_1__.render)(this);\r\n    }\r\n\r\n    _render_js__WEBPACK_IMPORTED_MODULE_1__.renderCommands.push(this.render);\r\n\r\n    allComponentData[this.id] = this;\r\n\r\n    return this;\r\n  }\r\n  setLight() {\r\n    (0,_light_js__WEBPACK_IMPORTED_MODULE_3__.light)(this);\r\n  }\r\n}\r\nconst GameBox = {\r\n  Component\r\n};\r\nconst component = obj => new Component(obj);\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GameBox);\r\n\n\n//# sourceURL=webpack://clonex/./components.js?");

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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"GRAVITY\": () => /* binding */ GRAVITY,\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var _components_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components.js */ \"./components.js\");\n/* harmony import */ var _render_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./render.js */ \"./render.js\");\n/* harmony import */ var _collision_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./collision.js */ \"./collision.js\");\n/* harmony import */ var _helper_functions_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./helper-functions.js */ \"./helper-functions.js\");\n\r\n\r\n\r\n\r\n\r\nconst keyboardVals = {};\r\nconst wasCLicked = {};\r\nconst GRAVITY = 10;\r\n\r\nconst gravity = component => {\r\n  component.setY(\r\n    (component.GRAVITY += component.GRAVITY * ((component.mass || 1) / 100))\r\n  );\r\n};\r\n\r\nconst InitScene = (xcor, ycor, width, height, obj) => {\r\n  _render_js__WEBPACK_IMPORTED_MODULE_1__.scene.width = width;\r\n  _render_js__WEBPACK_IMPORTED_MODULE_1__.scene.height = height;\r\n\r\n  window.addEventListener(\r\n    \"keydown\",\r\n    e => {\r\n      keyboardVals[e.key] = true;\r\n      wasCLicked[e.key] = true;\r\n    },\r\n    true\r\n  );\r\n  window.addEventListener(\r\n    \"keyup\",\r\n    e => {\r\n      keyboardVals[e.key] = false;\r\n    },\r\n    true\r\n  );\r\n\r\n  const gameLoop = () => {\r\n    _render_js__WEBPACK_IMPORTED_MODULE_1__.ctx.clearRect(xcor, ycor, obj.w || width, obj.h || height);\r\n    _render_js__WEBPACK_IMPORTED_MODULE_1__.ctx.fillStyle = obj.color;\r\n    _render_js__WEBPACK_IMPORTED_MODULE_1__.ctx.fillRect(xcor, ycor, width, height);\r\n\r\n    _render_js__WEBPACK_IMPORTED_MODULE_1__.ctx.globalCompositeOperation = \"source-over\";\r\n\r\n    const all = Object.keys(_components_js__WEBPACK_IMPORTED_MODULE_0__.allComponentData);\r\n\r\n    _helper_functions_js__WEBPACK_IMPORTED_MODULE_3__.placeCommands.forEach(command => command());\r\n    (0,_helper_functions_js__WEBPACK_IMPORTED_MODULE_3__.resetPlaceCommands)();\r\n\r\n    /**@initialize get defaults for all components */\r\n    all.forEach(component => {\r\n      const currentComponent = _components_js__WEBPACK_IMPORTED_MODULE_0__.allComponentData[component];\r\n\r\n      currentComponent.IS_MOVING_X = false;\r\n      currentComponent.IS_MOVING_Y = false;\r\n\r\n      currentComponent.gravity && gravity(currentComponent);\r\n      currentComponent.update && currentComponent.update();\r\n\r\n      if (currentComponent.controls) {\r\n        Object.keys(currentComponent.controls).forEach(e => {\r\n          if (keyboardVals[e]) {\r\n            currentComponent.controls[e](currentComponent, true);\r\n          } else if (!keyboardVals[e] && wasCLicked[e]) {\r\n            currentComponent.animations &&\r\n              (currentComponent.animData.anim = {});\r\n            currentComponent.controls[e](currentComponent, false);\r\n            wasCLicked[e] = false;\r\n          }\r\n        });\r\n      }\r\n    });\r\n\r\n    /**@resolve collisions */\r\n    all.forEach(component => {\r\n      const currentComponent = _components_js__WEBPACK_IMPORTED_MODULE_0__.allComponentData[component];\r\n      (0,_collision_js__WEBPACK_IMPORTED_MODULE_2__.resolveCollision)(currentComponent);\r\n    });\r\n\r\n    /**@render render all components */\r\n    for (let i = 0; i < _render_js__WEBPACK_IMPORTED_MODULE_1__.renderCommands.length; i++) {\r\n      _render_js__WEBPACK_IMPORTED_MODULE_1__.renderCommands[i]();\r\n    }\r\n\r\n    /**@timingFunctions resolves timing functions */\r\n    Object.values(_helper_functions_js__WEBPACK_IMPORTED_MODULE_3__.loopCommands).forEach(command => {\r\n      command[1]++;\r\n      if (command[1] === command[2]) {\r\n        command[0]();\r\n        if (command[3] === \"timeout\") {\r\n          delete _helper_functions_js__WEBPACK_IMPORTED_MODULE_3__.loopCommands[command[4]];\r\n        } else {\r\n          if (_helper_functions_js__WEBPACK_IMPORTED_MODULE_3__.loopCommands[command[4]]) {\r\n            _helper_functions_js__WEBPACK_IMPORTED_MODULE_3__.loopCommands[command[4]] = [\r\n              command[0],\r\n              0,\r\n              command[2],\r\n              command[3],\r\n              command[4]\r\n            ];\r\n          }\r\n        }\r\n      }\r\n    });\r\n    requestAnimationFrame(gameLoop);\r\n  };\r\n  gameLoop();\r\n};\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (InitScene);\r\n\n\n//# sourceURL=webpack://clonex/./game-loop.js?");

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
/*! export placeCommands [provided] [no usage info] [missing usage info prevents renaming] */
/*! export placeInFront [provided] [no usage info] [missing usage info prevents renaming] */
/*! export remove [provided] [no usage info] [missing usage info prevents renaming] */
/*! export resetPlaceCommands [provided] [no usage info] [missing usage info prevents renaming] */
/*! export timeout [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"loopCommands\": () => /* binding */ loopCommands,\n/* harmony export */   \"newTimingFunction\": () => /* binding */ newTimingFunction,\n/* harmony export */   \"clearTimer\": () => /* binding */ clearTimer,\n/* harmony export */   \"timeout\": () => /* binding */ timeout,\n/* harmony export */   \"interval\": () => /* binding */ interval,\n/* harmony export */   \"remove\": () => /* binding */ remove,\n/* harmony export */   \"placeCommands\": () => /* binding */ placeCommands,\n/* harmony export */   \"resetPlaceCommands\": () => /* binding */ resetPlaceCommands,\n/* harmony export */   \"placeInFront\": () => /* binding */ placeInFront\n/* harmony export */ });\n/* harmony import */ var _components_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components.js */ \"./components.js\");\n/* harmony import */ var _render_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./render.js */ \"./render.js\");\n\r\n\r\n\r\nlet id = 0;\r\n\r\nconst loopCommands = {};\r\n\r\nconst newTimingFunction = () => {\r\n  return (id += 1);\r\n};\r\n\r\nconst clearTimer = id => {\r\n  delete loopCommands[id];\r\n};\r\n\r\nconst timeout = (func, speed) => {\r\n  loopCommands[id] = [func, 0, speed, \"timeout\", id];\r\n};\r\n\r\nconst interval = (func, speed) => {\r\n  loopCommands[id] = [func, 0, speed, \"interval\", id];\r\n};\r\n\r\nconst remove = component => {\r\n  delete _components_js__WEBPACK_IMPORTED_MODULE_0__.allComponentData[component.id];\r\n  const componentPostiton = _render_js__WEBPACK_IMPORTED_MODULE_1__.renderCommands.indexOf(component.render);\r\n  if (componentPostiton < 0) return;\r\n  _render_js__WEBPACK_IMPORTED_MODULE_1__.renderCommands.splice(componentPostiton, 1);\r\n};\r\n\r\nlet placeCommands = [];\r\n\r\nconst resetPlaceCommands = () => {\r\n  placeCommands = [];\r\n};\r\n\r\nconst placeInFront = (comp1, comp2) => {\r\n  placeCommands.push(() => {\r\n    const findCompIdx = comp => _render_js__WEBPACK_IMPORTED_MODULE_1__.renderCommands.indexOf(comp.render);\r\n\r\n    const id2 = findCompIdx(comp2);\r\n    const id1 = findCompIdx(comp1);\r\n\r\n    const comp1Render = _render_js__WEBPACK_IMPORTED_MODULE_1__.renderCommands.splice(id1, 1)[0];\r\n    const part = _render_js__WEBPACK_IMPORTED_MODULE_1__.renderCommands.splice(id2);\r\n    _render_js__WEBPACK_IMPORTED_MODULE_1__.renderCommands.push(comp1Render);\r\n    (0,_render_js__WEBPACK_IMPORTED_MODULE_1__.setRenderCommands)([..._render_js__WEBPACK_IMPORTED_MODULE_1__.renderCommands, ...part]);\r\n  });\r\n};\r\n\n\n//# sourceURL=webpack://clonex/./helper-functions.js?");

/***/ }),

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! namespace exports */
/*! exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _game_loop_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game-loop.js */ \"./game-loop.js\");\n/* harmony import */ var _Bullet__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Bullet */ \"./Bullet.js\");\n/* harmony import */ var _Boy__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Boy */ \"./Boy.js\");\n/* harmony import */ var _Enemy__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Enemy */ \"./Enemy.js\");\n/* harmony import */ var _Detector__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Detector */ \"./Detector.js\");\n\r\n\r\n\r\n\r\n\r\n\r\n(0,_game_loop_js__WEBPACK_IMPORTED_MODULE_0__.default)(0, 0, window.innerWidth, window.innerHeight, {\r\n  color: \"rgb(0, 0, 0)\"\r\n});\r\n\n\n//# sourceURL=webpack://clonex/./index.js?");

/***/ }),

/***/ "./light.js":
/*!******************!*\
  !*** ./light.js ***!
  \******************/
/*! namespace exports */
/*! export light [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"light\": () => /* binding */ light\n/* harmony export */ });\n/* harmony import */ var _render__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./render */ \"./render.js\");\n\r\n\r\nconst light = component => {\r\n  const lightMap = component.light.lightMap;\r\n  const light = document.createElement(\"img\");\r\n  light.setAttribute(\"src\", lightMap);\r\n  const { x, y, w, h, blendMode } = component.light;\r\n\r\n  _render__WEBPACK_IMPORTED_MODULE_0__.ctx.globalCompositeOperation = blendMode;\r\n  _render__WEBPACK_IMPORTED_MODULE_0__.ctx.drawImage(light, x, y, w, h);\r\n  _render__WEBPACK_IMPORTED_MODULE_0__.ctx.globalCompositeOperation = \"normal\";\r\n};\r\n\n\n//# sourceURL=webpack://clonex/./light.js?");

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
/*! export setRenderCommands [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"renderCommands\": () => /* binding */ renderCommands,\n/* harmony export */   \"setRenderCommands\": () => /* binding */ setRenderCommands,\n/* harmony export */   \"scene\": () => /* binding */ scene,\n/* harmony export */   \"ctx\": () => /* binding */ ctx,\n/* harmony export */   \"render\": () => /* binding */ render\n/* harmony export */ });\nlet renderCommands = [];\r\nconst setRenderCommands = val => {\r\n  renderCommands = [...val];\r\n};\r\nconst scene = document.createElement(\"canvas\");\r\ndocument.body.append(scene);\r\nconst ctx = scene.getContext(\"2d\");\r\n\r\nconst render = component => {\r\n  if (component.color) {\r\n    ctx.fillStyle = component.color;\r\n    ctx.fillRect(component.x, component.y, component.w, component.h);\r\n  }\r\n\r\n  if (component.animations) {\r\n    ctx.drawImage(\r\n      component.animations.spriteSheet,\r\n      component.animations.x,\r\n      component.animations.y,\r\n      component.animations.frameWidth,\r\n      component.animations.frameHeight,\r\n      component.x,\r\n      component.y,\r\n      component.animations.imageSizeX,\r\n      component.animations.imageSizeY\r\n    );\r\n    component.play();\r\n  }\r\n};\r\n\n\n//# sourceURL=webpack://clonex/./render.js?");

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