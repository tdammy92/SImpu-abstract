import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';

import Feather from 'react-native-vector-icons/Feather';

import {wp, hp} from 'src/utils';
import {FONTS, colors} from 'src/constants';

const AuthInput = (props: any) => {
  const {label, error, isPassword} = props;
  const [IsFocused, setIsFocused] = useState(false);
  const [showPassword, setshowPassword] = useState(false);

  return (
    <View style={styles.inputWrapper}>
      <Text
        style={[
          styles.label,
          {color: IsFocused ? '#026AE8' : colors.primaryText},
        ]}>
        {label}
      </Text>
      <View
        style={[
          styles.Input,
          {borderColor: IsFocused ? '#026AE8' : '#6D7580'},
        ]}>
        {!isPassword && (
          <TextInput
            style={styles.textInput}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            {...props}
          />
        )}

        {isPassword && (
          <TextInput
            style={styles.textInput}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            {...props}
            secureTextEntry={!showPassword ? true : false}
          />
        )}

        <View>
          {!isPassword && (
            <Feather
              name="mail"
              size={22}
              color={IsFocused ? '#026AE8' : '#6D7580'}
              style={{marginRight: 5}}
            />
          )}

          {isPassword && (
            <TouchableOpacity onPress={() => setshowPassword(prev => !prev)}>
              <Feather
                name={showPassword ? 'eye' : 'eye-off'}
                size={22}
                color={IsFocused ? '#026AE8' : '#6D7580'}
                style={{marginRight: 5}}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
      <Text style={styles.errorText}>{error}</Text>
    </View>
  );
};

export default AuthInput;

const styles = StyleSheet.create({
  inputWrapper: {
    marginHorizontal: wp(20),
    //     paddingVertical: hp(0),
  },
  label: {
    paddingVertical: hp(5),
    fontSize: hp(16),
    fontFamily: FONTS.AVERTA_REGULAR,
    color: colors.primaryText,
  },
  Input: {
    flexDirection: 'row',
    height: hp(40),
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 1,
  },

  textInput: {
    flex: 1,
    paddingHorizontal: wp(10),
    fontSize: hp(16),
    fontFamily: FONTS.AVERTA_REGULAR,
    color: colors.primaryText,
  },

  errorText: {
    color: 'red',
    fontFamily: FONTS.AVERTA_REGULAR,
    fontSize: hp(12),
    paddingVertical: hp(5),
  },
});
