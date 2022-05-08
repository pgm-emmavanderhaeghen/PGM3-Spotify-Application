/*
 * Our Album
 */

import typeorm from 'typeorm';

const { EntitySchema } = typeorm;

export default new EntitySchema({
  name: 'Album',
  tableName: 'albums',
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
      type: 'many-to-one',
      cascade: true,
      inverseSide: 'album',
    },
    songs: {
      target: 'Song',
      type: 'many-to-many',
      cascade: true,
      inverseSide: 'album',
    },
  },
});
