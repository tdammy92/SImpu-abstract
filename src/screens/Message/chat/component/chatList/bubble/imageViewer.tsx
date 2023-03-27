import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
  Dimensions,
} from 'react-native';
import React from 'react';
import ImageViewer from 'react-native-image-zoom-viewer';
import FastImage from 'react-native-fast-image';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {useNavigation} from '@react-navigation/native';
import {format} from 'date-fns';
import {FONTS, colors} from 'src/constants';
import {hp} from 'src/utils';
import useImageDownload from 'src/Hooks/useImageDownload';
import {SafeAreaProvider} from 'react-native-safe-area-context';
SafeAreaProvider;

const fallbackUrl =
  'https://spectrumpaint.com/store/media/10071/pv/50_rhinosatin-1604334194.jpg';

const headerHeight = Dimensions.get('screen').height * 0.12;

const ImageScreen = ({route}: any) => {
  const {data, message} = route.params;
  const navigation = useNavigation();
  const topMargin =
    Platform.OS === 'android' ? hp(20) : getStatusBarHeight() * 2;

  const checkPermission = useImageDownload(data?.url);
  // console.log('ksaabd', JSON.stringify(message, null, 2));

  const handleDownload = async () => {
    await checkPermission();
  };

  const imageUrl = {
    // Simplest usage.

    url: data?.url,
    width: data?.width,
    height: data?.height,

    props: {},
  };

  const goBack = () => navigation.goBack();

  const header = () => {
    return (
      <SafeAreaProvider style={[styles.headerConatinerStyle]}>
        <View style={[styles.headerConentWrapper, {marginTop: topMargin}]}>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity onPress={goBack} style={{padding: hp(7)}}>
              <Ionicons name="arrow-back" color={colors.light} size={hp(26)} />
            </TouchableOpacity>
            <View style={{alignItems: 'flex-start'}}>
              <Text style={styles.nameText}>
                {message?.author?.name ?? message?.author?.platform_nick}
              </Text>
              <Text style={styles.dateText}>
                {format(new Date(message?.created_datetime), 'Pp')}
              </Text>
            </View>
          </View>

          <TouchableOpacity onPress={handleDownload}>
            <AntDesign name="download" color={colors.light} size={hp(24)} />
          </TouchableOpacity>
        </View>
      </SafeAreaProvider>
    );
  };

  return (
    <View style={{flex: 1, width: '100%'}}>
      <ImageViewer
        imageUrls={[imageUrl]}
        failImageSource={{url: fallbackUrl}}
        renderHeader={header}
        onDoubleClick={goBack}
        menuContext={{saveToLocal: 'save to the album', cancel: 'cancel'}}
        renderIndicator={() => (
          <View style={{backgroundColor: 'transparent'}} />
        )}
      />
    </View>
  );
};

export default ImageScreen;

const styles = StyleSheet.create({
  headerConatinerStyle: {
    flexDirection: 'row',

    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: headerHeight,
    paddingBottom: hp(10),
    position: 'absolute',
    zIndex: 10,
    elevation: 2,
    backgroundColor: 'rgba(0,0,0,0.8)',

    // borderColor: 'red',
    // borderWidth: 1,
  },

  headerConentWrapper: {
    flexDirection: 'row',
    paddingHorizontal: hp(20),
    height: '100%',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',

    // borderColor: 'yellow',
    // borderWidth: 1,
  },

  nameText: {
    color: colors.light,
    fontSize: hp(16),
    fontFamily: FONTS.TEXT_SEMI_BOLD,
  },
  dateText: {
    color: colors.light,
    fontSize: hp(14),
    fontFamily: FONTS.TEXT_REGULAR,
  },
});
