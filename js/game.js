import { $formFight, User, Enemy } from './fight.js';
import { Logs } from './logs.js';
import { Creator } from './create.js';
import { Utils } from './utils.js';
const $arenas = document.querySelector('.arenas');

export class Game {

  getPlayers() {
    return fetch('https://reactmarathon-api.herokuapp.com/api/mk/players').then(res => res.json());
  }

  async start() {
    const players = await this.getPlayers();
    const p1 = players[Utils.getRandome(players.length) - 1];
    const p2 = players[Utils.getRandome(players.length) - 1];

    this.player1 = new User({
      ...p1,
      player: 1,
      // rootSelector: 'arenas',
    });

    this.player2 = new Enemy({
      ...p2,
      player: 2,
      // rootSelector: 'arenas',
    });

    $arenas.appendChild(Creator.createPlayer(this.player1));
    $arenas.appendChild(Creator.createPlayer(this.player2));

    Logs.generateLogs('start', this.player1, this.player2);

    $formFight.addEventListener('submit', (e) => {
      e.preventDefault();
      this.hit();
    });
  }

  //Если использовать hit/submit как метод-колбэк, теряется контекст у this, нашла 3 выхода из ситуации:
  // 1 - сделать hit/submit стрелочной ф-цией (линтер ругается)
  // 2 - использовать bind
  // 3 - переписать:
  //  $formFight.addEventListener('submit', (e) => {
  //    e.preventDefault();
  //    hit();  Ниже описать ф-цию hit() как метод класса Game
  //  });
  // ОСТАНОВИЛАСЬ НА 3-ЕМ ВАРИАНТЕ

  hit() {
    const { player1, player2 } = this;
    const userPlayer = player1.attack();
    const enemy = player2.attack();

    const { value: userVal, hit: userHit, defence: userDef } = userPlayer;
    const { value: enemyVal, hit: enemyHit, defence: enemyDef } = enemy;

    if (enemyHit !== userDef) {
      player1.changeHP(enemyVal);
      player1.renderHP();
      Logs.generateLogs('hit', player2, player1, enemyVal);
    } else {
      Logs.generateLogs('defence', player2, player1);
    }

    if (userHit !== enemyDef) {
      player2.changeHP(userVal);
      player2.renderHP();
      Logs.generateLogs('hit', player1, player2, userVal);
    } else {
      Logs.generateLogs('defence', player1, player2);
    }

    this.showResult();
  }

  showResult() {
    const { player1, player2 } = this;

    if (player1.hp === 0 || player2.hp === 0) {
      $formFight.style.display = 'none';
      $arenas.appendChild(Creator.createReloadButton());
    }

    if (player2.hp === 0 && player2.hp < player1.hp) {
      Logs.generateLogs('end', player1, player2);
      $arenas.appendChild(Creator.createWinTitle(player1.name));
    } else if (player1.hp === 0 && player1.hp < player2.hp) {
      Logs.generateLogs('end', player2, player1);
      $arenas.appendChild(Creator.createWinTitle(player2.name));
    } else if (player1.hp === 0 && player2.hp === 0) {
      Logs.generateLogs('draw');
      $arenas.appendChild(Creator.createWinTitle());
    }
  }

}