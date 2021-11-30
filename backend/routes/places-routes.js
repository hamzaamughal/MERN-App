const router = require('express').Router();

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

router.get('/:pid', (req, res) => {
  const place = DUMMY_PLACES.find((p) => p.id === req.params.pid);
  res.send({ place });
});

router.get('/user/:uid', (req, res) => {
  const places = DUMMY_PLACES.find((p) => p.creator === req.params.uid);
  res.send({ places });
});

module.exports = router;
