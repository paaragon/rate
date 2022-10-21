import { rate } from '../src/main';

describe('Test rate limit', () => {
    test('example of test', async () => {
        const ratedConsole = rate(console.log, 1000);

        ratedConsole('hello world!');
        ratedConsole('hello world!');
        ratedConsole('hello world!');
        ratedConsole('hello world!');
        ratedConsole('hello world!');
    });
});