import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {Divider} from '@ui-kitten/components';
import {useNavigation} from '@react-navigation/native';

//@ts-ignore
import UserAvatar from 'react-native-user-avatar';
import ChannelIcon from 'src/components/common/ChannelIcon';
import {hp, wp} from 'src/utils';
import {colors} from 'src/constants';
import {SCREEN_NAME} from 'src/navigation/constants';

//Search list item components
const SearchList = ({item}: any) => {
  const navigation = useNavigation();

  //navigate to individual chat
  const handleNavigation = () => {
    console.log('i was clicked');
    //@ts-ignore
    navigation.navigate(SCREEN_NAME.chat, {user: item});
  };

  return (
    <>
      <TouchableOpacity style={styles.container} onPress={handleNavigation}>
        <View>
          <UserAvatar name={item.name} size={35} src={item.avatar} />
          <View style={{position: 'absolute', bottom: -3, right: -4}}>
            <ChannelIcon name={item.channelType} />
          </View>
        </View>
        <View style={styles.info}>
          <Text style={styles.nameText}>{item.name}</Text>
          <Text style={styles.messageText}>{item.lastMesssage}</Text>
        </View>
      </TouchableOpacity>
      <Divider />
    </>
  );
};

export default SearchList;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 5,
    paddingVertical: 7,
    alignItems: 'center',
  },

  info: {
    justifyContent: 'center',
    marginLeft: 7,
  },
  nameText: {
    fontSize: hp(14),
    color: colors.dark,
  },
  messageText: {
    fontSize: hp(12),
    color: colors.dark,
  },
});
