const API_URL = process.env.REACT_APP_API_URL;

/* ------------- AUDIO ------------- */
const getAudioFromAlbum = async (id) => {
  const response = await fetch(`${API_URL}/api/audio/from/${id}`);
  if (!response.ok)
    throw new Error('Erreur lors de la récupération des audios');
  return await response.json();
};

const streamAudio = (id) => {
  return `${API_URL}/api/audio/stream/${id}`;
};

const getStreamingCount = async (id) => {
  const response = await fetch(`${API_URL}/api/audio/streamed/${id}`);
  if (!response.ok)
    throw new Error('Erreur lors de la récupération du nombre de stream');
  return await response.json();
};

/* ------------- ALBUM ------------- */
const getAlbums = async () => {
  const response = await fetch(`${API_URL}/api/album`);
  if (!response.ok) throw new Error('Erreur lors du chargement des albums');
  return await response.json();
};

export const apiService = {
  /* ------------- AUDIO ------------- */
  getAudioFromAlbum,
  streamAudio,
  getStreamingCount,
  /* ------------- ALBUM ------------- */
  getAlbums,
};
