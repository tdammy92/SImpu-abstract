import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {hp} from 'src/utils';
import {colors, FONTS} from 'src/constants';

type Props = {
  btnText: string;
  handlePres: any;
};

const HeaderNextBtn = (props: Props) => {
  return (
    <TouchableOpacity
      onPress={props.handlePres}
      style={{
        marginLeft: 8,
      }}>
      <Text style={styles.btnText}>{props.btnText}</Text>
    </TouchableOpacity>
  );
};

export default HeaderNextBtn;

const styles = StyleSheet.create({
  btnText: {
    color: colors.primaryText,
    fontSize: hp(16),
    marginRight: hp(15),
    fontFamily: FONTS.AVERTA_SEMI_BOLD,
  },
});
