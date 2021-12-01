const { validationResult } = require('express-validator');

const DUMMY_USERS = [
  {
    id: 1,
    name: 'John Doe',
    email: 'test@test.com',
    password: 'test',
  },
];

const getUsers = (req, res) => {
  res.status(200).json({ users: DUMMY_USERS });
};

const signup = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpErrors('Invalid inputs passed, please check your data', 422);
  }
  const { name, email, password } = req.body;
  const user = {
    id: DUMMY_USERS.length + 1,
    name,
    email,
    password,
  };
  DUMMY_USERS.push(user);
  res.status(200).json({ user });
};

const login = (req, res) => {
  const { email, password } = req.body;
  const user = DUMMY_USERS.find(
    (user) => user.email === email && user.password === password
  );
  if (user) {
    res.status(200).json({ user });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
};

module.exports = {
  getUsers,
  signup,
  login,
};
