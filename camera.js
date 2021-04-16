import { allComponentData } from "./components";
import { ctx } from "./render";

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

export class Camera {
  constructor({ focus, focusX, focusY, focusWidth, focusHeight, view, shake }) {
    observe(focus, "x");
    observe(focus, "y");

    this.track = () => {
      let { [focus.id]: currentComponent, ...others } = allComponentData;

      others = Object.values(others);

      if (focus.x + focus.w > focusX + focusWidth) {
        focus.x -= focus.x + focus.w - (focusX + focusWidth);
        others.forEach(item => {
          item.x -= Math.abs(focus.x - focus._PREVIOUS_VALUE_x);
        });
      } else if (focus.x < focusX) {
        focus.x += focusX - focus.x;
        others.forEach(item => {
          item.x += Math.abs(focus._PREVIOUS_VALUE_x - focus.x);
        });
      }

      if (focus.y + focus.h > focusY + focusHeight) {
        focus.y -= focus.y + focus.h - (focusY + focusHeight);
        others.forEach(item => {
          item.y -= Math.abs(focus.y - focus._PREVIOUS_VALUE_y);
        });
      } else if (focus.y < focusY) {
        focus.y += focusY - focus.y;
        others.forEach(item => {
          item.y += Math.abs(focus._PREVIOUS_VALUE_y - focus.y);
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
