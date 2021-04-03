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

  getTopList(){
    console.log('getting top list')
    let url = 'http://localhost:1128/repos';
    let request = $.ajax({
      url: url,
      method: 'GET'
    });

    request.done(function (result) {
      this.setState({
        repos: result
      });
    }.bind(this));
  }

  componentDidMount() {
    this.getTopList();
  }
  search(term) {
    let url = 'http://localhost:1128/repos';
    var request = $.ajax({
      url: url,
      method: 'POST',
      data: { term: term },
      success: function(){
        this.getTopList();
      }.bind(this)
    });


    console.log(`${term} was searched`);
  }

  render() {
    if (this.state.repos.length <= 0) {
      return (<div>
        <h1>Github Fetcher</h1>
        <Search onSearch={this.search.bind(this)} />
        <div>Top 25 list goes here...</div>
      </div>)
    } else {
      return (<div>
        <h1>Github Fetcher</h1>
        <Search onSearch={this.search.bind(this)} />
        <RepoList repos={this.state.repos} />
      </div>
      )
    }
  }
}

ReactDOM.render(<App />, document.getElementById('app'));