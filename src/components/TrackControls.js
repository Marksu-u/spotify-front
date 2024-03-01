import React from 'react';
import styled from 'styled-components';
import { useAudioPlayback } from '../context/AudioPlaybackProvider';

const TrackControls = () => {
  const {
    isPlaying,
    handlePlayPauseClick,
    startSession,
    joinSession,
    leaveSession,
    sessionId,
  } = useAudioPlayback();

  const handleStartSessionClick = () => {
    startSession();
  };

  const handleJoinSessionClick = () => {
    const id = prompt('Enter session ID:');
    if (id) {
      joinSession(id);
    }
  };

  const handleLeaveSessionClick = () => {
    leaveSession();
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '10px',
      }}
    >
      <button onClick={handlePlayPauseClick}>
        {isPlaying ? 'Pause' : 'Play'}
      </button>
      {!sessionId && (
        <button onClick={handleStartSessionClick}>Start Session</button>
      )}
      {!sessionId ? (
        <button onClick={handleJoinSessionClick}>Join Session</button>
      ) : (
        <button onClick={handleLeaveSessionClick}>Leave Session</button>
      )}
      {sessionId && (
        <p
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '10px',
            color: 'white',
          }}
        >
          Session ID: {sessionId}
        </p>
      )}
    </div>
  );
};

export default TrackControls;
