'use strict'

const $arenas = document.querySelector('.arenas');
const $randomButton = document.querySelector('.button');

const player1 = {
    player: 1,
    name: 'LIUKANG',
    hp: 80,
    img: 'http://reactmarathon-api.herokuapp.com/assets/liukang.gif',
    weapon: ['machete'],
    attack: function() {
        console.log(this.name + ' ' + 'Fight...')
    }
}

const player2 = {
    player: 2,
    name: 'KITANA',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/kitana.gif',
    weapon: ['blade', 'gun'],
    attack: function() {
        console.log(this.name + ' ' + 'Fight...')
    }
}

function createElement(tag, className) {
    const $tag = document.createElement(tag);
    if (className) {
        $tag.classList.add(className);
    }

    return $tag;
}

function createPlayer(playerObj) {
    const $player = createElement('div', 'player' + playerObj.player);
    const $progressbar = createElement('div', 'progressbar');
    const $character = createElement('div', 'character');
    const $life = createElement('div', 'life');
    const $name = createElement('div', 'name');
    const $img = createElement('img');

    $life.style.width = playerObj.hp + '%';
    $name.innerText = playerObj.name;
    $img.src = playerObj.img;
    
    $progressbar.appendChild($life);
    $progressbar.appendChild($name);

    $character.appendChild($img);
    
    $player.appendChild($progressbar);
    $player.appendChild($character);

    return $player;
}

function changeHp(player) {
    const $playerLife = document.querySelector('.player' + player.player + ' .life');
    player.hp -= 20;
    $playerLife.style.width = player.hp + '%';

    if (player.hp < 0) {
        $arenas.appendChild(playerLose(player.name));
    }
}

function playerLose(name) {
    const $loseTitle = createElement('div', 'loseTitle');
    $loseTitle.innerText = name + ' lose!';

    return $loseTitle;
}

$randomButton.addEventListener('click', function() {
    console.log('Click random button');

    changeHp(player1);
    changeHp(player2);
})

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));