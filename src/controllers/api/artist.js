/*
 * API - Artist Controller
 */

import { getConnection } from 'typeorm';
import { checkPermissions } from '../../middleware/validation/authorisation.js';

// get all artists
export const getArtists = async (req, res, next) => {
  try {
    // get permission
    checkPermissions([1, 2, 3], req.user);

    // get the artist repository
    const artistRepository = getConnection().getRepository('Artist');

    // send back to client
    res.status(200).json(await artistRepository.find());
  } catch (error) {
    next(error.message);
  }
};

// get artist by id
export const getArtistById = async (req, res, next) => {
  try {
    // get permission
    checkPermissions([1, 2, 3], req.user);

    // catch the id from params
    const { id } = req.params;

    // validate incoming variables
    if (!id) throw new Error('Please specify an id to show.');

    // get the artist repository
    const artistRepository = getConnection().getRepository('Artist');

    // get the requested artist
    const artist = await artistRepository.findOne({ id });

    // validate if requested artist exists
    if (!artist) throw new Error(`The artist with id: ${id} does not exist.`);

    // send back to client
    res.status(200).json(await artistRepository.find());
  } catch (error) {
    next(error.message);
  }
};

// create one artist
export const postArtist = async (req, res, next) => {
  try {
    // get permission
    checkPermissions([1], req.user);

    // validate incoming body
    if (!req.body.name)
      throw new Error('Please provide a name for your artist.');

    // get the repository from artist
    const artistRepository = getConnection().getRepository('Artist');

    // get interest (if this one exists)
    const artist = await artistRepository.findOne({
      where: { name: req.body.name },
    });

    // if artist already exists
    if (artist) {
      res.status(200).json({ status: `Posted artist with id ${artist.id}.` });
      return;
    }

    // save the artist in the repository
    const insertedArtist = await artistRepository.save(req.body);

    res
      .redirect('/')
      .status(200)
      .json({ status: `Posted artist with id ${insertedArtist.id}.` });
  } catch (error) {
    next(error.message);
  }
};

// update one artist
export const updateArtist = async (req, res, next) => {
  try {
    // get permission
    checkPermissions([1, 2], req.user);
    // validate incoming id
    if (!req.body.id)
      throw new Error(
        'Please provide an id for the artist you want to update.'
      );

    // get the artist repository
    const artistRepository = getConnection().getRepository('Artist');

    // get the requested artist
    const artist = await artistRepository.findOne({
      where: { id: req.body.id },
    });

    // validate if the requested artist exists
    if (!artist) throw new Error('The given artist does not exist.');

    // create the updated artist
    const updatedArtist = { ...artist, ...req.body };

    // save the updated artist
    await artistRepository.save(updatedArtist);

    // send back to the client
    res.status(200).json({ status: `Updated artist with id: ${req.body.id}.` });
  } catch (error) {
    next(error.message);
  }
};

// delete artist by id
export const deleteArtist = async (req, res, next) => {
  try {
    // get permission
    checkPermissions([1], req.user);

    // catch the id from params
    const { id } = req.params;

    // validate incoming variables
    if (!id) throw new Error('Please specify an id to remove.');

    // get the artist repository
    const artistRepository = getConnection().getRepository('Artist');

    // get the requested artist
    const artist = await artistRepository.findOne({ id });

    // validate if requested artist exists
    if (!artist) throw new Error(`The artist with id: ${id} does not exist.`);

    // remove the artist
    await artistRepository.remove({ id });

    // send success to client
    res.status(200).json({ status: `Deleted artist with id: ${id}.` });
  } catch (error) {
    next(error.message);
  }
};
