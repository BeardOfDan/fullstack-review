import React from 'react';

class RepoTable extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (<table>
      <thead>
        <tr>
          <th>Owner Login</th>
          <th>Repo Name</th>
          <th>Fork Count</th>
        </tr>
      </thead>
      <tbody>
        {/* Each this.props.repo element gets a tr */}
        { // create an array of table rows
          // might have to use spread operator to get the elements to render
          this.props.repos.map((repo, index, array) => {
            return (<tr key={index}>
              <td><a href={`https://github.com/${repo.owner.login}`}>{repo.owner.login}</a></td>
              <td><a href={`https://github.com/${repo.full_name}`}>{repo.name}</a></td>
              <td>{repo.forks}</td>
            </tr>);
          })
        }
      </tbody>

      {/* <tr>
        <td>
        </td>
      </tr> */}
    </table>);
  }
}

export default RepoTable;






// `https://github.com/${username}`;

