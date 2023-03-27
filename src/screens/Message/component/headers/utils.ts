import {Dimensions} from 'react-native';
const {width} = Dimensions.get('window');

export const HEADER_HEIGHT = width / 5;

export const getFeatureViewAnimation = (
  animatedValue: any,
  outputX: number,
  outputY: number,
) => {
  const TRANSLATE_X_INPUT_RANGE = [0, 80];

  const translateY = {
    translateY: animatedValue?.interpolate({
      inputRange: [0, 100],
      outputRange: [0, outputY],
      extrapolate: 'clamp',
    }),
  };
  return {
    transform: [
      {
        translateX: animatedValue?.interpolate({
          inputRange: TRANSLATE_X_INPUT_RANGE,
          outputRange: [0, outputX],
          extrapolate: 'clamp',
        }),
      },
      translateY,
    ],
  };
};
