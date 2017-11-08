const request = require('request');
const config = require('../config.js');
const Promise = require('bluebird');

let getReposByUsername = (username) => {
  // TODO - Use the request module to request repos for a specific
  // user from the github API

  // The options object has been provided to help you out,
  // but you'll have to fill in the URL
  let options = {
    url: 'https://api.github.com',
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };

  // promisify request
  request = Promise.promisifyAll(request);

  // use request as a promise
  // return it so that it can have a .then chain to execute db.save on the result
  return request(options)
    .then(function (res) {
      const json = JSON.parse(res.body);
      console.log('json', json);
      return json;
    })
    .then(function (repoData) {
      // query the DB here to add the data
      return 'TODO: FIX ME\nIn github.js getReposByUsername';
    });
}

module.exports.getReposByUsername = getReposByUsername;
