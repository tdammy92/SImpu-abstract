import {
  StyleSheet,
  View,
  Dimensions,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useState, useCallback} from 'react';
import {Button, Card, Modal, Divider, Text} from '@ui-kitten/components';
import {useDispatch, useSelector} from 'react-redux';

//@ts-ignore
import UserAvatar from 'react-native-user-avatar';

import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors, FONTS} from 'src/constants';
import {hp, wp} from 'src/utils';
import {SCREEN_NAME} from 'src/navigation/constants';
import dummyData from 'src/constants/dummyData';
import EmptyNotify from 'src/components/common/EmptyNotification';
import NotificationListIcon from 'src/assets/images/NotificationListIcon.svg';
import {FormatText} from 'src/utils/string-utils/string';
import {notificationDateFormat} from 'src/utils/date-utils/date';
import {StoreState} from 'src/@types/store';
import {useNotificationTrayQuery} from 'src/services/query/queries';
import {Avatar} from 'src/constants/general';

const {width, height} = Dimensions.get('screen');

const Notification = (props: any) => {
  const {navigation} = props;

  const {token} = useSelector((state: StoreState) => state.user);
  const organisaion = useSelector(
    (state: StoreState) => state.organisation.details,
  );
  const [Data, setData] = useState(() => dummyData);

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
    {},
  );

  //formate the notification return
  //This snippet flattens the array
  const notifications = notification?.pages
    ?.map((res: any) => res.data?.map((r: any) => r))
    .flat(2);

  //clear all notification
  const ClearNotification = useCallback(() => {
    setData([]);
  }, []);

  const handleNavigate = (user: any) => {
    //@ts-ignore
    // navigation.navigate(SCREEN_NAME.chat as never, {user: user});
  };

  const List = ({item}: any) => {
    console.log('Notifications', JSON.stringify(item, null, 2));
    return (
      <>
        <TouchableOpacity
          style={[styles.listItemContainer]}
          onPress={() => handleNavigate(item)}>
          {/* <View
            style={{
              position: 'absolute',
              top: hp(10),
              left: hp(5),
            }}>
            <NotificationListIcon />
          </View> */}
          <View style={[styles.listItemContent, {}]}>
            <View style={{flexDirection: 'row', paddingBottom: 10}}>
              <View style={{marginRight: 10}}>
                {/* <UserAvatar
                  src={Avatar}
                  size={hp(40)}
                  style={{height: hp(40), width: hp(40)}}
                  borderRadius={hp(40 * 0.5)}
                /> */}
                <Image
                  source={{uri: Avatar}}
                  style={{
                    height: hp(40),
                    width: hp(40),
                    borderRadius: hp(40 * 0.5),
                  }}
                />
              </View>
              <Text
                style={{
                  width: '90%',
                  lineHeight: hp(19),
                  fontFamily: FONTS.TEXT_SEMI_BOLD,
                }}>
                {item?.message}
              </Text>
            </View>

            <View style={{flexDirection: 'row', paddingTop: 5}}>
              <View style={{width: 35, marginRight: 10}} />
              <Text
                style={{
                  color: '#A5ACB8',
                  fontFamily: FONTS.TEXT_SEMI_BOLD,
                  fontSize: hp(12),
                }}>
                {notificationDateFormat(item?.created_datetime)}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        <Divider />
      </>
    );
  };

  // console.log('from notification api', notifications);

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <View style={styles.topLeft}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{flexDirection: 'row'}}>
            <Ionicons name="arrow-back-sharp" size={25} color={'#026AE8'} />
            <Text style={styles.notificationText}>Notifications</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.topRight}>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
            onPress={ClearNotification}>
            <Text style={styles.clearText}>Clear All</Text>
            <Feather name="check-circle" size={18} color={'#000'} />
          </TouchableOpacity>
        </View>
      </View>
      <Divider style={{height: 1}} />

      <FlatList
        data={notifications}
        renderItem={List}
        keyExtractor={(_, i) => i.toString()}
        ListEmptyComponent={EmptyNotify}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <Divider />}
        contentContainerStyle={{paddingHorizontal: hp(10)}}
      />
    </View>
  );
};

export default Notification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  titleContainer: {
    paddingTop: height * 0.05,
    backgroundColor: '#fff',
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
    fontSize: hp(14),
    fontFamily: FONTS.TEXT_REGULAR,
    marginRight: hp(5),
    color: colors.dark,
  },

  actionText: {
    fontFamily: FONTS.TEXT_SEMI_BOLD,
    fontSize: hp(16),
    color: '#026AE8',
  },

  ListContainer: {
    flex: 1,
    height: '100%',
    marginTop: hp(15),
    paddingHorizontal: wp(8),
    alignItems: 'center',
  },

  listItemContainer: {
    backgroundColor: '#fff',
    width: '100%',

    marginVertical: hp(2),
    paddingVertical: hp(10),

    borderRadius: hp(5),
    position: 'relative',
  },

  listItemContent: {
    // alignItems: 'center',
    // flexDirection: 'row',
    paddingHorizontal: wp(10),
    paddingVertical: hp(10),
  },
});
