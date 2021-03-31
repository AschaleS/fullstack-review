const axios = require('axios');
const config = require('../config.js');
const request = require('request');

let getReposByUsername = (username, callback) => {
  let url = `https://api.github.com/users/${username}/repos`;
  // TODO - Use the axios module to request repos for a specific
  // user from the github API

  // The options object has been provided to help you out,
  // but you'll have to fill in the URL
  let options = {
    url: url,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };
  // request(options, callback);
  request.get(options, (err, res, body) => {
    if (err) {
      return console.log(err);
    } else {
      console.log(body);
    };
  });

}

module.exports.getReposByUsername = getReposByUsername;