import {
  StyleSheet,
  View,
  Text,
  Image,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import 'react-native-gesture-handler';
import React from 'react';
import MinesweeperScreen from './src/screens/MinesweeperScreen';
import {Center, Colors} from './src/utils/styles';
// Navigation
import {NavigationContainer} from '@react-navigation/native';
import {
  createStackNavigator,
  HeaderBackButton,
  StackScreenProps,
} from '@react-navigation/stack';
import StartGameScreen from './src/screens/StartGameScreen';
import {resetCells} from './src/utils/cells';

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

const Stack = createStackNavigator();

const defaultStackNavOptions = {
  headerTintColor: Colors.gray.official,
  headerStyle: {backgroundColor: Colors.rnBlue},
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={defaultStackNavOptions}>
        <Stack.Screen name="Home" component={StartGameScreen} />
        <Stack.Screen
          name="Minesweeper"
          component={MainScreen}
          options={({navigation}) => ({
            headerLeft: (props) => (
              <HeaderBackButton
                {...props}
                onPress={() => {
                  resetCells();
                  navigation.navigate('Home');
                }}
              />
            ),
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

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
