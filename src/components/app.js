import React, { useEffect, useState } from 'react';
import { Renew32 } from '@carbon/icons-react';
import { Button } from 'carbon-components-react';
import { useDispatch, useSelector } from 'react-redux';

import constants from '../constants';
import Loader from './loader';
import SearchBar from './searchBar';
import StateCard from './stateCard';
import updateStatesData from '../actions/states';

function App() {
    const dispatch = useDispatch();

    const [isDataLoading, setIsDataLoading] = useState(true);
    const covidStatesData = useSelector((store) => store.states);

    const fetchCovidData = () => {
        fetch(
            `${constants.global.BASE_API_URI}${constants.global.COVID_STATES_DATA_API}`,
        )
            .then((response) => response.json())
            .then((data) => {
                if (data.status === 'success') {
                    dispatch(updateStatesData(data.data));
                }
                setIsDataLoading(false);
            });
    };

    useEffect(() => {
        fetchCovidData();
    }, []);

    return (
        <div className="bx--grid bx--grid--full-width">
            <div className="bx--row wrapper">
                <SearchBar />
                <Button hasIconOnly iconDescription="Refresh" size="md">
                    <Renew32 />
                </Button>
            </div>
            {isDataLoading && <Loader />}
            {!isDataLoading &&
                covidStatesData.map((data, index) => (
                    <StateCard stateData={data} key={index} />
                ))}
        </div>
    );
}

export default App;
