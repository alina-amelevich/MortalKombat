'use strict';

import { Utils } from './utils.js';

export class AudioManager {
  constructor() {
    this.charSelectionMusic = Audio.charSelectionMusic;
    this.fightAudio = Audio.fightAudio;
    this.gameAudio = Audio.gameAudio;
    this.victoryAudio = Audio.victoryAudio;
    this.failAudio = Audio.failAudio;

    this.gameAudioObj = [
      '/assets/music/1-kombat-temple.mp3',
      '/assets/music/2-the-balcony.mp3',
      '/assets/music/3-the-rooftop.mp3',
      '/assets/music/4-the-street.mp3',
      '/assets/music/5-the-bridge.mp3',
    ]

  }
  characterSelectionEvent() {
    //РЕШИТТЬ ПРОБЛЕМУ С ЗАПРЕТОМ НА ВОСПРОИЗВЕДЕНИИЯ АУДИО ДО НАЧАЛА ДЕЙСТВИЙ ПОЛЬЗОВАТЕЛЯ
    this.charSelectionMusic = new Audio('/assets/music/character-selection.mp3');

    this.charSelectionMusic.addEventListener("canplaythrough", () => {
      /* аудио может быть воспроизведено; проиграть, если позволяют разрешения */
      // this.charSelectionMusic.autoplay = true;
      // this.charSelectionMusic.muted = true;
      this.charSelectionMusic.play();
    });
  }


  // startFigthEvent() {
  //   this.fightAudio = new Audio('/assets/music/fight.mp3');
  //   this.fightAudio.addEventListener('canplaythrough', () => {
  //     // this.charSelectionMusic.pause();
  //     this.fightAudio.play();
  //   });
  // }

  randomGameAudio() {
    this.gameAudio = new Audio(this.gameAudioObj[Utils.getRandom(5) - 1]);
    this.gameAudio.addEventListener('canplaythrough', () => {
      // this.charSelectionMusic.pause();
      this.gameAudio.loop = true;
      this.gameAudio.play();
    });
  }

  winEvent() {
    this.victoryAudio = new Audio('/assets/music/victory.mp3');
    this.victoryAudio.addEventListener('canplaythrough', () => {
      this.gameAudio.pause();
      this.victoryAudio.play();
    });
  }

  failEvent() {
    this.failAudio = new Audio('/assets/music/game-over.mp3');
    this.failAudio.addEventListener('canplaythrough', () => {
      this.gameAudio.pause();
      this.failAudio.play();
    });
  }

}