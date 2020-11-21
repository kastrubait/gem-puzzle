import { NUM_ROWS } from './constans';
import { anyMessage, closeMess } from './modal';

function rand(min, max) {
  return min + Math.floor(Math.random() * (max - min + 1));
}

function addZero(n) {
  return (parseInt(n, 10) < 10 ? '0' : '') + n;
}

function tileNumber(arr, i) {
  const [a, b] = arr;
  const number = a * NUM_ROWS[i] + b + 1;
  return (number !== 16) ? number : 0;
}

function soundKeys(isOnSound, error) {
  const URL = '/public';
  if (isOnSound) {
    const audio = new Audio();
    audio.preload = 'auto';
    audio.src = (error) ? `${URL}/wrong.mp3` : `${URL}/correct.mp3`;
    audio.play();
  }
}

function restart() {
  const numberImg = Math.floor(Math.random() * 150);
  return {
    codSizeField: 1,
    modeGame: 1,
    solved: false,
    board: [],
    emptyIndex: null,
    index: null,
    shuffling: false,
    stack: [],
    moves: 0,
    time: 1,
    startGame: false,
    numberImg,
  };
}

function saveGame(data) {
  const {
    moves, solved, codSizeField, time,
  } = data;
  if (solved) {
    const formatter = new Intl.DateTimeFormat('en-US');
    const currentScore = {
      date: formatter.format(new Date()),
      time,
      size: NUM_ROWS[codSizeField],
      moves,
    };
    let results;
    if (localStorage.getItem('bestScore')) {
      results = JSON.parse(localStorage.getItem('bestScore'));
    } else {
      results = [];
    }
    results.push(currentScore);
    // eslint-disable-next-line no-confusing-arrow
    results.sort((a, b) => a.moves > b.moves ? 1 : -1);
    if (results.length >= 8) {
      results.pop();
    }
    localStorage.setItem('bestScore', JSON.stringify(results));
  }
  if (moves && !solved) {
    window.localStorage.setItem('dataGame', JSON.stringify(data));
    anyMessage('Saved successfully!');
  }
  if (!moves) {
    anyMessage('Start the game, nothing to save here!!');
  }
}

function loadGame() {
  let oldGame;
  if (!localStorage.getItem('dataGame')) {
    return false;
  }
  if (localStorage.getItem('dataGame')) {
    oldGame = JSON.parse(localStorage.getItem('dataGame'));
  }
  return { oldGame };
}

function getScore() {
  if (!localStorage.getItem('bestScore')) {
    anyMessage('Start the game, nothing to save here!!');
    setTimeout(closeMess(), 5000);
    return false;
  }
  const results = JSON.parse(localStorage.getItem('bestScore'));
  return results;
}

export {
  rand,
  tileNumber,
  soundKeys,
  restart,
  addZero,
  saveGame,
  loadGame,
  getScore,
};
