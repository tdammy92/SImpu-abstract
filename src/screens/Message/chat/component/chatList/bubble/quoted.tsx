import {StyleSheet, Text, Image, View} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import prettyBytes from 'pretty-bytes';
import {StoreState} from 'src/@types/store';
import {hp, splitLastOccurrence, wp} from 'src/utils';
import {colors} from 'src/constants';
import {imageType, audioType, videoType, docType} from 'src/constants';
//@ts-ignore
import * as mime from 'react-native-mime-types';

const Quoted = ({item, isUser}: any) => {
  const {profile, user, token} = useSelector(
    (state: StoreState) => state?.user,
  );

  console.log('each quoted item', JSON.stringify(item, null, 2));

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: isUser() ? colors.secondaryBgDark : colors.lightGray},
        {
          borderLeftColor: isUser() ? colors.bootomHeaderBg : colors.darkGray,
        },
      ]}>
      <Text
        style={[
          styles.senderName,
          {
            color: isUser()
              ? colors.light
              : item?.author?.uuid === profile?.id
              ? colors.dark
              : colors.darkGray,
          },
        ]}>
        {item?.author?.uuid === profile?.id ? 'You' : item?.author?.name}:
      </Text>
      <View>
        {item?.entity?.content?.body && (
          <Text
            style={[
              styles.body,
              {
                color: isUser()
                  ? colors.light
                  : item?.author?.uuid === profile?.id
                  ? colors.dark
                  : colors.darkGray,
              },
            ]}>
            {item?.entity?.content?.body}
          </Text>
        )}

        {item?.entity?.attachments && (
          <View style={{}}>
            <View style={{minWidth: wp(140)}} />
            {imageType?.includes(
              mime.extension(item?.entity?.attachments[0]?.mimetype),
            ) && (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Image
                  style={{height: 40, width: 35}}
                  source={{uri: item?.entity?.attachments[0]?.data?.url}}
                />
                <View
                  style={{
                    flexDirection: 'row',
                    marginLeft: wp(20),
                    alignItems: 'center',
                  }}>
                  <Ionicons
                    name="image-outline"
                    size={hp(18)}
                    color={isUser() ? colors.lightGray : colors.darkGray}
                  />
                  <Text
                    style={{
                      color: isUser() ? colors.lightGray : colors?.darkGray,
                    }}>
                    Image
                  </Text>
                </View>
              </View>
            )}

            {!imageType?.includes(
              mime.extension(item?.entity?.attachments[0]?.mimetype),
            ) && (
              <View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <AntDesign
                    name="file1"
                    size={hp(18)}
                    color={isUser() ? colors.lightGray : colors.darkGray}
                  />
                  <Text
                    style={[
                      ,
                      {color: isUser() ? colors.lightGray : colors.darkGray},
                    ]}>
                    {splitLastOccurrence(
                      item?.entity?.attachments[0]?.data?.url,
                      '/',
                    )}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    style={[
                      styles.fileInfoText,
                      {color: isUser() ? colors.lightGray : colors.darkGray},
                    ]}>
                    {mime
                      .extension(item?.entity?.attachments[0]?.mimetype)
                      ?.toUpperCase()}
                  </Text>
                  <Text
                    style={[
                      styles.fileInfoText,
                      {color: isUser() ? colors.lightGray : colors.darkGray},
                    ]}>
                    {prettyBytes(item?.entity?.attachments[0]?.size)}
                  </Text>
                </View>
              </View>
            )}
          </View>
        )}
      </View>
    </View>
  );
};

export default Quoted;

const styles = StyleSheet.create({
  container: {
    marginBottom: hp(5),
    padding: hp(5),
    borderRadius: hp(5),
    borderLeftWidth: 1.6,
  },
  senderName: {
    fontSize: hp(12),
  },
  body: {
    fontSize: hp(12),
  },

  fileInfoText: {
    fontSize: hp(12),
  },
});
