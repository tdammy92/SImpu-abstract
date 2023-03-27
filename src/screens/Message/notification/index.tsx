import {
  StyleSheet,
  View,
  Dimensions,
  FlatList,
  TouchableOpacity,
  Image,
  RefreshControl,
} from 'react-native';
import React, {useState, useCallback} from 'react';
import {Button, Card, Modal, Divider, Text} from '@ui-kitten/components';
import {useDispatch, useSelector} from 'react-redux';

//@ts-ignore
import UserAvatar from 'react-native-user-avatar';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors, FONTS, FontSize} from 'src/constants';
import {hp, messsageToast, wp} from 'src/utils';
import {SCREEN_NAME} from 'src/navigation/constants';
import dummyData from 'src/constants/dummyData';
import EmptyNotify from 'src/components/common/EmptyNotification';
import NotificationListIcon from 'src/assets/images/NotificationListIcon.svg';
import {FormatText} from 'src/utils/string-utils/string';
import {notificationDateFormat} from 'src/utils/date-utils/date';
import {StoreState} from 'src/@types/store';
import {useNotificationTrayQuery} from 'src/services/query/queries';
import {Avatar} from 'src/constants/general';
import ChannelIcon from 'src/components/common/ChannelIcon';
import Entypo from 'react-native-vector-icons/Entypo';
import Animated, {
  or,
  SlideInLeft,
  SlideOutRight,
} from 'react-native-reanimated';
import NotificationLoader from 'src/components/Loaders/notificationLoader';
import {queryClient} from 'src/index';
import {markAllNotificationTrayItems} from 'src/services/mutations/notification';
import {useMutation} from 'react-query';

const {width, height} = Dimensions.get('screen');

const channelTypee = [
  'whatsapp',
  'messenger',
  'phone',
  'twitter',
  'whatsappWeb',
  'email',
  'instagram',
  'livechat',
];
const channelTypeeSocials = [
  'whatsapp',
  'messenger',
  'phone',
  'twitter',
  'whatsappWeb',
  'instagram',
  'livechat',
];

