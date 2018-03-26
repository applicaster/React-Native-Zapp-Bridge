import React from 'react';
import PropTypes from 'prop-types';
import { requireNativeComponent, View, StyleSheet } from 'react-native';
import { getFrameDims } from '../utils/';

const styles = StyleSheet.create({
  video: {
    backgroundColor: '#000000'
  }
});

const APReactVideoView = {
  name: 'ReactVideoView',
  propTypes: {
    src: PropTypes.shape({
      type: PropTypes.string,
      object: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.shape({
          playerDetailsObject: PropTypes.shape({
            id: PropTypes.string,
            name: PropTypes.string,
            thumbnail_url: PropTypes.string,
            stream_url: PropTypes.string
          })
        })
      ]),
      player_configuration: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.shape({
          inline_player_should_auto_mute: PropTypes.boolean
        })
      ]),
      startTime: PropTypes.string
    }),
    maxWidth: PropTypes.string,
    ...View.propTypes
  }
};

const ReactVideoView = requireNativeComponent(
  'APReactVideoView',
  APReactVideoView
);

const APVideoPlayer = ({ src, maxWidth, ratio, style }) => {
  const dims = getFrameDims(maxWidth, ratio);
  return <ReactVideoView src={src} style={[dims, styles.video, style]} />;
};

APVideoPlayer.propTypes = {
  src: PropTypes.object.isRequired,
  maxWidth: PropTypes.number,
  ratio: PropTypes.number,
  style: PropTypes.object
};

APVideoPlayer.defaultProps = {
  maxWidth: null,
  ratio: 9 / 16
};

export default APVideoPlayer;
