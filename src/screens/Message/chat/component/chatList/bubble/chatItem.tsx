import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {colors, FONTS} from 'src/constants';
import {getFileType, hp} from 'src/utils';
import VideoView from './videoPlayer';
import Hyperlink from 'react-native-hyperlink';
import AudioPlayer from './audioPlayer';
import ImageViewer from './image';
import {imageType, audioType, videoType, docType} from 'src/constants';
//@ts-ignore
import * as mime from 'react-native-mime-types';
import DocView from './docView';

const ChatItem = ({message, isUser}: any) => {
  const {entity} = message;
  // console.log('message', JSON.stringify(message?.type, null, 2));

  return (
    <View style={{}}>
      {/* message text */}
      {entity?.content?.body && (
        <Hyperlink
          linkDefault={true}
          linkStyle={{
            color: isUser ? colors.light : colors.secondaryBgDark,
          }}>
          <Text
            style={[
              styles.messageText,
              {color: isUser ? colors.light : colors.dark},
            ]}>
            {entity?.content?.body}
          </Text>
        </Hyperlink>
      )}

      {/* message media */}
      {entity?.attachments && (
        <View
          style={[
            ,
            {
              marginTop: entity?.content?.body ? hp(8) : 0,
              // width: '100%'
            },
          ]}>
          {entity?.attachments?.map((file: any, index: number) => {
            // const type = getFileType(file?.data?.url);
            const type = mime.extension(file?.mimetype);

            // console.log('filetype', type);
            // console.log('filetype', file?.mimetype);

            // console.log('typeee23', JSON.stringify(file, null, 2));

            if (imageType.includes(type)) {
              //render image
              return (
                <ImageViewer
                  key={`${index}`}
                  imageData={file}
                  message={message}
                  isUser={isUser}
                />
              );
            } else if (audioType.includes(type)) {
              //render audio

              // console.log('audioooo', JSON.stringify(file, null, 2));
              return (
                <AudioPlayer
                  audioData={file}
                  key={`${index}`}
                  isUser={isUser}
                />
              );
            } else if (videoType.includes(type)) {
              //render video
              return <VideoView videoData={file} key={`${index}`} />;
            } else if (docType.includes(type)) {
              //render file
              return (
                <DocView
                  key={`${index}`}
                  type={type}
                  isUser={isUser}
                  docData={file}
                />
              );
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
    fontSize: 17,
    textAlign: 'auto',

    // letterSpacing: 0,
  },
});
