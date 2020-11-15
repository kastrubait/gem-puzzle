import { NUM_ROWS } from './constans';

function rand(min, max) {
  return min + Math.floor(Math.random() * (max - min + 1));
}

function successMessage({ moves, time }) {
  console.log(moves, time);
}

function tileNumber(arr, i) {
  const [a, b] = arr;
  const number = a * NUM_ROWS[i] + b + 1;
  return (number !== 16) ? number : 0;
}

function soundKeys({ isOnSound }) {
  if (isOnSound) {
    const audio = new Audio();
    audio.preload = 'auto';
    audio.src = 'src/public/sound_one.mp3';
    audio.play();
  }
}

// function addZero(n) {
//   return (parseInt(n, 10) < 10 ? '0' : '') + n;
// }

// function startTimer({ gamePause, gameStart, time }) {
//   const timeId = setInterval(() => {
//     if (!gamePause && !gameStart) {
//       time += 1;
//       const sec = this.timer % 60;
//       const min = parseInt(this.timer / 60, 10);
//       return `Time ${addZero(min)} <span>:</span> ${addZero(sec)}`;
//     }
//   }, 1000);
// }

// function resetTimer(timeId) {
//   clearInterval(timeId);
//   this.time = 0;
//   this.sec = 0;
//   this.min = 0;
//   return `Time ${addZero(this.min)} <span>:</span> ${addZero(this.sec)}`;
// }

export {
  rand, successMessage, tileNumber, soundKeys,
};
