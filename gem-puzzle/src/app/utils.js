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

export { rand, successMessage, tileNumber };
