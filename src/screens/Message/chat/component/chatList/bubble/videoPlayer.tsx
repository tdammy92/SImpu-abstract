import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useRef, useEffect} from 'react';
import Video from 'react-native-video';

// import {createThumbnail} from 'react-native-create-thumbnail';
import {wp} from 'src/utils';

const VideoPlayer = ({videoData}: any) => {
  // console.log('video', JSON.stringify(videoData, null, 2));
  const {data} = videoData;
  const videoRef = useRef<any>(null);

  // const getVideoThumbNail = () => {
  //   createThumbnail({
  //     url: data?.url,
  //     timeStamp: 10000,
  //   })
  //     .then(response => console.log({response}))
  //     .catch(err => console.log({err}));
  // };

  const handlePlay = () => {
    videoRef.current.save();
  };

  // useEffect(() => {
  //   getVideoThumbNail();
  //   return () => {
  //     //  videoRef.current.paused=
  //   };
  // }, []);

  return (
    <View>
      {/* <TouchableOpacity onPress={handlePlay}>
        <Text style={{backgroundColor: 'green'}}>Play/pause</Text>
      </TouchableOpacity> */}
      <Video
        paused={true}
        source={{uri: data?.url}} // Can be a URL or a local file.
        // Store reference
        //   onBuffer={this.onBuffer}                // Callback when remote video is buffering
        //   onError={this.videoError}
        audioOnly
        ref={videoRef}
        resizeMode="cover" // Callback when video cannot be loaded
        playInBackground={false}
        playWhenInactive={false}
        style={styles.backgroundVideo}
        controls={true}
        onLoad={() => {
          let res = videoRef.current.seek(0);

          console.log('resss', res); // this will set first frame of video as thumbnail
        }}
        // poster={`https://images.news18.com/ibnlive/uploads/2020/11/1605155357_featured-image-2020-11-12t095907.122.jpg?impolicy=website&width=510&height=356`}
        posterResizeMode="contain"
      />
    </View>
  );
};

export default VideoPlayer;

const styles = StyleSheet.create({
  backgroundVideo: {
    height: 250,
    width: wp(350),
    maxWidth: '85%',
  },
});
