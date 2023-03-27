import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  View,
  ActivityIndicator,
} from 'react-native';
import React, {useMemo} from 'react';
import {getFileType, hp, wp} from 'src/utils';
//@ts-ignore
import * as mime from 'react-native-mime-types';
import prettyBytes from 'pretty-bytes';
import {FONTS, FontSize, colors} from 'src/constants';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {audioType, videoType, docType, imageType} from 'src/constants';
import AttachmentIcon from 'src/components/common/AttachmentIcon';

const Attachament = ({attachmentDetials, uploading, removeAttachment}: any) => {
  // console.log('details', JSON.stringify(attachmentDetials, null, 2));

  const type = useMemo(() => {
    return mime.extension(attachmentDetials?.type);
  }, [attachmentDetials]);

  // console.log('tipe form mimitype', type);

  return (
    <View style={styles.container}>
      <View>
        {imageType.includes(type) && (
          <>
            <ActivityIndicator
              animating={uploading}
              color={colors.darkGray}
              style={{position: 'absolute'}}
            />
            <Image
              source={{uri: attachmentDetials?.uri}}
              style={{height: hp(50), width: wp(35), borderRadius: hp(5)}}
            />
          </>
        )}
        {[...docType, ...videoType, ...audioType].includes(type) && (
          <>
            <View
              style={{
                height: hp(40),
                width: hp(40),
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: colors.bootomHeaderBg,
                borderRadius: hp(40 * 0.5),
              }}>
              <ActivityIndicator
                animating={uploading}
                color={colors.darkGray}
                style={{position: 'absolute'}}
              />
              {/* <AntDesign name="file1" color={colors.secondaryBg} size={25} />
               */}

              <AttachmentIcon
                fileExetension={type}
                color={colors.secondaryBgDark}
                size={hp(22)}
              />
            </View>
          </>
        )}
      </View>
      <View style={{marginLeft: wp(5)}}>
        <Text style={styles.nameText}>{attachmentDetials?.name}</Text>
        <Text style={styles.sizeText}>
          {prettyBytes(attachmentDetials?.size)}
        </Text>
      </View>

      <TouchableOpacity
        onPress={removeAttachment}
        style={{
          position: 'absolute',
          top: hp(10),
          right: wp(10),
          backgroundColor: colors.bootomHeaderBg,
          height: hp(34),
          width: hp(34),
          padding: hp(5),
          borderRadius: hp(34 * 0.5),
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <AntDesign name={'close'} color={colors.darkGray} size={hp(18)} />
      </TouchableOpacity>
    </View>
  );
};

export default Attachament;

const styles = StyleSheet.create({
  container: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.08,
    shadowRadius: 1.02,

    elevation: 1.5,
    backgroundColor: colors.light,
    height: hp(80),
    padding: hp(5),
    paddingHorizontal: wp(10),
    borderRadius: hp(15),
    flexDirection: 'row',
    alignItems: 'center',
  },
  nameText: {
    fontFamily: FONTS.TEXT_REGULAR,
    color: colors.dark,
    fontSize: FontSize.MediumText,
    // paddingVertical: hp(5),
  },
  sizeText: {
    fontFamily: FONTS.TEXT_REGULAR,
    color: colors.dark,
    fontSize: FontSize.SmallText,
  },
});
