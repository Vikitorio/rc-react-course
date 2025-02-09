import Pagination from '../Pagination/Pagination';
import Spinner from '../Spinner/Spinner';
import style from './style.module.scss';
import { Link, useLocation } from 'react-router';
interface AstronomicalObjectParams {
  uid: string;
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

const SearchResult: React.FC<SearchResultProps> = (
  props: SearchResultProps
) => {
  const location = useLocation();
  return (
    <div className={style['search-result']}>
      <Spinner isLoading={props.isLoading} error={props.error}>
        <div className={style['search-result__table-wrapper']}>
          <table className={style['search-result__table']}>
            <thead className={style['search-result__header']}>
              <tr>
                <th>Title</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody className={style['search-result__body']}>
              {props.data?.astronomicalObjects
                ? props.data.astronomicalObjects.map((item) => (
                    <tr key={item.name} className={style['search-result__row']}>
                      <td className={style['search-result__cell']}>
                        <Link
                          to={{
                            pathname: `/dashboard/detailed=${item.uid}`,
                            search: `${location.search}`,
                          }}
                        >
                          {item.name}
                        </Link>
                      </td>
                      <td className={style['search-result__cell']}>
                        {item.astronomicalObjectType}
                      </td>
                    </tr>
                  ))
                : null}
            </tbody>
          </table>
        </div>
        {props.data?.page?.totalPages !== undefined &&
          props.data.page.totalPages > 0 && (
            <div className={style['search-result__pagination']}>
              <Pagination
                initialPageSize={Number(props.pageSize)}
                page={props.data.page}
                setPage={props.pageChange}
                setPageSize={props.pageSizeChange}
              />
            </div>
          )}
      </Spinner>
    </div>
  );
};

export default SearchResult;
