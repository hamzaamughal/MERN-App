const {
  getPlacesById,
  getPlaceByUserId,
  createPlace,
  updatePlace,
  deletePlace,
} = require('../controllers/places-controller');

const router = require('express').Router();

router.get('/:pid', getPlacesById);

router.get('/user/:uid', getPlaceByUserId);

router.post('/', createPlace);

router.patch('/:pid', updatePlace);

router.delete('/:pid', deletePlace);

module.exports = router;
