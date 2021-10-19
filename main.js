'use strict'

const $arenas = document.querySelector('.arenas');
const $randomButton = document.querySelector('.button');

const player1 = {
    player: 1,
    name: 'LIU KANG',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/liukang.gif',
    weapon: ['machete'],
    attack: function() {
        console.log(`${this.name} fight...`);
    }
};

const player2 = {
    player: 2,
    name: 'KITANA',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/kitana.gif',
    weapon: ['blade', 'gun'],
    attack: function() {
        console.log(`${this.name} fight...`);
    }
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

function changeHp(playerObj) {
    const $playerLife = document.querySelector(`.player${playerObj.player} .life`);

    playerObj.hp -= getRandomeDamage(1, 20);
    
    // console.log(`У ${playerObj.name} осталось ${playerObj.hp} hp`);

    if (playerObj.hp <= 0) {
        playerObj.hp = 0;
    }

    $playerLife.style.width = `${playerObj.hp}%`;

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

function getRandomeDamage(min, max) {
    const randomeDamage = Math.floor(Math.random() * (max - min + 1) + min);

    return randomeDamage;
}

$randomButton.addEventListener('click', function() {
    changeHp(player1);
    changeHp(player2);

    if (player1.hp === 0 || player2.hp === 0 ) {
        $randomButton.disabled = true;
    }

    if (player1.hp === 0 && player1.hp < player2.hp) {
        $arenas.appendChild(playerWins(player2.name));
    } else if (player2.hp === 0 && player2.hp < player1.hp) {
        $arenas.appendChild(playerWins(player1.name));
    } else if (player1.hp === 0 && player2.hp === 0) {
        $arenas.appendChild(playerWins());
    }
});

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));