import React from "react";
import { Text, View, TouchableOpacity, StyleSheet, Image } from "react-native";
import { createBottomTabNavigator } from "react-navigation-tabs";
import DonorScreen from "../screens/donorScreen";
import RequestScreen from "../screens/requestScreen";

 export const AppTabNavigator = createBottomTabNavigator({
  DonateBooks: {
    screen: DonorScreen,
    navigationOptions: {
      tabBarIcon: <Image source={require("../assets/requestList.png")}></Image>,
      tabBarLabel: "Donate Books",
    },
  },
  RequestBooks: {
    screen: RequestScreen,
    navigationOptions: {
      tabBarIcon: <Image source={require("../assets/requestBook.png")}></Image>,
      tabBarLabel: "Book Request",
    },
  },
});

