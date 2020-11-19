import {Cell} from '../../types/cellTypes';

export const grabAllAdjacentCells = (
  cells: Cell[][],
  rowParam: number,
  colParam: number,
  maxRow: number,
  maxColumn: number,
): {
  topLeftCell: Cell | null;
  topCell: Cell | null;
  topRightCell: Cell | null;
  leftCell: Cell | null;
  rightCell: Cell | null;
  bottomLeftCell: Cell | null;
  bottomCell: Cell | null;
  bottomRightCell: Cell | null;
} => {
  const topLeftCell =
    rowParam > 0 && colParam > 0 ? cells[rowParam - 1][colParam - 1] : null;
  const topCell = rowParam > 0 ? cells[rowParam - 1][colParam] : null;
  const topRightCell =
    rowParam > 0 && colParam < maxColumn - 1
      ? cells[rowParam - 1][colParam + 1]
      : null;
  const leftCell = colParam > 0 ? cells[rowParam][colParam - 1] : null;
  const rightCell =
    colParam < maxColumn - 1 ? cells[rowParam][colParam + 1] : null;
  const bottomLeftCell =
    rowParam < maxRow - 1 && colParam > 0
      ? cells[rowParam + 1][colParam - 1]
      : null;
  const bottomCell =
    rowParam < maxRow - 1 ? cells[rowParam + 1][colParam] : null;
  const bottomRightCell =
    rowParam < maxRow - 1 && colParam < maxColumn - 1
      ? cells[rowParam + 1][colParam + 1]
      : null;

  return {
    topLeftCell,
    topCell,
    topRightCell,
    leftCell,
    rightCell,
    bottomLeftCell,
    bottomCell,
    bottomRightCell,
  };
};
