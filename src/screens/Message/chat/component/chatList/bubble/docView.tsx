import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import prettyBytes from 'pretty-bytes';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {FONTS, colors, docType} from 'src/constants';
import {hp, splitLastOccurrence, wp} from 'src/utils';

const DocView = ({docData, type, isUser}: any) => {
  //   console.log(JSON.stringify(docData, null, 2));

  function iconName() {
    switch (type) {
      case 'pdf':
        return 'pdffile1';

      case 'doc':
        return 'wordfile1';

      case 'docx':
        return 'wordfile1';

      case 'ppt':
        return 'pptfile1';

      case 'xls':
        return 'exclefile1';

      default:
        return 'unknowfile1';
        break;
    }
  }

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: isUser() ? colors.secondaryBgDark : colors.lightGray,
          // borderLeftColor: isUser() ? colors.bootomHeaderBg : colors.dark,
        },
      ]}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <AntDesign
          name={iconName()}
          size={24}
          color={isUser() ? colors.light : colors.dark}
        />
        <View style={styles.infoWrapper}>
          <Text
            style={[
              {
                color: isUser() ? colors.light : colors.dark,
              },
            ]}>
            {splitLastOccurrence(docData?.data?.url, '/')}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text
              style={[
                styles.fileTypeText,
                {
                  color: isUser() ? colors.lightGray : colors.darkGray,
                },
              ]}>
              {type}/
            </Text>
            <Text
              style={[
                styles.sizeText,
                {
                  color: isUser() ? colors.lightGray : colors.darkGray,
                },
              ]}>
              {prettyBytes(docData?.size)}
            </Text>
          </View>
        </View>
      </View>
      <View style={{width: hp(30)}} />
      <TouchableOpacity
        style={{
          borderWidth: 1,
          borderColor: isUser() ? colors.bootomHeaderBg : colors.dark,
          padding: hp(4),
          borderRadius: hp(22 * 0.5),
        }}>
        <AntDesign
          name={'clouddownloado'}
          size={hp(20)}
          color={isUser() ? colors.bootomHeaderBg : colors.dark}
        />
      </TouchableOpacity>
    </View>
  );
};

export default DocView;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: hp(4),
    borderRadius: hp(10),
    // borderLeftWidth: 0.3,

    //     width: '100%',

    //     borderColor: 'yellow',
    //     borderWidth: 2,
  },

  infoWrapper: {
    marginLeft: hp(5),
    justifyContent: 'center',
  },

  fileTypeText: {
    fontSize: hp(14),
  },
  sizeText: {
    fontFamily: FONTS.TEXT_REGULAR,
    fontSize: 12,
  },
});
