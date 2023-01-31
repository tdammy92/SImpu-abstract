import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
  useWindowDimensions,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {Divider} from '@ui-kitten/components';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {colors, FONTS} from 'src/constants';
import {hp, wp} from 'src/utils';
import {format} from 'date-fns';
//@ts-ignore
// import HTMLView from 'react-native-htmlview';
//@ts-ignore
import UserAvatar from 'react-native-user-avatar';
import {trimText} from 'src/utils/string-utils/string';
import Htmlview from './HtmlView';

const Message = ({data}: any) => {
  // console.log('Html message', JSON.stringify(data, null, 2));
  return (
    <View style={styles.container}>
      <View>
        <View style={styles.messageHeader}>
          {/* author avatar */}
          <View style={{flexDirection: 'row'}}>
            <UserAvatar
              size={hp(30)}
              style={{height: hp(30), width: hp(30)}}
              borderRadius={hp(30 * 0.5)}
              name={data?.author?.platform_name ?? data?.author?.platform_nick}
              src={data?.author?.image_url}
            />
            {/* author message header */}

            <View style={{marginLeft: wp(10)}}>
              <Text style={styles.messageHeaderTextBig}>
                {data?.author?.platform_name ?? data?.author?.platform_nick}
              </Text>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.messageHeaderTextBig}>To:</Text>
                <Text style={styles.messageHeaderTextSmall}>
                  {trimText(data?.entity?.recipients?.to[0]?.platform_nick, 35)}
                </Text>
              </View>
              <Text style={styles.messageHeaderTextSmall}>
                {format(new Date(data?.created_datetime), 'd LLL, pp')}
              </Text>
            </View>
          </View>
          {/* author options */}

          <TouchableOpacity>
            <SimpleLineIcons
              name="options-vertical"
              size={18}
              color={colors.darkGray}
            />
          </TouchableOpacity>
        </View>
        <Divider />
        {/* <View style={styles.htmlContainer}> */}
        <Htmlview htmldata={data?.entity?.content?.body} />
        {/* </View> */}

        <Divider />
        <View style={styles.messageFooter}>
          <TouchableOpacity style={styles.actionBtn}>
            <MaterialCommunityIcons
              name="reply-outline"
              size={20}
              color={colors.light}
            />
            <Text style={styles.actionBtnText}>Reply</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionBtn}>
            <Text style={styles.actionBtnText}>Forward </Text>
            <MaterialCommunityIcons
              name="share-outline"
              size={20}
              color={colors.light}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Message;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.bootomHeaderBg,
    marginVertical: hp(15),
    marginHorizontal: wp(10),
    paddingHorizontal: wp(8),
    paddingVertical: hp(8),
    borderRadius: hp(10),
  },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: hp(5),
  },
  messageHeaderTextSmall: {
    fontFamily: FONTS.TEXT_REGULAR,
    fontSize: hp(14),
    color: colors.dark,
    lineHeight: hp(18),
  },
  messageHeaderTextBig: {
    fontFamily: FONTS.TEXT_SEMI_BOLD,
    fontSize: hp(14),
    color: colors.dark,
    lineHeight: hp(18),
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
    width: 100,
    borderRadius: hp(5),
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionBtnText: {fontFamily: FONTS.TEXT_SEMI_BOLD, color: colors.light},
});
