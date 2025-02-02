import { Component } from 'react';
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
    setPage: (page: number) => void;
    setPageSize: (pageSize: string) => void;
}


class Pagination extends Component<PaginationProps> {
    getPagesArray = () => {
        const pageArray: number[] = [];
        const currentPage = this.props.page?.pageNumber || 0;
        const totalPages = this.props.page?.totalPages || 0;
        let pagesBack = currentPage - 3;
        let pagesUpfront = currentPage + 2;
        pagesBack < 0 ? (pagesUpfront += pagesBack * -1) : null;
        for (
            let i = Math.max(pagesBack, 0);
            i <= Math.min(pagesUpfront, totalPages - 1);
            i++
        ) {
            pageArray.push(i + 1);
        }
        return pageArray;
    };

    render() {
        return (
            <div className={style['pagination']}>
                <ul className={style['pagination__list']}>
                    {this.getPagesArray().map((value) => (
                        <li
                            key={value}
                            onClick={() => this.props.setPage(value - 1)}
                            className={`${style['pagination__item']} ${
                                this.props.page?.pageNumber === value - 1
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
                    value={this.props.initialPageSize}
                    onChange={(e) => {
                        this.props.setPageSize(e.target.value);
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
    }
}

export default Pagination;
