import TrackPlayer, {usePlaybackState} from 'react-native-track-player';

export const togglePlayback = async state => {
  const currentTrack = await TrackPlayer.getCurrentTrack();
  if (currentTrack) {
    if (state === TrackPlayer.STATE_PAUSED) {
      await TrackPlayer.play();
    } else {
      await TrackPlayer.pause();
    }
  }
};

export const skipToNext = async () => {
  try {
    await TrackPlayer.skipToNext();
    await TrackPlayer.play();
  } catch (_) {}
};

export const skipToPrevious = async () => {
  try {
    await TrackPlayer.skipToPrevious();
    await TrackPlayer.play();
  } catch (_) {}
};
