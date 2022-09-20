import {
  StyleSheet,
  TouchableOpacity,
  Animated,
  View,
  Dimensions,
} from 'react-native';
import {Text, Modal} from '@ui-kitten/components';
import React, {useState, useEffect, useRef} from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {hp, wp} from 'src/utils';
import {FONTS} from 'src/constants';
import {Easing} from 'react-native-reanimated';

const {width, height} = Dimensions.get('screen');

const ComposeMessageBtn = () => {
  const [showOption, setshowOption] = useState(false);

  const optionAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(optionAnimation, {
      toValue: 1,
      duration: 3000,
      easing: Easing.bounce,
      useNativeDriver: true,
    }).start();

    // return () => {
    //   Animated.timing(optionAnimation, {
    //     toValue: 0,
    //     duration: 3000,
    //     useNativeDriver: true,
    //   }).start();
    // };
  }, [showOption]);

  return (
    <View style={styles.composeContainer}>
      <Modal
        visible={showOption}
        backdropStyle={{backgroundColor: 'rgba(0,0,0,0.12)'}}
        onBackdropPress={() => setshowOption(false)}>
        <Animated.View
          style={[
            styles.animContainer,
            {
              transform: [
                {
                  translateX: optionAnimation,
                  // translateX: optionAnimation.interpolate({
                  //   inputRange: [-500, 0],
                  //   outputRange: [0, 1],
                  // }),
                },
              ],
            },
          ]}>
          <Text></Text>
          {/* <TouchableOpacity
            style={[
              styles.msgBtn,
              {
                backgroundColor: '#fff',
                // borderColor: '#026AE8',
                // borderWidth: 1,
              },
            ]}
            onPress={() => console.log('I was pressed 1')}>
            <AntDesign name="mail" size={hp(19)} color="#026AE8" />
            <Text style={[styles.btnText, {color: '#026AE8'}]}>
              Create inbox
            </Text>
          </TouchableOpacity> */}
          <TouchableOpacity
            style={[styles.msgBtn, {marginTop: 10}]}
            onPress={() => console.log('I was pressed 2')}>
            <Entypo name="new-message" size={hp(19)} color="white" />
            <Text style={[styles.btnText, {color: '#fff', marginLeft: 5}]}>
              New discussion
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </Modal>

      {!showOption && (
        <TouchableOpacity
          style={styles.composeBtn}
          onPress={() => setshowOption(true)}>
          <Entypo name="new-message" size={hp(25)} color="white" />
        </TouchableOpacity>
      )}
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

  animContainer: {
    position: 'absolute',
    right: -(width * 0.49),
    bottom: -(height * 0.45),
  },

  msgBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: '#026AE8',
    padding: 5,
    borderRadius: 8,
    elevation: 2,
  },

  btnText: {
    textAlign: 'center',

    fontSize: hp(16),
    paddingVertical: hp(5),
    fontFamily: FONTS.AVERTA_SEMI_BOLD,
  },
});
