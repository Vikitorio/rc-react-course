import { Component } from 'react';

class TopControls extends Component {
    render() {
        return (
            <div>
                <input type="search" placeholder="Enter value" id="site-search"  />
                <button>Search</button>
            </div>
        );
    }
}

export default TopControls;
