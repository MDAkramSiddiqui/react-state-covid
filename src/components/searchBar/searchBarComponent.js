import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './searchBar.css';
import { Search } from 'carbon-components-react';

function SearchBar({ onChange, disabled }) {
    const [statesQuery, setStatesQuery] = useState('');

    const handleStateQueryChange = (e) => {
        setStatesQuery(e.target.value);
        onChange(e.target.value);
    };

    useEffect(() => {
        setStatesQuery("")
    }, [disabled])

    return (
        <Search
            value={statesQuery}
            disabled={disabled}
            onChange={(e) => handleStateQueryChange(e)}
            className="inline"
            placeholder="Search, ex. Delhi, Kerala, All etc."
            labelText="Search"
        />
    );
}

SearchBar.propTypes = {
    onChange: PropTypes.func.isRequired,
    disabled: PropTypes.bool.isRequired,
};

export default SearchBar;
