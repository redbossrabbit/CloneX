const scene = document.createElement("canvas");
document.body.append(scene);

const game = scene.getContext("2d"),
  keyboardVals = {},
  renderCommands = [],
  allComponentData = {};


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
    allComponentData[id] = this;
    this.command = () => {
      this.color &&
        (() => {
          game.fillStyle = this.color;
          game.fillRect(this.x, this.y, this.w, this.h);
        })();
      this.image && game.drawImage(this.image, this.x, this.y, 50, 50);
      return this;
    };
    renderCommands.push(this.command);
    id++;
  }
}

const remove = component => {
  delete allComponentData[component.id];
  renderCommands.splice(renderCommands.indexOf(component.command), 1);
};

let g = 20;
const gravity = component => (component.y += g);

export const initScene = (xcor, ycor, width, height, obj) => {
  scene.width = width;
  scene.height = height;
  window.addEventListener(
    "keydown",
    e => {
      keyboardVals[e.key] = true;
    },
    true
  );
  window.addEventListener(
    "keyup",
    e => {
      keyboardVals[e.key] = false;
    },
    true
  );
  const gameLoop = () => {
    game.clearRect(xcor, ycor, obj.w || width, obj.h || height);
    game.fillStyle = obj.color;
    game.fillRect(xcor, ycor, width, height);
    for (let i = 0; i < renderCommands.length; i++) {

      const currentComponent = renderCommands[i]();
      let currentPress = {};
      currentComponent.controls &&
        Object.keys(currentComponent.controls).forEach(e => {//culprit
          const key = keyboardVals[e];
          if(key){
          currentComponent.controls[e](currentComponent);
          currentPress = {...currentPress, [e]: true};
          }
        });
      currentComponent.default && currentComponent.default();

      if (currentComponent.bounds && currentComponent.moveable) {

        const {
          [currentComponent.id]: except, ...others
        } = allComponentData,
        othersArr = Object.keys(others);
        // const collidingWith = new Map();
        for (let e = 0; e < othersArr.length; e++) {
          const otherComponent = others[othersArr[e]];

          // console.log(dir);

          if (otherComponent.bounds) {
            const exceptXPos = currentComponent.bounds.x,
              exceptYPos = currentComponent.bounds.y,
              exceptWidth = currentComponent.bounds.w,
              exceptHeight = currentComponent.bounds.h,
              othersXPos = otherComponent.bounds.x,
              othersYPos = otherComponent.bounds.y,
              othersWidth = otherComponent.bounds.w,
              othersHeight = otherComponent.bounds.h;
              
            if (exceptXPos <= othersXPos + othersWidth &&
              othersXPos <= exceptXPos + exceptWidth &&
              exceptYPos <= othersYPos + othersHeight &&
              othersYPos <= exceptYPos + exceptHeight) {

              // currentComponent.onCollision &&
              //   currentComponent.onCollision(otherComponent);
                currentComponent.isColliding = true;
            } else {
              currentComponent.isColliding = false;
            }


            // alert = () => {
            //   currentComponent.onCollision &&
            //     currentComponent.onCollision(otherComponent, collisionData);
            // };
            if (currentComponent.rigidBody) {
              if (
                exceptYPos < othersYPos + othersHeight &&
                othersYPos < exceptYPos + exceptHeight
              ) {
                if (
                  currentPress['ArrowRight'] &&
                  currentComponent.x < otherComponent.x + otherComponent.w &&
                  currentComponent.x + currentComponent.w + currentComponent.rv > otherComponent.x
                ) {
                  // collisionData.fromLeft = true;
                  currentComponent.x = otherComponent.x - currentComponent.w;
                }

                if (
                  currentPress['ArrowLeft'] &&
                  currentComponent.x > otherComponent.x &&
                  currentComponent.x - currentComponent.lv <
                  otherComponent.x + otherComponent.w
                ) {
                  // collisionData.fromRight = true;
                  currentComponent.x = otherComponent.x + otherComponent.w;
                }
              }

              if (
                exceptXPos < othersXPos + othersWidth &&
                othersXPos < exceptXPos + exceptWidth
              ) { 
                if (
                  currentPress['ArrowDown'] &&
                  currentComponent.y < otherComponent.y + otherComponent.h && 
                    currentComponent.y + currentComponent.h + currentComponent.dv >
                    otherComponent.y 
                    // || currentComponent.y + currentComponent.h + g >
                    // otherComponent.y
                    // needs clean up
                ) {
                  // collisionData.fromTop = true;
                  currentComponent.y = otherComponent.y - currentComponent.h;//needs clean up for game type, top-down or side scroller
                  // currentComponent.canJump = true;
                  // g = 0;
                }

                if (
                  currentPress['ArrowUp'] &&
                  currentComponent.y > otherComponent.y &&
                  currentComponent.y - currentComponent.uv <
                  otherComponent.y + otherComponent.h
                ) {
                  // collisionData.fromBottom = true;
                  currentComponent.y = otherComponent.y + otherComponent.h;
                  // currentComponent.gravity = true;
                  // g = 20;
                }
              }
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
    }
    requestAnimationFrame(gameLoop);
  };
  gameLoop();
};

export const component = obj => new Component(obj);


/**--------------
 *
 * TEST AREA
 *
 * -----------------------*/

const fire = e =>
  component({
    props: {
      name: "bullet",
      color: "yellow",
      mass: 1,
      x: !e.facingLeft ? e.x + 50 : e.x - 10,
      y: e.y + 25,
      w: 10,
      h: 3,
      gravity: false,
      bounds: {},
      facingLeft: false,
      moveable: true
    },
    states: {
      default () {
        !this.facingLeft ? (this.x += 10) : (this.x -= 10);
        this.bounds.x = this.x;
        this.bounds.y = this.y;
        this.bounds.w = this.w;
        this.bounds.h = this.h;
      },
      onCollision(e) {
        e.name !== "bullet" && (e.isHit = true);
        remove(this);
      }
    }
  });

let canFire = true,
  img = document.createElement("img"),
  imgFlipped = document.createElement("img");

img.setAttribute("src", "./boy.png");
imgFlipped.setAttribute("src", "./boy-flipped.png");

let isCollidingWithBLock;
let check;
const redBox = component({
  props: {
    name: "boy",
    image: img,
    mass: 10,
    x: 40,
    y: 20,
    w: 50,
    h: 50,
    lv: 10,
    rv: 10,
    uv: 10,
    dv: 10,
    jv: 20,
    // gravity: true,
    facingLeft: false,
    moveable: true,
    bounds: {},
    rigidBody: true,
    isColliding: false,
    collisionData: {},
    canJump: false
  },
  states: {
    default () {
      if (this.y >= 700 && this.gravity) {
        this.gravity = false;
        this.y = this.y;
        this.canJump = true;
      }
      if (this.x < 10) this.x = 10;
      else if (this.x > 950) this.x = 950;
      this.bounds.x = this.x;
      this.bounds.y = this.y;
      this.bounds.w = this.w;
      this.bounds.h = this.h;
      check = [];
    },
    controls: {
      ArrowUp(e) {
        e.y -= e.uv;
      },
      ArrowDown(e) {
        e.y += e.dv;
      },
      ArrowLeft(e) {
        e.x -= e.lv;
      },
      ArrowRight(e) {
        e.x += e.rv;
      },
      d(e) {
        if (canFire) {
          fire(e).facingLeft = e.facingLeft;
          canFire = false;
          setTimeout(() => {
            canFire = true;
          }, 50);
        }
      }
    },
    onCollision(e) {}
  }
});

const onPress = {
  ArrowLeft: true,
  ArrowRight: true,
  ArrowUp: true
};

Object.keys(onPress).forEach(e => {
  let val = onPress[e];
  Object.defineProperty(onPress, e, {
    get() {
      return val;
    },
    set(newVal) {
      if (!newVal) {
        const {
          [e]: except, ...others
        } = onPress;
        Object.keys(others).forEach(i => {
          onPress[i] = true;
        });
      }
      val = newVal;
    }
  });
});

document.addEventListener("keydown", e => {
  const val = e.key;
  switch (true) {
    case val === "ArrowLeft" && onPress[val]:
      onPress[val] = false;
      redBox.image = imgFlipped;
      redBox.facingLeft = true;
      break;
    case val === "ArrowRight" && onPress[val]:
      onPress[val] = false;
      redBox.image = img;
      redBox.facingLeft = false;
      break;
    // case val === "ArrowUp" && onPress[val]:
    //   // onPress[val] = false;
    //   if (!redBox.canJump) return;
    //   redBox.canJump = false;
    //   let max = 0;
    //   redBox.gravity = false;
    //   redBox.jump = () => {
    //     if (max === 60) {
    //       redBox.gravity = true;
    //       return;
    //     }
    //     redBox.y -= redBox.jv;
    //     max+=5;
    //     requestAnimationFrame(redBox.jump)
    //   }
    //   redBox.jump()
    //   break;
  }
});

const enemy = () =>
  component({
    props: {
      mass: 10,
      x: undefined,
      y: undefined,
      w: 50,
      h: 50,
      gravity: false,
      bounds: {},
      isHit: false,
      hitColor: "red",
      normalColor: undefined,
      r: undefined
    },
    states: {
      default () {
        this.isHit ?
          (this.color = this.hitColor) :
          (this.color = this.normalColor);
        this.isHit = false;
        // if (this.y >= 700) {
        //   this.r = false;
        // } else if (this.y <= 100) {
        //   this.r = true;
        // }
        // this.name !== "block" && (this.r ? (this.y += 5) : (this.y -= 5));
        this.bounds.x = this.x;
        this.bounds.y = this.y;
        this.bounds.w = this.w;
        this.bounds.h = this.h;
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
const block = enemy();
block.name = "block";
block.y = 300;
block.x = 450;
block.w = 50;
block.h = 200;
block.normalColor = "#FFCC00";
const block2 = enemy();
block2.name = "block";
block2.y = 400;
block2.x = 600;
block2.w = 100;
block2.h = 300;
block2.normalColor = "#FFCC00";
const block3 = enemy();
block3.name = "block2";
block3.y = 600;
block3.x = 200;
block3.w = 100;
block3.h = 50;
block3.normalColor = "#FFCC00";

// const a = redBox.id,
//     b = c2.id,
//     c = renderCommands.slice(a, 1)[0],
//     d = renderCommands.slice(b)[0];
// renderCommands[a] = d;
// renderCommands[b] = c; //switch id's

initScene(0, 0, 1000, 790, {
  color: "#4d4d4d"
});