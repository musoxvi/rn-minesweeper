import {Cell, CellState, CellValue} from '../../types/cellTypes';
import {grabAllAdjacentCells} from './grabAllAdjacentCells';

class ConfigGame {
  public _maxRow: number = 4;
  public _maxColunm: number = 4;
  public _numberOfBomb: number = 2;
  public _hasBombs: boolean = false;
  public _board: Cell[][] | null = null;

  public get getConfig() {
    return {
      maxRow: this._maxRow,
      maxColumn: this._maxColunm,
      bombs: this._numberOfBomb,
      hasBombs: this._hasBombs,
      board: this._board,
    };
  }
}

let configGame = new ConfigGame();

export const resetBoard = () => {
  configGame._hasBombs = false;
  configGame._board = null;
  configGame._maxRow = 0;
  configGame._maxColunm = 0;
};

/**
 * this method adds { bombs } number of pumps dynamically at random.
 * @param bombs
 * @param maxRow
 * @param maxColumn
 * @param board
 */
const addRandomBombs = (
  bombs: number,
  maxRow: number,
  maxColumn: number,
  board: Cell[][],
) => {
  configGame._maxRow = maxRow;
  configGame._maxColunm = maxColumn;
  configGame._numberOfBomb = bombs;

  if (configGame.getConfig.hasBombs) {
    return board;
  }

  let bombsPlaced = 0;
  while (bombsPlaced < bombs) {
    const randomRow = Math.floor(Math.random() * maxRow);
    const randomCol = Math.floor(Math.random() * maxColumn);
    const currentCell = board[randomRow][randomCol];

    if (currentCell.value !== CellValue.bomb) {
      board = board.map((row, rowIndex) =>
        row.map((cell, colIndex) => {
          if (randomRow === rowIndex && randomCol === colIndex) {
            return {
              ...cell,
              value: CellValue.bomb,
            };
          }

          return cell;
        }),
      );
      bombsPlaced++;
    }
  }
  configGame._hasBombs = true;
  return board;
};

/**
 * generateBoard - this function generates a 2d grid for our board based on
 * the number of columns and rows
 * @param {number} maxRow
 * @param {number} maxColumn
 * @param {number} bombs
 */
export const generateBoard = (
  maxRow: number,
  maxColumn: number,
  bombs: number,
): Cell[][] => {
  let board: Cell[][] = !configGame.getConfig.board
    ? Array.apply(null, Array(maxRow)).map(() => {
        return Array.apply(null, Array(maxColumn)).map(() => {
          return {
            value: CellValue.none,
            state: CellState.notTouched,
          };
        });
      })
    : configGame.getConfig.board;

  board = addRandomBombs(bombs, maxRow, maxColumn, board);

  board.forEach((row, rowIndex) => {
    let numberOfBombs = 0;
    row.forEach((col, colIndex) => {
      const currentCell = board[rowIndex][colIndex];
      const allAdjacentCells = grabAllAdjacentCells(
        board,
        rowIndex,
        colIndex,
        maxRow,
        maxColumn,
      );

      if (currentCell.value === CellValue.bomb) {
        return false;
      }

      if (
        allAdjacentCells.topLeftCell?.value === CellValue.bomb ||
        allAdjacentCells.topCell?.value === CellValue.bomb ||
        allAdjacentCells.topRightCell?.value === CellValue.bomb ||
        allAdjacentCells.leftCell?.value === CellValue.bomb ||
        allAdjacentCells.rightCell?.value === CellValue.bomb ||
        allAdjacentCells.bottomLeftCell?.value === CellValue.bomb ||
        allAdjacentCells.bottomCell?.value === CellValue.bomb ||
        allAdjacentCells.bottomRightCell?.value === CellValue.bomb
      ) {
        numberOfBombs++;
      }

      if (numberOfBombs > 0) {
        board[rowIndex][colIndex] = {
          ...currentCell,
          value: numberOfBombs,
        };
      }
    });
  });
  configGame._board = board;

  return board;
};

/**
 * openMultipleCells
 * @param {Cell[][]} cells
 * @param {number} rowParam
 * @param {number} colParam
 * @returns {Cell[][]}
 */
