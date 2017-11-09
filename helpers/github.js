let request = require('request');
const config = require('../config.js');
const Promise = require('bluebird');

let getReposByUsername = (username) => {
  // TODO - Use the request module to request repos for a specific
  // user from the github API

  // The options object has been provided to help you out,
  // but you'll have to fill in the URL
  let options = {
    url: `https://api.github.com/users/${username}`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };

  console.log('\n\n\nURL\n', options.url, '\n\n');

  request = Promise.promisify(request);

  return request(options)
    .then(function (res) {
      const json = JSON.parse(res.body);

      console.log('\n\nJSON response from GitHub\n', json, '\n\n');

      return json; // pass along the data as a JSON
    });
}

module.exports.getReposByUsername = getReposByUsername;
