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
import CreateIcon from 'src/assets/images/CreateIcon.svg';
import {hp, wp} from 'src/utils';
import {FONTS} from 'src/constants';
import {Easing} from 'react-native-reanimated';
import {useNavigation} from '@react-navigation/native';
import {SCREEN_NAME} from 'src/navigation/constants';

const {width, height} = Dimensions.get('screen');

const ComposeMessageBtn = () => {
  const navigation = useNavigation();
  const [showOption, setshowOption] = useState(false);

  const optionAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(optionAnimation, {
      toValue: 1,
      duration: 3000,
      easing: Easing.bounce,
      useNativeDriver: true,
    }).start();
  }, [showOption]);

  const ShowComponse = () => {
    setshowOption(true);
  };

  const handleCompose = () => {
    setshowOption(false);

    //@ts-ignore
    navigation.navigate(SCREEN_NAME.compose);
  };

  return (
    <View style={styles.composeContainer}>
      <Modal
        visible={showOption}
        backdropStyle={{backgroundColor: 'rgba(0,0,0,0.32)'}}
        onBackdropPress={() => setshowOption(false)}>
        <Animated.View
          style={[
            styles.animContainer,
            {
              transform: [
                {
                  translateX: optionAnimation,
                },
              ],
            },
          ]}>
          <TouchableOpacity
            style={[styles.msgBtn, {marginTop: 10}]}
            onPress={handleCompose}>
            {/* <Entypo name="new-message" size={hp(19)} color="white" /> */}
            <CreateIcon />
            <Text style={[styles.btnText, {color: '#fff', marginLeft: 5}]}>
              New discussion
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </Modal>

      {!showOption && (
        <TouchableOpacity style={styles.composeBtn} onPress={ShowComponse}>
          <CreateIcon />
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
    width: hp(55),
    height: hp(55),
    backgroundColor: '#276EF1',
    padding: hp(10),
    borderRadius: hp(55) / 2,
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
