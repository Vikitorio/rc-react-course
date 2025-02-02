import { Component } from 'react';
import style from './style.module.scss';
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
      <div className={style['search']}>
        <input
          className={style['search__input']}
          type="search"
          placeholder="Enter value"
          value={this.state.searchValue}
          onChange={(e) => this.setState({ searchValue: e.target.value })}
          id="site-search"
        />
        <button onClick={this.startSearch} className={style['search__button']}>
          Search
        </button>
      </div>
    );
  }
}

export default TopControls;
