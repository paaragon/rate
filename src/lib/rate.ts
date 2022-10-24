const A_SECOND = 1000;

function isPromise(p: any) {
    if (typeof p === 'object' && typeof p.then === 'function') {
        return true;
    }

    return false;
}

export function rate<T extends any, Q extends any | void>(fn: (...args: any[]) => Q, perSec: number): (...args: T[]) => Promise<Q> {
    const functions: ((...args: T[]) => any | void)[] = [];
    let time = 0;
    return function (...args: T[]): Promise<Q> {
        functions.push(fn);
        if (functions.length % perSec === 1 && functions.length > 1) {
            time += A_SECOND;
        }
        return new Promise<Q>((res, rej) => {
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
                        (result as Promise<any>).then((r) => res(r));
                    } else {
                        res(result);
                    }
                } catch (e) {
                    rej(e);
                }
            }, time);
        });
    }
}