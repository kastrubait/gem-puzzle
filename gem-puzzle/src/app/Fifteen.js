/* eslint-disable no-unused-vars */
import FifteenModel from './FifteenModel';
import FifteenView from './FifteenView';
import {
  soundKeys, restart, saveGame, loadGame, showTime, getScore,
} from './utils';
import {
  showMenu, successMessage, showResults,
} from './modal';

export default class Fifteen {
  constructor(state) {
    this.state = state;
  }

  getFifteens() {
    let isOnSound = true;
    let gameStart = true;
    let gamePause = false;

    let model = new FifteenModel(this.state);
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
        gamePause = true;
        showMenu();
      }

      if (event.target.getAttribute('id') === 'victory') {
        successMessage(model.getCurrentState());
        gameStart = false;
      }

      if (event.target.getAttribute('id') === 'newGame') {
        const element = document.getElementById('overlay');
        element.remove();
        const newState = restart();
        model = new FifteenModel(newState);
        data = model.getCurrentState();
        view = new FifteenView(data);
        view.render();
        gameStart = true;
      }

      if (event.target.getAttribute('id') === 'saveGame') {
        gameStart = false;
        data = model.getCurrentState();
        saveGame(data, 0);
      }

      if (event.target.getAttribute('id') === 'oldGame') {
        const element = document.getElementById('overlay');
        element.remove();
        const { oldGame, timer } = loadGame();
        if (oldGame) {
          view = new FifteenView(oldGame);
          view.render();
          gameStart = true;
          gamePause = false;
          showTime(timer);
        }
      }

      if (event.target.getAttribute('id') === 'bestScore') {
        const element = document.getElementById('overlay');
        element.remove();
        const results = getScore();
        showResults(results);
      }

      if (event.target.getAttribute('id') === 'overlay') {
        const element = document.getElementById('overlay');
        element.remove();
      }
    });

    // document.addEventListener('keyup', (event) => {
    //   if (event.keyCode === 37) FifteenModel.moveInDirection('left');
    //   else if (event.keyCode === 38) FifteenModel.moveInDirection('up');
    //   else if (event.keyCode === 39) FifteenModel.moveInDirection('right');
    //   else if (event.keyCode === 40) FifteenModel.moveInDirection('down');
    // });
  }
}
