// Our User entity

import typeorm from 'typeorm';

const { EntitySchema } = typeorm;

export default new EntitySchema({
  name: 'User',
  tableName: 'users',
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true,
    },
    email: {
      type: 'varchar',
    },
    userName: {
      type: 'varchar',
    },
    password: {
      type: 'varchar',
    },
  },

  relations: {
    user_meta: {
      target: 'UserMeta',
      type: 'one-to-one',
      joinColumn: true,
      inverseSide: 'user',
    },

    roles: {
      target: 'Role',
      type: 'many-to-one',
      joinColumn: true,
      inverseSide: 'user',
    },
  },
});
