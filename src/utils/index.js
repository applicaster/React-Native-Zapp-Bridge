import { Dimensions } from 'react-native';

export const getFrameDims = (maxWidth, ratio = 9 / 16) => {
  const width = maxWidth || Dimensions.get('window').width;
  const getFrameHeight = w => Math.floor(w * ratio);
  return {
    width,
    height: getFrameHeight(width)
  };
};
