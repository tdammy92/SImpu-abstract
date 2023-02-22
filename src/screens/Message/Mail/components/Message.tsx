import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
  useWindowDimensions,
  View,
} from 'react-native';
import React, {useState, memo, useRef, useMemo, useCallback} from 'react';
import {Divider} from '@ui-kitten/components';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {colors, FONTS, FontSize} from 'src/constants';
import {hp, wp} from 'src/utils';
import {format} from 'date-fns';
import {useNavigation} from '@react-navigation/native';

//@ts-ignore
import UserAvatar from 'react-native-user-avatar';
import {trimText} from 'src/utils/string-utils/string';
import Htmlview from './HtmlView';
import {useDispatch, useSelector} from 'react-redux';
import {StoreState} from 'src/@types/store';
import {useMessageContent} from 'src/services/query/queries';

import Entypo from 'react-native-vector-icons/Entypo';
import MessageBox from './message-box';
import OptionSheet from './optionSheet';
import {SCREEN_NAME} from 'src/navigation/constants';
import {setMessage} from 'src/store/message/message';

const Message = ({data, receiver}: any) => {
  // console.log('Html0 message', JSON.stringify(data, null, 2));

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const {profile, user, token} = useSelector(
    (state: StoreState) => state?.user,
  );

  const organisation = useSelector(
    (state: StoreState) => state?.organisation?.details,
  );

  const optionRef = useRef<any>(null);

  const {data: messageContent, isLoading} = useMessageContent(
    {
      enabled:
        data?.entity?.has_message === false && data?.entity?.content === null,
      contentId: data?.uuid,
      Auth: token,
      organisationId: organisation?.id,
    },
    {
      onSuccess(data: any, variables: any, context: any) {
        // setThreadDetail(data?.data);
        // console.log('message content', JSON.stringify(data, null, 2));
      },
      onError(error: any, variables: any, context: any) {
        console.log('message info error', error);
      },
    },
  );

  const OpenOptions = () => {
    if (optionRef.current) {
      optionRef.current.open();
    }
  };
  const closeOptions = () => {
    if (optionRef.current) {
      optionRef.current.close();
    }
  };

  // mail={data}
  //       receiver={receiver}
  //       messageType={messageType}
  //       sentFrom={data?.entity?.recipients?.from}
  //       sentTo={data?.entity?.recipients?.to}
  //       subject={data?.entity?.content?.subject}
  //       closeMessageBox={closeMessageBox}
  //       closeOptions={closeOptions}

  //handle open functions
  const openReply = useCallback(() => {
    dispatch(setMessage({message: data, receiver, messageType: 'reply'}));

    closeOptions();

    //@ts-ignore
    navigation.navigate(SCREEN_NAME.mailBox);
  }, [navigation, data, receiver]);

  const openForward = useCallback(() => {
    dispatch(setMessage({message: data, receiver, messageType: 'forward'}));

    closeOptions();

    //@ts-ignore
    navigation.navigate(SCREEN_NAME.mailBox);
  }, [navigation, data, receiver]);

  return (
    <>
      <View style={styles.container}>
        {/* <View> */}
        <View style={styles.messageHeader}>
          {/* author avatar */}
          <View style={{flexDirection: 'row'}}>
            <UserAvatar
              size={hp(35)}
              style={{height: hp(35), width: hp(35)}}
              borderRadius={hp(35 * 0.5)}
              name={data?.author?.platform_nick ?? data?.author?.name}
              src={data?.author?.image_url}
            />
            {/* author message header */}

            <View style={{marginLeft: wp(10), maxWidth: '80%'}}>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.messageHeaderTextBig}>
                  {trimText(
                    data?.author?.name ??
                      data?.entity?.recipents?.from[0]?.platform_nick,
                    15,
                  )}
                </Text>
                {!!data?.author?.platform_nick && (
                  <Text
                    style={[
                      styles.messageHeaderTextBig,
                      {marginLeft: wp(4), color: colors.darkGray},
                    ]}>
                    {/* |{' '}
                    {trimText(
                      data?.author?.platform_nick ??
                        data?.entity?.recipents?.from[0]?.platform_nick,
                      10,
                    )} */}
                  </Text>
                )}
              </View>
              <View style={{flexDirection: 'row'}}>
                <Text
                  style={[
                    styles.messageHeaderTextSmall,
                    {fontFamily: FONTS.TEXT_SEMI_BOLD},
                  ]}>
                  To:
                </Text>
                <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                  {data?.entity?.recipients?.to?.map(
                    (recipient: any, i: number) => (
                      <Text key={`${i}`} style={styles.messageHeaderTextSmall}>
                        {trimText(recipient?.platform_nick, 35)}
                        {i !== data?.entity?.recipients?.to?.length - 1 &&
                          ','}{' '}
                      </Text>
                    ),
                  )}
                </View>
              </View>
              <Text style={styles.messageHeaderTextSmall}>
                {format(new Date(data?.created_datetime), 'd LLL, pp')}
              </Text>
            </View>
          </View>
          {/* author options */}
          <TouchableOpacity style={{padding: hp(5)}} onPress={OpenOptions}>
            <SimpleLineIcons name="options" size={18} color={colors.darkGray} />
          </TouchableOpacity>
        </View>

        {!isLoading && (
          <Htmlview
            htmldata={data?.entity?.content?.body ?? messageContent?.data?.body}
          />
        )}

        <View style={styles.messageFooter}>
          <TouchableOpacity style={styles.actionBtn} onPress={openReply}>
            <MaterialCommunityIcons
              name="reply-outline"
              size={20}
              color={colors.light}
            />
            <Text style={styles.actionBtnText}>Reply</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionBtn} onPress={openForward}>
            <Text style={styles.actionBtnText}>Forward</Text>
            <MaterialCommunityIcons
              name="share-outline"
              size={20}
              color={colors.light}
            />
          </TouchableOpacity>
        </View>
        {/* </View> */}
      </View>

      {/* message options */}

      <OptionSheet
        ref={optionRef}
        handleReply={openReply}
        handleForward={openForward}
      />

      {/* <MessageBox
        ref={messageBoxRef}
        mail={data}
        receiver={receiver}
        messageType={messageType}
        sentFrom={data?.entity?.recipients?.from}
        sentTo={data?.entity?.recipients?.to}
        subject={data?.entity?.content?.subject}
        closeMessageBox={closeMessageBox}
        closeOptions={closeOptions}
      /> */}
    </>
  );
};

