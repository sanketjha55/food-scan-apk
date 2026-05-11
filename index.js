import { registerRootComponent } from 'expo';
import App from './App';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import React from 'react';

// Wrap App with GestureHandlerRootView for gesture support
const RootApp = () => (
  <GestureHandlerRootView style={{ flex: 1 }}>
    <App />
  </GestureHandlerRootView>
);

registerRootComponent(RootApp);
