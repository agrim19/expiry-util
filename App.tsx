import { AppLoading, Notifications } from 'expo';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import React, { useState } from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import AppNavigator from './navigation/AppNavigator';

import * as Permissions from 'expo-permissions';
import DbHelper from './DbHelper';

import Constants from 'expo-constants';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './constants/redux/Reducers';

// With the help of the reducer and the initial state, we can create the store object.
// A store is an object that brings actions and reducers together. It provides and holds state at the application level instead of individual components.
const store = createStore(reducer);

String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
}
String.prototype.toCamelCase = function() {
  return this.toLowerCase()
      .replace(/(\s|^)(.)/g, function($1) { return $1.toUpperCase(); });
}

export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return (
      <AppLoading
        startAsync={loadResourcesAsync}
        onError={handleLoadingError}
        onFinish={() => handleFinishLoading(setLoadingComplete)}
      />
    );
  } else {
    return (
// To bind a React or React Native application with Redux, you do it with the high ordered component Provider. It basically passes the store down to the rest of the application.
      <Provider store={store}>
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          <AppNavigator />
        </View>
      </Provider>
    );
  }
}

Permissions.askAsync(Permissions.NOTIFICATIONS);
// Notifications.getExpoPushTokenAsync().catch(reason => console.log(reason));
DbHelper.initialize();
Permissions.askAsync(Permissions.CAMERA_ROLL);
Permissions.askAsync(Permissions.LOCATION);

if (!__DEV__) {
  console.disableYellowBox = true;
}

if (Constants.manifest.extra.init) {
  Notifications.cancelAllScheduledNotificationsAsync();
  DbHelper.deleteGoods();
}

async function loadResourcesAsync() {
  await Promise.all([
    Asset.loadAsync([
      require('./assets/images/robot-dev.png'),
      require('./assets/images/robot-prod.png'),
    ]),
    Font.loadAsync({
      // This is the font that we are using for our tab bar
      ...Ionicons.font,
      // We include SpaceMono because we use it in HomeScreen.js. Feel free to
      // remove this if you are not using it in your app
      'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
    }),
  ]);
}

function handleLoadingError(error: Error) {
  // In this case, you might want to report the error to your error reporting
  // service, for example Sentry
  console.warn(error);
}

function handleFinishLoading(setLoadingComplete) {
  setLoadingComplete(true);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
