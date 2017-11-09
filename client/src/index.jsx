import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: []
    }

  }

  search(term) {
    // ajax POST request to /repos with the username
    $.post("/repos", { username: term },
      // a success case function, it will load the data without a page refresh
      function () {
        console.log('success case!');
        // update the DOM here with the data
        // arguments[2].responseText holds the data

        console.log('\n\nUse react components to display this data\n\n', arguments[2].responseText);

      });
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
