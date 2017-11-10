import React from 'react';

const RepoList = (props) => (
  <div>
    <h4> Repo List Component </h4>
    There are {props.repos.length} repos and {props.userCount} users.
  </div>
);

export default RepoList;
