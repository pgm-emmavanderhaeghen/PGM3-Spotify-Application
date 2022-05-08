/*
 * API - Playlist Controller
 */

import { getConnection } from 'typeorm';
import { checkPermissions } from '../../middleware/validation/authorisation.js';

// get all playlists
export const getPlaylists = async (req, res, next) => {
  try {
    // get permission
    checkPermissions([1, 2, 3], req.user);

    // get the playlist repository
    const playlistRepository = getConnection().getRepository('Playlist');

    // send back to client
    res.status(200).json(await playlistRepository.find());
  } catch (error) {
    next(error.message);
  }
};

// get playlist by id
export const getPlaylistById = async (req, res, next) => {
  try {
    // get permission
    checkPermissions([1, 2, 3], req.user);

    // catch the id from params
    const { id } = req.params;

    // validate incoming variables
    if (!id) throw new Error('Please specify an id to show.');

    // get the playlist repository
    const playlistRepository = getConnection().getRepository('Playlist');

    // get the requested playlist
    const playlist = await playlistRepository.findOne({ id });

    // validate if requested playlist exists
    if (!playlist)
      throw new Error(`The playlist with id: ${id} does not exist.`);

    // send back to client
    res.status(200).json(await playlistRepository.find());
  } catch (error) {
    next(error.message);
  }
};

// get playlist by userId
export const getPlaylistByUserId = async (req, res, next) => {
  try {
    // get permission
    checkPermissions([1, 2, 3], req.user);

    // catch the id from params
    const { userId } = req.params;

    // validate incoming variables
    if (!userId) throw new Error('Please specify a userId to show.');

    // get the playlist repository
    const playlistRepository = getConnection().getRepository('Playlist');

    // get the requested playlist
    const playlist = await playlistRepository.findOne({ userId });

    // validate if requested playlist exists
    if (!playlist)
      throw new Error(`The playlist with id: ${userId} does not exist.`);

    // send back to client
    res.status(200).json(await playlistRepository.find());
  } catch (error) {
    next(error.message);
  }
};

// create one playlist
export const postPlaylist = async (req, res, next) => {
  try {
    // get permission
    checkPermissions([1], req.user);

    // validate incoming body
    if (!req.body.name)
      throw new Error('Please provide a name for your playlist.');

    // get the repository from playlist
    const playlistRepository = getConnection().getRepository('Playlist');

    // get interest (if this one exists)
    const playlist = await playlistRepository.findOne({
      where: { name: req.body.name },
    });

    // if playlist already exists
    if (playlist) {
      res
        .status(200)
        .json({ status: `Posted playlist with id ${playlist.id}.` });
      return;
    }

    // save the playlist in the repository
    const insertedPlaylist = await playlistRepository.save(req.body);

    res
      .redirect('/')
      .status(200)
      .json({ status: `Posted playlist with id ${insertedPlaylist.id}.` });
  } catch (error) {
    next(error.message);
  }
};

// update one playlist
export const updatePlaylist = async (req, res, next) => {
  try {
    // get permission
    checkPermissions([1, 2], req.user);

    // validate incoming id
    if (!req.body.id)
      throw new Error(
        'Please provide an id for the playlist you want to update.'
      );

    // get the playlist repository
    const playlistRepository = getConnection().getRepository('Playlist');

    // get the requested playlist
    const playlist = await playlistRepository.findOne({
      where: { id: req.body.id },
    });

    // validate if the requested playlist exists
    if (!playlist) throw new Error('The given playlist does not exist.');

    // create the updated playlist
    const updatedPlaylist = { ...playlist, ...req.body };

    // save the updated playlist
    await playlistRepository.save(updatedPlaylist);

    // send back to the client
    res
      .status(200)
      .json({ status: `Updated playlist with id: ${req.body.id}.` });
  } catch (error) {
    next(error.message);
  }
};

// delete playlist by id
export const deletePlaylist = async (req, res, next) => {
  try {
    // get permission
    checkPermissions([1], req.user);

    // catch the id from params
    const { id } = req.params;

    // validate incoming variables
    if (!id) throw new Error('Please specify an id to remove.');

    // get the playlist repository
    const playlistRepository = getConnection().getRepository('Playlist');

    // get the requested playlist
    const playlist = await playlistRepository.findOne({ id });

    // validate if requested playlist exists
    if (!playlist)
      throw new Error(`The playlist with id: ${id} does not exist.`);

    // remove the playlist
    await playlistRepository.remove({ id });

    // send success to client
    res.status(200).json({ status: `Deleted playlist with id: ${id}.` });
  } catch (error) {
    next(error.message);
  }
};
