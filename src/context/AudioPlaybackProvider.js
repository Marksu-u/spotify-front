import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
} from 'react';
import { apiService } from '../services/apiService';

const AudioPlaybackContext = createContext();

export const useAudioPlayback = () => useContext(AudioPlaybackContext);

export const AudioPlaybackProvider = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSongId, setCurrentSongId] = useState(null);
  const audioRef = useRef(new Audio());

  useEffect(() => {
    if (currentSongId) {
      console.log('Fetching and playing song:', currentSongId);
      const fetchAndPlaySong = async () => {
        try {
          const audioUrl = await apiService.streamAudio(currentSongId);
          audioRef.current.src = audioUrl;
          console.log('Audio source set:', audioUrl);
          if (isPlaying) {
            audioRef.current
              .play()
              .catch((error) => console.error('Error playing audio:', error));
          }
        } catch (error) {
          console.error('Failed to fetch song:', error);
        }
      };

      fetchAndPlaySong();
    }
  }, [currentSongId, isPlaying]);

  const handlePlayPauseClick = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      if (audioRef.current.src) {
        audioRef.current
          .play()
          .catch((error) => console.error('Error playing audio:', error));
      } else {
        console.error('Audio source not set');
      }
    }
    setIsPlaying(!isPlaying);
  };

  const value = {
    isPlaying,
    setIsPlaying,
    currentSongId,
    setCurrentSongId,
    handlePlayPauseClick,
    audioRef,
  };

  return (
    <AudioPlaybackContext.Provider value={value}>
      {children}
    </AudioPlaybackContext.Provider>
  );
};
