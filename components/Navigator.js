import React from 'react';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import MapaScreen from './MapaScreen';
import HomeScreen from './HomeScreen'

const MainNavigator = createStackNavigator({
  Home: {screen: HomeScreen},
  Mapa: {screen: MapaScreen}

});

const Navigator = createAppContainer(MainNavigator);

export default Navigator;