import style from './style.module.scss';
interface PaginationProps {
  page?: {
    pageNumber: number;
    totalElements: number;
    totalPages: number;
    firstPage: boolean;
    lastPage: boolean;
  };
  initialPageSize: number;
  setPage: (page: string) => void;
  setPageSize: (pageSize: string) => void;
}

const Pagination: React.FC<PaginationProps> = (props: PaginationProps) => {
  const getPagesArray = () => {
    const pageArray: number[] = [];
    const currentPage = props.page?.pageNumber || 0;
    const totalPages = props.page?.totalPages || 0;
    const pagesBack = currentPage - 3;
    let pagesUpfront = currentPage + 2;
    if (pagesBack < 0) {
      pagesUpfront += pagesBack * -1;
    }
    for (
      let i = Math.max(pagesBack, 0);
      i <= Math.min(pagesUpfront, totalPages - 1);
      i++
    ) {
      pageArray.push(i + 1);
    }
    return pageArray;
  };

  return (
    <div className={style['pagination']}>
      <ul className={style['pagination__list']}>
        {getPagesArray().map((value) => (
          <li
            key={value}
            onClick={() => props.setPage((value - 1).toString())}
            className={`${style['pagination__item']} ${
              props.page?.pageNumber === value - 1
                ? style['pagination__item--active']
                : ''
            }`}
          >
            {value}
          </li>
        ))}
      </ul>
      <select
        id="table-pagination"
        value={props.initialPageSize}
        onChange={(e) => {
          props.setPageSize(e.target.value);
        }}
        name="table-pagination"
        className={style['pagination__select']}
      >
        <option value={10}>10</option>
        <option value={50}>50</option>
        <option value={100}>100</option>
      </select>
    </div>
  );
};

export default Pagination;
