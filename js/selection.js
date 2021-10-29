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

  generateArena() {
    const i = 1; //сооств второму элементу массива классов элемента $arenas
    const arenasQuantity = 6; //соотв. количеству доступных арен

    $arenas.classList.remove($arenas.classList[i]);
    $arenas.classList.add(`arena${Utils.getRandome(arenasQuantity)}`);
  }

  generateCharacters() {
    const caracterIndex1 = Utils.getRandome(this.caracter.length) - 1;
    this.player1.name = this.caracter[caracterIndex1].name;
    this.player1.img = this.caracter[caracterIndex1].img;
    let caracterIndex2;

    //следующий цикл должен исключить генерацию двух одинаковых персоажей
    do {
      caracterIndex2 = Utils.getRandome(this.caracter.length) - 1;
    } while (caracterIndex1 === caracterIndex2);

    this.player2.name = this.caracter[caracterIndex2].name;
    this.player2.img = this.caracter[caracterIndex2].img;
  }

}