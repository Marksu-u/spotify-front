import { createBrowserRouter } from 'react-router-dom';
import Home from '../components/Spotify';
import CardAlbum from '../components/CardAlbum';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: 'album/:albumId',
    element: <CardAlbum />,
  },
]);

export default router;
