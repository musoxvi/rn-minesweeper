import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
// Utils
import {Center, Colors} from '../utils/styles';

type Props = {
  live: boolean;
  value?: number;
  resetTimer?: number;
};

const NumberDisplay: React.FC<Props> = ({value, live, resetTimer}) => {
  const [time, setTime] = useState<number>(0);

  useEffect(() => {
    if (live && time < 999) {
      const timer = setInterval(() => {
        setTime(time + 1);
      }, 1000);

      return () => {
        clearInterval(timer);
      };
    }
  }, [live, time]);

  useEffect(() => {
    if (resetTimer === 0) {
      setTime(resetTimer);
    }
  }, [resetTimer]);

  return (
    <View style={styles.display}>
      <Text style={styles.number}>
        {(value && value < 0) || time < 0
          ? `-${Math.abs(value ? value : time)
              .toString()
              .padStart(2, '0')}`
          : value?.toString().padStart(3, '0') ||
            time.toString().padStart(3, '0')}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  display: {
    width: 80,
    height: 48,
    backgroundColor: Colors.black,
    ...Center,
  },
  number: {
    color: Colors.red,
    fontSize: 40,
  },
});

export default NumberDisplay;
