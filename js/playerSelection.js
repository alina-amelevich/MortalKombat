'use strict'

import { Utils } from './utils.js';
import { Fetcher } from './fetch.js';
import { Game } from './game.js';

export class PlayerSelection {

	constructor() {
		this.$initPage = document.querySelector('.initpage');
		this.$parent = document.querySelector('.parent');
		this.$player = document.querySelector('.player');
		this.$root = document.querySelector('.root');
	}

	/**
	 * Функция для создания центрального некликабльного блока с логотопом игры
	 */
	createEmptyPlayerBlock() {
		const el = Utils.createElement('div', ['character', 'div11', 'disabled']);
		const img = Utils.createElement('img');
		img.src = 'http://reactmarathon-api.herokuapp.com/assets/mk/avatar/11.png';
		el.appendChild(img);
		this.$parent.appendChild(el);
	}

	highlightСharacter(item, imgSrc) {
		if (imgSrc === null) {
			imgSrc = item.img;
			const $img = Utils.createElement('img');
			$img.src = imgSrc;
			this.$player.appendChild($img);
		}
	}

	removeCharacterHighlight(imgSrc) {
		if (imgSrc) {
			imgSrc = null;
			this.$player.innerHTML = '';
		}
	}

	onClickFunc(item, el) {
		// Кладет игрока в localStorage при помощи localStorage.getItem('player1'),
		// чтобы потом на арене его достать,
		// т.к. в localStorage кладется строка, в дальнейшем необходиимо ее распарсить
		// обратным методом JSON.parse(localStorage.getItem('player1'));
		// но это уже будет в классе Game при инициализации игроков.

		localStorage.setItem('player1', JSON.stringify(item));

		el.classList.add('active');

		// Путем скрытия страницы выбора игрока реализовано перенаправление на игровое поле
		this.$initPage.style.display = 'none';
		this.$root.style.display = 'flex';

		const game = new Game();
		game.start();

		// Можно было сделать отельные html-файлы и перенапрвлять на файл с ареной:
		// setTimeout(() => {
		//      window.location.pathname = 'arenas.html';
		// }, 1000);
	}

	async init() {
		localStorage.removeItem('player1');

		const players = await Fetcher.getPlayers();

		let imgSrc = null;
		this.createEmptyPlayerBlock();


		players.forEach(item => {
			const el = Utils.createElement('div', ['character', `div${item.id}`]);
			const img = Utils.createElement('img');

			el.addEventListener('mousemove', () => this.highlightСharacter(item, imgSrc));

			el.addEventListener('mouseout', () => this.removeCharacterHighlight(imgSrc));

			el.addEventListener('click', () => this.onClickFunc(item, el));

			img.src = item.avatar;
			img.alt = item.name;

			el.appendChild(img);
			this.$parent.appendChild(el);
		});
	}
}


