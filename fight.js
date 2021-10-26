'use strict'

import { getRandome } from "./utils.js";

export const $formFight = document.querySelector('.control');

const HIT = {
    head: 30,
    body: 25,
    foot: 20,
}

const ATTACK = ['head', 'body', 'foot'];

export const enemyAttack = () => {
    const hit = ATTACK[getRandome(3) - 1];
    const defence = ATTACK[getRandome(3) - 1];

    return {
        value: getRandome(HIT[hit]),
        hit,
        defence,
    }
}

export const userAttack = () => {
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
