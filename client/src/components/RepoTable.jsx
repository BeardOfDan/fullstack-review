import React from 'react';

// This component displays the repo data
class RepoTable extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    // styles
    // const tdStyle = { marginRight: 10 };
    const imgStyle = { maxHeight: 50, maxWidth: 50 };
    const aStyle = { textDecoration: 'none' };

    // helper function (for the repo description)
    const limitSize = function (str) {
      const maxSize = 100;
      if (str.length > (maxSize - 3)) {
        return str.slice(0, 47) + '...';
      } else {
        return str;
      }
    }

    return (<table>
      <thead>
        <tr>
          <th>Avatar</th>
          <th>Owner Login</th>
          <th>Repo Name</th>
          <th>Fork Count</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        {/* Each this.props.repo element gets a tr */}
        { // create an array of table rows
          // might have to use spread operator to get the elements to render
          this.props.repos.map((repo, index, array) => {
            return (<tr key={index}>
              <td><img src={`${repo.owner.avatar_url}`} style={imgStyle} alt={`Avatar for ${repo.owner.login}`} /></td>
              <td><a href={`https://github.com/${repo.owner.login}`} style={aStyle}>{repo.owner.login}</a></td>
              <td><a href={`https://github.com/${repo.full_name}`} style={aStyle}>{repo.name}</a></td>
              <td>{repo.forks}</td>
              <td>{limitSize(repo.description)}</td>
            </tr>);
          })
        }
      </tbody>
    </table>);
  }
}

export default RepoTable;
