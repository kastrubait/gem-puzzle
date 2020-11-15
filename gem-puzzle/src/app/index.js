/* eslint-disable no-unused-expressions */
import '../style/style.css';

import Fifteen from './Fifteen';

let isOnSound = true;

const state = {
  modeGame: 1,
  codSizeField: 1,
  solved: false,
  moves: 0,
  time: 0,
  board: [],
  isOnSound,
};

function getResult() {
  const p = document.createElement('p');
  p.textContent = `The goal of the game is to move the knuckles around the box
   to arrange them by numbers, preferably by making as few movements as possible.`;

  const heading = document.createElement('h1');
  heading.textContent = 'Gem Puzzle';

  const timer = document.createElement('h2');
  timer.textContent = 'Time 00 : 00';

  const moves = document.createElement('span');
  moves.textContent = 'Moves: 0';

  const undo = document.createElement('button');
  undo.classList.add('info-panel');
  undo.textContent = 'UNDO';

  const sound = document.createElement('button');
  sound.classList.add('info-panel');
  sound.style.width = '95px';
  (isOnSound)
    ? sound.textContent = 'Sound ON'
    : sound.textContent = 'Sound OFF';
  sound.addEventListener('click', () => {
    isOnSound = !isOnSound;
    (isOnSound)
      ? sound.textContent = 'Sound ON'
      : sound.textContent = 'Sound OFF';
  });

  const pause = document.createElement('button');
  pause.classList.add('info-panel');
  pause.textContent = 'PAUSE';

  const buttonsPanel = document.createElement('span');
  buttonsPanel.classList.add('info');
  buttonsPanel.append(undo, sound, pause);

  const info = document.createElement('div');
  info.classList.add('info');
  info.append(moves, buttonsPanel);

  const box = document.body.appendChild(document.createElement('div'));
  box.classList.add('game-board');
  for (let i = 0; i < 16; i++) {
    box.appendChild(document.createElement('div'));
  }

  const game15 = new Fifteen(state);
  game15.getFifteens();

  const root = document.querySelector('#root');
  root.append(heading, p, timer, info, box);
}

document.addEventListener('DOMContentLoaded', getResult());
