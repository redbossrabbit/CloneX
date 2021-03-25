import { allComponentData } from "./components";

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
  constructor({ focus, focusX, focusY, focusWidth, focusHeight }) {
    observe(focus, "x");
    observe(focus, "y");

    this.track = () => {
      let { [focus.id]: currentComponent, ...others } = allComponentData;

      others = Object.values(others);

      if (focus.x + focus.w > focusX + focusWidth) {
        others.forEach(item => {
          item.x -= focus.x - focus._PREVIOUS_VALUE_x || 0;
        });
        focus.x -= focus.x + focus.w - (focusX + focusWidth);
      } else if (focus.x < focusX) {
        others.forEach(item => {
          item.x += focus._PREVIOUS_VALUE_x || 0 - focus.x;
        });
        focus.x += focusX - focus.x;
      }

      if (focus.y + focus.h > focusY + focusHeight) {
        others.forEach(item => {
          item.y -= focus.y - focus._PREVIOUS_VALUE_y || 0;
        });
        focus.y -= focus.y + focus.h - (focusY + focusHeight);
      } else if (focus.y < focusY) {
        others.forEach(item => {
          item.y += focus._PREVIOUS_VALUE_y || 0 - focus.y;
        });
        focus.y += focusY - focus.y;
      }
    };
    return this;
  }
}
