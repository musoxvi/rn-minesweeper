import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Colors} from '../utils/styles';

type Props = {
  checked: boolean;
  onPress: () => void;
};

const RadioButton: React.FC<Props> = ({onPress, checked = false}) => {
  return (
    <TouchableOpacity style={styles.circle} onPress={onPress}>
      {checked ? <View style={styles.checkedCircle} /> : <View />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  circle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.gray.light,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  checkedCircle: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: Colors.rnBlue,
    borderColor: Colors.rnBlue,
  },
});

export default RadioButton;
