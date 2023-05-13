const limit = window.prompt('limit');
const fibo = [];

for (let i = 0; i < limit; i++) {
    var sayi1 = fibo[fibo.length - 1];
    var sayi2 = fibo[fibo.length - 2];

    if (!sayi1 || !sayi2) {
        fibo.push(1);

        continue
    }

    fibo.push(sayi1 + sayi2);
}

console.log(fibo);
