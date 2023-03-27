import {
  StyleSheet,
  TouchableOpacity,
  View,
  Dimensions,
  Platform,
} from 'react-native';
import {Text, Modal} from '@ui-kitten/components';
import React, {useState, useEffect, useRef, useMemo} from 'react';

import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CreateIcon from 'src/assets/images/CreateIcon.svg';
import {hp, wp} from 'src/utils';
import {colors, FONTS, FontSize} from 'src/constants';
import Animated, {Easing, SlideInRight} from 'react-native-reanimated';
import {useNavigation} from '@react-navigation/native';
import {SCREEN_NAME} from 'src/navigation/constants';
import ChannelIcon from 'src/components/common/ChannelIcon';
import {FormatText} from 'src/utils/string-utils/string';
import stc from 'string-to-color';
import {StoreState} from 'src/@types/store';
import {UserConnectChanel} from 'src/services/query/queries';
import {useSelector} from 'react-redux';
import {hi} from 'date-fns/locale';

const {width, height} = Dimensions.get('screen');

// const channels = [
//   {
//     uuid: 'a1ec09fcaa87420d89bb62819ed1e24d',
//     name: 'email',
//     image_url:
//       'https://res.cloudinary.com/simpu-inc/image/upload/v1618667262/documents/g5d7pgclzx0r8mzadjf1.jpg',
//     updated_datetime: null,
//     created_datetime: '2021-06-23T03:11:16.374Z',
//   },
//   {
//     uuid: '19259a6b379d476bb3dbf6dce71b4fd1',
//     name: 'twitter',
//     image_url:
//       'https://res.cloudinary.com/simpu-inc/image/upload/v1618667262/documents/g5d7pgclzx0r8mzadjf1.jpg',
//     updated_datetime: null,
//     created_datetime: '2021-06-23T03:05:12.310Z',
//   },

//   // {
//   //   uuid: '351fe236cfcc48928305fdf66f73a9e2',
//   //   name: 'phone',
//   //   image_url:
//   //     'https://res.cloudinary.com/simpu-inc/image/upload/v1618667262/documents/g5d7pgclzx0r8mzadjf1.jpg',
//   //   updated_datetime: null,
//   //   created_datetime: '2021-06-23T03:11:16.374Z',
//   // },

//   {
//     uuid: '33f50becc91447edbfece36ac1772116',
//     name: 'instagram',
//     image_url:
//       'https://res.cloudinary.com/simpu-inc/image/upload/v1618667262/documents/g5d7pgclzx0r8mzadjf1.jpg',
//     updated_datetime: null,
//     created_datetime: '2021-08-23T10:36:26.132Z',
//   },
//   {
//     uuid: '1c387c7400cd4d3fa2c19326dfb4cb85',
//     name: 'whatsapp',
//     image_url:
//       'https://res.cloudinary.com/simpu-inc/image/upload/v1618667262/documents/g5d7pgclzx0r8mzadjf1.jpg',
//     updated_datetime: null,
//     created_datetime: '2021-06-23T03:11:16.374Z',
//   },
//   {
//     uuid: 'd56c372462804176b83ef463e29d5c1b',
//     name: 'messenger',
//     image_url:
//       'https://res.cloudinary.com/simpu-inc/image/upload/v1618667262/documents/g5d7pgclzx0r8mzadjf1.jpg',
//     updated_datetime: null,
//     created_datetime: '2021-06-23T03:11:16.374Z',
//   },
// ];

