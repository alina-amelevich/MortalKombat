'use strict'

export class Fetcher {
  /**
  * Метод делает fetch-запрос на сервер, дожидается ответа, парсит ответ из JSON в JS.
  * Метод вызывается из метода start класса Game.
  * @returns {Promise < Array < object > >} - Промис, содержащий массив объектов персонажей
  * с полями id, name, img, hp, avatar
  */
  static async getPlayers() {
    const res = await fetch('https://reactmarathon-api.herokuapp.com/api/mk/players');
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
}