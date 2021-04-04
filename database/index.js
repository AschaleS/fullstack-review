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
    var dbOperations = []

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

      dbOperations.push(
        {
            updateOne: {
                filter: { id: newRepo.id },
                update: {
                    $set: {"id": newRepo.id, "repo_name": newRepo.repo_name, "user_name": newRepo.user_name, "owner_id": newRepo.owner_id, "git_url": newRepo.git_url, "html_url": repo.html_url, "pushed_at": repo.pushed_at },
                },
                upsert: true
            }
        }
    )
    }


    Repo.bulkWrite(dbOperations, { ordered: false }, callback);

  }

  let getTop25Repos = (callback) => {
    Repo.find({}).limit(25).sort({pushed_at: -1}).exec((err, res) => {
      if(err){
        console.log(err);
      }
     callback(res);
    });
  }

  let getUniqueUsernames = (callback) => {
    Repo.distinct("user_name").exec((err, res) => {
      if(err){
        console.log(err);
      }
     callback(res);
    });
  }


module.exports = { save, getTop25Repos, getUniqueUsernames };