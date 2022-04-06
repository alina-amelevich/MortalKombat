'use strict';

import { Utils } from './utils.js';
import { Fetcher } from './fetch.js';

export class EnemySelection {
  constructor() {
    this.$parent = document.querySelector('.parent');
    this.$enemyDiv = document.querySelector('.initpage .enemy');
    this.$activeCharacter = undefined;
    this.interval = undefined;
  }

  showCharacter(randomNumb) {
    this.$enemyDiv.innerHTML = '';
    const item = this.players.find(item => item.id === randomNumb);
    const caracterImgSrc = item.img;
    const $caracterImg = Utils.createElement('img');
    $caracterImg.src = caracterImgSrc;
    this.$enemyDiv.appendChild($caracterImg);
  }


  selectRandomly() {
    let randomNumb;
    while (randomNumb == undefined || randomNumb === 11) {
      randomNumb = Utils.getRandom(24);
    }
    if (this.$activeCharacter) {
      this.$activeCharacter.classList.remove('active-enemy');
    }
    this.$activeCharacter = this.$parent.querySelector(`.div${randomNumb}`);
    this.$activeCharacter.classList.add('active-enemy');

    this.showCharacter(randomNumb);
  }

  async startEnemySelectAnimation() {
    this.players = await Fetcher.getPlayers();
    this.interval = window.setInterval(this.selectRandomly.bind(this), 500);
  }

  stopEnemySelectAnimation() {
    clearInterval(this.interval);
  }

}