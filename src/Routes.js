import React, { Component } from 'react'
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import Splashscreen from './Components/SplashScreen/SplashScreen';
import HomeScreen from './Components/HomeScreen/HomeScreen';
import WeatherDetailScreen from './Components/WeatherDetailScreen/WeatherDetailScreen';

const AppNavigator = createStackNavigator({
    Splashscreen: {
      screen: Splashscreen
    },
    HomeScreen:{
      screen:HomeScreen
    },
    WeatherDetailScreen:{
      screen:WeatherDetailScreen
    },
  },
  {
      initialRouteName: "Splashscreen",
      headerMode:'none'
  }
  );
  
const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;
