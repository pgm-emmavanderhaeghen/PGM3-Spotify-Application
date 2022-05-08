/*
 * API - User Controller
 */

import { getConnection } from 'typeorm';
import { checkPermissions } from '../../middleware/validation/authorisation.js';

// get all users
export const getUsers = async (req, res, next) => {
  try {
    // get permission
    checkPermissions([1], req.user);

    // get the user repository
    const userRepository = getConnection().getRepository('User');

    // send back to client
    res.status(200).json(await userRepository.find());
  } catch (error) {
    next(error.message);
  }
};

// get user by id
export const getUserById = async (req, res, next) => {
  try {
    // get permission
    checkPermissions([1], req.user);

    // catch the id from params
    const { id } = req.params;

    // validate incoming variables
    if (!id) throw new Error('Please specify an id to show.');

    // get the user repository
    const userRepository = getConnection().getRepository('User');

    // get the requested user
    const user = await userRepository.findOne({ id });

    // validate if requested user exists
    if (!user) throw new Error(`The user with id: ${id} does not exist.`);

    // send back to client
    res.status(200).json(await userRepository.find());
  } catch (error) {
    next(error.message);
  }
};

// create one user
export const postUser = async (req, res, next) => {
  try {
    // validate incoming body
    if (!req.body.email)
      throw new Error('Please provide a email for your user.');

    // get the repository from User
    const userRepository = getConnection().getRepository('User');

    // get interest (if this one exists)
    const user = await userRepository.findOne({
      where: { email: req.body.email },
    });

    // if user already exists
    if (user) {
      res.status(200).json({ status: `Posted user with id ${user.id}.` });
      return;
    }

    // save the user in the repository
    const insertedUser = await userRepository.save(req.body);

    res.status(200).json({ status: `Posted user with id ${insertedUser.id}.` });
  } catch (error) {
    next(error.message);
  }
};

// update one user
export const updateUser = async (req, res, next) => {
  try {
    // get permission
    checkPermissions([1, 2, 3], req.user);

    // validate incoming id
    if (!req.body.id)
      throw new Error('Please provide an id for the user you want to update.');

    // get the user repository
    const userRepository = getConnection().getRepository('User');

    // get the requested user
    const user = await userRepository.findOne({
      where: { id: req.body.id },
    });

    // validate if the requested user exists
    if (!user) throw new Error('The given user does not exist.');

    // create the updated user
    const updatedUser = { ...user, ...req.body };

    // save the updated user
    await userRepository.save(updatedUser);

    // send back to the client
    res.status(200).json({ status: `Updated user with id: ${req.body.id}.` });
  } catch (error) {
    next(error.message);
  }
};

// delete user by id
export const deleteUser = async (req, res, next) => {
  try {
    // get permission
    checkPermissions([1], req.user);

    // catch the id from params
    const { id } = req.params;

    // validate incoming variables
    if (!id) throw new Error('Please specify an id to remove.');

    // get the user repository
    const userRepository = getConnection().getRepository('User');

    // get the requested user
    const user = await userRepository.findOne({ id });

    // validate if requested user exists
    if (!user) throw new Error(`The user with id: ${id} does not exist.`);

    // remove the user
    await userRepository.remove({ id });

    // send success to client
    res.status(200).json({ status: `Deleted user with id: ${id}.` });
  } catch (error) {
    next(error.message);
  }
};
