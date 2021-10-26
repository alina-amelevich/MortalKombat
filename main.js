'use strict'

import { logs } from "./logs.js";

const $arenas = document.querySelector('.arenas');
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
    const { player, name, hp, img } = playerObj;
    const $player = createElement('div', `player${player}`);
    const $progressbar = createElement('div', 'progressbar');
    const $character = createElement('div', 'character');
    const $life = createElement('div', 'life');
    const $name = createElement('div', 'name');
    const $img = createElement('img');

    $life.style.width = `${hp}%`;
    $name.innerText = name;
    $img.src = img;
    
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
    const {name: name1, hp: hp1} = player1;
    const {name: name2, hp: hp2} = player2;

    if (hp1 === 0 || hp2 === 0 ) {
        $formFight.style.display = 'none';
        createReloadButton();
    }

    if (hp2 === 0 && hp2 < hp1) {
        generateLogs('end', player1, player2);
        $arenas.appendChild(playerWins(name1));
    } else if (hp1 === 0 && hp1 < hp2) {
        generateLogs('end', player2, player1);
        $arenas.appendChild(playerWins(name2));
    } else if (hp1 === 0 && hp2 === 0) {
        generateLogs('draw');
        $arenas.appendChild(playerWins());
    }
}

function generateLogs(type, pl1, pl2, damage) {
// pl1 - наносит удар, pl2 - защищается 
// или pl1 - wins, pl2 - lose

    let text;
    const currentTime = getTime();
    const randomPhrase = logs[type][
        getRandome(logs[type].length) - 1
    ];

    switch (type) {
        case 'hit':
            text = `${currentTime} - ${
                randomPhrase
                    .replace('[playerKick]', pl1.name)
                    .replace('[playerDefence]', pl2.name)
            } -${damage} [${pl2.hp}/100]`;
            break;

        case 'defence':
            text = `${currentTime} - ${
                randomPhrase
                    .replace('[playerKick]', pl1.name)
                    .replace('[playerDefence]', pl2.name)
            }`;
            break;

        case 'end':
            text = `${currentTime} - ${
                randomPhrase
                    .replace('[playerWins]', pl1.name)
                    .replace('[playerLose]', pl2.name)
            }`;
            break;

        case 'draw':
            text = `${currentTime} - ${randomPhrase}`;
            break;

        case 'start':
            text = `${randomPhrase
                .replace('[time]', currentTime)
                .replace('[player1]', pl1.name)
                .replace('[player2]', pl2.name)
            }`;
            break;

        default:
            console.log('что-то пошло не так');
            break;
    }

    const el = `<p>${text}</p>`;
    $chat.insertAdjacentHTML('afterbegin', el);
}

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));

generateLogs('start', player1, player2);

$formFight.addEventListener('submit', (e) => {
    e.preventDefault();
    const enemy = enemyAttack();
    const userPlayer = userAttack();

    console.log('####: a', userPlayer);
    console.log('####: e', enemy);

    if (enemy.hit !== userPlayer.defence) {
        player1.changeHP(enemy.value);
        player1.renderHP();
        generateLogs('hit', player2, player1, enemy.value);
    } else {
        generateLogs('defence', player2, player1);
    }

    if (userPlayer.hit !== enemy.defence) {
        player2.changeHP(userPlayer.value);
        player2.renderHP();
        generateLogs('hit', player1, player2, userPlayer.value);
    } else {
        generateLogs('defence', player1, player2);
    }

    showResult();
});
