document.getElementById('sum').addEventListener('click', function () {
    const firstNumber = Number(document.getElementById('first-number').value);
    const secondNumber = Number(document.getElementById('second-number').value);
    const vize = firstNumber * 0.3;
    const final = secondNumber * 0.7;
    const sonuc = vize + final;

    if (sonuc < 40) {
        alert('Kaldınız... Sonuc: ' + sonuc);
    } else {
        alert('Geçtiniz... Sonuc: ' + sonuc);
    }
});
