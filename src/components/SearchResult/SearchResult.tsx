import { Component } from 'react';
import Pagination from '../Pagination/Pagination';
import Spinner from '../Spinner/Spinner';
interface AstronomicalObjectParams {
  name: string;
  astronomicalObjectType: string;
  location: {
    name: string;
  };
}

interface SearchResultProps {
  pageSizeChange: (pageSize: string) => void;
  pageChange: (page: number) => void;
  isLoading: boolean;
  error: string | null;

  data: {
    page?: {
      pageNumber: number;
      totalElements: number;
      totalPages: number;
      firstPage: boolean;
      lastPage: boolean;
    };
    astronomicalObjects?: AstronomicalObjectParams[];
  };
}

class SearchResult extends Component<SearchResultProps> {
  render() {
    return (
      <Spinner isLoading={this.props.isLoading} error={this.props.error}>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>
            {this.props.data?.astronomicalObjects
              ? this.props.data?.astronomicalObjects.map((item) => {
                  return (
                    <tr key={item.name}>
                      <td>{item.name}</td>
                      <td>{item.astronomicalObjectType}</td>
                    </tr>
                  );
                })
              : null}
          </tbody>
        </table>
        <div>
          <select
            id="table-pagination"
            onChange={(e) => {
              this.props.pageSizeChange(e.target.value);
            }}
            name="table-pagination"
          >
            <option value={10}>10 на сторінці</option>
            <option value={50}>50 на сторінці</option>
            <option value={100}>100 на сторінці</option>
          </select>
          <Pagination
            page={this.props.data?.page}
            setPage={this.props.pageChange}
          />
        </div>
      </Spinner>
    );
  }
}

export default SearchResult;
