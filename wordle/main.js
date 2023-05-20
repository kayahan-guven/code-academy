const realWord = 'dergi';
let currentRow = 0;

window.onload = function () {
    function checkLetter (letter, letterIndex, statusClass) {
        const rowElement = document.querySelectorAll('.wrapper table > tbody > tr')[currentRow];

        rowElement.querySelectorAll('td')[letterIndex].textContent = letter;
        rowElement.querySelectorAll('td')[letterIndex].classList.add(statusClass);
    }

    function validateWord (word) {
        return word.length === 5;
    }

    function isGameOver (word) {
        setTimeout(function () {
            if (word === realWord) {
                alert('Win');
            } else if (currentRow === 6) {
                alert('Lost');
            }
        }, 300)
    }

    function checkWordStatus (word) {
        word.split('').forEach(function (letter, index) {
            if (realWord[index] === letter) {
                checkLetter(letter, index, 'true');
            } else if (realWord.includes(letter)) {
                checkLetter(letter, index, 'semi-true');
            } else {
                checkLetter(letter, index, 'fail');
            }
        });

        isGameOver(word);
    }

    function goToNextRow () {
        currentRow += 1;
    }

    document.getElementById('guessTxt').addEventListener('keydown', function (event) {
        const word = document.getElementById('guessTxt').value.trim().toLowerCase();

        if (event.code === 'Enter' && validateWord(word)) {
            checkWordStatus(word);
            goToNextRow();
        }
    });
}
