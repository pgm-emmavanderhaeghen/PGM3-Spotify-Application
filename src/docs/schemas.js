// Our API schemas

export default {
  User: {
    properties: {
      id: { type: 'number' },
      email: { type: 'string' },
      password: { type: 'string' },
      user_meta: {
        $ref: '#/components/schemas/UserMeta',
      },
      role: {
        $ref: '#/components/schemas/Role',
      },
    },
  },
  UserInput: {
    properties: {
      id: { type: 'number' },
      email: { type: 'string' },
      password: { type: 'string' },
      user_meta: {
        $ref: '#/components/schemas/UserMeta',
      },
      role: {
        $ref: '#/components/schemas/Role',
      },
    },
  },
  UserMeta: {
    properties: {
      id: { type: 'number' },
      firstname: { type: 'string' },
      lastname: { type: 'string' },
      username: { type: 'string' },
      avatar: { type: 'string' },
      user_id: {
        $ref: '#/components/schemas/User',
      },
    },
  },
  Role: {
    properties: {
      id: { type: 'number' },
      label: { type: 'string' },
    },
  },
  Playlist: {
    properties: {
      id: { type: 'number' },
      name: { type: 'string' },
      user_id: {
        $ref: '#/components/schemas/User',
      },
      songs: {
        $ref: '#/components/schemas/Song',
      },
    },
  },
  PlaylistInput: {
    properties: {
      name: { type: 'string' },
      user_id: {
        $ref: '#/components/schemas/User',
      },
      songs: {
        $ref: '#/components/schemas/Song',
      },
    },
  },
  Song: {
    properties: {
      id: { type: 'number' },
      name: { type: 'string' },
      artist_id: {
        $ref: '#/components/schemas/Artist',
      },
      playlists: {
        $ref: '#/components/schemas/Playlist',
      },
      album: {
        $ref: '#/components/schemas/Album',
      },
    },
  },
  SongInput: {
    properties: {
      id: { type: 'number' },
      name: { type: 'string' },
      artist_id: {
        $ref: '#/components/schemas/Artist',
      },
      playlists: {
        $ref: '#/components/schemas/Playlist',
      },
      album: {
        $ref: '#/components/schemas/Album',
      },
    },
  },
  Artist: {
    properties: {
      id: { type: 'number' },
      name: { type: 'string' },
      albums: {
        $ref: '#/components/schemas/Album',
      },
    },
  },
  ArtistInput: {
    properties: {
      id: { type: 'number' },
      name: { type: 'string' },
      albums: {
        $ref: '#/components/schemas/Album',
      },
    },
  },
  Album: {
    properties: {
      id: { type: 'number' },
      name: { type: 'string' },
      artist_id: {
        $ref: '#/components/schemas/Artist',
      },
    },
  },
  AlbumInput: {
    properties: {
      id: { type: 'number' },
      name: { type: 'string' },
      artist_id: {
        $ref: '#/components/schemas/Artist',
      },
    },
  },
};
