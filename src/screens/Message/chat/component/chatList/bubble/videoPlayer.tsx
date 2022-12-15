import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useRef, useEffect} from 'react';
import Video from 'react-native-video';
import {wp} from 'src/utils';

const VideoPlayer = ({videoData}: any) => {
  console.log('video', JSON.stringify(videoData, null, 2));
  const {data} = videoData;
  const musicRef = useRef<any>();

  console.log('this is file', data);

  //   useEffect(() => {
  //     musicRef.current.presentFullscreenPlayer();

  //     //     return () => {};
  //   }, []);

  const handlePlay = () => {
    musicRef.current.save();
  };

  return (
    <View>
      <TouchableOpacity onPress={handlePlay}>
        <Text style={{backgroundColor: 'green'}}>Play/pause</Text>
      </TouchableOpacity>
      <Video
        paused={true}
        source={{uri: data?.url}} // Can be a URL or a local file.
        //   ref={(ref) => {
        //     this.player = ref
        //   }}                                      // Store reference
        //   onBuffer={this.onBuffer}                // Callback when remote video is buffering
        //   onError={this.videoError}
        ref={musicRef}
        resizeMode="cover" // Callback when video cannot be loaded
        playInBackground={false}
        playWhenInactive={false}
        style={styles.backgroundVideo}
        controls={true}
      />
    </View>
  );
};

export default VideoPlayer;

const styles = StyleSheet.create({
  backgroundVideo: {
    //     position: 'absolute',
    //     top: 0,
    //     left: 0,
    //     bottom: 0,
    //     right: 0,
    height: 250,
    width: wp(350),
    maxWidth: '85%',
  },
});
