import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {colors, FONTS} from 'src/constants';
import {getFileType, hp} from 'src/utils';
import VideoPlayer from './videoPlayer';
import Hyperlink from 'react-native-hyperlink';
import AudioPlayer from './audioPlayer';

const ChatItem = ({message, isUser}: any) => {
  const {entity} = message;
  //   console.log('message', JSON.stringify(message, null, 2));
  return (
    <View>
      {/* message text */}
      {entity?.content?.body && (
        <Hyperlink linkDefault={true} linkStyle={{color: colors.secondaryBg}}>
          <Text
            style={[
              styles.messageText,
              {color: isUser() ? colors.light : colors.dark},
            ]}>
            {entity?.content?.body}
          </Text>
        </Hyperlink>
      )}

      {/* message media */}
      {entity?.attachments && (
        <View style={[, {marginTop: entity?.content?.body ? hp(8) : 0}]}>
          {entity?.attachments?.map((file: any, index: number) => {
            const type = getFileType(file?.data?.url);

            if (['jpg', 'png', 'jpeg', 'webp'].includes(type)) {
              //render image
              return (
                <Image
                  key={`${index}`}
                  style={styles.imageStyle}
                  source={{uri: file?.data?.url}}
                />
              );
            } else if (['mp3'].includes(type)) {
              //render audio
              return (
                <AudioPlayer
                  audioData={file}
                  key={`${index}`}
                  isUser={isUser}
                />
              );
            } else if (['mp4'].includes(type)) {
              //render video
              return <VideoPlayer videoData={file} key={`${index}`} />;
            } else if (['pdf', 'doc', 'csv', 'docx'].includes(type)) {
              //render file
              return <Text key={`${index}`}>File {type}</Text>;
            }
          })}
          {/* message file */}
        </View>
      )}
    </View>
  );
};

export default ChatItem;

const styles = StyleSheet.create({
  messageText: {
    fontFamily: FONTS.TEXT_REGULAR,
    fontSize: hp(14),
  },

  imageStyle: {
    width: hp(180),
    height: hp(250),
    borderRadius: hp(5),
  },
});
