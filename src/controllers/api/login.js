/*
 * API - User Controller
 */

import { getConnection } from 'typeorm';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// get all users
export const postApiLogin = async (req, res, next) => {
  try {
    // get the user repo
    const userRepository = getConnection().getRepository('User');

    // validate if the user exists
    const user = await userRepository.findOne({
      where: { userName: req.body.username },
      relations: ['roles'],
    });

    // check if we found a user
    if (!user) throw new Error('Gebruiker is onbekend');

    // check if incoming password is equal with the one in our database
    const isEqual = bcrypt.compareSync(req.body.password, user.password);

    // if not equal, send out some errors
    if (!isEqual) throw new Error('Wachtwoord is onjuist.');

    // create a webtoken
    const token = jwt.sign(
      {
        userId: user.id,
        username: user.userName,
        password: user.password,
        role: user.roles.id,
      },
      process.env.TOKEN_SALT,
      { expiresIn: '1h' }
    );

    // add the cookie to the response
    res.json({ token });
  } catch (error) {
    next(error.message);
  }
};
