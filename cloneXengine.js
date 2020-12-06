const scene = document.createElement("canvas");
document.body.append(scene);
const frameRateTxt = document.getElementById('frame-rate');
const game = scene.getContext("2d"),
  keyboardVals = {},
  renderCommands = [],
  allComponentData = {};

const PI = Math.PI;
const loopCommands = new Map();
let hasChangedKey;

const lineProps = {
  x: 600,
  y: 250,
  h: 200,
  d: 50
};

let frame = 0;
setInterval(() => {
  frameRateTxt.innerText = `${frame}fps`;
  frame = 0;
}, 1000);

let newX = lineProps.h * Math.sin(PI * lineProps.d / 180),
  newY = newX * Math.tan(PI * (90 - lineProps.d) / 180);



const drawLine = () => {
  const x = lineProps.x + newX;
  const y = lineProps.y - newY;
  game.beginPath();
  game.moveTo(lineProps.x, lineProps.y);
  game.lineTo(x, y);
  game.stroke();
  game.strokeStyle = 'yellow';
}


const tanOfLine = Math.tan(PI * (lineProps.d) / 180);



const checkForBoy = (boy) => {
  const O = ((boy.x + boy.w) - lineProps.x),
    A = (lineProps.y - (boy.y + boy.h));
  console.log(O)
  O / A >= tanOfLine &&
    (() => {
      console.log(O)
      boy.x = lineProps.x - boy.w;
      // boy.y = lineProps.y - boy.h;
      boy.x += O;
      // boy.y += A;
    })()
}

let id = 0;

class Component {
  constructor(obj) {
    for (const key in obj.props) {
      this[key] = obj.props[key];
    }
    for (const key in obj.states) {
      this[key] = obj.states[key];
    }

    this.id = id;

    if (this.animations) {

      this.frame = 0;
      this.updateTime = 0;
      this.animData = {
        anim: {}
      };
      /**
      * animation data:
      - X,Y positions for where to start the animation.
      -How many frames.
      */

      //Preload Image
      const img = document.createElement("img");
      img.setAttribute("src", this.animations.spriteSheet);
      this.animations.spriteSheet = img;

      //Animation player
      this.play = () => {
        if (this.updateTime === this.animations.speed) { //checks how many gameloops before going to next frame of animation
          this.updateTime = 0;
          if (this.frame === this.animData.limit) {
            this.animations.y = this.animations.frameHeight * this.animData.yOrigin;
            this.animations.x = this.animData.xOrigin;
            this.frame = 0;
          }
          this.animations.x = this.frame * this.animations.frameWidth;
          this.frame++;
        }
        this.updateTime++;
      }

      //animate function sets the animation data in the animData object.
      this.animate = (anim) => {
        if (!this.animData.anim[anim]) {
          if(Object.keys(this.animData.anim).length && !hasChangedKey) return;
          this.animData.anim = {};
          this.animData.anim[anim] = true;
          this.frame = 0;
          this.updateTime = 0;

          this.animData.yOrigin = this.animations[anim][0];
          this.animData.xOrigin = this.animations[anim][1];
          this.animData.limit = this.animations[anim][2];
          this.animations.y = this.animations.frameHeight * this.animData.yOrigin;
          this.animations.x = this.animData.xOrigin;
        }
      }
    }

    allComponentData[id] = this;

    this.render = () => {
      this.color &&
        (() => {
          game.fillStyle = this.color;
          game.fillRect(this.x, this.y, this.w, this.h);
        })();

      if (this.animations) {
        game.drawImage(this.animations.spriteSheet, this.animations.x, this.animations.y, this.animations.frameWidth, this.animations.frameHeight, this.x, this.y, this.animations.imageSizeX, this.animations.imageSizeY);
        this.play();
      }
      return this;
    };
    renderCommands.push(this.render);
    id++;
  }
}

const remove = component => {
  delete allComponentData[component.id];
  renderCommands.splice(renderCommands.indexOf(component.render), 1);
};

let g = 20;
const gravity = component => (component.y += g);

