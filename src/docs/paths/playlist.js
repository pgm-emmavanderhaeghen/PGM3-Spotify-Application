// playlist path

export default {
  '/playlists': {
    summary: 'Gets all the playlists',
    description: 'Get all the playlists in the Spotify database',
    get: {
      tags: ['Playlists'],
      responses: {
        200: {
          description: 'Fetching playlists was a success!',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: {
                  $ref: '#/components/schemas/Playlist',
                },
              },
            },
          },
        },
      },
    },
  },

  '/playlist': {
    summary: 'Create a new playlist',
    descriptions: 'Creates new playlists in the database...',
    post: {
      tags: ['Playlists'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/PlaylistInput',
            },
          },
        },
      },
      responses: {
        200: {
          description: 'Making a new playlist was a success!',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Playlist',
              },
            },
          },
        },
      },
    },
    put: {
      tags: ['Playlists'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/PlaylistInput',
            },
          },
        },
      },
      responses: {
        200: {
          description: 'Updating the playlist was a success!',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Playlist',
              },
            },
          },
        },
      },
    },
  },

  '/playlist/{userId}': {
    summary: 'Get a playlist by id',
    description: 'Get a playlist by id in the Spotify database',
    get: {
      tags: ['Playlists'],
      responses: {
        200: {
          description: 'Fetching the playlist by id was a success!',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: {
                  $ref: '#/components/schemas/Playlist',
                },
              },
            },
          },
        },
      },
    },
  },

  '/playlist/addSong': {
    summary: 'Update a playlist',
    description: 'Update a playlist in the Spotify database',
    post: {
      tags: ['Playlists'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/PlaylistInput',
            },
          },
        },
      },
      responses: {
        200: {
          description: 'Making a new playlist was a success!',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Playlist',
              },
            },
          },
        },
      },
    },
  },

  '/playlist/{id}': {
    summary: 'Get a playlist by id',
    description: 'Get a playlist by id in the Spotify database',
    get: {
      tags: ['Playlists'],
      responses: {
        200: {
          description: 'Fetching playlist by id was a success!',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: {
                  $ref: '#/components/schemas/Playlist',
                },
              },
            },
          },
        },
      },
    },
    delete: {
      tags: ['Playlists'],
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: {
            type: 'integer',
            minimum: 1,
          },
          description: 'The playlist ID',
        },
      ],
      responses: {
        200: {
          description: 'Deleting this playlist was a success!',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Playlist',
              },
            },
          },
        },
      },
    },
  },
};
