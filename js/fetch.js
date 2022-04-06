'use strict';

export class Fetcher {
  /**
  * Метод делает fetch-запрос на сервер, дожидается ответа, парсит ответ из JSON в JS.
  * Метод вызывается из метода start класса Game.
  * @returns {Promise < Array < object > >} - Промис, содержащий массив объектов персонажей
  * с полями id, name, img, hp, avatar
  */
  static async getPlayers() {
    const playersInJson = localStorage.getItem('playersArr');
    if (playersInJson) {
      return JSON.parse(playersInJson);
    }
    const res = await fetch('https://reactmarathon-api.herokuapp.com/api/mk/players');
    localStorage.setItem('playersArr', await res.text());
    return res.json();

  }

  /**
   * Метод делает fetch-запрос на сервер, дожидается ответа, парсит ответ из JSON в JS.
   * Метод вызывается из метода start класса Game.
   * @returns {Promise < object >}} -  Промис, содержащий случайный объект персонажа для врага,
   * сгенерированный на сервере, с полями id, name, img, hp, avatar
   */
  static async getEnemy() {
    const res = await fetch('https://reactmarathon-api.herokuapp.com/api/mk/player/choose');
    return res.json();
  }

  /**
   *
   * @param {userAttack} param0
   * @returns {Promise < object >} - Промис, содержащий объект с полями player1 и player2,
   * значениями которых являются объекты, описывающиие, сколько нанесли урона, что защищают и бьют.
   */
  static async getFight(userAttack) {
    const res = await fetch('http://reactmarathon-api.herokuapp.com/api/mk/player/fight', {
      method: 'POST',
      body: JSON.stringify(userAttack)
    });
    return res.json();
  }
}