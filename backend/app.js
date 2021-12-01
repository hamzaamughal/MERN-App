// express server running on port 5000
var express = require('express');
const HttpErrors = require('./models/http-error');
var port = process.env.PORT || 5000;

var app = express();

app.use(express.json());

const placesRoutes = require('./routes/places-routes');

app.use('/api/places', placesRoutes);

app.use((req, res, next) => {
  const error = new HttpErrors('Could not find this route.', 404);
  throw error;
});

// start express server
app.listen(port, function () {
  console.log('Server started on port ' + port);
});