const ComposeMessageBtn = () => {
  const navigation = useNavigation();
  const [showOption, setshowOption] = useState(false);

  const {profile, user, token} = useSelector(
    (state: StoreState) => state?.user,
  );
  const organisation = useSelector(
    (state: StoreState) => state?.organisation?.details,
  );

  const {data: userConnectedAccounts, isLoading} = UserConnectChanel(
    {
      type: 'all',
      Auth: token,
      organisationId: organisation?.id,
    },
    {
      onSuccess(data: any, variables: any, context: any) {},
      onError(error: any, variables: any, context: any) {
        console.log('message info error', error);
      },
    },
  );

  //filtering channels that allow composing message
  const filterComposeChannels = useMemo(() => {
    //sorting array to prevent same channel type
    const uniqueUserConnectedAccounts = () => {
      return [
        ...new Map(
          userConnectedAccounts?.map((item: any) => [
            item['channel_name'],
            item,
          ]),
        ).values(),
      ];
    };
    return uniqueUserConnectedAccounts()?.filter((item: any) =>
      ['whatsapp', 'twitter', 'email', 'phone'].includes(item?.channel_name),
    );
  }, [userConnectedAccounts]);

  const ShowComponse = () => {
    setshowOption(true);
  };

  const NavigateCompose = (selectedChannel: any) => {
    setshowOption(false);

    if (selectedChannel?.channel_name === 'email') {
      //@ts-ignore
      navigation.navigate(SCREEN_NAME.composeMail, {
        channel: selectedChannel,
        connectedChannels: userConnectedAccounts,
      });
    } else {
      //@ts-ignore
      navigation.navigate(SCREEN_NAME.composeSocial, {
        channel: selectedChannel,
        connectedChannels: userConnectedAccounts,
      });
    }
  };

  return (
    <>
      <Modal
        visible={showOption}
        style={
          {
            // backgroundColor: 'yellow',
            // flex: 1,
            // height: height,
            // width: width,
          }
        }
        backdropStyle={{backgroundColor: 'rgba(0,0,0,0.2)'}}
        onBackdropPress={() => setshowOption(false)}>
        <View style={styles.channelContainer}>
          {filterComposeChannels?.map((channel: any, idx: number) => (
            <TouchableOpacity
              key={`${idx}`}
              onPress={() => NavigateCompose(channel)}>
              <Animated.View
                style={[
                  styles.msgBtn,
                  {
                    // borderRightWidth: 1.5,
                    borderRightColor: stc(channel?.channel_name),
                  },
                ]}
                entering={SlideInRight.duration(idx * 100)}>
                <ChannelIcon
                  name={channel?.channel_name}
                  height={25}
                  width={25}
                />
                <Text style={[styles.btnText]}>
                  {FormatText(channel?.channel_name)}
                </Text>
              </Animated.View>
            </TouchableOpacity>
          ))}
        </View>
      </Modal>

      {!showOption && (
        <TouchableOpacity style={styles.composeBtn} onPress={ShowComponse}>
          <CreateIcon height={hp(30)} width={hp(30)} />
        </TouchableOpacity>
      )}
    </>
    // <View style={styles.composeContainer}>
    // </View>
  );
};

export default ComposeMessageBtn;

const styles = StyleSheet.create({
  composeContainer: {
    zIndex: 5,
    backgroundColor: 'yellow',
    height: '100%',
    width: '100%',
    // position: 'absolute',
    // bottom: hp(30),
    // right: wp(10),
    // alignItems: 'flex-end',
  },

  channelContainer: {
    position: 'absolute',
    // backgroundColor: 'green',
    // alignSelf: 'flex-end',
    // alignItems: 'flex-end',
    // justifyContent: 'flex-end',
    // width: width * 0.5,
    // left: Platform.OS === 'android' ? hp(83) : hp(68),
    // left: width * 0.5,
    left: wp(50),
    // top: hp(50),
    // right: wp(10),
  },

  msgBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.light,
    paddingHorizontal: wp(10),
    paddingVertical: hp(4),
    marginVertical: hp(8),
    borderRadius: hp(15),
    // borderBottomLeftRadius: hp(15),
  },

  btnText: {
    fontSize: FontSize.MediumText,
    paddingVertical: hp(4),
    fontFamily: FONTS.TEXT_REGULAR,
    color: colors.dark,
    paddingLeft: wp(3),
  },

  composeBtn: {
    position: 'absolute',
    zIndex: 100,
    bottom: hp(80),
    right: wp(10),
    width: hp(55),
    height: hp(55),
    backgroundColor: colors.secondaryBg,
    padding: hp(10),
    borderRadius: hp(55 * 0.5),
    marginTop: hp(10),
    alignItems: 'center',
    justifyContent: 'center',
  },
});
