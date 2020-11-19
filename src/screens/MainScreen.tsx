import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
} from 'react-native';
// Models
import {StackScreenProps} from '@react-navigation/stack/lib/typescript/src/types';
// Utils
import {Center, Colors} from '../utils/styles';
// Screens
import MinesweeperScreen from './MinesweeperScreen';

type Props = {} & StackScreenProps<any>;

const MainScreen: React.FC<Props> = ({route}) => {
  const config = route.params?.config;
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
          <View style={styles.mineseeperWrapper}>
            <MinesweeperScreen config={config} />
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
  RadioButton: {
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: 8,
    alignItems: 'center',
  },
});

export default MainScreen;