const Notification = (props: any) => {
  const {navigation} = props;

  const {token} = useSelector((state: StoreState) => state.user);
  const organisaion = useSelector(
    (state: StoreState) => state.organisation.details,
  );
  const [notifications, setNotifications] = useState<[]>([]);

  //Mark conversation as read
  const markAsReadMutation = useMutation(
    () =>
      markAllNotificationTrayItems({
        Auth: token,
        organisationId: organisaion?.id,
      }),
    {
      onSuccess(data, variables, context) {
        // console.log('all notification  sucessfull marked as read');
        messsageToast({
          message: 'All notifications marked as read',
          type: 'success',
        });
        setNotifications([]);
      },
      onError(error, variables, context) {
        console.log('error from marking  all notifications reead', error);
        messsageToast({
          message: 'notifcaions could not be cleared',
          type: 'danger',
        });
      },
    },
  );

  const {
    data: notification,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isLoading,
  } = useNotificationTrayQuery(
    {
      status: 'unread',
      page: 1,
      Auth: token,
      organisationId: organisaion.id,
    },
    {
      onSuccess(data: any, variables: any, context: any) {
        //This snippet flattens the array

        // console.log(
        //   '+++++++++++++++++++++++++++++++++++++++++',
        //   JSON.stringify(data, null, 2),
        //   '--------------------------------------------',
        // );

        const notifications = data?.pages
          ?.map((res: any) => res.data?.map((r: any) => r))
          ?.flat(2);
        // const filteredMessageNotofocations =
        setNotifications(notifications);
      },
      onError(error: any, variables: any, context: any) {
        console.log('post message error', error);
        // messsageToast({message: 'Profile updated', type: 'success'});

        messsageToast({message: `${error?.message}`, type: 'danger'});
      },
    },
  );

  //formate the notification return
  //This snippet flattens the array

  //clear all notification
  const ClearNotification = () => {
    markAsReadMutation.mutate();
    // setData([]);
  };

  const List = ({item, index}: any) => {
    const {data} = item?.event;

    // console.log('Notifications data', JSON.stringify(data, null, 2));

    const handleNavigate = () => {
      if (data?.channel_name === 'email' && !!data?.thread_id) {
        //@ts-ignore
        navigation.navigate(SCREEN_NAME.mail as never, {
          threadId: data?.thread_id,
        });
      } else if (
        channelTypeeSocials.includes(data?.channel_name) &&
        !!data?.thread_id
      ) {
        //@ts-ignore

        navigation.navigate(SCREEN_NAME.chat as never, {
          threadId: data?.thread_id,
        });
      }
    };

    return (
      <Animated.View
        entering={SlideInLeft.delay(50 * index)}
        exiting={SlideOutRight.delay(50 * index)}>
        <TouchableOpacity
          style={[styles.listItemContainer]}
          disabled={!data?.hasOwnProperty('channel_name')}
          onPress={handleNavigate}>
          <View style={[styles.listItemContent, {}]}>
            <View style={{flexDirection: 'row', paddingBottom: 10}}>
              <View style={{marginRight: 10}}>
                <View
                  style={{
                    height: hp(40),
                    width: hp(40),
                    borderRadius: hp(40 * 0.5),
                    backgroundColor: colors.lightGray,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  {channelTypee.includes(data?.channel_name) ? (
                    <ChannelIcon
                      name={item?.event?.data?.channel_name}
                      width={20}
                      height={20}
                    />
                  ) : (
                    <Entypo
                      name={'info'}
                      size={hp(16)}
                      color={colors.secondaryBg}
                    />
                  )}
                </View>
              </View>
            </View>

            <View style={{width: '95%'}}>
              <Text
                style={{
                  width: '90%',
                  fontSize: FontSize.MediumText,
                  lineHeight: hp(24),
                  fontFamily: FONTS.TEXT_REGULAR,
                }}>
                {item?.message}
              </Text>
              <Text
                style={{
                  color: colors.darkGray,
                  fontFamily: FONTS.TEXT_REGULAR,
                  fontSize: FontSize.SmallText,
                  marginTop: hp(5),
                }}>
                {notificationDateFormat(item?.created_datetime)}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        <Divider />
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <View style={styles.topLeft}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{flexDirection: 'row'}}>
            <Ionicons
              name="arrow-back-sharp"
              size={25}
              color={colors?.secondaryBg}
            />
            <Text style={styles.notificationText}>Notifications</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.topRight}>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
            disabled={notifications?.length === 0}
            onPress={ClearNotification}>
            <Text style={styles.clearText}>Clear All</Text>
            <Feather name="check-circle" size={18} color={colors.secondaryBg} />
          </TouchableOpacity>
        </View>
      </View>
      <Divider style={{height: 1}} />

      {isLoading ? (
        <NotificationLoader />
      ) : (
        <FlatList
          data={notifications}
          renderItem={List}
          keyExtractor={(_, i) => i.toString()}
          ListEmptyComponent={EmptyNotify}
          showsVerticalScrollIndicator={true}
          refreshControl={
            <RefreshControl
              refreshing={isFetching}
              onRefresh={() =>
                queryClient.invalidateQueries(['notification-tray-items'])
              }
            />
          }
          onEndReachedThreshold={0.6}
          //@ts-ignore
          onEndReached={fetchNextPage}
          ItemSeparatorComponent={() => <Divider />}
          contentContainerStyle={{paddingHorizontal: hp(10)}}
        />
      )}
    </View>
  );
};

export default Notification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light,
  },
  titleContainer: {
    paddingTop: height * 0.05,
    backgroundColor: colors.light,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: hp(25),
    paddingHorizontal: wp(15),

    shadowOpacity: 0.08,
    shadowOffset: {width: 0, height: 5},
    elevation: 5,
    zIndex: 5,
  },
  topRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  topLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  notificationText: {
    fontSize: hp(20),
    fontFamily: FONTS.TEXT_SEMI_BOLD,
    color: colors.dark,
    marginLeft: hp(5),
  },

  clearText: {
    fontSize: hp(16),
    fontFamily: FONTS.TEXT_REGULAR,
    marginRight: hp(5),
    color: colors.dark,
  },

  actionText: {
    fontFamily: FONTS.TEXT_SEMI_BOLD,
    fontSize: hp(16),
    color: colors.secondaryBg,
  },

  ListContainer: {
    flex: 1,
    height: '100%',
    marginTop: hp(15),
    // paddingHorizontal: wp(8),
    alignItems: 'center',
  },

  listItemContainer: {
    backgroundColor: colors.light,
    width: '100%',

    // marginVertical: hp(2),
    paddingVertical: hp(10),

    borderRadius: hp(5),
    position: 'relative',
  },

  listItemContent: {
    // alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: wp(10),
    paddingVertical: hp(10),
  },
});
