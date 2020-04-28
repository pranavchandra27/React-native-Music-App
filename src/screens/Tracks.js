import React, {useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import defaultArtwork from '../../assets/img/default-artwork.png';
import {MusicContext} from '../context/MusicContext';
import BottomBar from '../BottomBar';
import TrackPlayer from 'react-native-track-player';

const Tracks = ({navigation}) => {
  const {tracks} = useContext(MusicContext);

  const onTrackPress = id => {
    changeTrack(id);
  };

  const changeTrack = id => {
    TrackPlayer.skip(id);
    TrackPlayer.play();
  };

  // const tracks = [
  //   {title: 'Am I Pretty?', artist: 'American Candy', id: '1'},
  //   {title: 'Animals', artist: 'Maroon 5', id: '2'},
  //   {title: 'Cold', artist: 'Maroon 5', id: '3'},
  //   {title: 'Cold Water', artist: 'Justin Beiber ft. Lazer Major, MØ', id: '4'},
  //   {title: 'Dont Wanna Know', artist: 'Maroon 5', id: '5'},
  //   {title: 'Dust Till Dawn', artist: 'Zayn Malik', id: '6'},
  //   {title: 'Feel Me', artist: 'Selena Gomez', id: '7'},
  //   {title: 'Girl Like You', artist: 'Maroon 5', id: '8'},
  //   {title: 'Oxygen', artist: 'Jyye ft. Bryan Finlay', id: '9'},
  //   {title: 'Love Me Better', artist: 'James Blunt', id: '10'},
  //   {title: 'No Guidance', artist: 'Chris Brown ft. Drake', id: '11'},
  // ];

  return (
    <View style={{flex: 1}}>
      <FlatList
        data={tracks}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => onTrackPress(item.id)}
            activeOpacity={0.5}
            style={styles.container}>
            <View>
              <Image
                style={styles.cover}
                source={!item.cover ? defaultArtwork : {uri: item.cover}}
              />
            </View>
            <View
              style={{
                marginLeft: 20,
                flex: 1,
              }}>
              <Text numberOfLines={1} ellipsizeMode="tail" style={styles.title}>
                {!item.title ? item.fileName : item.title}
              </Text>
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={styles.artist}>
                {!item.author ? 'Unknown artist' : item.author}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
      <BottomBar navigation={navigation} />
    </View>
  );
};

export default Tracks;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 14,
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  cover: {
    width: 45,
    height: 45,
  },
  title: {
    fontSize: 15,
    fontFamily: 'Lato-Regular',
  },
  artist: {
    fontSize: 12,
    fontFamily: 'Lato-Regular',
    color: '#666',
    marginTop: 4,
  },
});
