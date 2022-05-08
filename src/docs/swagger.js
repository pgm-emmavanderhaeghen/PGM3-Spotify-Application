// The Swagger configuration

import schemas from './schemas.js';
import paths from './paths/index.js';

export default {
  openapi: '3.0.0',
  info: {
    version: '1.0.0',
    title: 'An awesome API to control our Spotify data',
    description:
      'An awesome API to control our data created by yours truly Emma Van der Haeghen',
    license: {
      name: 'Arteveldehogeschool',
      url: 'https://arteveldehogeschool.be',
    },
  },
  servers: [
    {
      url: 'http://localhost:3000/api',
      description: 'Development server',
    },
  ],
  tags: [
    {
      name: 'Users',
    },
    {
      name: 'Artists',
    },
    {
      name: 'Albums',
    },
    {
      name: 'Playlists',
    },
    {
      name: 'Songs',
    },
  ],
  paths,
  components: {
    schemas,
  },
};
