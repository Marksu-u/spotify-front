import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
} from 'react';
import { apiService } from '../services/apiService';
import { io } from 'socket.io-client';

const AudioPlaybackContext = createContext();
const socket = io(`${process.env.REACT_URL}`);

export const useAudioPlayback = () => useContext(AudioPlaybackContext);

export const AudioPlaybackProvider = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const [currentSongId, setCurrentSongId] = useState(null);
  const [isHost, setIsHost] = useState(false);
  const audioRef = useRef(new Audio());

  const fetchAndPlaySong = async (songId) => {
    try {
      const audioUrl = await apiService.streamAudio(songId);
      audioRef.current.src = audioUrl;
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          console.log('Playback started successfully');
        })
        .catch((error) => {
          console.error('Error playing audio:', error);
        });
    } catch (error) {
      console.error('Failed to fetch song:', error);
    }
  };

  const adjustedSetCurrentSongId = (songId) => {
    setCurrentSongId(songId);
    if (isPlaying) {
      fetchAndPlaySong(songId);
    }
  };

  const handlePlayPauseClick = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      if (isHost && sessionId) {
        socket.emit('pause', { sessionId, isPlaying: false });
      }
    } else {
      if (
        currentSongId &&
        (!audioRef.current.src ||
          audioRef.current.src.indexOf(currentSongId) === -1)
      ) {
        fetchAndPlaySong(currentSongId).then(() => {
          if (isHost && sessionId) {
            socket.emit('play', {
              sessionId,
              songId: currentSongId,
              currentTime: audioRef.current.currentTime,
              isPlaying: true,
            });
          }
        });
      } else {
        audioRef.current
          .play()
          .catch((error) => console.error('Error playing audio:', error));
        setIsPlaying(true);
        if (isHost && sessionId) {
          socket.emit('play', {
            sessionId,
            songId: currentSongId,
            currentTime: audioRef.current.currentTime,
            isPlaying: true,
          });
        }
      }
    }
  };

  useEffect(() => {
    socket.on('syncPlayback', async ({ isPlaying, songId, currentTime }) => {
      console.log(`Received syncPlayback with songId: ${songId}`);
      if (songId) {
        setCurrentSongId(songId);
        try {
          const audioUrl = await apiService.streamAudio(songId);
          audioRef.current.src = audioUrl;

          const onAudioLoaded = () => {
            audioRef.current.currentTime = currentTime;
            if (isPlaying) {
              audioRef.current
                .play()
                .catch((error) => console.error('Error playing audio:', error));
            }
          };

          if (audioRef.current.readyState >= 2) {
            onAudioLoaded();
          } else {
            audioRef.current.addEventListener('loadeddata', onAudioLoaded, {
              once: true,
            });
          }
        } catch (error) {
          console.error('Failed to load song:', error);
        }
      }
    });

    return () => socket.off('syncPlayback');
  }, []);

  const startSession = () => {
    socket.emit('startSession', { sessionId, isHost: true });
    socket.on(
      'sessionStarted',
      ({ sessionId: newSessionId, isHost: newIsHost }) => {
        setSessionId(newSessionId);
        setIsHost(newIsHost);
      }
    );
  };

  const joinSession = (id) => {
    socket.emit('joinSession', id);
    socket.on(
      'sessionJoined',
      ({ sessionId: joinedSessionId, isHost: joinedIsHost }) => {
        setSessionId(joinedSessionId);
        setIsHost(joinedIsHost);
      }
    );
  };

  const leaveSession = () => {
    if (sessionId) {
      socket.emit('leaveSession', sessionId);
      setSessionId(null);
      setIsHost(false);
    }
  };

  const value = {
    isPlaying,
    setIsPlaying,
    currentSongId,
    setCurrentSongId: adjustedSetCurrentSongId,
    handlePlayPauseClick,
    audioRef,
    startSession,
    joinSession,
    leaveSession,
    sessionId,
    isHost,
  };

  return (
    <AudioPlaybackContext.Provider value={value}>
      {children}
    </AudioPlaybackContext.Provider>
  );
};
