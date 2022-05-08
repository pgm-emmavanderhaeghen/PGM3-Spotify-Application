// song path

export default {
  '/songs': {
    summary: 'Gets all the songs',
    description: 'Get all the songs in the Spotify database',
    get: {
      tags: ['Songs'],
      responses: {
        200: {
          description: 'Fetching songs was a success!',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: {
                  $ref: '#/components/schemas/Song',
                },
              },
            },
          },
        },
      },
    },
  },

  '/song': {
    summary: 'Create a new song',
    descriptions: 'Creates new songs in the database...',
    post: {
      tags: ['Songs'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/SongInput',
            },
          },
        },
      },
      responses: {
        200: {
          description: 'Making a new song was a success!',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Song',
              },
            },
          },
        },
      },
    },
    put: {
      tags: ['Songs'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/SongInput',
            },
          },
        },
      },
      responses: {
        200: {
          description: 'Updating the song was a success!',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Song',
              },
            },
          },
        },
      },
    },
  },

  '/song/{id}': {
    summary: 'Get a song by id',
    description: 'Get a song by id in the Spotify database',
    get: {
      tags: ['Songs'],
      responses: {
        200: {
          description: 'Fetching song by id was a success!',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: {
                  $ref: '#/components/schemas/Song',
                },
              },
            },
          },
        },
      },
    },
    delete: {
      tags: ['Songs'],
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: {
            type: 'integer',
            minimum: 1,
          },
          description: 'The song ID',
        },
      ],
      responses: {
        200: {
          description: 'Deleting this song was a success!',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Song',
              },
            },
          },
        },
      },
    },
  },
};
