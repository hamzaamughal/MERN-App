const { validationResult } = require('express-validator');
const User = require('../models/User');
const HttpErrors = require('../models/http-error');

const DUMMY_USERS = [
  {
    id: 1,
    name: 'John Doe',
    email: 'test@test.com',
    password: 'test',
  },
];

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({}, '-password');
    res.json({ users: users.map((user) => user.toObject({ getters: true })) });
  } catch (err) {
    next(new HttpErrors('Fetching users failed, please try again later', 500));
  }
};

const signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpErrors('Invalid inputs passed, please check your data', 422)
    );
  }
  const { name, email, password, places } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    const error = new HttpErrors(
      'Signing up failed, please try again later',
      500
    );
    return next(error);
  }
  if (existingUser) {
    const error = new HttpErrors('User exists already, please login', 422);
    return next(error);
  }

  const createdUser = new User({
    name,
    email,
    image: 'https://i.pravatar.cc/300?u=a042581f4e29026704d',
    password,
    places,
  });
  try {
    await createdUser.save();
  } catch (err) {
    const error = new HttpErrors(
      'Signing up failed, please try again later',
      500
    );
    return next(error);
  }
  res.status(200).json({ createdUser });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    const error = new HttpErrors(
      'Logging in failed, please try again later',
      500
    );
    return next(error);
  }
  if (!existingUser || existingUser.password !== password) {
    const error = new HttpErrors(
      'Invalid credentials, could not log you in',
      401
    );
    return next(error);
  }
  try {
    isMatch = await existingUser.matchPassword(password);
  } catch (err) {
    const error = new HttpErrors(
      'Logging in failed, please try again later',
      500
    );
    return next(error);
  }
  if (isMatch) {
    res.json({ message: 'Logged in successfully' });
    res.status(200).json({ existingUser });
  }
};

module.exports = {
  getUsers,
  signup,
  login,
};
