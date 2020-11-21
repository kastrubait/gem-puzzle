/* eslint-disable no-unused-vars */
import FifteenModel from './FifteenModel';
import FifteenView from './FifteenView';
import { NUM_ROWS, URL_IMG } from './constans';
import {
  soundKeys, restart, saveGame, loadGame, getScore, tileNumber, addZero,
} from './utils';
import {
  showMenu, successMessage, showResults, anyMessage,
} from './modal';

export default class Fifteen {
  constructor(state) {
    this.state = state;
  }

  getFifteens() {
    let isOnSound = true;
    let gamePause = true;
    let timerId;

    let model = new FifteenModel(this.state);
    let data = model.getCurrentState();
    let view = new FifteenView(data);
    view.render();

    // function startTimer(paused, time) {
    //   timer = time;
    //   const timeId = setInterval(() => {
    //     if (!paused) {
    //       timer += 1;
    //       const sec = timer % 60;
    //       const min = Math.floor(timer / 60);
    //       document.querySelector('#timer').text = `Time ${addZero(min)} : ${addZero(sec)}`;
    //     } else clearInterval(timeId);
    //     console.log(timer);
    //   }, 1000);
    // }

    // function resetTimer(timerId) {
    //   clearInterval(timerId);
    //   timer = 0;
    //   document.querySelector('#timer').textContent = `Time ${addZero(0)} : ${addZero(0)}`;
    // }

    window.addEventListener('click', (event) => {
      const index = event.target.getAttribute('data-index');
      if (index && !model.canMoveTile(index)) {
        soundKeys(isOnSound, 1);
      }
      if (index && model.moveTile(index)) {
        soundKeys(isOnSound, 0);
        data = model.getCurrentState();
        view = new FifteenView({ ...data, time: this.time });
        view.render();
        const { modeGame } = data;
        if (!modeGame) document.querySelector('.img').style.display = 'block';
        else document.querySelector('.img').style.display = 'none';
      }

      if (event.target.getAttribute('id') === 'undo') {
        const undo = model.undo();
        if (!undo) {
          data = model.getCurrentState();
          view = new FifteenView({ ...data, time: this.time });
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
        gamePause = !gamePause;
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
        const { modeGame, time } = data;
        this.time = time;
        const timeId = setInterval(() => {
          if (!gamePause) {
            this.time += 1;
            const sec = this.time % 60;
            const min = Math.floor(this.time / 60);
            document.querySelector('#timer').textContent = `Time ${addZero(min)} : ${addZero(sec)}`;
          } else clearInterval(timeId);
        }, 1000);
        if (!modeGame) document.querySelector('.img').style.display = 'block';
        else document.querySelector('.img').style.display = 'none';
        document.querySelector('#classic').classList.add('settings-panel-active');
        document.querySelector('#picture').classList.remove('settings-panel-active');
      }

      if (event.target.getAttribute('id') === 'saveGame') {
        const element = document.getElementById('overlay');
        if (element) element.remove();
        this.gameStart = false;
        data = model.getCurrentState();
        data = { ...data, time: this.time, gameStart: false };
        saveGame(data);
      }

      if (event.target.getAttribute('id') === 'oldGame') {
        const element = document.getElementById('overlay');
        if (element) element.remove();
        this.gameStart = true;
        gamePause = false;
        const { oldGame } = loadGame();
        if (oldGame) {
          model = new FifteenModel({ ...oldGame });
          view = new FifteenView(oldGame);
          view.render();
          const { modeGame, time } = oldGame;
          this.time = time;
          const timeId = setInterval(() => {
            if (!gamePause) {
              this.time += 1;
              const sec = this.time % 60;
              const min = Math.floor(this.time / 60);
              document.querySelector('#timer').textContent = `Time ${addZero(min)} : ${addZero(sec)}`;
            } else clearInterval(timeId);
          }, 1000);
          if (!modeGame) {
            document.querySelector('.img').style.display = 'block';
            document.querySelector('#picture').classList.add('settings-panel-active');
            document.querySelector('#classic').classList.remove('settings-panel-active');
          } else {
            document.querySelector('.img').style.display = 'none';
            document.querySelector('#classic').classList.add('settings-panel-active');
            document.querySelector('#picture').classList.remove('settings-panel-active');
          }
        } else anyMessage('No saves yet! Click to continue!');
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
        const { modeGame, time } = data;
        this.time = time;
        clearInterval(timerId);
        const timeId = setInterval(() => {
          if (!gamePause) {
            this.time += 1;
            const sec = this.time % 60;
            const min = Math.floor(this.time / 60);
            document.querySelector('#timer').textContent = `Time ${addZero(min)} : ${addZero(sec)}`;
          } else clearInterval(timeId);
        }, 2000);
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
        const { modeGame, time } = data;
        this.time = time;
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
        gamePause = false;
        // data = Fifteen.getCurrentState();
        // const { time } = data;
        // this.time = time;
        this.timeId = setInterval(() => {
          if (!gamePause) {
            this.time += 1;
            const sec = this.time % 60;
            const min = Math.floor(this.time / 60);
            document.querySelector('#timer').textContent = `Time ${addZero(min)} : ${addZero(sec)}`;
          } else clearInterval(this.timeId);
        }, 2000);
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
