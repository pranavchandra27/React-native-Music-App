import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  Image,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Slider from '@react-native-community/slider';
import defaultArtwork from '../../assets/img/default-artwork.png';
import {MusicContext} from '../context/MusicContext';
import {floorVal, formatedTime} from '../utils/format';
import {togglePlayback, skipToNext, skipToPrevious} from '../player/controls';
import TrackPlayer, {usePlaybackState} from 'react-native-track-player';
import LinearGradient from 'react-native-linear-gradient';

const {width, height} = Dimensions.get('window');

const NowPlaying = ({navigation}) => {
  const playbackState = usePlaybackState();
  const {title, artist, artwork, progress, bgColor} = useContext(MusicContext);

  return (
    <View style={styles.trackContainer}>
      <StatusBar backgroundColor="transparent" />
      <View
        style={{
          zIndex: 1,
          position: 'absolute',
          top: 0,
          right: 0,
          height: 80,
          width: width,
          backgroundColor: 'rgba(0,0,0,0.1)',
        }}>
        <View style={{flexDirection: 'row', marginTop: 40}}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{marginLeft: 12}}>
            <Icon name="arrow-back" size={24} color="#ffffff" />
          </TouchableOpacity>
          <Text
            style={{
              color: '#fff',
              fontFamily: 'Lato-Regular',
              fontSize: 20,
              marginLeft: 35,
            }}>
            Now Playing
          </Text>
        </View>
      </View>
      <View style={styles.coverContainer}>
        <Image
          source={!artwork ? defaultArtwork : {uri: artwork}}
          style={styles.trackCover}
        />
      </View>
      <View
        style={{
          backgroundColor: !artwork ? '#888' : bgColor.secondary,
          height: height - width,
        }}>
        <View style={styles.trackInfo}>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={styles.trackTitle}>
            {title}
          </Text>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={styles.trackArtist}>
            {artist}
          </Text>
        </View>
        <View style={styles.progress}>
          <Text style={{...styles.trackPosition}}>
            {formatedTime(progress.position)}
          </Text>
          <View style={styles.slider}>
            <Slider
              value={floorVal(progress.position)}
              minimumValue={0}
              maximumValue={floorVal(progress.duration)}
              step={1}
              minimumTrackTintColor={bgColor.background}
              maximumTrackTintColor="#fff"
              thumbTintColor={bgColor.background}
              onValueChange={async val =>
                await TrackPlayer.seekTo(floorVal(val))
              }
            />
          </View>
          <Text style={{...styles.trackDuration}}>
            {formatedTime(progress.duration)}
          </Text>
        </View>
        <View style={styles.playbackControls}>
          <TouchableOpacity style={styles.repeat}>
            <Icon name="repeat" size={22} color="#FFF" />
          </TouchableOpacity>
          <View style={styles.playbackBtnsContainer}>
            <TouchableOpacity onPress={skipToPrevious} style={styles.skipPrev}>
              <Icon name="skip-previous" size={30} color="#FFF" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => togglePlayback(playbackState)}
              style={styles.playBtnContainer}>
              <Icon
                name={
                  playbackState === TrackPlayer.STATE_PLAYING
                    ? 'pause'
                    : 'play-arrow'
                }
                size={24}
                color="black"
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={skipToNext} style={styles.skipNext}>
              <Icon name="skip-next" size={30} color="#FFF" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.shuffle}>
            <Icon name="shuffle" size={22} color="#FFF" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default NowPlaying;

const styles = StyleSheet.create({
  trackContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  coverContainer: {
    width: width,
    height: width,
  },
  trackCover: {
    width: '100%',
    height: '100%',
  },
  trackInfo: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 30,
    marginTop: 30,
  },
  trackTitle: {
    fontSize: 18,
    fontFamily: 'Lato-Regular',
    color: '#fff',
  },
  trackArtist: {
    marginTop: 5,
    fontSize: 12,
    fontFamily: 'Lato-Regular',
    color: '#fdfdfd',
  },
  progress: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginHorizontal: 30,
    marginTop: 35,
  },
  slider: {
    width: 250,
  },
  trackPosition: {
    color: '#fff',
    fontSize: 12,
    fontFamily: 'Lato-Regular',
  },
  trackDuration: {
    color: '#fff',
    fontSize: 12,
    fontFamily: 'Lato-Regular',
  },
  playbackControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  playbackBtnsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 40,
  },
  playBtnContainer: {
    borderRadius: 50,
    elevation: 5,
    shadowColor: '#222',
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 50,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  skipPrev: {
    marginRight: 20,
  },
  skipNext: {
    marginLeft: 20,
  },
});
