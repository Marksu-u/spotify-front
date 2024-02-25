import { render } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import CardAlbum from './components/CardAlbum';

test('CardAlbum renders with correct albumId', () => {
  const albumId = 'albumId';
  render(
    <MemoryRouter initialEntries={[`/album/${albumId}`]}>
      <Routes>
        <Route path="album/:albumId" element={<CardAlbum />} />
      </Routes>
    </MemoryRouter>
  );
});
