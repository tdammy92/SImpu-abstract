import {StyleSheet, Text, View} from 'react-native';
import React, {memo} from 'react';
import {hp, wp} from 'src/utils';
import {colors, FONTS, FontSize} from 'src/constants';
import {format} from 'date-fns';

const Comments = ({data}: any) => {
  return (
    <View style={styles.container}>
      <Text style={styles.commentText}>
        Conversation started at{' '}
        {format(new Date(data?.created_datetime), 'pp d-MMM-yyyy ')}
      </Text>
    </View>
  );
};

export default memo(Comments);

const styles = StyleSheet.create({
  container: {
    marginHorizontal: wp(15),
    alignItems: 'center',
    padding: hp(5),
    borderRadius: 15,
  },

  commentText: {
    fontFamily: FONTS.TEXT_SEMI_BOLD,
    color: colors.dark,
    fontSize: FontSize.SmallText,
  },
});
