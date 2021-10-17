'use strict'

const player1 = {
    class: 'player1',
    name: 'LIUKANG',
    hp: 80,
    img: 'http://reactmarathon-api.herokuapp.com/assets/liukang.gif',
    weapon: ['machete'],
    attack: function() {
        console.log(this.name + ' ' + 'Fight...')
    }
}

const player2 = {
    class: 'player2',
    name: 'KITANA',
    hp: 90,
    img: 'http://reactmarathon-api.herokuapp.com/assets/kitana.gif',
    weapon: ['blade', 'gun'],
    attack: function() {
        console.log(this.name + ' ' + 'Fight...')
    }
}

function createPlayer(playerObj) {
    const $player = document.createElement('div');
    $player.classList.add(playerObj.class);

    const $progressbar = document.createElement('div');
    $progressbar.classList.add('progressbar');

    const $character = document.createElement('div');
    $character.classList.add('character');

    const $life = document.createElement('div');
    $life.classList.add('life');
    $life.style.width = playerObj.hp + '%';

    const $name = document.createElement('div');
    $name.classList.add('name');
    $name.innerText = playerObj.name;

    const $img = document.createElement('img');
    $img.src = playerObj.img;
    
    $player.appendChild($progressbar);
    $player.appendChild($character);
    $progressbar.appendChild($life);
    $progressbar.appendChild($name);
    $character.appendChild($img);

    return $player;
}

const $arenas = document.querySelector('.arenas');
    $arenas.appendChild(createPlayer(player1));
    $arenas.appendChild(createPlayer(player2));