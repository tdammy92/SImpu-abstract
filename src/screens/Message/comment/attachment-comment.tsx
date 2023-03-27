import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useMemo} from 'react';
import {uploadFileType} from 'src/@types/inbox';
//@ts-ignore
import * as mime from 'react-native-mime-types';
import {
  FONTS,
  FontSize,
  audioType,
  colors,
  docType,
  imageType,
  videoType,
} from 'src/constants';
import {hp, wp} from 'src/utils';
import AttachmentIcon from 'src/components/common/AttachmentIcon';
import prettyBytes from 'pretty-bytes';
import AntDesign from 'react-native-vector-icons/AntDesign';

type Props = {
  attachmentDetials: uploadFileType;
  uploading: boolean;
  removeAttachment: () => void;
};

const AttachmentComment = (props: Props) => {
  const {attachmentDetials, uploading, removeAttachment} = props;

  const type = useMemo(() => {
    return mime.extension(props?.attachmentDetials?.type);
  }, [attachmentDetials]);

  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row'}}>
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
                  size={hp(20)}
                />
              </View>
            </>
          )}
        </View>
        <View style={{marginLeft: wp(5)}}>
          <Text style={styles.nameText}>{attachmentDetials?.name}</Text>
          <Text style={styles.sizeText}>
            {prettyBytes(attachmentDetials?.size ?? 0)}
          </Text>
        </View>
      </View>

      <TouchableOpacity onPress={removeAttachment} style={styles.closeReply}>
        <AntDesign
          name="closecircleo"
          color={colors.secondaryBg}
          size={hp(22)}
        />
      </TouchableOpacity>
    </View>
  );
};

export default AttachmentComment;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    height: hp(50),
    justifyContent: 'space-between',
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

  closeReply: {
    padding: hp(5),
    marginRight: wp(10),
  },
});
