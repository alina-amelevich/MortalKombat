import { $formFight, User, Enemy } from './fight.js';
import { Logs } from './logs.js';
import { Creator }
  from './creatingComponents.js';
const $arenas = document.querySelector('.arenas');


export class Game {
  constructor() {
    this.player1 = new User({
      player: 1,
      name: 'KITANA',
      hp: 100,
      img: 'http://reactmarathon-api.herokuapp.com/assets/kitana.gif',
      //weapon: ['blade', 'gun'],
    });

    this.player2 = new Enemy({
      player: 2,
      name: 'LIU KANG',
      hp: 100,
      img: 'http://reactmarathon-api.herokuapp.com/assets/liukang.gif',
      //weapon: ['machete'],
    });

  }
  start() {
    const { player1, player2 } = this;

    $arenas.appendChild(Creator.createPlayer(player1));
    $arenas.appendChild(Creator.createPlayer(player2));

    Logs.generateLogs('start', player1, player2);

    $formFight.addEventListener('submit', this.submit);
  }

  submit(e) {
    e.preventDefault();

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