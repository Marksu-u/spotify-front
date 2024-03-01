import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Loader from '../Loader';
import { apiService } from '../../services/apiService';
import { transformAlbumsWithAudios } from '../../services/transformService';
import { useAudioPlayback } from '../../context/AudioPlaybackProvider';

const CardAlbum = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { albumId } = useParams();
  const [albumDetails, setAlbumDetails] = useState(null);
  const { setCurrentSongId, setIsPlaying } = useAudioPlayback();

  const navigate = useNavigate();

  const fetchAlbumWithSongs = async () => {
    setIsLoading(true);
    try {
      const albumData = await apiService.getAudioFromAlbum(albumId);
      const transformedAlbum = await transformAlbumsWithAudios(albumData);
      setAlbumDetails(transformedAlbum);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAlbumWithSongs();
  }, [albumId]);

  const handleSongItemClick = (songId) => {
    console.log('Song clicked:', songId);
    setCurrentSongId(songId);
    setIsPlaying(true);
  };

  const handleBack = () => {
    navigate(-1);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <AlbumContainer>
      <button onClick={handleBack}>Back to Albums</button>
      <AlbumHeader>
        <AlbumArtwork src={albumDetails.picture} alt="Album cover" />
        <AlbumInfo>
          <AlbumTitle>{albumDetails.title}</AlbumTitle>
          <AlbumArtist>{albumDetails.artist}</AlbumArtist>
          <AlbumGenre>{albumDetails.genre}</AlbumGenre>
          <AlbumReleaseDate>{albumDetails.releaseDate}</AlbumReleaseDate>
        </AlbumInfo>
      </AlbumHeader>
      <SongsList>
        {albumDetails.audios.map((audio, index) => (
          <SongItem
            key={audio._id}
            onClick={() => handleSongItemClick(audio._id)}
          >
            <SongNumber>{index + 1}</SongNumber>
            <SongTitle>{audio.title}</SongTitle>
          </SongItem>
        ))}
      </SongsList>
    </AlbumContainer>
  );
};

const AlbumContainer = styled.div`
  background-color: #181818;
  color: white;
  min-height: 100vh;
  padding: 2rem;
`;

const AlbumHeader = styled.div`
  display: flex;
  padding: 2rem;
  background-color: #282828;
  border-radius: 8px;
  margin-bottom: 2rem;
`;

const AlbumArtwork = styled.img`
  width: 15rem;
  height: 15rem;
  object-fit: cover;
  margin-right: 2rem;
  border-radius: 4px;
`;

const AlbumInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const AlbumTitle = styled.h1`
  font-size: 2.5rem;
  margin: 0;
`;

const AlbumArtist = styled.h2`
  font-size: 1.5rem;
  margin: 0;
  opacity: 0.85;
`;

const AlbumGenre = styled.span`
  font-size: 1rem;
  color: #ccc; // Example color, adjust as needed
`;

const AlbumReleaseDate = styled.span`
  font-size: 1rem;
  opacity: 0.75;
`;

const SongsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const SongItem = styled.li`
  display: flex;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 1px solid #303030;
  &:last-child {
    border-bottom: none;
  }
  &:hover {
    background-color: #303030;
  }
`;

const SongNumber = styled.span`
  margin-right: 1rem;
  font-size: 1rem;
  color: #b3b3b3;
  min-width: 1.5rem;
  text-align: right;
`;

const SongTitle = styled.span`
  font-size: 1rem;
  flex-grow: 1;
  color: #fff;
  margin-left: 1rem;
`;

export default CardAlbum;
