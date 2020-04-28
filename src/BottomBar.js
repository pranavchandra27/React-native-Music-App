import React, {useContext} from 'react';
import {View, TouchableOpacity, Image, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import defaultArtwork from '../assets/img/default-artwork.png';
import {MusicContext} from './context/MusicContext';
import TrackPlayer, {usePlaybackState} from 'react-native-track-player';
import {togglePlayback} from './player/controls';

const BottomBar = ({navigation}) => {
  const playbackState = usePlaybackState();
  const {title, artist, artwork} = useContext(MusicContext);
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => navigation.navigate('Now Playing')}
      style={styles.mainContainer}>
      <View style={styles.container}>
        <View style={styles.coverContainer}>
          <Image
            source={!artwork ? defaultArtwork : {uri: artwork}}
            style={styles.cover}
          />
        </View>
        <View style={styles.titleContainer}>
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.title}>
            {title}
          </Text>
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.artist}>
            {artist}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => togglePlayback(playbackState)}
          style={styles.playBtn}>
          <Icon
            name={
              playbackState === TrackPlayer.STATE_PLAYING ? 'pause' : 'play'
            }
            size={22}
            color="#333"
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default BottomBar;

const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    height: 60,
    backgroundColor: '#FFF',
    elevation: 10,
    shadowColor: '#222',
    shadowOffset: {width: 10, height: 10},
    shadowOpacity: 0.6,
  },
  container: {
    flexDirection: 'row',
  },
  coverContainer: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cover: {
    backgroundColor: '#345',
    height: 40,
    width: 40,
  },
  titleContainer: {
    flex: 1,
    height: 60,
    justifyContent: 'center',
    marginLeft: 10,
  },
  title: {
    fontSize: 16,
    fontFamily: 'Lato-Regular',
  },
  artist: {
    marginTop: 4,
    fontSize: 12,
    fontFamily: 'Lato-Regular',
  },
  playBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    width: 60,
  },
});
