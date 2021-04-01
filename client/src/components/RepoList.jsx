import React from 'react';
import RepoListEntry from './RepoListEntry.jsx';
import Search from './Search.jsx';


const RepoList = (props) => (

  <div>
    <h4> Repo List Component </h4>
      There are {props.repos.length} repos.
    <ul>
      {
        props.repos.map((repo) => {
          return (
            <RepoListEntry repo={repo} key={repo._id} />
          )
        })
      }
    </ul>
  </div>
)

export default RepoList;