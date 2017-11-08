const express = require('express');
let app = express();
const getReposByUsername = require('../helpers/github').getReposByUsername;
const db = require('../database/index');

app.use(express.static(__dirname + '/../client/dist'));

app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database

  // use getReposByUsername then save
  getReposByUsername(req.body.username)
    .then(db.save);

});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos


  // stringifies and then returns the top 25 repos
  res.end(JSON.stringify(db.load()));
});

let port = 1128;

app.listen(port, function () {
  console.log(`listening on port ${port}`);
});

