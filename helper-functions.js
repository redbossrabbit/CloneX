export const loopCommands = new Map();
export const loop = (func, speed) => {
    if (!loopCommands.get(func)) {
        loopCommands.set(func, [func, 0]);
        func();
    }
    if (loopCommands.get(func)[1] >= speed) {
        func();
        loopCommands.set(func, [func, 0]);
    }
}