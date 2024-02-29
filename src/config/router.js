import { createBrowserRouter } from 'react-router-dom';
import Spotify from '../components/Spotify';
import CardAlbum from '../components/CardAlbum';
import Body from '../components/Body';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Spotify />,
    children: [
      { path: '/', element: <Body /> },
      { path: 'album/:albumId', element: <CardAlbum /> },
    ],
  },
]);

export default router;
