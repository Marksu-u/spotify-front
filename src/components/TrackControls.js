import React from 'react';

const TrackControls = ({
  isPlaying,
  onPlayPauseClick,
  onNextClick,
  onShuffleClick,
  onRepeatClick,
  shuffle,
  repeat,
}) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '10px',
      }}
    >
      <button onClick={onShuffleClick}>
        {shuffle ? 'Unshuffle' : 'Shuffle'}
      </button>
      <button onClick={() => onPlayPauseClick(!isPlaying)}>
        {isPlaying ? 'Pause' : 'Play'}
      </button>
      <button onClick={onNextClick}>Next</button>
      <button onClick={onRepeatClick}>{repeat ? 'Unrepeat' : 'Repeat'}</button>
    </div>
  );
};

export default TrackControls;
