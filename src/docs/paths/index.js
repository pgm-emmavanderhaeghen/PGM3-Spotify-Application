import user from './user.js';
import artist from './artist.js';
import album from './album.js';
import playlist from './playlist.js';
import song from './song.js';

export default {
  ...user,
  ...artist,
  ...album,
  ...playlist,
  ...song,
};
