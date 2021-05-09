import { allComponentData } from "./component";
import { ctx } from "./render";
import { getRandom, interval, newTimingFunction } from "./helper-functions";

const observe = (obj, key) => {
  let val = obj[key];
  Object.defineProperty(obj, key, {
    get() {
      return val;
    },
    set(newVal) {
      obj[`_PREVIOUS_VALUE_${key}`] = val;
      val = newVal;
    }
  });
};
let shakeFactor = [0, 0];
newTimingFunction();
interval(() => {
  shakeFactor = [getRandom(1, 10), getRandom(1, 10)];
}, 5);
export class Camera {
  constructor(props) {
    for (const key in props) {
      this[key] = props[key];
    }
    const { focus } = this;

    observe(focus, "x");
    observe(focus, "y");

    this.track = () => {
      const {
        focus,
        focusX,
        focusY,
        focusWidth,
        focusHeight,
        view,
        shake
      } = this;

      let { [focus.id]: currentComponent, ...others } = allComponentData;

      others = Object.values(others);

      if (focus.x + focus.w > focusX + focusWidth) {
        focus.x -= focus.x + focus.w - (focusX + focusWidth);
        others.forEach(item => {
          item.x -= Math.abs(focus.x - focus._PREVIOUS_VALUE_x) / item.depth;
        });
      } else if (focus.x < focusX) {
        focus.x += focusX - focus.x;
        others.forEach(item => {
          item.x += Math.abs(focus._PREVIOUS_VALUE_x - focus.x) / item.depth;
        });
      }

      if (focus.y + focus.h > focusY + focusHeight) {
        focus.y -= focus.y + focus.h - (focusY + focusHeight);
        others.forEach(item => {
          item.y -= Math.abs(focus.y - focus._PREVIOUS_VALUE_y) / item.depth;
        });
      } else if (focus.y < focusY) {
        focus.y += focusY - focus.y;
        others.forEach(item => {
          item.y += Math.abs(focus._PREVIOUS_VALUE_y - focus.y) / item.depth;
        });
      }
      if (shake) {
        Object.values(allComponentData).forEach(item => {
          item.x += shakeFactor[0] / item.depth;
          item.y += shakeFactor[1] / item.depth;
        });
      }
      if (view) {
        ctx.strokeStyle = "purple";
        ctx.strokeRect(focusX, focusY, focusWidth, focusHeight);
      }
    };

    return this;
  }
}
