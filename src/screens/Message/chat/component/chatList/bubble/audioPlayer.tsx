import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useCallback, useEffect} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import TrackPlayer, {
  Capability,
  Event,
  State,
  usePlaybackState,
  useProgress,
} from 'react-native-track-player';
import Slider from 'azir-slider';
import {FONTS, colors} from 'src/constants';
import {formatSecToMin, hp, wp} from 'src/utils';

const AudioPlayer = ({audioData, isUser}: any) => {
  const {data} = audioData;
  // console.log('audio data', JSON.stringify(data, null, 2));
  const playbackState = usePlaybackState();
  const progress = useProgress();

  const song = {
    id: data?.asset_id,
    url: data?.url, // Load media from the network
    title: data?.asset_id,
    duration: data?.duration, // Duration in seconds
  };

  const setUpPlayer = async () => {
    try {
      await TrackPlayer.setupPlayer();
      await TrackPlayer.add([song]);
    } catch (error) {
      console.log(error);
    }
  };

  const togglePlay = async () => {
    const state = await TrackPlayer.getState();

    console.log('Player State', state);

    if (state === State.Ready) {
      await TrackPlayer.play();
    } else if (state === State.Paused || state === State.Stopped) {
      await TrackPlayer.play();
    } else {
      await TrackPlayer.pause();
    }
  };

  const stopAllsongs = async () => {
    await TrackPlayer.pause();
  };

  useEffect(() => {
    setUpPlayer();

    return () => {
      stopAllsongs();
    };
  }, []);

  // console.log('progreee', progress);
  return (
    <View style={styles.audioContainer}>
      <TouchableOpacity
        onPress={togglePlay}
        style={[
          styles.playPauseWrapper,
          {borderColor: isUser() ? colors.bootomHeaderBg : colors.secondaryBg},
        ]}>
        <Ionicons
          name={playbackState === State.Playing ? 'pause' : 'play'}
          color={isUser() ? colors.bootomHeaderBg : colors.secondaryBg}
          size={hp(20)}
        />
      </TouchableOpacity>
      <View style={{position: 'relative', height: hp(35)}}>
        <Slider
          //@ts-ignore
          value={progress.position}
          minimumValue={0}
          maximumValue={progress.duration}
          onComplete={async (value: any) => {
            await TrackPlayer.seekTo(value);
          }}
          onChange={async (value: any) => {
            await TrackPlayer.seekTo(value);
          }}
          thumbSize={20}
          progressTrackColor={
            isUser() ? colors.bootomHeaderBg : colors.secondaryBg
          }
          trackStyle={{
            width: 150,
            height: hp(6),
            borderRadius: hp(3),
            backgroundColor: colors.darkGray,
          }}
          thumbStyle={{
            width: 15,
            height: 15,
            borderRadius: hp(10),
            backgroundColor: isUser()
              ? colors.bootomHeaderBg
              : colors.secondaryBg,
          }}
        />

        <Text
          style={[
            styles.lenghtStart,
            {color: isUser() ? colors.bootomHeaderBg : colors.dark},
          ]}>
          {formatSecToMin(progress.position)}
        </Text>
        <Text
          style={[
            styles.lenghtEnd,
            {color: isUser() ? colors.bootomHeaderBg : colors.dark},
          ]}>
          {formatSecToMin(progress.duration)}
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
    padding: hp(4),
    marginRight: hp(5),
    borderRadius: hp(10),
    borderWidth: 2,
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
