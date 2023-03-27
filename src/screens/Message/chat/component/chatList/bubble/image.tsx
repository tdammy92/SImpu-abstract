import {
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  View,
  ActivityIndicator,
} from 'react-native';
import React, {memo, useEffect, useRef, useState} from 'react';
import {getFileType, hp, wp} from 'src/utils';
import FastImage from 'react-native-fast-image';
import AnimatedPlayer, {
  IAnimatedPlayerReference,
} from 'react-native-animated-webp';
import {useNavigation} from '@react-navigation/native';
import {SCREEN_NAME} from 'src/navigation/constants';
import {colors, unavailableImage} from 'src/constants';
import {color} from 'react-native-reanimated';

const ImageViewer = ({imageData, isUser, message}: any) => {
  const {data} = imageData;
  const navigation = useNavigation();
  const playerRef = useRef<IAnimatedPlayerReference>(null);
  const [Isloading, setIsloading] = useState(false);
  const [isError, setisError] = useState(false);

  // console.log('image url', JSON.stringify(data, null, 2));

  const type = getFileType(data?.url);

  useEffect(() => {
    if (playerRef.current) {
      playerRef.current?.play;
    }
  }, [imageData]);
  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', () => {
      // do something
      setisError(false);
    });

    return unsubscribe;
  }, [navigation]);

  //this for rendering whatsapp stickers
  if (type === 'webp') {
    return (
      <View>
        {imageData?.data?.url && (
          <AnimatedPlayer
            ref={playerRef}
            thumbnailSource={{uri: imageData?.data?.url}}
            animatedSource={{uri: imageData?.data?.url ?? unavailableImage}}
            autoplay
            loop={true}
            style={[styles.imageStyle, {width: wp(200)}]}
          />
        )}
      </View>
    );
  }

  // console.log('image broken or note', JSON.stringify(imageData?.data, null, 2));

  return (
    <TouchableOpacity
      onPress={() =>
        //@ts-ignore
        navigation.navigate(SCREEN_NAME.imageView as never, {
          data,
          message,
        })
      }
      disabled={isError}>
      <ActivityIndicator
        size={'large'}
        animating={Isloading}
        style={{position: 'absolute', top: '50%', right: '50%'}}
        color={isUser ? colors.light : colors.secondaryBg}
      />
      {/* <FastImage
        style={styles.imageStyle}
        source={{
          uri: !isError ? imageData?.data?.url : unavailableImage,
          // priority: FastImage.priority.normal,
        }}
        onLoadStart={() => setIsloading(true)}
        onLoadEnd={() => setIsloading(false)}
        onError={() => setisError(true)}
        // resizeMode={FastImage.resizeMode.contain}
      /> */}
      <Image
        style={styles.imageStyle}
        source={{uri: imageData?.data?.url}}
        defaultSource={{uri: unavailableImage}}
        progressiveRenderingEnabled={true}
        onLoadStart={() => setIsloading(true)}
        onLoadEnd={() => setIsloading(false)}
        resizeMode="cover"
      />
    </TouchableOpacity>
  );
};

export default memo(ImageViewer);

const styles = StyleSheet.create({
  imageStyle: {
    width: hp(180),
    height: hp(250),
    borderRadius: hp(5),
    // resizeMode: 'contain',
    // backgroundColor: 'red',
  },
});
