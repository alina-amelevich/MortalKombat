import { $formFight, User, Enemy } from './fight.js';
import generateLogs from './logs.js';
import { createPlayer, createReloadButton, createWinTitle }
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

    $arenas.appendChild(createPlayer(player1));
    $arenas.appendChild(createPlayer(player2));

    generateLogs('start', player1, player2);

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
      generateLogs('hit', player2, player1, enemyVal);
    } else {
      generateLogs('defence', player2, player1);
    }

    if (userHit !== enemyDef) {
      player2.changeHP(userVal);
      player2.renderHP();
      generateLogs('hit', player1, player2, userVal);
    } else {
      generateLogs('defence', player1, player2);
    }

    this.showResult();
  }

  showResult() {
    const { player1, player2 } = this;

    if (player1.hp === 0 || player2.hp === 0) {
      $formFight.style.display = 'none';
      $arenas.appendChild(createReloadButton());
    }

    if (player2.hp === 0 && player2.hp < player1.hp) {
      generateLogs('end', player1, player2);
      $arenas.appendChild(createWinTitle(player1.name));
    } else if (player1.hp === 0 && player1.hp < player2.hp) {
      generateLogs('end', player2, player1);
      $arenas.appendChild(createWinTitle(player2.name));
    } else if (player1.hp === 0 && player2.hp === 0) {
      generateLogs('draw');
      $arenas.appendChild(createWinTitle());
    }
  }

}