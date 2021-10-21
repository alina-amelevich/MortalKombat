'use strict'

const $arenas = document.querySelector('.arenas');
const $fightButton = document.querySelector('.button');
const $formFight = document.querySelector('.control')
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
$formFight.addEventListener('submit', (e) => {
    e.preventDefault();
    const enemy = enemyAttack();
    // console.log('####: enemy', enemy);

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

    console.log('####: a', attack);
    console.log('####: e', enemy);

    if (enemy.hit !== attack.defence) {
        player1.changeHP(enemy.value);
        player1.renderHP();
    }
    if (attack.hit !== enemy.defence) {
        player2.changeHP(attack.value);
        player2.renderHP();
    }

    if (player1.hp === 0 || player2.hp === 0 ) {
        $fightButton.disabled = true;
        createReloadButton();
    }

    if (player1.hp === 0 && player1.hp < player2.hp) {
        $arenas.appendChild(playerWins(player2.name));
    } else if (player2.hp === 0 && player2.hp < player1.hp) {
        $arenas.appendChild(playerWins(player1.name));
    } else if (player1.hp === 0 && player2.hp === 0) {
        $arenas.appendChild(playerWins());
    }
})