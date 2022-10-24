"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rate = void 0;
const A_SECOND = 1000;
function isPromise(p) {
    if (typeof p === 'object' && typeof p.then === 'function') {
        return true;
    }
    return false;
}
function rate(fn, perSec) {
    const functions = [];
    let time = 0;
    return function (...args) {
        functions.push(fn);
        if (functions.length % perSec === 1 && functions.length > 1) {
            time += A_SECOND;
        }
        return new Promise((res, rej) => {
            setTimeout(() => {
                try {
                    const result = fn(...args);
                    setTimeout(() => {
                        functions.shift();
                        if (functions.length % 3 === 0 && time > 0) {
                            time -= A_SECOND;
                        }
                    }, A_SECOND);
                    if (isPromise(result)) {
                        result.then((r) => res(r));
                    }
                    else {
                        res(result);
                    }
                }
                catch (e) {
                    rej(e);
                }
            }, time);
        });
    };
}
exports.rate = rate;
