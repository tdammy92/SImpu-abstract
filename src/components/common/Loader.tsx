import {StyleSheet, Text, View, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {StoreState} from 'src/@types/store';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {hp, wp} from 'src/utils';
import Animated, {
  ZoomIn,
  ZoomOut,
  SlideInRight,
  SlideOutLeft,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  withSequence,
  Value,
  withSpring,
  withDelay,
} from 'react-native-reanimated';

const Loader = () => {
  const opacity = useSharedValue(0.9);
  const scale = useSharedValue(0.9);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [
      {
        scale: scale.value,
      },
    ],
  }));

  useEffect(() => {
    scale.value = withRepeat(withSpring(1.05), -1, true);
    opacity.value = withRepeat(withTiming(1), -1, true);
    return () => {};
  }, []);

  return (
    <Animated.View
      entering={SlideInRight}
      exiting={SlideOutLeft}
      style={[StyleSheet.absoluteFill, styles.container]}>
      <View style={{position: 'absolute', top: 63, right: 45}}>
        <Feather
          name="message-square"
          size={50}
          color="rgba(255,255,255,0.6)"
        />
      </View>
      <View style={{position: 'absolute', bottom: 63, left: 45}}>
        <Feather
          name="message-circle"
          size={45}
          color="rgba(255,255,255,0.6)"
        />
      </View>

      {/* simpu logo animation */}
      <Animated.Image
        source={require('../../assets/images/icon.png')}
        style={[styles.simpuIcon, animatedStyle]}
      />
      <View style={{position: 'absolute', top: 180, left: 45}}>
        <MaterialCommunityIcons
          name="android-messages"
          size={80}
          color="rgba(255,255,255,0.6)"
        />
      </View>
      <View style={{position: 'absolute', bottom: 180, right: 45}}>
        <AntDesign name="mail" size={40} color="rgba(255,255,255,0.6)" />
      </View>
    </Animated.View>
  );
};

export default Loader;

const styles = StyleSheet.create({
  container: {
    zIndex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'rgba(0,0,0,0.5)',
    backgroundColor: '#026AE8',
  },
  simpuIcon: {
    height: hp(60),
    width: wp(100),

    // shadowOffset: {width: 0, height: 20},
    // shadowOpacity: 0.35,
    // shadowRadius: 35,
  },
});