export const initScene = (xcor, ycor, width, height, obj) => {
  scene.width = width;
  scene.height = height;

  window.addEventListener(
    "keydown",
    e => {
      hasChangedKey = false;
      keyboardVals[e.key] = true;
    },
    true
  );
  window.addEventListener(
    "keyup",
    e => {
      hasChangedKey = true;
      keyboardVals[e.key] = false;
    },
    true
  );

  const gameLoop = () => {
    game.clearRect(xcor, ycor, obj.w || width, obj.h || height);
    game.fillStyle = obj.color;
    game.fillRect(xcor, ycor, width, height);
    drawLine();
    for (let i = 0; i < renderCommands.length; i++) {

      const currentComponent = renderCommands[i]();

      currentComponent.default && currentComponent.default();

      currentComponent.controls &&
        Object.keys(currentComponent.controls).forEach(e => {
          keyboardVals[e] && currentComponent.controls[e](currentComponent);
        });


      if (currentComponent.canCollide) {

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
              if (otherComponent.rigidBody) {

                if (exceptXPos < othersXPos) {
                  const xD = exceptXPos + exceptWidth - othersXPos;
                  if (exceptYPos < othersYPos) {
                    const yD = exceptYPos + exceptHeight - othersYPos
                    if (xD < yD) {
                      otherComponent.x += xD;
                      //at left
                    } else {
                      otherComponent.y += yD;
                      //at top
                    }
                  } else {
                    const yD = othersYPos + othersHeight - exceptYPos;
                    if (xD < yD) {
                      otherComponent.x += xD;
                      //at left
                    } else {
                      otherComponent.y -= yD;
                      //at bottom
                    }
                  }
                } else {
                  const xD = othersXPos + othersWidth - exceptXPos;
                  if (exceptYPos < othersYPos) {
                    const yD = exceptYPos + exceptHeight - othersYPos;
                    if (xD < yD) {
                      otherComponent.x -= xD;
                      //at right
                    } else {
                      otherComponent.y += yD
                      //at top
                    }
                  } else {
                    const yD = othersYPos + othersHeight - exceptYPos;
                    if (xD < yD) {
                      otherComponent.x -= xD;
                      //at right
                    } else {
                      otherComponent.y -= yD
                      //at bottom
                    }
                  }
                }
              }

              currentComponent.onCollision && currentComponent.onCollision(otherComponent);

            }
          };
        }
      }
      currentComponent.gravity && gravity(currentComponent);
      (currentComponent.y > height ||
        currentComponent.y < 0 ||
        currentComponent.x > width ||
        currentComponent.x < 0) &&
      remove(currentComponent);
      // currentComponent.name === 'boy' && checkForBoy(currentComponent);
    }
    frame++;
    for (const e of loopCommands.values()) {
      e[1]++;
    }
    requestAnimationFrame(gameLoop);
  };
  gameLoop();
};

const loop = (func, speed) => {
  if (!loopCommands.get(func)) {
    loopCommands.set(func, [func, 0]);
    func();
  }
  if (loopCommands.get(func)[1] >= speed) {
    func();
    loopCommands.set(func, [func, 0]);
  }
}
export const component = obj => new Component(obj);

/**--------------
 *
 * TEST AREA
 *
 * -----------------------*/

const bullet = e =>
  component({
    props: {
      name: "bullet",
      color: "yellow",
      mass: 1,
      x: !e.facingLeft ? e.x + 50 : e.x - 10,
      y: e.y + 25,
      w: 10,
      h: 3,
      facingLeft: e.facingLeft
    },
    states: {
      default () {
        !this.facingLeft ? (this.x += 10) : (this.x -= 10);
      }
    }
  });


