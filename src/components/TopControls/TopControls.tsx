import { Component } from 'react';

interface TopControlsProps {
  onSearch: (seachValue: string) => void;
}
interface TopControlsState {
  searchValue: string;
}

class TopControls extends Component<TopControlsProps, TopControlsState> {
  state = {
    searchValue: localStorage.getItem('searchValue') || '',
  };
  startSearch = () => {
    console.log(this.state.searchValue);
    localStorage.setItem('searchValue', this.state.searchValue);
    this.props.onSearch(this.state.searchValue);
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
