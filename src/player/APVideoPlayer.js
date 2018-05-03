import React from 'react';
import PropTypes from 'prop-types';
import {
  requireNativeComponent,
  ViewPropTypes,
  StyleSheet,
  Platform
} from 'react-native';
import { getFrameDims } from '../utils/';

const styles = StyleSheet.create({ video: { backgroundColor: '#000000' } });

const objectPropType = Platform.select({
  android: PropTypes.string,
  ios: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    thumbnail_url: PropTypes.string,
    stream_url: PropTypes.string
  })
});

const playerConfigurationPropType = PropTypes.shape({
  inline_player_should_auto_mute: PropTypes.boolean
});

const APReactVideoView = {
  name: 'ReactVideoView',
  propTypes: {
    src: PropTypes.shape({
      type: PropTypes.string,
      object: Platform.select({
        android: PropTypes.string,
        ios: objectPropType
      }),
      player_configuration: Platform.select({
        android: PropTypes.string,
        ios: playerConfigurationPropType
      }),
      startTime: PropTypes.string
    }),
    maxWidth: PropTypes.string,
    ...ViewPropTypes
  }
};

const ReactVideoView = requireNativeComponent(
  'APReactVideoView',
  APReactVideoView
);

const APVideoPlayer = ({
  src: { type, object, player_configuration, startTime },
  maxWidth,
  ratio,
  style
}) => {
  const dims = getFrameDims(maxWidth, ratio);

  const src = {
    type,
    object: Platform.select({ android: JSON.stringify(object), ios: object }),
    player_configuration: Platform.select({
      android: JSON.stringify(player_configuration),
      ios: player_configuration
    }),
    startTime
  };

  return <ReactVideoView src={src} style={[dims, styles.video, style]} />;
};

APVideoPlayer.propTypes = {
  src: PropTypes.shape({
    type: PropTypes.string,
    object: objectPropType,
    player_configuration: playerConfigurationPropType,
    startTime: PropTypes.string
  }).isRequired,
  maxWidth: PropTypes.number,
  ratio: PropTypes.number,
  style: PropTypes.object
};

APVideoPlayer.defaultProps = {
  maxWidth: null,
  ratio: 9 / 16
};

export default APVideoPlayer;
