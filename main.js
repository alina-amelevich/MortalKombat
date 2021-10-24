'use strict'

const $arenas = document.querySelector('.arenas');
// const $fightButton = document.querySelector('.button');
const $formFight = document.querySelector('.control');
const $chat = document.querySelector('.chat');
const HIT = {
    head: 30,
    body: 25,
    foot: 20,
}
const ATTACK = ['head', 'body', 'foot'];

const player1 = {
    player: 1,
    name: 'KITANA',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/kitana.gif',
    weapon: ['blade', 'gun'],
    changeHP,
    elHP,
    renderHP,
    attack: function() {
        console.log(`${this.name} fight...`);
    },
};

const player2 = {
    player: 2,
    name: 'LIU KANG',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/liukang.gif',
    weapon: ['machete'],
    changeHP,
    elHP,
    renderHP,
    attack: function() {
        console.log(`${this.name} fight...`);
    },
};

function createElement(tag, className) {
    const $tag = document.createElement(tag);
    if (className) {
        $tag.classList.add(className);
    }

    return $tag;
}

function createPlayer(playerObj) {
    const $player = createElement('div', `player${playerObj.player}`);
    const $progressbar = createElement('div', 'progressbar');
    const $character = createElement('div', 'character');
    const $life = createElement('div', 'life');
    const $name = createElement('div', 'name');
    const $img = createElement('img');

    $life.style.width = `${playerObj.hp}%`;
    $name.innerText = playerObj.name;
    $img.src = playerObj.img;
    
    $progressbar.appendChild($life);
    $progressbar.appendChild($name);

    $character.appendChild($img);
    
    $player.appendChild($progressbar);
    $player.appendChild($character);

    return $player;
}

function getTime() {
    const date = new Date();
    const formalizeTime = (number) => `${(number >= 10) ? '' : '0'}${number}`;
    const time = `${formalizeTime(date.getHours())}:${formalizeTime(date.getMinutes())}`;

    return time;
}

function changeHP(damage) {
    this.hp -=damage;

    if (this.hp <= 0) {
        this.hp = 0;
    }
}

function elHP() {
    // console.log(this);
    return document.querySelector(`.player${this.player} .life`);
}

function renderHP() {
    this.elHP().style.width = `${this.hp}%`;
}

function playerWins(name) {
    const $winTitle = createElement('div', 'winTitle');

    if (name) {
        $winTitle.innerText = `${name} wins!`;
    } else {
        $winTitle.innerText = 'Dead heat';
    }

    return $winTitle;
}

function getRandome(max) {
    return Math.floor(Math.random() * (max - 1 + 1) + 1);
}

function createReloadButton() {
    const $reloadWrap = createElement('div', 'reloadWrap');
    const $reloadButton = createElement('button', 'button');

    $reloadButton.innerText = 'Restart';

    $reloadWrap.appendChild($reloadButton);
    $arenas.appendChild($reloadWrap);

    $reloadButton.addEventListener('click', () => {
        window.location.reload();
    });
}

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));

function enemyAttack() {
    const hit = ATTACK[getRandome(3) - 1];
    const defence = ATTACK[getRandome(3) - 1];

    return {
        value: getRandome(HIT[hit]),
        hit,
        defence,
    }
}
function userAttack() {
    const attack = {};

    for (let item of $formFight) {
        if (item.checked && item.name === 'hit') {
            attack.value = getRandome(HIT[item.value]);
            attack.hit = item.value;
        }
    
        if (item.checked && item.name === 'defence') {
            attack.defence = item.value;
        }

        item.checked = false;
    }

    return attack;
}

function showResult() {
    if (player1.hp === 0 || player2.hp === 0 ) {
        // $fightButton.disabled = true;
        $formFight.style.display = 'none';
        createReloadButton();
    }

    if (player1.hp === 0 && player1.hp < player2.hp) {
        $arenas.appendChild(playerWins(player2.name));
    } else if (player2.hp === 0 && player2.hp < player1.hp) {
        $arenas.appendChild(playerWins(player1.name));
    } else if (player1.hp === 0 && player2.hp === 0) {
        $arenas.appendChild(playerWins());
    }
}

function generateLogs(type, pl1, pl2) {
    const text = `${getTime()} - ${window.logs[type][getRandome(window.logs[type].length) - 1].replace('[playerKick]', pl1.name).replace('[playerDefence]', pl2.name)}`;
    // console.log(text);
    const el = `<p>${text}</p>`;
    $chat.insertAdjacentHTML('afterbegin', el);
}

$formFight.addEventListener('submit', (e) => {
    e.preventDefault();
    const enemy = enemyAttack();
    const userPlayer = userAttack();

    console.log('####: a', userPlayer);
    console.log('####: e', enemy);

    if (enemy.hit !== userPlayer.defence) {
        player1.changeHP(enemy.value);
        player1.renderHP();
        generateLogs('hit', player2, player1);
    }
    if (userPlayer.hit !== enemy.defence) {
        player2.changeHP(userPlayer.value);
        player2.renderHP();
        generateLogs('hit', player1, player2);
    }

    showResult();
});
