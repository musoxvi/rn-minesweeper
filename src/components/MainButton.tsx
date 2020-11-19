import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Colors} from '../utils/styles';

type Props = {
  children?: React.ReactNode;
  disabled?: boolean;
  title?: string;
  opacity?: number;
  onPress: () => void;
};

const MainButton: React.FC<Props> = ({
  children,
  onPress,
  title,
  opacity = 0.6,
  disabled,
}) => {
  const disabledColor = {
    backgroundColor: Colors.gray.light,
    borderColor: Colors.gray.dark,
  };
  return (
    <TouchableOpacity
      activeOpacity={opacity}
      onPress={onPress}
      disabled={disabled}>
      <View
        style={disabled ? {...styles.button, ...disabledColor} : styles.button}>
        <Text
          style={
            disabled
              ? {...styles.buttonText, color: Colors.gray.dark}
              : styles.buttonText
          }>
          {children || title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.blue,
    borderColor: Colors.rnBlue,
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderWidth: 2,
    alignItems: 'center',
    borderRadius: 40,
  },
  buttonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '700',
  },
});

export default MainButton;
