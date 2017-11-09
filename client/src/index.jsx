import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';
import RepoTable from './components/RepoTable.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: []
    }

    // get initial values for the repos
    const self = this;
    $.get('/repos', function (response) {
      self.setState({ repos: JSON.parse(response) });
    });
  }

  search(term) {
    const self = this;
    // ajax POST request to /repos with the username
    $.post('/repos', { username: term },
      // a success case function, it will load the data without a page refresh
      function () { // arguments[2].responseText holds the data
        console.log('POST request successful');
        self.setState({ repos: JSON.parse(arguments[2].responseText) });// update the state to hold the repos
      });
  }

  render() {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos} />
      <Search onSearch={this.search.bind(this)} />
      <br />
      <RepoTable repos={this.state.repos} />
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
