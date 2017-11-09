let request = require('request');
const config = require('../config.js');
const Promise = require('bluebird');

let getReposByUsername = (username) => {
  if (config.token !== undefined) {
    // it's there, so do nothing
  } else {
    config.token = process.env.TOKEN;
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
