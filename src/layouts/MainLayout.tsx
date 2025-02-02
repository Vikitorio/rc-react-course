import { Component } from 'react';
import TopControls from '../components/TopControls/TopControls';
import SearchResult from '../components/SearchResult/SearchResult';
import ErrorBtn from '../components/ErrorBtn/ErrorBtn';

interface InitialLayoutState {
  searchParam: string;
  pageSize: string;
  page: string;
  searchData: object;
  isLoading: boolean;
  error: string | null;
}
class MainLayout extends Component<{}, InitialLayoutState> {
  state = {
    searchData: {},
    searchParam: localStorage.getItem('searchValue') || '',
    pageSize: '10',
    page: '0',
    isLoading: true,
    error: null,
  };
  baseUrl = 'https://stapi.co/api/v2/rest/astronomicalObject/';

  componentDidMount(): void {
    this.fetchData();
  }
  componentDidUpdate({}, prevState: Readonly<InitialLayoutState>): void {
    const { searchParam, pageSize, page } = this.state;
    if (
      prevState.searchParam !== searchParam ||
      prevState.pageSize !== pageSize ||
      prevState.page !== page
    ) {
      this.setState({ isLoading: true });
      this.fetchData();
    }
  }

  fetchData = () => {
    const url = new URL(this.baseUrl + 'search');
    const bodyForm = new URLSearchParams();
    bodyForm.append('name', this.state.searchParam);
    url.searchParams.append('name', this.state.searchParam.toString());
    url.searchParams.append('pageNumber', this.state.page.toString());
    url.searchParams.append('pageSize', this.state.pageSize.toString());
    fetch(url.toString(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: bodyForm.toString(),
    })
      .then((responce) => responce.json())
      .then((data) => {
        setTimeout(() => {
          this.setState({
            searchData: data,
            page: Math.min(
              Number(this.state.page),
              data.page.totalPages - 1
            ).toString(),
            isLoading: false,
            error: null
          });
        }, 1000);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        this.setState({ isLoading: false, error: error.message });
      });
  };

  handlePageSizeChange = (pageSize: string) => {
    this.setState({
      pageSize: pageSize,
    });
  };
  handlePageChange = (page: number) => {
    this.setState({
      page: page.toString(),
    });
  };
  handleSeachParam = (searchValue: string) => {
    if (this.state.searchParam === searchValue.trim()) {
      this.fetchData();
    } else {
      this.setState({ searchParam: searchValue.trim() });
    }
  };
  refetch = () => {
    this.fetchData();
  };
  render() {
    return (
      <>
        <TopControls onSearch={this.handleSeachParam} />
        <SearchResult
          data={this.state.searchData}
          pageSizeChange={this.handlePageSizeChange}
          pageChange={this.handlePageChange}
          isLoading={this.state.isLoading}
          error={this.state.error}
        />
        <ErrorBtn />
      </>
    );
  }
}

export default MainLayout;
