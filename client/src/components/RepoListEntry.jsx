import React from 'react';
import RepoList from './RepoList.jsx';
import Search from './Search.jsx';

const RepoListEntry = ({repo}) => (
  <li>
   <span> {repo.id} </span><span> <a href={repo.html_url}>HTML Url</a></span><span> {repo.repo_name} </span><span> <a href={repo.git_url}>GIT Url</a></span><span> {repo.owner_name} </span><span> ({repo.updated_at} Updated Date) </span>
  </li>
)
export default RepoListEntry;
