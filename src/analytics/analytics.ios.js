import { NativeModules } from 'react-native';
import { curry } from 'ramda';

export const postEvent = curry(
  (command, opts) =>
    new Promise((resolve, reject) => {
      try {
        const bridge = NativeModules.ZPReactNativeBridgeListener;
        bridge.postEvent(command, opts, resolve);
      } catch (e) {
        reject(e);
      }
    })
);
