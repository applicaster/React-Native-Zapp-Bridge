import { Dimensions, NativeModules, Platform } from 'react-native';

export const getFrameDims = (maxWidth, ratio = 9 / 16) => {
  const width = maxWidth || Dimensions.get('window').width;
  const getFrameHeight = w => Math.floor(w * ratio);
  return {
    width,
    height: getFrameHeight(width)
  };
};

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
