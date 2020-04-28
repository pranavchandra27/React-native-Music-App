import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import DrawerStack from './src/stacks/Drawer';
import {MusicProvider} from './src/context/MusicContext';
import {requestPermission} from './src/utils/permission';
import TrackPlayer from 'react-native-track-player';

const App = () => {
  useEffect(() => {
    requestPermission();
    setupPlayer();
  }, []);

  const setupPlayer = async () => {
    await TrackPlayer.setupPlayer({
      maxCacheSize: 1024 * 4,
    });
    TrackPlayer.updateOptions({
      stopWithApp: true,
      capabilities: [
        TrackPlayer.CAPABILITY_PLAY,
        TrackPlayer.CAPABILITY_PAUSE,
        TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
        TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
      ],
      compactCapabilities: [
        TrackPlayer.CAPABILITY_PLAY,
        TrackPlayer.CAPABILITY_PAUSE,
        TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
        TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
      ],
    });
  };

  return (
    <MusicProvider>
      <NavigationContainer>
        <DrawerStack />
      </NavigationContainer>
    </MusicProvider>
  );
};
export default App;
