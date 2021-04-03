const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log("Connection Successful!");
});

  let repoSchema = new mongoose.Schema({
    id: { type: Number, unique: true, index: true},
    repo_name: { type: String, required: true },
    user_name: { type: String, required: true },
    owner_id: { type: Number, required: true },
    git_url: { type: String, required: true },
    html_url: { type: String, required: true },
    pushed_at: { type: Date, required: true }
  });

  let Repo = mongoose.model('Repo', repoSchema);
  Repo.createIndexes();

  let save = (repos, callback) => {
    let repoCollection = [];

    for (let i = 0; i < repos.length; i++) {
      let repo = repos[i];

      let newRepo = new Repo({
        id: repo.id,
        repo_name: repo.name,
        user_name: repo.owner.login,
        owner_id: repo.owner.id,
        git_url: repo.git_url,
        html_url: repo.html_url,
        pushed_at: repo.pushed_at
      });
      repoCollection.push(newRepo);

      // newRepo.save(function (err, request) {
      //   if (err) {
      //     callback(err);
      //   } else {
      //     callback("Successfully inserted ", request);
      //   }
      // });
    }

    const options = { ordered: true };
    Repo.insertMany(repoCollection, options, callback);

  }

  let getTop25Repos = (callback) => {
    Repo.find({}).limit(25).sort({pushed_at: -1}).exec((err, res) => {
     // callback('Top 25 query', res);
     callback(res);
    });
  }


module.exports = { save, getTop25Repos };