import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import WelcomeScreen from './screens/welcomeScreen';
import { createSwitchNavigator, createAppContainer} from 'react-navigation';
import {AppTabNavigator} from './components/tabNavigation';





export default class App extends React.Component {
  render() {
  return (
    <AppContainer/>
  )
}
}
const switchNavigator = createSwitchNavigator({
  WelcomeScreen: {screen : WelcomeScreen},
  BottomTab: {screen : AppTabNavigator}
})
const AppContainer = createAppContainer(switchNavigator)

