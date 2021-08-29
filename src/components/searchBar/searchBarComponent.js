import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './searchBar.css';
import { Search } from 'carbon-components-react';

function SearchBar({ onChange }) {
    const [statesQuery, setStatesQuery] = useState('');

    const handleStateQueryChange = (e) => {
        setStatesQuery(e.target.value);
        onChange(e.target.value);
    };

    return (
        <Search
            value={statesQuery}
            onChange={(e) => handleStateQueryChange(e)}
            className="inline"
            placeholder="Search, ex. Delhi, Kerala, All etc."
            labelText="Search"
        />
    );
}

SearchBar.propTypes = {
    onChange: PropTypes.func.isRequired,
};

export default SearchBar;
