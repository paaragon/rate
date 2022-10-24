import { rate } from '../src/lib/rate';

const A_SECOND = 1000;

function functionWithCallback(message: string, cb: (err?: any) => void) {
    // console.log(message);
    cb();
}

describe('Test rate limit with callbacks', () => {
    test('only one call with callback', (done) => {
        const perSecond = 10;
        const ratedConsole = rate(functionWithCallback, perSecond);

        ratedConsole('hello world!', () => {
            done();
        });
    });
    test('everything under the limit', (done) => {
        const perSecond = 10;
        const ratedConsole = rate(functionWithCallback, perSecond);

        const t0 = Date.now();
        ratedConsole('hello world!', () => {
            expect(Date.now() - t0).toBeLessThan(A_SECOND);
        });

        ratedConsole('hello world!', () => {
            expect(Date.now() - t0).toBeLessThan(A_SECOND);
        });

        ratedConsole('hello world!', () => {
            expect(Date.now() - t0).toBeLessThan(A_SECOND);
        });

        ratedConsole('hello world!', () => {
            expect(Date.now() - t0).toBeLessThan(A_SECOND);
        });

        ratedConsole('hello world!', () => {
            expect(Date.now() - t0).toBeLessThan(A_SECOND);
            done();
        });
    });
    test('Half over the limit', (done) => {
        const perSecond = 3;
        const ratedConsole = rate(functionWithCallback, perSecond);

        const t0 = Date.now();
        ratedConsole('hello world!', () => {
            expect(Date.now() - t0).toBeLessThan(A_SECOND);
        });

        ratedConsole('hello world!', () => {
            expect(Date.now() - t0).toBeLessThan(A_SECOND);
        });

        ratedConsole('hello world!', () => {
            expect(Date.now() - t0).toBeLessThan(A_SECOND);
        });

        let t1: number;
        ratedConsole('hello world!', () => {
            t1 = Date.now();
            expect(t1 - t0).toBeGreaterThanOrEqual(A_SECOND);
        });

        ratedConsole('hello world!', () => {
            expect(Date.now() - t1).toBeLessThan(A_SECOND);
        });

        ratedConsole('hello world!', () => {
            expect(Date.now() - t1).toBeLessThan(A_SECOND);
            done();
        });
    });

    test('second and third half over the limit', (done) => {
        const perSecond = 3;
        const A_SECOND = 1000;
        const ratedConsole = rate(functionWithCallback, perSecond);

        const t0 = Date.now();
        ratedConsole('hello world!', () => {
            console.log('Ejecutando 1', new Date());
            expect(Date.now() - t0).toBeLessThan(A_SECOND);
        });
        ratedConsole('hello world!', () => {
            console.log('Ejecutando 2', new Date());
            expect(Date.now() - t0).toBeLessThan(A_SECOND);
        });
        ratedConsole('hello world!', () => {
            console.log('Ejecutando 3', new Date());
            expect(Date.now() - t0).toBeLessThan(A_SECOND);
        });
        let t1: number;
        ratedConsole('hello world!', () => {
            t1 = Date.now();
            console.log('Ejecutando 4', new Date());
            expect(t1 - t0).toBeGreaterThanOrEqual(A_SECOND);
        });
        ratedConsole('hello world!', () => {
            console.log('Ejecutando 5', new Date());
            expect(Date.now() - t1).toBeLessThan(A_SECOND);
        });
        ratedConsole('hello world!', () => {
            console.log('Ejecutando 6', new Date());
            expect(Date.now() - t1).toBeLessThan(A_SECOND);
        });
        let t2: number;
        ratedConsole('hello world!', () => {
            t2 = Date.now();
            console.log('Ejecutando 7', new Date());
            expect(t2 - t1).toBeGreaterThanOrEqual(A_SECOND);
        });
        ratedConsole('hello world!', () => {
            console.log('Ejecutando 8', new Date());
            expect(Date.now() - t2).toBeLessThan(A_SECOND);
        });
        ratedConsole('hello world!', () => {
            console.log('Ejecutando 9', new Date());
            expect(Date.now() - t2).toBeLessThan(A_SECOND);
            done();
        });
    });
});