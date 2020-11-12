import NUM_TILES from './constans';

export default class FifteenView {
  constructor(stateCurrentGames) {
    this.stateCurrentGames = stateCurrentGames;
  }

  render() {
    const { isSolved, codSizeField, orderTiles } = this.stateCurrentGames;
    const box = document.querySelectorAll('div');
    if (isSolved) {
      box.style.backgroundColor = 'gold';
    }

    for (let i = 0, tile; i < NUM_TILES[codSizeField]; i++) {
      tile = box.childNodes[i];
      tile.textContent = orderTiles[i];
      tile.style.visibility = orderTiles[i] ? 'visible' : 'hidden';
    }
  }
}
