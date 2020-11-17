/* eslint-disable no-unused-expressions */
import '../style/style.css';
import Fifteen from './Fifteen';
import { showMenu } from './modal';

const isOnSound = true;

const state = {
  codSizeField: 1,
  modeGame: 1,
  solved: false,
  board: [],
  emptyIndex: null,
  shuffling: false,
  stack: [],
  moves: 0,
  time: 0,
  startGame: false,
};

function getResult() {
  const p = document.createElement('p');
  p.textContent = `The goal of the game is to move the knuckles around the box
   to arrange them by numbers, preferably by making as few movements as possible.`;

  const heading = document.createElement('h1');
  heading.textContent = 'Gem Puzzle';

  const timeText = document.createElement('h2');
  timeText.setAttribute('id', 'timer');

  const movesText = document.createElement('span');
  movesText.setAttribute('id', 'moves');

  const undo = document.createElement('button');
  undo.classList.add('info-panel');
  undo.setAttribute('id', 'undo');
  undo.textContent = 'UNDO';

  const sound = document.createElement('button');
  sound.classList.add('info-panel');
  sound.setAttribute('id', 'sound');
  sound.style.width = '95px';
  (isOnSound)
    ? sound.textContent = 'Sound ON'
    : sound.textContent = 'Sound OFF';

  const pause = document.createElement('button');
  pause.classList.add('info-panel');
  pause.setAttribute('id', 'pause');
  pause.textContent = 'PAUSE';

  const buttonsPanel = document.createElement('span');
  buttonsPanel.classList.add('info');
  buttonsPanel.append(undo, sound, pause);

  const info = document.createElement('section');
  info.classList.add('info');
  info.append(movesText, buttonsPanel);

  const box = document.body.appendChild(document.createElement('div'));
  box.classList.add('game-board');
  for (let i = 0; i < 16; i++) {
    const tile = document.createElement('div');
    tile.setAttribute('data-index', i);
    box.appendChild(tile);
  }

  const classic = document.createElement('button');
  classic.classList.add('settings-panel');
  classic.classList.add('settings-panel-active');
  classic.setAttribute('id', 'classic');
  classic.textContent = 'CLASSIC GAME';

  const picture = document.createElement('button');
  picture.classList.add('settings-panel');
  picture.setAttribute('id', 'picture');
  picture.textContent = 'PICTURE PUZZLE';

  const label = document.createElement('span');
  label.setAttribute('id', 'label');
  label.textContent = 'Select MODE:  ';

  const setingsPanel = document.createElement('section');
  setingsPanel.classList.add('settings');
  setingsPanel.append(label, classic, picture);

  const root = document.querySelector('#root');
  root.append(heading, p, timeText, info, box, setingsPanel);

  const game15 = new Fifteen(state);
  game15.getFifteens();
  showMenu();
}

document.addEventListener('DOMContentLoaded', getResult());
