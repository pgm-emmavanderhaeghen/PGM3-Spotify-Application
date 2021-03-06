/*
 * Our Role
 */

import typeorm from 'typeorm';

const { EntitySchema } = typeorm;

export default new EntitySchema({
  name: 'Role',
  tableName: 'roles',
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true,
    },
    label: {
      type: 'varchar',
    },
  },

  relations: {
    user: {
      target: 'User',
      type: 'one-to-many',
      cascade: true,
      inverseSide: 'roles',
    },
  },
});
