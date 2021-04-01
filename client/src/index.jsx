import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';
import RepoListEntry from './components/RepoListEntry.jsx';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: []
    }
  }
  componentDidMount() {
    let url = 'http://localhost:1128/repos';
    let request = $.ajax({
      url: url,
      method: 'GET'
    });

    request.done(function(result) {
       console.log("This is the result from the GET request ", result);
      this.setState({
        repos: result
      });
    }.bind(this));
  }
  search(term) {
    let url = 'http://localhost:1128/repos';
    var request = $.ajax({
      url: url,
      method: 'POST',
      data: { term: term }
    });

    console.log(`${term} was searched`);
  }

  render() {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos} />
      <Search onSearch={this.search.bind(this)} />
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));