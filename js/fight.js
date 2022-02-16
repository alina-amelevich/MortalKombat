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

  /**
   * Метод создает и возвращает объект, содержащий инфу об ударе и защите user
   * @returns {object} - объект attack c полями value - кол-во ед-ц. урона, которое наносит user,
   * hit - часть тела, куда user наносит удар, defence - часть тела, которую user защищает
   */
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

  /**
  * Метод создает и возвращает объект, содержащий инфу об ударе и защите enemy
  * @returns {object} - объект attack c полями value - кол-во ед-ц. урона, которое наносит enemy,
  * hit - часть тела, куда enemy наносит удар, defence - часть тела, которую enemy защищает
  */
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

