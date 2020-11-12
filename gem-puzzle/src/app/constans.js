const NUM_ROWS = [3, 4, 5, 6, 7, 8];
const NUM_COLS = [3, 4, 5, 6, 7, 8];
const NUM_TILES = [9, 16, 25, 36, 49, 64];
const EMPTY_INDEX = NUM_TILES - 1;
const SHUFFLE_MOVES_RANGE = [60, 80];
const MOVE_DIRECTIONS = ['up', 'down', 'left', 'right'];

// function rand(min, max) {
//   return min + Math.floor(Math.random() * (max - min + 1));
// }

export {
  NUM_ROWS, NUM_COLS, NUM_TILES, EMPTY_INDEX, MOVE_DIRECTIONS, SHUFFLE_MOVES_RANGE,
};
