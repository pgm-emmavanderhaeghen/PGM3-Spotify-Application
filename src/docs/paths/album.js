// Album path

export default {
  '/albums': {
    summary: 'Gets all the albums',
    description: 'Get all the albums in the Spotify database',
    get: {
      tags: ['Albums'],
      responses: {
        200: {
          description: 'Fetching albums was a success!',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: {
                  $ref: '#/components/schemas/Album',
                },
              },
            },
          },
        },
      },
    },
  },

  '/album': {
    summary: 'Create a new album',
    descriptions: 'Creates new albums in the database...',
    post: {
      tags: ['Albums'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/AlbumInput',
            },
          },
        },
      },
      responses: {
        200: {
          description: 'Making a new album was a success!',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Album',
              },
            },
          },
        },
      },
    },
    put: {
      tags: ['Albums'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/AlbumInput',
            },
          },
        },
      },
      responses: {
        200: {
          description: 'Updating the album was a success!',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Album',
              },
            },
          },
        },
      },
    },
  },

  '/album/{id}': {
    summary: 'Get a album by id',
    description: 'Get a album by id in the Spotify database',
    get: {
      tags: ['Albums'],
      responses: {
        200: {
          description: 'Fetching album by id was a success!',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: {
                  $ref: '#/components/schemas/Album',
                },
              },
            },
          },
        },
      },
    },
    delete: {
      tags: ['Albums'],
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: {
            type: 'integer',
            minimum: 1,
          },
          description: 'The album ID',
        },
      ],
      responses: {
        200: {
          description: 'Deleting this album was a success!',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Album',
              },
            },
          },
        },
      },
    },
  },
};
