/* eslint-disable no-unused-vars */
import FifteenModel from './FifteenModel';
import FifteenView from './FifteenView';
import { NUM_ROWS, URL_IMG } from './constans';
import {
  soundKeys, restart, saveGame, loadGame, showTime, getScore, tileNumber, addZero,
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
    let gamePause = true;

    let model = new FifteenModel(this.state);
    let data = model.getCurrentState();
    let view = new FifteenView(data);
    view.render();
    const { time, startGame } = data;
    showTime(gamePause, startGame, time);

    window.addEventListener('click', (event) => {
      const index = event.target.getAttribute('data-index');
      if (index && !model.canMoveTile(index)) {
        soundKeys(isOnSound, 1);
      }
      if (index && model.moveTile(index)) {
        soundKeys(isOnSound, 0);
        data = model.getCurrentState();
        view = new FifteenView(data);
        view.render();
        const { modeGame } = data;
        if (!modeGame) document.querySelector('.img').style.display = 'block';
        else document.querySelector('.img').style.display = 'none';
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
        this.gameStart = false;
      }

      if (event.target.getAttribute('id') === 'newGame') {
        const element = document.getElementById('overlay');
        element.remove();
        gamePause = false;
        const newState = restart();
        model = new FifteenModel({ ...newState });
        data = model.getCurrentState();
        view = new FifteenView(data);
        view.render();
        const { modeGame } = data;
        if (!modeGame) document.querySelector('.img').style.display = 'block';
        else document.querySelector('.img').style.display = 'none';
        document.querySelector('#classic').classList.add('settings-panel-active');
        document.querySelector('#picture').classList.remove('settings-panel-active');
      }

      if (event.target.getAttribute('id') === 'saveGame') {
        this.gameStart = false;
        data = model.getCurrentState();
        saveGame(data, 0);
      }

      if (event.target.getAttribute('id') === 'oldGame') {
        const element = document.getElementById('overlay');
        if (element) element.remove();
        const { oldGame, timer } = loadGame();
        const { modeGame } = oldGame;
        if (oldGame) {
          model = new FifteenModel({ ...oldGame });
          data = model.getCurrentState();
          view = new FifteenView(oldGame);
          view.render();
          if (!modeGame) {
            document.querySelector('.img').style.display = 'block';
            document.querySelector('#picture').classList.add('settings-panel-active');
            document.querySelector('#classic').classList.remove('settings-panel-active');
          } else {
            document.querySelector('.img').style.display = 'none';
            document.querySelector('#classic').classList.add('settings-panel-active');
            document.querySelector('#picture').classList.remove('settings-panel-active');
          }
          this.gameStart = true;
          gamePause = false;
          showTime(timer);
        }
      }

      if (event.target.getAttribute('id') === 'bestScore') {
        const element = document.getElementById('overlay');
        if (element) element.remove();
        const results = getScore();
        showResults(results);
      }

      if (event.target.getAttribute('id') === 'classic') {
        this.state.modeGame = 1;
        this.state.gameStart = true;
        this.state.stack = [];
        model = new FifteenModel(this.state);
        data = model.getCurrentState();
        view = new FifteenView(data);
        view.render();
        const { modeGame } = data;
        if (modeGame && document.querySelector('.img')) document.querySelector('.img').style.display = 'none';
        document.querySelector('#classic').classList.add('settings-panel-active');
        document.querySelector('#picture').classList.remove('settings-panel-active');
      }

      if (event.target.getAttribute('id') === 'picture') {
        this.state.numberImg = Math.floor(Math.random() * 150);
        this.gameStart = true;
        this.state.modeGame = 0;
        this.state.gameStart = true;
        this.state.stack = [];
        model = new FifteenModel(this.state);
        data = model.getCurrentState();
        view = new FifteenView(data);
        view.render();
        const { modeGame } = data;
        if (!modeGame) document.querySelector('.img').style.display = 'block';
        document.querySelector('#picture').classList.add('settings-panel-active');
        document.querySelector('#classic').classList.remove('settings-panel-active');
      }

      // if (event.target.getAttribute('id') === 'finish') {
      //   const element = document.getElementById('overlay');
      //   if (element) element.remove();
      // }

      if (event.target.getAttribute('id') === 'overlay') {
        const element = document.getElementById('overlay');
        if (element) element.remove();
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
