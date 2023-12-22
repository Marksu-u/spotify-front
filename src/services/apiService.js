const API_URL = process.env.REACT_APP_API_URL;

/* ------------- AUDIO ------------- */
const getAudios = async () => {
  const response = await fetch(`${API_URL}audio`);
  if (!response.ok) throw new Error('Erreur lors du chargement des audios');
  return await response.json();
};

const getSingleAudio = async (id) => {
  const response = await fetch(`${API_URL}audio/${id}`);
  if (!response.ok)
    throw new Error('Erreur lors de la récupération de l’audio');
  return await response.json();
};

const streamAudio = async (id) => {
  const response = await fetch(`${API_URL}audio/stream/${id}`);
  if (!response.ok) throw new Error('Erreur lors du streaming de l’audio');
  return await response.json();
};

const getStreamingCount = async (id) => {
  const response = await fetch(`${API_URL}audio/streamed/${id}`);
  if (!response.ok)
    throw new Error('Erreur lors de la récupération du nombre de stream');
  return await response.json();
};

/* ------------- ARTIST ------------- */
const getArtists = async () => {
  const response = await fetch(`${API_URL}artist/`);
  if (!response.ok) throw new Error('Erreur lors du chargement des artistes');
  return await response.json();
};

const getSingleArtist = async (id) => {
  const response = await fetch(`${API_URL}artist/${id}`);
  if (!response.ok)
    throw new Error('Erreur lors de la récupération de l’artiste');
  return await response.json();
};

/* ------------- ALBUM ------------- */
const getAlbums = async () => {
  const response = await fetch(`${API_URL}album`);
  if (!response.ok) throw new Error('Erreur lors du chargement des albums');
  return await response.json();
};

const getSingleAlbum = async (id) => {
  const response = await fetch(`${API_URL}album/${id}`);
  if (!response.ok)
    throw new Error('Erreur lors de la récupération de l’album');
  return await response.json();
};

export const apiService = {
  /* ------------- AUDIO ------------- */
  getAudios,
  getSingleAudio,
  streamAudio,
  getStreamingCount,
  /* ------------- ARTIST ------------- */
  getArtists,
  getSingleArtist,
  /* ------------- ALBUM ------------- */
  getAlbums,
  getSingleAlbum,
};
