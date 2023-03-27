import {StyleSheet, Text, View} from 'react-native';
import React, {memo} from 'react';
import {FONTS, FontSize, colors} from 'src/constants';
import {hp, wp} from 'src/utils';
import {format} from 'date-fns';
import AntDesign from 'react-native-vector-icons/AntDesign';

const StartLog = ({data}: any) => {
  return (
    <View style={styles.container}>
      <Text style={styles.commentText}>
        <AntDesign name="clockcircleo" color={colors.darkGray} size={hp(16)} />{' '}
        Conversation started at{' '}
        {format(new Date(data?.created_datetime), 'dd-MM-yy p')}
      </Text>
    </View>
  );
};

export default memo(StartLog);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: wp(15),
    marginVertical: hp(8),
    alignItems: 'center',
    padding: hp(5),
    borderRadius: 15,
  },

  rightContainer: {
    marginLeft: wp(10),
  },

  bodyText: {
    fontFamily: FONTS.TEXT_REGULAR,
    color: colors.dark,
    fontSize: FontSize.MediumText,
    lineHeight: hp(24),
  },
  actionText: {
    fontFamily: FONTS.TEXT_REGULAR,
    color: colors.dark,
    fontSize: FontSize.MediumText,
    lineHeight: hp(24),
  },
  commentText: {
    fontFamily: FONTS.TEXT_REGULAR,
    color: colors.dark,
    fontSize: FontSize.MediumText,
    lineHeight: hp(24),
  },
  commentDate: {
    fontFamily: FONTS.TEXT_REGULAR,
    color: colors.dark,
    fontSize: FontSize.MediumText,
  },
});
