import { useState } from 'react';
import style from './style.module.scss';
import { useNavigate } from 'react-router';
interface TopControlsProps {
  onSearch: (seachValue: string) => void;
}

const TopControls: React.FC<TopControlsProps> = (props: TopControlsProps) => {
  const [searchValue, setSearchValue] = useState(
    localStorage.getItem('searchValue') || ''
  );
  const navigate = useNavigate();
  const startSearch = () => {
    navigate(`?query=${searchValue}`);
    localStorage.setItem('searchValue', searchValue);
    props.onSearch(searchValue);
  };

  return (
    <div className={style['search']}>
      <input
        className={style['search__input']}
        type="search"
        placeholder="Enter value"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        id="site-search"
      />
      <button onClick={startSearch} className={style['search__button']}>
        Search
      </button>
    </div>
  );
};

export default TopControls;
