import { rate } from '../src/lib/rate';

const A_SECOND = 1000;

describe('Test rate limit with promises', () => {
    test('everything under the limit', async () => {
        const perSecond = 10;
        const ratedConsole = rate(console.log, perSecond);

        const t0 = Date.now();
        await ratedConsole('hello world!');
        const t1 = Date.now();
        expect(t1 - t0).toBeLessThan(A_SECOND);
        await ratedConsole('hello world!');
        const t2 = Date.now();
        expect(t2 - t1).toBeLessThan(A_SECOND);
        await ratedConsole('hello world!');
        const t3 = Date.now();
        expect(t3 - t2).toBeLessThan(A_SECOND);
        await ratedConsole('hello world!');
        const t4 = Date.now();
        expect(t4 - t3).toBeLessThan(A_SECOND);
        await ratedConsole('hello world!');
        const t5 = Date.now();
        expect(t5 - t4).toBeLessThan(A_SECOND);
    });
    test('one over the limit', async () => {
        const perSecond = 4;
        const A_SECOND = 1000;
        const ratedConsole = rate(console.log, perSecond);

        const t0 = Date.now();
        await ratedConsole('hello world!');
        const t1 = Date.now();
        await ratedConsole('hello world!');
        const t2 = Date.now();
        await ratedConsole('hello world!');
        const t3 = Date.now();
        await ratedConsole('hello world!');
        const t4 = Date.now();
        await ratedConsole('hello world!');
        const t5 = Date.now();

        expect(t1 - t0).toBeLessThan(A_SECOND);
        expect(t2 - t1).toBeLessThan(A_SECOND);
        expect(t3 - t2).toBeLessThan(A_SECOND);
        expect(t4 - t3).toBeLessThan(A_SECOND);
        expect(t5 - t4).toBeGreaterThan(A_SECOND);
    });
    test('half over the limit', async () => {
        const perSecond = 3;
        const A_SECOND = 1000;
        const ratedConsole = rate(console.log, perSecond);

        const t0 = Date.now();
        await ratedConsole('hello world!');
        const t1 = Date.now();
        await ratedConsole('hello world!');
        const t2 = Date.now();
        await ratedConsole('hello world!');
        const t3 = Date.now();
        await ratedConsole('hello world!');
        const t4 = Date.now();
        await ratedConsole('hello world!');
        const t5 = Date.now();
        await ratedConsole('hello world!');
        const t6 = Date.now();

        expect(t1 - t0).toBeLessThan(A_SECOND);
        expect(t2 - t1).toBeLessThan(A_SECOND);
        expect(t3 - t2).toBeLessThan(A_SECOND);
        expect(t4 - t3).toBeGreaterThan(A_SECOND);
        expect(t5 - t4).toBeLessThan(A_SECOND);
        expect(t6 - t5).toBeLessThan(A_SECOND);
    });
    test('second and third half over the limit', async () => {
        const perSecond = 3;
        const A_SECOND = 1000;
        const ratedConsole = rate(console.log, perSecond);

        const t0 = Date.now();
        await ratedConsole('hello world!');
        const t1 = Date.now();
        await ratedConsole('hello world!');
        const t2 = Date.now();
        await ratedConsole('hello world!');
        const t3 = Date.now();
        await ratedConsole('hello world!');
        const t4 = Date.now();
        await ratedConsole('hello world!');
        const t5 = Date.now();
        await ratedConsole('hello world!');
        const t6 = Date.now();
        await ratedConsole('hello world!');
        const t7 = Date.now();
        await ratedConsole('hello world!');
        const t8 = Date.now();
        await ratedConsole('hello world!');
        const t9 = Date.now();

        expect(t1 - t0).toBeLessThan(A_SECOND);
        expect(t2 - t1).toBeLessThan(A_SECOND);
        expect(t3 - t2).toBeLessThan(A_SECOND);
        expect(t4 - t3).toBeGreaterThan(A_SECOND);
        expect(t5 - t4).toBeLessThan(A_SECOND);
        expect(t6 - t5).toBeLessThan(A_SECOND);
        expect(t7 - t6).toBeGreaterThan(A_SECOND);
        expect(t8 - t7).toBeLessThan(A_SECOND);
        expect(t9 - t8).toBeLessThan(A_SECOND);
    });
});