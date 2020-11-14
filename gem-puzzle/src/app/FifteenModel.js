/* eslint-disable no-param-reassign */
import {
  NUM_TILES, NUM_ROWS, NUM_COLS,
} from './constans';

import { tileNumber } from './utils';

export default class FifteenModel {
  constructor(state) {
    this.state = state;
  }

  static getNewBoard(codSizeField) {
    const solvedBoard = Array(NUM_TILES[codSizeField]).fill(0).map((x, index) => [
      Math.floor(index / NUM_ROWS[codSizeField]),
      index % NUM_COLS[codSizeField],
    ]);
    return solvedBoard;
  }

  static isSolved(codSizeField, newBoard) {
    const solvedBoard = FifteenModel.getNewBoard(codSizeField);
    for (let i = 0; i < NUM_TILES[codSizeField]; i++) {
      if (newBoard[i][0] !== solvedBoard[i][0]
          || newBoard[i][1] !== solvedBoard[i][1]) { return false; }
    }
    return true;
  }

  static swap(arrTile, i1, i2) {
    const t = arrTile[i1];
    arrTile[i1] = arrTile[i2];
    arrTile[i2] = t;
  }

  static solvable(k, newBoard) {
    let kDisorder = 0;
    for (let i = 1; i < newBoard.length - 1; i++) {
      for (let j = i - 1; j >= 0; j--) {
        if (tileNumber(newBoard[j], k) > tileNumber(newBoard[i], k)) {
          kDisorder += 1;
        }
      }
    }
    return !(kDisorder % 2);
  }

  getCurrentState() {
    const { codSizeField, moves, time } = this.state;
    if (moves === 0 && time === 0) {
      const newBoard = FifteenModel.getNewBoard(codSizeField)
        .sort(() => Math.random() - 0.5);
      if (!FifteenModel.solvable(codSizeField, newBoard)) FifteenModel.swap(newBoard, 0, 1);
      return {
        codSizeField,
        moves,
        time,
        board: newBoard,
        solved: FifteenModel.isSolved(codSizeField, newBoard),
      };
    }
    return {
      codSizeField,
      board: this.board,
      moves: this.moves,
      time: this.time,
      solved: false,
    };
  }
}
