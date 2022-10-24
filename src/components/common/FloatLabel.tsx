import {Text} from '@ui-kitten/components';
import React, {ComponentProps} from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {FONTS} from 'src/constants';
import {globalStyles} from 'src/styles';
import {hp} from 'src/utils';

type LabelListProps = ComponentProps<typeof Pressable> & {
  text: string;
  text2?: string;
  simpuBlue?: boolean;
  icon2?: React.ReactNode;
  onPress?: Function;
  border?: boolean;
};

const FloatLabel = ({
  text,
  text2,
  icon2,
  border,
  simpuBlue,
  ...rest
}: LabelListProps) => {
  const styles = StyleSheet.create({
    textContainer: {
      width: simpuBlue ? '100%' : '50%',
    },
    withBorder: {
      borderTopWidth: border ? 1 : 0,
      borderTopColor: 'rgba(60, 60, 67, 0.1)',
      minHeight: 53,
      paddingHorizontal: 10,
    },
    iconWidth: {
      width: '60%',
    },
    textStyle: {
      color: simpuBlue ? '#3525E6' : '#0A0748',
      fontWeight: '400',
      fontSize: hp(17),
      fontFamily: FONTS.AVERTA_REGULAR,
    },
    textStyle2: {
      width: '65%',
      color: '#908FA8',
      fontSize: hp(16),
      textAlign: 'right',
      marginRight: 10,
      fontFamily: FONTS.AVERTA_REGULAR,
    },
    float: {
      width: '65%',
    },
  });
  return (
    <Pressable {...rest} style={[globalStyles.rowBetween, styles.withBorder]}>
      <View style={styles.textContainer}>
        <Text style={styles.textStyle}>{text}</Text>
      </View>
      <View style={[globalStyles.rowBetween, styles.float]}>
        <Text style={styles.textStyle2}>{text2}</Text>
        <View style={styles.iconWidth}>{icon2}</View>
      </View>
    </Pressable>
  );
};

export default FloatLabel;
