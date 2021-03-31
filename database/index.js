const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log("Connection Successful!");
});

  let repoSchema = new mongoose.Schema({
    id: Number,
    repo_name: String,
    owner_name: String,
    owner_id: Number,
    git_url: String,
    html_url: String,
    updated_at: Date
  });

  let Repo = mongoose.model('Repo', repoSchema);

  let save = (repos) => {
    let repoCollection = [];

    for (let i = 0; i <= repos.length; i++) {
      let repo = repos[i];

      let newRepo = new Repo({
        id: repo.id,
        repo_name: repo.name,
        owner_name: repo.owner.login,
        owner_id: repo.owner.id,
        git_url: repo.git_url,
        html_url: repo.html_url,
        updated_at: repo.updated_at
      });
      repoCollection.push(newRepo);

      newRepo.save(function (err, request) {
        if (err) {
          return console.error(err);
        } else {
          return console.log("Successfully inserted ", request);
        }
      });
    }
  }

module.exports = { save, getTop25Repos };