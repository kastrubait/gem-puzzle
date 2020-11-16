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
  if (isOnSound) {
    const audio = new Audio();
    audio.preload = 'auto';
    audio.src = (error) ? 'src/public/wrong.mp3' : 'src/public/correct.mp3';
    audio.play();
  }
}

function showTime(timer) {
  let time = timer;
  time += 1;
  const sec = time % 60;
  const min = parseInt(time / 60, 10);
  const timeText = document.querySelector('timer');
  timeText.textContent = `Time ${addZero(min)} : ${addZero(sec)}`;
  setTimeout(showTime(timer), 1000);
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
  const { moves, solved, codSizeField } = data;
  if (solved) {
    const formatter = new Intl.DateTimeFormat('en-US');
    const currentScore = {
      date: formatter.format(new Date()),
      time: timer,
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
    if (results.length >= 10) {
      results.splice(0, 1);
    }
    localStorage.setItem('bestScore', JSON.stringify(results));
  }
  if (moves && !solved) {
    window.localStorage.setItem('dataGame', JSON.stringify(data));
    window.localStorage.setItem('time', timer);
  } else {
    anyMessage('Start the game, nothing to save here!!');
    setTimeout(closeMess(), 5000);
  }
}

function loadGame() {
  if (!localStorage.getItem('dataGame')) {
    return false;
  }
  let timer;
  if (localStorage.getItem('dataGame')) {
    timer = JSON.parse(localStorage.getItem('time'));
  } else { timer = 0; }
  const oldGame = JSON.parse(localStorage.getItem('dataGame'));
  return { oldGame, timer };
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
  rand, tileNumber, soundKeys, restart, addZero, saveGame, loadGame, showTime, getScore,
};
