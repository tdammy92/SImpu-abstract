import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {forwardRef, useState} from 'react';

import Feather from 'react-native-vector-icons/Feather';

import {wp, hp} from 'src/utils';
import {FONTS, FontSize, colors} from 'src/constants';
import {Icon} from '@ui-kitten/components';

const AuthInput = forwardRef((props: any, ref) => {
  const {label, error, isPassword, handleNext, handleDone, onKeyPress} = props;
  const [IsFocused, setIsFocused] = useState(false);
  const [showPassword, setshowPassword] = useState(false);

  return (
    <View style={styles.inputWrapper}>
      <View
        style={[
          styles.Input,
          {
            borderColor: IsFocused ? colors.secondaryBg : colors.inputBg,
            borderWidth: IsFocused ? 1 : 0,
          },
        ]}>
        {!isPassword && (
          <TextInput
            placeholder={label}
            placeholderTextColor={colors.darkGray}
            style={styles.textInput}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onSubmitEditing={handleNext}
            {...props}
          />
        )}

        {isPassword && (
          <TextInput
            ref={ref}
            onKeyPress={onKeyPress}
            placeholder={label}
            placeholderTextColor={colors.darkGray}
            style={styles.textInput}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onSubmitEditing={handleDone}
            {...props}
            secureTextEntry={!showPassword ? true : false}
          />
        )}

        <View>
          {!isPassword && (
            <Feather
              name="mail"
              size={hp(22)}
              color={IsFocused ? colors.secondaryBg : colors.darkGray}
              style={{marginRight: 12}}
            />
          )}

          {isPassword && (
            <TouchableOpacity onPress={() => setshowPassword(prev => !prev)}>
              <Feather
                name={showPassword ? 'eye' : 'eye-off'}
                size={hp(22)}
                color={IsFocused ? colors.secondaryBg : colors.darkGray}
                style={{marginRight: 12}}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
      <Text style={styles.errorText}>{error}</Text>
    </View>
  );
});

export default AuthInput;

const styles = StyleSheet.create({
  inputWrapper: {
    marginHorizontal: wp(10),
    width: '95%',
    //     paddingVertical: hp(0),
  },
  label: {
    paddingVertical: hp(5),
    fontSize: hp(18),
    fontFamily: FONTS.TEXT_REGULAR,
    color: colors.dark,
  },
  Input: {
    backgroundColor: colors.bootomHeaderBg,

    flexDirection: 'row',
    height: hp(55),
    alignItems: 'center',
    borderRadius: 4,
    fontSize: hp(18),

    // borderWidth: 1,
  },

  textInput: {
    flex: 1,
    paddingHorizontal: wp(10),
    fontSize: FontSize.MediumText,
    fontFamily: FONTS.TEXT_REGULAR,
    color: colors.dark,
  },

  errorText: {
    color: 'red',
    fontFamily: FONTS.TEXT_REGULAR,
    fontSize: FontSize.SmallText,
    paddingVertical: hp(5),
  },
});
