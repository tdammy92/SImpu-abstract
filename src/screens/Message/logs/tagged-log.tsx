import {StyleSheet, Text, View} from 'react-native';
import React, {memo} from 'react';
import {FONTS, FontSize, colors} from 'src/constants';
import {hp, wp} from 'src/utils';
import {format} from 'date-fns';
import AntDesign from 'react-native-vector-icons/AntDesign';

const TaggedComment = ({data}: any) => {
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
      <View style={{}}>
        <Text style={styles.commentText}>
          <AntDesign name="tag" size={hp(18)} color={data?.entity?.color} />
          <Text style={[styles.commentText, {color: data?.entity?.color}]}>
            {' '}
            {data?.entity?.name}
          </Text>
          <Text style={[styles.commentText, {marginLeft: wp(4)}]}>
            {' '}
            added by {data?.author?.name}
          </Text>
        </Text>
        <Text style={styles.commentDate}>
          {format(new Date(data?.created_datetime), 'dd-MM-yy p')}
        </Text>
      </View>
    </View>
  );
};

export default memo(TaggedComment);

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
