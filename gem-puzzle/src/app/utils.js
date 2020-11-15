import { NUM_ROWS } from './constans';

function rand(min, max) {
  return min + Math.floor(Math.random() * (max - min + 1));
}

function addZero(n) {
  return (parseInt(n, 10) < 10 ? '0' : '') + n;
}

function successMessage({ moves, time }) {
  console.log(moves);
  const sec = time % 60;
  const min = parseInt(time / 60, 10);

  const p = document.createElement('p');
  p.textContent = `You solved the puzzle in ${addZero(min)} : ${addZero(sec)} and ${moves} moves.`;

  const heading = document.createElement('h4');
  heading.textContent = 'Congratulations!';

  const message = document.createElement('section');
  message.setAttribute('id', 'infoVictory');
  message.append(heading, p);

  const overlay = document.body.appendChild(document.createElement('div'));
  overlay.setAttribute('id', 'overlay');
  overlay.append(message);
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

export {
  rand, successMessage, tileNumber, soundKeys,
};
