import React from 'react';

class Search extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (<table>
      <thead>
        <tr>
          <th>Header content 1</th>
          <th>Header content 2</th>
        </tr>
      </thead>
      {/* Each repo gets a tr */}
      <tr>
        <td>
        </td>
      </tr>
    </table>);
  }
}

export default Search;






// `https://github.com/${username}`;

