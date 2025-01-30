import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

const protect = asyncHandler(async (req, res, next) => {
  let token;

  // token = req.cookies.jwt;

  if (req.cookies) {
    token = req.cookies.jwt;
  }

  if (token) {
    try {
      // verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // get user from the token
      req.user = await User.findById(decoded.userId).select('-password');

      next();
    } catch (err) {
      console.log(err);
      res.status(401);
      throw new Error('Unauthorized: Invalid token');
    }
  } else {
    res.status(401);
    throw new Error('Unauthorized: Token required');
  }
});

export { protect };
