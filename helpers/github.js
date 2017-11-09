let request = require('request');
const Promise = require('bluebird');

let getReposByUsername = (username) => {
  if ((process.env.TOKEN !== undefined) && (process.env.TOKEN !== null)) {
    // get the token from the enviornment variable
    const config = {};
    config.token = process.env.TOKEN;
  } else {
    const config = require('../config.js');
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
