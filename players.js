'use strict'
import { userAttack, enemyAttack } from "./fight.js";
export const player1 = {
    player: 1,
    name: 'KITANA',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/kitana.gif',
    weapon: ['blade', 'gun'],
    changeHP,
    elHP,
    renderHP,
    attack: userAttack,
};

export const player2 = {
    player: 2,
    name: 'LIU KANG',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/liukang.gif',
    weapon: ['machete'],
    changeHP,
    elHP,
    renderHP,
    attack: enemyAttack,
};

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