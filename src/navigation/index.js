import { NativeModules, Platform } from 'react-native';

export const closeModalScreen = Platform.select({
  android: () => {
    NativeModules.APReactNativeBridge.handleCommand('stop', {});
  },
  ios: () => {
    NativeModules.ZPReactNativeBridgeListener.postEvent(
      'dismiss_modal_view',
      { animated: 1 },
      () => {}
    );
  }
});
