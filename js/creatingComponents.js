'use strict'

import { Utils } from './utils.js';

export class Creater {

  static createPlayer(playerObj) {
    const { player, name, hp, img } = playerObj;

    const $player = Utils.createElement('div', `player${player}`);
    const $progressbar = Utils.createElement('div', 'progressbar');
    const $character = Utils.createElement('div', 'character');
    const $life = Utils.createElement('div', 'life');
    const $name = Utils.createElement('div', 'name');
    const $img = Utils.createElement('img');

    $life.style.width = `${hp}%`;
    $name.innerText = name;
    $img.src = img;

    $progressbar.appendChild($life);
    $progressbar.appendChild($name);
    $character.appendChild($img);
    $player.appendChild($progressbar);
    $player.appendChild($character);

    return $player;
  }

  static createWinTitle(name) {
    const $winTitle = Utils.createElement('div', 'winTitle');

    if (name) {
      $winTitle.innerText = `${name} wins!`;
    } else {
      $winTitle.innerText = 'Dead heat';
    }

    return $winTitle;
  }

  static createReloadButton() {
    const $reloadWrap = Utils.createElement('div', 'reloadWrap');
    const $reloadButton = Utils.createElement('button', 'button');

    $reloadButton.innerText = 'Restart';

    $reloadWrap.appendChild($reloadButton);

    $reloadButton.addEventListener('click', () => {
      window.location.reload();
    });

    return $reloadWrap;
  }
}
