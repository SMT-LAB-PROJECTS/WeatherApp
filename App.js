/**
 * WeatherApp : Test React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
 import 'react-native-gesture-handler';
import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import { store, persistor } from './src/Redux/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Routes from './src/Routes';
import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

import SplashScreen from 'react-native-splash-screen'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    SplashScreen.hide();
}

  render() {
    return (
      <>
        <StatusBar barStyle="light-content"  backgroundColor={'black'} />
        <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
        <SafeAreaView style={{flex: 1}}>
        <Routes />
        </SafeAreaView>
        </PersistGate>
        </Provider>
    </>
    );
  }
}


const styles = StyleSheet.create({
  body: {
    backgroundColor: '#fff',
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
