const express = require('express');
const bodyParser = require('body-parser');
const { getReposByUsername } = require('../helpers/github.js');
const { save, getTop25Repos } = require('../database/index.js');
let app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

app.get('/', function(req, res) {
  console.log('#########################')
  res.redirect('/repos');
});

app.post('/repos', function (req, res) {
  let username = req.body.term;
  getReposByUsername(username, save);
  res.status(201).send();
  res.end();
});


let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

