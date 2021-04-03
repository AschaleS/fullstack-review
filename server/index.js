const express = require('express');
const bodyParser = require('body-parser');
const db = require('../database/index.js')
const { getReposByUsername } = require('../helpers/github.js');
const { save, getTop25Repos } = require('../database/index.js');
let app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

app.get('/', function(req, res) {
  res.redirect('/repos');
});


// app.get('*', function(req, res) {
//   res.sendFile(__dirname + '/../client/dist')
// })

app.post('/repos', function (req, res) {
  let username = req.body.term;
  getReposByUsername(username, (result) => {
    save(result, (saveResult) => {
      res.status(201).send();
      res.end();
    });
  });
});

app.get('/repos', function (req, res) {
  getTop25Repos((results) => {
    res.send(results);
  })
});

let port = process.env.port || 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

// let port = process.env.PORT;
// if (port == null || port == "") {
//   port = 8000;
// }
// app.listen(port);