export default memo(Message);

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.light,
    marginVertical: hp(15),
    marginHorizontal: wp(10),
    paddingHorizontal: wp(8),
    paddingVertical: hp(8),
    borderRadius: hp(10),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: hp(5),
  },
  messageHeaderTextSmall: {
    fontFamily: FONTS.TEXT_REGULAR,
    fontSize: FontSize.MediumText,
    color: colors.dark,
    lineHeight: 22,
    paddingVertical: hp(2),
  },
  messageHeaderTextBig: {
    fontFamily: FONTS.TEXT_SEMI_BOLD,
    fontSize: FontSize.MediumText,
    color: colors.dark,
    lineHeight: 24,
    paddingVertical: hp(2),
  },

  htmlContainer: {
    // overflow: 'scroll',
    width: 250,
    flex: 1,
  },
  messageFooter: {
    marginHorizontal: wp(10),
    marginVertical: hp(10),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  actionBtn: {
    backgroundColor: colors.secondaryBg,
    flexDirection: 'row',
    padding: hp(5),
    paddingHorizontal: hp(10),
    width: wp(100),
    borderRadius: hp(5),
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionBtnText: {
    fontFamily: FONTS.TEXT_SEMI_BOLD,
    color: colors.light,
    fontSize: FontSize.MediumText,
    // padding: hp(5),
  },
});
