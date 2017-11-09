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

  }

  search(term) {
    const self = this;

    // ajax POST request to /repos with the username
    $.post("/repos", { username: term },
      // a success case function, it will load the data without a page refresh
      function () {
        console.log('success case!');
        // update the DOM here with the data
        // arguments[2].responseText holds the data

        // update the state to hold the repos
        self.setState({ repos: JSON.parse(arguments[2].responseText) });
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
