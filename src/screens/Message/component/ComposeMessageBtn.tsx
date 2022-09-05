import {StyleSheet, TouchableOpacity, Animated, View} from 'react-native';
import {Text} from '@ui-kitten/components';
import React, {useState, useEffect, useRef} from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import {hp, wp} from 'src/utils';
import {FONTS} from 'src/constants';

const ComposeMessageBtn = () => {
  const [showOption, setshowOption] = useState(false);
  const optionAnimation = useRef(new Animated.Value(0)).current;

  const showMessageOption = () => {
    setshowOption(prev => !prev);
    // Animated.timing(optionAnimation, {
    //   toValue: 1,
    //   duration: 3000,
    //   useNativeDriver: true,
    // }).start();
  };

  useEffect(() => {
    Animated.timing(optionAnimation, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: true,
    }).start();

    return () => {
      Animated.timing(optionAnimation, {
        toValue: 0,
        duration: 3000,
        useNativeDriver: true,
      }).start();
    };
  }, [showOption]);

  return (
    <View style={styles.composeContainer}>
      {showOption && (
        <Animated.View
          style={{
            opacity: optionAnimation,
            transform: [
              {
                translateX: optionAnimation.interpolate({
                  inputRange: [-500, 0],
                  outputRange: [0, 1],
                }),
              },
            ],
          }}>
          <Text></Text>
          <TouchableOpacity onPress={() => console.log('I was pressed 1')}>
            <Text style={styles.btnText}>Create inbox</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => console.log('I was pressed 2')}>
            <Text style={styles.btnText}> New discussion</Text>
          </TouchableOpacity>
        </Animated.View>
      )}

      <TouchableOpacity style={styles.composeBtn} onPress={showMessageOption}>
        <Entypo name="new-message" size={hp(25)} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default ComposeMessageBtn;

const styles = StyleSheet.create({
  composeContainer: {
    position: 'absolute',
    bottom: hp(30),
    right: wp(10),
    zIndex: 20,
    alignItems: 'flex-end',
  },
  composeBtn: {
    width: wp(60),
    height: hp(60),
    backgroundColor: '#276EF1',
    padding: hp(10),
    borderRadius: hp(50),
    marginTop: hp(10),
    alignItems: 'center',
    justifyContent: 'center',
  },

  btnText: {
    textAlign: 'center',
    color: '#000',
    fontSize: hp(18),
    paddingVertical: hp(5),
    fontFamily: FONTS.AVERTA_SEMI_BOLD,
  },
});
