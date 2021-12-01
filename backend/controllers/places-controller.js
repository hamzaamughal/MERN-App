const HttpErrors = require('../models/http-error');

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

const getPlacesById = (req, res) => {
  const place = DUMMY_PLACES.find((p) => p.id === req.params.pid);
  if (!place) {
    throw new HttpErrors('Could not find place', 404);
  }
  res.send({ place });
};

const getPlaceByUserId = (req, res) => {
  const places = DUMMY_PLACES.find((p) => p.creator === req.params.uid);
  res.send({ places });
};

const createPlace = (req, res) => {
  const { title, description, coordinates, address, creator } = req.body;
  const createdPlace = {
    id: 'p1',
    title,
    description,
    location: {
      lat: coordinates.lat,
      lng: coordinates.lng,
    },
    address,
    creator,
  };
  DUMMY_PLACES.push(createdPlace);
  res.status(201).json({ place: createdPlace });
};

const updatePlace = (req, res) => {
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

export {
  getPlacesById,
  getPlaceByUserId,
  createPlace,
  updatePlace,
  deletePlace,
};
