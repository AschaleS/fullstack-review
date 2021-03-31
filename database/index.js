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

  }



module.exports.save = save;