import React, { useEffect, useState } from 'react';
import {
    Renew32,
    SortAscending32,
    SortDescending32,
    Warning16,
} from '@carbon/icons-react';
import { Button, Tile, Dropdown, Tooltip } from 'carbon-components-react';
import { useDispatch, useSelector } from 'react-redux';
import { debounce, orderBy } from 'lodash';

import constants from '../constants';
import Loader from './loader';
import SearchBar from './searchBar';
import StateCard from './stateCard';
import updateStatesData from '../actions/states';
import updateLastRefresh from '../actions/lastRefresh';

const SortEnum = {
    STATE_NAME: 'State Name',
    ACTIVE_CASES: 'Active Cases',
    CURED_CASES: 'Cured Cases',
    DEATH_CASES: 'Death Cases',
};

function App() {
    const dispatch = useDispatch();
    const storedStatesData = useSelector((store) => store.states);
    const lastRefresh = useSelector((store) => store.lastRefresh);
    const [isDataLoading, setIsDataLoading] = useState(false);
    const [isSortAsc, setIsSortAsc] = useState(true);
    const [statesData, setStatesData] = useState(storedStatesData);
    const [refreshTimeStamp, setRefreshTimeStamp] = useState(lastRefresh);
    const [currentSortBy, setCurrentSortBy] = useState(SortEnum.STATE_NAME);
    const [isStaleData, setIsStaleData] = useState(false);

    useEffect(() => {
        setIsDataLoading(() => !storedStatesData?.length);
        if (!storedStatesData?.length) {
            fetchCovidData();
        }

        setIsStaleData(() => {
            const oneDay = 24 * 60 * 60 * 1000;
            return Date.now() - oneDay > lastRefresh;
        });
    }, []);

    useEffect(() => {
        sortData(statesData);
    }, [isSortAsc, currentSortBy]);

    const fetchCovidData = () => {
        setIsDataLoading(true);
        return fetch(
            `${constants.global.BASE_API_URI}${constants.global.COVID_STATES_DATA_API}`,
        )
            .then((response) => response.json())
            .then((response) => {
                dispatch(
                    updateStatesData(
                        response.status === 'success' ? response.data : [],
                    ),
                );
                setStatesData((statesData) =>
                    response.status === 'success' ? response.data : statesData,
                );

                const currentTime = Date.now();

                dispatch(
                    updateLastRefresh(
                        response.status === 'success'
                            ? currentTime
                            : refreshTimeStamp,
                    ),
                );
                setRefreshTimeStamp((refreshTimeStamp) =>
                    response.status === 'success'
                        ? currentTime
                        : refreshTimeStamp,
                );

                setIsDataLoading(() => false);
                setIsSortAsc(() => true);
                setCurrentSortBy(() => SortEnum.STATE_NAME);
            });
    };

    const filterList = (stateQuery) => {
        const filteredStatesData = [];
        if (stateQuery) {
            const queries = stateQuery
                .split(',')
                .map((q) => q.trim().toLowerCase());
            storedStatesData.forEach((state) => {
                const stateName = state.name.toLowerCase();
                if (queries.some((q) => stateName.includes(q))) {
                    filteredStatesData.push(state);
                }
            });
        } else {
            filteredStatesData.push(...storedStatesData);
        }

        sortData(filteredStatesData);
    };

    const handleSortByChange = ({ selectedItem }) => {
        setCurrentSortBy(() => selectedItem);
    };

    const handleSortOrderChange = () => {
        setIsSortAsc((isSortAsc) => !isSortAsc);
    };

    const sortData = (data) => {
        let sortedData = [];
        switch (currentSortBy) {
            case SortEnum.ACTIVE_CASES:
                sortedData = orderBy(
                    data,
                    (o) => o.active.total,
                    isSortAsc ? 'asc' : 'desc',
                );
                break;
            case SortEnum.DEATH_CASES:
                sortedData = orderBy(
                    data,
                    (o) => o.death.total,
                    isSortAsc ? 'asc' : 'desc',
                );
                break;
            case SortEnum.CURED_CASES:
                sortedData = orderBy(
                    data,
                    (o) => o.cured.total,
                    isSortAsc ? 'asc' : 'desc',
                );
                break;
            case SortEnum.STATE_NAME:
            default:
                sortedData = orderBy(
                    data,
                    (o) => o.name,
                    isSortAsc ? 'asc' : 'desc',
                );
        }
        setStatesData(() => sortedData);
    };

    return (
        <div className="bx--grid bx--grid--full-width">
            <div className="bx--row">
                <SearchBar
                    disabled={isDataLoading}
                    onChange={debounce(filterList, 500)}
                />
            </div>
            <div className="bx--row" style={{ marginTop: '10px' }}>
                <div
                    style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        flexGrow: '1',
                        alignItems: 'flex-end',
                        margin: '10px 0',
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginInlineEnd: '10px',
                            marginBottom: '10px',
                        }}
                    >
                        <span style={{ marginBottom: '5px', fontSize: '12px' }}>
                            Sort By:
                        </span>
                        <Dropdown
                            id="sort-by-dropdown"
                            disabled={isDataLoading}
                            ariaLabel="Dropdown"
                            items={Object.values(SortEnum)}
                            size="xl"
                            label="Sort By"
                            selectedItem={currentSortBy}
                            onChange={handleSortByChange}
                        />
                    </div>
                    <Button
                        style={{
                            marginInlineEnd: '10px',
                            marginBottom: '10px',
                        }}
                        disabled={isDataLoading}
                        onClick={handleSortOrderChange}
                        hasIconOnly
                        iconDescription="Sort order"
                    >
                        {isSortAsc ? (
                            <SortAscending32 size="sm" />
                        ) : (
                            <SortDescending32 size="sm" />
                        )}
                    </Button>
                    <Button
                        style={{
                            marginInlineEnd: '10px',
                            marginBottom: '10px',
                        }}
                        disabled={isDataLoading}
                        onClick={() => fetchCovidData()}
                        hasIconOnly
                        iconDescription="Refresh"
                    >
                        <Renew32 size="sm" />
                    </Button>
                </div>
            </div>
            <div
                className="bx--row"
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: '20px',
                }}
            >
                <span
                    style={{
                        fontSize: '14px',
                        fontWeight: '600',
                        color: isDataLoading ? '#ddd' : '#333',
                    }}
                >
                    Last updated: {new Date(lastRefresh).toTimeString()}
                </span>
                {isStaleData && (
                    <Tooltip direction="top" tabIndex={0}>
                        <span
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                            }}
                        >
                            <Warning16 style={{ color: '#FFE194' }} />
                            &nbsp; Data might be stale
                        </span>
                    </Tooltip>
                )}
            </div>
            {isDataLoading && <Loader />}
            {!isDataLoading &&
                (statesData.length ? (
                    statesData.map((data, index) => (
                        <StateCard stateData={data} key={index} />
                    ))
                ) : (
                    <div className="tile">
                        <Tile>
                            <h4>No results found</h4>
                        </Tile>
                    </div>
                ))}
        </div>
    );
}

export default App;
