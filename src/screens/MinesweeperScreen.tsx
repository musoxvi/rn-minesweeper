import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
// Models
import {Cell, CellState, CellValue, Face} from '../../types/cellTypes';
import {ConfigType} from '../../types/configTypes';
// Components
import GridButton from '../components/GridButton';
import NumberDisplay from '../components/NumberDisplay';
// Utils
import {generateCells, openMultipleCells, resetCells} from '../utils/cells';
import {Borders, Center, Colors} from '../utils/styles';

type Props = {config: ConfigType};
const MinesweeperScreen: React.FC<Props> = ({config}) => {
  // const [config, setConfig] = useState<ConfigType>({
  //   maxRow: 8,
  //   maxColunm: 8,
  //   numberOfBomb: 2,
  // });
  const [cells, setCells] = useState(
    generateCells(config.maxRow, config.maxColunm, config.numberOfBomb),
  );
  const [face, setFace] = useState<Face>(Face.smile);
  const [resetTimer, setResetTimer] = useState<number | undefined>(undefined);
  const [live, setLive] = useState<boolean>(false);
  const [hasLost, setHasLost] = useState<boolean>(false);
  const [hasWon, setHasWon] = useState<boolean>(false);

  useEffect(() => {
    if (hasLost) {
      setLive(false);
      setFace(Face.lost);
    }
  }, [hasLost]);

  useEffect(() => {
    if (hasWon) {
      setLive(false);
      setFace(Face.won);
    }
  }, [hasWon]);

  /**
   * handleFlag - this function is responsible for marking the flag
   * when the user detects a bomb
   * @param rowParam
   * @param colParam
   */
  const handleFlag = (rowParam: number, colParam: number) => {
    let newCells = [...cells];
    const currentCell = newCells[rowParam][colParam];

    currentCell.state = CellState.flagged;
    setCells(newCells);
  };

  /**
   *  Check to see if you have won
   * @param {Cell[][]} newCells
   * @returns {boolean}
   */
  const handleHasWon = (newCells: Cell[][]): boolean => {
    let safeOpenCellsExists = false;
    for (let row = 0; row < config.maxRow; row++) {
      for (let col = 0; col < config.maxColunm; col++) {
        const currCell = newCells[row][col];

        if (
          currCell.value !== CellValue.bomb &&
          currCell.state === CellState.notTouched
        ) {
          safeOpenCellsExists = true;
          break;
        }
      }
    }
    return safeOpenCellsExists;
  };

  /**
   * handleCellPress
   * @param {number} rowParam
   * @param {number} colParam
   */
  const handleCellPress = React.useCallback(
    (rowParam: number, colParam: number) => {
      let newCells = [...cells];
      const currentCell = newCells[rowParam][colParam];

      // start the game
      if (!live) {
        setResetTimer(undefined);
        setLive(true);
      }

      if ([CellState.flagged, CellState.visible].includes(currentCell.state)) {
        return;
      }

      if (currentCell.value === CellValue.bomb) {
        setHasLost(true);
        setCells(showAllBombs());
        return;
      } else if (currentCell.value === CellValue.none) {
        newCells = openMultipleCells(newCells, rowParam, colParam);
      } else {
        newCells[rowParam][colParam].state = CellState.visible;
      }

      if (!handleHasWon(newCells)) {
        newCells = newCells.map((row) =>
          row.map((cell) => {
            if (cell.value === CellValue.bomb) {
              return {
                ...cell,
                state: CellState.flagged,
              };
            }
            return cell;
          }),
        );
        setHasWon(true);
      }
      setCells(newCells);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [cells],
  );

  /**
   * handleFaceClick
   * this function is responsible for restarting the game when
   * the user taps on the face
   */
  const handleFaceClick = (): void => {
    setCells(
      generateCells(config.maxRow, config.maxColunm, config.numberOfBomb),
    );
    setLive(false);
    setResetTimer(0);
    resetCells();
    setHasLost(false);
    setHasWon(false);
    setFace(Face.smile);
  };

  /**
   * showAllBombs
   * This function is in responsible for displaying all the boms when
   * the user has pressed one of them
   * @returns {Cell[][]}
   */
  const showAllBombs = (): Cell[][] => {
    return cells.map((row) =>
      row.map((cell) => {
        if (cell.value === CellValue.bomb) {
          return {
            ...cell,
            state: CellState.visible,
          };
        }
        return cell;
      }),
    );
  };

  /**
   * renderCells
   * @returns {React.ReactNode}
   */
  const renderCells = (): React.ReactNode => {
    return cells.map((row, rowIndex) =>
      row.map((cell, colIndex) => {
        return (
          <GridButton
            maxRow={config.maxRow}
            col={colIndex}
            key={`${rowIndex}-${colIndex}`}
            cellPress={(r, c) => handleCellPress(r, c)}
            row={rowIndex}
            state={cell.state}
            hasLost={hasLost}
            value={cell.value}
          />
        );
      }),
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <NumberDisplay value={config.numberOfBomb} live={live} />
        <TouchableOpacity onPress={() => handleFaceClick()}>
          <View style={styles.emojiWrapper}>
            <Text style={styles.emoji}>{face}</Text>
          </View>
        </TouchableOpacity>
        <NumberDisplay live={live} resetTimer={resetTimer} />
      </View>
      <View style={styles.body}>{renderCells()}</View>
    </View>
  );
};

/**
 *  Styles
 */
const styles = StyleSheet.create({
  container: {
    width: 370,
    backgroundColor: Colors.gray.light,
    padding: 2,
    ...Borders(Colors.white, Colors.gray.medium),
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: Colors.gray.light,
    justifyContent: 'space-between',
    padding: 8,
    ...Borders(Colors.gray.dark, Colors.white),
  },
  body: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16,
    width: '100%',
    ...Borders(Colors.gray.dark, Colors.white),
  },
  emojiWrapper: {
    width: 52,
    height: 52,
    fontSize: 35,
    ...Center,
    ...Borders(),
  },
  emoji: {
    fontSize: 28,
  },
});

export default MinesweeperScreen;
