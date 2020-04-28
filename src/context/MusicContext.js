import React, {createContext, useState, useEffect} from 'react';
import MusicFiles from 'react-native-get-music-files';
import TrackPlayer, {
  useTrackPlayerEvents,
  useTrackPlayerProgress,
} from 'react-native-track-player';
import {getColorFromURL} from 'rn-dominant-color';

export const MusicContext = createContext();

export const MusicProvider = props => {
  const progress = useTrackPlayerProgress();
  const [tracks, setTracks] = useState([]);
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [artwork, setArtwork] = useState();
  const [bgColor, setBgColor] = useState();

  useTrackPlayerEvents(['playback-track-changed'], async event => {
    if (event.type === TrackPlayer.TrackPlayerEvents.PLAYBACK_TRACK_CHANGED) {
      const track = await TrackPlayer.getTrack(event.nextTrack);
      const {title, artist, artwork} = track || {};
      setTitle(title);
      setArtist(artist);
      setArtwork(artwork);
      getColorFromURL(artwork).then(colors => setBgColor(colors));
    }
  });

  useEffect(() => {
    fetchMusic();
  }, []);

  const fetchMusic = () => {
    MusicFiles.getAll({
      id: true,
      title: true,
      artist: true,
      cover: true,
      duration: true,
      genre: true,
      minimumSongDuration: 10000,
      fields: ['title', 'albumTitle', 'genre', 'lyrics', 'artwork', 'duration'], // for iOs Version
    })
      .then(tracks => {
        const newTracks = tracks.map(track => {
          return {
            id: track.id,
            url: track.path,
            title: !track.title ? track.fileName : track.title,
            artist: !track.author ? 'Unknown artist' : track.author,
            artwork: track.cover,
          };
        });

        TrackPlayer.add(newTracks);
        setTracks(tracks);
      })
      .catch(err => console.log(err));
  };

  return (
    <MusicContext.Provider
      value={{tracks, title, artist, artwork, progress, bgColor}}>
      {props.children}
    </MusicContext.Provider>
  );
};
