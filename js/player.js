'use strict'
export class Player {

  constructor({ player, name, hp, img }) {
    this.player = player;
    this.name = name;
    this.hp = hp;
    this.img = img;
  }

  /**
   * Метод уменьшает значение hp объекта класса Player на число,
   * переданное в параментре damage.
   * Если значение hp становится отриицательным, приравнивает его к нулю.
   * @param {number} damage - количество едииниц урона
   */
  changeHP(damage) {
    this.hp -= damage;

    if (this.hp <= 0) {
      this.hp = 0;
    }
  }

  /**
   * Метод находит HTML-элемент шкалы жизни игрока по комбинированному селектору .player[1/2] .live
   * и возвращает ссылку на этот элемент
   * @returns {Element} - ссылка на HTML-элемент шкалы жизни игрока
   */
  elHP() {
    return document.querySelector(`.player${this.player} .life`);
  }

  /**
   * Метод вызывает ментод elHP, получает ссылку на HTML-элемент шкалы жизни игрока,
   * обращаеется к свойству ширины шкалы и меняет ее значение на значение hp объекта игрока -
   * т.е. рендерит актуальное состояние шкалы жизни игрока
   */
  renderHP() {
    this.elHP().style.width = `${this.hp}%`;
  }
}
