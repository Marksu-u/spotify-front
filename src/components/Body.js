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
      <AudioList>
        <AudioHeader>
          <ColumnNumber>#</ColumnNumber>
          <ColumnImage>Image</ColumnImage>
          <ColumnTitle>Titre</ColumnTitle>
          <ColumnAlbum>Album</ColumnAlbum>
          <ColumnDate>Date</ColumnDate>
        </AudioHeader>
        {audios.map((audio, index) => (
          <AudioItem key={audio.id}>
            <ColumnNumber>{index + 1}</ColumnNumber>
            <ColumnImage>
              <img src={audio.image} alt={audio.title} className="image" />
            </ColumnImage>
            <ColumnTitle>{audio.title}</ColumnTitle>
            <ColumnAlbum>{audio.album}</ColumnAlbum>
            <ColumnDate>{audio.date}</ColumnDate>
          </AudioItem>
        ))}
      </AudioList>
    </Container>
  );
};

const Container = styled.div`
  ul {
    list-style: none;
    padding: 0;
  }
`;

const AudioList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;

const AudioItem = styled.li`
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 10px;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: rgba(0, 0, 0, 0.7);
  }
`;

const AudioHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 10px;
  background-color: #000000dc;
  font-weight: bold;
`;

const ColumnNumber = styled.span`
  flex: 0.1;
  color: white;
  font-size: 1rem;
  text-align: center;
`;

const ColumnImage = styled.span`
  flex: 0.1;
  color: white;
  font-size: 1rem;
  text-align: center;
  img {
    max-height: 70px;
    max-width: 70px;
    vertical-align: middle;
  }
`;

const ColumnTitle = styled.span`
  flex: 0.3;
  color: white;
  font-size: 1rem;
  text-align: center;
`;

const ColumnAlbum = styled.span`
  flex: 0.3;
  color: white;
  font-size: 1rem;
  text-align: center;
`;

const ColumnDate = styled.span`
  flex: 0.2;
  color: white;
  font-size: 1rem;
  text-align: center;
`;

export default Body;
