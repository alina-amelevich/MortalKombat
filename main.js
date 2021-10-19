'use strict'

const $arenas = document.querySelector('.arenas');
const $randomButton = document.querySelector('.button');

const player1 = {
    player: 1,
    name: 'LIUKANG',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/liukang.gif',
    weapon: ['machete'],
    attack: function() {
        console.log(this.name + ' ' + 'Fight...')
    }
};

const player2 = {
    player: 2,
    name: 'KITANA',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/kitana.gif',
    weapon: ['blade', 'gun'],
    attack: function() {
        console.log(this.name + ' ' + 'Fight...')
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

function changeHp(playerObj) {
    const $playerLife = document.querySelector('.player' + playerObj.player + ' .life');

    playerObj.hp -= getRandomeDamage(1, 20);
    console.log('У ' + playerObj.name + ' осталось ' + playerObj.hp + '');

    if (playerObj.hp <= 0) {
        $playerLife.style.width = 0 + '%';
    } else {
        $playerLife.style.width = playerObj.hp + '%';
    }
}

function whoWon() {
    function playerWin(winMessage) {
        const $winTitle = createElement('div', 'winTitle');
        $winTitle.innerText = winMessage;
        
        return $winTitle;
    }

    //объекты player1/2 из глобальной области видимости
    if (player1.hp <=0 && player2.hp <=0) { 
        $arenas.appendChild(playerWin('Dead heat'));
    } else if (player1.hp <=0) { 
        $arenas.appendChild(playerWin(player2.name + ' won!'));
    } else if (player2.hp <=0) {
        $arenas.appendChild(playerWin(player1.name + ' won!'));
    }
}


function getRandomeDamage(min, max) {
    const randomeDamage = Math.floor(Math.random() * (max - min + 1) + min);
    console.log('randomeDamage: ' + randomeDamage);

    return randomeDamage;
}

$randomButton.addEventListener('click', function() {
    console.log('Click random button');

    changeHp(player1);
    changeHp(player2);

    if (player1.hp <= 0 || player2.hp <= 0 ) {
        $randomButton.disabled = true;
        whoWon();
    }
});

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));