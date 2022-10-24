"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const main_1 = require("../src/main");
const A_SECOND = 1000;
describe('Test rate limit with promises', () => {
    test('everything under the limit', () => __awaiter(void 0, void 0, void 0, function* () {
        const perSecond = 10;
        const ratedConsole = (0, main_1.rate)(console.log, perSecond);
        const t0 = Date.now();
        yield ratedConsole('hello world!');
        const t1 = Date.now();
        expect(t1 - t0).toBeLessThan(A_SECOND);
        yield ratedConsole('hello world!');
        const t2 = Date.now();
        expect(t2 - t1).toBeLessThan(A_SECOND);
        yield ratedConsole('hello world!');
        const t3 = Date.now();
        expect(t3 - t2).toBeLessThan(A_SECOND);
        yield ratedConsole('hello world!');
        const t4 = Date.now();
        expect(t4 - t3).toBeLessThan(A_SECOND);
        yield ratedConsole('hello world!');
        const t5 = Date.now();
        expect(t5 - t4).toBeLessThan(A_SECOND);
    }));
    test('one over the limit', () => __awaiter(void 0, void 0, void 0, function* () {
        const perSecond = 4;
        const A_SECOND = 1000;
        const ratedConsole = (0, main_1.rate)(console.log, perSecond);
        const t0 = Date.now();
        yield ratedConsole('hello world!');
        const t1 = Date.now();
        yield ratedConsole('hello world!');
        const t2 = Date.now();
        yield ratedConsole('hello world!');
        const t3 = Date.now();
        yield ratedConsole('hello world!');
        const t4 = Date.now();
        yield ratedConsole('hello world!');
        const t5 = Date.now();
        expect(t1 - t0).toBeLessThan(A_SECOND);
        expect(t2 - t1).toBeLessThan(A_SECOND);
        expect(t3 - t2).toBeLessThan(A_SECOND);
        expect(t4 - t3).toBeLessThan(A_SECOND);
        expect(t5 - t4).toBeGreaterThan(A_SECOND);
    }));
    test('half over the limit', () => __awaiter(void 0, void 0, void 0, function* () {
        const perSecond = 3;
        const A_SECOND = 1000;
        const ratedConsole = (0, main_1.rate)(console.log, perSecond);
        const t0 = Date.now();
        yield ratedConsole('hello world!');
        const t1 = Date.now();
        yield ratedConsole('hello world!');
        const t2 = Date.now();
        yield ratedConsole('hello world!');
        const t3 = Date.now();
        yield ratedConsole('hello world!');
        const t4 = Date.now();
        yield ratedConsole('hello world!');
        const t5 = Date.now();
        yield ratedConsole('hello world!');
        const t6 = Date.now();
        expect(t1 - t0).toBeLessThan(A_SECOND);
        expect(t2 - t1).toBeLessThan(A_SECOND);
        expect(t3 - t2).toBeLessThan(A_SECOND);
        expect(t4 - t3).toBeGreaterThan(A_SECOND);
        expect(t5 - t4).toBeLessThan(A_SECOND);
        expect(t6 - t5).toBeLessThan(A_SECOND);
    }));
    test('second and third half over the limit', () => __awaiter(void 0, void 0, void 0, function* () {
        const perSecond = 3;
        const A_SECOND = 1000;
        const ratedConsole = (0, main_1.rate)(console.log, perSecond);
        const t0 = Date.now();
        yield ratedConsole('hello world!');
        const t1 = Date.now();
        yield ratedConsole('hello world!');
        const t2 = Date.now();
        yield ratedConsole('hello world!');
        const t3 = Date.now();
        yield ratedConsole('hello world!');
        const t4 = Date.now();
        yield ratedConsole('hello world!');
        const t5 = Date.now();
        yield ratedConsole('hello world!');
        const t6 = Date.now();
        yield ratedConsole('hello world!');
        const t7 = Date.now();
        yield ratedConsole('hello world!');
        const t8 = Date.now();
        yield ratedConsole('hello world!');
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
    }));
});
