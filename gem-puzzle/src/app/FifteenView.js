import { tileNumber } from './utils';
import { successMessage } from './modal';

export default class FifteenView {
  constructor(stateCurrentGames) {
    this.stateCurrentGames = stateCurrentGames;
  }

  render() {
    const {
      board, solved, codSizeField, moves,
    } = this.stateCurrentGames;
    const box = document.querySelector('div');
    if (solved) {
      box.style.backgroundColor = 'rgb(218, 165, 32)';
      successMessage(this.stateCurrentGames);
    }

    const timeText = document.querySelector('#timer');
    timeText.textContent = 'Time 00 : 00';

    const movesText = document.querySelector('#moves');
    movesText.textContent = `Moves ${moves}`;

    for (let i = 0, tile; i < board.length; i++) {
      tile = box.childNodes[i];
      tile.dataIndex = i;
      tile.textContent = tileNumber(board[i], codSizeField);
      tile.style.visibility = tileNumber(board[i], codSizeField) !== 0 ? 'visible' : 'hidden';
    }
  }
}
