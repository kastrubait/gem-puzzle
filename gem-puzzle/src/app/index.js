import '../style/style.css';

function getResult() {
    const myGame = '15'
    const p = document.createElement('p')
    p.textContent = `Цель игры  ${myGame} — перемещая костяшки по коробке, добиться упорядочивания их по номерам, 
    желательно сделав как можно меньше перемещений.`
    
    const heading = document.createElement('h1')
    heading.textContent = 'Игра пятнашки!';
    const root = document.querySelector('#root')
    root.append(heading, p)
}

document.addEventListener('DOMContentLoaded', getResult());

