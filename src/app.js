import express from 'express';
import 'dotenv/config';
import * as path from 'path';
import bodyParser from 'body-parser';
import { create } from 'express-handlebars';
import { createConnection } from 'typeorm';
import swaggerUiExpress from 'swagger-ui-express';
import cookieParser from 'cookie-parser';
import { home, artist, album, playlist } from './controllers/home.js';
import {
  login,
  logout,
  postLogin,
  postRegister,
  register,
} from './controllers/authentication.js';
import entities from './models/index.js';
import { SOURCE_PATH } from './consts.js';
import swaggerDefinition from './docs/swagger.js';
import {
  getUsers,
  postUser,
  updateUser,
  getUserById,
} from './controllers/api/user.js';
import {
  getArtists,
  postArtist,
  updateArtist,
  getArtistById,
} from './controllers/api/artist.js';
import {
  getSongs,
  postSong,
  updateSong,
  getSongById,
} from './controllers/api/song.js';
import {
  getAlbums,
  postAlbum,
  updateAlbum,
  getAlbumById,
} from './controllers/api/album.js';
import {
  getPlaylists,
  postPlaylist,
  updatePlaylist,
  getPlaylistByUserId,
  getPlaylistById,
} from './controllers/api/playlist.js';
import { jwtAuth } from './middleware/jwtAuth.js';
import validationAuthentication from './middleware/validation/authentication.js';
import loginAuthentication from './middleware/validation/loginAuthentication.js';
import { postApiLogin } from './controllers/api/login.js';
import HandlebarsHelpers from './lib/HandlebarsHelpers.js';
import { deleteObject } from './controllers/api/object.js';

const app = express();
app.use(express.static('public'));

// Adding Swagger Documentation
app.use(
  '/api-docs',
  swaggerUiExpress.serve,
  swaggerUiExpress.setup(swaggerDefinition)
);

// import the body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// handlebars init
const hbs = create({
  helpers: HandlebarsHelpers,
  extname: 'hbs',
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', path.join(SOURCE_PATH, 'views'));

// app routing
app.get('/', jwtAuth, home);
app.get('/artist', jwtAuth, artist);
app.get('/album', jwtAuth, album);
app.get('/playlist', jwtAuth, playlist);

app.get('/login', login);
app.get('/register', register);
app.get('/logout', logout);

app.post('/register', ...validationAuthentication, postRegister, register);
app.post('/login', ...loginAuthentication, postLogin, login);
app.post('/logout', logout);

// api routing
app.post('/api/login', postApiLogin);

app.get('/api/users', jwtAuth, getUsers);
app.post('/api/user', jwtAuth, postUser);
app.put('/api/user', jwtAuth, updateUser);
app.get('/api/user/:id', jwtAuth, getUserById);
app.delete('/api/user/:id', (req, res, next) =>
  deleteObject('User', req, res, next)
);

app.get('/api/artists', jwtAuth, getArtists);
app.post('/api/artist', jwtAuth, postArtist);
app.put('/api/artist', jwtAuth, updateArtist);
app.get('/api/artist/:id', jwtAuth, getArtistById);
app.delete('/api/artist/:id', jwtAuth, (req, res, next) =>
  deleteObject('Artist', req, res, next)
);

app.get('/api/songs', jwtAuth, getSongs);
app.post('/api/song', jwtAuth, postSong);
app.put('/api/song', jwtAuth, updateSong);
app.get('/api/song/:id', jwtAuth, getSongById);
app.delete('/api/song/:id', jwtAuth, (req, res, next) =>
  deleteObject('Song', req, res, next)
);

app.get('/api/albums', jwtAuth, getAlbums);
app.post('/api/album', jwtAuth, postAlbum);
app.put('/api/album', jwtAuth, updateAlbum);
app.get('/api/album/:id', jwtAuth, getAlbumById);
app.delete('/api/album/:id', jwtAuth, (req, res, next) =>
  deleteObject('Album', req, res, next)
);

app.get('/api/playlists', jwtAuth, getPlaylists);
app.post('/api/playlist', jwtAuth, postPlaylist);
app.put('/api/playlist', jwtAuth, updatePlaylist);
app.get('/api/playlists/:userId', jwtAuth, getPlaylistByUserId);
app.post('/api/playlists/addSong');
app.get('/api/playlist/:id', jwtAuth, getPlaylistById);
app.delete('/api/playlist/:id', jwtAuth, (req, res, next) =>
  deleteObject('Playlist', req, res, next)
);
// create database connection and start listening
createConnection({
  type: process.env.DATABASE_TYPE,
  database: process.env.DATABASE_NAME,
  entities,
  synchronize: true,
}).then(() => {
  app.listen(process.env.PORT, () => {
    // eslint-disable-next-line no-console
    console.log(
      `Application is running on http://localhost:${process.env.PORT}.`
    );
  });
});
