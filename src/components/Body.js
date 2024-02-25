import React, { useEffect, useState, Suspense, lazy, useMemo } from 'react';
import { transformAlbums } from '../services/transformService';
import { saveAlbums, getAlbums } from '../services/indexerDBService';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Loader from './Loader';
import { apiService } from '../services/apiService';

const PageControls = lazy(() => import('../components/PageControls'));
const Search = lazy(() => import('../components/Search'));

const ITEMS_PER_PAGE = 24;

const Body = ({ onAlbumSelect }) => {
  const [albums, setAlbums] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const goToAlbumDetails = (albumId) => {
    navigate(`/album/${albumId}`);
  };

  const fetchAlbums = async () => {
    setIsLoading(true);

    try {
      let albumData = await getAlbums();

      if (!albumData.length) {
        const fetchedAlbums = await apiService.getAlbums();
        const transformedAlbums = await Promise.all(
          fetchedAlbums.map(transformAlbums)
        );
        await saveAlbums(transformedAlbums);
        albumData = transformedAlbums;
      }

      setAlbums(albumData);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAlbums();
  }, []);

  const filteredItems = useMemo(() => {
    return albums.filter((item) => {
      const titleMatch = item.title
        ? item.title.toLowerCase().includes(searchQuery.toLowerCase())
        : false;
      const artistMatch = item.artist
        ? item.artist.toLowerCase().includes(searchQuery.toLowerCase())
        : false;
      return titleMatch || artistMatch;
    });
  }, [albums, searchQuery]);

  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);
  const currentItems = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredItems.slice(start, start + ITEMS_PER_PAGE);
  }, [currentPage, filteredItems]);

  const goToPreviousPage = () =>
    setCurrentPage((page) => Math.max(page - 1, 1));
  const goToNextPage = () =>
    setCurrentPage((page) => Math.min(page + 1, totalPages));

  const handleSearchChange = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const renderListItems = useMemo(
    () => (
      <Suspense fallback={<Loader />}>
        {currentItems.map((album, index) => (
          <AudioItem
            key={album._id}
            onClick={() => goToAlbumDetails(album._id)}
          >
            <ColumnNumber>{index + 1}</ColumnNumber>
            <ColumnImage>
              <img src={album.picture} alt={album.title} className="image" />
            </ColumnImage>
            <ColumnTitle>{album.title}</ColumnTitle>
            <ColumnAlbum>{album.artist}</ColumnAlbum>
            <ColumnDate>{album.releaseDate}</ColumnDate>
          </AudioItem>
        ))}
      </Suspense>
    ),
    [currentItems, onAlbumSelect]
  );

  return (
    <Container>
      <Search onSearchChange={handleSearchChange} />
      <AudioList>
        <AudioHeader>
          <ColumnNumber>#</ColumnNumber>
          <ColumnImage>Image</ColumnImage>
          <ColumnTitle>Album</ColumnTitle>
          <ColumnAlbum>Artiste</ColumnAlbum>
          <ColumnDate>Date</ColumnDate>
        </AudioHeader>
        {isLoading ? <Loader /> : renderListItems}
        <PageControls
          currentPage={currentPage}
          totalPages={totalPages}
          onPrevious={goToPreviousPage}
          onNext={goToNextPage}
        />
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