const redBox = component({
  props: {
    name: "boy",
    mass: 10,
    w: 50,
    h: 50,

    // x: 600,
    // y: 200,
    // lv: 0,
    // rv: 0,
    // uv: 0,
    // dv: 0,

    x: 40,
    y: 20,
    lv: 5,
    rv: 5,
    uv: 5,
    dv: 5,
    facingLeft: false,
    rigidBody: true,
    // canJump: false,
    // gravity: true,
    canCollide: true,
    reactsWith: {
      enemy: true
    },
    animations: {
      spriteSheet: "./assets/img/sprite-sheet.png",
      imageSizeX: 50,
      imageSizeY: 50,
      speed: 10,
      frameWidth: 400,
      frameHeight: 450,

      //animations
      downAnim: [0, 0, 4],
      rightAnim: [3, 0, 4],
      leftAnim: [2, 0, 4],
      upAnim: [1, 0, 4],
      idle: [0, 0, 1]
    },
  },
  states: {
    default () {
      // if (this.y >= 700 && this.gravity) {
      //   this.gravity = false;
      //   this.y = this.y;
      //   this.canJump = true;
      // }
      if (this.x < 10) this.x = 10;
      else if (this.x > 950) this.x = 950;
    },
    controls: {
      ArrowUp(e) {
        e.animate('upAnim');
        e.y -= e.uv;
        // if(!redBox.canJump) return;
        // redBox.canJump = false;
        // let max = 0;
        // redBox.gravity = false;
        // redBox.jump = () => {
        //   if(max === 60){
        //     redBox.gravity = true;
        //     return
        //   }
        //   redBox.y -= 30;
        //   max += 5;
        //   requestAnimationFrame(redBox.jump);
        // }
        // redBox.jump();
      },
      ArrowDown(e) {
        e.animate('downAnim');
        e.y += e.dv;
      },
      ArrowLeft(e) {
        e.animate('leftAnim');
        e.x -= e.lv;
        e.facingLeft = true;
      },
      ArrowRight(e) {
        e.animate('rightAnim');
        e.x += e.rv;
        e.facingLeft = false;
      },
      d(e) {
        loop(shoot, 10);
      }
    },
    onCollision(e) {

    }
  }
});
const shoot = () => bullet(redBox).facingLeft = redBox.facingLeft;

// document.addEventListener('keyup', e => {
//   redBox.animate('idle');
// })

/**
 * @param 
 */
const enemy = () =>
  component({
    props: {
      name: 'enemy',
      mass: 10,
      x: undefined,
      y: undefined,
      w: 50,
      h: 50,
      gravity: false,
      bounds: {},
      isHit: false,
      r: undefined,
      uv: 10,
      dv: 10,
      canCollide: true,
      reactsWith: {
        bullet: true,
        enemy: true,
        boy: true
      },
      rigidBody: true
    },
    states: {
      default () {
        this.isHit ?
          (this.color = 'red') :
          (this.color = 'yellow');
        this.isHit = false;
        // if (this.y >= 700) {
        //   this.r = false;
        // } else if (this.y <= 100) {
        //   this.r = true;
        // }
        //  (this.r ? (this.y += this.uv) : (this.y -=this.dv));
      },
      onCollision(e) {
        if (e.name === "bullet") {
          this.isHit = true
          remove(e);
        };
        // console.log('p')
      }
    }
  });
// const c1 = enemy();
// c1.x = 200;
// c1.y = 500;
// c1.normalColor = 'white';
// const c2 = enemy();
// c2.name = 'c2'
// c2.x = 600;
// c2.y = 700;
// c2.normalColor = '#00D4FF';
const block2 = enemy();
block2.y = 400;
block2.x = 600;
block2.w = 100;
block2.h = 300;
const block = enemy();
block.y = 300;
block.x = 450;
block.w = 50;
block.h = 200;
const block4 = enemy();
block4.y = 100;
block4.x = 100;
block4.w = 100;
block4.h = 50;
const block3 = enemy();
block3.y = 600;
block3.x = 300;
block3.w = 100;
block3.h = 50;



// const a = redBox.id,
//     b = c2.id,
//     c = renderCommands.slice(a, 1)[0],
//     d = renderCommands.slice(b)[0];
// renderCommands[a] = d;
// renderCommands[b] = c; //switch id's

initScene(0, 0, 1000, 790, {
  color: "grey"
});