import {StyleSheet, Text, View} from 'react-native';
import React, {memo} from 'react';
import {FONTS, FontSize, colors} from 'src/constants';
import {hp, wp} from 'src/utils';
import {format} from 'date-fns';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';

const ParticipantLog = ({data, iSLoggedInUser}: any) => {
  //   console.log('Data from participant', JSON.stringify(data, null, 2));
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
          <Feather name="users" size={hp(18)} color={colors.dark} />
          <Text style={[styles.commentText, {marginLeft: wp(4)}]}>
            {' '}
            {data?.type === 'log/participant/add' ? 'Invited' : 'Removed'}{' '}
            {data?.entity?.name} as a
          </Text>
          <Text
            style={[
              styles.commentText,
              {color: data?.entity?.color, fontFamily: FONTS.TEXT_SEMI_BOLD},
            ]}>
            {' '}
            Participant
          </Text>{' '}
          by {iSLoggedInUser ? 'you' : data?.author?.name}
        </Text>
        <Text style={styles.commentDate}>
          {format(new Date(data?.created_datetime), 'dd-MM-yy p')}
        </Text>
      </View>
    </View>
  );
};

export default memo(ParticipantLog);

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