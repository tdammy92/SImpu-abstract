import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {hp} from 'src/utils';
import {colors, FONTS, FontSize} from 'src/constants';

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
    color: colors.dark,
    fontSize: FontSize.MediumText,
    marginRight: hp(15),
    fontFamily: FONTS.TEXT_SEMI_BOLD,
  },
});
