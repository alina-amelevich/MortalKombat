'use strict';

import { $formFight, Fight } from './fight.js';
import { Logs } from './logs.js';
import { Creator } from './create.js';
import { Fetcher } from './fetch.js';
import { Player } from './player.js';
import { Utils } from './utils.js';
import { AudioManager } from './music.js';

export class Game {

  constructor() {
    this.$arenas = document.querySelector('.arenas');
    this.logs = new Logs();
    this.audioManager = new AudioManager;
  }
  /**
   * Чтобы получить объект игрока и положить в переменную userObj,
   * строка под ключом player1 достается из localStorage
   * и распаршивается методом JSON.parse(localStorage.getItem('player1'));
   * делается запрос на сервер для получения случаного врага,
   * ответ кладтся в enemyObj,
   * создаются объекты player 1/2 - экземпляры классов User и Enemy,
   * с пом-ю spred-оператора экземпляры расширяются полями player и полями объектов userObj и enemyObj соотв.,
   * дважды вызывается метод createPlayer для объектов player 1/2,
   * возвращающиий  переменные $player, содержащие набор html-элементов для игроков,
   * $player добавляется на арену,
   * вызывается generateLogs для генерации стартовых логов;
   * подписка на событие нажатия кнопки 'FIGHT',
   * при возниникновении события вызывается метод hit.
   */
  async start() {
    this.audioManager.randomGameAudio();

    const userObj = JSON.parse(localStorage.getItem('player1'));
    const enemyObj = await Fetcher.getEnemy();

    this.$arenas.classList.add(`arena${Utils.getRandom(5)}`);

    this.player1 = new Player({
      ...userObj,
      player: 1,
      // rootSelector: 'arenas', //это поле может понадобится,
      // если я вынесу  this.$arenas.appendChild в отдельный метод
    });

    this.player2 = new Player({
      ...enemyObj,
      player: 2,
      // rootSelector: 'arenas', //это поле может понадобится,
      // если я вынесу  this.$arenas.appendChild в отдельный метод
    });

    this.$arenas.appendChild(Creator.createPlayer(this.player1)); //получ. $player и добавляем на арену
    this.$arenas.appendChild(Creator.createPlayer(this.player2));

    this.logs.generateLogs('start', this.player1, this.player2);

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

  /**
   * Метод hit вызывается при нажатии кнопки 'FIGHT'.
   * Запускает метод Fight.attack,
   * затем вызывает методы изменения и отрисовки hp игроков (changeHP и renderHP)
   * и генерацию логов (generateLogs)
   * (Если удар пришелся на ту часть тела, на которую была выставлена защиита,
   * changeHP и renderHP не вызываются),
   * затем вызывается метод showResult.
   */
  async hit() {
    const { player1, player2 } = this;
    const attackObj = await Fight.attack();
    const { value: userVal, hit: userHit, defence: userDef } = attackObj.player1;
    const { value: enemyVal, hit: enemyHit, defence: enemyDef } = attackObj.player2;

    if (enemyHit !== userDef) {
      player1.changeHP(enemyVal);
      player1.renderHP();
      this.logs.generateLogs('hit', player2, player1, enemyVal);
    } else {
      this.logs.generateLogs('defence', player2, player1);
    }

    if (userHit !== enemyDef) {
      player2.changeHP(userVal);
      player2.renderHP();
      this.logs.generateLogs('hit', player1, player2, userVal);
    } else {
      this.logs.generateLogs('defence', player1, player2);
    }

    this.showResult();
  }

  /**
  * Метод  вызывается после совершения атаки игроков из hit.
  * Если hp хотя бы одного из игроков === 0, скрывается форма команд боя,
  * вызывается метод createReloadButton,
  * и $reloadButton добавляется в арену,
  * определяется победитель,
  * вызывается генерация логов (generateLogs),
  * вызывается метод createWinTitle,
  * и $winTitle добавляется в арену.
  */
  showResult() {
    const { player1, player2 } = this;

    if (player1.hp === 0 || player2.hp === 0) {
      $formFight.style.display = 'none';
      this.$arenas.appendChild(Creator.createReloadButton());
    }

    if (player2.hp === 0 && player2.hp < player1.hp) {
      this.audioManager.winEvent();
      this.logs.generateLogs('end', player1, player2);
      this.$arenas.appendChild(Creator.createWinTitle(player1.name));
    } else if (player1.hp === 0 && player1.hp < player2.hp) {
      this.audioManager.failEvent();
      this.logs.generateLogs('end', player2, player1);
      this.$arenas.appendChild(Creator.createWinTitle(player2.name));
    } else if (player1.hp === 0 && player2.hp === 0) {
      this.logs.generateLogs('draw');
      this.$arenas.appendChild(Creator.createWinTitle());
    }
  }

}