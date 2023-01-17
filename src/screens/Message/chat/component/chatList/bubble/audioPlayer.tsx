import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useCallback, useState, useEffect} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import Slider from 'azir-slider';
import {FONTS, colors} from 'src/constants';
import {formatTimeString, hp, wp} from 'src/utils';
import SoundPlayer from 'react-native-sound';
import {useNavigation} from '@react-navigation/native';
useNavigation;

const AudioPlayer = ({audioData, isUser}: any) => {
  const {data} = audioData;
  const navigation = useNavigation();
  // console.log('audio data', JSON.stringify(data?.url, null, 2));
  const song = {
    id: data?.asset_id,
    url: data?.url, // Load media from the network
    title: data?.asset_id,
    duration: data?.duration, // Duration in seconds
  };

  const [audio, setAudio] = useState<SoundPlayer>();
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  SoundPlayer.setCategory('PlayAndRecord');

  const Initialize = () => {
    let newSong = new SoundPlayer(song?.url, '', error => {
      if (error) {
        console.log('error from soundPlayer', error);
        return;
      }

      setDuration(newSong.getDuration());
    });
    setAudio(newSong);
  };

  function seekToTime(seconds: number) {
    if (audio) {
      audio.setCurrentTime(seconds);
      setCurrentTime(seconds);
    }
  }

  function playPause() {
    if (audio) {
      if (audio?.isPlaying()) {
        audio.pause();
      } else {
        audio.play();
      }
    }
  }

  //stop audio
  function stop() {
    if (audio) {
      audio.stop();
    }
  }

  useEffect(() => {
    const unsub = Initialize();
    return unsub;
  }, []);

  useEffect(() => {
    let audioInterval = setInterval(() => {
      audio?.getCurrentTime((seconds: number, play) => {
        setCurrentTime(seconds);
      });
    }, 100);

    return () => {
      clearInterval(audioInterval);
    };
  }, [song]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', () => {
      audio?.stop();
      audio?.release();

      console.log('this component is about to be removed');
    });
    return unsubscribe;
  }, [navigation]);

  // console.log('currentTime', currentTime, song?.duration);

  return (
    <View style={styles.audioContainer}>
      <TouchableOpacity
        onPress={playPause}
        disabled={!audio?.isLoaded()}
        style={[
          styles.playPauseWrapper,
          {borderColor: isUser ? colors.bootomHeaderBg : colors.secondaryBg},
        ]}>
        {audio?.isLoaded() ? (
          <Ionicons
            name={audio?.isPlaying() ? 'pause' : 'play'}
            color={isUser ? colors.bootomHeaderBg : colors.secondaryBg}
            size={hp(18)}
          />
        ) : (
          <Ionicons
            name={'stop'}
            color={isUser ? colors.bootomHeaderBg : colors.secondaryBg}
            size={hp(18)}
          />
        )}
      </TouchableOpacity>
      <View style={{position: 'relative', height: hp(35)}}>
        <Slider
          //@ts-ignore
          value={currentTime}
          minimumValue={0}
          maximumValue={Math.abs(song?.duration)}
          // maximumValue={duration > 0 ? song?.duration : 0}
          onComplete={(value: any) => {
            // console.log('value from slider', value);
            seekToTime(value);
          }}
          onChange={(value: any) => {
            // console.log('value from slider 2', value);
            seekToTime(value);
          }}
          thumbSize={20}
          progressTrackColor={
            isUser ? colors.bootomHeaderBg : colors.secondaryBg
          }
          trackStyle={{
            width: 150,
            height: hp(5),
            borderRadius: hp(3),
            backgroundColor: colors.darkGray,
          }}
          thumbStyle={{
            width: 15,
            height: 15,
            borderRadius: hp(10),
            backgroundColor: isUser
              ? colors.bootomHeaderBg
              : colors.secondaryBg,
          }}
        />

        <Text
          style={[
            styles.lenghtStart,
            {color: isUser ? colors.bootomHeaderBg : colors.dark},
          ]}>
          {formatTimeString(currentTime)}
        </Text>
        <Text
          style={[
            styles.lenghtEnd,
            {color: isUser ? colors.bootomHeaderBg : colors.dark},
          ]}>
          {formatTimeString(Math.abs(duration))}
        </Text>
      </View>
    </View>
  );
};

export default AudioPlayer;

const styles = StyleSheet.create({
  audioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
  },

  playPauseWrapper: {
    // padding: hp(4),
    marginRight: hp(5),
    height: hp(30),
    width: hp(30),
    borderRadius: hp(30 / 2),
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lenghtStart: {
    position: 'absolute',
    fontFamily: FONTS.TEXT_REGULAR,
    bottom: 1,
    left: 5,
    fontSize: hp(12),
  },

  lenghtEnd: {
    position: 'absolute',
    fontFamily: FONTS.TEXT_REGULAR,
    bottom: 1,
    right: 3,
    fontSize: hp(12),
  },
});
