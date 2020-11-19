import {ColorValue} from 'react-native';
import {BorderStyle, CenterStyle} from '../../types/stylesTypes';

export const Borders = (
  leftTop: ColorValue = 'white',
  rightBottom: ColorValue = '#7b7b7b',
): BorderStyle => {
  return {
    borderBottomColor: rightBottom,
    borderRightColor: rightBottom,
    borderLeftColor: leftTop,
    borderTopColor: leftTop,
    borderStyle: 'solid',
    borderWidth: 4,
  };
};

export const Center: CenterStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

export const Colors = {
  white: '#FFFFFF',
  black: '#000000',
  red: '#FF0000',
  rnBlue: '#61dafb',
  blue: '#191970',
  gray: {
    light: '#c2c2c2',
    medium: '#999999',
    dark: '#7B7B7B',
    official: '#303846',
  },
};
