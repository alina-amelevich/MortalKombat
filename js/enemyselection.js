'use strict';

import { Utils } from './utils.js';
import { Fetcher } from './fetch.js';

export class EnemySelection {
  constructor() {
    this.$parent = document.querySelector('.parent');
    this.$enemyDiv = document.querySelector('.initpage .enemy');
    this.$activeCharacter = undefined;
    this.interval = undefined;
    this.$img = Utils.createElement('img');

  }

  showCharacter() {
    if (!this.$img.src) {
      this.$enemyDiv.appendChild(this.$img);
    }
    const item = this.players.find(item => item.id === this.randomNumb);
    const caracterImgSrc = item.img;
    this.$img.src = caracterImgSrc;

  }


  selectRandomly() {
    this.prevNumb = this.randomNumb;
    while (this.randomNumb === this.prevNumb || this.randomNumb === 11) {
      this.randomNumb = Utils.getRandom(24);
    }
    if (this.$activeCharacter) {
      this.$activeCharacter.classList.remove('active-enemy');
    }
    this.$activeCharacter = this.$parent.querySelector(`.div${this.randomNumb}`);
    this.$activeCharacter.classList.add('active-enemy');

    this.showCharacter();
  }

  async startEnemySelectAnimation() {
    this.players = await Fetcher.getPlayers();
    this.interval = window.setInterval(this.selectRandomly.bind(this), 400);
  }

  stopEnemySelectAnimation() {
    clearInterval(this.interval);
  }

}