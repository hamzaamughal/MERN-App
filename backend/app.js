// express server running on port 5000
var express = require('express');
var port = process.env.PORT || 5000;

var app = express();

const placesRoutes = require('./routes/places-routes');

app.use('/api/places', placesRoutes);

// start express server
app.listen(port, function () {
  console.log('Server started on port ' + port);
});
