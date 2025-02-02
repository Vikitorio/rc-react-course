import { Component } from 'react';
import Pagination from '../Pagination/Pagination';
import Spinner from '../Spinner/Spinner';
import style from './style.module.scss';
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
        <div className={style['search-result']}>
          <table className={style['search-result__table']}>
            <thead className={style['search-result__header']}>
              <tr>
                <th>Title</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody className={style['search-result__body']}>
              {this.props.data?.astronomicalObjects
                ? this.props.data?.astronomicalObjects.map((item) => {
                    return (
                      <tr key={item.name} className={style['search-result__row']}>
                        <td className={style['search-result__cell']}>{item.name}</td>
                        <td className={style['search-result__cell']}>{item.astronomicalObjectType}</td>
                      </tr>
                    );
                  })
                : null}
            </tbody>
          </table>
          <div className={style['search-result__controls']}>
            <Pagination
              page={this.props.data?.page}
              setPage={this.props.pageChange}
              setPageSize={this.props.pageSizeChange}
            />
          </div>
        </div>
      </Spinner>
    );
  }
}

export default SearchResult;
