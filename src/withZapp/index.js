import React from 'react';
import { Platform } from 'react-native';

const propParsers = {
  localization: { android: JSON.parse },
  settings: { android: JSON.parse },
  styles: {
    android: (val, props) =>
      JSON.parse(val)[props.is_tablet ? 'tablet' : 'smartphone']
  },
  extra_props: {
    android: val => {
      const extraProps = JSON.parse(val);

      if (
        extraProps.data_source_model &&
        typeof extraProps.data_source_model === 'string'
      ) {
        extraProps.data_source_model = JSON.parse(extraProps.data_source_model);
      }

      return extraProps;
    }
  }
};

const propsParser = (props, platform) =>
  Object.assign(
    {},
    ...Object.keys(props).map(key => ({
      [key]:
        propParsers[key] && propParsers[key][platform]
          ? propParsers[key][platform](props[key], props)
          : props[key]
    }))
  );

export { propsParser };

// withZap is a react native HOC to patch over platform differences between iOS & android
export default WrappedComponent => {
  const ZappedComponent = props => (
    <WrappedComponent {...propsParser(props, Platform.OS)} />
  );

  return ZappedComponent;
};
