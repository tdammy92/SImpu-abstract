import React, {useState, useEffect} from 'react';
import AudioPlayer from 'react-native-sound';

type AudioStatusType =
  | 'loading'
  | 'success'
  | 'error'
  | 'play'
  | 'pause'
  | 'stop';

export default function useAudio(song: any) {
  const [status, setStatus] = useState<AudioStatusType>('loading');
  const [errorMessage, setErrorMessage] = useState('');
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [player, setPlayer] = useState<AudioPlayer>();

  function initialize() {
    setStatus('loading');

    if (player) {
      player.release();
    }

    const callback = (error: any, player: AudioPlayer) => {
      if (error) {
        setStatus('error');
        setErrorMessage(error.message);
      } else {
        setStatus('success');
        setErrorMessage('');
      }

      setDuration(player.getDuration());
      play();
    };

    //     If the audio is a 'require' then the second parameter must be the callback.

    let newPlayer: any = new AudioPlayer(song.url, '', error =>
      callback(error, newPlayer),
    );

    if (newPlayer) {
      setPlayer(newPlayer);
    }
  }

  function seekToTime(seconds: number) {
    if (player) {
      player.setCurrentTime(seconds);
      setCurrentTime(seconds);
    }
  }

  function play() {
    if (player) {
      player.play();
      setStatus('play');
    }
  }

  function pause() {
    if (player) {
      player.pause();
      setStatus('pause');
    }
  }

  function stop() {
    if (player) {
      player.stop();
      setStatus('stop');
    }
  }

  function formatTimeString(value: number) {
    return new Date(value * 1000).toISOString().substr(11, 8);
  }

  function getDurationString() {
    return formatTimeString(duration);
  }

  function getCurrentTimeString() {
    return formatTimeString(currentTime);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (player && status === 'play') {
        player.getCurrentTime((seconds: number) => {
          setCurrentTime(seconds);
        });
      }
    }, 100);

    return () => clearInterval(interval);
  }, [song.url]);

  useEffect(() => {
    initialize();
  }, []);

  return {
    play: play(),
    pause,
    stop,
    seekToTime,
    errorMessage,
    status,
    duration,
    currentTime,
    durationString: getDurationString(),
    currentTimeString: getCurrentTimeString(),
  };
}
