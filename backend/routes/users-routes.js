const {} = require('../controllers/users-controller');

const router = require('express').Router();

router.get('/');

router.post('/signup');
router.post('/login');

module.exports = router;
