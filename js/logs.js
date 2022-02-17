'use strict'

import { Utils } from './utils.js';

const $chat = document.querySelector('.chat');

const LOGS = {
  start: [
    '⚔️ Часы показывали [time], когда [player1] и [player2] бросили вызов друг другу ⚔️',
  ],
  end: [
    'Результат удара [playerWins]🥇: [playerLose] - труп🪦.',
    '[playerLose] погиб⚰️ от удара бойца [playerWins]🎉.',
    'Результат боя: [playerLose] - жертва💀, [playerWins] - убийца😈.',
    'Возможно [playerWins]😈 однажды научится воскрешать мертвецов, но пока [playerLose] мёртв😵.',
    '[playerLose] повержен🪦. Бой окончен. Победа за [playerWins]🏆'
  ],
  hit: [
    '[playerDefence] пытался сконцентрироваться, но [playerKick] разбежавшись раздробил копчиком левое ухо врага.',
    '[playerDefence] расстроился, как вдруг, неожиданно [playerKick] случайно раздробил грудью грудину противника.',
    '[playerDefence] зажмурился, а в это время [playerKick], прослезившись, раздробил кулаком пах оппонента.',
    '[playerDefence] чесал <вырезано цензурой>, и внезапно неустрашимый [playerKick] отчаянно размозжил грудью левый бицепс оппонента.',
    '[playerDefence] задумался, но внезапно [playerKick] случайно влепил грубый удар копчиком в пояс оппонента.',
    '[playerDefence] ковырялся в зубах, но [playerKick], проснувшись, влепил тяжелый удар пальцем в кадык врага.',
    '[playerDefence] вспомнил что-то важное, но внезапно [playerKick], зевнув, размозжил открытой ладонью челюсть противника.',
    '[playerDefence] осмотрелся, и в это время [playerKick] мимоходом раздробил стопой аппендикс соперника.',
    '[playerDefence] кашлянул, но внезапно [playerKick], показав палец, размозжил пальцем грудь соперника.',
    '[playerDefence] пытался что-то сказать, а жестокий [playerKick], проснувшись, размозжил копчиком левую ногу противника.',
    '[playerDefence] забылся, как внезапно безумный [playerKick] со скуки влепил удар коленом в левый бок соперника.',
    '[playerDefence] поперхнулся, а за это [playerKick] мимоходом раздробил коленом висок врага.',
    '[playerDefence] расстроился, а в это время наглый [playerKick], пошатнувшись, размозжил копчиком губы оппонента.',
    '[playerDefence] осмотрелся, но внезапно [playerKick] робко размозжил коленом левый глаз противника.',
    '[playerDefence] осмотрелся, а [playerKick] вломил дробящий удар плечом, пробив блок, куда обычно не бьют оппонента.',
    '[playerDefence] ковырялся в зубах, как вдруг, неожиданно [playerKick] отчаянно размозжил плечом мышцы пресса оппонента.',
    '[playerDefence] пришел в себя, и в это время [playerKick] провел разбивающий удар кистью руки, пробив блок, в голень противника.',
    '[playerDefence] пошатнулся, а в это время [playerKick], хихикая, влепил грубый удар открытой ладонью по бедрам врага.',
    '[playerDefence] молил о пощаде, но [playerKick], радостно присвистывая, провел болевой прием на ногте противника',
  ],
  defence: [
    '[playerKick] потерял момент, и храбрый [playerDefence] отпрыгнул от удара открытой ладонью в ключицу.',
    '[playerKick] не контролировал ситуацию, и потому [playerDefence] поставил блок на удар пяткой в правую грудь.',
    '[playerKick] потерял момент, и [playerDefence] поставил блок на удар коленом по селезенке.',
    '[playerKick] поскользнулся, и задумчивый [playerDefence] поставил блок на тычок головой в бровь.',
    '[playerKick] старался провести удар, но непобедимый [playerDefence] ушел в сторону от удара копчиком прямо в пятку.',
    '[playerKick] обманулся, и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.',
    '[playerKick] не думал о бое, потому расстроенный [playerDefence] отпрыгнул от удара кулаком куда обычно не бьют.',
    '[playerKick] оступился, и [playerDefence] ушел влево от удара ногой в бок.'
  ],
  draw: [
    'Ничья - это тоже победа! 🙌🏻',
    'Бойцы вынуждены довольствоваться ничьёй. 🥲',
    'Ничья - тоже результат! ⚖️',
  ],
};

export class Logs {

  /**
   * Метод отвечает за генерацию лога боя
   * в зависимости от игровой ситуации генерируются соответствующие рандомные фразы,
   * затем выводятся на экран в "чат" вместе со временем события
   * @param {string} type - тип ситуации/событиия, которое надо описать логом (hit/defence/end/draw/start)
   * @param {object} pl1 - объект игрока 1
   * @param {object} pl2 - объект игрока 2
   * @param {number} damage - наносимый при удааре урон
   */
  static generateLogs(type, pl1, pl2, damage) {
    // pl1 - наносит удар, pl2 - защищается
    // или pl1 - wins, pl2 - lose
    const { name: name1 } = pl1;
    const { name: name2, hp: hp2 } = pl2;

    let text;
    const currentTime = Utils.getTime();
    const randomPhrase = LOGS[type][
      Utils.getRandom(LOGS[type].length) - 1
    ];

    switch (type) {
      case 'hit':
        text = `${currentTime} - ${randomPhrase
          .replace('[playerKick]', name1)
          .replace('[playerDefence]', name2)
          } -${damage} [${hp2}/100]`;
        break;

      case 'defence':
        text = `${currentTime} - ${randomPhrase
          .replace('[playerKick]', name1)
          .replace('[playerDefence]', name2)
          }`;
        break;

      case 'end':
        text = `${currentTime} - ${randomPhrase
          .replace('[playerWins]', name1)
          .replace('[playerLose]', name2)
          }`;
        break;

      case 'draw':
        text = `${currentTime} - ${randomPhrase}`;
        break;

      case 'start':
        text = `${randomPhrase
          .replace('[time]', currentTime)
          .replace('[player1]', name1)
          .replace('[player2]', name2)
          }`;
        break;

      default:
        console.log('что-то пошло не так');
        break;
    }

    const el = `<p>${text}</p>`;
    $chat.insertAdjacentHTML('afterbegin', el);
  }
}