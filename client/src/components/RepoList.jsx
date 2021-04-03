import React from 'react';
import RepoListEntry from './RepoListEntry.jsx';

const RepoList = (props) => (
  <div>
    {/* <h4> Repo List Component </h4> */}
      <h3>These are the {props.repos.length} top repos by pushed date.</h3>

    <table>
      <thead>
        <tr>
          <th>Repo Id</th>
          <th>Username</th>
          <th>Repo Name</th>
          <th>Last Pushed</th>
        </tr>
      </thead>

      <tbody>
        {
          props.repos.map((repo) => {
            return (
              <RepoListEntry repo={repo} key={repo._id} />
            )
          })
        }
      </tbody>
    </table>
  </div>
)

export default RepoList;