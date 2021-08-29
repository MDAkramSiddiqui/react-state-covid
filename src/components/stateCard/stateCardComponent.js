import React from 'react';
import PropTypes from 'prop-types';

function StateCard({ stateData }) {
    return (
        <div>
            <h3>{stateData.name}</h3>
            <p>{stateData.active}</p>
            <p>{stateData.cured}</p>
            <p>{stateData.deaths}</p>
        </div>
    );
}

StateCard.propTypes = {
    stateData: PropTypes.shape({
        name: PropTypes.string.isRequired,
        active: PropTypes.string.isRequired,
        cured: PropTypes.string.isRequired,
        deaths: PropTypes.string.isRequired,
    }).isRequired,
};

export default StateCard;
