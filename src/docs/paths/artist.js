// Artist path

export default {
  '/artists': {
    summary: 'Gets all the artists',
    description: 'Get all the artists in the Spotify database',
    get: {
      tags: ['Artists'],
      responses: {
        200: {
          description: 'Fetching artists was a success!',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: {
                  $ref: '#/components/schemas/Artist',
                },
              },
            },
          },
        },
      },
    },
  },

  '/artist': {
    summary: 'Create a new artist',
    descriptions: 'Creates new artists in the database...',
    post: {
      tags: ['Artists'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/ArtistInput',
            },
          },
        },
      },
      responses: {
        200: {
          description: 'Making a new artist was a success!',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Artist',
              },
            },
          },
        },
      },
    },
    put: {
      tags: ['Artists'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/ArtistInput',
            },
          },
        },
      },
      responses: {
        200: {
          description: 'Updating the artist was a success!',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Artist',
              },
            },
          },
        },
      },
    },
  },

  '/artist/{id}': {
    summary: 'Get a artist by id',
    description: 'Get a artist by id in the Spotify database',
    get: {
      tags: ['Artists'],
      responses: {
        200: {
          description: 'Fetching artist by id was a success!',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: {
                  $ref: '#/components/schemas/Artist',
                },
              },
            },
          },
        },
      },
    },
    delete: {
      tags: ['Artists'],
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: {
            type: 'integer',
            minimum: 1,
          },
          description: 'The artist ID',
        },
      ],
      responses: {
        200: {
          description: 'Deleting this artist was a success!',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Artist',
              },
            },
          },
        },
      },
    },
  },
};
