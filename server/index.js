const express = require('express');
const app = express();
const getReposByUsername = require('../helpers/github').getReposByUsername;
const db = require('../database/index');
const bodyParser = require('body-parser')

// allows me to get data from the request body for POST requests
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use(express.static(__dirname + '/../client/dist'));

app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database

  // use getReposByUsername then save
  getReposByUsername(req.body.username)
    .then(db.save);

  res.end(`you did a post request! with ${JSON.stringify(req.body)}`);
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos

  // stringifies and then returns the top 25 repos
  // TODO: handle the circular nature of the argument to stringify
  // res.end(JSON.stringify(db.load()));

  db.load()
    .then(function (data) {
      var cache = [];
      res.end(JSON.stringify(data, function (key, value) {
        if (typeof value === 'object' && value !== null) {
          if (cache.indexOf(value) !== -1) {
            // Circular reference found, discard key
            return;
          }
          // Store value in our collection
          cache.push(value);
        }
        return value;
      }, 2));
      cache = null; // Enable garbage collection
    });



});

let port = 1128;

app.listen(port, function () {
  console.log(`listening on port ${port}`);
});

