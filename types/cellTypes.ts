export enum CellValue {
  none,
  one,
  two,
  three,
  four,
  five,
  six,
  seven,
  eight,
  bomb,
}

export enum CellState {
  notTouched,
  visible,
  flagged,
}

export type Cell = {value: CellValue; state: CellState; red?: boolean};

export enum Face {
  smile = '😁',
  lost = '😵',
  won = '😎',
}

export enum fontColor {
  '--',
  'blue',
  'green',
  'red',
  'purple',
  'maroon',
  'turquoise',
  'black',
  'gray',
}
