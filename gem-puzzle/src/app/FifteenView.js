import { successMessage, tileNumber } from './utils';

export default class FifteenView {
  constructor(stateCurrentGames) {
    this.stateCurrentGames = stateCurrentGames;
  }

  render() {
    const {
      board, solved, codSizeField,
    } = this.stateCurrentGames;
    const box = document.querySelector('div');
    // console.log(this.stateCurrentGames);
    if (solved) {
      box.style.backgroundColor = 'gold';
      successMessage(this.stateCurrentGames);
    }

    for (let i = 0, tile; i < board.length; i++) {
      tile = box.childNodes[i];
      tile.textContent = tileNumber(board[i], codSizeField);
      tile.style.visibility = tileNumber(board[i], codSizeField) !== 0 ? 'visible' : 'hidden';
    }
  }
}
