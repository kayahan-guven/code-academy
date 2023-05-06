let sonuc = 0;

function ekranaYaz (sayi) {
    const screen = document.getElementById('screen');

    if (screen.value === '0') {
        screen.value = '';
    }

    screen.value += sayi;
}

function topla () {
    sonuc += Number(document.getElementById('screen').value);

    document.getElementById('screen').value = '';
}

function essittir () {
    console.log(sonuc);
    document.getElementById('screen').value = sonuc;
}

document.addEventListener('click', function (event) {
    const type = event.target.getAttribute('name');

    if (type === 'number') {
        ekranaYaz(event.target.textContent)
    }

    if (type === 'topla') {
        topla();
    }

    if (type === 'esittir') {
        essittir();
    }
});
