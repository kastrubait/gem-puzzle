import { tileNumber } from './utils';
import { successMessage } from './modal';
import { NUM_ROWS } from './constans';

export default class FifteenView {
  constructor(stateCurrentGames) {
    this.stateCurrentGames = stateCurrentGames;
  }

  render() {
    const {
      board, solved, codSizeField, modeGame, moves,
    } = this.stateCurrentGames;
    const box = document.querySelector('div');
    if (solved) {
      box.style.backgroundColor = 'rgb(218, 165, 32)';
      successMessage(this.stateCurrentGames);
    }
    // console.log(this.stateCurrentGames);
    const timeText = document.querySelector('#timer');
    timeText.textContent = 'Time 00 : 00';

    const movesText = document.querySelector('#moves');
    movesText.textContent = `Moves ${moves}`;

    if (!modeGame) {
      const img = document.createElement('div');
      img.classList.add('img');
      img.style.background = 'url(./public/140.jpg)';
      img.style.backgroundSize = '120px';
      img.style.width = '120px';
      img.style.height = '120px';
      img.style.display = 'none';
      const root = document.querySelector('#root');
      root.append(img);
    }

    const sizeTile = NUM_ROWS[codSizeField];
    for (let i = 0, tile; i < board.length; i++) {
      tile = box.childNodes[i];
      tile.dataIndex = i;
      if (!modeGame) {
        const bgLeft = (tileNumber(board[i], codSizeField) % 4) * 100;
        const bgTop = Math.floor(tileNumber(board[i], codSizeField) / 4) * 100;
        tile.style.background = 'url(./public/140.jpg)';
        tile.style.backgroundSize = '420px';
        tile.style.backgroundPosition = `-${bgLeft}px -${bgTop}px`;
        tile.textContent = '';
      } else if (tileNumber(board[i], codSizeField) !== 0) {
        tile.removeAttribute('style');
        const topShift = Math.floor(i / sizeTile) * (100 / sizeTile);
        const leftShift = (i % sizeTile) * (100 / sizeTile);
        tile.style.top = `${topShift}%`;
        tile.style.left = `${leftShift}%`;
        tile.style.width = `${75 / sizeTile - 1}%`;
        tile.style.height = `${75 / sizeTile - 1}%`;
        tile.textContent = tileNumber(board[i], codSizeField);
      }
      tile.style.visibility = tileNumber(board[i], codSizeField) !== 0 ? 'visible' : 'hidden';
    }
  }
}
