// express server running on port 5000
var express = require('express');
const HttpErrors = require('./models/http-error');
const mongoose = require('mongoose');
var port = process.env.PORT || 5000;

var app = express();

app.use(express.json());

const placesRoutes = require('./routes/places-routes');
const usersRoutes = require('./routes/users-routes');

app.use('/api/places', placesRoutes);
app.use('/api/users', usersRoutes);

app.use((req, res, next) => {
  const error = new HttpErrors('Could not find this route.', 404);
  throw error;
});

// start express server
mongoose
  .connect(
    'mongodb+srv://fullstack:fullstack@cluster0.vzvwk.mongodb.net/places?retryWrites=true&w=majority'
  )
  .then(() => {
    app.listen(port, function () {
      console.log('Server started on port ' + port);
    });
  })
  .catch((err) => {
    console.log(err);
  });
