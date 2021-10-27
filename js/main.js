'use strict'

import { player1, player2 } from './players.js';
import { $formFight } from './fight.js';
import { generateLogs } from './logs.js';
import { createPlayer, createReloadButton, createWinTitle } from './creatingComponents.js';
const $arenas = document.querySelector('.arenas');

const showResult = () => {
  const { name: name1, hp: hp1 } = player1;
  const { name: name2, hp: hp2 } = player2;

  if (hp1 === 0 || hp2 === 0) {
    $formFight.style.display = 'none';
    $arenas.appendChild(createReloadButton());
  }

  if (hp2 === 0 && hp2 < hp1) {
    generateLogs('end', player1, player2);
    $arenas.appendChild(createWinTitle(name1));
  } else if (hp1 === 0 && hp1 < hp2) {
    generateLogs('end', player2, player1);
    $arenas.appendChild(createWinTitle(name2));
  } else if (hp1 === 0 && hp2 === 0) {
    generateLogs('draw');
    $arenas.appendChild(createWinTitle());
  }
}

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));

generateLogs('start', player1, player2);

$formFight.addEventListener('submit', (e) => {
  e.preventDefault();
  const userPlayer = player1.attack();
  const enemy = player2.attack();
  const { value: userVal, hit: userHit, defence: userDef } = userPlayer;
  const { value: enemyVal, hit: enemyHit, defence: enemyDef } = enemy;

  console.log('####: a', userPlayer);
  console.log('####: e', enemy);

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

  showResult();
});
