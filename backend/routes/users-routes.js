const { getUsers, signup, login } = require('../controllers/users-controller');
const { check } = require('express-validator');

const router = require('express').Router();

router.get('/', getUsers);

router.post(
  '/signup',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').normalizeEmail().isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 }),
  ],
  signup
);
router.post('/login', login);

module.exports = router;
