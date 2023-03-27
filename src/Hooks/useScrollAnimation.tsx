import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  Animated,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import React, {useRef} from 'react';

const useScrollAnimation = () => {
  //animation code
  const animatedValue = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef<ScrollView>(null);
  const lastOffsetY = useRef(0);
  const scrollDirection = useRef('');

  const scrollEvent = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetY = e?.nativeEvent?.contentOffset?.y;
    scrollDirection.current =
      offsetY - lastOffsetY?.current > 0 ? 'down' : 'up';
    lastOffsetY.current = offsetY;
    animatedValue?.setValue(offsetY);
  };
  const scrollEventEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    scrollViewRef?.current?.scrollTo({
      y: scrollDirection?.current === 'down' ? 100 : 0,
      animated: true,
    });
  };

  return {animatedValue, scrollEvent, scrollEventEnd};
};

export default useScrollAnimation;
