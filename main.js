'use strict'
import { player1, player2 } from "./players.js";
import { createElement, getTime, getRandome } from "./utils.js";
import { $formFight, userAttack, enemyAttack } from "./fight.js";
import { logs } from "./logs.js";

const $arenas = document.querySelector('.arenas');
const $chat = document.querySelector('.chat');


const createPlayer = (playerObj) => {
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

const playerWins = (name) => {
    const $winTitle = createElement('div', 'winTitle');

    if (name) {
        $winTitle.innerText = `${name} wins!`;
    } else {
        $winTitle.innerText = 'Dead heat';
    }

    return $winTitle;
}

const createReloadButton = () => {
    const $reloadWrap = createElement('div', 'reloadWrap');
    const $reloadButton = createElement('button', 'button');

    $reloadButton.innerText = 'Restart';

    $reloadWrap.appendChild($reloadButton);
    $arenas.appendChild($reloadWrap);

    $reloadButton.addEventListener('click', () => {
        window.location.reload();
    });
}

const showResult = () => {
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

const generateLogs = (type, pl1, pl2, damage) => {
// pl1 - наносит удар, pl2 - защищается 
// или pl1 - wins, pl2 - lose
    const { name: name1 } = pl1;
    const { name: name2, hp: hp2 } = pl2;

    let text;
    const currentTime = getTime();
    const randomPhrase = logs[type][
        getRandome(logs[type].length) - 1
    ];

    switch (type) {
        case 'hit':
            text = `${currentTime} - ${
                randomPhrase
                    .replace('[playerKick]', name1)
                    .replace('[playerDefence]', name2)
            } -${damage} [${hp2}/100]`;
            break;

        case 'defence':
            text = `${currentTime} - ${
                randomPhrase
                    .replace('[playerKick]', name1)
                    .replace('[playerDefence]', name2)
            }`;
            break;

        case 'end':
            text = `${currentTime} - ${
                randomPhrase
                    .replace('[playerWins]', name1)
                    .replace('[playerLose]', name2)
            }`;
            break;

        case 'draw':
            text = `${currentTime} - ${randomPhrase}`;
            break;

        case 'start':
            text = `${randomPhrase
                .replace('[time]', currentTime)
                .replace('[player1]', name1)
                .replace('[player2]', name2)
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
    const userPlayer = userAttack();
    const enemy = enemyAttack();
    const { value: userVal, hit: userHit, defence: userDef } = userPlayer;
    const { value: enemyVal, hit: enemyHit, defence: enemyDef } = enemy;

    console.log('####: a', userPlayer);
    console.log('####: e', enemy);

    if (enemyHit !== userDef) {
        player1.changeHP(enemyVal);
        player1.renderHP();
        generateLogs('hit', player2, player1, enemyVal);
    } else {
        generateLogs('defence', player2, player1);
    }

    if (userHit !== enemyDef) {
        player2.changeHP(userVal);
        player2.renderHP();
        generateLogs('hit', player1, player2, userVal);
    } else {
        generateLogs('defence', player1, player2);
    }

    showResult();
});
