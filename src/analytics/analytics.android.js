import { NativeModules } from 'react-native';
import { curry } from 'ramda';

export const postEvent = curry((command, opts) => {
  try {
    const bridge = NativeModules.APReactNativeBridge;
    return bridge.handleCommand(command, opts);
  } catch (e) {
    return Promise.reject(e);
  }
});
