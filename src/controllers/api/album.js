/*
 * API - Album Controller
 */

import { getConnection } from 'typeorm';
import { checkPermissions } from '../../middleware/validation/authorisation.js';

// get all albums
export const getAlbums = async (req, res, next) => {
  try {
    // get permission
    checkPermissions([1, 2, 3], req.user);

    // get the album repository
    const albumRepository = getConnection().getRepository('Album');

    // send back to client
    res.status(200).json(await albumRepository.find());
  } catch (error) {
    next(error.message);
  }
};

// get album by id
export const getAlbumById = async (req, res, next) => {
  try {
    // get permission
    checkPermissions([1, 2, 3], req.user);

    // catch the id from params
    const { id } = req.params;

    // validate incoming variables
    if (!id) throw new Error('Please specify an id to show.');

    // get the album repository
    const albumRepository = getConnection().getRepository('Album');

    // get the requested album
    const album = await albumRepository.findOne({ id });

    // validate if requested album exists
    if (!album) throw new Error(`The album with id: ${id} does not exist.`);

    // send back to client
    res.status(200).json(await albumRepository.find());
  } catch (error) {
    next(error.message);
  }
};

// create one album
export const postAlbum = async (req, res, next) => {
  try {
    // get permission
    checkPermissions([1], req.user);

    // validate incoming body
    if (!req.body.name)
      throw new Error('Please provide a name for your album.');

    // get the repository from album
    const albumRepository = getConnection().getRepository('Album');

    // get interest (if this one exists)
    const album = await albumRepository.findOne({
      where: { name: req.body.name },
    });

    // if album already exists
    if (album) {
      res.status(200).json({ status: `Posted album with id ${album.id}.` });
      return;
    }

    // save the album in the repository
    const insertedAlbum = await albumRepository.save(req.body);

    res
      .redirect('/artist')
      .status(200)
      .json({ status: `Posted album with id ${insertedAlbum.id}.` });
  } catch (error) {
    next(error.message);
  }
};

// update one album
export const updateAlbum = async (req, res, next) => {
  try {
    // get permission
    checkPermissions([1, 2], req.user);

    // validate incoming id
    if (!req.body.id)
      throw new Error('Please provide an id for the album you want to update.');

    // get the album repository
    const albumRepository = getConnection().getRepository('Album');

    // get the requested album
    const album = await albumRepository.findOne({
      where: { id: req.body.id },
    });

    // validate if the requested album exists
    if (!album) throw new Error('The given album does not exist.');

    // create the updated album
    const updatedAlbum = { ...album, ...req.body };

    // save the updated album
    await albumRepository.save(updatedAlbum);

    // send back to the client
    res.status(200).json({ status: `Updated album with id: ${req.body.id}.` });
  } catch (error) {
    next(error.message);
  }
};

// delete album by id
export const deleteAlbum = async (req, res, next) => {
  try {
    // get permission
    checkPermissions([1], req.user);

    // catch the id from params
    const { id } = req.params;

    // validate incoming variables
    if (!id) throw new Error('Please specify an id to remove.');

    // get the album repository
    const albumRepository = getConnection().getRepository('Album');

    // get the requested album
    const album = await albumRepository.findOne({ id });

    // validate if requested album exists
    if (!album) throw new Error(`The album with id: ${id} does not exist.`);

    // remove the album
    await albumRepository.remove({ id });

    // send success to client
    res.status(200).json({ status: `Deleted album with id: ${id}.` });
  } catch (error) {
    next(error.message);
  }
};
