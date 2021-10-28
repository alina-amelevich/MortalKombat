'use strict'

export class Utils {

  static createElement(tag, className) {
    const $tag = document.createElement(tag);

    if (className) {
      $tag.classList.add(className);
    }

    return $tag;
  }

  static getTime() {
    const date = new Date();
    const formalizeTime = (number) => `${(number >= 10) ? '' : '0'}${number}`;
    const time = `${formalizeTime(date.getHours())}:${formalizeTime(date.getMinutes())}`;

    return time;
  }

  static getRandome(max) {
    return Math.floor(Math.random() * (max - 1 + 1) + 1);
  }
}
