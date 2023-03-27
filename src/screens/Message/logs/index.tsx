import {StyleSheet, Text, View} from 'react-native';
import React, {memo} from 'react';
import {hp, wp} from 'src/utils';
import {colors, FONTS, FontSize} from 'src/constants';

import UntaggedComment from './untagged-log';
import TaggedComment from './tagged-log';
import AssignedComment from './assigned-log';

import StartLog from './start-log';
import ResolvedLog from './resolved-log';
import ParticipantLog from './participant-log';
import {useSelector} from 'react-redux';
import {StoreState} from 'src/@types/store';
import MovedLog from './moved-log';

const Logs = ({data}: any) => {
  // console.log('zzzz', JSON.stringify(data, null, 2));

  const {profile, user, token} = useSelector(
    (state: StoreState) => state?.user,
  );

  const iSLoggedInUser = data?.author?.user_id === profile?.user_id;

  // console.log('log history', JSON.stringify(data, null, 2));

  //log tag
  if (data?.type.includes('log/participant')) {
    return <ParticipantLog data={data} iSLoggedInUser={iSLoggedInUser} />;
  }
  //log tag
  if (data?.type === 'log/assign') {
    return <AssignedComment data={data} iSLoggedInUser={iSLoggedInUser} />;
  }
  //log tag
  if (data?.type === 'log/resolve') {
    return <ResolvedLog data={data} iSLoggedInUser={iSLoggedInUser} />;
  }
  //log tag
  if (data?.type.includes('log/move')) {
    return <MovedLog data={data} iSLoggedInUser={iSLoggedInUser} />;
  }
  if (data?.type === 'log/tag') {
    return <TaggedComment data={data} iSLoggedInUser={iSLoggedInUser} />;
  }

  //log untag
  if (data?.type === 'log/untag') {
    return <UntaggedComment data={data} iSLoggedInUser={iSLoggedInUser} />;
  }

  if (data?.type === 'log/start') {
    return <StartLog data={data} />;
  }

  //conversation started
  return (
    <View style={styles.container}>
      <Text style={styles.commentText}>{data?.type}</Text>
    </View>
  );
};

export default memo(Logs);

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
