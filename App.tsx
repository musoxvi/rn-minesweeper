import React from 'react';
import 'react-native-gesture-handler';
// Navigation
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, HeaderBackButton} from '@react-navigation/stack';
// Screens
import StartGameScreen from './src/screens/StartGameScreen';
import MainScreen from './src/screens/MainScreen';
// Utils
import {resetBoard} from './src/utils/board';
import {Colors} from './src/utils/styles';

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
                  resetBoard();
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
