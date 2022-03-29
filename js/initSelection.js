'use strict'

import { Utils } from './utils.js';

const $parent = document.querySelector('.parent');
const $player = document.querySelector('.player');

/**
 * Функция для создания центрального некликабльного блока с логотопом игры
 */
function createEmptyPlayerBlock() {
    const el = Utils.createElement('div', ['character', 'div11', 'disabled']);
    const img = Utils.createElement('img');
    img.src = 'http://reactmarathon-api.herokuapp.com/assets/mk/avatar/11.png';
    el.appendChild(img);
    $parent.appendChild(el);
}

async function init() {
    localStorage.removeItem('player1');

    const players = await fetch('https://reactmarathon-api.herokuapp.com/api/mk/players').then(res => res.json());

    let imgSrc = null;
    createEmptyPlayerBlock();


    players.forEach(item => {
        const el = Utils.createElement('div', ['character', `div${item.id}`]);
        const img = Utils.createElement('img');

        el.addEventListener('mousemove', () => {
            if (imgSrc === null) {
                imgSrc = item.img;
                const $img = Utils.createElement('img');
                $img.src = imgSrc;
                $player.appendChild($img);
            }
        });

        el.addEventListener('mouseout', () => {
            if (imgSrc) {
                imgSrc = null;
                $player.innerHTML = '';
            }
        });

        el.addEventListener('click', () => {
            //TODO: Мы кладем нашего игрока в localStorage чтобы потом на арене его достать.
            // При помощи localStorage.getItem('player1');
            // т.к.в localStorage кладется строка, мы должны ее распарсить
            // обратным методом JSON.parse(localStorage.getItem('player1'));
            // но это уже будет в нашем классе Game когда мы инициализируем игроков.

            localStorage.setItem('player1', JSON.stringify(item));

            el.classList.add('active');

            setTimeout(() => {
                // TODO: Здесь должен быть код который перенаправит вас на ваше игровое поле...
                //  Пример использования: window.location.pathname = 'arenas.html';
                window.location.pathname = 'index.html'
            }, 1000);
        });

        img.src = item.avatar;
        img.alt = item.name;

        el.appendChild(img);
        $parent.appendChild(el);
    });
}

init();
