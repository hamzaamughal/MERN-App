const {
  getPlacesById,
  getPlaceByUserId,
  createPlace,
  updatePlace,
  deletePlace,
} = require('../controllers/places-controller');
const { check } = require('express-validator');

const router = require('express').Router();

router.get('/:pid', getPlacesById);

router.get('/user/:uid', getPlaceByUserId);

router.post(
  '/',
  [
    check('title').not().isEmpty(),
    check('description').isLength({ min: 5 }),
    check('address').not().isEmpty(),
  ],
  createPlace
);

router.patch(
  '/:pid',
  [check('title').not().isEmpty(), check('description').isLength({ min: 5 })],
  updatePlace
);

router.delete('/:pid', deletePlace);

module.exports = router;
