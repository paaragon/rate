import { rate } from './lib/rate';

const perSecond = 3;

function functionWithCallback(message: string, cb: (err?: any) => void) {
    // console.log(message);
    cb();
}

const ratedConsole = rate(functionWithCallback, perSecond);

for (let i = 0; i < 9; i++) {
    ratedConsole(`${i}`, () => {
        console.log(new Date(), `< ejecutado ${i}`);
    });
}

setTimeout(() => {
    console.log(new Date(), `Segundo lote de ejecuciones`);
    for (let i = 9; i < 18; i++) {
        ratedConsole(`${i}`, () => {
            console.log(new Date(), `< ejecutado ${i}`);
        });
    }
}, 9000);