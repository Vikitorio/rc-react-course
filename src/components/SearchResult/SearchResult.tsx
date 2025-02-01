import { Component } from 'react';

interface AstronomicalObjectParams {
  name: string;
  astronomicalObjectType: string;
  location: {
    name: string;
  };
}

interface SearchResultProps {
  data: {
    astronomicalObjects?: AstronomicalObjectParams[];
  };
}

class SearchResult extends Component<SearchResultProps> {
  componentDidUpdate(): void {
    console.log('getData', this.props.data);
  }

  render() {
    return (
      <table>
        <thead>
          <th>test</th>
          <th>test</th>
        </thead>
        <tbody>
          {this.props.data?.astronomicalObjects
            ? this.props.data?.astronomicalObjects.map((item) => {
                return (
                  <tr>
                    <td>{item.name}</td>
                  </tr>
                );
              })
            : null}
        </tbody>
      </table>
    );
  }
}

export default SearchResult;
