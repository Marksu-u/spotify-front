import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { apiService } from '../services/apiService';

const Body = () => {
  const [audios, setAudios] = useState([]);

  useEffect(() => {
    const fetchAudios = async () => {
      try {
        const fetchedAudios = await apiService.getAudios();
        const transformedAudios = fetchedAudios.map((audio) => {
          return {
            id: audio._id,
            title: audio.filename,
            artist: audio.metadata.artist.name,
            album: audio.metadata.album.title,
            date: audio.metadata.date,
            genre: audio.metadata.genre.join(', '),
            image: convertBufferToImageUrl(audio.metadata.picture[0]),
          };
        });
        setAudios(transformedAudios);
      } catch (error) {
        console.error(error);
      }
    };
    fetchAudios();
  }, []);

  const convertBufferToImageUrl = (picture) => {
    if (picture && picture.data && picture.data.data) {
      const buffer = new Uint8Array(picture.data.data);
      const blob = new Blob([buffer], { type: picture.format });
      return URL.createObjectURL(blob);
    }
    return null;
  };

  return (
    <Container>
      <ul>
        {audios.map((audio, index) => (
          <Audio key={audio.id}>
            <span className="number">{index + 1}</span>
            <img src={audio.image} alt={audio.title} className="image" />
            <span className="title">{audio.title}</span>
            <span className="album">{audio.album}</span>
            <span className="date">{audio.date}</span>
          </Audio>
        ))}
      </ul>
    </Container>
  );
};

const Container = styled.div`
  /* Styles pour Container */
  ul {
    list-style: none;
    padding: 0;
  }
`;

const Audio = styled.li`
  /* Styles pour Audio */
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 10px;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: rgba(0, 0, 0, 0.7);
  }

  .number {
    /* Styles pour le numéro */
    flex: 0.1;
    color: #dddcdc;
    font-size: 1.5rem;
  }

  .image {
    /* Styles pour l'image */
    flex: 0.1;
    height: 80px; /* Ajustez la taille des images ici */
    width: 80px;  /* Ajustez la taille des images ici */
  }

  .title {
    /* Styles pour le titre */
    flex: 0.3;
    color: white;
    font-size: 2rem;
  }

  .album {
    /* Styles pour l'album */
    flex: 0.3;
    color: #dddcdc;
    font-size: 1.2rem;
  }

  .date {
    /* Styles pour la date */
    flex: 0.3;
    color: #dddcdc;
    font-size: 1.2rem;
  }
`;

export default Body;
