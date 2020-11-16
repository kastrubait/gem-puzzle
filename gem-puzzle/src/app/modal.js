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
  const textMess = document.createElement('h4');
  textMess.setAttribute('id', 'text');
  textMess.textContent = `${text}`;

  const mess = document.body.appendChild(document.createElement('div'));
  mess.setAttribute('id', 'message');
  mess.append(textMess);

  document.getElementById('message').style.display = 'block';
}

function closeMess() {
  const textMess = document.getElementById('message');
  textMess.remove();
}

function showResults(results) {
  const title = document.createElement('h3');
  title.setAttribute('id', 'title');
  title.textContent = '        date        moves/size    time';

  const overlay = document.body.appendChild(document.createElement('div'));
  overlay.setAttribute('id', 'overlay');
  overlay.append(title);

  for (let i = 0; i < results.length; i++) {
    const row = document.createElement('p');
    row.classList.add('rowStyle');
    const {
      date, moves, size, time,
    } = results[i];
    const rez = addZero(moves);
    const min = addZero(time % 60);
    const sec = addZero(parseInt(time / 60, 10));
    row.textContent = `${date}        ${rez}/${size}       ${min} : ${sec}`;
    overlay.append(row);
  }
  document.getElementById('overlay').style.display = 'block';
}

export {
  successMessage, showMenu, anyMessage, showResults, closeMess,
};
