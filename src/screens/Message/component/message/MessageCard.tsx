import {
  StyleSheet,
  View,
  TouchableOpacity,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Animated,
} from 'react-native';
import {Divider, Text} from '@ui-kitten/components';
//@ts-ignore
import UserAvatar from 'react-native-user-avatar';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {hp, wp} from 'src/utils';
import {FONTS} from 'src/constants';
import {colors} from 'src/constants';
import {messgeTimeFormater} from 'src/utils';
import {SCREEN_NAME} from 'src/navigation/constants';
import ChannelIcon from 'src/components/common/ChannelIcon';

const MessageCard = (props: any) => {
  const navigation = useNavigation();

  const {
    data: {item},
    rowHeightAnimatedValue,
    removeRow,
    leftActionState,
    rightActionState,
  } = props;

  // console.log(item);

  if (rightActionState) {
    Animated.timing(rowHeightAnimatedValue, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false,
    }).start(() => {
      removeRow();
    });
  }

  const handleNavigate = (user: any) => {
    // console.log('cliked');

    //@ts-ignore
    navigation.navigate(SCREEN_NAME.chat as never, {user: item});
  };

  return (
    <Animated.View style={[styles.rowFront, {}]}>
      <TouchableOpacity style={[styles.cardContainer]} onPress={handleNavigate}>
        {/* left side of the card */}
        <View style={styles.leftSide}>
          <View style={{position: 'relative'}}>
            <UserAvatar
              name={item?.name}
              src={item?.avatar}
              size={45}
              // borderRadius={hp(40) / 2}
            />
            <View style={{position: 'absolute', bottom: -4, right: -4}}>
              <ChannelIcon name={item.channelType} />
            </View>
          </View>
        </View>

        {/* right side of the card */}
        <View style={styles.rightSide}>
          <View style={{marginLeft: hp(5), width: '100%'}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
              }}>
              <Text style={styles.nameText}>{item?.name}</Text>
              <Text style={styles.timeText}>
                {messgeTimeFormater(item?.time)}
              </Text>
            </View>
            {item.title && (
              <Text style={styles.messageTitleText}>{item?.title}</Text>
            )}
            <Text style={styles.lastmessageText}>{item?.lastMesssage}</Text>
          </View>
        </View>
      </TouchableOpacity>
      <Divider />
    </Animated.View>
  );
};

export default MessageCard;

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'row',
    height: '80%',
    width: '95%',
    alignItems: 'center',
    paddingHorizontal: wp(10),
    paddingVertical: hp(10),
    marginVertical: hp(8),
    borderRadius: hp(10),
  },

  rowFront: {
    backgroundColor: '#fff',
    // backgroundColor: 'yellow',
    // borderRadius: 5,
    height: 90,
    paddingVertical: hp(5),
    // margin: 5,
    // marginBottom: 15,
    // shadowColor: '#999',
    // shadowOffset: {width: 0, height: 1},
    // shadowOpacity: 0.8,
    // shadowRadius: 2,
    // elevation: 5,
  },

  leftSide: {},
  rightSide: {
    marginLeft: 10,
    position: 'relative',
    width: '90%',

    // borderColor: 'red',
    // borderWidth: 1,
  },

  cardBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: hp(10),
  },

  nameText: {
    fontFamily: FONTS.AVERTA_SEMI_BOLD,
    fontSize: hp(16),
    color: colors.primaryText,
  },
  isRead: {
    height: hp(12),
    width: wp(12),
    backgroundColor: '#276EF1',
    borderRadius: 30,
  },
  timeText: {
    fontSize: hp(12),
    fontFamily: FONTS.AVERTA_REGULAR,
    color: colors.primaryText,
    // position: 'absolute',
    // top: hp(-10),
    // right: wp(30),
    // textAlign: 'center',
  },

  messageTitleText: {
    color: colors.primaryText,
    fontSize: hp(16),
    fontFamily: FONTS.AVERTA_SEMI_BOLD,
  },
  lastmessageText: {
    color: colors.primaryText,
    fontSize: hp(14),
    paddingTop: hp(5),
    fontFamily: FONTS.AVERTA_REGULAR,
  },
});
