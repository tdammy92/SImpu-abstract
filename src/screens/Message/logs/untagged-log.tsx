import {StyleSheet, Text, View} from 'react-native';
import React, {memo} from 'react';
import {FONTS, FontSize, colors} from 'src/constants';
import {hp, wp} from 'src/utils';
import {format} from 'date-fns';
import AntDesign from 'react-native-vector-icons/AntDesign';

const UntaggedComment = ({data}: any) => {
  return (
    <View
      style={[
        styles.container,
        {
          flexDirection: 'row',
          alignItems: 'center',
          // justifyContent: 'center',
        },
      ]}>
      <View style={[]}>
        <Text style={styles.commentText}>
          <AntDesign name="tago" size={hp(18)} color={data?.entity?.color} />
          <Text style={[styles.commentText, {color: data?.entity?.color}]}>
            {' '}
            {data?.entity?.name}
          </Text>{' '}
          removed
          {/* {data?.author?.name} */}
        </Text>
        <Text style={styles.commentDate}>
          {' '}
          {format(new Date(data?.created_datetime), 'dd-MM-yy p')}
        </Text>
      </View>
    </View>
  );
};

export default memo(UntaggedComment);

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
