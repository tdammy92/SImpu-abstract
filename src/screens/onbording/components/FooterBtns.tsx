import React, {useCallback} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {FONTS, FontSize, colors} from 'src/constants';
import {hp} from 'src/utils';
import {MainStackParamList, SCREEN_NAME} from 'src/navigation/constants';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

const FooterComponent = ({navigation}: any) => {
  const {width, height} = Dimensions.get('screen');

  const navigateToLogin = useCallback(() => {
    navigation.reset({index: 0, routes: [{name: SCREEN_NAME.auth}]});
  }, [navigation]);

  return (
    <View style={[styles.btnContainer, {width: width - 2, height: 50}]}>
      <TouchableOpacity
        style={[
          styles.actionBtn,
          {
            // backgroundColor: '#000'
          },
        ]}
        onPress={navigateToLogin}>
        <Text allowFontScaling={false} style={[styles.btntxt]}>
          Skip
        </Text>
      </TouchableOpacity>
      {/* <View style={{width: hp(25)}} /> */}

      {/* <TouchableOpacity
        style={[styles.actionBtn, {backgroundColor: '#fff'}]}
        onPress={navigateToCreate}>
        <Text style={[styles.btntxt, {color: '#000'}]}>Sign up</Text>
      </TouchableOpacity> */}
    </View>
  );
};

export default FooterComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  bar: {
    height: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },

  btnContainer: {
    width: 100,
    marginBottom: hp(40),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

    paddingHorizontal: hp(20),
  },

  actionBtn: {
    height: hp(43),
    width: '45%',
    borderRadius: 15,

    justifyContent: 'center',
    alignItems: 'center',
  },

  btntxt: {
    textAlign: 'center',
    color: colors.light,
    fontFamily: FONTS.TEXT_SEMI_BOLD,
    fontSize: FontSize.BigText,
  },
});
