import { Component } from 'react';
import Pagination from '../Pagination/Pagination';
interface AstronomicalObjectParams {
  name: string;
  astronomicalObjectType: string;
  location: {
    name: string;
  };
}

interface SearchResultProps {
  pageSizeChange: (pageSize: string) => void,
  pageChange: (page: number) => void,

  data: {
    page?: {
      pageNumber: number;
      totalElements: number;
      totalPages: number;
      firstPage: boolean;
      lastPage: boolean;
    }
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
          <th>Title</th>
          <th>Type</th>
        </thead>
        <tbody>
          {this.props.data?.astronomicalObjects
            ? this.props.data?.astronomicalObjects.map((item) => {
              return (
                <tr>
                  <td>{item.name}</td>
                  <td>{item.astronomicalObjectType}</td>
                </tr>
              );
            })
            : null}
        </tbody>
        <div>
          <Pagination page={this.props.data?.page} setPage={this.props.pageChange} />
        </div>
        <select id="table-pagination" onChange={(e) => { this.props.pageSizeChange(e.target.value) }} name='table-pagination'>
          <option value={10}>10 на сторінці</option>
          <option value={50}>50 на сторінці</option>
          <option value={100}>100 на сторінці</option>
        </select>
      </table>
    );
  }
}

export default SearchResult;
