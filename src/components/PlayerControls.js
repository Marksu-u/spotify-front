import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import {
  BsFillPlayCircleFill,
  BsFillPauseCircleFill,
  BsShuffle,
} from 'react-icons/bs';
import { CgPlayTrackNext, CgPlayTrackPrev } from 'react-icons/cg';
import { FiRepeat } from 'react-icons/fi';
import shuffle from 'just-shuffle';
import Volume from './Volume';

const audioURL = 'URL';

const PlayerControls = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);
  const [repeatMode, setRepeatMode] = useState('none');
  const [shuffleMode, setShuffleMode] = useState(false);

  useEffect(() => {
    audioRef.current.pause();

    const intervalId = setInterval(() => {
      if (!audioRef.current) {
        return;
      }

      setDuration(Math.round(audioRef.current.duration));
      setCurrentTime(Math.round(audioRef.current.currentTime));

      if (audioRef.current.ended) {
        if (repeatMode === 'song') {
          audioRef.current.currentTime = 0;
          audioRef.current.play();
        } else {
          // Gérez la fin de la lecture ici
        }
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [repeatMode]);

  const randomizePlaylist = () => {
    // Gérez le mode de lecture aléatoire ici
  };

  const handleCanPlay = () => {
    setDuration(Math.round(audioRef.current.duration));
  };

  const handleProgress = (e) => {
    setCurrentTime(Math.round(e.target.currentTime));
  };

  const handleSeek = (time) => {
    audioRef.current.currentTime = time;
    setCurrentTime(Math.round(time));
  };

  const handlePlayPause = () => {
    if (!isPlaying) {
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleRepeatToggle = () => {
    // Gérez le mode de répétition ici
  };

  useEffect(() => {
    // Mettez à jour la source audio lors du chargement initial du composant
    audioRef.current.src = audioURL;
    setCurrentTime(0);
    if (isPlaying) {
      audioRef.current.play();
    }
  }, [audioURL, isPlaying]);

  const getRepeatIconColor = () => {
    // couleur icone repeat
  };

  return (
    <Container repeatMode={repeatMode}>
      <audio
        onCanPlay={handleCanPlay}
        onTimeUpdate={handleProgress}
        onSeeked={handleProgress}
        ref={audioRef}
      />
      <ButtonContainer>
        <div className="shuffle" onClick={randomizePlaylist}>
          <BsShuffle color={shuffleMode ? 'red' : 'white'} />
        </div>
        <div className="state" onClick={handlePlayPause}>
          {isPlaying ? <BsFillPauseCircleFill /> : <BsFillPlayCircleFill />}
        </div>
        <div className="repeat" onClick={handleRepeatToggle}>
          <FiRepeat color={getRepeatIconColor()} />
        </div>
      </ButtonContainer>
      <Bar>
        <TimeDisplay>{formatTime(currentTime)}</TimeDisplay>
        <ProgressBar
          max={duration}
          value={currentTime}
          onChange={(e) => {
            const time = parseInt(e.target.value, 10);
            handleSeek(time);
          }}
        />
        <TimeDisplay>{formatTime(duration)}</TimeDisplay>
      </Bar>
      <div className="volume">
        <Volume audioRef={audioRef} />
      </div>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  position: relative;

  .shuffle {
    color: ${(props) =>
      props.repeatMode === 'none'
        ? 'white'
        : props.repeatMode === 'playlist'
          ? 'green'
          : 'red'};
    transition: 0.2s ease-in-out;
    &:hover {
      color: white;
    }
  }

  .volume {
    position: absolute;
    top: 0;
    right: -150px;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  svg {
    color: white;
    transition: 0.2s ease-in-out;
    &:hover {
      color: white;
    }
  }

  .state {
    svg {
      color: white;
    }
  }

  .previous,
  .next,
  .state {
    font-size: 2rem;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
`;

const ProgressBar = styled.input.attrs((props) => ({
  type: 'range',
  max: props.max || 100,
  value: props.value || 0,
}))`
  width: 80%;
  appearance: none;
  height: 5px;
  border-radius: 5px;
  outline: none;
  background: #888;
  &::-webkit-slider-thumb {
    appearance: none;
    width: 15px;
    height: 15px;
    background: white;
    border-radius: 50%;
  }
`;

const Bar = styled.div`
  width: 80%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;
`;

const TimeDisplay = styled.div`
  color: white;
  font-size: 12px;
  margin-bottom: 2px;
  text-align: center;
`;

const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
};

export default PlayerControls;
