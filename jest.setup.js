/* eslint-disable global-require */
import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';
import mockRNCNetInfo from '@react-native-community/netinfo/jest/netinfo-mock';
import { NativeModules } from 'react-native';
import 'react-native-gesture-handler/jestSetup';
import './__mocks__/@react-native-firebase';

jest.mock('@react-native-community/netinfo', () => mockRNCNetInfo);

jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);

NativeModules.RNCNetInfo = {
  getCurrentState: jest.fn(() => Promise.resolve()),
  addListener: jest.fn(),
  removeListeners: jest.fn(),
};

jest.mock('react-native-text-input-mask', () => ({
  default: jest.fn(),
}));

jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');

  // The mock for `call` immediately calls the callback which is incorrect
  // So we override it with a no-op
  Reanimated.default.call = () => {};

  return Reanimated;
});

// Silence the warning: Animated: `useNativeDriver` is not supported
// because the native animated module is missing
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');
