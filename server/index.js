const express = require('express');
const bodyParser = require('body-parser');
const db = require('../database/index.js')
const morgan = require('morgan');
const { getReposByUsername } = require('../helpers/github.js');
const { save, getTop25Repos, getUniqueUsernames } = require('../database/index.js');
let app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'));


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
  getUniqueUsernames((usernames) => {
    var updateDatabase = new Promise((resolve, reject) => {
      usernames.forEach((username, index, array) => {
        getReposByUsername(username, (result) => {
          save(result, (saveResult) => {
            if (index === array.length - 1) resolve();
          });
        });
      })
    });

    updateDatabase.then(() => {
      getTop25Repos((results) => {
        res.send(results);
      })
    });

  });
});

let port = process.env.port || 1128;

app.listen(port, function () {
  console.log(`listening on port ${port}`);
});


