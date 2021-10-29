import { Utils } from './utils.js';

export const $arenas = document.querySelector('.arenas');

const CARACTER_VARIANTS = [
  {
    name: 'KITANA',
    img: 'http://reactmarathon-api.herokuapp.com/assets/kitana.gif',
  },
  {
    name: 'SKORPION',
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
  },
  {
    name: 'LIU KANG',
    img: 'http://reactmarathon-api.herokuapp.com/assets/liukang.gif',
  },
  {
    name: 'SONYA',
    img: 'http://reactmarathon-api.herokuapp.com/assets/sonya.gif',
  },
  {
    name: 'SUB-ZERO',
    img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
  },
  {
    name: 'ANKA',
    img: 'https://i.gifer.com/bh8.gif',
  },
  {
    name: 'NATASHKA',
    img: 'https://i.gifer.com/3Whj.gif',
  },
];

export class GameSelector {
  constructor({ player1, player2 }) {
    this.caracter = CARACTER_VARIANTS;
    this.player1 = player1;
    this.player2 = player2;
  }

  selectArena() {
    const i = 1; //сооств второму элементу массива классов элемента $arenas
    const arenasQuantity = 6; //соотв. количеству доступных арен

    $arenas.classList.remove($arenas.classList[i]);
    $arenas.classList.add(`arena${Utils.getRandome(arenasQuantity)}`);
  }

  selectUserCharacter() {
    const caracterIndex = Utils.getRandome(this.caracter.length) - 1;
    this.player1.name = this.caracter[caracterIndex].name;
    this.player1.img = this.caracter[caracterIndex].img;
  }

  selectEnemyCharacter() {
    const caracterIndex = Utils.getRandome(this.caracter.length) - 1;
    this.player2.name = this.caracter[caracterIndex].name;
    this.player2.img = this.caracter[caracterIndex].img;
  }

}