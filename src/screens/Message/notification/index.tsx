import {
  StyleSheet,
  View,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useCallback} from 'react';
import {Button, Card, Modal, Divider, Text} from '@ui-kitten/components';

//@ts-ignore
import UserAvatar from 'react-native-user-avatar';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors, FONTS} from 'src/constants';
import {hp, wp} from 'src/utils';
import dummyData from 'src/constants/dummyData';
import EmptyNotify from 'src/components/common/EmptyNotification';

const {width, height} = Dimensions.get('screen');
import {formatDate} from 'src/utils';

const Notification = (props: any) => {
  const {navigation} = props;
  const [Data, setData] = useState(() => dummyData);

  const ClearNotification = useCallback(() => {
    setData([]);
  }, []);

  const List = ({item}: any) => {
    //     console.log(item);

    return (
      <>
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: wp(10),
            paddingVertical: hp(10),
            alignItems: 'center',
            backgroundColor: '#fff',
            width: '95%',
            marginVertical: hp(5),
            borderRadius: hp(5),
            //   justifyContent: 'center',
          }}>
          <View>
            <UserAvatar size={35} name={item.name} src={item.avatar} />
          </View>
          <View style={{marginLeft: wp(10)}}>
            <Text style={{width: '90%'}}>
              {item.name} sent you a message on {item.channelType}
            </Text>
            <Divider />
            <Text style={{paddingVertical: hp(1), fontSize: hp(12)}}>
              {formatDate(item.time)}
            </Text>
          </View>
        </View>
        <Divider />
      </>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <View style={styles.topRight}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons
              name="arrow-back-sharp"
              size={25}
              color={'#026AE8'}
              // style={{transform: [{rotate: '35deg'}]}}
            />
          </TouchableOpacity>
          <Text style={styles.notificationText}>Notifications</Text>
        </View>
        <TouchableOpacity
          style={styles.actionContainer}
          onPress={ClearNotification}>
          <Text style={styles.actionText}>Clear all</Text>
          <MaterialIcons name="clear-all" size={25} color={'#026AE8'} />
        </TouchableOpacity>
      </View>
      <Divider style={{height: 1}} />
      <View style={styles.ListContainer}>
        <FlatList
          data={Data}
          renderItem={List}
          keyExtractor={(_, i) => i.toString()}
          ListEmptyComponent={EmptyNotify}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <Divider />}
        />
      </View>
    </View>
  );
};

export default Notification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleContainer: {
    paddingTop: height * 0.05,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: hp(14),
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
  actionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  notificationText: {
    fontSize: hp(20),
    fontFamily: FONTS.AVERTA_SEMI_BOLD,
    color: colors.primaryText,
    marginLeft: hp(10),
  },

  actionText: {
    fontFamily: FONTS.AVERTA_SEMI_BOLD,
    fontSize: hp(16),
    color: '#026AE8',
  },

  ListContainer: {
    flex: 1,
    height: '100%',
    marginTop: hp(15),
    paddingHorizontal: wp(8),
    //     alignItems: 'center',
  },
});
