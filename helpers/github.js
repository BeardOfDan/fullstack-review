let request = require('request');
const Promise = require('bluebird');

let getReposByUsername = (username) => {
  let config = {};
  config.TOKEN = 'default value that should be overwrote';

  if ((process.env.TOKEN !== undefined) && (process.env.TOKEN !== null)) {
    // get the token from the enviornment variable
    config = {};
    config.TOKEN = process.env.TOKEN;
  } else {
    config = require('../config.js');
  }

  let options = {
    url: `https://api.github.com/users/${username}/repos`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };

  // promisify request
  request = Promise.promisify(request);

  // return a promise to allow the return value to be chained with another promise, like db.save
  return request(options)
    .then(function (res) {
      return JSON.parse(res.body); // pass along the data as a JSON
    });
}

module.exports.getReposByUsername = getReposByUsername;
