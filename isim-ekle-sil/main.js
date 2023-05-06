document.getElementById('add').addEventListener('click', isimEkle);
document.getElementById('remove').addEventListener('click', isimSil);

const isimler = [];

function isimleriDuzenle () {
    document.getElementById('names').innerHTML = '';

    isimler.forEach(function (isim) {
        document.getElementById('names').innerHTML += '<li>'+isim+'</li>';
    });
}

function isimEkle () {
    const isimElement = document.getElementById('isim');
    const isim = isimElement.value;

    isimler.push(isim);
    console.log(isimler)

    isimElement.value = '';
    isimleriDuzenle();
}

function isimSil () {
    const isimElement = document.getElementById('isim');
    const isim = isimElement.value;
    const index = isimler.findIndex(item => item === isim);

    isimler.splice(index, 1);

    isimleriDuzenle();
}

