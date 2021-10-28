'use strict'

import { Player } from './player.js';
import { Utils } from './utils.js';

export const $formFight = document.querySelector('.control');

const ATTACK = ['head', 'body', 'foot'];
const HIT = {
  head: 30,
  body: 25,
  foot: 20,
}
export class User extends Player {
  attack() {
    const attack = {};

    for (let item of $formFight) {
      if (item.checked && item.name === 'hit') {
        attack.value = Utils.getRandome(HIT[item.value]);
        attack.hit = item.value;
      }

      if (item.checked && item.name === 'defence') {
        attack.defence = item.value;
      }

      item.checked = false;
    }

    return attack;
  }
}
export class Enemy extends Player {
  attack() {
    const hit = ATTACK[Utils.getRandome(3) - 1];
    const defence = ATTACK[Utils.getRandome(3) - 1];

    return {
      value: Utils.getRandome(HIT[hit]),
      hit,
      defence,
    }
  }
}

