import React, { useEffect, useState } from 'react';
import { Renew32 } from '@carbon/icons-react';
import { Button } from 'carbon-components-react';
import { useDispatch, useSelector } from 'react-redux';
import { debounce } from 'lodash';

import constants from '../constants';
import Loader from './loader';
import SearchBar from './searchBar';
import StateCard from './stateCard';
import updateStatesData from '../actions/states';

function App() {
    const dispatch = useDispatch();
    const covidStatesData = useSelector((store) => store.states);
    const [isDataLoading, setIsDataLoading] = useState(true);
    const [statesData, setStatesData] = useState(covidStatesData);

    const fetchCovidData = () => {
        fetch(
            `${constants.global.BASE_API_URI}${constants.global.COVID_STATES_DATA_API}`,
        )
            .then((response) => response.json())
            .then((response) => {
                if (response.status === 'success') {
                    dispatch(updateStatesData(response.data));
                    setStatesData(response.data);
                }
                setIsDataLoading(false);
            });
    };

    const filterList = (stateQuery) => {
        if (!stateQuery) {
            setStatesData(covidStatesData);
            return;
        }

        const queries = stateQuery
            .split(',')
            .map((q) => q.trim().toLowerCase());
        const filteredStatesData = [];
        covidStatesData.forEach((state) => {
            const stateName = state.name.toLowerCase();
            if (queries.some((q) => stateName.includes(q))) {
                filteredStatesData.push(state);
            }
        }, []);

        setStatesData(filteredStatesData);
    };

    useEffect(() => {
        fetchCovidData();
    }, []);

    return (
        <div className="bx--grid bx--grid--full-width">
            <div className="bx--row wrapper">
                <SearchBar onChange={debounce(filterList, 500)} />
                <Button hasIconOnly iconDescription="Refresh" size="md">
                    <Renew32 />
                </Button>
            </div>
            {isDataLoading && <Loader />}
            {!isDataLoading &&
                statesData.map((data, index) => (
                    <StateCard stateData={data} key={index} />
                ))}
        </div>
    );
}

export default App;
