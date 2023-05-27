const players = JSON.parse(localStorage.getItem('players') || '') ||
    [
        {
            hp: 100,
            mp: 100
        },
        {
            hp: 100,
            mp: 100
        }
    ];
const skills = {
    KeyQ: {
        min_damage: 5,
        max_damage: 15,
        heal: 0,
        mana: 0,
        cost: 10
    },
    KeyW: {
        min_damage: 0,
        max_damage: 0,
        heal: 20,
        mana: 0,
        cost: 20
    },
    KeyE: {
        min_damage: 0,
        max_damage: 0,
        heal: 0,
        mana: 20,
        cost: 0
    },
    KeyR: {
        min_damage: 40,
        max_damage: 60,
        heal: 0,
        mana: 0,
        cost: 80
    }
};
const score = JSON.parse(localStorage.getItem('score') || '') || [0, 0];
let turn = JSON.parse(localStorage.getItem('turn')  || '') || 0;

window.onload = function () {
    function updateHealthAndMana () {
        players.forEach(function (player, index) {
            document.querySelectorAll('.current-health')[index].style.width = player.hp + '%';
            document.querySelectorAll('.current-mana')[index].style.width = player.mp + '%';
        });
    }

    function updateSkills () {
        players.forEach(function (player, playerIndex) {
            Object.keys(skills).forEach(function (name) {
                const skillKey = name.replace('Key', '');

                if (player.mp < skills[name].cost) {
                    document.getElementById(`skill-${skillKey}-${playerIndex}`).classList.add('disabled');
                } else {
                    document.getElementById(`skill-${skillKey}-${playerIndex}`).classList.remove('disabled');
                }
            });
        });
    }

    function changeTurn () {
        document.querySelectorAll('.turn-icon')[turn].classList.remove('active');

        turn = Number(!turn);

        document.querySelectorAll('.turn-icon')[turn].classList.add('active');
    }

    function updateScore () {
        document.getElementById('score').innerText = score.join(' - ');
    }

    function damage (skill) {
        const { min_damage, max_damage } = skill

        if (min_damage && max_damage) {
            const damage = Math.floor(Math.random() * (max_damage - min_damage + 1) + min_damage);
            const enemy = Number(!turn);
            const totalHealth = players[enemy].hp - damage;

            players[enemy].hp = totalHealth < 0 ? 0 : totalHealth;

            addLog(`<span class="player-name">Player ${turn + 1}</span> gave <span class="damage">${damage}</span> damage to <span class="player-name">Player ${Number(!turn) + 1}.</span>`);
        }
    }

    function heal (skill) {
        if (skill.heal) {
            const totalHealth = players[turn].hp + skill.heal;

            players[turn].hp = totalHealth > 100 ? 100 : totalHealth;

            addLog(`<span class="player-name">Player ${turn + 1}</span> healed <span class="heal">${skill.heal}</span> health.`);
        }
    }

    function mana (skill) {
        if (skill.mana) {
            const totalMana = players[turn].mp + skill.mana;

            players[turn].mp = totalMana > 100 ? 100 : totalMana;

            addLog(`<span class="player-name">Player ${turn + 1}</span> received <span class="mana">${skill.mana}</span> mana.`);
        }

        players[turn].mp -= skill.cost;
    }

    function checkGameStatus () {
        const loserIndex = players.findIndex(player => player.hp === 0);
        const winnerIndex = Number(!loserIndex);

        if (loserIndex > -1) {
            score[winnerIndex] += 1;

            updateScore();
            resetGame();

            return alert('Winner: Player ' + (winnerIndex + 1));
        }

        changeTurn();
    }

    function useSkill (key) {
        const skill = skills[key];

        if (!skill) {
            return;
        }

        if (players[turn].mp < skill.cost) {
            addLog(`<span class="player-name">Player ${turn + 1}</span> not enough mana`);

            return;
        }

        damage(skill);
        heal(skill);
        mana(skill);
        updateHealthAndMana();
        updateSkills();
        checkGameStatus();
        saveGame();
    }

    function saveGame () {
        localStorage.setItem('players', JSON.stringify(players));
        localStorage.setItem('score', JSON.stringify(score));
        localStorage.setItem('turn', turn);
    }

    function addLog (log) {
        const logElement = document.createElement('div');
        const logScreenElement = document.getElementById('log-screen');
        logElement.innerHTML = log;

        logScreenElement.appendChild(logElement);

        logScreenElement.scrollTop = logScreenElement.scrollHeight;
    }

    function clearLogs () {
        document.getElementById('log-screen').innerHTML = '';
    }

    function resetGame () {
        players[0].hp = 100;
        players[0].mp = 100;
        players[1].hp = 100;
        players[1].mp = 100;

        updateHealthAndMana();
        updateSkills();
        clearLogs();
    }

    function setEventListeners () {
        document.addEventListener('keydown', function (event) {
            useSkill(event.code);
        });

        document.getElementById('reset-button').addEventListener('click', resetGame);
    }

    function loadGame () {
        updateHealthAndMana();
        updateSkills();
        checkGameStatus();
    }

    loadGame();
    setEventListeners();
};
