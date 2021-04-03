import React from 'react';
import RepoList from './RepoList.jsx';
import Search from './Search.jsx';

const RepoListEntry = ({ repo }) => (


  <tr>
    <td> {repo.id} </td>
    <td> {repo.user_name} </td>
    <td> <a href={repo.html_url} > {repo.repo_name} </a></td>
    <td> {repo.pushed_at} </td>
  </tr>

)
export default RepoListEntry;

