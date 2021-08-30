import React from 'react';
import PropTypes from 'prop-types';
import './stateCard.css';
import { Tile } from 'carbon-components-react';

function StateCard({ stateData }) {
    return (
        <div className="tile">
            <Tile>
                <h3>{stateData.name}</h3>
                <p>{stateData.active}</p>
                <p>{stateData.cured}</p>
                <p>{stateData.deaths}</p>
            </Tile>
        </div>
    );
}

StateCard.propTypes = {
    stateData: PropTypes.shape({
        name: PropTypes.string.isRequired,
        active: PropTypes.number.isRequired,
        cured: PropTypes.number.isRequired,
        deaths: PropTypes.number.isRequired,
    }).isRequired,
};

export default StateCard;
