'use strict';

import { Utils } from "./utils.js";

export class AudioManager {
  constructor() {
    Audio.charSelectionMusic = new Audio('/assets/music/character-selection.mp3');
    Audio.fightAudio = new Audio('/assets/music/fight.mp3');
    Audio.failAudio = new Audio('/assets/music/fight.mp3');
    Audio.victoryAudio = new Audio('/assets/music/victory.mp3');

    this.gameAudio = [
      '/assets/music/1-kombat-temple.mp3',
      '/assets/music/2-the-balcony.mp3',
      '/assets/music/3-the-rooftop.mp3',
      '/assets/music/4-the-street.mp3',
      '/assets/music/5-the-bridge.mp3',
    ]

  }
  characterSelectionEvent() {
  }


  startEvent() {

  }

  randomGameAudio() {
    Audio.gameAudio = new Audio(this.gameAudio[Utils.getRandom(5) - 1]);

    Audio.gameAudio.addEventListener("canplaythrough", () => {
      /* аудио может быть воспроизведено; проиграть, если позволяют разрешения */
      Audio.gameAudio.play();
    });

  }

}