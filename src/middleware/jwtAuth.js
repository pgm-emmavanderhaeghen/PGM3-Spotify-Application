/* 
The JWT authentication middleware
*/

import jwt from 'jsonwebtoken';

export const jwtAuth = (req, res, next) => {
  const token = req.body?.token ?? req.cookies?.token;
  const isApi = req.path.includes('/api');

  try {
    if (!token) throw new Error('No token given');
    req.user = jwt.verify(token, process.env.TOKEN_SALT);
    next();
  } catch (error) {
    res.clearCookie('token');
    if (isApi)
      return next(
        'Please POST "/api/login" with "username" and "password", for your login token!'
      );
    return res.redirect(isApi ? `/api/login` : 'login');
  }
};
