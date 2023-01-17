import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Channel} from 'src/@types/inbox';
//@ts-ignore
import UserAvatar from 'react-native-user-avatar';
import ChannelIcon from 'src/components/common/ChannelIcon';
import {hp, wp} from 'src/utils';
import {colors} from 'src/constants';
import {trimText} from 'src/utils/string-utils/string';
import stc from 'string-to-color';
import {TouchableOpacity} from 'react-native-gesture-handler';

type customerType = {
  uuid: string;
  names: [];
  image_url: null;
  contact_id: null;
  channel_name: Channel;
  platform_name: string;
  platform_nick: string;
  channel_id: string;
  type: string;
};

const SearchCustomer = ({item}: any) => {
  //   console.log('individual customer', JSON.stringify(item, null, 2));

  const handleNavigation = () => {};

  return (
    <TouchableOpacity onPress={handleNavigation}>
      <View style={styles.container}>
        <View>
          <UserAvatar
            name={item?.platform_name ?? item?.platform_nick}
            size={hp(30)}
            style={{height: hp(30), width: hp(30)}}
            borderRadius={hp(30 * 0.5)}
            src={item?.image_url}
          />
        </View>
        <View style={styles.details}>
          <Text
            style={[
              styles.name,
              {color: stc(item?.platform_name ?? item?.platform_nick)},
            ]}>
            {trimText(item?.platform_name ?? item?.platform_nick, 10)}
          </Text>
          <Text style={styles.name2}>{trimText(item?.platform_nick, 11)}</Text>
        </View>

        <View
          style={{
            position: 'absolute',
            bottom: hp(-1),
            right: hp(-1),
            backgroundColor: colors.light,
            borderRadius: hp(10),
            padding: hp(2),
          }}>
          {item?.channel_name && <ChannelIcon name={item?.channel_name} />}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default SearchCustomer;

const styles = StyleSheet.create({
  container: {
    width: wp(150),
    height: hp(50),
    flexDirection: 'row',
    backgroundColor: colors.bootomHeaderBg,
    marginRight: hp(7),
    padding: hp(4),
    alignItems: 'center',
    borderRadius: hp(5),
  },
  details: {
    marginLeft: wp(4),
  },
  name: {
    fontSize: hp(14),
  },
  name2: {
    fontSize: hp(12),
    color: colors.dark,
  },
});
