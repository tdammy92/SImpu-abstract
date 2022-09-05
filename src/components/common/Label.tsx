import {Text} from '@ui-kitten/components';
import React, {ComponentProps} from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {FONTS} from 'src/constants';
import {globalStyles} from 'src/styles';
import {hp} from 'src/utils';

type LabelListProps = ComponentProps<typeof Pressable> & {
  text?: string;
  text2?: string;
  icon1?: React.ReactNode;
  icon2?: React.ReactNode;
  onPress?: Function;
  border?: boolean;
  borderBottom?: boolean;
  storage?: boolean;
};

const Labellist = ({
  text,
  icon1,
  icon2,
  storage,
  border,
  borderBottom,
  text2,
  ...rest
}: LabelListProps) => {
  const styles = StyleSheet.create({
    textContainer: {
      width: '60%',
    },
    withBorder: {
      borderTopWidth: border ? 1 : 0,
      borderTopColor: 'rgba(60, 60, 67, 0.1)',
      borderBottomWidth: borderBottom ? 1 : 0,
      borderBottomColor: 'rgba(60, 60, 67, 0.1)',
      minHeight: 53,
      paddingHorizontal: 10,
      paddingBottom: borderBottom ? 10 : 0,
    },
    iconWidth: {
      width: '15%',
      alignItems: 'center',
    },
    textStyle: {
      color: '#0A0748',
      fontFamily: FONTS.AVERTA_REGULAR,
      fontWeight: '400',
      fontSize: hp(17),
      lineHeight: hp(24),
    },
    textStyle2: {
      color: '#0A0748',
      fontFamily: FONTS.AVERTA_SEMI_BOLD,
      fontWeight: '400',
      fontSize: hp(13),
      opacity: 0.5,
      lineHeight: 16,
    },
  });
  return (
    <Pressable {...rest} style={[globalStyles.rowBetween, styles.withBorder]}>
      {storage ? null : <View>{icon1}</View>}
      <View style={styles.textContainer}>
        <Text style={styles.textStyle}>{text}</Text>
        {text2 ? <Text style={styles.textStyle2}>{text2}</Text> : null}
      </View>
      <View style={styles.iconWidth}>{icon2}</View>
    </Pressable>
  );
};

export default Labellist;
