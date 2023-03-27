import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {getFileType, hp, wp} from 'src/utils';
import {FontSize, colors} from 'src/constants';
import prettyBytes from 'pretty-bytes';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {audioType, videoType, docType, imageType} from 'src/constants';
import stc from 'string-to-color';
//@ts-ignore
import * as mime from 'react-native-mime-types';

const Attachment = ({item, idx, lgt}: any) => {
  //   console.log('allll ', JSON.stringify(item, null, 2));

  const {size, mimetype, created_datetime, data} = item;

  function iconName(type: string, size: number, color: string) {
    switch (type) {
      case 'pdf':
        return <AntDesign name="pdffile1" size={size} color={color} />;

      case 'doc':
        return <AntDesign name="wordfile1" size={size} color={color} />;

      case 'docx':
        return <AntDesign name="wordfile1" size={size} color={color} />;

      case 'ppt':
        return <AntDesign name="pptfile1" size={size} color={color} />;

      case 'xls':
        return <AntDesign name="exclefile1" size={size} color={color} />;
      case 'mp3':
        return <AntDesign name="sound" size={size} color={color} />;
      case 'oga':
        return <AntDesign name="sound" size={size} color={color} />;
      case 'mp4':
        return <FontAwesome5 name="video" size={size} color={color} />;

      default:
        return <AntDesign name="unknowfile1" size={size} color={color} />;

        break;
    }
  }

  return (
    <View
      style={[
        styles.attachmentBox,
        {marginRight: idx === lgt - 1 ? hp(20) : hp(2)},
      ]}>
      <View style={{alignItems: 'center', flexDirection: 'row'}}>
        {imageType.includes(mime.extension(mimetype)) && (
          <Image
            source={{uri: data?.url}}
            style={{
              height: hp(40),
              width: hp(35),
              borderRadius: hp(2),
              borderWidth: 1,
              borderColor: colors.lightGray,
            }}
          />
        )}

        {[...docType, ...audioType, ...videoType, 'heic', 'bin'].includes(
          mime.extension(mimetype),
        ) && (
          <View style={styles.iconContainer}>
            {iconName(mime.extension(mimetype), 16, colors.darkGray)}
          </View>
        )}

        <View style={{marginLeft: wp(2)}}>
          <Text style={[styles.downloadText, {textTransform: 'capitalize'}]}>
            {mime.extension(mimetype)}
          </Text>
          <Text style={styles.downloadText}>{prettyBytes(size)}</Text>
        </View>
      </View>
      <TouchableOpacity style={{alignItems: 'center'}}>
        {/* <View style={styles.downloadCircle}> */}
        <AntDesign name="download" size={hp(14)} color={colors.darkGray} />
        {/* </View> */}
      </TouchableOpacity>
    </View>
  );
};

export default Attachment;

const styles = StyleSheet.create({
  attachmentBox: {
    width: hp(150),
    maxHeight: hp(70),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.light,
    marginHorizontal: hp(2),
    borderRadius: hp(4),
    paddingHorizontal: hp(8),
  },
  card: {
    height: '100%',
    width: '100%',

    borderRadius: 10,
  },

  downloadContainer: {},
  downloadCircle: {
    height: hp(25),
    width: hp(25),
    borderRadius: hp(25 * 0.5),
    borderWidth: 1,
    borderColor: colors.darkGray,
    alignItems: 'center',
    justifyContent: 'center',
  },
  downloadText: {
    fontSize: FontSize.SmallText,
    color: colors.darkGray,
  },

  iconContainer: {
    backgroundColor: colors.lightGray,
    height: hp(35),
    width: hp(35),
    borderRadius: hp(35 * 0.5),
    alignItems: 'center',
    justifyContent: 'center',
  },
});
