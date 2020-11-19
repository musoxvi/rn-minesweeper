import {ColorValue, FlexAlignType} from 'react-native';

export interface CenterStyle {
  justifyContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
  alignItems?: FlexAlignType;
  display?: 'none' | 'flex';
}

export interface BorderStyle {
  borderBottomColor?: ColorValue;
  borderLeftColor?: ColorValue;
  borderRightColor?: ColorValue;
  borderTopColor?: ColorValue;
  borderStyle?: 'solid' | 'dotted' | 'dashed';
  borderWidth?: number;
}
