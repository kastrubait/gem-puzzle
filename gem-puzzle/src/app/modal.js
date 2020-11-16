function addZero(n) {
  return (parseInt(n, 10) < 10 ? '0' : '') + n;
}

function successMessage({ moves, time }) {
  const sec = time % 60;
  const min = parseInt(time / 60, 10);

  const p = document.createElement('p');
  p.textContent = `You solved the puzzle in ${addZero(min)} : ${addZero(sec)} and ${moves} moves.`;

  const heading = document.createElement('h4');
  heading.textContent = 'Congratulations!';

  const message = document.createElement('section');
  message.setAttribute('id', 'infoVictory');
  message.append(heading, p);

  const overlay = document.body.appendChild(document.createElement('div'));
  overlay.setAttribute('id', 'overlay');
  overlay.append(message);

  document.getElementById('overlay').style.display = 'block';
}

function showMenu() {
  const newGame = document.createElement('h4');
  newGame.setAttribute('id', 'newGame');
  newGame.textContent = 'new game';

  const oldGame = document.createElement('h4');
  oldGame.setAttribute('id', 'oldGame');
  oldGame.textContent = 'continue game';

  const saveGame = document.createElement('h4');
  saveGame.setAttribute('id', 'saveGame');
  saveGame.textContent = 'save game';

  const bestScore = document.createElement('h4');
  bestScore.setAttribute('id', 'bestScore');
  bestScore.textContent = 'best score';

  const settings = document.createElement('h4');
  settings.setAttribute('id', 'settings');
  settings.textContent = 'settings';

  const message = document.createElement('section');
  message.setAttribute('id', 'menu');
  message.append(newGame, oldGame, saveGame, bestScore, settings);

  const overlay = document.body.appendChild(document.createElement('div'));
  overlay.setAttribute('id', 'overlay');
  overlay.append(message);

  document.getElementById('overlay').style.display = 'block';
}

function anyMessage(text) {
  document.getElementById('overlay').style.display = 'none';

  const textMess = document.createElement('h4');
  textMess.setAttribute('id', 'text');
  textMess.textContent = `${text}`;

  const close = document.createElement('h4');
  close.setAttribute('id', 'close');
  close.textContent = 'close';

  const message = document.createElement('section');
  message.setAttribute('id', 'infoVictory');
  message.append(textMess, close);

  const overlay = document.body.appendChild(document.createElement('div'));
  overlay.setAttribute('id', 'overlay');
  overlay.append(message);

  document.getElementById('overlay').style.display = 'block';
}

export {
  successMessage, showMenu, anyMessage,
};