export const openMultipleCells = (
  board: Cell[][],
  rowParam: number,
  colParam: number,
): Cell[][] => {
  const currentCell = board[rowParam][colParam];
  const allAdjacentCells = grabAllAdjacentCells(
    board,
    rowParam,
    colParam,
    configGame.getConfig.maxRow,
    configGame.getConfig.maxColumn,
  );

  if (
    currentCell.state === CellState.visible ||
    currentCell.state === CellState.flagged
  ) {
    return board;
  }

  let newBoard = board.slice();
  newBoard[rowParam][colParam].state = CellState.visible;

  if (
    allAdjacentCells.topLeftCell?.state === CellState.notTouched &&
    allAdjacentCells.topLeftCell?.value !== CellValue.bomb
  ) {
    if (allAdjacentCells.topLeftCell.value === CellValue.none) {
      newBoard = openMultipleCells(newBoard, rowParam - 1, colParam - 1);
    } else {
      newBoard[rowParam - 1][colParam - 1].state = CellState.visible;
    }
  }

  if (
    allAdjacentCells.topCell?.state === CellState.notTouched &&
    allAdjacentCells.topCell.value !== CellValue.bomb
  ) {
    if (allAdjacentCells.topCell.value === CellValue.none) {
      newBoard = openMultipleCells(newBoard, rowParam - 1, colParam);
    } else {
      newBoard[rowParam - 1][colParam].state = CellState.visible;
    }
  }

  if (
    allAdjacentCells.topRightCell?.state === CellState.notTouched &&
    allAdjacentCells.topRightCell.value !== CellValue.bomb
  ) {
    if (allAdjacentCells.topRightCell.value === CellValue.none) {
      newBoard = openMultipleCells(newBoard, rowParam - 1, colParam + 1);
    } else {
      newBoard[rowParam - 1][colParam + 1].state = CellState.visible;
    }
  }

  if (
    allAdjacentCells.leftCell?.state === CellState.notTouched &&
    allAdjacentCells.leftCell.value !== CellValue.bomb
  ) {
    if (allAdjacentCells.leftCell.value === CellValue.none) {
      newBoard = openMultipleCells(newBoard, rowParam, colParam - 1);
    } else {
      newBoard[rowParam][colParam - 1].state = CellState.visible;
    }
  }

  if (
    allAdjacentCells.rightCell?.state === CellState.notTouched &&
    allAdjacentCells.rightCell.value !== CellValue.bomb
  ) {
    if (allAdjacentCells.rightCell.value === CellValue.none) {
      newBoard = openMultipleCells(newBoard, rowParam, colParam + 1);
    } else {
      newBoard[rowParam][colParam + 1].state = CellState.visible;
    }
  }

  if (
    allAdjacentCells.bottomLeftCell?.state === CellState.notTouched &&
    allAdjacentCells.bottomLeftCell.value !== CellValue.bomb
  ) {
    if (allAdjacentCells.bottomLeftCell.value === CellValue.none) {
      newBoard = openMultipleCells(newBoard, rowParam + 1, colParam - 1);
    } else {
      newBoard[rowParam + 1][colParam - 1].state = CellState.visible;
    }
  }

  if (
    allAdjacentCells.bottomCell?.state === CellState.notTouched &&
    allAdjacentCells.bottomCell.value !== CellValue.bomb
  ) {
    if (allAdjacentCells.bottomCell.value === CellValue.none) {
      newBoard = openMultipleCells(newBoard, rowParam + 1, colParam);
    } else {
      newBoard[rowParam + 1][colParam].state = CellState.visible;
    }
  }

  if (
    allAdjacentCells.bottomRightCell?.state === CellState.notTouched &&
    allAdjacentCells.bottomRightCell.value !== CellValue.bomb
  ) {
    if (allAdjacentCells.bottomRightCell.value === CellValue.none) {
      newBoard = openMultipleCells(newBoard, rowParam + 1, colParam + 1);
    } else {
      newBoard[rowParam + 1][colParam + 1].state = CellState.visible;
    }
  }

  return newBoard;
};
