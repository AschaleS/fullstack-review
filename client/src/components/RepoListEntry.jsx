import React from 'react';
import RepoList from './RepoList.jsx';
import Search from './Search.jsx';

const RepoListEntry = ({repo}) => (
  <li>
   <span> {repo.id} </span>  <span>{repo.html_url}</span><span> <a href={repo.html_url}>{repo.repo_name}</a></span><span>{repo.git_url}</span><span> {repo.user_name} </span><span> ({repo.updated_at} Updated Date) </span>
  </li>
)
export default RepoListEntry;

{/* <a href={repo.git_url}>GIT Url</a> */}