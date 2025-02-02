import { Component } from 'react';
import TopControls from '../components/TopControls/TopControls';
import SearchResult from '../components/SearchResult/SearchResult';

interface InitialLayoutState {
  searchParam: string,
  pageSize: string,
  page: string,
  searchData: object;
}
class MainLayout extends Component<{}, InitialLayoutState> {
  state = {
    searchData: {},
    searchParam: '',
    pageSize: '',
    page: '',
  };
  baseUrl = 'https://stapi.co/api/v2/rest/astronomicalObject/';
  fetchData = () => {
    console.log("fetch with pageSize", this.state.pageSize)
    const url = new URL(this.baseUrl + 'search');
    const bodyForm = new URLSearchParams();
    bodyForm.append("name", this.state.searchParam);
    console.log("params: ", this.state.searchParam, this.state.pageSize, this.state.page)
    url.searchParams.append('name', this.state.searchParam.toString());
    url.searchParams.append('pageNumber', this.state.page.toString());
    url.searchParams.append('pageSize', this.state.pageSize.toString());
    fetch(url.toString(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: bodyForm.toString()
    })
      .then((responce) => responce.json())
      .then((data) => this.setState({ searchData: data }));
    console.log(this.state.searchData);
  };

  handlePageSizeChange = (pageSize: string) => {
    this.setState({
      pageSize: pageSize,
    }, this.fetchData);

  }
  handlePageChange = (page: number) => {
    this.setState({
      page: page.toString(),
    }, this.fetchData);

  }
  handleSeachParam = (seachValue: string) => {
    this.setState({ searchParam: seachValue }, this.fetchData);

  }

  render() {
    return (
      <div>
        <TopControls onSearch={this.handleSeachParam} />
        <SearchResult data={this.state.searchData} pageSizeChange={this.handlePageSizeChange} pageChange={this.handlePageChange} />
      </div>
    );
  }
}

export default MainLayout;
