'use strict'

export const createElement = (tag, className) => {
  const $tag = document.createElement(tag);
  if (className) {
    $tag.classList.add(className);
  }

  return $tag;
}

export const getTime = () => {
  const date = new Date();
  const formalizeTime = (number) => `${(number >= 10) ? '' : '0'}${number}`;
  const time = `${formalizeTime(date.getHours())}:${formalizeTime(date.getMinutes())}`;

  return time;
}

export const getRandome = (max) => Math.floor(Math.random() * (max - 1 + 1) + 1);