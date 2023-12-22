import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { apiService } from '../services/apiService';

const CurrentTrack = () => {
  const [currentTrack, setCurrentTrack] = useState(null);

  useEffect(() => {
    const fetchCurrentTrack = async () => {
      try {
        const response = await apiService.getCurrentTrack();
        setCurrentTrack(response);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCurrentTrack();
  }, []);

  return (
    <Container>
      {currentTrack && (
        <div className="track">
          <div className="track__image">
            <img src={currentTrack.image} alt={currentTrack.title} />
          </div>
          <div className="track__info">
            <h4 className="track__info__track__name">{currentTrack.title}</h4>
            <h6 className="track__info__track__artists">
              {currentTrack.artist}
            </h6>
          </div>
        </div>
      )}
    </Container>
  );
};

const Container = styled.div`
  .track {
    display: flex;
    align-items: center;
    gap: 1rem;
    &__image {
      img {
        max-width: 50px; // Ajustez la taille de l'image selon vos besoins
        max-height: 50px;
      }
    }
    &__info {
      display: flex;
      flex-direction: column;
      gap: 0.3rem;
      &__track__name {
        color: white;
      }
      &__track__artists {
        color: #b3b3b3;
      }
    }
  }
`;

export default CurrentTrack;
