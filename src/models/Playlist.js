/*
 * Our Playlist
 */

import typeorm from 'typeorm';

const { EntitySchema } = typeorm;

export default new EntitySchema({
  name: 'Playlist',
  tableName: 'playlists',
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
    users: {
      target: 'User',
      type: 'many-to-many',
      cascade: true,
      joinTable: {
        name: 'playlist_user',
      },
    },
  },
});
