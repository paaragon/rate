import { rate } from './lib/rate';

(async () => {
    const perSecond = 3;

    const ratedConsole = rate(console.log, perSecond);

    for (let i = 0; i < 9; i++) {
        await ratedConsole(`${i}`);
    }

    setTimeout(async () => {
        console.log(new Date(), `Segundo lote de ejecuciones`);
        for (let i = 9; i < 18; i++) {
            await ratedConsole(`${i}`);
        }
    }, 9000);
})();