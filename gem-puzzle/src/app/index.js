import '../style/style.css';

import Fifteen from './Fifteen';

const state = {
  modeGame: 1,
  codSizeField: 1,
  solved: false,
  moves: 0,
  time: 0,
  board: [],
};

function getResult() {
  const p = document.createElement('p');
  p.textContent = `The goal of the game is to move the knuckles around the box
   to arrange them by numbers, preferably by making as few movements as possible.`;

  const heading = document.createElement('h1');
  heading.textContent = 'Gem Puzzle';

  const box = document.body.appendChild(document.createElement('div'));
  box.classList.add('game-board');
  for (let i = 0; i < 16; i++) {
    box.appendChild(document.createElement('div'));
  }

  const game15 = new Fifteen(state);
  game15.getFifteens();

  const root = document.querySelector('#root');
  root.append(heading, p, box);
}

document.addEventListener('DOMContentLoaded', getResult());
