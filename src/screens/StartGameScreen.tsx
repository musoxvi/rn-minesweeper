import {StackScreenProps} from '@react-navigation/stack/lib/typescript/src/types';
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
} from 'react-native';
// Models
import {ConfigType} from '../../types/configTypes';
// Components
import MainButton from '../components/MainButton';
import RadioButton from '../components/RadioButton';
// Utils
import {Center, Colors} from '../utils/styles';

type Props = {} & StackScreenProps<any>;

const StartGameScreen: React.FC<Props> = ({navigation}) => {
  const [checked, seChecked] = useState<string>('');
  const [config, setConfig] = useState<ConfigType>({
    maxRow: 8,
    maxColunm: 8,
    numberOfBomb: 2,
  });

  const handleSelectedLevel = (level: string) => {
    const newConfig =
      level === 'beginner'
        ? {maxRow: 5, maxColunm: 5, numberOfBomb: 5}
        : level === 'intermediate'
        ? {maxRow: 8, maxColunm: 8, numberOfBomb: 10}
        : {maxRow: 12, maxColunm: 12, numberOfBomb: 20};

    seChecked(level);
    setConfig(newConfig);
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.header}>
            <Image
              style={styles.tinyLogo}
              source={{
                uri: 'https://reactnative.dev/img/tiny_logo.png',
              }}
            />
            <Text style={styles.headerText}>React Native Minesweeper</Text>
          </View>
          <View style={styles.newGameWrapper}>
            <Image
              style={styles.poster}
              source={require('../img/mineweeper.png')}
            />
            <View style={styles.RadioButton}>
              <Text style={styles.label}>Beginner</Text>
              <RadioButton
                checked={checked === 'beginner'}
                onPress={() => handleSelectedLevel('beginner')}
              />
            </View>
            <View style={styles.RadioButton}>
              <Text style={styles.label}>Intermediate</Text>
              <RadioButton
                checked={checked === 'intermediate'}
                onPress={() => handleSelectedLevel('intermediate')}
              />
            </View>
            <View style={styles.RadioButton}>
              <Text style={styles.label}>Expert</Text>
              <RadioButton
                checked={checked === 'expert'}
                onPress={() => handleSelectedLevel('expert')}
              />
            </View>
            <MainButton
              title="NEW GAME"
              disabled={!checked}
              onPress={() => {
                navigation.navigate('Minesweeper', {
                  config,
                });
              }}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 12,
    display: 'flex',
    flex: 1,
    backgroundColor: Colors.gray.official,
  },
  header: {
    height: 60,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  headerText: {
    color: Colors.rnBlue,
    fontWeight: '700',
    fontSize: 24,
  },
  mineseeperWrapper: {
    flex: 1,
    paddingTop: 0,
    ...Center,
  },
  tinyLogo: {
    width: 35,
    height: 35,
  },
  poster: {
    width: '100%',
    height: 200,
    marginBottom: 48,
  },
  newGameWrapper: {
    display: 'flex',
    paddingHorizontal: 24,
    paddingVertical: 8,
  },

  RadioButton: {
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: 8,
    alignItems: 'center',
  },
  label: {
    color: Colors.white,
    fontSize: 18,
  },
});

export default StartGameScreen;
