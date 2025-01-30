import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';
import bcrypt from 'bcryptjs';
import Record from '../models/recordModel.js';

// @desc: Get all users
// @route: GET /api/users
// @access: Public
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
  res.status(200).json(users);
});

// @desc: Add a user
// @route: POST /api/users
// @access: Public
const addUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // check if the inputs are empty
  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Please fill all fields');
  }

  // check if the user exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  // hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // create a new user
  const user = await User.create({ name, email, password: hashedPassword });

  if (user) {
    generateToken(res, user._id);

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc: login a user
// @route: POST /api/users/login
// @access: Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // fill all the fields
  if (!email || !password) {
    res.status(400);
    throw new Error('Please add all fields');
  }

  const user = await User.findOne({ email });

  // check if the user exists
  // compare input password to password saved on database
  if (user && (await bcrypt.compare(password, user.password))) {
    generateToken(res, user._id);

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error('Invalid credentials');
  }
});

// @desc: logout a user
// @route: POST /api/users/logout
// @access: Public
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: 'User logged out' });
});

// @desc: get user profile
// @route: GET /api/users/profile
// @access: Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc: update user profile
// @route: PUT /api/users/profile
// @access: Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      // hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);

      user.password = hashedPassword;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc: delete a user
// @route: DELETE /api/users/:id
// @access: Private
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  // check if the user exists
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  await user.deleteOne();
  await Record.deleteMany({ user: user });

  res.status(200).json(user);
});

export {
  getUsers,
  addUser,
  deleteUser,
  loginUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
};
