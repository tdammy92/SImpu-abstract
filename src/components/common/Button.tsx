import React, {memo, ComponentProps} from 'react';
import {
  StyleSheet,
  View,
  StyleProp,
  ViewStyle,
  TouchableOpacity,
} from 'react-native';

import {Button as BaseButton, Text} from '@ui-kitten/components';

import {hp} from '../../utils/responsiveDesign';
import {colors, FONTS, FontSize} from '../../constants';

type ButtonProps = ComponentProps<typeof BaseButton> & {
  title: string;
  isLoading?: boolean;
  loaderColor?: string;
  style?: StyleProp<ViewStyle>;
};

export const Button = memo(
  ({title, isLoading = false, style, ...rest}: ButtonProps) => {
    return (
      <View style={styles.containerStyle}>
        <TouchableOpacity
          disabled={isLoading}
          size="large"
          style={[styles.btn, style]}
          {...rest}>
          <Text allowFontScaling={false} style={styles.btnText}>
            {title}
          </Text>
        </TouchableOpacity>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  btn: {
    borderRadius: hp(10),
    minHeight: hp(45),
    backgroundColor: colors.secondaryBg,
    borderColor: 'transparent',
    fontSize: FontSize.MediumText,
    paddingVertical: 6,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    fontFamily: FONTS.TEXT_REGULAR,
  },
  btnText: {
    fontSize: FontSize.MediumText,

    justifyContent: 'center',
    alignItems: 'center',
    color: colors.light,
    fontFamily: FONTS.TEXT_SEMI_BOLD,
  },
  containerStyle: {
    width: '95%',
  },
});
