// A Home Controller

import { getConnection } from 'typeorm';
// import jwt from 'jsonwebtoken';

export const home = async (req, res) => {
  // get the user repository
  // const { token } = req.cookies;
  // if (!token) {
  //   return res.redirect('/login');
  // }
  // const user = jwt.verify(token, process.env.TOKEN_SALT);

  // get the artist repository
  const artistRepository = getConnection().getRepository('Artist');
  const artists = await artistRepository.find();

  // get the playlist repository
  const playlistRepository = getConnection().getRepository('Playlist');
  const playlists = await playlistRepository.find();

  // get the song repository
  const songRepository = getConnection().getRepository('Song');
  const songs = await songRepository.find();

  res.render('home', { playlists, artists, songs, user: req.user });
};

export const artist = async (req, res) => {
  // get the artist repository
  const artistRepository = getConnection().getRepository('Artist');
  const artists = await artistRepository.find();

  const artistName = {
    name: 'test',
  };

  // get the album repository
  const albumRepository = getConnection().getRepository('Album');
  const albums = await albumRepository.find();

  // get the playlist repository
  const playlistRepository = getConnection().getRepository('Playlist');
  const playlists = await playlistRepository.find();

  // get the song repository
  const songRepository = getConnection().getRepository('Song');
  const songs = await songRepository.find();

  res.render('artist', {
    playlists,
    artists,
    songs,
    albums,
    artistName,
    user: req.user,
  });
};

export const album = async (req, res) => {
  // get the artist repository
  const artistRepository = getConnection().getRepository('Artist');
  const artists = await artistRepository.find();

  // get the album repository
  const albumRepository = getConnection().getRepository('Album');
  const albums = await albumRepository.find();

  // get the playlist repository
  const playlistRepository = getConnection().getRepository('Playlist');
  const playlists = await playlistRepository.find();

  // get the song repository
  const songRepository = getConnection().getRepository('Song');
  const songs = await songRepository.find();

  res.render('album', { playlists, artists, songs, albums, user: req.user });
};

export const playlist = async (req, res) => {
  // get the artist repository
  const artistRepository = getConnection().getRepository('Artist');
  const artists = await artistRepository.find();

  // get the album repository
  const albumRepository = getConnection().getRepository('Album');
  const albums = await albumRepository.find();

  // get the playlist repository
  const playlistRepository = getConnection().getRepository('Playlist');
  const playlists = await playlistRepository.find();

  // get the song repository
  const songRepository = getConnection().getRepository('Song');
  const songs = await songRepository.find();

  res.render('playlist', { playlists, artists, songs, albums, user: req.user });
};
