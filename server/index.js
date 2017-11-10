const express = require('express');
const app = express();
const getReposByUsername = require('../helpers/github').getReposByUsername;
const db = require('../database/index');
const bodyParser = require('body-parser');
const util = require('util');

// allows me to get data from the request body for POST requests
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use(express.static(__dirname + '/../client/dist'));

app.post('/repos', function (req, res) {
  // gets all repos for that username
  getReposByUsername(req.body.username)
    .then(db.save) // saves the repos
    .then(db.load) // gets all saved repos
    .then(function (data) { // responds with all saved repos
      res.end(JSON.stringify(data, undefined, 2));
    });
});

app.get('/repos', function (req, res) {
  // a promise that returns the repo data
  db.load()
    .then(function (data) {
      res.end(JSON.stringify(data, undefined, 2));
    });
});

// set the port with an enviornment variable
const port = process.env.PORT || 1128;

app.listen(port, function () {
  console.log(`listening on port ${port}`);
});

