const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// set up express app
const app = express();

// connect to mongodb
mongoose.connect('mongodb://localhost/ninjago');
mongoose.Promise = global.Promise;

app.use(express.static('public'));

// parses request body to the request object
app.use(bodyParser.json());

// initailize routes
app.use('/api', require('./routes/api'));

// error handling middleware
app.use(function(err, req, res, next) {
    // console.log(err);
    res.status(422).send({error: err.message});
});

//listen for requests
app.listen(process.env.port || 4000, function() {
    console.log('now listening for requests');
})

