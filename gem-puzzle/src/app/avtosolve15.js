import { tileNumber } from './utils';
import { NUM_ROWS, MOVE_DIRECTIONS, DISPLACEMENT } from './constans';

const infinity = 10000;
let minPrevIteration;
let deepness;
let step;
// эвристическая оценочная функция Манхеттеновское расстояние
const estimate = function estimate(board, boardGoal, codSizeField) {
  let manhattan = 0;
  let value;
  let m;
  for (let i = 0; i < board.length; i++) {
    value = tileNumber(board[i], codSizeField);
    if (value > 0 && value !== tileNumber(boardGoal[i], codSizeField)) {
      m = Math.abs(Math.floor(i / NUM_ROWS[codSizeField]) - boardGoal[value - 1][0])
      + Math.abs((i % NUM_ROWS[codSizeField]) - boardGoal[value - 1][1]);
      manhattan += m;
    }
  }
  return manhattan;
};

// поиск в глубину с обрезанием f=g+h < deepness
function recSearch(g, previousMove, emptyTile) {
  const h = estimate();
  // h = минимум ходов к цели
  if (h === 0) {
    return true; // если это цель - ура!
  }
  // если то, что мы прошли (g) + то, что нам как минимум осталось (h)
  // больше допустимой глубины - выход.
  const f = g + h;
  if (f > deepness) {
    // нaходим минимум стоимости среди "обрезаных" узлов
    if (minPrevIteration > f) {
      minPrevIteration = f;
    }
    return false;
  }
  let newTile;
  let res;
  // делаем всевозможные ходы
  for (let i = 0; i < NUM_ROWS[codSizeField]; i++) {
    if (MOVE_DIRECTIONS[i][1] !== previousMove) {
      // новые координаты пустой клетки
      // const newTile = x0 + dx[i]; ???
      if ((newTile[i][1] <= 3) && (newTile[i][1] >= 0) && (newTile[i][0] <= 3) && (newTile[i][0] >= 0)) {
        swap(emptyTile, newTile); // двигаем пустую клетку на новое место
        result = recSearch(g + 1, i, newTile); // рекурсивный поиск с новой позиции
        swap(emptyTile, newTile); // возвращаем пустую клетку назад
        if (result) { //если было найдено решение
          resultString = move_desc[i] + resultString; //записываем этот ход
          step++;
          return true; // и выходим
        };
      };
    };
  };
  return false; // цели не нашли
}

// итерация глубины и IDA*
function idaStar(board, boardGoal, codSizeField) {
  let result = false;
  let emptyTile;
  // начинаем с h для начального состояния
  let deepness = estimate(board, boardGoal, codSizeField);
  while (deepness <= 50 && !result) {
    const minPrevIteration = infinity;
    for (let i = 0; i < board.length; i++) {
      if (tileNumber(board[i], codSizeField) === 0) {
        emptyTile = board[i];
      }
    }
    step = 0;
    result = recSearch(0, -1, emptyTile);
    deepness = minPrevIteration;
  }
  return result;
}

function getSolution(board, boardGoal, codSizeField) {
  const listOfMoves = [];
  listOfMoves.push(estimate(board, boardGoal, codSizeField));
  console.log(listOfMoves);
  return listOfMoves;
}

export { estimate, idaStar, getSolution };
