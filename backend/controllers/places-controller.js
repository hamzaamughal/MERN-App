const HttpErrors = require('../models/http-error');
const { validationResult } = require('express-validator');

const getCoordsForAddress = require('../util/location');
const Place = require('../models/Place');

const DUMMY_PLACES = [
  {
    id: 'p1',
    title: 'Place 1',
    description: 'Description 1',
    location: {
      lat: 1,
      lng: 1,
    },
    address: 'address1',
    creator: 'user1',
  },
];

const getPlacesById = async (req, res) => {
  try {
    const place = await Place.findById(req.params.pid);
    if (!place) {
      throw new HttpErrors('Could not find place', 404);
    }
    res.status(200).json({ place });
  } catch (error) {
    throw new HttpErrors('Cannot get place', 422);
  }
};

const getPlaceByUserId = (req, res) => {
  const places = DUMMY_PLACES.find((p) => p.creator === req.params.uid);
  res.send({ places });
};

const createPlace = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    next(new HttpErrors('Invalid inputs passed, please check your data', 422));
  }
  const { title, description, coordinates, address, creator } = req.body;

  // let coordinates;
  try {
    await getCoordsForAddress(address);
  } catch (error) {
    throw new HttpErrors('Cannot get coordinates for the address', 422);
  }

  const createdPlace = new Place({
    title,
    description,
    address,
    location: coordinates,
    image:
      'https://images.unsplash.com/photo-1588854567984-c8f9c9c8d9e0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
    creator,
  });
  try {
    await createdPlace.save();
    res.status(201).json({ place: createdPlace });
  } catch (error) {
    throw new HttpErrors('Cannot create place', 422);
  }
};

const updatePlace = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpErrors('Invalid inputs passed, please check your data', 422);
  }
  const { title, description } = req.body;
  const place = { ...DUMMY_PLACES.find((p) => p.id === req.params.pid) };
  const placeIndex = DUMMY_PLACES.findIndex((p) => p.id === req.params.pid);
  if (!place) {
    throw new HttpErrors('Could not find place', 404);
  }
  place.title = title;
  place.description = description;
  DUMMY_PLACES[placeIndex] = place;
  res.status(200).json({ place });
};

const deletePlace = (req, res) => {
  const placeIndex = DUMMY_PLACES.findIndex((p) => p.id === req.params.pid);
  if (!placeIndex) {
    throw new HttpErrors('Could not find place', 404);
  }
  DUMMY_PLACES.splice(placeIndex, 1);
  res.status(200).json({ message: 'Deleted place' });
};

module.exports = {
  getPlacesById,
  getPlaceByUserId,
  createPlace,
  updatePlace,
  deletePlace,
};
