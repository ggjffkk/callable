const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function multiplyArrayChunk(chunk, multiplier) {
    return new Promise((resolve) => {
        const result = chunk.map(num => num * multiplier);
        resolve(result);
    });
}

async function processArray() {
    const min = await new Promise(resolve => {
        rl.question("Введіть мінімальне значення діапазону: ", answer => {
            resolve(parseInt(answer));
        });
    });

    const max = await new Promise(resolve => {
        rl.question("Введіть максимальне значення діапазону: ", answer => {
            resolve(parseInt(answer));
        });
    });

    const multiplier = await new Promise(resolve => {
        rl.question("Введіть множник: ", answer => {
            resolve(parseInt(answer));
        });
    });

    // генерується масив випадкових чисел
    const size = getRandomInt(40, 60);
    const numbers = Array.from({ length: size }, () => getRandomInt(min, max));

    console.log("Сгенерований масив:", numbers);

    // розбивання масиву на частинки
    const chunkSize = 10;
    const promises = [];

    const startTime = Date.now();

    for (let i = 0; i < numbers.length; i += chunkSize) {
        const chunk = numbers.slice(i, i + chunkSize);
        promises.push(multiplyArrayChunk(chunk, multiplier));
    }

    const results = await Promise.all(promises);
    const flattenedResults = results.flat();

    console.log("Результат:", flattenedResults);

    const endTime = Date.now();
    console.log("Час роботи програми:", endTime - startTime, "мс");

    rl.close();
}

processArray();