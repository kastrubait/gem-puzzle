import { saveGame, tileNumber } from './utils';
import { successMessage } from './modal';
import {
  NUM_ROWS, URL_IMG, BG_SIZE, TILE_SIZE,
} from './constans';

export default class FifteenView {
  constructor(stateCurrentGames) {
    this.stateCurrentGames = stateCurrentGames;
  }

  render() {
    const {
      board, solved, codSizeField, modeGame, moves, numberImg,
    } = this.stateCurrentGames;
    const box = document.querySelector('div');
    box.style.backgroundColor = 'rgba(151, 35, 132, 0.816)';
    if (solved) {
      box.style.backgroundColor = 'rgb(218, 165, 32)';
      saveGame(this.stateCurrentGames);
      successMessage(this.stateCurrentGames);
    }
    // console.log(this.stateCurrentGames);
    const movesText = document.querySelector('#moves');
    movesText.textContent = `Moves ${moves}`;

    const sizeTile = NUM_ROWS[codSizeField];
    if (!modeGame) {
      const img = document.querySelector('.img');
      img.style.display = 'block';
      img.style.background = `url(${URL_IMG}/${numberImg}.jpg)`;
      img.style.backgroundSize = `${Math.floor(BG_SIZE / sizeTile)}px`;
      img.style.width = `${Math.floor(BG_SIZE / sizeTile)}px`;
      img.style.height = `${Math.floor(BG_SIZE / sizeTile)}px`;
      img.style.display = 'none';
    }
    // const [...boardPrev] = stack[stack.length - 1];
    for (let i = 0, tile; i < board.length; i++) {
      tile = box.childNodes[i];
      tile.dataIndex = i;
      if (!modeGame) {
        const bgLeft = (board[i][1]) * 100;
        const bgTop = Math.floor(board[i][0]) * 100;
        tile.style.background = `url(${URL_IMG}/${numberImg}.jpg)`;
        tile.style.backgroundSize = `${BG_SIZE}px`;
        tile.style.backgroundPosition = `-${bgLeft}px -${bgTop}px`;
        tile.textContent = '';
        tile.style.visibility = tileNumber(board[i], codSizeField) !== 0 ? 'visible' : 'hidden';
      } else if (tileNumber(board[i], codSizeField) !== 0) {
        tile.removeAttribute('style');
        // let timerIid = setInterval(frame, 10);
        // function frame() {
        //   if (topShift === topNext && leftShift === leftNext) {
        //     clearInterval(timerId);
        //   } else {
        //     topShift++;
        //     leftShift += (leftNext - leftShift) / 10;
        //   }
        // }
        const topShift = Math.floor(i / sizeTile) * (100 / sizeTile);
        const leftShift = (i % sizeTile) * (100 / sizeTile);
        tile.style.top = `${topShift}%`;
        tile.style.left = `${leftShift}%`;
        tile.style.width = `${TILE_SIZE[codSizeField] / sizeTile - 1}%`;
        tile.style.height = `${TILE_SIZE[codSizeField] / sizeTile - 1}%`;
        tile.textContent = tileNumber(board[i], codSizeField);
      }
      tile.style.visibility = tileNumber(board[i], codSizeField) !== 0 ? 'visible' : 'hidden';
    }
  }
}
