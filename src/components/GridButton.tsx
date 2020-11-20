import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {CellState, CellValue} from '../../types/cellTypes';
import {Borders, Center, Colors} from '../utils/styles';

interface ButtonProps {
  col: number;
  row: number;
  maxRow: number;
  hasLost: boolean;
  value: CellValue;
  state: CellState;
  onFlag: (rowParam: number, colParam: number) => void;
  cellPress: (rowParam: number, colParam: number) => void;
}

const GridButton: React.FC<ButtonProps> = ({
  col,
  cellPress,
  onFlag,
  hasLost,
  maxRow,
  row,
  state,
  value,
}) => {
  const buttonSize =
    state === CellState.visible
      ? {
          ...styles.visible,
          width: 350 / maxRow,
          height: 350 / maxRow,
        }
      : {
          ...styles.button,
          width: 350 / maxRow,
          height: 350 / maxRow,
        };

  const renderContent = (): React.ReactNode => {
    const fontColor =
      value === 1
        ? styles.blue
        : value === 2
        ? styles.green
        : value === 3
        ? styles.red
        : value === 4
        ? styles.purple
        : value === 5
        ? styles.maroon
        : value === 6
        ? styles.turquoise
        : value === 7
        ? styles.black
        : styles.gray;

    if (state === CellState.visible) {
      if (value === CellValue.bomb) {
        return <Text>💣</Text>;
      } else if (value === CellValue.none) {
        return null;
      }
      return <Text style={fontColor}>{value}</Text>;
    } else if (state === CellState.flagged) {
      return <Text>🚩</Text>;
    }
    return null;
  };

  return (
    <TouchableOpacity
      disabled={hasLost}
      onLongPress={() => onFlag(row, col)}
      onPress={() => cellPress(row, col)}>
      <View style={buttonSize}>{renderContent()}</View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    ...Center,
    ...Borders(),
  },
  visible: {
    ...Center,
    width: 40,
    height: 40,
    borderColor: Colors.gray.medium,
    borderWidth: 1,
  },
  blue: {
    color: 'blue',
    fontWeight: 'bold',
  },
  green: {
    fontWeight: 'bold',
    color: 'green',
  },
  red: {
    fontWeight: 'bold',
    color: Colors.red,
  },
  purple: {
    fontWeight: 'bold',
    color: 'purple',
  },
  maroon: {
    fontWeight: 'bold',
    color: 'maroon',
  },
  turquoise: {
    fontWeight: 'bold',
    color: 'turquoise',
  },
  black: {
    fontWeight: 'bold',
    color: Colors.black,
  },
  gray: {
    fontWeight: 'bold',
    color: Colors.gray.medium,
  },
});

export default GridButton;
