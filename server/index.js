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

  // a promise that returns the repo data
  db.load()
    .then(function (data) {
      var cache = [];
      // NOTE the function which is the 2nd argument to JSON.stringify came from Stack Overflow
      // https://stackoverflow.com/questions/11616630/json-stringify-avoid-typeerror-converting-circular-structure-to-json
      // It handles the issue of stringifying a circular object
      res.end(JSON.stringify(data, function (key, value) {
        if ((typeof value === 'object') && (value !== null)) {
          if (cache.indexOf(value) !== -1) {
            return; // Circular reference found, discard key
          }
          cache.push(value); // Store value in our collection
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

