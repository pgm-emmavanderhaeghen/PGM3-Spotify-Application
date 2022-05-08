// User path

export default {
  '/users': {
    summary: 'Gets all the users',
    description: 'Get all the users in the Spotify database',
    get: {
      tags: ['Users'],
      responses: {
        200: {
          description: 'Fetching users was a success!',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: {
                  $ref: '#/components/schemas/User',
                },
              },
            },
          },
        },
      },
    },
  },

  '/user': {
    summary: 'Create a new user',
    descriptions: 'Creates new users in the database...',
    post: {
      tags: ['Users'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/UserInput',
            },
          },
        },
      },
      responses: {
        200: {
          description: 'Making a new user was a success!',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/User',
              },
            },
          },
        },
      },
    },
    put: {
      tags: ['Users'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/UserInput',
            },
          },
        },
      },
      responses: {
        200: {
          description: 'Updating the user was a success!',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/User',
              },
            },
          },
        },
      },
    },
  },

  '/user/{id}': {
    summary: 'Get a user by id',
    description: 'Get a user by id in the Spotify database',
    get: {
      tags: ['Users'],
      responses: {
        200: {
          description: 'Fetching user by id was a success!',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: {
                  $ref: '#/components/schemas/User',
                },
              },
            },
          },
        },
      },
    },
    delete: {
      tags: ['Users'],
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: {
            type: 'integer',
            minimum: 1,
          },
          description: 'The user ID',
        },
      ],
      responses: {
        200: {
          description: 'Deleting this user was a success!',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/User',
              },
            },
          },
        },
      },
    },
  },
};
