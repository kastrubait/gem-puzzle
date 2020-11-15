import FifteenModel from './FifteenModel';
import FifteenView from './FifteenView';
import { soundKeys, successMessage } from './utils';

export default class Fifteen {
  constructor(state) {
    this.state = state;
  }

  getFifteens() {
    let isOnSound = true;

    const model = new FifteenModel(this.state);
    let data = model.getCurrentState();
    let view = new FifteenView(data);
    view.render();

    window.addEventListener('mousedown', (event) => {
      const index = event.target.getAttribute('data-index');
      if (index && !model.canMoveTile(index)) {
        soundKeys(isOnSound, 1);
      }
      if (index && model.moveTile(index)) {
        soundKeys(isOnSound, 0);
        data = model.getCurrentState();
        view = new FifteenView(data);
        view.render();
      }

      if (event.target.getAttribute('id') === 'undo') {
        // console.log(model.undo());
        const undo = model.undo();
        if (!undo) {
          data = model.getCurrentState();
          view = new FifteenView(data);
          view.render();
        }
      }

      if (event.target.getAttribute('id') === 'sound') {
        const sound = document.querySelector('#sound');
        isOnSound = !isOnSound;
        if (isOnSound) {
          sound.textContent = 'Sound ON';
        } else {
          sound.textContent = 'Sound OFF';
        }
      }

      if (event.target.getAttribute('id') === 'pause') {
        successMessage(model.getCurrentState());
        document.getElementById('overlay').style.display = 'block';
      }

      if (event.target.getAttribute('id') === 'overlay') {
        document.getElementById('overlay').style.display = 'none';
      }
    });
  }
}

document.addEventListener('keyup', (event) => {
  if (event.keyCode === 37) console.log('L'); // gameState.moveInDirection('left');
  else if (event.keyCode === 38) console.log('U'); // gameState.moveInDirection('up');
  else if (event.keyCode === 39) console.log('R'); // gameState.moveInDirection('right');
  else if (event.keyCode === 40) console.log('D'); // gameState.moveInDirection('down');
});
