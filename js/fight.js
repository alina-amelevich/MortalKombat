'use strict'

import { Fetcher } from './fetch.js';

export const $formFight = document.querySelector('.control');

export class Fight {
  /**
  * Метод создает объект, содержащий инфу об ударе и защите user:
  * hit - часть тела, куда user наносит удар, defence - часть тела, которую user защищает,
  * затем передает этот объект в качестве параметра вызываемому методу Fetcher.getFight и возвращает полученный промис
  * @returns {Promise < object >} - Промис с объектом attack с полями player1 и player2,
  * значениями которых являются объекты, описывающиие, сколько нанесли урона, что защищают и бьют.  */
  static attack() {
    const userAttack = {};

    for (let item of $formFight) {
      if (item.checked && item.name === 'hit') {
        userAttack.hit = item.value;
      }

      if (item.checked && item.name === 'defence') {
        userAttack.defence = item.value;
      }

      item.checked = false;
    }

    return Fetcher.getFight(userAttack);
  }
}



// import { Player } from './player.js';
// import { Utils } from './utils.js';


// const ATTACK = ['head', 'body', 'foot'];
// const HIT = {
//   head: 30,
//   body: 25,
//   foot: 20,
// // }
// export class User extends Player {

//   /**
//    * Метод создает и возвращает объект, содержащий инфу об ударе и защите user
//    * @returns {object} - объект attack c полями value - кол-во ед-ц. урона, которое наносит user,
//    * hit - часть тела, куда user наносит удар, defence - часть тела, которую user защищает
//    */
//   attack() {
//     const attack = {};

//     for (let item of $formFight) {
//       if (item.checked && item.name === 'hit') {
//         attack.hit = item.value;
//       }

//       if (item.checked && item.name === 'defence') {
//         attack.defence = item.value;
//       }

//       item.checked = false;
//     }

//     Fetcher.getFight(attack)

//     return attack;
//   }
// }
// export class Enemy extends Player {

//   /**
//   * Метод создает и возвращает объект, содержащий инфу об ударе и защите enemy
//   * @returns {object} - объект attack c полями value - кол-во ед-ц. урона, которое наносит enemy,
//   * hit - часть тела, куда enemy наносит удар, defence - часть тела, которую enemy защищает
//   */
//   attack() {
//     const hit = ATTACK[Utils.getRandom(3) - 1];
//     const defence = ATTACK[Utils.getRandom(3) - 1];

//     return {
//       value: Utils.getRandom(HIT[hit]),
//       hit,
//       defence,
//     }
//   }
// }


