/* eslint-disable no-param-reassign */
import {
  NUM_TILES, NUM_ROWS, NUM_COLS, MOVE_DIRECTIONS,
} from './constans';

import { tileNumber } from './utils';

export default class FifteenModel {
  constructor({
    codSizeField, moves, time, board, modeGame, emptyIndex, shuffling, stack, startGame, isOnSound,
  }) {
    // this.state = state;
    this.codSizeField = codSizeField;
    this.modeGame = modeGame;
    this.board = board;
    this.emptyIndex = emptyIndex;
    this.shuffling = shuffling;
    this.stack = stack;
    this.moves = moves;
    this.time = time;
    this.isOnSound = isOnSound;
    this.startGame = startGame;
  }

  static getNewBoard(codSizeField) {
    const solvedBoard = Array(NUM_TILES[codSizeField]).fill(0).map((x, index) => [
      Math.floor(index / NUM_ROWS[codSizeField]),
      index % NUM_COLS[codSizeField],
    ]);
    return solvedBoard;
  }

  isSolved(newBoard) {
    const solvedBoard = FifteenModel.getNewBoard(this.codSizeField);
    for (let i = 0; i < NUM_TILES[this.codSizeField]; i++) {
      if (newBoard[i][0] !== solvedBoard[i][0]
          || newBoard[i][1] !== solvedBoard[i][1]) { return false; }
    }
    this.shuffling = true;
    return true;
  }

  static getEmptyIndex(board, k) {
    let emptyIndex = null;
    for (let i = 0; i < board.length; i++) {
      if (tileNumber(board[i], k) === 0) emptyIndex = i;
    }
    return emptyIndex;
  }

  static swap(arrTile, i1, i2) {
    const t = arrTile[i1];
    arrTile[i1] = arrTile[i2];
    arrTile[i2] = t;
  }

  static solvable(board) {
    let kDisorder = 0;
    const k = this.codSizeField;
    for (let i = 1; i < board.length - 1; i++) {
      for (let j = i - 1; j >= 0; j--) {
        if (tileNumber(board[j], k) > tileNumber(board[i], k)) {
          kDisorder += 1;
        }
      }
    }
    return !(kDisorder % 2);
  }

  static moveInDirection(direction) {
    const move = MOVE_DIRECTIONS[direction];
    // const emptyIndex = FifteenModel.getEmptyIndex(this.board, this.codSizeField);;
    const index = this.emptyIndex + move;
    // console.log(direction, move, this.emptyIndex, index);
    return index;
  }

  canMoveTile(index) {
    if (index < 0 || index >= NUM_TILES[this.codSizeField]) return false;
    const tilePos0 = Math.floor(index / NUM_ROWS[this.codSizeField]);
    const tilePos1 = index % NUM_COLS[this.codSizeField];
    const emptyPos0 = Math.floor(this.emptyIndex / NUM_ROWS[this.codSizeField]);
    const emptyPos1 = this.emptyIndex % NUM_COLS[this.codSizeField];
    if (tilePos0 === emptyPos0) return Math.abs(tilePos1 - emptyPos1) === 1;
    if (tilePos1 === emptyPos1) return Math.abs(tilePos0 - emptyPos0) === 1;
    return false;
  }

  moveTile(index) {
    if (this.isSolved(this.board)) return false;
    if (!this.canMoveTile(index)) return false;
    const emptyPosition = [...this.board[this.emptyIndex]];
    const tilePosition = [...this.board[index]];
    const boardAfterMove = [...this.board];
    boardAfterMove[this.emptyIndex] = tilePosition;
    boardAfterMove[index] = emptyPosition;

    if (!this.shuffling) this.stack.push(this.board);
    this.board = boardAfterMove;
    this.emptyIndex = FifteenModel.getEmptyIndex(this.board, this.codSizeField);
    if (!this.shuffling) this.moves += 1;
    return true;
  }

  undo() {
    if (this.stack.length !== 0) {
      this.board = this.stack.pop();
      this.moves -= 1;
      this.emptyIndex = FifteenModel.getEmptyIndex(this.board, this.codSizeField);
    }
    return false;
  }

  getCurrentState() {
    if (this.moves === 0 && this.time === 0 && !this.startGame) {
      const newBoard = FifteenModel.getNewBoard(this.codSizeField)
        .sort(() => Math.random() - 0.5);
      if (!FifteenModel.solvable(newBoard)) FifteenModel.swap(newBoard, 0, 1);
      this.startGame = true;
      this.shuffling = false;
      this.board = newBoard;
      this.emptyIndex = FifteenModel.getEmptyIndex(this.board, this.codSizeField);
      // this.solved = FifteenModel.isSolved();
    }
    return {
      codSizeField: this.codSizeField,
      moves: this.moves,
      time: this.time,
      board: this.board,
      emptyIndex: this.emptyIndex,
      solved: this.solved,
      isOnSound: this.isOnSound,
      stack: this.stack,
    };
  }
}
