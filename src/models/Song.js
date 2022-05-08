/*
 * Our Song
 */

import typeorm from 'typeorm';

const { EntitySchema } = typeorm;

export default new EntitySchema({
  name: 'Song',
  tableName: 'songs',
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true,
    },
    name: {
      type: 'varchar',
    },
  },

  relations: {
    artist_id: {
      target: 'Artist',
      type: 'one-to-one',
      // cascade: true,
      inverseSide: 'song',
    },

    album: {
      target: 'Album',
      type: 'one-to-many',
      // cascade: true,
      inverseSide: 'songs',
    },

    playlists: {
      target: 'Playlist',
      type: 'many-to-many',
      cascade: true,
      joinTable: {
        name: 'playlist_song',
      },
    },
  },
});
