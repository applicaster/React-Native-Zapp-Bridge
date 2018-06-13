import React from 'react';
import { Platform } from 'react-native';

const propsToParse = ['localization', 'settings', 'styles', 'extra_props'];

// withZap is a react native HOC to patch over platform differences between iOS & android
export default WrappedComponent =>
  Platform.select({
    ios: () => WrappedComponent,
    android: () => {
      const ZappedComponent = props => (
        <WrappedComponent
          {...Object.assign(
            {},
            ...Object.keys(props).map(key => ({
              [key]: propsToParse.includes(key)
                ? JSON.parse(props[key])
                : props[key]
            }))
          )}
        />
      );

      return ZappedComponent;
    }
  })();
