/* eslint-disable global-require */
import { NativeModules } from 'react-native';
import './__mocks__/@react-native-firebase';
import 'react-native-gesture-handler/jestSetup';

NativeModules.RNCNetInfo = {
  getCurrentState: jest.fn(() => Promise.resolve()),
  addListener: jest.fn(),
  removeListeners: jest.fn()
};

jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');

  // The mock for `call` immediately calls the callback which is incorrect
  // So we override it with a no-op
  Reanimated.default.call = () => { };

  return Reanimated;
});

// Silence the warning: Animated: `useNativeDriver` is not supported
// because the native animated module is missing
jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');
