let request = require('request');
const Promise = require('bluebird');

let getReposByUsername = (username) => {
  let config = {};
  config.TOKEN = 'default value that should be overwrote';

  console.log(`\nprocess.env.TOKEN: ${process.env.TOKEN}\n`);

  if ((process.env.TOKEN !== undefined) && (process.env.TOKEN !== null)) {
    // get the token from the enviornment variable

    console.log('\nGetting TOKEN from process.env.TOKEN\n');

    config = {};
    config.TOKEN = process.env.TOKEN;
  } else {

    console.log(`\nGetting TOKEN from config.js\n`);

    config = require('../config.js');
  }

  console.log(`config.token: ${config.TOKEN}`)

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

      console.log(`\nThe data from github is:\n${JSON.stringify(res, undefined, 2)}\n`);

      return JSON.parse(res.body); // pass along the data as a JSON
    });
}

module.exports.getReposByUsername = getReposByUsername;
