import React from 'react';
import './searchBar.css';
import { Search } from 'carbon-components-react';

function SearchBar() {
    return (
        <Search
            className="inline"
            placeholder="Search, ex. Delhi, Kerala, All etc."
            labelText="Search"
        />
    );
}

export default SearchBar;
