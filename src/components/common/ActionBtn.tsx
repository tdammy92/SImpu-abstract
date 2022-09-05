import React, { memo, ComponentProps } from 'react';
import { StyleSheet, View, StyleProp, ViewStyle } from 'react-native';

import { Button as BaseButton, Text } from '@ui-kitten/components';

import { hp } from '../../utils/responsiveDesign';

type ButtonProps = ComponentProps<typeof BaseButton> & {
  title: string;
  bg: string;
  borderColor: string;
  color: string;
  isLoading?: boolean;
  loaderColor?: string;
  style?: StyleProp<ViewStyle>;
};

export const ActionButton = memo(
  ({
    title,
    bg,
    borderColor,
    color,
    isLoading = false,
    style,
    ...rest
  }: ButtonProps) => {
    const styles = StyleSheet.create({
      btn: {
        borderRadius: hp(10),
        backgroundColor: bg,
        borderColor: borderColor,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
      },
      containerStyle: {
        width: '45%',
      },
      textColor: {
        color: color,
      },
    });
    return (
      <View style={styles.containerStyle}>
        <BaseButton
          size={'small'}
          disabled={isLoading}
          style={[styles.btn, style]}
          {...rest}
        >
          {() => <Text style={styles.textColor}>{title}</Text>}
        </BaseButton>
      </View>
    );
  },
);
