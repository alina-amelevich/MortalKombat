'use strict'

export class Utils {

  /**
   * Метод создает HTML-элементы и присваиивает css-класс
   * @param {string} tag - название тега, который будет создан
   * @param {string} className - название css-класса, который будет присвоен тэгу
   * @returns {HTMLElement} HTML-элемент с привоенным css-классом
   */
  static createElement(tag, className) {
    const $tag = document.createElement(tag);

    if (className) {
      $tag.classList.add(className);
    }

    return $tag;
  }

  /**
   * @returns {string} Текущее время в формате чч:мм
   */
  static getTime() {
    const date = new Date();
    const formalizeTime = (number) => `${(number >= 10) ? '' : '0'}${number}`;
    const time = `${formalizeTime(date.getHours())}:${formalizeTime(date.getMinutes())}`;

    return time;
  }

  /**
   * Метод возвращает случайное целое число в промежутке от 1 до переданного значениия параметра max
   * @param {number} max - верхняя граниица промежутка, в котором необходимо получить рандомное число
   * @returns {number} - случайное целое число
   */
  static getRandom(max) {
    return Math.floor(Math.random() * (max - 1 + 1) + 1);
  }
}
