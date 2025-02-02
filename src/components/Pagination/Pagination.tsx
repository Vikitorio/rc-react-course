import  { Component } from 'react';

interface PaginationProps {
    page?: {
        pageNumber: number;
        totalElements: number;
        totalPages: number;
        firstPage: boolean;
        lastPage: boolean;
    }
    setPage: (page:number) => void
}

interface PaginationState {

}

class Pagination extends Component<PaginationProps, PaginationState> {


    getPagesArray = () => {
        const pageArray:number[] = [];
        const currentPage = this.props.page?.pageNumber || 0;
        const totalPages = this.props.page?.totalPages || 0;
        let pagesBack = currentPage-3;
        let pagesUpfront = currentPage+2;
        pagesBack < 0 ? pagesUpfront += (pagesBack * -1) : null;
        console.log("pages",pagesBack, pagesUpfront)
        for (let i = Math.max(pagesBack, 0); i <= Math.min(pagesUpfront,totalPages); i++) {
            pageArray.push(i+1);
          }
          console.log("pageArray", pageArray)
        return pageArray;
    }

    render() {
        return (

            <div>
                {this.getPagesArray().map((value)=>{
                    return <li key={value} onClick={()=>this.props.setPage(value-1)}>{value}</li>
                })}
            </div>

        );
    }
}

export default Pagination;
