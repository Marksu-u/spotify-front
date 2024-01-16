import { createBrowserRouter } from 'react-router-dom';
import Home from '../components/Spotify';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  }
]);

export default router;