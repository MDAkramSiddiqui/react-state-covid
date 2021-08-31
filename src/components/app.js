import React, { useEffect, useState } from 'react';
import {
    Renew32,
    SortAscending32,
    SortDescending32,
} from '@carbon/icons-react';
import { Button, Tile, Dropdown } from 'carbon-components-react';
import { useDispatch, useSelector } from 'react-redux';
import { debounce, orderBy } from 'lodash';

import constants from '../constants';
import Loader from './loader';
import SearchBar from './searchBar';
import StateCard from './stateCard';
import updateStatesData from '../actions/states';

const SortEnum = {
    STATE_NAME: 'State Name',
    ACTIVE_CASES: 'Active Cases',
    TOTAL_CASES: 'Total Cases',
    TOTAL_DEATHS: 'Total Deaths',
};

function App() {
    const dispatch = useDispatch();
    const storedStatesData = useSelector((store) => store.states);
    const [isDataLoading, setIsDataLoading] = useState(true);
    const [isSortAsc, setIsSortAsc] = useState(true);
    const [statesData, setStatesData] = useState(storedStatesData);
    const [currentSortBy, setCurrentSortBy] = useState(SortEnum.STATE_NAME);

    const fetchCovidData = () => {
        setIsDataLoading(true);
        return fetch(
            `${constants.global.BASE_API_URI}${constants.global.COVID_STATES_DATA_API}`,
        )
            .then((response) => response.json())
            .then((response) => {
                if (response.status === 'success') {
                    dispatch(updateStatesData(response.data));
                    setStatesData(response.data);
                }
                setIsDataLoading(false);
                setIsSortAsc(true);
                setCurrentSortBy(SortEnum.STATE_NAME);
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

    const handleSortByChange = (selectedSortBy) => {
        setCurrentSortBy(selectedSortBy);
    };

    const handleSortOrderChange = () => {
        setIsSortAsc(!isSortAsc);
    };

    const sortData = (data) => {
        let sortedData = [];
        switch (currentSortBy) {
            case SortEnum.ACTIVE_CASES:
                sortedData = orderBy(
                    data,
                    'active',
                    isSortAsc ? 'asc' : 'desc',
                );
                setStatesData(sortedData);
                break;
            case SortEnum.TOTAL_DEATHS:
                sortedData = orderBy(
                    data,
                    'deaths',
                    isSortAsc ? 'asc' : 'desc',
                );
                setStatesData(sortedData);
                break;
            case SortEnum.TOTAL_CASES:
                sortedData = orderBy(data, 'cured', isSortAsc ? 'asc' : 'desc');
                setStatesData(sortedData);
                break;
            case SortEnum.STATE_NAME:
            default:
                sortedData = orderBy(data, 'name', isSortAsc ? 'asc' : 'desc');
                setStatesData(sortedData);
        }
    };

    useEffect(() => {
        fetchCovidData();
    }, []);

    useEffect(() => {
        sortData(statesData);
    }, [currentSortBy, isSortAsc]);

    return (
        <div className="bx--grid bx--grid--full-width">
            <div className="bx--row">
                <SearchBar
                    disabled={isDataLoading}
                    onChange={debounce(filterList, 500)}
                />
            </div>
            <div className="bx--row wrapper">
                <Dropdown
                    disabled={isDataLoading}
                    ariaLabel="Dropdown"
                    id="carbon-dropdown-example"
                    items={Object.values(SortEnum)}
                    size="xl"
                    label="Sort By"
                    selectedItem={currentSortBy}
                    onChange={(value) => handleSortByChange(value.selectedItem)}
                />
                <Button
                    disabled={isDataLoading}
                    onClick={() => handleSortOrderChange()}
                    hasIconOnly
                    iconDescription="Sort order"
                    size="sm"
                >
                    {isSortAsc ? <SortAscending32 /> : <SortDescending32 />}
                </Button>
                <Button
                    disabled={isDataLoading}
                    onClick={() => fetchCovidData()}
                    hasIconOnly
                    iconDescription="Refresh"
                    size="md"
                >
                    <Renew32 />
                </Button>
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
