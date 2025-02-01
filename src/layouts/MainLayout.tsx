import { Component } from 'react';
import TopControls from '../components/TopControls/TopControls';
import SearchResult from '../components/SearchResult/SearchResult';

interface InitialLayoutState {
  searchData: object;
}
class MainLayout extends Component<{}, InitialLayoutState> {
  state = {
    searchData: {},
  };
  baseUrl = 'https://stapi.co/api/v2/rest/astronomicalObject/';
  getAstronomicObjects = (
    name?: string,
    pageNumber?: string,
    pageSize?: string
  ) => {
    const url = new URL(this.baseUrl + 'search');
    if (name) url.searchParams.append('name', name.toString());
    if (pageNumber)
      url.searchParams.append('pageNumber', pageNumber.toString());
    if (pageSize) url.searchParams.append('pageSize', pageSize.toString());

    fetch(url.toString())
      .then((responce) => responce.json())
      .then((data) => this.setState({ searchData: data }));
    console.log(this.state.searchData);
  };
  render() {
    return (
      <div>
        <TopControls onSearch={this.getAstronomicObjects} />
        <SearchResult data={this.state.searchData} />
      </div>
    );
  }
}

export default MainLayout;
