import { Component } from 'react';

interface TopControlsProps {
  onSearch: (name?: string, pageNumber?: string, pageSize?: string) => void;
}
interface TopControlsState {
  searchValue: string;
}

class TopControls extends Component<TopControlsProps, TopControlsState> {
  state = {
    searchValue: '',
  };
  startSearch = () => {
    console.log(this.state.searchValue);
    this.props.onSearch();
  };
  render() {
    return (
      <div>
        <input
          type="search"
          placeholder="Enter value"
          value={this.state.searchValue}
          onChange={(e) => this.setState({ searchValue: e.target.value })}
          id="site-search"
        />
        <button onClick={this.startSearch}>Search</button>
      </div>
    );
  }
}

export default TopControls;
