/*
 * API - Song Controller
 */

import { getConnection } from 'typeorm';
import { checkPermissions } from '../../middleware/validation/authorisation.js';

// get all songs
export const getSongs = async (req, res, next) => {
  try {
    // get permission
    checkPermissions([1, 2, 3], req.user);

    // get the song repository
    const songRepository = getConnection().getRepository('Song');

    // send back to client
    res.status(200).json(await songRepository.find());
  } catch (error) {
    next(error.message);
  }
};

// get song by id
export const getSongById = async (req, res, next) => {
  try {
    // get permission
    checkPermissions([1, 2, 3], req.user);

    // catch the id from params
    const { id } = req.params;

    // validate incoming variables
    if (!id) throw new Error('Please specify an id to show.');

    // get the song repository
    const songRepository = getConnection().getRepository('Song');

    // get the requested song
    const song = await songRepository.findOne({ id });

    // validate if requested song exists
    if (!song) throw new Error(`The song with id: ${id} does not exist.`);

    // send back to client
    res.status(200).json(await songRepository.find());
  } catch (error) {
    next(error.message);
  }
};

// create one song
export const postSong = async (req, res, next) => {
  try {
    // get permission
    checkPermissions([1], req.user);

    // validate incoming body
    if (!req.body.name) throw new Error('Please provide a name for your song.');

    // get the repository from song
    const songRepository = getConnection().getRepository('Song');

    // get interest (if this one exists)
    const song = await songRepository.findOne({
      where: { name: req.body.name },
    });

    // if song already exists
    if (song) {
      res.status(200).json({ status: `Posted song with id ${song.id}.` });
      return;
    }

    // save the song in the repository
    const insertedSong = await songRepository.save(req.body);

    res
      .redirect('/album')
      .status(200)
      .json({ status: `Posted song with id ${insertedSong.id}.` });
  } catch (error) {
    next(error.message);
  }
};

// update one song
export const updateSong = async (req, res, next) => {
  try {
    // get permission
    checkPermissions([1, 2], req.user);

    // validate incoming id
    if (!req.body.id)
      throw new Error('Please provide an id for the song you want to update.');

    // get the song repository
    const songRepository = getConnection().getRepository('Song');

    // get the requested song
    const song = await songRepository.findOne({
      where: { id: req.body.id },
    });

    // validate if the requested song exists
    if (!song) throw new Error('The given song does not exist.');

    // create the updated song
    const updatedSong = { ...song, ...req.body };

    // save the updated song
    await songRepository.save(updatedSong);

    // send back to the client
    res.status(200).json({ status: `Updated song with id: ${req.body.id}.` });
  } catch (error) {
    next(error.message);
  }
};

// delete song by id
export const deleteSong = async (req, res, next) => {
  try {
    // get permission
    checkPermissions([1], req.user);

    // catch the id from params
    const { id } = req.params;

    // validate incoming variables
    if (!id) throw new Error('Please specify an id to remove.');

    // get the song repository
    const songRepository = getConnection().getRepository('Song');

    // get the requested song
    const song = await songRepository.findOne({ id });

    // validate if requested song exists
    if (!song) throw new Error(`The song with id: ${id} does not exist.`);

    // remove the song
    await songRepository.remove({ id });

    // send success to client
    res.status(200).json({ status: `Deleted song with id: ${id}.` });
  } catch (error) {
    next(error.message);
  }
};
