const randomGenerator = (cant) => {
    const result = {};

    for (let i = 0; i < cant; i++) {
        const random = Math.floor(Math.random() * 1000) + 1;

        if (!result[random]) {
            result[random] = 0;
        }

        result[random]++;
    }

    return result;
}

const cant = process.argv[2];
const result = randomGenerator(cant);
process.send(result);