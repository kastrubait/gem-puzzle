const NUM_ROWS = [3, 4, 5, 6, 7, 8];
const NUM_COLS = NUM_ROWS;
const NUM_TILES = [9, 16, 25, 36, 49, 64];
const TILE_SIZE = [81, 75, 71, 65, 57, 51];
const MOVE_DIRECTIONS = {
  up: -4, down: -1, left: 4, right: 1,
};
const URL_IMG = 'https://raw.githubusercontent.com/kastrubait/image-data/master/box';
const BG_SIZE = 420;

export {
  NUM_ROWS, NUM_COLS, NUM_TILES, MOVE_DIRECTIONS, URL_IMG, BG_SIZE, TILE_SIZE,
};
