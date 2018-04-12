import { Linking, NativeModules, Platform } from 'react-native';

const buildQueryString = (params, unencoded) => {
  const encodeMethod = unencoded ? str => str : encodeURIComponent;

  return Object.keys(params)
    .map(k => `${encodeMethod(k)}=${encodeMethod(params[k])}`)
    .join('&');
};

export const closeModalScreen = Platform.select({
  android: () => {
    NativeModules.APReactNativeBridge.handleCommand('stop', {});
  },
  ios: ({ animation_type, animated = 1 } = {}) => {
    NativeModules.ZPReactNativeBridgeListener.postEvent(
      'dismiss_modal_view',
      { animated, animation_type },
      () => {}
    );
  }
});

export const openInternalURL = (protocol, params, reactParams = {}) => {
  const mergedParams = Object.assign(
    {},
    params,
    Object.keys(reactParams).reduce(
      (accumulator, key) =>
        Object.assign(accumulator, { [key]: `reactProps[${key}]` }),
      {}
    )
  );

  // apparently android can't be url encoded!
  const queryString = buildQueryString(mergedParams, Platform.OS === 'android');
  const url = `${protocol}://presentRN?${queryString}`;

  Platform.select({
    android: () => {
      NativeModules.Linking.openInternalURL(url);
    },
    ios: () => {
      Linking.openURL(url);
    }
  })();
};

export default { closeModalScreen, openInternalURL };
