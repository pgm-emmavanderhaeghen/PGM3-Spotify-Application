/*
 * The delete an object controller
 */

import { getConnection } from 'typeorm';
import { checkPermissions } from '../../middleware/validation/authorisation.js';

export const deleteObject = async (entityName, req, res, next) => {
  try {
    // get permission
    checkPermissions([1], req.user);

    // sets the name for output
    const outputEntityName = entityName.toLowerCase();

    // catch the id from params
    const { id } = req.params;
    console.log(id);

    // validate incoming variables
    if (!id) throw new Error('Please specify an id to remove.');

    // get the user repository
    const userRepository = getConnection().getRepository(entityName);

    // check if the id exists
    const object = await userRepository.findOne({
      where: { id },
    });

    // validate if requested user exists
    if (!object)
      throw new Error(`The ${outputEntityName} with id: ${id} does no exist.`);

    // remove the user
    await userRepository.remove(object);

    // send success to client
    res
      .status(200)
      .json({ status: `Deleted ${outputEntityName} with id: ${id}.` });
  } catch (error) {
    next(error.message);
  }
};
