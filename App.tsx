import { AppLoading, Notifications } from 'expo';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { AppearanceProvider, useColorScheme } from 'react-native-appearance';
import Constants from 'expo-constants';
import * as FileSystem from 'expo-file-system';

import AppNavigator from './navigation/AppNavigator';
import DbHelper from './services/DbHelper';
import UserManager from './services/UserManager';
import CacheHandler from './services/CacheHandler';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './constants/redux/Reducers';

// With the help of the reducer and the initial state, we can create the store object.
// A store is an object that brings actions and reducers together. It provides and holds state at the application level instead of individual components.
const store = createStore(reducer);

export default function App(props: any) {
  const [isLoadingComplete, setLoadingComplete] = useState(false);
  const colorScheme = useColorScheme();

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
      <AppearanceProvider>
        <Provider store={store}>
          <View style={styles.container}>
            {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
            <AppNavigator theme={colorScheme} />
          </View>
        </Provider>
      </AppearanceProvider>
    );
  }
}

if (!__DEV__) {
  console.disableYellowBox = true;
}

if (Constants.manifest.extra.init) {
  Notifications.cancelAllScheduledNotificationsAsync();
  DbHelper.selectImages().then(list => {
    list.forEach(fileUri => FileSystem.deleteAsync(fileUri, {idempotent: true}));
    DbHelper.deleteDownloads();
  });
  CacheHandler.clear();
  UserManager.removeToken();
}

// Notifications.getExpoPushTokenAsync();
DbHelper.initialize();

async function loadResourcesAsync() {
  await Promise.all([
    Asset.loadAsync([
      require('./assets/images/placeholder.png'),
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

function handleFinishLoading(setLoadingComplete: (loadingComplete: boolean) => void) {
  setLoadingComplete(true);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
