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
      <h2>Liste des musiques</h2>
      <ul>
        {audios.map((audio) => (
          <li key={audio.id}>
            <h3>{audio.title}</h3>
            <p>Artiste: {audio.artist}</p>
            <p>Album: {audio.album}</p>
            <p>Date: {audio.date}</p>
            <p>Genre: {audio.genre}</p>
            <img src={audio.image} alt={audio.title} />
          </li>
        ))}
      </ul>
    </Container>
  );
};

const Container = styled.div``;

export default Body;
