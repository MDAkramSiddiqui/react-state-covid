import React from 'react';
import PropTypes from 'prop-types';
import './stateCard.css';
import { Accordion, AccordionItem, Tile } from 'carbon-components-react';
import { StackedBarChart } from '@carbon/charts-react';
import '@carbon/charts/styles.css';
import { ArrowDown16, ArrowUp16 } from '@carbon/icons-react';

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
                <div
                    style={{
                        display: 'flex',
                        flexFlow: 'row',
                        flexWrap: 'wrap',
                    }}
                >
                    <p style={{ marginInlineEnd: '10px' }}>
                        <span style={{ fontWeight: '500' }}>
                            Active cases:&nbsp;
                        </span>
                        {stateData.active.total}&nbsp;
                        <span
                            style={{
                                display: 'inline-block',
                                color:
                                    stateData.active.isIncreased &&
                                    stateData.active.changes !== 0
                                        ? '#E74C3C'
                                        : '#2ECC71',
                                fontWeight: '600',
                            }}
                        >
                            (
                            {stateData.active.changes !== 0 &&
                                (stateData.active.isIncreased ? (
                                    <ArrowUp16 />
                                ) : (
                                    <ArrowDown16 />
                                ))}
                            {stateData.active.changes})
                        </span>
                    </p>
                    <p style={{ marginInlineEnd: '10px' }}>
                        <span style={{ fontWeight: '500' }}>Cured cases: </span>
                        {stateData.cured.total}&nbsp;
                        <span
                            style={{
                                display: 'inline-block',
                                color: '#2ECC71',
                                fontWeight: '600',
                            }}
                        >
                            ({stateData.cured.changes !== 0 && <ArrowUp16 />}
                            {stateData.cured.changes})
                        </span>
                    </p>
                    <p style={{ marginInlineEnd: '10px' }}>
                        <span style={{ fontWeight: '500' }}>Death cases: </span>
                        {stateData.death.total}&nbsp;
                        <span
                            style={{
                                display: 'inline-block',
                                color:
                                    stateData.death.changes === 0
                                        ? '#2ECC71'
                                        : '#E74C3C',
                                fontWeight: '600',
                            }}
                        >
                            ({stateData.death.changes !== 0 && <ArrowUp16 />}
                            {stateData.death.changes})
                        </span>
                    </p>
                </div>
            </Tile>
            <Accordion>
                <AccordionItem title="Graph">
                    <StackedBarChart data={statesBarData} options={options} />
                </AccordionItem>
            </Accordion>
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
