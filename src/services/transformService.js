import { convertBufferToBase64 } from '../services/convertBufferService';

export const transformAlbums = async (album) => ({
  _id: album._id,
  title: album.title,
  artist: album.artist.name,
  artistId: album.artist._id,
  releaseDate: album.releaseDate,
  genre: album.genre,
  picture: convertBufferToBase64(album.picture[0]),
});

export const transformAlbumsWithAudios = async (album) => ({
  _id: album._id,
  title: album.title,
  artist: album.artistName,
  picture: convertBufferToBase64(album.picture[0]),
  releaseDate: album.releaseDate,
  audios: album.audios.map((audio) => ({
    _id: audio._id,
    title: audio.title,
    genre: audio.genre,
  })),
});
