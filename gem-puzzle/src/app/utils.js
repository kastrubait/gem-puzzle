import { NUM_ROWS } from './constans';
// eslint-disable-next-line import/no-cycle
import { anyMessage } from './modal';

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
  if (isOnSound) {
    const audio = new Audio();
    audio.preload = 'auto';
    audio.src = (error) ? 'src/public/wrong.mp3' : 'src/public/correct.mp3';
    audio.play();
  }
}

function restart() {
  return {
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
}

function saveGame(data, timer) {
  const { moves, solved } = data;
  if (solved) {
    const formatter = new Intl.DateTimeFormat('en-US');
    const currentScore = {
      date: formatter.format(new Date()),
      time: timer,
      moves,
    };
    let results;
    if (localStorage.getItem('results')) {
      results = JSON.parse(localStorage.getItem('resulrs'));
    } else {
      results = [];
    }
    if (results.length < 10) {
      results.push(currentScore);
      // eslint-disable-next-line no-confusing-arrow
      results.sort((a, b) => a.moves > b.moves ? 1 : -1);
    } else {
      results.splice(0, 1);
      results.push(currentScore);
    }
    localStorage.setItem('bestScore', JSON.stringify(results));
  }
  if (moves && !solved) {
    window.localStorage.setItem('dataGame', JSON.stringify(data));
    window.localStorage.setItem('time', timer);
  } else {
    anyMessage('Start the game, nothing to save here!!');
  }
}

export {
  rand, tileNumber, soundKeys, restart, addZero, saveGame,
};
