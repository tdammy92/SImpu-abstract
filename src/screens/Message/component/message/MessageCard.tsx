import {
  StyleSheet,
  View,
  TouchableOpacity,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Animated,
} from 'react-native';
import {Avatar, Text} from '@ui-kitten/components';
//@ts-ignore
import UserAvatar from 'react-native-user-avatar';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {hp, wp} from 'src/utils';
import {FONTS} from 'src/constants';
import {colors} from 'src/constants';
import {messgeTimeFormater} from 'src/utils';
import {SCREEN_NAME} from 'src/navigation/constants';

const MessageCard = (props: any) => {
  const navigation = useNavigation();

  const {
    data: {item},
    rowHeightAnimatedValue,
    removeRow,
    leftActionState,
    rightActionState,
  } = props;

  if (rightActionState) {
    Animated.timing(rowHeightAnimatedValue, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false,
    }).start(() => {
      removeRow();
    });
  }

  const handleNavigate = () => {
    // console.log('cliked');

    navigation.navigate(SCREEN_NAME.chat as never);
  };

  return (
    <Animated.View
      style={[
        styles.rowFront,
        {
          // height: rowHeightAnimatedValue
        },
      ]}>
      <TouchableOpacity style={[styles.cardContainer]} onPress={handleNavigate}>
        {/* left side of the card */}
        <View style={styles.leftSide}>
          <UserAvatar name={item?.name} src={item?.avatar} size={40} />
        </View>

        {/* right side of the card */}
        <View style={styles.rightSide}>
          <Text style={styles.timeText}>{messgeTimeFormater(item?.time)}</Text>

          <View style={{marginLeft: hp(5)}}>
            <Text style={styles.nameText}>{item?.name}</Text>
            {item.title && (
              <Text style={styles.messageTitleText}>{item?.title}</Text>
            )}
            <Text style={styles.lastmessageText}>{item?.lastMesssage}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default MessageCard;

const styles = StyleSheet.create({
  cardContainer: {
    // flex: 1,
    flexDirection: 'row',
    height: '80%',
    width: '95%',
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingHorizontal: wp(10),
    marginVertical: hp(8),
    borderRadius: hp(10),
  },

  rowFront: {
    backgroundColor: '#FFF',
    borderRadius: 5,
    height: 90,
    margin: 5,
    marginBottom: 15,
    shadowColor: '#999',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },

  leftSide: {},
  rightSide: {
    marginLeft: 10,
    position: 'relative',
    width: '100%',
    // borderColor: 'red',
    // borderWidth: 1,
  },

  cardBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: hp(10),
  },

  nameText: {
    fontFamily: FONTS.AVERTA_REGULAR,
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
    position: 'absolute',
    top: hp(-20),
    right: wp(25),
    textAlign: 'center',
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
