const mongoose = require('mongoose');

// There is a deprication warning in the terminal, so I
// set the promise library for mongoose to be bluebird
mongoose.Promise = require('bluebird');

// added , { useMongoClient: true } to get rid of a deprication warning for mongoose.open
mongoose.connect('mongodb://localhost/fetcher', { useMongoClient: true });


const otherRepoSchema = mongoose.Schema({
  login: String,
  id: { type: Number, unique: true, dropDups: true },
  avatar_url: String,
  gravatar_id: String,
  url: String,
  html_url: String,
  followers_url: String,
  following_url: String,
  gists_url: String,
  starred_url: String,
  subscribers_url: String,
  organizations_url: String,
  repos_url: String,
  events_url: String,
  received_events_url: String,
  type: String,
  site_admin: Boolean,
  name: String,
  company: String,
  blog: String,
  location: String,
  bio: String,
  public_repos: Number,
  public_gists: Number,
  followers: Number,
  following: Number,
  created_at: String,
  updated: String
});


let repoSchema = mongoose.Schema({
  // Because the id is a unique value and
  // I set unique and dropDups to true,
  // there should be no duplicate repos
  id: { type: Number, unique: true, dropDups: true },
  name: String,
  full_name: String,
  owner: {
    login: String,
    id: Number,
    avatar_url: String,
    gravatar_id: String,
    url: String,
    html_url: String,
    followers_url: String,
    following_url: String,
    gists_url: String,
    starred_url: String,
    subscriptions_url: String,
    organizations_url: String,
    repos_url: String,
    events_url: String,
    received_events_url: String,
    type: String,
    site_admin: Boolean
  },
  private: Boolean,
  html_url: String,
  description: String,
  fork: Boolean,
  url: String,
  forks_url: String,
  keys_url: String,
  collaborators_url: String,
  teams_url: String,
  hooks_url: String,
  issue_events_url: String,
  events_url: String,
  assignees_url: String,
  branches_url: String,
  tags_url: String,
  blobs_url: String,
  git_tags_url: String,
  git_refs_url: String,
  trees_url: String,
  statuses_url: String,
  languages_url: String,
  stargazers_url: String,
  contributors_url: String,
  subscribers_url: String,
  subscription_url: String,
  commits_url: String,
  git_commits_url: String,
  comments_url: String,
  issue_comment_url: String,
  contents_url: String,
  compare_url: String,
  merges_url: String,
  archive_url: String,
  downloads_url: String,
  issues_url: String,
  pulls_url: String,
  milestones_url: String,
  notifications_url: String,
  labels_url: String,
  releases_url: String,
  deployments_url: String,
  created_at: String,
  updated_at: String,
  pushed_at: String,
  git_url: String,
  ssh_url: String,
  clone_url: String,
  svn_url: String,
  homepage: String,
  size: Number,
  stargazers_count: Number,
  language: String,
  has_issues: Boolean,
  has_downloads: Boolean,
  has_wiki: Boolean,
  has_pages: Boolean,
  forks_count: Number,
  mirror_url: String,
  open_issues_count: Number,
  forks: Number,
  open_issues: Number,
  watchers: Number,
  default_branch: String
});

// const Repo = mongoose.model('Repo', repoSchema);
const Repo = mongoose.model('Repo', otherRepoSchema);

const save = (repoData) => {
  // arr holds the repo(s)
  const arr = [];
  if (Array.isArray(repoData)) { // if this is an array of repos
    for (let i = 0; i < repoData.length; i++) {
      arr.push(new Repo(repoData[i]));
    }
  } else { // if this is just a single repo
    arr.push(new Repo(repoData));
  }

  // save any repos
  for (let i = 0; i < arr.length; i++) {
    arr[i].save()
      .then(function (repo) {
        console.log(`The model with the values 'login' = ${repo.login} && name = ${repo.name} has been saved`);
      })
      .catch((e) => {
        console.log('ERROR!\n  In db.save()\n', e);
      })
  }
}

const load = () => {
  // Set the query to find all fields, sort by their forks, only get the top 25, then execute the query
  // return Repo.find().sort({ forks: -1 }).limit(25).exec((err, result) => {
  //   console.log('arguments', arguments);
  //   return result;
  // });
  return Repo.find().exec()
    .then(function (data) {
      return data;
    })
    .catch((e) => {
      console.log('\nERROR IN LOAD\n', e);
    });
};

module.exports = { save, load };




