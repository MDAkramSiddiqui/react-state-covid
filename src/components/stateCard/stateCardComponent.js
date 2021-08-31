import React from 'react';
import PropTypes from 'prop-types';
import './stateCard.css';
import { Tile } from 'carbon-components-react';
import { StackedBarChart } from '@carbon/charts-react';
import '@carbon/charts/styles.css';

function StateCard({ stateData }) {
    const statesBarData = [
        {
            group: 'Total active cases',
            key: 'Active',
            value: stateData.active.total,
        },
        {
            group: 'Active cases change',
            key: 'Active',
            value: stateData.active.isIncreased
                ? stateData.active.changes
                : -stateData.active.changes,
        },
        {
            group: 'Total death cases',
            key: 'Death',
            value: stateData.death.total,
        },
        {
            group: 'New death cases',
            key: 'Death',
            value: stateData.death.changes,
        },
        {
            group: 'Total cured cases',
            key: 'Cured',
            value: stateData.cured.total,
        },
        {
            group: 'New cured cases',
            key: 'Cured',
            value: stateData.cured.changes,
        },
    ];

    const options = {
        title: `${stateData.name} covid data`,
        axes: {
            left: {
                scaleType: 'labels',
            },
            bottom: {
                stacked: true,
            },
        },
        height: '400px',
    };

    return (
        <div className="tile">
            <Tile>
                <h3>{stateData.name}</h3>
                <p>{stateData.active.total}</p>
                <p>{stateData.cured.total}</p>
                <p>{stateData.death.total}</p>
            </Tile>
            <StackedBarChart data={statesBarData} options={options} />
        </div>
    );
}

StateCard.propTypes = {
    stateData: PropTypes.shape({
        name: PropTypes.string.isRequired,
        active: PropTypes.shape({
            total: PropTypes.number.isRequired,
            changes: PropTypes.number.isRequired,
            isIncreased: PropTypes.bool.isRequired,
        }),
        death: PropTypes.shape({
            total: PropTypes.number.isRequired,
            changes: PropTypes.number.isRequired,
            isIncreased: PropTypes.bool.isRequired,
        }),
        cured: PropTypes.shape({
            total: PropTypes.number.isRequired,
            changes: PropTypes.number.isRequired,
            isIncreased: PropTypes.bool.isRequired,
        }),
    }).isRequired,
};

export default StateCard;
