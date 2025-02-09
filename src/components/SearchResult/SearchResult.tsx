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
  pageChange: (page: string) => void;
  pageSize: string;
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
      <div className={style['search-result']}>
        <Spinner isLoading={this.props.isLoading} error={this.props.error}>
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
                      <tr
                        key={item.name}
                        className={style['search-result__row']}
                      >
                        <td className={style['search-result__cell']}>
                          {item.name}
                        </td>
                        <td className={style['search-result__cell']}>
                          {item.astronomicalObjectType}
                        </td>
                      </tr>
                    );
                  })
                : null}
            </tbody>
          </table>
          {this.props.data?.page?.totalElements && (
            <Pagination
              initialPageSize={Number(this.props.pageSize)}
              page={this.props.data?.page}
              setPage={this.props.pageChange}
              setPageSize={this.props.pageSizeChange}
            />
          )}
        </Spinner>
      </div>
    );
  }
}

export default SearchResult;
